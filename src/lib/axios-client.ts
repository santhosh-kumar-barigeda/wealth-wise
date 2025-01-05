import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig } from 'axios';

// Define the base URL for the API, using an environment variable.
const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

// Create a configuration object for Axios requests.
const config: AxiosRequestConfig = {
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create an Axios instance with the given configuration.
export const axiosInstance: AxiosInstance = axios.create(config);

// Interceptor for outgoing requests.
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor for incoming responses.
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
