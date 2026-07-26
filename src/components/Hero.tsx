import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  FileCheck,
  Film,
  FileText,
  X,
  ExternalLink,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  ShieldCheck,
  BookOpen,
  CheckCircle2,
  Tv,
  Play
} from 'lucide-react';
import { Article } from '../types';
import { InteractiveLogo } from './InteractiveLogo';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenSubmit: () => void;
  onScrollToArticles: () => void;
  onScrollToRRI: () => void;
  onOpenGovernance: (docId?: string) => void;
  onSelectArticle?: (article: Article) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  onOpenSubmit,
  onScrollToArticles,
  onOpenGovernance,
}) => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section id="hero" className="relative min-h-[85vh] lg:min-h-[90vh] bg-slate-950 text-slate-100 border-b border-slate-800/80 overflow-hidden flex flex-col justify-between">
      
      {/* 1. Full-Screen Vibrant Background Video Loop Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        <div className="absolute inset-0 w-full h-full transform scale-150 sm:scale-125 transition-transform duration-1000">
          <iframe
            src={`https://www.youtube.com/embed/p-I7aLy4iGA?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=p-I7aLy4iGA&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0&enablejsapi=1&playsinline=1`}
            title="Digital Evolution Journal Main Video Presentation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="w-full h-full object-cover opacity-75 filter brightness-95 contrast-110 saturate-125 transition-opacity duration-500"
          />
        </div>

        {/* Lightweight Cinematic Scrim Gradients - Keeps Video 100% Visible while ensuring legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_0%,rgba(2,6,23,0.6)_100%)]" />
      </div>

      {/* Top Cinema HUD Bar */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 px-3.5 py-1.5 rounded-full text-xs font-mono shadow-xl shadow-cyan-500/10">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-400 font-bold uppercase tracking-wider">Gold Open Access</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-200 font-medium hidden sm:inline">System Broadcast</span>
        </div>

        {/* Audio Mute/Unmute & Theater Toggle */}
        <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-full text-xs font-mono shadow-lg">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-slate-200 hover:text-cyan-400 transition-colors flex items-center gap-2 cursor-pointer font-semibold"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span className="text-[11px] hidden sm:inline text-slate-300">Unmute Reel</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-[11px] hidden sm:inline text-cyan-400">Audio Playing</span>
              </>
            )}
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={() => setShowVideoModal(true)}
            className="text-slate-200 hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer font-semibold"
            title="Expand Full Theater"
          >
            <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] text-cyan-400 hidden sm:inline">Expand Theater</span>
          </button>
        </div>
      </div>

      {/* 2. Main Content Directly Overlaid on Video (Chil & Co Style) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 my-auto text-center w-full space-y-8">
        
        {/* Glowing Brand Logo & Prestige Badges */}
        <div className="flex flex-col items-center justify-center gap-4">
          <InteractiveLogo size="hero" />

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono">
            <span className="bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/40 px-3.5 py-1 rounded-full font-semibold flex items-center gap-1.5 shadow-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              Gold Open Access (CC BY 4.0)
            </span>
            <span className="bg-slate-950/80 backdrop-blur-md text-blue-300 border border-blue-500/40 px-3.5 py-1 rounded-full font-semibold flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Single-Column MET-15 Parsing
            </span>
            <span className="bg-slate-950/80 backdrop-blur-md text-slate-200 border border-slate-700/80 px-3.5 py-1 rounded-full font-semibold flex items-center gap-1.5 hidden md:flex shadow-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              RRI Credentialed Peer Review
            </span>
          </div>
        </div>

        {/* High-Impact Headline & Subtitle */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-serif-editorial tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Digital Evolution <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent italic font-normal">Journal</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-100 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            An open science journal platform combining single-column automated parsing, CRediT contributor attribution, and the citable <strong className="text-cyan-300 font-bold">Reviewer Reputation Index (RRI)</strong>.
          </p>
        </div>

        {/* Floating Glass Search Bar */}
        <div className="max-w-2xl mx-auto pt-2">
          <div className="relative flex items-center bg-slate-950/80 backdrop-blur-2xl border border-cyan-500/40 rounded-2xl p-2 shadow-2xl shadow-black/80 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/30 transition-all">
            <Search className="w-5 h-5 text-cyan-400 ml-3.5 shrink-0" />
            <input
              type="text"
              placeholder="Search published articles, DOIs, authors, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-slate-100 placeholder:text-slate-400 text-sm sm:text-base px-3 py-2.5 focus:outline-none font-sans"
            />
            <button
              onClick={onScrollToArticles}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-lg shadow-cyan-500/25"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>

          {/* Popular Keywords */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-300 font-mono">
            <span className="text-[11px] text-slate-400 font-semibold drop-shadow-sm">Popular:</span>
            {['Transformers', 'Quantum Computing', 'Single-Column Parsing', 'CRediT Matrix', 'RRI Score'].map((chip) => (
              <button
                key={chip}
                onClick={() => setSearchQuery(chip)}
                className="bg-slate-950/80 backdrop-blur-md hover:bg-slate-900 hover:text-cyan-300 text-slate-200 border border-slate-700/80 px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-[11px]"
              >
                #{chip}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons Floating Directly Over Video */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onOpenSubmit}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-xl shadow-cyan-500/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <FileCheck className="w-4 h-4 text-slate-950" />
            <span>Submit Single-Column Manuscript</span>
          </button>

          <button
            onClick={() => onOpenGovernance('doc-editorial-handbook')}
            className="bg-slate-950/80 hover:bg-slate-900 text-slate-100 border border-slate-700/80 font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md shadow-lg"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Editorial Handbook & Rules (.DOCX)</span>
          </button>
        </div>

      </div>

      {/* Bottom Ticker Bar */}
      <div className="relative z-10 bg-slate-950/90 backdrop-blur-md border-t border-slate-800/80 py-3 px-4 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300 font-medium">Crossref Indexed • COPE Ethics Compliant • MET-15 Automated Parser</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Volume 8, Issue 3 (2026)</span>
            <span>•</span>
            <span className="text-cyan-400 font-semibold">100% Free Open Access</span>
          </div>
        </div>
      </div>

      {/* Expanded Theater Video Presentation Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif-editorial font-bold text-white text-lg sm:text-xl">
                    Digital Evolution Journal — System Keynote
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    System Architecture & CRediT Attribution Overview
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/p-I7aLy4iGA?autoplay=1&rel=0"
                title="Digital Evolution Keynote Presentation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 pt-2">
              <p>
                Demonstrating single-column manuscript parsing, CRediT contributor matrix generation, and Reviewer Reputation Indexing.
              </p>
              <a
                href="https://www.youtube.com/watch?v=p-I7aLy4iGA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1.5 font-mono shrink-0 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/80"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
