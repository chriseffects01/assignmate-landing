export type AssignmentType = {
  id: string;
  title: string;
  content: string;
  category: string;
  course: string;
  courseCode: string;
  lecturerName: string;
  createdAt: number;
  status: "draft" | "completed";
};

export type TemplateType = {
  id: string;
  title: string;
  content: string;
  category: string;
  description: string;

  createdAt: number;
  status: "draft";
};
