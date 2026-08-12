'use client';

import { FileText } from 'lucide-react';

interface SimpleStateProps {
  message: string;
}

export default function SimpleEmptyState({ message }: SimpleStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-2xl py-16 text-center bg-slate-900/10">
      <FileText className="h-8 w-8 text-slate-600 mb-3" />
      <p className="text-sm font-medium text-slate-400">{message}</p>
    </div>
  );
}
