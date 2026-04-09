import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Circle, ArrowRight, Award, Rocket, BookOpen, Users, TrendingUp } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  category: 'Technical' | 'Leadership' | 'Impact';
}

interface CareerRoadmapProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: string;
  targetRole: string;
}

const milestones: Milestone[] = [
  {
    id: '1',
    title: 'Master System Architecture',
    description: 'Design and document a scalable microservices architecture for the core platform.',
    status: 'in-progress',
    category: 'Technical'
  },
  {
    id: '2',
    title: 'Lead Mentorship Program',
    description: 'Successfully mentor 3 junior developers to mid-level proficiency.',
    status: 'completed',
    category: 'Leadership'
  },
  {
    id: '3',
    title: 'Strategic Product Influence',
    description: 'Contribute to the Q3 product roadmap with data-driven feature proposals.',
    status: 'locked',
    category: 'Impact'
  },
  {
    id: '4',
    title: 'Performance Optimization',
    description: 'Reduce core API latency by 40% through caching and query optimization.',
    status: 'completed',
    category: 'Technical'
  },
  {
    id: '5',
    title: 'Cross-functional Leadership',
    description: 'Lead a cross-functional squad to deliver a major product pillar.',
    status: 'in-progress',
    category: 'Leadership'
  }
];

export default function CareerRoadmap({ isOpen, onClose, currentRole, targetRole }: CareerRoadmapProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-8 bg-slate-900 text-white relative">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/40">
                  <Rocket className="text-white" size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Career Growth Roadmap</h2>
                  <div className="flex items-center gap-3 text-slate-400 text-sm">
                    <span className="font-medium text-white">{currentRole}</span>
                    <ArrowRight size={14} />
                    <span className="font-medium text-primary">{targetRole}</span>
                  </div>
                </div>
                <div className="md:ml-auto text-right">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Overall Progress</p>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        className="h-full bg-primary"
                      />
                    </div>
                    <span className="text-xl font-bold">85%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Timeline */}
                <div className="lg:col-span-2 space-y-8">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Promotion Milestones</h3>
                  
                  <div className="relative space-y-8 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                    {milestones.map((milestone, i) => (
                      <div key={milestone.id} className="relative pl-12">
                        <div className={cn(
                          "absolute left-0 top-1 w-9 h-9 rounded-full border-4 border-slate-50 flex items-center justify-center z-10 shadow-sm",
                          milestone.status === 'completed' ? "bg-success text-white" :
                          milestone.status === 'in-progress' ? "bg-primary text-white animate-pulse" :
                          "bg-slate-200 text-slate-400"
                        )}>
                          {milestone.status === 'completed' ? <CheckCircle2 size={18} /> :
                           milestone.status === 'in-progress' ? <Award size={18} /> :
                           <Circle size={18} />}
                        </div>
                        
                        <div className={cn(
                          "p-5 rounded-xl border transition-all",
                          milestone.status === 'locked' ? "bg-slate-100/50 border-slate-200 opacity-60" : "bg-white border-slate-200 shadow-sm hover:shadow-md"
                        )}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={cn(
                              "text-[10px] font-bold uppercase px-2 py-0.5 rounded",
                              milestone.category === 'Technical' ? "bg-blue-100 text-blue-600" :
                              milestone.category === 'Leadership' ? "bg-purple-100 text-purple-600" :
                              "bg-amber-100 text-amber-600"
                            )}>
                              {milestone.category}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">
                              {milestone.status === 'completed' ? 'Verified' : milestone.status === 'in-progress' ? 'Active' : 'Locked'}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 mb-1">{milestone.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-900 mb-4">Skill Gap Analysis</h3>
                    <div className="space-y-4">
                      {[
                        { skill: 'Cloud Architecture', level: 80, icon: BookOpen },
                        { skill: 'Strategic Thinking', level: 45, icon: TrendingUp },
                        { skill: 'Public Speaking', level: 90, icon: Users },
                      ].map((s, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <s.icon size={14} className="text-slate-400" />
                              <span className="text-xs font-medium text-slate-700">{s.skill}</span>
                            </div>
                            <span className="text-[10px] font-bold text-slate-500">{s.level}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${s.level}%` }}
                              className={cn(
                                "h-full rounded-full",
                                s.level > 70 ? "bg-success" : s.level > 40 ? "bg-primary" : "bg-red-400"
                              )}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                    <h3 className="text-sm font-bold text-primary mb-2">Next Promotion Window</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      Based on your current trajectory, you are eligible for review in:
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-white p-3 rounded-lg border border-primary/10 text-center">
                        <p className="text-xl font-bold text-primary">Q3</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">2026</p>
                      </div>
                      <div className="flex-1 bg-white p-3 rounded-lg border border-primary/10 text-center">
                        <p className="text-xl font-bold text-primary">~4</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Months</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-white border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-6 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
              >
                Close
              </button>
              <button className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                Download Roadmap PDF
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
