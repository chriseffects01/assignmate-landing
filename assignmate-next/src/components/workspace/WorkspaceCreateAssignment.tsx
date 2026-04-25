"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "@/src/styles/workspace/workspace.css";
import { KEY } from "@/src/var/var";
import { AssignmentType } from "@/src/types/assignment";
import { getAssignments, saveAssignments } from "@/src/lib/assignmentStorage";

export default function CreateAssignmentModal({ onClose }: any) {
  const assignmentStatus = {
    courseCode: "",
    title: "",
    course: "",
    lecturer: "",
  };

  const [form, setForm] = useState(assignmentStatus);
  const router = useRouter();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    const newAssignment: AssignmentType = {
      id: crypto.randomUUID(),
      ...form,
      content: "",
      createdAt: Date.now(),
      status: "draft",
      lecturerName: "",
      category: "",
    };

    const existing = getAssignments();

    // localStorage.setItem(
    //   "assignment",
    //   JSON.stringify([newAssignment, ...existing]),
    // );

    saveAssignments([newAssignment, ...existing]);

    router.push(`/workspace/${newAssignment.id}`);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create Assignment</h2>

        <label htmlFor="courseCode">Course Code:</label>
        <input
          name="courseCode"
          type="text"
          placeholder="Course Code"
          onChange={handleChange}
          required
        />

        <label htmlFor="course">Course Name:</label>
        <input
          type="text"
          placeholder="Course name"
          name="course"
          onChange={handleChange}
          required
        />

        <label htmlFor="lecturer">Lecturer:</label>
        <input
          type="text"
          placeholder="Lecturer"
          name="lecturer"
          onChange={handleChange}
        />

        <label htmlFor="title"></label>
        <input
          type="text"
          name="title"
          placeholder="Assignmemt -title"
          onChange={handleChange}
          required
        />

        <div className="modal-actions">
          <button type="button" onClick={handleCreate}>
            Create
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
