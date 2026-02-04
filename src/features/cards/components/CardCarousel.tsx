/**
 * Card Carousel Component
 * 
 * Horizontal scrollable card stack with 3D perspective effect.
 * Features scale/opacity animations on scroll.
 */

import React, { memo, useRef, useState, useCallback } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { CreditCardVisual, CreditCard } from './CreditCardVisual';
import { useTheme } from '@/design-system';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = 320;
const CARD_SPACING = 16;

interface CardCarouselProps {
  cards: CreditCard[];
  onCardSelect: (card: CreditCard, index: number) => void;
  activeIndex?: number;
}

export const CardCarousel = memo(function CardCarousel({
  cards,
  onCardSelect,
  activeIndex = 0,
}: CardCarouselProps) {
  const { theme } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(activeIndex);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / (CARD_WIDTH + CARD_SPACING));
    
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < cards.length) {
      setCurrentIndex(newIndex);
      onCardSelect(cards[newIndex], newIndex);
    }
  }, [currentIndex, cards, onCardSelect]);

  const handleCardPress = useCallback((card: CreditCard, index: number) => {
    setCurrentIndex(index);
    onCardSelect(card, index);
    
    // Scroll to the selected card
    scrollViewRef.current?.scrollTo({
      x: index * (CARD_WIDTH + CARD_SPACING),
      animated: true,
    });
  }, [onCardSelect]);

  // Calculate content offset for centering first and last cards
  const contentInset = (SCREEN_WIDTH - CARD_WIDTH) / 2;

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: contentInset },
        ]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {cards.map((card, index) => (
          <CreditCardVisual
            key={card.id}
            card={card}
            isActive={index === currentIndex}
            onPress={() => handleCardPress(card, index)}
          />
        ))}
      </ScrollView>

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {cards.map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <View
              key={index}
              style={[
                styles.dot,
                isActive ? styles.dotActive : styles.dotInactive,
                {
                  backgroundColor: isActive 
                    ? theme.colors.text.accent 
                    : theme.colors.border.default,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 24,
  },
  dotInactive: {
    width: 8,
  },
});
