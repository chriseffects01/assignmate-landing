import { AssignmentMetadata } from '../types/Workspace.types';
import { CoverPageConfig } from '../types/Workspace.types';

export function generateCoverPageHTML(
  metadata: AssignmentMetadata,
  config: CoverPageConfig
): string {
  if (!config.enabled) return '';

  const {
    fullname,
    faculty,
    department,
    registrationNumber,
    title,
    course,
    courseCode,
    lecturer,
    dueDate,
  } = metadata;

  // 1. Classic style (Traditional centered Academic Layout)
  if (config.style === 'classic') {
    return `
      <div class="cover-page classic-style flex flex-col justify-between h-full p-8 font-serif text-slate-900 border-4 border-double border-slate-300">
        <!-- Top: Faculty & Department -->
        <div class="text-center space-y-2 uppercase tracking-wide">
          ${config.showFaculty && faculty ? `<h3 class="text-lg font-bold">${faculty}</h3>` : ''}
          ${config.showDepartment && department ? `<p class="text-sm font-semibold">${department}</p>` : ''}
        </div>

        <!-- Center: Title & Course Details -->
        <div class="text-center my-auto py-8">
          <h1 class="text-3xl font-extrabold uppercase tracking-wider text-slate-900 mb-4 leading-tight">
            ${title || 'UNTITLED ASSIGNMENT'}
          </h1>
          <p class="text-base font-sans font-medium text-slate-700">
            ${course || ''} ${courseCode ? `(${courseCode})` : ''}
          </p>
        </div>

        <!-- Bottom: Student & Lecturer Metadata -->
        <div class="grid grid-cols-2 gap-8 text-sm font-sans pt-8 border-t border-slate-300">
          <div>
            <p class="text-xs uppercase text-slate-500 font-bold mb-1">Submitted By:</p>
            <p class="font-bold text-slate-800">${fullname || 'Student Name'}</p>
            ${config.showRegNo && registrationNumber ? `<p class="text-xs text-slate-600 font-mono mt-1">Reg No: ${registrationNumber}</p>` : ''}
          </div>

          ${
            config.showLecturer && lecturer
              ? `
            <div class="text-right">
              <p class="text-xs uppercase text-slate-500 font-bold mb-1">Submitted To:</p>
              <p class="font-bold text-slate-800">${lecturer}</p>
            </div>
          `
              : '<div></div>'
          }
        </div>

        <!-- Footer: Due Date -->
        ${
          config.showDueDate && dueDate
            ? `
          <div class="text-center text-xs font-sans text-slate-500 pt-6">
            <span class="font-medium">Date: ${dueDate}</span>
          </div>
        `
            : ''
        }
      </div>
    `;
  }

  // 2. MODERN STYLE (Left-accented Bar with Bold Hierarchy)
  if (config.style === 'modern') {
    return `
      <div class="cover-page modern-style flex flex-col justify-between h-full p-10 font-sans text-slate-900 border-l-8 border-slate-900">
        <!-- Top: Dept / Faculty Badge -->
        <div>
          ${config.showFaculty && faculty ? `<p class="text-xs font-bold uppercase tracking-widest text-slate-500">${faculty}</p>` : ''}
          ${config.showDepartment && department ? `<h4 class="text-sm font-semibold text-slate-700">${department}</h4>` : ''}
        </div>

        <!-- Main Title Section -->
        <div class="my-auto py-12">
          <div class="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded mb-4">
            ${course || 'ASSIGNMENT'} ${courseCode ? `• ${courseCode}` : ''}
          </div>
          <h1 class="text-4xl font-black text-slate-900 leading-tight mb-2">
            ${title || 'UNTITLED ASSIGNMENT'}
          </h1>
        </div>

        <!-- Footer Metadata Block -->
        <div class="space-y-6 pt-6 border-t border-slate-200">
          <div class="flex justify-between items-end">
            <div>
              <p class="text-xs uppercase tracking-wider text-slate-400 font-bold">Author</p>
              <p class="text-base font-bold text-slate-900">${fullname || 'Student Name'}</p>
              ${config.showRegNo && registrationNumber ? `<p class="text-xs text-slate-500 font-mono">${registrationNumber}</p>` : ''}
            </div>

            ${
              config.showLecturer && lecturer
                ? `
              <div class="text-right">
                <p class="text-xs uppercase tracking-wider text-slate-400 font-bold">Supervisor / Lecturer</p>
                <p class="text-base font-bold text-slate-900">${lecturer}</p>
              </div>
            `
                : ''
            }
          </div>

          ${
            config.showDueDate && dueDate
              ? `
            <div class="text-xs text-slate-400 font-medium pt-2">
              Submission Date: <span class="text-slate-700 font-semibold">${dueDate}</span>
            </div>
          `
              : ''
          }
        </div>
      </div>
    `;
  }

  // 3. MINIMAL STYLE (Clean, Lightweight & Centered)
  return `
    <div class="cover-page minimal-style flex flex-col justify-center items-center h-full p-12 font-sans text-slate-900 text-center">
      <div class="max-w-md w-full space-y-8">
        <!-- Course Tag -->
        ${course ? `<span class="text-xs uppercase tracking-widest font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">${course}</span>` : ''}

        <!-- Big Title -->
        <div>
          <h1 class="text-3xl font-bold text-slate-900 mb-2">${title || 'UNTITLED ASSIGNMENT'}</h1>
          ${courseCode ? `<p class="text-sm text-slate-500">${courseCode}</p>` : ''}
        </div>

        <div class="w-12 h-1 bg-slate-200 mx-auto rounded-full"></div>

        <!-- Student & Supervisor Info -->
        <div class="space-y-3 text-sm">
          <div>
            <p class="font-semibold text-slate-800">${fullname || 'Student Name'}</p>
            ${config.showRegNo && registrationNumber ? `<p class="text-xs text-slate-500 font-mono">${registrationNumber}</p>` : ''}
          </div>

          ${
            config.showFaculty || config.showDepartment
              ? `
            <div class="text-xs text-slate-400">
              ${config.showDepartment && department ? `<span>${department}</span>` : ''}
              ${config.showFaculty && faculty ? `<span>${department ? ' • ' : ''}${faculty}</span>` : ''}
            </div>
          `
              : ''
          }

          ${
            config.showLecturer && lecturer
              ? `
            <p class="text-xs text-slate-500">Lecturer: <strong class="text-slate-700">${lecturer}</strong></p>
          `
              : ''
          }
        </div>

        ${
          config.showDueDate && dueDate
            ? `
          <p class="text-xs text-slate-400 pt-4">${dueDate}</p>
        `
            : ''
        }
      </div>
    </div>
  `;
}
