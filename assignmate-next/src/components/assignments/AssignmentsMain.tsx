"use client";
import { fetchAssignments as getAssignments } from "@/src/lib/api";
import { AssignmentType } from "@/src/types/assignment";
import SearchBar from "../dashboard/SearchBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getAssignmentId from "@/src/lib/getAssignmentId";
import { formatAssignmentTimeStamp } from "@/src/utils/dateUtils";
import LoadingScreen from "../shared/LoadingScreen";

export default function AssignmentsMain() {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "drafts" | "completed"
  >("all");
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getAssignments();
      setAssignments(data || []);
    }
    load();
  }, []);

  const filteredAssignments =
    activeFilter === "all"
      ? assignments
      : activeFilter === "drafts"
        ? assignments.filter((assignment) => assignment.status === "draft")
        : assignments.filter((assignment) => assignment.status === "completed");

  return (
    <>
      {isLoading && <LoadingScreen message="Loading your workspace" />}
      <main className="assignments-main">
        <section className="assignments-header">
          <div>
            <p className="assignments-eyebrow">Workspace</p>
            <h1 className="assignments-title">Assignments</h1>
            <p className="assignments-subtitle">
              Organize your drafts, Continue your work, and start new
              assignments
            </p>
          </div>

          <div className="assignments-header-actions">
            <button
              className="assignments-secondary-btn"
              type="button"
              onClick={() => {
                setIsloading(true);
                router.push("/templates");
              }}
            >
              Use Templates
            </button>

            <button
              className="assignments-primary-btn"
              type="button"
              onClick={() => {
                setIsloading(true);
                router.push("/workspace");
              }}
            >
              + New Assignments
            </button>
          </div>
        </section>

        <section className="assignments-toolbar">
          <SearchBar />

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
            <button
              className="assignments-primary-btn"
              type="button"
              onClick={() => {
                setIsloading(true);
                router.push("/workspace");
              }}
            >
              Create New
            </button>
            <button
              className="assignments-secondary-btn"
              type="button"
              onClick={() => {
                setIsloading(true);
                router.push("/templates");
              }}
            >
              Browse Templates
            </button>
          </div>
        </section>

        <section className="assignments-grid">
          {filteredAssignments.map((assignment) => (
            <article
              className="assignment-card"
              key={getAssignmentId(assignment)}
            >
              <div className="assignment-card-top">
                <span
                  className={`assignment-status ${
                    assignment.status === "completed"
                      ? "is-completed"
                      : "is-draft"
                  }`}
                >
                  <span className="status-dot"></span>
                  {assignment.status === "completed"
                    ? "📝 Completed"
                    : "⌛ Drafts"}
                </span>
                <div className="assignment-card-icon">📂</div>
              </div>
              <h2 className="assignment-card-title">{assignment.title} </h2>
              <p className="assignment-card-course">
                📚 <span>{assignment.course} </span>
                💠<span>{assignment.courseCode}</span>
              </p>
              <div className="assignment-card-preview">
                {assignment.content ? (
                  assignment.content.substring(0, 75) +
                  (assignment.content.length > 75 ? "..." : "")
                ) : (
                  <span className="empty-preview">
                    No new content written 😱
                  </span>
                )}
              </div>

              <p className="assignment-card-time">
                <span className="typing-text">
                  {formatAssignmentTimeStamp(assignment.updatedAt || "")}
                </span>
              </p>

              <div className="assignment-card-actions">
                <button
                  className={`assignment-card-btn primary ${
                    assignment.status === "completed" ? "hidden" : ""
                  }`}
                  type="button"
                  onClick={() => {
                    setIsloading(true);
                    router.push(`/workspace/${getAssignmentId(assignment)}`);
                  }}
                >
                  Continue
                </button>
                <button
                  className="assignment-card-btn secondary"
                  type="button"
                  onClick={() => {
                    setIsloading(true);

                    router.push(`/workspace/${getAssignmentId(assignment)}`);
                  }}
                >
                  Details
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
