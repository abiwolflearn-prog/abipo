/**
 * GitHub API Service
 * Fetches repository data from GitHub and organizes by project category
 */

export interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  topics: string[];
}

export interface CategorizedRepositories {
  fullStack: GitHubRepository[];
  frontend: GitHubRepository[];
  backend: GitHubRepository[];
  mobile: GitHubRepository[];
  openSource: GitHubRepository[];
}

const GITHUB_USERNAME = 'abiwolflearn-prog';
const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Fetch user's public repositories from GitHub
 */
export async function fetchGitHubRepositories(): Promise<GitHubRepository[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=owner`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // Optional: Add token for higher rate limits
          // 'Authorization': `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      console.error('GitHub API Error:', response.statusText);
      return [];
    }

    const repos = await response.json();

    // Filter and map repositories
    return repos
      .filter((repo: any) => !repo.fork) // Exclude forked repos by default
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        topics: repo.topics || [],
      }));
  } catch (error) {
    console.error('Failed to fetch GitHub repositories:', error);
    return [];
  }
}

/**
 * Categorize repositories based on topics and names
 */
export function categorizeRepositories(repos: GitHubRepository[]): CategorizedRepositories {
  const categorized: CategorizedRepositories = {
    fullStack: [],
    frontend: [],
    backend: [],
    mobile: [],
    openSource: [],
  };

  repos.forEach((repo) => {
    const topics = repo.topics.map(t => t.toLowerCase());
    const name = repo.name.toLowerCase();
    const description = (repo.description || '').toLowerCase();

    // Determine category based on topics, name, and language
    if (
      topics.includes('full-stack') ||
      topics.includes('mern') ||
      topics.includes('mevn') ||
      (topics.includes('react') && topics.includes('node')) ||
      name.includes('fullstack') ||
      name.includes('mern')
    ) {
      categorized.fullStack.push(repo);
    } else if (
      topics.includes('react-native') ||
      topics.includes('expo') ||
      topics.includes('mobile') ||
      name.includes('react-native') ||
      name.includes('mobile')
    ) {
      categorized.mobile.push(repo);
    } else if (
      topics.includes('frontend') ||
      topics.includes('react') ||
      topics.includes('next') ||
      topics.includes('vue') ||
      topics.includes('angular') ||
      name.includes('frontend') ||
      name.includes('ui')
    ) {
      categorized.frontend.push(repo);
    } else if (
      topics.includes('backend') ||
      topics.includes('api') ||
      topics.includes('rest-api') ||
      topics.includes('node') ||
      topics.includes('express') ||
      name.includes('api') ||
      name.includes('server') ||
      name.includes('backend')
    ) {
      categorized.backend.push(repo);
    } else {
      categorized.openSource.push(repo);
    }
  });

  // Sort by stars and updated date
  Object.keys(categorized).forEach((key) => {
    categorized[key as keyof CategorizedRepositories].sort((a, b) => {
      if (b.stars !== a.stars) return b.stars - a.stars;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  });

  return categorized;
}

/**
 * Format date to relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';

  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';

  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';

  return 'just now';
}

/**
 * Get color for programming language
 */
export function getLanguageColor(language: string | null): string {
  const colors: { [key: string]: string } = {
    JavaScript: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
    TypeScript: 'bg-blue-500/20 text-blue-600 dark:text-blue-400',
    Python: 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400',
    React: 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400',
    'Java': 'bg-orange-500/20 text-orange-600 dark:text-orange-400',
    'C++': 'bg-pink-500/20 text-pink-600 dark:text-pink-400',
    Go: 'bg-sky-500/20 text-sky-600 dark:text-sky-400',
    Rust: 'bg-red-500/20 text-red-600 dark:text-red-400',
  };

  return colors[language || ''] || 'bg-neutral-500/20 text-neutral-600 dark:text-neutral-400';
}
