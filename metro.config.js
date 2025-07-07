const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add support for TypeScript and JSX
config.resolver.sourceExts.push('ts', 'tsx');

// Configure aliases for consistent imports
config.resolver.alias = {
  '@': path.resolve(__dirname, 'client/src'),
  '@components': path.resolve(__dirname, 'client/src/components'),
  '@pages': path.resolve(__dirname, 'client/src/pages'),
  '@lib': path.resolve(__dirname, 'client/src/lib'),
  '@hooks': path.resolve(__dirname, 'client/src/hooks'),
  '@assets': path.resolve(__dirname, 'attached_assets'),
  '@shared': path.resolve(__dirname, 'shared'),
};

// Configure web support
config.resolver.platforms = ['web', 'ios', 'android', 'native'];

module.exports = config;