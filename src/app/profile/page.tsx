'use client';

import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { AvatarCard } from '@/components/profile/AvatarCard';
import { StatsGrid } from '@/components/profile/StatsGrid';
import { PinnedRepoCard } from '@/components/profile/PinnedRepoCard';
import { ContributionHeatmap } from '@/components/charts/ContributionHeatmap';
import { ProfileCardSkeleton, HeatmapSkeleton, RepoCardSkeleton } from '@/components/ui/Skeleton';
import { ErrorCard } from '@/components/ui/ErrorBoundary';
import { EmptyState } from '@/components/ui/EmptyState';
import { useGithubUser } from '@/hooks/useGithubUser';
import { useGithubRepos } from '@/hooks/useGithubRepos';
import { useContributions } from '@/hooks/useContributions';
import { Search, Star } from 'lucide-react';

function ProfileContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const myLogin = (session as any)?.user?.login;
  const paramUser = searchParams.get('user');
  const [searchInput, setSearchInput] = useState('');
  const [targetUser, setTargetUser] = useState<string | null>(paramUser || myLogin || null);

  const username = targetUser;

  const { data: user, isLoading: userLoading, error: userError, refetch } = useGithubUser(username);
  const { data: repos, isLoading: reposLoading } = useGithubRepos(username);
  const { data: contributions, isLoading: contribLoading } = useContributions(username);

  const topRepos = repos?.filter((r) => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 9) ?? [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setTargetUser(searchInput.trim());
      setSearchInput('');
    }
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* User search bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">GitHub Profile</h1>
            <p className="text-slate-500 text-sm mt-1">
              {targetUser && targetUser !== myLogin ? `Viewing @${targetUser}` : 'Your profile'}
            </p>
          </div>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                id="profile-search-input"
                type="text"
                placeholder="Search GitHub user..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-9 pr-4 py-2.5 bg-slate-800/60 border border-slate-700 rounded-xl text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-sky-500/50 w-52"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-sm font-medium transition-colors"
            >
              Go
            </button>
            {targetUser !== myLogin && (
              <button
                type="button"
                onClick={() => setTargetUser(myLogin || null)}
                className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-sm font-medium transition-colors"
              >
                My Profile
              </button>
            )}
          </form>
        </div>

        {/* Profile card */}
        {userLoading ? <ProfileCardSkeleton /> : userError ? (
          <ErrorCard message={userError.message} onRetry={() => refetch()} />
        ) : user ? (
          <>
            <AvatarCard user={user} />
            <StatsGrid user={user} repos={repos} />
          </>
        ) : null}

        {/* Contribution Heatmap */}
        {contribLoading ? <HeatmapSkeleton /> : contributions && (
          <ContributionHeatmap data={contributions} username={username ?? ''} />
        )}

        {/* Top Repos */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Top Repositories</h2>
          {reposLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1,2,3].map(i => <RepoCardSkeleton key={i} />)}
            </div>
          ) : topRepos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topRepos.map(repo => <PinnedRepoCard key={repo.id} repo={repo} />)}
            </div>
          ) : <EmptyState icon={Star} title="No repositories" description="No public repositories found" />}
        </div>
      </div>
    </AppShell>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f172a] flex items-center justify-center"><div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <ProfileContent />
    </Suspense>
  );
}
