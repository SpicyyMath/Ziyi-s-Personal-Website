import { Project, Skill } from './types';

export const HERO_TEXT = {
  greeting: "Hello, World.", 
  name: "Ziyi Wang",
  role: "AI Engineer & Full-Stack Developer", // Fallback
  roles: [
    "AI Engineer & Full-Stack Developer",
    "Computer Vision Engineer",
    "Deep Learning Specialist",
    "Creative Technologist"
  ],
  tagline: "Turning Logic into Intelligence. Building high-impact AI solutions with 90% efficiency."
};

export const PROJECTS: Project[] = [
  // --- The Lab (Research & AI) ---
  {
    id: 'lab-1',
    title: 'Objection Builder',
    description: 'Full-stack AI communication tool. Reduced API payload by 90% to ensure high availability using Gemini Pro.',
    techStack: ['React', 'Gemini Pro', 'Netlify'],
    featured: true
  },
  {
    id: 'lab-2',
    title: 'DynamicRELAN-Classifier',
    description: 'Custom CNN with Hybrid Attention Mechanism. Achieved 85% accuracy with 70% shorter training time.',
    techStack: ['Python', 'PyTorch', 'CNN'],
    featured: true
  },
  {
    id: 'lab-3',
    title: 'Sea Turtle Segmentation',
    description: 'Benchmarked DeepLabV3+ vs Traditional CV. Achieved peak mIoU of 0.85.',
    techStack: ['Computer Vision', 'DeepLabV3+', 'Random Forest'],
    featured: false
  },
  // --- Selected Works (Web & Dev) ---
  {
    id: '1',
    title: 'Nebula Dashboard',
    description: 'A real-time analytics platform using Next.js and D3.js with WebSocket streaming.',
    techStack: ['Next.js', 'TypeScript', 'D3.js', 'WebSockets'],
    featured: false
  },
  {
    id: '2',
    title: 'Gemini Code Assist',
    description: 'VS Code extension leveraging Google Gemini for intelligent code refactoring.',
    techStack: ['TypeScript', 'Gemini API', 'VS Code API'],
    featured: false
  },
  {
    id: '3',
    title: 'Void UI Kit',
    description: 'A React component library focusing on glassmorphism and dark mode aesthetics.',
    techStack: ['React', 'Tailwind', 'Storybook'],
    featured: false
  },
  {
    id: '4',
    title: 'E-Comm Neural',
    description: 'Recommendation engine for e-commerce powered by TensorFlow.js.',
    techStack: ['Node.js', 'TensorFlow.js', 'PostgreSQL'],
    featured: false
  }
];

export const SKILLS: Skill[] = [
  { name: 'React / Next.js', category: 'Frontend', level: 95 },
  { name: 'TypeScript', category: 'Frontend', level: 90 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 95 },
  { name: 'Node.js', category: 'Backend', level: 85 },
  { name: 'Gemini / OpenAI API', category: 'AI/ML', level: 80 },
  { name: 'Three.js / R3F', category: 'Frontend', level: 75 },
];

export interface JourneyLocation {
  id: string;
  city: string;
  role: string;
  year: string;
  desc: string;
  // Percentage strings for CSS positioning on map
  top: string; 
  left: string;
  // Numeric coordinates for SVG path calculation (1000x500 viewBox)
  x: number;
  y: number;
  voxelColor: string; 
}

export const JOURNEY_LOCATIONS: JourneyLocation[] = [
  {
    id: 'china',
    city: 'China',
    role: 'Origin',
    year: 'Start',
    desc: 'The foundation. Where logic meets creativity.',
    top: '36%',   
    left: '73%',
    x: 730,
    y: 180,
    voxelColor: '#EC4899', // Pink
  },
  {
    id: 'canada',
    city: 'Edmonton, CA',
    role: 'University of Alberta',
    year: '2018-2023',
    desc: 'BSc Mathematics. Building a rigorous analytical framework. GPA 3.4/4.0.',
    top: '26%',   
    left: '17%',
    x: 170,
    y: 130, 
    voxelColor: '#34D399', // Emerald
  },
  {
    id: 'australia',
    city: 'Sydney, AU',
    role: 'UNSW Sydney',
    year: '2024-Present',
    desc: 'Master of IT / AI. Specializing in Computer Vision & Deep Learning. WAM 76.',
    top: '78%',   
    left: '86%',
    x: 860,
    y: 390,
    voxelColor: '#FFD700', // Yellow
  }
];
