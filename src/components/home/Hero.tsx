
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui-custom/Button';
import SearchBar from '@/components/search/SearchBar';
import { Badge } from '@/components/ui/badge';
import { POPULAR_SKILLS, ROUTES } from '@/lib/constants';

const Hero = () => {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    const searchParams = new URLSearchParams();
    if (query) searchParams.set('q', query);
    if (selectedSkills.length) searchParams.set('skills', selectedSkills.join(','));
    
    navigate(`${ROUTES.SEARCH}?${searchParams.toString()}`);
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <section className="relative px-4 pt-20 md:pt-32 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -right-[25%] w-[80%] h-[80%] rounded-full bg-gradient-to-r from-primary/10 via-purple-400/5 to-blue-400/10 blur-3xl" />
        <div className="absolute -bottom-[30%] -left-[25%] w-[80%] h-[80%] rounded-full bg-gradient-to-r from-blue-400/10 via-purple-400/5 to-primary/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <Badge 
            variant="outline"
            className="px-3 py-1 text-sm rounded-full bg-background border border-primary/20 text-primary mb-6 animate-slide-in-down"
          >
            Introducing TechTalent
          </Badge>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="relative">
              Discover{' '}
              <span className="relative inline-block">
                exceptional
                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-primary/10 -z-10 transform -rotate-1"></span>
              </span>
              {' '}tech talent worldwide
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            Connect with skilled professionals using our powerful natural language search. Find the perfect match for your technical needs.
          </p>
          
          <div className="w-full max-w-2xl mb-8 relative animate-slide-in-up">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="w-full max-w-2xl flex flex-wrap justify-center gap-2 mb-12">
            <p className="w-full text-sm text-muted-foreground mb-2">Popular skills:</p>
            {POPULAR_SKILLS.slice(0, 8).map((skill, index) => (
              <Badge
                key={skill}
                variant={selectedSkills.includes(skill) ? 'default' : 'outline'}
                className={`cursor-pointer transition-all hover:scale-105 animate-fade-in delay-${index * 100}`}
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Button 
              variant="gradient" 
              size="lg"
              onClick={() => navigate(ROUTES.SIGN_UP)}
            >
              Get started for free
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate(ROUTES.SEARCH)}
            >
              Browse talents
            </Button>
          </div>
        </div>
        
        <div className="mt-4 text-center text-muted-foreground text-sm animate-fade-in">
          <p>
            Join thousands of professionals and recruiters who trust TechTalent
          </p>
          {/* Add logos of trusted companies here */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
