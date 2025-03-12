
import { APP_NAME } from '@/lib/constants';
import SearchBar from '@/components/search/SearchBar';

interface SearchHeaderProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  onFilterClick: () => void;
}

const SearchHeader = ({ searchQuery, onSearch, onFilterClick }: SearchHeaderProps) => {
  return (
    <>
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Discover Talent</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find and connect with the best tech professionals for your projects using natural language search
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto mb-10">
        <SearchBar 
          onSearch={onSearch} 
          initialQuery={searchQuery}
          onFilterClick={onFilterClick}
          placeholder="Try natural language search, e.g. 'Java developer with AI experience'"
        />
      </div>
    </>
  );
};

export default SearchHeader;
