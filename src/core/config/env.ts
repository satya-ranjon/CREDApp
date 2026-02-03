/**
 * Environment Configuration
 * 
 * Centralized access to environment variables.
 * Uses react-native-config for .env file support.
 */

import Config from 'react-native-config';

export const env = {
  /** API base URL */
  apiUrl: Config.API_URL || 'https://api.example.com',
  
  /** API request timeout in ms */
  apiTimeout: parseInt(Config.API_TIMEOUT || '30000', 10),
  
  /** Current environment */
  environment: Config.ENVIRONMENT || 'development',
  
  /** Is development mode */
  isDev: (Config.ENVIRONMENT || 'development') === 'development',
  
  /** Is production mode */
  isProd: (Config.ENVIRONMENT || 'development') === 'production',
} as const;

export type Env = typeof env;

