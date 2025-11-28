import React from 'react';

// --- Types based on the prompt ---
export type ProjectStatus = "Live" | "Private" | "Open Source" | "Research";

export interface Project {
  id: string;
  title: string;
  role: string;
  path: string;
  status: ProjectStatus;
  techStack: string[];
  metrics: Record<string, string>; // Key-Value pair for the "code" view
  description: string; // Short summary
  detailContent: {
    longDescription: string;
    architecture?: string[];
    features: string[];
  };
  links: {
    github?: string;
    live?: string;
  };
}

interface TerminalCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const TerminalCard: React.FC<TerminalCardProps> = ({ project, onClick }) => {
  
  // Helper to render status icon/badge
  const renderStatus = () => {
    switch (project.status) {
      case "Live":
        return (
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="hidden sm:inline text-[10px] font-mono font-bold uppercase tracking-wider">Live</span>
          </div>
        );
      case "Private":
        return (
          <div className="flex items-center gap-2 text-amber-400">
            <i className="ph ph-lock-key text-sm"></i>
            <span className="hidden sm:inline text-[10px] font-mono font-bold uppercase tracking-wider">Private</span>
          </div>
        );
      case "Open Source":
        return (
          <div className="flex items-center gap-2 text-cyan-400">
            <i className="ph ph-git-branch text-sm"></i>
            <span className="hidden sm:inline text-[10px] font-mono font-bold uppercase tracking-wider">Open Source</span>
          </div>
        );
      case "Research":
        return (
          <div className="flex items-center gap-2 text-purple-400">
            <i className="ph ph-flask text-sm"></i>
            <span className="hidden sm:inline text-[10px] font-mono font-bold uppercase tracking-wider">Research</span>
          </div>
        );
    }
  };

  return (
    <div 
      onClick={() => onClick(project)}
      className="group relative w-full bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-accent-blue/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:-translate-y-1"
    >
      {/* 1. Terminal Header */}
      <div className="h-9 bg-white/5 border-b border-white/5 flex items-center justify-between px-4 select-none">
        {/* macOS Dots */}
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] hover:brightness-110 transition-all"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] hover:brightness-110 transition-all"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] hover:brightness-110 transition-all"></div>
        </div>
        
        {/* Path */}
        <div className="font-mono text-[10px] text-zinc-500 group-hover:text-zinc-300 transition-colors truncate max-w-[150px] sm:max-w-none">
          {project.path}
        </div>
        
        {/* Status Badge */}
        <div className="opacity-80 group-hover:opacity-100 transition-opacity">
          {renderStatus()}
        </div>
      </div>

      {/* 2. Content Body */}
      <div className="p-5 font-mono text-sm relative">
        
        {/* Header Info */}
        <div className="mb-5 flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-zinc-100 group-hover:text-accent-blue transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              // {project.role}
            </p>
          </div>
        </div>

        {/* Code Snippet View */}
        <div className="bg-[#050505] rounded-lg p-4 border border-white/5 group-hover:border-white/10 transition-colors relative overflow-hidden">
          {/* Line Numbers (Visual) */}
          <div className="absolute left-3 top-4 flex flex-col gap-1 text-[10px] text-zinc-700 select-none font-mono text-right w-4">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>

          <div className="pl-8 flex flex-col gap-1 text-xs font-mono">
            {Object.entries(project.metrics).map(([key, value], i) => (
              <div key={key} className="flex gap-2">
                <span className="text-purple-400">{key}:</span>
                <span className="text-emerald-400">"{value}"</span>
              </div>
            ))}
            
            <div className="flex gap-2 flex-wrap">
               <span className="text-purple-400">stack:</span>
               <span className="text-orange-400">
                 [{project.techStack.slice(0, 2).map(t => `"${t}"`).join(', ')}{project.techStack.length > 2 ? ', ...' : ''}]
               </span>
            </div>
            
            {/* Blinking Cursor */}
            <div className="h-4 w-2 bg-accent-blue/80 animate-blink mt-1 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>
        
        {/* Description Comment */}
        <div className="mt-4 text-zinc-500 text-xs italic border-l-2 border-zinc-800 pl-3">
          # {project.description}
        </div>

      </div>
    </div>); 
    };

export default TerminalCard;