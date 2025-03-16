
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface SearchFiltersProps {
  show: boolean;
  onAvailabilityChange?: (onlyAvailable: boolean) => void;
}

const commonSkills = ['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'Java'];

const SearchFilters = ({ show, onAvailabilityChange }: SearchFiltersProps) => {
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  
  const handleAvailabilityChange = (checked: boolean | 'indeterminate') => {
    if (typeof checked === 'boolean') {
      setOnlyAvailable(checked);
      if (onAvailabilityChange) {
        onAvailabilityChange(checked);
      }
    }
  };
  
  if (!show) return null;
  
  return (
    <div className="p-4 border rounded-lg bg-card animate-fade-in mb-6">
      <h3 className="font-medium mb-3">Filter Options</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Availability</h4>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="available" 
              checked={onlyAvailable}
              onCheckedChange={handleAvailabilityChange}
            />
            <Label htmlFor="available" className="text-sm">Show only available</Label>
          </div>
        </div>
        
        <div className="space-y-3 col-span-2">
          <h4 className="text-sm font-medium">Popular Skills</h4>
          <div className="flex flex-wrap gap-2">
            {commonSkills.map(skill => (
              <Badge 
                key={skill}
                variant="outline" 
                className="cursor-pointer hover:bg-secondary/50"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="col-span-full flex justify-end">
          <Button size="sm" variant="outline">Apply Filters</Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
