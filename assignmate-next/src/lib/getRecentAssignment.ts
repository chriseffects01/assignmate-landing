import { fetchAllAssignments } from '../services/assignmentService';
export async function getRecentAssignment(limit: number = 3) {
  const assignments = await fetchAllAssignments();

  return assignments
    .filter((a: any) => a.status === 'draft')
    .sort((a: any, b: any) => b.createdAt - a.createdAt)
    .slice(0, limit);
}
