'use client';

import React, { useRef, useState } from 'react';
import { Editor, useEditorState } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ChevronDown,
  ChevronUp,
  Type,
  Palette,
  Highlighter,
  List,
  ListOrdered,
  ListCheck,
  Outdent,
  Indent,
  Subscript,
  Superscript,
  Link,
  Image,
  Table,
  Minus,
  Quote,
  Code,
  RemoveFormatting,
  Heading1,
  Heading2,
  Heading3,
  Plus,
  Trash2,
  Rows,
  Columns,
} from 'lucide-react';

interface ToolbarProps {
  editor: Editor | null;
}

type ToolbarButtonProps = {
  icon: React.ReactNode;
  title: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon,
  title,
  active = false,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      onMouseDown={event => {
        // Keep the editor selection/cursor from being lost.
        event.preventDefault();
      }}
      onClick={onClick}
      className={`
      flex h-8 w-8 shrink-0 items-center justify-center
      rounded-md transition-all duration-100
      ${
        disabled
          ? 'cursor-not-allowed text-slate-700'
          : active
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
      }
      `}
    >
      {icon}
    </button>
  );
};

const Divider = () => <div className="mx-1 h-5 w-px shrink-0 bg-slate-800" />;

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="mx-1 shrink-0 text-[9px] font-semibold uppercase tracking-wider text-slate-600">
    {children}
  </span>
);

