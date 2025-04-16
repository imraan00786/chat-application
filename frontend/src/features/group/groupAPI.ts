import axios from '../../api/axiosInstance'; 

// API calls
export const groupAPI = {
  getGroups: () => axios.get(`/groups`),
  getGroupById: (groupId: string) => axios.get(`/groups/${groupId}`),
  addMember: (groupId: string, userId: string) =>
    axios.post(`/groups/${groupId}/members`, { userId }),
  removeMember: (groupId: string, userId: string) =>
    axios.delete(`/groups/${groupId}/members/${userId}`),
};
