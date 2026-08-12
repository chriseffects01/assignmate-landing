import { useEffect, useState } from 'react';
import { getRecentAssignment } from '@/src/lib/getRecentAssignment';
import getAssignmentId from '@/src/lib/getAssignmentId';
import { AssignmentSkeleton } from '../shared/SkeletonLoading';
import Link from 'next/link';
import SimpleEmptyState from '../shared/SimpleEmptyState';
export default function DashboardRecentAssignments() {
  const [recent, setRecent] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loadingSkeletonNumber: number = 3;

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);

        const recentArr = await getRecentAssignment(loadingSkeletonNumber);

        setRecent(recentArr);
      } catch (e: any) {
        throw e;
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return (
    <>
      <section className="dashboard-recent-section dashboard-section">
        <div className="section-header-block dashboard-section-header">
          <h2 className="section-main-title">Continue where you left off</h2>
        </div>
        {/* --- RESPONSIVE CARD GRID LAYOUT --- */}
        <div className="assignments-glass-grid dashboard-list-placeholder">
          {isLoading ? (
            Array.from({ length: loadingSkeletonNumber }).map((_, i) => (
              <AssignmentSkeleton key={i} />
            ))
          ) : recent.length === 0 ? (
            <SimpleEmptyState message="No recent assignments" />
          ) : (
            recent.map(item => (
              <div
                key={getAssignmentId(item)}
                className="assignment-dashboard-card"
              >
                {/* Top Tag Metadata Bar */}
                <div className="card-top-meta">
                  <div className="course-badge-group">
                    <span className="badge-course-name">{item.course}</span>
                    <span className="badge-course-code">{item.courseCode}</span>
                  </div>
                  <span className="card-lecturer-text">by {item.lecturer}</span>
                </div>

                {/* Title & Fading Paragraph Content Teaser */}
                <div className="card-body-content">
                  <h3 className="card-assignment-title">{item.title}</h3>
                  <p className="card-content-preview-fade">{item.content}</p>
                </div>

                {/* Bottom Form Action Row */}
                <div className="card-action-footer">
                  <Link
                    className="card-continue-action-btn"
                    href={`/dashboard/workspace/${getAssignmentId(item)}`}
                  >
                    <span>Continue</span>
                    <span className="btn-arrow-icon">→</span>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
