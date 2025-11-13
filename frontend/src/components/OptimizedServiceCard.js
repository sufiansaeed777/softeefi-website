import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLazyLoad } from '../hooks/useOptimized';
import styles from './OptimizedServiceCard.module.css';

// Memoized service card with optimized rendering
const OptimizedServiceCard = React.memo(({ 
  service, 
  index = 0,
  onClick,
  variant = 'default' // 'default' | 'compact' | 'detailed'
}) => {
  const [imageRef, isImageVisible] = useLazyLoad();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Memoize animation variants
  const animationVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: index * 0.1,
        duration: 0.3
      }
    },
    hover: {
      y: -10,
      transition: { duration: 0.2 }
    }
  }), [index]);
  
  // Optimized event handlers
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleClick = useCallback(() => {
    if (onClick) onClick(service);
  }, [onClick, service]);
  
  // Memoize icon rendering
  const IconComponent = useMemo(() => {
    if (!service.icon) return null;
    
    // If icon is a component
    if (typeof service.icon === 'function') {
      return service.icon;
    }
    
    // If icon is a string (emoji or svg)
    if (typeof service.icon === 'string') {
      return () => <span className={styles.iconEmoji}>{service.icon}</span>;
    }
    
    return null;
  }, [service.icon]);
  
  // Choose class based on variant
  const cardClass = useMemo(() => {
    switch(variant) {
      case 'compact': return styles.cardCompact;
      case 'detailed': return styles.cardDetailed;
      default: return styles.card;
    }
  }, [variant]);
  
  return (
    <motion.article
      className={cardClass}
      variants={animationVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${service.title} service`}
    >
      {/* Icon/Image Section */}
      {service.image ? (
        <div ref={imageRef} className={styles.imageContainer}>
          {isImageVisible && (
            <img
              src={service.image}
              alt={service.title}
              className={styles.image}
              onLoad={() => setImageLoaded(true)}
              style={{ opacity: imageLoaded ? 1 : 0 }}
              loading="lazy"
            />
          )}
        </div>
      ) : IconComponent ? (
        <div className={styles.iconContainer}>
          <IconComponent />
        </div>
      ) : null}
      
      {/* Content Section */}
      <div className={styles.content}>
        <h3 className={styles.title}>{service.title}</h3>
        
        {service.description && (
          <p className={styles.description}>{service.description}</p>
        )}
        
        {/* Features List */}
        {service.features && variant !== 'compact' && (
          <ul className={styles.features}>
            {service.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                {feature}
              </li>
            ))}
          </ul>
        )}
        
        {/* Price */}
        {service.price && (
          <div className={styles.price}>
            {service.price.startingAt && (
              <span className={styles.priceLabel}>Starting at</span>
            )}
            <span className={styles.priceAmount}>{service.price.amount}</span>
          </div>
        )}
        
        {/* CTA Button */}
        {service.cta && (
          <button 
            className={styles.ctaButton}
            aria-label={service.cta}
          >
            {service.cta}
            <span className={styles.arrow}>→</span>
          </button>
        )}
      </div>
      
      {/* Hover Overlay Effect */}
      <div 
        className={styles.hoverOverlay}
        style={{ opacity: isHovered ? 1 : 0 }}
      />
    </motion.article>
  );
});

OptimizedServiceCard.displayName = 'OptimizedServiceCard';

// Optimized service grid component
export const OptimizedServiceGrid = React.memo(({ 
  services, 
  columns = 3,
  gap = '2rem',
  onServiceClick 
}) => {
  const gridStyle = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${300}px, 1fr))`,
    gap: gap,
    padding: '2rem 0'
  }), [gap]);
  
  return (
    <div style={gridStyle}>
      {services.map((service, index) => (
        <OptimizedServiceCard
          key={service.id || index}
          service={service}
          index={index}
          onClick={onServiceClick}
        />
      ))}
    </div>
  );
});

OptimizedServiceGrid.displayName = 'OptimizedServiceGrid';

export default OptimizedServiceCard;