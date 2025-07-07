#!/usr/bin/env node

/**
 * BAPS Temple Finder - Expo Web Application Starter
 * This script starts the entire application using Expo for cross-platform support
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🕉️  BAPS Temple Finder - Expo Universal App');
console.log('============================================\n');

console.log('🚀 Starting backend server...');
const backend = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  cwd: __dirname,
  env: {
    ...process.env,
    FORCE_COLOR: '1'
  }
});

// Wait a moment for backend to start
setTimeout(() => {
  console.log('\n📱 Starting Expo web application...');
  console.log('Available platforms:');
  console.log('  • Web Browser: Automatically opens');
  console.log('  • iOS: Press "i" or use "npm run expo:ios"');
  console.log('  • Android: Press "a" or use "npm run expo:android"');
  console.log('  • Mobile App: cd mobile && npm start\n');
  
  const expo = spawn('npx', ['expo', 'start', '--web'], {
    stdio: 'inherit',
    cwd: __dirname,
    env: {
      ...process.env,
      EXPO_DEVTOOLS: 'false'
    }
  });

  expo.on('error', (error) => {
    console.error('❌ Failed to start Expo:', error.message);
    console.log('\n💡 Installing Expo CLI...');
    const install = spawn('npm', ['install', '-g', '@expo/cli'], {
      stdio: 'inherit'
    });
    
    install.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Expo CLI installed. Restarting...');
        startExpo();
      }
    });
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n👋 Shutting down BAPS Temple Finder...');
    backend.kill('SIGINT');
    expo.kill('SIGINT');
    process.exit(0);
  });
}, 2000);

backend.on('error', (error) => {
  console.error('❌ Failed to start backend:', error);
  process.exit(1);
});

function startExpo() {
  const expo = spawn('npx', ['expo', 'start', '--web'], {
    stdio: 'inherit',
    cwd: __dirname,
  });
  
  expo.on('error', (error) => {
    console.error('❌ Expo failed:', error);
  });
}