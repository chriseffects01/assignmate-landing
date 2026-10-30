'use client';

import React, { useState } from 'react';
import {
  AssignmentMetadata,
  Assignment,
  CoverPageConfig,
} from '@/src/types/Workspace.types';
import WorkspaceAiAssistant from './WorkspaceAi';
import { Pencil, Check, Wifi, WifiOff } from 'lucide-react';
import { CoverPageSettingsPanel } from './CoverPageSettingsPanel';

interface SidebarProps {
  metadata: AssignmentMetadata;
  assignment?: Assignment;
  onMetaChange: (key: keyof AssignmentMetadata, value: string) => void;
  isEditable: Record<keyof AssignmentMetadata, boolean>;
  onToggleEdit: (key: keyof AssignmentMetadata) => void;
  isEnabled?: boolean;
  onToggleOffline?: (checked: boolean) => void;
  isOffline?: boolean;
  coverPageConfig: CoverPageConfig;
  setCoverPageConfig: (config: CoverPageConfig) => void;
  isPageIndexActive: boolean;
  setIsPageIndexActive: (checked: any) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  metadata,
  onMetaChange,
  isEditable,
  onToggleEdit,
  isEnabled = false,
  onToggleOffline,
  isOffline = false,
  coverPageConfig,
  setCoverPageConfig,
  isPageIndexActive,
  setIsPageIndexActive,
}) => {
  // All fields directly map to keyof AssignmentMetadata

  const fields: {
    key: keyof AssignmentMetadata;
    label: string;
    placeholder: string;
  }[] = [
    {
      key: 'title',
      label: 'Assignment Title',
      placeholder: 'e.g. Intro to Data Structures',
    },
    {
      key: 'course',
      label: 'Course Title',
      placeholder: 'e.g. Computer Science II',
    },
    { key: 'courseCode', label: 'Course Code', placeholder: 'e.g. CSC 201' },
    { key: 'fullname', label: 'Student Name', placeholder: 'e.g. John Doe' },
    {
      key: 'registrationNumber',
      label: 'Reg / Matric No.',
      placeholder: 'e.g. 2021/245890',
    },
    {
      key: 'department',
      label: 'Department',
      placeholder: 'e.g. Computer Science',
    },
    { key: 'faculty', label: 'Faculty', placeholder: 'e.g. Physical Sciences' },
    { key: 'lecturer', label: 'Lecturer', placeholder: 'e.g. Dr. Smith' },
    { key: 'dueDate', label: 'Due Date', placeholder: 'YYYY-MM-DD' },
  ];

  return (
    <div className="w-full p-2 space-y-10 text-sm text-slate-100">
      {/* Header & Offline Sync Toggle */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-white">
          Assignment Metadata
        </h3>
        {onToggleOffline && (
          <button
            type="button"
            onClick={() => onToggleOffline(!isEnabled)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              isEnabled
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200'
            }`}
            title="Toggle offline sync"
          >
            {isEnabled ? <Wifi size={12} /> : <WifiOff size={12} />}
            <span>{isEnabled ? 'Offline On' : 'Offline Off'}</span>
          </button>
        )}
      </div>

      {/* Every Metadata Field Editable with Dynamic Icons */}
      <div className="space-y-4">
        {fields.map(({ key, label, placeholder }) => {
          const editable = isEditable?.[key] ?? false;
          return (
            <div key={key} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor={key}
                  className="text-xs font-semibold text-white"
                >
                  {label}
                </label>
                <button
                  type="button"
                  onClick={() => onToggleEdit(key)}
                  className="text-slate-400 hover:text-blue-400 transition-colors p-0.5 cursor-pointer"
                  title={editable ? 'Save field' : 'Edit field'}
                >
                  {editable ? (
                    <Check size={14} className="text-emerald-400" />
                  ) : (
                    <Pencil size={13} />
                  )}
                </button>
              </div>

              <input
                id={key}
                name={key}
                type={key === 'dueDate' ? 'date' : 'text'}
                disabled={!editable}
                value={metadata[key] || ''}
                placeholder={placeholder}
                onChange={e => onMetaChange(key, e.target.value)}
                className={`w-full rounded-md px-3 py-2 text-sm transition-all focus:outline-none ${
                  editable
                    ? 'border border-blue-500/50 bg-slate-800 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/30'
                    : 'border border-slate-800/60 bg-slate-900/40 text-slate-300 opacity-85'
                }`}
              />
            </div>
          );
        })}

        {!isOffline && (
          <CoverPageSettingsPanel
            config={coverPageConfig}
            onChange={setCoverPageConfig}
          />
        )}

        {!isOffline && (
          <label className="flex items-center gap-2 text-slate-300 cursor-pointer hover:text-white">
            <input
              type="checkbox"
              checked={isPageIndexActive}
              onChange={() => setIsPageIndexActive((prev: boolean) => !prev)}
              className="accent-emerald-500 rounded"
            />
            <span>Show Page Index</span>
          </label>
        )}
      </div>

      {/* AI Assistant directly inside the Sidebar */}
      {!isOffline && (
        <div className="border-t border-slate-800 pt-5">
          <WorkspaceAiAssistant />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
