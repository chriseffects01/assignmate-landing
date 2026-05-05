import { AssignmentType, TemplateType } from "@/src/types/assignment";
import { KEY } from "@/src/var/var";
import { fetchAssignments } from "./api";

export async function getAssignments(): Promise<AssignmentType[]> {
  const apiData = await fetchAssignments();
  if (apiData) return apiData;

  //Falback
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function getAssignmentsFromTemplateData(): TemplateType[] {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function saveAssignments(assignments: AssignmentType[]) {
  localStorage.setItem(KEY, JSON.stringify(assignments));
}

export function saveAssignmentsFromTemplates(assignment: TemplateType[]) {
  localStorage.setItem(KEY, JSON.stringify(assignment));
}

export function addAssignment(newAssignment: AssignmentType) {
  const existing = getAssignments();
  const alreadyExists = existing.find((a) => {
    a.id === newAssignment.id;
  });

  if (alreadyExists) return;

  saveAssignments([newAssignment, ...existing]);
}

export function addAssignmentFromTemplate(newAssignment: TemplateType) {
  const existing = getAssignmentsFromTemplateData();

  saveAssignmentsFromTemplates([newAssignment, ...existing]);
}

export function updateAssignment(updatedAssignment: AssignmentType) {
  const existing = getAssignments();

  const updatedList = existing.map((a) =>
    a.id === updatedAssignment.id ? updatedAssignment : a,
  );

  saveAssignments(updatedList);
}
