import Link from 'next/link';

interface QuickActionItem {
  label: string;
  path: string;
  icon: string;
}

const quickActions: QuickActionItem[] = [
  {
    label: 'New Assignment',
    path: '/dashboard/workspace',
    icon: '✨',
  },

  {
    label: 'Use Template',
    path: '/dashboard/templates',
    icon: '📜',
  },

  {
    label: 'Continue Drafts',
    path: '/dashboard/drafts',
    icon: '⌛',
  },

  {
    label: 'Start From Topic',
    path: '/dashboard/workspace/topic-wizard',
    icon: '🧠',
  },
];

export default function DashboardQuickActions() {
  return (
    <section className="dashboard-quick-actions">
      <div className="quick-actions-header">
        <h2>Quick Actions</h2>
      </div>

      <div className="dashboard-quick-actions-grid">
        {quickActions.map(action => (
          <Link
            key={action.path}
            className="dashboard-action-card"
            href={action.path}
          >
            <span className="action-card-icon">{action.icon}</span>
            <span className="action-card-label">{action.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
