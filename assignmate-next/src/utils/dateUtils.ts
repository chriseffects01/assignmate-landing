export function formatAssignmentTimeStamp(dateString: string): string {
  const now = new Date();

  const updatedDate = new Date(dateString);

  //if date is invalid, fall back

  if (isNaN(updatedDate.getTime())) return "Unknown Date";

  // Reset hours
  const startOfNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const startOfUpdated = new Date(
    updatedDate.getFullYear(),
    updatedDate.getMonth(),
    updatedDate.getDate(),
  );

  //Difference in miliseconds converting to days

  const diffTime = startOfNow.getTime() - startOfUpdated.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  //1. check for Today
  if (diffDays === 0) {
    return "Edited today";
  }

  if (diffDays === 1) {
    return "Edited yesterday";
  }

  if (diffDays > 1 && diffDays < 7) {
    return `Edited ${diffDays} days ago`;
  }

  if (diffDays >= 7 && diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? "Edited last week" : `Edited ${weeks} weeks ago`;
  }

  if (diffDays >= 30 && diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return months === 1 ? "Edited last month" : `Edited ${months} months ago`;
  }

  return `Edited on ${updatedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
}
