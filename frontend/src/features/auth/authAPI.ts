import axios from '../../api/axiosInstance';


export const authService = {
    register: (email: string, password: string) =>
         axios.post(`/auth/register`, { email, password }),
    login: (email: string, password: string) =>
        axios.post(`/auth/login`, { email, password }),

    
  };