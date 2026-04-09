import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Stat } from '@/src/types';

interface StatCardProps extends Stat {}

export default function StatCard({ label, value, change, trend, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <h3 className="text-2xl font-bold mt-1 text-slate-900">{value}</h3>
        </div>
        <div className="p-2 bg-accent/5 rounded-lg">
          <Icon className="text-accent" size={20} />
        </div>
      </div>
      
      {change && (
        <div className="mt-4 flex items-center gap-1">
          {trend === 'up' && <ArrowUpRight className="text-success" size={16} />}
          {trend === 'down' && <ArrowDownRight className="text-red-500" size={16} />}
          {trend === 'neutral' && <Minus className="text-slate-400" size={16} />}
          <span className={cn(
            "text-xs font-semibold",
            trend === 'up' ? "text-success" : trend === 'down' ? "text-red-500" : "text-slate-500"
          )}>
            {change}
          </span>
          <span className="text-xs text-slate-400 ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
}
