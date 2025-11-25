import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { LeadCard } from './components/LeadCard';
import { CallView } from './components/CallView';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { CelebrationOverlay } from './components/CelebrationOverlay';
import { 
  Phone, Clock, BarChart2, Filter, FileText, ChevronRight, Target, ArrowUpDown
} from 'lucide-react';
import { Lead, ViewState, Stats, LeadStatus } from './types';
import { AGENTS } from './constants';
import './services/firebase'; // Ensure Firebase inits

// Updated key to force fresh load from CSV
const STORAGE_KEY = "lp_sales_leads_v7";
const CSV_URL = '/outreach-list.csv';

export default function App() {
  const [user, setUser] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [view, setView] = useState<ViewState>('dashboard');
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  
  // Filter & Sort State
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'All'>('All');
  const [sortOption, setSortOption] = useState<string>('default');

  // Gamification State
  const [triggerCelebration, setTriggerCelebration] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCSV = (text: string): Lead[] => {
    const lines = text.split(/\r\n|\n/);
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/^"|"$/g, ''));
    
    const mapHeader = (key: string) => headers.findIndex(h => h.includes(key));

    const idxSchoolName = mapHeader('school name');
    const idxCompany = idxSchoolName !== -1 ? idxSchoolName : mapHeader('company');
    
    const idxAdminFirst = mapHeader('admin first name');
    const idxFirst = idxAdminFirst !== -1 ? idxAdminFirst : mapHeader('first');
    
    const idxLast = mapHeader('last'); 
    
    const idxPhone = mapHeader('telephone');
    const idxPhoneAlt = mapHeader('phone');
    const finalPhoneIdx = idxPhone !== -1 ? idxPhone : idxPhoneAlt;

    const idxEmail = mapHeader('email');
    const idxStatus = mapHeader('called y/n'); 
    const idxNotes = mapHeader('response notes');
    
    const parseLine = (line: string) => {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                if (inQuotes && line[i+1] === '"') {
                    current += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        return result;
    };

    const newLeads: Lead[] = [];
    let currentId = Math.max(...leads.map(l => l.id), 0) + 1;

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const cols = parseLine(lines[i]);
      
      if (cols.length < 2) continue;

      // Handle Name Parsing
      let firstName = 'Unknown';
      let lastName = '';

      const rawName = idxFirst !== -1 ? cols[idxFirst] : '';
      if (idxLast === -1 && rawName) {
         const parts = rawName.split(' ');
         if (parts.length > 1) {
           firstName = parts[0];
           lastName = parts.slice(1).join(' ');
         } else {
           firstName = rawName;
         }
      } else {
         firstName = rawName || 'Unknown';
         lastName = idxLast !== -1 ? cols[idxLast] : '';
      }

      const company = idxCompany !== -1 ? cols[idxCompany] : 'Unknown School';
      
      if (firstName === 'Unknown' && company === 'Unknown School') continue;

      const rawStatusCol = idxStatus !== -1 ? (cols[idxStatus] || '') : '';
      let status: LeadStatus = 'New';
      let notes = idxNotes !== -1 ? (cols[idxNotes] || '') : '';

      if (rawStatusCol.toLowerCase().includes("yes called")) {
         status = 'In Progress';
      } else if (rawStatusCol.toLowerCase().includes("no answer")) {
         status = 'Follow Up';
      }
      
      // Use simple string from AGENTS array for assignment to keep logic consistent
      const assignedAgent = AGENTS[(i - 1) % AGENTS.length];

      newLeads.push({
        id: currentId++,
        firstName,
        lastName,
        company,
        phone: finalPhoneIdx !== -1 ? (cols[finalPhoneIdx] || '') : '',
        email: idxEmail !== -1 ? (cols[idxEmail] || '') : '',
        status,
        notes: notes,
        lastContact: null, 
        timezone: 'PST',
        officeHours: '8:00 AM - 4:00 PM',
        assignedAgent
      });
    }
    return newLeads;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.length > 0) {
             setLeads(parsed);
             return;
          }
        }

        const response = await fetch(CSV_URL);
        if (!response.ok) throw new Error(`Failed to fetch CSV: ${response.statusText}`);
        const text = await response.text();
        const initialLeads = parseCSV(text);
        setLeads(initialLeads);
      } catch (e) {
        console.error("Failed to load initial data", e);
      }
    };
    
    loadData();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && leads.length > 0) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
      } catch (e) {
        console.error("Failed to save leads to localStorage", e);
      }
    }
  }, [leads]);

  const myLeads = useMemo(() => {
    if (!user) return [];
    let filtered = leads.filter(lead => lead.assignedAgent === user);
    
    if (statusFilter !== 'All') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    if (sortOption !== 'default') {
      filtered.sort((a, b) => {
        if (sortOption === 'name') {
          return (a.firstName + ' ' + a.lastName).localeCompare(b.firstName + ' ' + b.lastName);
        }
        if (sortOption === 'company') {
          return a.company.localeCompare(b.company);
        }
        if (sortOption === 'status') {
          return a.status.localeCompare(b.status);
        }
        if (sortOption === 'lastContact') {
          if (!a.lastContact && !b.lastContact) return 0;
          if (!a.lastContact) return 1;
          if (!b.lastContact) return -1;
          return b.lastContact.localeCompare(a.lastContact);
        }
        return 0;
      });
    }
    
    return filtered;
  }, [leads, user, statusFilter, sortOption]);

  const stats: Stats = useMemo(() => {
    const userTotalLeads = leads.filter(lead => lead.assignedAgent === user);

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    const startOfWeek = new Date(today);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); 
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const callsThisWeek = userTotalLeads.filter((l) => {
      if (!l.lastContact) return false;
      const contactDate = new Date(l.lastContact);
      contactDate.setHours(0,0,0,0); 
      return contactDate >= startOfWeek;
    }).length;

    return {
      total: userTotalLeads.length,
      calledToday: userTotalLeads.filter((l) => l.lastContact === todayStr).length,
      weeklyProgress: callsThisWeek,
      weeklyGoal: 100,
      new: userTotalLeads.filter((l) => l.status === 'New').length,
      closed: userTotalLeads.filter((l) => l.status === 'Closed').length,
      followUp: userTotalLeads.filter((l) => l.status === 'Follow Up').length,
    };
  }, [leads, user]);

  const handleStartCall = (lead: Lead) => {
    setActiveLead(lead);
    setView('call');
  };

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
    
    if (updatedLead.status === 'Closed') {
      setTriggerCelebration(true);
      setTimeout(() => setTriggerCelebration(false), 5000);
    }

    setActiveLead(null);
    setView('leads');
  };

  const handleCancelCall = () => {
    setActiveLead(null);
    setView('leads');
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = parseCSV(text);
        
        const existingPhones = new Set(leads.map(l => l.phone.replace(/\D/g, '')));
        const existingEmails = new Set(leads.map(l => l.email.toLowerCase()));

        const newLeads = parsed.filter(l => {
            const p = l.phone.replace(/\D/g, '');
            const e = l.email.toLowerCase();
            if (p && existingPhones.has(p)) return false;
            if (e && existingEmails.has(e)) return false;
            return true;
        }).map((l, index) => ({
            ...l,
             assignedAgent: AGENTS[index % AGENTS.length]
        }));
        
        if (newLeads.length > 0) {
            setLeads(prev => [...prev, ...newLeads]);
            alert(`Successfully imported ${newLeads.length} new leads. They have been distributed among all agents.`);
        } else {
            alert("No new valid leads found in CSV (duplicates skipped).");
        }
      } catch (error) {
        console.error("CSV Parse Error", error);
        alert("Error parsing CSV file.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const downloadCSV = () => {
    const headers = ['School Name', 'ADMIN FIRST NAME', 'ADMIN EMAIL', 'Telephone Number', 'Called Y/N', 'Response Notes', 'Assigned Agent', 'Status', 'Last Contact'];
    const csvRows = [headers.join(',')];

    leads.forEach(lead => {
        const row = [
            `"${lead.company}"`,
            `"${lead.firstName} ${lead.lastName}"`,
            `"${lead.email}"`,
            `"${lead.phone}"`,
            `"${lead.status === 'New' ? '' : 'Yes'}"`,
            `"${lead.notes.replace(/"/g, '""')}"`,
            `"${lead.assignedAgent || ''}"`,
            `"${lead.status}"`,
            `"${lead.lastContact || ''}"`
        ];
        csvRows.push(row.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'updated_leads_export.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };


  if (!user) {
    return <LoginScreen onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-brand-light selection:text-white">
      {triggerCelebration && <CelebrationOverlay />}
      
      {/* Header is now only shown in non-dashboard views or can be modified */}
      {view !== 'dashboard' && (
         <Header 
           view={view} 
           setView={setView} 
           user={user} 
           onLogout={() => setUser(null)} 
         />
      )}
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept=".csv" 
        className="hidden" 
      />

      {/* Render new Dashboard when in dashboard view */}
      {view === 'dashboard' && (
        <Dashboard 
          user={user} 
          stats={stats} 
          recommendedLeads={myLeads.filter(l => ['New', 'Follow Up'].includes(l.status)).slice(0, 5)}
          onStartPowerHour={() => {
             const nextLead = myLeads.find((l) => l.status === 'New');
             if (nextLead) handleStartCall(nextLead);
             else setView('leads');
          }}
          onExport={downloadCSV}
          onViewAll={() => setView('leads')}
          onCallLead={handleStartCall}
        />
      )}

      {/* Only wrap other views in container */}
      {view !== 'dashboard' && (
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          
          {view === 'leads' && (
            <div className="animate-fade-in space-y-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <h2 className="text-3xl font-bold text-brand-dark">
                    {statusFilter !== 'All' ? `${statusFilter} Leads` : 'Your Assigned Leads'}
                    <span className="ml-3 text-lg font-medium text-gray-400">({myLeads.length})</span>
                  </h2>
                  <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2.5 shadow-sm flex-grow md:flex-grow-0">
                      <ArrowUpDown className="w-4 h-4 text-gray-500" />
                      <select 
                        value={sortOption} 
                        onChange={(e) => setSortOption(e.target.value)}
                        className="bg-transparent border-none text-gray-600 text-sm font-medium focus:ring-0 cursor-pointer outline-none pr-2"
                      >
                        <option value="default">Sort by Default</option>
                        <option value="name">Name (A-Z)</option>
                        <option value="company">Company (A-Z)</option>
                        <option value="status">Status</option>
                        <option value="lastContact">Last Contact (Recent)</option>
                      </select>
                    </div>

                    <button 
                      onClick={() => setShowFilter(!showFilter)}
                      className={`flex-grow md:flex-grow-0 flex items-center justify-center space-x-2 px-5 py-2.5 border rounded-lg font-medium shadow-sm transition-colors ${
                        showFilter || statusFilter !== 'All'
                          ? 'bg-brand-light text-white border-brand-light' 
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <Filter className="w-4 h-4" />
                      <span>{statusFilter !== 'All' ? statusFilter : 'Filter'}</span>
                    </button>
                    <button 
                      onClick={handleImportClick}
                      className="flex-grow md:flex-grow-0 flex items-center justify-center space-x-2 px-5 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 font-medium shadow-sm transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Import CSV</span>
                    </button>
                  </div>
                </div>

                {showFilter && (
                  <div className="flex flex-wrap gap-2 p-4 bg-white border border-gray-200 rounded-xl shadow-sm animate-fade-in-up">
                    {(['All', 'New', 'In Progress', 'Follow Up', 'Closed', 'Lost'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
                          statusFilter === status
                            ? 'bg-brand-dark text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myLeads.length > 0 ? (
                  myLeads.map((lead) => (
                    <LeadCard key={lead.id} lead={lead} onCall={handleStartCall} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 bg-white rounded-xl border border-gray-200 text-gray-400 flex flex-col items-center">
                    <Filter className="w-12 h-12 mb-4 opacity-20" />
                    <p className="text-lg font-medium">No leads found matching "{statusFilter}"</p>
                    <button 
                      onClick={() => setStatusFilter('All')}
                      className="mt-4 text-brand-light hover:underline text-sm font-bold"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {view === 'call' && activeLead && (
            <CallView 
              lead={activeLead} 
              onUpdateLead={handleUpdateLead}
              onCancel={handleCancelCall}
            />
          )}
        </main>
      )}
    </div>
  );
}