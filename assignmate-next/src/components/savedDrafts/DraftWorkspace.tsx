'use client';

import '@/src/styles/workspace/workspaceMain.css';
import { useEffect, useState } from 'react';
import { OfflineDraft } from '@/src/types/draft.types';
import { draftService } from '@/src/services/drafts/draft.service';
import { useParams } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { EmptyState } from '../shared/EmptyState';
import { useNotification } from '@/src/context/NotificationContext';
import LoadingScreen from '../shared/LoadingScreen';
import { WorkspaceEditor } from '../workspace/editor/WorkspaceEditor';
import type { WorkspaceField } from '../workspace/WorkspaceMain';
import {
  PanelLeftClose,
  PanelLeft,
  Settings,
  FileText,
  Trash2,
} from 'lucide-react';
import Sidebar from '@/src/components/workspace/workspaceSidebar/Sidebar';
import {
  AssignmentMetadata,
  createInitialMetadara,
} from '@/src/types/Workspace.types';
import { getUserFullname } from '@/src/lib/fullname';
import { CoverPageConfig } from '@/src/types/Workspace.types';
import { useRouter } from 'next/navigation';

export default function DraftsWorkspace() {
  const { user } = useAuth();
  const [draft, setDraft] = useState<OfflineDraft | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>(
    'idle'
  );
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
  const [isPageActiveIndex, setIsPageIndexActive] = useState(true);
  const [coverPageConfig, setCoverPageConfig] = useState<CoverPageConfig>({
    enabled: true,
    style: 'classic',
    showFaculty: true,
    showLecturer: true,
    showDepartment: true,
    showDueDate: true,
    showRegNo: true,
  });

  const [editorContent, setEditorContent] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<AssignmentMetadata>(() =>
    createInitialMetadara({}, user)
  );
  const [mobileTab, setMobileTab] = useState<'editor' | 'meta'>('editor');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const params = useParams();
  const assignmentId = params?.id as string;
  const userId = user?._id;
  const { toast, confirm, closeConfirm } = useNotification();
  const fullName = getUserFullname();
  const router = useRouter();

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

      setMetadata({
        fullname: draft.metadata.fullname || fullName,
        faculty: draft.metadata.faculty || user?.faculty || '',
        department: draft.metadata.department || user?.department || '',
        registrationNumber:
          draft.metadata.department || user?.registrationNumber || '',
        course: draft.metadata.course || '',
        lecturer: draft.metadata.lecturer || '',
        title: draft.metadata.title || '',
        dueDate: draft.metadata.dueDate || '',
        courseCode: draft.metadata.courseCode || '',
      });
    }
  }, [draft]);

  const handleToggleEdit = async (field: WorkspaceField): Promise<void> => {
    setIsEditable(prev => ({ ...prev, [field]: !prev[field] }));
    setSaveStatus('idle');
  };

  const handleMetaChange = (field: WorkspaceField, text: string): void => {
    setMetadata(prev => ({ ...prev, [field]: text }));
  };

  const handleSave = async () => {
    if (isSaving) return;
    if (!userId) return;
    console.log('Dumping data payload:', {
      ...metadata,
      content: editorContent,
    });

    try {
      setIsSaving(true);
      setSaveStatus('saving');
      await new Promise(resolve => setTimeout(resolve, 1500));
      draftService.save(userId, assignmentId, metadata, editorContent);

      setSaveStatus('saved');
    } catch (e: any) {
      console.error('Could not save assignment', e);
      toast.error('Error saving assignment');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteDraft = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); // Stop card click navigation

    if (!userId) return;
    confirm({
      title: 'Delete Offline Draft?',
      message: "Delete this offline copy? Your cloud save won't be affected.",
      confirmText: 'Delete Draft',
      cancelText: 'keep It',
      type: 'danger',
      onConfirm: async () => {
        try {
          draftService.remove(userId, id);
          router.push('/dashboard/drafts');
          toast.success('Draft removed successfully');
        } catch {
          toast.error('Failed to delete draft');
        } finally {
          closeConfirm();
        }
      },
      onCancel: () => {
        closeConfirm();
      },
    });
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
      <div className="relative flex h-screen w-full flex-col overflow-hidden bg-slate-900 text-slate-100">
        {/* Top Header Bar */}
        <header className="flex h-14 w-full items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 backdrop-blur-md shrink-0 z-20">
          {/* Desktop Sidebar Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(prev => !prev)}
            className=" md:flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-800/50 px-3 py-1.5 text-xs text-slate-50 hover:bg-slate-800 hover:text-white transition-all cursor-pointer "
            title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isSidebarOpen ? (
              <PanelLeftClose size={18} />
            ) : (
              <PanelLeft size={18} />
            )}
            <span className="font-medium">
              {isSidebarOpen ? 'Hide Details' : 'Show Details'}
            </span>
          </button>

          {/* Right Header Status & Save Button */}
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-xs font-medium text-slate-400 capitalize">
              {saveStatus === 'saving'
                ? 'Saving...'
                : saveStatus === 'saved'
                  ? 'Saved'
                  : 'Unsaved changes'}
            </span>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-500 active:scale-95 disabled:opacity-50 transition-all shadow-sm shadow-blue-500/20"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>

            <button
              type="button"
              onClick={e => handleDeleteDraft(draft._id, e)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-rose-500/10 hover:text-rose-400 cursor-pointer"
              title="Delete Assignment"
              aria-label="Delete Assignment"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </header>

        {/* Main Workspace Body */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* Collapsible Sidebar (Desktop) / Settings Panel (Mobile) */}
          <aside
            className={`border-r border-slate-800 bg-slate-900 transition-all duration-300 ease-in-out shrink-0  custom-scrollbar
             md:block overflow-y-auto
            ${isSidebarOpen ? 'w-100 opacity-100!' : 'w-0 opacity-0 border-none overflow-hidden'}
            ${mobileTab === 'meta' ? 'block! absolute inset-0 z-20 w-full h-full bg-slate-900 overflow-y-auto p-4' : ''}`}
          >
            <div className="p-4 space-y-6">
              <Sidebar
                metadata={metadata}
                onMetaChange={handleMetaChange}
                isEditable={isEditable}
                onToggleEdit={handleToggleEdit}
                isOffline={true}
                coverPageConfig={coverPageConfig}
                setCoverPageConfig={setCoverPageConfig}
                isPageIndexActive={isPageActiveIndex}
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
                onChange={(html: string[]) => setEditorContent(html)}
                setEditorContent={setEditorContent}
              />
            </div>
          </main>
        </div>

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
