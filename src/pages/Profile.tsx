
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Mail, 
  MapPin, 
  Briefcase, 
  Calendar, 
  GraduationCap, 
  Github, 
  Linkedin, 
  Globe,
  MessageSquare,
  Download,
  Share2,
  Edit
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isCurrentUser, setIsCurrentUser] = useState(true); // In a real app, this would be determined by auth

  // Demo profile data
  const profile = {
    name: 'Alex Morgan',
    role: 'Senior Frontend Engineer',
    location: 'San Francisco, CA',
    email: 'alex.morgan@example.com',
    bio: 'Passionate frontend engineer with 8+ years of experience building modern, responsive web applications. Specialized in React and TypeScript, with a strong focus on creating elegant, accessible, and performant user interfaces.',
    skills: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'JavaScript', level: 95 },
      { name: 'Next.js', level: 80 },
      { name: 'CSS/SCSS', level: 85 },
      { name: 'Node.js', level: 70 },
      { name: 'GraphQL', level: 75 },
      { name: 'Testing (Jest, RTL)', level: 80 },
    ],
    experience: [
      {
        title: 'Senior Frontend Engineer',
        company: 'TechCorp Inc.',
        duration: 'Jan 2020 - Present',
        description: 'Leading frontend development for enterprise SaaS platform.',
      },
      {
        title: 'Frontend Developer',
        company: 'WebSolutions',
        duration: 'Mar 2018 - Dec 2019',
        description: 'Developed responsive web applications using React and Redux.',
      },
      {
        title: 'Junior Developer',
        company: 'StartupXYZ',
        duration: 'Jun 2016 - Feb 2018',
        description: 'Full-stack development using MERN stack.',
      },
    ],
    education: [
      {
        degree: 'M.S. Computer Science',
        institution: 'Stanford University',
        duration: '2014 - 2016',
      },
      {
        degree: 'B.S. Computer Science',
        institution: 'UC Berkeley',
        duration: '2010 - 2014',
      },
    ],
    projects: [
      {
        name: 'E-commerce Platform',
        description: 'Modern e-commerce platform built with React, Node.js, and MongoDB.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux'],
        link: 'https://github.com/example/ecommerce',
      },
      {
        name: 'Weather Dashboard',
        description: 'Interactive weather dashboard utilizing OpenWeather API.',
        technologies: ['React', 'TypeScript', 'Chart.js', 'Styled Components'],
        link: 'https://github.com/example/weather',
      },
    ],
    socialLinks: {
      github: 'https://github.com/alexmorgan',
      linkedin: 'https://linkedin.com/in/alexmorgan',
      website: 'https://alexmorgan.dev',
    },
  };

  return (
    <>
      <Helmet>
        <title>{profile.name} | {APP_NAME}</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-grow pt-20 px-4">
          <div className="container mx-auto max-w-6xl py-8">
            {/* Profile Header */}
            <div className="relative mb-8">
              {/* Cover Photo */}
              <div className="h-48 w-full bg-gradient-to-r from-primary/30 via-purple-400/20 to-blue-400/30 rounded-xl overflow-hidden animate-fade-in"></div>
              
              {/* Profile Info */}
              <div className="flex flex-col md:flex-row gap-6 px-4 -mt-12 relative animate-slide-in-up">
                <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-md">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" alt={profile.name} />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-grow pt-4 md:pt-12">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{profile.name}</h1>
                      <p className="text-muted-foreground">{profile.role}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{profile.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="h-4 w-4 mr-1" />
                          <span>{profile.email}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4 md:mt-0">
                      {!isCurrentUser ? (
                        <>
                          <Button>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Contact
                          </Button>
                          <Button variant="outline">
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button variant="outline">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                          </Button>
                          <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Profile Content */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6 animate-fade-in"
            >
              <TabsList className="grid grid-cols-4 w-full max-w-md">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card className="animate-slide-in-up delay-100">
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{profile.bio}</p>
                    
                    <div className="mt-6 flex flex-wrap gap-4">
                      {Object.entries(profile.socialLinks).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm hover:underline text-primary"
                        >
                          {platform === 'github' && <Github className="h-4 w-4 mr-1" />}
                          {platform === 'linkedin' && <Linkedin className="h-4 w-4 mr-1" />}
                          {platform === 'website' && <Globe className="h-4 w-4 mr-1" />}
                          {platform === 'github' && 'GitHub'}
                          {platform === 'linkedin' && 'LinkedIn'}
                          {platform === 'website' && 'Website'}
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="animate-slide-in-up delay-200">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Briefcase className="h-5 w-5 mr-2" />
                        Work Experience
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {profile.experience.slice(0, 2).map((exp, index) => (
                        <div key={index} className="relative pl-6 border-l-2 border-muted pb-6 last:pb-0">
                          <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                          <h3 className="font-medium">{exp.title}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-1">
                            <span className="mr-2">{exp.company}</span>
                            <span className="text-xs px-2 py-0.5 bg-muted rounded-full">
                              {exp.duration}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{exp.description}</p>
                        </div>
                      ))}
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="px-0 text-sm"
                        onClick={() => setActiveTab('experience')}
                      >
                        View all experience
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="animate-slide-in-up delay-300">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <GraduationCap className="h-5 w-5 mr-2" />
                        Education
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {profile.education.map((edu, index) => (
                        <div key={index} className="relative pl-6 border-l-2 border-muted pb-6 last:pb-0">
                          <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                          <h3 className="font-medium">{edu.degree}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-1">
                            <span className="mr-2">{edu.institution}</span>
                            <span className="text-xs px-2 py-0.5 bg-muted rounded-full">
                              {edu.duration}
                            </span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="animate-slide-in-up delay-400">
                  <CardHeader>
                    <CardTitle>Top Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {profile.skills.slice(0, 6).map((skill) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="px-0 mt-4 text-sm"
                      onClick={() => setActiveTab('skills')}
                    >
                      View all skills
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="experience">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-2" />
                      Work Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {profile.experience.map((exp, index) => (
                      <div 
                        key={index} 
                        className="relative pl-6 border-l-2 border-muted pb-8 last:pb-0 animate-slide-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                        <h3 className="font-medium text-lg">{exp.title}</h3>
                        <div className="flex items-center text-muted-foreground mb-2">
                          <span className="mr-2">{exp.company}</span>
                          <span className="text-xs px-2 py-0.5 bg-muted rounded-full">
                            {exp.duration}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{exp.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="skills">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills & Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {profile.skills.map((skill, index) => (
                        <div 
                          key={skill.name} 
                          className="space-y-2 animate-slide-in-up"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4">Additional Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Git', 'Webpack', 'Docker', 'CI/CD', 'Agile', 'Scrum', 'UI/UX', 'Responsive Design', 'Performance Optimization', 'SEO'].map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="projects">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profile.projects.map((project, index) => (
                    <Card 
                      key={project.name}
                      className="animate-slide-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                          <span>{project.name}</span>
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline flex items-center"
                          >
                            <Github className="h-4 w-4 mr-1" />
                            View Project
                          </a>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Profile;
