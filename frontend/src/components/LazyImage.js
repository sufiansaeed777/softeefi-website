import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  style = {}, 
  placeholderSrc = null,
  onLoad = () => {},
  aspectRatio = null,
  srcSet = null,
  sizes = null,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholderSrc || '');
  const [imageRef, setImageRef] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Use IntersectionObserver for lazy loading
  useEffect(() => {
    let observer;
    
    if (imageRef && !isLoaded) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.unobserve(entry.target);
            }
          });
        },
        { 
          threshold: 0.01,
          rootMargin: '50px' // Start loading 50px before the image enters viewport
        }
      );
      observer.observe(imageRef);
    }

    return () => {
      if (observer && observer.unobserve && imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, isLoaded]);

  // Load image when in view
  useEffect(() => {
    if (isInView && !isLoaded) {
      const img = new Image();
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
        onLoad();
      };
      
      img.onerror = () => {
        // Optionally handle error - could show error placeholder
        setIsLoaded(true);
      };
      
      // Set srcset if provided
      if (srcSet) {
        img.srcset = srcSet;
      }
      
      img.src = src;
    }
  }, [isInView, src, srcSet, isLoaded, onLoad]);

  // Container style for aspect ratio
  const containerStyle = aspectRatio ? {
    position: 'relative',
    paddingBottom: `${(1 / aspectRatio) * 100}%`,
    overflow: 'hidden',
    ...style
  } : style;

  const imageStyle = aspectRatio ? {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  } : {};

  return (
    <div 
      ref={setImageRef}
      style={containerStyle}
      className={`lazy-image-container ${className}`}
    >
      {!isLoaded && (
        <div 
          className="lazy-image-placeholder"
          style={{
            position: aspectRatio ? 'absolute' : 'relative',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            borderRadius: 'inherit'
          }}
        />
      )}
      
      <motion.img
        src={imageSrc || placeholderSrc || ''}
        alt={alt}
        srcSet={isLoaded ? srcSet : null}
        sizes={sizes}
        className={`lazy-image ${className} ${isLoaded ? 'loaded' : 'loading'}`}
        style={{
          ...imageStyle,
          ...style,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

// Export a wrapper for easy migration from img tags
export const Img = (props) => <LazyImage {...props} />;

export default LazyImage;