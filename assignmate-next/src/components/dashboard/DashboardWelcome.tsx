import { useAuth } from "@/src/context/AuthContext";

export default function DashboardWelcome() {
  // const user: string = "Chris";
  const { user } = useAuth();
  return (
    <section className="dashboard-section dashboard-welcome">
      <div>
        <p className="dashboard-eyebrow">
          Welcome back {user?.username || "Student"}
        </p>
        <h1>Your assignments, In one place.</h1>
        <p className="dashboard-muted">
          Continue your latest drafts or start a new assignment in seconds.
        </p>
      </div>

      <div className="dashboard-welcome-actions">
        <button className="dashboard-primary-btn">New Assignment</button>
        <button className="dashboard-secondary-btn">Continue Draft</button>
      </div>
    </section>
  );
}
