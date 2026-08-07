import OfflineDraft from '@/src/types/draft.types';

export const createofflinedraft = (
  Id: string,
  fields: any,
  content: string
): OfflineDraft => ({
  _id: Id,
  title: fields.title || '',
  content: content || '',
  course: fields.course || '',
  courseCode: fields.courseCode || '',
  lecturer: fields.lecturer || '',
  category: fields.category || '',
  dueDate: fields.duedaate || '',
  type: fields.type || 'blank',
  lastSavedLocally: new Date().toISOString(),
});
