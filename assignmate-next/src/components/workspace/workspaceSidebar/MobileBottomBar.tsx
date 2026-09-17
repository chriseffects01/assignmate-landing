import React from 'react';

interface MobileBottomBarProps {
  onOpenSidebar: () => void;
  status: string;
}

const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onOpenSidebar,
  status,
}) => {
  return (
    <div className="flex md:hidden items-center justify-between border-t border-gray-200 bg-white p-3 shadow-lg">
      <button
        onClick={onOpenSidebar}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition"
      >
        <span>Edit Metadata</span>
      </button>

      <span className="text-xs text-gray-500 capitalize">Status: {status}</span>
    </div>
  );
};

export default MobileBottomBar;
