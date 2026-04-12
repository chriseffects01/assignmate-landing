// "use client";

// import Sidebar from "@/src/components/layout/Sidebar";
// import Navbar from "@/src/components/layout/Navbar";
// import AssignmentsMain from "@/src/components/assignments/AssignmentsMain";

// import "@/src/styles/layout/sidebar.css";
// import "@/src/styles/layout/navbar.css";
// import "@/src/styles/assignments/assignments-main.css";
// import "@/src/styles/layout/dashboard-shell.css";

// export default function AssignmentsPage() {
//   return (
//     <div className="dashboard-shell" data-theme="dark">
//       <Navbar />
//       <div className="dashboard-body">
//         <Sidebar />
//         <div className="dashboard-content">
//           <AssignmentsMain />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import AssignmentsMain from "@/src/components/assignments/AssignmentsMain";
import "@/src/styles/assignments/assignments-main.css";

export default function Page() {
  return (
    <DashboardLayout>
      <AssignmentsMain />
    </DashboardLayout>
  );
}
