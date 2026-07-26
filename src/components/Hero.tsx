import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ArrowRight, 
  FileCheck,
  Play,
  Film,
  FileText,
  X,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Article } from '../types';

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
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Parallax scrolling calculation
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse hover tilt and reflection calculations for glass frame
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Calculate subtle 3D rotation based on mouse coordinates
  const tiltX = isHovered && cardRef.current 
    ? ((mousePos.y / cardRef.current.offsetHeight) - 0.5) * -6 
    : 0;
  const tiltY = isHovered && cardRef.current 
    ? ((mousePos.x / cardRef.current.offsetWidth) - 0.5) * 6 
    : 0;

  return (
    <section id="hero" className="relative min-h-[65vh] flex items-center justify-center bg-slate-950 text-slate-100 border-b border-slate-800/80 py-16 sm:py-20 lg:py-24 overflow-hidden">
      
      {/* 1. Subtle Parallax Background Layer */}
      <div 
        className="absolute inset-0 pointer-events-none transition-transform duration-100 ease-out z-0"
        style={{ transform: `translateY(${scrollY * 0.25}px)` }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(217,119,6,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-15" />
      </div>

      {/* 2. Glass-morphism Hero Container with Hover Frame Animations & Parallax */}
      <div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full transition-transform duration-100 ease-out"
        style={{ transform: `translateY(-${scrollY * 0.05}px)` }}
      >
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          }}
          className={`relative backdrop-blur-xl bg-slate-900/60 dark:bg-slate-950/70 border rounded-3xl p-8 sm:p-12 md:p-14 text-center space-y-8 shadow-2xl transition-all duration-300 ease-out group ${
            isHovered 
              ? 'border-amber-500/50 shadow-amber-500/10 shadow-2xl scale-[1.008]' 
              : 'border-slate-800/80 shadow-black/80'
          }`}
        >
          {/* Hover Spotlight Beam */}
          {isHovered && (
            <div 
              className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300"
              style={{
                background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.08), transparent 40%)`,
              }}
            />
          )}

          {/* Hover Frame Edge Glow Accent Lines */}
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 group-hover:via-amber-400/80 to-transparent transition-all duration-500" />
          <div className="absolute bottom-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 group-hover:via-emerald-400/60 to-transparent transition-all duration-500" />

          {/* Simple Prestige Tagline */}
          <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-slate-800 group-hover:border-amber-500/30 px-4 py-1.5 rounded-full text-xs font-mono text-slate-300 shadow-sm transition-colors duration-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-amber-400 font-bold tracking-wider">ISSN 2998-4102</span>
            <span className="text-slate-600">•</span>
            <span>Gold Open Access</span>
          </div>

          {/* High-Impact Minimalist Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-serif-editorial tracking-tight text-white leading-[1.08]">
              Digital Evolution <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent font-normal italic">Journal</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
              An open science journal platform uniting automated single-column parsing, CRediT contributor attribution, and the Reviewer Reputation Index.
            </p>
          </div>

          {/* Clean, Focal Search Field */}
          <div className="max-w-xl mx-auto pt-2">
            <div className="relative flex items-center bg-slate-900/90 border border-slate-700/80 rounded-2xl p-2 shadow-2xl focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all">
              <Search className="w-5 h-5 text-amber-500 ml-3.5 shrink-0" />
              <input
                type="text"
                placeholder="Search published papers, DOIs, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-slate-100 placeholder:text-slate-400 text-sm sm:text-base px-3 py-2 focus:outline-none font-sans"
              />
              <button
                onClick={onScrollToArticles}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-md"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenSubmit}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>Submit Manuscript</span>
            </button>

            <button
              onClick={() => setShowVideoModal(true)}
              className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-medium text-xs sm:text-sm px-5 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Watch Keynote</span>
            </button>

            <button
              onClick={() => onOpenGovernance('doc-editorial-handbook')}
              className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-medium text-xs sm:text-sm px-5 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Editorial Handbook</span>
            </button>
          </div>

        </div>

      </div>

      {/* Video Lightbox Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif-editorial font-bold text-white text-lg sm:text-xl">
                  Digital Evolution Journal — System Keynote
                </h3>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-slate-800 shadow-inner">
              <iframe
                src="https://www.youtube.com/embed/p-I7aLy4iGA?autoplay=1&rel=0"
                title="Digital Evolution Keynote Presentation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <p>
                Learn about automated single-column parsing, CRediT contributor tracking, and Reviewer Reputation Indexing.
              </p>
              <a
                href="https://www.youtube.com/watch?v=p-I7aLy4iGA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-1 font-mono shrink-0"
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


