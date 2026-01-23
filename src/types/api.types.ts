/**
 * Common API Types
 * 
 * Shared types for API responses and requests.
 */

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/**
 * Common error response
 */
export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

/**
 * User profile
 */
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatarUrl?: string;
  createdAt: string;
}

/**
 * Credit score data
 */
export interface CreditScore {
  score: number;
  maxScore: number;
  minScore: number;
  lastUpdated: string;
  history: CreditScoreHistoryItem[];
}

export interface CreditScoreHistoryItem {
  date: string;
  score: number;
}

/**
 * Reward item
 */
export interface Reward {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  pointsRequired: number;
  expiresAt?: string;
  category: 'cashback' | 'voucher' | 'experience' | 'merchandise';
  isRedeemed: boolean;
}

/**
 * Card (Credit card)
 */
export interface Card {
  id: string;
  name: string;
  lastFourDigits: string;
  network: 'visa' | 'mastercard' | 'amex' | 'rupay';
  type: 'credit' | 'debit';
  billingDate: number;
  dueDate: number;
  outstandingAmount: number;
  creditLimit: number;
  availableCredit: number;
}
