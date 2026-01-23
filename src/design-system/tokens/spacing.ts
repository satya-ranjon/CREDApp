/**
 * Spacing System
 * 
 * Design Philosophy:
 * - 4px base unit for pixel-perfect alignment
 * - Consistent spacing creates visual rhythm
 * - Use semantic names when possible (e.g., cardPadding)
 * 
 * Usage:
 * import { spacing } from '@/design-system/tokens/spacing';
 * <View style={{ padding: spacing.md, marginBottom: spacing.lg }} />
 */

/**
 * Base spacing scale (4px increments)
 * This is the foundation - use these for fine control
 */
export const spacing = {
  /** 0px */
  none: 0,
  /** 2px - Minimal spacing */
  '2xs': 2,
  /** 4px - Tight spacing */
  xs: 4,
  /** 8px - Default small spacing */
  sm: 8,
  /** 12px - Between small and medium */
  md: 12,
  /** 16px - Default medium spacing */
  lg: 16,
  /** 20px - Comfortable spacing */
  xl: 20,
  /** 24px - Section spacing */
  '2xl': 24,
  /** 32px - Large section gaps */
  '3xl': 32,
  /** 40px - Major section breaks */
  '4xl': 40,
  /** 48px - Hero spacing */
  '5xl': 48,
  /** 64px - Maximum spacing */
  '6xl': 64,
} as const;

/**
 * Semantic spacing tokens
 * Use these for specific UI contexts
 */
export const semanticSpacing = {
  // Screen level
  screenPadding: spacing.lg,          // 16px - Standard screen horizontal padding
  screenPaddingLarge: spacing['2xl'], // 24px - Generous screen padding

  // Card level
  cardPadding: spacing.lg,            // 16px - Internal card padding
  cardPaddingLarge: spacing.xl,       // 20px - Larger card padding
  cardMargin: spacing.md,             // 12px - Space between cards
  cardBorderRadius: spacing.md,       // 12px - Card corner radius

  // List items
  listItemPadding: spacing.lg,        // 16px - Horizontal list item padding
  listItemVertical: spacing.md,       // 12px - Vertical list item padding
  listItemGap: spacing.sm,            // 8px - Gap between list items

  // Buttons
  buttonPaddingHorizontal: spacing['2xl'], // 24px
  buttonPaddingVertical: spacing.md,       // 12px
  buttonBorderRadius: spacing.sm,          // 8px

  // Inputs
  inputPadding: spacing.lg,           // 16px
  inputBorderRadius: spacing.sm,      // 8px

  // Icons
  iconSize: {
    sm: spacing.lg,    // 16px
    md: spacing['2xl'], // 24px
    lg: spacing['3xl'], // 32px
  },

  // Bottom navigation
  bottomTabHeight: 56,
  bottomTabIconSize: spacing['2xl'],  // 24px

  // Header
  headerHeight: 56,
  statusBarHeight: 44,  // Will be overridden by SafeAreaView
} as const;

/**
 * Border radius presets
 */
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const;

export type Spacing = typeof spacing;
export type SemanticSpacing = typeof semanticSpacing;
export type BorderRadius = typeof borderRadius;
