import React, { useState } from 'react';
import { 
  Phone, Copy, MessageSquare, RefreshCw, FileText, ClipboardCopy, XCircle 
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
  const [callNotes, setCallNotes] = useState('');
  const [draftEmail, setDraftEmail] = useState('');
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('');
  const [emailCopyFeedback, setEmailCopyFeedback] = useState('');

  const handleCopyNumber = async (number: string) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopyFeedback('Copied!');
    } catch (e) {
      setCopyFeedback('Error');
    }
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(draftEmail);
      setEmailCopyFeedback('Copied for Outlook!');
    } catch (e) {
      setEmailCopyFeedback('Error');
    }
    setTimeout(() => setEmailCopyFeedback(''), 3000);
  };

  const handleDraftEmail = async () => {
    setIsGeneratingEmail(true);
    const notes = callNotes || "No specific notes.";
    // Removed lastName from function call as it is unused in the service
    const email = await generateFollowUpEmail(lead.firstName, lead.company, notes);
    setDraftEmail(email);
    setIsGeneratingEmail(false);
  };

  const updateStatus = (newStatus: LeadStatus, suffix: string = "") => {
    const today = new Date().toISOString().split('T')[0];
    const combinedNote = [callNotes.trim(), suffix].filter(Boolean).join(" ").trim();
    let newNotes = lead.notes || "";
    
    if (combinedNote) {
        newNotes = `${newNotes}${newNotes ? "\n" : ""}[${today}]: ${combinedNote}`;
    }

    onUpdateLead({
        ...lead,
        status: newStatus,
        lastContact: today,
        notes: newNotes
    });
  };

  return (
    <div className="animate-fade-in flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] min-h-[600px]">
      {/* Left Panel: Lead Info & Script */}
      <div className="lg:w-2/3 flex flex-col gap-6 h-full">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start relative overflow-hidden shrink-0">
          <div className="absolute top-0 left-0 w-2 h-full bg-brand-light"></div>
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-4 mb-2">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
                {lead.firstName} {lead.lastName}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                  lead.status === 'New'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}
              >
                {lead.status}
              </span>
            </div>
            <p className="text-xl text-gray-500 mb-6 font-medium">{lead.company}</p>
            <div className="flex items-center space-x-4">
              <a
                href={`tel:${lead.phone}`}
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-3 md:px-8 md:py-4 rounded-xl shadow-lg flex items-center space-x-3 transition-all hover:-translate-y-0.5 font-bold text-lg md:text-xl"
              >
                <Phone className="w-6 h-6" />
                <span>Dial {lead.phone}</span>
              </a>
              <button
                onClick={() => handleCopyNumber(lead.phone)}
                className="border-2 border-gray-200 bg-white text-gray-500 px-5 py-4 rounded-xl hover:border-brand-light hover:text-brand-light transition-all relative group"
                title="Copy to clipboard"
              >
                <Copy className="w-6 h-6" />
                {copyFeedback && (
                  <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-brand-dark text-white text-xs font-bold py-1 px-3 rounded shadow-lg whitespace-nowrap">
                    {copyFeedback}
                  </span>
                )}
              </button>
            </div>
          </div>
          <div className="text-right text-sm text-gray-500 bg-slate-50 p-5 rounded-xl border border-slate-100 hidden md:block min-w-[200px]">
            <p className="mb-2">
              Timezone: <strong className="text-gray-800">{lead.timezone}</strong>
            </p>
            <p className="mb-2">
              Hours: <strong className="text-gray-800">{lead.officeHours}</strong>
            </p>
            <p>
              Email:{' '}
              <a
                href={`mailto:${lead.email}`}
                className="text-brand-light hover:underline font-bold truncate block max-w-[200px]"
              >
                {lead.email}
              </a>
            </p>
          </div>
        </div>
        <div className="flex-grow min-h-0">
          <CallScript lead={lead} />
        </div>
      </div>

      {/* Right Panel: Action & Notes */}
      <div className="lg:w-1/3 bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden h-full">
        <div className="p-5 border-b border-gray-200 bg-brand-dark text-white shrink-0">
          <h3 className="font-bold flex items-center text-lg">
            <MessageSquare className="w-5 h-5 mr-2 text-brand-light" />
            Call Outcome & Notes
          </h3>
        </div>

        <div className="p-6 flex-grow flex flex-col space-y-4 min-h-0 overflow-y-auto">
          {lead.notes && (
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-sm text-gray-700 max-h-32 overflow-y-auto shadow-inner shrink-0">
              <strong className="block text-amber-900 mb-1 text-xs uppercase tracking-wide">
                Previous History
              </strong>
              <p className="whitespace-pre-line">{lead.notes}</p>
            </div>
          )}

          <div className="flex-grow flex flex-col min-h-[200px]">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-gray-700">Current Call Notes</label>
              {!draftEmail && (
                <button
                  onClick={handleDraftEmail}
                  disabled={isGeneratingEmail}
                  className="text-xs flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors disabled:opacity-50 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100"
                >
                  {isGeneratingEmail ? (
                    <RefreshCw className="w-3 h-3 animate-spin mr-1" />
                  ) : (
                    <FileText className="w-3 h-3 mr-1" />
                  )}
                  {isGeneratingEmail ? 'Drafting...' : 'Draft Follow-up Email'}
                </button>
              )}
            </div>

            {!draftEmail ? (
              <textarea
                className="w-full flex-grow border-2 border-gray-200 rounded-xl p-4 focus:ring-0 focus:border-brand-light outline-none text-base transition-colors resize-none bg-slate-50"
                placeholder="Type outcome here, then click Draft Follow-up Email to create a template..."
                value={callNotes}
                onChange={(e) => setCallNotes(e.target.value)}
              ></textarea>
            ) : (
              <div className="flex-grow flex flex-col border-2 border-indigo-100 bg-indigo-50 rounded-xl p-4 overflow-hidden relative group">
                <p className="text-sm text-indigo-900 whitespace-pre-wrap font-sans mb-8 overflow-y-auto flex-grow">
                  {draftEmail}
                </p>

                <div className="absolute bottom-0 left-0 right-0 p-2 bg-indigo-100/90 border-t border-indigo-200 flex justify-between items-center backdrop-blur-sm">
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded shadow-sm flex-grow mr-2 transition-colors"
                  >
                    <ClipboardCopy className="w-4 h-4 mr-2" />
                    {emailCopyFeedback || 'Copy for Outlook'}
                  </button>
                  <button
                    onClick={() => setDraftEmail('')}
                    className="text-gray-500 hover:text-red-600 p-2"
                    title="Discard"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0 pt-4">
            <button
              onClick={() => updateStatus('Follow Up', '(No Answer)')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-lg font-bold text-sm transition-colors"
            >
              No Answer
            </button>
            <button
              onClick={() => updateStatus('Follow Up', '(Left VM)')}
              className="bg-orange-100 hover:bg-orange-200 text-orange-700 py-3 rounded-lg font-bold text-sm transition-colors"
            >
              Left Voicemail
            </button>
            <button
              onClick={() => updateStatus('Lost', '(Not Interested)')}
              className="bg-red-50 hover:bg-red-100 text-red-700 py-3 rounded-lg font-bold text-sm transition-colors"
            >
              Not Interested
            </button>
            <button
              onClick={() => updateStatus('In Progress', '(Interested)')}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 rounded-lg font-bold text-sm transition-colors"
            >
              Interested
            </button>
            <button
              onClick={() => updateStatus('Closed', '(Sale Closed)')}
              className="col-span-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold text-sm transition-colors shadow-md"
            >
              Sale Closed!
            </button>
          </div>

          <button
            onClick={onCancel}
            className="w-full pt-2 text-gray-400 text-xs hover:text-gray-600 font-medium text-center shrink-0"
          >
            Cancel Call
          </button>
        </div>
      </div>
    </div>
  );
};