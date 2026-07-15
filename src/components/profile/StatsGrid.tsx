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
    { icon: Star, label: 'Total Stars', value: formatNumber(totalStars), color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.15)' },
    { icon: GitFork, label: 'Total Forks', value: formatNumber(totalForks), color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.15)' },
    { icon: BookOpen, label: 'Repositories', value: formatNumber(user.public_repos), color: '#818cf8', bg: 'rgba(129,140,248,0.08)', border: 'rgba(129,140,248,0.15)' },
    { icon: FileCode2, label: 'Public Gists', value: formatNumber(user.public_gists), color: '#34d399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.15)' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-full">
      {stats.map((s) => (
        <div key={s.label} className="card card-hover flex flex-col" style={{ padding: '18px' }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 flex-shrink-0" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
            <s.icon size={16} style={{ color: s.color }} />
          </div>
          <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
          <p className="text-xs mt-1" style={{ color: '#7d8590' }}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}
