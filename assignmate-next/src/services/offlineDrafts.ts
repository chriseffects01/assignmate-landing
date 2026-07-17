import OfflineDraft from '../types/draft.types';
import { ASSIGNMENTSkEY } from '../var/var';

const getUserPrefix = (userId: string) => `${ASSIGNMENTSkEY}_${userId}_`;

export const saveDraftToLocal = (
  userId: string,
  id: string,
  fields: any,
  content: any
) => {
  try {
    const draftData: OfflineDraft = {
      _id: id,
      title: fields.title || '',
      content: content || '',
      courseCode: fields.courseCode || '',
      course: fields.course || '',
      lecturer: fields.lecturer || '',
      category: fields.category || '',
      dueDate: fields.dueDate || '',
      type: fields.type || 'blank',
      lastSavedLocally: new Date().toISOString(),
    };
    const userKey = `${getUserPrefix(userId)}${id}`;

    localStorage.setItem(userKey, JSON.stringify(draftData));
  } catch (e: any) {
    console.error(`Failed towrite draft to Localstorage: ${e.message}`);
    throw e;
  }
};

export const removeDraftFromLocal = (userId: string, id: string) => {
  const userKey = `${getUserPrefix(userId)}${id}`;
  localStorage.removeItem(userKey);
};

export const getAllLocalDrafts = (userId: string): OfflineDraft[] => {
  const drafts: OfflineDraft[] = [];
  const userPrefix = getUserPrefix(userId);

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(userPrefix)) {
        const rawData = localStorage.getItem(key);
        if (rawData) {
          drafts.push(JSON.parse(rawData));
        }
      }
    }
  } catch (e: any) {
    console.error('Error reading local drafts:', e);
    throw e;
  }
  return drafts;
};
