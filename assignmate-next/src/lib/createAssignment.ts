import { Template } from "@/src/data/templates";
import { AssignmentType, TemplateType } from "@/src/types/assignment";

// ************************************* TEMPLATE CREATION ********************************** //

// CREATING ASSIGNMENT FROM TEMPLATE
//  FUNCTION TAKES IN TEMPLATE  TYPE AND RETURNS ASSIGNMENT TYPE
export function createAssignmentFromTemplate(
  template: TemplateType,
): AssignmentType {
  // CONVERSION ENDPOINT
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
