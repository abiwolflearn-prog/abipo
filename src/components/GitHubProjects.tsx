import { useState, useEffect } from 'react';
import {
  fetchGitHubRepositories,
  categorizeRepositories,
  CategorizedRepositories,
  GitHubRepository,
  formatRelativeTime,
  getLanguageColor,
} from '../services/githubService';
import { ExternalLink, Github, Star, GitFork, Calendar, Code } from 'lucide-react';

interface ProjectCategoryProps {
  title: string;
  description: string;
  repos: GitHubRepository[];
  icon: React.ReactNode;
}

function ProjectCategory({ title, description, repos, icon }: ProjectCategoryProps) {
  if (repos.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <h3 className="text-2xl font-display font-bold text-[var(--heading-color)]">
            {title}
          </h3>
          <p className="text-sm text-[var(--text-muted)] mt-1">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {repos.map((repo) => (
          <GitHubProjectCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

interface GitHubProjectCardProps {
  repo: GitHubRepository;
}

function GitHubProjectCard({ repo }: GitHubProjectCardProps) {
  return (
    <div
      id={`github-project-${repo.name}`}
      className="glass-panel border border-[var(--border-color)] rounded-2xl p-5 flex flex-col justify-between hover:border-blue-500/30 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(59,130,246,0.06)]"
    >
      {/* Header with title and GitHub link */}
      <div className="space-y-3 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-lg font-display font-semibold text-[var(--heading-color)] group-hover:text-blue-500 transition-colors line-clamp-2">
            {repo.name}
          </h4>
          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--panel-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--heading-color)] hover:border-blue-500/40 transition-all"
            title="View on GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

        {/* Description */}
        {repo.description && (
          <p className="text-sm text-[var(--text-muted)] leading-relaxed line-clamp-3">
            {repo.description}
          </p>
        )}

        {/* Topics/Tags */}
        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {repo.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="text-xs px-2 py-1 rounded-full bg-[var(--border-color)] text-[var(--text-muted)] font-mono"
              >
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Stats Row */}
      <div className="flex items-center gap-4 pt-4 border-t border-[var(--border-color)] mt-4 text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-yellow-500" />
          <span className="font-mono">{repo.stars}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork className="w-3.5 h-3.5 text-emerald-500" />
          <span className="font-mono">{repo.forks}</span>
        </div>
        {repo.language && (
          <span className={`px-2 py-0.5 rounded ${getLanguageColor(repo.language)}`}>
            {repo.language}
          </span>
        )}
      </div>

      {/* Footer with date and CTA buttons */}
      <div className="flex items-center justify-between gap-2 pt-3 text-xs">
        <div className="flex items-center gap-1 text-[var(--text-muted)]">
          <Calendar className="w-3 h-3" />
          <span>{formatRelativeTime(repo.updatedAt)}</span>
        </div>
        <div className="flex items-center gap-2">
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all font-medium text-xs flex items-center gap-1"
              title="Visit live demo"
            >
              <ExternalLink className="w-3 h-3" />
              Demo
            </a>
          )}
          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-all font-medium text-xs flex items-center gap-1"
            title="View source code on GitHub"
          >
            <Code className="w-3 h-3" />
            Code
          </a>
        </div>
      </div>
    </div>
  );
}

export default function GitHubProjects() {
  const [categorized, setCategorized] = useState<CategorizedRepositories | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRepositories = async () => {
      try {
        setLoading(true);
        const repos = await fetchGitHubRepositories();
        const categorizedRepos = categorizeRepositories(repos);
        setCategorized(categorizedRepos);
      } catch (err) {
        console.error('Error loading repositories:', err);
        setError('Failed to load repositories');
      } finally {
        setLoading(false);
      }
    };

    loadRepositories();
  }, []);

  if (loading) {
    return (
      <section id="github-projects" className="pt-12 scroll-mt-24">
        <div className="flex items-center justify-center py-24">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-[var(--text-muted)]">
              <div className="w-4 h-4 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
              Loading repositories...
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !categorized) {
    return (
      <section id="github-projects" className="pt-12 scroll-mt-24">
        <div className="text-center space-y-4 py-24">
          <p className="text-[var(--text-muted)]">{error || 'Unable to load GitHub projects'}</p>
          <p className="text-sm text-[var(--text-muted)]/60">
            Visit{' '}
            <a
              href="https://github.com/abiwolflearn-prog"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:text-blue-400 underline"
            >
              GitHub Profile
            </a>{' '}
            directly
          </p>
        </div>
      </section>
    );
  }

  const totalRepos =
    categorized.fullStack.length +
    categorized.frontend.length +
    categorized.backend.length +
    categorized.mobile.length +
    categorized.openSource.length;

  if (totalRepos === 0) {
    return null;
  }

  return (
    <section id="github-projects" className="pt-12 scroll-mt-24">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-12">
        <Github className="w-6 h-6 text-blue-500 dark:text-blue-400" />
        <div>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-[var(--heading-color)]">
            GitHub Projects
          </h2>
          <p className="text-sm md:text-base text-[var(--text-muted)] mt-1">
            Explore {totalRepos} public repositories across multiple categories
          </p>
        </div>
      </div>

      {/* Projects by Category */}
      <div className="space-y-16">
        {/* Full Stack Projects */}
        <ProjectCategory
          title="Full Stack Projects"
          description="Complete MERN applications with frontend and backend"
          repos={categorized.fullStack}
          icon={<Code className="w-6 h-6 text-blue-500" />}
        />

        {/* Mobile Apps */}
        <ProjectCategory
          title="Mobile Applications"
          description="React Native and Expo cross-platform apps"
          repos={categorized.mobile}
          icon={
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          }
        />

        {/* Frontend Projects */}
        <ProjectCategory
          title="Frontend Projects"
          description="React, Next.js, and interactive web applications"
          repos={categorized.frontend}
          icon={
            <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5.36-5.36l-.707-.707M5.663 7.663L4.956 6.956" />
            </svg>
          }
        />

        {/* Backend APIs */}
        <ProjectCategory
          title="Backend APIs"
          description="RESTful APIs, microservices, and server applications"
          repos={categorized.backend}
          icon={
            <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v5a2 2 0 01-2 2M5 12a2 2 0 00-2 2v5a2 2 0 002 2h14a2 2 0 002-2v-5a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
          }
        />

        {/* Open Source Contributions */}
        <ProjectCategory
          title="Open Source & Utilities"
          description="Libraries, tools, and community contributions"
          repos={categorized.openSource}
          icon={
            <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 015.646 5.646 9 9 0 1020.354 15.354z" />
            </svg>
          }
        />
      </div>

      {/* CTA Section */}
      <div className="mt-16 pt-12 border-t border-[var(--border-color)]">
        <div className="glass-panel border border-[var(--border-color)] rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-xl font-display font-semibold text-[var(--heading-color)]">
            Want to see more?
          </h3>
          <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto">
            Explore all my public repositories on GitHub. Follow for updates on new projects and contributions.
          </p>
          <a
            href="https://github.com/abiwolflearn-prog"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-full hover:bg-blue-500/20 transition-all text-blue-600 dark:text-blue-400 font-medium"
          >
            <Github className="w-4 h-4" />
            Visit GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}
