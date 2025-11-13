// Advanced Sparkle Animation Component for Navbar
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Floating Orbs Component
export const FloatingOrbs = ({ count = 5, color = '#00ff7f' }) => {
  const orbs = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
  }));

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 0,
    }}>
      {orbs.map(orb => (
        <motion.div
          key={orb.id}
          style={{
            position: 'absolute',
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
            filter: 'blur(3px)',
          }}
          initial={{
            x: `${orb.initialX}vw`,
            y: `${orb.initialY}vh`,
          }}
          animate={{
            x: [`${orb.initialX}vw`, `${(orb.initialX + 50) % 100}vw`, `${orb.initialX}vw`],
            y: [`${orb.initialY}vh`, `${(orb.initialY + 30) % 100}vh`, `${orb.initialY}vh`],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Sparkle Burst Component
export const SparkleBurst = ({ trigger, position = { x: 0, y: 0 } }) => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    if (trigger) {
      const newSparkles = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        angle: (360 / 12) * i,
        distance: Math.random() * 100 + 50,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 0.5 + 0.5,
      }));
      setSparkles(newSparkles);

      setTimeout(() => setSparkles([]), 1000);
    }
  }, [trigger]);

  return (
    <AnimatePresence>
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            width: sparkle.size,
            height: sparkle.size,
            borderRadius: '50%',
            background: '#00ff7f',
            boxShadow: '0 0 10px #00ff7f',
            pointerEvents: 'none',
            zIndex: 1000,
          }}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [1, 0],
            x: Math.cos(sparkle.angle * Math.PI / 180) * sparkle.distance,
            y: Math.sin(sparkle.angle * Math.PI / 180) * sparkle.distance,
          }}
          exit={{ scale: 0 }}
          transition={{ duration: sparkle.duration, ease: "easeOut" }}
        />
      ))}
    </AnimatePresence>
  );
};

// Interactive Sparkle Trail
export const SparkleTrail = ({ isActive }) => {
  const [trail, setTrail] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const newSparkle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 3 + 1,
      };
      
      setTrail(prev => [...prev.slice(-20), newSparkle]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isActive]);

  useEffect(() => {
    const cleanup = setInterval(() => {
      setTrail(prev => prev.filter(sparkle => Date.now() - sparkle.id < 1000));
    }, 100);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <>
      {trail.map(sparkle => (
        <motion.div
          key={sparkle.id}
          style={{
            position: 'fixed',
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            borderRadius: '50%',
            background: '#00ff7f',
            boxShadow: '0 0 6px #00ff7f',
            pointerEvents: 'none',
            zIndex: 999,
          }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}
    </>
  );
};

// Animated Glow Lines
export const GlowLines = ({ scrolled }) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '2px',
      overflow: 'hidden',
      zIndex: 10,
    }}>
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '0%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, #00ff7f, transparent)',
          opacity: scrolled ? 0.8 : 0,
        }}
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// Morphing Background Blob
export const MorphingBlob = ({ color = '#00ff7f', size = 400 }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: size,
      height: size,
      pointerEvents: 'none',
      zIndex: -1,
      opacity: 0.1,
    }}>
      <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00af60" stopOpacity="0.4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d="M100,20 Q140,40 160,80 Q180,120 160,160 Q140,200 100,180 Q60,160 40,120 Q20,80 40,40 Q60,0 100,20 Z"
          fill="url(#gradient)"
          filter="url(#glow)"
          animate={{
            d: [
              "M100,20 Q140,40 160,80 Q180,120 160,160 Q140,200 100,180 Q60,160 40,120 Q20,80 40,40 Q60,0 100,20 Z",
              "M100,30 Q130,20 170,70 Q190,110 170,150 Q150,190 100,190 Q50,190 30,150 Q10,110 30,70 Q70,20 100,30 Z",
              "M100,10 Q150,30 180,90 Q170,130 150,170 Q130,210 100,200 Q70,190 50,150 Q30,110 40,70 Q50,30 100,10 Z",
              "M100,20 Q140,40 160,80 Q180,120 160,160 Q140,200 100,180 Q60,160 40,120 Q20,80 40,40 Q60,0 100,20 Z",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
};

// Energy Field Effect
export const EnergyField = ({ isActive, color = '#00ff7f' }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const frameRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    class EnergyParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.life = 1;
        this.decay = Math.random() * 0.01 + 0.005;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        
        if (this.life <= 0) {
          this.life = 1;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.life * 0.5;
        ctx.fillStyle = color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Create particles
    const particleCount = isActive ? 100 : 50;
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new EnergyParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (isActive) {
        // Draw connections between nearby particles
        for (let i = 0; i < particlesRef.current.length; i++) {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const dx = particlesRef.current[i].x - particlesRef.current[j].x;
            const dy = particlesRef.current[i].y - particlesRef.current[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.save();
              ctx.globalAlpha = (1 - distance / 100) * 0.2;
              ctx.strokeStyle = color;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
              ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
              ctx.stroke();
              ctx.restore();
            }
          }
        }
      }
      
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isActive, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.6,
      }}
    />
  );
};

// Combined Navbar Effects Component
export const NavbarEffects = ({ scrolled, menuOpen }) => {
  const [sparklePosition, setSparklePosition] = useState(null);
  const [triggerSparkle, setTriggerSparkle] = useState(false);

  const handleClick = (e) => {
    setSparklePosition({ x: e.clientX, y: e.clientY });
    setTriggerSparkle(prev => !prev);
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <FloatingOrbs count={3} />
      <MorphingBlob />
      <EnergyField isActive={menuOpen} />
      <GlowLines scrolled={scrolled} />
      <SparkleTrail isActive={menuOpen} />
      {sparklePosition && (
        <SparkleBurst trigger={triggerSparkle} position={sparklePosition} />
      )}
    </>
  );
};

export default NavbarEffects;