
export const APP_NAME = 'TechTalent';
export const APP_DESCRIPTION = 'Discover and connect with the best tech talent worldwide';

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  EDIT_PROFILE: '/profile/edit',
  SEARCH: '/search',
  MESSAGES: '/messages',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
};

export const USER_ROLES = {
  PROFESSIONAL: 'professional',
  RECRUITER: 'recruiter',
  ADMIN: 'admin',
};

export const SKILL_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' },
];

export const TECH_CATEGORIES = [
  { value: 'frontend', label: 'Frontend Development' },
  { value: 'backend', label: 'Backend Development' },
  { value: 'fullstack', label: 'Fullstack Development' },
  { value: 'mobile', label: 'Mobile Development' },
  { value: 'devops', label: 'DevOps' },
  { value: 'data', label: 'Data Science' },
  { value: 'ai', label: 'AI & Machine Learning' },
  { value: 'security', label: 'Security' },
  { value: 'qa', label: 'Quality Assurance' },
  { value: 'design', label: 'UI/UX Design' },
  { value: 'product', label: 'Product Management' },
];

export const POPULAR_SKILLS = [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'AWS',
  'Docker',
  'Kubernetes',
  'GraphQL',
  'SQL',
  'NoSQL',
  'Machine Learning',
  'DevOps',
  'CI/CD',
  'Git',
];

export const DUMMY_PROFESSIONALS = [
  {
    id: '1',
    name: 'Alex Morgan',
    role: 'Senior Frontend Engineer',
    location: 'San Francisco, CA',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    skills: ['React', 'TypeScript', 'GraphQL', 'Next.js'],
    experience: '8 years',
    available: true,
  },
  {
    id: '2',
    name: 'Jordan Chen',
    role: 'Machine Learning Engineer',
    location: 'Seattle, WA',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Computer Vision'],
    experience: '5 years',
    available: true,
  },
  {
    id: '3',
    name: 'Taylor Wilson',
    role: 'DevOps Specialist',
    location: 'Remote',
    imageUrl: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
    experience: '7 years',
    available: false,
  },
  {
    id: '4',
    name: 'Jamie Rivera',
    role: 'Backend Developer',
    location: 'New York, NY',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    skills: ['Node.js', 'Java', 'Microservices', 'MongoDB'],
    experience: '6 years',
    available: true,
  },
];
