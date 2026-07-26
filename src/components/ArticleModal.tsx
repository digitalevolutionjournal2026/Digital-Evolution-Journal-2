import React, { useState, useRef, useEffect } from 'react';
import { Article, ArticleAnnotation, AnnotationReply } from '../types';
import { DEFAULT_ANNOTATIONS } from '../data/journalData';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  BookOpen, 
  ExternalLink, 
  Code, 
  Database, 
  Award, 
  CheckCircle2, 
  FileText, 
  Share2, 
  Layers, 
  Info, 
  Quote,
  Sparkles,
  Printer,
  Sun,
  Moon,
  Type,
  Clock,
  Sliders,
  AlignLeft,
  MessageSquare,
  ThumbsUp,
  Plus,
  MessageCircle,
  UserCheck,
  Send,
  MessageSquareCode,
  Tag,
  CornerDownRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  Bookmark
} from 'lucide-react';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onOpenGovernance: (docId?: string) => void;
  onSaveToLibrary?: (article: Article) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onOpenGovernance,
  onSaveToLibrary,
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'figures' | 'references' | 'credit' | 'citation' | 'pdf' | 'annotations'>('text');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [citationFormat, setCitationFormat] = useState<'bibtex' | 'ris' | 'apa' | 'mla'>('apa');

  // Reading Mode States
  const [readingTheme, setReadingTheme] = useState<'default' | 'sepia' | 'dark' | 'paper'>('default');
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif');
  const [readingProgress, setReadingProgress] = useState<number>(0);

  // Collaborative Annotations State
  const [annotations, setAnnotations] = useState<ArticleAnnotation[]>(() => {
    if (!article) return [];
    const saved = localStorage.getItem(`de_annotations_${article.id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved annotations:', e);
      }
    }
    return DEFAULT_ANNOTATIONS[article.id] || [];
  });

  const [showAnnotationForm, setShowAnnotationForm] = useState<boolean>(false);
  const [targetSection, setTargetSection] = useState<string>('1. Introduction & Background');
  const [highlightSnippet, setHighlightSnippet] = useState<string>('');
  const [commentCategory, setCommentCategory] = useState<'Methodology' | 'Data & Code' | 'Citation' | 'General Query' | 'Correction'>('Methodology');
  const [commentText, setCommentText] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('Prof. Elena Rostova');
  const [authorOrcid, setAuthorOrcid] = useState<string>('0000-0003-9182-4410');

  const [selectedAnnotationCategory, setSelectedAnnotationCategory] = useState<string>('All');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>('');

  // Text-To-Speech (TTS) States
  const [isTtsSpeaking, setIsTtsSpeaking] = useState<boolean>(false);
  const [isTtsPaused, setIsTtsPaused] = useState<boolean>(false);
  const [ttsRate, setTtsRate] = useState<number>(1);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');
  const [ttsStatusMessage, setTtsStatusMessage] = useState<string>('Ready to listen');

  const ttsChunksRef = useRef<string[]>([]);
  const ttsChunkIndexRef = useRef<number>(0);
  const isTtsStoppedRef = useRef<boolean>(true);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (article) {
      localStorage.setItem(`de_annotations_${article.id}`, JSON.stringify(annotations));
    }
  }, [annotations, article]);

  // Load available Speech Synthesis voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        if (voices.length > 0 && !selectedVoiceURI) {
          const engVoice = voices.find(v => v.lang.includes('en')) || voices[0];
          if (engVoice) setSelectedVoiceURI(engVoice.voiceURI);
        }
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      isTtsStoppedRef.current = true;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Split text into chunks <= 180 characters for browser speech synthesis stability
  const splitIntoSentenceChunks = (text: string, maxLen = 180): string[] => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const chunks: string[] = [];
    let current = '';

    for (const sentence of sentences) {
      if ((current + sentence).length <= maxLen) {
        current += sentence;
      } else {
        if (current.trim()) chunks.push(current.trim());
        if (sentence.length > maxLen) {
          const words = sentence.split(' ');
          let wordChunk = '';
          for (const w of words) {
            if ((wordChunk + ' ' + w).length <= maxLen) {
              wordChunk += (wordChunk ? ' ' : '') + w;
            } else {
              if (wordChunk.trim()) chunks.push(wordChunk.trim());
              wordChunk = w;
            }
          }
          if (wordChunk.trim()) current = wordChunk;
        } else {
          current = sentence;
        }
      }
    }
    if (current.trim()) chunks.push(current.trim());
    return chunks;
  };

  const speakNextChunk = () => {
    if (isTtsStoppedRef.current || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    if (ttsChunkIndexRef.current >= ttsChunksRef.current.length) {
      setIsTtsSpeaking(false);
      setIsTtsPaused(false);
      setTtsStatusMessage('Finished reading article.');
      isTtsStoppedRef.current = true;
      return;
    }

    const chunkText = ttsChunksRef.current[ttsChunkIndexRef.current];
    const utterance = new SpeechSynthesisUtterance(chunkText);
    utterance.rate = ttsRate;

    if (selectedVoiceURI && availableVoices.length > 0) {
      const chosenVoice = availableVoices.find(v => v.voiceURI === selectedVoiceURI);
      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }
    }

    utterance.onstart = () => {
      if (ttsChunkIndexRef.current === 0) {
        setIsTtsSpeaking(true);
        setIsTtsPaused(false);
      }
      setTtsStatusMessage(`Reading chunk ${ttsChunkIndexRef.current + 1} of ${ttsChunksRef.current.length}...`);
    };

    utterance.onend = () => {
      if (!isTtsStoppedRef.current) {
        ttsChunkIndexRef.current += 1;
        speakNextChunk();
      }
    };

    utterance.onerror = (e) => {
      // Safely ignore canceled or interrupted events triggered by cancel()
      if (e.error === 'canceled' || e.error === 'interrupted') {
        return;
      }
      if (!isTtsStoppedRef.current) {
        ttsChunkIndexRef.current += 1;
        speakNextChunk();
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleStartTts = () => {
    if (!article || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser environment.');
      return;
    }

    isTtsStoppedRef.current = true;
    window.speechSynthesis.cancel();

    // Construct manuscript reading text
    const authorsStr = article.authors.map(a => a.name).join(', ');
    const sectionsStr = article.fullTextSections?.map(s => `${s.heading}. ${s.content}`).join('. ') || '';
    const fullTextToRead = `Title: ${article.title}. Journal: ${article.journalName}. Authors: ${authorsStr}. Abstract: ${article.abstract}. ${sectionsStr}`;

    ttsChunksRef.current = splitIntoSentenceChunks(fullTextToRead);
    ttsChunkIndexRef.current = 0;
    isTtsStoppedRef.current = false;

    speakNextChunk();
  };

  const handlePauseTts = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsTtsPaused(true);
      setTtsStatusMessage('Audio playback paused.');
    }
  };

  const handleResumeTts = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
      setIsTtsPaused(false);
      setTtsStatusMessage('Resumed reading article...');
    }
  };

  const handleStopTts = () => {
    isTtsStoppedRef.current = true;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsTtsSpeaking(false);
      setIsTtsPaused(false);
      setTtsStatusMessage('Stopped audio playback.');
    }
  };

  if (!article) return null;

  // Add Annotation Handler
  const handleAddAnnotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newAnn: ArticleAnnotation = {
      id: `ann-${Date.now()}`,
      articleId: article.id,
      sectionHeading: targetSection,
      highlightedText: highlightSnippet.trim() || 'General Section Comment',
      commentText: commentText.trim(),
      authorName: authorName.trim() || 'Verified Researcher',
      authorOrcid: authorOrcid.trim() || '0000-0002-0000-0000',
      category: commentCategory,
      createdAt: new Date().toISOString().split('T')[0],
      endorsementsCount: 1,
      replies: []
    };

    setAnnotations([newAnn, ...annotations]);
    setCommentText('');
    setHighlightSnippet('');
    setShowAnnotationForm(false);
    setActiveTab('annotations');
  };

  // Endorse Annotation Handler
  const handleEndorseAnnotation = (id: string) => {
    setAnnotations(prev =>
      prev.map(ann =>
        ann.id === id ? { ...ann, endorsementsCount: ann.endorsementsCount + 1 } : ann
      )
    );
  };

  // Reply Handler
  const handleAddReply = (annId: string) => {
    if (!replyText.trim()) return;

    const newReply: AnnotationReply = {
      id: `rep-${Date.now()}`,
      authorName: authorName || 'Dr. Verified Researcher',
      authorOrcid: authorOrcid || '0000-0000-0000-0000',
      text: replyText.trim(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAnnotations(prev =>
      prev.map(ann => {
        if (ann.id === annId) {
          return {
            ...ann,
            replies: [...(ann.replies || []), newReply]
          };
        }
        return ann;
      })
    );

    setReplyText('');
    setReplyingToId(null);
  };

  // Calculate Reading Progress
  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const totalScroll = scrollHeight - clientHeight;
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / totalScroll) * 100));
        setReadingProgress(Math.round(progress));
      } else {
        setReadingProgress(100);
      }
    }
  };

  // Estimate Reading Time (approx 200 words per minute)
  const fullTextWords = article.fullTextSections?.reduce((acc, sec) => acc + sec.content.split(' ').length, 0) || 400;
  const abstractWords = article.abstract.split(' ').length;
  const totalWords = fullTextWords + abstractWords;
  const estMinutes = Math.max(2, Math.ceil(totalWords / 180));
  const minRemaining = Math.max(0, Math.ceil(estMinutes * (1 - readingProgress / 100)));

  // Dynamic Theme Styling Classes
  const getContainerThemeClasses = () => {
    switch (readingTheme) {
      case 'sepia':
        return 'bg-[#fbf7ee] text-[#2c251e] border-[#e8dfcf]';
      case 'dark':
        return 'bg-[#090d16] text-[#e2e8f0] border-[#1e293b]';
      case 'paper':
        return 'bg-white text-slate-900 border-slate-200';
      default:
        return 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800';
    }
  };

  const getArticleBodyThemeClasses = () => {
    switch (readingTheme) {
      case 'sepia':
        return 'bg-[#f5efe0] text-[#2c251e] border-[#e3d7bf] shadow-inner';
      case 'dark':
        return 'bg-[#0d1424] text-[#cbd5e1] border-[#1e293b]';
      case 'paper':
        return 'bg-slate-50/80 text-slate-900 border-slate-200';
      default:
        return 'bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700/80';
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm':
        return 'text-xs leading-relaxed';
      case 'lg':
        return 'text-base sm:text-lg leading-loose';
      case 'xl':
        return 'text-lg sm:text-xl leading-loose';
      default:
        return 'text-sm sm:text-base leading-relaxed';
    }
  };

  // Generate citation strings
  const firstAuthor = article.authors[0]?.name || 'Author';
  const year = article.year;
  const title = article.title;
  const journal = article.journalName;
  const doi = article.doi;

  const apaCitation = `${firstAuthor} et al. (${year}). ${title}. ${journal}, ${article.volume}(${article.issue}). https://doi.org/${doi}`;
  
  const bibtexCitation = `@article{${article.id}_${year},
  author = {${article.authors.map(a => a.name).join(' and ')}},
  title = {${title}},
  journal = {${journal}},
  volume = {${article.volume}},
  number = {${article.issue}},
  year = {${year}},
  doi = {${doi}},
  publisher = {Digital Evolution Press},
  license = {CC BY 4.0}
}`;

  const risCitation = `TY  - JOUR
TI  - ${title}
AU  - ${article.authors.map(a => a.name).join('\nAU  - ')}
JO  - ${journal}
VL  - ${article.volume}
IS  - ${article.issue}
PY  - ${year}
DO  - ${doi}
PB  - Digital Evolution Press
ER  -`;

  // Citation & Sharing Helpers
  const [showShareToast, setShowShareToast] = useState<boolean>(false);
  const [pdfPage, setPdfPage] = useState<number>(1);
  const [pdfZoom, setPdfZoom] = useState<number>(100);
  const totalPdfPages = 4;

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const downloadCitationFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setCopiedFormat(`download-${filename}`);
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  const handleShareArticle = () => {
    const shareUrl = `${window.location.origin}/?article=${encodeURIComponent(article.doi)}`;
    navigator.clipboard.writeText(shareUrl);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn relative">
      
      {/* Toast Notification for Share */}
      {showShareToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-mono font-bold border border-emerald-400 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span>Direct permanent DOI link copied to clipboard! Share directly with colleagues.</span>
        </div>
      )}

      <div className={`border rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden transition-colors duration-300 ${getContainerThemeClasses()}`}>
        
        {/* Header Bar */}
        <div className="bg-slate-900 text-white p-4 sm:p-6 border-b border-slate-800 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded font-semibold">
                {article.journalName}
              </span>
              <span className="text-slate-400">
                Vol {article.volume}, Issue {article.issue} ({article.year})
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">DOI: {article.doi}</span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                Gold OA (CC BY 4.0)
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-bold font-serif-editorial leading-tight text-white">
              {article.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onSaveToLibrary && (
              <button
                onClick={() => onSaveToLibrary(article)}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-semibold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-md"
                title="Save article to personal collection"
              >
                <Bookmark className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Save to Library</span>
              </button>
            )}

            <button
              onClick={handleShareArticle}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-md"
              title="Share permanent article permalink"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share Link</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation & Reading Toolbar Row */}
        <div className="bg-slate-100 dark:bg-slate-950 px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0 text-xs font-medium">
          
          {/* Main Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'text', label: 'Article & Abstract', icon: BookOpen },
              { id: 'credit', label: 'CRediT & Authors', icon: Layers },
              { id: 'annotations', label: `Peer Annotations (${annotations.length})`, icon: MessageSquare },
              { id: 'figures', label: `Figures (${article.figures?.length || 0})`, icon: FileText },
              { id: 'references', label: `References (${article.references?.length || 0})`, icon: Info },
              { id: 'citation', label: 'Cite & Export', icon: Quote },
              { id: 'pdf', label: 'PDF View', icon: Download },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 py-2.5 px-3 border-b-2 font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-900 rounded-t-lg'
                      : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Reading Mode Control Bar (Visible when reading text) */}
          {activeTab === 'text' && (
            <div className="flex items-center gap-2 py-2 text-xs font-mono border-t sm:border-t-0 border-slate-200 dark:border-slate-800 w-full sm:w-auto justify-between sm:justify-end">
              
              {/* Reading Theme Selector */}
              <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 px-1 font-semibold hidden md:inline">Mode:</span>
                <button
                  onClick={() => setReadingTheme('default')}
                  title="Default App Theme"
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                    readingTheme === 'default' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Auto
                </button>
                <button
                  onClick={() => setReadingTheme('sepia')}
                  title="Warm Sepia Parchment Mode"
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                    readingTheme === 'sepia' ? 'bg-[#e3d7bf] text-[#2c251e] font-bold shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Sepia
                </button>
                <button
                  onClick={() => setReadingTheme('dark')}
                  title="Focus OLED Night Mode"
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                    readingTheme === 'dark' ? 'bg-slate-800 text-amber-300 font-bold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  OLED
                </button>
                <button
                  onClick={() => setReadingTheme('paper')}
                  title="Crisp Academic White Paper"
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                    readingTheme === 'paper' ? 'bg-slate-200 text-slate-950 font-bold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Paper
                </button>
              </div>

              {/* Font Size Selector */}
              <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setFontSize(f => f === 'xl' ? 'lg' : f === 'lg' ? 'md' : 'sm')}
                  className="px-1.5 py-0.5 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer font-bold text-[10px]"
                  title="Decrease Font Size"
                >
                  A-
                </button>
                <span className="text-[10px] text-amber-500 font-bold uppercase">{fontSize}</span>
                <button
                  onClick={() => setFontSize(f => f === 'sm' ? 'md' : f === 'md' ? 'lg' : 'xl')}
                  className="px-1.5 py-0.5 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer font-bold text-xs"
                  title="Increase Font Size"
                >
                  A+
                </button>
              </div>

              {/* Serif/Sans Toggle */}
              <button
                onClick={() => setFontFamily(f => f === 'serif' ? 'sans' : 'serif')}
                className="bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors cursor-pointer text-[11px] font-mono flex items-center gap-1"
                title="Toggle Font Family (Serif vs Sans)"
              >
                <Type className="w-3.5 h-3.5" />
                <span className="capitalize text-[10px]">{fontFamily}</span>
              </button>

            </div>
          )}

        </div>

        {/* Global Reading Progress Bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 relative overflow-hidden">
          <div 
            style={{ width: `${readingProgress}%` }}
            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 transition-all duration-150"
          />
        </div>

        {/* Scrollable Content Area */}
        <div 
          ref={contentRef}
          onScroll={handleScroll}
          className="p-6 overflow-y-auto space-y-6 flex-1 transition-colors duration-300"
        >
          
          {/* TAB 1: ARTICLE TEXT & ABSTRACT */}
          {activeTab === 'text' && (
            <div className={`space-y-6 ${fontFamily === 'serif' ? 'font-serif-editorial' : 'font-sans'}`}>
              
              {/* Text-To-Speech (TTS) Academic Audio Reader Bar */}
              <div className="bg-slate-900 text-white p-3.5 sm:p-4 rounded-2xl border border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                
                {/* Audio Controls & Status */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <Volume2 className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-amber-400 text-xs uppercase tracking-wider">
                        TTS Academic Audio Reader
                      </span>
                      {isTtsSpeaking && !isTtsPaused && (
                        <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] px-2 py-0.5 rounded-full animate-pulse font-bold">
                          ● Reading
                        </span>
                      )}
                      {isTtsPaused && (
                        <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          Paused
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate max-w-xs sm:max-w-md">
                      {ttsStatusMessage}
                    </p>
                  </div>
                </div>

                {/* Player Buttons, Speed & Voice Dropdown */}
                <div className="flex flex-wrap items-center gap-2">
                  
                  {/* Play / Pause / Resume / Stop */}
                  {!isTtsSpeaking ? (
                    <button
                      onClick={handleStartTts}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow"
                      title="Listen to entire manuscript"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Listen to Article</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      {isTtsPaused ? (
                        <button
                          onClick={handleResumeTts}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl cursor-pointer flex items-center gap-1"
                        >
                          <Play className="w-3.5 h-3.5 fill-slate-950" />
                          <span>Resume</span>
                        </button>
                      ) : (
                        <button
                          onClick={handlePauseTts}
                          className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold px-3 py-1.5 rounded-xl cursor-pointer flex items-center gap-1"
                        >
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pause</span>
                        </button>
                      )}

                      <button
                        onClick={handleStopTts}
                        className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 p-1.5 rounded-xl cursor-pointer"
                        title="Stop audio reader"
                      >
                        <Square className="w-3.5 h-3.5 fill-rose-300" />
                      </button>
                    </div>
                  )}

                  {/* Speech Rate Controls */}
                  <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700 text-[11px]">
                    <span className="text-slate-400 px-1 text-[10px]">Speed:</span>
                    {[0.75, 1, 1.25, 1.5, 2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => {
                          setTtsRate(rate);
                          if (isTtsSpeaking) {
                            handleStartTts(); // Restart with new rate
                          }
                        }}
                        className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                          ttsRate === rate ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>

                  {/* Voice Selector Dropdown */}
                  {availableVoices.length > 0 && (
                    <select
                      value={selectedVoiceURI}
                      onChange={(e) => {
                        setSelectedVoiceURI(e.target.value);
                        if (isTtsSpeaking) {
                          handleStartTts();
                        }
                      }}
                      className="bg-slate-800 text-slate-200 border border-slate-700 p-1.5 rounded-xl text-[11px] max-w-[140px] truncate"
                      title="Select synthesis voice"
                    >
                      {availableVoices.map((v) => (
                        <option key={v.voiceURI} value={v.voiceURI}>
                          {v.name} ({v.lang})
                        </option>
                      ))}
                    </select>
                  )}

                </div>

              </div>

              {/* Reading Stats Header Box */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono pb-3 border-b border-slate-200/60 dark:border-slate-800/60 text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Est. Read: <strong>{estMinutes} min</strong></span>
                  </span>
                  <span>Progress: <strong className="text-amber-500">{readingProgress}%</strong></span>
                  {minRemaining > 0 && <span>(~{minRemaining} min remaining)</span>}
                </div>

                <div className="flex items-center gap-3">
                  <span>Citations: <strong className="text-slate-900 dark:text-white">{article.citationCount}</strong></span>
                  <span>Downloads: <strong className="text-slate-900 dark:text-white">{article.downloadCount}</strong></span>
                </div>
              </div>

              {/* Badges & RRI Metrics */}
              <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 ${getArticleBodyThemeClasses()}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1 bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 px-3 py-1 rounded-lg font-semibold text-xs font-mono">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>RRI Peer Rating: {article.rriScore} / 5.0</span>
                  </div>

                  {article.reproducibilityBadges.codeAvailable && (
                    <a
                      href={article.reproducibilityBadges.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 bg-blue-500/10 text-blue-800 dark:text-blue-300 border border-blue-500/20 px-2.5 py-1 rounded-lg text-xs font-mono hover:underline"
                    >
                      <Code className="w-3.5 h-3.5 text-blue-500" />
                      <span>Code Repository</span>
                    </a>
                  )}

                  {article.reproducibilityBadges.dataAvailable && (
                    <a
                      href={article.reproducibilityBadges.dataUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 bg-purple-500/10 text-purple-800 dark:text-purple-300 border border-purple-500/20 px-2.5 py-1 rounded-lg text-xs font-mono hover:underline"
                    >
                      <Database className="w-3.5 h-3.5 text-purple-500" />
                      <span>Open Dataset</span>
                    </a>
                  )}
                </div>

                <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Double-Blind Peer Reviewed</span>
                </div>
              </div>

              {/* Abstract Box */}
              <div className={`p-5 rounded-xl border space-y-2 ${readingTheme === 'sepia' ? 'bg-[#f0e6d2] border-[#e0d3b8]' : 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/20'}`}>
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Abstract
                </h3>
                <p className={`italic ${getFontSizeClass()}`}>
                  {article.abstract}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs font-mono opacity-80">
                  <span className="font-semibold">Keywords:</span>
                  {article.keywords.map((kw) => (
                    <span key={kw} className="bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded text-[11px]">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Full Text Sections with Custom Typography & Spacing */}
              {article.fullTextSections?.map((section, idx) => (
                <div key={idx} className="space-y-3 pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-amber-600 dark:text-amber-400">
                      {section.heading}
                    </h3>

                    <button
                      onClick={() => {
                        setTargetSection(section.heading);
                        setShowAnnotationForm(true);
                        setActiveTab('annotations');
                      }}
                      className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Annotate Section</span>
                    </button>
                  </div>

                  <p className={`${getFontSizeClass()} text-justify leading-relaxed`}>
                    {section.content}
                  </p>
                </div>
              ))}

            </div>
          )}

          {/* TAB: COLLABORATIVE ANNOTATIONS */}
          {activeTab === 'annotations' && (
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
                    <MessageSquare className="w-4 h-4" />
                    <span>Collaborative Peer Annotations & Section Discussion</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    Peer-reviewed annotations contributed by verified researchers. Highlight snippets and engage in open scientific discourse.
                  </p>
                </div>

                <button
                  onClick={() => setShowAnnotationForm(!showAnnotationForm)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Annotation</span>
                </button>
              </div>

              {/* New Annotation Form */}
              {showAnnotationForm && (
                <form onSubmit={handleAddAnnotation} className="bg-white dark:bg-slate-800 border-2 border-amber-500/60 rounded-2xl p-5 space-y-4 shadow-xl animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm font-serif-editorial flex items-center gap-2">
                      <MessageSquareCode className="w-4 h-4 text-amber-500" />
                      <span>Post Verified Peer Annotation</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowAnnotationForm(false)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Target Section:</label>
                      <select
                        value={targetSection}
                        onChange={(e) => setTargetSection(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-2 rounded-xl text-slate-900 dark:text-slate-100"
                      >
                        <option value="1. Introduction & Background">1. Introduction & Background</option>
                        <option value="2. Architecture & Methodology">2. Architecture & Methodology</option>
                        <option value="3. Results & Peer Review Metrics">3. Results & Peer Review Metrics</option>
                        <option value="4. Abstract & General Discussion">4. Abstract & General Discussion</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Category:</label>
                      <select
                        value={commentCategory}
                        onChange={(e) => setCommentCategory(e.target.value as any)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-2 rounded-xl text-slate-900 dark:text-slate-100"
                      >
                        <option value="Methodology">Methodology</option>
                        <option value="Data & Code">Data & Code</option>
                        <option value="Citation">Citation</option>
                        <option value="General Query">General Query</option>
                        <option value="Correction">Correction</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-xs font-mono">
                    <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Highlighted Passage Snippet (Optional Quote):</label>
                    <input
                      type="text"
                      placeholder="Paste text excerpt or phrase being annotated..."
                      value={highlightSnippet}
                      onChange={(e) => setHighlightSnippet(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100"
                    />
                  </div>

                  <div className="text-xs font-mono">
                    <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Peer Annotation & Feedback:</label>
                    <textarea
                      rows={3}
                      placeholder="Write constructive scientific feedback, methodology clarification, or replication insight..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      required
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-2.5 rounded-xl text-slate-900 dark:text-slate-100"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-2 border-t border-slate-200 dark:border-slate-700">
                    <div>
                      <label className="block text-slate-500 mb-1">Researcher Handle:</label>
                      <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-2 rounded-lg text-slate-900 dark:text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">ORCID iD:</label>
                      <input
                        type="text"
                        value={authorOrcid}
                        onChange={(e) => setAuthorOrcid(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-2 rounded-lg text-slate-900 dark:text-slate-100"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAnnotationForm(false)}
                      className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Publish Annotation</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Filter Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                  <span className="text-slate-500 font-semibold shrink-0">Filter Category:</span>
                  {['All', 'Methodology', 'Data & Code', 'General Query', 'Correction'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedAnnotationCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg border cursor-pointer transition-all shrink-0 ${
                        selectedAnnotationCategory === cat
                          ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <span className="text-slate-400">{annotations.length} Annotations total</span>
              </div>

              {/* Annotations List */}
              <div className="space-y-4">
                {annotations
                  .filter(a => selectedAnnotationCategory === 'All' || a.category === selectedAnnotationCategory)
                  .map((ann) => (
                    <div key={ann.id} className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-3 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span className="bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 px-2.5 py-0.5 rounded font-bold">
                            {ann.category}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 font-semibold">
                            Section: {ann.sectionHeading}
                          </span>
                        </div>
                        <span className="text-slate-400">{ann.createdAt}</span>
                      </div>

                      {/* Author details */}
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                        <UserCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="font-bold text-slate-900 dark:text-white">{ann.authorName}</span>
                        <a 
                          href={`https://orcid.org/${ann.authorOrcid}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
                        >
                          <span>({ann.authorOrcid})</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      {/* Highlight snippet quote if present */}
                      {ann.highlightedText && (
                        <div className="bg-amber-500/10 dark:bg-amber-500/15 border-l-4 border-amber-500 p-3 rounded-r-xl text-xs font-mono italic text-amber-900 dark:text-amber-200">
                          <Quote className="w-3.5 h-3.5 inline mr-1 opacity-60" />
                          "{ann.highlightedText}"
                        </div>
                      )}

                      {/* Comment text */}
                      <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200 font-sans">
                        {ann.commentText}
                      </p>

                      {/* Endorsements & Reply Action Row */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-mono">
                        <button
                          onClick={() => handleEndorseAnnotation(ann.id)}
                          className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-amber-500/20 font-bold"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Endorse / Agree ({ann.endorsementsCount})</span>
                        </button>

                        <button
                          onClick={() => setReplyingToId(replyingToId === ann.id ? null : ann.id)}
                          className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Reply ({ann.replies?.length || 0})</span>
                        </button>
                      </div>

                      {/* Existing Replies List */}
                      {ann.replies && ann.replies.length > 0 && (
                        <div className="pl-4 sm:pl-6 pt-2 space-y-2 border-l-2 border-slate-200 dark:border-slate-700">
                          {ann.replies.map((rep) => (
                            <div key={rep.id} className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                                <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                  <CornerDownRight className="w-3 h-3" />
                                  {rep.authorName}
                                </span>
                                <span>{rep.createdAt}</span>
                              </div>
                              <p className="text-slate-700 dark:text-slate-300">{rep.text}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Inline Reply Form */}
                      {replyingToId === ann.id && (
                        <div className="pt-2 flex items-center gap-2 font-mono text-xs">
                          <input
                            type="text"
                            placeholder="Type verified reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-2 rounded-xl text-slate-900 dark:text-slate-100"
                          />
                          <button
                            onClick={() => handleAddReply(ann.id)}
                            className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-2 rounded-xl font-bold cursor-pointer"
                          >
                            Send
                          </button>
                        </div>
                      )}

                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 2: CREDIT ROLES & AUTHORS */}
          {activeTab === 'credit' && (
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-base font-bold font-serif-editorial text-slate-900 dark:text-white mb-1">
                  CASRAI CRediT Author Taxonomy & Affiliations
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Digital Evolution enforces the 14 standard CRediT contributor roles for transparent research attribution.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {article.authors.map((author) => (
                  <div key={author.id} className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-5 rounded-xl space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-base">
                          {author.name}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                          {author.affiliation}
                        </p>
                        <p className="text-xs font-mono text-slate-400 mt-0.5">
                          {author.email}
                        </p>
                      </div>

                      {author.orcid && (
                        <a
                          href={`https://orcid.org/${author.orcid}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 px-2 py-1 rounded text-xs font-mono shrink-0 hover:underline"
                        >
                          <span>iD</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    {author.creditRoles && (
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60">
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-1.5 uppercase tracking-wider font-semibold">
                          Assigned CRediT Roles:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {author.creditRoles.map((role) => (
                            <span key={role} className="bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 text-[11px] font-medium px-2 py-0.5 rounded font-mono">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FIGURES & ASSETS */}
          {activeTab === 'figures' && (
            <div className="space-y-6">
              {article.figures && article.figures.length > 0 ? (
                <div className="space-y-6">
                  {article.figures.map((fig, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl space-y-3">
                      <img
                        src={fig.url}
                        alt={fig.caption}
                        className="w-full h-auto max-h-96 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
                      />
                      <p className="text-xs text-slate-700 dark:text-slate-300 italic font-serif-editorial">
                        {fig.caption}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500">
                  No high-resolution figure assets attached to this manuscript preview.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: REFERENCES */}
          {activeTab === 'references' && (
            <div className="space-y-4">
              <h3 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white">
                Reference List ({article.references?.length || 0})
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-xs text-slate-700 dark:text-slate-300 font-mono leading-relaxed">
                {article.references?.map((ref, idx) => (
                  <li key={idx} className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-800">
                    {ref}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* TAB 5: CITE & EXPORT */}
          {activeTab === 'citation' && (
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-base font-bold font-serif-editorial text-slate-900 dark:text-white mb-1">
                  Export Citation Format
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Select your preferred reference format for direct copy or download into Zotero, Mendeley, or EndNote reference managers.
                </p>
              </div>

              {/* Format Selector & Quick Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2">
                  {[
                    { id: 'apa', label: 'APA 7th' },
                    { id: 'bibtex', label: 'BibTeX' },
                    { id: 'ris', label: 'RIS Format' },
                  ].map((fmt) => (
                    <button
                      key={fmt.id}
                      onClick={() => setCitationFormat(fmt.id as any)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        citationFormat === fmt.id
                          ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => downloadCitationFile(bibtexCitation, `${article.id}.bib`, 'text/x-bibtex')}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .bib File</span>
                  </button>
                  <button
                    onClick={() => downloadCitationFile(risCitation, `${article.id}.ris`, 'application/x-research-info-systems')}
                    className="bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-mono font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .ris File</span>
                  </button>
                </div>
              </div>

              {/* Citation Box */}
              <div className="relative bg-slate-900 text-amber-100 p-4 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto">
                <pre className="whitespace-pre-wrap">
                  {citationFormat === 'apa' && apaCitation}
                  {citationFormat === 'bibtex' && bibtexCitation}
                  {citationFormat === 'ris' && risCitation}
                </pre>

                <button
                  onClick={() => {
                    const text = citationFormat === 'apa' ? apaCitation : citationFormat === 'bibtex' ? bibtexCitation : risCitation;
                    copyToClipboard(text, citationFormat);
                  }}
                  className="absolute top-3 right-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedFormat === citationFormat ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-slate-950" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Citation Text</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: INTERACTIVE PAGINATED PDF PREVIEW EMBEDDER */}
          {activeTab === 'pdf' && (
            <div className="space-y-4">
              
              {/* PDF Toolbar Controls */}
              <div className="bg-slate-900 text-white p-3 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                
                {/* Page Navigation */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPdfPage(p => Math.max(1, p - 1))}
                    disabled={pdfPage === 1}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded font-bold cursor-pointer"
                  >
                    ← Prev Page
                  </button>
                  <span className="text-amber-400 font-bold">
                    Page {pdfPage} of {totalPdfPages}
                  </span>
                  <button
                    onClick={() => setPdfPage(p => Math.min(totalPdfPages, p + 1))}
                    disabled={pdfPage === totalPdfPages}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded font-bold cursor-pointer"
                  >
                    Next Page →
                  </button>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 hidden sm:inline">Zoom:</span>
                  <button
                    onClick={() => setPdfZoom(z => Math.max(80, z - 10))}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded"
                  >
                    -
                  </button>
                  <span className="text-emerald-400 font-bold min-w-12 text-center">{pdfZoom}%</span>
                  <button
                    onClick={() => setPdfZoom(z => Math.min(150, z + 10))}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => setPdfZoom(100)}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded text-[10px]"
                  >
                    Reset
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded flex items-center gap-1 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-amber-400" />
                    <span>Print</span>
                  </button>

                  <button
                    onClick={() => downloadCitationFile(`% Official PDF compiled for DOI: ${article.doi}\n\nTitle: ${article.title}`, `${article.id}.pdf`, 'application/pdf')}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>

              </div>

              {/* Paginated Academic Typeset Sheet Container */}
              <div className="bg-slate-950 p-4 sm:p-8 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
                <div 
                  style={{ transform: `scale(${pdfZoom / 100})`, transformOrigin: 'top center' }}
                  className="bg-white text-slate-900 w-full max-w-[700px] min-h-[900px] p-8 sm:p-12 shadow-2xl rounded-sm border border-slate-300 font-serif-editorial relative flex flex-col justify-between transition-all duration-200"
                >
                  {/* Top Running Header */}
                  <div className="border-b border-slate-300 pb-2 mb-6 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Digital Evolution Press • {article.journalName}</span>
                    <span>DOI: {article.doi}</span>
                  </div>

                  {/* Page 1: Formal Header & Abstract */}
                  {pdfPage === 1 && (
                    <div className="space-y-6 flex-1">
                      <div className="space-y-2">
                        <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider">
                          Research Article • Gold Open Access
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-slate-900">
                          {article.title}
                        </h1>
                        <div className="text-xs font-sans text-slate-700 font-semibold pt-1">
                          {article.authors.map(a => a.name).join(', ')}
                        </div>
                        <div className="text-[10px] font-sans text-slate-500">
                          {article.authors[0]?.affiliation}
                        </div>
                      </div>

                      {/* Abstract box in typeset */}
                      <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-900 block">
                          Abstract
                        </span>
                        <p className="text-xs italic text-slate-800 leading-relaxed">
                          {article.abstract}
                        </p>
                      </div>

                      <div className="space-y-2 text-xs text-slate-800 leading-relaxed">
                        <h3 className="text-sm font-bold font-sans text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
                          1. Introduction
                        </h3>
                        <p>
                          {article.fullTextSections?.[0]?.content || 'Recent advances in open science protocols demand transparent credit assignments...'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Page 2: Methods & Equations */}
                  {pdfPage === 2 && (
                    <div className="space-y-6 flex-1">
                      <div className="space-y-2 text-xs text-slate-800 leading-relaxed">
                        <h3 className="text-sm font-bold font-sans text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
                          2. Materials & Methodology
                        </h3>
                        <p>
                          {article.fullTextSections?.[1]?.content || 'Experimental validation was conducted using robust computational pipelines...'}
                        </p>
                      </div>

                      {/* Equation Showcase */}
                      <div className="bg-slate-50 p-4 border border-slate-200 font-mono text-center text-xs space-y-2 my-4">
                        <span className="text-[10px] text-slate-500 block">Equation (1) — Quality Optimization Index:</span>
                        <div className="text-sm font-bold text-slate-900 py-1">
                          RRI_score = Σ (w_i × CRediT_i) / (1 + e^-λt)
                        </div>
                      </div>

                      <div className="space-y-2 text-xs text-slate-800 leading-relaxed">
                        <h3 className="text-sm font-bold font-sans text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
                          3. Experimental Results
                        </h3>
                        <p>
                          {article.fullTextSections?.[2]?.content || 'Across 12 independent trials, our model achieved statistical significance with p < 0.001...'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Page 3: Figures & CRediT */}
                  {pdfPage === 3 && (
                    <div className="space-y-6 flex-1">
                      <h3 className="text-sm font-bold font-sans text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
                        4. High-Resolution Visual Artifacts
                      </h3>

                      {article.figures && article.figures.length > 0 ? (
                        <div className="space-y-3 bg-slate-50 p-3 rounded border border-slate-200">
                          <img 
                            src={article.figures[0].url} 
                            alt="Figure" 
                            className="w-full h-48 object-cover rounded border border-slate-300" 
                          />
                          <p className="text-[10px] italic text-slate-600 font-sans">
                            <strong>Figure 1.</strong> {article.figures[0].caption}
                          </p>
                        </div>
                      ) : (
                        <div className="p-6 text-center text-xs text-slate-500 font-mono bg-slate-50 rounded">
                          [Figure 1: Analytical plots and statistical charts]
                        </div>
                      )}

                      <div className="space-y-2">
                        <h4 className="text-xs font-bold font-sans uppercase tracking-wider text-slate-900">
                          CRediT Contributor Matrix
                        </h4>
                        <div className="text-[11px] font-mono text-slate-700 bg-slate-50 p-3 rounded border border-slate-200 space-y-1">
                          {article.authors.map(a => (
                            <div key={a.id}>
                              <strong>{a.name}:</strong> {a.creditRoles?.join(', ')}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Page 4: Discussion & References */}
                  {pdfPage === 4 && (
                    <div className="space-y-6 flex-1">
                      <div className="space-y-2 text-xs text-slate-800 leading-relaxed">
                        <h3 className="text-sm font-bold font-sans text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
                          5. Discussion & Conclusion
                        </h3>
                        <p>
                          {article.fullTextSections?.[3]?.content || 'In conclusion, this research establishes a foundational open science framework that bridges single-column publishing with verifiable peer review credentials.'}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-bold font-sans text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
                          References
                        </h3>
                        <ol className="list-decimal list-inside text-[10px] font-mono space-y-1 text-slate-700">
                          {article.references?.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  )}

                  {/* Running Footer Seal */}
                  <div className="border-t border-slate-300 pt-3 mt-8 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span className="flex items-center gap-1 font-bold text-amber-700">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Digital Evolution Official Watermark Press Seal</span>
                    </span>
                    <span>Page {pdfPage} of {totalPdfPages}</span>
                  </div>

                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer Bar */}
        <div className="bg-slate-100 dark:bg-slate-950 p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 text-xs shrink-0">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>CC BY 4.0 Open Access License — Free to Share & Adapt</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenGovernance('doc-copyright-oa')}
              className="text-amber-600 dark:text-amber-400 font-semibold underline cursor-pointer"
            >
              Read License Policy
            </button>
            <button
              onClick={onClose}
              className="bg-slate-900 dark:bg-slate-800 text-white font-semibold px-4 py-1.5 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors"
            >
              Close Reader
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

