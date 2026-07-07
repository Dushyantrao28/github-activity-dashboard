'use client';

import { useState, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { RepoCard } from '@/components/repos/RepoCard';
import { FilterBar } from '@/components/repos/FilterBar';
import { RepoCardSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { useGithubRepos } from '@/hooks/useGithubRepos';
import { GitBranch, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GithubRepo } from '@/types/github';

const PAGE_SIZE = 12;

function ReposContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const login = (session as any)?.user?.login;

  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('');
  const [sort, setSort] = useState('updated');
  const [page, setPage] = useState(1);

  const { data: repos, isLoading } = useGithubRepos(login, 100);

  // Extract unique languages
  const languages = useMemo(() => {
    if (!repos) return [];
    return [...new Set(repos.map((r) => r.language).filter(Boolean) as string[])].sort();
  }, [repos]);

  // Filter + sort
  const filtered = useMemo(() => {
    let result = repos ?? [];
    if (search) result = result.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()) || (r.description ?? '').toLowerCase().includes(search.toLowerCase()));
    if (language) result = result.filter((r) => r.language === language);
    switch (sort) {
      case 'stars': result = [...result].sort((a, b) => b.stargazers_count - a.stargazers_count); break;
      case 'forks': result = [...result].sort((a, b) => b.forks_count - a.forks_count); break;
      case 'name': result = [...result].sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'size': result = [...result].sort((a, b) => b.size - a.size); break;
      case 'updated': default: result = [...result].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    }
    return result;
  }, [repos, search, language, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearchChange = (v: string) => { setSearch(v); setPage(1); };
  const handleLanguageChange = (v: string) => { setLanguage(v); setPage(1); };
  const handleSortChange = (v: string) => { setSort(v); setPage(1); };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-white">Repository Explorer</h1>
          <p className="text-slate-500 text-sm mt-1">
            {filtered.length} repositories found
          </p>
        </div>

        <FilterBar
          search={search} onSearchChange={handleSearchChange}
          language={language} onLanguageChange={handleLanguageChange}
          sort={sort} onSortChange={handleSortChange}
          languages={languages}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 12 }).map((_, i) => <RepoCardSkeleton key={i} />)}
          </div>
        ) : paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginated.map((repo) => <RepoCard key={repo.id} repo={repo} />)}
          </div>
        ) : (
          <EmptyState
            icon={GitBranch}
            title="No repositories found"
            description={search || language ? "Try adjusting your filters" : "No public repositories found"}
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3">
            <button
              id="repos-prev-page"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-4 py-2 glass rounded-xl text-sm text-slate-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
                const p = i + 1;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${
                      page === p
                        ? 'bg-sky-500 text-white'
                        : 'glass text-slate-400 hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
            <button
              id="repos-next-page"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-4 py-2 glass rounded-xl text-sm text-slate-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}

export default function ReposPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f172a] flex items-center justify-center"><div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <ReposContent />
    </Suspense>
  );
}
