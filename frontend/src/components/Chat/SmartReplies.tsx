import React from 'react';

interface SmartRepliesProps {
  suggestions: string[];
  onSelect: (reply: string) => void;
}

const SmartReplies: React.FC<SmartRepliesProps> = ({ suggestions, onSelect }) => {
  return (
    <div className="flex gap-2 px-4 py-2">
      {suggestions.map((reply, i) => (
        <button
          key={i}
          className="text-sm bg-gray-100 px-3 py-1 rounded-full shadow hover:bg-gray-200"
          onClick={() => onSelect(reply)}
        >
          {reply}
        </button>
      ))}
    </div>
  );
};

export default SmartReplies;