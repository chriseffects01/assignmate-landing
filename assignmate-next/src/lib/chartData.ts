import { fetchAllAssignments } from '../services/assignmentService';
import type { AssignmentType } from '@/src/types/assignment';

export type Range = '7D' | '30D' | 'Semester';

export interface ChartDataPoint {
  name: string;
  drafts: number;
  reports: number;
  essays: number;
  completed: number;
}

function calculateCounts(assignments: AssignmentType[]) {
  const counts = {
    drafts: 0,
    reports: 0,
    essays: 0,
    completed: 0,
  };
  assignments.forEach(a => {
    if (a.status === 'draft') counts.drafts++;
    if (a.category === 'report') counts.reports++;
    if (a.category === 'essay') counts.essays++;
    if (a.status === 'completed') counts.completed++;
  });
  return counts;
}

export async function getChartsData(range: Range): Promise<ChartDataPoint[]> {
  const assignments = ((await fetchAllAssignments()) ?? []) as AssignmentType[];
  const now = new Date();

  if (range === '7D') {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(now.getDate() - (6 - i));

      const dayAssignments = assignments.filter(a => {
        const created = new Date(a.createdAt);
        return created.toDateString() === d.toDateString();
      });

      return {
        name: days[d.getDay()],
        ...calculateCounts(dayAssignments),
      };
    });
  }
  if (range === '30D') {
    const ONE_DAY_MS = 24 * 60 * 60 * 1000;

    return [1, 2, 3, 4].map(weekNum => {
      const startMS = now.getTime() - (5 - weekNum) * 7 * ONE_DAY_MS;
      const endMs = now.getTime() - (4 - weekNum) * 7 * ONE_DAY_MS;

      const weekAssignments = assignments.filter(a => {
        const time = new Date(a.createdAt).getTime();
        return time >= startMS && time < endMs;
      });

      return {
        name: `Week ${weekNum}`,
        ...calculateCounts(weekAssignments),
      };
    });
  }

  if (range === 'Semester') {
    return Array.from({ length: 4 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (3 - i), 1);
      const monthAssignments = assignments.filter(a => {
        const created = new Date(a.createdAt);
        return (
          created.getMonth() === d.getMonth() &&
          created.getFullYear() === d.getFullYear()
        );
      });

      return {
        name: d.toLocaleDateString(undefined, { month: `short` }),
        ...calculateCounts(monthAssignments),
      };
    });
  }

  return [];
}
