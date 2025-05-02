
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
  suggestions: string[];
}

const PromptInput = ({ onSubmit, isLoading, suggestions }: PromptInputProps) => {
  const [prompt, setPrompt] = useState('');
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  useEffect(() => {
    // Cycle through suggestions every 5 seconds
    if (!isLoading && suggestions.length > 0) {
      const interval = setInterval(() => {
        setActiveSuggestion((prev) => (prev + 1) % suggestions.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isLoading, suggestions.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim());
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <textarea
            placeholder={suggestions[activeSuggestion] || "Describe the SQL query you need..."}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full min-h-[100px] p-4 border rounded-lg bg-card text-card-foreground resize-none focus:ring-2 focus:ring-primary focus:outline-none"
            disabled={isLoading}
          />
          
          <Button 
            type="submit" 
            className="absolute bottom-4 right-4"
            disabled={!prompt.trim() || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin mr-2" />
                <span>Generating</span>
              </div>
            ) : (
              "Generate SQL"
            )}
          </Button>
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-card border border-border shadow-lg rounded-lg p-2">
            <p className="px-2 py-1 text-sm text-muted-foreground">Suggestions:</p>
            {suggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="px-2 py-2 hover:bg-accent rounded cursor-pointer flex items-start"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <span className="suggestion-bullet mt-1.5"></span>
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default PromptInput;
