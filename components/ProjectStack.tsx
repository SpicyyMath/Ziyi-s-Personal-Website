import React from 'react';

interface LabProject {
  id: string;
  title: string;
  tags: string[];
  desc: string;
  link: string;
}

const LAB_PROJECTS: LabProject[] = [
  {
    id: 'objection-builder',
    title: "Objection Builder",
    tags: ["React", "Gemini Pro"],
    desc: "Reduced API payload by 90%.",
    link: "https://github.com"
  },
  {
    id: 'dynamic-relan',
    title: "DynamicRELAN-Classifier",
    tags: ["CNN", "PyTorch"],
    desc: "Hybrid Attention Mechanism, 85% Accuracy.",
    link: "https://github.com"
  },
  {
    id: 'sea-turtle',
    title: "Sea Turtle Segmentation",
    tags: ["CV", "DeepLabV3+"],
    desc: "mIoU 0.85 vs Traditional Methods.",
    link: "https://github.com"
  }
];

const ProjectStack: React.FC = () => {
  // Helper to highlight numbers/percentages in UNSW Yellow
  const highlightText = (text: string) => {
    // Splits by numbers/percentages, e.g., "90%", "0.85"
    const parts = text.split(/(\d+(?:\.\d+)?%?)/g);
    return parts.map((part, i) => {
      // If it matches a number/percentage pattern, wrap it
      if (/\d+(?:\.\d+)?%?/.test(part)) {
        return <span key={i} className="text-accent-yellow font-bold">{part}</span>;
      }
      return part;
    });
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-y-auto pr-1 custom-scrollbar">
      {LAB_PROJECTS.map((p) => (
        <div 
          key={p.id}
          className="group relative glass-panel rounded-xl border border-white/5 p-5 transition-all duration-300 hover:border-accent-blue/30 hover:bg-white/5 cursor-default"
        >
          {/* Header: Title & Tags */}
          <div className="flex justify-between items-start relative z-10">
            <h3 className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors">
              {p.title}
            </h3>
            <div className="flex gap-2 flex-wrap justify-end max-w-[40%]">
               {p.tags.map(tag => (
                 <span key={tag} className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5 whitespace-nowrap">
                   {tag}
                 </span>
               ))}
            </div>
          </div>

          {/* Expanded Content */}
          <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-[160px] group-hover:opacity-100 transition-all duration-500 ease-in-out relative z-10">
            <div className="pt-4 space-y-4">
              <p className="text-sm text-gray-300 font-mono leading-relaxed border-l-2 border-accent-blue/20 pl-3">
                {highlightText(p.desc)}
              </p>
              
              <div className="flex justify-between items-end">
                 {/* Visual Placeholder for GIF/Image */}
                 <div className="w-24 h-12 rounded bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center border border-white/5 overflow-hidden">
                    {/* Abstract placeholder visual */}
                    <div className="w-full h-full opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-blue/40 via-transparent to-transparent"></div>
                 </div>

                 <button 
                   className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 hover:bg-accent-blue/20 border border-white/10 hover:border-accent-blue/50 text-xs font-bold text-white transition-all group/btn"
                 >
                   <span>View Code</span>
                   <i className="ph ph-github-logo text-lg group-hover/btn:scale-110 transition-transform"></i>
                 </button>
              </div>
            </div>
          </div>
          
          {/* Hover Glow Background */}
          <div className="absolute inset-0 bg-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>
        </div>
      ))}
    </div>
  );
};

export default ProjectStack;