import type { GithubUser, GithubRepo } from '@/types/github';
import { Star, GitFork, BookOpen, FileCode2 } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export function StatsGrid({ user, repos }: { user: GithubUser; repos?: GithubRepo[] }) {
  const totalStars = repos?.reduce((a, r) => a + r.stargazers_count, 0) ?? 0;
  const totalForks = repos?.reduce((a, r) => a + r.forks_count, 0) ?? 0;

  const stats = [
    { icon: Star, label: 'Total Stars', value: formatNumber(totalStars), color: '#e3b341', topBar: '#e3b341' },
    { icon: GitFork, label: 'Total Forks', value: formatNumber(totalForks), color: '#58a6ff', topBar: '#58a6ff' },
    { icon: BookOpen, label: 'Repositories', value: formatNumber(user.public_repos), color: '#bc8cff', topBar: '#bc8cff' },
    { icon: FileCode2, label: 'Public Gists', value: formatNumber(user.public_gists), color: '#3fb950', topBar: '#3fb950' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
      {stats.map((s) => (
        <div key={s.label} className="card" style={{ padding: '16px 18px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: s.topBar }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: '#7d8590', fontWeight: 500 }}>{s.label}</span>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: `${s.color}18`, border: `1px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <s.icon size={13} style={{ color: s.color }} />
            </div>
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: s.color, letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}
