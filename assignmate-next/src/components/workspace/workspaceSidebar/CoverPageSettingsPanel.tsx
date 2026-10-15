import React, { useState } from 'react';
import { CoverPageConfig, CoverPageStyle } from '@/src/types/Workspace.types';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  config: CoverPageConfig;
  onChange: (updatedConfig: CoverPageConfig) => void;
}

export const CoverPageSettingsPanel: React.FC<Props> = ({
  config,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleField = (key: keyof CoverPageConfig) => {
    onChange({ ...config, [key]: !config[key] });
  };

  return (
    <div className="border border-slate-800 bg-slate-900/50 rounded-lg overflow-hidden transition-all">
      {/* Header Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full flex items-center justify-between p-3 text-xs font-semibold text-slate-300 hover:bg-slate-800/60 transition-colors"
      >
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-emerald-400" />
          <span>Cover Page Settings</span>
        </div>
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="p-3 border-t border-slate-800 space-y-4 text-xs">
          {/* Main Enable Switch */}
          <label className="flex items-center justify-between cursor-pointer font-medium text-slate-200">
            <span>Include Cover Page</span>
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={e => onChange({ ...config, enabled: e.target.checked })}
              className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
            />
          </label>

          {config.enabled && (
            <div className="space-y-3 pt-2 border-t border-slate-800/60">
              {/* Style Selector */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Style Layout
                </label>
                <select
                  value={config.style}
                  onChange={e =>
                    onChange({
                      ...config,
                      style: e.target.value as CoverPageStyle,
                    })
                  }
                  className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded px-2.5 py-1.5 outline-none focus:border-emerald-500"
                >
                  <option value="classic">Classic (Double Border)</option>
                  <option value="modern">Modern (Bold Left Bar)</option>
                  <option value="minimal">Minimal (Clean Centered)</option>
                </select>
              </div>

              {/* Show/Hide Toggles */}
              <div className="space-y-2 pt-1 text-slate-300">
                <span className="block text-[10px] uppercase tracking-wider font-bold text-slate-500">
                  Visible Fields
                </span>

                <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={config.showRegNo}
                    onChange={() => toggleField('showRegNo')}
                    className="accent-emerald-500 rounded"
                  />
                  <span>Registration / Matric No</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={config.showFaculty}
                    onChange={() => toggleField('showFaculty')}
                    className="accent-emerald-500 rounded"
                  />
                  <span>Faculty</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={config.showDepartment}
                    onChange={() => toggleField('showDepartment')}
                    className="accent-emerald-500 rounded"
                  />
                  <span>Department</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={config.showLecturer}
                    onChange={() => toggleField('showLecturer')}
                    className="accent-emerald-500 rounded"
                  />
                  <span>Lecturer / Supervisor</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={config.showDueDate}
                    onChange={() => toggleField('showDueDate')}
                    className="accent-emerald-500 rounded"
                  />
                  <span>Due Date</span>
                </label>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
