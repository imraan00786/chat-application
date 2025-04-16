import React from 'react';
import ChatBox from '../components/Chat/ChatBox';
import { useSelector } from 'react-redux';
import { selectCurrentGroup } from '../features/group/groupSlice';

const Chat = () => {
    const group = useSelector(selectCurrentGroup);
    const threadId = group?.id || '';
  
    return (
      <div className="h-screen flex flex-col">
        <ChatBox threadId={threadId} />
      </div>
    );
  };
  
  export default Chat;