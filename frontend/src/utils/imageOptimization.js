/**
 * Image optimization utilities
 * These functions help optimize images for web performance
 */

/**
 * Convert image URL to use CDN with optimization parameters
 * @param {string} src - Original image source
 * @param {Object} options - Optimization options
 * @returns {string} - Optimized image URL
 */
export const getCDNImageUrl = (src, options = {}) => {
  // If using a CDN like Cloudinary, Imgix, or Fastly
  // This is an example using URL parameters for optimization
  
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto', // auto will serve WebP when supported
    fit = 'cover',
    dpr = window.devicePixelRatio || 1
  } = options;

  // If already a CDN URL, add parameters
  if (src.includes('cloudinary.com')) {
    const transformations = [];
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    transformations.push(`q_${quality}`);
    transformations.push(`f_${format}`);
    transformations.push(`c_${fit}`);
    transformations.push(`dpr_${dpr}`);
    
    // Insert transformations into Cloudinary URL
    const parts = src.split('/upload/');
    if (parts.length === 2) {
      return `${parts[0]}/upload/${transformations.join(',')}/${parts[1]}`;
    }
  }

  // For local images, you could use a service like Thumbor or ImageProxy
  // or implement your own image optimization server
  
  return src;
};

/**
 * Generate responsive image sizes based on layout
 * @param {string} layout - Layout type (hero, card, thumbnail, etc.)
 * @returns {string} - Sizes attribute for responsive images
 */
export const getResponsiveSizes = (layout) => {
  const sizesMap = {
    'hero': '100vw',
    'card': '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    'thumbnail': '(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px',
    'gallery': '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    'full': '100vw',
    'half': '(max-width: 768px) 100vw, 50vw',
    'third': '(max-width: 768px) 100vw, 33vw'
  };

  return sizesMap[layout] || '100vw';
};

/**
 * Calculate optimal image dimensions based on container and DPR
 * @param {number} containerWidth - Container width in pixels
 * @param {number} aspectRatio - Image aspect ratio (width/height)
 * @returns {Object} - Optimal width and height
 */
export const calculateOptimalDimensions = (containerWidth, aspectRatio = 16/9) => {
  const dpr = window.devicePixelRatio || 1;
  const optimalWidth = Math.round(containerWidth * dpr);
  const optimalHeight = Math.round(optimalWidth / aspectRatio);
  
  // Cap at reasonable maximum to avoid huge images
  const maxWidth = 2560;
  if (optimalWidth > maxWidth) {
    return {
      width: maxWidth,
      height: Math.round(maxWidth / aspectRatio)
    };
  }
  
  return {
    width: optimalWidth,
    height: optimalHeight
  };
};

/**
 * Preload critical images
 * @param {Array} imagePaths - Array of image paths to preload
 */
export const preloadImages = (imagePaths) => {
  imagePaths.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    
    // Add fetchpriority for LCP images
    if (imagePaths.indexOf(src) === 0) {
      link.fetchPriority = 'high';
    }
    
    document.head.appendChild(link);
  });
};

/**
 * Create blur data URL for placeholder
 * @param {string} src - Image source
 * @returns {Promise<string>} - Base64 encoded blur placeholder
 */
export const createBlurPlaceholder = async (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Create tiny version (10px wide)
      const width = 10;
      const height = Math.round((img.height / img.width) * width);
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and blur
      ctx.filter = 'blur(1px)';
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert to base64
      resolve(canvas.toDataURL('image/jpeg', 0.5));
    };
    
    img.onerror = () => {
      // Return a default placeholder on error
      resolve('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWExYSIvPjwvc3ZnPg==');
    };
    
    img.src = src;
  });
};

/**
 * Check if image is in viewport
 * @param {HTMLElement} element - Image element
 * @param {number} offset - Offset in pixels to start loading before visible
 * @returns {boolean} - Whether image is in viewport
 */
export const isInViewport = (element, offset = 100) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  return (
    rect.top <= windowHeight + offset &&
    rect.bottom >= -offset &&
    rect.left <= windowWidth + offset &&
    rect.right >= -offset
  );
};

/**
 * Get image format based on browser support
 * @returns {string} - Supported image format
 */
export const getSupportedImageFormat = () => {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  
  // Check AVIF support
  if (canvas.toDataURL('image/avif').indexOf('image/avif') === 5) {
    return 'avif';
  }
  
  // Check WebP support
  if (canvas.toDataURL('image/webp').indexOf('image/webp') === 5) {
    return 'webp';
  }
  
  // Default to JPEG
  return 'jpeg';
};

/**
 * Load image with retry logic
 * @param {string} src - Image source
 * @param {number} maxRetries - Maximum number of retries
 * @returns {Promise} - Promise that resolves when image loads
 */
export const loadImageWithRetry = (src, maxRetries = 3) => {
  return new Promise((resolve, reject) => {
    let retries = 0;
    
    const tryLoad = () => {
      const img = new Image();
      
      img.onload = () => resolve(img);
      img.onerror = () => {
        if (retries < maxRetries) {
          retries++;
          setTimeout(tryLoad, 1000 * retries); // Exponential backoff
        } else {
          reject(new Error(`Failed to load image after ${maxRetries} retries`));
        }
      };
      
      img.src = src;
    };
    
    tryLoad();
  });
};