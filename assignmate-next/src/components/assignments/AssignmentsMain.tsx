'use client';

import { fetchAssignmentsByQuery } from '@/src/services/assignmentService';
import { AssignmentType } from '@/src/types/assignment';
import { useEffect, useState } from 'react';
import getAssignmentId from '@/src/lib/getAssignmentId';
import { formatAssignmentTimeStamp } from '@/src/utils/dateUtils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SearchBar } from '../shared/SearchBar';
import { AssignmentSkeleton } from '../shared/SkeletonLoading';
import { ArrowLeft, ArrowRight, HardDrive } from 'lucide-react';
import { draftService } from '@/src/services/drafts/draft.service';
import { useAuth } from '@/src/context/AuthContext';
import { useNotification } from '@/src/context/NotificationContext';
import { handleOfflineError } from '@/src/utils/handleOfflineError';
import { OfflineError } from '@/src/errors/appError';
import { ReconnectOverlay } from '../shared/ReconnectOverlay';
import { FileText } from 'lucide-react';
import SimpleEmptyState from '../shared/SimpleEmptyState';

export default function AssignmentsMain() {
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'drafts' | 'completed'
  >('all');
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const [activeSearch, setActiveSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);

  const { user } = useAuth();
  const router = useRouter();
  const userId: any = user?._id;
  const loadingSkeletonNumber = 9;
  const { toast, confirm, closeConfirm } = useNotification();

  const loadAssignment = async () => {
    const backendStatus = activeFilter === 'drafts' ? 'draft' : activeFilter;
    const res = await fetchAssignmentsByQuery(
      activeSearch,
      currentPage,
      loadingSkeletonNumber,
      backendStatus
    );

    if (res) {
      setAssignments(res.assignments || []);
      setTotalPages(res.pagination?.totalPages || 1);
      setTotalItems(res.pagination?.totalItems || 0);
    }
  };

  useEffect(() => {
    async function load() {
      setIsloading(true);
      try {
        const backendStatus =
          activeFilter === 'drafts' ? 'draft' : activeFilter;

        const res = await fetchAssignmentsByQuery(
          activeSearch,
          currentPage,
          loadingSkeletonNumber,
          backendStatus
        );

        if (res) {
          setAssignments(res.assignments || []);
          setTotalPages(res.pagination?.totalPages || 1);
          setTotalItems(res.pagination?.totalItems || 0);
        }
      } catch (e: any) {
        handleOfflineError({
          err: e,
          OfflineErrorClass: OfflineError,
          confirm,
          toast,
          router,
          setIsRetrying,
          onRetry: loadAssignment,
          message:
            'Assignments could not be loaded. Continue with your offline drafts.',
          closeModal: closeConfirm,
        });

        console.error(e);
        toast.error("Couldn't load assignments");

        throw e;
      } finally {
        setIsloading(false);
      }
    }
    load();
  }, [activeSearch, currentPage, activeFilter]);

  if (isRetrying) {
    return <ReconnectOverlay />;
  }

  return (
    <>
      <main className="assignments-main">
        <section className="assignments-header">
          <div>
            <p className="assignments-eyebrow">Workspace</p>
            <h1 className="assignments-title">Assignments</h1>
            <p className="assignments-subtitle">
              Organize your drafts, Continue your work, and start new
              assignments
            </p>
          </div>

          <div className="assignments-header-actions">
            <Link
              className="assignments-secondary-btn"
              href="/dashboard/templates"
            >
              Use Templates
            </Link>

            <Link
              className="assignments-primary-btn"
              href="/dashboard/workspace"
            >
              + New Assignments
            </Link>
          </div>
        </section>

        <section className="assignments-toolbar">
          <SearchBar
            placeholder="assignments"
            onSearchSubmit={finalQuery => {
              setCurrentPage(1);
              setActiveSearch(finalQuery);
            }}
            filterOptions={[
              { label: 'All', value: 'all' },
              { label: 'Drafts', value: 'drafts' },
              { label: 'Completed', value: 'completed' },
            ]}
            onFilterChange={(value: any) => {
              setCurrentPage(1);
              setActiveFilter(value);
            }}
          />
        </section>

        <section className="assignment-empty-state">
          <div className="assignments-empty-card">
            <p className="assignments">
              Create a new assignment, continue a saved draft or begin with a
              template to speed things Up
            </p>
          </div>

          <div className="assignments-empty-actions">
            <Link
              className="assignments-primary-btn"
              href="/dashboard/workspace"
            >
              Create New
            </Link>
            <Link
              className="assignments-secondary-btn"
              href="/dashboard/templates"
            >
              Browse Templates
            </Link>
          </div>
        </section>
        {totalPages > 1 && (
          <div className="flex items-center mb-4 pb-4 justify-between pt-6 border-b border-slate-800/60 ">
            <p className="text-xs text-slate-500">
              Showing Page{'  '}
              <span className="text-slate-300 font-semibold">
                {currentPage}
              </span>
              {'  '}
              of{'  '}
              <span className="text-slate-300 font-semibold">{totalPages}</span>
              {'  '}({totalItems} items total)
            </p>

            <div className="flex items-center gap-2 ">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-xs font-bold bg-slate-900 border-slate-800 rounded-xl text-slate-300 hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-slate-900 translate-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-3 w-3" />
                Previous
              </button>

              <button
                onClick={() =>
                  setCurrentPage(prev => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-xs font-bold bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-slate-900 transition-all cursor-pointer flex items-center gap-2"
              >
                Next <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        <section className="assignments-grid">
          {isLoading ? (
            Array.from({ length: loadingSkeletonNumber }).map((_, i) => (
              <AssignmentSkeleton key={i} />
            ))
          ) : assignments.length === 0 ? (
            <SimpleEmptyState message="No Assignment found" />
          ) : (
            assignments.map(assignment => {
              const savedOfffline =
                userId &&
                draftService.exists(userId, getAssignmentId(assignment));
              return (
                <article
                  className="assignment-card"
                  key={getAssignmentId(assignment)}
                >
                  <div className="assignment-card-top">
                    <span
                      className={`assignment-status ${
                        assignment.status === 'completed'
                          ? 'is-completed'
                          : 'is-draft'
                      }`}
                    >
                      <span className="status-dot"></span>
                      {assignment.status === 'completed'
                        ? '📝 Completed'
                        : '⌛ Drafts'}
                    </span>
                    <div className="assignment-card-icon">
                      {savedOfffline && '📂'}
                    </div>
                  </div>
                  <h2 className="assignment-card-title">{assignment.title} </h2>
                  <p className="assignment-card-course">
                    📚 <span>{assignment.course} </span>
                    💠<span>{assignment.courseCode}</span>
                  </p>
                  <div className="assignment-card-preview">
                    {assignment.content ? (
                      assignment.content.substring(0, 75) +
                      (assignment.content.length > 75 ? '...' : '')
                    ) : (
                      <span className="empty-preview">
                        No content written ...
                      </span>
                    )}
                  </div>

                  <p className="assignment-card-time">
                    <span className="typing-text">
                      {formatAssignmentTimeStamp(assignment.updatedAt || '')}
                    </span>
                  </p>

                  <div className="assignment-card-actions">
                    <Link
                      className={`assignment-card-btn primary ${
                        assignment.status === 'completed' ? 'hidden' : ''
                      }`}
                      href={`/dashboard/workspace/${getAssignmentId(assignment)}`}
                    >
                      Continue
                    </Link>
                    <Link
                      className="assignment-card-btn secondary"
                      href={`/dashboard/workspace/${getAssignmentId(assignment)}`}
                    >
                      Details
                    </Link>
                  </div>
                </article>
              );
            })
          )}
        </section>
      </main>
    </>
  );
}
