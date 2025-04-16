import React, { useEffect } from 'react';
import { fetchMessagesThunk } from '../../features/chat/chatSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../app/store';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import Loader from '../Shared/Loader';  // Loading spinner component

const ChatBox = ({ threadId }: { threadId: string }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const { messages, isLoading, error } = useAppSelector((state: RootState) => state.chat);

  useEffect(() => {
    dispatch(fetchMessagesThunk(threadId));
  }, [dispatch, threadId]);

  return (
    <div className="chat-box">
      {isLoading ? (
        <Loader /> // Show loading spinner
      ) : error ? (
        <div className="error">{error}</div> // Show error message
      ) : (
        <div>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} isOwnMessage={message.senderId === user.user.id}/>
          ))}
        </div>
      )}
      <TypingIndicator threadId={threadId} username={user.user.email} />
    </div>
  );
};

export default ChatBox;
