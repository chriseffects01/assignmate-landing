"use client";
import Settings from "@/src/components/settings/Settings";
import ProtectedRoute from "@/src/guards/ProtectedRoutes";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  );
}
