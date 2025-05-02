
import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Copy, Copy as CopyIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SqlOutputProps {
  sql: string;
  explanation: string;
  isLoading: boolean;
}

const SqlOutput = ({ sql, explanation, isLoading }: SqlOutputProps) => {
  const { toast } = useToast();
  const [showExplanation, setShowExplanation] = useState(false);
  const [displayedSql, setDisplayedSql] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  useEffect(() => {
    if (sql && !isLoading) {
      setIsTyping(true);
      let i = 0;
      setDisplayedSql('');
      
      // Simulate typing effect
      const typing = setInterval(() => {
        setDisplayedSql(sql.substring(0, i));
        i++;
        
        if (i > sql.length) {
          clearInterval(typing);
          setIsTyping(false);
        }
      }, 20); // Adjust typing speed
      
      return () => clearInterval(typing);
    }
  }, [sql, isLoading]);
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(sql);
    toast({
      title: "Copied to clipboard",
      description: "SQL query has been copied to your clipboard",
    });
  };
  
  // Function to format SQL with syntax highlighting
  const formatSql = (sqlText: string) => {
    if (!sqlText) return null;
    
    // Replace SQL keywords with styled spans
    const formattedSql = sqlText
      .replace(/\b(SELECT|FROM|WHERE|GROUP BY|ORDER BY|HAVING|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AS|AND|OR|IN|NOT|UNION|ALL|LIMIT|OFFSET|INSERT|UPDATE|DELETE|SET|VALUES|CREATE|TABLE|INDEX|VIEW|PROCEDURE|FUNCTION|TRIGGER|CASE|WHEN|THEN|ELSE|END|IF|IS NULL|IS NOT NULL|LIKE|BETWEEN|EXISTS|DISTINCT|COUNT|SUM|AVG|MIN|MAX|CONCAT|SUBSTR|UPPER|LOWER)\b(?!["])/gi, 
        match => `<span class="sql-keyword">${match}</span>`)
      .replace(/('[^']*'|"[^"]*")/g, 
        match => `<span class="sql-string">${match}</span>`)
      .replace(/\b(\d+)\b/g,
        match => `<span class="sql-number">${match}</span>`)
      .replace(/(--.*)$/gm,
        match => `<span class="sql-comment">${match}</span>`);
    
    return (
      <pre
        className="code-block whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: formattedSql }}
      />
    );
  };
  
  if (isLoading) {
    return (
      <div className="rounded-lg bg-accent/50 p-8 animate-pulse-light flex items-center justify-center min-h-[250px]">
        <div className="text-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium">Generating SQL query...</p>
          <p className="text-sm text-muted-foreground mt-2">Converting natural language to SQL</p>
        </div>
      </div>
    );
  }
  
  if (!sql) {
    return (
      <div className="rounded-lg bg-accent/50 p-8 flex items-center justify-center min-h-[250px]">
        <div className="text-center">
          <svg 
            className="mx-auto h-12 w-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium">No query generated yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Type a prompt above to generate a SQL query
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex justify-between items-center p-4 border-b border-border">
        <h3 className="font-medium">Generated SQL</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowExplanation(!showExplanation)}
          >
            {showExplanation ? 'Hide' : 'Show'} Explanation
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopyToClipboard}
          >
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-4 relative">
        <div className={isTyping ? "typing-cursor" : ""}>
          {formatSql(displayedSql)}
        </div>
      </div>
      
      {showExplanation && explanation && (
        <div className="p-4 border-t border-border bg-accent/50">
          <h4 className="font-medium mb-2">Explanation</h4>
          <p className="text-sm">{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default SqlOutput;
