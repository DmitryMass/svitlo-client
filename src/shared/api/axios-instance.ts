import axios, { AxiosError, type AxiosResponse } from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (import.meta.env.MODE === 'development') {
      console.error('Axios Instance Error:', error.message);
    }
    return Promise.reject(error);
  },
);
