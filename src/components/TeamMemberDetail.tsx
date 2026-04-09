import React from 'react';
import { TeamMember } from '@/src/types';
import { ArrowLeft, Mail, Briefcase, Star, CheckCircle2, Layout, Award, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

interface TeamMemberDetailProps {
  member: TeamMember;
  onBack: () => void;
}

export default function TeamMemberDetail({ member, onBack }: TeamMemberDetailProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold text-slate-900">Member Details</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-3xl font-bold mx-auto mb-4">
              {member.avatar}
            </div>
            <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
            <p className="text-sm text-slate-500 font-medium mb-6">{member.role}</p>
            
            <div className="space-y-3 text-left border-t border-slate-100 pt-6">
              <div className="flex items-center gap-3 text-slate-600">
                <Mail size={16} className="text-slate-400" />
                <span className="text-sm">{member.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Briefcase size={16} className="text-slate-400" />
                <span className="text-sm">{member.team} Team</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Star size={16} className="text-amber-400 fill-amber-400" />
                <span className="text-sm font-bold">{member.clientRating} / 5.0 <span className="text-slate-400 font-normal ml-1">(Client Rating)</span></span>
              </div>
            </div>
          </div>

          <div className="bg-accent/5 p-6 rounded-2xl border border-accent/10">
            <div className="flex items-center gap-2 mb-4 text-accent">
              <Award size={18} />
              <h4 className="text-sm font-bold uppercase tracking-wider">Key Achievements</h4>
            </div>
            <ul className="space-y-3">
              {member.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start gap-3 text-xs text-slate-600">
                  <CheckCircle2 size={14} className="text-success mt-0.5 shrink-0" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Projects Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Current Project */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Rocket className="text-accent" size={20} />
                <h3 className="text-lg font-bold text-slate-900">Current Project</h3>
              </div>
              <span className="px-3 py-1 bg-success/10 text-success text-[10px] font-bold rounded-full uppercase tracking-wider">
                In Progress
              </span>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="text-md font-bold text-slate-900 mb-2">{member.currentProject}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Leading the technical implementation and architecture design for the next-generation platform features.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    className="h-full bg-accent"
                  />
                </div>
                <span className="text-xs font-bold text-slate-700">65% Complete</span>
              </div>
            </div>
          </div>

          {/* Past Projects */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Layout className="text-slate-400" size={20} />
              <h3 className="text-lg font-bold text-slate-900">Project History</h3>
            </div>
            <div className="space-y-6">
              {member.pastProjects.map((project, i) => (
                <div key={i} className="p-6 border border-slate-100 rounded-xl hover:border-primary/20 transition-all group bg-slate-50/50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-md font-bold text-slate-900">{project.name}</h5>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{project.year}</span>
                      </div>
                      <p className="text-xs font-bold text-accent uppercase tracking-wider">{project.role}</p>
                    </div>
                    <ExternalLink size={16} className="text-slate-300 group-hover:text-accent transition-colors cursor-pointer" />
                  </div>
                  
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tech Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, j) => (
                          <span key={j} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-medium text-slate-600">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Outcome</p>
                      <p className="text-xs text-slate-700 font-medium italic">"{project.outcome}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Rocket } from 'lucide-react';
