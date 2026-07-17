'use client';

import { useEffect, useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useDebounce } from '@/src/hooks/useDebounce';
interface filterOptions {
  label: string;
  value: string;
}

interface DashboardSearchBarProps {
  placeholder: string;
  filterOptions: filterOptions[];
  onSearchSubmit: (finalQuery: string) => void;
  onFilterChange: (activeFilter: string) => void;
}

export function SearchBar({
  placeholder,
  filterOptions,
  onSearchSubmit,
  onFilterChange,
}: DashboardSearchBarProps) {
  const [localQuery, setLocalQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState(
    filterOptions[0]?.value || 'all'
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSearchSubmit(localQuery.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    //
    if (value.trim() === '') {
      onSearchSubmit('');
    }
  };

  const handleClear = () => {
    onSearchSubmit('');
    setLocalQuery('');
  };

  const handleFilterClick = (value: string) => {
    setActiveFilter(value);
    onFilterChange(value);
  };

  return (
    <div className="space-y-4 w-full bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="relative w-full">
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-500 transition-colors cursor-pointer"
          type="submit"
        >
          <Search className="h-4 w-4" />
        </button>

        <input
          type="text"
          placeholder={`Search ${placeholder}...`}
          value={localQuery}
          onChange={handleInputChange}
          className="w-full bg-slate-950/60 border border-slate-800/60 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all shadow-linear"
        />

        {localQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Dynamic filter */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold uppercase tracking-wider mr-2">
          <Filter className="h-3 w-3" />
          <span>Filter:</span>
        </div>

        {filterOptions.map(option => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleFilterClick(option.value)}
            className={`text-xs font-bold px-4 py-1.5 rounded-xl border transition-all cursor-pointer capitalize ${activeFilter === option.value ? ' bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-950/40' : 'bg-slate-950/40 hover:bg-slate-800/60 border-slate-800/80 text-slate-400 hover:text-slate-200'}`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
