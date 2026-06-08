import { fetchAssignments as getAssignments } from "./api";
export async function searchAssignments(query: string) {
  const assignments = await getAssignments();

  if (!query) return [];

  return assignments.filter((a: any) => {
    a.title.toLowerCase().includes(query.toLowerCase());
  });
}
