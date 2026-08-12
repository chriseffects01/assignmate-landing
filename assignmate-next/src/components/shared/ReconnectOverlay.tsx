'use client';

import { Loader2 } from 'lucide-react';

interface ReconnectOverlayProps {
  message?: string;
}

export function ReconnectOverlay({
  message = 'Reconnecting to Assignmate servers...',
}: ReconnectOverlayProps) {
  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in ">
      <div className="flex flex-col items-center max-w-sm  text-center p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl space-y-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse " />
          <Loader2 className="h-10 w-10 text-emerald-500 animate-spin relative z-10" />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">
            Retrying Connection...
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
}
