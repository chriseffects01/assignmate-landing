// import "../../styles/dashboard.css";

import DashboardNavbar from "@/src/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/src/components/dashboard/DashboardSidebar";
import DashboardWelcome from "@/src/components/dashboard/DashboardWelcome";
import DashboardTemplatesPromo from "@/src/components/dashboard/DashboardTemplatesPromo";
import DashboardStats from "@/src/components/dashboard/DashboardStats";
import DashboardQuickActions from "@/src/components/dashboard/DashboardQuickActions";
import DashboardProgressChart from "@/src/components/dashboard/DashboardProgressChart";
import DashboardRecentAssignments from "@/src/components/dashboard/DashboardRecentAssignments";

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <DashboardNavbar />

      <div className="dashboard-layout">
        <DashboardSidebar />

        <main className="dashboard-main">
          <DashboardWelcome />
          <DashboardStats />
          <DashboardQuickActions />
          <DashboardProgressChart />
          <DashboardRecentAssignments />
          <DashboardTemplatesPromo />
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
