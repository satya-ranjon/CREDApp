/**
 * Card Details Panel Component
 * 
 * Shows selected card information including outstanding balance,
 * due date, and quick actions.
 */

import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import type { CreditCard } from './CreditCardVisual';
import { Text, Card, Button, useTheme } from '@/design-system';

interface CardDetailsPanelProps {
  card: CreditCard;
  onPayPress?: () => void;
  onViewDetailsPress?: () => void;
}

/**
 * Format currency in INR format
 */
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate days until due date
 */
function getDaysUntilDue(dueDate: string): number {
  const due = new Date(dueDate);
  const today = new Date();
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Get due date color based on urgency
 */
function getDueDateColor(daysUntil: number, colors: { status: { error: string; warning: string; success: string } }): string {
  if (daysUntil <= 3) return colors.status.error;
  if (daysUntil <= 7) return colors.status.warning;
  return colors.status.success;
}

export const CardDetailsPanel = memo(function CardDetailsPanel({
  card,
  onPayPress,
  onViewDetailsPress,
}: CardDetailsPanelProps) {
  const { theme } = useTheme();
  const daysUntilDue = getDaysUntilDue(card.dueDate);
  const dueDateColor = getDueDateColor(daysUntilDue, theme.colors);

  return (
    <Card variant="elevated" padding="lg" style={styles.container}>
      {/* Outstanding Amount */}
      <View style={styles.amountSection}>
        <Text variant="label.small" color="secondary">
          OUTSTANDING AMOUNT
        </Text>
        <Text 
          variant="display.medium" 
          style={[styles.amount, { color: theme.colors.text.accent }]}
        >
          {formatCurrency(card.outstandingAmount)}
        </Text>
      </View>

      {/* Due Date & Rewards Row */}
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Text variant="caption" color="tertiary">
            Due in
          </Text>
          <View style={styles.dueContainer}>
            <Text 
              variant="heading.h3" 
              style={{ color: dueDateColor }}
            >
              {daysUntilDue > 0 ? daysUntilDue : 0}
            </Text>
            <Text variant="body.small" color="secondary" style={styles.daysLabel}>
              {daysUntilDue === 1 ? 'day' : 'days'}
            </Text>
          </View>
        </View>

        <View style={[styles.infoItem, styles.infoDivider, { borderColor: theme.colors.border.default }]} />

        <View style={styles.infoItem}>
          <Text variant="caption" color="tertiary">
            Reward Points
          </Text>
          <View style={styles.rewardsContainer}>
            <Text variant="heading.h3" color="accent">
              {card.rewardsPoints.toLocaleString()}
            </Text>
            <Text variant="body.small" color="secondary" style={styles.pointsLabel}>
              pts
            </Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <Button 
          onPress={onPayPress}
          fullWidth
          style={styles.payButton}
        >
          Pay Now
        </Button>
        
        <Button 
          variant="secondary"
          onPress={onViewDetailsPress}
          fullWidth
          style={styles.detailsButton}
        >
          View Statement
        </Button>
      </View>

      {/* Quick Stats */}
      <View style={[styles.quickStats, { borderTopColor: theme.colors.border.default }]}>
        <View style={styles.stat}>
          <Text variant="caption" color="tertiary">Credit Limit</Text>
          <Text variant="body.small">₹2,00,000</Text>
        </View>
        <View style={styles.stat}>
          <Text variant="caption" color="tertiary">Available</Text>
          <Text variant="body.small" color="accent">
            {formatCurrency(200000 - card.outstandingAmount)}
          </Text>
        </View>
        <View style={styles.stat}>
          <Text variant="caption" color="tertiary">This Month</Text>
          <Text variant="body.small">{formatCurrency(card.outstandingAmount)}</Text>
        </View>
      </View>
    </Card>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  amountSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  amount: {
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoDivider: {
    borderLeftWidth: 1,
    paddingLeft: 0,
  },
  dueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  daysLabel: {
    marginLeft: 4,
  },
  rewardsContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  pointsLabel: {
    marginLeft: 4,
  },
  actions: {
    gap: 12,
  },
  payButton: {
    marginBottom: 0,
  },
  detailsButton: {
    marginTop: 0,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
  },
  stat: {
    alignItems: 'center',
  },
});
