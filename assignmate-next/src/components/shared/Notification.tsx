'use client';

import { useNotification } from '@/src/context/NotificationContext';
import { ToastType } from '@/src/types/niotification.types';

import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';
import React from 'react';

export function NotificationOverlay() {
  const { toasts, removeToast, confirmState, closeConfirm } = useNotification();

  return (
    <>
      {/* Toast Container  */}

      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 w-full max-w-sm px-4 sm:px-0 pointer-events-none">
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>

      {/* CONFIRMATION POPUP */}

      {confirmState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl transition-all">
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-full shrink-0 ${confirmState.type === 'danger' ? 'bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400'}`}
              >
                <AlertTriangle className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {confirmState.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 ">
                  {confirmState.message}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  if (confirmState.onCancel) confirmState.onCancel();
                  closeConfirm();
                }}
                className="px-4 py-2 text-sm font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-all cursor-pointer"
              >
                {confirmState.cancelText || 'Cancel'}
              </button>

              <button
                onClick={async () => {
                  await confirmState.onConfirm();
                  closeConfirm();
                }}
                className={`px-4 py-2 text-sm font-semibold text-white rounded-xl transition-all cursor-pointer ${
                  confirmState.type === 'danger'
                    ? 'bg-red-600 hover:bg-red-500 shadow-md shadow-red-950/20'
                    : 'bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-950/20'
                }`}
              >
                {confirmState.confirmText || 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ToastItem({ toast, onClose }: { toast: any; onClose: () => void }) {
  const icons: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
    error: <XCircle className="h-5 w-5 text-red-500 " />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  };

  const borders: Record<ToastType, string> = {
    success: 'border-emerald-500/30',
    error: 'border-red-500/30',
    warning: 'border-amber-500/30',
    info: 'border-blue-500/30',
  };

  return (
    <div
      className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xl text-slate-800 dark:text-slate-100 transition-all animate-slide-in ${borders[toast.type as ToastType]}`}
    >
      <div className="flex items-center gap-3">
        {icons[toast.type as ToastType]}
        <p className="text-sm font-medium "> {toast.message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
