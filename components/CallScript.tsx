import React, { useState } from 'react';
import { FileText, UserX, HelpCircle, Target, PhoneForwarded } from 'lucide-react';
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
              <p className="text-xl text-brand-dark font-bold mb-2">"Hi, is this {lead.firstName}?"</p>
              <p className="text-gray-600 text-sm italic">Wait for confirmation...</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-gray-700 leading-relaxed text-lg">
                "Hi {lead.firstName}, this is <strong>[Your Name]</strong> with <span className="text-brand-dark font-bold">Language People</span>. 
                I noticed {lead.company} serves a diverse community, and I am reaching out because we help organizations like yours bridge language barriers and reduce liability risk.
                <br/><br/>
                <strong>Do you have 30 seconds so I can tell you why I am calling?</strong>"
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-gray-600">
              <p className="font-bold mb-1 text-gray-800">If they ask: "Is this a sales call?"</p>
              "It is an outreach call, yes. My goal is just to see if we might be a useful backup resource for you. If it does not sound helpful, you can tell me no."
            </div>
          </div>
        );
      case 'discovery':
        return (
          <div className="space-y-4 animate-fade-in-up">
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-brand-dark mb-3 flex items-center"><HelpCircle className="w-4 h-4 mr-2"/> Discovery Questions</h3>
              <ul className="space-y-4">
                <li className="text-gray-700">
                  "Just so I do not waste your time, <strong>how are you currently handling it when a parent or client does not speak English?</strong>"
                </li>
                <li className="text-gray-700">
                  "Do you use a vendor, or do you rely on bilingual staff?"
                </li>
                 <li className="text-gray-700">
                  "Where do you still run into challenges or delays with that approach?"
                </li>
              </ul>
            </div>
             <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-800">
              <strong>Listen for pain points:</strong> Long hold times, inability to find languages, staff being pulled away from their jobs.
            </div>
          </div>
        );
      case 'pitch':
        return (
          <div className="space-y-4 animate-fade-in-up">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-brand-dark mb-3">If they use Bilingual Staff:</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                "That is very common. The challenge is it pulls them away from their actual job, and there is liability if something is interpreted incorrectly. 
                <br/><br/>
                <strong>What we do is give you certified interpreters on demand, 24/7.</strong> That way your staff can stay focused, and you have a compliant solution."
              </p>
              
              <div className="border-t border-gray-100 my-4"></div>

              <h3 className="font-bold text-brand-dark mb-3">If they have a Vendor:</h3>
              <p className="text-gray-700 leading-relaxed">
                "That is great. Many of our partners use us as a <strong>backup provider</strong> for when their main vendor has long wait times or cannot find a language.
                <br/><br/>
                Having us set up costs nothing until you use us, and it prevents your staff from being stuck waiting."
              </p>
            </div>
          </div>
        );
      case 'objection':
        return (
          <div className="space-y-4 animate-fade-in-up">
             <div className="grid gap-3">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-orange-300 transition-colors">
                    <strong className="block text-orange-700 text-xs font-bold uppercase mb-2">"We already have a vendor"</strong>
                    <p className="text-gray-700 text-sm">"Totally understand. The only reason to add us is as a safety net. Setting us up costs nothing. Why not have us as a backup option so your team is never stuck?"</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-orange-300 transition-colors">
                    <strong className="block text-orange-700 text-xs font-bold uppercase mb-2">"We use bilingual staff"</strong>
                    <p className="text-gray-700 text-sm">"That is great. But it pulls them away from work and creates liability risks. Our certified interpreters protect your staff. Would it help to have us ready for high-risk conversations?"</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-orange-300 transition-colors">
                    <strong className="block text-orange-700 text-xs font-bold uppercase mb-2">"No Budget"</strong>
                    <p className="text-gray-700 text-sm">"I get that. We are pay-as-you-go. No monthly fees. You only pay when you use us. Does that sound more workable?"</p>
                </div>
                 <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-orange-300 transition-colors">
                    <strong className="block text-orange-700 text-xs font-bold uppercase mb-2">"Send me info"</strong>
                    <p className="text-gray-700 text-sm">"I will email you a one-pager. I've found a 5-minute demo is much better than a cold doc. Can we schedule a short demo next Tuesday so you can see it live?"</p>
                </div>
             </div>
          </div>
        );
      case 'close':
        return (
            <div className="space-y-4 animate-fade-in-up">
               <div className="bg-green-50 p-5 rounded-xl border-l-4 border-green-500 shadow-sm">
                <strong className="block text-green-900 text-sm font-bold uppercase mb-2 flex items-center"><Target className="w-4 h-4 mr-2"/>Primary Close: Backup Vendor</strong>
                <p className="text-gray-800">
                    "I think we would be very useful as a backup option. I will send over a short service agreement, and once that is in place your team can call whenever they need. <strong>Who is the best person to send that to?</strong>"
                </p>
               </div>
               
               <div className="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-500 shadow-sm">
                <strong className="block text-blue-900 text-sm font-bold uppercase mb-2 flex items-center"><Target className="w-4 h-4 mr-2"/>Demo Close</strong>
                <p className="text-gray-800">
                    "To make this real for you, I would like to show you exactly how your staff would connect. <strong>Can we schedule a 10-minute demo sometime this week?</strong>"
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
              <p className="text-gray-800 italic font-medium">
                "I apologize for the confusion we were attempting to reach them about interpreting services they had inquired about, may I ask if you may be open to viewing our rate sheet for our interpreting services?"
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <p className="text-gray-700 leading-relaxed mb-2 font-bold text-sm text-brand-dark uppercase">Follow Up Questions</p>
               <ul className="space-y-3">
                <li className="flex items-start text-gray-700 bg-slate-50 p-3 rounded-lg">
                  <span className="font-bold text-brand-light mr-2">1.</span> 
                  "Who has taken over their responsibilities regarding language services?"
                </li>
                <li className="flex items-start text-gray-700 bg-slate-50 p-3 rounded-lg">
                  <span className="font-bold text-brand-light mr-2">2.</span> 
                  "Do you have their direct email so I can update my records?"
                </li>
              </ul>
            </div>
          </div>
        );
      case 'voicemail':
        return (
          <div className="bg-slate-50 p-6 rounded-xl border-2 border-dashed border-gray-300 animate-fade-in-up">
            <div className="flex items-center text-gray-500 mb-3">
                <PhoneForwarded className="w-5 h-5 mr-2"/>
                <span className="font-bold text-xs uppercase">Voicemail Script</span>
            </div>
            <p className="text-gray-700 leading-relaxed font-mono text-sm">
              "Hi {lead.firstName}, this is [Your Name] with Language People. I am calling to share how we can help
              {lead.company} reduce costs and liability on interpretation services. I will try you again next week, or you can reach me at (800) 894-2345."
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const tabs = [
      { id: 'intro', label: '1. Intro' },
      { id: 'discovery', label: '2. Discovery' },
      { id: 'pitch', label: '3. Pitch' },
      { id: 'objection', label: '4. Objection' },
      { id: 'close', label: '5. Close' },
      { id: 'person left', label: 'Person Left' },
      { id: 'voicemail', label: 'Voicemail' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 h-full flex flex-col overflow-hidden">
      <div className="bg-brand-dark text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <FileText className="w-5 h-5 mr-2 text-brand-light" />
          <span className="font-bold tracking-wide uppercase text-sm">Sales Process Assistant</span>
        </div>
      </div>
      <div className="bg-gray-50 p-2 flex space-x-1 overflow-x-auto border-b border-gray-200 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 py-2 text-xs font-bold uppercase tracking-wide rounded-lg transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white text-brand-dark shadow-md transform scale-[1.02] border border-gray-100'
                : 'text-gray-500 hover:bg-gray-200'
            } ${tab.id === 'person left' || tab.id === 'voicemail' ? 'text-amber-600' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-6 flex-grow overflow-y-auto bg-white">{renderContent()}</div>
    </div>
  );
};