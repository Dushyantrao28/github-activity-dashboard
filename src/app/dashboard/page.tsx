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
import { Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session } = useSession();
  const login = (session as any)?.user?.login;

  const { data: user, isLoading: uL, error: uE, refetch: uR } = useGithubUser(login);
  const { data: repos, isLoading: rL } = useGithubRepos(login);
  const { data: contributions, isLoading: cL } = useContributions(login);
  const { data: commits, isLoading: cmL } = useCommitActivity(login);
  const { data: languages, isLoading: lL } = useLanguageStats(repos);

  const topRepos = repos?.filter(r => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6) ?? [];
  const firstName = session?.user?.name?.split(' ')[0] ?? login ?? 'there';

  return (
    <AppShell>
      <div className="page-content">

        {/* Header */}
        <div className="animate-fade-up" style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>
            Good day, <span style={{ color: '#58a6ff' }}>{firstName}</span> 👋
          </h1>
          <p style={{ color: '#7d8590', fontSize: 14 }}>Overview of your GitHub activity and repository insights</p>
        </div>

        {/* Profile + Stats — class handles responsive */}
        <div className="responsive-grid-profile" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 16, marginBottom: 16, alignItems: 'start' }}>
          <div>
            {uL ? <ProfileCardSkeleton /> : uE ? <ErrorCard message={uE.message} onRetry={uR} /> : user ? <AvatarCard user={user} /> : null}
          </div>
          <div>
            {uL || rL ? (
              <div className="responsive-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: 100, borderRadius: 12 }} />)}
              </div>
            ) : user ? (
              <StatsGrid user={user} repos={repos} contributions={contributions} />
            ) : null}
          </div>
        </div>

        {/* Heatmap */}
        <div style={{ marginBottom: 16 }}>
          {cL ? <HeatmapSkeleton /> : contributions ? <ContributionHeatmap data={contributions} username={login ?? ''} /> : null}
        </div>

        {/* Charts row — class handles responsive */}
        <div className="responsive-grid-charts" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16, marginBottom: 24 }}>
          <div>{cmL ? <ChartSkeleton /> : commits && commits.length > 0 ? <CommitChart data={commits} /> : <EmptyState title="No commit data" description="No push events found in the last 6 months" />}</div>
          <div>{lL ? <ChartSkeleton /> : languages && languages.length > 0 ? <LanguageDonut data={languages} /> : <EmptyState title="No language data" />}</div>
        </div>

        {/* Top Repos */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 600 }}>Top Repositories</h2>
              <p style={{ fontSize: 13, color: '#7d8590', marginTop: 2 }}>Sorted by star count</p>
            </div>
            <Link href="/repos" className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
              View all <ArrowRight size={13} />
            </Link>
          </div>
          {rL ? (
            <div className="repo-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
              {[1,2,3,4,5,6].map(i => <RepoCardSkeleton key={i} />)}
            </div>
          ) : topRepos.length > 0 ? (
            <div className="repo-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
              {topRepos.map(repo => <PinnedRepoCard key={repo.id} repo={repo} />)}
            </div>
          ) : <EmptyState icon={Star} title="No repositories" description="No public repositories found" />}
        </div>
      </div>
    </AppShell>
  );
}
