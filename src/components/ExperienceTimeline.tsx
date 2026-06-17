import { TIMELINE_DATA } from '../data';
import { Briefcase, GraduationCap } from 'lucide-react';

export default function ExperienceTimeline() {
  return (
    <div id="experience" className="relative max-w-4xl mx-auto px-4 py-8">
      {/* Absolute central vertical flow line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500/40 via-emerald-500/20 to-transparent transform -translate-x-1/2" />

      <div className="space-y-12">
        {TIMELINE_DATA.map((item, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={item.id}
              className={`flex flex-col md:flex-row items-start relative ${
                isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Radial bubble bead icon */}
              <div className="absolute left-8 md:left-1/2 w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] flex items-center justify-center transform -translate-x-1/2 z-10 transition-shadow duration-300 hover:shadow-[0_0_12px_rgba(59,130,246,0.3)]">
                {item.category === 'work' ? (
                  <Briefcase className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                ) : (
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                )}
              </div>

              {/* Space filler block on opposite side */}
              <div className="hidden md:block w-1/2" />

              {/* Dynamic Information Container Card */}
              <div className="w-full md:w-1/2 pl-14 md:pl-0 md:px-8 relative">
                <div className="glass-panel border border-[var(--border-color)] hover:border-blue-500/20 transition-all p-5 md:p-6 rounded-2xl relative block bg-[var(--contrast-light)]">
                  
                  {/* Decorative glowing edge tag */}
                  <div className={`absolute top-0 bottom-0 w-[3px] rounded-l-md ${
                    item.category === 'work' ? 'bg-blue-500 left-0' : 'bg-emerald-555 dark:bg-emerald-500 left-0'
                  }`} />

                  {/* Date and title line */}
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="font-mono text-xs text-[var(--text-muted)] font-semibold tracking-wider">
                      {item.year}
                    </span>
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                      item.category === 'work' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    }`}>
                      {item.category}
                    </span>
                  </div>

                  <h4 className="text-lg font-display font-semibold text-[var(--heading-color)] mb-0.5">
                    {item.role}
                  </h4>
                  <p className="text-sm font-semibold text-[var(--text-color)] font-sans mb-3 flex items-center gap-1.5">
                    {item.company}
                  </p>

                  <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed font-sans italic mb-4">
                    {item.description}
                  </p>

                  {/* Technologies utilized tags */}
                  {item.techs && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--border-color)]">
                      {item.techs.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono bg-[var(--code-bg)] border border-[var(--border-color)] text-[var(--text-color)] px-2.5 py-0.5 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
