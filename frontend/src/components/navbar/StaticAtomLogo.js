import React from 'react';
import { useNavigate } from 'react-router-dom';

// Static 3D Logo Component - Glowing Cube - EXACT COPY from Navbar.js
const StaticAtomLogo = ({ size = 60, isGlowing = false, isClickable = false }) => {
  const navigate = useNavigate();
  const adjustedSize = size * 0.5; // Make it 50% of the original size
  const cubeSize = adjustedSize * 0.5;
  
  const handleClick = () => {
    if (isClickable) {
      navigate('/');
    }
  };

  return (
    <div 
      onClick={handleClick}
      style={{
        width: adjustedSize,
        height: adjustedSize,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '150px',
        filter: isGlowing ? 'drop-shadow(0 0 30px rgba(0, 255, 127, 0.8))' : 'none',
        transition: 'filter 0.3s ease',
        cursor: isClickable ? 'pointer' : 'default'
      }}>
      {/* 3D cube container */}
      <div style={{
        width: cubeSize,
        height: cubeSize,
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: 'rotateX(-30deg) rotateY(45deg)'
      }}>
        {/* Front face */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: isGlowing ? 'rgba(0, 255, 127, 0.3)' : 'rgba(0, 255, 127, 0.1)',
          border: `2px solid ${isGlowing ? '#40ffb0' : '#00ff7f'}`,
          transform: `translateZ(${cubeSize/2}px)`,
          boxShadow: 'inset 0 0 20px rgba(0, 255, 127, 0.3)',
          transition: 'all 0.3s ease'
        }}>
          {/* Center dot on front face */}
          <div style={{
            position: 'absolute',
            width: '30%',
            height: '30%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, #00ff7f 0%, transparent 70%)',
            borderRadius: '50%'
          }} />
        </div>
        
        {/* Back face */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: isGlowing ? 'rgba(0, 255, 127, 0.15)' : 'rgba(0, 255, 127, 0.05)',
          border: `2px solid ${isGlowing ? '#00ff7f' : 'rgba(0, 255, 127, 0.5)'}`,
          transform: `rotateY(180deg) translateZ(${cubeSize/2}px)`,
          transition: 'all 0.3s ease',
          boxShadow: isGlowing ? 'inset 0 0 20px rgba(0, 255, 127, 0.5)' : 'none'
        }} />
        
        {/* Right face */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: isGlowing ? 'rgba(0, 255, 127, 0.2)' : 'rgba(0, 255, 127, 0.08)',
          border: `2px solid ${isGlowing ? '#00ff7f' : 'rgba(0, 255, 127, 0.8)'}`,
          transform: `rotateY(90deg) translateZ(${cubeSize/2}px)`,
          transition: 'all 0.3s ease',
          boxShadow: isGlowing ? 'inset 0 0 20px rgba(0, 255, 127, 0.5)' : 'none'
        }} />
        
        {/* Left face */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: isGlowing ? 'rgba(0, 255, 127, 0.2)' : 'rgba(0, 255, 127, 0.06)',
          border: `2px solid ${isGlowing ? '#00ff7f' : 'rgba(0, 255, 127, 0.6)'}`,
          transform: `rotateY(-90deg) translateZ(${cubeSize/2}px)`,
          transition: 'all 0.3s ease',
          boxShadow: isGlowing ? 'inset 0 0 20px rgba(0, 255, 127, 0.5)' : 'none'
        }} />
        
        {/* Top face */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: isGlowing ? 'rgba(0, 255, 127, 0.35)' : 'rgba(0, 255, 127, 0.12)',
          border: `2px solid ${isGlowing ? '#40ffb0' : '#00ff7f'}`,
          transform: `rotateX(90deg) translateZ(${cubeSize/2}px)`,
          transition: 'all 0.3s ease',
          boxShadow: isGlowing ? 'inset 0 0 20px rgba(0, 255, 127, 0.5)' : 'none'
        }} />
        
        {/* Bottom face */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: isGlowing ? 'rgba(0, 255, 127, 0.15)' : 'rgba(0, 255, 127, 0.04)',
          border: `2px solid ${isGlowing ? '#00ff7f' : 'rgba(0, 255, 127, 0.4)'}`,
          transform: `rotateX(-90deg) translateZ(${cubeSize/2}px)`,
          transition: 'all 0.3s ease',
          boxShadow: isGlowing ? 'inset 0 0 20px rgba(0, 255, 127, 0.5)' : 'none'
        }} />
        
        {/* Inner glow */}
        <div style={{
          position: 'absolute',
          width: isGlowing ? '70%' : '50%',
          height: isGlowing ? '70%' : '50%',
          top: isGlowing ? '15%' : '25%',
          left: isGlowing ? '15%' : '25%',
          background: isGlowing 
            ? 'radial-gradient(circle, rgba(0, 255, 127, 0.8) 0%, transparent 70%)' 
            : 'radial-gradient(circle, rgba(0, 255, 127, 0.4) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: isGlowing ? 'blur(15px)' : 'blur(10px)',
          transition: 'all 0.3s ease'
        }} />
      </div>
      
      {/* Outer glow effect */}
      <div style={{
        position: 'absolute',
        inset: '-20%',
        background: isGlowing 
          ? 'radial-gradient(circle, rgba(0, 255, 127, 0.3) 0%, transparent 60%)'
          : 'radial-gradient(circle, rgba(0, 255, 127, 0.15) 0%, transparent 60%)',
        filter: 'blur(15px)',
        pointerEvents: 'none',
        transition: 'all 0.3s ease'
      }} />
    </div>
  );
};

export default StaticAtomLogo;