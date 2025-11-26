export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'AI/ML' | 'Tools';
  level: number; // 0-100
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}