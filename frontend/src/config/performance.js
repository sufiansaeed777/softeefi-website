// Performance optimization configuration

export const performanceConfig = {
  // Reduce animation complexity
  animations: {
    enableComplexAnimations: false, // Disable heavy animations on low-end devices
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    defaultDuration: 0.3,
    defaultEasing: 'ease-out'
  },
  
  // Image optimization
  images: {
    lazyLoadOffset: '50px',
    placeholder: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23333"%3E%3C/rect%3E%3C/svg%3E',
    quality: 85
  },
  
  // Debounce/Throttle values
  debounce: {
    scroll: 100,
    resize: 250,
    search: 300
  },
  
  // Chunk loading
  chunkSize: {
    testimonials: 10, // Load testimonials in chunks
    portfolio: 6
  }
};

// Utility function to check if device is low-end
export const isLowEndDevice = () => {
  // Check for low memory
  if (navigator.deviceMemory && navigator.deviceMemory < 4) return true;
  
  // Check for slow connection
  if (navigator.connection) {
    const connection = navigator.connection;
    if (connection.saveData) return true;
    if (connection.effectiveType && ['slow-2g', '2g'].includes(connection.effectiveType)) return true;
  }
  
  // Check for mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  return isMobile;
};

// Debounce function for performance
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for performance
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};