'use client';

import { useSession } from 'next-auth/react';
import { AppShell } from '@/components/layout/AppShell';
import { CommitChart } from '@/components/charts/CommitChart';
import { LanguageDonut } from '@/components/charts/LanguageDonut';
import { ContributionHeatmap } from '@/components/charts/ContributionHeatmap';
import { ChartSkeleton, HeatmapSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorCard } from '@/components/ui/ErrorBoundary';
import { useGithubRepos } from '@/hooks/useGithubRepos';
import { useContributions } from '@/hooks/useContributions';
import { useCommitActivity } from '@/hooks/useCommitActivity';
import { useLanguageStats } from '@/hooks/useLanguageStats';
import { BarChart3, Star, GitFork, TrendingUp } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export default function ChartsPage() {
  const { data: session } = useSession();
  const login = (session as any)?.user?.login;

  const { data: repos } = useGithubRepos(login);
  const { data: contributions, isLoading: contribLoading } = useContributions(login);
  const { data: commits, isLoading: commitsLoading } = useCommitActivity(login);
  const { data: languages, isLoading: langsLoading } = useLanguageStats(repos);

  const totalStars = repos?.reduce((acc, r) => acc + r.stargazers_count, 0) ?? 0;
  const totalForks = repos?.reduce((acc, r) => acc + r.forks_count, 0) ?? 0;
  const totalCommits = commits?.reduce((acc, c) => acc + c.commits, 0) ?? 0;
  const topLang = languages?.[0]?.name ?? 'N/A';

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics & Charts</h1>
          <p className="text-slate-500 text-sm mt-1">Deep dive into your GitHub statistics</p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Star, label: 'Total Stars', value: formatNumber(totalStars), color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20' },
            { icon: GitFork, label: 'Total Forks', value: formatNumber(totalForks), color: 'text-sky-400', bg: 'bg-sky-400/10 border-sky-400/20' },
            { icon: TrendingUp, label: 'Commits (6mo)', value: formatNumber(totalCommits), color: 'text-violet-400', bg: 'bg-violet-400/10 border-violet-400/20' },
            { icon: BarChart3, label: 'Top Language', value: topLang, color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20' },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 card-hover">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 ${s.bg}`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Heatmap */}
        {contribLoading ? <HeatmapSkeleton /> : contributions ? (
          <ContributionHeatmap data={contributions} username={login ?? ''} />
        ) : <EmptyState title="No contribution data" />}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {commitsLoading ? <ChartSkeleton /> : commits && commits.length > 0 ? (
            <CommitChart data={commits} />
          ) : <EmptyState title="No commit data" description="No push events found in the last 6 months" />}

          {langsLoading ? <ChartSkeleton /> : languages && languages.length > 0 ? (
            <LanguageDonut data={languages} />
          ) : <EmptyState title="No language data" />}
        </div>

        {/* Most starred repos table */}
        {repos && repos.length > 0 && (
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Most Starred Repositories</h2>
            <div className="space-y-3">
              {[...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 8).map((repo, i) => (
                <div key={repo.id} className="flex items-center gap-4 py-2 border-b border-slate-700/40 last:border-0">
                  <span className="text-xs font-mono text-slate-600 w-5">#{i + 1}</span>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-sm text-slate-200 hover:text-sky-400 transition-colors truncate font-medium"
                  >
                    {repo.name}
                  </a>
                  {repo.language && (
                    <span className="text-xs text-slate-500 hidden sm:block">{repo.language}</span>
                  )}
                  <div className="flex items-center gap-1 text-xs text-amber-400">
                    <Star className="w-3 h-3" />
                    {formatNumber(repo.stargazers_count)}
                  </div>
                  <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-violet-500 rounded-full"
                      style={{ width: `${(repo.stargazers_count / (repos[0]?.stargazers_count || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
