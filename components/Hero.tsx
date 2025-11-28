import React, { useState, useEffect } from 'react';
import { HERO_TEXT } from '../constants';
import TensorStack from './TensorStack';

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Typewriter Logic
  useEffect(() => {
    const roles = HERO_TEXT.roles;
    const currentRole = roles[currentRoleIndex];
    
    // Config
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseDuration = 3000; // 3 seconds pause

    let timer: ReturnType<typeof setTimeout>;

    const handleTyping = () => {
      setDisplayText((current) => {
        if (isDeleting) {
          // Deleting
          return currentRole.substring(0, current.length - 1);
        } else {
          // Typing
          return currentRole.substring(0, current.length + 1);
        }
      });
    };

    // State Machine
    if (!isDeleting && displayText === currentRole) {
      // Phase: Pause after typing complete
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && displayText === '') {
      // Phase: Finished deleting, switch to next role
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      // Phase: Typing or Deleting characters
      timer = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  // Parallax Logic
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Calculate offset from center (-1 to 1)
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  // Parallax Transforms
  const textStyle = {
    transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
    transition: 'transform 0.1s ease-out'
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center px-6 sm:px-12 lg:px-24 overflow-hidden"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Column: Text */}
        <div style={textStyle} className="flex flex-col justify-center order-2 lg:order-1 relative z-20">
          <div className="flex items-center gap-3 mb-4">
             <span className="h-[2px] w-8 bg-accent-yellow"></span>
             <span className="font-mono text-accent-yellow text-xs tracking-[0.2em] uppercase">
               Portfolio_v2.0
             </span>
          </div>
          
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-4 leading-none">
            {HERO_TEXT.name}
            <span className="text-accent-blue">.</span>
          </h1>

          <div className="h-20 sm:h-24 flex items-center">
            <h2 className="text-lg sm:text-xl md:text-2xl font-mono text-white/90">
              <span className="text-accent-blue mr-2">{'>'}</span>
              {displayText}
              <span className="inline-block w-2 h-5 ml-1 bg-accent-blue animate-blink align-middle"></span>
            </h2>
          </div>

          {/* 添加 whitespace-pre-line 以识别 \n 换行符 */}
          <p className="text-sm sm:text-base font-mono text-gray-400 max-w-lg leading-relaxed border-l border-white/10 pl-4 whitespace-pre-line">
            {HERO_TEXT.tagline}
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            {/* 新增：View Journey 按钮 (Outlined Style with Yellow Accent) */}
            <a href="#journey" className="px-6 py-3 border border-white/20 text-white font-bold text-sm tracking-wider hover:border-accent-yellow hover:text-accent-yellow hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] transition-all duration-300">
              VIEW_JOURNEY
            </a>

            <a href="#projects" className="group relative px-6 py-3 overflow-hidden bg-white text-black font-bold text-sm tracking-wider">
               <span className="absolute inset-0 w-full h-full bg-accent-yellow transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
               <span className="relative group-hover:text-black transition-colors">VIEW PROJECTS</span>
            </a>
            <a href="#contact" className="px-6 py-3 border border-white/20 text-white font-bold text-sm tracking-wider hover:border-accent-blue hover:text-accent-blue hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all duration-300">
              CONTACT_ME
            </a>
          </div>
        </div>

        {/* Right Column: Tensor Stack (CNN Visualization) */}
        <div className="flex items-center justify-center order-1 lg:order-2 h-[400px] lg:h-[600px] w-full relative z-10">
          {/* 
             The 3D Component: Tensor Stack
             Visualizes Feature Maps / Deep Learning Layers 
          */}
          <TensorStack />
          
          {/* Background Glow behind the stack */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-blue/5 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        </div>

      </div>

      {/* Decorative Background Elements */}
      <div className="absolute bottom-12 right-12 hidden lg:block opacity-30 pointer-events-none font-mono text-[10px] text-right">
         <div className="flex flex-col gap-1">
            <span>SCROLL_Y: {typeof window !== 'undefined' ? window.scrollY.toFixed(0) : 0}</span>
            <span>MOUSE_X: {mousePos.x.toFixed(2)}</span>
            <span>MOUSE_Y: {mousePos.y.toFixed(2)}</span>
            <span>ARCH: CNN_RESNET_50</span>
         </div>
      </div>
    </section>
  );
};

export default Hero;
