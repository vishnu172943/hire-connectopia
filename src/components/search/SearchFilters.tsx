
interface SearchFiltersProps {
  show: boolean;
}

const SearchFilters = ({ show }: SearchFiltersProps) => {
  if (!show) return null;
  
  return (
    <div className="p-4 border rounded-lg bg-card animate-fade-in">
      <h3 className="font-medium mb-3">Filter Options</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <p className="text-muted-foreground col-span-full">
          Filter options will be implemented in a future update.
        </p>
      </div>
    </div>
  );
};

export default SearchFilters;
