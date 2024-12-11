import axios from 'axios';

const API_URL = '/api/auth';

export const authService = {
 async login(email: string, password: string) {
   const response = await axios.post(`${API_URL}/login`, { 
     email, 
     password 
   });
   return response.data;
 },

 async register(userData: any) {
   const response = await axios.post(`${API_URL}/register`, userData);
   return response.data;
 },

 async refreshToken() {
   const response = await axios.post(`${API_URL}/refresh-token`);
   return response.data;
 },

 logout() {
   localStorage.removeItem('token');
 }
};

