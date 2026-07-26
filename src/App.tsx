/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { FeaturedArticles } from './components/FeaturedArticles';
import { RRISection } from './components/RRISection';
import { JournalsSection } from './components/JournalsSection';
import { ConferencesSection } from './components/ConferencesSection';
import { EditorialBoardSection } from './components/EditorialBoardSection';
import { PricingSection } from './components/PricingSection';
import { Footer } from './components/Footer';

// Modals
import { ArticleModal } from './components/ArticleModal';
import { SubmitModal } from './components/SubmitModal';
import { GovernanceModal } from './components/GovernanceModal';
import { AuthModal } from './components/AuthModal';
import { ReviewerDashboardModal } from './components/ReviewerDashboardModal';
import { ResearcherProfileModal } from './components/ResearcherProfileModal';
import { MyLibraryModal } from './components/MyLibraryModal';
import { SaveToLibraryModal } from './components/SaveToLibraryModal';

import { OfficialDocsSection } from './components/OfficialDocsSection';
import { LandingWorkflowSection } from './components/LandingWorkflowSection';
import { ArrowLeft, Home } from 'lucide-react';

import { FEATURED_ARTICLES } from './data/journalData';
import { Article } from './types';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [activeSection, setActiveSection] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleNavigateToView = (view: string) => {
    setActiveSection(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Modal states
  const [submitModalOpen, setSubmitModalOpen] = useState<boolean>(false);
  const [governanceModalOpen, setGovernanceModalOpen] = useState<boolean>(false);
  const [governanceDocId, setGovernanceDocId] = useState<string>('doc-copyright-oa');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [reviewerDashboardOpen, setReviewerDashboardOpen] = useState<boolean>(false);
  const [researcherProfileModalOpen, setResearcherProfileModalOpen] = useState<boolean>(false);
  const [selectedResearcherId, setSelectedResearcherId] = useState<string>('res-elena-rostova');
  const [myLibraryModalOpen, setMyLibraryModalOpen] = useState<boolean>(false);
  const [articleToSave, setArticleToSave] = useState<Article | null>(null);

  // URL query parameter parsing on load for direct permalinks
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const articleDoi = params.get('article') || params.get('doi');
    const researcher = params.get('researcher') || params.get('profile');

    if (articleDoi) {
      const match = FEATURED_ARTICLES.find(
        a => a.doi.toLowerCase() === decodeURIComponent(articleDoi).toLowerCase() || a.id === articleDoi
      );
      if (match) {
        setSelectedArticle(match);
      }
    } else if (researcher) {
      setSelectedResearcherId(researcher);
      setResearcherProfileModalOpen(true);
    }
  }, []);

  const handleOpenGovernance = (docId?: string) => {
    if (docId) setGovernanceDocId(docId);
    setGovernanceModalOpen(true);
  };

  const handleOpenAuth = (mode: 'signin' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleOpenResearcherProfile = (resId?: string) => {
    if (resId) setSelectedResearcherId(resId);
    setResearcherProfileModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-amber-500/20 selection:text-amber-900 dark:selection:text-amber-200">
      
      {/* Top Navigation */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenAuth={handleOpenAuth}
        onOpenSubmit={() => setSubmitModalOpen(true)}
        onOpenGovernance={handleOpenGovernance}
        onOpenReviewerDashboard={() => setReviewerDashboardOpen(true)}
        onOpenResearcherProfile={() => handleOpenResearcherProfile('res-elena-rostova')}
        onOpenMyLibrary={() => setMyLibraryModalOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        
        {/* LANDING PAGE VIEW (Clean & Minimal Data) */}
        {(activeSection === 'home' || activeSection === 'hero') && (
          <>
            {/* Hero Banner */}
            <Hero
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onOpenSubmit={() => setSubmitModalOpen(true)}
              onScrollToArticles={() => handleNavigateToView('articles')}
              onScrollToRRI={() => handleNavigateToView('rri')}
              onOpenGovernance={handleOpenGovernance}
              onSelectArticle={(art) => setSelectedArticle(art)}
            />

            {/* Live Metrics Stats Bar */}
            <StatsBar />

            {/* Core Workflow: How to Join, How to Submit, How to Review, How Indexing Works & ORCID, Rules & Docs */}
            <LandingWorkflowSection
              onOpenSubmit={() => setSubmitModalOpen(true)}
              onOpenGovernance={handleOpenGovernance}
              onOpenAuth={handleOpenAuth}
              onNavigateToView={handleNavigateToView}
            />
          </>
        )}

        {/* SEPARATE PAGE VIEWS */}
        {activeSection !== 'home' && activeSection !== 'hero' && (
          <div className="py-6">
            
            {/* Subnav Back Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
              <button
                onClick={() => handleNavigateToView('home')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:text-white hover:bg-slate-800 text-xs font-mono font-bold transition-all cursor-pointer shadow-md"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← Back to Landing Page</span>
              </button>
            </div>

            {/* Dedicated Page View Components */}
            {activeSection === 'articles' && (
              <FeaturedArticles
                articles={FEATURED_ARTICLES}
                searchQuery={searchQuery}
                onSelectArticle={(art) => setSelectedArticle(art)}
                onOpenSubmit={() => setSubmitModalOpen(true)}
                onSaveArticle={(art) => setArticleToSave(art)}
              />
            )}

            {activeSection === 'rri' && (
              <RRISection
                onOpenGovernance={handleOpenGovernance}
                onOpenAuth={handleOpenAuth}
                onOpenReviewerDashboard={() => setReviewerDashboardOpen(true)}
              />
            )}

            {activeSection === 'journals' && (
              <JournalsSection
                onOpenSubmit={() => setSubmitModalOpen(true)}
              />
            )}

            {activeSection === 'conferences' && (
              <ConferencesSection
                onOpenSubmit={() => setSubmitModalOpen(true)}
              />
            )}

            {activeSection === 'editorial' && (
              <EditorialBoardSection />
            )}

            {activeSection === 'official-docs' && (
              <OfficialDocsSection onOpenGovernance={handleOpenGovernance} />
            )}

            {activeSection === 'pricing' && (
              <PricingSection
                onOpenAuth={handleOpenAuth}
                onOpenGovernance={handleOpenGovernance}
              />
            )}

          </div>
        )}

      </main>

      {/* Global Footer */}
      <Footer
        onOpenGovernance={handleOpenGovernance}
        onOpenSubmit={() => setSubmitModalOpen(true)}
        onScrollToSection={scrollToSection}
      />

      {/* Modals & Overlays */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onOpenGovernance={handleOpenGovernance}
          onSaveToLibrary={(art) => setArticleToSave(art)}
        />
      )}

      {submitModalOpen && (
        <SubmitModal
          onClose={() => setSubmitModalOpen(false)}
          onOpenGovernance={handleOpenGovernance}
        />
      )}

      {governanceModalOpen && (
        <GovernanceModal
          initialDocId={governanceDocId}
          onClose={() => setGovernanceModalOpen(false)}
        />
      )}

      {authModalOpen && (
        <AuthModal
          initialMode={authMode}
          onClose={() => setAuthModalOpen(false)}
        />
      )}

      {reviewerDashboardOpen && (
        <ReviewerDashboardModal
          onClose={() => setReviewerDashboardOpen(false)}
        />
      )}

      {researcherProfileModalOpen && (
        <ResearcherProfileModal
          initialResearcherId={selectedResearcherId}
          onClose={() => setResearcherProfileModalOpen(false)}
          onSelectArticle={(art) => setSelectedArticle(art)}
        />
      )}

      {myLibraryModalOpen && (
        <MyLibraryModal
          onClose={() => setMyLibraryModalOpen(false)}
          onSelectArticle={(art) => setSelectedArticle(art)}
        />
      )}

      {articleToSave && (
        <SaveToLibraryModal
          article={articleToSave}
          onClose={() => setArticleToSave(null)}
          onSavedSuccess={(fldName) => {
            // Optional callback
          }}
        />
      )}

    </div>
  );
}
