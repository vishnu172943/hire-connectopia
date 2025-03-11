
import { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { APP_NAME, DUMMY_PROFESSIONALS } from '@/lib/constants';
import SearchBar from '@/components/search/SearchBar';
import ProfileCard from '@/components/profile/ProfileCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDeepSeekSearch } from '@/hooks/useDeepSeekSearch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('freelancers');
  const [showFilters, setShowFilters] = useState(false);
  const [profiles, setProfiles] = useState(DUMMY_PROFESSIONALS);
  const { searchWithDeepSeek, isSearching, searchExplanation } = useDeepSeekSearch();
  const { toast } = useToast();

  useEffect(() => {
    // Parse search params from URL on initial load
    const params = new URLSearchParams(window.location.search);
    const urlQuery = params.get('q');
    if (urlQuery) {
      setSearchQuery(urlQuery);
      handleSearch(urlQuery);
    }
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    // Update URL without reloading page
    const url = new URL(window.location.href);
    if (query) {
      url.searchParams.set('q', query);
    } else {
      url.searchParams.delete('q');
    }
    window.history.pushState({}, '', url);
    
    if (!query.trim()) {
      setProfiles(DUMMY_PROFESSIONALS);
      return;
    }
    
    try {
      const results = await searchWithDeepSeek(query);
      setProfiles(results);
      
      if (results.length === 0) {
        toast({
          title: "No results found",
          description: "Try a different search query"
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search failed",
        description: "An error occurred while searching. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Search | {APP_NAME}</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-grow pt-20 px-4">
          <div className="container mx-auto max-w-6xl py-8">
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Discover Talent</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find and connect with the best tech professionals for your projects
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto mb-10">
              <SearchBar 
                onSearch={handleSearch} 
                initialQuery={searchQuery}
                onFilterClick={toggleFilters}
              />
            </div>
            
            {isSearching && (
              <div className="flex justify-center my-8">
                <Spinner size="lg" />
              </div>
            )}
            
            {searchExplanation && (
              <Alert className="mb-6 max-w-4xl mx-auto">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <div className="font-medium mb-2">AI-Enhanced Search</div>
                  <Textarea 
                    value={searchExplanation} 
                    readOnly 
                    className="mt-2 h-20 text-sm opacity-80"
                  />
                </AlertDescription>
              </Alert>
            )}
            
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
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
                  onClick={toggleFilters}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
              
              {showFilters && (
                <div className="p-4 border rounded-lg bg-card animate-fade-in">
                  <h3 className="font-medium mb-3">Filter Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Filter content would go here */}
                    <p className="text-muted-foreground col-span-full">
                      Filter options will be implemented in a future update.
                    </p>
                  </div>
                </div>
              )}
              
              <TabsContent value="freelancers" className="space-y-6">
                {profiles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {profiles.map((professional) => (
                      <ProfileCard key={professional.id} {...professional} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">
                      No matching profiles found. Try a different search query.
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
          </div>
        </main>
        
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Search;
