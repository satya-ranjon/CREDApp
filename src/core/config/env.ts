/**
 * Environment Configuration
 * 
 * Centralized access to environment variables.
 * Uses react-native-config for .env file support.
 * 
 * Note: For this to work, you need to:
 * 1. npm install react-native-config
 * 2. Create .env files (.env.development, .env.production)
 * 3. Follow platform-specific setup for react-native-config
 * 
 * For now, we use fallback values for development.
 */

// Try to import from react-native-config if available
// Fallback to defaults for initial development
const Config = {
  API_URL: 'https://api.example.com',
  API_TIMEOUT: '30000',
  ENVIRONMENT: 'development',
};

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
