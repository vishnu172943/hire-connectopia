
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface SearchExplanationProps {
  explanation: string | null;
}

const SearchExplanation = ({ explanation }: SearchExplanationProps) => {
  if (!explanation) return null;
  
  // Clean up the explanation text by removing JSON wrapper if present
  const cleanExplanation = explanation.replace(/```json\s*\{[\s\S]*"explanation":\s*"|"\s*\}\s*```/g, '');

  return (
    <Alert className="mb-6 max-w-4xl mx-auto">
      <Info className="h-4 w-4" />
      <AlertDescription>
        <div className="font-medium mb-2">AI-Enhanced Search Results</div>
        <div className="mt-2 prose prose-sm max-w-none text-muted-foreground">
          <ReactMarkdown>{cleanExplanation}</ReactMarkdown>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default SearchExplanation;
