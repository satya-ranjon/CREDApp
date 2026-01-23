/**
 * Recent Transactions Component
 * 
 * List of recent card transactions on home screen.
 */

import React, { memo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import type { Transaction } from '../types/home.types';
import { Text, Card, useTheme } from '@/design-system';

interface RecentTransactionsProps {
  transactions?: Transaction[];
  onTransactionPress?: (transaction: Transaction) => void;
  onViewAllPress?: () => void;
}

// Mock data for development
const mockTransactions: Transaction[] = [
  {
    id: '1',
    merchantName: 'Amazon',
    merchantCategory: 'Shopping',
    amount: 2499,
    date: '2024-01-22',
    cardId: 'card-1',
    type: 'debit',
  },
  {
    id: '2',
    merchantName: 'Swiggy',
    merchantCategory: 'Food & Dining',
    amount: 450,
    date: '2024-01-21',
    cardId: 'card-1',
    type: 'debit',
  },
  {
    id: '3',
    merchantName: 'Netflix',
    merchantCategory: 'Entertainment',
    amount: 649,
    date: '2024-01-20',
    cardId: 'card-1',
    type: 'debit',
  },
  {
    id: '4',
    merchantName: 'Cashback Received',
    merchantCategory: 'Rewards',
    amount: 125,
    date: '2024-01-19',
    cardId: 'card-1',
    type: 'credit',
  },
];

function formatAmount(amount: number, type: 'credit' | 'debit'): string {
  const prefix = type === 'credit' ? '+' : '-';
  return `${prefix}₹${amount.toLocaleString('en-IN')}`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

const categoryIcons: Record<string, string> = {
  'Shopping': '🛍️',
  'Food & Dining': '🍔',
  'Entertainment': '🎬',
  'Rewards': '🎁',
  'Travel': '✈️',
  'Bills': '📄',
  'default': '💳',
};

export const RecentTransactions = memo(function RecentTransactions({
  transactions = mockTransactions,
  onTransactionPress,
  onViewAllPress,
}: RecentTransactionsProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="heading.h4">Recent Transactions</Text>
        <TouchableOpacity onPress={onViewAllPress}>
          <Text variant="body.small" color="accent">
            View All
          </Text>
        </TouchableOpacity>
      </View>

      <Card variant="flat" padding="none" style={styles.listContainer}>
        {transactions.slice(0, 4).map((transaction, index) => (
          <TouchableOpacity
            key={transaction.id}
            style={[
              styles.transactionItem,
              index < transactions.length - 1 && styles.separator,
              index < transactions.length - 1 && {
                borderBottomColor: theme.colors.border.default,
              },
            ]}
            onPress={() => onTransactionPress?.(transaction)}
            activeOpacity={0.7}
          >
            <View 
              style={[
                styles.iconContainer, 
                { backgroundColor: theme.colors.background.tertiary }
              ]}
            >
              <Text variant="body.large">
                {categoryIcons[transaction.merchantCategory] || categoryIcons.default}
              </Text>
            </View>

            <View style={styles.transactionDetails}>
              <Text variant="body.regular">{transaction.merchantName}</Text>
              <Text variant="caption" color="secondary">
                {transaction.merchantCategory} • {formatDate(transaction.date)}
              </Text>
            </View>

            <Text 
              variant="body.regular" 
              style={{ 
                color: transaction.type === 'credit' 
                  ? theme.colors.status.success 
                  : theme.colors.text.primary 
              }}
            >
              {formatAmount(transaction.amount, transaction.type)}
            </Text>
          </TouchableOpacity>
        ))}
      </Card>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  listContainer: {
    overflow: 'hidden',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  separator: {
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
});
