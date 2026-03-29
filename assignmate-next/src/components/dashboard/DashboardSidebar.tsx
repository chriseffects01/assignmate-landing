// // import DashboardNavbar from "./DashboardNavbar";

// const navItems: string[] = [
//   "Dashboard",
//   "My Assignments",
//   "Templates",
//   "Workspace",
//   "Saved Drafts",
//   "Settings",
// ];

// export default function DashboardSidebar() {
//   return (
//     <aside className="dashboard-sidebar">
//       <nav className="dashboard-sidebar-nav">
//         {navItems.map((item) => (
//           <button key={item} className="dashboard-sidebar-link">
//             {item}
//           </button>
//         ))}
//       </nav>

//       <div className="dashboard-upgrade-card">
//         <h3>Upgrade to pro</h3>
//         <p>Unlock premium templates and smarter writing tools.</p>
//         <button className="dashboard-upgrade-button"> Upgrade</button>
//       </div>
//     </aside>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  path: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "My Assignments", path: "/assignments" },
  { label: "Templates", path: "/templates" },
  { label: "Workspace", path: "/workspace" },
  { label: "Saved Drafts", path: "/drats" },
  { label: "Settings", path: "/setting" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="dashboard-sidebar">
      <nav className="dashboard-sidebar-nav">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.label}
              href={item.path}
              className={`dashboard-sidebar-link ${isActive ? "active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="dashboard-upgrade-card">
        <h3>Upgrade to pro</h3>
        <p>Unlock premium templates and smarter writing tools.</p>
        <button className="dashboard-upgrade-button"> Upgrade</button>
      </div>
    </aside>
  );
}
