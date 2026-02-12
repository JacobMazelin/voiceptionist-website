
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  isPositive?: boolean;
  prefix?: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, change, isPositive = true, prefix, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`py-2 transition-all ${onClick ? 'cursor-pointer hover:opacity-80 active:scale-[0.98]' : ''}`}
    >
      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.075em] mb-1.5">{label}</div>
      <div className="flex items-end gap-3">
        <div className="text-3xl font-bold text-slate-900 tracking-tight">
          {prefix}{value}
        </div>
        <div className={`flex items-center gap-0.5 text-sm font-bold mb-1 ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span className="tabular-nums">{change}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
