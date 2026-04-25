"use client";

import { useState, useEffect } from "react";
import { getAssignments, saveAssignments } from "@/src/lib/assignmentStorage";
import { useOnlineStatus } from "@/src/hooks/useOnlineStatus";
import "@/src/styles/workspace/workspace.css";
import { Span } from "next/dist/trace";

export default function WorkspaceHeader({ assignment, saveStatus }: any) {
  const isOnline = useOnlineStatus();

  const [title, setTitle] = useState(assignment.title);
  useEffect(() => {
    const updated = { ...assignment, title };
    const all = getAssignments();
    const updatedList = all.map((a) => (a.id === assignment.id ? updated : a));

    saveAssignments(updatedList);
  }, [title]);

  return (
    <div className="workspace-header">
      <input
        className="Workspace-title"
        value={assignment.title}
        name="workspace-title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="workspace-status">
        {saveStatus === "saving" && <span>Saving...</span>}
        {saveStatus === "saved" && <span>Saved</span>}

        {!isOnline && <span className="offline">Offline </span>}
        {isOnline && <span className="online">Online</span>}
      </div>
    </div>
  );
}
