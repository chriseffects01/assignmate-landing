'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { editorExtensions } from './extensions';
import { Toolbar } from './Toolbar';
import { useNotification } from '@/src/context/NotificationContext';
import {
  FileText,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
} from 'lucide-react';

interface WorkspaceEditorProps {
  content: string[];
  onChange: (html: string[]) => void;
  setEditorContent: (prevContent: any) => void;
}

export const WorkspaceEditor: React.FC<WorkspaceEditorProps> = ({
  content,
  onChange,
  setEditorContent,
}) => {
  const pages = Array.isArray(content) && content.length > 0 ? content : [''];
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { confirm, toast, closeConfirm } = useNotification();
  const isUpdatingRef = useRef<boolean>(false);

  const checkAndReflowPages = () => {
    const pageElement = document.getElementById(`editor-page-${currentPage}`);
    if (!pageElement) return;

    const MAX_PAGE_HEIGHT = 950;

    if (pageElement.scrollHeight > MAX_PAGE_HEIGHT) {
      const editorNode = pageElement.querySelector('.ProseMirror');
      if (!editorNode) return;

      const children = Array.from(editorNode.children);
      let currentPageHtml = '';
      let nextPageHtml = '';
      let currentHeight = 0;
      let splitIndex = -1;

      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement;
        currentHeight += child.offsetHeight;

        if (currentHeight > MAX_PAGE_HEIGHT && splitIndex === -1) {
          splitIndex = 1;
        }

        if (splitIndex === -1) {
          currentPageHtml += child.outerHTML;
        } else {
          nextPageHtml += child.outerHTML;
        }
      }
      if (splitIndex !== -1 && nextPageHtml) {
        setEditorContent((prevContent: any) => {
          const updated = [...prevContent];
          updated[currentPage] = currentPageHtml;
          if (currentPage + 1 < updated.length) {
            updated[currentPage + 1] = nextPageHtml + updated[currentPage + 1];
          } else {
            updated.push(nextPageHtml);
          }
          return updated;
        });
      }
    }
  };

  const editor = useEditor({
    extensions: editorExtensions,
    content: pages[currentPage] || '',
    immediatelyRender: false,
    parseOptions: {
      preserveWhitespace: 'full',
    },
    onUpdate: ({ editor }) => {
      if (isUpdatingRef.current) return;

      const updatedHtml = editor.getHTML();
      const nextPages = [...pages];
      nextPages[currentPage] = updatedHtml;

      onChange(nextPages);
    },
    editorProps: {
      handlePaste: (_, event) => {
        const clipboardData = event.clipboardData;
        if (!clipboardData) return false;

        const html = clipboardData.getData('text/html');
        const text = clipboardData.getData('text/plain');

        if ((text && text.length > 1000) || (html && html.length > 1500)) {
          setTimeout(() => {
            checkAndReflowPages();
          }, 250);
        }
      },
      attributes: {
        class: 'p-6 focus:outline-none text-slate-200 whitespace-pre-wrap',
      },
    },
  });

  useEffect(() => {
    if (currentPage >= pages.length) {
      setCurrentPage(Math.max(0, pages.length - 1));
    }
  }, [pages.length, currentPage]);

  useEffect(() => {
    if (!editor) return;

    const currentPageContent = pages[currentPage] ?? '';

    if (editor.getHTML() !== currentPageContent) {
      isUpdatingRef.current = true;
      editor.commands.setContent(currentPageContent);
      isUpdatingRef.current = false;
    }
  }, [currentPage, pages, editor]);

  const handleAddPage = () => {
    const nextPages = [...pages, ''];
    onChange(nextPages);
    setCurrentPage(nextPages.length - 1);
  };

  const handleDeletePage = () => {
    if (pages.length <= 1) {
      toast.info('At least one page is required.');
      return;
    }

    confirm({
      title: 'Delete Current Page?',
      message: 'Are you sure you want to delete current page',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'warning',
      onConfirm: () => {
        const nextPages = pages.filter((_, idx) => idx !== currentPage);
        const nextActiveIndex = Math.max(0, currentPage - 1);
        onChange(nextPages);
        setCurrentPage(nextActiveIndex);
        toast.success('Page deleted successfully');
        closeConfirm();
      },

      onCancel: closeConfirm,
    });
  };

  const pageText = editor?.getText().trim() || '';
  const pageWordCount = pageText ? pageText.split(/\s+/).length : 0;
  const pageCharCount = pageText.length;

  return (
    <div className="flex h-full w-full flex-col rounded-lg border border-slate-800 bg-slate-900/40  ">
      <Toolbar editor={editor} />
      {/*  */}

      <div className="flex-1 overflow-y-auto overflow-hidden flex justify-center p-6 bg-slate-950 custom-scrollbar ">
        <div className="tiptap bg-slate-900/70 border border-slate-800 rounded-lg shadow-xl p-4">
          <EditorContent editor={editor} />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/90 px-4 py-2 text-xs text-slate-400 font-mono select-none">
        {/* Left side: Current psge stats */}

        <div className="flex items-centergap-4">
          <span className="flex items-center gap-1.5 text-blue-400 font-medium ">
            <FileText size={15} />
            Page {currentPage + 1} of {pages.length}
          </span>
          <span className=" sm:inline border-l border-slate-800 pl-4">
            {pageWordCount} words on this page
          </span>
          <span className=" sm:inline border-l border-slate-800 pl-4 ">
            {pageCharCount} Characters
          </span>
        </div>

        {/* Right side: Page Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="p-1 rounded hover:bg-slate-800 text-slate-300 disabled:opacity-30  disabled:hover:bg-transparent"
            title="Previous Page"
          >
            <ChevronLeft size={16} />
          </button>

          <span className="px-2 font-semibold text-slate-200 ">
            {currentPage + 1} / {pages.length}
          </span>

          <button
            type="button"
            disabled={currentPage === pages.length - 1}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="p-1 rounded hover:bg-slate-800 text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent"
            title="Next Page"
          >
            <ChevronRight size={16} />
          </button>

          <div className="mx-1 h-3 w-px bg-slate-800 " />
          <button
            type="button"
            onClick={handleAddPage}
            className="flex items-center gap-1 px-2 py-1 rounded bg-blue-600/20  text-blue-400 hover:bg-blue-600/30 transition-colors border-blue-500/30"
            title="Add New Page"
          >
            <Plus size={15} />
            <span>New Page</span>
          </button>

          {pages.length > 1 && (
            <button
              type="button"
              onClick={handleDeletePage}
              className="p-1 rounded text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Delete Current Page"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
