import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // Check WebGL support
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!gl;
      } catch (e) {
        return false;
      }
    };

    if (!checkWebGLSupport()) {
      setWebGLSupported(false);
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      
      // Create renderer with error handling
      const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "low-power", // Use low power to prevent context loss
        failIfMajorPerformanceCaveat: false // Allow creation even on low-end devices
      });
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Store renderer reference
      rendererRef.current = renderer;
      
      // Only append if mount ref exists
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }

      // Create particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 500; // Reduced count for better performance
      const posArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
      }

      particlesGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(posArray, 3)
      );

      // Material
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: '#00ff7f',
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending
      });

      // Mesh
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);

      // Camera position
      camera.position.z = 3;

      // Mouse movement
      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (event) => {
        mouseX = (event.clientX / width) * 2 - 1;
        mouseY = -(event.clientY / height) * 2 + 1;
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Handle context loss
      const handleContextLost = (event) => {
        event.preventDefault();
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
      };

      const handleContextRestored = () => {
        // Recreate resources if needed
        animate();
      };

      renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);
      renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored, false);

      // Animation
      const animate = () => {
        if (!rendererRef.current) return;
        
        animationIdRef.current = requestAnimationFrame(animate);

        // Rotate particles
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;

        // Mouse interaction
        particlesMesh.rotation.x += mouseY * 0.001;
        particlesMesh.rotation.y += mouseX * 0.001;

        try {
          renderer.render(scene, camera);
        } catch (error) {
          console.error('Render error:', error);
          // Stop animation on error
          if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
          }
        }
      };

      animate();

      // Handle resize
      const handleResize = () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        
        if (rendererRef.current) {
          rendererRef.current.setSize(newWidth, newHeight);
        }
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        
        if (rendererRef.current) {
          rendererRef.current.domElement.removeEventListener('webglcontextlost', handleContextLost);
          rendererRef.current.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
          
          if (mountRef.current && rendererRef.current.domElement.parentNode === mountRef.current) {
            mountRef.current.removeChild(rendererRef.current.domElement);
          }
          
          rendererRef.current.dispose();
          rendererRef.current.forceContextLoss();
          rendererRef.current = null;
        }
        
        // Dispose of geometry and materials
        particlesGeometry.dispose();
        particlesMaterial.dispose();
      };
    } catch (error) {
      console.error('Error initializing Three.js:', error);
      setWebGLSupported(false);
    }
  }, []);

  // Fallback gradient background when WebGL is not supported
  if (!webGLSupported) {
    return (
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          background: 'linear-gradient(135deg, #0d1117 0%, #001f3f 100%)',
          pointerEvents: 'none'
        }}
      />
    );
  }

  return (
    <div 
      ref={mountRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ThreeBackground;