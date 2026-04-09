import React from 'react';
import { Goal } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { Target, TrendingUp, Calendar, MoreHorizontal, ChevronRight, X } from 'lucide-react';
import CareerRoadmap from './CareerRoadmap';

interface GoalPlannerProps {
  goals: Goal[];
  onAddGoal: (goal: Goal) => void;
  onDeleteGoal: (id: string) => void;
}

export default function GoalPlanner({ goals, onAddGoal, onDeleteGoal }: GoalPlannerProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = React.useState(false);
  const [newGoal, setNewGoal] = React.useState({
    title: '',
    category: 'Technical',
    dueDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const goal: Goal = {
      id: Math.random().toString(36).substr(2, 9),
      title: newGoal.title,
      category: newGoal.category,
      progress: 0,
      dueDate: newGoal.dueDate || 'Dec 31, 2026',
      status: 'on-track',
    };
    onAddGoal(goal);
    setIsModalOpen(false);
    setNewGoal({ title: '', category: 'Technical', dueDate: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Goal & Development Planner</h2>
          <p className="text-slate-500">Track S.M.A.R.T goals and career progression.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-accent text-white rounded-lg font-semibold text-sm hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
        >
          Add New Goal
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Add New Goal</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Goal Title</label>
                <input 
                  required
                  type="text" 
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="e.g. Master System Architecture"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                <select 
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
                >
                  <option>Technical</option>
                  <option>Leadership</option>
                  <option>Communication</option>
                  <option>Reliability</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Due Date</label>
                <input 
                  type="date" 
                  value={newGoal.dueDate}
                  onChange={(e) => setNewGoal({ ...newGoal, dueDate: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
                />
              </div>
              <button type="submit" className="w-full py-3 bg-accent text-white rounded-lg font-bold shadow-lg shadow-accent/20 hover:bg-accent/90 transition-all">
                Create Goal
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Goal</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {goals.map((goal) => (
                <tr key={goal.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{goal.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">
                      {goal.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 w-48">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent rounded-full" 
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{goal.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Calendar size={14} />
                      <span className="text-xs">{goal.dueDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      goal.status === 'on-track' ? "bg-success/10 text-success" :
                      goal.status === 'at-risk' ? "bg-amber-100 text-amber-600" :
                      "bg-red-100 text-red-600"
                    )}>
                      {goal.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => onDeleteGoal(goal.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded"
                    >
                      <X size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bridge to Next Level */}
      <div className="bg-primary text-white rounded-xl p-8 shadow-lg shadow-accent/10 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={24} />
            <h3 className="text-xl font-bold">Bridge to Next Level: Senior Product Engineer</h3>
          </div>
          <p className="text-primary-foreground/80 mb-6">
            You are currently meeting 85% of the requirements for the Senior role. Focus on these key areas to bridge the gap.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'System Architecture', status: 'In Progress', progress: 65 },
              { label: 'Team Mentorship', status: 'Completed', progress: 100 },
              { label: 'Strategic Planning', status: 'Not Started', progress: 0 },
              { label: 'Cross-functional Collab', status: 'In Progress', progress: 90 },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold">{item.label}</span>
                  <span className="text-[10px] font-bold uppercase opacity-70">{item.status}</span>
                </div>
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setIsRoadmapOpen(true)}
            className="mt-8 flex items-center gap-2 text-sm font-bold hover:gap-3 transition-all"
          >
            View Career Roadmap <ChevronRight size={16} />
          </button>
        </div>
        
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <CareerRoadmap 
        isOpen={isRoadmapOpen} 
        onClose={() => setIsRoadmapOpen(false)}
        currentRole="Product Engineer II"
        targetRole="Senior Product Engineer"
      />
    </div>
  );
}
