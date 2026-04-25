import { AssignmentType, TemplateType } from "@/src/types/assignment";
import { KEY } from "@/src/var/var";

export function getAssignments(): AssignmentType[] {
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

  saveAssignments([newAssignment, ...existing]);
}

export function addAssignmentFromTemplate(newAssignment: TemplateType) {
  const existing = getAssignmentsFromTemplateData();

  saveAssignmentsFromTemplates([newAssignment, ...existing]);
}
