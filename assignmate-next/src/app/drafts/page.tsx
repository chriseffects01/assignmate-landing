"use client";

import Drafts from "@/src/components/savedDrafts/SavedDrafts";
import ProtectedRoute from "@/src/guards/ProtectedRoutes";

export default function DraftsPage() {
  return (
    <ProtectedRoute>
      <Drafts />
    </ProtectedRoute>
  );
}
