import { useState, useEffect } from 'react';

const useResponsive = () => {
  const [dimensions, setDimensions] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setDimensions({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024 && width < 1440,
        isLargeDesktop: width >= 1440,
        width,
        height
      });
    };

    updateDimensions();

    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 150);
    };

    window.addEventListener('resize', debouncedResize);
    window.addEventListener('orientationchange', updateDimensions);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', updateDimensions);
      clearTimeout(timeoutId);
    };
  }, []);

  return dimensions;
};

export default useResponsive;