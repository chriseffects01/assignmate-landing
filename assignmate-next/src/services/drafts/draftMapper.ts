import { OfflineDraft } from '@/src/types/draft.types';
import { AssignmentMetadata } from '@/src/types/Workspace.types';
export const createofflinedraft = (
  id: string,
  metadata: AssignmentMetadata,
  content: string[],
  draft?: OfflineDraft
): OfflineDraft => ({
  _id: id,
  content: content,
  metadata: metadata,
  category: draft?.category || '',
  type: 'blank',
  lastSavedLocally: new Date().toISOString(),
});
