import { useState } from 'react';
import { selectMessages } from '../features/chat/chatSelectors'; 
import { addMessage } from '../features/chat/chatSlice'; 
import { showErrorToast } from '../utils/toastUtils'; 
import { smartReplyService } from '../services/smartReplyService'; 
import { useAppDispatch, useAppSelector } from '../app/store';

interface SmartReplyHook {
  smartReply: string[];
  isLoading: boolean;
  error: string | null;
  getSmartReply: (message: string, threadId: string) => void;
}

export const useSmartReply = (): SmartReplyHook => {
  const [smartReply, setSmartReply] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages); // Get messages from store

  // Function to fetch smart reply from backend/API
  const getSmartReply = async (message: string,  threadId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      
      const reply = await smartReplyService.getSmartReplies({threadId: threadId, latestMessage: message, messageHistory: messages});
      
   
      setSmartReply(prevReplies => [...prevReplies, ...reply.suggestions]);
      
      
      dispatch(addMessage({ content: reply, isSmartReply: true }));
      
    } catch (err: any) {
      setError('Failed to fetch smart reply. Please try again.');
      showErrorToast(err?.message || 'Error generating smart reply');
    } finally {
      setIsLoading(false);
    }
  };

  return { smartReply, isLoading, error, getSmartReply };
};
