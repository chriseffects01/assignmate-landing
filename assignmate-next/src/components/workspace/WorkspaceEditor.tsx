"use client";

import { useState, useEffect } from "react";
import {
  getAssignments,
  saveAssignments,
  updateAssignment,
} from "@/src/lib/assignmentStorage";

import { saveAssignment } from "@/src/services/assignmentService";
import { updateAssignmentAPI } from "@/src/lib/api";

export default function WorkspaceEditor({ assignment, setSaveStatus }: any) {
  const [content, setContent] = useState(assignment.content);
  useEffect(() => {
    if (!assignment) return;

    const timeout = setTimeout(async () => {
      setSaveStatus("saving");
      const updated = { ...assignment, content };
      const id = assignment._id || assignment.id;

      const res = await updateAssignmentAPI(id, updated);

      if (!res) updateAssignment(updated);
    }, 600);

    return () => clearTimeout(timeout);
  }, [content]);

  return (
    <textarea
      name="editor"
      className="workspace-editor"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      placeholder="start writing your assignment"
    />
  );
}
