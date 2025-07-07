# BAPS Temple Finder

## Overview

This is a full-stack web application for finding BAPS temples based on location. Users can search for temples by zip code or current location, view temple details, and get directions. The application features a modern React frontend with a Node.js/Express backend and uses PostgreSQL for data storage.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom BAPS theme colors
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Data Storage**: In-memory storage with fallback to database
- **API Design**: RESTful API endpoints

## Key Components

### Database Schema
- **temples** table with fields: id, city, address, phone, fax, email, operating_hours, operating_days, latitude, longitude
- Uses Drizzle ORM for type-safe database operations
- Configured for PostgreSQL with connection pooling via @neondatabase/serverless

### API Endpoints
- `GET /api/temples` - Retrieve all temples
- `GET /api/temples/:id` - Get specific temple by ID
- `POST /api/temples/search` - Search temples by location (zip code or coordinates)

### Frontend Components
- **SearchInterface**: Handles zip code and geolocation-based searches
- **TempleCard**: Displays temple information in a card format
- **TempleModal**: Shows detailed temple information in a modal
- **LoadingState/ErrorState**: User feedback components

### Location Services
- Geolocation API for current location detection
- Zip code validation and geocoding
- Distance calculation for temple search results

## Data Flow

1. **User Input**: User enters zip code or requests current location
2. **Location Processing**: Frontend validates input and gets coordinates
3. **API Request**: Search request sent to backend with location parameters
4. **Database Query**: Backend queries temple data and calculates distances
5. **Response Processing**: Results sorted and formatted for display
6. **UI Update**: Temple cards displayed with sorting and filtering options

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React-DOM, React Query)
- UI components (@radix-ui/react-* packages)
- Styling (Tailwind CSS, class-variance-authority)
- Utilities (date-fns, clsx, lucide-react icons)

### Backend Dependencies
- Express.js framework
- Drizzle ORM with PostgreSQL driver
- Database connection (@neondatabase/serverless)
- Session management (connect-pg-simple)
- Validation (Zod schemas)

### Development Tools
- TypeScript for type safety
- Vite for development and building
- ESBuild for backend bundling
- PostCSS for CSS processing

## Deployment Strategy

### Build Process
- Frontend: Vite builds optimized static assets to `dist/public`
- Backend: ESBuild bundles server code to `dist/index.js`
- Database: Drizzle handles schema migrations

### Environment Configuration
- Development: Uses Vite dev server with Express API
- Production: Serves static files from Express with API routes
- Database: Configured via `DATABASE_URL` environment variable

### Scripts
- `dev`: Development server with hot reload
- `build`: Production build for both frontend and backend
- `start`: Production server
- `db:push`: Apply database schema changes

## Changelog
- July 06, 2025. Initial setup
- July 06, 2025. Updated navigation and branding:
  - Replaced Om symbol with official BAPS logo throughout interface
  - Modified footer navigation: "About BAPS" now redirects to baps.org
  - Removed "Find a Temple", "Events & Programs", and "Contact Us" links
  - Created new /support page with team contact information
  - Added support team: Anssh Prajapati, Pujan Patel, Shail Patel with contact details
- July 06, 2025. Added interactive map integration:
  - Integrated Leaflet maps with react-leaflet for temple visualization
  - Added list/map view toggle for flexible temple browsing
  - Custom temple markers with popup details and distance information
  - Map shows user location and nearby temples with click interactions
  - Responsive layout adapts based on selected view mode
- July 06, 2025. Added iOS mobile optimizations:
  - Enhanced HTML with iOS-specific meta tags and web app capabilities
  - Added touch-friendly input handling with numeric keyboard for zip codes
  - Implemented iOS-specific CSS for better touch interaction and performance
  - Added proper viewport settings to prevent zoom on input focus
  - Created dev.js file for easy local development setup
  - Optimized map controls for touch devices with proper gesture handling
- July 06, 2025. Created React Native Expo mobile app:
  - Built complete native iOS and Android app using React Native and Expo
  - Implemented native navigation with React Navigation stack navigator
  - Added native map integration with react-native-maps for iOS and Android
  - Created comprehensive screens: Home, Map, Temple Details, and Support
  - Integrated native device features: GPS location, calling, email, directions
  - Designed Material Design UI with react-native-paper components
  - Added iOS Simulator and Android Emulator support for development
  - Created mobile-specific API service layer connecting to existing backend

## User Preferences

Preferred communication style: Simple, everyday language.