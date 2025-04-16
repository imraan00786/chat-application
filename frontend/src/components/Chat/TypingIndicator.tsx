import React from 'react';

interface TypingIndicatorProps {
  username: string;
  threadId: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ username }) => {
  return <div className="text-sm italic text-gray-500 px-4">{username} is typing...</div>;
};

export default TypingIndicator;