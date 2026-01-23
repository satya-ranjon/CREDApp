/**
 * Login Screen
 * 
 * User authentication with email and password.
 * Features:
 * - Form validation
 * - Loading states
 * - Error handling
 * - Navigation to Register
 */

import { useNavigation } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';
import { Text, Button, Input, Card, useTheme } from '@/design-system';
import type { AuthStackScreenProps } from '@/navigation';

export function LoginScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<AuthStackScreenProps<'Login'>['navigation']>();
  const { login, isLoading, error, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Form validation
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = useCallback((): boolean => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    return isValid;
  }, [email, password]);

  const handleLogin = useCallback(async () => {
    if (!validateForm()) return;

    try {
      await login({ email, password });
      // Navigation happens automatically via RootNavigator
    } catch {
      // Error handling is done in useAuth hook
    }
  }, [email, password, login, validateForm]);

  const handleRegister = useCallback(() => {
    clearError();
    navigation.navigate('Register');
  }, [navigation, clearError]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background.primary} />
      
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 20 },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text variant="display.medium" color="accent">
              CRED
            </Text>
            <Text variant="heading.h3" style={styles.welcomeText}>
              Welcome back
            </Text>
            <Text variant="body.regular" color="secondary">
              Login to manage your credit cards and rewards
            </Text>
          </View>

          {/* Login Form */}
          <Card style={styles.formCard}>
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError('');
                clearError();
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error={emailError}
              editable={!isLoading}
            />

            <View style={styles.inputSpacing} />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError('');
                clearError();
              }}
              secureTextEntry={!showPassword}
              error={passwordError}
              editable={!isLoading}
              rightIcon={
                <Text variant="caption" color="secondary">
                  {showPassword ? '🙈' : '👁️'}
                </Text>
              }
              onRightIconPress={() => setShowPassword(!showPassword)}
            />

            {/* API Error */}
            {error && (
              <View style={styles.errorContainer}>
                <Text variant="body.small" color="error">
                  {error}
                </Text>
              </View>
            )}

            {/* Submit Button */}
            <Button
              onPress={handleLogin}
              loading={isLoading}
              fullWidth
              style={styles.submitButton}
            >
              Login
            </Button>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPassword}>
              <Text variant="body.small" color="accent">
                Forgot password?
              </Text>
            </TouchableOpacity>
          </Card>

          {/* Register Link */}
          <View style={styles.registerContainer}>
            <Text variant="body.regular" color="secondary">
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text variant="body.regular" color="accent">
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  welcomeText: {
    marginTop: 24,
    marginBottom: 8,
  },
  formCard: {
    marginBottom: 24,
  },
  inputSpacing: {
    height: 16,
  },
  errorContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(239, 83, 80, 0.1)',
    borderRadius: 8,
  },
  submitButton: {
    marginTop: 24,
  },
  forgotPassword: {
    alignSelf: 'center',
    marginTop: 16,
    padding: 8,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
