"use client";
import AssignmentsMain from "@/src/components/assignments/AssignmentsMain";
import "@/src/styles/assignments/assignments-main.css";
import ProtectedRoute from "@/src/guards/ProtectedRoutes";

export default function Page() {
  return (
    <ProtectedRoute>
      <AssignmentsMain />
    </ProtectedRoute>
  );
}
