/**
 * Theme Configuration
 * 
 * Defines light and dark theme variants using our design tokens.
 * CRED is dark-theme-first, so dark is our primary theme.
 */

import { colors, palette } from '../tokens/colors';
import { shadows, glows } from '../tokens/shadows';
import { spacing, semanticSpacing, borderRadius } from '../tokens/spacing';
import { typography } from '../tokens/typography';

/**
 * Theme structure
 * This ensures all themes have the same shape
 */
/**
 * Helper type to widen literal types to their primitives
 * This allows themes to override specific values (like colors) without mismatching exact literal strings
 */
type WidenTheme<T> = {
  [P in keyof T]: T[P] extends string
    ? string
    : T[P] extends object
    ? WidenTheme<T[P]>
    : T[P];
};

export interface Theme {
  dark: boolean;
  colors: WidenTheme<typeof colors>;
  palette: typeof palette;
  typography: typeof typography;
  spacing: typeof spacing;
  semanticSpacing: typeof semanticSpacing;
  borderRadius: typeof borderRadius;
  shadows: typeof shadows;
  glows: typeof glows;
}

/**
 * Dark Theme (Primary - CRED Style)
 */
export const darkTheme: Theme = {
  dark: true,
  colors,
  palette,
  typography,
  spacing,
  semanticSpacing,
  borderRadius,
  shadows,
  glows,
};

/**
 * Light Theme
 * Inverts the color scheme while keeping other tokens the same.
 * 
 * Note: CRED is primarily dark-themed, but we provide light theme
 * for accessibility and user preference.
 */
export const lightTheme: Theme = {
  dark: false,
  colors: {
    ...colors,
    background: {
      primary: palette.silver[200],
      secondary: palette.silver[100],
      tertiary: palette.silver[300],
      inverse: palette.black[800],
    },
    text: {
      primary: palette.black[800],
      secondary: palette.black[600],
      tertiary: palette.silver[600],
      inverse: palette.silver[100],
      accent: palette.accent.gold,
    },
    border: {
      default: palette.silver[300],
      light: palette.silver[400],
      focus: palette.black[500],
    },
  },
  palette,
  typography,
  spacing,
  semanticSpacing,
  borderRadius,
  shadows,
  glows,
};

/**
 * Default theme export
 */
export const defaultTheme = darkTheme;
