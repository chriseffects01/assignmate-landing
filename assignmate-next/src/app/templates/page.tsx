"use client";
import TemplatesMain from "@/src/components/templates/TemplatesMain";
import ProtectedRoute from "@/src/guards/ProtectedRoutes";
export default function TemplatesPage() {
  return (
    <ProtectedRoute>
      <TemplatesMain />
    </ProtectedRoute>
  );
}
