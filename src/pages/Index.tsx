
import { useNavigate } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import { APP_NAME, APP_DESCRIPTION, DUMMY_PROFESSIONALS } from '@/lib/constants';
import ProfileCard from '@/components/profile/ProfileCard';
import Button from '@/components/ui-custom/Button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{APP_NAME} | {APP_DESCRIPTION}</title>
          <meta name="description" content={APP_DESCRIPTION} />
        </Helmet>
      </HelmetProvider>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-grow">
          <Hero />
          <Features />
          
          {/* Featured Professionals Section */}
          <section className="py-24 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-3">
                    Featured Professionals
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl">
                    Explore some of our top talent from around the world
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="mt-4 md:mt-0"
                  onClick={() => navigate('/search')}
                  icon={<ArrowRight />}
                  iconPosition="right"
                >
                  View all professionals
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {DUMMY_PROFESSIONALS.map((professional, index) => (
                  <div
                    key={professional.id}
                    className={`animate-fade-in delay-${index * 100}`}
                  >
                    <ProfileCard {...professional} />
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-20 px-4 bg-primary text-primary-foreground">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Ready to find your perfect tech match?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals and companies already using {APP_NAME} to connect and collaborate.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  variant="default" 
                  size="xl"
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => navigate('/sign-up')}
                >
                  Create your free account
                </Button>
                <Button 
                  variant="outline" 
                  size="xl"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                  onClick={() => navigate('/search')}
                >
                  Browse talent
                </Button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
