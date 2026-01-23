/**
 * Rewards Screen
 * 
 * Displays available rewards and offers.
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Card, useTheme } from '@/design-system';
import type { Reward } from '@/types';

// Mock rewards data
const mockRewards: Reward[] = [
  {
    id: '1',
    title: 'Amazon Gift Card',
    description: 'Get ₹500 Amazon voucher',
    imageUrl: 'https://picsum.photos/200',
    pointsRequired: 5000,
    category: 'voucher',
    isRedeemed: false,
  },
  {
    id: '2',
    title: 'Swiggy Cashback',
    description: '20% cashback on next 3 orders',
    imageUrl: 'https://picsum.photos/201',
    pointsRequired: 2000,
    category: 'cashback',
    isRedeemed: false,
  },
  {
    id: '3',
    title: 'Netflix Premium',
    description: '1 month free subscription',
    imageUrl: 'https://picsum.photos/202',
    pointsRequired: 8000,
    category: 'voucher',
    isRedeemed: false,
  },
  {
    id: '4',
    title: 'Flight Discount',
    description: 'Up to ₹2000 off on domestic flights',
    imageUrl: 'https://picsum.photos/203',
    pointsRequired: 10000,
    category: 'voucher',
    isRedeemed: false,
  },
  {
    id: '5',
    title: 'Zomato Pro',
    description: '3 months Zomato Pro membership',
    imageUrl: 'https://picsum.photos/204',
    pointsRequired: 3000,
    category: 'experience',
    isRedeemed: true,
  },
];

type CategoryFilter = 'all' | 'voucher' | 'cashback' | 'experience';

export function RewardsScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const userPoints = 7500;

  const filteredRewards = mockRewards.filter(
    (reward) => selectedCategory === 'all' || reward.category === selectedCategory
  );

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'voucher', label: 'Vouchers' },
    { key: 'cashback', label: 'Cashback' },
    { key: 'experience', label: 'Experiences' },
  ];

  const renderRewardCard = ({ item }: { item: Reward }) => {
    const canRedeem = userPoints >= item.pointsRequired && !item.isRedeemed;

    return (
      <Card
        variant="elevated"
        padding="none"
        style={styles.rewardCard}
        onPress={() => console.log('Reward pressed:', item.id)}
      >
        <View
          style={[
            styles.rewardImage,
            { backgroundColor: theme.colors.background.tertiary },
          ]}
        >
          <Text variant="display.medium">🎁</Text>
        </View>
        <View style={styles.rewardContent}>
          <Text variant="heading.h4" numberOfLines={1}>
            {item.title}
          </Text>
          <Text variant="body.small" color="secondary" numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.rewardFooter}>
            <View style={styles.pointsContainer}>
              <Text variant="label.regular" color="accent">
                {item.pointsRequired.toLocaleString()}
              </Text>
              <Text variant="caption" color="secondary">
                {' '}points
              </Text>
            </View>
            {item.isRedeemed ? (
              <View style={[styles.statusBadge, { backgroundColor: theme.colors.status.success + '20' }]}>
                <Text variant="caption" style={{ color: theme.colors.status.success }}>
                  Redeemed
                </Text>
              </View>
            ) : canRedeem ? (
              <View style={[styles.statusBadge, { backgroundColor: theme.colors.interactive.secondary + '20' }]}>
                <Text variant="caption" color="accent">
                  Available
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background.primary} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text variant="heading.h1">Rewards</Text>
        <View style={styles.pointsBadge}>
          <Text variant="body.small" color="accent">
            {userPoints.toLocaleString()} pts
          </Text>
        </View>
      </View>

      {/* Category Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.categoryPill,
              {
                backgroundColor:
                  selectedCategory === category.key
                    ? theme.colors.interactive.secondary
                    : theme.colors.background.secondary,
              },
            ]}
            onPress={() => setSelectedCategory(category.key)}
          >
            <Text
              variant="label.regular"
              style={{
                color:
                  selectedCategory === category.key
                    ? theme.palette.black[900]
                    : theme.colors.text.secondary,
              }}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Rewards List */}
      <FlatList
        data={filteredRewards}
        renderItem={renderRewardCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  pointsBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  rewardCard: {
    width: '48%',
    marginBottom: 16,
    overflow: 'hidden',
  },
  rewardImage: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardContent: {
    padding: 12,
  },
  rewardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
});
