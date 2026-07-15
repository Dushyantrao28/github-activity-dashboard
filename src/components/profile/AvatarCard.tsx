import type { GithubUser } from '@/types/github';
import { MapPin, Link2, Building2, Users, CalendarDays, ExternalLink } from 'lucide-react';
import { formatDate, formatNumber } from '@/lib/utils';

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

export function AvatarCard({ user }: { user: GithubUser }) {
  return (
    <div className="card card-hover h-full" style={{ padding: '20px' }}>
      {/* Avatar row */}
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-16 h-16 rounded-2xl"
            style={{ border: '2px solid #30363d' }}
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500" style={{ border: '2px solid #060912' }} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-bold truncate" style={{ color: '#e2e8f0' }}>{user.name ?? user.login}</h2>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs hover:opacity-80 transition-opacity mt-0.5"
            style={{ color: '#38bdf8' }}
          >
            @{user.login} <ExternalLink size={10} />
          </a>
          {user.bio && (
            <p className="text-xs leading-relaxed mt-2 line-clamp-2" style={{ color: '#7d8590' }}>{user.bio}</p>
          )}
        </div>
      </div>

      {/* Meta info */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {user.location && (
          <span className="flex items-center gap-1.5 text-xs" style={{ color: '#7d8590' }}>
            <MapPin size={11} /> {user.location}
          </span>
        )}
        {user.company && (
          <span className="flex items-center gap-1.5 text-xs" style={{ color: '#7d8590' }}>
            <Building2 size={11} /> {user.company}
          </span>
        )}
        {user.blog && (
          <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs hover:opacity-80 transition-opacity"
            style={{ color: '#7d8590' }}
          >
            <Link2 size={11} /> {user.blog.replace(/https?:\/\//, '').slice(0, 24)}
          </a>
        )}
        {user.twitter_username && (
          <a href={`https://twitter.com/${user.twitter_username}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs hover:opacity-80 transition-opacity"
            style={{ color: '#7d8590' }}
          >
            <XIcon className="w-3 h-3" /> @{user.twitter_username}
          </a>
        )}
        <span className="flex items-center gap-1.5 text-xs" style={{ color: '#7d8590' }}>
          <CalendarDays size={11} /> Joined {formatDate(user.created_at)}
        </span>
      </div>

      {/* Stats */}
      <div className="mt-5 pt-4 grid grid-cols-3 gap-3" style={{ borderTop: '1px solid #21262d' }}>
        {[
          { label: 'Followers', value: formatNumber(user.followers), icon: Users, color: '#38bdf8' },
          { label: 'Following', value: formatNumber(user.following), color: '#818cf8' },
          { label: 'Repos', value: formatNumber(user.public_repos), color: '#c084fc' },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] mt-0.5" style={{ color: '#7d8590' }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
