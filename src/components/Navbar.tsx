import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ShieldCheck, 
  Award, 
  UserCheck, 
  Upload, 
  FileText,
  CheckCircle2,
  Sparkles,
  Bookmark
} from 'lucide-react';
import { InteractiveLogo } from './InteractiveLogo';

interface NavbarProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  onOpenAuth: (mode: 'signin' | 'register') => void;
  onOpenSubmit: () => void;
  onOpenGovernance: (docId?: string) => void;
  onOpenReviewerDashboard?: () => void;
  onOpenResearcherProfile?: () => void;
  onOpenMyLibrary?: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme = 'dark',
  onToggleTheme = () => {},
  onOpenAuth,
  onOpenSubmit,
  onOpenGovernance,
  onOpenReviewerDashboard = () => {},
  onOpenResearcherProfile = () => {},
  onOpenMyLibrary = () => {},
  activeSection,
  setActiveSection,
  searchQuery,
  setSearchQuery,
}) => {
  const isDarkMode = theme === 'dark';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'articles', label: 'Articles & Archive' },
    { id: 'rri', label: 'RRI Reviewers' },
    { id: 'journals', label: 'Journals' },
    { id: 'conferences', label: 'Conferences' },
    { id: 'editorial', label: 'Editorial Board' },
    { id: 'official-docs', label: 'Rules & Governance' },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl' 
          : 'bg-slate-900 text-slate-100 dark:bg-slate-950 border-b border-slate-800/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <InteractiveLogo size="nav" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-editorial text-lg sm:text-xl font-bold tracking-tight text-white">
                  Digital Evolution <span className="text-cyan-400 font-normal italic">Journal</span>
                </span>
                <span className="hidden md:inline-block text-[10px] font-mono tracking-wider text-cyan-400/80 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
                  Gold Open Access
                </span>
              </div>
            </div>
          </div>

          {/* Search Quick Input */}
          <div className="hidden lg:flex items-center relative w-64 xl:w-80">
            <Search className="w-4 h-4 absolute left-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles, DOIs, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700/80 text-slate-200 text-xs rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-xs text-slate-400 hover:text-slate-200"
              >
                ×
              </button>
            )}
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeSection === link.id
                    ? 'text-cyan-400 bg-slate-800/90 border border-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions: Theme Toggle, Library, Submit CTA, Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onToggleTheme}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-cyan-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
            </button>

            <button
              onClick={onOpenMyLibrary}
              className="hidden sm:inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium px-3 py-2 rounded-lg transition-colors cursor-pointer"
              title="Open Saved Papers & My Library"
            >
              <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Library</span>
            </button>

            <button
              onClick={onOpenReviewerDashboard}
              className="hidden xl:inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium px-3 py-2 rounded-lg transition-colors cursor-pointer"
              title="Open RRI Reviewer Portal"
            >
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>Reviewer Portal</span>
            </button>

            <button
              onClick={onOpenSubmit}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-lg transition-all shadow-md shadow-cyan-500/20 cursor-pointer shrink-0"
            >
              <Upload className="w-3.5 h-3.5 text-slate-950" />
              <span>Submit Manuscript</span>
            </button>

            <button
              onClick={() => onOpenAuth('signin')}
              className="text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 px-3 py-2 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Sign In
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search DOIs, articles, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg pl-9 pr-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSubmit();
              }}
              className="w-full flex items-center justify-center gap-2 bg-amber-500 text-slate-950 font-bold text-xs py-2.5 rounded-lg"
            >
              <Upload className="w-4 h-4" />
              <span>Submit Manuscript</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGovernance();
              }}
              className="w-full flex items-center justify-center gap-2 text-xs text-slate-300 bg-slate-800 py-2 rounded-lg"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Journal Policies & Ethics</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
