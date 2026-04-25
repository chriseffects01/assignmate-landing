"use client";

import { useState, useEffect } from "react";
import { getAssignments, saveAssignments } from "@/src/lib/assignmentStorage";

export default function WorkspaceEditor({ assignment, setSaveStatus }: any) {
  const [content, setContent] = useState(assignment.content);
  useEffect(() => {
    if (!assignment) return;
    setSaveStatus("saving");

    const timeout = setTimeout(() => {
      const updated = { ...assignment, content };

      const all = getAssignments();
      const updatedList = all.map((a) =>
        a.id === assignment.id ? updated : a,
      );

      saveAssignments(updatedList);
      setSaveStatus("saved");
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
