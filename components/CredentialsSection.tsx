// filepath: c:\Users\Wangzy\Desktop\DEV\Ziyi_personal_web\Ziyi-s-Personal-Website\components\CredentialsSection.tsx
import React from 'react';
import { SKILLS } from '../constants';

const CredentialsSection: React.FC = () => {
  const resumePath = "/Ziyi_EN_CV_2025_11_28.pdf";

  return (
    <section id="credentials" className="py-24 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
      <div className="mb-12">
        <h3 className="font-mono text-accent-yellow text-sm tracking-widest mb-2">03. CREDENTIALS</h3>
        <h2 className="text-4xl font-bold text-white">Resume & Skillset</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
        {/* Left Panel: PDF Viewer */}
        <div className="lg:col-span-2 glass-panel rounded-3xl border border-white/10 flex flex-col relative overflow-hidden p-1">
          <embed 
            src={resumePath} 
            type="application/pdf" 
            className="w-full h-full rounded-[22px]"
          />
        </div>

        {/* Right Panel: Skills & Download */}
        <div className="glass-panel rounded-3xl p-8 border border-white/10 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-yellow to-transparent opacity-50"></div>
          <h3 className="text-2xl font-bold text-white mb-6">Core Competencies</h3>
          
          <div className="space-y-4 flex-1">
            {SKILLS.slice(0, 5).map(skill => (
              <div key={skill.name}>
                <div className="flex justify-between items-baseline mb-1 font-mono text-sm">
                  <span className="text-gray-300">{skill.name}</span>
                  <span className="text-accent-yellow">{skill.level}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div 
                    className="bg-accent-yellow h-2 rounded-full" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <a 
            href={resumePath} 
            download="Ziyi_Wang_CV.pdf"
            className="w-full mt-6 flex items-center justify-center gap-3 px-6 py-4 bg-accent-yellow text-black font-bold tracking-wider rounded-full hover:scale-105 transition-transform hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]"
          >
            <i className="ph ph-download-simple text-xl"></i>
            <span>Download Full CV</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CredentialsSection;