import { getAssignments } from "./assignmentStorage";

export function getDashboardStats() {
  const assignments = getAssignments();

  const drafts = assignments.filter((a) => a.status === "draft").length;

  const completed = assignments.filter((a) => a.status === "completed").length;

  const reports = assignments.filter((a) => a.category === "report").length;

  const essays = assignments.filter((a) => a.category === "essay").length;

  const dashboardStat = {
    drafts,
    completed,
    reports,
    essays,
  };
  console.log(dashboardStat);

  return dashboardStat;
}
