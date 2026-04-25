import { Template } from "@/src/data/templates";
import { AssignmentType, TemplateType } from "@/src/types/assignment";

export function createAssignmentFromTemplate(template: Template): TemplateType {
  return {
    id: template.id,
    title: template.title,
    content: "",
    description: template.category,
    category: template.category,
    createdAt: Date.now(),
    status: "draft",
  };
}
