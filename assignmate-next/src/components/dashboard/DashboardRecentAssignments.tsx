import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRecentAssignment } from "@/src/lib/getRecentAssignment";
import getAssignmentId from "@/src/lib/getAssignmentId";
import LoadingScreen from "../shared/LoadingScreen";

export default function DashboardRecentAssignments() {
  const [recent, setRecent] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const recentArr = await getRecentAssignment(3);
      if (!recentArr)
        return (
          <div>
            <p>Your recent assignments will go hear</p>
          </div>
        );
      setRecent(recentArr || []);
    }
    load();
  }, []);

  if (!recent) {
    return <p>Your recent assignments will go hear</p>;
  }

  return (
    <>
      {isLoading && <LoadingScreen message="Loading your workspace..." />}

      <section className="dashboard-recent-section dashboard-section">
        <div className="section-header-block dashboard-section-header">
          <h2 className="section-main-title">Continue where you left off</h2>
        </div>
        {/* --- RESPONSIVE CARD GRID LAYOUT --- */}
        <div className="assignments-glass-grid dashboard-list-placeholder">
          {recent?.map((item) => (
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
                <button
                  type="button"
                  className="card-continue-action-btn"
                  onClick={() => {
                    console.log(
                      `Routing token link to workspace canvas: ${getAssignmentId(item)}`,
                    );
                    setIsLoading(true);
                    router.push(
                      `/dashboard/workspace/${getAssignmentId(item)}`,
                    );
                  }}
                >
                  <span>Continue</span>
                  <span className="btn-arrow-icon">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
