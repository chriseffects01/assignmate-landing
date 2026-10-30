interface CardSyncButtonProps {
  isDirty: boolean;
  isSyncing: boolean;
  onSync: () => void;
}

export const CardSyncButton: React.FC<CardSyncButtonProps> = ({
  isDirty,
  isSyncing,
  onSync,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSyncing && isDirty) {
      onSync();
    }
  };

  if (!isDirty && !isSyncing) {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 rounded-full cursor-default select-none">
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M5 13l4 4L19 7"
          />
        </svg>
        Synced
      </span>
    );
  }

  // State 1: Needs Syncing or actively processing
  return (
    <button
      onClick={handleClick}
      disabled={isSyncing}
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
        isSyncing
          ? 'bg-blue-900/50 text-blue-300 border border-blue-700/50 cursor-not-allowed opacity-80'
          : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-900/50 active:scale-95'
      }`}
    >
      <svg
        className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      {isSyncing ? 'Syncing...' : 'Sync'}
    </button>
  );
};
