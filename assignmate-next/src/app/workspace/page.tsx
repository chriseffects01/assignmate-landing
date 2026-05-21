"use client";
import WorkspaceHome from "@/src/components/workspace/WorkspaceHome";
import ProtectedRoute from "@/src/guards/ProtectedRoutes";

export default function WorkspacePage() {
  return (
    <ProtectedRoute>
      <WorkspaceHome />
    </ProtectedRoute>
  );
}
