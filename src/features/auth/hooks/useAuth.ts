/**
 * useAuth Hook
 * 
 * Custom hook that provides authentication functionality.
 * Combines store access with service calls.
 */

import { useCallback } from 'react';
import * as authService from '../services/authService';
import { useAuthStore } from '../store/authStore';
import type { LoginCredentials, RegisterCredentials } from '../types/auth.types';

export function useAuth() {
  const {
    token,
    user,
    isLoading,
    error,
    login: storeLogin,
    logout: storeLogout,
    setLoading,
    setError,
    clearError,
  } = useAuthStore();

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await authService.loginUser(credentials);
      storeLogin(response);
      
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [storeLogin, setLoading, setError, clearError]);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await authService.registerUser(credentials);
      storeLogin(response);
      
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [storeLogin, setLoading, setError, clearError]);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await authService.logoutUser();
      storeLogout();
    } catch {
      // Still logout locally even if API call fails
      storeLogout();
    } finally {
      setLoading(false);
    }
  }, [storeLogout, setLoading]);

  return {
    // State
    token,
    user,
    isLoading,
    error,
    isAuthenticated: !!token,

    // Actions
    login,
    register,
    logout,
    clearError,
  };
}
