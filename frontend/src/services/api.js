import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

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
export const createItem = (itemData) => API.post('/api/items', itemData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const deleteItem = (id) => API.delete(`/api/items/${id}`);
export const fetchUserDetails = () => API.get('/user/me'); // Add this function