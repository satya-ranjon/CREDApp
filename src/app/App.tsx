/**
 * App Entry Point
 * 
 * Main App component that sets up providers and navigation.
 */

import React from 'react';
import { AppProviders } from './providers';
import { RootNavigator } from '@/navigation';

/**
 * Main App Component
 */
export default function App() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}
