// Environment configuration helper
// Centralizes all environment variable access

const env = {
  // API Configuration
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
  API_TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT) || 30000,
  
  // Feature Flags
  ENABLE_AI_CHAT: process.env.REACT_APP_ENABLE_AI_CHAT === 'true',
  ENABLE_FREE_REPORTS: process.env.REACT_APP_ENABLE_FREE_REPORTS === 'true',
  ENABLE_ANIMATIONS: process.env.REACT_APP_ENABLE_ANIMATIONS !== 'false', // Default true
  
  // Monitoring
  SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN || '',
  VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  
  // Analytics
  GA_TRACKING_ID: process.env.REACT_APP_GA_TRACKING_ID || '',
  
  // Tawk.to Chat
  TAWKTO_PROPERTY_ID: process.env.REACT_APP_TAWKTO_PROPERTY_ID || '',
  TAWKTO_WIDGET_ID: process.env.REACT_APP_TAWKTO_WIDGET_ID || '',
  
  // Development
  DEBUG_MODE: process.env.REACT_APP_DEBUG_MODE === 'true',
  MOCK_API: process.env.REACT_APP_MOCK_API === 'true',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_TEST: process.env.NODE_ENV === 'test',
  
  // Contact Settings
  CONTACT_EMAIL: process.env.REACT_APP_CONTACT_EMAIL || 'info@softeefi.co.uk',
  MAX_FILE_SIZE: parseInt(process.env.REACT_APP_MAX_FILE_SIZE) || 5242880, // 5MB default
};

// Validate required environment variables
const validateEnvironment = () => {
  const warnings = [];
  
  if (env.IS_PRODUCTION) {
    if (!env.SENTRY_DSN) {
      warnings.push('REACT_APP_SENTRY_DSN is not set. Error monitoring will be disabled.');
    }
    
    if (env.API_URL.includes('localhost')) {
      warnings.push('API_URL is pointing to localhost in production!');
    }
  }
  
  // Log warnings in development
  if (warnings.length > 0 && env.IS_DEVELOPMENT) {
    console.warn('Environment configuration warnings:');
    warnings.forEach(warning => console.warn(`  - ${warning}`));
  }
  
  return warnings;
};

// Run validation
validateEnvironment();

export default env;