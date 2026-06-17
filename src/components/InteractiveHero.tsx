import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Github, Linkedin, RefreshCw, ExternalLink } from 'lucide-react';

export default function InteractiveHero() {
  const [typewriterText, setTypewriterText] = useState('');
  const words = [
    'Full Stack MERN Developer',
    'React Native Mobile Developer',
    'High-Performance REST API Designer',
    'MongoDB Database Architect'
  ];
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect tracking logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[wordIdx];
    
    const tick = () => {
      if (!isDeleting) {
        setTypewriterText(currentWord.substring(0, charIdx + 1));
        setCharIdx(prev => prev + 1);

        if (charIdx + 1 === currentWord.length) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setTypewriterText(currentWord.substring(0, charIdx - 1));
        setCharIdx(prev => prev - 1);

        if (charIdx === 1) {
          setIsDeleting(false);
          setWordIdx(prev => (prev + 1) % words.length);
          setCharIdx(0);
          return;
        }
      }
      
      const speed = isDeleting ? 40 : 80;
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, 100);
    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, wordIdx]);

  // Dynamic Hover Coordination Dispensation
  const handleCtaHover = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const elCenterX = rect.left + rect.width / 2;
    const elCenterY = rect.top + rect.height / 2;
    
    // Normalize coordinates (X: -1 to 1, Y: -1 to 1 where up is positive)
    const normX = (elCenterX / window.innerWidth) * 2 - 1;
    const normY = -((elCenterY / window.innerHeight) * 2 - 1);

    window.dispatchEvent(new CustomEvent('robot-attention', {
      detail: { x: normX, y: normY }
    }));
  };

  const handleCtaLeave = () => {
    window.dispatchEvent(new CustomEvent('robot-reset'));
  };

  const triggerNod = () => {
    window.dispatchEvent(new CustomEvent('robot-action', { detail: { type: 'click' } }));
  };

  return (
    <div
      id="hero-zone"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden bg-transparent select-none z-10"
    >
      <div className="max-w-4xl mx-auto w-full relative z-20 text-center">
        {/* Futuristic Floating Glass Panel */}
        <div 
          className="relative bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-xl rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_0_50px_rgba(30,58,138,0.06)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] space-y-8 animate-fade-in"
          id="hero-glass-core"
        >
          {/* Glass corner trim accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-blue-500/50 rounded-tl-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-blue-500/50 rounded-tr-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-blue-500/50 rounded-bl-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-blue-500/50 rounded-br-3xl pointer-events-none" />

          {/* Top meta badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full py-1 px-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono text-blue-650 dark:text-slate-300 font-bold uppercase tracking-wider">
                Available for Contract Hire
              </span>
            </div>
            
            <button
              onClick={triggerNod}
              onMouseEnter={handleCtaHover}
              onMouseLeave={handleCtaLeave}
              className="inline-flex items-center gap-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/25 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono transition-all cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 animate-spin-slow text-blue-500 dark:text-blue-400" />
              <span>Ping Robot Backdrop</span>
            </button>
          </div>

          {/* Brand Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold text-[var(--heading-color)] tracking-tight leading-none">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-550 dark:from-blue-400 dark:via-indigo-400 dark:to-emerald-400 drop-shadow-sm">Abel</span>
            </h1>
            
            <div className="h-8 flex items-center justify-center">
              <span className="font-mono text-xs sm:text-sm md:text-base text-[var(--text-muted)] font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-555 dark:bg-emerald-500 rounded-full animate-ping" />
                <span>Working on: </span>
                <strong className="text-[var(--heading-color)] border-b border-blue-500/30 pb-0.5">{typewriterText}</strong>
              </span>
            </div>
          </div>

          {/* Bio introduction */}
          <p className="text-xs sm:text-sm md:text-base text-[var(--text-color)] leading-relaxed font-sans max-w-2xl mx-auto">
            I am a senior full-stack web and mobile developer specializing in high-performance digital architectures. Leveraging the MERN stack alongside advanced React Native development, I write elegant database patterns and design seamless mechanical user experiences.
          </p>

          <p className="font-mono text-[9px] text-blue-600 dark:text-blue-450 uppercase tracking-widest hidden sm:block">
            ✨ Interactive Backdrop: The cyborg looks directly at your pointer coordinates. Click anywhere to nod!
          </p>

          {/* Call to Actions (CTA) */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 pt-2">
            <a
              id="hero-cta-cases"
              href="#projects-reels"
              onMouseEnter={handleCtaHover}
              onMouseLeave={handleCtaLeave}
              className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 cursor-pointer group"
            >
              Examine Client Work 
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              id="hero-cta-resume"
              href="#"
              onMouseEnter={handleCtaHover}
              onMouseLeave={handleCtaLeave}
              onClick={(e) => {
                e.preventDefault();
                alert("Abel's Resume download initialized!");
               }}
              className="w-full sm:w-auto bg-[var(--panel-bg)] hover:bg-slate-205 dark:hover:bg-white/10 border border-[var(--border-color)] text-[var(--heading-color)] font-mono text-xs sm:text-sm px-5 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-[var(--text-muted)]" /> Resume.pdf
            </a>
          </div>

          {/* Social connections panel */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-[var(--border-color)] max-w-xl mx-auto text-xs">
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest font-bold">Connect:</span>
            <div className="flex items-center gap-4">
              <a
                id="hero-social-github"
                href="https://github.com/abiwolflearn-prog"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={handleCtaHover}
                onMouseLeave={handleCtaLeave}
                className="text-[var(--text-muted)] hover:text-[var(--heading-color)] transition-colors flex items-center gap-1.5"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a
                id="hero-social-linkedin"
                href="https://linkedin.com/in/abelbimrew"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={handleCtaHover}
                onMouseLeave={handleCtaLeave}
                className="text-[var(--text-muted)] hover:text-[var(--heading-color)] transition-colors flex items-center gap-1.5"
              >
                <Linkedin className="w-4 h-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <a
                id="hero-social-telegram"
                href="https://t.me/Abel_bi"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={handleCtaHover}
                onMouseLeave={handleCtaLeave}
                className="text-[var(--text-muted)] hover:text-blue-500 transition-colors flex items-center gap-1.5"
              >
                <ExternalLink className="w-4 h-4" />
                <span>telegram <span className="text-blue-500 dark:text-blue-400 font-bold">@Abel_bi</span></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
