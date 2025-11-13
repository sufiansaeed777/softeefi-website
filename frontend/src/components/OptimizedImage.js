import React, { useState, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  style = {}, 
  className = '', 
  mobileSrc = null,
  loading = 'lazy',
  onLoad,
  onError
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setHasError(true);
    if (onError) onError(e);
  };

  const imageSrc = isMobile && mobileSrc ? mobileSrc : src;

  return (
    <div style={{ position: 'relative', ...style }}>
      {/* Placeholder/Loading state */}
      {!isLoaded && !hasError && (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div 
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(0, 255, 127, 0.2)',
              borderTopColor: '#00ff7f',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
          />
        </div>
      )}
      
      {/* Actual image */}
      <img
        src={imageSrc}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
          ...style
        }}
        className={className}
      />
      
      {/* Error state */}
      {hasError && (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#888'
          }}
        >
          Failed to load image
        </div>
      )}
      
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default OptimizedImage;