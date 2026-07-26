import React, { useState, useMemo } from 'react';
import { Article } from '../types';
import { 
  BookOpen, 
  Download, 
  Share2, 
  Code, 
  Database, 
  CheckCircle2, 
  ExternalLink, 
  Quote, 
  FileText,
  Sparkles,
  Award,
  Calendar,
  Layers,
  Tag,
  Eye,
  Bookmark,
  Search,
  UserCheck,
  Hash,
  Fingerprint,
  Filter,
  X
} from 'lucide-react';

interface FeaturedArticlesProps {
  articles: Article[];
  searchQuery: string;
  onSelectArticle: (article: Article) => void;
  onOpenSubmit: () => void;
  onSaveArticle?: (article: Article) => void;
}

export const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({
  articles,
  searchQuery: externalSearchQuery,
  onSelectArticle,
  onOpenSubmit,
  onSaveArticle = (_article: Article) => {},
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [localSearch, setLocalSearch] = useState<string>('');
  const [indexScope, setIndexScope] = useState<'all' | 'author' | 'doi' | 'keyword' | 'title'>('all');

  const categories = [
    'All',
    'Artificial Intelligence',
    'Computational Biology',
    'Quantum & Cybernetics',
    'Open Science & Ethics',
  ];

  // Active query combines top nav global search and local search input
  const activeQuery = (localSearch || externalSearchQuery || '').trim().toLowerCase();

  // Real-time client-side search indexer logic
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCategory = selectedCategory === 'All' || art.fieldCategory === selectedCategory;
      if (!matchesCategory) return false;

      if (!activeQuery) return true;

      const titleMatch = art.title.toLowerCase().includes(activeQuery);
      const abstractMatch = art.abstract.toLowerCase().includes(activeQuery);
      const doiMatch = art.doi.toLowerCase().includes(activeQuery);
      const authorMatch = art.authors.some(a => 
        a.name.toLowerCase().includes(activeQuery) || 
        a.affiliation.toLowerCase().includes(activeQuery) ||
        (a.orcid && a.orcid.toLowerCase().includes(activeQuery))
      );
      const keywordMatch = art.keywords.some(k => k.toLowerCase().includes(activeQuery));

      if (indexScope === 'author') return authorMatch;
      if (indexScope === 'doi') return doiMatch;
      if (indexScope === 'keyword') return keywordMatch;
      if (indexScope === 'title') return titleMatch || abstractMatch;

      // Default 'all'
      return titleMatch || abstractMatch || doiMatch || authorMatch || keywordMatch;
    });
  }, [articles, selectedCategory, activeQuery, indexScope]);

  return (
    <section id="articles" className="py-16 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Peer-Reviewed Gold Open Access Collection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-editorial text-slate-900 dark:text-white tracking-tight">
              Featured Articles & Indexed Manuscripts
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              All articles are permanently free to read, download, and reuse under Creative Commons CC BY 4.0. 
              Real-time indexed by author ORCID, keywords, DOI metadata, and content vectors.
            </p>
          </div>

          <button
            onClick={onOpenSubmit}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md shadow-cyan-500/20 cursor-pointer self-start md:self-auto shrink-0"
          >
            <FileText className="w-4 h-4 text-slate-950" />
            <span>Submit to Journal</span>
          </button>
        </div>

        {/* Real-time Search Indexing Bar */}
        <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl mb-8 shadow-sm space-y-3">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            
            {/* Input Search Field */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-cyan-500 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Real-time index search: type author name, keyword (e.g., #transformer), or DOI (e.g., 10.1038)..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-10 py-2 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
              {localSearch && (
                <button
                  onClick={() => setLocalSearch('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Scope Target Selectors */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono shrink-0 overflow-x-auto no-scrollbar">
              <span className="text-[11px] text-slate-400 px-2 font-bold flex items-center gap-1">
                <Filter className="w-3 h-3" />
                <span>Scope:</span>
              </span>
              {[
                { id: 'all', label: 'All Fields', icon: Search },
                { id: 'author', label: 'Authors', icon: UserCheck },
                { id: 'keyword', label: 'Keywords', icon: Hash },
                { id: 'doi', label: 'DOI', icon: Fingerprint },
                { id: 'title', label: 'Title/Text', icon: BookOpen },
              ].map((scope) => {
                const IconComp = scope.icon;
                const isActive = indexScope === scope.id;
                return (
                  <button
                    key={scope.id}
                    onClick={() => setIndexScope(scope.id as any)}
                    className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer font-bold ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    <IconComp className="w-3 h-3" />
                    <span>{scope.label}</span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Quick-Filter Sample Chips */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60 text-xs font-mono text-slate-500">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold text-slate-400">Quick Index Filters:</span>
              {[
                'Elena Rostova',
                '10.1038',
                'transformer',
                'single-cell',
                'surface codes',
                'blockchain'
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => setLocalSearch(chip)}
                  className="bg-slate-100 dark:bg-slate-700/60 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-600/60 px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer"
                >
                  #{chip}
                </button>
              ))}
            </div>

            <div className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400">
              Showing {filteredArticles.length} of {articles.length} Manuscripts
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar border-b border-slate-200 dark:border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        {filteredArticles.length === 0 ? (
          <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-12 text-center max-w-lg mx-auto">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No articles found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              No manuscripts matched your current category or search criteria "{activeQuery}".
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setLocalSearch(''); setIndexScope('all'); }}
              className="mt-4 text-xs text-amber-600 dark:text-amber-400 font-semibold underline cursor-pointer"
            >
              Reset all search filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredArticles.map((art) => {
              const matchesAuthorScope = activeQuery && art.authors.some(a => a.name.toLowerCase().includes(activeQuery));
              const matchesDoiScope = activeQuery && art.doi.toLowerCase().includes(activeQuery);
              const matchesKeywordScope = activeQuery && art.keywords.some(k => k.toLowerCase().includes(activeQuery));

              return (
                <article
                  key={art.id}
                  className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 sm:p-8 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all shadow-sm hover:shadow-xl group"
                >
                  {/* Meta Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs">
                    <div className="flex flex-wrap items-center gap-2 font-mono">
                      <span className="bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 px-2.5 py-0.5 rounded font-semibold">
                        {art.journalName}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        Vol. {art.volume}, Issue {art.issue} ({art.year})
                      </span>
                      <span className="text-slate-400 dark:text-slate-500">•</span>
                      <span className={`font-semibold ${matchesDoiScope ? 'text-cyan-400 font-bold bg-cyan-500/10 px-1 rounded' : 'text-slate-600 dark:text-slate-300'}`}>
                        DOI: {art.doi}
                      </span>
                    </div>

                    {/* Gold OA Badge */}
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                      <span>Gold OA (CC BY 4.0)</span>
                    </span>
                  </div>

                  {/* Article Title */}
                  <h3 
                    onClick={() => onSelectArticle(art)}
                    className="text-xl sm:text-2xl font-bold font-serif-editorial text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors cursor-pointer leading-snug"
                  >
                    {art.title}
                  </h3>

                  {/* Authors & CRediT summary */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {art.authors.map((author, idx) => {
                      const isMatchedAuthor = activeQuery && author.name.toLowerCase().includes(activeQuery);
                      return (
                        <span key={author.id} className={`inline-flex items-center gap-1 font-medium ${isMatchedAuthor ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 px-1.5 py-0.5 rounded font-bold' : ''}`}>
                          <span>{author.name}</span>
                          {author.orcid && (
                            <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-1 rounded" title={`ORCID: ${author.orcid}`}>
                              iD
                            </span>
                          )}
                          {author.isCorresponding && (
                            <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold" title="Corresponding Author">
                              *
                            </span>
                          )}
                          {idx < art.authors.length - 1 && <span className="text-slate-400">,</span>}
                        </span>
                      );
                    })}
                    <span className="text-slate-400 dark:text-slate-500 text-[11px]">
                      — {art.authors[0]?.affiliation}
                    </span>
                  </div>

                  {/* Abstract Snippet */}
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {art.abstract}
                  </p>

                  {/* Keywords & Badges Row */}
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                    
                    {/* Badges & Keywords */}
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Reproducibility Badges */}
                      {art.reproducibilityBadges.codeAvailable && (
                        <span className="inline-flex items-center gap-1 text-[11px] bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 px-2 py-0.5 rounded font-mono">
                          <Code className="w-3 h-3 text-blue-500" />
                          <span>Code Verified</span>
                        </span>
                      )}
                      {art.reproducibilityBadges.dataAvailable && (
                        <span className="inline-flex items-center gap-1 text-[11px] bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded font-mono">
                          <Database className="w-3 h-3 text-purple-500" />
                          <span>Data Open</span>
                        </span>
                      )}

                      {/* RRI Rating Pill */}
                      <span className="inline-flex items-center gap-1 text-[11px] bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded font-semibold">
                        <Award className="w-3 h-3 text-cyan-400" />
                        <span>RRI Peer Rating: {art.rriScore}/5.0</span>
                      </span>

                      {/* Keywords tags */}
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-mono flex-wrap">
                        {art.keywords.map((kw) => {
                          const isKwMatched = activeQuery && kw.toLowerCase().includes(activeQuery);
                          return (
                            <span 
                              key={kw} 
                              className={`px-2 py-0.5 rounded ${isKwMatched ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-100 dark:bg-slate-800'}`}
                            >
                              #{kw}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Actions & Stats */}
                    <div className="flex items-center gap-3 sm:gap-4 shrink-0 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="hidden sm:inline">Citations: <strong className="text-slate-900 dark:text-white font-bold">{art.citationCount}</strong></span>
                      <span className="hidden sm:inline">Downloads: <strong className="text-slate-900 dark:text-white font-bold">{art.downloadCount}</strong></span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSaveArticle(art);
                        }}
                        className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                        title="Save paper to My Library"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onSelectArticle(art)}
                        className="inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer shadow-sm shadow-cyan-500/20"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-950" />
                        <span>Read Full Article</span>
                      </button>
                    </div>

                  </div>

                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

