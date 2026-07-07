import type { GithubUser } from '@/types/github';
import { MapPin, Link2, Building2, Users, CalendarDays, ExternalLink } from 'lucide-react';

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}
import { formatDate, formatNumber } from '@/lib/utils';

export function AvatarCard({ user }: { user: GithubUser }) {
  return (
    <div className="glass rounded-2xl p-6 card-hover animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="relative flex-shrink-0">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-24 h-24 rounded-2xl ring-2 ring-sky-500/20 shadow-xl"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0f172a]" />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-white">{user.name ?? user.login}</h1>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 text-sm font-medium mt-0.5 transition-colors"
          >
            @{user.login}
            <ExternalLink className="w-3 h-3" />
          </a>

          {user.bio && (
            <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-md">{user.bio}</p>
          )}

          <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-500 justify-center sm:justify-start">
            {user.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {user.location}
              </span>
            )}
            {user.company && (
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                {user.company}
              </span>
            )}
            {user.blog && (
              <a
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-sky-400 transition-colors"
              >
                <Link2 className="w-3.5 h-3.5" />
                {user.blog.replace(/https?:\/\//, '')}
              </a>
            )}
            {user.twitter_username && (
              <a
                href={`https://twitter.com/${user.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-sky-400 transition-colors"
              >
                <XIcon className="w-3.5 h-3.5" />
                @{user.twitter_username}
              </a>
            )}
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5" />
              Joined {formatDate(user.created_at)}
            </span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-6 pt-5 border-t border-slate-700/50 grid grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <p className="text-xl font-bold gradient-text-brand">{formatNumber(user.followers)}</p>
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
            <Users className="w-3 h-3" /> Followers
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xl font-bold text-white">{formatNumber(user.following)}</p>
          <p className="text-xs text-slate-500">Following</p>
        </div>
        <div className="space-y-1">
          <p className="text-xl font-bold text-white">{formatNumber(user.public_repos)}</p>
          <p className="text-xs text-slate-500">Public Repos</p>
        </div>
      </div>
    </div>
  );
}
