import { getChartDats } from "./chartData";
import { getDashboardStats } from "./dashboardStats";
import { getAssignments } from "./assignmentStorage";

export default async function chartMain() {
  const assignments = await getAssignments();
  assignments.filter((a) => {});
}
