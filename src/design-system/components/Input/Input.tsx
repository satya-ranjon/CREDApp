/**
 * Input Component
 * 
 * A themed text input with validation states.
 * 
 * Usage:
 * <Input
 *   label="Email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChangeText={setEmail}
 *   error="Invalid email format"
 * />
 */

import React, { memo, useState, useCallback } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import { useTheme } from '../../theme';
import { Text } from '../Text';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  /** Input label */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Right icon press handler */
  onRightIconPress?: () => void;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Input style override */
  inputStyle?: TextStyle;
}

export const Input = memo(function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  onFocus,
  onBlur,
  editable = true,
  ...rest
}: InputProps) {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback<NonNullable<TextInputProps['onFocus']>>(
    (e) => {
      setIsFocused(true);
      onFocus?.(e);
    },
    [onFocus]
  );

  const handleBlur = useCallback<NonNullable<TextInputProps['onBlur']>>(
    (e) => {
      setIsFocused(false);
      onBlur?.(e);
    },
    [onBlur]
  );

  const inputContainerStyles: ViewStyle = {
    ...styles.inputContainer,
    backgroundColor: theme.colors.background.tertiary,
    borderColor: error
      ? theme.colors.status.error
      : isFocused
      ? theme.colors.border.focus
      : theme.colors.border.default,
    borderRadius: theme.borderRadius.md,
    opacity: editable ? 1 : 0.6,
  };

  const inputStyles: TextStyle = {
    ...styles.input,
    ...theme.typography.body.regular,
    color: theme.colors.text.primary,
    ...inputStyle,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text variant="label.regular" color="secondary" style={styles.label}>
          {label}
        </Text>
      )}

      <View style={inputContainerStyles}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          style={inputStyles}
          placeholderTextColor={theme.colors.text.tertiary}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={editable}
          {...rest}
        />

        {rightIcon && (
          <Pressable
            onPress={onRightIconPress}
            style={styles.rightIcon}
            hitSlop={8}
          >
            {rightIcon}
          </Pressable>
        )}
      </View>

      {(error || helperText) && (
        <Text
          variant="caption"
          color={error ? 'error' : 'secondary'}
          style={styles.helperText}
        >
          {error || helperText}
        </Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    minHeight: 52,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
  },
  leftIcon: {
    marginRight: 12,
  },
  rightIcon: {
    marginLeft: 12,
  },
  helperText: {
    marginTop: 6,
  },
});
