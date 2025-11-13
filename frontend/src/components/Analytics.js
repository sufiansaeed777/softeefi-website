import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics 4 Setup
export const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID || 'G-XXXXXXXXXX'; // Replace with your GA4 ID

// Initialize Google Analytics
export const initGA = () => {
  try {
    if (typeof window !== 'undefined' && GA_TRACKING_ID && GA_TRACKING_ID !== 'G-XXXXXXXXXX') {
      // Add Google Analytics script
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      script1.onerror = () => console.warn('Failed to load Google Analytics');
      document.head.appendChild(script1);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_path: window.location.pathname,
    });
    }
  } catch (error) {
    console.warn('Google Analytics initialization failed:', error);
    // Continue without analytics
  }
};

// Track page views
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track form submissions
export const trackFormSubmit = (formName) => {
  event({
    action: 'form_submit',
    category: 'engagement',
    label: formName,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName) => {
  event({
    action: 'click',
    category: 'engagement',
    label: buttonName,
  });
};

// Track service page views
export const trackServiceView = (serviceName) => {
  event({
    action: 'view_service',
    category: 'services',
    label: serviceName,
  });
};

// Track download events
export const trackDownload = (fileName) => {
  event({
    action: 'download',
    category: 'engagement',
    label: fileName,
  });
};

// Analytics Provider Component
const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA on mount
    initGA();
  }, []);

  useEffect(() => {
    // Track page views on route change
    pageview(location.pathname + location.search);
    
    // Also send page view to our backend
    if (process.env.NODE_ENV === 'production') {
      // Get or create session ID
      let sessionId = sessionStorage.getItem('analyticsSessionId');
      if (!sessionId) {
        sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('analyticsSessionId', sessionId);
      }
      
      const apiUrl = process.env.REACT_APP_API_URL || '';
      fetch(`${apiUrl}/api/metrics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric: 'pageview',
          value: 1,
          page: window.location.href,
          pathname: location.pathname,
          sessionId: sessionId,
          userAgent: navigator.userAgent,
          referrer: document.referrer
        })
      }).catch(() => {
        // Silently fail
      });
    }
  }, [location]);

  return null;
};

export default Analytics;

// Simple visitor counter using localStorage (for development/demo)
export const getVisitorCount = () => {
  if (typeof window !== 'undefined') {
    const count = localStorage.getItem('visitorCount') || '0';
    return parseInt(count);
  }
  return 0;
};

export const incrementVisitorCount = () => {
  if (typeof window !== 'undefined') {
    const currentCount = getVisitorCount();
    const newCount = currentCount + 1;
    localStorage.setItem('visitorCount', newCount.toString());
    return newCount;
  }
  return 0;
};

// Track user session
export const trackSession = () => {
  try {
    if (typeof window !== 'undefined') {
      const sessionKey = 'userSession';
      const lastVisit = sessionStorage.getItem(sessionKey);
      
      if (!lastVisit) {
        // New session
        sessionStorage.setItem(sessionKey, new Date().toISOString());
        incrementVisitorCount();
        
        // Track new session event
        event({
          action: 'new_session',
          category: 'user',
          label: 'session_start',
        });
      }
    }
  } catch (error) {
    console.warn('Session tracking failed:', error);
    // Continue without session tracking
  }
};

// Get basic analytics data (for display on admin dashboard)
export const getAnalyticsData = () => {
  const visitorCount = getVisitorCount();
  const todayVisitors = localStorage.getItem('todayVisitors') || '0';
  const weeklyVisitors = localStorage.getItem('weeklyVisitors') || '0';
  const monthlyVisitors = localStorage.getItem('monthlyVisitors') || '0';
  
  return {
    total: visitorCount,
    today: parseInt(todayVisitors),
    weekly: parseInt(weeklyVisitors),
    monthly: parseInt(monthlyVisitors),
  };
};

// Track conversion goals
export const trackConversion = (goalName, value) => {
  event({
    action: 'conversion',
    category: 'goals',
    label: goalName,
    value: value,
  });
  
  // Also send to backend if needed
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics/conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal: goalName, value }),
    }).catch(err => console.error('Failed to track conversion:', err));
  }
};