/**
 * Screen Layout Component
 * 
 * Standard screen wrapper with safe area handling.
 */

import React, { ReactNode, useMemo } from 'react';
import { View, StyleSheet, ViewStyle, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/design-system';

interface ScreenLayoutProps {
  children: ReactNode;
  /** Apply safe area padding at top */
  safeTop?: boolean;
  /** Apply safe area padding at bottom */
  safeBottom?: boolean;
  /** Custom background color */
  backgroundColor?: string;
  /** Additional container styles */
  style?: ViewStyle;
}

export function ScreenLayout({
  children,
  safeTop = true,
  safeBottom = false,
  backgroundColor,
  style,
}: ScreenLayoutProps) {
  const { theme, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const bgColor = backgroundColor || theme.colors.background.primary;

  const containerStyle = useMemo(
    () => [
      styles.container,
      {
        backgroundColor: bgColor,
        paddingTop: safeTop ? insets.top : 0,
        paddingBottom: safeBottom ? insets.bottom : 0,
      },
      style,
    ],
    [bgColor, safeTop, safeBottom, insets.top, insets.bottom, style]
  );

  return (
    <View style={containerStyle}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={bgColor}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
