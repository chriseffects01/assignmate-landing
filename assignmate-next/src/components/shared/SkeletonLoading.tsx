export function AssignmentSkeleton() {
  return (
    <div className="w-full p-6 bg-slate-900/40 border bporder-slate-800/80 rounded-2xl space-y-5 animate-pulse">
      {/* Top Header Tag */}
      <div className="h-5 w-20 bg-slate-800 rounded-md " />

      {/* Title String Block */}
      <div className="space-y-3">
        <div className="h-6 w-3/4 bg-slate-800 rounded-md" />

        {/* Image */}
        <div className="w-full h-32 bg-slate-800/40 rounded-xl border border-slate-800/20 flex items-center justify-center text-[10px] text-slate-700 font-bold uppercase tracking-wider">
          Preview Loading...
        </div>
      </div>

      {/* Snippet Line Placeholder */}

      <div className="space-y-2">
        <div className="h-3 w-full bg-slate-800/60 rounded-md" />
        <div className="h-3 w-5/6 bg-slate-800/60 rounded-md" />
      </div>

      <div className="pt-4 border-t border-slate-800/60 flex justify-between items-center ">
        <div className="h-3 w-24 bg-slate-800 rounded-md" />
        <div className="h-3 w-12 bg-slate-800 rounded-md" />
      </div>
    </div>
  );
}
