/**
 * Linked Cards Screen
 *
 * Shows and manages user's linked credit cards.
 */

import React, { memo } from 'react';
import { View, StyleSheet, FlatList, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Text, Card, useTheme } from '@/design-system';

interface LinkedCard {
  id: string;
  bankName: string;
  cardNumber: string;
  network: 'visa' | 'mastercard' | 'amex' | 'rupay';
  type: 'credit' | 'debit';
  expiryMonth: string;
  expiryYear: string;
  isPrimary: boolean;
}

// Mock data
const linkedCards: LinkedCard[] = [
  {
    id: '1',
    bankName: 'HDFC Bank',
    cardNumber: '4532',
    network: 'visa',
    type: 'credit',
    expiryMonth: '09',
    expiryYear: '27',
    isPrimary: true,
  },
  {
    id: '2',
    bankName: 'ICICI Bank',
    cardNumber: '8876',
    network: 'mastercard',
    type: 'credit',
    expiryMonth: '03',
    expiryYear: '26',
    isPrimary: false,
  },
  {
    id: '3',
    bankName: 'American Express',
    cardNumber: '2341',
    network: 'amex',
    type: 'credit',
    expiryMonth: '12',
    expiryYear: '28',
    isPrimary: false,
  },
];

const networkLogos: Record<string, string> = {
  visa: '💳',
  mastercard: '💳',
  amex: '💳',
  rupay: '💳',
};

const networkColors: Record<string, string> = {
  visa: '#1A1F71',
  mastercard: '#CC0000',
  amex: '#006FCF',
  rupay: '#097969',
};

interface CardItemProps {
  card: LinkedCard;
  onPress: (card: LinkedCard) => void;
  onSetPrimary: (card: LinkedCard) => void;
  onRemove: (card: LinkedCard) => void;
}

const CardItem = memo(function CardItem({ card, onPress, onSetPrimary, onRemove }: CardItemProps) {
  const { theme } = useTheme();

  const handleLongPress = () => {
    Alert.alert(card.bankName, 'Choose an action', [
      {
        text: 'Set as Primary',
        onPress: () => onSetPrimary(card),
      },
      {
        text: 'Remove Card',
        style: 'destructive',
        onPress: () => onRemove(card),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <TouchableOpacity onPress={() => onPress(card)} onLongPress={handleLongPress}>
      <Card variant="elevated" style={styles.cardItem}>
        <View
          style={[
            styles.cardPreview,
            { backgroundColor: networkColors[card.network] || theme.colors.background.tertiary },
          ]}
        >
          <View style={styles.cardTop}>
            <Text variant="caption" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {card.bankName}
            </Text>
            {card.isPrimary && (
              <View style={styles.primaryBadge}>
                <Text variant="label.small" style={{ color: '#fff' }}>
                  PRIMARY
                </Text>
              </View>
            )}
          </View>
          <View style={styles.cardBottom}>
            <Text variant="body.regular" style={{ color: '#fff' }}>
              •••• •••• •••• {card.cardNumber}
            </Text>
            <Text variant="body.large" style={{ color: '#fff' }}>
              {networkLogos[card.network]}
            </Text>
          </View>
        </View>
        <View style={styles.cardDetails}>
          <View style={styles.detailRow}>
            <Text variant="caption" color="secondary">
              Type
            </Text>
            <Text variant="body.small">
              {card.type.charAt(0).toUpperCase() + card.type.slice(1)} Card
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text variant="caption" color="secondary">
              Expires
            </Text>
            <Text variant="body.small">
              {card.expiryMonth}/{card.expiryYear}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
});

export function LinkedCardsScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleCardPress = (card: LinkedCard) => {
    // TODO: Navigate to card details
    console.log('Card pressed:', card.id);
  };

  const handleSetPrimary = (card: LinkedCard) => {
    Alert.alert('Success', `${card.bankName} is now your primary card`);
  };

  const handleRemoveCard = (card: LinkedCard) => {
    Alert.alert(
      'Remove Card',
      `Are you sure you want to remove ${card.bankName} ending in ${card.cardNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Card removed successfully');
          },
        },
      ],
    );
  };

  const handleAddCard = () => {
    navigation.navigate('AddCard' as never);
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
        <Text variant="heading.h3">Linked Cards</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
          <Text variant="heading.h3" color="accent">
            +
          </Text>
        </TouchableOpacity>
      </View>

      {/* Cards List */}
      <FlatList
        data={linkedCards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardItem
            card={item}
            onPress={handleCardPress}
            onSetPrimary={handleSetPrimary}
            onRemove={handleRemoveCard}
          />
        )}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 80 }]}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <TouchableOpacity
            style={[styles.addCardButton, { borderColor: theme.colors.border.default }]}
            onPress={handleAddCard}
          >
            <Text variant="heading.h2" color="accent">
              +
            </Text>
            <Text variant="body.regular" color="accent" style={{ marginTop: 8 }}>
              Add New Card
            </Text>
          </TouchableOpacity>
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
  addButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    padding: 16,
  },
  cardItem: {
    marginBottom: 16,
    padding: 0,
    overflow: 'hidden',
  },
  cardPreview: {
    padding: 16,
    height: 120,
    justifyContent: 'space-between',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  primaryBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDetails: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailRow: {
    alignItems: 'center',
  },
  addCardButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 16,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
});
