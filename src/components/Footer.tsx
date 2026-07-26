import React from 'react';
import { 
  BookOpen, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  Globe, 
  FileText, 
  Rss, 
  Database,
  Award
} from 'lucide-react';

interface FooterProps {
  onOpenGovernance: (docId?: string) => void;
  onOpenSubmit: () => void;
  onScrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenGovernance,
  onOpenSubmit,
  onScrollToSection,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-amber-500/30 p-1 flex items-center justify-center shrink-0">
                <img 
                  src="https://res.cloudinary.com/pzkb4rca/image/upload/v1785050016/ChatGPT_Image_Jul_25_2026_10_49_33_PM_ahrwiz.png"
                  alt="Digital Evolution Journal Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-serif-editorial text-2xl font-bold text-white block">
                  Digital Evolution Journal
                </span>
                <span className="text-[11px] font-mono text-amber-400">
                  Platform: Digital Evolution • ISSN 2998-4102
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              <strong className="text-white">"Publish once. Read everywhere."</strong> Gold Open Access academic publishing platform featuring the citable Reviewer Reputation Index (RRI).
            </p>

            <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-xl">
              <span className="text-[11px] font-mono font-bold text-emerald-400">CC BY 4.0</span>
              <span className="text-slate-400 text-[11px]">Creative Commons Attribution International</span>
            </div>
          </div>

          {/* Contact Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-white font-serif-editorial text-sm uppercase tracking-wider">
              Editorial Contact
            </h4>
            <ul className="space-y-2 text-slate-400 font-mono text-[11px]">
              <li>
                <span className="text-slate-500 block">Manuscript Submissions:</span>
                <a href="mailto:submissions@digitalevolutionjournal.com" className="text-amber-400 hover:underline">
                  submissions@digitalevolutionjournal.com
                </a>
              </li>
              <li>
                <span className="text-slate-500 block">Editorial / Ethics / Appeals:</span>
                <a href="mailto:editor@digitalevolutionjournal.com" className="text-amber-400 hover:underline">
                  editor@digitalevolutionjournal.com
                </a>
              </li>
              <li>
                <span className="text-slate-500 block">Platform & Technical Support:</span>
                <a href="mailto:support@digitalevolutionjournal.com" className="text-amber-400 hover:underline">
                  support@digitalevolutionjournal.com
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white font-serif-editorial text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onScrollToSection('articles')} className="hover:text-amber-400 cursor-pointer">
                  Featured Articles
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('rri')} className="hover:text-amber-400 cursor-pointer">
                  Reviewer Reputation Index (RRI)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('journals')} className="hover:text-amber-400 cursor-pointer">
                  Journals Directory
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('conferences')} className="hover:text-amber-400 cursor-pointer">
                  Symposia & Proceedings
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('membership')} className="hover:text-amber-400 cursor-pointer">
                  Gold Open Access Tiers
                </button>
              </li>
            </ul>
          </div>

          {/* Governance & Feeds */}
          <div className="space-y-3">
            <h4 className="font-bold text-white font-serif-editorial text-sm uppercase tracking-wider">
              Governance & Feeds
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onOpenGovernance('doc-copyright-oa')} className="hover:text-amber-400 cursor-pointer">
                  Copyright Retention Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenGovernance('doc-ethics-statement')} className="hover:text-amber-400 cursor-pointer">
                  Publication Ethics Statement
                </button>
              </li>
              <li>
                <button onClick={() => onOpenGovernance('doc-reviewer-guidelines')} className="hover:text-amber-400 cursor-pointer">
                  Reviewer Guidelines & Rubric
                </button>
              </li>
              <li>
                <button onClick={() => onOpenGovernance('doc-manuscript-template')} className="hover:text-amber-400 cursor-pointer">
                  Single-Column Template Specs
                </button>
              </li>
              <li className="pt-1 flex items-center gap-2 font-mono text-[11px] text-amber-400">
                <Rss className="w-3.5 h-3.5" />
                <span>OAI-PMH & RSS Feed Endpoint</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Rights & Preservation Commit */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} Digital Evolution Press. All published articles licensed under CC BY 4.0.
          </div>

          <div className="flex items-center gap-4">
            <span>Preservation: Internet Archive Deposit Committed</span>
            <span>•</span>
            <span>DOAJ Harvest Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
