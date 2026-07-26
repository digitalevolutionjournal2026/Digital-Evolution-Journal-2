import React from 'react';
import { 
  FileText, 
  Download, 
  ShieldCheck, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  Layers
} from 'lucide-react';
import { GOVERNANCE_DOCUMENTS } from '../data/journalData';

interface OfficialDocsSectionProps {
  onOpenGovernance: (docId?: string) => void;
}

export const OfficialDocsSection: React.FC<OfficialDocsSectionProps> = ({
  onOpenGovernance,
}) => {
  const officialDocsList = [
    {
      id: 'doc-editorial-handbook',
      name: 'Editorial Handbook',
      filename: 'Digital-Evolution-Journal-Editorial-Handbook_zd9cvf.docx',
      url: 'https://res.cloudinary.com/pzkb4rca/raw/upload/v1785050002/Digital-Evolution-Journal-Editorial-Handbook_zd9cvf.docx',
      description: 'Comprehensive operational guide for editors, reviewers, and manuscript escalation pathways.',
      icon: BookOpen,
      badge: 'Editor Operations'
    },
    {
      id: 'doc-manuscript-template',
      name: 'Manuscript Template',
      filename: 'Digital-Evolution-Journal-Manuscript-Template_3_lyxagl.docx',
      url: 'https://res.cloudinary.com/pzkb4rca/raw/upload/v1785050002/Digital-Evolution-Journal-Manuscript-Template_3_lyxagl.docx',
      description: 'Official single-column Word DOCX template for automated MET-15 structured parsing.',
      icon: FileText,
      badge: 'Author Template'
    },
    {
      id: 'doc-copyright-oa',
      name: 'Copyright & License Agreement',
      filename: 'Digital-Evolution-Journal-Copyright-License-Agreement_2_ntv9ny.docx',
      url: 'https://res.cloudinary.com/pzkb4rca/raw/upload/v1785050002/Digital-Evolution-Journal-Copyright-License-Agreement_2_ntv9ny.docx',
      description: 'CC BY 4.0 license agreement ensuring 100% author copyright retention with zero paywalls.',
      icon: ShieldCheck,
      badge: 'CC BY 4.0 Legal'
    },
    {
      id: 'doc-reviewer-guidelines',
      name: 'Reviewer Guidelines',
      filename: 'Digital-Evolution-Journal-Reviewer-Guidelines_1_rmuxcp.docx',
      url: 'https://res.cloudinary.com/pzkb4rca/raw/upload/v1785050002/Digital-Evolution-Journal-Reviewer-Guidelines_1_rmuxcp.docx',
      description: 'Standardized 8-dimension evaluation rubric and Reviewer Reputation Index (RRI) scoring rules.',
      icon: Award,
      badge: 'RRI Rubric'
    },
    {
      id: 'doc-ethics-statement',
      name: 'Publication Ethics Statement',
      filename: 'Digital-Evolution-Journal-Publication-Ethics-Statement_1_yuthmm.docx',
      url: 'https://res.cloudinary.com/pzkb4rca/raw/upload/v1785050002/Digital-Evolution-Journal-Publication-Ethics-Statement_1_yuthmm.docx',
      description: 'COPE-compliant standards detailing AI usage disclosures, plagiarism checks, and COI recusals.',
      icon: CheckCircle2,
      badge: 'COPE Ethics'
    }
  ];

  return (
    <section id="official-docs" className="py-12 bg-slate-900/50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-slate-900 dark:text-white tracking-tight">
              Official Handbooks & Templates
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Download binding editorial guidelines, manuscript DOCX templates, and legal CC BY 4.0 agreements.
            </p>
          </div>

          <button
            onClick={() => onOpenGovernance()}
            className="inline-flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-400 font-semibold cursor-pointer shrink-0"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Interactive Governance Hub &rarr;</span>
          </button>
        </div>

        {/* Clean, Streamlined Resource Row */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl divide-y divide-slate-100 dark:divide-slate-800/60 shadow-sm overflow-hidden">
          {officialDocsList.map((doc) => {
            const IconComponent = doc.icon;
            return (
              <div 
                key={doc.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold shrink-0 mt-0.5 sm:mt-0">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white font-sans">
                        {doc.name}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                        {doc.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {doc.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => onOpenGovernance(doc.id)}
                    className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 font-medium cursor-pointer transition-colors"
                  >
                    View Policy
                  </button>

                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3.5 py-1.5 rounded-lg text-xs transition-all shadow-sm cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .DOCX</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

