export type TemplateCategory = "essay" | "report" | "lab" | "presentation";

//*********************************** Type template will be initialised and used as data in tsx *****************************************

export type Template = {
  id: string;
  title: string;
  description: string;
  category: TemplateCategory;
  premium?: boolean;
};

//***********************Fake data in usage**************************
// **************************************** REAL DATA WOULD BE HANDLED LATER ********************************//
export const templates: Template[] = [
  {
    id: "essay-basic",
    title: "Essay Template",
    description: "Introducion",
    category: "essay",
    premium: false,
  },
  {
    id: "report-standard",
    title: "Report Template",
    description: "Well-structured academic report format",
    category: "report",
    premium: false,
  },
  {
    id: "lab-science",
    title: "Lab Report",
    description: "Hypothesis, methid, results",
    category: "report",
    premium: true,
  },
  {
    id: "presentation-outline",
    title: "Lab report",
    description: "Slide-by-slide structured breakdown",
    category: "presentation",
    premium: true,
  },
];
