/**
 * Quick Actions Component
 * 
 * Grid of quick action buttons on home screen.
 */

import React, { memo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from '@/design-system';

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  subtitle?: string;
}

interface QuickActionsProps {
  actions?: QuickAction[];
  onActionPress?: (actionId: string) => void;
}

const defaultActions: QuickAction[] = [
  { id: 'pay-bills', title: 'Pay Bills', icon: '💳', subtitle: 'Cards & EMIs' },
  { id: 'rewards', title: 'Rewards', icon: '🎁', subtitle: 'Explore offers' },
  { id: 'credit-report', title: 'Credit Report', icon: '📊', subtitle: 'View details' },
  { id: 'refer', title: 'Refer & Earn', icon: '👥', subtitle: 'Invite friends' },
];

export const QuickActions = memo(function QuickActions({
  actions = defaultActions,
  onActionPress,
}: QuickActionsProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text variant="heading.h4" style={styles.title}>
        Quick Actions
      </Text>
      
      <View style={styles.grid}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={[
              styles.actionItem,
              { backgroundColor: theme.colors.background.secondary }
            ]}
            onPress={() => onActionPress?.(action.id)}
            activeOpacity={0.7}
          >
            <Text variant="display.medium" style={styles.icon}>
              {action.icon}
            </Text>
            <Text variant="label.regular" style={styles.actionTitle}>
              {action.title}
            </Text>
            {action.subtitle && (
              <Text variant="caption" color="secondary">
                {action.subtitle}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  actionItem: {
    width: '48%',
    marginHorizontal: '1%',
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionTitle: {
    marginBottom: 4,
  },
});
