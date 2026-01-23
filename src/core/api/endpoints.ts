/**
 * API Endpoints
 * 
 * Centralized endpoint definitions.
 * Makes it easy to update URLs in one place.
 */

export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refreshToken: '/auth/refresh',
    forgotPassword: '/auth/forgot-password',
  },

  user: {
    profile: '/users/me',
    updateProfile: '/users/me',
    creditScore: '/users/me/credit-score',
  },

  rewards: {
    list: '/rewards',
    details: (id: string) => `/rewards/${id}`,
    redeem: (id: string) => `/rewards/${id}/redeem`,
  },

  cards: {
    list: '/cards',
    details: (id: string) => `/cards/${id}`,
    transactions: (id: string) => `/cards/${id}/transactions`,
  },
} as const;

export type Endpoints = typeof endpoints;
