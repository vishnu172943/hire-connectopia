
import { Search, Users, Briefcase, MessageSquare } from 'lucide-react';
import Card from '@/components/ui-custom/Card';

const features = [
  {
    icon: <Search className="h-6 w-6 text-primary" />,
    title: 'Natural Language Search',
    description: 'Find talent using intuitive search queries that understand context and technical terminology.'
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: 'Visual Profiles',
    description: 'Browse talent profiles with interactive timelines, skill visualizations, and portfolio highlights.'
  },
  {
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    title: 'Talent Pools',
    description: 'Create and manage collections of potential candidates for your current and future projects.'
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-primary" />,
    title: 'Direct Communication',
    description: 'Connect directly with professionals through our built-in messaging system.'
  }
];

const Features = () => {
  return (
    <section className="py-24 px-4 bg-accent/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">
            A powerful platform connecting talent and opportunity
          </h2>
          <p className="text-lg text-muted-foreground">
            Our cutting-edge features make recruiting and networking in the tech industry seamless and efficient.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className={`p-6 border h-full transition-all duration-500 hover:-translate-y-1 hover:shadow-md animate-fade-in delay-${index * 100}`}
            >
              <div className="flex flex-col h-full">
                <div className="p-2 bg-primary/10 rounded-lg w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground grow">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
