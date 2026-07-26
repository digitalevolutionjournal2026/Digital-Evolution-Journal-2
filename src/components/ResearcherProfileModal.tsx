import React, { useState, useEffect } from 'react';
import { 
  X, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  Quote, 
  ShieldCheck, 
  TrendingUp, 
  UserCheck, 
  Users, 
  Star, 
  Bookmark, 
  Mail, 
  Building, 
  Layers, 
  Eye,
  Sparkles,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { RESEARCHER_PROFILES } from '../data/journalData';
import { ResearcherProfile, Article } from '../types';

interface ResearcherProfileModalProps {
  initialResearcherId?: string;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const ResearcherProfileModal: React.FC<ResearcherProfileModalProps> = ({
  initialResearcherId = 'res-elena-rostova',
  onClose,
  onSelectArticle,
}) => {
  const [selectedId, setSelectedId] = useState<string>(initialResearcherId);
  const [activeTab, setActiveTab] = useState<'articles' | 'reviews' | 'rri' | 'bookmarks'>('articles');
  const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('de_bookmarked_articles');
    return saved ? JSON.parse(saved) : ['art-001', 'art-002'];
  });

  const profile: ResearcherProfile = RESEARCHER_PROFILES.find(p => p.id === selectedId) || RESEARCHER_PROFILES[0];

  useEffect(() => {
    localStorage.setItem('de_bookmarked_articles', JSON.stringify(bookmarkedArticleIds));
  }, [bookmarkedArticleIds]);

  const toggleBookmark = (artId: string) => {
    setBookmarkedArticleIds(prev => 
      prev.includes(artId) ? prev.filter(id => id !== artId) : [...prev, artId]
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header Bar with Researcher Switcher & Close */}
        <div className="p-4 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-start justify-between gap-4 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            
            {/* Avatar Initials Circle */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold font-serif-editorial text-2xl flex items-center justify-center shadow-lg shrink-0 border-2 border-amber-300">
              {profile.avatarInitials}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Verified Researcher Profile
                </span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono px-2 py-0.5 rounded font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>RRI Verified Level 5</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-white flex items-center gap-2">
                <span>{profile.name}</span>
              </h2>

              <p className="text-xs text-slate-300 mt-0.5 font-medium">
                {profile.title} • <span className="text-amber-400">{profile.institution}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Researcher Selector Dropdown */}
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="bg-slate-800 text-slate-200 text-xs font-mono border border-slate-700 px-3 py-2 rounded-xl focus:outline-none focus:border-amber-500 cursor-pointer hidden sm:block"
            >
              {RESEARCHER_PROFILES.map(p => (
                <option key={p.id} value={p.id}>Switch: {p.name}</option>
              ))}
            </select>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Researcher Stats Row */}
        <div className="bg-slate-900 p-4 border-b border-slate-800 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center shrink-0">
          
          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">RRI Reputation</span>
            <span className="text-lg font-bold font-mono text-amber-400 block">{profile.rriScore} / 5.0</span>
            <span className="text-[9px] text-emerald-400 font-mono">Top {100 - profile.percentile}% Global</span>
          </div>

          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Total Citations</span>
            <span className="text-lg font-bold font-mono text-white block">{profile.totalCitations}</span>
            <span className="text-[9px] text-slate-500 font-mono">h-index: {profile.hIndex}</span>
          </div>

          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Verified Reviews</span>
            <span className="text-lg font-bold font-mono text-emerald-400 block">{profile.verifiedReviewsCount}</span>
            <span className="text-[9px] text-slate-500 font-mono">100% On-Time</span>
          </div>

          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Publications</span>
            <span className="text-lg font-bold font-mono text-blue-400 block">{profile.publishedArticles.length}</span>
            <span className="text-[9px] text-slate-500 font-mono">Gold Open Access</span>
          </div>

          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">ORCID Identifier</span>
            <a 
              href={`https://orcid.org/${profile.orcid}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-mono font-bold text-emerald-400 hover:underline flex items-center justify-center gap-1 mt-1"
            >
              <span>{profile.orcid}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-950 px-6 border-b border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 text-xs font-medium">
          {[
            { id: 'articles', label: `Published Articles (${profile.publishedArticles.length})`, icon: BookOpen },
            { id: 'reviews', label: `Verified Peer Reviews (${profile.completedReviews.length})`, icon: ShieldCheck },
            { id: 'rri', label: 'RRI Score & Badges', icon: Award },
            { id: 'bookmarks', label: `Saved Manuscripts (${bookmarkedArticleIds.length})`, icon: Bookmark },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 px-4 border-b-2 font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-400 bg-slate-900 rounded-t-lg'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          
          {/* TAB 1: PUBLISHED ARTICLES */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm font-serif-editorial">
                    Published Gold Open Access Manuscripts
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Peer-reviewed articles authored or co-authored by {profile.name} with assigned CRediT contributor roles.
                  </p>
                </div>
                <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg">
                  {profile.publishedArticles.length} Citable Works
                </span>
              </div>

              <div className="space-y-4">
                {profile.publishedArticles.map((art) => (
                  <div 
                    key={art.id}
                    className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/50 transition-all space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
                      <span className="bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded font-bold">
                        {art.journalName}
                      </span>
                      <span>DOI: {art.doi}</span>
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                        Gold OA
                      </span>
                    </div>

                    <h4 
                      onClick={() => {
                        onClose();
                        onSelectArticle(art);
                      }}
                      className="text-lg font-bold font-serif-editorial text-white hover:text-amber-300 cursor-pointer transition-colors leading-snug"
                    >
                      {art.title}
                    </h4>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {art.abstract}
                    </p>

                    {/* CRediT Roles for this author */}
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-1.5 font-mono text-slate-400">
                        <Layers className="w-3.5 h-3.5 text-amber-400" />
                        <span>Author CRediT Roles:</span>
                        <div className="flex flex-wrap gap-1">
                          {art.authors.find(a => a.orcid === profile.orcid || a.name.includes(profile.name.split(' ')[1]))?.creditRoles?.map(role => (
                            <span key={role} className="bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] px-2 py-0.5 rounded font-mono">
                              {role}
                            </span>
                          )) || (
                            <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded font-mono">
                              Conceptualization, Methodology, Writing
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleBookmark(art.id)}
                          className={`p-1.5 rounded-lg border text-xs cursor-pointer transition-all ${
                            bookmarkedArticleIds.includes(art.id)
                              ? 'bg-amber-500 text-slate-950 border-amber-400'
                              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                          }`}
                          title="Bookmark Manuscript"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            onClose();
                            onSelectArticle(art);
                          }}
                          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Read Full Article</span>
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: VERIFIED PEER REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm font-serif-editorial">
                    Portable Verified Peer Review Record
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Reviews completed by {profile.name}, verified by journal editors, and integrated with the Reviewer Reputation Index (RRI).
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg">
                  {profile.completedReviews.length} Verified Entries
                </span>
              </div>

              <div className="space-y-4">
                {profile.completedReviews.map((rev) => (
                  <div key={rev.id} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                      <span className="bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-0.5 rounded font-bold">
                        {rev.journalName}
                      </span>
                      <span className="text-slate-400">Completed: {rev.completedDate}</span>
                      <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-bold">
                        +{rev.rriPointsEarned} RRI Points
                      </span>
                    </div>

                    <h4 className="text-base font-bold font-serif-editorial text-white">
                      {rev.manuscriptTitle}
                    </h4>

                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className="text-slate-400">DOI: {rev.doi}</span>
                      <span className="text-slate-500">•</span>
                      <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                        {rev.reviewType}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-emerald-400 font-bold">
                        Verdict: {rev.verdict}
                      </span>
                    </div>

                    {/* Excerpt */}
                    <p className="text-xs italic text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800">
                      "{rev.summaryExcerpt}"
                    </p>

                    {/* Rubric Breakdown Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono text-center">
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">Methodology</span>
                        <span className="text-amber-400 font-bold">{rev.rubricScores.methodology} / 5.0</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">Novelty</span>
                        <span className="text-amber-400 font-bold">{rev.rubricScores.novelty} / 5.0</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">Reproducibility</span>
                        <span className="text-emerald-400 font-bold">{rev.rubricScores.reproducibility} / 5.0</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">Clarity</span>
                        <span className="text-amber-400 font-bold">{rev.rubricScores.clarity} / 5.0</span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: RRI SCORE & BADGES */}
          {activeTab === 'rri' && (
            <div className="space-y-6">
              
              {/* RRI Performance Card */}
              <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
                      <Award className="w-4 h-4" />
                      <span>RRI Evaluation & Reviewer Reputation</span>
                    </div>
                    <h3 className="text-2xl font-bold font-serif-editorial text-white">
                      RRI Score: {profile.rriScore} / 5.0
                    </h3>
                    <p className="text-xs text-slate-400">
                      Ranked in the top {100 - profile.percentile}% of reviewers across all Digital Evolution open journals.
                    </p>
                  </div>

                  <div className="bg-amber-500 text-slate-950 px-4 py-2 rounded-xl text-center font-mono shrink-0">
                    <span className="text-xs uppercase font-bold block">Status Tier</span>
                    <span className="text-base font-extrabold">Platinum Reviewer</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Progress to Level 6 Senior Editor Fellow</span>
                    <span className="text-amber-400 font-bold">96% Completed</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-full w-[96%]" />
                  </div>
                </div>
              </div>

              {/* Rubric Averages */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-amber-400">
                  Historical Review Rubric Performance Averages
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-xs">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Methodology Audit</span>
                    <span className="text-base font-bold text-amber-400">{profile.rubricAverages.methodology} / 5.0</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Novelty Index</span>
                    <span className="text-base font-bold text-amber-400">{profile.rubricAverages.novelty} / 5.0</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Statistical Rigor</span>
                    <span className="text-base font-bold text-emerald-400">{profile.rubricAverages.statistics} / 5.0</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">COPE Ethics Score</span>
                    <span className="text-base font-bold text-emerald-400">{profile.rubricAverages.ethics} / 5.0</span>
                  </div>
                </div>
              </div>

              {/* Earned Badges Grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-amber-400">
                  Earned Academic Badges & Verified Credentials
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {profile.badges.map((b) => (
                    <div key={b} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                        <Star className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-white text-xs block">{b}</span>
                        <span className="text-[10px] text-slate-400">Verified on ORCID & Crossref</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: SAVED BOOKMARKS */}
          {activeTab === 'bookmarks' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h3 className="font-bold text-white text-sm font-serif-editorial">
                  Saved Manuscripts & Bookmarks
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Articles saved to your personal researcher workspace for quick reference and citation export.
                </p>
              </div>

              {bookmarkedArticleIds.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs font-mono bg-slate-950 rounded-2xl border border-slate-800">
                  No bookmarked articles yet. Click the bookmark icon on any paper to save it here.
                </div>
              ) : (
                <div className="space-y-3">
                  {profile.publishedArticles.map(art => (
                    <div key={art.id} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-amber-400 font-bold">{art.journalName}</span>
                        <h4 
                          onClick={() => {
                            onClose();
                            onSelectArticle(art);
                          }}
                          className="font-bold text-white text-sm hover:text-amber-300 cursor-pointer"
                        >
                          {art.title}
                        </h4>
                        <span className="text-xs text-slate-400 font-mono">DOI: {art.doi}</span>
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          onSelectArticle(art);
                        }}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all shrink-0 cursor-pointer"
                      >
                        Read Paper
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 shrink-0">
          <span>Digital Evolution Press Researcher Identity System</span>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Close Profile
          </button>
        </div>

      </div>
    </div>
  );
};
