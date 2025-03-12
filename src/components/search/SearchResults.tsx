
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProfileCard from '@/components/profile/ProfileCard';
import { Spinner } from '@/components/ui/spinner';

interface Developer {
  id: string;
  name: string;
  role: string;
  location: string;
  image_url: string;
  skills: string[];
  experience: string;
  available: boolean;
}

interface SearchResultsProps {
  isLoading: boolean;
  isSearching: boolean;
  hasSearched: boolean;
  developers: Developer[];
  activeTab: string;
  onTabChange: (value: string) => void;
  onFilterClick: () => void;
}

const SearchResults = ({
  isLoading,
  isSearching,
  hasSearched,
  developers,
  activeTab,
  onTabChange,
  onFilterClick,
}: SearchResultsProps) => {
  return (
    <Tabs
      value={activeTab}
      onValueChange={onTabChange}
      className="space-y-6 animate-fade-in"
    >
      <div className="flex justify-between items-center">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="freelancers">Freelancers</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>
        
        <Button 
          variant="outline" 
          size="sm"
          className="gap-2"
          onClick={onFilterClick}
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>
      
      <TabsContent value="freelancers" className="space-y-6">
        {isLoading || isSearching ? (
          <div className="flex justify-center my-8">
            <Spinner size="lg" />
            <p className="ml-3 text-muted-foreground">
              {isLoading ? "Loading developers..." : "Searching..."}
            </p>
          </div>
        ) : developers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developers.map((developer) => (
              <ProfileCard 
                key={developer.id} 
                {...developer}
              />
            ))}
          </div>
        ) : hasSearched ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              No matching profiles found. Try a different search query.
            </p>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              Enter a search query to find tech professionals.
            </p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="jobs">
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            Job listings will be displayed here.
          </p>
        </div>
      </TabsContent>
      
      <TabsContent value="companies">
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            Company listings will be displayed here.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default SearchResults;
