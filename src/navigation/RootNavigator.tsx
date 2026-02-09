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
import { AddCardScreen } from '@/features/cards/screens/AddCardScreen';
import { AllActivityScreen } from '@/features/cards/screens/AllActivityScreen';
import { AllTransactionsScreen } from '@/features/home/screens/AllTransactionsScreen';
import { AppearanceScreen } from '@/features/profile/screens/AppearanceScreen';
import { EditProfileScreen } from '@/features/profile/screens/EditProfileScreen';
import { LinkedCardsScreen } from '@/features/profile/screens/LinkedCardsScreen';
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
          <>
            <Stack.Screen name="Main" component={MainNavigator} />
            <Stack.Screen
              name="AddCard"
              component={AddCardScreen}
              options={{
                presentation: 'modal',
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen
              name="AllTransactions"
              component={AllTransactionsScreen}
              options={{
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="AllActivity"
              component={AllActivityScreen}
              options={{
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="LinkedCards"
              component={LinkedCardsScreen}
              options={{
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="Appearance"
              component={AppearanceScreen}
              options={{
                animation: 'slide_from_right',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
