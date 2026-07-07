import { useQuery } from '@tanstack/react-query';
import type { GithubRepo } from '@/types/github';
import { useSession } from 'next-auth/react';

export function useGithubRepos(username: string | null, perPage = 100) {
  const { data: session } = useSession();
  const token = (session as any)?.accessToken;

  return useQuery<GithubRepo[], Error>({
    queryKey: ['github-repos', username, perPage],
    queryFn: async () => {
      if (!username) throw new Error('No username');
      const headers: HeadersInit = { Accept: 'application/vnd.github.v3+json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=${perPage}&sort=updated&type=owner`,
        { headers }
      );
      if (!res.ok) throw new Error(`Failed to fetch repos: ${res.statusText}`);
      return res.json();
    },
    enabled: !!username,
    staleTime: 5 * 60 * 1000,
  });
}
