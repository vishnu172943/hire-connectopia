
import { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { APP_NAME, TECH_CATEGORIES } from '@/lib/constants';
import SearchBar from '@/components/search/SearchBar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BriefcaseBusiness, MapPin, DollarSign, Clock } from 'lucide-react';

const DUMMY_JOBS = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechGrowth Inc.',
    location: 'San Francisco, CA (Remote)',
    salary: '$120,000 - $150,000',
    type: 'Full-Time',
    posted: '2 days ago',
    skills: ['React', 'TypeScript', 'CSS', 'Redux'],
    description: 'We are looking for a senior frontend developer to join our team and help build our next generation web applications...'
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'DataSys Solutions',
    location: 'New York (Hybrid)',
    salary: '$130,000 - $160,000',
    type: 'Full-Time',
    posted: '1 week ago',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'AWS'],
    description: 'Join our backend team to design and implement scalable APIs and microservices...'
  },
  {
    id: '3',
    title: 'DevOps Specialist',
    company: 'CloudScale',
    location: 'Remote',
    salary: '$140,000 - $170,000',
    type: 'Contract',
    posted: '3 days ago',
    skills: ['Kubernetes', 'Docker', 'CI/CD', 'Terraform'],
    description: 'Help us build and maintain our cloud infrastructure and deployment pipelines...'
  },
  {
    id: '4',
    title: 'Mobile Developer (iOS)',
    company: 'AppWorks',
    location: 'Austin, TX',
    salary: '$110,000 - $140,000',
    type: 'Full-Time',
    posted: '5 days ago',
    skills: ['Swift', 'iOS', 'UIKit', 'SwiftUI'],
    description: 'Looking for an experienced iOS developer to work on our consumer mobile applications...'
  },
];

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for jobs:', query);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Jobs | {APP_NAME}</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-grow pt-20 px-4">
          <div className="container mx-auto max-w-6xl py-8">
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Find Your Next Opportunity</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse through hundreds of tech jobs from top companies
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto mb-10">
              <SearchBar 
                onSearch={handleSearch} 
                initialQuery={searchQuery}
                placeholder="Search for jobs, skills, or companies..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Sidebar with filters */}
              <div className="hidden md:block space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {TECH_CATEGORIES.slice(0, 6).map((category) => (
                      <div key={category.value} className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id={category.value} 
                          className="rounded text-primary" 
                        />
                        <label htmlFor={category.value} className="text-sm">
                          {category.label}
                        </label>
                      </div>
                    ))}
                    <Button variant="link" className="p-0 text-xs h-auto">
                      View all categories
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Job Type</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {['Full-Time', 'Part-Time', 'Contract', 'Freelance'].map((type) => (
                      <div key={type} className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id={type} 
                          className="rounded text-primary" 
                        />
                        <label htmlFor={type} className="text-sm">{type}</label>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Location</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {['Remote', 'Hybrid', 'On-site'].map((location) => (
                      <div key={location} className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id={location} 
                          className="rounded text-primary" 
                        />
                        <label htmlFor={location} className="text-sm">{location}</label>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              {/* Job listings */}
              <div className="md:col-span-3 space-y-6">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="space-y-6"
                >
                  <TabsList className="grid grid-cols-4 w-full max-w-md">
                    <TabsTrigger value="all">All Jobs</TabsTrigger>
                    <TabsTrigger value="fulltime">Full-Time</TabsTrigger>
                    <TabsTrigger value="contract">Contract</TabsTrigger>
                    <TabsTrigger value="remote">Remote</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-4">
                    {DUMMY_JOBS.map((job) => (
                      <Card key={job.id} className="hover:shadow-md transition-all">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl">{job.title}</CardTitle>
                              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                <BriefcaseBusiness className="h-4 w-4" />
                                <span>{job.company}</span>
                              </div>
                            </div>
                            <Button>Apply Now</Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm">{job.description}</p>
                          
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill) => (
                              <Badge key={skill} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <span>{job.salary}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>Posted {job.posted}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Badge variant="outline">{job.type}</Badge>
                          <Button variant="ghost" size="sm">Save Job</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="fulltime">
                    {DUMMY_JOBS.filter(job => job.type === 'Full-Time').map((job) => (
                      <Card key={job.id} className="hover:shadow-md transition-all">
                        {/* Same card content as above */}
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl">{job.title}</CardTitle>
                              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                <BriefcaseBusiness className="h-4 w-4" />
                                <span>{job.company}</span>
                              </div>
                            </div>
                            <Button>Apply Now</Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{job.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="contract">
                    {DUMMY_JOBS.filter(job => job.type === 'Contract').map((job) => (
                      <Card key={job.id} className="hover:shadow-md transition-all">
                        {/* Same card content as above */}
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl">{job.title}</CardTitle>
                              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                <BriefcaseBusiness className="h-4 w-4" />
                                <span>{job.company}</span>
                              </div>
                            </div>
                            <Button>Apply Now</Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{job.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="remote">
                    {DUMMY_JOBS.filter(job => job.location.includes('Remote')).map((job) => (
                      <Card key={job.id} className="hover:shadow-md transition-all">
                        {/* Same card content as above */}
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl">{job.title}</CardTitle>
                              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                <BriefcaseBusiness className="h-4 w-4" />
                                <span>{job.company}</span>
                              </div>
                            </div>
                            <Button>Apply Now</Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{job.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Jobs;
