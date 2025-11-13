// Conditionally import Sentry only if needed
let Sentry;
try {
  Sentry = require("@sentry/react");
} catch (error) {
  console.log("Sentry not available, error tracking disabled");
}

export const initSentry = () => {
  try {
    // Only initialize if Sentry is available, in production, AND if DSN is provided
    if (Sentry && process.env.NODE_ENV === 'production' && process.env.REACT_APP_SENTRY_DSN) {
      Sentry.init({
      // You'll need to get your DSN from sentry.io (it's free)
      // Sign up at https://sentry.io and create a React project
      dsn: process.env.REACT_APP_SENTRY_DSN || "", // Add your DSN to .env file
      
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          // Capture 10% of all sessions for replay
          sessionSampleRate: 0.1,
          // Capture 100% of sessions with an error
          errorSampleRate: 1.0,
        }),
      ],
      
      // Performance Monitoring
      tracesSampleRate: 0.1, // Capture 10% of transactions for performance monitoring
      
      // Release tracking
      release: process.env.REACT_APP_VERSION || "1.0.0",
      
      environment: process.env.NODE_ENV,
      
      // Don't send local development errors
      beforeSend(event, hint) {
        // Filter out errors from browser extensions
        if (event.exception) {
          const error = hint.originalException;
          // Filter out errors from browser extensions
          if (error && error.stack && error.stack.match(/chrome-extension:|moz-extension:|safari-extension:/)) {
            return null;
          }
        }
        return event;
      },
      
      // Ignore specific errors that aren't actionable
      ignoreErrors: [
        // Browser extensions
        "top.GLOBALS",
        // Facebook related errors
        "fb_xd_fragment",
        // Network errors that user can't fix
        "NetworkError",
        "Network request failed",
        // Ignore errors from old browsers
        "Non-Error promise rejection captured",
        // Ignore user cancellations
        "Request aborted",
        "Request canceled",
      ],
    });
    }
  } catch (error) {
    console.warn('Sentry initialization failed:', error);
    // Don't throw - just continue without Sentry
  }
};

// Helper function to capture custom errors
export const captureError = (error, context = {}) => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error, {
      extra: context
    });
  } else {
    console.error('Error captured:', error, context);
  }
};

// Helper function to capture messages
export const captureMessage = (message, level = 'info') => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureMessage(message, level);
  } else {
    console.log(`[${level}] ${message}`);
  }
};

// Helper function to add user context
export const setUserContext = (user) => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.setUser({
      email: user.email,
      id: user.id,
      username: user.name
    });
  }
};

// Helper function to add custom context
export const addBreadcrumb = (breadcrumb) => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.addBreadcrumb(breadcrumb);
  }
};