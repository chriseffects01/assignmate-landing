"use client";

import React, { useState, useEffect } from "react";
import { useOnlineStatus } from "@/src/hooks/useOnlineStatus";
import {
  saveAssignment,
  getAssignments,
} from "@/src/services/assignmentService";
import getAssignmentId from "@/src/lib/getAssignmentId";

import "@/src/styles/workspace/workspace.css";

interface WorkspaceHeaderProps {
  titleValue: string;
  isTitleEditable: boolean;
  onTitleChange: (text: string) => void;
  onToggleTitleEdit: () => Promise<void>;
  assignment: any;
  saveStatus: string;
}
export default function WorkspaceHeader({
  assignment,
  saveStatus,
  titleValue,
  isTitleEditable,
  onTitleChange,
  onToggleTitleEdit,
}: WorkspaceHeaderProps) {
  const isOnline = useOnlineStatus();

  const [title, setTitle] = useState(assignment.title);
  useEffect(() => {
    if (!assignment) return;
    //Saving will happen only after 900s of inactivity

    const timeout = setTimeout(async () => {
      try {
        const updated = {
          ...assignment,
          title,
        };
        const all = await getAssignments();
        const updatedList = all.map((a: any) =>
          getAssignmentId(a) === getAssignmentId(assignment) ? updated : a,
        );
        //The actual save
        await saveAssignment(getAssignmentId(assignment), updatedList);
      } catch (err) {
        console.error("MY error: Failed to autoSaveHeader:", err);
      }
    }, 900);

    return () => clearTimeout(timeout);
  }, [title, assignment]);

  return (
    <div className="workspace-header">
      <div className="meta-field-wrapper">
        <label className="meta-label">Assignment Title</label>
        <div className="input-action-row">
          {/* <input
            type="text"
            className="meta-inline-input"
            value={title}
            name="workspace-title"
            onChange={(e) => setTitle(e.target.value)}
            disabled
          /> */}
          <input
            type="text"
            className="meta-inline-input"
            value={titleValue}
            disabled={!isTitleEditable}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onTitleChange(e.target.value)
            }
            name="assignment-coursecode"
          />

          <button
            type="button"
            className={`meta-edit-btn ${isTitleEditable ? "active-save" : ""}`}
            title="Edit Field"
            onClick={onToggleTitleEdit}
          >
            {isTitleEditable ? "✅" : "✏️"}
          </button>
        </div>
      </div>

      {/* <input
        className="Workspace-title"
        value={title}
        name="workspace-title"
        onChange={(e) => setTitle(e.target.value)}
      /> */}

      <div className="workspace-status">
        {saveStatus === "saving" && <span>Saving...</span>}
        {saveStatus === "saved" && <span>Saved</span>}

        {!isOnline && <span className="offline">Offline </span>}
        {isOnline && <span className="online">Online</span>}
      </div>
    </div>
  );
}
