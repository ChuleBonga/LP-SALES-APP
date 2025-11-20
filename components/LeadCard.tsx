import React from 'react';
import { Phone, Clock } from 'lucide-react';
import { Lead } from '../types';

interface LeadCardProps {
  lead: Lead;
  onCall: (lead: Lead) => void;
}

export const LeadCard: React.FC<LeadCardProps> = ({ lead, onCall }) => (
  <div
    className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all hover:border-brand-light flex justify-between items-center group cursor-pointer h-full"
    onClick={() => onCall(lead)}
  >
    <div className="flex-1 min-w-0 pr-4">
      <h3 className="font-bold text-gray-800 text-lg group-hover:text-brand-dark transition-colors truncate">
        {lead.firstName} {lead.lastName}
      </h3>
      <p className="text-sm text-gray-500 font-medium truncate">{lead.company}</p>
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span
          className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border 
          ${
            lead.status === 'New'
              ? 'bg-blue-50 text-blue-700 border-blue-100'
              : lead.status === 'Closed'
              ? 'bg-green-50 text-green-700 border-green-100'
              : lead.status === 'Lost'
              ? 'bg-red-50 text-red-700 border-red-100'
              : lead.status === 'In Progress'
              ? 'bg-yellow-50 text-yellow-700 border-yellow-100'
              : 'bg-gray-100 text-gray-600 border-gray-200'
          }`}
        >
          {lead.status}
        </span>
        {lead.lastContact && (
          <span className="text-[10px] text-gray-400 flex items-center font-medium whitespace-nowrap">
            <Clock className="w-3 h-3 mr-1" /> {lead.lastContact}
          </span>
        )}
      </div>
    </div>
    <button
      className="w-12 h-12 rounded-full bg-slate-100 text-brand-light flex items-center justify-center group-hover:bg-brand-light group-hover:text-white transition-all duration-300 shadow-sm shrink-0"
      title="Start Call"
    >
      <Phone className="w-5 h-5" />
    </button>
  </div>
);