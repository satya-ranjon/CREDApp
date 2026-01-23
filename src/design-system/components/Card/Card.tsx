/**
 * Card Component
 * 
 * A themed card container for content.
 * Used for credit score cards, reward items, etc.
 * 
 * Usage:
 * <Card>
 *   <Text>Content here</Text>
 * </Card>
 * <Card variant="elevated" padding="lg">Premium content</Card>
 */

import React, { memo } from 'react';
import { View, ViewProps, ViewStyle, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../../theme';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'flat';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends Omit<ViewProps, 'style'> {
  /** Card visual variant */
  variant?: CardVariant;
  /** Internal padding */
  padding?: CardPadding;
  /** Make card pressable */
  onPress?: () => void;
  /** Children */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export const Card = memo(function Card({
  variant = 'default',
  padding = 'md',
  onPress,
  children,
  style,
  ...rest
}: CardProps) {
  const { theme } = useTheme();

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: theme.colors.background.tertiary,
          ...theme.shadows.md,
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.colors.border.default,
        };
      case 'flat':
        return {
          backgroundColor: theme.colors.background.secondary,
        };
      case 'default':
      default:
        return {
          backgroundColor: theme.colors.background.secondary,
          ...theme.shadows.sm,
        };
    }
  };

  const getPaddingValue = (): number => {
    switch (padding) {
      case 'none':
        return 0;
      case 'sm':
        return theme.spacing.sm;
      case 'lg':
        return theme.spacing.xl;
      case 'md':
      default:
        return theme.spacing.lg;
    }
  };

  const cardStyles: ViewStyle = {
    ...styles.base,
    ...getVariantStyles(),
    padding: getPaddingValue(),
    borderRadius: theme.borderRadius.lg,
    ...style,
  };

  if (onPress) {
    return (
      <Pressable
        style={({ pressed }) => [
          cardStyles,
          pressed && styles.pressed,
        ]}
        onPress={onPress}
        {...rest}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={cardStyles} {...rest}>
      {children}
    </View>
  );
});

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});
