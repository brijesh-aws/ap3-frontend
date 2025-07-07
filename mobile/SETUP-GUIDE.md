# BAPS Temple Finder Mobile App - Setup Guide

## Quick Start

### 1. Prerequisites
- Node.js 18+ installed
- Backend server running (from main directory: `npm run dev`)

### 2. Install and Run
```bash
# Navigate to mobile directory
cd mobile

# Install dependencies (if not already installed)
npm install

# Start the Expo development server
npm start
```

### 3. View the App
Once the server starts, you'll see a QR code and options:
- **Web Browser**: Press `w` to open in browser
- **iOS Simulator**: Press `i` (requires Xcode on Mac)
- **Android Emulator**: Press `a` (requires Android Studio)
- **Physical Device**: Install Expo Go app and scan the QR code

## Current Features

The mobile app currently includes:
- ✅ **Temple Search**: Search by ZIP code
- ✅ **Backend Integration**: Connects to existing temple database
- ✅ **Responsive Design**: Optimized for mobile devices
- ✅ **Native Styling**: Material Design components
- ✅ **Error Handling**: User-friendly error messages

## How to Use

1. **Start Backend Server**:
   ```bash
   # From main project directory
   npm run dev
   ```

2. **Launch Mobile App**:
   ```bash
   # From mobile directory
   npm start
   ```

3. **Test the App**:
   - Enter a ZIP code (e.g., 12345, 90210, 10001)
   - Tap "Find Temples" to search
   - View results with temple details

## API Connection

The mobile app connects to your backend server at:
- **Local Development**: `http://localhost:5000/api`
- **Search Endpoint**: `POST /api/temples/search`

Make sure your backend server is running before testing the mobile app.

## Troubleshooting

### Common Issues:

**1. "Failed to fetch temples" Error**
- Ensure backend server is running (`npm run dev` from main directory)
- Check that server is accessible at `http://localhost:5000`

**2. Expo CLI Not Found**
- Install globally: `npm install -g @expo/cli`
- Or use npx: `npx expo start`

**3. Metro Bundler Issues**
- Clear cache: `npx expo start --clear`
- Restart the development server

**4. iOS Simulator Not Opening**
- Ensure Xcode is installed (Mac only)
- Try: `npx expo start --ios`

**5. Android Emulator Not Working**
- Ensure Android Studio is installed
- Start an Android Virtual Device first
- Try: `npx expo start --android`

## Development Notes

### Current Architecture
- **Framework**: React Native with Expo
- **Styling**: React Native StyleSheet
- **State Management**: React hooks (useState)
- **Network**: Fetch API for backend communication

### Future Enhancements (Available in Full Version)
- Native navigation between screens
- Interactive maps with temple markers
- GPS location detection
- Native calling and directions
- Advanced UI components

## Testing Different Platforms

### Web Browser (Easiest)
```bash
npm start
# Then press 'w' or visit the URL shown
```

### iOS Simulator (Mac Only)
```bash
# Ensure Xcode is installed
npm start
# Then press 'i'
```

### Android Emulator
```bash
# Ensure Android Studio is installed and AVD is running
npm start
# Then press 'a'
```

### Physical Device
1. Install "Expo Go" from App Store (iOS) or Google Play (Android)
2. Run `npm start` in mobile directory
3. Scan QR code with device camera (iOS) or Expo Go app (Android)

## Support

For issues with the mobile app:
1. Check that the backend server is running
2. Verify network connectivity
3. Try clearing the Expo cache: `npx expo start --clear`
4. Contact the development team if issues persist

The mobile app provides a native experience for finding BAPS temples with the same functionality as the web version.