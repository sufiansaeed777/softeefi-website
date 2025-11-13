import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Navigation Progress Indicator - EXACT COPY from Navbar.js
const NavigationProgress = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #00ff7f 0%, #00af60 50%, #00ff7f 100%)',
            backgroundSize: '200% 100%',
            transformOrigin: 'left',
            zIndex: 1100,
            boxShadow: '0 0 10px rgba(0, 255, 127, 0.8)'
          }}
        >
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '200% 0%']
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: '100%',
              height: '100%',
              background: 'inherit',
              backgroundSize: 'inherit'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavigationProgress;