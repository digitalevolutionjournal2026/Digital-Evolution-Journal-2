import React, { useState, useEffect } from 'react';
import { Bookmark, Check, Folder, Plus, X } from 'lucide-react';
import { Article, SavedArticleFolder } from '../types';
import { 
  getSavedFolders, 
  saveFolders, 
  getFolderForArticle, 
  saveArticleToFolder, 
  removeArticleFromLibrary 
} from '../utils/libraryManager';

interface SaveToLibraryModalProps {
  article: Article;
  onClose: () => void;
  onSavedSuccess?: (folderName: string) => void;
}

export const SaveToLibraryModal: React.FC<SaveToLibraryModalProps> = ({
  article,
  onClose,
  onSavedSuccess = (_folderName: string) => {},
}) => {
  const [folders, setFolders] = useState<SavedArticleFolder[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string>('fld-favorites');
  const [currentSavedFolderId, setCurrentSavedFolderId] = useState<string | null>(null);
  const [researchNote, setResearchNote] = useState<string>('');
  const [newFolderName, setNewFolderName] = useState<string>('');
  const [showInlineNewFolder, setShowInlineNewFolder] = useState<boolean>(false);

  useEffect(() => {
    const loadedFolders = getSavedFolders();
    setFolders(loadedFolders);
    const savedFld = getFolderForArticle(article.id);
    if (savedFld) {
      setCurrentSavedFolderId(savedFld);
      setSelectedFolderId(savedFld);
    } else if (loadedFolders.length > 0) {
      setSelectedFolderId(loadedFolders[0].id);
    }
  }, [article.id]);

  const handleSave = () => {
    saveArticleToFolder(article, selectedFolderId, researchNote);
    const fldObj = folders.find(f => f.id === selectedFolderId);
    onSavedSuccess(fldObj?.name || 'Library');
    onClose();
  };

  const handleRemove = () => {
    removeArticleFromLibrary(article.id);
    onSavedSuccess('Removed from Library');
    onClose();
  };

  const handleCreateInlineFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    const newFld: SavedArticleFolder = {
      id: `fld-${Date.now()}`,
      name: newFolderName.trim(),
      colorHex: '#3b82f6',
      createdAt: new Date().toISOString().split('T')[0],
    };

    const updated = [...folders, newFld];
    setFolders(updated);
    saveFolders(updated);
    setSelectedFolderId(newFld.id);
    setNewFolderName('');
    setShowInlineNewFolder(false);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl text-slate-900 dark:text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-base font-serif-editorial">
              Save Paper to Collection
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Article Summary Preview */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
          <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold block mb-0.5">
            {article.journalName} • DOI: {article.doi}
          </span>
          <h4 className="font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
            {article.title}
          </h4>
        </div>

        {/* Folder Select */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <label className="font-bold text-slate-700 dark:text-slate-300">
              Select Destination Folder:
            </label>
            <button
              onClick={() => setShowInlineNewFolder(!showInlineNewFolder)}
              className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 text-[11px]"
            >
              <Plus className="w-3 h-3" />
              <span>New Folder</span>
            </button>
          </div>

          {showInlineNewFolder && (
            <form onSubmit={handleCreateInlineFolder} className="flex gap-2">
              <input
                type="text"
                placeholder="Folder title..."
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 p-2 rounded-xl text-xs"
              />
              <button
                type="submit"
                className="bg-amber-500 text-slate-950 font-bold text-xs px-3 rounded-xl"
              >
                Add
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto no-scrollbar pt-1">
            {folders.map((fld) => (
              <button
                key={fld.id}
                type="button"
                onClick={() => setSelectedFolderId(fld.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                  selectedFolderId === fld.id
                    ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/50 font-bold'
                    : 'bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: fld.colorHex || '#f59e0b' }} 
                  />
                  <span>{fld.name}</span>
                </div>
                {selectedFolderId === fld.id && <Check className="w-4 h-4 text-amber-500" />}
              </button>
            ))}
          </div>
        </div>

        {/* Optional Research Note */}
        <div>
          <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1">
            Research Note / Takeaway (Optional):
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Relevant for introduction chapter on deep transformer architectures..."
            value={researchNote}
            onChange={(e) => setResearchNote(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 p-2.5 rounded-xl text-xs text-slate-900 dark:text-slate-100 font-sans"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
          {currentSavedFolderId ? (
            <button
              onClick={handleRemove}
              className="text-rose-500 hover:underline font-mono"
            >
              Remove from Library
            </button>
          ) : (
            <span className="text-slate-400 font-mono text-[11px]">Unsaved</span>
          )}

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl cursor-pointer shadow flex items-center gap-1.5"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Save Paper</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
