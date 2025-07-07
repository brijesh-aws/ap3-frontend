import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

// Import web app components
import WebApp from './client/src/App';

export default function App() {
  // For web platform, use the existing web app
  if (Platform.OS === 'web') {
    return (
      <>
        <StatusBar style="auto" />
        <WebApp />
      </>
    );
  }

  // For mobile platforms, use the mobile app
  const MobileApp = require('./mobile/App').default;
  return <MobileApp />;
}