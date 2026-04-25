"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreateAssignmentFromForm } from "@/src/lib/createAssignmentFromForm";
import { addAssignment } from "@/src/lib/assignmentStorage";
import CreateAssignmentModal from "./WorkspaceCreateAssignment";
import "@/src/styles/workspace/workspace.css";

export default function WorkspaceHome() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="workspace-home">
      <div className="workspace-overlay">
        <h1>Workspace</h1>
        <p>Start something new or continue or continue your work</p>

        <div className="workspace-actions">
          <button onClick={() => setShowModal(true)}>Create new</button>

          <button onClick={() => router.push("/assignments")}>
            Browse Drafts
          </button>

          <button onClick={() => router.push("/templates")}>Templates</button>
        </div>
      </div>
      {showModal && (
        <CreateAssignmentModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
