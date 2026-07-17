'use client';

import { useSession } from 'next-auth/react';
import { AppShell } from '@/components/layout/AppShell';
import { ContributionHeatmap } from '@/components/charts/ContributionHeatmap';
import { CommitChart } from '@/components/charts/CommitChart';
import { LanguageDonut } from '@/components/charts/LanguageDonut';
import { ChartSkeleton, HeatmapSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { useGithubRepos } from '@/hooks/useGithubRepos';
import { useContributions } from '@/hooks/useContributions';
import { useCommitActivity } from '@/hooks/useCommitActivity';
import { useLanguageStats } from '@/hooks/useLanguageStats';
import { Star, GitFork, GitCommit, Code2, Trophy } from 'lucide-react';
import { formatNumber, getLanguageColor } from '@/lib/utils';

export default function ChartsPage() {
  const { data: session } = useSession();
  const login = (session as any)?.user?.login;

  const { data: repos } = useGithubRepos(login);
  const { data: contributions, isLoading: cL } = useContributions(login);
  const { data: commits, isLoading: cmL } = useCommitActivity(login);
  const { data: languages, isLoading: lL } = useLanguageStats(repos);

  const totalStars = repos?.reduce((s, r) => s + r.stargazers_count, 0) ?? 0;
  const totalForks = repos?.reduce((s, r) => s + r.forks_count, 0) ?? 0;
  const totalCommits = commits?.reduce((s, c) => s + c.commits, 0) ?? 0;
  const topLanguage = languages?.[0]?.name ?? '—';
  const topRepos = repos?.filter(r => !r.fork).sort((a,b) => b.stargazers_count - a.stargazers_count).slice(0, 10) ?? [];

  const summaryCards = [
    { icon: Star,      label: 'Total Stars',    value: formatNumber(totalStars),  color: '#e3b341' },
    { icon: GitFork,   label: 'Total Forks',    value: formatNumber(totalForks),  color: '#58a6ff' },
    { icon: GitCommit, label: 'Commits (6mo)',  value: formatNumber(totalCommits), color: '#bc8cff' },
    { icon: Code2,     label: 'Top Language',   value: topLanguage,               color: '#3fb950' },
  ];

  return (
    <AppShell>
      <div className="page-content">
        <div className="animate-fade-up" style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>Analytics</h1>
          <p style={{ color: 'var(--fg-muted)', fontSize: 14 }}>In-depth view of your coding patterns and GitHub activity</p>
        </div>

        {/* Summary — 4 cols → 2×2 on tablet/mobile via CSS class */}
        <div className="responsive-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 16 }}>
          {summaryCards.map(s => (
            <div key={s.label} className="card" style={{ padding: '16px 18px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: s.color }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{s.label}</span>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: `${s.color}18`, border: `1px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <s.icon size={13} style={{ color: s.color }} />
                </div>
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: s.color, letterSpacing: '-0.03em' }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Heatmap */}
        <div style={{ marginBottom: 16 }}>
          {cL ? <HeatmapSkeleton /> : contributions ? <ContributionHeatmap data={contributions} username={login ?? ''} /> : null}
        </div>

        {/* Charts */}
        <div className="responsive-grid-charts" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16, marginBottom: 16 }}>
          <div>{cmL ? <ChartSkeleton /> : commits?.length ? <CommitChart data={commits} /> : <EmptyState title="No commit data" />}</div>
          <div>{lL ? <ChartSkeleton /> : languages?.length ? <LanguageDonut data={languages} /> : <EmptyState title="No language data" />}</div>
        </div>

        {/* Leaderboard */}
        <div className="card" style={{ padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <Trophy size={16} style={{ color: '#e3b341' }} />
            <h2 style={{ fontSize: 15, fontWeight: 600 }}>Most Starred Repositories</h2>
          </div>
          <div>
            {topRepos.map((repo, i) => {
              const maxStars = topRepos[0]?.stargazers_count || 1;
              return (
                <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < topRepos.length - 1 ? '1px solid #21262d' : 'none', textDecoration: 'none', flexWrap: 'wrap' }}
                >
                  <span style={{ fontSize: 12, fontFamily: 'monospace', width: 24, textAlign: 'right', color: i < 3 ? '#e3b341' : 'var(--fg-subtle)', fontWeight: 700 }}>#{i+1}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#58a6ff', flex: '1 1 120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{repo.name}</span>
                  {repo.language && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: getLanguageColor(repo.language) }} />
                      <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{repo.language}</span>
                    </span>
                  )}
                  <div style={{ flex: '2 1 100px', height: 6, background: 'var(--border-muted)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(repo.stargazers_count / maxStars) * 100}%`, background: 'linear-gradient(90deg,#1f6feb,#388bfd)', borderRadius: 3 }} />
                  </div>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#e3b341', fontWeight: 600, flexShrink: 0 }}>
                    <Star size={12} /> {formatNumber(repo.stargazers_count)}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
