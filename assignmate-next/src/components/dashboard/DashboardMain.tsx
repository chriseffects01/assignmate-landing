"use client";

// import "../../styles/dashboard.css";

import DashboardWelcome from "@/src/components/dashboard/DashboardWelcome";
import DashboardTemplatesPromo from "@/src/components/dashboard/DashboardTemplatesPromo";
import DashboardStats from "@/src/components/dashboard/DashboardStats";
import DashboardQuickActions from "@/src/components/dashboard/DashboardQuickActions";
import DashboardProgressChart from "@/src/components/dashboard/DashboardProgressChart";
import DashboardRecentAssignments from "@/src/components/dashboard/DashboardRecentAssignments";
// import LoadingScreen from "@/src/components/shared/LoadingScreen";

export default function DashboardMain() {
  return (
    <main className="dashboard-main">
      <DashboardWelcome />
      <DashboardStats />
      <DashboardQuickActions />
      <DashboardProgressChart />
      <DashboardRecentAssignments />
      <DashboardTemplatesPromo />
    </main>
  );
}
