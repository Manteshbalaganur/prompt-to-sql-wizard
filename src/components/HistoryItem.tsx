
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface HistoryItemProps {
  id: string;
  prompt: string;
  timestamp: Date;
  onClick: () => void;
}

const HistoryItem = ({ prompt, timestamp, onClick }: HistoryItemProps) => {
  const formattedTime = formatDistanceToNow(timestamp, { addSuffix: true });
  
  // Truncate the prompt if it's too long
  const truncatedPrompt = 
    prompt.length > 60 ? `${prompt.substring(0, 60)}...` : prompt;
    
  return (
    <div 
      className="p-3 rounded-md hover:bg-sidebar-accent cursor-pointer transition-colors"
      onClick={onClick}
    >
      <p className="text-sm font-medium">{truncatedPrompt}</p>
      <p className="text-xs text-sidebar-foreground/70 mt-1">{formattedTime}</p>
    </div>
  );
};

export default HistoryItem;
