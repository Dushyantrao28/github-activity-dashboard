import type { GithubRepo } from '@/types/github';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import { formatNumber, timeAgo, getLanguageColor } from '@/lib/utils';

export function PinnedRepoCard({ repo }: { repo: GithubRepo }) {
  return (
    <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
      className="card card-hover"
      style={{ padding: '16px', display: 'flex', flexDirection: 'column', textDecoration: 'none', minHeight: 140 }}
    >
      {/* Repo name */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#58a6ff', lineHeight: 1.3 }}>{repo.name}</span>
        <ExternalLink size={12} style={{ color: 'var(--fg-subtle)', flexShrink: 0, marginTop: 2 }} />
      </div>

      {/* Description */}
      <p style={{ fontSize: 12, color: 'var(--fg-muted)', lineHeight: 1.5, flex: 1, marginBottom: 12,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {repo.description || 'No description provided.'}
      </p>

      {/* Topics */}
      {repo.topics && repo.topics.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
          {repo.topics.slice(0, 3).map(t => (
            <span key={t} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: 'rgba(31,111,235,0.12)', color: '#58a6ff', border: '1px solid rgba(31,111,235,0.2)' }}>{t}</span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 10, borderTop: '1px solid var(--border-muted)' }}>
        {repo.language && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--fg-muted)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: getLanguageColor(repo.language) }} />
            {repo.language}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: 'var(--fg-muted)' }}>
          <Star size={11} /> {formatNumber(repo.stargazers_count)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: 'var(--fg-muted)' }}>
          <GitFork size={11} /> {formatNumber(repo.forks_count)}
        </div>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--fg-subtle)' }}>Updated {timeAgo(repo.updated_at)}</span>
      </div>
    </a>
  );
}
