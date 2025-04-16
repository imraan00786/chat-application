import React, { useState } from 'react';
import { sendMessageThunk } from '../../features/chat/chatSlice';
import { RootState } from '../../app/store';
import Loader from '../Shared/Loader'; // Loading spinner component
import { useAppDispatch, useAppSelector } from '../../app/store';

const MessageInput = ({ threadId }: { threadId: string }) => {
  const [message, setMessage] = useState('');
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state: RootState) => state.chat); // Track loading state

  const handleSendMessage = async () => {
    if (message.trim() === '') return; // Do nothing if message is empty
    await dispatch(sendMessageThunk({ threadId, content: message }));
    setMessage(''); // Clear message input after sending
  };

  return (
    <div className="message-input-container">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      {isLoading ? (
        <Loader /> // Show loading spinner when sending message
      ) : (
        <button onClick={handleSendMessage}>Send</button>
      )}
    </div>
  );
};

export default MessageInput;
