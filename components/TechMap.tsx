import React from 'react';
import { JOURNEY_LOCATIONS } from '../constants';

// A simple CSS Voxel Component
const Voxel: React.FC<{ color: string; size?: number; isHovered?: boolean }> = ({ color, size = 16, isHovered }) => {
  const half = size / 2;
  const style: React.CSSProperties = {
    width: size,
    height: size,
    position: 'absolute',
    transformStyle: 'preserve-3d',
  };

  return (
    <div className={`voxel-wrapper transition-transform duration-500 ${isHovered ? 'scale-150 -translate-y-4' : 'animate-bounce-pixel'}`} style={style}>
       <div style={{...style, transform: `rotateY(0deg) translateZ(${half}px)`, background: color }}></div>
       <div style={{...style, transform: `rotateY(90deg) translateZ(${half}px)`, background: color, filter: 'brightness(80%)' }}></div>
       <div style={{...style, transform: `rotateY(180deg) translateZ(${half}px)`, background: color }}></div>
       <div style={{...style, transform: `rotateY(-90deg) translateZ(${half}px)`, background: color, filter: 'brightness(80%)' }}></div>
       <div style={{...style, transform: `rotateX(90deg) translateZ(${half}px)`, background: color, filter: 'brightness(120%)' }}></div>
       <div style={{...style, transform: `rotateX(-90deg) translateZ(${half}px)`, background: color, filter: 'brightness(60%)' }}></div>
    </div>
  );
};

interface TechMapProps {
  activeLocationId: string | null;
  onLocationHover: (id: string | null) => void;
}

