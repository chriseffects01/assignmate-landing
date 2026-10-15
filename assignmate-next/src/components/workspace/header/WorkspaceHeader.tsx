import React from 'react';
import { PanelLeftClose, PanelLeft, CheckCircle2, Trash2 } from 'lucide-react';

interface WorkspaceHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  saveStatus: 'saving' | 'saved' | 'idle';
  isSaving: boolean;
  onSave: () => void;
  onFinish: () => void;
  onDelete: () => void;
}

export const WorskpaceHeader: React.FC<WorkspaceHeaderProps> = ({
  isSidebarOpen,
  onToggleSidebar,
  saveStatus,
  isSaving,
  onSave,
  onDelete,
  onFinish,
}) => {
  return (
    <header className="flex h-14 w-full shrink-0 items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-4 backdrop-blur-xl z-10">
      {/* Sidebar Toggle */}
      <button
        type="button"
        onClick={onToggleSidebar}
        className="hidden md:flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-800/70 hover:text-slate-200 cursor-pointer"
        title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {isSidebarOpen ? <PanelLeftClose size={17} /> : <PanelLeft size={17} />}

        <span>{isSidebarOpen ? 'Hide Details' : 'Show Details'}</span>
      </button>

      {/* Right Actions */}
      <div className="ml-auto flex items-center gap-2.5">
        {/* Save Status */}
        <div className="mr-1 flex items-center gap-1.5 text-xs text-slate-500">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              saveStatus === 'saving'
                ? 'bg-amber-400'
                : saveStatus === 'saved'
                  ? 'bg-emerald-400'
                  : 'bg-slate-500'
            }`}
          />

          <span>
            {saveStatus === 'saving'
              ? 'Saving...'
              : saveStatus === 'saved'
                ? 'Saved'
                : 'Unsaved changes'}
          </span>
        </div>

        {/* Save */}
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="rounded-md bg-blue-600 px-3.5 py-1.5 text-xs font-medium text-white transition-all hover:bg-blue-500 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>

        <div className="mx-1 h-5 w-px bg-slate-800" />

        {/* Finish */}
        <button
          type="button"
          onClick={onFinish}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/10 hover:text-emerald-300 cursor-pointer"
        >
          <CheckCircle2 size={14} />
          <span>Finish</span>
        </button>

        {/* Delete */}
        <button
          type="button"
          onClick={onDelete}
          className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-rose-500/10 hover:text-rose-400 cursor-pointer"
          title="Delete Assignment"
          aria-label="Delete Assignment"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </header>
  );
};
