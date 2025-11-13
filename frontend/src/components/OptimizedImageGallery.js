import React, { useState, useCallback, useEffect } from 'react';
import PictureWithFallback from './PictureWithFallback';
import { useImageOptimization } from '../hooks/useImageOptimization';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Optimized Image Gallery with lazy loading, WebP support, and lightbox
 */
const OptimizedImageGallery = ({ 
  images = [], 
  columns = 3,
  gap = '1rem',
  enableLightbox = true,
  className = '',
  style = {},
  imageStyle = {},
  imageClassName = '',
  lazyLoadThreshold = 200,
  showCaptions = true
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const { webpSupported, preloadImage } = useImageOptimization();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload next images when one is loaded
  const handleImageLoad = useCallback((index) => {
    setLoadedImages(prev => new Set(prev).add(index));
    
    // Preload next 2 images
    if (index < images.length - 1) {
      const nextImage = images[index + 1];
      if (nextImage?.src) {
        preloadImage(nextImage.src);
      }
    }
    if (index < images.length - 2) {
      const nextNextImage = images[index + 2];
      if (nextNextImage?.src) {
        preloadImage(nextNextImage.src);
      }
    }
  }, [images, preloadImage]);

  // Handle lightbox
  const openLightbox = useCallback((image, index) => {
    if (enableLightbox) {
      setSelectedImage({ ...image, index });
      document.body.style.overflow = 'hidden';
    }
  }, [enableLightbox]);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  }, []);

  // Navigate lightbox
  const navigateLightbox = useCallback((direction) => {
    if (!selectedImage) return;
    
    const newIndex = selectedImage.index + direction;
    if (newIndex >= 0 && newIndex < images.length) {
      setSelectedImage({ ...images[newIndex], index: newIndex });
    }
  }, [selectedImage, images]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateLightbox(-1);
          break;
        case 'ArrowRight':
          navigateLightbox(1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, closeLightbox, navigateLightbox]);

  const responsiveColumns = isMobile ? 1 : columns;

  return (
    <>
      {/* Gallery Grid */}
      <div
        className={`optimized-image-gallery ${className}`}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${responsiveColumns}, 1fr)`,
          gap: gap,
          ...style
        }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '8px',
              cursor: enableLightbox ? 'pointer' : 'default',
              background: '#1a1a1a'
            }}
            whileHover={{ scale: 1.02 }}
            onClick={() => openLightbox(image, index)}
          >
            <PictureWithFallback
              src={image.src}
              alt={image.alt || `Image ${index + 1}`}
              className={imageClassName}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                ...imageStyle
              }}
              effect="blur"
              threshold={lazyLoadThreshold}
              onLoad={() => handleImageLoad(index)}
              placeholder={image.placeholder}
              sizes={isMobile ? '100vw' : `${100 / columns}vw`}
            />
            
            {/* Loading overlay */}
            {!loadedImages.has(index) && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid rgba(0, 255, 127, 0.1)',
                  borderTopColor: '#00ff7f',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
              </div>
            )}
            
            {/* Caption */}
            {showCaptions && image.caption && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1rem',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                color: '#fff',
                fontSize: '0.9rem'
              }}>
                {image.caption}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && enableLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.95)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#fff',
                fontSize: '2rem',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000
              }}
              aria-label="Close"
            >
              ×
            </button>

            {/* Navigation buttons */}
            {selectedImage.index > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox(-1);
                }}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#fff',
                  fontSize: '2rem',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="Previous"
              >
                ‹
              </button>
            )}

            {selectedImage.index < images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox(1);
                }}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#fff',
                  fontSize: '2rem',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="Next"
              >
                ›
              </button>
            )}

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                position: 'relative'
              }}
            >
              <img
                src={webpSupported && !selectedImage.src.includes('.webp') 
                  ? selectedImage.src.replace(/\.[^/.]+$/, '.webp')
                  : selectedImage.src
                }
                alt={selectedImage.alt || ''}
                style={{
                  maxWidth: '100%',
                  maxHeight: '90vh',
                  objectFit: 'contain'
                }}
              />
              
              {/* Caption in lightbox */}
              {selectedImage.caption && (
                <div style={{
                  position: 'absolute',
                  bottom: '-3rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: '1rem',
                  whiteSpace: 'nowrap'
                }}>
                  {selectedImage.caption}
                </div>
              )}
            </motion.div>

            {/* Image counter */}
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#888',
              fontSize: '0.9rem'
            }}>
              {selectedImage.index + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default React.memo(OptimizedImageGallery);