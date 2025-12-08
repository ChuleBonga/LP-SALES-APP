import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Clock, Copy, Check } from 'lucide-react';
import { Lead } from '../types';

interface LeadCardProps {
  lead: Lead;
  onCall: (lead: Lead) => void;
}

export const LeadCard: React.FC<LeadCardProps> = ({ lead, onCall }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(lead.phone);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-brand-light/30 flex justify-between items-center group cursor-pointer relative overflow-hidden"
      onClick={() => onCall(lead)}
    >
      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="flex-1 min-w-0 pr-4 pl-2">
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
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-brand-light ml-2 font-medium z-10"
          >
            {isCopied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
            {lead.phone}
          </button>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 rounded-full bg-slate-50 text-brand-light flex items-center justify-center border border-slate-200 group-hover:bg-brand-light group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-sm shrink-0"
        title="Start Call"
      >
        <Phone className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};