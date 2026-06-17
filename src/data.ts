import { Project, Skill, TimelineItem, Testimonial, GithubData } from './types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'fetena-pro',
    title: 'Fetena Pro',
    description: 'A cutting-edge dual-platform educational ecosystem for Ethiopian high schoolers (Grade 12 and Grade 8), streamlining peerless prep with interactive trial modules, real-time analytics dashboards, and complete offline capabilities.',
    category: 'Featured',
    techStack: ['React Native', 'Expo', 'Node.js', 'Express', 'MongoDB', 'JWT Auth', 'Tailwind CSS'],
    features: [
      'Interactive Multiple-Choice and Written Practice Exams',
      'Dual-language content support (Amharic & English) with instant toggle',
      'Personalized performance radar charts tracking historical strengths & weaknesses',
      'Highly optimized backend REST API handling thousands of questions per second',
      'Offline caching model storing questions on-device for seamless remote access'
    ],
    githubUrl: 'https://github.com/abiwolflearn-prog/fetena-pro',
    liveUrl: '#emulator',
    screenshot: 'from-cyan-500/20 to-blue-600/20',
    featured: true
  },
  {
    id: 'teacher-eval',
    title: 'Eva App (Teacher Evaluation)',
    description: 'A complete institutional feedback matrix engineered to optimize educational feedback loops. Includes double-blind evaluation schemes, multi-role authentication tiers, and high-performance Recharts dashboard visualizers.',
    category: 'Full Stack',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Recharts', 'Tailwind CSS'],
    features: [
      'Multi-tier access (Administrators, Department Heads, Students)',
      'Highly interactive and responsive feedback forms with client-side validator guards',
      'Dynamic charts breaking down scores by communication, preparation, and pedagogy',
      'Automated aggregate PDF synthesis for performance metrics and review letters'
    ],
    githubUrl: 'https://github.com/abiwolflearn-prog/teacher-evaluation-system',
    liveUrl: '#',
    screenshot: 'from-emerald-500/20 to-teal-600/20',
    featured: true
  },
  {
    id: 'voting-api',
    title: 'Voting System (MERN)',
    description: 'An enterprise-grade, high-integrity MERN stack application for regional polling. Enforces strict zero-leakage cryptography, role-based JWT validations, and real-time live-update streams for secure ballot tracking.',
    category: 'Full Stack',
    techStack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JWT', 'Docker', 'Postman'],
    features: [
      'Voter registration and verification with strict unique ballot generation logic',
      'Cryptographic voting ledger encryption preventing ballot manipulation or double votes',
      'Real-time live-update broadcasting poll tallies globally',
      'Fully-configured Docker Compose orchestrator running containerized server and DB clusters'
    ],
    githubUrl: 'https://github.com/abiwolflearn-prog/voting-system-api',
    liveUrl: 'https://voting-system-one-iota.vercel.app/',
    screenshot: 'from-violet-500/20 to-fuchsia-600/20',
    featured: true
  }
];

