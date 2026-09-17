'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import '@/src/styles/workspace/workspace.css';
import { AssignmentType } from '@/src/types/assignment';
import { createAssignmentAPI } from '@/src/services/assignmentService';
import getAssignmentId from '@/src/lib/getAssignmentId';
import '@/src/styles/workspace/workspaceModal.css';
import { useNotification } from '@/src/context/NotificationContext';
import { getUserFullname } from '@/src/lib/fullname';
import { useAuth } from '@/src/context/AuthContext';

export default function CreateAssignmentModal({ onClose }: any) {
  const { user } = useAuth();
  const assignmentStatus = {
    courseCode: '',
    title: '',
    course: '',
    lecturer: '',
    category: '',
  };

  const [form, setForm] = useState(assignmentStatus);
  const router = useRouter();
  const { toast } = useNotification();
  const fullname = getUserFullname();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const newAssignment: AssignmentType = {
      _id: crypto.randomUUID(),

      content: [''],
      metadata: {
        title: form.title,
        fullname: fullname,
        faculty: user?.faculty || '',
        department: user?.department || '',
        registrationNumber: user?.registrationNumber || '',
        lecturer: form.lecturer,
        course: form.course,
        courseCode: form.courseCode,
        dueDate: '',
      },
      createdAt: String(Date.now()),
      category: form.category,
      status: 'draft',
    };
    console.log('Before save:', newAssignment);

    const saved = await createAssignmentAPI(newAssignment);
    toast.success('Assignment created successfully');
    console.log('After save:', saved);

    if (saved) {
      router.push(`/dashboard/workspace/${getAssignmentId(saved)}`);
    }
  };

  return (
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
            <label htmlFor="courseCode" className="form-label">
              Course Code:
            </label>
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
            <label htmlFor="course" className="form-label">
              Course Name:
            </label>
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
            <label htmlFor="lecturer" className="form-label">
              Lecturer:
            </label>
            <input
              className="form-input"
              type="text"
              placeholder="e.g., Dr. Smith"
              name="lecturer"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
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
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              name="category"
              onChange={handleChange}
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
  );
}
