// // import "../../styles/dashboard.css";

// import DashboardNavbar from "@/src/components/layout/Navbar";
// import DashboardSidebar from "@/src/components/layout/Sidebar";
// import DashboardWelcome from "@/src/components/dashboard/DashboardWelcome";
// import DashboardTemplatesPromo from "@/src/components/dashboard/DashboardTemplatesPromo";
// import DashboardStats from "@/src/components/dashboard/DashboardStats";
// import DashboardQuickActions from "@/src/components/dashboard/DashboardQuickActions";
// import DashboardProgressChart from "@/src/components/dashboard/DashboardProgressChart";
// import DashboardRecentAssignments from "@/src/components/dashboard/DashboardRecentAssignments";
// // import LoadingScreen from "@/src/components/shared/LoadingScreen";

// function DashboardPage() {
//   return (
//     <div className="dashboard-page " data-theme="dark">
//       <DashboardNavbar />

//       <div className="dashboard-layout">
//         <DashboardSidebar />

//         <main className="dashboard-main">
//           <DashboardWelcome />
//           <DashboardStats />
//           <DashboardQuickActions />
//           <DashboardProgressChart />
//           <DashboardRecentAssignments />
//           <DashboardTemplatesPromo />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default DashboardPage;

"use client";

import DashboardLayout from "@/src/components/layout/DashboardLayout";
import DashboardMain from "@/src/components/dashboard/DashboardMain";

export default function Page() {
  return (
    <DashboardLayout>
      <DashboardMain />
    </DashboardLayout>
  );
}
