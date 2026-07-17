import type { GithubUser, GithubRepo, ContributionData } from '@/types/github';
import { Star, GitFork, BookOpen, Flame, Trophy } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export function StatsGrid({ user, repos, contributions }: { user: GithubUser; repos?: GithubRepo[]; contributions?: ContributionData }) {
  const totalStars = repos?.reduce((a, r) => a + r.stargazers_count, 0) ?? 0;
  const totalForks = repos?.reduce((a, r) => a + r.forks_count, 0) ?? 0;
  const mostStarred = repos?.filter(r => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count)[0] ?? null;

  const stats = [
    { icon: Star,    label: 'Total Stars',    value: formatNumber(totalStars),  color: '#e3b341' },
    { icon: GitFork, label: 'Total Forks',    value: formatNumber(totalForks),  color: '#58a6ff' },
    { icon: BookOpen,label: 'Repositories',   value: formatNumber(user.public_repos), color: '#bc8cff' },
    { icon: Flame,   label: 'Longest Streak', value: contributions ? `${contributions.longestStreak}d` : '—', color: '#ff7b72' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* 4-stat grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {stats.map((s) => (
          <div key={s.label} className="card" style={{ padding: '16px 18px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: s.color }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: 'var(--fg-muted)', fontWeight: 500 }}>{s.label}</span>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: `${s.color}18`, border: `1px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.icon size={13} style={{ color: s.color }} />
              </div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.color, letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Most Starred Repo — full width card */}
      {mostStarred && (
        <a
          href={mostStarred.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="card"
          style={{ padding: '14px 18px', position: 'relative', overflow: 'hidden', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 14, transition: 'border-color 0.15s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e3b341'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)'; }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#e3b341' }} />
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(227,179,65,0.1)', border: '1px solid rgba(227,179,65,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Trophy size={16} style={{ color: '#e3b341' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, color: 'var(--fg-muted)', fontWeight: 500, marginBottom: 3 }}>Most Starred Repository</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#58a6ff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {mostStarred.name}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
            <Star size={14} style={{ color: '#e3b341' }} />
            <span style={{ fontSize: 18, fontWeight: 800, color: '#e3b341', letterSpacing: '-0.02em' }}>{formatNumber(mostStarred.stargazers_count)}</span>
          </div>
        </a>
      )}
    </div>
  );
}
