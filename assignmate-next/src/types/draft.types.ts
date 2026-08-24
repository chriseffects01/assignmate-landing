export default interface OfflineDraft {
  _id: string;
  title: string;
  content: string;
  courseCode: string;
  course: string;
  lecturer: string;
  category: string;
  dueDate: string;
  level?: string;
  type: string;
  lastSavedLocally: string;
}
