/**
 * App Store (Zustand)
 * 
 * Global application state using Zustand.
 * 
 * Why Zustand over Redux:
 * - Minimal boilerplate (no actions, reducers, action creators)
 * - Simple API with hooks
 * - Built-in devtools support
 * - ~1KB bundle size vs ~10KB for Redux
 * - TypeScript-first design
 * 
 * Usage:
 * const { isLoading, setLoading } = useAppStore();
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { STORAGE_KEYS } from '@/core/config/constants';

/**
 * App-wide state interface
 */
interface AppState {
  // Loading states
  isAppReady: boolean;
  isLoading: boolean;

  // User session
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;

  // Actions
  setAppReady: (ready: boolean) => void;
  setLoading: (loading: boolean) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setOnboardingComplete: (complete: boolean) => void;
  reset: () => void;
}

/**
 * Initial state
 */
const initialState = {
  isAppReady: false,
  isLoading: false,
  isAuthenticated: false,
  hasCompletedOnboarding: false,
};

/**
 * App Store
 * 
 * Uses:
 * - devtools: For debugging with React Native Debugger
 * - persist: To persist state to AsyncStorage
 */
export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setAppReady: (ready) => set({ isAppReady: ready }),
        
        setLoading: (loading) => set({ isLoading: loading }),
        
        setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
        
        setOnboardingComplete: (complete) => set({ hasCompletedOnboarding: complete }),

        reset: () => set(initialState),
      }),
      {
        name: STORAGE_KEYS.APP_STORE,
        storage: createJSONStorage(() => AsyncStorage),
        // Only persist these fields
        partialize: (state) => ({
          hasCompletedOnboarding: state.hasCompletedOnboarding,
        }),
      }
    ),
    { name: 'AppStore' }
  )
);

/**
 * Selector hooks for performance
 * Use these instead of destructuring from useAppStore
 * to prevent unnecessary re-renders
 */
export const useIsLoading = () => useAppStore((state) => state.isLoading);
export const useIsAuthenticated = () => useAppStore((state) => state.isAuthenticated);
export const useIsAppReady = () => useAppStore((state) => state.isAppReady);
