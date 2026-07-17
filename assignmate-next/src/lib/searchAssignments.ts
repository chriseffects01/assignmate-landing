import { fetchAllAssignments } from '../services/assignmentService';
export async function searchAssignments(query: string) {
  const assignments = await fetchAllAssignments();

  if (!query) return [];

  return assignments.filter((a: any) => {
    a.title.toLowerCase().includes(query.toLowerCase());
  });
}
