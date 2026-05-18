import { Template } from "@/src/data/templates";
import { AssignmentType, TemplateType } from "@/src/types/assignment";

export function createAssignmentFromTemplate(
  template: TemplateType,
): AssignmentType {
  return {
    _id: template._id,
    title: template.title,
    content: "",
    description: template.category,
    category: template.category,
    createdAt: Date.now(),
    status: "draft",
    course: "",
    courseCode: "",
  };
}
