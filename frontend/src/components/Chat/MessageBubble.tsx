import React from 'react';
import { Message } from '@/types';

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwnMessage }) => {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} my-2`}>
      <div className={`max-w-xs p-3 rounded-2xl shadow ${isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
        <p>{message.content}</p>
        <span className="text-xs block mt-1 text-right opacity-70">{new Date(message.timestamp).toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default MessageBubble;