
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Card, { CardContent, CardFooter } from '@/components/ui-custom/Card';
import { User, MapPin, Briefcase, Clock, MessageSquare, ExternalLink } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ProfileCardProps {
  id: string;
  name: string;
  role: string;
  location: string;
  imageUrl?: string;
  skills: string[];
  experience: string;
  available: boolean;
}

const ProfileCard = ({
  id,
  name,
  role,
  location,
  imageUrl,
  skills,
  experience,
  available,
}: ProfileCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const handleContactClick = () => {
    if (!isAuthenticated) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to contact this professional',
      });
      navigate('/sign-in');
      return;
    }
    
    // For now, just show a toast. In a real app, this would open a messaging interface
    toast({
      title: 'Contact initiated',
      description: `You can now message ${name}`,
    });
  };

  return (
    <Card 
      variant="elevated" 
      hover
      className="h-full group bg-card/80 backdrop-blur-sm border-primary/5 overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border-2 border-primary/10 shadow-sm transition-transform group-hover:scale-105 ring-2 ring-primary/5">
              {imageUrl ? (
                <AvatarImage src={imageUrl} alt={name} className="object-cover" />
              ) : (
                <AvatarFallback className="text-md bg-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="font-semibold text-base leading-tight">{name}</h3>
              <p className="text-sm text-muted-foreground">{role}</p>
            </div>
          </div>
          {available && (
            <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-xs">
              Available
            </Badge>
          )}
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
            <span>{experience}</span>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-1 mt-2">
            {skills.slice(0, 3).map((skill) => (
              <Badge 
                key={skill} 
                variant="secondary" 
                className="font-normal text-xs transition-colors bg-secondary/50 backdrop-blur-sm"
              >
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{skills.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <CardFooter className="px-4 py-3 bg-muted/30 border-t border-primary/5 flex justify-between items-center">
        <Link to={`/profile/${id}`}>
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-xs h-8 px-2 hover:bg-primary/10"
          >
            View Profile
            <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        </Link>
        <Button 
          size="sm" 
          variant="default" 
          className="text-xs h-8 px-2 bg-primary/90 hover:bg-primary"
          onClick={handleContactClick}
        >
          <MessageSquare className="mr-1 h-3 w-3" />
          Contact
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
