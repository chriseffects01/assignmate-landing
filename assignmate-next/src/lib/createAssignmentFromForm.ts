import { AssignmentType } from "../types/assignment";

type FormData = {
  courseCode: string;
  course: string;
  lecturer: string;
  title: string;
  category: string;
};

export function CreateAssignmentFromForm(data: FormData): AssignmentType {
  return {
    courseCode: data.courseCode,
    title: data.title,
    lecturerName: data.lecturer,
    course: data.course,
    id: crypto.randomUUID(),
    content: "",
    category: data.category,
    createdAt: Date.now(),
    status: "draft",
  };
}
