export interface AssignmentMetadata {
  fullname: string;
  faculty: string;
  department: string;
  registrationNumber: string;
  title: string;
  course: string;
  courseCode: string;
  lecturer: string;
  dueDate: string;
}

export interface Assignment {
  _id: string;
  category: string;
  createdAt: number;
  updatedAt?: string;
  level?: string;
  type?: 'blank';
  description?: string;
  status: 'draft' | 'completed';
}

export interface WorkspaceData {
  assignment: Assignment;
  metadata: AssignmentMetadata;
  content: string[];
}

export interface UserProfileData {
  fullname: string;
  department: string;
  faculty: string;
  registrationNumber: string;
}

export const createInitialMetadara = (
  existingMeta?: Partial<AssignmentMetadata>,
  user?: Partial<UserProfileData> | null
): AssignmentMetadata => {
  return {
    fullname: existingMeta?.fullname || user?.fullname || '',
    department: existingMeta?.department || user?.department || '',
    faculty: existingMeta?.faculty || user?.faculty || '',
    registrationNumber:
      existingMeta?.registrationNumber || user?.registrationNumber || '',
    title: existingMeta?.title || '',
    course: existingMeta?.course || '',
    courseCode: existingMeta?.courseCode || '',
    lecturer: existingMeta?.lecturer || '',
    dueDate: existingMeta?.dueDate || '',
  };
};

export type CoverPageStyle = 'classic' | 'modern' | 'minimal';

export interface CoverPageConfig {
  enabled: boolean;
  style: CoverPageStyle;
  showFaculty: boolean;
  showDepartment: boolean;
  showLecturer: boolean;
  showRegNo: boolean;
  showDueDate: boolean;
}
