import React from 'react';
import { Bell, Shield, User, Globe, Lock, Eye, Save, RefreshCw, AlertCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

export default function Settings() {
  const [activeSection, setActiveSection] = React.useState('profile');
  const [isSaving, setIsSaving] = React.useState(false);
  const [showSaved, setShowSaved] = React.useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 3000);
    }, 1000);
  };

  const sections = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'ai-config', label: 'AI & Bias Shield', icon: Shield },
    { id: 'security', label: 'Security & Privacy', icon: Lock },
    { id: 'display', label: 'Display & Language', icon: Globe },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
        <p className="text-slate-500">Manage your account preferences and application configuration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                activeSection === section.id
                  ? "bg-white text-primary shadow-sm border border-slate-200"
                  : "text-slate-500 hover:bg-white/50 hover:text-slate-900"
              )}
            >
              <section.icon size={18} />
              {section.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8">
              {activeSection === 'profile' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Public Profile</h3>
                    <p className="text-sm text-slate-500">This information will be visible to your team.</p>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl font-bold">
                        SA
                      </div>
                      <button className="absolute -bottom-2 -right-2 p-1.5 bg-white rounded-lg shadow-md border border-slate-200 text-slate-500 hover:text-primary transition-colors">
                        <RefreshCw size={14} />
                      </button>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-900">Profile Picture</p>
                      <p className="text-xs text-slate-500">JPG, GIF or PNG. Max size of 800K</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue="Syed Ashiq"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue="syedashiq2007@gmail.com"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Role</label>
                      <input 
                        type="text" 
                        defaultValue="Engineering Manager"
                        disabled
                        className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Department</label>
                      <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
                        <option>Engineering</option>
                        <option>Product</option>
                        <option>Design</option>
                        <option>Marketing</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'ai-config' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">AI & Bias Shield Configuration</h3>
                    <p className="text-sm text-slate-500">Fine-tune how EquityPulse analyzes and synthesizes feedback.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <Shield size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Bias Shield Sensitivity</p>
                        <p className="text-xs text-slate-600 mt-1">Higher sensitivity will flag more subjective adjectives and gendered language.</p>
                        <div className="mt-4 flex items-center gap-4">
                          <input type="range" className="flex-1 accent-primary" min="0" max="100" defaultValue="75" />
                          <span className="text-xs font-bold text-primary">75%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div>
                          <p className="text-sm font-bold text-slate-900">Auto-Neutralize Language</p>
                          <p className="text-xs text-slate-500">Automatically replace flagged terms in AI drafts.</p>
                        </div>
                        <button className="w-10 h-5 bg-primary rounded-full relative">
                          <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div>
                          <p className="text-sm font-bold text-slate-900">Explain AI Decisions</p>
                          <p className="text-xs text-slate-500">Show reasoning for every bias flag detected.</p>
                        </div>
                        <button className="w-10 h-5 bg-primary rounded-full relative">
                          <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'notifications' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Notification Preferences</h3>
                    <p className="text-sm text-slate-500">Choose how and when you want to be notified.</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { title: 'Review Cycle Updates', desc: 'Get notified when a new performance cycle begins.' },
                      { title: 'AI Draft Ready', desc: 'Receive an alert when the AI has finished synthesizing feedback.' },
                      { title: 'Team Goal Alerts', desc: 'Notifications for goals that are at-risk or behind schedule.' },
                      { title: 'Bias Shield Weekly Digest', desc: 'A weekly summary of bias trends across your team.' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div>
                          <p className="text-sm font-bold text-slate-900">{item.title}</p>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                        <button className={cn(
                          "w-10 h-5 rounded-full relative transition-colors",
                          i < 3 ? "bg-primary" : "bg-slate-300"
                        )}>
                          <div className={cn(
                            "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                            i < 3 ? "right-1" : "left-1"
                          )} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'security' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Security & API Access</h3>
                    <p className="text-sm text-slate-500">Manage your account security and integration keys.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
                      <AlertCircle className="text-amber-600" size={18} />
                      <div>
                        <p className="text-sm font-bold text-amber-900">Two-Factor Authentication</p>
                        <p className="text-xs text-amber-700 mt-1">Your account is currently protected by 2FA via Google Authenticator.</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-sm font-bold text-slate-900">Gemini API Integration</p>
                          <span className="px-2 py-0.5 bg-success/10 text-success text-[10px] font-bold rounded uppercase">Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-white px-4 py-2 rounded-lg border border-slate-200 font-mono text-xs text-slate-400 flex items-center justify-between">
                            <span>••••••••••••••••••••••••••••••••</span>
                            <Eye size={14} className="cursor-pointer hover:text-primary transition-colors" />
                          </div>
                          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-primary transition-colors">
                            <RefreshCw size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <p className="text-xs text-slate-500 italic">Last updated: Today at 09:22 AM</p>
              <div className="flex gap-3">
                <button className="px-6 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors">
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-8 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2"
                >
                  {isSaving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: showSaved ? 1 : 0, y: showSaved ? 0 : 50 }}
        className="fixed bottom-8 right-8 bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 pointer-events-none z-50"
      >
        <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
          <Save size={14} />
        </div>
        <p className="text-sm font-bold">Settings saved successfully!</p>
      </motion.div>
    </div>
  );
}
