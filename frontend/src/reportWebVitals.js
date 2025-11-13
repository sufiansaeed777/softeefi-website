// Web Vitals Performance Monitoring
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Cumulative Layout Shift - measures visual stability
      getCLS(onPerfEntry);
      
      // First Input Delay - measures interactivity
      getFID(onPerfEntry);
      
      // First Contentful Paint - measures loading performance
      getFCP(onPerfEntry);
      
      // Largest Contentful Paint - measures loading performance
      getLCP(onPerfEntry);
      
      // Time to First Byte - measures server response time
      getTTFB(onPerfEntry);
    });
  }
};

// Custom performance logger
export const logWebVitals = (metric) => {
  // Console log for development
  console.log(`[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)}${metric.name === 'CLS' ? '' : 'ms'}`);
  
  // Send to analytics if available
  if (window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true
    });
  }
  
  // Send to backend API for monitoring
  if (process.env.NODE_ENV === 'production') {
    // Determine rating based on metric thresholds
    let rating = 'good';
    if (metric.name === 'LCP' && metric.value > 4000) rating = 'poor';
    else if (metric.name === 'LCP' && metric.value > 2500) rating = 'needs-improvement';
    else if (metric.name === 'FID' && metric.value > 300) rating = 'poor';
    else if (metric.name === 'FID' && metric.value > 100) rating = 'needs-improvement';
    else if (metric.name === 'CLS' && metric.value > 0.25) rating = 'poor';
    else if (metric.name === 'CLS' && metric.value > 0.1) rating = 'needs-improvement';
    
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
        metric: metric.name,
        value: metric.value,
        rating: rating,
        page: window.location.href,
        pathname: window.location.pathname,
        sessionId: sessionId,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        id: metric.id,
        timestamp: new Date().toISOString()
      })
    }).catch(() => {
      // Silently fail if metrics endpoint is not available
    });
  }
};

export default reportWebVitals;