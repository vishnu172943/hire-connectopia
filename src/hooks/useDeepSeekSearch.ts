
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Developer {
  id: string;
  name: string;
  role: string;
  location: string;
  image_url: string;
  skills: string[];
  experience: string;
  available: boolean;
  hourly_rate: number;
}

interface SearchResult {
  matches: string[];
  explanation: string;
}

export const useDeepSeekSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchExplanation, setSearchExplanation] = useState<string | null>(null);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all developers on initial load
  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('developers')
        .select('*');

      if (error) {
        throw error;
      }

      setDevelopers(data || []);
    } catch (error) {
      console.error('Error fetching developers:', error);
      toast.error('Failed to load developer profiles');
    } finally {
      setIsLoading(false);
    }
  };

  const searchWithDeepSeek = async (query: string) => {
    if (!query.trim()) {
      return developers;
    }

    setIsSearching(true);
    setSearchExplanation(null);

    try {
      // Call Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('deepseek-search', {
        body: {
          query,
          context: developers.map(developer => ({
            id: developer.id,
            name: developer.name,
            role: developer.role, // Pass role instead of title
            skills: developer.skills,
            experience: developer.experience // Pass experience instead of bio
          }))
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log('Search results:', data);

      // Handle the response
      const result = data as SearchResult;
      setSearchExplanation(result.explanation);

      // Filter and sort profiles based on results
      if (result.matches && result.matches.length > 0) {
        // Find developers with matching IDs
        const matchedDevelopers = developers.filter(developer => 
          result.matches.some(matchId => matchId === developer.id)
        );
        
        // Sort developers in the same order as the matches array
        const sortedDevelopers = [...matchedDevelopers].sort((a, b) => {
          const indexA = result.matches.findIndex(matchId => matchId === a.id);
          const indexB = result.matches.findIndex(matchId => matchId === b.id);
          return indexA - indexB;
        });
        
        // Add any remaining developers not in the matches
        const remainingDevelopers = developers.filter(
          developer => !result.matches.some(matchId => matchId === developer.id)
        );
        
        return [...sortedDevelopers, ...remainingDevelopers];
      }

      return developers;
    } catch (error) {
      console.error('Error searching:', error);
      toast.error('Search enhancement failed. Falling back to basic search.');
      return developers;
    } finally {
      setIsSearching(false);
    }
  };

  return { 
    searchWithDeepSeek, 
    isSearching, 
    searchExplanation,
    developers,
    isLoading 
  };
};
