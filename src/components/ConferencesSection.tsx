import React from 'react';
import { CONFERENCES } from '../data/journalData';
import { 
  Calendar, 
  MapPin, 
  FileCheck, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Globe,
  Upload
} from 'lucide-react';

interface ConferencesSectionProps {
  onOpenSubmit: () => void;
}

export const ConferencesSection: React.FC<ConferencesSectionProps> = ({ onOpenSubmit }) => {
  return (
    <section id="conferences" className="py-20 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-mono mb-2">
              <Globe className="w-3.5 h-3.5" />
              <span>Conferences & Proceedings Module</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-serif-editorial text-white tracking-tight">
              International Symposia & Proceedings
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Digital Evolution hosts top-tier academic conference proceedings using the same single-column submission & RRI peer review engine.
            </p>
          </div>

          <button
            onClick={onOpenSubmit}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shrink-0"
          >
            <Upload className="w-4 h-4" />
            <span>Submit Paper to Symposium</span>
          </button>
        </div>

        {/* Conference Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CONFERENCES.map((conf) => (
            <div
              key={conf.id}
              className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-blue-500/60 transition-all shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 text-xs font-mono">
                  <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-0.5 rounded font-bold">
                    {conf.code}
                  </span>
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded font-semibold">
                    {conf.status}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-serif-editorial text-white leading-snug">
                  {conf.name}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  <strong className="text-white">Symposium Theme:</strong> {conf.theme}
                </p>

                <div className="space-y-2 text-xs font-mono text-slate-300 pt-2 border-t border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Date: <strong className="text-white">{conf.date}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Location: <strong className="text-white">{conf.location}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>CFP Deadline: <strong className="text-emerald-400 font-bold">{conf.cfpDeadline}</strong></span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">
                  DOI: {conf.proceedingsDoi}
                </span>

                <button
                  onClick={onOpenSubmit}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-lg transition-all cursor-pointer"
                >
                  Submit Paper
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
