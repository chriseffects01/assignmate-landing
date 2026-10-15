'use client';

import '@/src/styles/workspace/workspaceMain.css';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useNotification } from '@/src/context/NotificationContext';
import { getAssignmentById } from '@/src/services/assignmentService';
import { WorkspaceEditor } from './editor/WorkspaceEditor';
import {
  updateAssignmentAPI,
  updateAssignmentStatusAPI,
} from '@/src/services/assignmentService';
import LoadingScreen from '../shared/LoadingScreen';
import { draftService as draft } from '@/src/services/drafts/draft.service';
import { useRouter } from 'next/navigation';
import { handleOfflineError } from '@/src/utils/handleOfflineError';
import { ReconnectOverlay } from '../shared/ReconnectOverlay';
import { useAuth } from '@/src/context/AuthContext';
import { OfflineError } from '@/src/errors/appError';
import { EmptyState } from '../shared/EmptyState';
import { Settings, FileText } from 'lucide-react';
import {
  AssignmentMetadata,
  CoverPageConfig,
  createInitialMetadara,
} from '@/src/types/Workspace.types';
import Sidebar from '@/src/components/workspace/workspaceSidebar/Sidebar';
import { AssignmentType } from '@/src/types/assignment';
import { getUserFullname } from '@/src/lib/fullname';
import { WorskpaceHeader } from './header/WorkspaceHeader';
import { AssignmentPreviewModal } from './preview/AssignmentPreviewModal';
import { handleDeleteAssignment } from '@/src/lib/deleteAssignment';

export type WorkspaceField = keyof AssignmentMetadata;

