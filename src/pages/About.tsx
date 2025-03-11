
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Users, Briefcase, Shield, Globe } from 'lucide-react';

const About = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>About | {APP_NAME}</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-grow pt-20 px-4">
          <div className="container mx-auto max-w-6xl py-8">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl font-bold tracking-tight mb-4">About {APP_NAME}</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {APP_DESCRIPTION}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-semibold">Our Mission</h2>
                <p className="text-muted-foreground">
                  At {APP_NAME}, we're on a mission to transform how tech talent connects with opportunities. 
                  We believe that finding the right talent or the perfect job shouldn't be a challenge.
                </p>
                <p className="text-muted-foreground">
                  Our platform is designed to streamline the process, making it easier for professionals 
                  to showcase their skills and for companies to find the perfect match for their needs.
                </p>
                <div className="pt-4">
                  <Link to="/sign-up">
                    <Button size="lg" className="mr-4">Join Us Today</Button>
                  </Link>
                  <Link to="/search">
                    <Button variant="outline" size="lg">Explore Talent</Button>
                  </Link>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden h-80 bg-gradient-to-r from-primary/80 to-blue-500/80 animate-fade-in">
                <div className="w-full h-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <h3 className="text-2xl font-bold mb-4">Connecting Talent Worldwide</h3>
                    <p className="max-w-md">
                      Join thousands of professionals and hundreds of companies already using {APP_NAME} 
                      to find their next opportunity or team member.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-center mb-10">Why Choose {APP_NAME}?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Card className="animate-slide-in-up">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Talent Network</h3>
                    <p className="text-muted-foreground">
                      Access a diverse pool of pre-vetted tech professionals across various specializations.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-slide-in-up delay-100">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Opportunity Matching</h3>
                    <p className="text-muted-foreground">
                      Our intelligent matching algorithm connects you with the most relevant opportunities.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-slide-in-up delay-200">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Verified Profiles</h3>
                    <p className="text-muted-foreground">
                      All professionals and companies go through a verification process to ensure quality.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-slide-in-up delay-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Global Reach</h3>
                    <p className="text-muted-foreground">
                      Connect with talent and opportunities from around the world, regardless of location.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center animate-fade-in">
              <h2 className="text-2xl font-semibold mb-6">Join Our Community</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Whether you're looking for your next career move or searching for top talent, 
                {APP_NAME} is the platform that brings together professionals and opportunities.
              </p>
              <Link to="/sign-up">
                <Button size="lg" className="px-8">Get Started</Button>
              </Link>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default About;
