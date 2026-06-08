import { fetchAssignments as getAssignments } from "./api";
export async function getDashboardStats() {
  const assignments = await getAssignments();

  const drafts = assignments.filter((a: any) => a.status === "draft").length;

  const completed = assignments.filter(
    (a: any) => a.status === "completed",
  ).length;

  const reports = assignments.filter(
    (a: any) => a.category === "report",
  ).length;

  const essays = assignments.filter((a: any) => a.category === "essay").length;

  const dashboardStat = {
    drafts,
    completed,
    reports,
    essays,
  };
  console.log(dashboardStat);

  return dashboardStat;
}
