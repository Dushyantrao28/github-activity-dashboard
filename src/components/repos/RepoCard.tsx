import type { GithubRepo } from '@/types/github';
import { Star, GitFork, Eye, AlertCircle, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatNumber, timeAgo } from '@/lib/utils';

export function RepoCard({ repo }: { repo: GithubRepo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass rounded-2xl p-5 flex flex-col gap-3 card-hover group h-full"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white group-hover:text-sky-400 transition-colors truncate">
            {repo.name}
          </h3>
          {repo.fork && (
            <span className="text-xs text-slate-600">forked</span>
          )}
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {repo.archived && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-slate-700/60 text-slate-500 border border-slate-600/50">archived</span>
          )}
          <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />
        </div>
      </div>

      {repo.description && (
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 flex-1">{repo.description}</p>
      )}

      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((t) => (
            <span key={t} className="px-2 py-0.5 bg-sky-500/10 text-sky-400 rounded-full text-xs border border-sky-500/20">
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 pt-2 border-t border-slate-700/50 flex-wrap">
        {repo.language && <Badge label={repo.language} variant="language" />}
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <Star className="w-3 h-3 text-amber-400" />
          {formatNumber(repo.stargazers_count)}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <GitFork className="w-3 h-3" />
          {formatNumber(repo.forks_count)}
        </span>
        {repo.open_issues_count > 0 && (
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <AlertCircle className="w-3 h-3 text-red-400" />
            {repo.open_issues_count}
          </span>
        )}
        <span className="ml-auto text-xs text-slate-600">{timeAgo(repo.updated_at)}</span>
      </div>
    </a>
  );
}
