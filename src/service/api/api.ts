import axios, { HttpStatusCode } from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const configureApiInterceptors = (dispatch: (action: any) => void) => {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === HttpStatusCode.Unauthorized) {
        localStorage.removeItem('token');
        dispatch({ type: 'auth/logout' });
        window.location.href = '/signin';
      }
      return Promise.reject(error);
    }
  );
};

export default api;