import React from 'react';
import { motion } from 'framer-motion';

const ClaudeCodeBadge = ({ variant = 'default', isMobile = false }) => {
  // Compact variant for smaller sections
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem 1.5rem',
          background: 'linear-gradient(135deg, rgba(0,255,127,0.2) 0%, rgba(0,230,115,0.1) 100%)',
          border: '2px solid rgba(0, 255, 127, 0.4)',
          borderRadius: '50px',
          marginBottom: '1.5rem'
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>⚡</span>
        <div>
          <div style={{
            fontSize: '0.85rem',
            fontWeight: '700',
            color: '#00ff7f',
            letterSpacing: '0.5px'
          }}>
            POWERED BY CLAUDE CODE
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: '#c9d1d9',
            marginTop: '2px'
          }}>
            10x Faster • Zero Compromise • Day-One Experts
          </div>
        </div>
      </motion.div>
    );
  }

  // Banner variant for prominent sections
  if (variant === 'banner') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'linear-gradient(135deg, rgba(0,255,127,0.15) 0%, rgba(0,230,115,0.08) 100%)',
          border: '2px solid rgba(0, 255, 127, 0.3)',
          borderRadius: '15px',
          padding: isMobile ? '1.5rem' : '2rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '0.75rem',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: '1.5rem' }}>⚡</span>
          <h4 style={{
            fontSize: isMobile ? '1rem' : '1.2rem',
            fontWeight: '700',
            color: '#00ff7f',
            margin: 0,
            letterSpacing: '0.5px'
          }}>
            ENTERPRISE-SCALE PROJECTS • STARTUP SPEED
          </h4>
          <span style={{ fontSize: '1.5rem' }}>🚀</span>
        </div>
        <p style={{
          fontSize: isMobile ? '0.9rem' : '1rem',
          color: '#c9d1d9',
          lineHeight: '1.7',
          margin: 0,
          maxWidth: '800px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <strong style={{ color: '#ffffff' }}>Why short timelines?</strong> We're Claude Code masters since day one—
          delivering complex, production-ready systems in weeks, not months. <strong style={{ color: '#00ff7f' }}>10x faster</strong> without compromising quality.
        </p>
      </motion.div>
    );
  }

  // Default variant - centered badge
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2rem'
      }}
    >
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem 2rem',
        background: 'linear-gradient(135deg, rgba(0,255,127,0.2) 0%, rgba(0,230,115,0.1) 100%)',
        border: '2px solid rgba(0, 255, 127, 0.4)',
        borderRadius: '50px'
      }}>
        <span style={{ fontSize: '1.8rem' }}>⚡</span>
        <div style={{ textAlign: 'left' }}>
          <div style={{
            fontSize: '0.9rem',
            fontWeight: '700',
            color: '#00ff7f',
            letterSpacing: '0.5px'
          }}>
            POWERED BY CLAUDE CODE
          </div>
          <div style={{
            fontSize: '0.8rem',
            color: '#c9d1d9',
            marginTop: '3px'
          }}>
            10x Speed • Enterprise Quality • Since Day One
          </div>
        </div>
        <span style={{ fontSize: '1.8rem' }}>🚀</span>
      </div>
    </motion.div>
  );
};

export default ClaudeCodeBadge;
