import OfflineDraft from '@/src/types/draft.types';
import { AssignmentFields } from '@/src/types/Workspace.types';
export const createofflinedraft = (
  Id: string,
  fields: AssignmentFields,
  content: string
): OfflineDraft => ({
  _id: Id,
  title: fields.title || '',
  content: content || '',
  course: fields.course || '',
  courseCode: fields.courseCode || '',
  lecturer: fields.lecturer || '',
  category: fields.category || '',
  dueDate: fields.dueDate || '',
  type: 'blank',
  lastSavedLocally: new Date().toISOString(),
  level: fields.level || '',
});
