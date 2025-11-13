import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for image optimization
 * Handles WebP support detection, lazy loading, and responsive images
 */
export const useImageOptimization = () => {
  const [webpSupported, setWebpSupported] = useState(false);
  const [connectionSpeed, setConnectionSpeed] = useState('4g');

  useEffect(() => {
    // Check WebP support
    const checkWebP = () => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
    };

    setWebpSupported(checkWebP());

    // Check connection speed
    if ('connection' in navigator) {
      const connection = navigator.connection;
      setConnectionSpeed(connection.effectiveType || '4g');
      
      // Listen for connection changes
      const handleConnectionChange = () => {
        setConnectionSpeed(connection.effectiveType || '4g');
      };
      
      connection.addEventListener('change', handleConnectionChange);
      return () => {
        connection.removeEventListener('change', handleConnectionChange);
      };
    }
  }, []);

  /**
   * Convert image path to WebP if supported
   */
  const getOptimizedSrc = useCallback((src) => {
    if (!src) return '';
    
    // If WebP is not supported, return original
    if (!webpSupported) return src;
    
    // If already WebP, return as is
    if (src.toLowerCase().includes('.webp')) return src;
    
    // Convert to WebP
    const lastDot = src.lastIndexOf('.');
    if (lastDot === -1) return src;
    
    return src.substring(0, lastDot) + '.webp';
  }, [webpSupported]);

  /**
   * Generate srcSet for responsive images
   */
  const generateSrcSet = useCallback((src, sizes = [320, 640, 768, 1024, 1280, 1920]) => {
    if (!src) return '';
    
    const ext = src.substring(src.lastIndexOf('.'));
    const base = src.substring(0, src.lastIndexOf('.'));
    
    return sizes
      .map(size => `${base}-${size}w${ext} ${size}w`)
      .join(', ');
  }, []);

  /**
   * Get optimal image size based on viewport and connection
   */
  const getOptimalImageSize = useCallback((viewportWidth) => {
    // Adjust quality based on connection speed
    const qualityMap = {
      'slow-2g': 0.3,
      '2g': 0.5,
      '3g': 0.7,
      '4g': 0.9
    };

    const quality = qualityMap[connectionSpeed] || 0.9;
    
    // Calculate optimal width
    const devicePixelRatio = window.devicePixelRatio || 1;
    const optimalWidth = Math.round(viewportWidth * devicePixelRatio * quality);
    
    // Round to nearest standard size
    const standardSizes = [320, 640, 768, 1024, 1280, 1920, 2560];
    const closest = standardSizes.reduce((prev, curr) => 
      Math.abs(curr - optimalWidth) < Math.abs(prev - optimalWidth) ? curr : prev
    );
    
    return closest;
  }, [connectionSpeed]);

  /**
   * Preload critical images
   */
  const preloadImage = useCallback((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = getOptimizedSrc(src);
    
    // Add WebP type if supported
    if (webpSupported && !src.includes('.webp')) {
      link.type = 'image/webp';
    }
    
    document.head.appendChild(link);
  }, [getOptimizedSrc, webpSupported]);

  /**
   * Create placeholder for lazy loading
   */
  const createPlaceholder = useCallback((width = 100, height = 100) => {
    // Create a small SVG placeholder
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#1a1a1a"/>
        <rect width="100%" height="100%" fill="url(#shimmer)" opacity="0.5"/>
        <defs>
          <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#1a1a1a" stop-opacity="0"/>
            <stop offset="50%" stop-color="#2a2a2a" stop-opacity="1"/>
            <stop offset="100%" stop-color="#1a1a1a" stop-opacity="0"/>
            <animate attributeName="x1" from="-100%" to="100%" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="x2" from="0%" to="200%" dur="2s" repeatCount="indefinite"/>
          </linearGradient>
        </defs>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }, []);

  return {
    webpSupported,
    connectionSpeed,
    getOptimizedSrc,
    generateSrcSet,
    getOptimalImageSize,
    preloadImage,
    createPlaceholder
  };
};

/**
 * Hook for intersection observer based lazy loading
 */
export const useIntersectionLazyLoad = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '50px',
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element, options]);

  return [setElement, isInView];
};