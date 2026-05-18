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

export async function saveAssignments(assignments: any) {
  const existing = await getAssignments();
  const assignmentId = assignments._id;
  const alreadyExists = existing.some((item) => {
    const itemId = item._id;
    return String(itemId) === String(assignmentId);
  });

  let updatedAssignments;

  if (alreadyExists) {
    updatedAssignments = existing.map((item) => {
      const itemId = item._id;
      return String(itemId) === String(assignmentId) ? assignments : item;
    });
  } else {
    updatedAssignments = [assignments, ...existing];
  }

  localStorage.setItem(KEY, JSON.stringify(updatedAssignments));
}

export function saveAssignmentsFromTemplates(assignment: TemplateType[]) {
  localStorage.setItem(KEY, JSON.stringify(assignment));
}

export async function addAssignment(newAssignment: AssignmentType) {
  const existing = await getAssignments();
  const alreadyExists = existing.find((a) => {
    a._id === newAssignment._id;
  });

  if (alreadyExists) return;

  saveAssignments([newAssignment, ...existing]);
}

export function addAssignmentFromTemplate(newAssignment: TemplateType) {
  const existing = getAssignmentsFromTemplateData();

  saveAssignmentsFromTemplates([newAssignment, ...existing]);
}

export async function updateAssignment(updatedAssignment: any) {
  const existing = await getAssignments();

  const updatedList = existing.map((a) =>
    a._id === updatedAssignment._id ? updatedAssignment : a,
  );

  saveAssignments(updatedList);
}
