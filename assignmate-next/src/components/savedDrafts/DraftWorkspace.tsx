'use client';

import '@/src/styles/workspace/workspaceMain.css';
import { useEffect, useState } from 'react';
import OfflineDraft from '@/src/types/draft.types';
import { draftService } from '@/src/services/drafts/draft.service';
import { useParams } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { EmptyState } from '../shared/EmptyState';
import { useNotification } from '@/src/context/NotificationContext';
import LoadingScreen from '../shared/LoadingScreen';
import WorkspaceHeader from '../workspace/WorkspaceHeader';
import WorkspaceEditor from '../workspace/WorkspaceEditor';
import WorkspaceMeta from '../workspace/WorkspaceMeta';
import type { WorkspaceField } from '../workspace/WorkspaceMain';

export default function DraftsWorkspace() {
  const [draft, setDraft] = useState<OfflineDraft | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>(
    'idle'
  );
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

  const [editorContent, setEditorContent] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [values, setValues] = useState<Record<WorkspaceField, string>>({
    course: '',
    lecturer: '',
    title: '',
    dueDate: '',
    courseCode: '',
    level: '',
  });

  const params = useParams();
  const { user } = useAuth();
  const assignmentId = params?.id as string;
  const userId = user?._id;
  const { toast } = useNotification();

  useEffect(() => {
    const load = () => {
      if (!userId) return;

      setIsLoading(true);

      try {
        const data = draftService.get(userId, assignmentId);
        setDraft(data);
      } catch (e: any) {
        console.error('No draft with that id');
        toast.error('No draft with that id');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (saveStatus === 'saved') {
      toast.success('All changes saved ');
    }
  }, [saveStatus]);

  useEffect(() => {
    if (draft) {
      setEditorContent(draft.content);

      setValues({
        course: draft.course || '',
        lecturer: draft.lecturer || '',
        title: draft.title || '',
        dueDate: draft.dueDate || '',
        courseCode: draft.courseCode || '',
        level: draft.level || '',
      });
    }
  }, [draft]);

  const handleToggleEdit = async (field: WorkspaceField): Promise<void> => {
    setIsEditable(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (field: WorkspaceField, text: string): void => {
    setValues(prev => ({ ...prev, [field]: text }));
    setSaveStatus('idle');
  };

  const handleSave = async () => {
    if (isSaving) return;
    if (!userId) return;
    console.log('Dumping data payload:', {
      ...values,
      content: editorContent,
    });

    try {
      setIsSaving(true);
      setSaveStatus('saving');
      await new Promise(resolve => setTimeout(resolve, 1500));
      draftService.save(userId, assignmentId, values, editorContent);

      setSaveStatus('saved');
    } catch (e: any) {
      console.error('Could not save assignment', e);
      toast.error('Error saving assignment');
    } finally {
      setIsSaving(false);
    }
  };

  if (!draft) {
    return (
      <EmptyState
        isOffline={false}
        path=""
        context="Draft with that id"
        contextMessage="No draft with that id was stored locally"
        contextPath="/dashboard/drafts"
      />
    );
  }
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="workspace-layout">
        <aside className="workspace-meta-panel">
          <div className="panel-header">
            <h2 className="panel-title">Draft Settings</h2>
          </div>

          <WorkspaceHeader
            titleValue={values.title}
            isTitleEditable={isEditable.title}
            onTitleChange={text => handleChange('title', text)}
            onToggleTitleEdit={() => handleToggleEdit('title')}
            assignment={draft}
            isEnabled
          />

          <WorkspaceMeta
            values={values}
            isEditable={isEditable}
            onToggleEdit={handleToggleEdit}
            assignment={draft}
            onchange={handleChange}
            isOffline={true}
          />
        </aside>

        <main className="workspace-editor-canvas">
          <WorkspaceEditor
            assignment={draft}
            setSaveStatus={setSaveStatus}
            onSave={handleSave}
            content={editorContent}
            isSaving={isSaving}
            setContent={setEditorContent}
          />
        </main>
      </div>
    </>
  );
}
