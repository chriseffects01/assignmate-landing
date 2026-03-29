const actions: string[] = [
  "New Assignment",
  "Use Template",
  "Continue Draft",
  "Start from Topic",
];

export default function DashboardQuickActions() {
  return (
    <section className="dashboard-section-header">
      <div className="dashboard-section-header">
        <h2>Quick Actions</h2>
      </div>

      <div className="dashboard-quick-actions-grid">
        {actions.map((action) => (
          <button key={action} type="button" className="dashboard-action-card">
            {action}
          </button>
        ))}
      </div>
    </section>
  );
}
