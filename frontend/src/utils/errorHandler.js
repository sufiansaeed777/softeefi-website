// Global error handler to prevent script errors in development
const setupErrorHandlers = () => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.warn('Unhandled promise rejection:', event.reason);
    
    // Send error to backend in production
    if (process.env.NODE_ENV === 'production') {
      const apiUrl = process.env.REACT_APP_API_URL || '';
      fetch(`${apiUrl}/api/metrics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric: 'error',
          value: 1,
          page: window.location.href,
          pathname: window.location.pathname,
          sessionId: sessionStorage.getItem('analyticsSessionId'),
          errorType: 'unhandledRejection',
          errorMessage: event.reason?.toString() || 'Unknown promise rejection'
        })
      }).catch(() => {});
    }
    
    // Prevent the default browser error in development
    if (process.env.NODE_ENV === 'development') {
      event.preventDefault();
    }
  });

  // Handle global errors
  window.addEventListener('error', (event) => {
    // Check if it's a script error (usually cross-origin or extension issues)
    if (event.message === 'Script error.' || !event.filename) {
      console.warn('Cross-origin or extension error detected, suppressing...');
      event.preventDefault();
      return false;
    }
    
    // Log other errors
    console.error('Global error:', {
      message: event.message,
      source: event.filename,
      line: event.lineno,
      col: event.colno,
      error: event.error
    });
    
    // Send error to backend in production
    if (process.env.NODE_ENV === 'production') {
      const apiUrl = process.env.REACT_APP_API_URL || '';
      fetch(`${apiUrl}/api/metrics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric: 'error',
          value: 1,
          page: window.location.href,
          pathname: window.location.pathname,
          sessionId: sessionStorage.getItem('analyticsSessionId'),
          errorType: 'globalError',
          errorMessage: event.message,
          errorSource: event.filename,
          errorLine: event.lineno,
          errorCol: event.colno
        })
      }).catch(() => {});
    }
    
    // Prevent the default error handling in development
    if (process.env.NODE_ENV === 'development') {
      event.preventDefault();
    }
  });
};

export default setupErrorHandlers;