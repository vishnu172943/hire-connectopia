
import { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { APP_NAME } from '@/lib/constants';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDeepSeekSearch } from '@/hooks/useDeepSeekSearch';
import { useToast } from '@/hooks/use-toast';
import SearchHeader from '@/components/search/SearchHeader';
import SearchResults from '@/components/search/SearchResults';
import SearchFilters from '@/components/search/SearchFilters';
import SearchExplanation from '@/components/search/SearchExplanation';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('freelancers');
  const [showFilters, setShowFilters] = useState(false);
  const { 
    searchWithDeepSeek, 
    isSearching, 
    searchExplanation, 
    developers, 
    isLoading 
  } = useDeepSeekSearch();
  const [filteredDevelopers, setFilteredDevelopers] = useState([]);
  const { toast } = useToast();
  const [hasSearched, setHasSearched] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (!isLoading && isInitialLoad) {
      setFilteredDevelopers(developers);
      setIsInitialLoad(false);
      
      const params = new URLSearchParams(window.location.search);
      const urlQuery = params.get('q');
      if (urlQuery) {
        setSearchQuery(urlQuery);
        handleSearch(urlQuery);
      }
    }
  }, [developers, isLoading]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setHasSearched(true);
    
    const url = new URL(window.location.href);
    if (query) {
      url.searchParams.set('q', query);
    } else {
      url.searchParams.delete('q');
    }
    window.history.pushState({}, '', url);
    
    if (!query.trim()) {
      setFilteredDevelopers(developers);
      return;
    }
    
    try {
      const results = await searchWithDeepSeek(query);
      setFilteredDevelopers(results);
      
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
      setFilteredDevelopers(developers);
    }
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
            <SearchHeader 
              searchQuery={searchQuery}
              onSearch={handleSearch}
              onFilterClick={() => setShowFilters(!showFilters)}
            />
            
            {!isSearching && !isLoading && (
              <SearchExplanation explanation={searchExplanation} />
            )}
            
            <SearchFilters show={showFilters} />
            
            <SearchResults 
              isLoading={isLoading}
              isSearching={isSearching}
              hasSearched={hasSearched}
              developers={filteredDevelopers}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onFilterClick={() => setShowFilters(!showFilters)}
            />
          </div>
        </main>
        
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Search;
