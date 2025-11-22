import React, { useState } from 'react';
import { 
  Phone, MessageSquare, RefreshCw, FileText, ClipboardCopy 
} from 'lucide-react';
import { CallScript } from './CallScript';
import { Lead, LeadStatus } from '../types';
import { generateFollowUpEmail } from '../services/geminiService';

interface CallViewProps {
  lead: Lead;
  onUpdateLead: (lead: Lead) => void;
  onCancel: () => void;
}

export const CallView: React.FC<CallViewProps> = ({ lead, onUpdateLead, onCancel }) => {
  const [callNotes, setCallNotes] = useState(lead.notes || '');
  const [emailDraft, setEmailDraft] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleEndCall = (status: LeadStatus) => {
    const updatedLead: Lead = {
      ...lead,
      status,
      notes: callNotes,
      lastContact: new Date().toISOString().split('T')[0],
    };
    onUpdateLead(updatedLead);
  };

  const handleGenerateEmail = async () => {
    setIsGenerating(true);
    try {
      const draft = await generateFollowUpEmail(lead.firstName, lead.company, callNotes);
      setEmailDraft(draft);
    } catch (error) {
      console.error("Failed to generate email", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        // Optional: Add toast notification logic here if available
        alert("Email draft copied to clipboard!");
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in h-full">
      {/* Left Column: Call Script */}
      <div className="lg:col-span-1 h-full min-h-[600px]">
         <CallScript lead={lead} />
      </div>

      {/* Center/Right: Actions & Notes */}
      <div className="lg:col-span-2 space-y-6 flex flex-col">
        {/* Call Control Header */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-800 flex items-center">
               <Phone className="w-6 h-6 mr-2 text-brand-light animate-pulse" />
               In Call: {lead.firstName} {lead.lastName}
            </h2>
            <p className="text-gray-500 font-medium">{lead.company} • {lead.phone}</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
             <button onClick={onCancel} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-bold text-sm transition-colors border border-transparent hover:border-gray-200">
               Cancel
             </button>
             <button onClick={() => handleEndCall('Follow Up')} className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold text-sm shadow-sm transition-colors">
               Follow Up / No Answer
             </button>
             <button onClick={() => handleEndCall('Lost')} className="px-5 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-bold text-sm shadow-sm transition-colors">
               Not Interested
             </button>
             <button onClick={() => handleEndCall('Closed')} className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-sm shadow-sm transition-colors">
               Closed Won
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Notes Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col min-h-[300px]">
            <div className="flex items-center mb-4 text-gray-700">
               <FileText className="w-5 h-5 mr-2" />
               <h3 className="font-bold text-lg">Call Notes</h3>
            </div>
            <textarea 
              className="flex-grow w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-light focus:border-transparent resize-none bg-slate-50 font-medium text-gray-700"
              placeholder="Type notes from your conversation here... (e.g., 'Asked for rate sheet', 'Already has vendor')"
              value={callNotes}
              onChange={(e) => setCallNotes(e.target.value)}
            />
          </div>

          {/* Email Generator */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col min-h-[300px]">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center text-gray-700">
                 <MessageSquare className="w-5 h-5 mr-2" />
                 <h3 className="font-bold text-lg">Follow-up Email</h3>
               </div>
               <button 
                 onClick={handleGenerateEmail}
                 disabled={isGenerating}
                 className="text-xs bg-brand-light text-white px-4 py-2 rounded-full hover:bg-brand-dark transition-colors flex items-center disabled:opacity-50 font-bold shadow-sm"
               >
                 <RefreshCw className={`w-3 h-3 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                 {isGenerating ? 'Drafting...' : 'Generate Draft'}
               </button>
            </div>
            
            <div className="relative flex-grow border border-gray-200 rounded-lg bg-slate-50 p-4 overflow-y-auto text-sm font-mono whitespace-pre-wrap text-gray-600">
               {emailDraft ? emailDraft : <div className="flex flex-col items-center justify-center h-full opacity-40">
                  <MessageSquare className="w-8 h-8 mb-2" />
                  <span className="text-center">Add notes and click 'Generate Draft'<br/>to create a personalized email.</span>
               </div>}
               
               {emailDraft && (
                 <button 
                   onClick={() => copyToClipboard(emailDraft)}
                   className="absolute top-2 right-2 p-2 bg-white rounded-md shadow-sm text-gray-500 hover:text-brand-light border border-gray-200 transition-all hover:scale-105"
                   title="Copy to Clipboard"
                 >
                   <ClipboardCopy className="w-4 h-4" />
                 </button>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};