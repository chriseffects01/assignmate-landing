import { AssignmentMetadata } from './Workspace.types';

export interface OfflineDraft {
  _id: string;
  metadata: AssignmentMetadata;
  type: string;
  category: string;
  content: string[];
  lastSavedLocally: string;
}
