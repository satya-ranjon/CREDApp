module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@/core': './src/core',
          '@/design-system': './src/design-system',
          '@/features': './src/features',
          '@/navigation': './src/navigation',
          '@/shared': './src/shared',
          '@/store': './src/store',
          '@/types': './src/types',
          '@/localization': './src/localization',
          '@/assets': './assets',
        },
      },
    ],
  ],
};
