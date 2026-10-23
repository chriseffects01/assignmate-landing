import Link from 'next/link';
import { LayoutTemplate, ArrowLeft, Sparkles } from 'lucide-react';

export default function TemplatesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
      {/* Decorative Icon Badge */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/10">
          <LayoutTemplate className="w-10 h-10" />
        </div>
        <div className="absolute -top-1 -right-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-full p-1.5">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      {/* Main Content Card */}
      <div className="max-w-md w-full bg-[#131b2e]/60 border border-blue-900/40 backdrop-blur-md rounded-2xl p-8 shadow-xl">
        <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20">
          Feature Under Development
        </span>

        <h1 className="text-2xl font-bold text-white mb-3">
          Templates Marketplace
        </h1>

        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          We&apos;re currently building a powerful template system to help you
          auto-format academic cover pages, lab reports, essays, and custom
          structures effortlessly.
        </p>

        {/* Action Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors duration-200 shadow-md shadow-blue-600/20"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>

      {/* Footer Note */}
      <p className="text-xs text-slate-500 mt-6">
        AssignMate MVP • Custom template creation coming in a future update.
      </p>
    </div>
  );
}
