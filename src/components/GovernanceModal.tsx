import React, { useState } from 'react';
import { GOVERNANCE_DOCUMENTS } from '../data/journalData';
import { 
  X, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  BookOpen, 
  Award, 
  ExternalLink,
  Printer
} from 'lucide-react';

interface GovernanceModalProps {
  initialDocId?: string;
  onClose: () => void;
}

export const GovernanceModal: React.FC<GovernanceModalProps> = ({
  initialDocId = 'doc-copyright-oa',
  onClose,
}) => {
  const [selectedDocId, setSelectedDocId] = useState<string>(initialDocId);

  const selectedDoc = GOVERNANCE_DOCUMENTS.find(d => d.id === selectedDocId) || GOVERNANCE_DOCUMENTS[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-editorial text-white">
                Platform Governance & Legal Framework
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Digital Evolution Journal • COPE Compliant Policies
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

        {/* Documents Tab Bar */}
        <div className="bg-slate-100 dark:bg-slate-950 px-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 text-xs font-medium">
          {GOVERNANCE_DOCUMENTS.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setSelectedDocId(doc.id)}
              className={`py-3 px-3.5 border-b-2 font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedDocId === doc.id
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-900 rounded-t-lg'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {doc.title.split(' (')[0]}
            </button>
          ))}
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm leading-relaxed">
          
          <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-4 gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {selectedDoc.category}
              </span>
              <h3 className="text-2xl font-bold font-serif-editorial text-slate-900 dark:text-white mt-1">
                {selectedDoc.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                Last updated: {selectedDoc.lastUpdated} • Binding Editorial Policy
              </p>
            </div>

            {selectedDoc.downloadUrl && (
              <a
                href={selectedDoc.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all shrink-0 cursor-pointer"
              >
                <span>Download Official .DOCX</span>
              </a>
            )}
          </div>

          {/* Key Summary Highlights */}
          <div className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl space-y-2">
            <h4 className="text-xs font-bold font-mono text-amber-700 dark:text-amber-300 uppercase tracking-wider">
              Core Principles & Enforced Guidelines:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
              {selectedDoc.summaryPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Markdown Content Representation */}
          <div className="bg-slate-50 dark:bg-slate-950/60 p-5 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs whitespace-pre-wrap text-slate-800 dark:text-slate-200 leading-relaxed">
            {selectedDoc.fullMarkdown}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 dark:bg-slate-950 p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs shrink-0">
          <span className="text-slate-500 dark:text-slate-400 font-mono">
            Contact Editorial Office: support@digitalevolutionjournal.com
          </span>

          <button
            onClick={onClose}
            className="bg-slate-900 dark:bg-slate-800 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
