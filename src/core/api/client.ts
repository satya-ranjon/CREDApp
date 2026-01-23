/**
 * API Client
 * 
 * Centralized Axios instance with interceptors for:
 * - Auth token injection
 * - Request/response logging (dev only)
 * - Error handling
 * - Response transformation
 * 
 * Usage:
 * import { apiClient } from '@/core/api';
 * const response = await apiClient.get('/users/me');
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { env } from '../config/env';

/**
 * Create the base Axios instance
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: env.apiUrl,
  timeout: env.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Request interceptor
 * - Add auth token to requests
 * - Log requests in development
 */
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // TODO: Get token from auth store once implemented
    // const token = authStore.getState().token;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    if (env.isDev) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * - Transform responses
 * - Handle common errors
 * - Refresh token on 401 (TODO)
 */
apiClient.interceptors.response.use(
  (response) => {
    if (env.isDev) {
      console.log(`[API] Response ${response.status}:`, response.data);
    }
    return response;
  },
  async (error: AxiosError) => {
    if (env.isDev) {
      console.error(`[API] Error:`, error.response?.data || error.message);
    }

    // Handle 401 Unauthorized - token expired
    if (error.response?.status === 401) {
      // TODO: Attempt token refresh or redirect to login
      // await authStore.getState().logout();
    }

    return Promise.reject(error);
  }
);

/**
 * Generic API error type
 */
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, unknown>;
}

/**
 * Extract a user-friendly error message from an Axios error
 */
export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    // Server responded with an error
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    // Network error
    if (error.message === 'Network Error') {
      return 'Unable to connect to the server. Please check your internet connection.';
    }
    // Timeout
    if (error.code === 'ECONNABORTED') {
      return 'Request timed out. Please try again.';
    }
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred.';
}
