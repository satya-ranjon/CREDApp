/* eslint-disable no-console */
/**
 * Profile Screen
 * 
 * User profile with settings and account options.
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Card, useTheme } from '@/design-system';
import { useAuth } from '@/features/auth';

interface MenuItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showArrow?: boolean;
  danger?: boolean;
}

function MenuItem({ icon, title, subtitle, onPress, showArrow = true, danger }: MenuItemProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.menuItem, { borderBottomColor: theme.colors.border.default }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.menuIcon, { backgroundColor: theme.colors.background.tertiary }]}>
        <Text variant="body.large">{icon}</Text>
      </View>
      <View style={styles.menuContent}>
        <Text
          variant="body.regular"
          style={danger ? { color: theme.colors.status.error } : undefined}
        >
          {title}
        </Text>
        {subtitle && (
          <Text variant="caption" color="secondary">
            {subtitle}
          </Text>
        )}
      </View>
      {showArrow && (
        <Text variant="body.regular" color="tertiary">
          →
        </Text>
      )}
    </TouchableOpacity>
  );
}

export function ProfileScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background.primary} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text variant="heading.h1" style={styles.pageTitle}>
          Profile
        </Text>

        {/* User Info Card */}
        <Card variant="elevated" style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: theme.colors.interactive.secondary }]}>
              <Text variant="heading.h1" style={{ color: theme.palette.black[900] }}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
          </View>
          <Text variant="heading.h3" center>
            {user?.name || 'User'}
          </Text>
          <Text variant="body.regular" color="secondary" center>
            {user?.email || 'user@example.com'}
          </Text>
          <View style={styles.memberBadge}>
            <Text variant="label.small" color="accent">
              CRED MEMBER SINCE 2024
            </Text>
          </View>
        </Card>

        {/* Account Settings */}
        <Text variant="label.small" color="secondary" style={styles.sectionTitle}>
          ACCOUNT SETTINGS
        </Text>
        <Card variant="flat" padding="none" style={styles.menuCard}>
          <MenuItem
            icon="👤"
            title="Edit Profile"
            subtitle="Name, email, phone"
            onPress={() => console.log('Edit profile')}
          />
          <MenuItem
            icon="💳"
            title="Linked Cards"
            subtitle="Manage your credit cards"
            onPress={() => console.log('Linked cards')}
          />
          <MenuItem
            icon="🔔"
            title="Notifications"
            subtitle="Push, email preferences"
            onPress={() => console.log('Notifications')}
          />
          <MenuItem
            icon="🔒"
            title="Security"
            subtitle="Password, biometrics"
            onPress={() => console.log('Security')}
          />
        </Card>

        {/* App Settings */}
        <Text variant="label.small" color="secondary" style={styles.sectionTitle}>
          APP SETTINGS
        </Text>
        <Card variant="flat" padding="none" style={styles.menuCard}>
          <MenuItem
            icon="🎨"
            title="Appearance"
            subtitle="Dark mode, themes"
            onPress={() => console.log('Appearance')}
          />
          <MenuItem
            icon="🌐"
            title="Language"
            subtitle="English"
            onPress={() => console.log('Language')}
          />
        </Card>

        {/* Support */}
        <Text variant="label.small" color="secondary" style={styles.sectionTitle}>
          SUPPORT
        </Text>
        <Card variant="flat" padding="none" style={styles.menuCard}>
          <MenuItem
            icon="❓"
            title="Help & FAQ"
            onPress={() => console.log('Help')}
          />
          <MenuItem
            icon="📝"
            title="Terms of Service"
            onPress={() => console.log('Terms')}
          />
          <MenuItem
            icon="🛡️"
            title="Privacy Policy"
            onPress={() => console.log('Privacy')}
          />
          <MenuItem
            icon="⭐"
            title="Rate the App"
            onPress={() => console.log('Rate')}
          />
        </Card>

        {/* Logout */}
        <Card variant="flat" padding="none" style={styles.menuCard}>
          <MenuItem
            icon="🚪"
            title="Logout"
            onPress={handleLogout}
            showArrow={false}
            danger
          />
        </Card>

        {/* App Version */}
        <Text variant="caption" color="tertiary" center style={styles.version}>
          CREDApp v1.0.0
        </Text>

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
  pageTitle: {
    marginBottom: 20,
  },
  userCard: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberBadge: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  sectionTitle: {
    marginBottom: 8,
    marginTop: 8,
    marginLeft: 4,
  },
  menuCard: {
    marginBottom: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  version: {
    marginTop: 16,
  },
  bottomSpacer: {
    height: 100,
  },
});
