import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

/**
 * Advanced Picture component with WebP support and fallbacks
 * Automatically serves WebP images to supported browsers
 */
const PictureWithFallback = ({
  src,
  alt,
  className,
  style,
  width,
  height,
  loading = 'lazy',
  sizes,
  onClick,
  onLoad,
  onError,
  placeholder,
  effect = 'blur',
  threshold = 100,
  visibleByDefault = false,
  delayTime = 0,
  delayMethod = 'debounce',
  useIntersectionObserver = true,
  scrollPosition,
  wrapperClassName,
  wrapperProps,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isWebPSupported, setIsWebPSupported] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Check WebP support on mount
  useEffect(() => {
    const checkWebPSupport = () => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        setIsWebPSupported(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    };
    
    // Check if browser supports WebP from HTML class
    if (document.documentElement.classList.contains('webp')) {
      setIsWebPSupported(true);
    } else {
      checkWebPSupport();
    }
  }, []);

  // Generate WebP version of image path
  const getWebPSrc = (originalSrc) => {
    if (!originalSrc) return '';
    
    // If already a WebP image, return as is
    if (originalSrc.toLowerCase().includes('.webp')) {
      return originalSrc;
    }
    
    // Replace extension with .webp
    const lastDotIndex = originalSrc.lastIndexOf('.');
    if (lastDotIndex === -1) return originalSrc;
    
    return originalSrc.substring(0, lastDotIndex) + '.webp';
  };

  // Generate responsive image sources
  const generateSrcSet = (baseSrc, isWebP = false) => {
    if (!baseSrc) return '';
    
    const ext = isWebP ? '.webp' : baseSrc.substring(baseSrc.lastIndexOf('.'));
    const baseWithoutExt = isWebP ? baseSrc.substring(0, baseSrc.lastIndexOf('.')) : baseSrc.substring(0, baseSrc.lastIndexOf('.'));
    
    // Generate common responsive sizes
    const sizes = [320, 640, 768, 1024, 1280, 1920];
    return sizes
      .map(size => `${baseWithoutExt}-${size}w${ext} ${size}w`)
      .join(', ');
  };

  // Handle image load error
  const handleError = (e) => {
    setHasError(true);
    
    // Try fallback to original format if WebP fails
    if (isWebPSupported && imgSrc.includes('.webp')) {
      setImgSrc(src);
    }
    
    if (onError) {
      onError(e);
    }
  };

  // Handle successful load
  const handleLoad = (e) => {
    setHasError(false);
    if (onLoad) {
      onLoad(e);
    }
  };

  // If using picture element for art direction
  const renderPictureElement = () => {
    const webPSrc = getWebPSrc(src);
    
    return (
      <picture className={wrapperClassName} {...wrapperProps}>
        {/* WebP source */}
        {isWebPSupported && !hasError && (
          <source
            type="image/webp"
            srcSet={generateSrcSet(src, true) || webPSrc}
            sizes={sizes}
          />
        )}
        
        {/* Original format source */}
        <source
          type={src.includes('.webp') ? 'image/png' : 'image/jpeg'}
          srcSet={generateSrcSet(src, false) || src}
          sizes={sizes}
        />
        
        {/* Fallback img with lazy loading */}
        <LazyLoadImage
          src={imgSrc}
          alt={alt}
          className={className}
          style={style}
          width={width}
          height={height}
          effect={effect}
          threshold={threshold}
          visibleByDefault={visibleByDefault}
          delayTime={delayTime}
          delayMethod={delayMethod}
          useIntersectionObserver={useIntersectionObserver}
          scrollPosition={scrollPosition}
          placeholder={placeholder}
          onLoad={handleLoad}
          onError={handleError}
          onClick={onClick}
          {...rest}
        />
      </picture>
    );
  };

  // Simple lazy loaded image
  const renderSimpleImage = () => {
    const finalSrc = isWebPSupported && !hasError ? getWebPSrc(src) : src;
    
    return (
      <LazyLoadImage
        src={finalSrc}
        alt={alt}
        className={className}
        style={style}
        width={width}
        height={height}
        effect={effect}
        threshold={threshold}
        visibleByDefault={visibleByDefault}
        delayTime={delayTime}
        delayMethod={delayMethod}
        useIntersectionObserver={useIntersectionObserver}
        scrollPosition={scrollPosition}
        placeholder={placeholder}
        wrapperClassName={wrapperClassName}
        wrapperProps={wrapperProps}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
        {...rest}
      />
    );
  };

  // Use picture element if sizes prop is provided, otherwise use simple image
  return sizes ? renderPictureElement() : renderSimpleImage();
};

export default React.memo(PictureWithFallback);