export default function WorkspaceMain() {
  const [isEditable, setIsEditable] = useState<Record<WorkspaceField, boolean>>(
    {
      fullname: false,
      faculty: false,
      department: false,
      registrationNumber: false,
      course: false,
      lecturer: false,
      title: false,
      dueDate: false,
      courseCode: false,
    }
  );
  const [isPageIndexActive, setIsPageIndexActive] = useState(true);

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>(
    'idle'
  );
  const [assignment, setAssignments] = useState<AssignmentType | null>(null);
  const [editorContent, setEditorContent] = useState<string[]>(['']);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isOfflineSyncEnabled, setIsOfflineSyncEnabled] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [coverPageConfig, setCoverPageConfig] = useState<CoverPageConfig>({
    enabled: true,
    style: 'classic',
    showFaculty: true,
    showLecturer: true,
    showDepartment: true,
    showDueDate: true,
    showRegNo: true,
  });

  const { user, isOffline } = useAuth();
  const [metadata, setMetadata] = useState<AssignmentMetadata>(() =>
    createInitialMetadara({}, user)
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileTab, setMobileTab] = useState<'editor' | 'meta'>('editor');

  const userId = user?._id;
  const { toast, confirm, closeConfirm } = useNotification();
  const router = useRouter();

  const fullName = getUserFullname();

  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    if (saveStatus === 'saved') {
      toast.success('All changes saved ');
    }
  }, [saveStatus]);

  const handleMetaChange = (key: keyof AssignmentMetadata, value: string) => {
    setMetadata(prev => ({ ...prev, [key]: value }));
  };

  const handleToggleEdit = (key: keyof AssignmentMetadata) => {
    setIsEditable(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
    setSaveStatus('idle');
  };

  const handleOfflineToggle = (checked: boolean) => {
    if (checked === isOfflineSyncEnabled) return;
    if (!userId) return;

    if (checked) {
      if (!draft.canSave(userId, id)) {
        toast.info('Maximum offline assignments reached');
        return;
      }
      toast.success('Saved for offline usage');

      draft.save(userId, id, metadata, editorContent);
    } else {
      toast.info('Removed from offline backup');
      draft.remove(userId, id);
    }

    setIsOfflineSyncEnabled(checked);
  };

  useEffect(() => {
    if (!userId) return;
    if (!id) return;

    setIsOfflineSyncEnabled(draft.exists(userId, id));
  }, [id, userId]);

  useEffect(() => {
    if (!userId || !id || !isOfflineSyncEnabled) return;

    draft.save(userId, id, metadata, editorContent);
  }, [editorContent, metadata, isOfflineSyncEnabled, id, userId]);

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
      if (Array.isArray(assignment.content) && assignment.content.length > 0) {
        setEditorContent(assignment.content);
      } else {
        setEditorContent(['']);
      }

      setMetadata({
        fullname: assignment.metadata.fullname || fullName,
        faculty: assignment.metadata.faculty || user?.faculty || '',
        department: assignment.metadata.department || user?.department || '',
        registrationNumber:
          assignment.metadata.registrationNumber ||
          user?.registrationNumber ||
          '',
        course: assignment.metadata.course || '',
        lecturer: assignment.metadata.lecturer || '',
        title: assignment.metadata.title || '',
        dueDate: assignment.metadata.dueDate || '',
        courseCode: assignment.metadata.courseCode || '',
      });
    }
  }, [assignment]);

  const handleSave = async () => {
    if (!assignment) return toast.error('No assignment found');
    if (isSaving) return;

    try {
      setIsSaving(true);
      setSaveStatus('saving');

      assignment.metadata.fullname = metadata.fullname;
      assignment.metadata.department = metadata.department;
      assignment.metadata.faculty = metadata.faculty;
      assignment.metadata.registrationNumber = metadata.registrationNumber;
      assignment.metadata.course = metadata.course;
      assignment.metadata.courseCode = metadata.courseCode;
      assignment.metadata.title = metadata.title;
      assignment.metadata.lecturer = metadata.lecturer;
      assignment.metadata.dueDate = metadata.dueDate;

      await new Promise(resolve => setTimeout(resolve, 1500));

      await updateAssignmentAPI(id, {
        metadata: {
          ...assignment?.metadata,
        },
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
        isOffline={false}
        path="/dashboard/assignments"
        context="Assignment"
        contextMessage="No assignment with that id found"
        contextPath="/dashboard/assignments"
      />
    );
  }
  // console.log(assignment);
  return (
    <>
      <div className="relative flex h-screen w-full flex-col overflow-hidden bg-slate-900 text-slate-100">
        <WorskpaceHeader
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
          saveStatus={saveStatus}
          isSaving={isSaving}
          onSave={handleSave}
          onFinish={() => setIsPreviewOpen(true)}
          onDelete={() => {
            if (!userId)
              return toast.error('No User id found Please log in again');
            handleDeleteAssignment(
              id,
              confirm,
              closeConfirm,
              toast,
              router,
              userId
            );
          }}
        />

        {/* Main Workspace Body */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* Collapsible Sidebar (Desktop) / Settings Panel (Mobile) */}
          <aside
            className={`border-r border-slate-800 bg-slate-900 transition-all duration-300 ease-in-out shrink-0 custom-scrollbar
             md:block overflow-y-auto
            ${isSidebarOpen ? 'w-95 opacity-100!' : 'w-0 opacity-0 border-none overflow-hidden'}
            ${mobileTab === 'meta' ? 'block! absolute inset-0 z-20 w-full h-full bg-slate-900 overflow-y-auto p-4' : ''}`}
          >
            <div className="p-4 space-y-6">
              <Sidebar
                metadata={metadata}
                onMetaChange={handleMetaChange}
                isEditable={isEditable}
                onToggleEdit={handleToggleEdit}
                isEnabled={isOfflineSyncEnabled}
                onToggleOffline={handleOfflineToggle}
                isOffline={isOffline}
                coverPageConfig={coverPageConfig}
                setCoverPageConfig={setCoverPageConfig}
                isPageIndexActive={isPageIndexActive}
                setIsPageIndexActive={setIsPageIndexActive}
              />
            </div>
          </aside>

          {/* Main Canvas / Editor Area */}
          <main
            className={`flex-1 overflow-y-auto bg-slate-950 p-4 md:p-8
            ${mobileTab === 'meta' ? 'hidden md:block' : 'block'}`}
          >
            <div className="mx-auto max-w-4xl h-full">
              <WorkspaceEditor
                content={editorContent}
                onChange={(newContent: string[]) => {
                  setEditorContent(newContent);
                  setSaveStatus('idle');
                }}
                setEditorContent={setEditorContent}
              />
            </div>
          </main>
        </div>

        <AssignmentPreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          metadata={metadata}
          content={editorContent}
          coverPageConfig={coverPageConfig}
          onConfirmFinish={async () =>
            await updateAssignmentStatusAPI(id, 'completed')
          }
          isPageIndexActive={isPageIndexActive}
        />

        {/* Mobile Bottom Navigation Bar */}
        <nav className="flex md:hidden h-14 border-t border-slate-800 bg-slate-900 items-center justify-around px-2 z-30 shrink-0">
          <button
            onClick={() => setMobileTab('editor')}
            className={`flex flex-col items-center gap-1 text-xs transition-colors ${
              mobileTab === 'editor'
                ? 'text-blue-400 font-semibold'
                : 'text-slate-400'
            }`}
          >
            <FileText size={18} />
            <span>Editor</span>
          </button>

          <button
            onClick={() => setMobileTab('meta')}
            className={`flex flex-col items-center gap-1 text-xs transition-colors ${
              mobileTab === 'meta'
                ? 'text-blue-400 font-semibold'
                : 'text-slate-400'
            }`}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </nav>
      </div>
    </>
  );
}
