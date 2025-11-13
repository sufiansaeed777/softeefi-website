import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Navigation Flow Visualizer - shows menu navigation state and data flow
const NavigationFlowVisualizer = ({ isVisible, isServicesMobileOpen, isFreeReportsMobileOpen, currentRoute, loadingRoute }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const nodesRef = useRef([]);
  const dataFlowsRef = useRef([]);
  const timeRef = useRef(0);
  
  // Menu sections as nodes
  const menuSections = [
    { id: 'home', label: 'Home', x: 0.2, active: currentRoute === '/' },
    { id: 'services', label: 'Services', x: 0.4, active: isServicesMobileOpen },
    { id: 'reports', label: 'Reports', x: 0.6, active: isFreeReportsMobileOpen },
    { id: 'contact', label: 'Contact', x: 0.8, active: currentRoute === '/contact' }
  ];
  
  // Data flow particle class
  class DataParticle {
    constructor(startX, endX, color = '#00ff7f') {
      this.startX = startX;
      this.endX = endX;
      this.x = startX;
      this.y = 50;
      this.progress = 0;
      this.color = color;
      this.size = 3;
      this.trail = [];
    }
    
    update() {
      this.progress += 0.03;
      this.x = this.startX + (this.endX - this.startX) * this.progress;
      
      // Add wave motion
      this.y = 50 + Math.sin(this.progress * Math.PI) * 20;
      
      // Update trail
      this.trail.push({ x: this.x, y: this.y, opacity: 1 });
      if (this.trail.length > 10) this.trail.shift();
      this.trail.forEach((point, i) => {
        point.opacity = (i / this.trail.length) * 0.5;
      });
      
      return this.progress < 1;
    }
    
    draw(ctx, width, height) {
      // Draw trail
      this.trail.forEach((point, i) => {
        ctx.fillStyle = this.color + Math.floor(point.opacity * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(point.x * width, point.y * height / 100, this.size * (i / this.trail.length), 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw main particle
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x * width, this.y * height / 100, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create data flows when navigation changes
    if (loadingRoute) {
      const currentSection = menuSections.find(s => s.active);
      const targetSection = menuSections.find(s => s.id === loadingRoute);
      
      if (currentSection && targetSection) {
        dataFlowsRef.current.push(new DataParticle(currentSection.x, targetSection.x));
      }
    }
    
    // Animation loop
    const animate = () => {
      timeRef.current += 0.02;
      
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw connection lines
      ctx.strokeStyle = 'rgba(0, 255, 127, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      menuSections.forEach((section, i) => {
        if (i < menuSections.length - 1) {
          ctx.moveTo(section.x * canvas.width, canvas.height / 2);
          ctx.lineTo(menuSections[i + 1].x * canvas.width, canvas.height / 2);
        }
      });
      ctx.stroke();
      
      // Draw nodes
      menuSections.forEach(section => {
        const x = section.x * canvas.width;
        const y = canvas.height / 2;
        
        // Outer ring (pulsing if active)
        ctx.beginPath();
        const ringSize = section.active ? 20 + Math.sin(timeRef.current * 3) * 3 : 15;
        ctx.arc(x, y, ringSize, 0, Math.PI * 2);
        ctx.strokeStyle = section.active ? '#00ff7f' : 'rgba(0, 255, 127, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Inner node
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = section.active ? '#00ff7f' : 'rgba(0, 255, 127, 0.5)';
        ctx.fill();
        
        // Label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(section.label, x, y + 35);
      });
      
      // Update and draw data flows
      dataFlowsRef.current = dataFlowsRef.current.filter(flow => {
        const active = flow.update();
        flow.draw(ctx, canvas.width, canvas.height);
        return active;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, isServicesMobileOpen, isFreeReportsMobileOpen, currentRoute, loadingRoute]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '80px',
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 100%)',
        pointerEvents: 'none'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%'
        }}
      />
    </motion.div>
  );
};

export default NavigationFlowVisualizer;