
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface SearchExplanationProps {
  explanation: string | null;
}

const SearchExplanation = ({ explanation }: SearchExplanationProps) => {
  if (!explanation) return null;

  return (
    <Alert className="mb-6 max-w-4xl mx-auto">
      <Info className="h-4 w-4" />
      <AlertDescription>
        <div className="font-medium mb-2">AI-Enhanced Search Results</div>
        <Textarea 
          value={explanation} 
          readOnly 
          className="mt-2 h-28 text-sm opacity-80"
        />
      </AlertDescription>
    </Alert>
  );
};

export default SearchExplanation;
