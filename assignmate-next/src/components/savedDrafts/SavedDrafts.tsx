'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Trash2,
  Calendar,
  BookOpen,
  Search,
  Filter,
  Plus,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { useDebounce } from '@/src/hooks/useDebounce';
import { useAuth } from '@/src/context/AuthContext';
import { useNotification } from '@/src/context/NotificationContext';
import { stripHtml } from '@/src/utils/formatters';
import { draftService } from '@/src/services/drafts/draft.service';
import { OfflineDraft } from '@/src/types/draft.types';
import getAssignmentId from '@/src/lib/getAssignmentId';
import LoadingScreen from '../shared/LoadingScreen';
import SimpleEmptyState from '../shared/SimpleEmptyState';
import { EmptyState } from '../shared/EmptyState';

export default function SavedDraftsPage() {
  const [drafts, setDrafts] = useState<OfflineDraft[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { user, loading: authLoading } = useAuth();
  const userId = user?._id;
  const { toast, confirm, closeConfirm } = useNotification();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    if (!authLoading && userId) {
      setDrafts(draftService.getAll(userId));
    }
  }, [userId, authLoading]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleDeleteDraft = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); // Stop card click navigation

    if (!userId) return;
    confirm({
      title: 'Delete Offline Draft?',
      message: "Delete this offline copy? Your cloud save won't be affected.",
      confirmText: 'Delete Draft',
      cancelText: 'keep It',
      type: 'danger',
      onConfirm: async () => {
        try {
          draftService.remove(userId, id);

          const updatedDrafts = draftService.getAll(userId);
          setDrafts(updatedDrafts);
          const newTotalPages = Math.ceil(
            updatedDrafts.length / ITEMS_PER_PAGE
          );
          if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages);
          }
          toast.success('Draft remove successfully');
        } catch {
          toast.error('Failed to delete draft');
        } finally {
          closeConfirm();
        }
      },
      onCancel: () => {
        closeConfirm();
      },
    });
  };

  // Filter based on search input
  const filteredDrafts = drafts.filter(
    draft =>
      draft.metadata?.title
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase()) ||
      (draft.metadata?.courseCode &&
        draft.metadata?.courseCode
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredDrafts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDrafts = filteredDrafts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (authLoading) {
    return <LoadingScreen message="Loading user offline assignments..." />;
  }

  if (!user) {
    return (
      <EmptyState
        isOffline={false}
        context="Draft"
        contextMessage="Please log in to manage your offline drafts"
        contextPath="/dashboard/drafts"
        path=""
      />
    );
  }

  return (
    <div className="p-8 max-w-7xl space-y-6 text-slate-200">
      {/* 🌟 1. HERO SECTION (Matches your authentic workspace header structure) */}
      <div className="space-y-2">
        <span className="text-xs font-semibold tracking-wider text-emerald-500 uppercase">
          Workspace
        </span>
        <h1 className="text-3xl font-black tracking-tight text-white">
          Saved Drafts
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Organize your local copies, manage offline browser sandboxes, and keep
          tracking progress safely.
        </p>
      </div>

      {/* 🌟 2. SEARCH & FILTER UTILITY CONTROLS */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full bg-slate-900/40 p-3 rounded-2xl border border-slate-800/80">
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search offline drafts..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/60 border border-slate-800/60 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <button className="flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700/40 transition-all w-full sm:w-auto">
            <Filter className="h-3.5 w-3.5" />
            <span>Local Only</span>
          </button>
        </div>
      </div>

      {/* 🌟 3. THE CENTER CALLOUT BLOCK (Matches Assignments Page) */}
      <div className="w-full mb-5 p-6 bg-linear-to-r from-slate-900 via-slate-900/90 to-emerald-950/20 border border-slate-800 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white">
            Looking for your active cloud sheets?
          </h3>
          <p className="text-xs text-slate-400">
            Flipping your Workspace Offline toggle saves persistent local
            backups here in case your connection drops.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
          <Link
            href="/dashboard/workspace"
            className="flex items-center justify-center gap-2 text-xs font-bold px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all shadow-md shadow-emerald-950/20 w-full md:w-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Open Workspace</span>
          </Link>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mb-6 pb-4 border-b  border-slate-800/60 ">
          <p className="text-xs text-slate-500">
            Showing{' '}
            <span className="text-slate-300 font-semibold">
              {startIndex + 1}
            </span>
            {'  '}
            to{'  '}
            <span className="text-slate-300 font-semibold ">
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredDrafts.length)}
            </span>
            {'  '}
            of{'  '}
            <span className="text-slate-300 font-semibold">
              {filteredDrafts.length}
            </span>
            {'  '}
            drafts
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-xs font-bold bg-slate-900 border-slate-800 rounded-xl text-slate-300 hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-slate-900 translate-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-3 w-3" />
              Previous
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
              }
              className="px-4 py-2 text-xs font-bold bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-slate-900 transition-all cursor-pointer flex items-center gap-2"
            >
              Next <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      {/* 🌟 4. CARD GRID WITH PROPER SPACING & DEPTH */}
      {filteredDrafts.length === 0 ? (
        <SimpleEmptyState message="No matching local drafts found" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {paginatedDrafts.map(draft => (
            <Link
              key={getAssignmentId(draft)}
              href={`/dashboard/drafts/${getAssignmentId(draft)}`}
              className="group relative flex flex-col justify-between p-6 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-emerald-500/40 rounded-2xl shadow-xl transition-all duration-300"
            >
              <div>
                {/* Meta Header Badge Row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 text-[10px] font-extrabold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg">
                    ⚡ Offline Copy
                  </span>
                  <button
                    onClick={e => handleDeleteDraft(getAssignmentId(draft), e)}
                    className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800/80 transition-all opacity-0 group-hover:opacity-100"
                    title="Delete assignment"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-base capitalize font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {draft.metadata?.title || 'Untitled Assignment'}
                </h3>

                {/* Snip Content Body */}
                <p className="text-xs text-slate-400/80 mt-2 line-clamp-2 leading-relaxed min-h-8">
                  {stripHtml(draft.content) ||
                    'Start drafting your masterpiece...'}
                </p>
              </div>

              {/* Footer Meta Items */}
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-col gap-2 text-[11px] text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-emerald-500/70" />
                  <span className="truncate text-slate-300">
                    {draft.metadata?.course || 'No course Specified'}
                    {draft.metadata?.courseCode
                      ? ` - ${draft.metadata?.courseCode}`
                      : ''}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-500 mt-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Locally Syncing</span>
                  </div>
                  <div className="flex flex-col gap-2 items-start ">
                    <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800 text-slate-400 justify-self-end ">
                      {new Date(draft.lastSavedLocally).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800 text-slate-400">
                      {new Date(draft.lastSavedLocally).toLocaleDateString([], {
                        dateStyle: 'full',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
