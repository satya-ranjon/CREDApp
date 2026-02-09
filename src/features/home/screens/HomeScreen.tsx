/**
 * Home Screen
 *
 * Main dashboard showing credit score, quick actions, and recent activity.
 */

import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { CreditScoreCard, QuickActions, RecentTransactions } from '../components';
import { Text, useTheme } from '@/design-system';
import { useAuth } from '@/features/auth';

export function HomeScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // Simulate API refresh
    await new Promise((resolve) => setTimeout(() => resolve(undefined), 1500));
    setRefreshing(false);
  }, []);

  const handleQuickAction = (_actionId: string) => {
    // TODO: Navigate to appropriate screen
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background.primary} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.interactive.secondary}
            colors={[theme.colors.interactive.secondary]}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text variant="body.regular" color="secondary">
              Good evening,
            </Text>
            <Text variant="heading.h2">{user?.name || 'User'} 👋</Text>
          </View>
          <View style={styles.notificationBadge}>
            <Text variant="body.large">🔔</Text>
          </View>
        </View>

        {/* Credit Score Card */}
        <CreditScoreCard
          score={785}
          lastUpdated="Jan 22, 2024"
          onPress={() => {
            // TODO: Navigate to credit score details
          }}
        />

        {/* Quick Actions */}
        <QuickActions onActionPress={handleQuickAction} />

        {/* Recent Transactions */}
        <RecentTransactions
          onTransactionPress={(_tx) => {
            // TODO: Navigate to transaction details
          }}
          onViewAllPress={() => {
            navigation.navigate('AllTransactions');
          }}
        />

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
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  notificationBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSpacer: {
    height: 80,
  },
});
