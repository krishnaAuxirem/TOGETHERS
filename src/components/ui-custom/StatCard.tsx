import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  icon: ReactNode;
  color?: string;
  bg?: string;
}

export default function StatCard({ title, value, change, positive = true, icon, color = 'text-coral-500', bg = 'bg-coral-50' }: StatCardProps) {
  return (
    <div className="glass-card rounded-2xl p-6 hover-lift transition-all cursor-default">
      <div className="flex items-start justify-between mb-4">
        <div className={`${bg} ${color} p-3 rounded-xl`}>
          {icon}
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
            {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {change}
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  );
}
