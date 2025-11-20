import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { StatCard } from './components/StatCard';
import { LeadCard } from './components/LeadCard';
import { CallView } from './components/CallView';
import { LoginScreen } from './components/LoginScreen';
import { 
  Phone, Clock, BarChart2, User as UserIcon, Filter, FileText, ChevronRight, Target
} from 'lucide-react';
import { Lead, ViewState, Stats, LeadStatus } from './types';
import { INITIAL_LEADS } from './constants';

export default function App() {
  const [user, setUser] = useState<string | null>(null);
  
  const [leads, setLeads] = useState<Lead[]>(() => {
    if (typeof window === "undefined") {
      return INITIAL_LEADS;
    }
    try {
      const saved = window.localStorage.getItem("lp_leads_live");
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  const [view, setView] = useState<ViewState>('dashboard');
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Persist leads to local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("lp_leads_live", JSON.stringify(leads));
      } catch (e) {
        console.error("Failed to save leads to localStorage", e);
      }
    }
  }, [leads]);

  // Filter leads for the current user
  const myLeads = useMemo(() => {
    if (!user) return [];
    return leads.filter(lead => lead.assignedAgent === user);
  }, [leads, user]);

  const stats: Stats = useMemo(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Calculate start of current week (Monday)
    const startOfWeek = new Date(today);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const callsThisWeek = myLeads.filter((l) => {
      if (!l.lastContact) return false;
      const contactDate = new Date(l.lastContact);
      // Reset hours to ensure fair date comparison
      contactDate.setHours(0,0,0,0); 
      return contactDate >= startOfWeek;
    }).length;

    return {
      total: myLeads.length,
      calledToday: myLeads.filter((l) => l.lastContact === todayStr).length,
      weeklyProgress: callsThisWeek,
      weeklyGoal: 100,
      new: myLeads.filter((l) => l.status === 'New').length,
      closed: myLeads.filter((l) => l.status === 'Closed').length,
      followUp: myLeads.filter((l) => l.status === 'Follow Up').length,
    };
  }, [myLeads]);

  const handleStartCall = (lead: Lead) => {
    setActiveLead(lead);
    setView('call');
  };

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
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

  const parseCSV = (text: string): Lead[] => {
    const lines = text.split(/\r\n|\n/);
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/^"|"$/g, ''));
    
    const mapHeader = (key: string) => headers.findIndex(h => h.includes(key));

    const idxFirst = mapHeader('first');
    const idxLast = mapHeader('last');
    const idxCompany = mapHeader('company');
    const idxPhone = mapHeader('phone');
    const idxEmail = mapHeader('email');
    const idxStatus = mapHeader('status');
    const idxNotes = mapHeader('note');
    
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

      const firstName = idxFirst !== -1 ? cols[idxFirst] : 'Unknown';
      const lastName = idxLast !== -1 ? cols[idxLast] : '';
      const company = idxCompany !== -1 ? cols[idxCompany] : 'Unknown Company';
      
      if (firstName === 'Unknown' && company === 'Unknown Company') continue;

      const rawStatus = idxStatus !== -1 ? cols[idxStatus] : 'New';
      const validStatuses: LeadStatus[] = ['New', 'In Progress', 'Follow Up', 'Closed', 'Lost'];
      const status: LeadStatus = validStatuses.includes(rawStatus as LeadStatus) 
        ? (rawStatus as LeadStatus) 
        : 'New';

      newLeads.push({
        id: currentId++,
        firstName,
        lastName,
        company,
        phone: idxPhone !== -1 ? cols[idxPhone] : '',
        email: idxEmail !== -1 ? cols[idxEmail] : '',
        status,
        notes: idxNotes !== -1 ? cols[idxNotes] : '',
        lastContact: null,
        timezone: 'PST',
        officeHours: '9:00 AM - 5:00 PM',
        assignedAgent: user || undefined // Assign to current user
      });
    }
    return newLeads;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const newLeads = parseCSV(text);
        if (newLeads.length > 0) {
            setLeads(prev => [...prev, ...newLeads]);
            alert(`Successfully imported ${newLeads.length} leads. They have been assigned to you.`);
        } else {
            alert("No valid leads found in CSV.");
        }
      } catch (error) {
        console.error("CSV Parse Error", error);
        alert("Error parsing CSV file.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (!user) {
    return <LoginScreen onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-brand-light selection:text-white">
      <Header 
        view={view} 
        setView={setView} 
        user={user} 
        onLogout={() => setUser(null)} 
      />
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept=".csv" 
        className="hidden" 
      />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* DASHBOARD VIEW */}
        {view === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-8 gap-4">
              <div>
                <h2 className="text-4xl font-extrabold text-brand-dark tracking-tight">
                  Good Afternoon, {user}
                </h2>
                <p className="text-gray-500 mt-2 text-lg">
                  You are <span className="font-bold text-brand-light">{Math.max(0, stats.weeklyGoal - stats.weeklyProgress)}</span> calls away from your weekly goal.
                </p>
              </div>
              <button
                onClick={() => {
                  const nextLead = myLeads.find((l) => l.status === 'New');
                  if (nextLead) handleStartCall(nextLead);
                  else setView('leads');
                }}
                className="bg-gradient-to-r from-brand-dark to-brand-light hover:from-[#002a42] hover:to-[#0077a3] text-white px-8 py-4 rounded-full shadow-lg flex items-center space-x-3 transition-all transform hover:scale-105 font-bold text-lg w-full md:w-auto justify-center"
              >
                <Phone className="w-6 h-6 animate-pulse" />
                <span>Start Power Hour</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Custom Weekly Goal Card */}
              <div className="bg-white p-6 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center space-x-4 hover:-translate-y-1 transition-transform duration-300 group cursor-default">
                <div className="p-4 rounded-full bg-teal-50 bg-opacity-50 group-hover:bg-opacity-100 transition-all">
                  <Target className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Weekly Goal</p>
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-3xl font-extrabold text-gray-800 mt-1">{stats.weeklyProgress}</h3>
                    <span className="text-sm text-gray-400 font-semibold">/ {stats.weeklyGoal}</span>
                  </div>
                </div>
              </div>

              <StatCard title="Calls Made Today" value={stats.calledToday} icon={Phone} color="text-blue-600" bgColor="bg-blue-50" />
              <StatCard title="Needs Call Back" value={stats.followUp} icon={Clock} color="text-amber-500" bgColor="bg-amber-50" />
              <StatCard title="Closed Deals" value={stats.closed} icon={BarChart2} color="text-green-500" bgColor="bg-green-50" />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-xl text-brand-dark">Recommended Next Calls</h3>
                <button
                  onClick={() => setView('leads')}
                  className="text-brand-light text-sm font-bold hover:underline flex items-center group"
                >
                  View All <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {myLeads
                  .filter((l) => ['New', 'Follow Up'].includes(l.status))
                  .slice(0, 5)
                  .map((lead) => (
                    <div
                      key={lead.id}
                      className="px-8 py-5 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-blue-50 transition-colors group cursor-pointer gap-4"
                      onClick={() => handleStartCall(lead)}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ring-2 ring-offset-2 ${
                            lead.status === 'New'
                              ? 'bg-blue-500 ring-blue-200'
                              : 'bg-amber-500 ring-amber-200'
                          }`}
                        ></div>
                        <div>
                          <p className="font-bold text-gray-800 text-lg">
                            {lead.firstName} {lead.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {lead.company} •{' '}
                            <span className="font-medium text-gray-400">{lead.timezone}</span>
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartCall(lead);
                        }}
                        className="text-brand-light bg-white border border-brand-light hover:bg-brand-light hover:text-white px-6 py-2 rounded-full text-sm font-bold transition-all shadow-sm w-full md:w-auto"
                      >
                        Call Now
                      </button>
                    </div>
                  ))}
                {myLeads.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    No leads assigned to you yet. Import some to get started!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* LEADS LIST VIEW */}
        {view === 'leads' && (
          <div className="animate-fade-in space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <h2 className="text-3xl font-bold text-brand-dark">Your Assigned Leads</h2>
              <div className="flex space-x-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-5 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 font-medium shadow-sm transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button 
                  onClick={handleImportClick}
                  className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-5 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 font-medium shadow-sm transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Import CSV</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myLeads.length > 0 ? (
                myLeads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} onCall={handleStartCall} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200 text-gray-500">
                  No leads found. Import a CSV to get started.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ACTIVE CALL VIEW */}
        {view === 'call' && activeLead && (
          <CallView 
            lead={activeLead} 
            onUpdateLead={handleUpdateLead}
            onCancel={handleCancelCall}
          />
        )}
      </main>
    </div>
  );
}