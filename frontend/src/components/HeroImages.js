import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const HeroImages = () => {
  // Initialize with actual window width check instead of false
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };
    checkMobile();
    
    const handleResize = () => {
      requestAnimationFrame(checkMobile);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload the appropriate image based on device
  useEffect(() => {
    // Reset loading state when switching between mobile/desktop
    setImageLoaded(false);
    setImageSrc(null);
    
    const imageToLoad = isMobile 
      ? '/images/hero-mobile-girl.png' 
      : '/images/hero/cybernetic-woman.png';
    
    // Load the PNG image
    const img = new Image();
    
    // Set loading priority
    img.loading = 'eager';
    img.decoding = 'async';
    
    // Load image
    img.onload = () => {
      setImageSrc(imageToLoad);
      setImageLoaded(true);
    };
    
    img.onerror = () => {
      // Fallback to JPG if WebP fails
      const fallbackSrc = isMobile 
        ? '/images/hero-mobile-girl-optimized.webp' 
        : '/images/hero/cybernetic-woman-optimized.webp';
      
      const fallbackImg = new Image();
      fallbackImg.loading = 'eager';
      fallbackImg.decoding = 'async';
      
      fallbackImg.onload = () => {
        setImageSrc(fallbackSrc);
        setImageLoaded(true);
      };
      
      fallbackImg.onerror = () => {
        // Final fallback to original images
        const originalSrc = isMobile 
          ? '/images/hero-mobile-girl.webp' 
          : '/images/hero/cybernetic-woman.webp';
        setImageSrc(originalSrc);
        setImageLoaded(true);
      };
      
      fallbackImg.src = fallbackSrc;
    };
    
    img.src = imageToLoad;
    
    // Cleanup function to abort image loading if component unmounts
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [isMobile]);

  // Low quality placeholder
  const placeholderStyle = {
    position: 'absolute',
    height: '100%',
    width: '100%',
    background: 'linear-gradient(135deg, #001a0f 0%, #002d1a 50%, #00170d 100%)',
    filter: 'blur(2px)'
  };

  return (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '140%',
      top: '-40%',
      left: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 0
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center'
        }}
      >
        
        {/* Top fade for navbar area */}
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '20%',
          background: 'linear-gradient(to bottom, rgba(13, 17, 23, 0.9) 0%, transparent 100%)',
          zIndex: 2
        }} />
        
        {/* Placeholder while loading */}
        {!imageLoaded && (
          <div style={placeholderStyle}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '60px',
              height: '60px'
            }}>
              <motion.div
                style={{
                  width: '100%',
                  height: '100%',
                  border: '3px solid rgba(0, 255, 127, 0.2)',
                  borderTopColor: '#00ff7f',
                  borderRadius: '50%'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>
        )}
        
        {/* Hero Image with optimizations */}
        {imageSrc && (
          <motion.img
            key={`hero-image-${isMobile ? 'mobile' : 'desktop'}`}
            src={imageSrc}
            alt={isMobile ? 'Futuristic Tech Woman' : 'Cybernetic Woman'}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            loading="eager"
            decoding="async"
            fetchpriority="high"
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              objectPosition: isMobile ? 'center center' : '80% top',
              opacity: isMobile ? 0.9 : 0.85,
              filter: isMobile ? 'brightness(0.9) contrast(1.1)' : 'brightness(0.85) contrast(1.05)',
              willChange: 'opacity'
            }}
          />
        )}
        
        {/* Bottom gradient for mobile text readability */}
        {isMobile && (
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '50%',
            background: 'linear-gradient(to top, rgba(13, 17, 23, 0.9) 0%, transparent 100%)',
            zIndex: 2
          }} />
        )}
        
        {/* Subtle glow effect - only show when image is loaded */}
        {imageLoaded && (
          <div style={{
            position: 'absolute',
            top: isMobile ? '50%' : '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '100%' : '80%',
            height: isMobile ? '80%' : '60%',
            background: isMobile 
              ? 'radial-gradient(circle, rgba(0, 255, 127, 0.15) 0%, transparent 60%)' 
              : 'radial-gradient(circle, rgba(0, 255, 127, 0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
            zIndex: 1
          }} />
        )}
      </motion.div>
    </div>
  );
};

export default HeroImages;