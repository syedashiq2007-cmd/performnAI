import { Activity } from '@/src/types';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ActivityFeedProps {
  activities: Activity[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
      </div>
      <div className="divide-y divide-slate-100">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors">
            <div className={cn(
              "mt-1 p-2 rounded-full",
              activity.status === 'completed' ? "bg-success/10 text-success" :
              activity.status === 'flagged' ? "bg-red-100 text-red-600" :
              "bg-amber-100 text-amber-600"
            )}>
              {activity.status === 'completed' ? <CheckCircle2 size={16} /> :
               activity.status === 'flagged' ? <AlertTriangle size={16} /> :
               <Clock size={16} />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">
                <span className="font-bold">{activity.user}</span> {activity.action}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{activity.time}</p>
            </div>
            <div className={cn(
              "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
              activity.status === 'completed' ? "bg-success/10 text-success" :
              activity.status === 'flagged' ? "bg-red-100 text-red-600" :
              "bg-amber-100 text-amber-600"
            )}>
              {activity.status}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-slate-50 text-center">
        <button className="text-sm font-semibold text-primary hover:underline">View all activity</button>
      </div>
    </div>
  );
}
