import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import JourneyMap from './JourneyMap';

// Data Structure
const JOURNEY_DATA = [
  {
    id: 'china',
    city: 'China',
    countryCode: 'CN',
    themeColor: 'text-pink-500',
    borderColor: 'border-pink-500',
    shadowColor: 'shadow-pink-500/50',
    title: 'Origin',
    logo: null,
    subtitle: 'Where discipline meets curiosity.',
    description: "Born in a land of rapid innovation. Here, I cultivated a rigorous work ethic and a fascination with how numbers govern the world. It was the spark that ignited my journey into logic and computation.",
    stats: [
      { label: 'FOCUS', value: 'Logic', icon: 'Brain' },
      { label: 'STATUS', value: 'Initiated', icon: 'Target' }
    ]
  },
  {
    id: 'canada',
    city: 'Edmonton',
    countryCode: 'CA',
    themeColor: 'text-emerald-500',
    borderColor: 'border-emerald-500',
    shadowColor: 'shadow-emerald-500/50',
    title: 'University of Alberta',
    logo: '/university-of-alberta-logo-round-hd-png-download.png',
    subtitle: 'Mathematical Rigor @ -40°C.',
    description: "Amidst the serene geometric landscapes of snow, I built the theoretical bedrock of my AI career—mastering Linear Algebra and Calculus, proving that clarity comes from deep focus.",
    stats: [
      { label: 'GPA', value: '3.4 / 4.0', icon: 'Trophy' },
      { label: 'RESILIENCE', value: '-40°C', icon: 'Thermometer' },
      { label: 'MAJOR', value: 'Mathematics', icon: 'Sigma' },
      { label: 'MINOR', value: 'Economics', icon: 'TrendUp' }
    ]
  },
  {
    id: 'australia',
    city: 'Sydney',
    countryCode: 'AU',
    themeColor: 'text-yellow-400',
    borderColor: 'border-yellow-400',
    shadowColor: 'shadow-yellow-400/50',
    title: 'UNSW Sydney',
    logo: '/University_of_New_South_Wales_Crest_Variant_2022.png',
    subtitle: 'Architecting Intelligence.',
    description: "Transferred pure math into applied intelligence. Specializing in Computer Vision and Full-Stack development, bridging the gap between academic algorithms and real-world products.",
    stats: [
      { label: 'WAM', value: '76 / 100', icon: 'ChartBar' },
      { label: 'DEGREE', value: 'M.IT(AI Spec)', icon: 'GraduationCap' }, // 使用 GraduationCap 以匹配 Phosphor 图标
      { label: 'ARCHETYPE', value: 'Full-Stack AI', icon: 'Code' },
      { label: 'LEADERSHIP', value: 'Product Owner', icon: 'Users' }
    ]
  }
];

