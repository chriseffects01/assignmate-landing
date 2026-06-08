"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "@/src/styles/workspace/workspace.css";
import { AssignmentType } from "@/src/types/assignment";
import { createAssignmentAPI } from "@/src/lib/api";
import getAssignmentId from "@/src/lib/getAssignmentId";
import "@/src/styles/workspace/workspaceModal.css";
import LoadingScreen from "../shared/LoadingScreen";

export default function CreateAssignmentModal({ onClose }: any) {
  const assignmentStatus = {
    courseCode: "",
    title: "",
    course: "",
    lecturer: "",
  };

  const [form, setForm] = useState(assignmentStatus);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const newAssignment: AssignmentType = {
      _id: crypto.randomUUID(),

      ...form,
      content: "",
      createdAt: Date.now(),
      status: "draft",

      category: "",
    };
    const saved = await createAssignmentAPI(newAssignment);

    if (saved) {
      setTimeout(() => {
        router.push(`/workspace/${getAssignmentId(saved)}`);
        setIsLoading(true);
      }, 900);
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen message="Loading your workspace..." />}
      // Modal Backdrop Overlay
      <div className="modal-overlay">
        {/* //   <!-- Actual Glassmorphic Modal Window --> */}

        <div className="modal-window">
          <header className="modal-header">
            <h2 className="modal-title">Create Assignment</h2>
            <p className="modal-subtitle">
              Fill in the fields below to initialize a new assignment draft.
            </p>
          </header>

          <form className="modal-form" action={handleCreate}>
            <div className="form-group">
              <label className="form-label">Course Code:</label>
              <input
                name="courseCode"
                className="form-input"
                type="text"
                placeholder="e.g., COS 323"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Course Name:</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g., Advanced Computing"
                name="course"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Lecturer:</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g., Dr. Smith"
                name="lecturer"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Title:</label>
              <input
                className="form-input"
                type="text"
                name="title"
                placeholder="A biography on Lionel Messi"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                name="category"
                onSelect={handleChange}
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="essay">Essay</option>
                <option value="report">Report</option>
                <option value="presentation">Presentation</option>
                <option value="lab">Lab</option>
                <option value="letter">Letter</option>
              </select>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn-primary-action"
                onClick={handleCreate}
              >
                Create
              </button>
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
