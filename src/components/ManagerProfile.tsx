import React from 'react';
import { User, Mail, MapPin, Briefcase, Award, Star, Shield, TrendingUp, Github, Linkedin, Twitter } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

export default function ManagerProfile() {
  const stats = [
    { label: 'Direct Reports', value: '8', icon: User },
    { label: 'Avg. Team Tenure', value: '2.4y', icon: Briefcase },
    { label: 'Reviews Completed', value: '42', icon: Award },
    { label: 'Bias Shield Score', value: '98%', icon: Shield },
  ];

  const skills = [
    { name: 'System Architecture', level: 95 },
    { name: 'Team Leadership', level: 90 },
    { name: 'Strategic Planning', level: 85 },
    { name: 'Conflict Resolution', level: 80 },
    { name: 'Agile Methodology', level: 95 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary to-indigo-600 relative">
          <div className="absolute -bottom-12 left-8 p-1 bg-white rounded-2xl shadow-lg">
            <div className="w-24 h-24 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <User size={48} />
            </div>
          </div>
        </div>
        <div className="pt-16 pb-8 px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Syed Ashiq</h2>
            <p className="text-slate-500 font-medium">Engineering Manager • Platform & Infrastructure</p>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Mail size={14} />
                syedashiq2007@gmail.com
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin size={14} />
                San Francisco, CA
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Briefcase size={14} />
                Full-time
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-primary text-white rounded-lg font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
              Edit Profile
            </button>
            <div className="flex gap-2">
              <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                <Github size={20} />
              </button>
              <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                <Linkedin size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Skills */}
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 mb-3">
                  <stat.icon size={18} />
                </div>
                <p className="text-2xl font-bold text-slate-900 leading-none">{stat.value}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase mt-1 tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Management Competencies</h3>
            <div className="space-y-5">
              {skills.map((skill, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-700">{skill.name}</span>
                    <span className="text-[10px] font-bold text-primary">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Bio & Philosophy */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Management Philosophy</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              I believe in building high-trust, autonomous teams where every engineer feels empowered to take ownership of their work. My approach centers on radical candor, continuous feedback loops, and a "people-first" mentality. I strive to bridge the gap between complex technical requirements and business impact, ensuring my team has the clarity and resources they need to excel.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <Star size={18} />
                  <span className="text-sm font-bold">Core Values</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                  <li>Radical Transparency</li>
                  <li>Extreme Ownership</li>
                  <li>Continuous Learning</li>
                  <li>Equity & Inclusion</li>
                </ul>
              </div>
              <div className="p-4 bg-success/5 rounded-xl border border-success/10">
                <div className="flex items-center gap-2 mb-2 text-success">
                  <TrendingUp size={18} />
                  <span className="text-sm font-bold">Current Focus</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                  <li>Scaling Platform Infrastructure</li>
                  <li>Improving Developer Velocity</li>
                  <li>Mentoring Future Leads</li>
                  <li>Neutralizing Evaluation Bias</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Achievements</h3>
            <div className="space-y-6">
              {[
                { 
                  title: 'Platform Migration Success', 
                  date: 'Q1 2026', 
                  desc: 'Led the cross-functional effort to migrate core services to a new architecture, reducing latency by 35%.' 
                },
                { 
                  title: 'EquityPulse Implementation', 
                  date: 'Q4 2025', 
                  desc: 'Pioneered the use of AI-driven bias detection in performance reviews, increasing team satisfaction scores by 20%.' 
                },
                { 
                  title: 'Team Growth', 
                  date: 'Ongoing', 
                  desc: 'Successfully hired and onboarded 4 senior engineers while maintaining a 100% retention rate.' 
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-1 bg-slate-100 group-hover:bg-primary transition-colors rounded-full" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{item.date}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
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
