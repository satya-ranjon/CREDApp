/**
 * Navigation Type Definitions
 *
 * Type-safe navigation with React Navigation.
 * All screen params are defined here for autocomplete.
 */

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Root Stack - Controls auth flow
 */
export type RootStackParamList = {
  Splash: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  AddCard: undefined;
  AllTransactions: undefined;
  AllActivity: undefined;
  EditProfile: undefined;
  LinkedCards: undefined;
  Appearance: undefined;
};

/**
 * Auth Stack - Login/Register flow
 */
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

/**
 * Main Tab Navigator
 */
export type MainTabParamList = {
  Home: undefined;
  Rewards: undefined;
  Cards: undefined;
  Profile: undefined;
};

/**
 * Screen props types for each navigator
 */
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

/**
 * Global type declaration for useNavigation hook
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
