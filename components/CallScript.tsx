import React, { useState } from 'react';
import { MessageSquare, Copy, Check, Zap, PhoneForwarded } from 'lucide-react';
import { Lead } from '../types';

interface CallScriptProps {
  lead: Lead;
}

// --- DATA: SALES SCRIPTS ---
const salesScripts = [
  // SECTION 1: INTRODUCTION
  {
    id: "intro_1",
    section: "Opener",
    title: "The Introduction",
    text: "Hi, is this [Name]? Hi [Name], I’m Ziggy with Language People. I work with schools and agencies that serve a lot of multilingual families, and I help them make sure language is never the reason a parent or client is confused or unhappy. Do you have about 30 seconds for me to share why I’m calling?"
  },
  {
    id: "intro_2",
    section: "Opener",
    title: "The Short Story (Problem)",
    text: "We talk to a lot of schools and clinics that have great staff but no simple way to handle it when a parent or client doesn’t speak English well. In the moment, people scramble: they pull a bilingual staff member out of their job, or they hope their vendor can pick up quickly. It creates stress, delays, and sometimes real risk if something important is misunderstood. Language People steps in to make that moment calm and predictable instead of chaotic."
  },

  // SECTION 2: THE PITCHES
  {
    id: "pitch_general",
    section: "Pitch",
    title: "One-Liner (General)",
    text: "Short version: we give your staff a single number and set of tools they can use to reach professional interpreters by phone, video, or in person, and you simply pay as you go when you use it. No demos, no big setup – just real support when you actually need it."
  },
  {
    id: "pitch_no_provider",
    section: "Pitch",
    title: "Scenario: No Provider",
    text: "If you don’t have a formal provider now, that actually makes this simple. We set your school or agency up as a customer in our dispatch system. The next time a non-English-speaking parent or client needs to talk, your staff call our number, tell us the language, and our dispatch team connects a qualified interpreter. You’re only billed when you request an interpreter under your account – so it’s truly pay-as-you-go, not a subscription."
  },
  {
    id: "pitch_bilingual_staff",
    section: "Pitch",
    title: "Scenario: Relies on Staff",
    text: "What you do now is very common – grabbing whoever speaks the language. The downside is that it pulls staff away from their real jobs, and they’re not trained interpreters, so important details can be missed. With Language People, your staff keep doing what they’re hired to do. When language comes up, they call our number, and a professional joins by phone or video. You still have your bilingual staff, but you’re not leaning on them for every high-stakes conversation."
  },
  {
    id: "pitch_has_vendor",
    section: "Pitch",
    title: "Scenario: Has a Vendor",
    text: "It’s great that you already have a provider. I’m not asking you to switch. Most organizations that talk to us use Language People as a backup and overflow solution for when their main vendor can’t find a specific language, or they’re stuck on hold. Because we’re pay-as-you-go, there’s no downside to having us in your system as a second option – you only see a bill when you actually use us."
  },

  // SECTION 3: THE CLOSE
  {
    id: "close_1",
    section: "Close",
    title: "The Standard Close",
    text: "Here’s what I’d suggest as a next step to make this real but still low-pressure: We set you up as a pay-as-you-go account in our system. There’s no monthly fee and no requirement to use us. It just means that the next time your staff need an interpreter, they can call us and we’ll handle it. What’s the best email for me to send the basic agreement and staff instructions to?"
  },
  {
    id: "close_hesitant",
    section: "Close",
    title: "Close for Hesitant Prospects",
    text: "No worries – I’ll send a one-page overview and the basic terms so you can share it with your principal or director. Once you’re set up, you can try us the next time a situation comes up, and if you never need us, you never pay us."
  },

  // SECTION 4: REHASH / OBJECTIONS
  {
    id: "obj_budget",
    section: "Rehash",
    title: "Obj: Budget / Cost",
    text: "Totally understand. The good news is this is not a big contract – it’s pay-as-you-go. Having the account open is free; you only see charges when you actually bring an interpreter into a conversation."
  },
  {
    id: "obj_vendor",
    section: "Rehash",
    title: "Obj: Already have a Vendor",
    text: "Right, and we’re not trying to replace them. Think of us as your contingency plan. If your main vendor covers it, great. If they’re busy or can’t provide the language, you have a backup. No extra cost to keep us on file."
  },
  {
    id: "obj_rare",
    section: "Rehash",
    title: "Obj: We rarely need this",
    text: "True, it might only come up a handful of times a year – but those are usually sensitive moments. Setting us up costs nothing and gives you a professional solution ready for those one or two times it really matters."
  },
  {
    id: "rehash_close",
    section: "Rehash",
    title: "Final Reassurance",
    text: "So just to rehash: Your staff get one simple process for language support, you only pay when you use an interpreter, and you can keep everything else you’re already doing in place. If we start with getting your account set up, would you be comfortable sharing the best contact info so I can send that over?"
  },

  // SECTION 5: VOICEMAIL
  {
    id: "voicemail_1",
    section: "Voicemail",
    title: "The 'Backup Plan' Voicemail",
    text: "Hi [Name], this is Ziggy with Language People. I’m calling because a lot of schools and agencies keep us on file as a backup for when their staff is busy or their main interpreter vendor falls through. We’re strictly pay-as-you-go, so there’s no cost to set us up as a contingency plan. I’m going to send you a quick email with the details—subject line will say 'Interpreter Backup'—but you can also reach me here at (800) 894-2345. Thanks, [Name]."
  }
];

