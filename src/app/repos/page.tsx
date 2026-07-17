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
    const s = new Set(repos?.map(r => r.language).filter(Boolean) as string[]);
    return Array.from(s).sort();
  }, [repos]);

  const filtered = useMemo(() => {
    let list = repos ?? [];
    if (search) list = list.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.description?.toLowerCase().includes(search.toLowerCase()));
    if (language) list = list.filter(r => r.language === language);
    const sorted = [...list];
    switch (sort) {
      case 'stars':   sorted.sort((a, b) => b.stargazers_count - a.stargazers_count); break;
      case 'forks':   sorted.sort((a, b) => b.forks_count - a.forks_count); break;
      case 'updated': sorted.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()); break;
      case 'name':    sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'size':    sorted.sort((a, b) => b.size - a.size); break;
    }
    return sorted;
  }, [repos, search, language, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <AppShell>
      <div className="page-content">
        <div className="animate-fade-up" style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>Repository Explorer</h1>
          <p style={{ color: '#7d8590', fontSize: 14 }}>Browse, filter, and search all your public repositories</p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <FilterBar
            search={search} onSearch={v => { setSearch(v); setPage(1); }}
            language={language} onLanguage={v => { setLanguage(v); setPage(1); }}
            sort={sort} onSort={v => { setSort(v); setPage(1); }}
            languages={languages}
            totalCount={repos?.length ?? 0}
            filteredCount={filtered.length}
          />
        </div>

        {isLoading ? (
          <div className="repo-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
            {Array.from({ length: 12 }).map((_, i) => <RepoCardSkeleton key={i} />)}
          </div>
        ) : paginated.length > 0 ? (
          <div className="repo-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
            {paginated.map(repo => <RepoCard key={repo.id} repo={repo} />)}
          </div>
        ) : (
          <EmptyState icon={GitBranch} title="No repositories found" description="Try adjusting your search or filter criteria" />
        )}

        {totalPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 32 }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="btn btn-secondary" style={{ padding: '7px 12px', display: 'flex', gap: 4, alignItems: 'center' }}>
              <ChevronLeft size={15} /> Prev
            </button>
            <div style={{ display: 'flex', gap: 4 }}>
              {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                const pg = Math.max(1, Math.min(page - 3 + i, totalPages - 6 + i));
                if (pg < 1 || pg > totalPages) return null;
                return (
                  <button key={pg} onClick={() => setPage(pg)}
                    className={pg === page ? 'btn btn-primary' : 'btn btn-secondary'}
                    style={{ padding: '7px 13px', minWidth: 38 }}
                  >{pg}</button>
                );
              })}
            </div>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="btn btn-secondary" style={{ padding: '7px 12px', display: 'flex', gap: 4, alignItems: 'center' }}>
              Next <ChevronRight size={15} />
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
