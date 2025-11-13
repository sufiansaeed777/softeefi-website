import React from 'react';
import { motion } from 'framer-motion';

const PageLoader = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0d1117',
      position: 'relative'
    }}>
      {/* Logo or Brand Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          marginBottom: '2rem'
        }}
      >
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00ff7f 0%, #00cc66 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 40px rgba(0, 255, 127, 0.3)'
        }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid #0d1117',
              borderTopColor: 'transparent',
              borderRadius: '50%'
            }}
          />
        </div>
      </motion.div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          display: 'flex',
          gap: '0.3rem',
          fontSize: '1.2rem',
          color: '#c9d1d9',
          fontWeight: '500'
        }}
      >
        Loading
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              delay: i * 0.2
            }}
          >
            .
          </motion.span>
        ))}
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '200px' }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          height: '2px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          marginTop: '2rem',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, transparent, #00ff7f, transparent)',
            width: '100%'
          }}
        />
      </motion.div>
    </div>
  );
};

export default PageLoader;