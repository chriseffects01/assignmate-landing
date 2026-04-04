"use client";

import Sidebar from "@/src/components/layout/Sidebar";
import Navbar from "@/src/components/layout/Navbar";
import AssignmentsMain from "@/src/components/assignments/AssignmentsMain";

import "@/src/styles/layout/sidebar.css";
import "@/src/styles/layout/navbar.css";
import "@/src/styles/assignments/assignments-main.css";

export default function AssignmentsPage() {
  return (
    <div className="assignments-shell">
      <Navbar />

      <div className="assignments-content">
        <Sidebar />
        <AssignmentsMain />
      </div>
    </div>
  );
}
