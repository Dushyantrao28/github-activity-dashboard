'use client';

import { useSession } from 'next-auth/react';
import { AppShell } from '@/components/layout/AppShell';
import { ContributionHeatmap } from '@/components/charts/ContributionHeatmap';
import { CommitChart } from '@/components/charts/CommitChart';
import { LanguageDonut } from '@/components/charts/LanguageDonut';
import { ChartSkeleton, HeatmapSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { useGithubUser } from '@/hooks/useGithubUser';
import { useGithubRepos } from '@/hooks/useGithubRepos';
import { useContributions } from '@/hooks/useContributions';
import { useCommitActivity } from '@/hooks/useCommitActivity';
import { useLanguageStats } from '@/hooks/useLanguageStats';
import { Star, GitFork, GitCommit, Code2, Trophy } from 'lucide-react';
import { formatNumber, getLanguageColor } from '@/lib/utils';

export default function ChartsPage() {
  const { data: session } = useSession();
  const login = (session as any)?.user?.login;

  const { data: user } = useGithubUser(login);
  const { data: repos } = useGithubRepos(login);
  const { data: contributions, isLoading: contribLoading } = useContributions(login);
  const { data: commits, isLoading: commitsLoading } = useCommitActivity(login);
  const { data: languages, isLoading: langsLoading } = useLanguageStats(repos);

  const totalStars = repos?.reduce((s, r) => s + r.stargazers_count, 0) ?? 0;
  const totalForks = repos?.reduce((s, r) => s + r.forks_count, 0) ?? 0;
  const totalCommits = commits?.reduce((s, c) => s + c.commits, 0) ?? 0;
  const topLanguage = languages?.[0]?.name ?? '—';

  const topRepos = repos?.filter(r => !r.fork).sort((a,b) => b.stargazers_count - a.stargazers_count).slice(0, 8) ?? [];

  const summaryStats = [
    { icon: Star, label: 'Total Stars', value: formatNumber(totalStars), color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.15)' },
    { icon: GitFork, label: 'Total Forks', value: formatNumber(totalForks), color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.15)' },
    { icon: GitCommit, label: 'Commits (6mo)', value: formatNumber(totalCommits), color: '#818cf8', bg: 'rgba(129,140,248,0.08)', border: 'rgba(129,140,248,0.15)' },
    { icon: Code2, label: 'Top Language', value: topLanguage, color: '#34d399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.15)' },
  ];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-6 animate-fade-up">
          <h1 className="text-2xl font-bold" style={{ color: '#e2e8f0', letterSpacing: '-0.02em' }}>Analytics</h1>
          <p className="text-sm mt-1" style={{ color: '#7d8590' }}>Deep dive into your coding patterns and activity</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          {summaryStats.map((s) => (
            <div key={s.label} className="card" style={{ padding: '18px' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                <s.icon size={16} style={{ color: s.color }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs mt-1" style={{ color: '#7d8590' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Heatmap */}
        <div className="mb-5">
          {contribLoading ? <HeatmapSkeleton /> : contributions ? <ContributionHeatmap data={contributions} username={login ?? ''} /> : null}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">
          <div className="lg:col-span-3">
            {commitsLoading ? <ChartSkeleton /> : commits && commits.length > 0 ? <CommitChart data={commits} /> : <EmptyState title="No commit data" />}
          </div>
          <div className="lg:col-span-2">
            {langsLoading ? <ChartSkeleton /> : languages && languages.length > 0 ? <LanguageDonut data={languages} /> : <EmptyState title="No language data" />}
          </div>
        </div>

        {/* Top repos leaderboard */}
        <div className="card" style={{ padding: '20px 24px' }}>
          <div className="flex items-center gap-2 mb-5">
            <Trophy size={16} style={{ color: '#f59e0b' }} />
            <h2 className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>Most Starred Repositories</h2>
          </div>
          <div className="space-y-3">
            {topRepos.map((repo, i) => {
              const maxStars = topRepos[0]?.stargazers_count || 1;
              const pct = (repo.stargazers_count / maxStars) * 100;
              return (
                <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 group hover:opacity-80 transition-opacity" style={{ textDecoration: 'none' }}
                >
                  <span className="text-xs font-mono w-5 text-right flex-shrink-0" style={{ color: i < 3 ? '#f59e0b' : '#3d444d' }}>#{i + 1}</span>
                  <span className="text-sm w-36 truncate font-medium group-hover:text-sky-400 transition-colors" style={{ color: '#e2e8f0' }}>{repo.name}</span>
                  {repo.language && (
                    <span className="flex items-center gap-1.5 w-24 flex-shrink-0">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: getLanguageColor(repo.language) }} />
                      <span className="text-xs truncate" style={{ color: '#7d8590' }}>{repo.language}</span>
                    </span>
                  )}
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#21262d' }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#38bdf8,#818cf8)', transition: 'width 0.8s ease' }} />
                  </div>
                  <span className="text-xs flex items-center gap-1 flex-shrink-0" style={{ color: '#f59e0b' }}>
                    <Star size={11} /> {formatNumber(repo.stargazers_count)}
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