const TechMap: React.FC<TechMapProps> = ({ activeLocationId, onLocationHover }) => {
  // SVG Path definition for the flight: China -> Canada -> Australia -> China
  // Using cubic beziers (C) or refined quadratics (Q) for smoother curves
  const flightPath = `
    M ${JOURNEY_LOCATIONS[0].x},${JOURNEY_LOCATIONS[0].y} 
    Q 400,50 ${JOURNEY_LOCATIONS[1].x},${JOURNEY_LOCATIONS[1].y}
    Q 450,550 ${JOURNEY_LOCATIONS[2].x},${JOURNEY_LOCATIONS[2].y}
    Q 950,250 ${JOURNEY_LOCATIONS[0].x},${JOURNEY_LOCATIONS[0].y}
  `;

  // Enhanced trail particles
  const trailCount = 30; // Increased count for smoother stream
  const trailDuration = 0.8; 
  const trailParticles = Array.from({ length: trailCount }).map((_, i) => {
    const delay = (i + 1) * (trailDuration / trailCount);
    const opacity = 0.8 * (1 - i / trailCount); // Higher initial opacity
    const scale = 1 - (i / trailCount) * 0.8;
    
    return (
      <circle 
        key={`trail-${i}`}
        r={3 * scale} 
        fill={`rgba(0, 240, 255, ${opacity})`}
        style={{ filter: 'drop-shadow(0 0 3px rgba(0, 240, 255, 0.6))' }} // Added glow
      >
        <animateMotion 
          dur="14s" // Slightly slower for elegance
          repeatCount="indefinite" 
          path={flightPath} 
          rotate="auto" 
          begin={`${delay}s`} 
          calcMode="paced" // Ensures constant speed along the curve
        />
      </circle>
    );
  });

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden group/map select-none">
      
      {/* 2.5D Perspective Container */}
      <div 
        className="relative w-[120%] h-[120%] flex items-center justify-center transition-transform duration-700 ease-out"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Tilted Map Plane */}
        <div 
          className="relative w-full max-w-4xl aspect-[2/1]"
          style={{
            transform: 'rotateX(55deg) rotateZ(0deg) scale(0.85)', 
            transformStyle: 'preserve-3d',
          }}
        >
          {/* World Map SVG Layer */}
          <svg 
            viewBox="0 0 1000 500" 
            className="absolute inset-0 w-full h-full drop-shadow-[0_20px_0px_rgba(255,255,255,0.02)] pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ shapeRendering: 'crispEdges' }}
          >
            <defs>
              <pattern id="pixelPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" fill="rgba(255,255,255,0.12)" />
                <rect x="4" y="4" width="4" height="4" fill="rgba(255,255,255,0.12)" />
              </pattern>
            </defs>
            
            {/* Continents Group */}
            <g 
               stroke="none" 
               className={`transition-opacity duration-500 ${activeLocationId ? 'opacity-40' : 'opacity-80'}`}
            >
                <g fill="#111">
                  <path d="M 50,70 L 150,50 L 250,50 L 320,100 L 280,180 L 200,220 L 100,150 Z" />
                  <path d="M 220,240 L 300,240 L 350,300 L 320,450 L 250,400 Z" />
                  <path d="M 400,100 L 500,60 L 700,60 L 850,80 L 900,150 L 800,250 L 700,280 L 600,200 L 500,180 L 450,150 Z" />
                  <path d="M 450,200 L 550,200 L 600,280 L 550,400 L 480,350 L 440,250 Z" />
                  <path d="M 780,330 L 880,330 L 900,400 L 800,420 L 770,380 Z" />
                </g>
                <g fill="url(#pixelPattern)">
                  <path d="M 50,70 L 150,50 L 250,50 L 320,100 L 280,180 L 200,220 L 100,150 Z" />
                  <path d="M 220,240 L 300,240 L 350,300 L 320,450 L 250,400 Z" />
                  <path d="M 400,100 L 500,60 L 700,60 L 850,80 L 900,150 L 800,250 L 700,280 L 600,200 L 500,180 L 450,150 Z" />
                  <path d="M 450,200 L 550,200 L 600,280 L 550,400 L 480,350 L 440,250 Z" />
                  <path d="M 780,330 L 880,330 L 900,400 L 800,420 L 770,380 Z" />
                </g>
                <g stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none">
                  <path d="M 50,70 L 150,50 L 250,50 L 320,100 L 280,180 L 200,220 L 100,150 Z" />
                  <path d="M 220,240 L 300,240 L 350,300 L 320,450 L 250,400 Z" />
                  <path d="M 400,100 L 500,60 L 700,60 L 850,80 L 900,150 L 800,250 L 700,280 L 600,200 L 500,180 L 450,150 Z" />
                  <path d="M 450,200 L 550,200 L 600,280 L 550,400 L 480,350 L 440,250 Z" />
                  <path d="M 780,330 L 880,330 L 900,400 L 800,420 L 770,380 Z" />
                </g>
            </g>

            {/* FLIGHT PATH ANIMATION LAYER */}
            <g className="opacity-100">
               {/* The path line itself (dashed static route) */}
               <path 
                 d={flightPath}
                 fill="none" 
                 stroke="rgba(0, 240, 255, 0.15)" 
                 strokeWidth="1.5" 
                 strokeDasharray="4 4" 
               />
               
               {/* Fading Trail Effect (Particles) */}
               {trailParticles}

               {/* Main Plane/Ship */}
               {/* Arrowhead / Cyber Jet Shape */}
               <path 
                 d="M-6,-5 L8,0 L-6,5 L-2,0 Z" 
                 fill="#fff" 
                 filter="drop-shadow(0 0 8px #00F0FF)"
               >
                 <animateMotion 
                   dur="14s" 
                   repeatCount="indefinite" 
                   path={flightPath} 
                   rotate="auto" 
                   calcMode="paced"
                 />
               </path>
            </g>
          </svg>

          {/* Interactive Beacons */}
          {JOURNEY_LOCATIONS.map((loc) => {
            const isHovered = activeLocationId === loc.id;
            return (
              <div 
                key={loc.id}
                className="absolute"
                style={{ 
                  top: loc.top, 
                  left: loc.left,
                  zIndex: 40
                }}
              >
                {/* 
                  HIT BOX LAYER 
                  - Rotated -55deg to face the user (vertical billboard)
                  - INCREASED SIZE: w-48 h-48 (1.5x)
                  - MOVED UP: -mt-16 to shift trigger area upwards
                */}
                <div 
                   className="absolute w-48 h-48 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-50 bg-transparent -mt-16"
                   style={{ transform: 'rotateX(-55deg)' }}
                   onMouseEnter={() => onLocationHover(loc.id)}
                   onMouseLeave={() => onLocationHover(null)}
                />

                {/* 
                  VISUAL LAYER
                */}
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                    
                    {/* Radar Ripple Effect */}
                    <div 
                       className={`absolute w-32 h-32 rounded-full border border-white/20 opacity-0 transition-all duration-700 ${isHovered ? 'opacity-100 scale-100 animate-[spin_4s_linear_infinite]' : 'scale-50'}`}
                       style={{ borderColor: loc.voxelColor }}
                    >
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white/50"></div>
                       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white/50"></div>
                       <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-white/50"></div>
                       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-white/50"></div>
                    </div>

                    {/* Voxel Marker Container */}
                    <div className="relative w-4 h-4" style={{ transformStyle: 'preserve-3d' }}>
                       <div 
                         className={`absolute top-0 left-0 w-4 h-4 bg-black/60 blur-[4px] rounded-full transform scale-x-125 translate-y-6 transition-all duration-300 ${isHovered ? 'scale-150 opacity-50' : 'opacity-80'}`}
                       ></div>
                       
                       <div className="absolute -top-6 left-0" style={{ transformStyle: 'preserve-3d' }}>
                         <Voxel color={loc.voxelColor} size={24} isHovered={isHovered} />
                       </div>
                    </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TechMap;