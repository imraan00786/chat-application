import axios from '../../api/axiosInstance';
import { Message } from '../../types';

export const fetchMessages = async (groupId: string): Promise<Message[]> => {
  const response = await axios.get(`/groups/${groupId}/messages`);
  return response.data;
};

export const sendMessage = async (groupId: string, message: Partial<Message>): Promise<Message> => {
  const response = await axios.post(`/groups/${groupId}/messages`, message);
  return response.data;
};
