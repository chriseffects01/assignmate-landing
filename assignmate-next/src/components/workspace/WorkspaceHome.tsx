'use client';

import { useState } from 'react';
import CreateAssignmentModal from './WorkspaceCreateAssignment';
import '@/src/styles/workspace/workspace.css';
import Link from 'next/link';

export default function WorkspaceHome() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
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
                title="Create Project"
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
              <Link
                className="workspace-circle-btn btn-gold"
                title="Browse drafts"
                href="/dashboard/drafts"
              >
                <span className="workspace-btn-icon">✨</span>
              </Link>
              <h3 className="workspace-action-title">Browse Drafts</h3>
              <p className="workspace-action-desc">
                Add collaborators and sync access control settings.
              </p>
            </div>

            {/* <!-- Action Item 3 --> */}
            <div className="workspace-action-card">
              <Link
                className="workspace-circle-btn btn-purple"
                title="View Templates"
                href="/dashboard/templates"
              >
                {/* Templates   */}
                <span className="workspace-btn-icon">📊</span>
              </Link>
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
