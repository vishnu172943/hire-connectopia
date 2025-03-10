
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Sliders, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialQuery?: string;
  onFilterClick?: () => void;
}

const SearchBar = ({
  onSearch,
  placeholder = 'Search for talents, skills, or roles...',
  initialQuery = '',
  onFilterClick,
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`relative flex w-full items-center transition-all duration-300 ${
        isFocused ? 'scale-[1.01]' : 'scale-100'
      }`}
    >
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className={`h-5 w-5 ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} />
        </div>
        
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-10 py-6 h-14 text-base rounded-l-lg border-r-0 focus-visible:ring-2 focus-visible:ring-offset-0 shadow-sm"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {onFilterClick && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onFilterClick}
          className="h-14 w-14 border-x-0 rounded-none shadow-sm"
        >
          <Sliders className="h-5 w-5" />
        </Button>
      )}
      
      <Button
        type="submit"
        className="h-14 px-6 font-medium rounded-r-lg shadow-sm"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
