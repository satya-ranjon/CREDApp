/**
 * Main Navigator
 * 
 * Bottom tab navigator for authenticated users.
 * Contains: Home, Rewards, Cards, Profile
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MainTabParamList } from './navigationTypes';
import { useTheme, Text } from '@/design-system';
import { HomeScreen } from '@/features/home/screens/HomeScreen';
import { ProfileScreen } from '@/features/profile/screens/ProfileScreen';
import { RewardsScreen } from '@/features/rewards/screens/RewardsScreen';


const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * Tab Icon Component
 * Simple text-based icons (can be replaced with vector icons)
 */
function TabIcon({ icon, focused }: { icon: string; focused: boolean }) {
  return (
    <View style={styles.iconContainer}>
      <Text 
        variant="body.large" 
        style={focused ? styles.iconTextFocused : styles.iconTextUnfocused}
      >
        {icon}
      </Text>
    </View>
  );
}

// Stable icon components defined outside of MainNavigator to avoid re-creation on each render
function HomeTabIcon({ focused }: { focused: boolean }) {
  return <TabIcon icon="🏠" focused={focused} />;
}

function RewardsTabIcon({ focused }: { focused: boolean }) {
  return <TabIcon icon="🎁" focused={focused} />;
}

function CardsTabIcon({ focused }: { focused: boolean }) {
  return <TabIcon icon="💳" focused={focused} />;
}

function ProfileTabIcon({ focused }: { focused: boolean }) {
  return <TabIcon icon="👤" focused={focused} />;
}

export function MainNavigator() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
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
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: HomeTabIcon,
        }}
      />
      <Tab.Screen 
        name="Rewards" 
        component={RewardsScreen}
        options={{
          tabBarIcon: RewardsTabIcon,
        }}
      />
      {/* Cards screen - placeholder for now */}
      <Tab.Screen 
        name="Cards" 
        component={HomeScreen} 
        options={{ 
          tabBarLabel: 'Cards',
          tabBarIcon: CardsTabIcon,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ProfileTabIcon,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTextFocused: {
    fontSize: 24,
    opacity: 1,
  },
  iconTextUnfocused: {
    fontSize: 24,
    opacity: 0.5,
  },
});
