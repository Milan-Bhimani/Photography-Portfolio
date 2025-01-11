import axios from 'axios';

const API = axios.create({ baseURL: 'https://photography-portfolio-1.onrender.com' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const fetchItems = () => API.get('/api/items');
export const fetchUserItems = () => API.get('/api/user/items'); // Add this function
export const createItem = (itemData) => API.post('/api/items', itemData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const deleteItem = (id) => API.delete(`/api/items/${id}`);
export const fetchUserDetails = () => API.get('/user/me'); // Add this function
