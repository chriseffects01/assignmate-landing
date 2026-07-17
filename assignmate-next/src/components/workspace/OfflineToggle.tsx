interface OfflineToggleProps {
  isEnabled: boolean;
  onToggle: (checked: boolean) => void;
}

export function OfflineToggle({ isEnabled, onToggle }: OfflineToggleProps) {
  return (
    <div className="flex items-center gap-3 select-none my-2">
      <span className="text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400 ">
        Offline sync
      </span>

      <button
        type="button"
        onClick={() => onToggle(!isEnabled)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 ${isEnabled ? 'bg-emerald-500 dark:bg-emerald-600' : 'bg-slate-200 dark:bg-slate-700'}`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
            isEnabled ? 'translate-x-5 ' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
