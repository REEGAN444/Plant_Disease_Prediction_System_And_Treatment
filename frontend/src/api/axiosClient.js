import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/api', // Proxied to http://localhost:8080/api via vite.config.js
  timeout: 30000,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('plant_ai_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    // If response wrapped in ApiResponse, return unwrapped data if success
    return response.data;
  },
  (error) => {
    let message = 'An error occurred while connecting to the server.';
    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message;
    } else if (error.message) {
      message = error.message;
    }
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
