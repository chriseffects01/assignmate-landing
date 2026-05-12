export type AssignmentType = {
  id: string;
  _id?: string;
  title: string;
  content: string;
  category: string;
  course: string;
  courseCode: string;
  lecturer?: string;
  createdAt: number;
  updatedAt?: string;
  dueDate?: string;
  level?: number;
  type?: "blank";
  description?: string;
  status: "draft" | "completed";
};

export type TemplateType = {
  id: string;
  _id?: string;
  title: string;
  content: string;
  category: "essay" | "report" | "presentation";
  description: string;
  dueDate?: string;
  level?: number;
  premium?: boolean;
  type?: "template";

  createdAt: number;
  status: "draft";
};
