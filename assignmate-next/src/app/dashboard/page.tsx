"use client";

import DashboardLayout from "@/src/components/layout/DashboardLayout";
import DashboardMain from "@/src/components/dashboard/DashboardMain";
import ProtectedRoute from "@/src/guards/ProtectedRoutes";
export default function Page() {
  return (
    <ProtectedRoute>
      <DashboardMain />
    </ProtectedRoute>
  );
}
