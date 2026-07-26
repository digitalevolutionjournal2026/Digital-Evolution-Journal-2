import { Article, ReviewerProfile, Journal, Conference, EditorialBoardMember, MembershipTier, GovernanceDocument } from '../types';

export const FEATURED_ARTICLES: Article[] = [
  {
    id: 'art-001',
    title: 'Self-Evolving Transformer Architectures for Real-Time Scientific Data Extraction and Automated Peer Screening',
    doi: '10.59981/de.ai.2026.0412',
    abstract: 'Automated processing of non-standardized academic manuscript layouts remains a bottleneck in rapid peer dissemination. We present Meta-Extract Transformer (MET-15), a novel architecture trained on 1.4M structured academic documents. MET-15 parses single and multi-column inputs with 99.4% precision into canonical JSON abstract trees, extracting CRediT taxonomy roles, citations, and mathematical constructs in real time.',
    authors: [
      {
        id: 'auth-1',
        name: 'Dr. Aris Thorne',
        email: 'athorne@oxford.ac.uk',
        affiliation: 'Department of Computer Science, University of Oxford',
        orcid: '0000-0002-1825-0097',
        isCorresponding: true,
        creditRoles: ['Conceptualization', 'Methodology', 'Software', 'Writing – original draft']
      },
      {
        id: 'auth-2',
        name: 'Prof. Elena Rostova',
        email: 'erostova@ethz.ch',
        affiliation: 'ETH Zürich, AI Systems Laboratory',
        orcid: '0000-0003-9182-4410',
        isCorresponding: false,
        creditRoles: ['Supervision', 'Formal analysis', 'Funding acquisition', 'Writing – review & editing']
      }
    ],
    journalName: 'Digital Evolution: Artificial Intelligence',
    volume: 3,
    issue: 1,
    year: 2026,
    fieldCategory: 'Artificial Intelligence',
    ccLicense: 'CC BY 4.0',
    citationCount: 42,
    downloadCount: 1840,
    altmetricScore: 88,
    rriScore: 4.9,
    publishedAt: '2026-06-14',
    keywords: ['Transformers', 'Document Parsing', 'Peer Review Automation', 'CRediT Taxonomy', 'NLP'],
    reproducibilityBadges: {
      codeAvailable: true,
      dataAvailable: true,
      editorVerified: true,
      codeUrl: 'https://github.com/digital-evolution-lab/met15-transformer',
      dataUrl: 'https://zenodo.org/record/8491023'
    },
    fullTextSections: [
      {
        heading: '1. Introduction & Background',
        content: 'Scientific publishing is transitioning towards structured digital representation. Traditional PDF formats create silos where tables, mathematical proofs, and dataset identifiers are trapped in unstructured visual layers. MET-15 bridges this gap by enforcing single-source structured schemas across all manuscript lifecycles.'
      },
      {
        heading: '2. Architecture & Methodology',
        content: 'Our model utilizes a dual-stream cross-attention backbone combining vision-based token alignment with syntactic text trees. Evaluation on 250,000 benchmark manuscripts demonstrated zero hallucinations across reference list parsers.'
      },
      {
        heading: '3. Results & Peer Review Metrics',
        content: 'Validation by 14 independent reviewers recorded an average RRI confidence rating of 4.9/5.0 across method rigor and statistical replication.'
      }
    ],
    figures: [
      {
        caption: 'Figure 1: Cross-attention network alignment for automated CRediT role extraction.',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    references: [
      'Vaswani, A., et al. (2017). Attention is all you need. Advances in Neural Information Processing Systems, 30.',
      'Brand, A., et al. (2015). Beyond authorship: attribution, contribution, collaboration, and credit. Learned Publishing, 28(2), 151-155.',
      'Thorne, A., & Rostova, E. (2025). High-density scholarly graph parsing. Digital Evolution Journal, 2(4), 102-118.'
    ]
  },
  {
    id: 'art-002',
    title: 'CRISPR-Guided Synthetic Epigenome Editing Restores Neural Plasticity in Human Organoid Models',
    doi: '10.59981/de.bio.2026.0289',
    abstract: 'Epigenetic silencing of synaptic plasticity genes is a primary hallmark of neurodegenerative cascade. Here, we engineer a locus-specific dCas9-DNMT3A/TET1 methylome editor guided by spatial transcriptomic indexing. In 3D human cortical organoid assemblies, targeted demethylation restored synaptic vesicle density and electrophysiological reactivity within 14 days.',
    authors: [
      {
        id: 'auth-3',
        name: 'Dr. Sarah Lin-Vargas',
        email: 'slin@broadinstitute.org',
        affiliation: 'Broad Institute of MIT and Harvard',
        orcid: '0000-0001-4432-8811',
        isCorresponding: true,
        creditRoles: ['Conceptualization', 'Investigation', 'Visualization', 'Writing – original draft']
      },
      {
        id: 'auth-4',
        name: 'Dr. Kenji Takahashi',
        email: 'ktakahashi@kyoto-u.ac.jp',
        affiliation: 'Center for iPS Cell Research and Application, Kyoto University',
        orcid: '0000-0002-9901-3320',
        isCorresponding: false,
        creditRoles: ['Resources', 'Validation', 'Writing – review & editing']
      }
    ],
    journalName: 'Digital Evolution: Computational Biology',
    volume: 4,
    issue: 2,
    year: 2026,
    fieldCategory: 'Computational Biology',
    ccLicense: 'CC BY 4.0',
    citationCount: 68,
    downloadCount: 3120,
    altmetricScore: 142,
    rriScore: 5.0,
    publishedAt: '2026-05-28',
    keywords: ['CRISPR', 'Epigenomics', 'Neural Plasticity', 'Cortical Organoids', 'Synaptic Density'],
    reproducibilityBadges: {
      codeAvailable: true,
      dataAvailable: true,
      editorVerified: true,
      codeUrl: 'https://github.com/broadinstitute/epigenome-organoid-pipeline',
      dataUrl: 'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE298101'
    },
    fullTextSections: [
      {
        heading: '1. Epigenetic Silencing Mechanisms',
        content: 'Neurodegenerative pathology is exacerbated by promoter hypermethylation of key neurotrophic receptors. Direct gene replacement therapy often induces untargeted cytotoxicity, whereas targeted methylome editing offers a reversible precision pathway.'
      },
      {
        heading: '2. Experimental Design & Results',
        content: 'Patch-clamp electrophysiology verified a 3.4-fold enhancement in spontaneous action potential frequencies across organoid cultures following synthetic TET1 activation.'
      }
    ],
    figures: [
      {
        caption: 'Figure 1: Confocal microscopy showing synaptic restoration in 3D cortical organoids after 14 days.',
        url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    references: [
      'Gao, L., et al. (2021). Precision epigenome editing in mammalian systems. Nature Biotechnology, 39(8), 920-932.',
      'Takahashi, K., & Yamanaka, S. (2006). Induction of pluripotent stem cells from mouse embryonic fibroblast cultures. Cell, 126(4), 663-676.'
    ]
  },
  {
    id: 'art-003',
    title: 'Fault-Tolerant Topological Surface Codes for 100,000+ Logical Qubits in Cryogenic Superconducting Matrices',
    doi: '10.59981/de.qc.2026.0104',
    abstract: 'Scaling quantum processing units beyond the noisy intermediate-scale quantum (NISQ) era requires active topological error correction under sub-10mK thermal gradients. We demonstrate a 2D surface code lattice design incorporating real-time flux-bias calibration, reducing physical error rates to 1.2 x 10^-5 per gate cycle.',
    authors: [
      {
        id: 'auth-5',
        name: 'Prof. Marcus Vance',
        email: 'mvance@caltech.edu',
        affiliation: 'Institute for Quantum Information and Matter, Caltech',
        orcid: '0000-0003-1102-7729',
        isCorresponding: true,
        creditRoles: ['Formal analysis', 'Investigation', 'Project administration', 'Writing – original draft']
      }
    ],
    journalName: 'Digital Evolution: Quantum & Cybernetics',
    volume: 2,
    issue: 1,
    year: 2026,
    fieldCategory: 'Quantum & Cybernetics',
    ccLicense: 'CC BY 4.0',
    citationCount: 31,
    downloadCount: 1420,
    altmetricScore: 64,
    rriScore: 4.8,
    publishedAt: '2026-04-19',
    keywords: ['Topological Surface Code', 'Quantum Computing', 'Fault Tolerance', 'Cryogenics', 'Qubits'],
    reproducibilityBadges: {
      codeAvailable: true,
      dataAvailable: true,
      editorVerified: true,
      codeUrl: 'https://github.com/caltech-iqim/topological-surface-sim',
      dataUrl: 'https://figshare.com/articles/dataset/Cryogenic_Qubit_Lattice_Telemetry/2410928'
    },
    fullTextSections: [
      {
        heading: '1. Introduction',
        content: 'Fault-tolerant quantum computing is contingent upon logical qubit encoding with low error thresholds. Topological surface codes provide optimal 2D physical connectivity for cryogenic superconducting architectures.'
      }
    ],
    references: [
      'Fowler, A. G., et al. (2012). Surface codes: Towards practical large-scale quantum computation. Physical Review A, 86(3), 032324.'
    ]
  },
  {
    id: 'art-004',
    title: 'The Ethics of Autonomous Peer Review: Transparency Frameworks and Hallucination Mitigations in AI Editorial Screening',
    doi: '10.59981/de.ose.2026.0077',
    abstract: 'As generative language systems become integrated into manuscript triage and reviewer matching, ethical safeguards must guarantee human oversight, editorial accountability, and complete freedom from algorithmic bias. We establish the Open Science AI Disclosures Standard (OSAID-2026).',
    authors: [
      {
        id: 'auth-6',
        name: 'Dr. Priya Nair',
        email: 'pnair@cam.ac.uk',
        affiliation: 'Centre for the Study of Existential Risk, University of Cambridge',
        orcid: '0000-0001-9082-1209',
        isCorresponding: true,
        creditRoles: ['Conceptualization', 'Ethics approval', 'Writing – original draft', 'Writing – review & editing']
      }
    ],
    journalName: 'Digital Evolution: Open Science & Ethics',
    volume: 1,
    issue: 2,
    year: 2026,
    fieldCategory: 'Open Science & Ethics',
    ccLicense: 'CC BY 4.0',
    citationCount: 54,
    downloadCount: 2890,
    altmetricScore: 190,
    rriScore: 5.0,
    publishedAt: '2026-03-30',
    keywords: ['Publication Ethics', 'AI Governance', 'Open Science', 'Peer Review Integrity', 'COPE Standards'],
    reproducibilityBadges: {
      codeAvailable: true,
      dataAvailable: true,
      editorVerified: true,
      dataUrl: 'https://osf.io/ethics-framework-2026'
    },
    fullTextSections: [
      {
        heading: '1. Algorithmic Integrity in Peer Review',
        content: 'The use of AI models as unassisted reviewers violates author confidentiality and risks unchecked citation bias. This paper outlines strict operational guidelines for transparent human-in-the-loop review systems.'
      }
    ],
    references: [
      'COPE Council. (2023). COPE Position Statement on AI tools in research publications. Committee on Publication Ethics.'
    ]
  }
];

export const TOP_REVIEWERS: ReviewerProfile[] = [
  {
    id: 'rev-101',
    name: 'Dr. Hannah Bergmann',
    title: 'Principal Investigator in Deep Learning & Formal Verification',
    institution: 'Max Planck Institute for Software Systems',
    orcid: '0000-0001-8920-3341',
    rriScore: 98.6,
    percentile: 99,
    totalReviews: 48,
    topCategory: 'Artificial Intelligence',
    badges: ['Top 1% Reviewer 2026', 'Methodology Specialist', 'Code Reproducibility Champion'],
    recentReviewsCount: 14,
    rubricScores: {
      methodology: 4.9,
      novelty: 4.8,
      statistics: 5.0,
      writing: 4.7,
      ethics: 5.0,
      data: 4.9,
      code: 5.0
    }
  },
  {
    id: 'rev-102',
    name: 'Prof. David O’Connor',
    title: 'Chair of Biostatistics & Clinical Trial Analytics',
    institution: 'Johns Hopkins Bloomberg School of Public Health',
    orcid: '0000-0002-7711-9023',
    rriScore: 97.2,
    percentile: 98,
    totalReviews: 62,
    topCategory: 'Computational Biology',
    badges: ['Statistical Rigor Award', 'Top Reviewer', 'Open Data Verifier'],
    recentReviewsCount: 18,
    rubricScores: {
      methodology: 5.0,
      novelty: 4.6,
      statistics: 5.0,
      writing: 4.8,
      ethics: 4.9,
      data: 5.0,
      code: 4.7
    }
  },
  {
    id: 'rev-103',
    name: 'Dr. Mei-Ling Chen',
    title: 'Senior Researcher in Cryogenic Qubit Engineering',
    institution: 'National University of Singapore',
    orcid: '0000-0003-4410-1822',
    rriScore: 96.5,
    percentile: 97,
    totalReviews: 35,
    topCategory: 'Quantum & Cybernetics',
    badges: ['Quantum Rigor Specialist', 'Top 5% Reviewer'],
    recentReviewsCount: 9,
    rubricScores: {
      methodology: 4.8,
      novelty: 4.9,
      statistics: 4.7,
      writing: 4.6,
      ethics: 5.0,
      data: 4.8,
      code: 4.9
    }
  }
];

export const JOURNALS: Journal[] = [
  {
    id: 'j-01',
    name: 'Digital Evolution: Artificial Intelligence',
    slug: 'de-ai',
    issn: '2998-4102',
    impactFactor: '8.4',
    acceptanceRate: '18%',
    avgReviewDays: 21,
    editorInChief: 'Prof. Elena Rostova (ETH Zürich)',
    scope: 'Publishes landmark breakthroughs in deep learning, transformer architectures, automated reasoning, generative neural models, and AI safety.',
    activeVolumesCount: 3,
    openSubmissions: true
  },
  {
    id: 'j-02',
    name: 'Digital Evolution: Computational Biology',
    slug: 'de-bio',
    issn: '2998-4110',
    impactFactor: '9.2',
    acceptanceRate: '15%',
    avgReviewDays: 24,
    editorInChief: 'Dr. Kenji Takahashi (Kyoto University)',
    scope: 'Covers spatial transcriptomics, epigenome editing, synthetic biology, molecular dynamics simulations, and AI-driven drug discovery.',
    activeVolumesCount: 4,
    openSubmissions: true
  },
  {
    id: 'j-03',
    name: 'Digital Evolution: Quantum & Cybernetics',
    slug: 'de-qc',
    issn: '2998-4129',
    impactFactor: '7.8',
    acceptanceRate: '22%',
    avgReviewDays: 19,
    editorInChief: 'Prof. Marcus Vance (Caltech)',
    scope: 'Topological surface codes, fault-tolerant cryogenic architectures, quantum communication protocols, and cybernetic feedback networks.',
    activeVolumesCount: 2,
    openSubmissions: true
  },
  {
    id: 'j-04',
    name: 'Digital Evolution: Open Science & Ethics',
    slug: 'de-ose',
    issn: '2998-4137',
    impactFactor: '6.9',
    acceptanceRate: '25%',
    avgReviewDays: 16,
    editorInChief: 'Dr. Priya Nair (University of Cambridge)',
    scope: 'Research integrity, open access policy models, reproducible data standards, peer review accreditation, and ethical AI publication governance.',
    activeVolumesCount: 1,
    openSubmissions: true
  }
];

export const CONFERENCES: Conference[] = [
  {
    id: 'conf-2026-1',
    name: 'DE-AI 2026: International Symposium on Self-Evolving AI & Neural Foundations',
    code: 'DE-AI-2026',
    date: 'October 14-17, 2026',
    location: 'Geneva, Switzerland & Virtual Hybrid',
    theme: 'Provable Safety, Autonomous Scientific Discovery, and Scalable Architectures',
    cfpDeadline: 'August 15, 2026',
    proceedingsDoi: '10.59981/de.proc.ai2026',
    status: 'Open for Papers'
  },
  {
    id: 'conf-2026-2',
    name: 'DE-BIO 2026: Global Summit on Epigenomics & AI in Precision Medicine',
    code: 'DE-BIO-2026',
    date: 'November 02-05, 2026',
    location: 'Boston, MA, USA & Online',
    theme: 'Cellular Reprogramming, Organoid Engineering, and Spatial Multi-Omics',
    cfpDeadline: 'September 01, 2026',
    proceedingsDoi: '10.59981/de.proc.bio2026',
    status: 'Open for Papers'
  }
];

export const EDITORIAL_BOARD: EditorialBoardMember[] = [
  {
    id: 'ed-01',
    name: 'Prof. Elena Rostova',
    role: 'Editor-in-Chief',
    title: 'Professor of Computer Science & Intelligent Systems',
    institution: 'ETH Zürich',
    country: 'Switzerland',
    orcid: '0000-0003-9182-4410',
    bio: 'Pioneer in trustworthy neural systems, self-extracting document graphs, and automated scientific inference.',
    journalName: 'Digital Evolution: Artificial Intelligence',
    specialization: ['Deep Learning', 'Transformers', 'Automated Reasoning']
  },
  {
    id: 'ed-02',
    name: 'Dr. Kenji Takahashi',
    role: 'Editor-in-Chief',
    title: 'Director of Epigenetic Engineering',
    institution: 'Kyoto University',
    country: 'Japan',
    orcid: '0000-0002-9901-3320',
    bio: 'Recognized global expert in iPS cell reprogramming and target-specific methylome editing frameworks.',
    journalName: 'Digital Evolution: Computational Biology',
    specialization: ['CRISPR', 'Organoids', 'Stem Cells']
  },
  {
    id: 'ed-03',
    name: 'Prof. Marcus Vance',
    role: 'Editor-in-Chief',
    title: 'Chair of Quantum Information Science',
    institution: 'Caltech',
    country: 'United States',
    orcid: '0000-0003-1102-7729',
    bio: 'Leading researcher in topological surface codes and fault-tolerant superconducting matrix controllers.',
    journalName: 'Digital Evolution: Quantum & Cybernetics',
    specialization: ['Fault Tolerance', 'Qubits', 'Quantum Cryptography']
  },
  {
    id: 'ed-04',
    name: 'Dr. Priya Nair',
    role: 'Editor-in-Chief',
    title: 'Senior Fellow in Ethics & AI Policy',
    institution: 'University of Cambridge',
    country: 'United Kingdom',
    orcid: '0000-0001-9082-1209',
    bio: 'Advisor to international science councils on open science, COPE compliance, and transparent peer evaluation.',
    journalName: 'Digital Evolution: Open Science & Ethics',
    specialization: ['Publication Ethics', 'Peer Review Accreditation', 'Open Science']
  }
];

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'tier-gold-oa',
    name: 'Gold Open Access (Author & Reader)',
    priceMonthly: 0,
    priceYearly: 0,
    description: 'Permanently 100% Free for all readers, authors, and reviewers worldwide. Zero paywalls, zero reading fees, CC BY 4.0 by default forever.',
    features: [
      'Unlimited Full-Text HTML & PDF reading',
      'No subscription or paywall for any paper ever',
      'Full access to RRI reviewer ratings & citable profiles',
      'Standard author submission & automated metadata parsing',
      'Highwire Press & Schema.org citation exports (BibTeX, RIS)'
    ],
    targetAudience: 'All Scientists, Researchers, Students, and Public Readers',
    ctaLabel: 'Start Reading Free'
  },
  {
    id: 'tier-scholar-plus',
    name: 'Scholar Supporter',
    priceMonthly: 12,
    priceYearly: 120,
    description: 'Optional power-user tools for active researchers desiring custom reading feeds, annotated collections, and instant SMS/email citation alerts.',
    features: [
      'Personalized research collections & interactive annotations',
      'Real-time citation & keyword tracking alerts',
      'Priority manuscript intake & prescreening status tracking',
      'Verified RRI Reviewer badge for personal CV/ORCID exports',
      'Direct sync with Zotero, Mendeley, and EndNote libraries'
    ],
    targetAudience: 'Active Authors, Peer Reviewers, & Postdoc Researchers',
    ctaLabel: 'Join Scholar Supporter',
    isPopular: true
  },
  {
    id: 'tier-institutional',
    name: 'Institutional Library Partner',
    priceMonthly: 199,
    priceYearly: 1990,
    description: 'Designed for university libraries, research institutes, and funding bodies needing institutional repository automation and bulk analytics APIs.',
    features: [
      'OAI-PMH harvest endpoints & direct institutional repository sync',
      'Dedicated institutional dashboard & citation metrics API',
      'Automated ORCID batch verification for faculty authors',
      'Gold Open Access sponsorship badge on institution published papers',
      'Priority conference proceedings hosting & DOI assignment'
    ],
    targetAudience: 'University Libraries, Research Institutes, & Grant Agencies',
    ctaLabel: 'Contact Library Relations'
  }
];

export const GOVERNANCE_DOCUMENTS: GovernanceDocument[] = [
  {
    id: 'doc-copyright-oa',
    title: 'Copyright Retention & Open Access License Agreement (CC BY 4.0)',
    category: 'License & Copyright',
    description: 'Authors retain 100% copyright of their work under Creative Commons Attribution 4.0 International License.',
    lastUpdated: '2026-01-10',
    downloadUrl: 'https://res.cloudinary.com/pzkb4rca/raw/upload/v1785050002/Digital-Evolution-Journal-Copyright-License-Agreement_2_ntv9ny.docx',
    summaryPoints: [
      'Non-exclusive license to publish granted to Digital Evolution Journal.',
      'Authors retain full copyright without restriction.',
      'Anyone is free to share, copy, and adapt the material for any purpose with proper attribution.',
      'No embargo period whatsoever — immediate universal access.'
    ],
    fullMarkdown: `
# Copyright Retention & Open Access License Agreement (CC BY 4.0)

### 1. Open Access Policy
Digital Evolution operates on a strict **Gold Open Access** model. All articles published are immediately and permanently available free of charge to read, download, print, distribute, and link to.

### 2. Copyright Retention
Authors retain full copyright of their work. By submitting a manuscript, authors grant Digital Evolution Press a non-exclusive license to publish, archive, and index the structured version of the manuscript.

### 3. CC BY 4.0 Terms
Articles are licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0). Under this license:
* **Share** — copy and redistribute the material in any medium or format.
* **Adapt** — remix, transform, and build upon the material for any purpose, even commercially.
* **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made.
`
  },
  {
    id: 'doc-ethics-statement',
    title: 'Publication Ethics & Integrity Statement (COPE Standards)',
    category: 'Ethics & Integrity',
    description: 'Operational guidelines enforcing research integrity, COI disclosures, AI usage disclosures, and misconduct procedures.',
    lastUpdated: '2026-02-01',
    downloadUrl: 'https://res.cloudinary.com/pzkb4rca/raw/upload/v1785050002/Digital-Evolution-Journal-Publication-Ethics-Statement_1_yuthmm.docx',
    summaryPoints: [
      'Full compliance with Committee on Publication Ethics (COPE) core practices.',
      'Mandatory AI usage disclosure for all manuscript versions.',
      'Zero tolerance for plagiarism, data fabrication, or dual submission.',
      'Strict Editor Conflict-of-Interest recusal workflows.'
    ],
    fullMarkdown: `
# Publication Ethics & Integrity Statement

### 1. Authorship & CRediT Taxonomy
Authorship must be limited to those who have made a significant contribution to the conception, design, execution, or interpretation of the reported study. All authors must assign their specific roles using the 14 CRediT taxonomy definitions.

### 2. Artificial Intelligence Disclosures
Generative AI tools (e.g., LLMs, automated code generators) **cannot** be listed as authors. If AI tools were utilized in data collection, image processing, or drafting, authors must submit a completed AI Disclosure Statement detailing tool name, version, and human verification steps.

### 3. Conflicts of Interest
All authors, reviewers, and editors must declare any financial, personal, or professional conflicts of interest that could influence manuscript evaluation.
`
  },
  {
    id: 'doc-reviewer-guidelines',
    title: 'Reviewer Guidelines & RRI 8-Dimension Evaluation Rubric',
    category: 'Reviewer Guidelines',
    description: 'Detailed instructions for evaluating manuscripts across 8 core dimensions and earning RRI credentials.',
    lastUpdated: '2026-03-15',
    downloadUrl: 'https://res.cloudinary.com/pzkb4rca/raw/upload/v1785050002/Digital-Evolution-Journal-Reviewer-Guidelines_1_rmuxcp.docx',
    summaryPoints: [
      'Reviews are rated across 8 standardized dimensions (1-5 scale + written justification).',
      'Confidential comments to editors vs. constructive feedback to authors.',
      'Peer review ratings contribute to the citable Reviewer Reputation Index (RRI).',
      'Strict confidentiality and double-blind / open review options.'
    ],
    fullMarkdown: `
# Reviewer Guidelines & RRI Evaluation Rubric

### 1. The 8-Dimension Rubric
Every peer review on Digital Evolution requires scoring (1.0 to 5.0) and written evidence for:
1. **Methodology Rigor**: Experimental design, controls, and validity.
2. **Novelty & Impact**: Contribution to the existing scientific literature.
3. **Statistical Validity**: Sample sizes, error bounds, and mathematical correctness.
4. **Writing & Structure**: Clarity, logical flow, and figure quality.
5. **Ethics & Integrity**: Human/animal approval, trial registration, consent.
6. **Data Availability**: Raw data completeness, repository deposition.
7. **Code & Reproducibility**: Executable code availability, dependency documentation.
8. **Overall Recommendation**: Accept, Minor Revision, Major Revision, or Reject.

### 2. Reviewer Reputation Index (RRI)
Reviews submitted through Digital Evolution are meta-evaluated by editors and fellow reviewers for thoroughness, constructive tone, and insight. High-quality reviews accumulate portable RRI scores exportable to ORCID.
`
  },
  {
    id: 'doc-manuscript-template',
    title: 'Author Manuscript Structure & Single-Column Template Guidelines',
    category: 'Author Guidelines',
    description: 'Technical requirements for submitting single-column DOCX, LaTeX, or PDF manuscripts for automated parsing.',
    lastUpdated: '2026-04-01',
    downloadUrl: 'https://res.cloudinary.com/pzkb4rca/raw/upload/v1785050002/Digital-Evolution-Journal-Manuscript-Template_3_lyxagl.docx',
    summaryPoints: [
      'Single-column layout is mandatory for high-precision structured parsing.',
      'Required sections: Title, Abstract, CRediT Roles, Methods, Data Availability, References.',
      'High-resolution figures (300+ DPI) with clear captions.',
      'Structured reference list matching DOI standards.'
    ],
    fullMarkdown: `
# Author Manuscript Structure Guidelines

### 1. Single-Column Requirement
To ensure our automated parsing engines (MET-15) accurately convert your submission into structured HTML, XML, and PDF, **all submissions must be formatted in a single-column layout**. Multi-column templates break automated citation and figure extraction.

### 2. Mandatory Structural Sections
Every manuscript must contain:
* **Title & Keywords** (5-8 indexed terms)
* **Structured Abstract** (max 350 words: Context, Methods, Results, Conclusion)
* **Author Affiliations & ORCID iDs**
* **CRediT Contribution Matrix**
* **Data & Code Availability Statements**
* **Ethical Statements & AI Disclosures**
`
  },
  {
    id: 'doc-editorial-handbook',
    title: 'Digital Evolution Journal Editorial Handbook',
    category: 'Editorial Handbook',
    description: 'Complete operational manual for section editors, guest editors, and manuscript handling workflows.',
    lastUpdated: '2026-05-10',
    downloadUrl: 'https://res.cloudinary.com/pzkb4rca/raw/upload/v1785050002/Digital-Evolution-Journal-Editorial-Handbook_zd9cvf.docx',
    summaryPoints: [
      'Comprehensive editorial office standards, decision trees, and peer review escalation pathways.',
      'Prescreening protocols for methodology check, plagiarism verification, and scope alignment.',
      'Reviewer assignment algorithms and conflict-of-interest automated checks.',
      'Post-acceptance production, DOI minting, and OAI-PMH indexing workflows.'
    ],
    fullMarkdown: `
# Editorial Handbook & Operational Standards

### 1. Editorial Workflow
1. **Initial Submission & Prescreening**: Technical sanity checks, AI disclosure audits, and single-column formatting checks.
2. **Double-Blind / Open Peer Assignment**: Minimum of 2 qualified independent reviewers with verified RRI credentials.
3. **Editorial Decision**: Accept, Minor Revision, Major Revision, or Reject based on synthesized reviewer rubrics.
4. **Production & Versioning**: Version of Record (VoR) generation with immutable DOI assignment and CC BY 4.0 license tagging.
`
  }
];

export const RESEARCHER_PROFILES: import('../types').ResearcherProfile[] = [
  {
    id: 'res-elena-rostova',
    name: 'Prof. Elena Rostova',
    title: 'Director of AI & Open Systems Laboratory',
    institution: 'ETH Zürich',
    email: 'erostova@ethz.ch',
    orcid: '0000-0003-9182-4410',
    bio: 'Pioneer in neural document understanding, open science protocols, and quantitative peer review governance. Leads the European Open Science Cloud (EOSC) AI initiative.',
    avatarInitials: 'ER',
    rriScore: 4.96,
    percentile: 99,
    totalCitations: 1420,
    totalPublications: 18,
    hIndex: 22,
    verifiedReviewsCount: 38,
    badges: ['Top 1% Global Reviewer', 'Open Code Auditor', 'Gold Standard Editor', 'CC BY Champion', 'COPE Ethics Certified'],
    publishedArticles: [FEATURED_ARTICLES[0], FEATURED_ARTICLES[2]],
    rubricAverages: {
      methodology: 4.9,
      novelty: 4.8,
      statistics: 5.0,
      ethics: 5.0
    },
    completedReviews: [
      {
        id: 'rev-2026-089',
        manuscriptTitle: 'Quantum Surface Code Error Correction Under Non-Gaussian Dephasing Noise',
        doi: '10.59981/de.qc.2026.0104',
        journalName: 'Digital Evolution: Quantum & Cybernetics',
        completedDate: '2026-07-12',
        rriPointsEarned: 180,
        reviewType: 'Double-Blind Peer Review',
        verdict: 'Accept with Minor Revisions',
        rubricScores: {
          methodology: 5.0,
          novelty: 4.8,
          reproducibility: 4.9,
          clarity: 4.7
        },
        summaryExcerpt: 'Rigorous mathematical proof for non-Gaussian noise bounds. Recommended minor clarification regarding code repository setup scripts and GPU memory allocation.'
      },
      {
        id: 'rev-2026-042',
        manuscriptTitle: 'CRISPR-Guided Synthetic Epigenome Editing in Neural Organoid Models',
        doi: '10.59981/de.bio.2026.0289',
        journalName: 'Digital Evolution: Computational Biology',
        completedDate: '2026-05-28',
        rriPointsEarned: 150,
        reviewType: 'Open Peer Review',
        verdict: 'Accept As Is',
        rubricScores: {
          methodology: 4.9,
          novelty: 5.0,
          reproducibility: 5.0,
          clarity: 4.8
        },
        summaryExcerpt: 'Exceptional open dataset compliance. Raw RNA-seq files and spatial transcriptomic coordinates were verified on Zenodo within 24 hours.'
      },
      {
        id: 'rev-2026-011',
        manuscriptTitle: 'Federated Graph Attention Networks for Privacy-Preserving Clinical Trials',
        doi: '10.59981/de.ai.2025.0911',
        journalName: 'Digital Evolution: Artificial Intelligence',
        completedDate: '2026-03-04',
        rriPointsEarned: 160,
        reviewType: 'Double-Blind Peer Review',
        verdict: 'Revise & Resubmit',
        rubricScores: {
          methodology: 4.2,
          novelty: 4.5,
          reproducibility: 3.8,
          clarity: 4.0
        },
        summaryExcerpt: 'Promising architecture, but requested additional ablation studies comparing differential privacy noise parameters across 3 independent hospital cohorts.'
      }
    ]
  },
  {
    id: 'res-aris-thorne',
    name: 'Dr. Aris Thorne',
    title: 'Senior Research Fellow in Computational Linguistics',
    institution: 'University of Oxford',
    email: 'athorne@oxford.ac.uk',
    orcid: '0000-0002-1825-0097',
    bio: 'Focuses on multi-modal document layout extraction, transformer compression, and automated peer screening tools. Lead developer of MET-15 parser.',
    avatarInitials: 'AT',
    rriScore: 4.88,
    percentile: 96,
    totalCitations: 890,
    totalPublications: 12,
    hIndex: 16,
    verifiedReviewsCount: 24,
    badges: ['MET-15 Lead Author', 'Open Data Contributor', 'Rapid Reviewer', 'RRI Gold Star'],
    publishedArticles: [FEATURED_ARTICLES[0]],
    rubricAverages: {
      methodology: 4.8,
      novelty: 4.9,
      statistics: 4.7,
      ethics: 4.9
    },
    completedReviews: [
      {
        id: 'rev-2026-077',
        manuscriptTitle: 'Zero-Shot Cross-Lingual Knowledge Transfer in Biomedical Literature Parsing',
        doi: '10.59981/de.ai.2026.0331',
        journalName: 'Digital Evolution: Artificial Intelligence',
        completedDate: '2026-06-19',
        rriPointsEarned: 140,
        reviewType: 'Open Peer Review',
        verdict: 'Accept with Minor Revisions',
        rubricScores: {
          methodology: 4.7,
          novelty: 4.9,
          reproducibility: 4.8,
          clarity: 4.6
        },
        summaryExcerpt: 'Impressive zero-shot transfer capabilities across 14 languages. Suggested adding runtime benchmark comparisons against classical layout parsers.'
      }
    ]
  },
  {
    id: 'res-sarah-lin',
    name: 'Dr. Sarah Lin-Vargas',
    title: 'Principal Scientist in Epigenomics',
    institution: 'Broad Institute of MIT and Harvard',
    email: 'slin@broadinstitute.org',
    orcid: '0000-0001-4432-8811',
    bio: 'Specializes in spatial transcriptomics, dCas9 synthetic epigenetics, and human cortical organoid disease modeling.',
    avatarInitials: 'SL',
    rriScore: 4.92,
    percentile: 98,
    totalCitations: 2150,
    totalPublications: 24,
    hIndex: 26,
    verifiedReviewsCount: 31,
    badges: ['Epigenomics Pioneer', 'Open Data Champion', 'Senior Peer Auditor'],
    publishedArticles: [FEATURED_ARTICLES[1]],
    rubricAverages: {
      methodology: 5.0,
      novelty: 4.9,
      statistics: 4.8,
      ethics: 5.0
    },
    completedReviews: [
      {
        id: 'rev-2026-055',
        manuscriptTitle: 'Single-Cell Methylome Profiling of Synaptic Plasticity Genes in Alzheimer Models',
        doi: '10.59981/de.bio.2026.0199',
        journalName: 'Digital Evolution: Computational Biology',
        completedDate: '2026-04-10',
        rriPointsEarned: 170,
        reviewType: 'Double-Blind Peer Review',
        verdict: 'Accept As Is',
        rubricScores: {
          methodology: 5.0,
          novelty: 4.8,
          reproducibility: 5.0,
          clarity: 4.9
        },
        summaryExcerpt: 'Methodology is flawless with thorough control conditions for off-target cleavage. Dataset meets highest FAIR principles standards.'
      }
    ]
  }
];

export const DEFAULT_ANNOTATIONS: Record<string, import('../types').ArticleAnnotation[]> = {
  'art-001': [
    {
      id: 'ann-001',
      articleId: 'art-001',
      sectionHeading: '1. Introduction & Background',
      highlightedText: 'Traditional PDF formats create silos where tables, mathematical proofs, and dataset identifiers are trapped in unstructured visual layers.',
      commentText: 'Crucial observation for open science workflows. Our benchmark on 10,000 papers confirmed that single-column parsing reduces formula loss from 18.2% down to 0.1%.',
      authorName: 'Prof. Elena Rostova',
      authorOrcid: '0000-0003-9182-4410',
      category: 'Methodology',
      createdAt: '2026-06-16',
      endorsementsCount: 14,
      replies: [
        {
          id: 'rep-001',
          authorName: 'Dr. Aris Thorne',
          authorOrcid: '0000-0002-1825-0097',
          text: 'Agreed! In MET-15, single-column parsing ensures native LaTeX equation tokens are mapped directly into MathML nodes without layout ambiguity.',
          createdAt: '2026-06-17'
        }
      ]
    },
    {
      id: 'ann-002',
      articleId: 'art-001',
      sectionHeading: '2. Architecture & Methodology',
      highlightedText: 'dual-stream cross-attention backbone combining vision-based token alignment with syntactic text trees',
      commentText: 'Is the vision stream evaluated at 300 DPI? We observed GPU VRAM spikes during high-resolution figure processing on standard RTX 4090 rigs.',
      authorName: 'Dr. Marcus Vance',
      authorOrcid: '0000-0002-1823-7411',
      category: 'Data & Code',
      createdAt: '2026-06-20',
      endorsementsCount: 8,
      replies: []
    }
  ],
  'art-002': [
    {
      id: 'ann-003',
      articleId: 'art-002',
      sectionHeading: '2. Architecture & Methodology',
      highlightedText: 'targeted demethylation restored synaptic vesicle density and electrophysiological reactivity within 14 days',
      commentText: 'The 14-day window for electrophysiological recovery is remarkably fast for organoid assemblies. Were patch-clamp recordings performed on day 7 as well?',
      authorName: 'Dr. Sarah Lin-Vargas',
      authorOrcid: '0000-0001-4432-8811',
      category: 'General Query',
      createdAt: '2026-05-30',
      endorsementsCount: 11,
      replies: []
    }
  ]
};

