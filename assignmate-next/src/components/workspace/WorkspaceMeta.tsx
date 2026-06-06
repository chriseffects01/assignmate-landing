"use client";

import "@/src/styles/workspace/workspaceMain.css";
import { useAuth } from "@/src/context/AuthContext";
import React, { useState, useEffect } from "react";

import { WorkspaceField } from "./WorkspaceMain";
import WorkspaceAiAssistant from "./WorkspaceAi";

interface WorkspaceMetaProps {
  values: Record<WorkspaceField, string>;
  isEditable: Record<WorkspaceField, boolean>;
  onchange: (field: WorkspaceField, text: string) => void;
  onToggleEdit: (field: WorkspaceField) => Promise<void>;
  assignment: any;
}

export default function WorkspaceMeta({
  values,
  isEditable,
  onchange,
  onToggleEdit,
}: WorkspaceMetaProps) {
  const { user } = useAuth();

  const fullName: string = `${user?.lastName} ${user?.firstName}`;

  return (
    <div className="meta-form-group">
      <div className="meta-field-wrapper">
        <label className="meta-label">Name</label>
        <div className="input-action-row">
          <input
            type="text"
            className="meta-inline-input"
            value={fullName}
            disabled
            name="assignment-coursecode"
          />

          <button type="button" className="meta-edit-btn" title="Edit Field">
            ✏️
          </button>
        </div>
      </div>

      <div className="meta-field-wrapper">
        <label className="meta-label">Course Code </label>
        <div className="input-action-row">
          <input
            type="text"
            className="meta-inline-input"
            value={values.courseCode}
            disabled={!isEditable.courseCode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onchange("courseCode", e.target.value)
            }
            name="assignment-coursecode"
          />

          <button
            type="button"
            className={`meta-edit-btn ${isEditable.courseCode ? "active-save" : ""}`}
            title="Edit Field"
            onClick={() => {
              // console.log("Clicked");
              onToggleEdit("courseCode");
            }}
          >
            {isEditable.courseCode ? "✅" : "✏️"}
          </button>
        </div>
      </div>

      <div className="meta-field-wrapper">
        <label className="meta-label">Course </label>
        <div className="input-action-row">
          <input
            type="text"
            className="meta-inline-input"
            value={values.course}
            disabled={!isEditable.course}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onchange("course", e.target.value)
            }
            name="assignment-course"
          />

          <button
            type="button"
            className={`meta-edit-btn ${isEditable.course ? "active-save" : ""}`}
            title="Edit Field"
            onClick={() => {
              // console.log("Clicked");
              onToggleEdit("course");
            }}
          >
            {isEditable.course ? "✅" : "✏️"}
          </button>
        </div>
      </div>

      <div className="meta-field-wrapper">
        <label className="meta-label">Lecturer </label>
        <div className="input-action-row">
          <input
            type="text"
            className="meta-inline-input"
            value={values.lecturer}
            disabled={!isEditable.lecturer}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onchange("lecturer", e.target.value)
            }
            name="assignment-lecturer"
          />

          <button
            type="button"
            className={`meta-edit-btn ${isEditable.lecturer ? "active-save" : ""}`}
            title="Edit Field"
            onClick={() => {
              // console.log("Clicked");
              onToggleEdit("lecturer");
            }}
          >
            {isEditable.lecturer ? "✅" : "✏️"}
          </button>
        </div>
      </div>

      <div className="meta-field-wrapper">
        <label className="meta-label">Due Date </label>

        <div className="input-action-row">
          <input
            type="text"
            className="meta-inline-input"
            value={values.dueDate}
            disabled={!isEditable.dueDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onchange("dueDate", e.target.value)
            }
            name="assignment-dueDate"
          />

          <button
            type="button"
            className={`meta-edit-btn ${isEditable.dueDate ? "active-save" : ""}`}
            title="Edit Field"
            onClick={() => {
              // console.log("Clicked");
              onToggleEdit("dueDate");
            }}
          >
            {isEditable.dueDate ? "✅" : "✏️"}
          </button>
        </div>
      </div>

      <div className="meta-field-wrapper">
        <label className="meta-label">Level </label>
        <div className="input-action-row">
          <input
            type="text"
            className="meta-inline-input"
            value={values.level}
            disabled={!isEditable.level}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onchange("level", e.target.value)
            }
            name="assignment-level"
          />
          <button
            type="button"
            className={`meta-edit-btn ${isEditable.level ? "active-save" : ""}`}
            title="Edit Field"
            onClick={() => {
              // console.log("Clicked");
              onToggleEdit("level");
            }}
          >
            {isEditable.level ? "✅" : "✏️"}
          </button>
        </div>

        {/* <div className="ai-thinking-space">
          <div className="ai-thinking-status">
            <span className="pulse-dot"></span>
            <span className="status-text">AI is deep in thought...</span>
          </div>
          <p className="ai-response-placeholder">
            System waiting for prompt execution sequence.
          </p>

        </div> */}

        <WorkspaceAiAssistant />
      </div>
    </div>
  );
}
