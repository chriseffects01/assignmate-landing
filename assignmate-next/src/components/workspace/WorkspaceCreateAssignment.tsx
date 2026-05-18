"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "@/src/styles/workspace/workspace.css";
import { AssignmentType } from "@/src/types/assignment";
import { getAssignments, saveAssignments } from "@/src/lib/assignmentStorage";
import { createAssignmentAPI } from "@/src/lib/api";
import getAssignmentId from "@/src/lib/getAssignmentId";

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
      router.push(`/workspace/${getAssignmentId(saved)}`);
    } else {
      //fallback

      saveAssignments(newAssignment);
      router.push(`/workspace/${getAssignmentId(newAssignment)}`);
    }
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

        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          placeholder="Assignment title"
          onChange={handleChange}
          required
        />

        <select name="category" onChange={handleChange}>
          <option value="Category">Category</option>
          <option value="essay">Essay</option>
          <option value="report">Report</option>
        </select>

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
