'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CreateAssignmentModal from './WorkspaceCreateAssignment';
import '@/src/styles/workspace/workspace.css';
import LoadingScreen from '../shared/LoadingScreen';

export default function WorkspaceHome() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  function navigateRouter(path: string) {
    setIsLoading(true);
    router.push(path);
  }

  return (
    <>
      {isLoading && <LoadingScreen message="Loading your screen..." />}
      <div className="workspace-home">
        <div className="workspace-hero-container">
          <header
            className="workspace-hero-header  
          dashboard-section dashboard-welcome"
          >
            <div>
              <span className="dashboard-eyebrow">Assignmate</span>
              <h1 className="workspace-hero-title">Workspace</h1>
              <span className="dashboard-muted">
                Start something new or continue or continue your work
              </span>
            </div>
          </header>

          {/* Interactive Circular Actions Grid  */}

          <div className="workspace-actions-grid">
            {/* <!-- Action Item 1 --> */}

            <div className="workspace-action-card">
              <button
                className="workspace-circle-btn btn-blue"
                aria-label="Create Project"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                {/* Create new */}
                <span className="workspace-btn-icon">🚀</span>
              </button>

              <h3 className="workspace-action-title">Create new</h3>
              <p className="workspace-action-desc">
                Initialize a fresh environment and setup your core files.
              </p>
            </div>

            {/* <!-- Action Item 2 --> */}
            <div className="workspace-action-card">
              <button
                className="workspace-circle-btn btn-gold"
                aria-label="Browse drafts"
                onClick={() => {
                  navigateRouter('/dashboard/assignments');
                }}
              >
                <span className="workspace-btn-icon">✨</span>
              </button>
              <h3 className="workspace-action-title">Browse Drafts</h3>
              <p className="workspace-action-desc">
                Add collaborators and sync access control settings.
              </p>
            </div>

            {/* <!-- Action Item 3 --> */}
            <div className="workspace-action-card">
              <button
                className="workspace-circle-btn btn-purple"
                aria-label="View Templates"
                onClick={() => {
                  navigateRouter('/dashboard/templates');
                }}
              >
                {/* Templates
                 */}
                <span className="workspace-btn-icon">📊</span>
              </button>
              <h3 className="workspace-action-title">View Templates</h3>
              <p className="workspace-action-desc">
                Kickoff your work with premium templates
              </p>
            </div>
          </div>
        </div>
        {showModal && (
          <CreateAssignmentModal onClose={() => setShowModal(false)} />
        )}
      </div>
    </>
  );
}
