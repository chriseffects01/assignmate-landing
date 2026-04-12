"use client";

import DashboardLayout from "@/src/components/layout/DashboardLayout";
import Drafts from "@/src/components/savedDrafts/SavedDrafts";

export default function DraftsPage() {
  return (
    <DashboardLayout>
      <Drafts />
    </DashboardLayout>
  );
}
