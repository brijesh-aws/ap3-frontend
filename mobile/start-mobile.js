#!/usr/bin/env node

/**
 * BAPS Temple Finder - Mobile App Starter
 * This script initializes and starts the React Native Expo app
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🕉️  BAPS Temple Finder - React Native App');
console.log('===============================================\n');

// Check if node_modules exists
if (!existsSync(join(__dirname, 'node_modules'))) {
  console.log('📦 Installing dependencies...');
  const install = spawn('npm', ['install'], {
    stdio: 'inherit',
    cwd: __dirname,
  });

  install.on('close', (code) => {
    if (code === 0) {
      startExpo();
    } else {
      console.error('❌ Failed to install dependencies');
      process.exit(1);
    }
  });
} else {
  startExpo();
}

function startExpo() {
  console.log('🚀 Starting Expo development server...\n');
  
  console.log('Available platforms:');
  console.log('📱 iOS Simulator: Press "i" in the terminal');
  console.log('🤖 Android Emulator: Press "a" in the terminal');
  console.log('📱 Physical Device: Scan QR code with Expo Go app');
  console.log('🌐 Web Browser: Press "w" in the terminal\n');
  
  console.log('🗺️  App Features:');
  console.log('   • Native temple search by zip code or GPS');
  console.log('   • Interactive maps with temple markers');
  console.log('   • One-tap calling and directions');
  console.log('   • Full offline capability after initial load');
  console.log('   • Optimized for iOS and Android\n');

  const expo = spawn('npx', ['expo', 'start'], {
    stdio: 'inherit',
    cwd: __dirname,
    env: {
      ...process.env,
      EXPO_DEVTOOLS: 'false'
    }
  });

  expo.on('error', (error) => {
    console.error('❌ Failed to start Expo:', error);
    console.log('\n💡 Try installing Expo CLI globally:');
    console.log('   npm install -g @expo/cli');
    process.exit(1);
  });

  expo.on('close', (code) => {
    if (code !== 0) {
      console.error(`❌ Expo exited with code ${code}`);
      process.exit(code);
    }
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n👋 Shutting down BAPS Temple Finder Mobile...');
    expo.kill('SIGINT');
    process.exit(0);
  });
}