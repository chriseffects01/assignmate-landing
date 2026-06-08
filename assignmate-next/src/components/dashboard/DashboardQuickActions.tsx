import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "../shared/LoadingScreen";
interface QuickActionItem {
  label: string;
  path: string;
  icon: string;
}

const quickActions: QuickActionItem[] = [
  {
    label: "New Assignment",
    path: "/workspace",
    icon: "✨",
  },
  {
    label: "Use Template",
    path: "/templates",
    icon: "📜",
  },

  {
    label: "Continue Drafts",
    path: "/drafts",
    icon: "⌛",
  },

  {
    label: "Start From Topic",
    path: "/workspace/topic-wizard",
    icon: "🧠",
  },
];

export default function DashboardQuickActions() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <>
      {isLoading && <LoadingScreen message="Loading your screen..." />}
      <section className="dashboard-quick-actions">
        <div className="quick-actions-header">
          <h2>Quick Actions</h2>
        </div>

        <div className="dashboard-quick-actions-grid">
          {quickActions.map((action) => (
            <button
              key={action.path}
              type="button"
              className="dashboard-action-card"
              onClick={() => {
                setIsLoading(true);
                router.push(action.path);
              }}
            >
              <span className="action-card-icon">{action.icon}</span>
              <span className="action-card-label">{action.label}</span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
