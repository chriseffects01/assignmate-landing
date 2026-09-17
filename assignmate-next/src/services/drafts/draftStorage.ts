import { OfflineDraft } from '@/src/types/draft.types';

import { getDraftStorageKey, getUserPrefix } from './draftKeys';
import { createofflinedraft } from './draftMapper';
import { AssignmentMetadata } from '@/src/types/Workspace.types';

export const saveDraftToLocal = (
  userId: string,
  id: string,
  fields: AssignmentMetadata,
  content: string[]
) => {
  const draft = createofflinedraft(id, fields, content);

  const key = getDraftStorageKey(userId, id);

  localStorage.setItem(key, JSON.stringify(draft));
};

export const removeDraftFromLocal = (userId: string, id: string) => {
  localStorage.removeItem(getDraftStorageKey(userId, id));
};

export const getAllLocalDrafts = (userId: string) => {
  const drafts: OfflineDraft[] = [];

  const prefix = getUserPrefix(userId);

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith(prefix)) continue;

    const item = localStorage.getItem(key);

    if (item) {
      drafts.push(JSON.parse(item));
    }
  }
  return drafts;
};
