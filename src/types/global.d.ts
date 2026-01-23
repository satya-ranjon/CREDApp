/**
 * Global Type Declarations
 * 
 * Extends built-in types and declares ambient modules.
 */

/// <reference types="react" />
/// <reference types="react-native" />

/**
 * Extend React Native's Image source to include custom properties if needed
 */
declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.jpeg' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.gif' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

/**
 * Environment variable declarations (if using react-native-config)
 */
declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL?: string;
    API_TIMEOUT?: string;
    ENVIRONMENT?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
