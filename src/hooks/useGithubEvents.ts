import { useQuery } from '@tanstack/react-query';
import type { GithubEvent } from '@/types/github';
import { useSession } from 'next-auth/react';

export function useGithubEvents(username: string | null) {
  const { data: session } = useSession();
  const token = (session as any)?.accessToken;

  return useQuery<GithubEvent[], Error>({
    queryKey: ['github-events', username],
    queryFn: async () => {
      if (!username) throw new Error('No username');
      const headers: HeadersInit = { Accept: 'application/vnd.github.v3+json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(
        `https://api.github.com/users/${username}/events?per_page=100`,
        { headers }
      );
      if (!res.ok) throw new Error(`Failed to fetch events: ${res.statusText}`);
      return res.json();
    },
    enabled: !!username,
    staleTime: 2 * 60 * 1000,
  });
}
