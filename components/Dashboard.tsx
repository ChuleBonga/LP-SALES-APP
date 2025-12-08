import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Phone, Clock, BarChart2, Target, Play, FileText, ChevronRight } from 'lucide-react';
import { Stats, Lead } from '../types';
import { LeadCard } from './LeadCard';
import { QuoteWidget } from './QuoteWidget';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

interface DashboardProps {
  user: string;
  stats: Stats;
  recommendedLeads: Lead[];
  onStartPowerHour: () => void;
  onExport: () => void;
  onViewAll: () => void;
  onCallLead: (lead: Lead) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  stats, 
  recommendedLeads, 
  onStartPowerHour, 
  onExport,
  onViewAll,
  onCallLead 
}) => {
  const weekProgress = Math.min(100, (stats.weeklyProgress / stats.weeklyGoal) * 100);
  const remaining = Math.max(0, stats.weeklyGoal - stats.weeklyProgress);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 18) return 'Afternoon';
    return 'Evening';
  };

  const doughnutData = {
    labels: ['Completed', 'Remaining'],
    datasets: [{
      data: [stats.weeklyProgress, remaining],
      backgroundColor: ['#3B82F6', '#E2E8F0'],
      borderWidth: 0,
      cutout: '75%',
    }]
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <motion.div 
        initial={{ borderBottomLeftRadius: "0", borderBottomRightRadius: "0", height: "100vh" }}
        animate={{ borderBottomLeftRadius: "3rem", borderBottomRightRadius: "3rem", height: "auto" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="bg-gradient-to-br from-[#003B5C] via-[#004d7a] to-[#0088BB] text-white px-4 pt-8 pb-24 shadow-2xl relative overflow-hidden"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl" 
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight text-white">
                Good {getTimeOfDay()}, {user}! 👋
              </h1>
              <p className="text-blue-100 text-lg font-medium flex items-center gap-2">
                <Target className="w-5 h-5 text-yellow-300" />
                <span className="font-bold text-yellow-300 text-xl">{remaining}</span> calls to hit your weekly goal
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-3 w-full md:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onExport}
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg w-full md:w-auto"
              >
                <FileText className="w-5 h-5" />
                Export CSV
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStartPowerHour}
                className="bg-white text-[#003B5C] hover:bg-blue-50 px-8 py-3 rounded-xl font-bold shadow-xl transition-all flex items-center justify-center gap-2 w-full md:w-auto"
              >
                <Play className="w-5 h-5 fill-current" />
                Start Power Hour
              </motion.button>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden"
          >
             <QuoteWidget transparent /> 
          </motion.div>
        </div>
      </motion.div>

      {/* Stats & Leads */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 -mt-16 relative z-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          {/* Main Goal Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between relative overflow-hidden group"
          >
             <div className="flex justify-between items-start mb-4 relative z-10">
               <div>
                 <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Weekly Goal</p>
                 <div className="flex items-baseline gap-1">
                    <h3 className="text-4xl font-extrabold text-slate-900">{stats.weeklyProgress}</h3>
                    <span className="text-lg font-semibold text-slate-400">/ {stats.weeklyGoal}</span>
                 </div>
               </div>
               <div className="w-12 h-12">
                 <Doughnut data={doughnutData} options={{ responsive: true, cutout: '75%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }} />
               </div>
             </div>
             <div>
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                  <span>Progress</span>
                  <span>{weekProgress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${weekProgress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
                    className="bg-gradient-to-r from-blue-500 to-[#0088BB] h-full rounded-full"
                  />
                </div>
             </div>
          </motion.div>

          <StatCard label="Calls Made Today" value={stats.calledToday} icon={Phone} color="text-emerald-600" bgColor="bg-emerald-50" variants={itemVariants} />
          <StatCard label="Needs Call Back" value={stats.followUp} icon={Clock} color="text-amber-500" bgColor="bg-amber-50" variants={itemVariants} />
          <StatCard label="Closed Deals" value={stats.closed} icon={BarChart2} color="text-purple-600" bgColor="bg-purple-50" variants={itemVariants} />
        </div>

        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              Recommended Next Calls
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">{recommendedLeads.length}</span>
            </h2>
            <button 
              onClick={onViewAll}
              className="text-[#0088BB] hover:text-[#003B5C] font-bold text-sm flex items-center gap-1 group transition-colors"
            >
              View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {recommendedLeads.length > 0 ? (
              recommendedLeads.map((lead) => (
                <LeadCard key={lead.id} lead={lead} onCall={onCallLead} />
              ))
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-700">All Caught Up!</h3>
                <p className="text-slate-500">You've contacted all your priority leads.</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color, bgColor, variants }: any) => (
  <motion.div
    variants={variants}
    whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
    className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center gap-4 group"
  >
    <div className={`p-4 rounded-2xl ${bgColor} ${color} group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-extrabold text-slate-800 mt-1"
      >
        {value}
      </motion.h3>
    </div>
  </motion.div>
);