import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Sun, Moon, Download } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ isDarkMode, toggleDarkMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about-section' },
    { name: 'Projects', href: '#projects-reels' },
    { name: 'Native Apps', href: '#mobile-emulation' },
    { name: 'GitHub', href: '#github-projects' },
    { name: 'Contact', href: '#contact-section' }
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav
      id="main-nav-bar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[var(--glass-bg)] backdrop-blur-md border-b border-[var(--glass-border)] py-3.5 shadow-xl shadow-black/5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        
        {/* Core identity brand logo */}
        <a id="nav-brand-logo" href="#" className="flex items-center gap-2 group select-none">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:rotate-6 transition-all duration-300">
            <span className="font-bold text-white text-sm">A</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-[var(--heading-color)] text-sm tracking-tight leading-none">Abel</span>
            <span className="font-mono text-[9px] text-blue-500 dark:text-blue-400 font-semibold tracking-wider mt-0.5 uppercase">Full Stack dev</span>
          </div>
        </a>

        {/* Desktop Links row */}
        <div className="hidden lg:flex items-center gap-6.5">
          {navLinks.map((link) => (
            <a
              id={`nav-link-desk-${link.name.toLowerCase()}`}
              key={link.name}
              href={link.href}
              className="text-xs font-mono font-medium text-[var(--text-muted)] hover:text-[var(--heading-color)] transition-colors relative group py-1"
            >
              {link.name}
              {/* Micro gradient indicator line under link */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop Socials & Theme Toggle */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            id="theme-toggle-desktop"
            onClick={toggleDarkMode}
            className="w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--panel-bg)] flex items-center justify-center text-[var(--text-color)] hover:text-[var(--heading-color)] hover:border-blue-500/40 transition-all cursor-pointer"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>

          <a
            id="nav-social-github"
            href="https://github.com/abiwolflearn-prog"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--panel-bg)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--heading-color)] hover:border-neutral-500/20 transition-all"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            id="nav-social-linkedin"
            href="https://linkedin.com/in/abelbimrew"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--panel-bg)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--heading-color)] hover:border-neutral-500/20 transition-all"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            id="nav-download-resume"
            href="/resume.docx"
            download="Abel-Resume.docx"
            className="w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--panel-bg)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--heading-color)] hover:border-emerald-500/40 transition-all"
            title="Download Resume"
          >
            <Download className="w-4 h-4" />
          </a>
          <a
            id="nav-cta-contact"
            href="#contact-section"
            className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full hover:bg-blue-500/20 transition-all flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-300"
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            Available for Hire
          </a>
        </div>

        {/* Mobile menu and Theme Toggles */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            id="theme-toggle-mobile-nav"
            onClick={toggleDarkMode}
            className="w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--panel-bg)] flex items-center justify-center text-[var(--text-color)]"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>
          
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="text-[var(--text-color)] hover:text-[var(--heading-color)] p-1"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer menu */}
      <div 
        id="mobile-drawer"
        className={`lg:hidden fixed inset-x-0 top-[62px] bg-[var(--glass-bg)] backdrop-blur-lg border-b border-[var(--glass-border)] transition-all duration-300 overflow-hidden leading-none z-40 ${
          isOpen ? 'max-h-[440px] opacity-100 py-6' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-4 px-6">
          {navLinks.map((link) => (
            <a
              id={`nav-link-mobile-${link.name.toLowerCase()}`}
              key={link.name}
              href={link.href}
              onClick={handleLinkClick}
              className="text-sm font-mono text-[var(--text-muted)] hover:text-[var(--heading-color)] py-2 border-b border-[var(--border-color)]"
            >
              {link.name}
            </a>
          ))}

          <a
            id="nav-mobile-download-resume"
            href="/resume.docx"
            download="Abel-Resume.docx"
            onClick={handleLinkClick}
            className="flex items-center gap-2 text-sm font-mono text-[var(--text-muted)] hover:text-[var(--heading-color)] py-2 border-b border-[var(--border-color)]"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>

          <div className="flex items-center justify-between pt-4 mt-2">
            <div className="flex items-center gap-2">
              <a
                id="nav-mobile-social-github"
                href="https://github.com/abiwolflearn-prog"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--panel-bg)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--heading-color)]"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                id="nav-mobile-social-linkedin"
                href="https://linkedin.com/in/abelbimrew"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--panel-bg)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--heading-color)]"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            
            <a
              id="nav-mobile-cta"
              href="#contact-section"
              onClick={handleLinkClick}
              className="bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs px-5 py-2.5 rounded-xl transition-all inline-block shadow-lg shadow-blue-600/20"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
