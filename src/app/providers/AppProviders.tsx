/**
 * App Providers
 * 
 * Wraps the app with all necessary providers.
 * Order matters - providers at the top are available to providers below.
 * 
 * Usage:
 * // In App.tsx
 * <AppProviders>
 *   <RootNavigator />
 * </AppProviders>
 */

import React, { ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@/design-system';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * AppProviders component
 * 
 * Centralizes all providers for cleaner App.tsx.
 * Add new providers here as needed (e.g., QueryClientProvider for React Query)
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <SafeAreaProvider>
      <ThemeProvider initialMode="dark">
        {children}
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
