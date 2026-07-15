import type { ContributionData } from '@/types/github';

const GRAPHQL_URL = 'https://api.github.com/graphql';

const CONTRIBUTIONS_QUERY = `
  query ContributionsQuery($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            firstDay
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

const LEVEL_MAP: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export async function fetchContributions(
  username: string,
  token: string
): Promise<ContributionData> {
  const now = new Date();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: {
        username,
        from: oneYearAgo.toISOString(),
        to: now.toISOString(),
      },
    }),
  });

  if (!res.ok) throw new Error('GraphQL request failed');
  const json = await res.json();

  const calendar =
    json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) {
    return { totalContributions: 0, weeks: [] };
  }

  return {
  const weeks = calendar.weeks.map((w: any) => ({
    firstDay: w.firstDay,
    days: w.contributionDays.map((d: any) => ({
      date: d.date,
      count: d.contributionCount,
      level: LEVEL_MAP[d.contributionLevel] ?? 0,
    })),
  }));

  const { longestStreak, currentStreak } = calculateStreaks(weeks);

  return {
    totalContributions: calendar.totalContributions,
    longestStreak,
    currentStreak,
    weeks,
  };
}

export function buildContributionsFromEvents(
  events: Array<{ type: string; created_at: string }>
): ContributionData {
  const countByDate: Record<string, number> = {};
  events
    .filter((e) => e.type === 'PushEvent')
    .forEach((e) => {
      const date = e.created_at.split('T')[0];
      countByDate[date] = (countByDate[date] || 0) + 1;
    });

  const now = new Date();
  const weeks: ContributionData['weeks'] = [];
  const startDate = new Date(now);
  startDate.setFullYear(now.getFullYear() - 1);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  let current = new Date(startDate);
  while (current <= now) {
    const weekDays = [];
    const firstDay = current.toISOString().split('T')[0];
    for (let d = 0; d < 7; d++) {
      const dateStr = current.toISOString().split('T')[0];
      const count = countByDate[dateStr] || 0;
      const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4;
      weekDays.push({ date: dateStr, count, level: level as 0|1|2|3|4 });
      current.setDate(current.getDate() + 1);
    }
    weeks.push({ firstDay, days: weekDays });
  }

  const totalContributions = Object.values(countByDate).reduce((a, b) => a + b, 0);
  const { longestStreak, currentStreak } = calculateStreaks(weeks);
  return { totalContributions, longestStreak, currentStreak, weeks };
}

function calculateStreaks(weeks: ContributionData['weeks']) {
  let longestStreak = 0;
  let temp = 0;
  const today = new Date().toISOString().split('T')[0];
  const allDays = weeks.flatMap(w => w.days).filter(d => d.date <= today);
  
  for (let i = 0; i < allDays.length; i++) {
    if (allDays[i].count > 0) {
      temp++;
      longestStreak = Math.max(longestStreak, temp);
    } else {
      temp = 0;
    }
  }
  
  let currentStreak = 0;
  for (let i = allDays.length - 1; i >= 0; i--) {
    if (i === allDays.length - 1 && allDays[i].count === 0) continue;
    if (allDays[i].count > 0) currentStreak++;
    else break;
  }
  
  return { longestStreak, currentStreak };
}
