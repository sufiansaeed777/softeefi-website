import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useInView } from 'react-intersection-observer';
import styles from './OptimizedTestimonials.module.css';

// Memoized testimonial card component
const TestimonialCard = React.memo(({ testimonial, style, isSelected, onSelect }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div 
      ref={ref}
      className={styles.testimonialCard}
      style={style}
      onClick={onSelect}
      data-selected={isSelected}
    >
      {inView && (
        <>
          <div className={styles.rating}>
            {[...Array(5)].map((_, i) => (
              <span key={i} className={styles.star}>★</span>
            ))}
          </div>
          
          <p className={styles.content}>"{testimonial.content}"</p>
          
          <div className={styles.author}>
            {testimonial.image ? (
              <img 
                src={testimonial.image}
                alt={testimonial.author}
                className={styles.authorImage}
                onLoad={() => setImageLoaded(true)}
                style={{ opacity: imageLoaded ? 1 : 0 }}
                loading="lazy"
              />
            ) : (
              <div className={styles.authorInitial}>
                {testimonial.author.charAt(0)}
              </div>
            )}
            
            <div className={styles.authorInfo}>
              <h4 className={styles.authorName}>
                {testimonial.author}
                {testimonial.flag && (
                  <img 
                    src={`https://flagcdn.com/24x18/${testimonial.flag.toLowerCase()}.webp`}
                    alt={`${testimonial.flag} flag`}
                    className={styles.flag}
                    loading="lazy"
                  />
                )}
              </h4>
              <p className={styles.authorPosition}>
                {testimonial.position} • {testimonial.company}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

// Optimized infinite scroll component
const InfiniteTestimonialScroll = React.memo(({ testimonials, autoScroll = true, speed = 45 }) => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [offset, setOffset] = useState(0);
  
  // Use modulo for infinite scroll without duplicating array
  const getTestimonial = useCallback((index) => {
    return testimonials[index % testimonials.length];
  }, [testimonials]);
  
  // Optimized scroll animation using requestAnimationFrame
  useEffect(() => {
    if (!autoScroll || isPaused) return;
    
    let animationId;
    let lastTime = 0;
    const pixelsPerSecond = 50; // Adjust speed here
    
    const animate = (currentTime) => {
      if (lastTime !== 0) {
        const deltaTime = currentTime - lastTime;
        const deltaPixels = (deltaTime / 1000) * pixelsPerSecond;
        
        setOffset(prev => {
          const newOffset = prev + deltaPixels;
          // Reset when scrolled one full width
          if (scrollRef.current && newOffset >= scrollRef.current.scrollWidth / 2) {
            return 0;
          }
          return newOffset;
        });
      }
      
      lastTime = currentTime;
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [autoScroll, isPaused]);
  
  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);
  
  // Render optimized list
  const renderItems = useMemo(() => {
    // Render 2x items for seamless loop
    const items = [];
    for (let i = 0; i < testimonials.length * 2; i++) {
      items.push(
        <TestimonialCard
          key={i}
          testimonial={getTestimonial(i)}
          isSelected={false}
        />
      );
    }
    return items;
  }, [testimonials, getTestimonial]);
  
  return (
    <div 
      ref={containerRef}
      className={styles.scrollContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={scrollRef}
        className={styles.scrollContent}
        style={{ transform: `translateX(-${offset}px)` }}
      >
        {renderItems}
      </div>
    </div>
  );
});

InfiniteTestimonialScroll.displayName = 'InfiniteTestimonialScroll';

// Virtual scrolling for mobile with large lists
const VirtualTestimonialList = React.memo(({ testimonials, height = 600 }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  const handleSelect = useCallback((index) => {
    setSelectedIndex(prev => prev === index ? null : index);
  }, []);
  
  const Row = useCallback(({ index, style }) => (
    <TestimonialCard
      testimonial={testimonials[index]}
      style={style}
      isSelected={selectedIndex === index}
      onSelect={() => handleSelect(index)}
    />
  ), [testimonials, selectedIndex, handleSelect]);
  
  return (
    <List
      height={height}
      itemCount={testimonials.length}
      itemSize={250} // Height of each testimonial card
      width="100%"
      className={styles.virtualList}
    >
      {Row}
    </List>
  );
});

VirtualTestimonialList.displayName = 'VirtualTestimonialList';

// Main optimized testimonials component
const OptimizedTestimonials = React.memo(({ 
  testimonials = [], 
  variant = 'scroll', // 'scroll' | 'virtual' | 'static'
  autoScroll = true,
  height = 600 
}) => {
  const isMobile = useMemo(() => {
    return typeof window !== 'undefined' && window.innerWidth <= 768;
  }, []);
  
  // Memoize filtered testimonials if needed
  const processedTestimonials = useMemo(() => {
    if (!testimonials || !Array.isArray(testimonials)) return [];
    return testimonials.slice(0, 100); // Limit for performance
  }, [testimonials]);
  
  // Choose rendering method based on variant and device
  if (variant === 'virtual' || (isMobile && processedTestimonials.length > 20)) {
    return (
      <div className={styles.container}>
        <VirtualTestimonialList 
          testimonials={processedTestimonials} 
          height={height}
        />
      </div>
    );
  }
  
  if (variant === 'scroll' && !isMobile) {
    return (
      <div className={styles.container}>
        <InfiniteTestimonialScroll 
          testimonials={processedTestimonials}
          autoScroll={autoScroll}
        />
      </div>
    );
  }
  
  // Static grid for simple cases
  return (
    <div className={styles.staticGrid}>
      {processedTestimonials.slice(0, 6).map((testimonial, index) => (
        <TestimonialCard
          key={index}
          testimonial={testimonial}
          isSelected={false}
        />
      ))}
    </div>
  );
});

OptimizedTestimonials.displayName = 'OptimizedTestimonials';

export default OptimizedTestimonials;
export { TestimonialCard, InfiniteTestimonialScroll, VirtualTestimonialList };