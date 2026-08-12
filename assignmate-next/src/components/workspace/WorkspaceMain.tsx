'use client';

import '@/src/styles/workspace/workspaceMain.css';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useNotification } from '@/src/context/NotificationContext';
import { getAssignmentById } from '@/src/services/assignmentService';
import WorkspaceEditor from './WorkspaceEditor';
import WorkspaceHeader from './WorkspaceHeader';
import WorkspaceMeta from './WorkspaceMeta';
import { updateAssignmentAPI } from '@/src/services/assignmentService';
import LoadingScreen from '../shared/LoadingScreen';
import { draftService } from '@/src/services/drafts/draft.service';
import { useRouter } from 'next/navigation';
import { handleOfflineError } from '@/src/utils/handleOfflineError';
import { ReconnectOverlay } from '../shared/ReconnectOverlay';
import { useAuth } from '@/src/context/AuthContext';
import { OfflineError } from '@/src/errors/appError';
import { EmptyState } from '../shared/EmptyState';

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
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>(
    'idle'
  );
  const [assignment, setAssignments] = useState<any>(null);
  const [editorContent, setEditorContent] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isOfflineSyncEnabled, setIsOfflineSyncEnabled] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [values, setValues] = useState<Record<WorkspaceField, string>>({
    course: '',
    lecturer: '',
    title: '',
    dueDate: '',
    courseCode: '',
    level: '',
    //
  });
  const { user, isOffline } = useAuth();
  const userId = user?._id;
  const { toast, confirm, closeConfirm } = useNotification();
  const router = useRouter();

  const params = useParams();
  const id = params?.id as string;
  useEffect(() => {
    if (saveStatus === 'saved') {
      toast.success('All changes saved ');
    }
  }, [saveStatus]);

  const handleOfflineToggle = (checked: boolean) => {
    if (checked === isOfflineSyncEnabled) return;
    if (!userId) return;

    if (checked) {
      if (!draftService.canSave(userId, id)) {
        alert('Maximum offline assignments reached');
        return;
      }
      toast.success('Saved for offline usage');

      draftService.save(userId, id, values, editorContent);
    } else {
      toast.info('Removed from offline backup');
      draftService.remove(userId, id);
    }

    setIsOfflineSyncEnabled(checked);
  };

  useEffect(() => {
    if (!userId) return;
    if (!id) return;

    setIsOfflineSyncEnabled(draftService.exists(userId, id));
  }, [id, userId]);

  useEffect(() => {
    if (!userId || !id || !isOfflineSyncEnabled) return;

    draftService.save(userId, id, values, editorContent);
  }, [editorContent, values, isOfflineSyncEnabled, id, userId]);

  const loadAssignment = async () => {
    const data = await getAssignmentById(id);

    setAssignments(data);
  };

  useEffect(() => {
    async function load() {
      if (!id) return;

      try {
        setIsLoading(true);
        const data = await getAssignmentById(id);

        setAssignments(data);
      } catch (err: any) {
        handleOfflineError({
          err,
          OfflineErrorClass: OfflineError,
          confirm,
          toast,
          router,
          setIsRetrying,
          onRetry: loadAssignment,

          message:
            "This assignment can't be loaded. Continue using your offline drafts.",
          closeModal: closeConfirm,
        });
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

  const handleToggleEdit = async (field: WorkspaceField): Promise<void> => {
    setIsEditable(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (field: WorkspaceField, text: string): void => {
    setValues(prev => ({ ...prev, [field]: text }));
    setSaveStatus('idle');
  };

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
      toast.error('Could not save assignment.');
      setSaveStatus('idle');
    } finally {
      setIsSaving(false);
    }
  };

  if (isRetrying) {
    return <ReconnectOverlay />;
  }

  if (isLoading) {
    return <LoadingScreen message="Loading your workspace..." />;
  }

  if (isOffline) {
    return (
      <EmptyState
        isOffline={isOffline}
        path="/dashboard/drafts"
        toast={toast}
        onRetry={loadAssignment}
        title="Can't Reach Assignment"
        pathText="Drafts"
        message="You are currently offline and cannot connect to our Assignmate servers. Check your connection or continue working from your offline drafts "
      />
    );
  }

  if (!assignment) {
    return (
      <EmptyState
        isOffline={isOffline}
        path="/dashboard/assignments"
        context="Assignment"
        contextMessage="No assignment with that id found"
        contextPath="/dashboard/assignments"
      />
    );
  }

  //////////////////////////////////////////////***************************8 */

  // Initially blank state for edits

  return (
    <>
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
