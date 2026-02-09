/**
 * All Transactions Screen
 *
 * Displays the complete list of transactions with search and filter capabilities.
 */

import React, { memo, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { Transaction } from '../types/home.types';
import { Text, Card, useTheme } from '@/design-system';

// Extended mock data for demonstration
const allTransactions: Transaction[] = [
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
  {
    id: '5',
    merchantName: 'Uber',
    merchantCategory: 'Travel',
    amount: 389,
    date: '2024-01-18',
    cardId: 'card-1',
    type: 'debit',
  },
  {
    id: '6',
    merchantName: 'Zomato',
    merchantCategory: 'Food & Dining',
    amount: 756,
    date: '2024-01-17',
    cardId: 'card-1',
    type: 'debit',
  },
  {
    id: '7',
    merchantName: 'Flipkart',
    merchantCategory: 'Shopping',
    amount: 3999,
    date: '2024-01-16',
    cardId: 'card-1',
    type: 'debit',
  },
  {
    id: '8',
    merchantName: 'Electricity Bill',
    merchantCategory: 'Bills',
    amount: 1850,
    date: '2024-01-15',
    cardId: 'card-1',
    type: 'debit',
  },
  {
    id: '9',
    merchantName: 'Reward Credit',
    merchantCategory: 'Rewards',
    amount: 500,
    date: '2024-01-14',
    cardId: 'card-1',
    type: 'credit',
  },
  {
    id: '10',
    merchantName: 'Spotify',
    merchantCategory: 'Entertainment',
    amount: 119,
    date: '2024-01-13',
    cardId: 'card-1',
    type: 'debit',
  },
  {
    id: '11',
    merchantName: 'Apple Store',
    merchantCategory: 'Shopping',
    amount: 7999,
    date: '2024-01-12',
    cardId: 'card-1',
    type: 'debit',
  },
  {
    id: '12',
    merchantName: 'Ola',
    merchantCategory: 'Travel',
    amount: 245,
    date: '2024-01-11',
    cardId: 'card-1',
    type: 'debit',
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
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const categoryIcons: Record<string, string> = {
  Shopping: '🛍️',
  'Food & Dining': '🍔',
  Entertainment: '🎬',
  Rewards: '🎁',
  Travel: '✈️',
  Bills: '📄',
  default: '💳',
};

interface TransactionItemProps {
  transaction: Transaction;
  onPress: (transaction: Transaction) => void;
  isLast: boolean;
}

const TransactionItem = memo(function TransactionItem({
  transaction,
  onPress,
  isLast,
}: TransactionItemProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.transactionItem,
        !isLast && styles.separator,
        !isLast && { borderBottomColor: theme.colors.border.default },
      ]}
      onPress={() => onPress(transaction)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: theme.colors.background.tertiary }]}>
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
          color:
            transaction.type === 'credit' ? theme.colors.status.success : theme.colors.text.primary,
        }}
      >
        {formatAmount(transaction.amount, transaction.type)}
      </Text>
    </TouchableOpacity>
  );
});

export function AllTransactionsScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = allTransactions.filter(
    (tx) =>
      tx.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.merchantCategory.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleTransactionPress = (transaction: Transaction) => {
    // TODO: Navigate to transaction details
    console.log('Transaction pressed:', transaction.id);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background.primary} />

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 8,
            backgroundColor: theme.colors.background.primary,
          },
        ]}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text variant="heading.h3">←</Text>
        </TouchableOpacity>
        <Text variant="heading.h3">All Transactions</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: theme.colors.background.secondary,
              borderColor: theme.colors.border.default,
            },
          ]}
        >
          <Text variant="body.regular" style={styles.searchIcon}>
            🔍
          </Text>
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text.primary }]}
            placeholder="Search transactions..."
            placeholderTextColor={theme.colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text variant="body.small" color="secondary">
                ✕
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Transaction List */}
      <Card variant="flat" padding="none" style={styles.listCard}>
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TransactionItem
              transaction={item}
              onPress={handleTransactionPress}
              isLast={index === filteredTransactions.length - 1}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text variant="body.regular" color="secondary">
                No transactions found
              </Text>
            </View>
          }
        />
      </Card>

      {/* Bottom spacing for safe area */}
      <View style={{ height: insets.bottom }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  listCard: {
    flex: 1,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  listContent: {
    flexGrow: 1,
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
});
