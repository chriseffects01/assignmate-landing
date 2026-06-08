import { useAuth } from "@/src/context/AuthContext";
import LoadingScreen from "../shared/LoadingScreen";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function DashboardWelcome() {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <>
      {isLoading && <LoadingScreen message="Loading your screen..." />}
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
          <button
            className="dashboard-primary-btn"
            onClick={() => {
              setIsLoading(true);
              router.push("/workspace");
            }}
          >
            New Assignment
          </button>
          <button
            className="dashboard-secondary-btn"
            onClick={() => {
              setIsLoading(true);
              router.push("/drafts");
            }}
          >
            Continue Draft
          </button>
        </div>
      </section>
    </>
  );
}
