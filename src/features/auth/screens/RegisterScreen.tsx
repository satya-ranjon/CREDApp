/**
 * Register Screen
 * 
 * New user registration with form validation.
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

export function RegisterScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { register, isLoading, error, clearError } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, email, phone, password, confirmPassword]);

  const handleRegister = useCallback(async () => {
    if (!validateForm()) return;

    try {
      await register({ name, email, phone, password });
      // Navigation happens automatically via RootNavigator
    } catch {
      // Error handling is done in useAuth hook
    }
  }, [name, email, phone, password, register, validateForm]);

  const handleLogin = useCallback(() => {
    clearError();
    navigation.goBack();
  }, [navigation, clearError]);

  const clearFieldError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
    clearError();
  };

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
            { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <TouchableOpacity onPress={handleLogin} style={styles.backButton}>
            <Text variant="body.large">← Back</Text>
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Text variant="heading.h1">Create Account</Text>
            <Text variant="body.regular" color="secondary" style={styles.subtitle}>
              Join CRED and start managing your credit journey
            </Text>
          </View>

          {/* Register Form */}
          <Card style={styles.formCard}>
            <Input
              label="Full Name"
              placeholder="Enter your name"
              value={name}
              onChangeText={(text) => {
                setName(text);
                clearFieldError('name');
              }}
              autoCapitalize="words"
              error={errors.name}
              editable={!isLoading}
            />

            <View style={styles.inputSpacing} />

            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                clearFieldError('email');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              editable={!isLoading}
            />

            <View style={styles.inputSpacing} />

            <Input
              label="Phone Number"
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                clearFieldError('phone');
              }}
              keyboardType="phone-pad"
              error={errors.phone}
              editable={!isLoading}
            />

            <View style={styles.inputSpacing} />

            <Input
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                clearFieldError('password');
              }}
              secureTextEntry
              error={errors.password}
              editable={!isLoading}
            />

            <View style={styles.inputSpacing} />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                clearFieldError('confirmPassword');
              }}
              secureTextEntry
              error={errors.confirmPassword}
              editable={!isLoading}
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
              onPress={handleRegister}
              loading={isLoading}
              fullWidth
              style={styles.submitButton}
            >
              Create Account
            </Button>
          </Card>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text variant="body.regular" color="secondary">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text variant="body.regular" color="accent">
                Login
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
  backButton: {
    marginBottom: 16,
    padding: 8,
    alignSelf: 'flex-start',
  },
  header: {
    marginBottom: 24,
  },
  subtitle: {
    marginTop: 8,
  },
  formCard: {
    marginBottom: 24,
  },
  inputSpacing: {
    height: 12,
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
