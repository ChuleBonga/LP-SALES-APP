import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

const AGENTS = ['Ziggy', 'Nathan', 'Veda', 'Emily', 'Zoe'];

interface LoginScreenProps {
  onLogin: (agent: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-brand-dark to-slate-50 opacity-10 z-0"></div>
      
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 relative mb-4">
             <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
                <path d="M15 25C15 19.4772 19.4772 15 25 15H65C70.5228 15 75 19.4772 75 25V45H55C32.9086 45 15 27.0914 15 5V25Z" fill="#003B5C" />
                <path d="M85 75C85 80.5228 80.5228 85 75 85H35C29.4772 85 25 80.5228 25 75V55H45C67.0914 55 85 72.9086 85 95V75Z" fill="#0088BB" />
                <circle cx="50" cy="50" r="12" fill="#0088BB" fillOpacity="0.2" />
             </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">Language People</h1>
          <p className="text-brand-light font-bold text-sm tracking-[0.3em] uppercase mt-1">Sales Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
          <div className="bg-brand-dark px-8 py-6 border-b border-gray-800">
            <h2 className="text-white font-bold text-lg flex items-center">
              <ShieldCheck className="w-5 h-5 mr-2 text-brand-light" />
              Select Agent Profile
            </h2>
            <p className="text-blue-200 text-xs mt-1">Secure access for authorized personnel</p>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 gap-3">
              {AGENTS.map((agent) => (
                <button
                  key={agent}
                  onClick={() => onLogin(agent)}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white hover:border-brand-light hover:shadow-md hover:bg-blue-50/50 transition-all group w-full text-left"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-brand-dark/5 text-brand-dark flex items-center justify-center mr-4 group-hover:bg-brand-dark group-hover:text-white transition-colors font-bold text-lg">
                      {agent.charAt(0)}
                    </div>
                    <span className="font-bold text-gray-700 group-hover:text-brand-dark text-lg">{agent}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-brand-light transform group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
          <div className="bg-slate-50 p-4 text-center border-t border-gray-100">
            <p className="text-xs text-gray-400 font-medium">Authorized Access Only • v2.4.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};