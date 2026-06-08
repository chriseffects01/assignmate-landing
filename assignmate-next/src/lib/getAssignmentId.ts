export default function getAssignmentId(assignment: any) {
  return String(assignment._id || assignment.id);
}
