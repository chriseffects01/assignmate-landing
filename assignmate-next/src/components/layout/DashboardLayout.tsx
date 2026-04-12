"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import "@/src/styles/layout/dashboard-shell.css";
import "@/src/styles/layout/navbar.css";
import "@/src/styles/layout/sidebar.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSideBarOpen] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-open");
    if (saved !== null) {
      setIsSideBarOpen(saved === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-open", String(isSidebarOpen));
  }, [isSidebarOpen]);

  return (
    <div className="dashboard-shell" data-theme="dark">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => {
          setIsSideBarOpen((open) => !open);
        }}
      />
      <div className="dashboard-body">
        <Sidebar isOpen={isSidebarOpen} />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
