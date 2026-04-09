export interface ProjectDetail {
  name: string;
  role: string;
  description: string;
  techStack: string[];
  outcome: string;
  year: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  team: string;
  avatar: string;
  email: string;
  achievements: string[];
  pastProjects: ProjectDetail[];
  currentProject: string;
  clientRating: number;
}

export interface Review {
  id: string;
  employeeName: string;
  status: 'pending' | 'completed';
  dueDate: string;
}

export interface Stat {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: any;
  key?: any;
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  time: string;
  status: 'pending' | 'completed' | 'flagged';
}

export interface FeedbackItem {
  id: string;
  author: string;
  role: string;
  content: string;
  timestamp: string;
}

export interface Goal {
  id: string;
  title: string;
  category: string;
  progress: number;
  dueDate: string;
  status: 'on-track' | 'at-risk' | 'behind';
}

export interface CompetencyScore {
  subject: string;
  score: number;
  fullMark: number;
}
