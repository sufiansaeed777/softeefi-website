import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion, useIntersectionObserver } from '../hooks/usePerformance';

// Wrapper component that respects reduced motion preferences
export const MotionSafe = ({ children, ...props }) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    // Return children without animation
    return <div {...props}>{children}</div>;
  }

  return <motion.div {...props}>{children}</motion.div>;
};

// Optimized scroll reveal component
export const ScrollReveal = ({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.1,
  ...props
}) => {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold,
    triggerOnce: once,
  });

  const prefersReducedMotion = usePrefersReducedMotion();

  const animations = {
    fadeUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    fadeDown: {
      hidden: { opacity: 0, y: -30 },
      visible: { opacity: 1, y: 0 },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0 },
    },
    fadeRight: {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    rotate: {
      hidden: { opacity: 0, rotate: -10 },
      visible: { opacity: 1, rotate: 0 },
    },
  };

  const selectedAnimation = animations[animation] || animations.fadeUp;

  if (prefersReducedMotion) {
    return <div ref={ref} {...props}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={selectedAnimation.hidden}
      animate={hasIntersected ? selectedAnimation.visible : selectedAnimation.hidden}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Stagger children animation wrapper
export const StaggerChildren = ({
  children,
  staggerDelay = 0.1,
  once = true,
  ...props
}) => {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: once,
  });

  const prefersReducedMotion = usePrefersReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  if (prefersReducedMotion) {
    return <div ref={ref} {...props}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={hasIntersected ? 'visible' : 'hidden'}
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Parallax scroll effect
export const ParallaxScroll = ({
  children,
  offset = 50,
  speed = 0.5,
  ...props
}) => {
  const [scrollY, setScrollY] = React.useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <div {...props}>{children}</div>;
  }

  return (
    <motion.div
      style={{
        transform: `translateY(${scrollY * speed}px)`,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Hover animation wrapper with performance optimization
export const HoverScale = ({
  children,
  scale = 1.05,
  duration = 0.3,
  ...props
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div {...props}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ duration, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Page transition wrapper
export const PageTransition = ({ children, ...props }) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };

  if (prefersReducedMotion) {
    return <div {...props}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Optimized list animation
export const AnimatedList = ({
  items,
  renderItem,
  staggerDelay = 0.05,
  ...props
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  if (prefersReducedMotion) {
    return (
      <div {...props}>
        {items.map((item, index) => renderItem(item, index))}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {items.map((item, index) => (
        <motion.div key={index} variants={itemVariants}>
          {renderItem(item, index)}
        </motion.div>
      ))}
    </motion.div>
  );
};