export const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  /*
   * Subscribe to Tiptap state.

   * This is important because calling editor.isActive() directly
   * does not guarantee that this React component will re-render
   * when the selection/active mark changes.
   */
  const editorState = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => {
      if (!currentEditor) return null;

      return {
        bold: currentEditor.isActive('bold'),
        italic: currentEditor.isActive('italic'),
        underline: currentEditor.isActive('underline'),
        strike: currentEditor.isActive('strike'),

        bulletList: currentEditor.isActive('bulletList'),
        orderedList: currentEditor.isActive('orderedList'),
        taskList: currentEditor.isActive('taskList'),

        heading1: currentEditor.isActive('heading', { level: 1 }),
        heading2: currentEditor.isActive('heading', { level: 2 }),
        heading3: currentEditor.isActive('heading', { level: 3 }),

        blockquote: currentEditor.isActive('blockquote'),
        codeBlock: currentEditor.isActive('codeBlock'),

        subscript: currentEditor.isActive('subscript'),
        superscript: currentEditor.isActive('superscript'),

        alignLeft: currentEditor.isActive({ textAlign: 'left' }),
        alignCenter: currentEditor.isActive({ textAlign: 'center' }),
        alignRight: currentEditor.isActive({ textAlign: 'right' }),
        alignJustify: currentEditor.isActive({ textAlign: 'justify' }),

        link: currentEditor.isActive('link'),
        table: currentEditor.isActive('table'),
      };
    },
  });

  if (!editor || !editorState) return null;

  const run = (command: () => boolean | void) => {
    editor.chain().focus();
    command();
  };
  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL', previousUrl || '');

    if (url === null) return;

    if (!url.trim()) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({
        href: url.trim(),
        target: '_blank',
      })
      .run();
  };

  const addImage = () => {
    imageInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      event.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const src = reader.result;

      if (typeof src !== 'string') return;

      editor
        .chain()
        .focus()
        .setImage({
          src,
          alt: file.name,
        })
        .run();
    };

    reader.readAsDataURL(file);

    // Allow selecting the same image again later.
    event.target.value = '';
  };

  const insertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({
        rows: 3,
        cols: 3,
        withHeaderRow: true,
      })
      .run();
  };

  const removeTable = () => {
    editor.chain().focus().deleteTable().run();
  };

  const addColumn = () => {
    editor.chain().focus().addColumnAfter().run();
  };

  const addRow = () => {
    editor.chain().focus().addRowAfter().run();
  };

  const deleteColumn = () => {
    editor.chain().focus().deleteColumn().run();
  };

  const deleteRow = () => {
    editor.chain().focus().deleteRow().run();
  };

  return (
    <div className="w-full select-none border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      {/* Hidden image input */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* ===================================================== */}
      {/* MAIN TOOLBAR                                          */}
      {/* ===================================================== */}

      <div className="flex min-w-0 items-center gap-2 px-2 py-1.5 sm:px-3">
        {/* Scrollable tools */}
        <div
          className="
            flex min-w-0 flex-1 items-center gap-0.5
            overflow-x-auto
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {/* History */}
          <ToolbarButton
            icon={<Undo size={16} />}
            title="Undo"
            disabled={!editor.can().undo()}
            onClick={() => editor.chain().focus().undo().run()}
          />

          <ToolbarButton
            icon={<Redo size={16} />}
            title="Redo"
            disabled={!editor.can().redo()}
            onClick={() => editor.chain().focus().redo().run()}
          />

          <Divider />

          {/* Font */}
          <select
            defaultValue="Inter"
            onChange={event =>
              editor.chain().focus().setFontFamily(event.target.value).run()
            }
            onMouseDown={event => event.stopPropagation()}
            className="
              h-8 w-24 shrink-0 rounded-md border border-slate-800
              bg-slate-900 px-2 text-[11px] text-slate-300
              outline-none transition
              hover:border-slate-700
              focus:border-blue-500
              sm:w-32
            "
            title="Font Family"
          >
            <option value="Inter">Inter</option>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Georgia">Georgia</option>
            <option value="Courier New">Courier New</option>
          </select>

          <select
            defaultValue="12px"
            onChange={event =>
              editor.chain().focus().setFontSize(event.target.value).run()
            }
            onMouseDown={event => event.stopPropagation()}
            className="
              h-8 w-14 shrink-0 rounded-md border border-slate-800
              bg-slate-900 px-1.5 text-[11px] text-slate-300
              outline-none transition
              hover:border-slate-700
              focus:border-blue-500
            "
            title="Font Size"
          >
            <option value="10px">10</option>
            <option value="12px">12</option>
            <option value="14px">14</option>
            <option value="16px">16</option>
            <option value="18px">18</option>
            <option value="20px">20</option>
            <option value="24px">24</option>
            <option value="32px">32</option>
            <option value="40px">40</option>
          </select>

          <Divider />

          {/* Basic formatting */}
          <ToolbarButton
            icon={<Bold size={16} />}
            title="Bold"
            active={editorState.bold}
            onClick={() => editor.chain().focus().toggleBold().run()}
          />

          <ToolbarButton
            icon={<Italic size={16} />}
            title="Italic"
            active={editorState.italic}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          />

          <ToolbarButton
            icon={<Underline size={16} />}
            title="Underline"
            active={editorState.underline}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          />

          <ToolbarButton
            icon={<Strikethrough size={16} />}
            title="Strikethrough"
            active={editorState.strike}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          />

          <Divider />

          {/* Alignment */}
          <ToolbarButton
            icon={<AlignLeft size={16} />}
            title="Align Left"
            active={editorState.alignLeft}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
          />

          <ToolbarButton
            icon={<AlignCenter size={16} />}
            title="Align Center"
            active={editorState.alignCenter}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
          />

          <ToolbarButton
            icon={<AlignRight size={16} />}
            title="Align Right"
            active={editorState.alignRight}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
          />

          <ToolbarButton
            icon={<AlignJustify size={16} />}
            title="Justify"
            active={editorState.alignJustify}
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          />
        </div>

        {/* More button stays visible */}
        <button
          type="button"
          onMouseDown={event => event.preventDefault()}
          onClick={() => setIsExpanded(previous => !previous)}
          className="
            flex h-8 shrink-0 items-center gap-1 rounded-md
            border border-slate-800 bg-slate-900 px-2.5
            text-[11px] font-medium text-slate-400
            transition-colors hover:border-slate-700
            hover:bg-slate-800 hover:text-slate-100
          "
          title={isExpanded ? 'Show fewer tools' : 'Show more tools'}
        >
          <span className="hidden sm:inline">
            {isExpanded ? 'Less' : 'More'}
          </span>

          {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
      </div>

      {/* ===================================================== */}
      {/* EXPANDED TOOLBAR                                      */}
      {/* ===================================================== */}

      {isExpanded && (
        <div
          className="
            border-t border-slate-800/80 bg-slate-900/70
            px-2 py-2 sm:px-3
          "
        >
          <div
            className="
              flex items-center gap-0.5
              overflow-x-auto
              custom-scrollbar pb-1
              
            "
          >
            {/* Styles */}
            <SectionLabel>Styles</SectionLabel>

            <ToolbarButton
              icon={<Type size={16} />}
              title="Normal Text"
              onClick={() => editor.chain().focus().setParagraph().run()}
            />

            <ToolbarButton
              icon={<Heading1 size={16} />}
              title="Heading 1"
              active={editorState.heading1}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
            />

            <ToolbarButton
              icon={<Heading2 size={16} />}
              title="Heading 2"
              active={editorState.heading2}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            />

            <ToolbarButton
              icon={<Heading3 size={16} />}
              title="Heading 3"
              active={editorState.heading3}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
            />

            <Divider />

            {/* Lists */}
            <SectionLabel>Lists</SectionLabel>

            <ToolbarButton
              icon={<List size={16} />}
              title="Bullet List"
              active={editorState.bulletList}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            />

            <ToolbarButton
              icon={<ListOrdered size={16} />}
              title="Numbered List"
              active={editorState.orderedList}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            />

            <ToolbarButton
              icon={<ListCheck size={16} />}
              title="Checklist"
              active={editorState.taskList}
              onClick={() => editor.chain().focus().toggleTaskList().run()}
            />

            <ToolbarButton
              icon={<Outdent size={16} />}
              title="Decrease Indent"
              onClick={() =>
                editor.chain().focus().liftListItem('listItem').run()
              }
            />

            <ToolbarButton
              icon={<Indent size={16} />}
              title="Increase Indent"
              onClick={() =>
                editor.chain().focus().sinkListItem('listItem').run()
              }
            />

            <Divider />

            {/* Text effects */}
            <SectionLabel>Text</SectionLabel>

            <ToolbarButton
              icon={<Subscript size={16} />}
              title="Subscript"
              active={editorState.subscript}
              onClick={() => editor.chain().focus().toggleSubscript().run()}
            />

            <ToolbarButton
              icon={<Superscript size={16} />}
              title="Superscript"
              active={editorState.superscript}
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
            />

            <label
              className="
                relative flex h-8 w-8 shrink-0 cursor-pointer
                items-center justify-center rounded-md
                text-slate-400 transition hover:bg-slate-800
                hover:text-slate-100
              "
              title="Text Color"
              onMouseDown={event => event.preventDefault()}
            >
              <Palette size={16} />

              <input
                type="color"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                onChange={event =>
                  editor.chain().focus().setColor(event.target.value).run()
                }
              />
            </label>

            <label
              className="
                relative flex h-8 w-8 shrink-0 cursor-pointer
                items-center justify-center rounded-md
                text-slate-400 transition hover:bg-slate-800
                hover:text-slate-100
              "
              title="Highlight"
              onMouseDown={event => event.preventDefault()}
            >
              <Highlighter size={16} />

              <input
                type="color"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                onChange={event =>
                  editor
                    .chain()
                    .focus()
                    .toggleHighlight({
                      color: event.target.value,
                    })
                    .run()
                }
              />
            </label>

            <Divider />

            {/* Insert */}
            <SectionLabel>Insert</SectionLabel>

            <ToolbarButton
              icon={<Link size={16} />}
              title={editorState.link ? 'Edit Link' : 'Add Link'}
              active={editorState.link}
              onClick={addLink}
            />

            <ToolbarButton
              icon={<Image size={16} />}
              title="Insert Image"
              onClick={addImage}
            />

            <ToolbarButton
              icon={<Table size={16} />}
              title="Insert 3 × 3 Table"
              onClick={insertTable}
            />

            <ToolbarButton
              icon={<Minus size={16} />}
              title="Horizontal Divider"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            />

            <Divider />

            {/* Table controls */}
            {editorState.table && (
              <>
                <SectionLabel>Table</SectionLabel>

                <ToolbarButton
                  icon={
                    <div className="flex justify-center items-center">
                      <Plus size={10} />
                      <Rows size={12} />
                    </div>
                  }
                  title="Add Row"
                  onClick={addRow}
                />

                <ToolbarButton
                  icon={
                    <div className="flex items-center justify-center">
                      <Plus size={10} />
                      <Columns size={12} />
                    </div>
                  }
                  title="Add Column"
                  onClick={addColumn}
                />

                <ToolbarButton
                  icon={
                    <div className="flex items-center justify-center">
                      <Minus size={12} />
                      <Rows size={10} />
                    </div>
                  }
                  title="Delete Row"
                  onClick={deleteRow}
                />

                <ToolbarButton
                  icon={
                    <div className="flex items-center justify-center">
                      <Plus size={12} />
                      <Columns size={10} />
                    </div>
                  }
                  title="Delete Column"
                  onClick={deleteColumn}
                />

                <ToolbarButton
                  icon={<Trash2 size={16} />}
                  title="Delete Table"
                  onClick={removeTable}
                />

                <Divider />
              </>
            )}

            {/* Blocks */}
            <SectionLabel>Blocks</SectionLabel>

            <ToolbarButton
              icon={<Quote size={16} />}
              title="Blockquote"
              active={editorState.blockquote}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            />

            <ToolbarButton
              icon={<Code size={16} />}
              title="Code Block"
              active={editorState.codeBlock}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            />

            <ToolbarButton
              icon={<RemoveFormatting size={16} />}
              title="Clear Formatting"
              onClick={() =>
                editor.chain().focus().unsetAllMarks().clearNodes().run()
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};
