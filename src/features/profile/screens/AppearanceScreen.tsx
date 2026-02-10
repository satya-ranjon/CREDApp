/**
 * Appearance Screen
 *
 * Allows users to customize app appearance (dark mode, themes).
 */
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Card, useTheme } from '@/design-system';

interface ThemeOption {
  id: string;
  name: string;
  primaryColor: string;
  backgroundColor: string;
  accentColor: string;
}

const themeOptions: ThemeOption[] = [
  {
    id: 'dark-gold',
    name: 'Dark Gold',
    primaryColor: '#121212',
    backgroundColor: '#1C1C1E',
    accentColor: '#D4AF37',
  },
  {
    id: 'dark-blue',
    name: 'Dark Blue',
    primaryColor: '#0A1929',
    backgroundColor: '#132F4C',
    accentColor: '#5090D3',
  },
  {
    id: 'dark-purple',
    name: 'Dark Purple',
    primaryColor: '#1A1A2E',
    backgroundColor: '#16213E',
    accentColor: '#9D4EDD',
  },
  {
    id: 'dark-green',
    name: 'Dark Green',
    primaryColor: '#0D1F22',
    backgroundColor: '#1A3C40',
    accentColor: '#2EC4B6',
  },
];

interface ThemeCardProps {
  theme: ThemeOption;
  isSelected: boolean;
  onSelect: (theme: ThemeOption) => void;
}

function ThemeCard({ theme: themeOption, isSelected, onSelect }: ThemeCardProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.themeCard,
        { borderColor: isSelected ? theme.colors.interactive.secondary : 'transparent' },
      ]}
      onPress={() => onSelect(themeOption)}
    >
      <View style={styles.themePreview}>
        <View style={[styles.colorSwatch, { backgroundColor: themeOption.primaryColor }]} />
        <View style={[styles.colorSwatch, { backgroundColor: themeOption.backgroundColor }]} />
        <View style={[styles.colorSwatch, { backgroundColor: themeOption.accentColor }]} />
      </View>
      <Text variant="body.small" center style={{ marginTop: 8 }}>
        {themeOption.name}
      </Text>
      {isSelected && (
        <View
          style={[styles.selectedBadge, { backgroundColor: theme.colors.interactive.secondary }]}
        >
          <Text variant="label.small" style={{ color: theme.palette.black[900] }}>
            ✓
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export function AppearanceScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<string>('dark-gold');
  const [useSystemTheme, setUseSystemTheme] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const handleThemeSelect = (themeOption: ThemeOption) => {
    setSelectedTheme(themeOption.id);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background.primary} />

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 8,
            backgroundColor: theme.colors.background.primary,
          },
        ]}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text variant="heading.h3">←</Text>
        </TouchableOpacity>
        <Text variant="heading.h3">Appearance</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Dark Mode Toggle */}
        <Card variant="flat" style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text variant="body.regular">Dark Mode</Text>
              <Text variant="caption" color="secondary">
                Enable dark theme for comfortable viewing
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{
                false: theme.colors.background.tertiary,
                true: theme.colors.interactive.secondary,
              }}
              thumbColor="#fff"
            />
          </View>
        </Card>

        {/* System Theme Toggle */}
        <Card variant="flat" style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text variant="body.regular">Use System Theme</Text>
              <Text variant="caption" color="secondary">
                Match your device's appearance settings
              </Text>
            </View>
            <Switch
              value={useSystemTheme}
              onValueChange={setUseSystemTheme}
              trackColor={{
                false: theme.colors.background.tertiary,
                true: theme.colors.interactive.secondary,
              }}
              thumbColor="#fff"
            />
          </View>
        </Card>

        {/* Theme Selection */}
        <Text variant="label.small" color="secondary" style={styles.sectionTitle}>
          COLOR THEME
        </Text>
        <View style={styles.themeGrid}>
          {themeOptions.map((themeOption) => (
            <ThemeCard
              key={themeOption.id}
              theme={themeOption}
              isSelected={selectedTheme === themeOption.id}
              onSelect={handleThemeSelect}
            />
          ))}
        </View>

        {/* Reduce Motion */}
        <Text variant="label.small" color="secondary" style={styles.sectionTitle}>
          ACCESSIBILITY
        </Text>
        <Card variant="flat" style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text variant="body.regular">Reduce Motion</Text>
              <Text variant="caption" color="secondary">
                Minimize animations throughout the app
              </Text>
            </View>
            <Switch
              value={reduceMotion}
              onValueChange={setReduceMotion}
              trackColor={{
                false: theme.colors.background.tertiary,
                true: theme.colors.interactive.secondary,
              }}
              thumbColor="#fff"
            />
          </View>
        </Card>

        {/* Preview */}
        <Text variant="label.small" color="secondary" style={styles.sectionTitle}>
          PREVIEW
        </Text>
        <Card variant="elevated" style={styles.previewCard}>
          <View style={styles.previewHeader}>
            <View
              style={[
                styles.previewAvatar,
                { backgroundColor: theme.colors.interactive.secondary },
              ]}
            >
              <Text variant="body.small" style={{ color: theme.palette.black[900] }}>
                U
              </Text>
            </View>
            <View>
              <Text variant="body.regular">User Name</Text>
              <Text variant="caption" color="secondary">
                Just now
              </Text>
            </View>
          </View>
          <Text variant="body.small" color="secondary" style={{ marginTop: 12 }}>
            This is a preview of how your app will look with the selected theme settings.
          </Text>
          <View style={styles.previewButtons}>
            <TouchableOpacity
              style={[
                styles.previewButton,
                { backgroundColor: theme.colors.interactive.secondary },
              ]}
            >
              <Text variant="body.small" style={{ color: theme.palette.black[900] }}>
                Primary
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.previewButtonOutline, { borderColor: theme.colors.border.default }]}
            >
              <Text variant="body.small" color="secondary">
                Secondary
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  settingCard: {
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 12,
    marginLeft: 4,
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  themeCard: {
    width: '46%',
    marginHorizontal: '2%',
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  themePreview: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  colorSwatch: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  selectedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewCard: {
    marginTop: 4,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  previewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewButtons: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  previewButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  previewButtonOutline: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
  },
});
