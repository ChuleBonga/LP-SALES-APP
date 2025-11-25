import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  initials: string;
  color: string;
}

// Simplified Agent List - Names only, no roles/status
const AGENTS_DATA: Agent[] = [
  {
    id: 'Ziggy',
    name: 'Ziggy',
    initials: 'Z',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'Nathan',
    name: 'Nathan',
    initials: 'N',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'Vader',
    name: 'Vader',
    initials: 'V',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'Emily',
    name: 'Emily',
    initials: 'E',
    color: 'from-orange-500 to-amber-500'
  },
  {
    id: 'Zoe',
    name: 'Zoe',
    initials: 'Z',
    color: 'from-indigo-500 to-blue-500'
  }
];

interface LoginScreenProps {
  onLogin: (agent: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
       {/* Background Elements */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl w-full relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
             <div className="w-20 h-20 relative">
               <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
                  <path d="M15 25C15 19.4772 19.4772 15 25 15H65C70.5228 15 75 19.4772 75 25V45H55C32.9086 45 15 27.0914 15 5V25Z" fill="#003B5C" />
                  <path d="M85 75C85 80.5228 80.5228 85 75 85H35C29.4772 85 25 80.5228 25 75V55H45C67.0914 55 85 72.9086 85 95V75Z" fill="#0088BB" />
                  <circle cx="50" cy="50" r="12" fill="#0088BB" fillOpacity="0.2" />
               </svg>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight"
          >
            Language People Sales Assistant
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-500 flex items-center justify-center gap-2 font-medium"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Secure access for authorized personnel
          </motion.p>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {AGENTS_DATA.map((agent, index) => (
            <motion.button
              key={agent.id}
              onClick={() => onLogin(agent.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.95 }}
              className="relative group bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg border border-slate-100 hover:border-blue-100 transition-all duration-300 overflow-hidden aspect-[4/5]"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${agent.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative z-10 mb-4">
                {/* Avatar */}
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${agent.color} p-[3px] shadow-md mx-auto`}>
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-3xl font-bold text-slate-700 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-slate-700 group-hover:to-slate-900 transition-all">
                    {agent.initials}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="relative z-10 w-full">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                  {agent.name}
                </h3>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 text-slate-400 group-hover:text-blue-500 group-hover:translate-y-[-4px] transition-all duration-300">
                <ArrowRight className="w-5 h-5" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <p className="text-xs text-slate-400 font-medium">
            v3.0.0 • Authorized Use Only
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};