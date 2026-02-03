declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL?: string;
    API_TIMEOUT?: string;
    ENVIRONMENT?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
