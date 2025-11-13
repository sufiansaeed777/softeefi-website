import React, { lazy, Suspense, Component } from 'react';
import { motion } from 'framer-motion';

// Fallback component for loading state
const LoadingFallback = ({ height = '400px', message = 'Loading...' }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      width: '100%',
      height,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255, 255, 255, 0.02)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)'
    }}
  >
    <motion.div
      animate={{ 
        rotate: 360 
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity,
        ease: 'linear'
      }}
      style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(0, 255, 127, 0.1)',
        borderTopColor: '#00ff7f',
        borderRadius: '50%',
        marginBottom: '1rem'
      }}
    />
    <p style={{ 
      color: '#a0a0a0', 
      fontSize: '0.9rem',
      margin: 0 
    }}>
      {message}
    </p>
  </motion.div>
);

// Lazy load heavy 3D components
export const LazyThreeBackground = lazy(() => import('./ThreeBackground'));
export const LazyDataFlowAnimation = lazy(() => import('./DataFlowAnimation'));
export const LazyDataFlowAnimationSVG = lazy(() => import('./DataFlowAnimationSVG'));
export const LazyCircuitAnimation = lazy(() => import('./CircuitAnimation'));

// Error boundary for 3D components
class ThreeDErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('3D Component Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Return gradient fallback on error
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          background: 'linear-gradient(135deg, #0d1117 0%, #001f3f 100%)',
          pointerEvents: 'none'
        }} />
      );
    }

    return this.props.children;
  }
}

// Wrapper component for lazy loading with proper error boundary
export const WithLazyLoad = ({ 
  Component, 
  fallbackHeight = '400px',
  fallbackMessage = 'Loading 3D graphics...',
  disable3D = false,
  ...props 
}) => {
  // Check if we should disable 3D
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const isLowEndDevice = typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 2;
  const shouldDisable3D = disable3D || (isMobile && isLowEndDevice);
  
  if (shouldDisable3D) {
    // Return gradient background instead of 3D
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'linear-gradient(135deg, #0d1117 0%, #001f3f 100%)',
        pointerEvents: 'none'
      }} />
    );
  }
  
  return (
    <ThreeDErrorBoundary>
      <Suspense fallback={<LoadingFallback height={fallbackHeight} message={fallbackMessage} />}>
        <Component {...props} />
      </Suspense>
    </ThreeDErrorBoundary>
  );
};

// Pre-configured lazy components with appropriate fallbacks
export const LazyThreeBackgroundWrapper = (props) => {
  // Disable 3D on problematic scenarios
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const forceDisable3D = urlParams?.get('disable3d') === 'true';
  
  return (
    <WithLazyLoad 
      Component={LazyThreeBackground} 
      fallbackHeight="100vh"
      fallbackMessage="Initializing 3D environment..."
      disable3D={forceDisable3D}
      {...props} 
    />
  );
};

export const LazyDataFlowAnimationWrapper = (props) => (
  <WithLazyLoad 
    Component={LazyDataFlowAnimation}
    fallbackHeight="600px" 
    fallbackMessage="Loading data flow visualization..."
    {...props} 
  />
);

export const LazyDataFlowAnimationSVGWrapper = (props) => (
  <WithLazyLoad 
    Component={LazyDataFlowAnimationSVG}
    fallbackHeight="600px" 
    fallbackMessage="Loading data flow visualization..."
    {...props} 
  />
);

export const LazyCircuitAnimationWrapper = (props) => (
  <WithLazyLoad 
    Component={LazyCircuitAnimation}
    fallbackHeight="500px" 
    fallbackMessage="Loading circuit animation..."
    {...props} 
  />
);

// Utility to check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
};

// Component that respects user's motion preferences
export const MotionSafeComponent = ({ children, reducedMotionFallback }) => {
  if (prefersReducedMotion() && reducedMotionFallback) {
    return reducedMotionFallback;
  }
  return children;
};