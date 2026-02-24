import axios from 'axios';

// 1. create an axios instance with default settings
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// 2. Add a request interceptor to include CSRF token in headers 
api.interceptors.request.use((config) => {
  // function to get cookie value by name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  // Get the CSRF token from cookies
  const token = getCookie('XSRF-TOKEN');

  // if token exists, add it to the request headers
  if (token) {
    // Laravel Sanctum expects the token in the 'X-XSRF-TOKEN' header
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
  }

  return config;
});

export default api;