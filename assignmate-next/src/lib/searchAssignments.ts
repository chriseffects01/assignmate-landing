import { getAssignments } from "../services/assignmentService";
export async function searchAssignments(query: string) {
  const assignments = await getAssignments();

  if (!query) return [];

  return assignments.filter((a: any) => {
    a.title.toLowerCase().includes(query.toLowerCase());
  });
}
