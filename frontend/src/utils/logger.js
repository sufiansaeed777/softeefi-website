// Production-safe logger utility
// This replaces direct console usage to prevent exposing logs in production

const isDevelopment = process.env.NODE_ENV === 'development';

class Logger {
  // Error logging - always logged but formatted differently in production
  static error(message, error = null, context = {}) {
    if (isDevelopment) {
      console.error(`[ERROR] ${message}`, error, context);
    } else {
      // In production, you would send this to a monitoring service
      // For now, we'll store in a controlled way
      this.logToService('error', message, { error, context });
    }
  }

  // Warning logging
  static warn(message, context = {}) {
    if (isDevelopment) {
      console.warn(`[WARN] ${message}`, context);
    } else {
      this.logToService('warn', message, context);
    }
  }

  // Info logging - only in development
  static info(message, context = {}) {
    if (isDevelopment) {
      console.info(`[INFO] ${message}`, context);
    }
  }

  // Debug logging - only in development
  static debug(message, context = {}) {
    if (isDevelopment) {
      console.log(`[DEBUG] ${message}`, context);
    }
  }

  // Production logging service integration
  static logToService(level, message, data) {
    // In a real app, this would send to services like:
    // - Sentry
    // - LogRocket
    // - Datadog
    // - Custom analytics endpoint
    
    // For now, we'll store in sessionStorage for debugging
    // without exposing in console
    try {
      const logs = JSON.parse(sessionStorage.getItem('app_logs') || '[]');
      logs.push({
        level,
        message,
        data,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      });
      
      // Keep only last 50 logs to prevent memory issues
      if (logs.length > 50) {
        logs.splice(0, logs.length - 50);
      }
      
      sessionStorage.setItem('app_logs', JSON.stringify(logs));
    } catch (e) {
      // Fail silently in production
    }
  }

  // Get logs for debugging (development only)
  static getLogs() {
    if (isDevelopment) {
      return JSON.parse(sessionStorage.getItem('app_logs') || '[]');
    }
    return [];
  }

  // Clear logs
  static clearLogs() {
    sessionStorage.removeItem('app_logs');
  }
}

export default Logger;