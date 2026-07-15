'use client';

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

export default function PublicProfilePage({ params }: { params: { username: string } }) {
  const target = params.username;

  const { data: user, isLoading: uL, error: uE, refetch: uR } = useGithubUser(target);
  const { data: repos, isLoading: rL } = useGithubRepos(target);
  const { data: contributions, isLoading: cL } = useContributions(target);

  const topRepos = repos?.filter(r => !r.fork).sort((a,b) => b.stargazers_count - a.stargazers_count).slice(0, 9) ?? [];

  return (
    <AppShell>
      <div className="page-content">
        <div className="animate-fade-up" style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>
            @{target}&apos;s Profile
          </h1>
          <p style={{ color: '#7d8590', fontSize: 14 }}>Public GitHub Activity Dashboard</p>
        </div>

        {/* Profile + Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 16, marginBottom: 16, alignItems: 'start' }} className="responsive-grid-profile">
          <div>
            {uL ? <ProfileCardSkeleton /> : uE ? <ErrorCard message={uE.message} onRetry={uR} /> : user ? <AvatarCard user={user} /> : null}
          </div>
          <div>
            {uL || rL ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: 96, borderRadius: 12 }} />)}
              </div>
            ) : user ? <StatsGrid user={user} repos={repos} contributions={contributions} /> : null}
          </div>
        </div>

        {/* Heatmap */}
        <div style={{ marginBottom: 16 }}>
          {cL ? <HeatmapSkeleton /> : contributions ? <ContributionHeatmap data={contributions} username={target ?? ''} /> : null}
        </div>

        {/* Top Repos */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 600 }}>Top Repositories</h2>
              <p style={{ fontSize: 13, color: '#7d8590', marginTop: 2 }}>Sorted by stars, excluding forks</p>
            </div>
            {repos && <span style={{ fontSize: 13, color: '#7d8590' }}>{repos.length} total</span>}
          </div>
          {rL ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
              {[1,2,3,4,5,6].map(i => <RepoCardSkeleton key={i} />)}
            </div>
          ) : topRepos.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
              {topRepos.map(r => <PinnedRepoCard key={r.id} repo={r} />)}
            </div>
          ) : null}
        </div>
      </div>
      <style>{`.responsive-grid-profile { @media (max-width: 960px) { grid-template-columns: 1fr !important; } }`}</style>
    </AppShell>
  );
}
