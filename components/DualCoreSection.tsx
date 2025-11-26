
import React from 'react';
import TechMap from './TechMap';
import ProjectStack from './ProjectStack';

const DualCoreSection: React.FC = () => {
  return (
    <section id="journey" className="py-24 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:h-[600px]">
        
        {/* Left Core: The Journey */}
        <div className="glass-panel rounded-3xl border border-white/10 flex flex-col relative overflow-hidden group h-[500px] lg:h-full transition-transform duration-500 hover:scale-[1.01]">
          {/* Decorative Top Line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-yellow to-transparent opacity-50 z-20"></div>
          
          <div className="p-8 pb-0 mb-6 flex items-center justify-between relative z-20">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <span className="text-accent-yellow font-mono text-xl">01.</span> The Journey
            </h2>
            <i className="ph ph-trend-up text-accent-yellow text-2xl opacity-50"></i>
          </div>

          {/* Map Container */}
          <div className="absolute inset-0 flex items-center justify-center">
             <TechMap />
          </div>
        </div>

        {/* Right Core: The Lab */}
        <div className="glass-panel rounded-3xl p-8 border border-white/10 flex flex-col relative overflow-hidden group h-[500px] lg:h-full transition-transform duration-500 hover:scale-[1.01]">
          {/* Decorative Top Line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue to-transparent opacity-50"></div>
          
          <div className="mb-6 flex items-center justify-between flex-shrink-0 relative z-20">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <span className="text-accent-blue font-mono text-xl">02.</span> The Lab
            </h2>
            <i className="ph ph-flask text-accent-blue text-2xl opacity-50"></i>
          </div>

          {/* Content Container */}
          <div className="flex-1 overflow-hidden relative z-10">
             <ProjectStack />
          </div>

          {/* Abstract Grid Background for 'Lab' feel */}
          <div 
             className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}
           ></div>
        </div>

      </div>
    </section>
  );
};

export default DualCoreSection;