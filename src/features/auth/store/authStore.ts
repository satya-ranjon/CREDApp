/**
 * Auth Store (Zustand)
 * 
 * Manages authentication state:
 * - Token storage
 * - User data
 * - Login/Logout actions
 */

import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthResponse } from '../types/auth.types';
import { useAppStore } from '@/store';

interface AuthStore {
  token: string | null;
  refreshToken: string | null;
  user: AuthResponse['user'] | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setToken: (token: string, refreshToken: string) => void;
  setUser: (user: AuthResponse['user']) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (response: AuthResponse) => void;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        refreshToken: null,
        user: null,
        isLoading: false,
        error: null,

        setToken: (token, refreshToken) => set({ token, refreshToken }),
        
        setUser: (user) => set({ user }),
        
        setLoading: (isLoading) => set({ isLoading }),
        
        setError: (error) => set({ error }),
        
        clearError: () => set({ error: null }),

        login: (response) => {
          set({
            token: response.token,
            refreshToken: response.refreshToken,
            user: response.user,
            error: null,
          });
          // Update global auth state
          useAppStore.getState().setAuthenticated(true);
        },

        logout: () => {
          set({
            token: null,
            refreshToken: null,
            user: null,
            error: null,
          });
          // Update global auth state
          useAppStore.getState().setAuthenticated(false);
        },
      }),
      {
        name: 'credapp-auth',
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (state) => ({
          token: state.token,
          refreshToken: state.refreshToken,
          user: state.user,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
);

// Selector hooks
export const useAuthToken = () => useAuthStore((state) => state.token);
export const useAuthUser = () => useAuthStore((state) => state.user);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);
