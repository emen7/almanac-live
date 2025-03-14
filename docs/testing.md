# Testing the Applications

This document provides instructions for testing the three main applications in the project: Almanac, Reader, and CMS.

## Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

## Root-level Testing

If you want to test all applications simultaneously using Turborepo:

```bash
# From the project root directory
npm run dev
```

This will start all three applications with the following default ports:
- Almanac: http://localhost:3000
- Reader: http://localhost:3001
- CMS: http://localhost:3002

## Testing Individual Applications

### Almanac Application

```bash
# From the project root directory
cd apps/almanac
npm run dev
```

The Almanac application will be available at http://localhost:3000

### Reader Application

```bash
# From the project root directory
cd apps/reader
npm run dev
```

The Reader application will be available at http://localhost:3001

### CMS Application

```bash
# From the project root directory
cd apps/cms
npm run dev
```

The CMS application will be available at http://localhost:3002

## Testing in Production Mode

To test how the applications would run in production:

```bash
# From the project root directory
npm run build
npm run start
```

Or for individual apps:

```bash
# Example for the Reader app
cd apps/reader
npm run build
npm run start
```

## Testing Specific Features

### Reader Features

1. **Text Customization**: Test font size adjustment and theme toggling
2. **Navigation**: Verify paper/section navigation works correctly
3. **Annotation**: Test highlighting and note-taking features
4. **Audio Integration**: Test audio playback if implemented

### Almanac Features

1. **Card Display**: Verify dataset cards display correctly
2. **Responsive Layout**: Test on various screen sizes
3. **Linking**: Test links between almanac entries and the reader
4. **Search**: Test search functionality across datasets

### CMS Features

1. **Authentication**: Verify login works for authorized users
2. **Content Creation**: Test creating new dataset cards
3. **Publishing Workflow**: Test draft/review/publish functionality
4. **Navigation Management**: Test updating site navigation structure

## Troubleshooting Common Issues

- **Port Conflicts**: If ports are already in use, modify the port in the respective app's package.json or .env file
- **API Connection Issues**: Ensure the correct environment variables are set for API endpoints
- **Build Errors**: Clear node_modules and reinstall dependencies if encountering unusual build errors
