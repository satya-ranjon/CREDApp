/**
 * Splash Screen
 * 
 * Initial loading screen shown while app initializes.
 * Handles:
 * - Loading stored auth state
 * - Checking token validity
 * - Initial data fetching
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Text, useTheme } from '@/design-system';
import { useAppStore } from '@/store';

export function SplashScreen() {
  const { theme } = useTheme();
  const { setAppReady, setAuthenticated } = useAppStore();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simulate initialization tasks:
        // - Load stored credentials
        // - Validate token
        // - Fetch initial data
        await new Promise(resolve => setTimeout(resolve, 2000));

        // For demo purposes, we'll start as not authenticated
        // In a real app, you'd check for stored token here
        setAuthenticated(true);
        setAppReady(true);
      } catch (error) {
        console.error('App initialization failed:', error);
        setAppReady(true);
      }
    };

    initializeApp();
  }, [setAppReady, setAuthenticated]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background.primary} />
      
      <View style={styles.logoContainer}>
        <Text variant="display.large" color="accent" style={styles.logo}>
          CRED
        </Text>
        <Text variant="body.regular" color="secondary" style={styles.tagline}>
          Your credit score companion
        </Text>
      </View>

      <View style={styles.loadingContainer}>
        <View style={[styles.loadingDot, { backgroundColor: theme.colors.interactive.secondary }]} />
        <View style={[styles.loadingDot, styles.loadingDotMiddle, { backgroundColor: theme.colors.interactive.secondary }]} />
        <View style={[styles.loadingDot, { backgroundColor: theme.colors.interactive.secondary }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    letterSpacing: 8,
  },
  tagline: {
    marginTop: 8,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0.5,
  },
  loadingDotMiddle: {
    marginHorizontal: 8,
    opacity: 1,
  },
});
