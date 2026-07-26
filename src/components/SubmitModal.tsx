import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  CheckCircle2, 
  FileText, 
  AlertCircle, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Code,
  Database
} from 'lucide-react';
import { JOURNALS } from '../data/journalData';

interface SubmitModalProps {
  onClose: () => void;
  onOpenGovernance: (docId?: string) => void;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({
  onClose,
  onOpenGovernance,
}) => {
  const [step, setStep] = useState<number>(1);
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedJournal, setSelectedJournal] = useState<string>(JOURNALS[0].name);
  const [title, setTitle] = useState<string>('Neural Attention Dynamics in Autonomous Peer Review Transformers');
  const [abstract, setAbstract] = useState<string>('This paper proposes a single-column transformer model for automated extraction of academic citations, CRediT contribution matrices, and statistical figures...');
  const [authorName, setAuthorName] = useState<string>('Dr. Aris Thorne');
  const [affiliation, setAffiliation] = useState<string>('Department of Computer Science, University of Oxford');
  const [orcid, setOrcid] = useState<string>('0000-0002-1825-0097');
  
  // Mandatory Disclosures & Agreements
  const [acceptedLicense, setAcceptedLicense] = useState<boolean>(false);
  const [acceptedEthics, setAcceptedEthics] = useState<boolean>(false);
  const [aiDisclosed, setAiDisclosed] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
    }
  };

  const handleFinalSubmit = () => {
    if (!acceptedLicense || !acceptedEthics) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const receiptId = `DE-SUB-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedReceipt(receiptId);
      setStep(3);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-editorial text-white">
                Manuscript Submission Wizard
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Single-Column DOCX / LaTeX / PDF Automated Parsing Engine
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

        {/* Progress Steps */}
        <div className="bg-slate-100 dark:bg-slate-950 px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-amber-500 font-bold' : 'text-slate-400'}`}>
            <span className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[10px]">1</span>
            <span>1. Upload File</span>
          </div>
          <div className="w-8 h-[1px] bg-slate-300 dark:bg-slate-800" />
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-amber-500 font-bold' : 'text-slate-400'}`}>
            <span className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[10px]">2</span>
            <span>2. Verify Metadata & License</span>
          </div>
          <div className="w-8 h-[1px] bg-slate-300 dark:bg-slate-800" />
          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-emerald-500 font-bold' : 'text-slate-400'}`}>
            <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[10px]">3</span>
            <span>3. Submission Receipt</span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          
          {/* STEP 1: FILE UPLOAD */}
          {step === 1 && (
            <div className="space-y-6">
              
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs leading-relaxed space-y-1">
                <span className="font-bold font-mono text-amber-600 dark:text-amber-400 block uppercase">
                  Important Formatting Requirement:
                </span>
                <p className="text-slate-700 dark:text-slate-300">
                  Manuscripts MUST be formatted in a <strong>single-column layout</strong> (DOCX, LaTeX, or PDF). 
                  Two-column layouts break automated section, table, and reference extraction algorithms.
                </p>
              </div>

              {/* Target Journal Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold font-mono text-slate-700 dark:text-slate-300 uppercase">
                  Select Target Journal:
                </label>
                <select
                  value={selectedJournal}
                  onChange={(e) => setSelectedJournal(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-amber-500"
                >
                  {JOURNALS.map((j) => (
                    <option key={j.id} value={j.name}>
                      {j.name} (Avg Review: {j.avgReviewDays} days)
                    </option>
                  ))}
                </select>
              </div>

              {/* Drag and Drop File Upload Zone */}
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-amber-500 rounded-2xl p-8 text-center space-y-3 bg-slate-50/50 dark:bg-slate-800/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-base">
                    {fileName ? `Attached File: ${fileName}` : 'Drop your Single-Column Manuscript here'}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Accepts .docx, .tex, or .pdf (Max 50MB)
                  </p>
                </div>

                <label className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-all shadow-md">
                  <Upload className="w-4 h-4" />
                  <span>Choose File from Computer</span>
                  <input
                    type="file"
                    accept=".docx,.pdf,.tex"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Proceed to Auto-Extracted Metadata</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: VERIFY METADATA & ACCEPT LICENSE */}
          {step === 2 && (
            <div className="space-y-6">
              
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex items-center gap-3 text-xs text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
                <span>
                  Parser extracted single-column structured content. Please verify author details and sign required legal disclosures below.
                </span>
              </div>

              {/* Title & Abstract Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold font-mono text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Extracted Title:
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-serif-editorial font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold font-mono text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Structured Abstract:
                  </label>
                  <textarea
                    rows={3}
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-200"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold font-mono text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Corresponding Author:
                    </label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold font-mono text-slate-700 dark:text-slate-300 uppercase mb-1">
                      ORCID iD:
                    </label>
                    <input
                      type="text"
                      value={orcid}
                      onChange={(e) => setOrcid(e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-mono text-emerald-600 dark:text-emerald-400"
                    />
                  </div>
                </div>
              </div>

              {/* Mandatory Legal & Ethical Disclosures */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-3">
                <h4 className="text-xs font-bold font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  Mandatory Disclosures & Copyright Agreement:
                </h4>

                <label className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedLicense}
                    onChange={(e) => setAcceptedLicense(e.target.checked)}
                    className="mt-1 accent-amber-500 rounded"
                  />
                  <span className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                    I agree to the <strong className="text-slate-900 dark:text-white">Copyright Retention & Open Access License Agreement (CC BY 4.0)</strong>. I retain copyright and grant Digital Evolution Press a non-exclusive license to publish.
                  </span>
                </label>

                <label className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedEthics}
                    onChange={(e) => setAcceptedEthics(e.target.checked)}
                    className="mt-1 accent-amber-500 rounded"
                  />
                  <span className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                    I declare full compliance with <strong className="text-slate-900 dark:text-white">COPE Publication Ethics</strong>. All authors have declared conflicts of interest and verified data integrity.
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  Back to File Upload
                </button>

                <button
                  disabled={!acceptedLicense || !acceptedEthics || isSubmitting}
                  onClick={handleFinalSubmit}
                  className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Executing Submission...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Submit Manuscript to Editorial Screening</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: SUBMISSION RECEIPT */}
          {step === 3 && (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-serif-editorial text-slate-900 dark:text-white">
                  Manuscript Received Successfully!
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
                  Your single-column submission has entered the editorial screening pipeline. An official receipt has been dispatched to your email address.
                </p>
              </div>

              <div className="bg-slate-900 text-amber-300 p-4 rounded-xl border border-slate-800 font-mono text-xs max-w-md mx-auto space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-500">Submission Receipt ID:</span>
                  <span className="font-bold text-white">{submittedReceipt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Journal:</span>
                  <span className="text-slate-200">{selectedJournal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Corresponding Author:</span>
                  <span className="text-slate-200">{authorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">License Granted:</span>
                  <span className="text-emerald-400">CC BY 4.0 Open Access</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer"
              >
                Return to Journal Portal
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
