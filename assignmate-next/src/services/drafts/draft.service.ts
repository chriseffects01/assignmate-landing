import {
  saveDraftToLocal,
  removeDraftFromLocal,
  getAllLocalDrafts,
} from './draftStorage';

import { MAX_FREE_DRAFTS } from '@/src/var/var';

import { getDraftStorageKey } from './draftKeys';

export const draftService = {
  save(userId: string, id: string, fields: any, content: string[]) {
    saveDraftToLocal(userId, id, fields, content);
  },

  remove(userId: string, id: string) {
    removeDraftFromLocal(userId, id);
  },

  getAll(userId: string) {
    return getAllLocalDrafts(userId);
  },

  exists(userId: string, id: string) {
    const key = getDraftStorageKey(userId, id);
    return !!localStorage.getItem(key);
  },

  count(userId: string) {
    return this.getAll(userId).length;
  },

  get(userId: string, id: string) {
    return this.getAll(userId).find(draft => draft._id === id);
  },

  canSave(userId: string, assignmentid: string) {
    const drafts = this.getAll(userId);

    const exists = drafts.some(draft => draft._id === assignmentid);
    if (exists) return true;

    return drafts.length < MAX_FREE_DRAFTS;
  },
};
