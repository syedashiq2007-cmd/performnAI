import React from 'react';
import { Shield, Sparkles, AlertCircle, CheckCircle2, ChevronRight, ArrowRightLeft } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { FeedbackItem, CompetencyScore } from '@/src/types';
import CompetencyRadar from './CompetencyRadar';
import { motion, AnimatePresence } from 'motion/react';
import { synthesizeFeedback, SynthesisOptions } from '@/src/services/gemini';

interface FairEvalProps {
  rawFeedback: FeedbackItem[];
  competencies: CompetencyScore[];
  onSubmitReview: () => void;
}

interface SynthesisResult {
  title: string;
  summary: string;
  audit: { original: string; replacement: string; reason: string }[];
  score: number;
}

export default function FairEval({ rawFeedback, competencies, onSubmitReview }: FairEvalProps) {
  const [isSynthesizing, setIsSynthesizing] = React.useState(false);
  const [showAudit, setShowAudit] = React.useState(false);
  const [result, setResult] = React.useState<SynthesisResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [options, setOptions] = React.useState<SynthesisOptions>({
    tone: 'professional',
    format: 'narrative',
    focus: 'overall'
  });

  const handleGenerate = async () => {
    setIsSynthesizing(true);
    setError(null);
    try {
      const rawTexts = rawFeedback.map(f => f.content);
      const data = await synthesizeFeedback(rawTexts, options);
      if (data) {
        setResult(data);
      }
    } catch (err: any) {
      if (err.message === "API_KEY_MISSING") {
        setError("Gemini API Key is missing. Please add it in the Secrets panel to enable AI features.");
      } else {
        setError("Failed to synthesize feedback. Please try again later.");
      }
    } finally {
      setIsSynthesizing(false);
    }
  };

  const renderSummaryWithAudit = () => {
    if (!result) return null;
    let text = result.summary;
    
    if (!showAudit) return <p className="text-slate-800 leading-relaxed">{text}</p>;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-primary uppercase">Bias Audit View (Diff)</span>
          <div className="flex gap-4 text-[10px] uppercase font-bold">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-red-100 border border-red-200 rounded" />
              <span className="text-slate-400">Removed Bias</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-success/20 border border-success/30 rounded" />
              <span className="text-slate-400">Objective Replacement</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-900 rounded-xl font-mono text-sm leading-relaxed overflow-x-auto">
          <div className="space-y-1">
            {result.audit.map((item, i) => (
              <div key={i} className="group relative">
                <div className="flex items-start gap-4 py-1 px-2 rounded hover:bg-white/5 transition-colors">
                  <span className="text-slate-600 select-none w-4">-{i+1}</span>
                  <span className="text-red-400 bg-red-900/30 px-1 rounded line-through decoration-red-500/50">{item.original}</span>
                </div>
                <div className="flex items-start gap-4 py-1 px-2 rounded hover:bg-white/5 transition-colors">
                  <span className="text-slate-600 select-none w-4">+{i+1}</span>
                  <span className="text-success bg-success/10 px-1 rounded">{item.replacement}</span>
                  <span className="text-slate-500 text-[10px] ml-auto self-center opacity-0 group-hover:opacity-100 transition-opacity">
                    Reason: {item.reason}
                  </span>
                </div>
              </div>
            ))}
            <div className="pt-4 mt-4 border-t border-white/10">
              <p className="text-slate-400 italic text-xs">// Synthesized Summary</p>
              <p className="text-slate-300 mt-2 font-sans leading-relaxed">{text}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Fair-Eval Analysis</h2>
          <p className="text-slate-500">AI-powered bias detection and feedback synthesis.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 text-success rounded-full border border-success/20">
            <Shield size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Bias Shield Active</span>
          </div>
            <button 
              onClick={handleGenerate}
              disabled={isSynthesizing}
              className="relative overflow-hidden group flex items-center gap-2 px-6 py-2.5 bg-accent text-white rounded-lg font-semibold shadow-lg shadow-accent/20 hover:bg-accent/90 transition-all disabled:opacity-70"
            >
              {isSynthesizing ? (
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Sparkles size={18} />
                </motion.div>
              ) : <Sparkles size={18} />}
              {isSynthesizing ? "Synthesizing..." : "Generate AI Draft"}
              
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Raw Feedback & Options */}
        <div className="lg:col-span-1 space-y-6">
          {/* Synthesis Options */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Synthesis Options</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Draft Tone</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['professional', 'empathetic', 'direct'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setOptions({ ...options, tone: t })}
                      className={cn(
                        "py-2 text-[10px] font-bold rounded-lg border transition-all capitalize",
                        options.tone === t 
                          ? "bg-accent/5 border-accent text-accent" 
                          : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Focus Area</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['overall', 'technical', 'leadership'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setOptions({ ...options, focus: f })}
                      className={cn(
                        "py-2 text-[10px] font-bold rounded-lg border transition-all capitalize",
                        options.focus === f 
                          ? "bg-accent/5 border-accent text-accent" 
                          : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Output Format</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['narrative', 'bullets'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setOptions({ ...options, format: f })}
                      className={cn(
                        "py-2 text-[10px] font-bold rounded-lg border transition-all capitalize",
                        options.format === f 
                          ? "bg-accent/5 border-accent text-accent" 
                          : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Custom AI Instructions</label>
                <textarea
                  value={options.customInstructions || ''}
                  onChange={(e) => setOptions({ ...options, customInstructions: e.target.value })}
                  placeholder="e.g., 'Focus on their growth as a mentor' or 'Keep it under 100 words'..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs min-h-[80px] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Raw Feedback</h3>
            <div className="space-y-4">
              {rawFeedback.map((item) => (
                <div key={item.id} className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.author}</p>
                      <p className="text-[10px] text-slate-500 uppercase">{item.role}</p>
                    </div>
                    <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed italic">"{item.content}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: AI Analysis */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="text-primary" size={20} />
                <h3 className="text-lg font-bold text-slate-900">AI-Synthesized Analysis</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Bias Audit</span>
                <button 
                  onClick={() => setShowAudit(!showAudit)}
                  className={cn(
                    "relative w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none",
                    showAudit ? "bg-primary" : "bg-slate-200"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform duration-200",
                    showAudit ? "translate-x-5" : "translate-x-0"
                  )} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-center gap-3 text-red-600">
                  <AlertCircle size={18} />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}
              
              {isSynthesizing ? (
                <div className="py-20 text-center space-y-6">
                  <div className="relative w-20 h-20 mx-auto">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="absolute inset-0 border-4 border-primary/20 border-t-primary rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="text-primary animate-pulse" size={32} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-900 font-bold text-lg">Synthesizing Feedback...</p>
                    <div className="flex flex-col items-center gap-1">
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-xs text-slate-500 uppercase tracking-widest"
                      >
                        Neutralizing Subjective Language
                      </motion.p>
                      <p className="text-[10px] text-slate-400">Applying EquityPulse Bias Shield v2.4</p>
                    </div>
                  </div>
                </div>
              ) : result ? (
                <div className="space-y-6">
                  <div className="mb-2">
                    <h4 className="text-xl font-bold text-slate-900">{result.title}</h4>
                  </div>
                  <div className="relative p-6 bg-accent/5 rounded-xl border border-accent/10">
                    <div className="text-slate-800 leading-relaxed">
                      {renderSummaryWithAudit()}
                    </div>
                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-white rounded-full border-4 border-background flex items-center justify-center shadow-md">
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-accent leading-none">{result.score}%</p>
                        <p className="text-[6px] text-slate-400 uppercase leading-none">Fair</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-4">Competency Rubric</h4>
                      <CompetencyRadar data={competencies} />
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-slate-900 mb-4">Key Insights</h4>
                      {[
                        { label: 'Technical Excellence', value: 'Exceeds Expectations', color: 'text-success' },
                        { label: 'Leadership Potential', value: 'High', color: 'text-primary' },
                        { label: 'Bias Flags Detected', value: `${result.audit.length} Adjusted`, color: 'text-slate-500' },
                      ].map((insight, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-xs font-medium text-slate-600">{insight.label}</span>
                          <span className={cn("text-xs font-bold", insight.color)}>{insight.value}</span>
                        </div>
                      ))}
                      <button 
                        onClick={onSubmitReview}
                        className="w-full py-3 bg-success text-white rounded-lg font-bold shadow-lg shadow-success/20 hover:bg-success/90 transition-all flex items-center justify-center gap-2 mt-4"
                      >
                        <CheckCircle2 size={18} />
                        Submit Final Review
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="text-slate-300" size={32} />
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold">No Analysis Generated</p>
                    <p className="text-sm text-slate-500">Click "Generate AI Draft" to synthesize raw feedback into a fair evaluation.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
