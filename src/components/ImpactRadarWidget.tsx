import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FEATURED_ARTICLES } from '../data/journalData';
import { Article } from '../types';
import { 
  TrendingUp, 
  Award, 
  Code, 
  Database, 
  ExternalLink, 
  BarChart2, 
  Share2, 
  Zap, 
  CheckCircle2, 
  Eye,
  Activity,
  Layers
} from 'lucide-react';

interface ImpactRadarWidgetProps {
  onSelectArticle: (article: Article) => void;
}

export const ImpactRadarWidget: React.FC<ImpactRadarWidgetProps> = ({ onSelectArticle }) => {
  const [activeArticleIndex, setActiveArticleIndex] = useState<number>(0);
  const article = FEATURED_ARTICLES[activeArticleIndex];

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden text-left">
      
      {/* Background Subtle Accent Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Widget Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-amber-400">
            Real-Time Article Impact Radar
          </span>
        </div>

        {/* Article Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[10px] font-mono">
          {FEATURED_ARTICLES.map((art, idx) => (
            <button
              key={art.id}
              onClick={() => setActiveArticleIndex(idx)}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                activeArticleIndex === idx
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {/* Article Header info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-400 mb-1">
              <span className="bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded font-semibold">
                {article.journalName.split(':')[1] || article.journalName}
              </span>
              <span>DOI: {article.doi}</span>
            </div>

            <h3 
              onClick={() => onSelectArticle(article)}
              className="text-base sm:text-lg font-bold font-serif-editorial text-white hover:text-amber-300 transition-colors cursor-pointer leading-snug line-clamp-2"
            >
              {article.title}
            </h3>

            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              {article.abstract}
            </p>
          </div>

          {/* Metric Bar Heatmap & Radar */}
          <div className="grid grid-cols-3 gap-2.5 pt-2">
            
            {/* Citations */}
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
              <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-mono">
                <TrendingUp className="w-3 h-3 text-amber-400" />
                <span>Citations</span>
              </div>
              <span className="text-lg font-bold font-mono text-white block mt-0.5">
                {article.citationCount}
              </span>
              <span className="text-[9px] text-emerald-400 font-mono">+12 this mo</span>
            </div>

            {/* Altmetric Score */}
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
              <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-mono">
                <Zap className="w-3 h-3 text-blue-400" />
                <span>Altmetric</span>
              </div>
              <span className="text-lg font-bold font-mono text-blue-400 block mt-0.5">
                {article.altmetricScore}
              </span>
              <span className="text-[9px] text-slate-500 font-mono">Top 5% Online</span>
            </div>

            {/* RRI Rating */}
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
              <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-mono">
                <Award className="w-3 h-3 text-emerald-400" />
                <span>RRI Score</span>
              </div>
              <span className="text-lg font-bold font-mono text-emerald-400 block mt-0.5">
                {article.rriScore}/5.0
              </span>
              <span className="text-[9px] text-slate-500 font-mono">Editor Verified</span>
            </div>

          </div>

          {/* CRediT Role Breakdown Bar */}
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3 text-amber-400" />
                <span>Lead Author CRediT Contribution:</span>
              </span>
              <span className="text-white font-bold">{article.authors[0]?.name}</span>
            </div>

            <div className="flex flex-wrap gap-1 text-[10px]">
              {article.authors[0]?.creditRoles?.map((role) => (
                <span
                  key={role}
                  className="bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded font-mono"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {article.reproducibilityBadges.codeAvailable && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  <Code className="w-3 h-3" />
                  <span>Code</span>
                </span>
              )}
              {article.reproducibilityBadges.dataAvailable && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                  <Database className="w-3 h-3" />
                  <span>Data</span>
                </span>
              )}
            </div>

            <button
              onClick={() => onSelectArticle(article)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Read Full Article</span>
            </button>
          </div>

        </motion.div>
      </AnimatePresence>

    </div>
  );
};
