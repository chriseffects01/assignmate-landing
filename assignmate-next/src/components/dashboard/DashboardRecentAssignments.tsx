import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRecentAssignment } from "@/src/lib/getRecentAssignment";

export default function DashboardRecentAssignments() {
  const [recent, setRecent] = useState<any[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  if (!recent) {
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
          {recent?.map((item: any) => (
            <div key={item._id} className="continue-card">
              <h4>{item.title || "untitled"}</h4>
              <h5> by {item.lecturer}</h5>
              <p>{item.courseCode}</p>

              <button onClick={() => router.push(`/workspace/${item._id}`)}>
                Continue
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
