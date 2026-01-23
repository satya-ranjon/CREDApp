/**
 * Loading Component
 * 
 * A themed loading indicator.
 * 
 * Usage:
 * <Loading />
 * <Loading size="large" fullScreen />
 */

import React, { memo } from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { Text } from '../Text';

export interface LoadingProps {
  /** Spinner size */
  size?: 'small' | 'large';
  /** Fill entire screen with overlay */
  fullScreen?: boolean;
  /** Loading message */
  message?: string;
  /** Container style */
  style?: ViewStyle;
}

export const Loading = memo(function Loading({
  size = 'large',
  fullScreen = false,
  message,
  style,
}: LoadingProps) {
  const { theme } = useTheme();

  const containerStyles: ViewStyle = {
    ...styles.container,
    ...(fullScreen && {
      ...styles.fullScreen,
      backgroundColor: theme.colors.background.primary,
    }),
    ...style,
  };

  return (
    <View style={containerStyles}>
      <ActivityIndicator
        size={size}
        color={theme.colors.interactive.secondary}
      />
      {message && (
        <Text variant="body.regular" color="secondary" style={styles.message}>
          {message}
        </Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  message: {
    marginTop: 12,
  },
});
