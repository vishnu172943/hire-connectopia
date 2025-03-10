
import { useNavigate } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import { APP_NAME, APP_DESCRIPTION, DUMMY_PROFESSIONALS } from '@/lib/constants';
import ProfileCard from '@/components/profile/ProfileCard';
import Button from '@/components/ui-custom/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

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
          <section className="py-16 px-4 relative overflow-hidden">
            {/* Shine effect background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-[20%] right-[10%] w-[50%] h-[30%] rounded-full bg-gradient-to-r from-primary/5 via-purple-400/10 to-blue-400/5 blur-2xl" />
              <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[20%] rounded-full bg-gradient-to-r from-pink-400/5 via-amber-300/10 to-yellow-200/5 blur-2xl" />
            </div>
            
            <div className="container mx-auto max-w-6xl relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-primary/80">
                    <Sparkles className="h-5 w-5 animate-pulse-soft" />
                  </span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                    Featured Talent
                  </h2>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4 md:mt-0 bg-gradient-to-r from-background to-secondary/40 hover:from-background hover:to-secondary/60 transition-all duration-300"
                  onClick={() => navigate('/search')}
                  icon={<ArrowRight />}
                  iconPosition="right"
                >
                  View all
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {DUMMY_PROFESSIONALS.slice(0, 4).map((professional, index) => (
                  <div
                    key={professional.id}
                    className={`animate-fade-in delay-${index * 100} transform hover:translate-y-[-4px] transition-transform duration-300`}
                  >
                    <ProfileCard {...professional} />
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground relative overflow-hidden">
            {/* Shine overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <div className="container mx-auto max-w-4xl text-center relative z-10">
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
