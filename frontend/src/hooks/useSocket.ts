import { useEffect } from 'react';
import { getSocket } from '../services/socketService';
import { addMessage } from '../features/chat/chatSlice';
import { showErrorToast } from '../utils/toastUtils';
import { useAppDispatch } from '../app/store';

const useSocket = (userId: string, threadId: string) => {
  const dispatch = useAppDispatch();
  const socket = getSocket();
  useEffect(() => {
    if (!userId || !threadId) return;

    socket.emit('join_thread', { threadId });

    socket.on('new_message', (message: any) => {
      dispatch(addMessage(message));
    });

    socket.on('smart_replies', (replies: any) => {
      console.log('Smart replies received:', replies);
    });

    socket.on('connect_error', () => {
      showErrorToast('Socket connection failed. Please refresh.');
    });

    socket.on('error', (error: any) => {
      showErrorToast(error?.message || 'Socket error occurred');
    });

    return () => {
      socket.emit('leave_thread', { threadId });
      socket.off('new_message');
      socket.off('smart_replies');
      socket.off('connect_error');
      socket.off('error');
    };
  }, [userId, threadId, dispatch]);
};

export default useSocket;
