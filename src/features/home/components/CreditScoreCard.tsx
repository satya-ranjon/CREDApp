/**
 * Credit Score Card Component
 * 
 * Premium animated credit score display inspired by CRED.
 * Shows score with circular progress indicator and status.
 */

import React, { memo, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { getCreditScoreLabel, CREDIT_SCORE } from '@/core/config';
import { Text, Card, useTheme, Theme } from '@/design-system';

interface CreditScoreCardProps {
  score: number;
  lastUpdated?: string;
  onPress?: () => void;
}

/**
 * Get color based on credit score
 */
function getScoreColor(score: number, colors: Theme['colors']): string {
  if (score >= CREDIT_SCORE.EXCELLENT_MIN) return colors.creditScore.excellent;
  if (score >= CREDIT_SCORE.GOOD_MIN) return colors.creditScore.good;
  if (score >= CREDIT_SCORE.FAIR_MIN) return colors.creditScore.fair;
  if (score >= CREDIT_SCORE.POOR_MIN) return colors.creditScore.poor;
  return colors.creditScore.veryPoor;
}

export const CreditScoreCard = memo(function CreditScoreCard({
  score,
  lastUpdated,
  onPress,
}: CreditScoreCardProps) {
  const { theme } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scoreLabel = getCreditScoreLabel(score);
  const scoreColor = getScoreColor(score, theme.colors);
  
  // Calculate progress (0-1) for circular indicator
  const progress = (score - CREDIT_SCORE.MIN) / (CREDIT_SCORE.MAX - CREDIT_SCORE.MIN);

  useEffect(() => {
    // Animate the score on mount
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  // Animated scale for entrance effect
  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
  });

  return (
    <Card 
      variant="elevated" 
      padding="lg" 
      style={styles.container}
      onPress={onPress}
    >
      <Animated.View style={[styles.content, { transform: [{ scale }], opacity }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="label.small" color="secondary">
            YOUR CREDIT SCORE
          </Text>
          <View 
            style={[
              styles.statusBadge, 
              { backgroundColor: `${scoreColor}20` }
            ]}
          >
            <Text 
              variant="label.small" 
              style={{ color: scoreColor }}
            >
              {scoreLabel.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Score Display */}
        <View style={styles.scoreContainer}>
          <View style={styles.scoreCircle}>
            {/* Outer ring */}
            <View 
              style={[
                styles.outerRing, 
                { borderColor: theme.colors.border.default }
              ]} 
            />
            
            {/* Progress ring (simplified - in production use SVG or react-native-svg) */}
            <View 
              style={[
                styles.progressRing,
                { 
                  borderColor: scoreColor,
                  borderRightColor: 'transparent',
                  borderBottomColor: progress > 0.5 ? scoreColor : 'transparent',
                  transform: [{ rotate: `${progress * 360}deg` }],
                } as const,
              ]} 
            />

            {/* Score value */}
            <View style={styles.scoreValue}>
              <Text 
                variant="display.large" 
                style={[styles.score, { color: scoreColor }]}
              >
                {score}
              </Text>
              <Text variant="caption" color="secondary">
                out of {CREDIT_SCORE.MAX}
              </Text>
            </View>
          </View>
        </View>

        {/* Score range indicator */}
        <View style={styles.rangeContainer}>
          <View style={styles.rangeBar}>
            <View 
              style={[
                styles.rangeFill, 
                { 
                  width: `${progress * 100}%`,
                  backgroundColor: scoreColor,
                }
              ]} 
            />
            <View 
              style={[
                styles.rangeIndicator,
                { 
                  left: `${progress * 100}%`,
                  backgroundColor: scoreColor,
                }
              ]} 
            />
          </View>
          <View style={styles.rangeLabels}>
            <Text variant="caption" color="tertiary">{CREDIT_SCORE.MIN}</Text>
            <Text variant="caption" color="tertiary">{CREDIT_SCORE.MAX}</Text>
          </View>
        </View>

        {/* Last updated */}
        {lastUpdated && (
          <Text 
            variant="caption" 
            color="tertiary" 
            center 
            style={styles.lastUpdated}
          >
            Last updated: {lastUpdated}
          </Text>
        )}

        {/* CTA */}
        <View style={styles.ctaContainer}>
          <Text variant="body.small" color="accent">
            Tap to view credit report →
          </Text>
        </View>
      </Animated.View>
    </Card>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  content: {
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreContainer: {
    marginVertical: 16,
  },
  scoreCircle: {
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  outerRing: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 8,
    opacity: 0.3,
  },
  progressRing: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 8,
  },
  scoreValue: {
    alignItems: 'center',
  },
  score: {
    fontSize: 48,
    fontWeight: '700',
  },
  rangeContainer: {
    width: '100%',
    marginTop: 24,
  },
  rangeBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    position: 'relative',
  },
  rangeFill: {
    position: 'absolute',
    height: '100%',
    borderRadius: 2,
  },
  rangeIndicator: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    top: -4,
    marginLeft: -6,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  lastUpdated: {
    marginTop: 16,
  },
  ctaContainer: {
    marginTop: 16,
    padding: 8,
  },
});
