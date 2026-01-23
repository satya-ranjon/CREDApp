/**
 * Shadow System
 * 
 * Design Philosophy:
 * - Subtle shadows for depth on dark backgrounds
 * - Elevation-based naming (similar to Material Design)
 * - Platform-specific shadow implementations
 * 
 * Usage:
 * import { shadows } from '@/design-system/tokens/shadows';
 * <View style={shadows.md} />
 */

import { Platform, ViewStyle } from 'react-native';

type ShadowStyle = Pick<
  ViewStyle,
  'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'elevation'
>;

/**
 * Create cross-platform shadow
 * iOS uses shadow* properties, Android uses elevation
 */
const createShadow = (
  elevation: number,
  shadowOpacity: number = 0.3,
): ShadowStyle => ({
  ...Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: elevation / 2,
      },
      shadowOpacity,
      shadowRadius: elevation,
    },
    android: {
      elevation,
    },
  }),
});

/**
 * Pre-defined shadow presets
 * Named by elevation level for intuitive usage
 */
export const shadows = {
  /** No shadow */
  none: {} as ShadowStyle,

  /** Subtle shadow for cards */
  sm: createShadow(2, 0.1),

  /** Default shadow for elevated elements */
  md: createShadow(4, 0.15),

  /** Pronounced shadow for modals, dropdowns */
  lg: createShadow(8, 0.2),

  /** Strong shadow for floating elements */
  xl: createShadow(12, 0.25),

  /** Maximum elevation for overlays */
  '2xl': createShadow(24, 0.3),
} as const;

/**
 * Glow effects for premium UI elements
 * Used for credit score cards, achievement badges, etc.
 */
export const glows = {
  gold: Platform.select({
    ios: {
      shadowColor: '#D4AF37',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 12,
    },
    android: {
      // Android doesn't support colored shadows natively
      // Consider using a library like react-native-shadow-2
      elevation: 8,
    },
  }) as ShadowStyle,

  success: Platform.select({
    ios: {
      shadowColor: '#4CAF50',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
    },
    android: {
      elevation: 6,
    },
  }) as ShadowStyle,

  silver: Platform.select({
    ios: {
      shadowColor: '#C0C0C0',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
    },
  }) as ShadowStyle,
} as const;

export type Shadows = typeof shadows;
export type Glows = typeof glows;
