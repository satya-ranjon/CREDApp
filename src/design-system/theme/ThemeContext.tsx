/**
 * Theme Context
 * 
 * Provides theme values and toggle functionality throughout the app.
 * Uses React Context for efficient updates.
 * 
 * Usage:
 * // In App.tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * 
 * // In any component
 * const { theme, toggleTheme, isDark } = useTheme();
 */

import React, { createContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { Theme, darkTheme, lightTheme } from './themes';

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (mode: 'light' | 'dark' | 'system') => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  /** Initial theme mode. Defaults to 'system' */
  initialMode?: 'light' | 'dark' | 'system';
}

/**
 * ThemeProvider
 * 
 * Wraps the app and provides theme context to all children.
 * Respects system preference by default but can be overridden.
 */
export function ThemeProvider({ 
  children, 
  initialMode = 'dark', // CRED defaults to dark
}: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<'light' | 'dark' | 'system'>(initialMode);

  // Determine actual theme based on mode
  const isDark = useMemo(() => {
    if (mode === 'system') {
      return systemColorScheme === 'dark';
    }
    return mode === 'dark';
  }, [mode, systemColorScheme]);

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  const toggleTheme = useCallback(() => {
    setMode(prev => {
      if (prev === 'dark') return 'light';
      if (prev === 'light') return 'dark';
      // If system, toggle to opposite of current system preference
      return systemColorScheme === 'dark' ? 'light' : 'dark';
    });
  }, [systemColorScheme]);

  const handleSetTheme = useCallback((newMode: 'light' | 'dark' | 'system') => {
    setMode(newMode);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      isDark,
      toggleTheme,
      setTheme: handleSetTheme,
    }),
    [theme, isDark, toggleTheme, handleSetTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
