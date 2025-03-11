
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { DUMMY_PROFESSIONALS } from '@/lib/constants';

interface DeepSeekSearchResult {
  matches: number[];
  explanation: string;
}

export const useDeepSeekSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchExplanation, setSearchExplanation] = useState<string | null>(null);

  const searchWithDeepSeek = async (query: string) => {
    if (!query.trim()) {
      return DUMMY_PROFESSIONALS;
    }

    setIsSearching(true);
    setSearchExplanation(null);

    try {
      // Call Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('deepseek-search', {
        body: {
          query,
          context: DUMMY_PROFESSIONALS.map(profile => ({
            id: profile.id,
            name: profile.name,
            title: profile.title,
            skills: profile.skills,
            bio: profile.bio
          }))
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log('DeepSeek search results:', data);

      // Handle the response
      const result = data as DeepSeekSearchResult;
      setSearchExplanation(result.explanation);

      // Filter and sort profiles based on DeepSeek results
      if (result.matches && result.matches.length > 0) {
        const matchedProfiles = DUMMY_PROFESSIONALS.filter(profile => 
          result.matches.includes(profile.id)
        );
        
        // Sort profiles in the same order as the matches array
        const sortedProfiles = matchedProfiles.sort((a, b) => {
          return result.matches.indexOf(a.id) - result.matches.indexOf(b.id);
        });
        
        // Add any remaining profiles not in the matches
        const remainingProfiles = DUMMY_PROFESSIONALS.filter(
          profile => !result.matches.includes(profile.id)
        );
        
        return [...sortedProfiles, ...remainingProfiles];
      }

      return DUMMY_PROFESSIONALS;
    } catch (error) {
      console.error('Error searching with DeepSeek:', error);
      toast.error('Search enhancement failed. Falling back to basic search.');
      return DUMMY_PROFESSIONALS;
    } finally {
      setIsSearching(false);
    }
  };

  return { searchWithDeepSeek, isSearching, searchExplanation };
};
