import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, bgColor }) => (
  <div className="bg-white p-6 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center space-x-4 hover:-translate-y-1 transition-transform duration-300 group cursor-default">
    <div className={`p-4 rounded-full ${bgColor} bg-opacity-50 group-hover:bg-opacity-100 transition-all`}>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
    <div>
      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{title}</p>
      <h3 className="text-3xl font-extrabold text-gray-800 mt-1">{value}</h3>
    </div>
  </div>
);