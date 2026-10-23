export function isDuplicateAssignment(
  content: string[] | string,
  currentAssignmentId: string
): boolean {
  if (!content) return false;

  const targetString = Array.isArray(content) ? content[0] : content;
  console.log('Target string:', targetString);

  if (!targetString) return false;

  const match = targetString.match(/<!-- assignmate-root-original:\s*(.*?)-->/);
  console.log('Match:', match);

  const rootId = match ? match[1].trim() : null;

  console.log('RootID', rootId);
  return Boolean(rootId && rootId !== currentAssignmentId);
}
