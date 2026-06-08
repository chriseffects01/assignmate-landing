"use client";

import { useState, useEffect } from "react";

import getAssignmentId from "@/src/lib/getAssignmentId";
import "@/src/styles/workspace/workspaceMain.css";
import "@/src/styles/workspace/workspacetextArea.css";

import { updateAssignmentAPI } from "@/src/lib/api";
//
interface TextFormatting {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
}

type Dropdown = "heading" | "list" | "fontFamily" | "fontSize" | null;

export default function WorkspaceEditor({ assignment, setSaveStatus }: any) {
  const [content, setContent] = useState(assignment.content);
  const [format, setFormat] = useState<TextFormatting>({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
  });
  const [activeDropdown, setActiveDropdown] = useState<Dropdown>(null);

  const [selectedHeading, setSelectedHeading] = useState<string>("Normal Text");
  const [selectedFontFamily, setSelectedFontFamily] = useState<string>("Inter");
  const [selectedFontSize, setSelectedFontSize] = useState<string>("18px");

  useEffect(() => {
    if (!assignment) return;

    const timeout = setTimeout(async () => {
      setSaveStatus("saving");
      const updated = { ...assignment, content };
      const id = getAssignmentId(assignment);

      await updateAssignmentAPI(id, updated);
    }, 900);

    setSaveStatus("saved");
    return () => clearTimeout(timeout);
  }, [content]);

  const toggleDropdown = (menu: Dropdown) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  const toggleFormat = (key: keyof TextFormatting) => {
    setFormat((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleHeadingSelect = (headingName: string, tag: string) => {
    setSelectedHeading(headingName);
    setActiveDropdown(null);
    console.log(`Executing Rich  Text command: Format to <${tag}>`);
  };

  const handleListChange = (listType: "ordered" | "unordered") => {
    setActiveDropdown(null);
    console.log(`Executing Rich Text Command: Insert ${listType} list`);
  };

  // setSaveStatus("saved");
  return (
    <>
      <div className="editor-workspace-container">
        {/* TOOLBAR WRAPPER PANEL */}
        <div className="editor-rich-toolbar">
          {/* --- HEADINGS DROPDOWN --- */}
          <div className="toolbar-dropdown-wrapper">
            <button
              type="button"
              className={`toolbar-dropdown-trigger ${activeDropdown === "heading" ? "open" : ""}`}
              onClick={() => toggleDropdown("heading")}
            >
              <span>{selectedHeading}</span>
              <span className="dropdown-arrow">▼</span>
            </button>

            {activeDropdown === "heading" && (
              <div className="toolbar-dropdown-menu">
                <button
                  type="button"
                  onClick={() => handleHeadingSelect("Normal Text", "p")}
                >
                  Normal Text
                </button>
                <button
                  type="button"
                  className="h1-style"
                  onClick={() => handleHeadingSelect("Heading 1", "h1")}
                >
                  Heading 1
                </button>
                <button
                  type="button"
                  className="h2-style"
                  onClick={() => handleHeadingSelect("Heading 2", "h2")}
                >
                  Heading 2
                </button>
                <button
                  type="button"
                  className="h3-style"
                  onClick={() => handleHeadingSelect("Heading 3", "h3")}
                >
                  Heading 3
                </button>
              </div>
            )}
          </div>

          <div className="toolbar-divider"></div>

          {/* --- FONT FAMILY DROPDOWN --- */}
          <div className="toolbar-dropdown-wrapper">
            <button
              type="button"
              className={`toolbar-dropdown-trigger ${activeDropdown === "fontFamily" ? "open" : ""}`}
              onClick={() => toggleDropdown("fontFamily")}
            >
              <span>{selectedFontFamily}</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            {activeDropdown === "fontFamily" && (
              <div className="toolbar-dropdown-menu">
                <button
                  type="button"
                  style={{ fontFamily: "Inter" }}
                  onClick={() => {
                    setSelectedFontFamily("Inter");
                    setActiveDropdown(null);
                  }}
                >
                  Inter
                </button>
                <button
                  type="button"
                  style={{ fontFamily: "JetBrains Mono" }}
                  onClick={() => {
                    setSelectedFontFamily("JetBrains Mono");
                    setActiveDropdown(null);
                  }}
                >
                  JetBrains Mono
                </button>
                <button
                  type="button"
                  style={{ fontFamily: "serif" }}
                  onClick={() => {
                    setSelectedFontFamily("Merriweather");
                    setActiveDropdown(null);
                  }}
                >
                  Merriweather
                </button>
              </div>
            )}
          </div>

          {/* --- FONT SIZE DROPDOWN --- */}
          <div className="toolbar-dropdown-wrapper">
            <button
              type="button"
              className={`toolbar-dropdown-trigger ${activeDropdown === "fontSize" ? "open" : ""}`}
              onClick={() => toggleDropdown("fontSize")}
            >
              <span>{selectedFontSize}</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            {activeDropdown === "fontSize" && (
              <div className="toolbar-dropdown-menu micro-menu">
                {["12px", "14px", "16px", "18px", "24px"].map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => {
                      setSelectedFontSize(size);
                      setActiveDropdown(null);
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="toolbar-divider"></div>

          <div className="toolbar-action-buttons">
            <button
              type="button"
              className={`tool-btn ${format.bold ? "active-clicked" : ""}`}
              onClick={() => toggleFormat("bold")}
              title="Bold"
            >
              <strong>B</strong>
            </button>

            <button
              type="button"
              className={`tool-btn ${format.italic ? "active-clicked" : ""}`}
              onClick={() => toggleFormat("italic")}
              title="Italic"
            >
              <em>I</em>
            </button>
            <button
              type="button"
              className={`tool-btn ${format.underline ? "active-clicked" : ""}`}
              onClick={() => toggleFormat("underline")}
              title="Underline"
            >
              <u>U</u>
            </button>

            <button
              type="button"
              className={`tool-btn ${format.strikethrough ? "active-clicked" : ""}`}
              onClick={() => toggleFormat("strikethrough")}
              title="Strikethrough"
            >
              <s>S</s>
            </button>
          </div>

          <div className="toolbar-divider"></div>

          {/* --- LISTS DROPDOWN (With the two types of lists) --- */}
          <div className="toolbar-dropdown-wrapper">
            <button
              type="button"
              className={`toolbar-dropdown-trigger ${activeDropdown === "list" ? "open" : ""}`}
              onClick={() => toggleDropdown("list")}
              title="List Formatting"
            >
              <span>📊 Lists</span>
              <span className="dropdown-arrow">▼</span>
            </button>

            {activeDropdown === "list" && (
              <div className="toolbar-dropdown-menu">
                <button
                  type="button"
                  onClick={() => handleListChange("unordered")}
                >
                  • Unordered Bullet List
                </button>
                <button
                  type="button"
                  onClick={() => handleListChange("ordered")}
                >
                  1. Ordered Numbered List
                </button>
              </div>
            )}
          </div>
          <div className="toolbar-divider"></div>

          <button className="toolbar-btn btn-save" title="Save Document">
            Save Progress
          </button>
        </div>

        {/* Editor Main Textarea Canvas Sheet */}
        <div className="editor-canvas-sheet">
          <textarea
            className="canvas-textarea"
            placeholder="Start drafting your masterpiece assignment here... Custom markups, data sheets, and outlines fit beautifully inside this canvas workspace."
            style={{
              fontFamily: selectedFontFamily,
              fontSize: selectedFontSize,
            }}
            name="editor"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
