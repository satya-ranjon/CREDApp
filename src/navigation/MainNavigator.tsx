/**
 * Main Navigator
 * 
 * Bottom tab navigator for authenticated users.
 * Contains: Home, Rewards, Cards, Profile
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { MainTabParamList } from './navigationTypes';
import { HomeScreen } from '@/features/home/screens/HomeScreen';
import { RewardsScreen } from '@/features/rewards/screens/RewardsScreen';
import { ProfileScreen } from '@/features/profile/screens/ProfileScreen';
import { useTheme, Text } from '@/design-system';

const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * Tab Icon Component
 * Simple text-based icons (can be replaced with vector icons)
 */
function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  
  const icons: Record<string, string> = {
    Home: '🏠',
    Rewards: '🎁',
    Cards: '💳',
    Profile: '👤',
  };

  return (
    <View style={styles.iconContainer}>
      <Text 
        variant="body.large" 
        style={{ 
          opacity: focused ? 1 : 0.5,
          fontSize: 24,
        }}
      >
        {icons[label] || '●'}
      </Text>
    </View>
  );
}

export function MainNavigator() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background.secondary,
          borderTopColor: theme.colors.border.default,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.colors.interactive.secondary,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
        tabBarIcon: ({ focused }) => (
          <TabIcon label={route.name} focused={focused} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Rewards" component={RewardsScreen} />
      {/* Cards screen - placeholder for now */}
      <Tab.Screen 
        name="Cards" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'Cards' }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
