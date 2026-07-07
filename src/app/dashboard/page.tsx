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
import { Star } from 'lucide-react';

export default function DashboardPage() {
  const { data: session } = useSession();
  const login = (session as any)?.user?.login;

  const { data: user, isLoading: userLoading, error: userError, refetch: refetchUser } = useGithubUser(login);
  const { data: repos, isLoading: reposLoading } = useGithubRepos(login);
  const { data: contributions, isLoading: contribLoading } = useContributions(login);
  const { data: commits, isLoading: commitsLoading } = useCommitActivity(login);
  const { data: languages, isLoading: langsLoading } = useLanguageStats(repos);

  const topRepos = repos?.filter((r) => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6) ?? [];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome back, <span className="gradient-text">{session?.user?.name?.split(' ')[0] ?? login}</span> 👋
          </h1>
          <p className="text-slate-500 text-sm mt-1">Here's an overview of your GitHub activity</p>
        </div>

        {/* Profile + Stats */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1">
            {userLoading ? <ProfileCardSkeleton /> : userError ? (
              <ErrorCard message={userError.message} onRetry={() => refetchUser()} />
            ) : user ? (
              <AvatarCard user={user} />
            ) : null}
          </div>
          <div className="xl:col-span-2">
            {userLoading || reposLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[1,2,3,4].map(i => <div key={i} className="glass rounded-2xl p-5 h-28 shimmer" />)}
              </div>
            ) : user ? (
              <StatsGrid user={user} repos={repos} />
            ) : null}
          </div>
        </div>

        {/* Contribution Heatmap */}
        {contribLoading ? <HeatmapSkeleton /> : contributions ? (
          <ContributionHeatmap data={contributions} username={login ?? ''} />
        ) : null}

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {commitsLoading ? <ChartSkeleton /> : commits && commits.length > 0 ? (
            <CommitChart data={commits} />
          ) : <EmptyState title="No commit data" description="No push events found in the last 6 months" />}

          {langsLoading ? <ChartSkeleton /> : languages && languages.length > 0 ? (
            <LanguageDonut data={languages} />
          ) : <EmptyState title="No language data" description="No language data available" />}
        </div>

        {/* Top Repos */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Top Repositories</h2>
            <a href="/repos" className="text-sm text-sky-400 hover:text-sky-300 transition-colors">View all →</a>
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
