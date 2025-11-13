import React from 'react';
import { motion } from 'framer-motion';
import { space, fontSize, colors } from '../utils/designTokens';

// Skeleton loader for text content
export const TextSkeleton = ({ lines = 3, width = '100%' }) => (
  <div style={{ width }}>
    {[...Array(lines)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          height: '1em',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
          borderRadius: '4px',
          marginBottom: i < lines - 1 ? space.sm : 0,
          width: i === lines - 1 ? '70%' : '100%',
        }}
      />
    ))}
  </div>
);

// Skeleton loader for cards
export const CardSkeleton = () => (
  <motion.div
    animate={{
      opacity: [0.5, 0.8, 0.5],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    style={{
      background: 'rgba(255,255,255,0.02)',
      borderRadius: '20px',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.05)',
    }}
  >
    {/* Image skeleton */}
    <div style={{
      height: '240px',
      background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
    }} />
    
    {/* Content skeleton */}
    <div style={{ padding: space.xl }}>
      <div style={{
        height: '1.5em',
        width: '80%',
        background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
        borderRadius: '4px',
        marginBottom: space.md,
      }} />
      <TextSkeleton lines={2} />
    </div>
  </motion.div>
);

// Grid skeleton loader
export const GridSkeleton = ({ count = 6, columns = 3 }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${columns === 2 ? '400px' : '300px'}, 1fr))`,
    gap: space.xl,
  }}>
    {[...Array(count)].map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

// Spinner loader
export const Spinner = ({ size = 40, color = colors.green.accent }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    }}
    style={{
      width: size,
      height: size,
      border: `3px solid rgba(0, 255, 127, 0.1)`,
      borderTopColor: color,
      borderRadius: '50%',
    }}
  />
);

// Full page loader
export const PageLoader = ({ message = 'Loading...' }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: colors.black.primary,
      zIndex: 9999,
    }}
  >
    <Spinner size={60} />
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      style={{
        marginTop: space.xl,
        color: colors.text.medium,
        fontSize: fontSize.base,
      }}
    >
      {message}
    </motion.p>
  </motion.div>
);

// Button loader
export const ButtonLoader = () => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: space.sm,
  }}>
    <Spinner size={16} color={colors.black.primary} />
    <span>Loading...</span>
  </div>
);

// Progress bar
export const ProgressBar = ({ progress = 0, height = 4 }) => (
  <div style={{
    width: '100%',
    height,
    background: 'rgba(255,255,255,0.1)',
    borderRadius: height / 2,
    overflow: 'hidden',
  }}>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        height: '100%',
        background: `linear-gradient(90deg, ${colors.green.accent} 0%, ${colors.green.darker} 100%)`,
        boxShadow: `0 0 10px ${colors.green.accent}`,
      }}
    />
  </div>
);

// Empty state
export const EmptyState = ({ 
  icon = '📭', 
  title = 'No items found', 
  description = 'Try adjusting your filters or search criteria',
  action = null 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    style={{
      textAlign: 'center',
      padding: space['4xl'],
      maxWidth: '400px',
      margin: '0 auto',
    }}
  >
    <motion.div
      animate={{ 
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity,
        repeatType: "reverse"
      }}
      style={{ 
        fontSize: fontSize['5xl'], 
        marginBottom: space.lg,
        filter: 'grayscale(0.5)'
      }}
    >
      {icon}
    </motion.div>
    <h3 style={{
      color: colors.text.heading,
      fontSize: fontSize.xl,
      fontWeight: 600,
      marginBottom: space.sm,
    }}>
      {title}
    </h3>
    <p style={{
      color: colors.text.medium,
      fontSize: fontSize.base,
      marginBottom: action ? space.xl : 0,
    }}>
      {description}
    </p>
    {action}
  </motion.div>
);