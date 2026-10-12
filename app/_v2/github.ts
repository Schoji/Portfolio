const LOGIN = "Schoji";

export type HeatLevel = 0 | 1 | 2 | 3 | 4;

export type GitHubStats = {
  contributions: number;
  commits: number;
  pullRequests: number;
  repositories: number;
  /** Last 26 weeks, oldest first; each week is Sunday→Saturday. */
  weeks: { date: string; level: HeatLevel }[][];
  topRepos: { name: string; commits: number }[];
  /** True when the numbers are a stand-in rather than a live API response. */
  placeholder: boolean;
};

// Repository names → the names the projects go by on this site.
const REPO_LABELS: Record<string, string> = {
  plan_pm: "Plan PM",
  "kni-site": "KNI Website",
  "voice-assistant": "A.L.E.K.S.Y",
  "voice-assistant-v2": "A.L.E.K.S.Y v2",
  SoundNest: "SoundNest",
};

const LEVELS: Record<string, HeatLevel> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const QUERY = `
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalRepositoriesWithContributedCommits
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionLevel } }
      }
      commitContributionsByRepository(maxRepositories: 25) {
        repository { name }
        contributions { totalCount }
      }
    }
  }
}`;

type Response = {
  data?: {
    user: {
      contributionsCollection: {
        totalCommitContributions: number;
        totalPullRequestContributions: number;
        totalRepositoriesWithContributedCommits: number;
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: { date: string; contributionLevel: string }[] }[];
        };
        commitContributionsByRepository: {
          repository: { name: string };
          contributions: { totalCount: number };
        }[];
      };
    } | null;
  };
};

/**
 * The last 12 months of activity from the GitHub GraphQL API. Needs
 * GITHUB_TOKEN (a fine-grained token with no extra scopes is enough for public
 * data). Cached for an hour so a page view never waits on GitHub.
 *
 * Returns null when the data cannot be fetched. In development only, a
 * placeholder stands in so the layout can be worked on without a token; it is
 * flagged so the section can say so, and it never reaches a production build.
 */
export async function getGitHubStats(): Promise<GitHubStats | null> {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    try {
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const json = (await res.json()) as Response;
        const c = json.data?.user?.contributionsCollection;
        if (c) {
          return {
            contributions: c.contributionCalendar.totalContributions,
            commits: c.totalCommitContributions,
            pullRequests: c.totalPullRequestContributions,
            repositories: c.totalRepositoriesWithContributedCommits,
            weeks: c.contributionCalendar.weeks.slice(-26).map((w) =>
              w.contributionDays.map((d) => ({ date: d.date, level: LEVELS[d.contributionLevel] ?? 0 })),
            ),
            topRepos: c.commitContributionsByRepository
              .map((r) => ({
                name: REPO_LABELS[r.repository.name] ?? r.repository.name,
                commits: r.contributions.totalCount,
              }))
              .sort((a, b) => b.commits - a.commits)
              .slice(0, 5),
            placeholder: false,
          };
        }
      }
    } catch {
      // Fall through: the section degrades instead of failing the page.
    }
  }
  return process.env.NODE_ENV === "development" ? placeholder() : null;
}

/** Deterministic stand-in for local work without a token. Not real data. */
function placeholder(): GitHubStats {
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const weeks = Array.from({ length: 26 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const r = rand();
      const level = (r < 0.45 ? 0 : r < 0.65 ? 1 : r < 0.8 ? 2 : r < 0.92 ? 3 : 4) as HeatLevel;
      return { date: `w${w}d${d}`, level };
    }),
  );
  return {
    contributions: 0,
    commits: 0,
    pullRequests: 0,
    repositories: 0,
    weeks,
    topRepos: [
      { name: "Plan PM", commits: 5 },
      { name: "Repository", commits: 2 },
      { name: "Repository", commits: 1 },
    ],
    placeholder: true,
  };
}

export type LanguageShare = { name: string; repos: number };

const LANGUAGES_QUERY = `
query($login: String!) {
  user(login: $login) {
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC) {
      nodes { nameWithOwner primaryLanguage { name } }
    }
    repositoriesContributedTo(first: 100, includeUserRepositories: false, contributionTypes: [COMMIT, PULL_REQUEST], privacy: PUBLIC) {
      nodes { nameWithOwner primaryLanguage { name } }
    }
  }
}`;

type RepoNode = { nameWithOwner: string; primaryLanguage: { name: string } | null };
type LanguagesResponse = {
  data?: { user: { repositories: { nodes: RepoNode[] }; repositoriesContributedTo: { nodes: RepoNode[] } } | null };
};

/**
 * Languages by repository count: each public repository I own or have
 * committed to counts once, under its primary language. Counting repos rather
 * than bytes keeps vendored code and engine files (JS bundles, Unity C#) from
 * swamping the picture, which is why the byte breakdown was rejected.
 *
 * Returns null without a token or on any failure; the chart is then left out.
 */
export async function getGitHubLanguages(): Promise<{ repos: number; languages: LanguageShare[] } | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: LANGUAGES_QUERY, variables: { login: LOGIN } }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const user = ((await res.json()) as LanguagesResponse).data?.user;
    if (!user) return null;
    const seen = new Map<string, string>();
    for (const r of [...user.repositories.nodes, ...user.repositoriesContributedTo.nodes]) {
      if (r.primaryLanguage) seen.set(r.nameWithOwner, r.primaryLanguage.name);
    }
    const counts = new Map<string, number>();
    for (const lang of seen.values()) counts.set(lang, (counts.get(lang) ?? 0) + 1);
    const languages = [...counts].map(([name, repos]) => ({ name, repos })).sort((a, b) => b.repos - a.repos);
    return languages.length ? { repos: seen.size, languages } : null;
  } catch {
    return null;
  }
}
