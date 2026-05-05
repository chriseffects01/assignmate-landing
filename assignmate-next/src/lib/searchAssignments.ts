import { getAssignments } from "./assignmentStorage";

export function searchAssignments(query: string) {
  const assignments = getAssignments();

  if (!query) return [];

  return assignments.filter((a) => {
    a.title.toLowerCase().includes(query.toLowerCase());
  });
}
