import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import type { ContributionData } from '@/types/github';
import { fetchContributions, buildContributionsFromEvents } from '@/lib/github-graphql';

export function useContributions(username: string | null) {
  const { data: session } = useSession();
  const token = (session as any)?.accessToken;

  return useQuery<ContributionData, Error>({
    queryKey: ['contributions', username],
    queryFn: async () => {
      if (!username) throw new Error('No username');
      if (token) {
        try {
          return await fetchContributions(username, token);
        } catch {
          // fall through to REST fallback
        }
      }
      const headers: HeadersInit = { Accept: 'application/vnd.github.v3+json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(
        `https://api.github.com/users/${username}/events?per_page=100`,
        { headers }
      );
      const events = res.ok ? await res.json() : [];
      return buildContributionsFromEvents(events);
    },
    enabled: !!username,
    staleTime: 10 * 60 * 1000,
  });
}
