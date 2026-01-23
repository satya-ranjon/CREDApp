/**
 * CRED-Inspired Color Palette
 * 
 * Design Philosophy:
 * - CRED uses a premium dark theme with subtle gradients
 * - Primary accent colors are silver/platinum for premium feel
 * - Success/Error colors are muted to maintain elegance
 * 
 * Usage:
 * import { colors } from '@/design-system/tokens/colors';
 * <View style={{ backgroundColor: colors.background.primary }} />
 */

export const palette = {
  // Base blacks - CRED signature dark theme
  black: {
    900: '#0A0A0A', // Deepest black
    800: '#121212', // Primary background
    700: '#1A1A1A', // Card backgrounds
    600: '#242424', // Elevated surfaces
    500: '#2E2E2E', // Borders, dividers
    400: '#383838', // Disabled states
  },

  // Silvers & Grays - Premium accents
  silver: {
    100: '#FFFFFF',
    200: '#F5F5F5',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
  },

  // Primary accent - CRED's signature color
  primary: {
    light: '#C0C0C0',   // Silver
    main: '#A8A8A8',    // Platinum
    dark: '#808080',    // Darker silver
  },

  // Secondary accent - For CTAs and highlights
  accent: {
    gold: '#D4AF37',      // Premium gold
    goldLight: '#F5E6B3', // Light gold for text
    bronze: '#CD7F32',    // Alternative accent
  },

  // Semantic colors - Muted for elegance
  semantic: {
    success: '#4CAF50',
    successMuted: '#2E7D32',
    error: '#EF5350',
    errorMuted: '#C62828',
    warning: '#FFC107',
    warningMuted: '#F9A825',
    info: '#29B6F6',
    infoMuted: '#0288D1',
  },

  // Credit score gradient colors
  creditScore: {
    excellent: '#4CAF50',  // 750+
    good: '#8BC34A',       // 700-749
    fair: '#FFC107',       // 650-699
    poor: '#FF9800',       // 550-649
    veryPoor: '#EF5350',   // Below 550
  },

  // Transparent variants for overlays
  overlay: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.2)',
    dark: 'rgba(0, 0, 0, 0.5)',
    heavy: 'rgba(0, 0, 0, 0.8)',
  },
} as const;

/**
 * Semantic color tokens mapped for theme usage
 * These are the colors you should use in components
 */
export const colors = {
  // Backgrounds
  background: {
    primary: palette.black[800],      // Main app background
    secondary: palette.black[700],    // Card backgrounds
    tertiary: palette.black[600],     // Elevated elements
    inverse: palette.silver[100],     // For light elements
  },

  // Text colors
  text: {
    primary: palette.silver[100],     // Primary text (white)
    secondary: palette.silver[500],   // Secondary text (gray)
    tertiary: palette.silver[600],    // Hint/placeholder text
    inverse: palette.black[800],      // Dark text on light bg
    accent: palette.accent.gold,      // Highlighted text
  },

  // Border colors
  border: {
    default: palette.black[500],
    light: palette.black[400],
    focus: palette.silver[400],
  },

  // Interactive element colors
  interactive: {
    primary: palette.primary.main,
    primaryHover: palette.primary.light,
    primaryPressed: palette.primary.dark,
    secondary: palette.accent.gold,
  },

  // Status colors
  status: {
    success: palette.semantic.success,
    error: palette.semantic.error,
    warning: palette.semantic.warning,
    info: palette.semantic.info,
  },

  // Credit score (re-export for convenience)
  creditScore: palette.creditScore,
} as const;

export type ColorPalette = typeof palette;
export type Colors = typeof colors;
