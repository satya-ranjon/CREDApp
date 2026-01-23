/**
 * Text Component
 * 
 * A themed text component that uses our typography system.
 * Replaces React Native's Text for consistent styling.
 * 
 * Usage:
 * <Text variant="heading.h1">Welcome</Text>
 * <Text variant="body.regular" color="secondary">Description</Text>
 */

import React, { memo } from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../theme';
import { typography as typographyTokens } from '../../tokens';

/**
 * Available text variants matching our typography system
 */
type TypographyVariant =
  | 'display.large'
  | 'display.medium'
  | 'heading.h1'
  | 'heading.h2'
  | 'heading.h3'
  | 'heading.h4'
  | 'body.large'
  | 'body.regular'
  | 'body.small'
  | 'label.large'
  | 'label.regular'
  | 'label.small'
  | 'caption';

/**
 * Color variants for text
 */
type TextColor = 
  | 'primary' 
  | 'secondary' 
  | 'tertiary' 
  | 'inverse' 
  | 'accent'
  | 'success'
  | 'error'
  | 'warning';

export interface TextProps extends Omit<RNTextProps, 'style'> {
  /** Typography variant from our design system */
  variant?: TypographyVariant;
  /** Text color variant */
  color?: TextColor;
  /** Center the text */
  center?: boolean;
  /** Additional styles */
  style?: TextStyle | TextStyle[];
  /** Children */
  children: React.ReactNode;
}

/**
 * Get typography style from variant string
 * e.g., 'heading.h1' -> typography.heading.h1
 */
function getTypographyStyle(variant: TypographyVariant): TextStyle {
  const [category, type] = variant.split('.') as [
    keyof typeof typographyTokens,
    string | undefined
  ];

  if (type && category !== 'caption') {
    const categoryStyles = typographyTokens[category] as Record<string, TextStyle>;
    return categoryStyles[type] || typographyTokens.body.regular;
  }

  if (category === 'caption') {
    return typographyTokens.caption;
  }

  return typographyTokens.body.regular;
}

/**
 * Text Component
 * 
 * Memoized for performance - only re-renders when props change.
 */
export const Text = memo(function Text({
  variant = 'body.regular',
  color = 'primary',
  center = false,
  style,
  children,
  ...rest
}: TextProps) {
  const { theme } = useTheme();

  // Get the typography style for this variant
  const typographyStyle = getTypographyStyle(variant);

  // Get the color based on color prop
  const textColor = (() => {
    switch (color) {
      case 'primary':
        return theme.colors.text.primary;
      case 'secondary':
        return theme.colors.text.secondary;
      case 'tertiary':
        return theme.colors.text.tertiary;
      case 'inverse':
        return theme.colors.text.inverse;
      case 'accent':
        return theme.colors.text.accent;
      case 'success':
        return theme.colors.status.success;
      case 'error':
        return theme.colors.status.error;
      case 'warning':
        return theme.colors.status.warning;
      default:
        return theme.colors.text.primary;
    }
  })();

  const textStyles = StyleSheet.flatten([
    typographyStyle,
    { color: textColor },
    center && styles.center,
    style,
  ]);

  return (
    <RNText style={textStyles} {...rest}>
      {children}
    </RNText>
  );
});

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
});
