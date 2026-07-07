import type { GithubUser, GithubRepo } from '@/types/github';
import { Star, GitFork, BookOpen, FileCode2 } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

interface StatsGridProps {
  user: GithubUser;
  repos?: GithubRepo[];
}

export function StatsGrid({ user, repos }: StatsGridProps) {
  const totalStars = repos?.reduce((acc, r) => acc + r.stargazers_count, 0) ?? 0;
  const totalForks = repos?.reduce((acc, r) => acc + r.forks_count, 0) ?? 0;

  const stats = [
    {
      icon: Star,
      label: 'Total Stars',
      value: formatNumber(totalStars),
      color: 'text-amber-400',
      bg: 'bg-amber-400/10 border-amber-400/20',
    },
    {
      icon: GitFork,
      label: 'Total Forks',
      value: formatNumber(totalForks),
      color: 'text-sky-400',
      bg: 'bg-sky-400/10 border-sky-400/20',
    },
    {
      icon: BookOpen,
      label: 'Public Repos',
      value: formatNumber(user.public_repos),
      color: 'text-violet-400',
      bg: 'bg-violet-400/10 border-violet-400/20',
    },
    {
      icon: FileCode2,
      label: 'Public Gists',
      value: formatNumber(user.public_gists),
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10 border-emerald-400/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in delay-200">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`glass rounded-2xl p-5 card-hover delay-${i * 100}`}
        >
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 ${s.bg}`}>
            <s.icon className={`w-5 h-5 ${s.color}`} />
          </div>
          <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          <p className="text-xs text-slate-500 mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
