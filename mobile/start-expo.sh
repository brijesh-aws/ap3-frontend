#!/bin/bash

echo "🕉️  Starting BAPS Temple Finder Mobile App"
echo "=========================================="
echo ""

# Check if we're in the mobile directory
if [ ! -f "App.tsx" ]; then
    echo "❌ Error: Please run this script from the mobile directory"
    echo "Usage: cd mobile && ./start-expo.sh"
    exit 1
fi

# Check if Expo CLI is available
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npx is not available. Please install Node.js"
    exit 1
fi

echo "📱 Starting Expo development server..."
echo ""
echo "Available options:"
echo "  - Press 'i' to run on iOS Simulator"
echo "  - Press 'a' to run on Android Emulator"
echo "  - Press 'w' to run on Web Browser"
echo "  - Scan QR code with Expo Go app on your phone"
echo ""
echo "Note: Make sure your backend server is running on http://localhost:5000"
echo ""

# Start Expo with web support
npx expo start --web