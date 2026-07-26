import React, { useState } from 'react';
import { ReviewerProfile } from '../types';
import { TOP_REVIEWERS } from '../data/journalData';
import { 
  Award, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Sparkles, 
  UserCheck, 
  Sliders, 
  ExternalLink,
  ChevronRight,
  BarChart2,
  TrendingUp,
  FileCheck
} from 'lucide-react';

interface RRISectionProps {
  onOpenGovernance: (docId?: string) => void;
  onOpenAuth: (mode: 'register') => void;
  onOpenReviewerDashboard?: () => void;
}

export const RRISection: React.FC<RRISectionProps> = ({
  onOpenGovernance,
  onOpenAuth,
  onOpenReviewerDashboard = () => {},
}) => {
  const [selectedReviewer, setSelectedReviewer] = useState<ReviewerProfile>(TOP_REVIEWERS[0]);
  const [interactiveRubric, setInteractiveRubric] = useState({
    methodology: 5,
    novelty: 4,
    statistics: 5,
    writing: 4,
    ethics: 5,
    data: 5,
    code: 5,
  });

  const rubricDimensions = [
    { key: 'methodology', name: '1. Methodology Rigor', desc: 'Control groups, experimental design, sample size power calculations' },
    { key: 'novelty', name: '2. Novelty & Impact', desc: 'Clear positioning against state-of-the-art literature' },
    { key: 'statistics', name: '3. Statistical Validity', desc: 'Correct tests, p-value bounds, confidence intervals, error bars' },
    { key: 'writing', name: '4. Writing & Structure', desc: 'Clarity, figure legend quality, logical section progression' },
    { key: 'ethics', name: '5. Ethics & Approvals', desc: 'IRB/Animal protocol compliance, COI & trial registration' },
    { key: 'data', name: '6. Open Data Completeness', desc: 'Deposition in Zenodo, GEO, Figshare with stable DOIs' },
    { key: 'code', name: '7. Code & Executability', desc: 'Documented dependencies, reproducible Jupyter/Python scripts' },
    { key: 'recommendation', name: '8. Recommendation Rationale', desc: 'Justified decision: Accept, Minor, Major Revision, or Reject' },
  ];

  // Calculate simulated RRI impact
  const calculatedRRI = ((
    interactiveRubric.methodology + 
    interactiveRubric.novelty + 
    interactiveRubric.statistics + 
    interactiveRubric.writing + 
    interactiveRubric.ethics + 
    interactiveRubric.data + 
    interactiveRubric.code
  ) / 35 * 100).toFixed(1);

  return (
    <section id="rri" className="py-20 bg-slate-900 text-slate-100 border-b border-slate-800 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-mono">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>Digital Evolution Differentiator</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-editorial text-white tracking-tight">
            The Reviewer Reputation Index (RRI)
          </h2>

          <p className="text-base text-slate-300 leading-relaxed font-normal">
            Peer review has historically been uncredited invisible labor. The RRI changes that: peer reviews are rated by fellow reviewers and editors for thoroughness, clarity, and constructive value — converting review effort into a citable, portable academic credential.
          </p>
        </div>

        {/* 3 Pillars of RRI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-800/60 border border-slate-700/80 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-lg border border-cyan-500/30">
              01
            </div>
            <h3 className="text-lg font-bold text-white font-serif-editorial">
              Meta-Evaluated Quality
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Reviews are scored by editors and co-reviewers on objective rigor — not on whether the recommendation was "Accept" or "Reject".
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/80 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-lg">
              02
            </div>
            <h3 className="text-lg font-bold text-white font-serif-editorial">
              ORCID & CV Exportable
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Verified review activity and percentile scores sync automatically with your ORCID record and generate citable DOI badges for grant applications.
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/80 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-lg">
              03
            </div>
            <h3 className="text-lg font-bold text-white font-serif-editorial">
              8-Dimension Rubric
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Eliminating vague 2-line reviews. Every review systematically evaluates methodology, statistics, open code, open data, and writing.
            </p>
          </div>
        </div>

        {/* Interactive RRI Rubric & Reviewer Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: 8-Dimension Interactive Rubric Simulator */}
          <div className="lg:col-span-7 bg-slate-800/80 border border-slate-700 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
              <div>
                <h3 className="text-xl font-bold font-serif-editorial text-white">
                  The 8-Dimension Review Rubric
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Test the rubric dimensions to see how review quality compounds into RRI score:
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-xl text-center">
                <span className="text-[10px] uppercase font-mono block text-slate-400">Simulated RRI</span>
                <span className="text-lg font-bold font-mono">{calculatedRRI} / 100</span>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              {rubricDimensions.map((dim) => {
                const key = dim.key as keyof typeof interactiveRubric;
                const value = interactiveRubric[key] || 5;
                return (
                  <div key={dim.key} className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">{dim.name}</span>
                      {key !== 'recommendation' && (
                        <span className="font-mono text-amber-400 font-bold">{value} / 5</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">{dim.desc}</p>
                    
                    {key !== 'recommendation' && (
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={value}
                        onChange={(e) => setInteractiveRubric({ ...interactiveRubric, [key]: parseInt(e.target.value) })}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500 mt-2"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => onOpenGovernance('doc-reviewer-guidelines')}
                className="text-xs text-amber-400 font-semibold underline hover:text-amber-300 cursor-pointer"
              >
                Read Official Reviewer Guidelines
              </button>

              <button
                onClick={() => onOpenAuth('register')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Apply to Join RRI Reviewer Pool
              </button>
            </div>
          </div>

          {/* Right: Top Reviewer Cards & Profile Preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold font-serif-editorial text-white flex items-center justify-between">
                <span>Top RRI Verified Profiles</span>
                <span className="text-xs font-mono text-amber-400">99th Percentile</span>
              </h3>

              <div className="space-y-3">
                {TOP_REVIEWERS.map((rev) => (
                  <div
                    key={rev.id}
                    onClick={() => setSelectedReviewer(rev)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedReviewer.id === rev.id
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-white">{rev.name}</h4>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                            Top {100 - rev.percentile}%
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{rev.title}</p>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">{rev.institution}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-base font-bold font-mono text-amber-400 block">{rev.rriScore}</span>
                        <span className="text-[10px] text-slate-500 block">RRI Score</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {rev.badges.map((b) => (
                        <span key={b} className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded font-mono">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Reviewer Deep Dive Box */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg font-serif-editorial">
                  {selectedReviewer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{selectedReviewer.name}</h4>
                  <p className="text-xs text-slate-400">{selectedReviewer.institution}</p>
                  <a
                    href={`https://orcid.org/${selectedReviewer.orcid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-emerald-400 hover:underline inline-flex items-center gap-1 mt-0.5"
                  >
                    <span>ORCID: {selectedReviewer.orcid}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-800">
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Verified Reviews</span>
                  <span className="text-white font-bold text-sm">{selectedReviewer.totalReviews} Manuscripts</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Methodology Score</span>
                  <span className="text-amber-400 font-bold text-sm">{selectedReviewer.rubricScores.methodology} / 5.0</span>
                </div>
              </div>

              <button
                onClick={onOpenReviewerDashboard}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-3"
              >
                <Award className="w-4 h-4" />
                <span>Launch My Reviewer Reputation Portal</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
