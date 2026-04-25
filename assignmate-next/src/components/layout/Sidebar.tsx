"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LoadingScreen from "../shared/LoadingScreen";
import { useState } from "react";
import { useRouter } from "next/navigation";

type NavItem = {
  label: string;
  path: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "My Assignments", path: "/assignments" },
  { label: "Templates", path: "/templates" },
  { label: "Workspace", path: "/workspace" },
  { label: "Saved Drafts", path: "/drafts" },
  // { label: "Create", path: "/create" },
  { label: "Settings", path: "/settings" },
];

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function handleSpinner(path: string, time: number = 1000) {
    setIsLoading(true);

    setTimeout(() => {
      router.push(path);
    }, time);
  }

  return (
    <>
      {isLoading && <LoadingScreen />}

      <aside className={`dashboard-sidebar ${isOpen ? "open" : "collapsed"}`}>
        <nav className="dashboard-sidebar-nav">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.label}
                href={item.path}
                className={`dashboard-sidebar-link ${isActive ? "active" : ""}`}
                onClick={() => {
                  if (isActive) return;
                  handleSpinner(item.path, 1400);
                }}
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
