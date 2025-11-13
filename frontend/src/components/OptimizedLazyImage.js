import React, { useState, useEffect, useRef } from 'react';

const OptimizedLazyImage = React.memo(({ 
  src, 
  alt, 
  style = {}, 
  className = '',
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23333"%3E%3C/rect%3E%3C/svg%3E',
  onError
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let observer;
    
    if (imageRef && imageSrc === placeholder) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setImageSrc(src);
                observer.unobserve(imageRef);
              }
            });
          },
          { threshold: 0.1, rootMargin: '50px' }
        );
        observer.observe(imageRef);
      } else {
        // Fallback for browsers that don't support IntersectionObserver
        setImageSrc(src);
      }
    }
    
    return () => {
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, imageSrc, placeholder, src]);

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      style={{
        ...style,
        opacity: isLoaded ? 1 : 0.8,
        transition: 'opacity 0.3s ease'
      }}
      className={className}
      onLoad={() => setIsLoaded(true)}
      onError={(e) => {
        if (onError) {
          onError(e);
        } else {
          e.target.style.display = 'none';
        }
      }}
      loading="lazy"
    />
  );
});

OptimizedLazyImage.displayName = 'OptimizedLazyImage';

export default OptimizedLazyImage;