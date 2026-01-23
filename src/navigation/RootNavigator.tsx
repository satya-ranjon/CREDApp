/**
 * Root Navigator
 * 
 * Top-level navigator that manages:
 * - Splash screen
 * - Auth flow (when not authenticated)
 * - Main app (when authenticated)
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { RootStackParamList } from './navigationTypes';
import { useTheme } from '@/design-system';
import { SplashScreen } from '@/features/splash/screens/SplashScreen';
import { useIsAuthenticated, useIsAppReady } from '@/store';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { theme } = useTheme();
  const isAuthenticated = useIsAuthenticated();
  const isAppReady = useIsAppReady();

  // Navigation theme to match our app theme
  const navigationTheme = {
    dark: theme.dark,
    colors: {
      primary: theme.colors.interactive.secondary,
      background: theme.colors.background.primary,
      card: theme.colors.background.secondary,
      text: theme.colors.text.primary,
      border: theme.colors.border.default,
      notification: theme.colors.status.error,
    },
    fonts: {
      regular: {
        fontFamily: 'System',
        fontWeight: '400' as const,
      },
      medium: {
        fontFamily: 'System',
        fontWeight: '500' as const,
      },
      bold: {
        fontFamily: 'System',
        fontWeight: '700' as const,
      },
      heavy: {
        fontFamily: 'System',
        fontWeight: '900' as const,
      },
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        {!isAppReady ? (
          // Show splash while app initializes
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : !isAuthenticated ? (
          // Show auth flow when not logged in
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          // Show main app when logged in
          <Stack.Screen name="Main" component={MainNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
