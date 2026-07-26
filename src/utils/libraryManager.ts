import { Article, SavedArticleFolder, SavedArticleItem } from '../types';
import { FEATURED_ARTICLES } from '../data/journalData';

const STORAGE_FOLDERS_KEY = 'dej_library_folders_v1';
const STORAGE_ITEMS_KEY = 'dej_library_items_v1';

export const DEFAULT_FOLDERS: SavedArticleFolder[] = [
  { id: 'fld-favorites', name: 'Starred Favorites', description: 'Priority research papers and benchmarks', colorHex: '#f59e0b', createdAt: '2026-07-01' },
  { id: 'fld-ai-ml', name: 'AI & Neural Dynamics', description: 'Autonomous agents and transformer architectures', colorHex: '#3b82f6', createdAt: '2026-07-02' },
  { id: 'fld-bio', name: 'Epigenomics & Synthetic Bio', description: 'Single-cell chromatin and gene regulation', colorHex: '#10b981', createdAt: '2026-07-03' },
  { id: 'fld-quantum', name: 'Quantum & Hardware', description: 'Fault-tolerant surface codes and latency', colorHex: '#8b5cf6', createdAt: '2026-07-04' },
];

export const getSavedFolders = (): SavedArticleFolder[] => {
  try {
    const raw = localStorage.getItem(STORAGE_FOLDERS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_FOLDERS_KEY, JSON.stringify(DEFAULT_FOLDERS));
      return DEFAULT_FOLDERS;
    }
    return JSON.parse(raw);
  } catch (err) {
    return DEFAULT_FOLDERS;
  }
};

export const saveFolders = (folders: SavedArticleFolder[]) => {
  try {
    localStorage.setItem(STORAGE_FOLDERS_KEY, JSON.stringify(folders));
  } catch (err) {
    console.error('Failed to save folders to localStorage', err);
  }
};

export const getSavedItems = (): SavedArticleItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_ITEMS_KEY);
    if (!raw) {
      // Seed default items for a rich initial library experience
      const defaultItems: SavedArticleItem[] = [
        {
          articleId: FEATURED_ARTICLES[0].id,
          article: FEATURED_ARTICLES[0],
          folderId: 'fld-ai-ml',
          savedAt: '2026-07-22',
          notes: 'Key paper on autonomous peer review transformers.',
        },
        {
          articleId: FEATURED_ARTICLES[1].id,
          article: FEATURED_ARTICLES[1],
          folderId: 'fld-bio',
          savedAt: '2026-07-23',
          notes: 'High-throughput single-cell ATAC-seq benchmark.',
        },
      ];
      localStorage.setItem(STORAGE_ITEMS_KEY, JSON.stringify(defaultItems));
      return defaultItems;
    }
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
};

export const saveItems = (items: SavedArticleItem[]) => {
  try {
    localStorage.setItem(STORAGE_ITEMS_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save library items to localStorage', err);
  }
};

export const isArticleSaved = (articleId: string): boolean => {
  const items = getSavedItems();
  return items.some(item => item.articleId === articleId);
};

export const getFolderForArticle = (articleId: string): string | null => {
  const items = getSavedItems();
  const match = items.find(item => item.articleId === articleId);
  return match ? match.folderId : null;
};

export const saveArticleToFolder = (article: Article, folderId: string, notes?: string): SavedArticleItem[] => {
  const items = getSavedItems();
  const existingIdx = items.findIndex(i => i.articleId === article.id);
  const newItem: SavedArticleItem = {
    articleId: article.id,
    article,
    folderId,
    savedAt: new Date().toISOString().split('T')[0],
    notes: notes || 'Saved from Digital Evolution Journal',
  };

  let updated: SavedArticleItem[];
  if (existingIdx >= 0) {
    updated = [...items];
    updated[existingIdx] = newItem;
  } else {
    updated = [newItem, ...items];
  }

  saveItems(updated);
  return updated;
};

export const removeArticleFromLibrary = (articleId: string): SavedArticleItem[] => {
  const items = getSavedItems();
  const updated = items.filter(i => i.articleId !== articleId);
  saveItems(updated);
  return updated;
};
