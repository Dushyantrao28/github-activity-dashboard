// GitHub REST API Types

export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
  pushed_at: string;
  private: boolean;
  archived: boolean;
  size: number;
  open_issues_count: number;
  default_branch: string;
  license: { key: string; name: string; spdx_id: string } | null;
  visibility: string;
}

export interface GithubEvent {
  id: string;
  type: string;
  actor: {
    id: number;
    login: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    commits?: Array<{ sha: string; message: string }>;
    action?: string;
    ref?: string;
    ref_type?: string;
    size?: number;
  };
  public: boolean;
  created_at: string;
}

export interface GithubLanguages {
  [language: string]: number;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: ContributionDay[];
  firstDay: string;
}

export interface ContributionData {
  totalContributions: number;
  longestStreak: number;
  currentStreak: number;
  weeks: ContributionWeek[];
}

export interface CommitActivity {
  date: string;
  commits: number;
  week: string;
}

export interface LanguageStat {
  name: string;
  bytes: number;
  percentage: number;
  color: string;
}

export interface RepoStat {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  mostStarredRepo: GithubRepo | null;
  topLanguage: string | null;
}
