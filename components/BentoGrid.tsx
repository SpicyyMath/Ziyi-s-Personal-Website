import React from 'react';
import { PROJECTS } from '../constants';

const BentoGrid: React.FC = () => {
  // Helper to highlight numbers/percentages in UNSW Yellow
  const highlightText = (text: string) => {
    const parts = text.split(/(\d+(?:\.\d+)?%?)/g);
    return parts.map((part, i) => {
      if (/\d+(?:\.\d+)?%?/.test(part)) {
        return <span key={i} className="text-accent-yellow font-bold">{part}</span>;
      }
      return part;
    });
  };

  return (
    <section id="projects" className="py-24 px-6 sm:px-12 lg:px-24 relative max-w-[1400px] mx-auto">
      <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h3 className="font-mono text-accent-blue text-sm tracking-widest mb-2">02. RESEARCH & DEVELOPMENT</h3>
          <h2 className="text-4xl font-bold text-white">The Lab & Projects</h2>
        </div>
        <p className="text-gray-400 max-w-md text-sm font-mono text-right md:text-right">
          A fusion of academic research, deep learning models, and full-stack applications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[300px]">
        {PROJECTS.map((project, index) => {
          // Custom span logic for variety
          // Featured items or specific indices span 2 cols
          const isLarge = index === 0 || index === 3; 
          const colSpan = isLarge ? 'md:col-span-2' : 'md:col-span-1';
          const isLab = index < 3; // First 3 are Lab items

          return (
            <div 
              key={project.id}
              className={`group relative glass-panel rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,240,255,0.15)] ${colSpan} ${isLab ? 'border-accent-yellow/20' : 'border-white/5'} neon-border-blue`}
            >
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 rounded-full ${isLab ? 'bg-accent-yellow/10' : 'bg-white/5'}`}>
                      {isLab ? (
                         <i className="ph ph-flask text-accent-yellow text-xl"></i>
                      ) : (
                         <i className="ph ph-folder text-accent-blue text-xl"></i>
                      )}
                    </div>
                    <div className="flex gap-2">
                        {isLab && (
                        <span className="px-2 py-1 rounded text-[10px] font-mono border border-accent-yellow/30 text-accent-yellow bg-accent-yellow/5 uppercase tracking-wider">
                            THE LAB
                        </span>
                        )}
                        {project.featured && !isLab && (
                        <span className="px-2 py-1 rounded text-[10px] font-mono border border-accent-blue/30 text-accent-blue bg-accent-blue/5">
                            FEATURED
                        </span>
                        )}
                    </div>
                  </div>
                  
                  <h3 className={`text-2xl font-bold text-white mb-2 transition-colors ${isLab ? 'group-hover:text-accent-yellow' : 'group-hover:text-accent-blue'}`}>
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {highlightText(project.description)}
                  </p>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-gray-500">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="hover:text-white transition-colors bg-black/30 px-2 py-1 rounded">#{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Background Glow Effect - Yellow for Lab, Blue for others */}
              <div className={`absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-3xl transition-all duration-500 group-hover:bg-opacity-20 ${isLab ? 'bg-accent-yellow/10' : 'bg-accent-blue/10'}`}></div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BentoGrid;