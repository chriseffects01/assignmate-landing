'use client';

import '@/src/styles/workspace/workspaceMain.css';
import { useParams } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { getAssignmentById } from '@/src/services/assignmentService';
import WorkspaceEditor from './WorkspaceEditor';
import WorkspaceHeader from './WorkspaceHeader';
import Notification from '../shared/Notification';
import WorkspaceMeta from './WorkspaceMeta';
import { updateAssignmentAPI } from '@/src/services/assignmentService';
import LoadingScreen from '../shared/LoadingScreen';
import { ASSIGNMENTSkEY, MAX_FREE_DRAFTS } from '@/src/var/var';
import {
  removeDraftFromLocal,
  saveDraftToLocal,
  getAllLocalDrafts,
} from '@/src/services/offlineDrafts';
import getAssignmentId from '@/src/lib/getAssignmentId';

import { useAuth } from '@/src/context/AuthContext';
export type WorkspaceField =
  | 'course'
  | 'lecturer'
  | 'title'
  | 'courseCode'
  | 'level'
  | 'dueDate';

export default function WorkspaceMain() {
  ///////////////////////

  const [isEditable, setIsEditable] = useState<Record<WorkspaceField, boolean>>(
    {
      course: false,
      lecturer: false,
      title: false,
      dueDate: false,
      courseCode: false,
      level: false,
    }
  );
  const [notification, setNotification] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>(
    'idle'
  );
  const [assignment, setAssignments] = useState<any>(null);
  const [editorContent, setEditorContent] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isOfflineSyncEnabled, setIsOfflineSyncEnabled] =
    useState<boolean>(false);
  const [values, setValues] = useState<Record<WorkspaceField, string>>({
    course: '',
    lecturer: '',
    title: '',
    dueDate: '',
    courseCode: '',
    level: '',
    //
  });
  const { user } = useAuth();
  const userId = user?._id;

  const params = useParams();
  const id = params?.id as string;
  useEffect(() => {
    if (saveStatus === 'saved') {
      setNotification('All changes saved');

      setTimeout(() => {
        setNotification('');
      }, 2000);
    }
  }, [saveStatus]);

  useEffect(() => {
    if (id && userId) {
      console.log(userId, id);
      const hasExistingBackup = localStorage.getItem(
        `${ASSIGNMENTSkEY}${userId}_${id}`
      );
      console.log(hasExistingBackup);
      if (hasExistingBackup) {
        setIsOfflineSyncEnabled(true);
      } else {
        setIsOfflineSyncEnabled(false);
      }
    }
  }, [id, userId]);

  useEffect(() => {
    if (id && userId) {
      if (isOfflineSyncEnabled) {
        saveDraftToLocal(userId, id, values, editorContent);
      } else {
        removeDraftFromLocal(userId, id);
      }
    }
  }, [editorContent, values, isOfflineSyncEnabled, id, userId]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;

      try {
        setIsLoading(true);
        const data = await getAssignmentById(id);

        setAssignments(data);
      } catch (err) {
        console.error(`Workspace mount crash:`, err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [id]);

  useEffect(() => {
    if (assignment) {
      setEditorContent(assignment.content);

      setValues({
        course: assignment.course || '',
        lecturer: assignment.lecturer || '',
        title: assignment.title || '',
        dueDate: assignment.dueDate || '',
        courseCode: assignment.courseCode || '',
        level: assignment.level || '',
      });
    }
  }, [assignment]);

  const handleSave = async () => {
    if (isSaving) return;
    console.log('Dumping data payload:', {
      ...values,
      content: editorContent,
    });
    try {
      setIsSaving(true);
      setSaveStatus('saving');

      await new Promise(resolve => setTimeout(resolve, 1500));
      await updateAssignmentAPI(id, {
        ...values,
        content: editorContent,
      });
      setSaveStatus('saved');
    } catch (e: any) {
      console.error('Error saving assignment:', e);
      setSaveStatus('idle');
    } finally {
      setIsSaving(false);
    }
  };

  const handleOfflineToggle = (checked: boolean) => {
    if (checked === isOfflineSyncEnabled) return;

    if (checked && userId) {
      const currentDrafts = getAllLocalDrafts(userId);
      const isAlreadySavedLocally = currentDrafts.some(
        draft => getAssignmentId(draft) === id
      );

      if (
        !isAlreadySavedLocally &&
        currentDrafts.length > MAX_FREE_DRAFTS &&
        userId
      ) {
        alert('Maximum offline assignments reached');
        return;
      }

      saveDraftToLocal(userId, id, values, editorContent);
      setIsOfflineSyncEnabled(true);
    } else {
      if (userId) {
        removeDraftFromLocal(userId, id);
        setIsOfflineSyncEnabled(false);
      }
    }
  };

  if (isLoading) {
    return <LoadingScreen message="Loading your workspace..." />;
  }

  if (!assignment) {
    return <LoadingScreen />;
  }

  //////////////////////////////////////////////***************************8 */

  // Initially blank state for edits

  const handleToggleEdit = async (field: WorkspaceField): Promise<void> => {
    setIsEditable(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (field: WorkspaceField, text: string): void => {
    setValues(prev => ({ ...prev, [field]: [text] }));
    setSaveStatus('idle');
  };

  return (
    <>
      {notification && <Notification message={notification} />}
      <div className="workspace-layout">
        <aside className="workspace-meta-panel">
          <div className="panel-header">
            <h2 className="panel-title">Assignment Settings</h2>
          </div>

          <WorkspaceHeader
            titleValue={values.title}
            isTitleEditable={isEditable.title}
            onTitleChange={text => handleChange('title', text)}
            onToggleTitleEdit={() => handleToggleEdit('title')}
            assignment={assignment}
            saveStatus={saveStatus}
            onToggle={handleOfflineToggle}
            isEnabled={isOfflineSyncEnabled}
          />

          <WorkspaceMeta
            values={values}
            isEditable={isEditable}
            onchange={handleChange}
            onToggleEdit={handleToggleEdit}
            assignment={assignment}
          />
        </aside>

        <main className="workspace-editor-canvas">
          <WorkspaceEditor
            assignment={assignment}
            setSaveStatus={setSaveStatus}
            onSave={handleSave}
            isSaving={isSaving}
            content={editorContent}
            setContent={setEditorContent}
          />
        </main>
      </div>
    </>
  );
}
