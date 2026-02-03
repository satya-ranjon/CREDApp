/**
 * Empty State Component
 * 
 * Displayed when a list or screen has no data.
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text, Button,  } from '@/design-system';

interface EmptyStateProps {
  icon?: string;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export function EmptyState({
  icon = '📭',
  title,
  message,
  actionLabel,
  onAction,
  style,
}: EmptyStateProps) {

  return (
    <View style={[styles.container, style]}>
      <Text variant="display.large" style={styles.icon}>
        {icon}
      </Text>
      <Text variant="heading.h3" center style={styles.title}>
        {title}
      </Text>
      {message && (
        <Text variant="body.regular" color="secondary" center style={styles.message}>
          {message}
        </Text>
      )}
      {actionLabel && onAction && (
        <Button onPress={onAction} variant="primary" style={styles.button}>
          {actionLabel}
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
  message: {
    marginBottom: 24,
    maxWidth: 280,
  },
  button: {
    minWidth: 160,
  },
});
