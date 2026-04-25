import { getAssignments } from "./assignmentStorage";
import { START_END, DAY30, DAY7, DAY_SEMESTER } from "../var/var";

export function getChartDats(range: "7D" | "30D" | "Semester") {
  const assignments = getAssignments();
  console.log(assignments);

  const now = Date.now();
  let days = DAY7;
  if (range === "30D") days = DAY30;
  if (range === "Semester") days = DAY_SEMESTER;

  const data = Array.from({ length: days }, (_, i) => {
    const start = now - i * START_END;
    const end = start + START_END;

    const count = assignments.filter(
      (a) => a.createdAt >= start && a.createdAt < end,
    ).length;

    console.log(count);

    return count;
  }).reverse();

  console.log(data);
  return data;
}
