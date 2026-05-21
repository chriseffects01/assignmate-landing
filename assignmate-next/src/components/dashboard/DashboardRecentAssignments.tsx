import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRecentAssignment } from "@/src/lib/getRecentAssignment";
import getAssignmentId from "@/src/lib/getAssignmentId";

export default function DashboardRecentAssignments() {
  const [recent, setRecent] = useState<any[]>([]);
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
      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <h2>Recent Assignments</h2>
        </div>

        <div className="dashboard-list-placeholder">
          <div>
            <h3>Continue where you left off</h3>
          </div>
          {recent?.map((item: any) => (
            <div key={getAssignmentId(item)} className="continue-card">
              <h4>{item.title || "untitled"}</h4>
              <h5> by {item.lecturer}</h5>
              <p>{item.courseCode}</p>

              <button
                onClick={() =>
                  router.push(`/workspace/${getAssignmentId(item)}`)
                }
              >
                Continue
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
