import React from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import ActivityFeed from './components/ActivityFeed';
import FairEval from './components/FairEval';
import GoalPlanner from './components/GoalPlanner';
import ManagerProfile from './components/ManagerProfile';
import Settings from './components/Settings';
import TeamMemberDetail from './components/TeamMemberDetail';
import { cn } from './lib/utils';
import { Users, ClipboardCheck, ShieldAlert, TrendingUp, Search, Bell, User, Target, ChevronRight, LogOut, CheckCircle2, Star } from 'lucide-react';
import { Stat, Activity, FeedbackItem, CompetencyScore, Goal, Review, TeamMember } from './types';
import { motion, AnimatePresence } from 'motion/react';

const mockStats: Stat[] = [
  { label: 'Reviews Pending', value: 12, change: '+2', trend: 'up', icon: ClipboardCheck },
  { label: 'Bias Flags Detected', value: 0, change: '-4', trend: 'down', icon: ShieldAlert },
  { label: 'Avg. Team Score', value: '4.2/5', change: '+0.3', trend: 'up', icon: TrendingUp },
  { label: 'Completion Rate', value: '88%', change: '+5%', trend: 'up', icon: Users },
];

const mockActivities: Activity[] = [
  { id: '1', user: 'AI Engine', action: 'Draft ready for Sarah Chen', time: '2 mins ago', status: 'completed' },
  { id: '2', user: 'Marcus Wright', action: 'submitted peer review for Alex', time: '1 hour ago', status: 'completed' },
  { id: '3', user: 'Bias Shield', action: 'flagged subjective language in Review #42', time: '3 hours ago', status: 'flagged' },
  { id: '4', user: 'System', action: 'Performance cycle Q1 started', time: '5 hours ago', status: 'pending' },
];

const mockFeedback: FeedbackItem[] = [
  { id: '1', author: 'Marcus Wright', role: 'Senior Peer', content: 'Alex is a great developer but sometimes can be a bit aggressive in code reviews. They always get their work done on time though.', timestamp: 'Apr 08, 2026' },
  { id: '2', author: 'Sarah Chen', role: 'Direct Manager', content: 'Consistently delivers high-quality code. Alex has stepped up to lead the new API integration project and is doing a fantastic job mentoring the interns.', timestamp: 'Apr 07, 2026' },
  { id: '3', author: 'Jordan Lee', role: 'Product Partner', content: 'Very reliable. Alex understands the business requirements well and translates them into technical solutions efficiently.', timestamp: 'Apr 05, 2026' },
];

const mockCompetencies: CompetencyScore[] = [
  { subject: 'Technical', score: 95, fullMark: 100 },
  { subject: 'Leadership', score: 80, fullMark: 100 },
  { subject: 'Communication', score: 75, fullMark: 100 },
  { subject: 'Reliability', score: 90, fullMark: 100 },
  { subject: 'Growth', score: 85, fullMark: 100 },
];

const mockGoals: Goal[] = [
  { id: '1', title: 'Master System Architecture Patterns', category: 'Technical', progress: 65, dueDate: 'Jun 30, 2026', status: 'on-track' },
  { id: '2', title: 'Mentor 2 Junior Developers', category: 'Leadership', progress: 100, dueDate: 'May 15, 2026', status: 'on-track' },
  { id: '3', title: 'Improve Documentation Coverage to 90%', category: 'Reliability', progress: 40, dueDate: 'May 01, 2026', status: 'at-risk' },
  { id: '4', title: 'Lead Cross-functional API Workshop', category: 'Communication', progress: 10, dueDate: 'Jul 15, 2026', status: 'on-track' },
];

