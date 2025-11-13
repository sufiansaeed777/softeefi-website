import React from 'react';

/**
 * Animation Styles Component
 * Replaces DOM manipulation with proper React approach
 */
const AnimationStyles = React.memo(() => {
  return (
    <style jsx global>{`
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      
      @keyframes scrollTestimonials {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      
      /* Hide scrollbars on testimonials */
      .testimonials-scroll::-webkit-scrollbar {
        display: none;
      }
      
      .testimonials-scroll {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      
      /* Mobile specific styles */
      @media (max-width: 768px) {
        .mobile-scroll-container {
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        
        .mobile-scroll-item {
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }
      }
      
      /* Performance optimizations */
      .gpu-accelerated {
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
        will-change: transform;
      }
      
      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
    `}</style>
  );
});

AnimationStyles.displayName = 'AnimationStyles';

export default AnimationStyles;