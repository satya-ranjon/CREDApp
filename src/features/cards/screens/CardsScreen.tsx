/**
 * Cards Screen
 * 
 * Main screen for managing and viewing credit cards.
 * Features a premium card carousel and detailed card information.
 */

import { useNavigation } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CardCarousel, CardDetailsPanel, CreditCard } from '../components';
import { Text, useTheme } from '@/design-system';

// Mock data for demonstration
const MOCK_CARDS: CreditCard[] = [
  {
    id: '1',
    cardNumber: '4532',
    cardholderName: 'John Doe',
    expiryMonth: '09',
    expiryYear: '27',
    network: 'visa',
    type: 'credit',
    bankName: 'HDFC Bank',
    outstandingAmount: 45230,
    dueDate: '2026-02-15',
    rewardsPoints: 12450,
    color: '#1A1F71',
  },
  {
    id: '2',
    cardNumber: '8876',
    cardholderName: 'John Doe',
    expiryMonth: '03',
    expiryYear: '26',
    network: 'mastercard',
    type: 'credit',
    bankName: 'ICICI Bank',
    outstandingAmount: 28900,
    dueDate: '2026-02-20',
    rewardsPoints: 8320,
    color: '#CC0000',
  },
  {
    id: '3',
    cardNumber: '2341',
    cardholderName: 'John Doe',
    expiryMonth: '12',
    expiryYear: '28',
    network: 'amex',
    type: 'credit',
    bankName: 'American Express',
    outstandingAmount: 156000,
    dueDate: '2026-02-12',
    rewardsPoints: 45600,
    color: '#006FCF',
  },
];

export function CardsScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [selectedCard, setSelectedCard] = useState<CreditCard>(MOCK_CARDS[0]);

  const handleCardSelect = useCallback((card: CreditCard) => {
    setSelectedCard(card);
  }, []);

  const handlePayPress = useCallback(() => {
    // TODO: Navigate to payment screen
  }, []);

  const handleViewDetails = useCallback(() => {
    // TODO: Navigate to card statement
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background.primary} />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 16 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text variant="heading.h1">My Cards</Text>
            <Text variant="body.regular" color="secondary" style={styles.subtitle}>
              {MOCK_CARDS.length} cards linked
            </Text>
          </View>
          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: theme.colors.background.tertiary }]}
            onPress={() => navigation.navigate('AddCard' as never)}
          >
            <Text variant="heading.h3" color="accent">+</Text>
          </TouchableOpacity>
        </View>

        {/* Card Carousel */}
        <CardCarousel
          cards={MOCK_CARDS}
          onCardSelect={handleCardSelect}
          activeIndex={0}
        />

        {/* Selected Card Details */}
        <CardDetailsPanel
          card={selectedCard}
          onPayPress={handlePayPress}
          onViewDetailsPress={handleViewDetails}
        />

        {/* Recent Activity Section */}
        <View style={styles.activitySection}>
          <View style={styles.sectionHeader}>
            <Text variant="heading.h3">Recent Activity</Text>
            <TouchableOpacity>
              <Text variant="body.small" color="accent">View All</Text>
            </TouchableOpacity>
          </View>

          {/* Activity Items */}
          <View style={[styles.activityItem, { backgroundColor: theme.colors.background.secondary }]}>
            <View style={styles.activityIcon}>
              <Text variant="body.large">🛒</Text>
            </View>
            <View style={styles.activityInfo}>
              <Text variant="body.regular">Amazon Shopping</Text>
              <Text variant="caption" color="tertiary">Today, 2:30 PM</Text>
            </View>
            <Text variant="body.regular">-₹2,499</Text>
          </View>

          <View style={[styles.activityItem, { backgroundColor: theme.colors.background.secondary }]}>
            <View style={styles.activityIcon}>
              <Text variant="body.large">⛽</Text>
            </View>
            <View style={styles.activityInfo}>
              <Text variant="body.regular">Indian Oil</Text>
              <Text variant="caption" color="tertiary">Yesterday</Text>
            </View>
            <Text variant="body.regular">-₹1,800</Text>
          </View>

          <View style={[styles.activityItem, { backgroundColor: theme.colors.background.secondary }]}>
            <View style={styles.activityIcon}>
              <Text variant="body.large">🍔</Text>
            </View>
            <View style={styles.activityInfo}>
              <Text variant="body.regular">Swiggy</Text>
              <Text variant="caption" color="tertiary">Feb 2</Text>
            </View>
            <Text variant="body.regular">-₹650</Text>
          </View>
        </View>

        {/* Bottom spacing for tab bar */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  subtitle: {
    marginTop: 4,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activitySection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  bottomSpacer: {
    height: 80,
  },
});
