"use client";

import { useState, useEffect } from "react";
import {
  getAssignments,
  saveAssignments,
  // updateAssignment,
} from "@/src/lib/assignmentStorage";
import getAssignmentId from "@/src/lib/getAssignmentId";
import "@/src/styles/workspace/workspaceMain.css";

import { updateAssignmentAPI } from "@/src/lib/api";

export default function WorkspaceEditor({ assignment, setSaveStatus }: any) {
  const [content, setContent] = useState(assignment.content);
  useEffect(() => {
    if (!assignment) return;

    const timeout = setTimeout(async () => {
      setSaveStatus("saving");
      const updated = { ...assignment, content };
      const id = getAssignmentId(assignment);

      const res = await updateAssignmentAPI(id, updated);

      if (!res) saveAssignments(updated);
    }, 900);

    return () => clearTimeout(timeout);
  }, [content]);

  return (
    <>
      <div className="editor-toolbar">
        <button className="toolbar-btn font-bold" title="Bold">
          B
        </button>
        <button className="toolbar-btn font-italic" title="Italic">
          I
        </button>
        <button className="toolbar-btn font-underline" title="Underline">
          U
        </button>
        <div className="toolbar-separator"></div>
        <button className="toolbar-btn" title="Heading 1">
          H1
        </button>
        <button className="toolbar-btn" title="Heading 2">
          H2
        </button>
        <div className="toolbar-separator"></div>
        <button className="toolbar-btn" title="Bullet List">
          • List
        </button>
        <button className="toolbar-btn" title="Numbered List">
          1. List
        </button>
        <div className="toolbar-separator"></div>
        <button className="toolbar-btn btn-save" title="Save Document">
          Save Progress
        </button>
      </div>

      <div className="editor-body-wrapper">
        <textarea
          name="editor"
          className="main-editor-textarea"
          placeholder="Start drafting your masterpiece assignment here... Custom markups, data sheets, and outlines fit beautifully inside this canvas workspace."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
    </>
  );
}
