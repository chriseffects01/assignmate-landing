type Props = {
  assignment: any;
};

export default function WorkspaceMeta({ assignment }: Props) {
  return (
    <div className="workspace-meta">
      <div className="meta-grid">
        <div>
          <span>Course Code</span>
          <h4>{assignment.courseCode || "N/A"}</h4>
        </div>

        <div>
          <span>Course</span>
          <h4>{assignment.course || "N/A"}</h4>
        </div>

        <div>
          <span>Lecturer</span>
          <h4>{assignment.lecturer || "N/A"}</h4>
        </div>

        <div>
          <span>Due Date</span>
          <h4>{assignment.dueDate || "N/A"}</h4>
        </div>

        <div>
          <span>Status</span>
          <h4>{assignment.status}</h4>
        </div>

        <div>
          <span>Level</span>
          <h4>{assignment.level || "N/A"}</h4>
        </div>
      </div>
    </div>
  );
}
