import React, { useState } from 'react';
import {
  X,
  Download,
  CheckCircle2,
  ArrowLeft,
  FileText,
  Printer,
  Eye,
} from 'lucide-react';
import { AssignmentMetadata } from '@/src/types/Workspace.types';
import { useNotification } from '@/src/context/NotificationContext';
import { generateCoverPageHTML } from '@/src/utils/generateCoverPageHTML';
import { CoverPageConfig } from '@/src/types/Workspace.types';
import { htmlToText } from '@/src/utils/htmlToTextConverter';
import { exportToDocx, exportToPdf } from '@/src/utils/exporters';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';

interface AssignmentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  metadata: AssignmentMetadata;
  coverPageConfig: CoverPageConfig;
  content: string[];
  onConfirmFinish: () => Promise<void>;
  isPageIndexActive: boolean;
  setisOfflineSyncEnabled: (checked: boolean) => void;
}

export const AssignmentPreviewModal: React.FC<AssignmentPreviewModalProps> = ({
  isOpen,
  onClose,
  coverPageConfig,
  metadata,
  content,
  onConfirmFinish,
  isPageIndexActive,
  setisOfflineSyncEnabled,
}) => {
  const [step, setStep] = useState<'review' | 'export'>('review');
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'docx' | 'txt'>(
    'pdf'
  );
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useNotification();

  if (!isOpen) return null;

  const coverPageHtml = generateCoverPageHTML(metadata, coverPageConfig);

  const finalDocumentPages =
    coverPageConfig.enabled && coverPageHtml
      ? [coverPageHtml, ...content]
      : content;

  const handleFinalExport = async () => {
    try {
      setIsFinalizing(true);

      //Handle TXT Export

      if (exportFormat === 'txt') {
        const plainText = finalDocumentPages
          .map(html => htmlToText(html))
          .join('\n\n--- PAGE BREAK ---\n\n');

        const blob = new Blob([plainText], {
          type: 'text/plain;charset=utf-8',
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = `${metadata.title || 'Assignment'}.txt`;

        link.click();
        toast.success(`Exporting as ${exportFormat.toUpperCase()}...`);
        URL.revokeObjectURL(url);
      } else if (exportFormat === 'pdf') {
        // PDF
        // toast.info('PDF implementations are not complete');

        await exportToPdf('assignment-preview-root', metadata.title, toast);
        // await exportToPdf('assignment-preview-root', metadata.title, toast);
      } else if (exportFormat === 'docx') {
        //DocX
        const validPages = finalDocumentPages.filter(
          page => page.trim() !== '<p></p>' && page.trim() !== ''
        );
        const combinedHtml = validPages.join(
          '<br style="page-break-before: always;" />'
        );

        await exportToDocx(combinedHtml, metadata.title, toast);
      }
      // Update backend status to completed
      await onConfirmFinish();

      setIsFinalizing(false);
      setStep('review');
      setisOfflineSyncEnabled(false);
      onClose();
    } catch (e: any) {
      toast.error('Failed to complete assignment');
      console.error('Failed to complete assignment:', e);
      setIsFinalizing(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative flex flex-col w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <Eye className="text-emerald-400" size={20} />
            <h3 className="text-base font-semibold text-white">
              {step === 'review'
                ? 'Review Document Preview'
                : 'Select Export Format & Finish'}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              setStep('review');
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body: Standard White Paper Canvas */}
        <div
          id="assignment-preview-root"
          className=" flex-1 overflow-y-auto p-6 bg-slate-950 flex flex-col items-center gap-6 custom-scrollbar "
        >
          {finalDocumentPages.map((pageHtml, index) => (
            <div
              key={index}
              className="w-full max-w-175 min-h-235 bg-white text-slate-900 p-12 rounded shadow-2xl border border-slate-200 font-serif relative"
            >
              {/* Render Page HTML */}
              <div
                className="prose preview-paper  prose-slate max-w-none text-slate-800 leading-relaxed text-sm"
                dangerouslySetInnerHTML={{
                  __html:
                    pageHtml ||
                    '<p class="text-slate-400 italic">No content written</p>',
                }}
              />

              {/* Page Footer */}
              {isPageIndexActive && index > 0 && (
                <div className="absolute bottom-4 right-6 text-xs text-slate-400 font-sans select-none">
                  Page {index} of {content.length}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900">
          {step === 'review' ? (
            /* STEP 1: REVIEW CONTROLS */
            <>
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-300 border border-slate-700 rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Go Back & Edit</span>
              </button>

              <button
                type="button"
                onClick={() => setStep('export')}
                className="flex items-center gap-2 px-5 py-2 text-xs font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 active:scale-95 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <span>Looks Good, Continue</span>
                <CheckCircle2 size={14} />
              </button>
            </>
          ) : (
            /* STEP 2: EXPORT & FINISH CONTROLS */
            <>
              <button
                type="button"
                onClick={() => setStep('review')}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-300 border border-slate-700 rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Back to Preview</span>
              </button>

              <div className="flex items-center gap-3">
                <select
                  value={exportFormat}
                  onChange={e => setExportFormat(e.target.value as any)}
                  className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
                >
                  <option value="pdf">PDF Document (.pdf)</option>
                  <option value="docx">Word Document (.docx)</option>
                  <option value="txt">Plain Text (.txt)</option>
                </select>

                <button
                  type="button"
                  onClick={handleFinalExport}
                  disabled={isFinalizing}
                  className="flex items-center gap-2 px-5 py-2 text-xs font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 active:scale-95 disabled:opacity-50 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  {isFinalizing ? (
                    <span>Finalizing...</span>
                  ) : (
                    <>
                      <Download size={14} />
                      <span>Export & Mark Completed</span>
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