const JourneySection: React.FC = () => {
  const [activeLocationId, setActiveLocationId] = useState<string | null>(null);
  
  const activeData = JOURNEY_DATA.find(l => l.id === activeLocationId);

  const getIconClass = (iconName: string) => {
    const kebab = iconName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    return `ph-${kebab}`;
  };

  // --- Animation Variants ---
  const containerVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1 // Stagger effect for children
      }
    },
    exit: { 
      opacity: 0, 
      x: 30, 
      transition: { duration: 0.3, ease: "easeIn" } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <section id="journey" className="py-12 px-4 sm:px-8 lg:px-12 w-full flex justify-center">
      <div className="w-full max-w-6xl h-[600px] glass-panel rounded-3xl border border-white/10 flex relative overflow-hidden group">
        
        {/* Background Grids */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
             style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>

        {/* --- LEFT ZONE: INFO COMMAND CENTER (35%) --- */}
        <div className="w-[35%] h-full relative z-20 border-r border-white/5 bg-black/40 backdrop-blur-md flex flex-col transition-colors duration-500">
          
          {/* Top Bar */}
          <div className="p-8 pb-2 flex items-center gap-3">
             <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="text-accent-yellow font-mono text-sm">01.</span> Journey
            </h2>
          </div>

          {/* Dynamic Content Area with AnimatePresence */}
          <div className="flex-1 flex flex-col px-8 pb-8 relative overflow-hidden">
             <AnimatePresence mode="wait">
               {activeData ? (
                 <motion.div
                   key={activeData.id}
                   variants={containerVariants}
                   initial="hidden"
                   animate="visible"
                   exit="exit"
                   className="flex flex-col h-full"
                 >
                   
                   {/* 1. Header: City & Country Code */}
                   <motion.div variants={itemVariants} className="flex items-baseline gap-3 mb-6 mt-2">
                      <h1 className="text-4xl font-bold text-white font-sans tracking-tight">
                        {activeData.city}
                      </h1>
                      <span className="font-mono text-sm text-white/50 font-bold">
                        {activeData.countryCode}
                      </span>
                   </motion.div>
                   
                   {/* 2. Sub-Header: Logo & Institution */}
                   <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-full border ${activeData.borderColor} ${activeData.shadowColor} shadow-[0_0_15px_rgba(0,0,0,0.3)] bg-white/5 flex items-center justify-center overflow-hidden flex-shrink-0`}>
                         {activeData.logo ? (
                           <img src={activeData.logo} alt={activeData.title} className="w-full h-full object-cover opacity-90" onError={(e) => e.currentTarget.style.display='none'} />
                         ) : (
                           <i className={`ph ph-map-pin ${activeData.themeColor} text-xl`}></i>
                         )}
                      </div>
                      
                      <div className="flex flex-col justify-center">
                         <h3 className="text-lg font-bold text-white leading-tight">
                           {activeData.title}
                         </h3>
                         <p className={`text-xs italic ${activeData.themeColor} opacity-90 mt-0.5`}>
                           {activeData.subtitle}
                         </p>
                      </div>
                   </motion.div>

                   {/* 3. Body: Description */}
                   <motion.p variants={itemVariants} className="text-gray-400 leading-relaxed text-sm mb-8 border-l border-white/10 pl-4">
                     {activeData.description}
                   </motion.p>
                   
                   {/* 4. Stats Artifacts Grid (HUD Style) */}
                   <div className="mt-auto grid grid-cols-2 gap-3">
                      {activeData.stats.map((stat, idx) => (
                        <motion.div 
                          key={idx} 
                          variants={cardVariants} // Use specific card variant for pop-in
                          className="bg-white/5 border border-white/10 p-3 rounded-r-md relative overflow-hidden group/stat hover:bg-white/10 transition-colors"
                        >
                           {/* Left Accent Border */}
                           <div className={`absolute left-0 top-0 bottom-0 w-[2px] ${activeData.themeColor.replace('text-', 'bg-')}`}></div>
                           
                           {/* Label */}
                           <div className="flex items-center gap-2 mb-1">
                              <i className={`ph ${getIconClass(stat.icon)} text-xs text-gray-500`}></i>
                              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{stat.label}</span>
                           </div>
                           

                           {/* Value: Adjusted size to text-lg to fit longer text like "Product Owner" */}
                           <div className="text-lg font-mono font-bold text-white tracking-tight leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                              {stat.value}
                           </div>
                        </motion.div>
                      ))}
                   </div>

                 </motion.div>
               ) : (
                 <motion.div 
                   key="empty"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="flex flex-col items-center justify-center h-full text-gray-500 opacity-60 text-center"
                 >
                   <div className="w-24 h-24 rounded-full border border-dashed border-white/20 flex items-center justify-center mb-6 animate-[spin_10s_linear_infinite]">
                     <i className="ph ph-globe-hemisphere-west text-4xl opacity-50"></i>
                   </div>
                   <h4 className="text-xl font-bold text-white mb-2">Global Footprint</h4>
                   <p className="text-xs font-mono max-w-[200px]">
                     // HOVER_BEACON_TO_DECRYPT_DATA
                   </p>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          {/* Bottom Status Bar */}
          <div className="h-12 border-t border-white/5 bg-black/20 flex justify-between items-center px-6 text-[10px] font-mono text-gray-600 uppercase">
             <div className="flex items-center gap-2">
               <div className={`w-1.5 h-1.5 rounded-full ${activeData ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
               <span>SYS.STATUS: {activeData ? 'CONNECTED' : 'STANDBY'}</span>
             </div>
             <span>{activeData ? 'DATA_STREAM: ACTIVE' : 'WAITING_INPUT'}</span>
          </div>
        </div>

        {/* --- RIGHT ZONE: MAP STAGE (65%) --- */}
        <div className="w-[65%] h-full relative z-10 bg-gradient-to-br from-transparent to-black/40">
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-20"></div>
           
           <JourneyMap 
             activeLocationId={activeLocationId} 
             onLocationHover={setActiveLocationId} 
           />
        </div>

      </div>
    </section>
  );
};

export default JourneySection;
