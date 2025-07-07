# BAPS Temple Finder - Mobile App

A native iOS and Android app for finding BAPS temples across North America with interactive mapping and location-based search capabilities.

## Features

- 🔍 **Smart Search**: Find temples by zip code or current location
- 🗺️ **Native Maps**: Interactive maps with temple markers and directions
- 📱 **Native Experience**: Built with React Native for optimal performance
- 📍 **GPS Integration**: Real-time location services for temple discovery
- 🏛️ **Comprehensive Database**: All BAPS temples across North America
- 📞 **Direct Actions**: Call, email, and get directions with one tap

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`
- For iOS development: Xcode and iOS Simulator
- For Android development: Android Studio and Android Emulator

## Installation & Setup

1. **Navigate to the mobile directory:**
   ```bash
   cd mobile
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Expo development server:**
   ```bash
   npm start
   ```

## Running on iOS Simulator

1. **Make sure you have Xcode installed** (Mac only)
2. **Start the development server:**
   ```bash
   npm run ios
   ```
   Or use the Expo CLI:
   ```bash
   expo start --ios
   ```

3. **Alternative method:**
   ```bash
   npm start
   ```
   Then press `i` in the terminal to open iOS simulator.

## Running on Android Emulator

1. **Make sure you have Android Studio installed**
2. **Start an Android emulator from Android Studio**
3. **Start the development server:**
   ```bash
   npm run android
   ```
   Or use the Expo CLI:
   ```bash
   expo start --android
   ```

## Running on Physical Device

1. **Install Expo Go from the App Store (iOS) or Google Play (Android)**
2. **Start the development server:**
   ```bash
   npm start
   ```
3. **Scan the QR code** displayed in the terminal with your device camera (iOS) or Expo Go app (Android)

## Backend Server Setup

The mobile app connects to the backend server for temple data. Make sure the backend is running:

1. **Navigate to the root directory:**
   ```bash
   cd ..
   ```

2. **Start the backend server:**
   ```bash
   npm run dev
   ```

3. **Update API URL** in `mobile/src/services/TempleService.ts` if needed:
   ```typescript
   const API_BASE_URL = 'http://localhost:5000/api'; // For local development
   ```

## Project Structure

```
mobile/
├── App.tsx                 # Main app component
├── src/
│   ├── screens/           # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── MapScreen.tsx
│   │   ├── TempleDetailsScreen.tsx
│   │   └── SupportScreen.tsx
│   ├── services/          # API services
│   │   └── TempleService.ts
│   ├── types/             # TypeScript types
│   │   └── Temple.ts
│   └── theme/             # App theming
│       └── theme.ts
├── assets/                # Images and icons
├── app.json               # Expo configuration
└── package.json           # Dependencies
```

## Native Features

### iOS Integration
- Native map integration with Apple Maps
- GPS location services
- Native calling and email functionality
- iOS-specific styling and behavior

### Android Integration
- Google Maps integration
- Location services
- Native intents for calling and email
- Material Design components

## Building for Production

### iOS (requires Mac)
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

### Using Expo EAS Build (recommended)
```bash
npm install -g eas-cli
eas login
eas build --platform all
```

## API Configuration

For production deployment, update the API base URL in `TempleService.ts`:

```typescript
const API_BASE_URL = 'https://your-production-api.com/api';
```

## Permissions

The app requires the following permissions:
- **Location Services**: To find nearby temples using GPS
- **Internet Access**: To fetch temple data and maps

## Support

For questions or support, contact the development team:
- **Anssh Prajapati** - ansshprajapati11@gmail.com
- **Pujan Patel** - pujanpatel.2004@gmail.com  
- **Shail Patel** - shailpatel.2003@gmail.com

## About BAPS

Visit [baps.org](https://baps.org) to learn more about BAPS Swaminarayan Sanstha.