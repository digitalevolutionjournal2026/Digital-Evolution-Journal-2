import React, { useState } from 'react';
import { 
  X, 
  Award, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Send, 
  Star, 
  ShieldCheck, 
  User, 
  ExternalLink, 
  AlertCircle,
  TrendingUp,
  Download,
  Check,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface ReviewerDashboardModalProps {
  onClose: () => void;
  onOpenGovernance: (docId?: string) => void;
}

interface PendingInvitation {
  id: string;
  manuscriptTitle: string;
  journalName: string;
  dateInvited: string;
  dueDate: string;
  abstract: string;
  status: 'pending' | 'accepted' | 'declined' | 'submitted';
}

export const ReviewerDashboardModal: React.FC<ReviewerDashboardModalProps> = ({
  onClose,
  onOpenGovernance,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'invitations' | 'history' | 'badge'>('overview');
  
  // Reviewer Profile Data
  const reviewer = {
    name: 'Dr. Aris Thorne',
    orcid: '0000-0002-1825-0097',
    affiliation: 'University of Oxford',
    overallRriScore: 4.88,
    totalReviewsCompleted: 19,
    avgTurnaroundDays: 8.2,
    percentile: 'Top 3% Reviewer Worldwide',
    subScores: {
      scientificRigor: 4.9,
      timeliness: 4.8,
      constructiveFeedback: 4.95,
      openDataVerification: 4.7,
    },
  };

  const [showCertificateToast, setShowCertificateToast] = useState<boolean>(false);

  const handleDownloadCertificate = () => {
    const certHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Official Reviewer Certificate - ${reviewer.name}</title>
  <style>
    body { font-family: 'Georgia', serif; background: #fdfbf7; color: #1e293b; padding: 40px; margin: 0; }
    .cert-border { border: 10px double #b45309; padding: 50px; background: #ffffff; text-align: center; max-width: 800px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border-radius: 8px; }
    .header { font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: #b45309; font-weight: bold; font-family: monospace; }
    .title { font-size: 30px; font-weight: bold; margin: 20px 0; color: #0f172a; border-bottom: 2px solid #f59e0b; padding-bottom: 15px; }
    .recipient { font-size: 26px; font-weight: bold; color: #b45309; margin: 15px 0; }
    .details { font-size: 15px; line-height: 1.8; margin: 25px 0; color: #334155; }
    .seal { display: inline-block; border: 3px double #b45309; border-radius: 12px; padding: 15px 25px; font-family: monospace; font-size: 12px; font-weight: bold; color: #b45309; background: #fffbeb; margin-top: 20px; }
    .footer { margin-top: 40px; font-size: 11px; color: #64748b; font-family: monospace; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 15px; }
  </style>
</head>
<body>
  <div class="cert-border">
    <div class="header">Digital Evolution Press • Open Peer Review Registry</div>
    <div class="title">Official Certificate of Peer Review Excellence</div>
    <p>This is to certify that</p>
    <div class="recipient">${reviewer.name}</div>
    <p style="font-family: monospace; font-size: 13px;">ORCID iD: ${reviewer.orcid} | Affiliation: ${reviewer.affiliation}</p>
    <div class="details">
      has completed <strong>${reviewer.totalReviewsCompleted} verified double-blind peer reviews</strong> with an overall <strong>Reviewer Reliability Index (RRI) of ${reviewer.overallRriScore} / 5.0</strong>.
      <br/><br/>
      Recognized in the <strong>${reviewer.percentile}</strong> for methodology validation, statistical audit rigor, and open data compliance.
    </div>
    <div class="seal">
      ★ OFFICIAL DE GOLD SEAL REVIEWER ★<br/>
      VERIFICATION DOI / HASH: 0xDE${Date.now().toString(16).toUpperCase()}
    </div>
    <div class="footer">
      <span>Issued: ${new Date().toISOString().split('T')[0]}</span>
      <span>Digital Evolution Editorial Council</span>
      <span>CC BY 4.0 License Verified</span>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([certHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Official_Peer_Reviewer_Certificate_${reviewer.name.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setShowCertificateToast(true);
    setTimeout(() => setShowCertificateToast(false), 4000);
  };

  const [invitations, setInvitations] = useState<PendingInvitation[]>([
    {
      id: 'INV-2026-081',
      manuscriptTitle: 'Neural Attention Dynamics in Autonomous Peer Review Transformers',
      journalName: 'Journal of AI & Machine Learning',
      dateInvited: '2026-07-20',
      dueDate: '2026-08-05',
      abstract: 'This paper proposes a single-column transformer model for automated extraction of academic citations, CRediT contribution matrices, and statistical figures...',
      status: 'pending',
    },
    {
      id: 'INV-2026-044',
      manuscriptTitle: 'Single-Cell Epigenomic Landscapes of Neural Plasticity',
      journalName: 'Journal of Biological Systems',
      dateInvited: '2026-07-15',
      dueDate: '2026-07-30',
      abstract: 'Using high-throughput ATAC-seq, we profile chromatin accessibility across 50,000 single neuronal nuclei...',
      status: 'accepted',
    },
  ]);

  const [reviewHistory] = useState([
    {
      id: 'REV-2026-012',
      title: 'Fault-Tolerant Quantum Surface Codes with Sub-Microsecond Latency',
      journal: 'Quantum Science & Technology',
      dateSubmitted: '2026-06-12',
      rriEarned: '+0.15 RRI',
      status: 'Published & Verified',
      orcidSynced: true,
    },
    {
      id: 'REV-2026-003',
      title: 'Decentralized Autonomous Peer Review Protocols on L2 Blockchains',
      journal: 'Journal of AI & Machine Learning',
      dateSubmitted: '2026-05-02',
      rriEarned: '+0.18 RRI',
      status: 'Published & Verified',
      orcidSynced: true,
    },
  ]);

  const [submittingReviewFor, setSubmittingReviewFor] = useState<PendingInvitation | null>(null);
  const [reviewScore, setReviewScore] = useState<number>(5);
  const [reviewText, setReviewText] = useState<string>('');
  const [confidentialEditorNote, setConfidentialEditorNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);

  const handleAcceptInvite = (id: string) => {
    setInvitations(prev =>
      prev.map(inv => inv.id === id ? { ...inv, status: 'accepted' } : inv)
    );
  };

  const handleDeclineInvite = (id: string) => {
    setInvitations(prev =>
      prev.map(inv => inv.id === id ? { ...inv, status: 'declined' } : inv)
    );
  };

  const handleOpenReviewForm = (inv: PendingInvitation) => {
    setSubmittingReviewFor(inv);
    setReviewScore(5);
    setReviewText('Overall, this is a well-structured manuscript with strong methodology. Major strengths include...\n\nSuggestions for improvement:\n1. Section 3.2 needs clearer error bounds...\n2. Table 1 should clarify the training dataset splits.');
    setConfidentialEditorNote('Suitable for publication with minor revisions.');
    setSubmittedSuccess(false);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      if (submittingReviewFor) {
        setInvitations(prev =>
          prev.map(inv => inv.id === submittingReviewFor.id ? { ...inv, status: 'submitted' } : inv)
        );
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      {/* Certificate Download Toast */}
      {showCertificateToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[80] bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-mono font-bold border border-emerald-400 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span>Official Reviewer Certificate generated and downloaded! Check your downloads folder.</span>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold font-serif-editorial text-white">
                  Reviewer Reputation Index (RRI) Portal
                </h2>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase">
                  Verified Reviewer
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {reviewer.name} • ORCID: {reviewer.orcid} • {reviewer.affiliation}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-100 dark:bg-slate-950 px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 text-xs font-medium">
          {[
            { id: 'overview', label: 'RRI Metrics & Scorecard' },
            { id: 'invitations', label: `Pending Invitations (${invitations.filter(i => i.status !== 'declined' && i.status !== 'submitted').length})` },
            { id: 'history', label: `Peer Review History (${reviewHistory.length})` },
            { id: 'badge', label: 'RRI Badge & ORCID Claim' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setSubmittingReviewFor(null);
              }}
              className={`py-3 px-3.5 border-b-2 font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-900 rounded-t-lg'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          
          {/* TAB 1: OVERVIEW METRICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Top Highlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block font-bold">
                    Composite RRI Score
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-mono text-amber-300">
                      {reviewer.overallRriScore}
                    </span>
                    <span className="text-xs text-slate-400">/ 5.00</span>
                  </div>
                  <p className="text-[11px] text-emerald-400 font-mono">
                    {reviewer.percentile}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-bold">
                    Reviews Completed
                  </span>
                  <span className="text-3xl font-bold font-mono text-slate-900 dark:text-white block">
                    {reviewer.totalReviewsCompleted}
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    100% Citable DOIs
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-bold">
                    Avg Review Turnaround
                  </span>
                  <span className="text-3xl font-bold font-mono text-slate-900 dark:text-white block">
                    {reviewer.avgTurnaroundDays} <span className="text-xs font-normal text-slate-500">days</span>
                  </span>
                  <p className="text-[11px] text-emerald-500 font-mono">
                    ⚡ 40% faster than average
                  </p>
                </div>
              </div>

              {/* Sub-Score Breakdown */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-slate-900 dark:text-white">
                  RRI Sub-Rubric Breakdown (Calculated by Managing Editors)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Scientific Rigor & Methodology', score: reviewer.subScores.scientificRigor },
                    { label: 'Constructive Feedback Detail', score: reviewer.subScores.constructiveFeedback },
                    { label: 'Review Timeliness & Speed', score: reviewer.subScores.timeliness },
                    { label: 'Open Code & Data Verification', score: reviewer.subScores.openDataVerification },
                  ].map((sub, idx) => (
                    <div key={idx} className="space-y-1 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700 dark:text-slate-300">{sub.label}</span>
                        <span className="font-mono font-bold text-amber-500">{sub.score} / 5.0</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-amber-500 h-full rounded-full" 
                          style={{ width: `${(sub.score / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PENDING INVITATIONS */}
          {activeTab === 'invitations' && (
            <div className="space-y-6">
              
              {submittingReviewFor ? (
                /* Review Submission Form */
                <form onSubmit={handleSubmitReview} className="space-y-4 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                    <div>
                      <span className="text-xs font-mono text-amber-500 font-bold uppercase">
                        Submitting Peer Review For:
                      </span>
                      <h4 className="font-bold text-base font-serif-editorial text-slate-900 dark:text-white">
                        {submittingReviewFor.manuscriptTitle}
                      </h4>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSubmittingReviewFor(null)}
                      className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white font-mono"
                    >
                      Cancel
                    </button>
                  </div>

                  {submittedSuccess ? (
                    <div className="p-8 text-center space-y-4">
                      <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-bold font-serif-editorial">
                        Review Submitted & Credited!
                      </h4>
                      <p className="text-xs text-slate-500 max-w-md mx-auto font-mono">
                        Your review report has been transmitted to the Editor-in-Chief. You earned <strong>+0.15 RRI Points</strong> and your record has been synced to ORCID.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmittingReviewFor(null);
                          setSubmittedSuccess(false);
                        }}
                        className="bg-amber-500 text-slate-950 font-bold text-xs px-6 py-2.5 rounded-xl"
                      >
                        Return to Invitations
                      </button>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                          Overall Recommendation Score (1 to 5):
                        </label>
                        <select
                          value={reviewScore}
                          onChange={(e) => setReviewScore(Number(e.target.value))}
                          className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-bold"
                        >
                          <option value={5}>5 - Accept with Minor Revisions</option>
                          <option value={4}>4 - Accept with Major Revisions</option>
                          <option value={3}>3 - Revise and Resubmit</option>
                          <option value={2}>2 - Reject (Substantial Methodological Flaws)</option>
                          <option value={1}>1 - Reject Immediately</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                          Detailed Review Report (Visible to Authors):
                        </label>
                        <textarea
                          rows={6}
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                          Confidential Comments to Editor (Optional):
                        </label>
                        <input
                          type="text"
                          value={confidentialEditorNote}
                          onChange={(e) => setConfidentialEditorNote(e.target.value)}
                          className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs"
                        />
                      </div>

                      <div className="pt-2 flex justify-end gap-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-6 py-2.5 rounded-xl cursor-pointer shadow-md flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{isSubmitting ? 'Transmitting Review...' : 'Submit Official Review Report'}</span>
                        </button>
                      </div>
                    </>
                  )}
                </form>
              ) : (
                <div className="space-y-4">
                  {invitations.map((inv) => (
                    <div key={inv.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-2">
                        <span className="text-xs font-mono font-bold text-amber-500">
                          {inv.journalName} • Due Date: {inv.dueDate}
                        </span>

                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          inv.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                          inv.status === 'declined' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}>
                          Status: {inv.status}
                        </span>
                      </div>

                      <h4 className="font-bold font-serif-editorial text-base text-slate-900 dark:text-white">
                        {inv.manuscriptTitle}
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                        {inv.abstract}
                      </p>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-slate-400">
                          ID: {inv.id}
                        </span>

                        <div className="flex items-center gap-2">
                          {inv.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleDeclineInvite(inv.id)}
                                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                              >
                                Decline
                              </button>
                              <button
                                onClick={() => handleAcceptInvite(inv.id)}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-1.5 rounded-lg shadow"
                              >
                                Accept Review Invitation
                              </button>
                            </>
                          )}

                          {inv.status === 'accepted' && (
                            <button
                              onClick={() => handleOpenReviewForm(inv)}
                              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-1.5 rounded-lg shadow flex items-center gap-1.5"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>Submit Peer Review Report</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* TAB 3: REVIEW HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold font-mono text-slate-900 dark:text-white block">
                    Verified Contributions Logged
                  </span>
                  <span className="text-slate-500 font-mono">
                    All reviews automatically grant citable DOI credit via Digital Evolution Press.
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {reviewHistory.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                        <span className="text-amber-500 font-bold">{item.journal}</span>
                        <span>•</span>
                        <span>Submitted: {item.dateSubmitted}</span>
                      </div>
                      <h4 className="font-bold text-sm font-serif-editorial text-slate-900 dark:text-white">
                        {item.title}
                      </h4>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 block">
                        {item.rriEarned}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                        ORCID Synced ✓
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BADGE & ORCID CLAIM */}
          {activeTab === 'badge' && (
            <div className="space-y-6 text-center py-4">
              <div className="max-w-md mx-auto space-y-4 bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-xl">
                <div className="w-16 h-16 bg-amber-500/20 border border-amber-500/40 text-amber-400 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                    Official Academic Credentials
                  </span>
                  <h3 className="text-2xl font-bold font-serif-editorial text-white mt-1">
                    Gold Reviewer Certificate
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 font-mono">
                    Verified RRI Rating: {reviewer.overallRriScore} • Top 3% Peer Reviewer
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={`https://orcid.org/${reviewer.orcid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2"
                  >
                    <span>iD Sync to ORCID Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={handleDownloadCertificate}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Download Official PDF Certificate</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-100 dark:bg-slate-950 p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs shrink-0">
          <span className="text-slate-500 font-mono">
            RRI Peer Review Standard • COPE Compliant
          </span>
          <button
            onClick={onClose}
            className="bg-slate-900 dark:bg-slate-800 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
