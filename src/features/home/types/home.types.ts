/**
 * Home Types
 */

import type { CreditScore, Card } from '@/types';

export interface HomeData {
  creditScore: CreditScore;
  cards: Card[];
  recentActivity: Transaction[];
}

export interface Transaction {
  id: string;
  merchantName: string;
  merchantCategory: string;
  amount: number;
  date: string;
  cardId: string;
  type: 'credit' | 'debit';
}

export interface QuickAction {
  id: string;
  title: string;
  icon: string;
  route: string;
}