// --- SUB-COMPONENT: Single Script Card ---
const ScriptCard: React.FC<{ script: typeof salesScripts[0] }> = ({ script }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(script.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500 mb-4 transition-all hover:shadow-md group">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-gray-800 text-lg">{script.title}</h3>
        <button 
          onClick={handleCopy}
          className="text-gray-300 hover:text-blue-600 transition-colors p-1"
          title="Copy script to clipboard"
        >
          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        </button>
      </div>
      <p className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap font-medium">{script.text}</p>
    </div>
  );
};

export const CallScript: React.FC<CallScriptProps> = ({ lead }) => {
  const [activeScriptSection, setActiveScriptSection] = useState('Opener');
  
  const scriptSections = ['Opener', 'Pitch', 'Close', 'Rehash', 'Voicemail'];
  const currentScripts = salesScripts.filter(s => s.section === activeScriptSection);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-brand-dark text-white px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-brand-light" />
          <span className="font-bold tracking-wide uppercase text-sm">Sales Process Assistant</span>
        </div>
      </div>

      {/* Navigation Tabs - using flex-wrap to fix overflow issues */}
      <div className="bg-gray-50 p-3 border-b border-gray-200">
        <div className="flex flex-wrap gap-2">
            {scriptSections.map((section) => (
            <button
                key={section}
                onClick={() => setActiveScriptSection(section)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
                activeScriptSection === section 
                    ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500 ring-offset-1' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-sm'
                }`}
            >
                {section === 'Rehash' ? 'Objection' : section}
            </button>
            ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-grow overflow-y-auto bg-slate-50">
        <div className="flex items-center space-x-2 text-gray-500 text-xs uppercase tracking-wider font-bold mb-4">
            <Zap size={12} className="text-amber-500" />
            <span>Current Phase: {activeScriptSection}</span>
        </div>

        {currentScripts.map((script) => (
            <ScriptCard key={script.id} script={script} />
        ))}

        {/* Contextual Hints */}
        {activeScriptSection === 'Pitch' && (
            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 text-yellow-800 text-xs mt-4 flex items-start gap-2 animate-fade-in">
            <div className="mt-0.5"><Zap size={14}/></div>
            <p><strong>Pro Tip:</strong> Listen carefully to identify if they rely on bilingual staff or an external vendor, then read the matching card above.</p>
            </div>
        )}
      </div>
    </div>
  );
};