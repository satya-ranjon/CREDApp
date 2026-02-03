/**
 * App Constants
 * 
 * Application-wide constants that don't change between environments.
 */

export const APP_NAME = 'CREDApp';
export const APP_VERSION = '1.0.0';

/**
 * API related constants
 */
export const API = {
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000,
  PAGE_SIZE: 20,
} as const;

/**
 * Storage keys for AsyncStorage
 */
export const STORAGE_KEYS = {
  // Zustand store keys
  APP_STORE: '@credapp/app_store',
  AUTH_STORE: '@credapp/auth_store',
  // Individual storage keys
  AUTH_TOKEN: '@credapp/auth_token',
  REFRESH_TOKEN: '@credapp/refresh_token',
  USER_DATA: '@credapp/user_data',
  THEME_MODE: '@credapp/theme_mode',
  ONBOARDING_COMPLETE: '@credapp/onboarding_complete',
} as const;

/**
 * Animation durations (in ms)
 */
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1500,
} as const;

/**
 * Credit score ranges (for credit score card)
 */
export const CREDIT_SCORE = {
  MIN: 300,
  MAX: 900,
  EXCELLENT_MIN: 750,
  GOOD_MIN: 700,
  FAIR_MIN: 650,
  POOR_MIN: 550,
} as const;

/**
 * Get credit score label based on value
 */
export function getCreditScoreLabel(score: number): string {
  if (score >= CREDIT_SCORE.EXCELLENT_MIN) return 'Excellent';
  if (score >= CREDIT_SCORE.GOOD_MIN) return 'Good';
  if (score >= CREDIT_SCORE.FAIR_MIN) return 'Fair';
  if (score >= CREDIT_SCORE.POOR_MIN) return 'Poor';
  return 'Very Poor';
}

export type StorageKeys = typeof STORAGE_KEYS;
