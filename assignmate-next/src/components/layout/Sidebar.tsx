"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LoadingScreen from "../shared/LoadingScreen";
import { useState } from "react";

type NavItem = {
  label: string;
  path: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "My Assignments", path: "/dashboard/assignments" },
  { label: "Templates", path: "/dashboard/templates" },
  { label: "Workspace", path: "/dashboard/workspace" },
  { label: "Saved Drafts", path: "/dashboard/drafts" },

  { label: "Settings", path: "/dashboard/settings" },
];

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {isLoading && <LoadingScreen />}

      <aside className={`dashboard-sidebar ${isOpen ? "open" : "collapsed"}`}>
        <nav className="dashboard-sidebar-nav">
          {navItems.map((item) => {
            const isActive =
              item.path === "/dashboard"
                ? pathname === item.path
                : pathname.startsWith(item.path);

            return (
              <Link
                key={item.label}
                href={item.path}
                className={`dashboard-sidebar-link ${isActive ? "active" : ""}`}
                // onClick={() => {
                //   if (isActive) return;
                //   setIsLoading(true);
                // }}
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
    </>
  );
}
