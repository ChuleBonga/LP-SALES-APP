import React from 'react';
import { Globe, LogOut, User } from 'lucide-react';
import { ViewState } from '../types';

interface HeaderProps {
  view: ViewState;
  setView: (view: ViewState) => void;
  user: string;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ view, setView, user, onLogout }) => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
    <div className="container mx-auto px-4 h-24 flex items-center justify-between max-w-7xl">
      <div className="flex items-center gap-3 cursor-pointer group select-none" onClick={() => setView('dashboard')}>
        
        {/* Logo Mark - Stylized Abstract LP Shape */}
        <div className="w-12 h-12 relative flex-shrink-0">
           <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 25C15 19.4772 19.4772 15 25 15H65C70.5228 15 75 19.4772 75 25V45H55C32.9086 45 15 27.0914 15 5V25Z" fill="#003B5C" />
              <path d="M85 75C85 80.5228 80.5228 85 75 85H35C29.4772 85 25 80.5228 25 75V55H45C67.0914 55 85 72.9086 85 95V75Z" fill="#0088BB" />
              <circle cx="50" cy="50" r="12" fill="#0088BB" fillOpacity="0.2" />
           </svg>
        </div>

        {/* Logo Text Stack */}
        <div className="flex flex-col justify-center">
          <span className="text-2xl font-extrabold text-brand-dark leading-none tracking-tight -mb-0.5">Language</span>
          <div className="flex items-center text-2xl font-extrabold text-brand-light leading-none tracking-tight">
            <span>Pe</span>
            <div className="relative w-5 h-5 mx-[1px] flex items-center justify-center mt-0.5">
               <Globe className="w-full h-full text-brand-light" strokeWidth={2.5} />
            </div>
            <span>ple</span>
          </div>
          <span className="text-[9px] text-gray-400 tracking-[0.2em] uppercase font-medium mt-1.5 ml-0.5">
            Connect. Communicate.
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        <nav className="hidden md:flex space-x-2">
          <button
            onClick={() => setView('dashboard')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              view === 'dashboard'
                ? 'bg-brand-dark text-white shadow-md transform scale-105'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setView('leads')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              view === 'leads'
                ? 'bg-brand-dark text-white shadow-md transform scale-105'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            All Leads
          </button>
        </nav>

        {/* User Profile / Logout */}
        <div className="flex items-center gap-4 border-l border-gray-200 pl-6">
          <div className="flex items-center gap-3">
             <div className="w-9 h-9 rounded-full bg-brand-light/10 text-brand-light flex items-center justify-center font-bold border border-brand-light/20">
                <User className="w-5 h-5" />
             </div>
             <div className="hidden lg:block">
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Agent</p>
               <p className="text-sm font-bold text-brand-dark leading-none">{user}</p>
             </div>
          </div>
          <button 
            onClick={onLogout}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </header>
);