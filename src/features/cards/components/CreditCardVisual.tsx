/**
 * Credit Card Visual Component
 * 
 * Premium 3D credit card display with glassmorphism effect.
 * Shows card details with animations and card network branding.
 */

import React, { memo, useMemo } from 'react';
import { View, StyleSheet, Pressable, Animated } from 'react-native';
import { Text, useTheme } from '@/design-system';

export type CardNetwork = 'visa' | 'mastercard' | 'amex' | 'rupay' | 'discover';
export type CardType = 'credit' | 'debit';

export interface CreditCard {
  id: string;
  cardNumber: string; // Last 4 digits only
  cardholderName: string;
  expiryMonth: string;
  expiryYear: string;
  network: CardNetwork;
  type: CardType;
  bankName: string;
  outstandingAmount: number;
  dueDate: string;
  rewardsPoints: number;
  color?: string; // Custom card color
}

interface CreditCardVisualProps {
  card: CreditCard;
  onPress?: () => void;
  isActive?: boolean;
  scale?: Animated.AnimatedInterpolation<number>;
}

/**
 * Get gradient colors for card network
 */
function getCardGradient(network: CardNetwork): [string, string] {
  switch (network) {
    case 'visa':
      return ['#1A1F71', '#121650'];
    case 'mastercard':
      return ['#EB001B', '#F79E1B'];
    case 'amex':
      return ['#006FCF', '#00447C'];
    case 'rupay':
      return ['#097969', '#0B5345'];
    case 'discover':
      return ['#FF6B00', '#CC5500'];
    default:
      return ['#2E2E2E', '#1A1A1A'];
  }
}

/**
 * Get network logo/text
 */
function getNetworkDisplay(network: CardNetwork): string {
  switch (network) {
    case 'visa':
      return 'VISA';
    case 'mastercard':
      return '●● MasterCard';
    case 'amex':
      return 'AMEX';
    case 'rupay':
      return 'RuPay';
    case 'discover':
      return 'DISCOVER';
    default:
      return '';
  }
}

export const CreditCardVisual = memo(function CreditCardVisual({
  card,
  onPress,
  isActive = false,
}: CreditCardVisualProps) {
  const { theme } = useTheme();
  const [primaryColor] = getCardGradient(card.network);
  const cardColor = card.color || primaryColor;

  const dynamicCardStyle = useMemo(() => ({
    backgroundColor: cardColor,
    borderColor: isActive ? theme.colors.text.accent : 'transparent',
    borderWidth: isActive ? 2 : 0,
  }), [cardColor, isActive, theme.colors.text.accent]);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.cardContainer,
        pressed && styles.pressed,
      ]}
    >
      <View 
        style={[styles.card, dynamicCardStyle]}
      >
        {/* Glassmorphism overlay */}
        <View style={styles.glassOverlay} />
        
        {/* Card chip */}
        <View style={styles.cardChip}>
          <View style={[styles.chipLine, styles.chipLineTop]} />
          <View style={[styles.chipLine, styles.chipLineMiddle]} />
          <View style={[styles.chipLine, styles.chipLineBottom]} />
        </View>

        {/* Bank name */}
        <View style={styles.bankRow}>
          <Text variant="label.small" style={styles.bankName}>
            {card.bankName.toUpperCase()}
          </Text>
          <Text variant="caption" style={styles.cardTypeLabel}>
            {card.type.toUpperCase()}
          </Text>
        </View>

        {/* Card number */}
        <View style={styles.cardNumberContainer}>
          <Text variant="heading.h3" style={styles.cardNumber}>
            •••• •••• •••• {card.cardNumber}
          </Text>
        </View>

        {/* Bottom row - holder name, expiry, network */}
        <View style={styles.bottomRow}>
          <View style={styles.holderInfo}>
            <Text variant="caption" style={styles.label}>
              CARD HOLDER
            </Text>
            <Text variant="body.small" style={styles.holderName}>
              {card.cardholderName.toUpperCase()}
            </Text>
          </View>
          
          <View style={styles.expiryInfo}>
            <Text variant="caption" style={styles.label}>
              EXPIRES
            </Text>
            <Text variant="body.small" style={styles.expiryDate}>
              {card.expiryMonth}/{card.expiryYear}
            </Text>
          </View>

          <View style={styles.networkContainer}>
            <Text variant="body.regular" style={styles.networkLogo}>
              {getNetworkDisplay(card.network)}
            </Text>
          </View>
        </View>

        {/* Decorative circles (like Mastercard style) */}
        <View style={[styles.decorativeCircle, styles.circle1]} />
        <View style={[styles.decorativeCircle, styles.circle2]} />
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 8,
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
  },
  card: {
    width: 320,
    height: 200,
    borderRadius: 16,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
  },
  cardChip: {
    width: 45,
    height: 35,
    backgroundColor: '#D4AF37',
    borderRadius: 6,
    marginBottom: 16,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  chipLine: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 2,
    marginVertical: 2,
  },
  chipLineTop: {
    width: '60%',
  },
  chipLineMiddle: {
    width: '100%',
  },
  chipLineBottom: {
    width: '60%',
    alignSelf: 'flex-end',
  },
  bankRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    right: 20,
  },
  bankName: {
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '700',
    letterSpacing: 1,
  },
  cardTypeLabel: {
    color: 'rgba(255,255,255,0.6)',
    marginLeft: 8,
  },
  cardNumberContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  cardNumber: {
    color: '#FFFFFF',
    letterSpacing: 3,
    fontSize: 20,
    fontWeight: '500',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  holderInfo: {
    flex: 1,
  },
  expiryInfo: {
    marginHorizontal: 16,
  },
  label: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 8,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  holderName: {
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 1,
  },
  expiryDate: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  networkContainer: {
    alignItems: 'flex-end',
  },
  networkLogo: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 100,
    opacity: 0.1,
  },
  circle1: {
    width: 200,
    height: 200,
    backgroundColor: '#FFFFFF',
    top: -60,
    right: -60,
  },
  circle2: {
    width: 150,
    height: 150,
    backgroundColor: '#FFFFFF',
    bottom: -40,
    left: -40,
  },
});
