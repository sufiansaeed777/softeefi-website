import React, { useEffect, useRef } from 'react';

const CircuitAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let mainNodes = [];
    let circuits = [];
    let pulses = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.7;
      generateCircuitSystem();
    };

    // Main processing nodes
    class ProcessorNode {
      constructor(x, y, type = 'processor') {
        this.x = x;
        this.y = y;
        this.type = type;
        this.radius = type === 'main' ? (window.innerWidth < 768 ? 12 : 15) : (window.innerWidth < 768 ? 8 : 10);
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.connections = [];
        this.activity = 0;
      }

      update() {
        this.pulsePhase += 0.05;
        this.activity *= 0.95; // Decay activity
      }

      activate() {
        this.activity = 1;
      }

      draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.2 + 0.8;
        const glow = this.activity * 20;
        
        // Outer glow when active
        if (this.activity > 0.1) {
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.radius + glow
          );
          gradient.addColorStop(0, `rgba(0, 255, 127, ${this.activity * 0.6})`);
          gradient.addColorStop(1, 'rgba(0, 255, 127, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius + glow, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Node outline
        ctx.strokeStyle = `rgba(0, 255, 127, ${pulse * 0.8})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Inner details based on type
        if (this.type === 'main') {
          // Central processing unit look
          ctx.strokeStyle = `rgba(0, 255, 127, ${pulse * 0.6})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2);
          ctx.stroke();
          
          // Cross pattern
          ctx.beginPath();
          ctx.moveTo(this.x - this.radius * 0.4, this.y);
          ctx.lineTo(this.x + this.radius * 0.4, this.y);
          ctx.moveTo(this.x, this.y - this.radius * 0.4);
          ctx.lineTo(this.x, this.y + this.radius * 0.4);
          ctx.stroke();
        } else {
          // Regular node - simple dot
          ctx.fillStyle = `rgba(0, 255, 127, ${pulse * 0.6})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Circuit path that connects nodes
    class CircuitPath {
      constructor(startNode, endNode) {
        this.startNode = startNode;
        this.endNode = endNode;
        this.path = this.calculatePath();
      }

      calculatePath() {
        const path = [];
        const dx = this.endNode.x - this.startNode.x;
        const dy = this.endNode.y - this.startNode.y;
        
        // Start from node edge
        const startAngle = Math.atan2(dy, dx);
        const startX = this.startNode.x + Math.cos(startAngle) * this.startNode.radius;
        const startY = this.startNode.y + Math.sin(startAngle) * this.startNode.radius;
        
        path.push({ x: startX, y: startY });
        
        // Create L-shaped path with some variation
        const variation = Math.random() * 0.3 + 0.35; // Between 35% and 65%
        
        if (Math.abs(dx) > Math.abs(dy)) {
          // Horizontal first
          const midX = startX + dx * variation;
          path.push({ x: midX, y: startY });
          path.push({ x: midX, y: this.endNode.y });
        } else {
          // Vertical first
          const midY = startY + dy * variation;
          path.push({ x: startX, y: midY });
          path.push({ x: this.endNode.x, y: midY });
        }
        
        // End at node edge
        const endAngle = Math.atan2(-dy, -dx);
        const endX = this.endNode.x + Math.cos(endAngle) * this.endNode.radius;
        const endY = this.endNode.y + Math.sin(endAngle) * this.endNode.radius;
        path.push({ x: endX, y: endY });
        
        return path;
      }

      draw() {
        ctx.strokeStyle = 'rgba(0, 255, 127, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'square';
        ctx.lineJoin = 'miter';
        
        ctx.beginPath();
        ctx.moveTo(this.path[0].x, this.path[0].y);
        
        for (let i = 1; i < this.path.length; i++) {
          ctx.lineTo(this.path[i].x, this.path[i].y);
        }
        
        ctx.stroke();
        
        // Draw corner joints
        for (let i = 1; i < this.path.length - 1; i++) {
          ctx.fillStyle = 'rgba(0, 255, 127, 0.5)';
          ctx.beginPath();
          ctx.arc(this.path[i].x, this.path[i].y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Data pulse
    class DataPulse {
      constructor(circuit) {
        this.circuit = circuit;
        this.path = circuit.path;
        this.currentSegment = 0;
        this.progress = 0;
        this.speed = 0.02;
        this.size = 4;
        this.trail = [];
        this.maxTrailLength = 8;
      }

      update() {
        this.progress += this.speed;
        
        if (this.progress >= 1) {
          this.currentSegment++;
          this.progress = 0;
          
          if (this.currentSegment >= this.path.length - 1) {
            // Reached destination
            this.circuit.endNode.activate();
            return false;
          }
        }
        
        // Calculate position
        const start = this.path[this.currentSegment];
        const end = this.path[this.currentSegment + 1];
        const x = start.x + (end.x - start.x) * this.progress;
        const y = start.y + (end.y - start.y) * this.progress;
        
        // Update trail
        this.trail.push({ x, y });
        if (this.trail.length > this.maxTrailLength) {
          this.trail.shift();
        }
        
        return true;
      }

      draw() {
        // Draw trail
        for (let i = 0; i < this.trail.length; i++) {
          const opacity = (i / this.trail.length) * 0.6;
          ctx.fillStyle = `rgba(0, 255, 127, ${opacity})`;
          ctx.beginPath();
          ctx.arc(this.trail[i].x, this.trail[i].y, this.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Draw main pulse
        const current = this.trail[this.trail.length - 1];
        if (current) {
          // Glow
          const gradient = ctx.createRadialGradient(
            current.x, current.y, 0,
            current.x, current.y, this.size * 2
          );
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
          gradient.addColorStop(0.5, 'rgba(0, 255, 127, 0.6)');
          gradient.addColorStop(1, 'rgba(0, 255, 127, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(current.x, current.y, this.size * 2, 0, Math.PI * 2);
          ctx.fill();
          
          // Core
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(current.x, current.y, this.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Generate purposeful circuit system
    const generateCircuitSystem = () => {
      mainNodes = [];
      circuits = [];
      pulses = [];
      
      // Create main central processor
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const mainProcessor = new ProcessorNode(centerX, centerY, 'main');
      mainNodes.push(mainProcessor);
      
      // Create satellite processors in an ellipse to better use screen width
      const satelliteCount = window.innerWidth < 768 ? 4 : 6; // Fewer nodes on mobile
      const radiusX = canvas.width * 0.4; // Use more horizontal space
      const radiusY = canvas.height * 0.35; // Slightly less vertical
      
      for (let i = 0; i < satelliteCount; i++) {
        const angle = (i / satelliteCount) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radiusX;
        const y = centerY + Math.sin(angle) * radiusY;
        const satellite = new ProcessorNode(x, y, 'processor');
        mainNodes.push(satellite);
        
        // Connect to main processor (only one direction to avoid double lines)
        circuits.push(new CircuitPath(mainProcessor, satellite));
      }
      
      // Connect adjacent satellites
      for (let i = 1; i < mainNodes.length; i++) {
        const nextIndex = i === mainNodes.length - 1 ? 1 : i + 1;
        circuits.push(new CircuitPath(mainNodes[i], mainNodes[nextIndex]));
      }
    };

    resize();
    window.addEventListener('resize', resize);

    let pulseTimer = 0;
    let nextPulseDelay = 60;

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw circuits
      circuits.forEach(circuit => {
        circuit.draw();
      });

      // Update and draw nodes
      mainNodes.forEach(node => {
        node.update();
        node.draw();
      });

      // Spawn new pulses
      pulseTimer++;
      if (pulseTimer > nextPulseDelay) {
        pulseTimer = 0;
        nextPulseDelay = Math.random() * 60 + 30;
        
        // Pick random circuit
        const circuit = circuits[Math.floor(Math.random() * circuits.length)];
        pulses.push(new DataPulse(circuit));
        circuit.startNode.activate();
      }

      // Update and draw pulses
      pulses = pulses.filter(pulse => {
        const active = pulse.update();
        if (active) pulse.draw();
        return active;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100vw',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.8,
        zIndex: 1
      }}
    />
  );
};

export default CircuitAnimation;