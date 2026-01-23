/**
 * Button Component
 * 
 * A premium-styled button component with multiple variants.
 * Follows CRED's design language with subtle animations.
 * 
 * Usage:
 * <Button onPress={handlePress}>Continue</Button>
 * <Button variant="secondary" size="sm">Cancel</Button>
 * <Button variant="ghost" loading>Processing...</Button>
 */

import React, { memo, useCallback } from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import { useTheme } from '../../theme';
import { Text } from '../Text';

/**
 * Button variants
 */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';

/**
 * Button sizes
 */
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  /** Button visual variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Show loading spinner */
  loading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Left icon component */
  leftIcon?: React.ReactNode;
  /** Right icon component */
  rightIcon?: React.ReactNode;
  /** Button label */
  children: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

/**
 * Button Component
 */
export const Button = memo(function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  style,
  onPress,
  ...rest
}: ButtonProps) {
  const { theme } = useTheme();

  // Prevent double taps
  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      if (!loading && !disabled && onPress) {
        onPress(e);
      }
    },
    [loading, disabled, onPress]
  );

  // Get variant styles
  const getVariantStyles = (): { container: ViewStyle; text: TextStyle } => {
    const baseContainer: ViewStyle = {
      borderRadius: theme.borderRadius.lg,
    };

    switch (variant) {
      case 'primary':
        return {
          container: {
            ...baseContainer,
            backgroundColor: theme.colors.interactive.secondary, // Gold
          },
          text: {
            color: theme.palette.black[900],
          },
        };

      case 'secondary':
        return {
          container: {
            ...baseContainer,
            backgroundColor: theme.colors.background.tertiary,
          },
          text: {
            color: theme.colors.text.primary,
          },
        };

      case 'ghost':
        return {
          container: {
            ...baseContainer,
            backgroundColor: 'transparent',
          },
          text: {
            color: theme.colors.interactive.secondary,
          },
        };

      case 'outline':
        return {
          container: {
            ...baseContainer,
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: theme.colors.border.default,
          },
          text: {
            color: theme.colors.text.primary,
          },
        };

      case 'danger':
        return {
          container: {
            ...baseContainer,
            backgroundColor: theme.colors.status.error,
          },
          text: {
            color: theme.colors.text.primary,
          },
        };

      default:
        return {
          container: baseContainer,
          text: {},
        };
    }
  };

  // Get size styles
  const getSizeStyles = (): { container: ViewStyle; text: TextStyle } => {
    switch (size) {
      case 'sm':
        return {
          container: {
            paddingVertical: theme.spacing.sm,
            paddingHorizontal: theme.spacing.lg,
            minHeight: 36,
          },
          text: {
            fontSize: theme.typography.label.regular.fontSize,
          },
        };

      case 'lg':
        return {
          container: {
            paddingVertical: theme.spacing.lg,
            paddingHorizontal: theme.spacing['2xl'],
            minHeight: 56,
          },
          text: {
            fontSize: theme.typography.body.large.fontSize,
          },
        };

      case 'md':
      default:
        return {
          container: {
            paddingVertical: theme.spacing.md,
            paddingHorizontal: theme.spacing.xl,
            minHeight: 48,
          },
          text: {
            fontSize: theme.typography.label.large.fontSize,
          },
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const containerStyles: ViewStyle = {
    ...styles.container,
    ...variantStyles.container,
    ...sizeStyles.container,
    ...(fullWidth && styles.fullWidth),
    ...(disabled && styles.disabled),
    ...style,
  };

  const textStyles: TextStyle = {
    ...styles.text,
    ...variantStyles.text,
    ...sizeStyles.text,
  };

  const spinnerColor =
    variant === 'primary'
      ? theme.palette.black[900]
      : theme.colors.text.primary;

  return (
    <TouchableOpacity
      style={containerStyles}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={spinnerColor} />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <Text
            variant="label.large"
            style={textStyles}
          >
            {children}
          </Text>
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
