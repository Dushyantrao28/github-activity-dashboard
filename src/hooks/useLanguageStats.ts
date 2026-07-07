import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import type { GithubRepo, LanguageStat } from '@/types/github';
import { getLanguageColor } from '@/lib/utils';

export function useLanguageStats(repos: GithubRepo[] | undefined) {
  const { data: session } = useSession();
  const token = (session as any)?.accessToken;

  const top10 = repos?.filter((r) => !r.fork && r.language).slice(0, 10) ?? [];

  return useQuery<LanguageStat[], Error>({
    queryKey: ['language-stats', top10.map((r) => r.full_name)],
    queryFn: async () => {
      const headers: HeadersInit = { Accept: 'application/vnd.github.v3+json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const allLanguages: Record<string, number> = {};

      await Promise.all(
        top10.map(async (repo) => {
          try {
            const res = await fetch(
              `https://api.github.com/repos/${repo.full_name}/languages`,
              { headers }
            );
            if (res.ok) {
              const langs = await res.json();
              Object.entries(langs).forEach(([lang, bytes]) => {
                allLanguages[lang] = (allLanguages[lang] || 0) + (bytes as number);
              });
            }
          } catch {}
        })
      );

      const total = Object.values(allLanguages).reduce((a, b) => a + b, 0);
      if (total === 0) {
        repos?.forEach((r) => {
          if (r.language) {
            allLanguages[r.language] = (allLanguages[r.language] || 0) + 1;
          }
        });
      }

      const grandTotal = Object.values(allLanguages).reduce((a, b) => a + b, 0);

      return Object.entries(allLanguages)
        .map(([name, bytes]) => ({
          name,
          bytes,
          percentage: Math.round((bytes / grandTotal) * 100),
          color: getLanguageColor(name),
        }))
        .sort((a, b) => b.bytes - a.bytes)
        .slice(0, 8);
    },
    enabled: top10.length > 0,
    staleTime: 15 * 60 * 1000,
  });
}
