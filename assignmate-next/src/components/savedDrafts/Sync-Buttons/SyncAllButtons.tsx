import React from 'react';

interface SyncAllButtonProps {
  dirtyCount: number;
  isSyncing: boolean;
  onSyncAll: () => void;
}

export const SyncAllButton: React.FC<SyncAllButtonProps> = ({
  dirtyCount,
  isSyncing,
  onSyncAll,
}) => {
  // If all cards are synced, keep it clean and disabled (or green)
  const isAllSynced = dirtyCount === 0;

  return (
    <button
      onClick={onSyncAll}
      disabled={isAllSynced || isSyncing}
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
        isAllSynced
          ? 'bg-zinc-800/60 text-zinc-500 border border-zinc-700/40 cursor-not-allowed'
          : isSyncing
            ? 'bg-blue-950 text-blue-400 border border-blue-800/60 cursor-wait'
            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 active:scale-95'
      }`}
    >
      <svg
        className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`}
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
      <span>
        {isSyncing
          ? 'Syncing All...'
          : isAllSynced
            ? 'All Synced'
            : `Sync All (${dirtyCount})`}
      </span>
    </button>
  );
};
