"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import LoadingScreen from "../shared/LoadingScreen";
import { usePathname } from "next/navigation";

interface ClientProps {
  children: React.ReactNode;
  initialSideBarState: boolean;
}

export default function DashboardClientLayout({
  children,
  initialSideBarState,
}: ClientProps) {
  const [isSidebarOpen, setIsSideBarOpen] =
    useState<boolean>(initialSideBarState);
  const pathname = usePathname();
  const [isChangingPage, setIsChangingPage] = useState<boolean>(false);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSideBarOpen(newState);

    document.cookie = `sidebar-open=${newState}; path=/; max-age=31536000; SameSite=Lax`;
  };

  useEffect(() => {
    setIsChangingPage(true);
    const timer = setTimeout(() => {
      setIsChangingPage(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="dashboard-shell" data-theme="dark">
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {isChangingPage && <LoadingScreen />}
      <div className="dashboard-body">
        <Sidebar isOpen={isSidebarOpen} />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
