import { getAssignments } from "./assignmentStorage";

export function getRecentAssignment(limit: number = 3) {
  const assignments = getAssignments();

  return assignments
    .filter((a) => a.status === "draft")
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, limit);
}
