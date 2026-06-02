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

    // <textarea
    //   name="editor"
    //   className="workspace-editor"
    //   value={content}
    //   onChange={(e) => setContent(e.target.value)}
    //   placeholder="start writing your assignment"
    // />
  );
}

{
  /* <div class="workspace-layout">
  
  <aside class="workspace-meta-panel">
    <div class="panel-header">
      <h2 class="panel-title">Assignment Settings</h2>
    </div>
    
    <div class="meta-form-group">
      <div class="meta-field-wrapper">
        <label class="meta-label">Course Code & Name</label>
        <div class="input-action-row">
          <input type="text" class="meta-inline-input" value="COS 323 - Advanced Computing" disabled />
          <button type="button" class="meta-edit-btn" title="Edit Field">✏️</button>
        </div>
      </div>

      <div class="meta-field-wrapper">
        <label class="meta-label">Lecturer In Charge</label>
        <div class="input-action-row">
          <input type="text" class="meta-inline-input" value="Dr. Smith" disabled />
          <button type="button" class="meta-edit-btn" title="Edit Field">✏️</button>
        </div>
      </div>

      <div class="meta-field-wrapper">
        <label class="meta-label">Assignment Title</label>
        <div class="input-action-row">
          <input type="text" class="meta-inline-input" value="Distributed Architecture Optimization" disabled />
          <button type="button" class="meta-edit-btn" title="Edit Field">✏️</button>
        </div>
      </div>
    </div>

    <div className="ai-assistant-card">
      <h3 className="ai-card-title">🤖 Get Started with AI</h3>
      <p className="ai-card-subtitle">Tell the AI your topic or outline constraints to generate a baseline layout.</p>
      
      <div className="ai-input-wrapper">
        <input type="text" className="ai-prompt-input" placeholder="e.g., Draft an outline for a distributed systems essay..." />
        <button className="ai-send-btn" aria-label="Send to AI">⚡</button>
      </div>

      <div className="ai-thinking-space">
        <div className="ai-thinking-status">
          <span className="pulse-dot"></span>
          <span className="status-text">AI is deep in thought...</span>
        </div>
        <p className="ai-response-placeholder">System waiting for prompt execution sequence.</p>
      </div>
    </div>
  </aside>

  <main className="workspace-editor-canvas">
    
    <div className="editor-toolbar">
      <button className="toolbar-btn font-bold" title="Bold">B</button>
      <button className="toolbar-btn font-italic" title="Italic">I</button>
      <button className="toolbar-btn font-underline" title="Underline">U</button>
      <div className="toolbar-separator"></div>
      <button className="toolbar-btn" title="Heading 1">H1</button>
      <button className="toolbar-btn" title="Heading 2">H2</button>
      <div className="toolbar-separator"></div>
      <button className="toolbar-btn" title="Bullet List">• List</button>
      <button className="toolbar-btn" title="Numbered List">1. List</button>
      <div className="toolbar-separator"></div>
      <button className="toolbar-btn btn-save" title="Save Document">Save Progress</button>
    </div>

    <div className="editor-body-wrapper">
      <textarea className="main-editor-textarea" placeholder="Start drafting your masterpiece assignment here... Custom markups, data sheets, and outlines fit beautifully inside this canvas workspace."></textarea>
    </div>

  </main>

</div> */
}
