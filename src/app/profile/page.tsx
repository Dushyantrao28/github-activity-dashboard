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
import { Search, User } from 'lucide-react';

function ProfileContent() {
  const { data: session } = useSession();
  const sp = useSearchParams();
  const router = useRouter();
  const myLogin = (session as any)?.user?.login;
  const queryUser = sp.get('user');
  const target = queryUser || myLogin;
  const [input, setInput] = useState(queryUser || '');

  const { data: user, isLoading: uL, error: uE, refetch: uR } = useGithubUser(target);
  const { data: repos, isLoading: rL } = useGithubRepos(target);
  const { data: contributions, isLoading: cL } = useContributions(target);

  const topRepos = repos?.filter(r => !r.fork).sort((a,b) => b.stargazers_count - a.stargazers_count).slice(0, 9) ?? [];

  return (
    <AppShell>
      <div className="page-content">
        <div className="animate-fade-up" style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>Profile Explorer</h1>
          <p style={{ color: '#7d8590', fontSize: 14 }}>View any GitHub user&apos;s public profile and activity</p>
        </div>

        {/* Search */}
        <form onSubmit={e => { e.preventDefault(); if (input.trim()) router.push(`/profile?user=${encodeURIComponent(input.trim())}`); }} style={{ display: 'flex', gap: 8, marginBottom: 24, maxWidth: 480 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#484f58', pointerEvents: 'none' }} />
            <input
              id="profile-search-input"
              className="input"
              type="text"
              placeholder="Search GitHub username..."
              value={input}
              onChange={e => setInput(e.target.value)}
              style={{ paddingLeft: 32, width: '100%', fontSize: 13 }}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ padding: '8px 18px' }}>
            <Search size={14} /> Search
          </button>
          {queryUser && (
            <button type="button" onClick={() => { setInput(''); router.push('/profile'); }} className="btn btn-secondary" style={{ padding: '8px 14px' }}>
              <User size={14} />
            </button>
          )}
        </form>

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
            ) : user ? <StatsGrid user={user} repos={repos} /> : null}
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

export default function ProfilePage() {
  return <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0d1117' }} />}><ProfileContent /></Suspense>;
}
