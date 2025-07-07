import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#FF6B35', // Saffron
    secondary: '#0B4F8C', // Deep blue
    tertiary: '#F5F5F5',
    surface: '#FFFFFF',
    background: '#F8F9FA',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSurface: '#0B4F8C',
    onBackground: '#212529',
  },
  roundness: 8,
};

export const colors = {
  primary: '#FF6B35',
  secondary: '#0B4F8C', 
  background: '#F8F9FA',
  surface: '#FFFFFF',
  text: '#212529',
  textSecondary: '#6C757D',
  border: '#DEE2E6',
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
};