import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ShieldCheck, ChevronRight } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  initials: string;
  color: string;
}

// Simplified Agent List
const AGENTS_DATA: Agent[] = [
  { id: 'Ziggy', name: 'Ziggy', initials: 'Z', color: 'from-blue-500 to-cyan-500' },
  { id: 'Nathan', name: 'Nathan', initials: 'N', color: 'from-emerald-500 to-teal-500' },
  { id: 'Veda', name: 'Veda', initials: 'V', color: 'from-purple-500 to-pink-500' },
  { id: 'Emily', name: 'Emily', initials: 'E', color: 'from-orange-500 to-amber-500' },
  { id: 'Zoe', name: 'Zoe', initials: 'Z', color: 'from-indigo-500 to-blue-500' }
];

interface LoginScreenProps {
  onLogin: (agent: string) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3], 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/2 -right-1/2 w-[100vw] h-[100vw] bg-blue-100/50 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2], 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-1/2 -left-1/2 w-[80vw] h-[80vw] bg-indigo-100/50 rounded-full blur-3xl"
        />
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl w-full relative z-10"
      >
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex justify-center mb-8"
          >
             <div className="w-24 h-24 relative drop-shadow-2xl">
               <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 25C15 19.4772 19.4772 15 25 15H65C70.5228 15 75 19.4772 75 25V45H55C32.9086 45 15 27.0914 15 5V25Z" fill="#003B5C" />
                  <path d="M85 75C85 80.5228 80.5228 85 75 85H35C29.4772 85 25 80.5228 25 75V55H45C67.0914 55 85 72.9086 85 95V75Z" fill="#0088BB" />
                  <circle cx="50" cy="50" r="12" fill="#0088BB" fillOpacity="0.2" />
               </svg>
            </div>
          </motion.div>
          
          <motion.h1 
            variants={cardVariants}
            className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight"
          >
            Language People <span className="text-brand-light">Sales Assistant</span>
          </motion.h1>
          
          <motion.p 
            variants={cardVariants}
            className="text-slate-500 flex items-center justify-center gap-2 font-medium text-lg"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            Authorized Personnel Access
          </motion.p>
        </div>

        {/* Agent Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {AGENTS_DATA.map((agent) => (
            <motion.button
              key={agent.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 400 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onLogin(agent.id)}
              className="relative group bg-white/80 backdrop-blur-md rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xl hover:shadow-2xl border border-white/50 transition-all duration-300"
            >
              {/* Animated Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${agent.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
              
              <div className="relative z-10 mb-6">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-24 h-24 rounded-full bg-gradient-to-br ${agent.color} p-[4px] shadow-lg mx-auto`}
                >
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl font-bold text-slate-700">
                    {agent.initials}
                  </div>
                </motion.div>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 transition-colors">
                  {agent.name}
                </h3>
              </div>

              {/* Hover Indicator */}
              <motion.div 
                className="absolute bottom-4 opacity-0 group-hover:opacity-100 text-blue-500"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.div>
            </motion.button>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div 
          variants={cardVariants}
          className="text-center mt-16"
        >
          <p className="text-sm text-slate-400 font-medium tracking-widest uppercase">
            v3.0.0 • Secure System
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};