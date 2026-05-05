import { getLastDraft } from "@/src/lib/getLastDraft";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRecentAssignment } from "@/src/lib/getRecentAssignment";

export default function DashboardRecentAssignments() {
  const [lastDraft, setLastDraft] = useState<any>(null);
  const [recent, setRecent] = useState<any[]>([]);
  const router = useRouter();
  const emptyArr: any[] = [];

  useEffect(() => {
    // const drafts = getLastDraft();
    // setLastDraft(drafts);
    setRecent(getRecentAssignment(3));
  }, []);

  if (recent === emptyArr) {
    return <p>Your recent assignments will go hear</p>;
  }

  console.log(recent);
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
          {recent.map((item: any) => (
            <div key={item.id} className="continue-card">
              <h4>{item.title || "untitled"}</h4>
              <h5> by {item.lecturer}</h5>
              <p>{item.courseCode}</p>

              <button onClick={() => router.push(`/workspace/${item.id}`)}>
                Continue
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
