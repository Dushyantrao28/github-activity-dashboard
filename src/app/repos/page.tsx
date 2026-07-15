'use client';

import { useState, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { AppShell } from '@/components/layout/AppShell';
import { RepoCard } from '@/components/repos/RepoCard';
import { FilterBar } from '@/components/repos/FilterBar';
import { RepoCardSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { useGithubRepos } from '@/hooks/useGithubRepos';
import { GitBranch, ChevronLeft, ChevronRight } from 'lucide-react';

const PER_PAGE = 12;

export default function ReposPage() {
  const { data: session } = useSession();
  const login = (session as any)?.user?.login;
  const { data: repos, isLoading } = useGithubRepos(login);

  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('');
  const [sort, setSort] = useState('stars');
  const [page, setPage] = useState(1);

  const languages = useMemo(() => {
    const langs = new Set(repos?.map((r) => r.language).filter(Boolean) as string[]);
    return Array.from(langs).sort();
  }, [repos]);

  const filtered = useMemo(() => {
    let list = repos ?? [];
    if (search) list = list.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.description?.toLowerCase().includes(search.toLowerCase()));
    if (language) list = list.filter((r) => r.language === language);
    switch (sort) {
      case 'stars': list = [...list].sort((a, b) => b.stargazers_count - a.stargazers_count); break;
      case 'forks': list = [...list].sort((a, b) => b.forks_count - a.forks_count); break;
      case 'updated': list = [...list].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()); break;
      case 'name': list = [...list].sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'size': list = [...list].sort((a, b) => b.size - a.size); break;
    }
    return list;
  }, [repos, search, language, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSearch = (v: string) => { setSearch(v); setPage(1); };
  const handleLanguage = (v: string) => { setLanguage(v); setPage(1); };
  const handleSort = (v: string) => { setSort(v); setPage(1); };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-6 animate-fade-up">
          <h1 className="text-2xl font-bold" style={{ color: '#e2e8f0', letterSpacing: '-0.02em' }}>Repository Explorer</h1>
          <p className="text-sm mt-1" style={{ color: '#7d8590' }}>Browse, filter, and search all your public repositories</p>
        </div>

        {/* Filter bar */}
        <div className="mb-6">
          <FilterBar
            search={search} onSearch={handleSearch}
            language={language} onLanguage={handleLanguage}
            sort={sort} onSort={handleSort}
            languages={languages}
            totalCount={repos?.length ?? 0}
            filteredCount={filtered.length}
          />
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 12 }).map((_, i) => <RepoCardSkeleton key={i} />)}
          </div>
        ) : paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginated.map((repo) => <RepoCard key={repo.id} repo={repo} />)}
          </div>
        ) : (
          <EmptyState icon={GitBranch} title="No repositories found" description="Try adjusting your search or filter" />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="btn-secondary px-3 py-2 disabled:opacity-30" style={{ padding: '8px 12px' }}>
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                const pg = page <= 4 ? i + 1 : page >= totalPages - 3 ? totalPages - 6 + i : page - 3 + i;
                if (pg < 1 || pg > totalPages) return null;
                return (
                  <button key={pg} onClick={() => setPage(pg)}
                    className="w-9 h-9 rounded-lg text-sm font-medium transition-all"
                    style={pg === page
                      ? { background: 'rgba(56,189,248,0.1)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.2)' }
                      : { background: 'transparent', color: '#7d8590', border: '1px solid #21262d' }
                    }
                  >{pg}</button>
                );
              })}
            </div>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="btn-secondary px-3 py-2 disabled:opacity-30" style={{ padding: '8px 12px' }}>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
