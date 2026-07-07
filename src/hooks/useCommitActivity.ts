import { useQuery } from '@tanstack/react-query';
import { useGithubEvents } from './useGithubEvents';
import type { CommitActivity } from '@/types/github';
import { format, subMonths, eachWeekOfInterval, startOfWeek } from 'date-fns';

export function useCommitActivity(username: string | null) {
  const { data: events } = useGithubEvents(username);

  return useQuery<CommitActivity[], Error>({
    queryKey: ['commit-activity', username],
    queryFn: async () => {
      const pushEvents = (events ?? []).filter((e) => e.type === 'PushEvent');

      const now = new Date();
      const sixMonthsAgo = subMonths(now, 6);
      const weeks = eachWeekOfInterval({ start: sixMonthsAgo, end: now });

      const countByWeek: Record<string, number> = {};
      weeks.forEach((w) => {
        countByWeek[format(startOfWeek(w), 'MMM d')] = 0;
      });

      pushEvents.forEach((e) => {
        const d = new Date(e.created_at);
        if (d >= sixMonthsAgo) {
          const weekKey = format(startOfWeek(d), 'MMM d');
          countByWeek[weekKey] = (countByWeek[weekKey] || 0) + (e.payload?.size ?? 1);
        }
      });

      return Object.entries(countByWeek).map(([week, commits]) => ({
        date: week,
        commits,
        week,
      }));
    },
    enabled: !!events,
    staleTime: 5 * 60 * 1000,
  });
}
