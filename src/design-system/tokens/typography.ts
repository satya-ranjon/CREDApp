/**
 * Typography System
 * 
 * Design Philosophy:
 * - Use a type scale that creates clear hierarchy
 * - Font weights create emphasis without changing size
 * - Line heights optimized for readability on mobile
 * 
 * Usage:
 * import { typography, fontFamily } from '@/design-system/tokens/typography';
 * <Text style={typography.heading.h1}>Title</Text>
 */

import { Platform, TextStyle } from 'react-native';

/**
 * Font families
 * 
 * CRED uses custom fonts, but we'll use system fonts for now.
 * To add custom fonts later:
 * 1. Add font files to assets/fonts/
 * 2. Link fonts using react-native.config.js
 * 3. Update these values
 */
export const fontFamily = {
  // System fonts for cross-platform consistency
  regular: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  medium: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
    default: 'System',
  }),
  semiBold: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium', // Android doesn't have semibold, use medium
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'System',
    android: 'Roboto-Bold',
    default: 'System',
  }),
} as const;

/**
 * Font sizes following a modular scale (1.25 ratio)
 * Base size: 16px
 */
export const fontSize = {
  xs: 11,      // Caption, labels
  sm: 13,      // Small body text
  base: 15,    // Default body text
  md: 16,      // Slightly emphasized
  lg: 18,      // Subheadings
  xl: 20,      // Section titles
  '2xl': 24,   // Page titles
  '3xl': 28,   // Hero text
  '4xl': 32,   // Large display
  '5xl': 40,   // Extra large display
} as const;

/**
 * Font weights
 */
export const fontWeight = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semiBold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
} as const;

/**
 * Line heights (multipliers of font size)
 */
export const lineHeight = {
  tight: 1.2,    // Headings
  normal: 1.5,   // Body text
  relaxed: 1.75, // Large blocks of text
} as const;

/**
 * Letter spacing
 */
export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
} as const;

/**
 * Pre-composed typography styles
 * Use these directly in components for consistency
 */
export const typography = {
  // Display styles - for hero sections
  display: {
    large: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize['5xl'],
      fontWeight: fontWeight.bold,
      lineHeight: fontSize['5xl'] * lineHeight.tight,
      letterSpacing: letterSpacing.tight,
    } as TextStyle,
    medium: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize['4xl'],
      fontWeight: fontWeight.bold,
      lineHeight: fontSize['4xl'] * lineHeight.tight,
      letterSpacing: letterSpacing.tight,
    } as TextStyle,
  },

  // Heading styles
  heading: {
    h1: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize['3xl'],
      fontWeight: fontWeight.bold,
      lineHeight: fontSize['3xl'] * lineHeight.tight,
    } as TextStyle,
    h2: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize['2xl'],
      fontWeight: fontWeight.semiBold,
      lineHeight: fontSize['2xl'] * lineHeight.tight,
    } as TextStyle,
    h3: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.xl,
      fontWeight: fontWeight.semiBold,
      lineHeight: fontSize.xl * lineHeight.tight,
    } as TextStyle,
    h4: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.lg,
      fontWeight: fontWeight.medium,
      lineHeight: fontSize.lg * lineHeight.normal,
    } as TextStyle,
  },

  // Body styles
  body: {
    large: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.md,
      fontWeight: fontWeight.regular,
      lineHeight: fontSize.md * lineHeight.normal,
    } as TextStyle,
    regular: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.base,
      fontWeight: fontWeight.regular,
      lineHeight: fontSize.base * lineHeight.normal,
    } as TextStyle,
    small: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.regular,
      lineHeight: fontSize.sm * lineHeight.normal,
    } as TextStyle,
  },

  // UI element styles
  label: {
    large: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.base,
      fontWeight: fontWeight.medium,
      lineHeight: fontSize.base * lineHeight.tight,
      letterSpacing: letterSpacing.wide,
    } as TextStyle,
    regular: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.medium,
      lineHeight: fontSize.sm * lineHeight.tight,
      letterSpacing: letterSpacing.wide,
    } as TextStyle,
    small: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.xs,
      fontWeight: fontWeight.medium,
      lineHeight: fontSize.xs * lineHeight.tight,
      letterSpacing: letterSpacing.wider,
      textTransform: 'uppercase',
    } as TextStyle,
  },

  // Caption and helper text
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.xs * lineHeight.normal,
  } as TextStyle,
} as const;

export type Typography = typeof typography;
export type FontSize = typeof fontSize;
