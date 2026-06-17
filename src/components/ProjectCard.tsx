import { Project } from '../types';
import { ExternalLink, Github, CheckCircle, Smartphone, Server, FileCode, Cpu } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Mobile': return <Smartphone className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />;
      case 'Backend API': return <Server className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />;
      case 'Featured': return <Cpu className="w-4 h-4 text-blue-500 dark:text-blue-400" />;
      default: return <FileCode className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />;
    }
  };

  const getBorderColor = (cat: string) => {
    switch (cat) {
      case 'Mobile': return 'hover:border-indigo-500/30 hover:shadow-[0_0_15px_rgba(99,102,241,0.06)]';
      case 'Backend API': return 'hover:border-emerald-500/30 hover:shadow-[0_0_15px_rgba(16,185,129,0.06)]';
      case 'Featured': return 'hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.06)]';
      default: return 'hover:border-neutral-500/25';
    }
  };

  return (
    <div
      id={`project-card-${project.id}`}
      className={`glass-panel border border-[var(--border-color)] rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between group min-h-[460px] ${getBorderColor(
        project.category
      )}`}
    >
      {/* Visual Screenshot Placeholder (Creative styling cards representation) */}
      <div className={`h-48 bg-gradient-to-tr ${project.screenshot} relative overflow-hidden flex items-center justify-center border-b border-[var(--border-color)] p-4`}>
        {/* Dynamic decorative visual indicators grids inside standard previews */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-2 left-2 bg-[var(--bg-color)]/90 backdrop-blur-sm border border-[var(--border-color)] text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1">
          {getCategoryIcon(project.category)}
          <span className="text-[var(--text-color)] font-semibold">{project.category}</span>
        </div>

        {/* Dynamic code schematic visualization inside "screnshots" area */}
        <div className="bg-[var(--code-bg)]/95 rounded-2xl border border-[var(--border-color)] p-4 w-full h-full flex flex-col justify-between relative shadow-xl transform group-hover:scale-[1.02] transition-transform duration-300">
          <div className="flex justify-between items-center text-[8px] font-mono text-[var(--text-muted)]">
            <span>root://{project.id}/app.log</span>
            <span>BUILD_READY</span>
          </div>
          
          <div className="font-mono text-[9px] text-[var(--text-color)]/90 leading-normal truncate-lines my-2 overflow-hidden flex-1 flex flex-col justify-center">
            {project.id === 'fetena-pro' ? (
              <>
                <div className="text-blue-650 dark:text-blue-400 font-bold">import &#123; NativeCore &#125; from 'expo';</div>
                <div className="text-[var(--text-muted)]">Initializing multilingual l10n arrays (EN/AM)...</div>
                <div className="text-emerald-600 dark:text-emerald-400">Offline state enqueued. MongoDB synced.</div>
              </>
            ) : project.id === 'teacher-eval' ? (
              <>
                <div className="text-emerald-600 dark:text-emerald-400 font-bold">router.post('/evaluation/submit', JWTAuth);</div>
                <div className="text-[var(--text-muted)]">Aggregating department head parameters...</div>
                <div className="text-blue-600 dark:text-blue-400">Generated visual chart scores via Recharts.</div>
              </>
            ) : project.id === 'voting-api' ? (
              <>
                <div className="text-indigo-600 dark:text-indigo-400 font-bold">const ballotHash = crypto.createHash('sha256');</div>
                <div className="text-[var(--text-muted)]">Role-based Access validations completed.</div>
                <div className="text-emerald-600 dark:text-emerald-400">Enqueuing double-entry transactional ledger...</div>
              </>
            ) : (
              <>
                <div className="text-amber-600 dark:text-amber-400 font-bold">export default function PortfolioCreator() &#123;</div>
                <div className="text-[var(--text-muted)]">Mounting telemetry logging middleware...</div>
                <div className="text-blue-600 dark:text-blue-400">Constructing metadata injections.</div>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.techStack.slice(0, 3).map((t) => (
              <span key={t} className="text-[7.5px] font-mono text-[var(--text-muted)] bg-[var(--border-color)] px-1.5 py-0.5 rounded border border-transparent">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Details Area */}
      <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-display font-semibold text-[var(--heading-color)] group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h4>
            <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed font-sans mt-1.5">
              {project.description}
            </p>
          </div>

          {/* Product Capabilities list */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold block">Key Features</span>
            <div className="space-y-1.5">
              {project.features.slice(0, 3).map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-color)]">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span className="font-sans leading-normal">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Area with links & technology list */}
        <div className="pt-5 border-t border-[var(--border-color)] mt-6 space-y-4">
          <div className="flex flex-wrap gap-1">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[9px] font-mono bg-[var(--code-bg)] border border-[var(--border-color)] text-[var(--text-muted)] px-2 py-0.5 rounded"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center text-xs font-mono">
            <a
              id={`project-github-link-${project.id}`}
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--heading-color)] inline-flex items-center gap-1 group/btn transition-colors"
            >
              <Github className="w-4 h-4" /> Source Code
            </a>
            
            {project.liveUrl && (
              <a
                id={`project-live-link-${project.id}`}
                href={project.liveUrl}
                className="text-blue-650 dark:text-blue-400 hover:text-blue-750 dark:hover:text-blue-300 font-bold inline-flex items-center gap-1.5 tracking-wide uppercase text-[10px]"
              >
                Launch Demo <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
