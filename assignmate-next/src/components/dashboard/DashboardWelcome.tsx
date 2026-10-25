import { useAuth } from '@/src/context/AuthContext';
import Link from 'next/link';

export default function DashboardWelcome() {
  const { user } = useAuth();

  return (
    <section className="dashboard-section dashboard-welcome">
      <div>
        <p className="dashboard-eyebrow">
          Welcome back {user?.displayName || user?.username || 'Student'}
        </p>
        <h1>Your assignments, In one place.</h1>
        <p className="dashboard-muted">
          Continue your latest drafts or start a new assignment in seconds.
        </p>
      </div>

      <div className="dashboard-welcome-actions">
        <Link className="dashboard-primary-btn" href={'/dashboard/workspace'}>
          New Assignment
        </Link>
        <Link className="dashboard-secondary-btn" href={'/dashboard/drafts'}>
          Continue Draft
        </Link>
      </div>
    </section>
  );
}
