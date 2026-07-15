'use client';

import { useSession } from 'next-auth/react';
import { AppShell } from '@/components/layout/AppShell';
import { AvatarCard } from '@/components/profile/AvatarCard';
import { StatsGrid } from '@/components/profile/StatsGrid';
import { ContributionHeatmap } from '@/components/charts/ContributionHeatmap';
import { CommitChart } from '@/components/charts/CommitChart';
import { LanguageDonut } from '@/components/charts/LanguageDonut';
import { PinnedRepoCard } from '@/components/profile/PinnedRepoCard';
import { ProfileCardSkeleton, HeatmapSkeleton, ChartSkeleton, RepoCardSkeleton } from '@/components/ui/Skeleton';
import { ErrorCard } from '@/components/ui/ErrorBoundary';
import { EmptyState } from '@/components/ui/EmptyState';
import { useGithubUser } from '@/hooks/useGithubUser';
import { useGithubRepos } from '@/hooks/useGithubRepos';
import { useContributions } from '@/hooks/useContributions';
import { useCommitActivity } from '@/hooks/useCommitActivity';
import { useLanguageStats } from '@/hooks/useLanguageStats';
import { Star, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session } = useSession();
  const login = (session as any)?.user?.login;

  const { data: user, isLoading: userLoading, error: userError, refetch: refetchUser } = useGithubUser(login);
  const { data: repos, isLoading: reposLoading } = useGithubRepos(login);
  const { data: contributions, isLoading: contribLoading } = useContributions(login);
  const { data: commits, isLoading: commitsLoading } = useCommitActivity(login);
  const { data: languages, isLoading: langsLoading } = useLanguageStats(repos);

  const topRepos = repos?.filter((r) => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6) ?? [];
  const firstName = session?.user?.name?.split(' ')[0] ?? login ?? 'there';

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page header */}
        <div className="mb-8 animate-fade-up">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs" style={{ color: '#7d8590' }}>Live data from GitHub API</span>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: '#e2e8f0', letterSpacing: '-0.02em' }}>
            Good day, <span className="gradient-text">{firstName}</span> 👋
          </h1>
          <p className="text-sm mt-1" style={{ color: '#7d8590' }}>Here's a full overview of your GitHub activity and stats.</p>
        </div>

        {/* Profile + Stats */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 mb-5">
          <div className="xl:col-span-4">
            {userLoading ? <ProfileCardSkeleton /> :
             userError ? <ErrorCard message={userError.message} onRetry={() => refetchUser()} /> :
             user ? <AvatarCard user={user} /> : null}
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
          {contribLoading ? <HeatmapSkeleton /> :
           contributions ? <ContributionHeatmap data={contributions} username={login ?? ''} /> : null}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">
          <div className="lg:col-span-3">
            {commitsLoading ? <ChartSkeleton /> :
             commits && commits.length > 0 ? <CommitChart data={commits} /> :
             <EmptyState title="No commit data" description="No push events found in the last 6 months" />}
          </div>
          <div className="lg:col-span-2">
            {langsLoading ? <ChartSkeleton /> :
             languages && languages.length > 0 ? <LanguageDonut data={languages} /> :
             <EmptyState title="No language data" description="No language data available" />}
          </div>
        </div>

        {/* Top Repos */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold" style={{ color: '#e2e8f0' }}>Top Repositories</h2>
              <p className="text-xs mt-0.5" style={{ color: '#7d8590' }}>Sorted by stars</p>
            </div>
            <Link href="/repos" className="flex items-center gap-1 text-xs font-medium hover:opacity-80 transition-opacity" style={{ color: '#38bdf8' }}>
              View all <ArrowUpRight size={13} />
            </Link>
          </div>
          {reposLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1,2,3,4,5,6].map(i => <RepoCardSkeleton key={i} />)}
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
