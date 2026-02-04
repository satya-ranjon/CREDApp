/**
 * Add Card Screen
 * 
 * Form to add a new credit card manually.
 */

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, useTheme } from '@/design-system';
import { CreditCardVisual, CardNetwork, CreditCard } from '../components';

export function AddCardScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // Error state
  const [errors, setErrors] = useState<{
    cardNumber?: string;
    cardHolder?: string;
    expiry?: string;
    cvv?: string;
  }>({});
  
  // Derived state for preview
  const cardPreview: CreditCard = {
    id: 'preview',
    cardNumber: cardNumber.slice(-4) || '0000',
    cardholderName: cardHolder || 'YOUR NAME',
    expiryMonth: expiry.split('/')[0] || 'MM',
    expiryYear: expiry.split('/')[1] || 'YY',
    network: detectNetwork(cardNumber),
    type: 'credit',
    bankName: 'New Bank',
    outstandingAmount: 0,
    dueDate: new Date().toISOString().split('T')[0],
    rewardsPoints: 0,
    color: theme.colors.background.tertiary,
  };

  function detectNetwork(number: string): CardNetwork {
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5')) return 'mastercard';
    if (number.startsWith('3')) return 'amex';
    return 'visa'; // default
  }

  const validateCardNumber = (number: string) => {
    if (number.length < 15) return 'Card number is too short';
    if (!/^\d+$/.test(number.replace(/\s/g, ''))) return 'Invalid card number';
    return undefined;
  };

  const validateExpiry = (date: string) => {
    if (!/^\d{2}\/\d{2}$/.test(date)) return 'Invalid date (MM/YY)';
    const [month, year] = date.split('/');
    if (parseInt(month, 10) > 12 || parseInt(month, 10) < 1) return 'Invalid month';
    
    // Check if expired
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const expiryYear = parseInt(year, 10);
    const expiryMonth = parseInt(month, 10);

    if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
      return 'Card has expired';
    }

    return undefined;
  };

  const handleAddCard = () => {
    const newErrors = {
      cardNumber: validateCardNumber(cardNumber),
      cardHolder: !cardHolder ? 'Name is required' : undefined,
      expiry: validateExpiry(expiry),
      cvv: cvv.length < 3 ? 'Invalid CVV' : undefined,
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some(error => error !== undefined)) {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {/* ... Header ... */}
      <View style={[styles.header, { marginTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text variant="heading.h3" color="primary">←</Text>
        </TouchableOpacity>
        <Text variant="heading.h3">Add New Card</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.previewContainer}>
          <CreditCardVisual card={cardPreview} />
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text variant="label.small" style={styles.label}>CARD NUMBER</Text>
            <TextInput
              style={[
                styles.input, 
                { 
                  color: theme.colors.text.primary, 
                  borderColor: errors.cardNumber ? theme.colors.status.error : theme.colors.border.default 
                }
              ]}
              placeholder="0000 0000 0000 0000"
              placeholderTextColor={theme.colors.text.tertiary}
              keyboardType="number-pad"
              maxLength={19}
              value={cardNumber}
              onChangeText={(text) => {
                setCardNumber(text);
                if (errors.cardNumber) setErrors({...errors, cardNumber: undefined});
              }}
            />
            {errors.cardNumber && (
              <Text variant="caption" color="error" style={styles.errorText}>{errors.cardNumber}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text variant="label.small" style={styles.label}>CARD HOLDER NAME</Text>
            <TextInput
              style={[
                styles.input, 
                { 
                  color: theme.colors.text.primary, 
                  borderColor: errors.cardHolder ? theme.colors.status.error : theme.colors.border.default 
                }
              ]}
              placeholder="JOHN DOE"
              placeholderTextColor={theme.colors.text.tertiary}
              autoCapitalize="characters"
              value={cardHolder}
              onChangeText={(text) => {
                setCardHolder(text);
                if (errors.cardHolder) setErrors({...errors, cardHolder: undefined});
              }}
            />
            {errors.cardHolder && (
              <Text variant="caption" color="error" style={styles.errorText}>{errors.cardHolder}</Text>
            )}
          </View>

          <View style={styles.row}>
            <View style={styles.expiryContainer}>
              <Text variant="label.small" style={styles.label}>EXPIRY DATE</Text>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    color: theme.colors.text.primary, 
                    borderColor: errors.expiry ? theme.colors.status.error : theme.colors.border.default 
                  }
                ]}
                placeholder="MM/YY"
                placeholderTextColor={theme.colors.text.tertiary}
                maxLength={5}
                value={expiry}
                onChangeText={(text) => {
                  setExpiry(text);
                  if (errors.expiry) setErrors({...errors, expiry: undefined});
                }}
              />
               {errors.expiry && (
                <Text variant="caption" color="error" style={styles.errorText}>{errors.expiry}</Text>
              )}
            </View>

            <View style={styles.cvvContainer}>
              <Text variant="label.small" style={styles.label}>CVV</Text>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    color: theme.colors.text.primary, 
                    borderColor: errors.cvv ? theme.colors.status.error : theme.colors.border.default 
                  }
                ]}
                placeholder="123"
                placeholderTextColor={theme.colors.text.tertiary}
                keyboardType="number-pad"
                maxLength={4}
                secureTextEntry
                value={cvv}
                onChangeText={(text) => {
                  setCvv(text);
                  if (errors.cvv) setErrors({...errors, cvv: undefined});
                }}
              />
              {errors.cvv && (
                <Text variant="caption" color="error" style={styles.errorText}>{errors.cvv}</Text>
              )}
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, { backgroundColor: theme.colors.interactive.primary }]}
            onPress={handleAddCard}
          >
            <Text variant="label.large" style={{ color: theme.colors.text.inverse }}>Add Card</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  content: {
    paddingBottom: 40,
  },
  previewContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  form: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
    opacity: 0.7,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular', // Assuming Inter font is available, fallback if not
  },
  row: {
    flexDirection: 'row',
  },
  submitButton: {
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  headerSpacer: {
    width: 40,
  },
  expiryContainer: {
    flex: 1,
    marginRight: 16,
  },
  cvvContainer: {
    flex: 1,
  },
  errorText: {
    marginTop: 4,
  },
});
