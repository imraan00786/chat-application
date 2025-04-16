import axiosInstance from '../api/axiosInstance';
import { Message } from '../types';

interface SmartReplyPayload {
  threadId: string;
  latestMessage: string;
  messageHistory: Message[];
}

interface SmartReplyResponse {
  suggestions: string[];
}

export const smartReplyService = {
  async getSmartReplies(payload: SmartReplyPayload): Promise<SmartReplyResponse> {
    try {
      const response = await axiosInstance.post<SmartReplyResponse>(
        '/ai/smart-reply',
        payload
      );
      return response.data;
    } catch (error: any) {
      console.error('Smart Reply fetch error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch smart replies.');
    }
  }
};
