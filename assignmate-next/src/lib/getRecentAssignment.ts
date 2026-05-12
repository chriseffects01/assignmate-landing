// import { getAssignments } from "./assignmentStorage";
import { getAssignments } from "../services/assignmentService";
export async function getRecentAssignment(limit: number = 3) {
  const assignments = await getAssignments();

  return assignments
    .filter((a) => a.status === "draft")
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, limit);
}
 