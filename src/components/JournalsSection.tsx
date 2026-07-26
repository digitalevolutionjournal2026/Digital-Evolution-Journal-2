import React from 'react';
import { JOURNALS } from '../data/journalData';
import { 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Users, 
  Upload,
  Layers,
  Sparkles
} from 'lucide-react';

interface JournalsSectionProps {
  onOpenSubmit: () => void;
}

export const JournalsSection: React.FC<JournalsSectionProps> = ({ onOpenSubmit }) => {
  return (
    <section id="journals" className="py-20 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-mono">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Digital Evolution Journal Family</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-editorial text-slate-900 dark:text-white tracking-tight">
            Specialized Gold Open Access Journals
          </h2>

          <p className="text-base text-slate-600 dark:text-slate-300">
            Each journal operates under dedicated editorial leadership with single-column structured parsing, strict COPE compliance, and rapid peer review.
          </p>
        </div>

        {/* Journals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {JOURNALS.map((j) => (
            <div
              key={j.id}
              className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-amber-500/60 transition-all shadow-sm hover:shadow-xl group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 text-xs font-mono">
                  <span className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded font-semibold">
                    ISSN {j.issn}
                  </span>
                  <span className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded font-bold">
                    Gold Open Access
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-serif-editorial text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {j.name}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Editor-in-Chief: <strong className="text-slate-800 dark:text-slate-200">{j.editorInChief}</strong>
                </p>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {j.scope}
                </p>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 font-mono text-center">
                  <div className="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Impact Factor</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{j.impactFactor}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Acceptance Rate</span>
                    <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{j.acceptanceRate}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Avg Review</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{j.avgReviewDays} Days</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Volume {j.activeVolumesCount} Active • Open Submissions
                </span>

                <button
                  onClick={onOpenSubmit}
                  className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg transition-all shadow-sm cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Submit to Journal</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
