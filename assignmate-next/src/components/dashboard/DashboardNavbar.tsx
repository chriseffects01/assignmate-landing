export default function DashboardNavbar() {
  return (
    <header className="dashboard-navbar">
      <div className="dashboard-navbar-left">
        <p className="dashboard-user-name">Chris</p>
      </div>

      <div className="dashboard-navbar-center">
        <input
          type="text"
          placeholder="Search assignments..."
          className="dashboard-search"
        />
      </div>

      <div className="dashboard-navbar-right">
        <button type="button" className="dashboard-new-button">
          + New
        </button>

        <div className="dashboard-avatar">CA</div>
      </div>
    </header>
  );
}
