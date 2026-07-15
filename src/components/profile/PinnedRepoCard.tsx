import type { GithubRepo } from '@/types/github';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import { formatNumber, timeAgo, getLanguageColor } from '@/lib/utils';

export function PinnedRepoCard({ repo }: { repo: GithubRepo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-hover flex flex-col group"
      style={{ padding: '16px', textDecoration: 'none' }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-sm font-semibold truncate group-hover:text-sky-400 transition-colors" style={{ color: '#e2e8f0' }}>
          {repo.name}
        </h3>
        <ExternalLink size={13} className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#38bdf8' }} />
      </div>

      {repo.description && (
        <p className="text-xs leading-relaxed line-clamp-2 mb-3 flex-1" style={{ color: '#7d8590' }}>{repo.description}</p>
      )}

      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {repo.topics.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(56,189,248,0.08)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.15)' }}>
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 mt-auto pt-3" style={{ borderTop: '1px solid #21262d' }}>
        {repo.language && (
          <span className="flex items-center gap-1.5 text-xs" style={{ color: '#7d8590' }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1 text-xs" style={{ color: '#7d8590' }}>
          <Star size={11} /> {formatNumber(repo.stargazers_count)}
        </span>
        <span className="flex items-center gap-1 text-xs" style={{ color: '#7d8590' }}>
          <GitFork size={11} /> {formatNumber(repo.forks_count)}
        </span>
        <span className="ml-auto text-[10px]" style={{ color: '#3d444d' }}>{timeAgo(repo.updated_at)}</span>
      </div>
    </a>
  );
}
