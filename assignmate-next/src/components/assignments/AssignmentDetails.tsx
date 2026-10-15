'use client';
import '@/src/styles/assignments/assignment-details.css';
import { useState, useEffect } from 'react';
import { AssignmentType } from '@/src/types/assignment';
import LoadingScreen from '../shared/LoadingScreen';
import { useNotification } from '@/src/context/NotificationContext';
import { handleOfflineError } from '@/src/utils/handleOfflineError';
import { useAuth } from '@/src/context/AuthContext';
import { useParams } from 'next/navigation';
import { EmptyState } from '../shared/EmptyState';
import { getAssignmentById } from '@/src/services/assignmentService';
import { handleDeleteAssignment } from '@/src/lib/deleteAssignment';
import { stripHtml } from '@/src/utils/formatters';
import { OfflineError } from '@/src/errors/appError';
import { useRouter } from 'next/navigation';
import { ReconnectOverlay } from '../shared/ReconnectOverlay';
import Link from 'next/link';
import getAssignmentId from '@/src/lib/getAssignmentId';
import { draftService } from '@/src/services/drafts/draft.service';

const formatDateValue = (
  value: string | Date | null | undefined,
  mode: 'date' | 'time' = 'date'
) => {
  if (!value) return '—';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return mode === 'time'
    ? date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : date.toLocaleDateString([], {
        dateStyle: 'full',
      });
};

export default function AssignmentsDetails() {
  const [assignment, setAssignment] = useState<AssignmentType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const params = useParams();
  const assignmentId = params.id as string;
  const router = useRouter();

  const { toast, confirm, closeConfirm } = useNotification();
  const { isOffline, user } = useAuth();
  const userId = user?._id;
  const loadAssignmentById = async () => {
    const data: AssignmentType = await getAssignmentById(assignmentId);

    setAssignment(data);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const data: AssignmentType = await getAssignmentById(assignmentId);

        setAssignment(data);
      } catch (err: any) {
        handleOfflineError({
          err,
          OfflineErrorClass: OfflineError,
          confirm,
          toast,
          router,
          setIsRetrying,
          onRetry: loadAssignmentById,
          message:
            'This assignment could not be loaded. Continue using your offline drafts.',
          closeModal: closeConfirm,
        });
        console.error('Error Loading assignment details', err);
        toast.error('Failed to load Assignment');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [assignmentId]);

  const numberOfPages = assignment?.content.length;

  console.log(assignment);
  if (isRetrying) {
    return <ReconnectOverlay />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isOffline) {
    return (
      <EmptyState
        isOffline={isOffline}
        onRetry={loadAssignmentById}
        title="You're offline"
        message="Can't reach the assignment because you're offline. Move to offline drafts Page."
        path="/dashboard/drafts"
        pathText="Drafts"
      />
    );
  }

  if (!assignment) {
    return (
      <EmptyState
        isOffline={false}
        path=""
        context="Assignment"
        contextMessage="Go back to assignment page."
        contextPath="/dashboard/assignments"
      />
    );
  }

  return (
    /* Wrap with 'dark-theme' class if dark mode is active */
    <div className="details-page-container ">
      {/* Top Header Bar */}
      <header className="details-header">
        <Link href="/dashboard/assignments" className="back-link">
          ← Back to Assignments
        </Link>

        <div className="header-actions">
          <button
            onClick={() => {
              if (!userId) return;
              handleDeleteAssignment(
                getAssignmentId(assignment),
                confirm,
                closeConfirm,
                toast,
                router,
                userId
              );
            }}
            className="btn-delete"
          >
            Delete
          </button>
          <Link
            href={`/dashboard/workspace/${getAssignmentId(assignment)}`}
            className="btn-workspace"
          >
            Open in Workspace →
          </Link>
        </div>
      </header>

      {/* Main Grid Section */}
      <main className="details-layout-grid">
        {/* Left Side: Metadata Panel */}
        <section className="details-card metadata-panel">
          <div className="card-header-bar">
            <div>
              <h2 className="card-title">Assignment Overview</h2>
              <span className="card-subtitle">
                Created on{' '}
                {formatDateValue(String(assignment.createdAt), 'date')}
              </span>
            </div>
            <span
              className={`status-badge ${
                assignment.status === 'completed' ? 'Completed' : 'Draft'
              }`}
            >
              {assignment.status}
            </span>
          </div>

          <div className="metadata-stack">
            <div className="field-box">
              <span className="field-label">Name</span>
              <p className="field-value">{assignment.metadata?.title || '—'}</p>
            </div>

            <div className="grid-two-col">
              <div className="field-box">
                <span className="field-label">Course</span>
                <p className="field-value">
                  {assignment.metadata?.course || '—'}
                </p>
              </div>

              <div className="field-box">
                <span className="field-label">Course Code</span>
                <p className="field-value">
                  {assignment.metadata?.courseCode || '—'}
                </p>
              </div>
            </div>
            <div className="grid-two-col">
              <div className="field-box">
                <span className="field-label">Lecturer</span>
                <p className="field-value">
                  {assignment.metadata?.lecturer || '—'}
                </p>
              </div>
              <div className="field-box">
                <span className="field-label">Department</span>
                <p className="field-value">
                  {assignment.metadata?.department || '—'}
                </p>
              </div>
            </div>

            <div className="grid-two-col">
              <div className="field-box">
                <span className="field-label">Due Date</span>
                <p className="field-value">
                  {assignment.metadata?.dueDate || '—'}
                </p>
              </div>

              <div className="field-box">
                <span className="field-label">Reg No/Matric No</span>
                <p className="field-value">
                  {assignment.metadata?.registrationNumber || '—'}
                </p>
              </div>
            </div>

            <div className="field-box">
              <span className="field-label">Edited On</span>
              <p className="field-value">
                {formatDateValue(assignment.updatedAt, 'time')}
                {', '}
                {formatDateValue(assignment.updatedAt, 'date')}
              </p>
            </div>
          </div>
        </section>

        {/* Right Side: Preview Panel */}
        <section className="details-card preview-panel">
          <div className="card-header-bar">
            <h2 className="card-title">
              Content Preview ({numberOfPages}{' '}
              {assignment.content.length > 1 ? 'pages' : 'page'})
            </h2>
            <span className="card-subtitle">Read-only mode</span>
          </div>

          <div className="preview-body">{stripHtml(assignment.content)}</div>
        </section>
      </main>
    </div>
  );
}
