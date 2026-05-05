import { getAssignments } from "./assignmentStorage";

export function getLastDraft() {
  const assignments = getAssignments();
  const drafts = assignments.filter((a) => a.status === "draft");

  if (drafts.length === 0) return null;
  drafts.sort((a, b) => b.createdAt - a.createdAt);
  //   console.log(drafts[0], drafts[1]);
  //   return drafts[0];
  const lastDraftArr = [drafts[0], drafts[1]];
  console.log(lastDraftArr);
  return drafts[0];
}
