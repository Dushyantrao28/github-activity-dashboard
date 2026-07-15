'use client';

import { Suspense, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { AvatarCard } from '@/components/profile/AvatarCard';
import { StatsGrid } from '@/components/profile/StatsGrid';
import { ContributionHeatmap } from '@/components/charts/ContributionHeatmap';
import { PinnedRepoCard } from '@/components/profile/PinnedRepoCard';
import { ProfileCardSkeleton, HeatmapSkeleton, RepoCardSkeleton } from '@/components/ui/Skeleton';
import { ErrorCard } from '@/components/ui/ErrorBoundary';
import { useGithubUser } from '@/hooks/useGithubUser';
import { useGithubRepos } from '@/hooks/useGithubRepos';
import { useContributions } from '@/hooks/useContributions';
import { Search, User, BookOpen } from 'lucide-react';

function ProfileContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const myLogin = (session as any)?.user?.login;
  const queryUser = searchParams.get('user');
  const targetUser = queryUser || myLogin;

  const [searchInput, setSearchInput] = useState(queryUser || '');

  const { data: user, isLoading: userLoading, error: userError, refetch } = useGithubUser(targetUser);
  const { data: repos, isLoading: reposLoading } = useGithubRepos(targetUser);
  const { data: contributions, isLoading: contribLoading } = useContributions(targetUser);

  const topRepos = repos?.filter(r => !r.fork).sort((a,b) => b.stargazers_count - a.stargazers_count).slice(0, 9) ?? [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) router.push(`/profile?user=${encodeURIComponent(searchInput.trim())}`);
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-6 animate-fade-up">
          <h1 className="text-2xl font-bold" style={{ color: '#e2e8f0', letterSpacing: '-0.02em' }}>Profile Explorer</h1>
          <p className="text-sm mt-1" style={{ color: '#7d8590' }}>View any GitHub user's profile and activity</p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#3d444d' }} />
            <input
              id="profile-search-input"
              type="text"
              placeholder="Search GitHub username..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="input-dark w-full pl-9 pr-4 py-2.5 text-sm"
            />
          </div>
          <button type="submit" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
            <Search size={14} /> Search
          </button>
          {queryUser && (
            <button type="button" onClick={() => { setSearchInput(''); router.push('/profile'); }}
              className="btn-secondary" style={{ padding: '10px 16px', fontSize: '14px' }}
            >
              <User size={14} /> My Profile
            </button>
          )}
        </form>

        {/* Profile + Stats */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 mb-5">
          <div className="xl:col-span-4">
            {userLoading ? <ProfileCardSkeleton /> : userError ? <ErrorCard message={userError.message} onRetry={() => refetch()} /> : user ? <AvatarCard user={user} /> : null}
          </div>
          <div className="xl:col-span-8">
            {userLoading || reposLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[1,2,3,4].map(i => <div key={i} className="card shimmer h-28" />)}
              </div>
            ) : user ? <StatsGrid user={user} repos={repos} /> : null}
          </div>
        </div>

        {/* Heatmap */}
        <div className="mb-5">
          {contribLoading ? <HeatmapSkeleton /> : contributions ? <ContributionHeatmap data={contributions} username={targetUser ?? ''} /> : null}
        </div>

        {/* Repos */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold" style={{ color: '#e2e8f0' }}>Top Repositories</h2>
              <p className="text-xs mt-0.5" style={{ color: '#7d8590' }}>Sorted by stars, excluding forks</p>
            </div>
            {repos && <span className="text-xs" style={{ color: '#7d8590' }}>{repos.length} repos total</span>}
          </div>
          {reposLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1,2,3,4,5,6].map(i => <RepoCardSkeleton key={i} />)}
            </div>
          ) : topRepos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topRepos.map(repo => <PinnedRepoCard key={repo.id} repo={repo} />)}
            </div>
          ) : null}
        </div>
      </div>
    </AppShell>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-app" />}>
      <ProfileContent />
    </Suspense>
  );
}
