/**
 * Auth Service
 * 
 * API calls for authentication.
 * Uses mock responses for development.
 */

// TODO: Uncomment when replacing mock implementations with real API calls
// import { apiClient, endpoints, getApiErrorMessage } from '@/core/api';
import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth.types';

/**
 * Mock delay to simulate network latency
 */
const mockDelay = (ms: number) => new Promise<void>(resolve => setTimeout(() => resolve(), ms));

/**
 * Mock user for development
 */
const mockUser: AuthResponse = {
  token: 'mock-jwt-token-12345',
  refreshToken: 'mock-refresh-token-67890',
  user: {
    id: 'user-001',
    name: 'Satya Ranjan',
    email: 'satya@example.com',
  },
};

/**
 * Login user
 */
export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  // TODO: Replace with actual API call
  // const response = await apiClient.post<AuthResponse>(endpoints.auth.login, credentials);
  // return response.data;

  // Mock implementation
  await mockDelay(1500);

  // Simulate validation
  if (!credentials.email || !credentials.password) {
    throw new Error('Email and password are required');
  }

  if (credentials.password.length < 6) {
    throw new Error('Invalid credentials');
  }

  // Return mock response
  return {
    ...mockUser,
    user: {
      ...mockUser.user,
      email: credentials.email,
    },
  };
}

/**
 * Register new user
 */
export async function registerUser(credentials: RegisterCredentials): Promise<AuthResponse> {
  // TODO: Replace with actual API call
  // const response = await apiClient.post<AuthResponse>(endpoints.auth.register, credentials);
  // return response.data;

  // Mock implementation
  await mockDelay(1500);

  // Simulate validation
  if (!credentials.email || !credentials.password || !credentials.name) {
    throw new Error('All fields are required');
  }

  if (credentials.password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  // Return mock response
  return {
    ...mockUser,
    user: {
      ...mockUser.user,
      name: credentials.name,
      email: credentials.email,
    },
  };
}

/**
 * Logout user
 */
export async function logoutUser(): Promise<void> {
  // TODO: Replace with actual API call
  // await apiClient.post(endpoints.auth.logout);

  // Mock implementation
  await mockDelay(500);
}

/**
 * Refresh auth token
 */
export async function refreshToken(_refreshTokenValue: string): Promise<{ token: string }> {
  // TODO: Replace with actual API call
  // const response = await apiClient.post(endpoints.auth.refreshToken, { refreshToken: _refreshTokenValue });
  // return response.data;

  // Mock implementation
  await mockDelay(500);
  return { token: 'new-mock-jwt-token-' + Date.now() };
}