const mockReviews: Review[] = [
  { id: '1', employeeName: 'Sarah Chen', status: 'pending', dueDate: 'Apr 15, 2026' },
  { id: '2', employeeName: 'Marcus Wright', status: 'completed', dueDate: 'Apr 10, 2026' },
  { id: '3', employeeName: 'Alex Rivera', status: 'pending', dueDate: 'Apr 20, 2026' },
  { id: '4', employeeName: 'Jordan Lee', status: 'pending', dueDate: 'Apr 12, 2026' },
  { id: '5', employeeName: 'Elena Rodriguez', status: 'pending', dueDate: 'Apr 25, 2026' },
  { id: '6', employeeName: 'David Kim', status: 'completed', dueDate: 'Apr 05, 2026' },
  { id: '7', employeeName: 'Maya Patel', status: 'pending', dueDate: 'Apr 28, 2026' },
  { id: '8', employeeName: 'Liam Taylor', status: 'pending', dueDate: 'May 05, 2026' },
  { id: '9', employeeName: 'Sophia Wang', status: 'pending', dueDate: 'May 10, 2026' },
];

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Senior Frontend Engineer',
    team: 'Product',
    avatar: 'SC',
    email: 'sarah.chen@equitypulse.ai',
    achievements: ['Led the UI redesign of the main dashboard', 'Reduced bundle size by 40%', 'Mentored 3 junior developers'],
    pastProjects: [
      {
        name: 'Core UI Kit v2',
        role: 'Lead Developer',
        description: 'Developed a comprehensive design system using Tailwind and Radix UI.',
        techStack: ['React', 'Tailwind', 'TypeScript'],
        outcome: 'Adopted by 100% of internal teams, reducing dev time by 30%.',
        year: '2025'
      },
      {
        name: 'Mobile App Beta',
        role: 'Frontend Engineer',
        description: 'Built the cross-platform mobile application using React Native.',
        techStack: ['React Native', 'Redux', 'Firebase'],
        outcome: 'Successfully launched to 5k beta testers with 4.8 star rating.',
        year: '2024'
      }
    ],
    currentProject: 'EquityPulse AI Integration',
    clientRating: 4.9
  },
  {
    id: '2',
    name: 'Marcus Wright',
    role: 'Backend Lead',
    team: 'Infrastructure',
    avatar: 'MW',
    email: 'marcus.wright@equitypulse.ai',
    achievements: ['Implemented zero-downtime deployments', 'Optimized database queries for 2x speed', 'Architected the Bias Shield engine'],
    pastProjects: [
      {
        name: 'Auth Service v3',
        role: 'Architect',
        description: 'Redesigned the authentication microservice for better scalability.',
        techStack: ['Node.js', 'PostgreSQL', 'Redis'],
        outcome: 'Reduced login latency by 60% and supported 1M+ concurrent users.',
        year: '2025'
      },
      {
        name: 'Data Pipeline Migration',
        role: 'Backend Engineer',
        description: 'Migrated legacy data pipelines to a modern event-driven architecture.',
        techStack: ['Kafka', 'Go', 'MongoDB'],
        outcome: 'Improved data processing throughput by 4x.',
        year: '2024'
      }
    ],
    currentProject: 'Global Edge Distribution',
    clientRating: 4.7
  },
  {
    id: '3',
    name: 'Alex Rivera',
    role: 'Product Designer',
    team: 'Design',
    avatar: 'AR',
    email: 'alex.rivera@equitypulse.ai',
    achievements: ['Established the new Design System', 'Improved user retention by 15%', 'Won "Designer of the Year" 2025'],
    pastProjects: [
      {
        name: 'Brand Identity Refresh',
        role: 'Lead Designer',
        description: 'Complete overhaul of the company visual identity and brand guidelines.',
        techStack: ['Figma', 'Adobe CC'],
        outcome: 'Increased brand recognition scores by 25% in market surveys.',
        year: '2025'
      },
      {
        name: 'Onboarding Experience',
        role: 'Product Designer',
        description: 'Redesigned the user onboarding flow to reduce drop-off rates.',
        techStack: ['Figma', 'Prototyping'],
        outcome: 'Reduced onboarding drop-off by 40%.',
        year: '2024'
      }
    ],
    currentProject: 'Collaborative Canvas Tool',
    clientRating: 4.8
  },
  {
    id: '4',
    name: 'Jordan Lee',
    role: 'QA Engineer',
    team: 'Product',
    avatar: 'JL',
    email: 'jordan.lee@equitypulse.ai',
    achievements: ['Automated 90% of regression tests', 'Reduced bug reports by 30%', 'Implemented E2E testing framework'],
    pastProjects: [
      {
        name: 'Test Automation Suite',
        role: 'QA Lead',
        description: 'Developed a comprehensive automated testing suite for the core platform.',
        techStack: ['Playwright', 'Jest', 'GitHub Actions'],
        outcome: 'Reduced manual testing time by 80%.',
        year: '2025'
      },
      {
        name: 'Load Testing Platform',
        role: 'QA Engineer',
        description: 'Built a custom platform for simulating high-traffic scenarios.',
        techStack: ['k6', 'Docker', 'Grafana'],
        outcome: 'Identified and fixed 5 critical bottleneck issues before Q4 peak.',
        year: '2024'
      }
    ],
    currentProject: 'AI-Driven Test Generation',
    clientRating: 4.6
  },
  {
    id: '5',
    name: 'Elena Rodriguez',
    role: 'Senior DevOps Engineer',
    team: 'Infrastructure',
    avatar: 'ER',
    email: 'elena.rodriguez@equitypulse.ai',
    achievements: ['Migrated 100% of services to Kubernetes', 'Reduced cloud costs by 25%', 'Implemented automated security scanning'],
    pastProjects: [
      {
        name: 'Cloud Infrastructure v2',
        role: 'DevOps Lead',
        description: 'Modernized the cloud infrastructure using Terraform and AWS.',
        techStack: ['Terraform', 'AWS', 'Kubernetes'],
        outcome: 'Achieved 99.99% uptime for all core services.',
        year: '2025'
      },
      {
        name: 'CI/CD Pipeline Overhaul',
        role: 'DevOps Engineer',
        description: 'Redesigned the deployment pipelines for faster and safer releases.',
        techStack: ['GitHub Actions', 'Docker', 'Argocd'],
        outcome: 'Reduced deployment time from 45 minutes to 8 minutes.',
        year: '2024'
      }
    ],
    currentProject: 'Multi-Region Disaster Recovery',
    clientRating: 4.8
  },
  {
    id: '6',
    name: 'David Kim',
    role: 'Full Stack Developer',
    team: 'Product',
    avatar: 'DK',
    email: 'david.kim@equitypulse.ai',
    achievements: ['Developed the real-time collaboration engine', 'Integrated 5+ third-party APIs', 'Improved SEO scores by 40%'],
    pastProjects: [
      {
        name: 'Customer Portal',
        role: 'Full Stack Lead',
        description: 'Built a self-service portal for customers to manage their accounts.',
        techStack: ['Next.js', 'Node.js', 'Prisma'],
        outcome: 'Reduced support tickets related to account management by 50%.',
        year: '2025'
      },
      {
        name: 'E-commerce Integration',
        role: 'Full Stack Developer',
        description: 'Integrated a complex e-commerce engine into the main platform.',
        techStack: ['React', 'Express', 'Stripe'],
        outcome: 'Enabled seamless subscription management for 50k+ users.',
        year: '2024'
      }
    ],
    currentProject: 'Internal Admin Dashboard',
    clientRating: 4.7
  },
  {
    id: '7',
    name: 'Maya Patel',
    role: 'Data Scientist',
    team: 'Analytics',
    avatar: 'MP',
    email: 'maya.patel@equitypulse.ai',
    achievements: ['Developed the bias detection algorithm', 'Built predictive churn models', 'Published 2 internal research papers'],
    pastProjects: [
      {
        name: 'User Behavior Analysis',
        role: 'Data Scientist',
        description: 'Analyzed user behavior patterns to identify growth opportunities.',
        techStack: ['Python', 'Pandas', 'Scikit-learn'],
        outcome: 'Identified 3 key features that increased user engagement by 20%.',
        year: '2025'
      },
      {
        name: 'Recommendation Engine',
        role: 'ML Engineer',
        description: 'Built a personalized recommendation engine for content discovery.',
        techStack: ['PyTorch', 'SQL', 'FastAPI'],
        outcome: 'Increased content click-through rate by 35%.',
        year: '2024'
      }
    ],
    currentProject: 'LLM Fine-tuning for Bias Detection',
    clientRating: 4.9
  },
  {
    id: '8',
    name: 'Liam Taylor',
    role: 'Junior Frontend Developer',
    team: 'Product',
    avatar: 'LT',
    email: 'liam.taylor@equitypulse.ai',
    achievements: ['Completed onboarding 2 weeks early', 'Fixed 15+ UI bugs in first month', 'Contributed to the new accessibility guide'],
    pastProjects: [
      {
        name: 'University Portfolio',
        role: 'Student Developer',
        description: 'A personal portfolio site showcasing academic projects.',
        techStack: ['HTML', 'CSS', 'JavaScript'],
        outcome: 'Graduated with honors in Computer Science.',
        year: '2025'
      }
    ],
    currentProject: 'Component Library Documentation',
    clientRating: 4.5
  },
  {
    id: '9',
    name: 'Sophia Wang',
    role: 'Junior Backend Developer',
    team: 'Infrastructure',
    avatar: 'SW',
    email: 'sophia.wang@equitypulse.ai',
    achievements: ['Optimized logging for the auth service', 'Wrote 50+ unit tests for core API', 'Identified a memory leak in the test environment'],
    pastProjects: [
      {
        name: 'Open Source Contribution',
        role: 'Contributor',
        description: 'Contributed several bug fixes to a popular Node.js library.',
        techStack: ['Node.js', 'Git'],
        outcome: 'Merged 3 PRs into a project with 10k+ stars.',
        year: '2025'
      }
    ],
    currentProject: 'API Rate Limiting Implementation',
    clientRating: 4.4
  }
];

