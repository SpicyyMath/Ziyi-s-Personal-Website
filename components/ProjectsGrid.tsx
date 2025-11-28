import React, { useState } from 'react';
import TerminalCard, { Project } from './TerminalCard';
import ProjectDetailModal from './ProjectDetailModal';

// --- Data Source (from Prompt 1) ---
const PROJECTS_DATA: Project[] = [
  {
    id: "objection-builder",
    title: "Objection Builder",
    role: "AI SaaS Developer",
    path: "~/apps/objection-builder",
    status: "Live",
    techStack: ["AWS Lambda", "Docker", "Next.js", "Gemini Pro"],
    metrics: {
      costReduction: "99%",
      architecture: "Serverless",
      latency: "<100ms"
    },
    description: "Serverless AI SaaS on AWS cutting costs by 99%.",
    detailContent: {
      longDescription: "Architected a cost-efficient Serverless solution using AWS Lambda and Amplify. Implemented a secure DevOps pipeline with Docker and ECR to handle AI-driven objection handling responses.",
      features: ["Web Adapter Architecture", "High-performance DNS via Cloudflare", "Least Privilege IAM Security"]
    },
    links: { live: "https://www.objectionbuilder.com", github: "https://github.com/SpicyyMath/Objection_builder" }
  },
  {
    id: "math-tutor",
    title: "Adaptive AI Maths Tutor for Personalized Learning",
    role: "Full-Stack AI Engineer",
    path: "~/capstone/socratic-tutor",
    status: "Private",
    techStack: ["Prompt Engineering", "FastAPI", "React", "MySQL"],
    metrics: {
      method: "Socratic Prompting",
      inputs: "Multi-modal",
      feedback: "Adaptive"
    },
    description: "Multi-phase prompt framework guiding students via hints.",
    detailContent: {
      longDescription: "A Socratic AI tutoring system designed to guide students through problems rather than giving answers. Developed as a Capstone Project for a client, focusing on pedagogical accuracy.",
      features: ["Socratic Chatbot with complex input handling", "Dynamic Worksheet Generation", "Historical Error Analysis", "Gamified Frontend Interface"]
    },
    links: {} // No links because it is private
  },
  {
    id: "dynamic-relan",
    title: "Fashion Item Classification",
    role: "Computer Vision Eng",
    path: "~/research/fashion-cnn",
    status: "Open Source",
    techStack: ["PyTorch", "Python", "CBAM"],
    metrics: {
      accuracy: "85% (Fashion100)",
      optimization: "70% Faster Training"
    },
    description: "Custom CNN with Hybrid Attention Mechanism.",
    detailContent: {
      longDescription: "Integrated CBAM + Area Attention within R-ELAN blocks to improve classification accuracy on fashion datasets. Optimized model architecture for faster convergence.",
      features: ["Hybrid Attention Mechanism", "Custom Learning Rate Schedulers", "ResNet Architecture Optimization"]
    },
    links: { github: "https://github.com/SpicyyMath/Fashion-Item-Classification" }
  },
  {
    id: "sea-turtle",
    title: "Sea Turtle Segmentation",
    role: "CV Engineer",
    path: "~/research/marine-bio",
    status: "Research",
    techStack: ["DeepLabV3+", "U-Net", "TensorFlow"],
    metrics: {
      mIoU: "0.85",
      benchmark: "vs Random Forest"
    },
    description: "Benchmarked Deep Learning models against traditional CV methods.",
    detailContent: {
      longDescription: "Established DeepLabV3+ as the superior approach for sea turtle segmentation in complex underwater environments, outperforming traditional Random Forest baselines.",
      features: ["Model Benchmarking", "Data Augmentation Pipeline", "HOG/SIFT Comparison"]
    },
    links: { github: "https://github.com/SpicyyMath/Sea-Turtle-Image-Segmentation-and-Identification" }
  }
];

const ProjectsGrid: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects-grid" className="relative py-24 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
      
      {/* Background: Subtle Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
           style={{ 
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      {/* Section Header */}
      <div className="relative z-10 mb-16">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 bg-accent-blue rounded-full animate-pulse"></div>
          <h3 className="font-mono text-accent-blue text-sm tracking-widest uppercase">
            System Processes
          </h3>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Active Projects
        </h2>
        <p className="text-gray-400 font-mono text-sm max-w-xl border-l border-white/10 pl-4">
          // Select a process below to view execution logs, architecture details, and source code access.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {PROJECTS_DATA.map((project) => (
          <TerminalCard 
            key={project.id} 
            project={project} 
            onClick={setSelectedProject} 
          />
    ))}
</div>
  {/* Detail Modal */}
  <ProjectDetailModal 
    project={selectedProject} 
    onClose={() => setSelectedProject(null)} 
  />

</section>
);
};

export default ProjectsGrid;