type Props = {
  assignment: any;
};
import "@/src/styles/workspace/workspaceMain.css";

export default function WorkspaceMeta({ assignment }: Props) {
  return (
    <div className="meta-form-group">
      <div className="meta-field-wrapper">
        <label className="meta-label">Course Code </label>
        <div className="input-action-row">
          <input
            type="text"
            className="meta-inline-input"
            value={assignment.courseCode || ""}
            disabled
            name="assignment-coursecode"
          />

          <button type="button" className="meta-edit-btn" title="Edit Field">
            ✏️
          </button>
        </div>
      </div>

      <div className="meta-field-wrapper">
        <label className="meta-label">Course </label>
        <div className="input-action-row">
          <input
            type="text"
            className="meta-inline-input"
            value={assignment.course || ""}
            disabled
            name="assignment-course"
          />

          <button type="button" className="meta-edit-btn" title="Edit Field">
            ✏️
          </button>
        </div>
      </div>

      <div className="meta-field-wrapper">
        <label className="meta-label">Lecturer </label>
        <div className="input-action-row">
          <input
            type="text"
            className="meta-inline-input"
            value={assignment.lecturer || ""}
            disabled
            name="assignment-lecturer"
          />

          <button type="button" className="meta-edit-btn" title="Edit Field">
            ✏️
          </button>
        </div>
      </div>

      <div className="meta-field-wrapper">
        <label className="meta-label">Due Date </label>

        <div className="input-action-row">
          <input
            type="date"
            className="meta-inline-input"
            value={assignment.dueDate || ""}
            disabled
            name="assignment-dueDate"
          />

          <button type="button" className="meta-edit-btn" title="Edit Field">
            ✏️
          </button>
        </div>
      </div>

      {/* <div className="meta-field-wrapper">
        <span className="meta-level">Status</span>
        <h4 className="meta-inline-input">{assignment.status}</h4>
      </div> */}

      <div className="meta-field-wrapper">
        <label className="meta-label">Level </label>
        <div className="input-action-row">
          <input
            type="text"
            className="meta-inline-input"
            value={assignment.level || ""}
            disabled
            name="assignment-level"
          />

          <button type="button" className="meta-edit-btn" title="Edit Field">
            ✏️
          </button>
        </div>

        <div className="ai-thinking-space">
          <div className="ai-thinking-status">
            <span className="pulse-dot"></span>
            <span className="status-text">AI is deep in thought...</span>
          </div>
          <p className="ai-response-placeholder">
            System waiting for prompt execution sequence.
          </p>
        </div>
      </div>
    </div>
  );
}
