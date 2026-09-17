import { AssignmentMetadata } from './Workspace.types';

export type AssignmentType = {
  _id: string;
  metadata: AssignmentMetadata;
  content: string[];
  category: string;
  type?: 'blank';
  description?: string;
  updatedAt?: string;
  createdAt?: string;
  status: 'draft' | 'completed';
};

export type TemplateType = {
  _id: string;
  title: string;
  content: string;
  category: 'essay' | 'report' | 'presentation';
  description: string;
  dueDate?: string;
  premium?: boolean;
  type?: 'template';
  createdAt: number;
  status: 'draft';
};
