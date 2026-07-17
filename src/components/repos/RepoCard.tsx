import type { GithubRepo } from '@/types/github';
import { Star, GitFork, AlertCircle, ExternalLink } from 'lucide-react';
import { formatNumber, timeAgo, getLanguageColor } from '@/lib/utils';
import { RepoSummaryPanel } from './RepoSummaryPanel';

export function RepoCard({ repo }: { repo: GithubRepo }) {
  return (
    <div
      className="card card-hover"
      style={{ padding: 16, display: 'flex', flexDirection: 'column', textDecoration: 'none', minHeight: 140 }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
          {repo.fork && <span className="badge badge-purple" style={{ fontSize: 10, flexShrink: 0 }}>fork</span>}
          {repo.archived && <span className="badge badge-orange" style={{ fontSize: 10, flexShrink: 0 }}>archived</span>}
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 600, color: '#58a6ff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
            {repo.name}
            <ExternalLink size={12} style={{ color: 'var(--fg-subtle)', flexShrink: 0 }} />
          </a>
        </div>
      </div>

      <p style={{ fontSize: 12, color: 'var(--fg-muted)', lineHeight: 1.5, flex: 1, marginBottom: 10,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {repo.description || 'No description provided.'}
      </p>

      {repo.topics?.length > 0 && (
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
          {repo.topics.slice(0, 4).map(t => (
            <span key={t} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: 'rgba(31,111,235,0.1)', color: '#58a6ff', border: '1px solid rgba(31,111,235,0.2)' }}>{t}</span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 10, borderTop: '1px solid var(--border-muted)', marginBottom: 12 }}>
        {repo.language && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--fg-muted)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: getLanguageColor(repo.language), display: 'inline-block' }} />
            {repo.language}
          </span>
        )}
        <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: 'var(--fg-muted)' }}><Star size={11} /> {formatNumber(repo.stargazers_count)}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: 'var(--fg-muted)' }}><GitFork size={11} /> {formatNumber(repo.forks_count)}</span>
        {repo.open_issues_count > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: 'var(--fg-muted)' }}><AlertCircle size={11} /> {repo.open_issues_count}</span>}
        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--fg-subtle)' }}>{timeAgo(repo.pushed_at)}</span>
      </div>

      <RepoSummaryPanel
        repoFullName={repo.full_name}
        repoName={repo.name}
        description={repo.description}
        language={repo.language}
        topics={repo.topics || []}
      />
    </div>
  );
}
