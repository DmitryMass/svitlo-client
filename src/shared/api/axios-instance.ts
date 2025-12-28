import axios, { AxiosError, type AxiosResponse } from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

export class RateLimitError extends Error {
  constructor(message: string = 'Перевищено ліміт запитів') {
    super(message);
    this.name = 'RateLimitError';
  }
}

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (import.meta.env.MODE === 'development') {
      console.error('Axios Instance Error:', error.message);
    }

    // Обработка ошибки 429 (Too Many Requests)
    if (error.response?.status === 429) {
      return Promise.reject(
        new RateLimitError(
          'Ви перевищили ліміт запитів (50 на хвилину). Спробуйте через хвилину.',
        ),
      );
    }

    return Promise.reject(error);
  },
);
