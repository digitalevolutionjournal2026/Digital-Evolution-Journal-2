import React, { useState, useEffect } from 'react';
import { 
  X, 
  Bookmark, 
  Folder, 
  FolderPlus, 
  Trash2, 
  ExternalLink, 
  Eye, 
  Download, 
  Search, 
  BookOpen, 
  Edit3, 
  Plus, 
  Check, 
  FileText, 
  Sparkles,
  Quote,
  Layers,
  FolderOpen
} from 'lucide-react';
import { Article, SavedArticleFolder, SavedArticleItem } from '../types';
import { 
  getSavedFolders, 
  saveFolders, 
  getSavedItems, 
  saveItems, 
  removeArticleFromLibrary, 
  saveArticleToFolder 
} from '../utils/libraryManager';

interface MyLibraryModalProps {
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const MyLibraryModal: React.FC<MyLibraryModalProps> = ({
  onClose,
  onSelectArticle,
}) => {
  const [folders, setFolders] = useState<SavedArticleFolder[]>([]);
  const [items, setItems] = useState<SavedArticleItem[]>([]);
  const [activeFolderId, setActiveFolderId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // New Folder Modal / Form State
  const [showNewFolderModal, setShowNewFolderModal] = useState<boolean>(false);
  const [newFolderName, setNewFolderName] = useState<string>('');
  const [newFolderDesc, setNewFolderDesc] = useState<string>('');
  const [newFolderColor, setNewFolderColor] = useState<string>('#f59e0b');

  // Editing Note State
  const [editingNoteArticleId, setEditingNoteArticleId] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState<string>('');

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setFolders(getSavedFolders());
    setItems(getSavedItems());
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    const newFld: SavedArticleFolder = {
      id: `fld-${Date.now()}`,
      name: newFolderName.trim(),
      description: newFolderDesc.trim(),
      colorHex: newFolderColor,
      createdAt: new Date().toISOString().split('T')[0],
    };

    const updatedFolders = [...folders, newFld];
    setFolders(updatedFolders);
    saveFolders(updatedFolders);

    setNewFolderName('');
    setNewFolderDesc('');
    setShowNewFolderModal(false);
    setActiveFolderId(newFld.id);
    triggerToast(`Folder "${newFld.name}" created successfully.`);
  };

  const handleDeleteFolder = (folderId: string, folderName: string) => {
    if (folders.length <= 1) {
      alert('You must keep at least one collection folder.');
      return;
    }
    if (confirm(`Are you sure you want to delete folder "${folderName}"? Articles inside will be moved to Starred Favorites.`)) {
      const remainingFolders = folders.filter(f => f.id !== folderId);
      const fallbackFolderId = remainingFolders[0].id;

      // Reassign items in deleted folder
      const updatedItems = items.map(item =>
        item.folderId === folderId ? { ...item, folderId: fallbackFolderId } : item
      );

      setFolders(remainingFolders);
      saveFolders(remainingFolders);
      setItems(updatedItems);
      saveItems(updatedItems);
      setActiveFolderId('all');
      triggerToast(`Folder "${folderName}" removed. Articles moved to ${remainingFolders[0].name}.`);
    }
  };

  const handleRemoveItem = (articleId: string, title: string) => {
    const updated = removeArticleFromLibrary(articleId);
    setItems(updated);
    triggerToast(`Removed "${title.slice(0, 30)}..." from library.`);
  };

  const handleChangeItemFolder = (article: Article, newFolderId: string) => {
    const updated = saveArticleToFolder(article, newFolderId);
    setItems(updated);
    const targetFolder = folders.find(f => f.id === newFolderId);
    triggerToast(`Moved to "${targetFolder?.name || 'Folder'}".`);
  };

  const handleSaveNote = (article: Article, folderId: string) => {
    const updated = saveArticleToFolder(article, folderId, editingNoteText);
    setItems(updated);
    setEditingNoteArticleId(null);
    triggerToast('Research note saved!');
  };

  const handleExportBibTeXAll = () => {
    const filteredItems = items.filter(item => {
      const matchesFolder = activeFolderId === 'all' || item.folderId === activeFolderId;
      return matchesFolder;
    });

    if (filteredItems.length === 0) {
      alert('No articles in this folder to export.');
      return;
    }

    const bibContent = filteredItems.map(item => {
      const art = item.article;
      return `@article{${art.id}_${art.year},
  author = {${art.authors.map(a => a.name).join(' and ')}},
  title = {${art.title}},
  journal = {${art.journalName}},
  volume = {${art.volume}},
  number = {${art.issue}},
  year = {${art.year}},
  doi = {${art.doi}},
  publisher = {Digital Evolution Press},
  license = {CC BY 4.0}
}`;
    }).join('\n\n');

    const blob = new Blob([bibContent], { type: 'text/x-bibtex' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dej_library_export_${activeFolderId}.bib`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerToast('Exported BibTeX bibliography file!');
  };

  const filteredItems = items.filter((item) => {
    const matchesFolder = activeFolderId === 'all' || item.folderId === activeFolderId;
    const matchesSearch = searchQuery === '' ||
      item.article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.article.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.article.doi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFolder && matchesSearch;
  });

  const activeFolderObj = folders.find(f => f.id === activeFolderId);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[70] bg-amber-500 text-slate-950 px-5 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-mono font-bold border border-amber-400 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold font-serif-editorial text-white">
                  My Research Library & Personal Collections
                </h2>
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase">
                  {items.length} Saved Items
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Organize academic papers, annotate research notes, and export custom bibliographies.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split Layout (Folder Sidebar + Main Collection View) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Sidebar: Folder Directory */}
          <div className="w-full md:w-64 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-4 space-y-4 shrink-0 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                  Categorized Folders
                </span>
                <button
                  onClick={() => setShowNewFolderModal(true)}
                  className="p-1 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 rounded transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-mono font-bold"
                  title="Create New Folder"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>New</span>
                </button>
              </div>

              {/* All Articles Pill */}
              <button
                onClick={() => setActiveFolderId('all')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                  activeFolderId === 'all'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 shrink-0" />
                  <span>All Saved Papers</span>
                </div>
                <span className="font-mono text-[11px] bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded-full font-bold">
                  {items.length}
                </span>
              </button>

              {/* Custom Folders List */}
              <div className="space-y-1.5 overflow-y-auto max-h-60 md:max-h-96 pr-1 no-scrollbar">
                {folders.map((fld) => {
                  const count = items.filter(i => i.folderId === fld.id).length;
                  const isActive = activeFolderId === fld.id;
                  return (
                    <div key={fld.id} className="group relative flex items-center justify-between">
                      <button
                        onClick={() => setActiveFolderId(fld.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                          isActive
                            ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 font-bold'
                            : 'bg-white/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <span 
                            className="w-2.5 h-2.5 rounded-full shrink-0" 
                            style={{ backgroundColor: fld.colorHex || '#f59e0b' }} 
                          />
                          <span className="truncate">{fld.name}</span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-400 font-bold shrink-0">
                          {count}
                        </span>
                      </button>

                      {folders.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteFolder(fld.id, fld.name);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-opacity absolute right-1"
                          title="Delete folder"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bibliography Export Shortcut */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={handleExportBibTeXAll}
                className="w-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono font-bold py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Export BibTeX (.bib)</span>
              </button>
            </div>
          </div>

          {/* Right Main Panel: Articles List & Folder Detail */}
          <div className="flex-1 p-5 overflow-y-auto space-y-5 bg-white dark:bg-slate-900">
            
            {/* Folder Header & Search Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold font-serif-editorial text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{activeFolderId === 'all' ? 'All Saved Articles' : activeFolderObj?.name}</span>
                </h3>
                {activeFolderObj?.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    {activeFolderObj.description}
                  </p>
                )}
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search saved items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 font-sans"
                />
              </div>
            </div>

            {/* Saved Items List */}
            {filteredItems.length === 0 ? (
              <div className="py-16 text-center space-y-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md mx-auto">
                <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  No articles found in this folder
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono px-6">
                  Save articles from the main catalog by clicking the Bookmark icon on any manuscript card.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems.map((item) => {
                  const art = item.article;
                  const itemFolder = folders.find(f => f.id === item.folderId);
                  const isEditingNote = editingNoteArticleId === art.id;

                  return (
                    <div
                      key={art.id}
                      className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 space-y-3 hover:border-amber-500/50 transition-all shadow-sm"
                    >
                      {/* Top Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span 
                            className="px-2 py-0.5 rounded font-bold text-[10px] text-slate-950" 
                            style={{ backgroundColor: itemFolder?.colorHex || '#f59e0b' }}
                          >
                            {itemFolder?.name || 'Folder'}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400">
                            DOI: {art.doi}
                          </span>
                        </div>
                        <span className="text-slate-400 text-[11px]">Saved: {item.savedAt}</span>
                      </div>

                      {/* Title & Actions */}
                      <div className="flex items-start justify-between gap-3">
                        <h4 
                          onClick={() => {
                            onClose();
                            onSelectArticle(art);
                          }}
                          className="text-base sm:text-lg font-bold font-serif-editorial text-slate-900 dark:text-white hover:text-amber-500 transition-colors cursor-pointer leading-snug"
                        >
                          {art.title}
                        </h4>

                        <button
                          onClick={() => handleRemoveItem(art.id, art.title)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer shrink-0"
                          title="Remove from library"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Authors */}
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-sans">
                        {art.authors.map(a => a.name).join(', ')} — <span className="font-mono text-slate-400">{art.journalName} ({art.year})</span>
                      </p>

                      {/* Personal Research Notes Box */}
                      <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs font-mono">
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Personal Research Note:</span>
                          </span>

                          {!isEditingNote && (
                            <button
                              onClick={() => {
                                setEditingNoteArticleId(art.id);
                                setEditingNoteText(item.notes || '');
                              }}
                              className="text-amber-600 dark:text-amber-400 hover:underline text-[10px]"
                            >
                              Edit Note
                            </button>
                          )}
                        </div>

                        {isEditingNote ? (
                          <div className="space-y-2">
                            <textarea
                              rows={2}
                              value={editingNoteText}
                              onChange={(e) => setEditingNoteText(e.target.value)}
                              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 p-2 rounded-lg text-xs text-slate-900 dark:text-slate-100"
                              placeholder="Write research thoughts, citation notes, or synthesis takeaways..."
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setEditingNoteArticleId(null)}
                                className="px-2.5 py-1 bg-slate-200 dark:bg-slate-700 rounded text-[11px]"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSaveNote(art, item.folderId)}
                                className="px-2.5 py-1 bg-amber-500 text-slate-950 font-bold rounded text-[11px]"
                              >
                                Save Note
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-slate-700 dark:text-slate-300 italic font-sans text-xs">
                            "{item.notes || 'No note attached yet.'}"
                          </p>
                        )}
                      </div>

                      {/* Bottom Controls: Folder Move & Open Article */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 text-[11px]">Folder:</span>
                          <select
                            value={item.folderId}
                            onChange={(e) => handleChangeItemFolder(art, e.target.value)}
                            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-1 text-[11px] text-slate-900 dark:text-slate-100 font-bold"
                          >
                            {folders.map(f => (
                              <option key={f.id} value={f.id}>
                                Move to: {f.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <button
                          onClick={() => {
                            onClose();
                            onSelectArticle(art);
                          }}
                          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Read Full Article</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 dark:bg-slate-950 p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs shrink-0 font-mono text-slate-500">
          <span>Digital Evolution Open Science Library • Local Storage Persisted</span>
          <button
            onClick={onClose}
            className="bg-slate-900 dark:bg-slate-800 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer"
          >
            Close Library
          </button>
        </div>

      </div>

      {/* New Folder Modal Sub-Overlay */}
      {showNewFolderModal && (
        <div className="fixed inset-0 z-[80] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateFolder} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h4 className="font-bold text-base font-serif-editorial text-slate-900 dark:text-white flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-amber-500" />
                <span>Create Research Folder</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowNewFolderModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1">
                Folder Name:
              </label>
              <input
                type="text"
                required
                placeholder="e.g. AI & Transformer Benchmarks"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 p-2.5 rounded-xl text-xs text-slate-900 dark:text-slate-100 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1">
                Description (Optional):
              </label>
              <input
                type="text"
                placeholder="e.g. Papers related to attention mechanisms and synthetic dataset generation"
                value={newFolderDesc}
                onChange={(e) => setNewFolderDesc(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 p-2 rounded-xl text-xs text-slate-900 dark:text-slate-100 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1">
                Accent Color Tag:
              </label>
              <div className="flex items-center gap-2">
                {['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#64748b'].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setNewFolderColor(color)}
                    className={`w-6 h-6 rounded-full transition-transform ${newFolderColor === color ? 'scale-125 ring-2 ring-amber-500' : 'opacity-80'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowNewFolderModal(false)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs cursor-pointer shadow"
              >
                Create Folder
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
