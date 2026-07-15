import type { GithubRepo } from '@/types/github';
import { Star, GitFork, Eye, ExternalLink, AlertCircle } from 'lucide-react';
import { formatNumber, timeAgo, getLanguageColor } from '@/lib/utils';

export function RepoCard({ repo }: { repo: GithubRepo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-hover flex flex-col group"
      style={{ padding: '16px', textDecoration: 'none' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-start gap-2 min-w-0">
          {repo.fork && (
            <span className="flex-shrink-0 mt-0.5 text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(129,140,248,0.1)', color: '#818cf8', border: '1px solid rgba(129,140,248,0.2)' }}>fork</span>
          )}
          {repo.archived && (
            <span className="flex-shrink-0 mt-0.5 text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' }}>archived</span>
          )}
          <h3 className="text-sm font-semibold truncate group-hover:text-sky-400 transition-colors" style={{ color: '#e2e8f0' }}>
            {repo.name}
          </h3>
        </div>
        <ExternalLink size={13} className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#38bdf8' }} />
      </div>

      {/* Description */}
      {repo.description ? (
        <p className="text-xs leading-relaxed line-clamp-2 mb-3 flex-1" style={{ color: '#7d8590' }}>{repo.description}</p>
      ) : (
        <p className="text-xs mb-3 flex-1" style={{ color: '#3d444d', fontStyle: 'italic' }}>No description</p>
      )}

      {/* Topics */}
      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {repo.topics.slice(0, 4).map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(56,189,248,0.06)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.12)' }}>
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Footer stats */}
      <div className="flex items-center gap-3 pt-3" style={{ borderTop: '1px solid #21262d' }}>
        {repo.language && (
          <span className="flex items-center gap-1.5 text-[11px]" style={{ color: '#7d8590' }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1 text-[11px]" style={{ color: '#7d8590' }}>
          <Star size={11} /> {formatNumber(repo.stargazers_count)}
        </span>
        <span className="flex items-center gap-1 text-[11px]" style={{ color: '#7d8590' }}>
          <GitFork size={11} /> {formatNumber(repo.forks_count)}
        </span>
        {repo.open_issues_count > 0 && (
          <span className="flex items-center gap-1 text-[11px]" style={{ color: '#7d8590' }}>
            <AlertCircle size={11} /> {repo.open_issues_count}
          </span>
        )}
        <span className="ml-auto text-[10px]" style={{ color: '#3d444d' }}>{timeAgo(repo.pushed_at)}</span>
      </div>
    </a>
  );
}
