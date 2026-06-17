import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBackground from './components/HeroBackground';
import InteractiveHero from './components/InteractiveHero';
import ProjectCard from './components/ProjectCard';
import InteractiveAppEmulator from './components/InteractiveAppEmulator';
import GithubStats from './components/GithubStats';
import GitHubProjects from './components/GitHubProjects';
import SkillsGrid from './components/SkillsGrid';
import ExperienceTimeline from './components/ExperienceTimeline';
import ContactForm from './components/ContactForm';
import { PROJECTS_DATA } from './data';
import { Code, Terminal, Sparkles, Server, MessageSquare } from 'lucide-react';

export default function App() {
  const featuredProjects = PROJECTS_DATA;

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return true; // Default to dark mode
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <div className="relative min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] font-sans selection:bg-blue-500/30 selection:text-white transition-colors duration-300">
      
      {/* 1. Global Interactive Canvas Particles Field (Zero-lag) */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <HeroBackground isDarkMode={isDarkMode} />
      </div>

      {/* 2. Sticky Glass Navigation Index */}
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      {/* 3. Hero Perspective Board */}
      <header className="relative z-10">
        <InteractiveHero />
      </header>

      {/* Main Sections Wrapper */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 space-y-24 md:space-y-36 pb-24 select-none">
        
        {/* SECTION 1: ABOUT ME & CORE MISSION */}
        <section id="about-section" className="pt-12 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Mission Statement Callout */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <span className="font-mono text-xs text-blue-500 dark:text-blue-400 font-bold uppercase tracking-widest text-glow-cyan">Professional Focus</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-[var(--heading-color)] leading-tight">
                Engineering Scalable Full-Stack Web Models & Native Mobile Journeys.
              </h2>
              
              <div className="glass-panel border-l-2 border-l-blue-500 border-[var(--glass-border)] rounded-r-3xl p-5 md:p-6 bg-[var(--contrast-light)]">
                <p className="text-sm md:text-base text-[var(--heading-color)] font-medium leading-relaxed font-sans">
                  "I am a Full Stack MERN and React Native Developer passionate about building high-performance applications, scalable APIs, and modern user experiences."
                </p>
              </div>

              <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed font-sans">
                My approach combines rigorous logical standards with design-precision. I write secure route layers, execute ACID database aggregates, and craft beautiful cross-platform native designs. My solutions are containerized, test-tested, and optimized for ultra-low request latency.
              </p>
            </div>

            {/* Micro details metrics panel */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-[var(--contrast-light)] border border-[var(--border-color)] p-5 rounded-3xl flex flex-col justify-between min-h-[140px]">
                <span className="text-[var(--text-muted)] font-mono text-[10px] uppercase tracking-wider block">Completed Apps</span>
                <div>
                  <span className="text-3xl md:text-4xl font-display font-bold text-[var(--heading-color)] block">15+</span>
                  <span className="text-xs text-[var(--text-muted)] font-sans block mt-1">SaaS, EdTech & Utilities</span>
                </div>
              </div>

              <div className="bg-[var(--contrast-light)] border border-[var(--border-color)] p-5 rounded-3xl flex flex-col justify-between min-h-[140px]">
                <span className="text-[var(--text-muted)] font-mono text-[10px] uppercase tracking-wider block">API Speed</span>
                <div>
                  <span className="text-3xl md:text-4xl font-display font-bold text-blue-500 dark:text-blue-400 block">&lt;100ms</span>
                  <span className="text-xs text-[var(--text-muted)] font-sans block mt-1">Average server response</span>
                </div>
              </div>

              <div className="bg-[var(--contrast-light)] border border-[var(--border-color)] p-5 rounded-3xl flex flex-col justify-between min-h-[140px]">
                <span className="text-[var(--text-muted)] font-mono text-[10px] uppercase tracking-wider block">Clean Code Metric</span>
                <div>
                  <span className="text-3xl md:text-4xl font-display font-bold text-purple-650 dark:text-purple-400 block">100%</span>
                  <span className="text-xs text-[var(--text-muted)] font-sans block mt-1">Strict TypeScript typesafety</span>
                </div>
              </div>

              <div className="bg-[var(--contrast-light)] border border-[var(--border-color)] p-5 rounded-3xl flex flex-col justify-between min-h-[140px]">
                <span className="text-[var(--text-muted)] font-mono text-[10px] uppercase tracking-wider block">DB Transaction Integrity</span>
                <div>
                  <span className="text-3xl md:text-4xl font-display font-bold text-emerald-600 dark:text-emerald-400 block">ACID</span>
                  <span className="text-xs text-[var(--text-muted)] font-sans block mt-1">Compliant database clusters</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: SKILLS MATRIX */}
        <section id="skills-reel" className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <Terminal className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              <span className="font-mono text-xs text-blue-500 dark:text-blue-400 font-bold uppercase tracking-widest text-glow-cyan">Technical Stacks</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-[var(--heading-color)]">Advanced Professional Skills</h2>
            <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed font-sans">
              Organized skill index detailing metrics, required framework packages, and logical custom hooks usage. Select categories to isolate tools.
            </p>
          </div>

          <SkillsGrid />
        </section>

        {/* SECTION 3: FEATURED WEB REELS */}
        <section id="projects-reels" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <span className="font-mono text-xs text-blue-500 dark:text-blue-400 font-bold uppercase tracking-widest text-glow-cyan">Showcase Case Studies</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-[var(--heading-color)]">Engineered Client Assemblies</h2>
            </div>
            <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed font-sans max-w-md">
              Each module below encapsulates real-world micro-logic. Launch interactive simulators via cards to inspect the active runtimes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 hover:border-transparent transition-all">
            {featuredProjects.map((proj) => (
              <div key={proj.id}>
                <ProjectCard project={proj} />
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: INTERACTIVE MOBILE SUITE EMULATOR */}
        <section id="mobile-emulation" className="space-y-6">
          <InteractiveAppEmulator />
        </section>

        {/* SECTION 5: GITHUB REPOSITORIES SHOWCASE */}
        <GitHubProjects />

        {/* SECTION 7: LIVE GITHUB ANALYTICS DATA */}
        <section id="github-dashboard" className="space-y-6">
          <GithubStats />
        </section>

        {/* SECTION 8: PROFESSIONAL TIMELINE ROADMAP */}
        <section id="career-milestones" className="space-y-8 scroll-mt-24">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <Server className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              <span className="font-mono text-xs text-blue-500 dark:text-blue-400 font-bold uppercase tracking-widest text-glow-cyan">Professional Journey</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-[var(--heading-color)]">Experience Timeline</h2>
            <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed font-sans">
              Abel's professional development timeline from writing foundational algorithms to leading MERN clusters.
            </p>
          </div>

          <ExperienceTimeline />
        </section>

        {/* SECTION 10: INQUIRY ROUTING BOARD (CONTACT FORM) */}
        <section id="contact-section" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col items-center text-center space-y-2 max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              <span className="font-mono text-xs text-blue-500 dark:text-blue-400 font-bold uppercase tracking-widest text-glow-cyan">Inquiry Gate</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-[var(--heading-color)]">Launch Collaborative Contact</h2>
            <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed font-sans">
              Reach out directly. Your secure form entry is cryptographically sign-logged and dispatched immediately.
            </p>
          </div>

          <ContactForm />
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative border-t border-[var(--border-color)] bg-[var(--bg-color)] py-12 text-center text-xs text-[var(--text-muted)] font-mono leading-none z-10 selection:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 select-none">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center">
              <span className="text-white font-bold text-xxs">A</span>
            </div>
            <span className="text-sm font-semibold text-[var(--heading-color)] font-display">Abel</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <span>© {new Date().getFullYear()} • Engineered from scratch</span>
            <span>•</span>
            <span>All Rights Reserved</span>
            <span>•</span>
            <span className="text-blue-600 dark:text-blue-400">MERN Stack Specialist</span>
          </div>

          <div className="flex items-center gap-3">
            <a href="https://github.com/abiwolflearn-prog" target="_blank" rel="noreferrer" className="hover:text-[var(--heading-color)] transition-colors">GitHub</a>
            <span>•</span>
            <a href="https://linkedin.com/in/abelbimrew" target="_blank" rel="noreferrer" className="hover:text-[var(--heading-color)] transition-colors">LinkedIn</a>
            <span>•</span>
            <a href="https://t.me/Abelbi21" target="_blank" rel="noreferrer" className="hover:text-[var(--heading-color)] transition-colors">Telegram</a>
            <span>•</span>
            <a href="tel:+251908963520" className="hover:text-[var(--heading-color)] transition-colors">Call</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
