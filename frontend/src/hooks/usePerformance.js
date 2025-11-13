import { useEffect, useState, useCallback, useRef } from 'react';

// Hook to detect if user prefers reduced motion
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// Hook for intersection observer with performance optimization
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);

  const callback = useCallback(
    (entries) => {
      const [entry] = entries;
      setIsIntersecting(entry.isIntersecting);
      
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    },
    [hasIntersected]
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [callback, options]);

  return { ref: elementRef, isIntersecting, hasIntersected };
};

// Hook for throttling function calls
export const useThrottle = (callback, delay) => {
  const lastCall = useRef(0);
  const timeoutRef = useRef(null);

  const throttledCallback = useCallback(
    (...args) => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCall.current;

      if (timeSinceLastCall >= delay) {
        lastCall.current = now;
        callback(...args);
      } else {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          lastCall.current = Date.now();
          callback(...args);
        }, delay - timeSinceLastCall);
      }
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledCallback;
};

// Hook for debouncing function calls
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook to detect device capabilities
export const useDeviceCapabilities = () => {
  const [capabilities, setCapabilities] = useState({
    gpu: true,
    memory: 8,
    connection: 'unknown',
    saveData: false,
  });

  useEffect(() => {
    const checkCapabilities = () => {
      const caps = {
        gpu: true, // Default to true, can be enhanced with WebGL detection
        memory: navigator.deviceMemory || 8,
        connection: navigator.connection?.effectiveType || 'unknown',
        saveData: navigator.connection?.saveData || false,
      };

      // Check WebGL support
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        caps.gpu = !!gl;
      } catch (e) {
        caps.gpu = false;
      }

      setCapabilities(caps);
    };

    checkCapabilities();

    if (navigator.connection) {
      navigator.connection.addEventListener('change', checkCapabilities);
      return () => {
        navigator.connection.removeEventListener('change', checkCapabilities);
      };
    }
  }, []);

  return capabilities;
};

// Hook for lazy loading images with performance optimization
export const useLazyImage = (src, placeholder = '') => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!src) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = new Image();
            img.src = src;

            img.onload = () => {
              setImageSrc(src);
              setIsLoading(false);
            };

            img.onerror = (e) => {
              setError(e);
              setIsLoading(false);
            };

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, placeholder]);

  return { imageSrc, isLoading, error, ref: imgRef };
};

// Hook for monitoring performance metrics
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    fps: 60,
    memory: 0,
    loadTime: 0,
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        const memory = performance.memory
          ? Math.round(performance.memory.usedJSHeapSize / 1048576)
          : 0;

        setMetrics({
          fps,
          memory,
          loadTime: performance.timing
            ? performance.timing.loadEventEnd - performance.timing.navigationStart
            : 0,
        });

        frameCount = 0;
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(measureFPS);
    };

    measureFPS();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return metrics;
};