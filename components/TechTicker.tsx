import React from 'react';

const TECH_STACK = [
  "PYTHON", "TYPESCRIPT", "RUST", "PYTORCH", "REACT", "DOCKER", "TAILWIND",
  "NEXT.JS", "THREE.JS", "TENSORFLOW", "AWS", "GIT"
];

const TechTicker: React.FC = () => {
  // We duplicate the list to create a seamless loop
  const items = [...TECH_STACK, ...TECH_STACK];

  return (
    <div className="w-full bg-[#080808] border-y border-white/5 py-3 relative overflow-hidden group">
      
      {/* Gradient Masks for fade effect */}
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>

      {/* Scrolling Container */}
      <div className="flex w-max animate-scroll group-hover:[animation-play-state:paused]">
        {items.map((tech, index) => (
          <div key={`${tech}-${index}`} className="flex items-center mx-6 sm:mx-8">
            <span className="font-mono text-sm sm:text-base font-bold text-emerald-500/80 tracking-widest hover:text-emerald-400 transition-colors cursor-default">
              {tech}
            </span>
            <span className="ml-6 sm:ml-8 w-1.5 h-1.5 bg-emerald-500/20 rounded-full"></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechTicker;