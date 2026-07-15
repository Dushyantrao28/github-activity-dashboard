import type { GithubUser } from '@/types/github';
import { MapPin, Link2, Building2, CalendarDays, ExternalLink, Users, BookOpen } from 'lucide-react';
import { formatDate, formatNumber } from '@/lib/utils';

function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

export function AvatarCard({ user }: { user: GithubUser }) {
  return (
    <div className="card" style={{ padding: 20 }}>
      {/* Top row: avatar + name */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <img
            src={user.avatar_url}
            alt={user.login}
            style={{ width: 64, height: 64, borderRadius: 12, border: '2px solid #30363d', display: 'block' }}
          />
          <div style={{
            position: 'absolute', bottom: -2, right: -2,
            width: 14, height: 14, borderRadius: '50%',
            background: '#3fb950', border: '2px solid #161b22'
          }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#e6edf3', letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user.name ?? user.login}
          </div>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 13, color: '#58a6ff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 2 }}
          >
            @{user.login} <ExternalLink size={10} />
          </a>
          {user.bio && (
            <p style={{ fontSize: 12, color: '#7d8590', marginTop: 8, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {user.bio}
            </p>
          )}
        </div>
      </div>

      {/* Meta */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
        {user.company && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#7d8590' }}>
            <Building2 size={12} style={{ flexShrink: 0 }} /> <span>{user.company}</span>
          </div>
        )}
        {user.location && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#7d8590' }}>
            <MapPin size={12} style={{ flexShrink: 0 }} /> <span>{user.location}</span>
          </div>
        )}
        {user.blog && (
          <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#58a6ff', textDecoration: 'none' }}
          >
            <Link2 size={12} style={{ flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user.blog.replace(/https?:\/\//, '').slice(0, 30)}
            </span>
          </a>
        )}
        {user.twitter_username && (
          <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#7d8590', textDecoration: 'none' }}
          >
            <XIcon /> <span>@{user.twitter_username}</span>
          </a>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#7d8590' }}>
          <CalendarDays size={12} style={{ flexShrink: 0 }} /> <span>Joined {formatDate(user.created_at)}</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ borderTop: '1px solid #21262d', paddingTop: 14, display: 'flex', justifyContent: 'space-around' }}>
        <a href={`${user.html_url}?tab=followers`} target="_blank" rel="noopener noreferrer" style={{ textAlign: 'center', textDecoration: 'none' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#e6edf3' }}>{formatNumber(user.followers)}</div>
          <div style={{ fontSize: 11, color: '#7d8590', marginTop: 2, display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'center' }}><Users size={10}/> followers</div>
        </a>
        <div style={{ width: 1, background: '#21262d' }} />
        <a href={`${user.html_url}?tab=following`} target="_blank" rel="noopener noreferrer" style={{ textAlign: 'center', textDecoration: 'none' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#e6edf3' }}>{formatNumber(user.following)}</div>
          <div style={{ fontSize: 11, color: '#7d8590', marginTop: 2 }}>following</div>
        </a>
        <div style={{ width: 1, background: '#21262d' }} />
        <a href={`${user.html_url}?tab=repositories`} target="_blank" rel="noopener noreferrer" style={{ textAlign: 'center', textDecoration: 'none' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#e6edf3' }}>{formatNumber(user.public_repos)}</div>
          <div style={{ fontSize: 11, color: '#7d8590', marginTop: 2, display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'center' }}><BookOpen size={10}/> repos</div>
        </a>
      </div>
    </div>
  );
}
