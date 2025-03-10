
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Card, { CardContent, CardFooter } from '@/components/ui-custom/Card';
import { User, MapPin, Briefcase, Clock, MessageSquare, ExternalLink } from 'lucide-react';

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
  
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card 
      variant="elevated" 
      hover
      className="h-full group bg-card dark:bg-card overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-white shadow-md transition-transform group-hover:scale-105">
              {imageUrl ? (
                <AvatarImage src={imageUrl} alt={name} className="object-cover" />
              ) : (
                <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-semibold text-lg leading-tight">{name}</h3>
              <p className="text-muted-foreground">{role}</p>
            </div>
          </div>
          {available && (
            <Badge variant="default" className="bg-green-500 hover:bg-green-600">
              Available
            </Badge>
          )}
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{role}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{experience} experience</span>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium mb-2">Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <Badge 
                key={skill} 
                variant="secondary" 
                className="font-normal transition-colors"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <CardFooter className="px-6 py-4 bg-muted/30 border-t flex justify-between items-center">
        <Link to={`/profile/${id}`}>
          <Button 
            size="sm" 
            variant="outline" 
            className="text-sm font-medium transition-all"
          >
            View Profile
            <ExternalLink className="ml-2 h-3.5 w-3.5" />
          </Button>
        </Link>
        <Button 
          size="sm" 
          variant="default" 
          className="text-sm font-medium transition-all"
        >
          <MessageSquare className="mr-2 h-3.5 w-3.5" />
          Contact
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
