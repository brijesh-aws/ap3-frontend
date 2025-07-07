import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import TempleDetailsScreen from './src/screens/TempleDetailsScreen';
import MapScreen from './src/screens/MapScreen';
import SupportScreen from './src/screens/SupportScreen';

import { theme } from './src/theme/theme';

export type RootStackParamList = {
  Home: undefined;
  TempleDetails: { temple: any };
  Map: { temples: any[]; userLocation?: { latitude: number; longitude: number } };
  Support: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#0B4F8C', // Deep blue
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 18,
              },
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ title: 'BAPS Temple Finder' }}
            />
            <Stack.Screen 
              name="TempleDetails" 
              component={TempleDetailsScreen}
              options={{ title: 'Temple Details' }}
            />
            <Stack.Screen 
              name="Map" 
              component={MapScreen}
              options={{ title: 'Temple Map' }}
            />
            <Stack.Screen 
              name="Support" 
              component={SupportScreen}
              options={{ title: 'Support' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}