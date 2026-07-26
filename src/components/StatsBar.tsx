import React from 'react';
import { 
  BookOpen, 
  Users, 
  Clock, 
  TrendingUp, 
} from 'lucide-react';

export const StatsBar: React.FC = () => {
  const stats = [
    { label: 'Gold OA Articles', value: '1,420+', icon: BookOpen },
    { label: 'RRI Verified Reviewers', value: '3,850+', icon: Users },
    { label: 'Avg Decision Time', value: '21 Days', icon: Clock },
    { label: 'Global Crossref Citations', value: '28,400+', icon: TrendingUp },
  ];

  return (
    <section className="bg-slate-950 border-b border-slate-800/60 py-6 text-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="flex items-center gap-3 pt-3 md:pt-0 md:px-4 first:pt-0 first:px-0"
              >
                <div className="p-2 rounded-lg bg-slate-900 text-cyan-400 shrink-0 border border-slate-800 shadow-sm shadow-cyan-500/10">
                  <Icon className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <div className="text-xl font-bold font-serif-editorial text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-sans">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

