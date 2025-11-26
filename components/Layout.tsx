import React, { useState, useEffect } from 'react';
import TechBackground from './TechBackground';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Journey', href: '#journey' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="flex flex-col min-h-screen relative text-text overflow-hidden">
      {/* Global Background */}
      <TechBackground />

      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled ? 'py-4 nav-glass' : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center">
          <div className="font-bold tracking-tighter text-2xl text-white group cursor-pointer">
            Spicyy<span className="text-accent-blue group-hover:text-accent-yellow transition-colors">Math</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 font-mono text-xs text-gray-300">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="hover:text-accent-yellow transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-yellow transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Icon (Placeholder for functionality) */}
          <button className="md:hidden text-white text-2xl">
            <i className="ph ph-list"></i>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-mono text-xs text-gray-500">
              Designed & Coded by <span className="text-white">Ziyi Wang</span>
            </p>
            <p className="text-[10px] text-gray-600 mt-1">
              © {new Date().getFullYear()} SpicyyMath. All Rights Reserved.
            </p>
          </div>
          
          <div className="flex gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
              <i className="ph ph-github-logo text-2xl"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
              <i className="ph ph-linkedin-logo text-2xl"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;