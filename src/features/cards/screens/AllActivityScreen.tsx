/**
 * All Activity Screen
 *
 * Displays the complete list of card activities with search and filter capabilities.
 */

import React, { memo, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Text, useTheme } from '@/design-system';

export interface Activity {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  time?: string;
  type: 'credit' | 'debit';
  cardId: string;
}

// Extended mock data for demonstration
const allActivities: Activity[] = [
  {
    id: '1',
    title: 'Amazon Shopping',
    category: 'Shopping',
    amount: 2499,
    date: '2024-02-09',
    time: '2:30 PM',
    type: 'debit',
    cardId: 'card-1',
  },
  {
    id: '2',
    title: 'Indian Oil',
    category: 'Fuel',
    amount: 1800,
    date: '2024-02-08',
    type: 'debit',
    cardId: 'card-1',
  },
  {
    id: '3',
    title: 'Swiggy',
    category: 'Food & Dining',
    amount: 650,
    date: '2024-02-02',
    type: 'debit',
    cardId: 'card-1',
  },
  {
    id: '4',
    title: 'Cashback Reward',
    category: 'Rewards',
    amount: 500,
    date: '2024-02-01',
    type: 'credit',
    cardId: 'card-1',
  },
  {
    id: '5',
    title: 'Uber Ride',
    category: 'Travel',
    amount: 389,
    date: '2024-01-31',
    time: '8:45 PM',
    type: 'debit',
    cardId: 'card-1',
  },
  {
    id: '6',
    title: 'Netflix Subscription',
    category: 'Entertainment',
    amount: 649,
    date: '2024-01-30',
    type: 'debit',
    cardId: 'card-1',
  },
  {
    id: '7',
    title: 'Flipkart',
    category: 'Shopping',
    amount: 3999,
    date: '2024-01-29',
    time: '11:20 AM',
    type: 'debit',
    cardId: 'card-1',
  },
  {
    id: '8',
    title: 'Electricity Bill',
    category: 'Bills',
    amount: 2150,
    date: '2024-01-28',
    type: 'debit',
    cardId: 'card-1',
  },
  {
    id: '9',
    title: 'Zomato',
    category: 'Food & Dining',
    amount: 756,
    date: '2024-01-27',
    time: '1:15 PM',
    type: 'debit',
    cardId: 'card-1',
  },
  {
    id: '10',
    title: 'Reward Points Credit',
    category: 'Rewards',
    amount: 250,
    date: '2024-01-26',
    type: 'credit',
    cardId: 'card-1',
  },
  {
    id: '11',
    title: 'HP Petrol',
    category: 'Fuel',
    amount: 2500,
    date: '2024-01-25',
    type: 'debit',
    cardId: 'card-1',
  },
  {
    id: '12',
    title: 'BigBasket',
    category: 'Groceries',
    amount: 1850,
    date: '2024-01-24',
    time: '4:30 PM',
    type: 'debit',
    cardId: 'card-1',
  },
];

function formatAmount(amount: number, type: 'credit' | 'debit'): string {
  const prefix = type === 'credit' ? '+' : '-';
  return `${prefix}₹${amount.toLocaleString('en-IN')}`;
}

function formatDate(dateString: string, time?: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return time ? `Today, ${time}` : 'Today';
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return time ? `Yesterday, ${time}` : 'Yesterday';
  }
  const formattedDate = date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  });
  return time ? `${formattedDate}, ${time}` : formattedDate;
}

const categoryIcons: Record<string, string> = {
  Shopping: '🛒',
  'Food & Dining': '🍔',
  Entertainment: '🎬',
  Rewards: '🎁',
  Travel: '🚕',
  Fuel: '⛽',
  Bills: '📄',
  Groceries: '🛍️',
  default: '💳',
};

interface ActivityItemProps {
  activity: Activity;
  onPress: (activity: Activity) => void;
  isLast: boolean;
}

const ActivityItem = memo(function ActivityItem({ activity, onPress, isLast }: ActivityItemProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.activityItem,
        { backgroundColor: theme.colors.background.secondary },
        !isLast && styles.itemMargin,
      ]}
      onPress={() => onPress(activity)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Text variant="body.large">
          {categoryIcons[activity.category] || categoryIcons.default}
        </Text>
      </View>

      <View style={styles.activityDetails}>
        <Text variant="body.regular">{activity.title}</Text>
        <Text variant="caption" color="tertiary">
          {formatDate(activity.date, activity.time)}
        </Text>
      </View>

      <Text
        variant="body.regular"
        style={{
          color:
            activity.type === 'credit' ? theme.colors.status.success : theme.colors.text.primary,
        }}
      >
        {formatAmount(activity.amount, activity.type)}
      </Text>
    </TouchableOpacity>
  );
});

export function AllActivityScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredActivities = allActivities.filter(
    (activity) =>
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleActivityPress = (activity: Activity) => {
    // TODO: Navigate to activity details
    console.log('Activity pressed:', activity.id);
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
        <Text variant="heading.h3">All Activity</Text>
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
            placeholder="Search activities..."
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

      {/* Activity List */}
      <FlatList
        data={filteredActivities}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ActivityItem
            activity={item}
            onPress={handleActivityPress}
            isLast={index === filteredActivities.length - 1}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 16 }]}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="body.regular" color="secondary">
              No activities found
            </Text>
          </View>
        }
      />
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
  listContent: {
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  itemMargin: {
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityDetails: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
});
