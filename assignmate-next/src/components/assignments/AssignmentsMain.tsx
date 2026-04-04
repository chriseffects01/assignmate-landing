export default function AssignmentsMain() {
  return (
    <main className="assignments-main">
      <section className="assignments-header">
        <div>
          <p className="assignments-eyebrow">Workspace</p>
          <h1 className="assignments-title">Assignments</h1>
          <p className="assignments-subtitle">
            Organize your drafts, Continue your work, and start new assignments
          </p>
        </div>

        <div className="assignments-header-actions">
          <button className="assignments-secondary-btn" type="button">
            Use Templates
          </button>

          <button className="assignments-primary-button" type="button">
            + New Assignments
          </button>
        </div>
      </section>

      <section className="assignments-toolbar">
        <div className="assignments-searc-wrap">
          <input
            type="text"
            className="assignments-search"
            placeholder="Search"
          />
        </div>

        <div className="assignments-filter-group">
          <button className="assignments-filter-btn active" type="button">
            All
          </button>
          <button className="assignments-filter-btn" type="button">
            Drafts
          </button>

          <button className="assignments-filter-btn" type="button">
            Completed
          </button>
        </div>
      </section>

      <section className="assignment-empty-state">
        <div className="assignments-empty-card">
          <p className="assignments">
            Create a new assignment, continue a saved draft or begin with a
            template to speed things Up
          </p>
        </div>

        <div className="assignments-empty-actions">
          <button className="assignments-primary-btn" type="button">
            Create New
          </button>
          <button className="assignments-secondary-btn" type="button">
            Browse Templates
          </button>
        </div>
      </section>
    </main>
  );
}
