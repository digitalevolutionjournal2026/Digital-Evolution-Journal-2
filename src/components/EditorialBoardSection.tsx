import React from 'react';
import { EDITORIAL_BOARD } from '../data/journalData';
import { 
  Users, 
  ExternalLink, 
  Mail, 
  Globe, 
  ShieldCheck, 
  BookOpen, 
  Award 
} from 'lucide-react';

export const EditorialBoardSection: React.FC = () => {
  return (
    <section id="editorial" className="py-20 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-mono">
            <Users className="w-3.5 h-3.5" />
            <span>Academic Integrity & Governance</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-editorial text-slate-900 dark:text-white tracking-tight">
            Editorial Board Leadership
          </h2>

          <p className="text-base text-slate-600 dark:text-slate-300">
            Our international editors enforce COPE publication standards, oversee reviewer assignments, and guarantee unbiased, rigorous decisions.
          </p>
        </div>

        {/* Board Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EDITORIAL_BOARD.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/50 transition-all shadow-sm hover:shadow-lg"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-bold font-serif-editorial text-xl flex items-center justify-center shadow-md">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-amber-600 dark:text-amber-400 block">
                    {member.role}
                  </span>
                  <h3 className="text-lg font-bold font-serif-editorial text-slate-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                    {member.title}
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    {member.institution} ({member.country})
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{member.bio}"
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block mb-1">
                    Journal Oversight:
                  </span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                    {member.journalName}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-mono">
                <a
                  href={`https://orcid.org/${member.orcid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <span>ORCID</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href="mailto:editor@digitalevolutionjournal.com"
                  className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Inquire</span>
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Contact Editorial Box */}
        <div className="mt-12 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold font-serif-editorial">
              Need to contact Editorial Leadership or Ethics Committee?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              For manuscript appeals, ethics disclosures, or reviewer pool applications: contact <strong className="text-amber-400 font-mono">editor@digitalevolutionjournal.com</strong>.
            </p>
          </div>

          <a
            href="mailto:editor@digitalevolutionjournal.com"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer shrink-0"
          >
            Email Editorial Office
          </a>
        </div>

      </div>
    </section>
  );
};
