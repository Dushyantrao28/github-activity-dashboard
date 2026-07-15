'use client';

import { Search } from 'lucide-react';

interface P {
  search: string; onSearch: (v: string) => void;
  language: string; onLanguage: (v: string) => void;
  sort: string; onSort: (v: string) => void;
  languages: string[];
  totalCount: number; filteredCount: number;
}

const SORTS = [
  { value: 'stars',   label: 'Most Stars' },
  { value: 'forks',   label: 'Most Forks' },
  { value: 'updated', label: 'Recently Updated' },
  { value: 'name',    label: 'Name A–Z' },
  { value: 'size',    label: 'Largest' },
];

const selectStyle: React.CSSProperties = {
  background: '#161b22', border: '1px solid #30363d', borderRadius: 8,
  color: '#e6edf3', fontSize: 13, padding: '7px 30px 7px 12px',
  outline: 'none', cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237d8590' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
  transition: 'border-color 0.15s',
};

export function FilterBar({ search, onSearch, language, onLanguage, sort, onSort, languages, totalCount, filteredCount }: P) {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
        <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#484f58', pointerEvents: 'none' }} />
        <input
          id="repo-search"
          className="input"
          type="text"
          placeholder="Search repositories..."
          value={search}
          onChange={e => onSearch(e.target.value)}
          style={{ paddingLeft: 32, width: '100%', fontSize: 13 }}
        />
      </div>
      <select id="language-filter" value={language} onChange={e => onLanguage(e.target.value)} style={selectStyle}>
        <option value="">All Languages</option>
        {languages.map(l => <option key={l} value={l}>{l}</option>)}
      </select>
      <select id="sort-select" value={sort} onChange={e => onSort(e.target.value)} style={selectStyle}>
        {SORTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <span style={{ fontSize: 13, color: '#7d8590', whiteSpace: 'nowrap' }}>
        <span style={{ color: '#e6edf3', fontWeight: 600 }}>{filteredCount}</span> / {totalCount} repos
      </span>
    </div>
  );
}
