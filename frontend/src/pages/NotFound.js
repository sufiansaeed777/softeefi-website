import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { space, fontSize, fontWeight, colors } from '../utils/designTokens';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: `${space['2xl']} ${space.xl}`,
      background: '#0d1117',
      color: '#ffffff',
      textAlign: 'center'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: '600px',
          width: '100%'
        }}
      >
        {/* 404 Animation */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            fontSize: 'clamp(6rem, 15vw, 10rem)',
            fontWeight: fontWeight.bold,
            background: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: space.xl,
            lineHeight: 1
          }}
        >
          404
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: fontSize['3xl'],
            fontWeight: fontWeight.bold,
            marginBottom: space.lg,
            color: colors.text.heading
          }}
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: fontSize.lg,
            color: '#c0c0c0', // Improved contrast
            marginBottom: space['2xl'],
            lineHeight: 1.6
          }}
        >
          Oops! The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            display: 'flex',
            gap: space.md,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <motion.button
            onClick={handleGoBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: `${space.md} ${space.xl}`,
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(0, 255, 127, 0.5)',
              borderRadius: '30px',
              color: '#00ff7f',
              fontSize: fontSize.base,
              fontWeight: fontWeight.semibold,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = '0 0 0 3px rgba(0, 255, 127, 0.5)';
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = 'none';
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(0, 255, 127, 0.1)';
              e.target.style.borderColor = '#00ff7f';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.borderColor = 'rgba(0, 255, 127, 0.5)';
            }}
          >
            Go Back
          </motion.button>

          <Link to="/" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: `${space.md} ${space.xl}`,
                background: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
                border: 'none',
                borderRadius: '30px',
                color: '#0d0d0d',
                fontSize: fontSize.base,
                fontWeight: fontWeight.semibold,
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0, 255, 127, 0.3)',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 255, 127, 0.5), 0 4px 15px rgba(0, 255, 127, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = '0 4px 15px rgba(0, 255, 127, 0.3)';
              }}
            >
              Go to Homepage
            </motion.button>
          </Link>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.5 }}
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '100px',
            height: '100px',
            background: 'radial-gradient(circle, rgba(0, 255, 127, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)'
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.6 }}
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '10%',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(0, 255, 127, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }}
        />
      </motion.div>
    </div>
  );
};

export default NotFound;