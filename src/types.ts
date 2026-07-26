export interface Author {
  id: string;
  name: string;
  email: string;
  affiliation: string;
  orcid?: string;
  isCorresponding?: boolean;
  creditRoles?: string[];
}

export interface Article {
  id: string;
  title: string;
  doi: string;
  abstract: string;
  authors: Author[];
  journalName: string;
  volume: number;
  issue: number;
  year: number;
  fieldCategory: 'Artificial Intelligence' | 'Computational Biology' | 'Quantum & Cybernetics' | 'Neuroscience' | 'Open Science & Ethics' | 'Data Science';
  ccLicense: 'CC BY 4.0';
  citationCount: number;
  downloadCount: number;
  altmetricScore: number;
  rriScore: number;
  publishedAt: string;
  keywords: string[];
  figures?: { caption: string; url: string }[];
  references?: string[];
  reproducibilityBadges: {
    codeAvailable: boolean;
    dataAvailable: boolean;
    editorVerified: boolean;
    codeUrl?: string;
    dataUrl?: string;
  };
  fullTextSections?: { heading: string; content: string }[];
  pdfUrl?: string;
}

export interface ReviewerProfile {
  id: string;
  name: string;
  title: string;
  institution: string;
  orcid: string;
  rriScore: number;
  percentile: number;
  totalReviews: number;
  topCategory: string;
  badges: string[];
  recentReviewsCount: number;
  rubricScores: {
    methodology: number;
    novelty: number;
    statistics: number;
    writing: number;
    ethics: number;
    data: number;
    code: number;
  };
}

export interface Journal {
  id: string;
  name: string;
  slug: string;
  issn: string;
  impactFactor: string;
  acceptanceRate: string;
  avgReviewDays: number;
  editorInChief: string;
  scope: string;
  activeVolumesCount: number;
  openSubmissions: boolean;
}

export interface Conference {
  id: string;
  name: string;
  code: string;
  date: string;
  location: string;
  theme: string;
  cfpDeadline: string;
  proceedingsDoi: string;
  status: 'Open for Papers' | 'Reviewing' | 'Proceedings Published';
}

export interface EditorialBoardMember {
  id: string;
  name: string;
  role: 'Editor-in-Chief' | 'Senior Editor' | 'Associate Editor' | 'Advisory Board';
  title: string;
  institution: string;
  country: string;
  orcid: string;
  bio: string;
  journalName: string;
  specialization: string[];
}

export interface MembershipTier {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  targetAudience: string;
  ctaLabel: string;
  isPopular?: boolean;
}

export interface GovernanceDocument {
  id: string;
  title: string;
  category: 'License & Copyright' | 'Author Guidelines' | 'Reviewer Guidelines' | 'Editorial Handbook' | 'Ethics & Integrity';
  description: string;
  lastUpdated: string;
  summaryPoints: string[];
  fullMarkdown: string;
  downloadUrl?: string;
}

export interface CompletedPeerReview {
  id: string;
  manuscriptTitle: string;
  doi: string;
  journalName: string;
  completedDate: string;
  rriPointsEarned: number;
  reviewType: 'Double-Blind Peer Review' | 'Open Peer Review' | 'Post-Publication Review';
  verdict: 'Accept with Minor Revisions' | 'Accept As Is' | 'Revise & Resubmit' | 'Reject';
  rubricScores: {
    methodology: number;
    novelty: number;
    reproducibility: number;
    clarity: number;
  };
  summaryExcerpt: string;
}

export interface ResearcherProfile {
  id: string;
  name: string;
  title: string;
  institution: string;
  email: string;
  orcid: string;
  bio: string;
  avatarInitials: string;
  rriScore: number;
  percentile: number;
  totalCitations: number;
  totalPublications: number;
  hIndex: number;
  verifiedReviewsCount: number;
  badges: string[];
  publishedArticles: Article[];
  completedReviews: CompletedPeerReview[];
  rubricAverages: {
    methodology: number;
    novelty: number;
    statistics: number;
    ethics: number;
  };
}

export interface AnnotationReply {
  id: string;
  authorName: string;
  authorOrcid?: string;
  text: string;
  createdAt: string;
}

export interface ArticleAnnotation {
  id: string;
  articleId: string;
  sectionHeading: string;
  highlightedText: string;
  commentText: string;
  authorName: string;
  authorOrcid: string;
  category: 'Methodology' | 'Data & Code' | 'Citation' | 'General Query' | 'Correction';
  createdAt: string;
  endorsementsCount: number;
  replies: AnnotationReply[];
}

export interface SavedArticleFolder {
  id: string;
  name: string;
  description?: string;
  colorHex?: string;
  createdAt: string;
}

export interface SavedArticleItem {
  articleId: string;
  article: Article;
  folderId: string;
  savedAt: string;
  notes?: string;
}

