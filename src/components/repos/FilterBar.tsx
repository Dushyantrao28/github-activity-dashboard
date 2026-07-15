'use client';

import { Search, SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  search: string;
  onSearch: (v: string) => void;
  language: string;
  onLanguage: (v: string) => void;
  sort: string;
  onSort: (v: string) => void;
  languages: string[];
  totalCount: number;
  filteredCount: number;
}

const SORT_OPTIONS = [
  { value: 'updated', label: 'Recently Updated' },
  { value: 'stars', label: 'Most Stars' },
  { value: 'forks', label: 'Most Forks' },
  { value: 'name', label: 'Name A–Z' },
  { value: 'size', label: 'Largest' },
];

export function FilterBar({ search, onSearch, language, onLanguage, sort, onSort, languages, totalCount, filteredCount }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      {/* Search */}
      <div className="relative flex-1 min-w-0">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#3d444d' }} />
        <input
          id="repo-search"
          type="text"
          placeholder="Search repositories..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="input-dark w-full pl-9 pr-4 py-2.5 text-sm"
        />
      </div>

      <div className="flex gap-2 flex-shrink-0">
        {/* Language filter */}
        <select
          id="language-filter"
          value={language}
          onChange={(e) => onLanguage(e.target.value)}
          className="input-dark px-3 py-2.5 text-sm pr-8 cursor-pointer appearance-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237d8590' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
        >
          <option value="">All Languages</option>
          {languages.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>

        {/* Sort */}
        <select
          id="sort-select"
          value={sort}
          onChange={(e) => onSort(e.target.value)}
          className="input-dark px-3 py-2.5 text-sm pr-8 cursor-pointer appearance-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237d8590' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
        >
          {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      <div className="text-xs flex-shrink-0" style={{ color: '#7d8590' }}>
        <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{filteredCount}</span> / {totalCount} repos
      </div>
    </div>
  );
}
