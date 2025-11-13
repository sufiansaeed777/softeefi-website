import React from 'react';
import { motion } from 'framer-motion';

// Hamburger Icon Component - EXACT COPY from Navbar.js
const HamburgerIcon = ({ isOpen, onClick }) => {
  return (
    <motion.button 
      onClick={onClick} 
      className="hamburger-button" 
      style={{ 
        position: 'relative', 
        width: '32px', 
        height: '32px', 
        background: 'transparent', 
        border: 'none', 
        cursor: 'pointer', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '4px', 
        padding: '8px', 
        borderRadius: '0', 
        overflow: 'hidden', 
        zIndex: 1002, 
      }} 
      whileHover={{ 
        scale: 1.05
      }} 
      whileTap={{ scale: 0.95 }}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      
      {/* Top line - morphs into X */}
      <motion.span 
        style={{ 
          width: '18px', 
          height: '1.5px', 
          borderRadius: '0', 
          position: 'absolute', 
          top: '10px',
          transformOrigin: 'center',
          background: 'white'
        }} 
        animate={{ 
          rotate: isOpen ? 45 : 0, 
          y: isOpen ? 6 : 0
        }} 
        transition={{ 
          duration: 0.2, 
          ease: "easeInOut" 
        }} 
      />
      
      {/* Middle line - fades out */}
      <motion.span 
        style={{ 
          width: '18px', 
          height: '1.5px', 
          borderRadius: '0', 
          position: 'absolute', 
          top: '15px',
          background: 'white'
        }} 
        animate={{ 
          opacity: isOpen ? 0 : 1
        }} 
        transition={{ 
          duration: 0.2, 
          ease: "easeInOut" 
        }} 
      />
      
      {/* Bottom line - morphs into X */}
      <motion.span 
        style={{ 
          width: '18px', 
          height: '1.5px', 
          borderRadius: '0', 
          position: 'absolute', 
          top: '20px',
          transformOrigin: 'center',
          background: 'white'
        }} 
        animate={{ 
          rotate: isOpen ? -45 : 0, 
          y: isOpen ? -6 : 0
        }} 
        transition={{ 
          duration: 0.2, 
          ease: "easeInOut" 
        }} 
      />
    </motion.button>
  );
};

export default HamburgerIcon;