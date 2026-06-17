import { useState } from 'react';
import { motion } from 'motion/react';
import { SKILLS_DATA } from '../data';
import { 
  Atom, Cpu, Code, Palette, Sparkles, Server, 
  Layers, Webhook, Lock, Radio, Database, 
  FolderKanban, Smartphone, Milestone, GitBranch, 
  Send, Box, Laptop, ShieldAlert 
} from 'lucide-react';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'Mobile', 'Tools'];

function SkillIcon({ name, className }: { name: string; className?: string }) {
  const iconProps = { className: className || "w-5 h-5" };
  switch (name) {
    case 'Atom': return <Atom {...iconProps} />;
    case 'Cpu': return <Cpu {...iconProps} />;
    case 'Code': return <Code {...iconProps} />;
    case 'Palette': return <Palette {...iconProps} />;
    case 'Sparkles': return <Sparkles {...iconProps} />;
    case 'Server': return <Server {...iconProps} />;
    case 'Layers': return <Layers {...iconProps} />;
    case 'Webhook': return <Webhook {...iconProps} />;
    case 'Lock': return <Lock {...iconProps} />;
    case 'Radio': return <Radio {...iconProps} />;
    case 'Database': return <Database {...iconProps} />;
    case 'FolderKanban': return <FolderKanban {...iconProps} />;
    case 'Smartphone': return <Smartphone {...iconProps} />;
    case 'Milestone': return <Milestone {...iconProps} />;
    case 'GitBranch': return <GitBranch {...iconProps} />;
    case 'Send': return <Send {...iconProps} />;
    case 'Box': return <Box {...iconProps} />;
    case 'Laptop': return <Laptop {...iconProps} />;
    default: return <ShieldAlert {...iconProps} />;
  }
}

export default function SkillsGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredSkills = activeCategory === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === activeCategory);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Frontend': return 'text-blue-500';
      case 'Backend': return 'text-emerald-500';
      case 'Database': return 'text-teal-500';
      case 'Mobile': return 'text-indigo-500';
      default: return 'text-neutral-500';
    }
  };

  return (
    <div id="skills-section" className="max-w-5xl mx-auto space-y-12">
      {/* Filters bar */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-[var(--contrast-light)] border border-[var(--border-color)] rounded-2xl w-fit mx-auto shadow-sm">
        {CATEGORIES.map((cat) => (
          <button
            id={`skills-filter-${cat.toLowerCase()}`}
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-[var(--heading-color)] text-[var(--bg-color)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--heading-color)] hover:bg-[var(--border-color)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid displays */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filteredSkills.map((skill, idx) => (
          <motion.div
            key={skill.name}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.01 }}
            className="group relative flex flex-col items-center justify-center p-6 bg-[var(--contrast-light)] border border-[var(--border-color)] rounded-2xl hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
          >
            <div className={`mb-3 transition-transform duration-300 group-hover:scale-110 ${getCategoryColor(skill.category)}`}>
              <SkillIcon name={skill.iconName} className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-[var(--heading-color)] text-center tracking-tight">
              {skill.name}
            </span>
            
            {/* Subtle indicator */}
            <div className={`absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-current opacity-20 ${getCategoryColor(skill.category)}`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
