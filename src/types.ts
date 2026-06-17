export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Full Stack' | 'Mobile' | 'Backend API' | 'Featured';
  techStack: string[];
  features: string[];
  githubUrl: string;
  liveUrl?: string;
  screenshot: string; // We'll render stunning Tailwind representations/mockups or high-quality gradient visualizations
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number; // Percentage 0-100
  category: 'Frontend' | 'Backend' | 'Database' | 'Mobile' | 'Tools';
  iconName: string; // Matching Lucide icon
  description: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  role: string;
  company: string;
  description: string;
  techs?: string[];
  category: 'work' | 'education' | 'milestone';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl?: string; // Standard avatar or placeholder SVG
}

export interface GithubData {
  username: string;
  name: string;
  publicRepos: number;
  followers: number;
  following: number;
  starsCount: number;
  languages: { name: string; percentage: number; color: string }[];
  recentRepos: { name: string; description: string; stars: number; forks: number; language: string; url: string }[];
  streak: { current: number; longest: number };
  contributionsCount: number;
}
