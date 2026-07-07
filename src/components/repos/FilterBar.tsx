'use client';

import { Search, SortAsc, Filter } from 'lucide-react';
import { getLanguageColor } from '@/lib/utils';

interface FilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  language: string;
  onLanguageChange: (v: string) => void;
  sort: string;
  onSortChange: (v: string) => void;
  languages: string[];
}

export function FilterBar({
  search, onSearchChange,
  language, onLanguageChange,
  sort, onSortChange,
  languages,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          id="repo-search-input"
          type="text"
          placeholder="Search repositories..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700 rounded-xl text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all"
        />
      </div>

      {/* Language filter */}
      <div className="relative">
        <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <select
          id="repo-language-filter"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="pl-10 pr-8 py-2.5 bg-slate-800/60 border border-slate-700 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-sky-500/50 appearance-none cursor-pointer min-w-[140px]"
        >
          <option value="">All Languages</option>
          {languages.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div className="relative">
        <SortAsc className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <select
          id="repo-sort-select"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="pl-10 pr-8 py-2.5 bg-slate-800/60 border border-slate-700 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-sky-500/50 appearance-none cursor-pointer min-w-[140px]"
        >
          <option value="updated">Recently Updated</option>
          <option value="stars">Most Stars</option>
          <option value="forks">Most Forks</option>
          <option value="name">Name A–Z</option>
          <option value="size">Largest</option>
        </select>
      </div>
    </div>
  );
}
