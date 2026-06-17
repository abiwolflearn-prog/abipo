import InteractiveBg from './InteractiveBg';
import Scene from './Scene';

interface HeroBackgroundProps {
  isDarkMode?: boolean;
}

export default function HeroBackground({ isDarkMode = true }: HeroBackgroundProps) {
  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto animate-fade-in" 
      id="hero-ambient-master-backdrop"
    >
      {/* 1. Underlying zero-lag star particle swarm and interactive grid */}
      <div className="absolute inset-0 z-0 opacity-55 pointer-events-none">
        <InteractiveBg isDarkMode={isDarkMode} />
      </div>

      {/* 2. Centered Futuristic 3D Robot Human Head - fully responsive background scale */}
      <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center opacity-70 md:opacity-85 pointer-events-auto">
        <div className="w-full h-full max-w-5xl mx-auto">
          <Scene isDarkMode={isDarkMode} />
        </div>
      </div>

      {/* 3. Abstract background lighting flares to support cinematic silhouette contrast */}
      <div 
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] ${
          isDarkMode ? 'bg-blue-500/15' : 'bg-blue-555/5'
        } rounded-full blur-[140px] mix-blend-screen pointer-events-none animate-pulse`}
        style={{ animationDuration: '8s' }}
        id="bg-light-flare-blue"
      />
      <div 
        className={`absolute bottom-1/3 right-1/4 w-[450px] h-[450px] ${
          isDarkMode ? 'bg-indigo-500/6' : 'bg-indigo-555/2'
        } rounded-full blur-[130px] mix-blend-screen pointer-events-none animate-pulse`}
        style={{ animationDuration: '10s' }}
        id="bg-light-flare-indigo"
      />

      {/* 4. Immersive cyber optic background horizontal and vertical guidelines */}
      <div className="absolute inset-x-0 top-1/3 h-[1px] bg-gradient-to-r from-transparent via-blue-500/15 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-2/3 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent pointer-events-none" />
    </div>
  );
}
