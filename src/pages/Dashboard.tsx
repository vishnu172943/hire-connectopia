
import { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { APP_NAME, DUMMY_PROFESSIONALS } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProfileCard from '@/components/profile/ProfileCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { UserCircle, Briefcase, MessageSquare, Bell } from 'lucide-react';
import PostCreator from '@/components/posts/PostCreator';
import PostsList from '@/components/posts/PostsList';

// Example posts data to populate the feed
const INITIAL_POSTS = [
  {
    id: '1',
    content: 'Just completed a major project using React and TypeScript. Excited to share my learnings with the community!',
    mediaUrls: [],
    author: {
      id: 'user1',
      name: 'Alex Chen',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    },
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    likes: 24,
    comments: 5,
  },
  {
    id: '2',
    content: 'Check out the UI redesign I just completed for a fintech client! Would love some feedback from other designers.',
    mediaUrls: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085'],
    author: {
      id: 'user2',
      name: 'Jamie Rivera',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    },
    createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    likes: 42,
    comments: 8,
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const { toast } = useToast();

  const handleCompleteProfile = () => {
    toast({
      title: 'Coming soon!',
      description: 'This feature will be available in the next update.',
    });
  };

  const handlePostCreated = (newPost: any) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Dashboard | {APP_NAME}</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-grow pt-20 px-4">
          <div className="container mx-auto max-w-6xl py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-in">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back! Manage your profile and connections.
                </p>
              </div>
              <Button 
                className="mt-4 md:mt-0"
                onClick={handleCompleteProfile}
              >
                Complete Your Profile
              </Button>
            </div>
            
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6 animate-fade-in"
            >
              <TabsList className="grid grid-cols-5 w-full max-w-2xl">
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="feed" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <PostCreator onPostCreated={handlePostCreated} />
                    <PostsList posts={posts} />
                  </div>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Recommended Connections</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {DUMMY_PROFESSIONALS.slice(0, 2).map((professional) => (
                          <div key={professional.id} className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={professional.imageUrl} alt={professional.name} />
                              <AvatarFallback>{professional.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="font-medium">{professional.name}</div>
                              <div className="text-xs text-muted-foreground">{professional.role}</div>
                            </div>
                            <Button variant="outline" size="sm">Connect</Button>
                          </div>
                        ))}
                        <Button variant="link" className="p-0 h-auto text-xs">
                          View all
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Trending Topics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="text-sm">
                            <span className="font-medium">#ReactJS</span>
                            <p className="text-xs text-muted-foreground">2,340 posts</p>
                          </li>
                          <li className="text-sm">
                            <span className="font-medium">#AIInTech</span>
                            <p className="text-xs text-muted-foreground">1,857 posts</p>
                          </li>
                          <li className="text-sm">
                            <span className="font-medium">#RemoteWork</span>
                            <p className="text-xs text-muted-foreground">1,544 posts</p>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="animate-slide-in-up delay-100">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Profile Completion
                      </CardTitle>
                      <UserCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">60%</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Complete your profile to increase visibility
                      </p>
                      <div className="mt-4 h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: '60%' }} />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="animate-slide-in-up delay-200">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Profile Views
                      </CardTitle>
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">28</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Last 30 days
                      </p>
                      <div className="mt-4 h-10">
                        {/* Simple chart visualization - would use recharts in full implementation */}
                        <div className="flex h-full items-end space-x-1">
                          {[40, 60, 45, 80, 95, 60, 70, 30, 55, 65].map((value, i) => (
                            <div
                              key={i}
                              className="bg-primary/20 hover:bg-primary/50 rounded-sm w-full transition-all"
                              style={{ height: `${value}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="animate-slide-in-up delay-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Unread Messages
                      </CardTitle>
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        You have 3 unread messages
                      </p>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-xs mt-4"
                        onClick={() => setActiveTab('messages')}
                      >
                        View all messages
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <h2 className="text-xl font-semibold mt-10">Recommended Connections</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                  {DUMMY_PROFESSIONALS.slice(0, 4).map((professional, index) => (
                    <div 
                      key={professional.id}
                      className={`animate-fade-in delay-${index * 100}`}
                    >
                      <ProfileCard {...professional} />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Profile settings and editing will be available in the next update.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="messages">
                <Card>
                  <CardHeader>
                    <CardTitle>Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Messaging functionality will be available in the next update.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center p-4 border rounded-md mb-3">
                      <Bell className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="font-medium">Welcome to {APP_NAME}!</p>
                        <p className="text-sm text-muted-foreground">
                          Complete your profile to increase your visibility to recruiters.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 border rounded-md mb-3">
                      <Bell className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="font-medium">New message received</p>
                        <p className="text-sm text-muted-foreground">
                          You have a new message from a recruiter.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <Footer />
      </div>
    </HelmetProvider>
  );
};

// Import the Avatar component which is used in the Dashboard.tsx file
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default Dashboard;
