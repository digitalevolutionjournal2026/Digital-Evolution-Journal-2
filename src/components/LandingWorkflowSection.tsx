import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  UserPlus, 
  Upload, 
  ShieldCheck, 
  Globe, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  Sparkles,
  BookOpen,
  Award,
  Link as LinkIcon,
  Search,
  Database,
  Cpu,
  Download,
  Lock,
  Layers,
  FileCheck
} from 'lucide-react';

interface LandingWorkflowSectionProps {
  onOpenSubmit: () => void;
  onOpenGovernance: (docId?: string) => void;
  onOpenAuth: (mode: 'signin' | 'register') => void;
  onNavigateToView: (view: string) => void;
}

export const LandingWorkflowSection: React.FC<LandingWorkflowSectionProps> = ({
  onOpenSubmit,
  onOpenGovernance,
  onOpenAuth,
  onNavigateToView,
}) => {
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<'join' | 'submit' | 'review' | 'indexing' | 'rules'>('join');

  const indexingPlatforms = [
    {
      name: 'Google Scholar',
      type: 'Global Citation Index',
      status: 'Fully Indexed & Crawled',
      badge: 'Active XML Feed',
      description: 'Automated Highwire Press HTML meta tag extraction and XML citation indexing for instant global discoverability.',
      icon: Search,
      color: 'from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30'
    },
    {
      name: 'Semantic Scholar',
      type: 'AI Scientific Knowledge Graph',
      status: 'Graph Mapped',
      badge: 'AI Knowledge Graph',
      description: 'Direct AI corpus ingestion for semantic citation graph mapping, influence calculation, and literature recommendation.',
      icon: Cpu,
      color: 'from-cyan-500/20 to-teal-500/20 text-cyan-400 border-cyan-500/30'
    },
    {
      name: 'ORCID Integration',
      type: 'Persistent Digital Identifier',
      status: '2-Way API Sync',
      badge: 'Authenticated ORCID iD',
      description: 'Seamlessly link your ORCID iD. Published articles and verified Reviewer Reputation Index (RRI) credits automatically sync to your ORCID record.',
      icon: LinkIcon,
      color: 'from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      name: 'Crossref DOIs',
      type: 'Digital Object Identifier',
      status: 'Direct Member',
      badge: 'Permanent DOI Minting',
      description: 'Every published manuscript receives a permanent Crossref DOI with full metadata and CRediT contributor matrix registration.',
      icon: Database,
      color: 'from-indigo-500/20 to-purple-500/20 text-indigo-400 border-indigo-500/30'
    },
    {
      name: 'DOAJ (Directory of Open Access Journals)',
      type: 'Open Access Repository',
      status: 'Gold Standards Compliant',
      badge: 'CC BY 4.0 Verified',
      description: 'Strict adherence to DOAJ open access principles, peer review transparency, and unrestricted reader accessibility.',
      icon: Globe,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30'
    },
    {
      name: 'Scopus & Web of Science',
      type: 'Master Journal Evaluation',
      status: 'Evaluation Phase',
      badge: 'COPE Compliant',
      description: 'Structured metadata output aligned with Clarivate Web of Science and Elsevier Scopus inclusion protocols.',
      icon: Layers,
      color: 'from-sky-500/20 to-blue-600/20 text-sky-400 border-sky-500/30'
    }
  ];

  const ruleDocs = [
    {
      id: 'doc-publication-ethics',
      title: 'Publication Ethics & Malpractice Policy',
      code: 'COPE-2026-ETHICS',
      summary: 'Strict guidelines on plagiarism prevention, double-blind review integrity, conflict of interest disclosures, and AI tool usage transparency.',
      tag: 'Mandatory Policy'
    },
    {
      id: 'doc-copyright-oa',
      title: 'Open Access & Creative Commons CC BY 4.0',
      code: 'OA-CC-BY-4.0',
      summary: 'Authors retain complete copyright ownership. Readers enjoy free, perpetual, unrestricted access to all published single-column manuscripts.',
      tag: 'Licensing Rule'
    },
    {
      id: 'doc-met15-rules',
      title: 'Single-Column MET-15 Parsing Specifications',
      code: 'MET15-FORMAT-2026',
      summary: 'Technical rules for manuscript formatting, single-column geometry, metadata extraction tags, and reference vector parsing.',
      tag: 'Technical Standard'
    },
    {
      id: 'doc-rri-scoring',
      title: 'Reviewer Reputation Index (RRI) & Conduct',
      code: 'RRI-GOVERNANCE-V2',
      summary: 'Rules governing peer reviewer accreditation, point calculation algorithms, double-blind review confidentiality, and CRediT validation.',
      tag: 'Reviewer Governance'
    }
  ];

  return (
    <section id="landing-workflow" className="py-16 lg:py-24 bg-slate-950 text-slate-100 border-b border-slate-800/80 relative overflow-hidden">
      
      {/* Soft Ambient Background Orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Journal Ecosystem Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-editorial font-bold text-white tracking-tight leading-tight">
            How Digital Evolution <span className="text-cyan-400 italic">Operates</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            A transparent, modern academic workflow designed for swift single-column publishing, verified peer reviewer credit, and global open access indexing.
          </p>
        </div>

        {/* Interactive Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 border-b border-slate-800 pb-4">
          {[
            { id: 'join', label: '1. How to Join', icon: UserPlus },
            { id: 'submit', label: '2. How to Submit', icon: Upload },
            { id: 'review', label: '3. How to Review', icon: ShieldCheck },
            { id: 'indexing', label: '4. How Indexing Works & ORCID', icon: Globe },
            { id: 'rules', label: '5. Rules & Governance Docs', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeWorkflowTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveWorkflowTab(tab.id as typeof activeWorkflowTab)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20 scale-105'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-2xl">
          
          {/* TAB 1: HOW TO JOIN */}
          {activeWorkflowTab === 'join' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Author Role */}
                <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-cyan-500/50 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-editorial text-xl font-bold text-white">Join as an Author</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Create a free research profile or link your existing <strong className="text-cyan-400">ORCID iD</strong>. Submit single-column manuscripts and track parsing status live in your workspace.
                  </p>
                  <button
                    onClick={() => onOpenAuth('register')}
                    className="w-full mt-2 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 font-bold text-xs px-4 py-2.5 rounded-xl border border-cyan-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Register Author Account</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Reviewer Role */}
                <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-cyan-500/50 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-editorial text-xl font-bold text-white">Join as a Peer Reviewer</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Earn citable <strong className="text-blue-400">Reviewer Reputation Index (RRI)</strong> points for every verified double-blind peer review. Sync review credits to your ORCID profile.
                  </p>
                  <button
                    onClick={() => onNavigateToView('reviewer-rri')}
                    className="w-full mt-2 bg-slate-800 hover:bg-blue-500 hover:text-slate-950 text-blue-400 font-bold text-xs px-4 py-2.5 rounded-xl border border-blue-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Explore RRI Review System</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Institution Role */}
                <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-cyan-500/50 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-editorial text-xl font-bold text-white">Institutional Members</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Universities, research labs, and open science consortiums can sponsor APC-free publication waivers for their affiliated faculty and researchers.
                  </p>
                  <button
                    onClick={() => onNavigateToView('pricing-membership')}
                    className="w-full mt-2 bg-slate-800 hover:bg-indigo-500 hover:text-slate-950 text-indigo-400 font-bold text-xs px-4 py-2.5 rounded-xl border border-indigo-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Institutional Memberships</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* ORCID iD Highlight Banner */}
              <div className="bg-gradient-to-r from-emerald-950/80 via-slate-950 to-cyan-950/80 border border-emerald-500/40 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0 font-bold text-sm">
                    iD
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                      <span>ORCID iD Integration Active</span>
                      <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">OAuth 2.0 API</span>
                    </h4>
                    <p className="text-xs text-slate-300">
                      Connect your authenticated ORCID iD during sign in. Your published papers and verified peer review activity are auto-pushed to your ORCID record.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shrink-0 flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>Connect ORCID iD</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 2: HOW TO SUBMIT */}
          {activeWorkflowTab === 'submit' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl relative space-y-3">
                  <span className="text-3xl font-mono font-bold text-cyan-400/40">01</span>
                  <h3 className="font-serif-editorial text-lg font-bold text-white">Single-Column Preparation</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Prepare your manuscript using our standardized 1-column Word (.docx) or LaTeX templates. Ensures optimal responsive reading across mobile and desktop.
                  </p>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl relative space-y-3">
                  <span className="text-3xl font-mono font-bold text-cyan-400/40">02</span>
                  <h3 className="font-serif-editorial text-lg font-bold text-white">MET-15 Automated Parser</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Upload your file to our instant parser. The system validates reference vectors, figures, equations, and generates the CRediT contributor matrix automatically.
                  </p>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl relative space-y-3">
                  <span className="text-3xl font-mono font-bold text-cyan-400/40">03</span>
                  <h3 className="font-serif-editorial text-lg font-bold text-white">Double-Blind Peer Review</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Your anonymized paper is assigned to credentialed subject-matter reviewers. Average review cycle is 14 days with real-time editorial status tracking.
                  </p>
                </div>

              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950/80 border border-slate-800 p-6 rounded-2xl">
                <div>
                  <h4 className="font-serif-editorial text-lg font-bold text-white">Ready to submit your research?</h4>
                  <p className="text-xs text-slate-400 font-mono">
                    Single-column MET-15 parser • CRediT Matrix Assignment • Instant Crossref DOI
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onOpenGovernance('doc-met15-rules')}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Download Templates (.DOCX)</span>
                  </button>
                  <button
                    onClick={onOpenSubmit}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <FileCheck className="w-4 h-4 text-slate-950" />
                    <span>Open Submission Portal</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: HOW TO REVIEW */}
          {activeWorkflowTab === 'review' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif-editorial text-lg font-bold text-white">Double-Blind Protocol</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Reviewer identity is strictly confidential. Authors and reviewers remain anonymous to prevent bias and uphold rigorous academic integrity.
                  </p>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif-editorial text-lg font-bold text-white">RRI Credit Scoring</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Every completed review earns Reviewer Reputation Index (RRI) points based on thoroughness, promptness, and constructive feedback rating.
                  </p>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <LinkIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif-editorial text-lg font-bold text-white">ORCID Peer Review Push</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Upon manuscript editorial resolution, your verified peer review credit is automatically recorded on your authenticated ORCID profile.
                  </p>
                </div>

              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => onNavigateToView('reviewer-rri')}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4 text-slate-950" />
                  <span>Launch Reviewer Reputation Index Dashboard</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 4: HOW INDEXING WORKS & WHERE LISTED */}
          {activeWorkflowTab === 'indexing' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="font-serif-editorial text-2xl font-bold text-white">
                  Global Indexing & Discovery Channels
                </h3>
                <p className="text-slate-300 text-sm">
                  All manuscripts published in <strong className="text-cyan-400">Digital Evolution Journal</strong> are automatically distributed to major scientific repositories and citation search engines.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {indexingPlatforms.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <div
                      key={platform.name}
                      className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-3 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className={`p-2 rounded-xl bg-gradient-to-br ${platform.color} border`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-cyan-300">
                            {platform.badge}
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-base">{platform.name}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {platform.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-300">
                        <span>Status: <strong className="text-cyan-400">{platform.status}</strong></span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 5: RULES & GOVERNANCE DOCUMENTS */}
          {activeWorkflowTab === 'rules' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif-editorial text-2xl font-bold text-white">
                    Official Journal Rules & Policies
                  </h3>
                  <p className="text-slate-300 text-sm">
                    Read and download official governance handbooks, copyright rules, and publication ethics statements.
                  </p>
                </div>
                <button
                  onClick={() => onNavigateToView('rules-governance')}
                  className="bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold font-mono px-4 py-2.5 rounded-xl border border-cyan-500/30 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>View All Rules (.DOCX)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {ruleDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-3 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-800 px-2 py-0.5 rounded">
                          {doc.code}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                          {doc.tag}
                        </span>
                      </div>
                      <h4 className="font-serif-editorial text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {doc.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {doc.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => onOpenGovernance(doc.id)}
                        className="text-xs text-cyan-400 hover:underline font-mono font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open Rule Document</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[10px] font-mono text-slate-400">PDF / DOCX</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
};
