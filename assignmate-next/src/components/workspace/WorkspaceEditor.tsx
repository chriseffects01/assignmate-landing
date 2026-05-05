"use client";

import { useState, useEffect } from "react";
import {
  getAssignments,
  saveAssignments,
  updateAssignment,
} from "@/src/lib/assignmentStorage";

export default function WorkspaceEditor({ assignment, setSaveStatus }: any) {
  const [content, setContent] = useState(assignment.content);
  useEffect(() => {
    if (!assignment) return;

    const timeout = setTimeout(() => {
      setSaveStatus("saving");
      updateAssignment({
        ...assignment,
        content,
      });
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
