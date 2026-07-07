import { useQuery } from '@tanstack/react-query';
import type { GithubUser } from '@/types/github';
import { useSession } from 'next-auth/react';

export function useGithubUser(username: string | null) {
  const { data: session } = useSession();
  const token = (session as any)?.accessToken;

  return useQuery<GithubUser, Error>({
    queryKey: ['github-user', username],
    queryFn: async () => {
      if (!username) throw new Error('No username');
      const headers: HeadersInit = { Accept: 'application/vnd.github.v3+json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`https://api.github.com/users/${username}`, { headers });
      if (!res.ok) throw new Error(`User not found: ${res.statusText}`);
      return res.json();
    },
    enabled: !!username,
    staleTime: 5 * 60 * 1000,
  });
}
