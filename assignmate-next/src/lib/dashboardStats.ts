import { fetchAssignments as getAssignments } from "../services/assignmentService";

//
export async function getDashboardStats() {
  const assignments = await getAssignments();

  // SET FILTER BY STATUS
  const drafts = assignments.filter((a: any) => a.status === "draft").length;

  const completed = assignments.filter(
    (a: any) => a.status === "completed",
  ).length;

  //SET FILTER BY CATEGORY
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
  // console.log(dashboardStat);

  return dashboardStat;
}
