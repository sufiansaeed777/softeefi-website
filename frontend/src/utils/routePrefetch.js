// Utility to prefetch routes for better performance
// This preloads components when the user is likely to navigate to them

export const prefetchRoute = (componentImport) => {
  // Only prefetch on good network conditions
  if ('connection' in navigator) {
    const connection = navigator.connection;
    if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return; // Don't prefetch on slow connections
    }
  }

  // Use requestIdleCallback if available, otherwise setTimeout
  const schedulePrefetch = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
  
  schedulePrefetch(() => {
    componentImport().catch(() => {
      // Silently fail if prefetch fails
    });
  });
};

// Prefetch common routes after initial load
export const prefetchCommonRoutes = () => {
  // Wait a bit after initial page load
  setTimeout(() => {
    // Prefetch likely next pages based on user behavior
    // These are imported dynamically to avoid bundling them initially
    prefetchRoute(() => import('../pages/services/AISolutions'));
    prefetchRoute(() => import('../pages/services/WebsitesAndApps'));
    prefetchRoute(() => import('../pages/Contact'));
  }, 2000); // Wait 2 seconds after initial load
};

// Prefetch on hover for navigation links
export const prefetchOnHover = (path) => {
  const routeMap = {
    '/': () => import('../pages/Landing'),
    '/contact': () => import('../pages/Contact'),
    '/services/ai-solutions': () => import('../pages/services/AISolutions'),
    '/services/websites-and-apps': () => import('../pages/services/WebsitesAndApps'),
    '/services/digital-marketing-seo': () => import('../pages/services/DigitalMarketingSEO'),
    '/services/ui-ux-design': () => import('../pages/services/UIUXDesign'),
    '/services/cloud-infrastructure': () => import('../pages/services/CloudServices'),
    '/process': () => import('../pages/Process'),
    '/faq': () => import('../pages/FAQ'),
    '/free-learning': () => import('../pages/FreeReports'),
  };

  if (routeMap[path]) {
    prefetchRoute(routeMap[path]);
  }
};