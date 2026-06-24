import React from "react";
import { cookies } from "next/headers";
import DashboardClientLayout from "../../components/layout/DashboardClientLayout";
import ProtectedRoute from "@/src/guards/ProtectedRoutes";

interface LayoutProps {
  children: React.ReactNode;
}

import "@/src/styles/layout/dashboard-shell.css";
import "@/src/styles/layout/navbar.css";
import "@/src/styles/layout/sidebar.css";

export default async function DashboardLayout({ children }: LayoutProps) {
  const cookieStore = await cookies();
  const sideBarCookie = cookieStore.get("sidebar-open");

  const initialSideBarState = sideBarCookie
    ? sideBarCookie.value === "true"
    : true;
  return (
    <DashboardClientLayout initialSideBarState={initialSideBarState}>
      <ProtectedRoute>{children}</ProtectedRoute>
    </DashboardClientLayout>
  );
}
