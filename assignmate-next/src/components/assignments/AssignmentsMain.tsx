"use client";

import { useMemo, useState } from "react";

type AssignmentStatus = "draft" | "completed";

type Assignment = {
  id: number;
  title: string;
  course: string;
  courseCode?: number;
  updatedAt: string;
  status: AssignmentStatus;
};

const assignments: Assignment[] = [
  {
    id: 1,
    title: "Comparative Literature Essay",
    course: "ENG",
    courseCode: 204,
    updatedAt: "Edited 2 hours ago",
    status: "draft",
  },
  {
    id: 2,
    title: "Church Media Training Report",
    course: "COM",
    courseCode: 301,
    updatedAt: "Edited Yesterday",
    status: "draft",
  },
  {
    id: 3,
    title: "Niger Delta Poetry Analysis",
    course: "LIT",
    courseCode: 220,
    updatedAt: "Completed 3 days ago",
    status: "completed",
  },
  {
    id: 4,
    title: "Merging A Pull Request",
    course: "COS",
    courseCode: 341,
    updatedAt: "Edited Yesterday",
    status: "completed",
  },
  {
    id: 5,
    title: "Questionnaire Design Assignment",
    course: "RES",
    courseCode: 110,
    updatedAt: "Completed Last Week",
    status: "completed",
  },
];

export default function AssignmentsMain() {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "drafts" | "completed"
  >("all");

  // const filteredAssignments = useMemo(() => {
  //   if (activeFilter === "all") {
  //     return assignments;
  //   }
  //   if (activeFilter === "drafts") {
  //     return assignments.filter((assignment) => {
  //       assignment.status === "draft";
  //     });
  //   }
  //   return assignments.filter((assignment) => {
  //     assignment.status === "completed";
  //   });
  // }, [activeFilter]);

  const filteredAssignments =
    activeFilter === "all"
      ? assignments
      : activeFilter === "drafts"
        ? assignments.filter((assignment) => assignment.status === "draft")
        : assignments.filter((assignment) => assignment.status === "completed");

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

          <button className="assignments-primary-btn" type="button">
            + New Assignments
          </button>
        </div>
      </section>

      <section className="assignments-toolbar">
        <div className="assignments-search-wrap">
          <input
            type="text"
            className="assignments-search"
            placeholder="Search assignments..."
          />
        </div>

        <div className="assignments-filter-group">
          <button
            className={`assignments-filter-btn ${
              activeFilter === "all" ? "active" : ""
            }`}
            type="button"
            onClick={() => setActiveFilter("all")}
          >
            All
          </button>
          <button
            className={`assignments-filter-btn ${
              activeFilter === "drafts" ? "active" : ""
            }`}
            type="button"
            onClick={() => setActiveFilter("drafts")}
          >
            Drafts
          </button>

          <button
            className={`assignments-filter-btn ${
              activeFilter === "completed" ? "active" : ""
            }`}
            type="button"
            onClick={() => setActiveFilter("completed")}
          >
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

      <section className="assignments-grid">
        {filteredAssignments.map((assignment) => (
          <article className="assignment-card" key={assignment.id}>
            <div className="assignment-card-top">
              <span
                className={`assignment-status ${
                  assignment.status === "completed"
                    ? "is-completed"
                    : "is-draft"
                }`}
              >
                {assignment.status === "completed" ? "Completed" : "Drafts"}
              </span>
            </div>

            <h2 className="assignment-card-title">{assignment.title} </h2>
            <p className="asssignment-card-course">
              {assignment.course} {assignment.courseCode}
            </p>
            <p className="assignment-card-time">{assignment.updatedAt}</p>
            <div className="assignment-card-actions">
              <button
                className={`assignment-card-btn primary ${
                  assignment.status === "completed" ? "hidden" : ""
                }`}
                type="button"
              >
                Continue
              </button>
              <button className="assignment-card-btn secondary" type="button">
                Details
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