export default function App() {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [goals, setGoals] = React.useState<Goal[]>(mockGoals);
  const [reviews, setReviews] = React.useState<Review[]>(mockReviews);
  const [activities, setActivities] = React.useState<Activity[]>(mockActivities);
  const [selectedMember, setSelectedMember] = React.useState<TeamMember | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showLogout, setShowLogout] = React.useState(false);
  const [toast, setToast] = React.useState<{ message: string, type: 'success' | 'info' } | null>(null);

  const addGoal = (newGoal: Goal) => {
    setGoals([newGoal, ...goals]);
    addActivity('System', `added new goal: ${newGoal.title}`, 'pending');
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const addActivity = (user: string, action: string, status: Activity['status']) => {
    const newActivity: Activity = {
      id: Math.random().toString(36).substr(2, 9),
      user,
      action,
      time: 'Just now',
      status
    };
    setActivities([newActivity, ...activities]);
  };

  const submitReview = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: 'completed' } : r));
    const review = reviews.find(r => r.id === id);
    if (review) {
      addActivity('Manager', `completed review for ${review.employeeName}`, 'completed');
      setToast({ message: `Review for ${review.employeeName} submitted successfully!`, type: 'success' });
    }
    setActiveTab('overview');
    setTimeout(() => setToast(null), 4000);
  };

  const pendingReviewsCount = reviews.filter(r => r.status === 'pending').length;
  const biasFlags = activities.filter(a => a.status === 'flagged').length;

  const stats: Stat[] = [
    { label: 'Reviews Pending', value: pendingReviewsCount, change: '-2 from last week', trend: 'down', icon: ClipboardCheck },
    { label: 'Bias Flags Detected', value: biasFlags, change: '+3% vs avg', trend: 'up', icon: ShieldAlert },
    { label: 'Avg. Team Score', value: '4.2', change: '+0.4', trend: 'up', icon: TrendingUp },
    { label: 'Completion Rate', value: `${Math.round((reviews.filter(r => r.status === 'completed').length / reviews.length) * 100)}%`, change: '+5%', trend: 'up', icon: Target },
  ];

  const filteredMembers = mockTeamMembers.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGoals = goals.filter(g => 
    g.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setShowLogout(true)} />

      <main className="flex-1 lg:ml-64 p-4 md:p-8">
        {/* Top Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 sticky top-0 bg-background/80 backdrop-blur-md z-30 py-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search employees, goals, or reviews..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-500 hover:bg-slate-100 hover:text-accent rounded-full transition-colors relative"
              >
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full border-2 border-white" />
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <h4 className="text-sm font-bold text-slate-900">Notifications</h4>
                    <span className="text-[10px] font-bold text-accent uppercase">3 New</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
                    {activities.slice(0, 5).map((n) => (
                      <div key={n.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                        <p className="text-xs text-slate-800"><span className="font-bold">{n.user}</span> {n.action}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-slate-100">
                    <button className="text-[10px] font-bold text-primary uppercase hover:underline">Mark all as read</button>
                  </div>
                </div>
              )}
            </div>
            <div 
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-none group-hover:text-accent transition-colors">Syed Ashiq</p>
                <p className="text-[10px] text-slate-500 uppercase mt-1">Engineering Manager</p>
              </div>
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-slate-900">Manager's Overview</h2>
                <p className="text-slate-500">Welcome back! Here's what's happening with your team today.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <StatCard 
                    key={i} 
                    label={stat.label}
                    value={stat.value}
                    change={stat.change}
                    trend={stat.trend}
                    icon={stat.icon}
                  />
                ))}
              </div>

              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <ActivityFeed activities={activities} />
                  
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-900">Pending Reviews</h3>
                      <button 
                        onClick={() => setActiveTab('fair-eval')}
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        View All
                      </button>
                    </div>
                    <div className="space-y-3">
                      {reviews.filter(r => r.status === 'pending').map((review) => (
                        <div key={review.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                              {review.employeeName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">{review.employeeName}</p>
                              <p className="text-[10px] text-slate-500">Due: {review.dueDate}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => setActiveTab('fair-eval')}
                            className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-md text-xs font-semibold hover:bg-slate-50 transition-colors"
                          >
                            Start Review
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Start New Review', icon: ClipboardCheck, tab: 'fair-eval' },
                        { label: 'Update Team Goals', icon: Target, tab: 'goals' },
                        { label: 'View Bias Reports', icon: ShieldAlert, tab: 'fair-eval' },
                      ].map((action, i) => (
                        <button 
                          key={i} 
                          onClick={() => setActiveTab(action.tab)}
                          className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-primary/5 hover:text-primary rounded-lg transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <action.icon size={18} />
                            <span className="text-sm font-semibold">{action.label}</span>
                          </div>
                          <TrendingUp size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fair-eval' && (
            <FairEval 
              rawFeedback={mockFeedback} 
              competencies={mockCompetencies} 
              onSubmitReview={() => submitReview(reviews.find(r => r.status === 'pending')?.id || '1')}
            />
          )}

          {activeTab === 'goals' && (
            <GoalPlanner goals={filteredGoals} onAddGoal={addGoal} onDeleteGoal={deleteGoal} />
          )}

          {activeTab === 'team' && (
            <div className="space-y-8">
              {selectedMember ? (
                <TeamMemberDetail 
                  member={selectedMember} 
                  onBack={() => setSelectedMember(null)} 
                />
              ) : (
                <>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold text-slate-900">Team Directory</h2>
                    <p className="text-slate-500">Manage your direct reports and their performance cycles.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMembers.map((member) => (
                      <div 
                        key={member.id} 
                        onClick={() => setSelectedMember(member)}
                        className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4 hover:border-primary/30 transition-all cursor-pointer group hover:shadow-md"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                            {member.avatar}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-bold text-slate-900">{member.name}</h3>
                            <p className="text-xs text-slate-500">{member.role}</p>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-600 rounded-lg border border-amber-100">
                            <Star size={12} className="fill-amber-600" />
                            <span className="text-[10px] font-bold">{member.clientRating}</span>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t border-slate-50">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Project</p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-slate-700 truncate flex-1">{member.currentProject}</p>
                            <ChevronRight size={14} className="text-slate-300 group-hover:text-accent transition-colors ml-2 shrink-0" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {filteredMembers.length === 0 && (
                    <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                      <Search className="mx-auto text-slate-300 mb-4" size={48} />
                      <p className="text-slate-900 font-bold">No members found</p>
                      <p className="text-sm text-slate-500">Try adjusting your search query.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <ManagerProfile />
          )}

          {activeTab === 'settings' && (
            <Settings />
          )}
        </div>
      </main>

      {/* Logout Overlay */}
      <AnimatePresence>
        {showLogout && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center"
            >
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Sign Out</h3>
              <p className="text-sm text-slate-500 mb-8">Are you sure you want to sign out of EquityPulse? Any unsaved changes may be lost.</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowLogout(false)}
                  className="flex-1 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => window.location.reload()}
                  className="flex-1 py-2.5 bg-red-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-red-200 hover:bg-red-700 transition-all"
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-[100] flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-xl shadow-2xl min-w-[300px]"
          >
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
              toast.type === 'success' ? "bg-success" : "bg-accent"
            )}>
              <CheckCircle2 size={14} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">{toast.message}</p>
              <p className="text-[10px] text-slate-400">Returning to Manager's Overview...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
