import { TemplateType } from '../types/assignment';

export type TemplateCategory = 'essay' | 'report' | 'lab' | 'presentation';

//*********************************** Type template will be initialised and used as data in tsx *****************************************

//***********************Fake data in usage**************************
// **************************************** REAL DATA WOULD BE HANDLED LATER ********************************//
export const templates: TemplateType[] = [
  {
    _id: crypto.randomUUID(),
    title: 'Essay Template',
    description: 'Introducion',
    category: 'essay',
    content: '',
    createdAt: Date.now(),
    status: 'draft',
  },
  {
    _id: crypto.randomUUID(),
    title: 'Report Template',
    description: 'Well-structured academic report format',
    category: 'report',
    content: '',
    createdAt: Date.now(),
    status: 'draft',
  },
  {
    _id: crypto.randomUUID(),
    title: 'Lab Report',
    description: 'Hypothesis, method, results',
    category: 'report',
    premium: true,
    content: '',
    createdAt: Date.now(),
    status: 'draft',
  },
  {
    _id: crypto.randomUUID(),
    title: 'Lab Report',
    description: 'Slide-by-slide structured breakdown',
    category: 'presentation',
    premium: true,
    content: '',
    createdAt: Date.now(),
    status: 'draft',
  },
  {
    _id: crypto.randomUUID(),
    title: 'Clinical template ',
    description: 'Simple templates for all assignments',
    category: 'presentation',
    premium: false,
    content: '',
    createdAt: Date.now(),
    status: 'draft',
  },
];
