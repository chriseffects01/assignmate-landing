'use client';

import Link from 'next/link';
import { useState } from 'react';
import { WifiOff, FileX } from 'lucide-react';

interface EmptyStateProps {
  isOffline: boolean;
  onRetry?: () => Promise<void>;
  message?: string;
  title?: string;
  path: string;
  pathText?: string;
  context?: string;
  contextMessage?: string;
  contextPath?: string;
  toast?: {
    success: (msg: string, duration?: number) => void;
    error: (msg: string, duration?: number) => void;
    info: (msg: string, duration?: number) => void;
    warning: (msg: string, duration?: number) => void;
  };
}

export function EmptyState({
  isOffline,
  onRetry,
  message,
  title,
  path,
  pathText,
  context,
  contextMessage,
  contextPath,
  toast,
}: EmptyStateProps) {
  const [isRetrying, setIsRetrying] = useState<boolean>(false);

  if (isOffline) {
    const retry = async () => {
      setIsRetrying(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (onRetry) await onRetry();
        toast?.success("You're back online");
      } catch {
        toast?.error("You're still offline");
      } finally {
        setIsRetrying(false);
      }
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] w-full p-6 text-center animate-fade-in">
        <div className="flex flex-col items-center max-w-md p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl shadow-2xl space-y-5">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <WifiOff className="h-10 w-10 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white tracking-tight ">
              {title}
            </h2>

            <p className="text-sm text-slate-400 leading-relaxed">{message}</p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full pt-2 ">
            {onRetry && (
              <button
                onClick={retry}
                disabled={isRetrying}
                className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-50 rounded-xl border border-slate-700/80 transition-all cursor-pointer "
              >
                <span>
                  {isRetrying ? 'Reconnecting...' : 'Retry connection'}
                </span>
              </button>
            )}

            <Link
              href={path}
              className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 rounded-xl shadow-lg shadow-blue-600/20 transition-all"
            >
              <span>Go to {pathText}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] w-full p-6 text-center animate-fade-in">
      <div className="flex flex-col items-center max-w-md p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl shadow-2xl space-y-5">
        {/* Not Found Icon Container */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/50 text-slate-400">
          <FileX className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white tracking-tight">
            No {context} Found
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            {contextMessage}
          </p>
        </div>

        {/* Action Button */}
        {contextPath && (
          <div className="pt-2">
            <Link
              href={contextPath}
              className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 rounded-xl shadow-lg shadow-blue-600/20 transition-all"
            >
              <span>{contextMessage}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
