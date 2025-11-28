import React from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import JourneySection from './components/JourneySection';
import TechTicker from './components/TechTicker';
import ProjectsGrid from './components/ProjectsGrid'; // Import the new component
import CredentialsSection from './components/CredentialsSection';

const App: React.FC = () => {
  return (
    <Layout>
      <div id="hero">
        <Hero />
      </div>
      
      {/* Section 2: The Journey (Golden Ratio Map) */}
      <JourneySection />

      {/* Divider */}
      <TechTicker />

      {/* Section 3: The Command Center (Projects) */}
      <ProjectsGrid />

      {/* Section 4: Credentials */}
      <CredentialsSection />

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 sm:px-12 lg:px-24 mb-20 max-w-7xl mx-auto">
         <div className="glass-panel p-12 rounded-3xl border border-white/10 text-center relative overflow-hidden group">
            {/* Background Gradient Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready to collaborate?</h2>
                <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg">
                  Currently available for freelance projects and open to full-time opportunities. Let's build something extraordinary.
                </p>
                
                <a href="mailto:nathanielbee731@gmail.com" className="inline-block px-10 py-4 bg-accent-yellow text-black font-bold tracking-wider rounded-full hover:scale-105 transition-transform hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] mb-12">
                  SAY HELLO
                </a>

                {/* Social Links Divider */}
                <div className="w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12"></div>

                {/* Social Connections */}
                <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
                    <a href="https://github.com/SpicyyMath" target="_blank" rel="noopener noreferrer" 
                       className="group/link flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl glass-panel border border-white/10 flex items-center justify-center group-hover/link:bg-white/10 group-hover/link:scale-110 group-hover/link:border-accent-blue/50 transition-all duration-300">
                            <i className="ph ph-github-logo text-3xl text-gray-300 group-hover/link:text-white"></i>
                        </div>
                        <span className="font-mono text-xs text-gray-500 group-hover/link:text-accent-blue tracking-widest transition-colors">GITHUB</span>
                    </a>

                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                       className="group/link flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl glass-panel border border-white/10 flex items-center justify-center group-hover/link:bg-white/10 group-hover/link:scale-110 group-hover/link:border-blue-400/50 transition-all duration-300">
                            <i className="ph ph-linkedin-logo text-3xl text-gray-300 group-hover/link:text-white"></i>
                        </div>
                        <span className="font-mono text-xs text-gray-500 group-hover/link:text-blue-400 tracking-widest transition-colors">LINKEDIN</span>
                    </a>

                    <a href="mailto:nathanielbee731@gmail.com" 
                       className="group/link flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl glass-panel border border-white/10 flex items-center justify-center group-hover/link:bg-white/10 group-hover/link:scale-110 group-hover/link:border-accent-yellow/50 transition-all duration-300">
                            <i className="ph ph-envelope-simple text-3xl text-gray-300 group-hover/link:text-white"></i>
                        </div>
                        <span className="font-mono text-xs text-gray-500 group-hover/link:text-accent-yellow tracking-widest transition-colors">EMAIL</span>
                    </a>
                </div>
            </div>
         </div>
      </section>
    </Layout>
  );
};

export default App;