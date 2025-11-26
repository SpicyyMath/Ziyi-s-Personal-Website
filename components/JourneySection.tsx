import React, { useState } from 'react';
import TechMap from './TechMap';
import { JOURNEY_LOCATIONS, JourneyLocation } from '../constants';

const JourneySection: React.FC = () => {
  const [activeLocationId, setActiveLocationId] = useState<string | null>(null);
  
  const activeLocation = JOURNEY_LOCATIONS.find(l => l.id === activeLocationId);

  return (
    <section id="journey" className="py-12 px-4 sm:px-8 lg:px-12 w-full flex justify-center">
      {/* 
        Golden Ratio Container (approx 1000x600)
        Split into Left (Info) and Right (Map)
      */}
      <div className="w-full max-w-6xl h-[600px] glass-panel rounded-3xl border border-white/10 flex relative overflow-hidden group">
        
        {/* Background Grids */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
             style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>

        {/* --- LEFT ZONE: INFO COMMAND CENTER (35%) --- */}
        <div className="w-[35%] h-full relative z-20 border-r border-white/5 bg-black/20 backdrop-blur-sm flex flex-col p-8 transition-colors duration-500"
             style={{ borderColor: activeLocation ? `${activeLocation.voxelColor}33` : 'rgba(255,255,255,0.05)' }}>
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-12">
             <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-accent-yellow font-mono text-base">01.</span> Journey
            </h2>
          </div>

          {/* Dynamic Content Area */}
          <div className="flex-1 flex flex-col justify-center">
             {activeLocation ? (
               <div className="animate-fade-in-up">
                 {/* ID Tag */}
                 <div className="font-pixel text-xl tracking-widest uppercase mb-2 opacity-80" style={{ color: activeLocation.voxelColor }}>
                    LOC: {activeLocation.id}
                 </div>
                 
                 {/* Main Title */}
                 <h3 className="text-5xl font-bold text-white mb-2 leading-none tracking-tight">
                   {activeLocation.city.split(',')[0]}
                 </h3>
                 <div className="text-lg text-gray-400 mb-6 font-mono">
                   {activeLocation.city.split(',')[1] || activeLocation.city}
                 </div>

                 {/* Role & Year */}
                 <div className="mb-6 pl-4 border-l-2" style={{ borderColor: activeLocation.voxelColor }}>
                    <div className="text-white font-bold text-lg">{activeLocation.role}</div>
                    <div className="text-sm font-mono text-gray-500">{activeLocation.year}</div>
                 </div>

                 {/* Description */}
                 <p className="text-gray-300 leading-relaxed text-sm">
                   {activeLocation.desc}
                 </p>
                 
                 {/* Decorative Stats */}
                 <div className="mt-8 flex gap-2">
                    <div className="h-1 w-12 rounded-full bg-white/20 overflow-hidden">
                       <div className="h-full w-2/3 bg-white animate-pulse"></div>
                    </div>
                    <div className="h-1 w-4 rounded-full bg-white/10"></div>
                 </div>
               </div>
             ) : (
               <div className="text-gray-500 opacity-60">
                 <div className="text-6xl mb-6 opacity-20">
                   <i className="ph ph-globe-hemisphere-west"></i>
                 </div>
                 <h4 className="text-xl font-bold text-white mb-2">Global Footprint</h4>
                 <p className="text-sm font-mono max-w-xs">
                   Hover over the beacon nodes on the map to retrieve chronological data logs.
                 </p>
               </div>
             )}
          </div>

          {/* Bottom Status */}
          <div className="mt-auto pt-8 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase">
             <span>SYS.STATUS: ONLINE</span>
             <span>{activeLocation ? 'DATA: FOUND' : 'DATA: WAITING'}</span>
          </div>
        </div>

        {/* --- RIGHT ZONE: MAP STAGE (65%) --- */}
        <div className="w-[65%] h-full relative z-10 bg-gradient-to-br from-transparent to-black/40">
           {/* Decorative Top Line */}
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-20"></div>
           
           <TechMap 
             activeLocationId={activeLocationId} 
             onLocationHover={setActiveLocationId} 
           />
        </div>

      </div>
    </section>
  );
};

export default JourneySection;
