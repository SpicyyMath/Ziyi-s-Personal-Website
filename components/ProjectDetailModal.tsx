import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from './TerminalCard';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Window */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0A0A0A] border border-zinc-800 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
                {/* Terminal Header */}
                <div className="h-10 bg-zinc-900/80 border-b border-white/5 flex items-center justify-between px-4 flex-shrink-0 select-none">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5 group/dots cursor-pointer" onClick={onClose}>
                            <div className="w-3 h-3 rounded-full bg-[#FF5F56] group-hover/dots:brightness-110 flex items-center justify-center text-[8px] text-black/50 font-bold opacity-100 transition-opacity">x</div>
                            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                        </div>
                        <div className="ml-4 font-mono text-xs text-zinc-500 flex items-center gap-2">
                            <i className="ph ph-house"></i>
                            <span>{project.path}</span>
                            <span className="text-zinc-700">/</span>
                            <span className="text-zinc-300">README.md</span>
                        </div>
                    </div>
                    <div className="text-xs font-mono text-zinc-600 hidden sm:block">bash --login</div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8">
                    
                    {/* Title Section */}
                    <div className="mb-8">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white font-mono mb-2">
                            <span className="text-accent-blue mr-2">{'>'}</span>
                            {project.title}
                            <span className="animate-blink inline-block w-3 h-8 bg-accent-blue ml-2 align-middle"></span>
                        </h2>
                        <div className="flex items-center gap-3 text-sm font-mono text-zinc-400">
                            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-accent-yellow">
                                {project.role}
                            </span>
                            <span>// {project.status} Build</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Left Column: Description & Features */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Long Description */}
                            <div className="prose prose-invert max-w-none">
                                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-3 border-b border-white/5 pb-2">
                                    Project Overview
                                </h3>
                                <p className="text-zinc-300 leading-relaxed font-mono text-sm">
                                    {project.detailContent.longDescription}
                                </p>
                            </div>

                            {/* Features List */}
                            <div>
                                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-3 border-b border-white/5 pb-2">
                                    Key Features
                                </h3>
                                <ul className="space-y-2">
                                    {project.detailContent.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm font-mono text-zinc-400 group">
                                            <span className="text-accent-blue mt-0.5 group-hover:translate-x-1 transition-transform">
                                                {'>'}
                                            </span>
                                            <span className="group-hover:text-zinc-200 transition-colors">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right Column: Dependencies & Actions */}
                        <div className="space-y-6">
                            
                            {/* Dependencies Block (package.json style) */}
                            <div className="bg-[#050505] rounded-lg border border-white/10 p-4 font-mono text-xs overflow-hidden relative group">
                                <div className="absolute top-2 right-2 text-[10px] text-zinc-600">package.json</div>
                                <div className="text-zinc-400">
                                    <span className="text-purple-400">"dependencies"</span>: {'{'}
                                    <div className="pl-4 flex flex-col gap-0.5 my-1">
                                        {project.techStack.map((tech, i) => (
                                            <div key={tech} className="whitespace-nowrap">
                                                <span className="text-cyan-400">"{tech.toLowerCase().replace(/\s+/g, '-')}"</span>
                                                <span className="text-zinc-500">: </span>
                                                <span className="text-emerald-400">"^{Math.floor(Math.random() * 5) + 1}.{Math.floor(Math.random() * 10)}.0"</span>
                                                {i < project.techStack.length - 1 && <span className="text-zinc-500">,</span>}
                                            </div>
                                        ))}
                                    </div>
                                    {'}'}
                                </div>
                                {/* Glow effect */}
                                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-accent-blue/5 blur-2xl rounded-full pointer-events-none"></div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3">
                                {/* Live Link */}
                                {project.links.live && (
                                    <a 
                                        href={project.links.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-accent-blue text-black font-bold text-sm hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                                    >
                                        <span>DEPLOY_TO_PROD</span>
                                        <i className="ph ph-rocket-launch text-lg"></i>
                                    </a>
                                )}

                                {/* GitHub Link */}
                                {project.links.github ? (
                                    <a 
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 hover:border-white/30 transition-all"
                                    >
                                        <span>VIEW_SOURCE</span>
                                        <i className="ph ph-github-logo text-lg"></i>
                                    </a>
                                ) : (
                                    <button 
                                        disabled
                                        className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-500 font-bold text-sm cursor-not-allowed opacity-70"
                                    >
                                        <span>SOURCE_RESTRICTED</span>
                                        <i className="ph ph-lock-key text-lg"></i>
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )}
    </AnimatePresence>
);
};
export default ProjectDetailModal;