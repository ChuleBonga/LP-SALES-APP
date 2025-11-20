import React, { useState } from 'react';
import { FileText, CheckCircle, UserX } from 'lucide-react';
import { Lead } from '../types';

interface CallScriptProps {
  lead: Lead;
}

export const CallScript: React.FC<CallScriptProps> = ({ lead }) => {
  const [activeTab, setActiveTab] = useState('intro');

  const renderContent = () => {
    switch (activeTab) {
      case 'intro':
        return (
          <div className="space-y-4 animate-fade-in-up">
            <div className="bg-[#F0F9FC] p-6 rounded-xl border-l-4 border-brand-light shadow-sm">
              <p className="text-xl text-brand-dark font-bold">"Hi, is this {lead.firstName}?"</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-gray-700 leading-relaxed text-lg">
                "My name is <strong>[Your Name]</strong> with <span className="text-brand-dark font-bold">Language People</span>.<br /><br />
                We help organizations like <strong>{lead.company}</strong> bridge language barriers with professional interpretation."
              </p>
            </div>
          </div>
        );
      case 'value':
        return (
          <div className="space-y-4 animate-fade-in-up">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                "I noticed you work with [specific population], and we specialize in ensuring effective communication through:"
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700 bg-slate-50 p-3 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-brand-light mr-3" /> Video Remote Interpretation
                </li>
                <li className="flex items-center text-gray-700 bg-slate-50 p-3 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-brand-light mr-3" /> Face-to-Face Interpreters
                </li>
                <li className="flex items-center text-gray-700 bg-slate-50 p-3 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-brand-light mr-3" /> Document Translation
                </li>
              </ul>
            </div>
          </div>
        );
      case 'objection':
        return (
          <div className="space-y-4 animate-fade-in-up">
            <div className="p-5 bg-orange-50 border-l-4 border-orange-400 rounded-r-xl shadow-sm">
              <strong className="block text-orange-900 text-xs font-bold uppercase tracking-wider mb-2">
                "We already have a provider"
              </strong>
              <p className="text-gray-800 italic">
                "That is great to hear. Many of our clients use us as a backup for when their primary vendor cannot fill a request. Would you be open to seeing our rate sheet just for comparison?"
              </p>
            </div>
            <div className="p-5 bg-orange-50 border-l-4 border-orange-400 rounded-r-xl shadow-sm">
              <strong className="block text-orange-900 text-xs font-bold uppercase tracking-wider mb-2">
                "We use Google Translate"
              </strong>
              <p className="text-gray-800 italic">
                "I understand that is convenient, but for liability and accuracy, especially in professional settings, a certified human interpreter is often required. We can offer a free trial to show the difference."
              </p>
            </div>
          </div>
        );
      case 'person left':
        return (
          <div className="space-y-4 animate-fade-in-up">
            <div className="bg-amber-50 p-5 rounded-xl border-l-4 border-amber-400 shadow-sm">
              <strong className="flex items-center text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
                <UserX className="w-4 h-4 mr-2" />
                Contact No Longer There
              </strong>
              <p className="text-gray-800 italic">
                "Oh, I apologize. I must have outdated information. Who has taken over {lead.firstName}'s responsibilities regarding language services?"
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <p className="text-gray-700 leading-relaxed mb-2 font-bold text-sm text-brand-dark uppercase">Follow Up Questions</p>
               <ul className="space-y-3">
                <li className="flex items-start text-gray-700 bg-slate-50 p-3 rounded-lg">
                  <span className="font-bold text-brand-light mr-2">1.</span> 
                  "Do you have their direct email or extension so I can update my records?"
                </li>
                <li className="flex items-start text-gray-700 bg-slate-50 p-3 rounded-lg">
                  <span className="font-bold text-brand-light mr-2">2.</span> 
                  "Would you mind transferring me to them briefly?"
                </li>
              </ul>
            </div>
          </div>
        );
      case 'voicemail':
        return (
          <div className="bg-slate-50 p-6 rounded-xl border-2 border-dashed border-gray-300 animate-fade-in-up">
            <p className="text-gray-700 leading-relaxed font-mono text-sm">
              "Hi {lead.firstName}, this is [Your Name] with Language People. I am calling to share how we can help
              {lead.company} reduce costs on interpretation services. I will try you again next week, or you can reach me at (800) 894-2345."
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 h-full flex flex-col overflow-hidden">
      <div className="bg-brand-dark text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <FileText className="w-5 h-5 mr-2 text-brand-light" />
          <span className="font-bold tracking-wide uppercase text-sm">Live Script Assistant</span>
        </div>
      </div>
      <div className="bg-gray-50 p-2 flex space-x-1 overflow-x-auto border-b border-gray-200 scrollbar-hide">
        {['intro', 'value', 'objection', 'person left', 'voicemail'].map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 px-2 py-2 text-xs font-bold uppercase tracking-wide rounded-lg transition-all whitespace-nowrap ${
              activeTab === key
                ? 'bg-white text-brand-dark shadow-md transform scale-[1.02] border border-gray-100'
                : 'text-gray-500 hover:bg-gray-200'
            }`}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="p-6 flex-grow overflow-y-auto bg-white">{renderContent()}</div>
    </div>
  );
};