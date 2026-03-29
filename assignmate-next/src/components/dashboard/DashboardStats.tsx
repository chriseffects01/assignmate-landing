type StatCard = {
  label: string;
  value: number;
};

const stats: StatCard[] = [
  { label: "Drafts", value: 12 },
  { label: "Reports", value: 5 },
  { label: "Assignments", value: 18 },
  { label: "Completed", value: 9 },
];

export default function DashboardStats() {
  return (
    <section className="dasboard-stats-grid">
      {stats.map((stat) => (
        <div key={stat.label} className="dashboard-stat-grid">
          <p className="dashboard-stat-label">{stat.label}</p>
          <h2 className="dashboard-stat-value">
            {stat.value.toString().padStart(2, "0")}
          </h2>
        </div>
      ))}
    </section>
  );
}
