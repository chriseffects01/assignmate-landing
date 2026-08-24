'use client';

import React from 'react';
import { useOnlineStatus } from '@/src/hooks/useOnlineStatus';

import '@/src/styles/workspace/workspace.css';
import { OfflineToggle } from './OfflineToggle';

interface WorkspaceHeaderProps {
  titleValue: string;
  isTitleEditable: boolean;
  onTitleChange: (text: string) => void;
  onToggleTitleEdit: () => Promise<void>;
  assignment: any;
  onToggle?: (checked: boolean) => void;
  isEnabled: boolean;
  // isSaving: boolean;
}
export default function WorkspaceHeader({
  titleValue,
  isTitleEditable,
  onTitleChange,
  onToggleTitleEdit,
  onToggle,
  isEnabled,
}: WorkspaceHeaderProps) {
  const isOnline = useOnlineStatus();

  return (
    <div className="workspace-header">
      <div className="meta-field-wrapper">
        <label className="meta-label">Assignment Title</label>
        <div className="input-action-row">
          <input
            type="text"
            className="meta-inline-input"
            value={titleValue}
            disabled={!isTitleEditable}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onTitleChange(e.target.value)
            }
            name="assignment-coursecode"
          />

          <button
            type="button"
            className={`meta-edit-btn ${isTitleEditable ? 'active-save' : ''}`}
            title="Edit Field"
            onClick={onToggleTitleEdit}
          >
            {isTitleEditable ? '✅' : '✏️'}
          </button>
        </div>
      </div>

      <div className="workspace-status">
        {/* {saveStatus === 'saving' && <span>Saving...</span>}
        {saveStatus === 'saved' && <span>Saved</span>}
        {saveStatus === 'idle' && <span>Idle</span>}

        {!isOnline && <span className="offline">Offline </span>}
        {isOnline && <span className="online">Online</span>} */}

        {onToggle && (
          <OfflineToggle isEnabled={isEnabled} onToggle={onToggle} />
        )}
      </div>
    </div>
  );
}
