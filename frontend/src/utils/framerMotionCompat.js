// Compatibility wrapper for framer-motion v11/v12
import * as framerMotion from 'framer-motion';

// Export motion as both named and default export for compatibility
export const motion = framerMotion.motion || framerMotion.default?.motion || framerMotion;
export const AnimatePresence = framerMotion.AnimatePresence;
export const useAnimation = framerMotion.useAnimation;
export const useInView = framerMotion.useInView;
export const useScroll = framerMotion.useScroll;
export const useTransform = framerMotion.useTransform;
export const useMotionValue = framerMotion.useMotionValue;
export const useSpring = framerMotion.useSpring;
export const useVelocity = framerMotion.useVelocity;
export const useAnimationControls = framerMotion.useAnimationControls;
export const animate = framerMotion.animate;
export const stagger = framerMotion.stagger;
export const easeInOut = framerMotion.easeInOut;
export const cubicBezier = framerMotion.cubicBezier;

// Re-export everything else
export * from 'framer-motion';

export default motion;