export const SKILLS_DATA: Skill[] = [
  // Frontend
  { name: 'React', level: 95, category: 'Frontend', iconName: 'Atom', description: 'Interactive React rendering, virtual DOM optimizations, custom hooks.' },
  { name: 'Next.js', level: 90, category: 'Frontend', iconName: 'Cpu', description: 'App router, Server Components, SSR/ISR paradigms, SEO performance optimization.' },
  { name: 'TypeScript', level: 92, category: 'Frontend', iconName: 'ShieldAlert', description: 'Strict type safety, custom utility generics, advanced structural type casting.' },
  { name: 'Tailwind CSS', level: 98, category: 'Frontend', iconName: 'Palette', description: 'Utility-first layout design, theme extensions, custom fluid spacing and animation layers.' },
  { name: 'Framer Motion', level: 88, category: 'Frontend', iconName: 'Sparkles', description: 'Orchestrating layout transitions, gesture controls, scroll triggers, custom keyframes.' },
  { name: 'JavaScript', level: 96, category: 'Frontend', iconName: 'Code', description: 'ES6+ standards, event-loop profiling, high-perf asynchronous structures.' },

  // Backend
  { name: 'Node.js', level: 94, category: 'Backend', iconName: 'Server', description: 'Asynchronous event engines, RESTful web routers, multi-thread worker pooling.' },
  { name: 'Express.js', level: 95, category: 'Backend', iconName: 'Layers', description: 'Secure middleware pipelines, cluster scaling, automated error boundary handlers.' },
  { name: 'REST API', level: 96, category: 'Backend', iconName: 'Webhook', description: 'Strict status code protocols, structured pagination models, query token sanitizers.' },
  { name: 'JWT Auth', level: 93, category: 'Backend', iconName: 'Lock', description: 'Token sign/verify structures, bearer authentication middleware, cookie store storage.' },

  // Database
  { name: 'MongoDB', level: 90, category: 'Database', iconName: 'Database', description: 'Document schemas, dynamic query matching, collection lookup aggregation query paths.' },
  { name: 'PostgreSQL', level: 88, category: 'Database', iconName: 'Database', description: 'Relational database design, complex SQL queries, advanced indexing and data integrity.' },

  // Mobile
  { name: 'React Native', level: 92, category: 'Mobile', iconName: 'Smartphone', description: 'Cross-platform native bridges, hardware gesture controls, platform-specific adaptations.' },
  { name: 'Expo', level: 94, category: 'Mobile', iconName: 'Milestone', description: 'Expo Go workflows, OTA updates, native sensors access, responsive splash & icon pipelines.' },

  // Tools
  { name: 'Git & GitHub', level: 93, category: 'Tools', iconName: 'GitBranch', description: 'Git branching, rebase strategies, collaborative pull requests, GitHub actions CI/CD pipelines.' },
  { name: 'Docker', level: 84, category: 'Tools', iconName: 'Box', description: 'Containerizing multi-tier environments, writing secure Dockerfiles, Compose orchestrations.' },
  { name: 'VS Code', level: 95, category: 'Tools', iconName: 'Laptop', description: 'Advanced workspaces setup, debugger integrations, shell environments.' }
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 'timeline-4',
    year: '2024 - PRESENT',
    role: 'Senior Full Stack & Mobile Engineer',
    company: 'Fintech & EdTech Startups (Project Focus)',
    description: 'Architecting and maintaining dual-platform systems. Led the architectural overhaul of Fetena pro, producing responsive cross-platform native designs that increased test pass rates by 40% and reached high active students numbers. Optimized Node.js clustered backends to handle massive peak API requests smoothly.',
    techs: ['React Native', 'Expo', 'MongoDB', 'Docker', 'GraphQL', 'Tailwind CSS'],
    category: 'work'
  },
  {
    id: 'timeline-3',
    year: '2023 - 2024',
    role: 'Full Stack MERN Developer',
    company: 'Enterprise Software Solutions',
    description: 'Spearheaded multiple complex client initiatives, including the full end-to-end design and coding of the Teacher Evaluation System. Standardized security profiles across customer systems under strict JWT tokens and role-based access patterns.',
    techs: ['React', 'Next.js', 'Express.js', 'MongoDB', 'Mongoose', 'Recharts'],
    category: 'work'
  },
  {
    id: 'timeline-2',
    year: '2022 - 2023',
    role: 'Mobile App Developer & API Specialist',
    company: 'Digital Innovation Hub',
    description: 'Devoted focus to mobile application engines. Perfected fluid cross-platform screen designs, client-side database caching adapters, and scalable REST API architectures utilizing cryptography concepts to enforce tamper-proof records.',
    techs: ['React Native', 'Expo', 'REST APIs', 'Node.js', 'Postman Testing'],
    category: 'work'
  },
  {
    id: 'timeline-1',
    year: '2020 - 2022',
    role: 'Undergraduate Studies & OSS Contributor',
    company: 'Academics & Tech Communities',
    description: 'Graduated in Computer Science/Engineering basics. Built strong foundations in algorithms, system designs, and database theories. Actively contributed to open-source developer templates and custom node libraries.',
    techs: ['JavaScript', 'TypeScript', 'MongoDB Basic schemas', 'Git', 'Linux Shell'],
    category: 'education'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Samuel Berhanu',
    role: 'Lead Architect',
    company: 'Edustart Systems',
    content: "Abel possesses a rare combination of design precision and exceptional logical thinking. While building the Fetena Pro ecosystem, he integrated complex offline caching in the React Native mobile app that surpassed all our expectations. He is our absolute go-to for full-stack tasks."
  },
  {
    id: 'test-2',
    name: 'Rebecca Kassa',
    role: 'Director of Academics',
    company: 'St. Paul Secondary School',
    content: "The Teacher Evaluation System Abel crafted changed how our administrators and educators interact. The dashboard analytics are incredibly detailed, fast, and easy to interpret. His work immediately reflects standard, elite engineering practices."
  },
  {
    id: 'test-3',
    name: 'Yared Gebre',
    role: 'Co-founder',
    company: 'Zoma Technologies',
    content: "From early API endpoints to standard docker configurations, Abel is a developer of true craftsmanship. When writing our regional voting core API, his rigorous cryptographic validations and optimized MongoDB queries assured a smooth and secure high-concurrency launch."
  }
];

export const GITHUB_FALLBACK_DATA: GithubData = {
  username: 'abiwolflearn-prog',
  name: 'Abel',
  publicRepos: 34,
  followers: 125,
  following: 88,
  starsCount: 142,
  languages: [
    { name: 'TypeScript', percentage: 48.4, color: '#3178c6' },
    { name: 'JavaScript', percentage: 32.1, color: '#f1e05a' },
    { name: 'CSS / Tailwind', percentage: 11.2, color: '#563d7c' },
    { name: 'Others', percentage: 8.3, color: '#852b2b' }
  ],
  recentRepos: [
    {
      name: 'fetena-pro',
      description: 'Educational exam preparation mobile & web ecosystem for high school students.',
      stars: 48,
      forks: 12,
      language: 'TypeScript',
      url: 'https://github.com/abiwolflearn-prog/fetena-pro'
    },
    {
      name: 'teacher-evaluation-system',
      description: 'A digitized, institutional evaluation software utilizing multi-tiered dashboard indexes.',
      stars: 35,
      forks: 8,
      language: 'JavaScript',
      url: 'https://github.com/abiwolflearn-prog/teacher-evaluation-system'
    },
    {
      name: 'voting-system-api',
      description: 'Decentralized and role-controlled secure voting REST API engine.',
      stars: 28,
      forks: 6,
      language: 'JavaScript',
      url: 'https://github.com/abiwolflearn-prog/voting-system-api'
    }
  ],
  streak: { current: 14, longest: 42 },
  contributionsCount: 1248
};
