import React, { useEffect, useRef, useState } from 'react';
import { StaticAtomLogo } from './navbar/index';

// Removed old local StaticAtomLogo definition - now using the one from navbar

const DataFlowAnimation = () => {
  const canvasRef = useRef(null);
  const [isGlowing, setIsGlowing] = useState(false);
  const glowTimerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let serviceNodes = [];
    let dataFlows = [];
    let centralHub = null;

    const resize = () => {
      // Ensure canvas takes full width on mobile
      canvas.width = window.innerWidth;
      // Adjust height for mobile to ensure all nodes are visible
      const isMobile = window.innerWidth < 768;
      canvas.height = isMobile ? window.innerHeight * 0.6 : window.innerHeight * 0.7;
      initializeNetwork();
    };

    // Service Node class
    class ServiceNode {
      constructor(x, y, label, type = 'service') {
        this.x = x;
        this.y = y;
        this.label = label;
        this.type = type;
        this.radius = type === 'central' ? 
          (window.innerWidth < 768 ? 25 : 35) : 
          (window.innerWidth < 768 ? 18 : 25);
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.activity = 0;
        this.icon = this.getIcon();
      }

      getIcon() {
        // SVG-like paths drawn with canvas
        const icons = {
          'Web Dev': this.drawWebIcon,
          'Mobile': this.drawMobileIcon,
          'Cloud': this.drawCloudIcon,
          'AI/ML': this.drawAIIcon,
          'Design': this.drawDesignIcon,
          'SEO': this.drawSEOIcon,
          'Central Hub': this.drawHubIcon
        };
        return icons[this.label] || this.drawDefaultIcon;
      }

      update() {
        this.pulsePhase += 0.03;
        this.activity *= 0.92;
      }

      activate() {
        this.activity = 1;
      }

      drawWebIcon() {
        // High-quality web development icon
        ctx.save();
        ctx.translate(this.x, this.y);
        const scale = this.radius / 12;
        ctx.scale(scale, scale);
        
        // Browser window with shadow
        ctx.shadowColor = 'rgba(0, 255, 127, 0.3)';
        ctx.shadowBlur = 4;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(-9, -7, 18, 14, 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Top bar gradient
        const gradient = ctx.createLinearGradient(-9, -7, -9, -4);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
        ctx.fillStyle = gradient;
        ctx.fillRect(-9, -7, 18, 3);
        
        // Window controls with glow
        ctx.shadowColor = 'rgba(255, 100, 100, 0.5)';
        ctx.shadowBlur = 2;
        ctx.fillStyle = '#ff5f5f';
        ctx.beginPath();
        ctx.arc(-6.5, -5.5, 0.7, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowColor = 'rgba(255, 200, 0, 0.5)';
        ctx.fillStyle = '#ffbe2e';
        ctx.beginPath();
        ctx.arc(-4.5, -5.5, 0.7, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowColor = 'rgba(0, 255, 100, 0.5)';
        ctx.fillStyle = '#00ff7f';
        ctx.beginPath();
        ctx.arc(-2.5, -5.5, 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Code elements
        ctx.strokeStyle = 'rgba(0, 255, 127, 0.8)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-6, -2); ctx.lineTo(-2, -2);
        ctx.stroke();
        
        ctx.strokeStyle = 'rgba(100, 200, 255, 0.8)';
        ctx.beginPath();
        ctx.moveTo(-6, 0); ctx.lineTo(1, 0);
        ctx.stroke();
        
        ctx.strokeStyle = 'rgba(255, 150, 100, 0.8)';
        ctx.beginPath();
        ctx.moveTo(-6, 2); ctx.lineTo(-1, 2);
        ctx.stroke();
        
        ctx.strokeStyle = 'rgba(0, 255, 127, 0.8)';
        ctx.beginPath();
        ctx.moveTo(-6, 4); ctx.lineTo(3, 4);
        ctx.stroke();
        
        // Code brackets
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(4, -2); ctx.lineTo(6, -2); ctx.lineTo(6, 0); ctx.lineTo(4, 0);
        ctx.moveTo(4, 2); ctx.lineTo(6, 2); ctx.lineTo(6, 4); ctx.lineTo(4, 4);
        ctx.stroke();
        
        ctx.restore();
      }

      drawMobileIcon() {
        // High-quality mobile app icon
        ctx.save();
        ctx.translate(this.x, this.y);
        const scale = this.radius / 12;
        ctx.scale(scale, scale);
        
        // Phone body with shadow
        ctx.shadowColor = 'rgba(0, 255, 127, 0.3)';
        ctx.shadowBlur = 4;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(-5, -9, 10, 18, 2.5);
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Screen with gradient
        const screenGradient = ctx.createLinearGradient(-4, -8, -4, 5);
        screenGradient.addColorStop(0, 'rgba(0, 255, 127, 0.2)');
        screenGradient.addColorStop(1, 'rgba(0, 255, 127, 0.05)');
        ctx.fillStyle = screenGradient;
        ctx.fillRect(-4, -8, 8, 12);
        
        // Status bar
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '2px sans-serif';
        ctx.fillText('9:41', -3, -6);
        
        // Signal and battery icons
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 0.5;
        // Signal bars
        ctx.beginPath();
        ctx.moveTo(2, -6.5); ctx.lineTo(2, -5.5);
        ctx.moveTo(2.7, -6.5); ctx.lineTo(2.7, -6);
        ctx.moveTo(3.4, -6.5); ctx.lineTo(3.4, -6.5);
        ctx.stroke();
        
        // App icons grid
        const colors = ['#00ff7f', '#00a2ff', '#ff5f5f', '#ffbe2e'];
        let iconIndex = 0;
        for (let y = -4; y <= 0; y += 2.5) {
          for (let x = -3; x <= 1.5; x += 2.5) {
            ctx.fillStyle = colors[iconIndex % colors.length];
            ctx.shadowColor = colors[iconIndex % colors.length];
            ctx.shadowBlur = 2;
            ctx.beginPath();
            ctx.roundRect(x, y, 1.8, 1.8, 0.5);
            ctx.fill();
            iconIndex++;
          }
        }
        ctx.shadowBlur = 0;
        
        // Home indicator
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-2, 6); ctx.lineTo(2, 6);
        ctx.stroke();
        
        ctx.restore();
      }

      drawCloudIcon() {
        // High-quality cloud infrastructure icon
        ctx.save();
        ctx.translate(this.x, this.y);
        const scale = this.radius / 12;
        ctx.scale(scale, scale);
        
        // Cloud shape with gradient
        const cloudGradient = ctx.createRadialGradient(0, -2, 0, 0, -2, 8);
        cloudGradient.addColorStop(0, 'rgba(0, 255, 127, 0.3)');
        cloudGradient.addColorStop(1, 'rgba(0, 255, 127, 0.05)');
        
        ctx.fillStyle = cloudGradient;
        ctx.beginPath();
        ctx.arc(-3, 0, 4, Math.PI * 0.5, Math.PI * 1.5);
        ctx.arc(0, -3, 4, Math.PI, Math.PI * 2);
        ctx.arc(3, 0, 4, Math.PI * 1.5, Math.PI * 0.5);
        ctx.arc(0, 2, 5, 0, Math.PI);
        ctx.closePath();
        ctx.fill();
        
        // Cloud outline with glow
        ctx.shadowColor = 'rgba(0, 255, 127, 0.5)';
        ctx.shadowBlur = 3;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Server stack inside cloud
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 0.8;
        
        // Server 1
        ctx.beginPath();
        ctx.roundRect(-4, -2, 8, 2, 0.5);
        ctx.fill();
        ctx.stroke();
        
        // Server 2
        ctx.beginPath();
        ctx.roundRect(-4, 1, 8, 2, 0.5);
        ctx.fill();
        ctx.stroke();
        
        // LED indicators
        ctx.fillStyle = '#00ff7f';
        ctx.shadowColor = '#00ff7f';
        ctx.shadowBlur = 2;
        ctx.beginPath();
        ctx.arc(-2, -1, 0.5, 0, Math.PI * 2);
        ctx.arc(-2, 2, 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#00a2ff';
        ctx.shadowColor = '#00a2ff';
        ctx.beginPath();
        ctx.arc(0, -1, 0.5, 0, Math.PI * 2);
        ctx.arc(0, 2, 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Data flow arrows
        ctx.strokeStyle = 'rgba(0, 255, 127, 0.6)';
        ctx.lineWidth = 1;
        ctx.setLineDash([1, 1]);
        ctx.beginPath();
        ctx.moveTo(0, -6); ctx.lineTo(0, -3);
        ctx.moveTo(-6, 0); ctx.lineTo(-4.5, 0);
        ctx.moveTo(6, 0); ctx.lineTo(4.5, 0);
        ctx.stroke();
        ctx.setLineDash([]);
        
        ctx.restore();
      }

      drawAIIcon() {
        // AI Sparkle icon - Abstract modern
        ctx.save();
        ctx.translate(this.x, this.y);
        const scale = this.radius / 12;
        ctx.scale(scale, scale);
        
        // Central large sparkle
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(1.5, -4.5);
        ctx.lineTo(8, -3);
        ctx.lineTo(1.5, 0);
        ctx.lineTo(0, 7);
        ctx.lineTo(-1.5, 0);
        ctx.lineTo(-8, -3);
        ctx.lineTo(-1.5, -4.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Small sparkles
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        
        // Top left sparkle
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.moveTo(-7, -7);
        ctx.lineTo(-6, -5);
        ctx.lineTo(-4, -4);
        ctx.lineTo(-6, -3);
        ctx.lineTo(-7, -1);
        ctx.lineTo(-8, -3);
        ctx.lineTo(-10, -4);
        ctx.lineTo(-8, -5);
        ctx.closePath();
        ctx.fill();
        
        // Top right sparkle
        ctx.beginPath();
        ctx.moveTo(7, -7);
        ctx.lineTo(8, -5);
        ctx.lineTo(10, -4);
        ctx.lineTo(8, -3);
        ctx.lineTo(7, -1);
        ctx.lineTo(6, -3);
        ctx.lineTo(4, -4);
        ctx.lineTo(6, -5);
        ctx.closePath();
        ctx.fill();
        
        // Bottom left sparkle
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.moveTo(-7, 7);
        ctx.lineTo(-6, 5);
        ctx.lineTo(-4, 4);
        ctx.lineTo(-6, 3);
        ctx.lineTo(-7, 1);
        ctx.lineTo(-8, 3);
        ctx.lineTo(-10, 4);
        ctx.lineTo(-8, 5);
        ctx.closePath();
        ctx.fill();
        
        ctx.globalAlpha = 1;
        ctx.restore();
      }

      drawDesignIcon() {
        // High-quality UI/UX design icon
        ctx.save();
        ctx.translate(this.x, this.y);
        const scale = this.radius / 12;
        ctx.scale(scale, scale);
        
        // Design palette with gradient
        const paletteGradient = ctx.createRadialGradient(-2, -2, 0, -2, -2, 8);
        paletteGradient.addColorStop(0, 'rgba(255, 100, 200, 0.3)');
        paletteGradient.addColorStop(1, 'rgba(255, 100, 200, 0.05)');
        
        // Palette shape
        ctx.fillStyle = paletteGradient;
        ctx.beginPath();
        ctx.arc(-2, -2, 7, 0, Math.PI * 1.5);
        ctx.lineTo(-2, -2);
        ctx.closePath();
        ctx.fill();
        
        ctx.shadowColor = 'rgba(255, 100, 200, 0.5)';
        ctx.shadowBlur = 3;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Color dots
        const colors = [
          { x: -6, y: -5, color: '#ff5f5f' },
          { x: -5, y: -7, color: '#00ff7f' },
          { x: -3, y: -8, color: '#00a2ff' },
          { x: -1, y: -7, color: '#ffbe2e' }
        ];
        
        colors.forEach(dot => {
          ctx.fillStyle = dot.color;
          ctx.shadowColor = dot.color;
          ctx.shadowBlur = 3;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.shadowBlur = 0;
        
        // Brush
        ctx.save();
        ctx.translate(3, 3);
        ctx.rotate(-Math.PI / 4);
        
        // Brush handle
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(-1, -6, 2, 10, 1);
        ctx.fill();
        ctx.stroke();
        
        // Brush tip with gradient
        const brushGradient = ctx.createLinearGradient(-1.5, 4, 1.5, 4);
        brushGradient.addColorStop(0, '#ff5f5f');
        brushGradient.addColorStop(0.5, '#00ff7f');
        brushGradient.addColorStop(1, '#00a2ff');
        
        ctx.fillStyle = brushGradient;
        ctx.beginPath();
        ctx.moveTo(-1.5, 4);
        ctx.lineTo(-1.5, 7);
        ctx.lineTo(0, 8);
        ctx.lineTo(1.5, 7);
        ctx.lineTo(1.5, 4);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
        
        // Paint stroke
        ctx.strokeStyle = 'rgba(0, 255, 127, 0.6)';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(1, 1);
        ctx.quadraticCurveTo(4, 4, 7, 3);
        ctx.stroke();
        
        ctx.restore();
      }

      drawSEOIcon() {
        // High-quality SEO/Marketing analytics icon
        ctx.save();
        ctx.translate(this.x, this.y);
        const scale = this.radius / 12;
        ctx.scale(scale, scale);
        
        // Background chart area
        const chartGradient = ctx.createLinearGradient(-9, 5, 9, -9);
        chartGradient.addColorStop(0, 'rgba(0, 255, 127, 0.05)');
        chartGradient.addColorStop(1, 'rgba(0, 255, 127, 0.2)');
        ctx.fillStyle = chartGradient;
        ctx.beginPath();
        ctx.moveTo(-9, 5);
        ctx.lineTo(-9, 3);
        ctx.lineTo(-5, -1);
        ctx.lineTo(-1, 1);
        ctx.lineTo(3, -4);
        ctx.lineTo(9, 0);
        ctx.lineTo(9, 5);
        ctx.closePath();
        ctx.fill();
        
        // Grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 0.5;
        ctx.setLineDash([2, 2]);
        for (let y = -8; y <= 4; y += 3) {
          ctx.beginPath();
          ctx.moveTo(-9, y);
          ctx.lineTo(9, y);
          ctx.stroke();
        }
        ctx.setLineDash([]);
        
        // Chart line with glow
        ctx.shadowColor = 'rgba(0, 255, 127, 0.8)';
        ctx.shadowBlur = 4;
        ctx.strokeStyle = '#00ff7f';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-9, 3);
        ctx.lineTo(-5, -1);
        ctx.lineTo(-1, 1);
        ctx.lineTo(3, -4);
        ctx.lineTo(9, 0);
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Data points with different colors
        const points = [
          { x: -9, y: 3, color: '#ff5f5f' },
          { x: -5, y: -1, color: '#ffbe2e' },
          { x: -1, y: 1, color: '#00a2ff' },
          { x: 3, y: -4, color: '#00ff7f' },
          { x: 9, y: 0, color: '#00ff7f' }
        ];
        
        points.forEach((point, i) => {
          // Outer glow
          ctx.fillStyle = point.color;
          ctx.shadowColor = point.color;
          ctx.shadowBlur = 4;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
          ctx.fill();
          
          // Inner white dot
          ctx.shadowBlur = 0;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.beginPath();
          ctx.arc(point.x, point.y, 0.8, 0, Math.PI * 2);
          ctx.fill();
        });
        
        // Upward trend arrow
        ctx.strokeStyle = '#00ff7f';
        ctx.fillStyle = '#00ff7f';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00ff7f';
        ctx.shadowBlur = 3;
        ctx.beginPath();
        ctx.moveTo(6, -6);
        ctx.lineTo(8, -8);
        ctx.lineTo(10, -6);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(8, -8);
        ctx.lineTo(8, -4);
        ctx.stroke();
        
        // Percentage indicator
        ctx.fillStyle = '#00ff7f';
        ctx.font = 'bold 3px sans-serif';
        ctx.fillText('+42%', 4, -9);
        ctx.shadowBlur = 0;
        
        ctx.restore();
      }

      drawHubIcon() {
        // Don't draw anything - we'll use the React component instead
        return;
      }

      drawDefaultIcon() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      draw() {
        // Skip drawing the central hub - we're using React component instead
        if (this.type === 'central') {
          return;
        }

        const pulse = Math.sin(this.pulsePhase) * 0.2 + 0.8;
        const glowRadius = this.radius + (this.activity * 15);

        // Activity glow
        if (this.activity > 0.1) {
          const gradient = ctx.createRadialGradient(
            this.x, this.y, this.radius,
            this.x, this.y, glowRadius
          );
          gradient.addColorStop(0, `rgba(0, 255, 127, ${this.activity * 0.3})`);
          gradient.addColorStop(1, 'rgba(0, 255, 127, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node circle
        ctx.strokeStyle = `rgba(0, 255, 127, ${pulse * 0.7})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner circle
        ctx.fillStyle = `rgba(0, 20, 10, 0.8)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius - 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw icon
        this.icon.call(this);

        // Service label
        if (this.type !== 'central') {
          ctx.font = `${window.innerWidth < 768 ? '10px' : '12px'} sans-serif`;
          ctx.fillStyle = 'rgba(0, 255, 127, 0.5)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText(this.label, this.x, this.y + this.radius + 10);
        }
      }
    }

    // Data flow between services
    class DataFlow {
      constructor(startNode, endNode) {
        this.startNode = startNode;
        this.endNode = endNode;
        this.progress = 0;
        this.speed = 0.02;
        this.particles = [];
        this.active = true;
        this.calculatePath();
        // Determine color based on flow direction
        this.isFromHub = startNode.type === 'central';
        this.color = this.isFromHub ? '#00ff7f' : '#00a2ff'; // Green from hub, blue to hub
      }

      calculatePath() {
        const dx = this.endNode.x - this.startNode.x;
        const dy = this.endNode.y - this.startNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const perpX = -dy / distance * 40;
        const perpY = dx / distance * 40;
        
        this.controlX = (this.startNode.x + this.endNode.x) / 2 + perpX;
        this.controlY = (this.startNode.y + this.endNode.y) / 2 + perpY;
      }

      update(setIsGlowing, glowTimerRef) {
        this.progress += this.speed;
        
        if (this.progress < 1 && Math.random() < 0.3) {
          const t = this.progress;
          const x = Math.pow(1-t, 2) * this.startNode.x + 
                    2 * (1-t) * t * this.controlX + 
                    Math.pow(t, 2) * this.endNode.x;
          const y = Math.pow(1-t, 2) * this.startNode.y + 
                    2 * (1-t) * t * this.controlY + 
                    Math.pow(t, 2) * this.endNode.y;
          
          this.particles.push({ x, y, life: 1 });
        }

        this.particles = this.particles.filter(p => {
          p.life -= 0.02;
          return p.life > 0;
        });

        if (this.progress >= 1) {
          this.endNode.activate();
          
          // If data is being sent FROM the central hub, trigger glow
          if (this.startNode.type === 'central') {
            setIsGlowing(true);
            
            // Clear existing timer
            if (glowTimerRef.current) {
              clearTimeout(glowTimerRef.current);
            }
            
            // Set timer to turn off glow after 1 second
            glowTimerRef.current = setTimeout(() => {
              setIsGlowing(false);
              glowTimerRef.current = null;
            }, 1000);
          }
          
          this.active = false;
        }
      }

      draw() {
        // Draw path with appropriate color
        const r = this.isFromHub ? 0 : 0;
        const g = this.isFromHub ? 255 : 162;
        const b = this.isFromHub ? 127 : 255;
        
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.1)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.startNode.x, this.startNode.y);
        ctx.quadraticCurveTo(this.controlX, this.controlY, this.endNode.x, this.endNode.y);
        ctx.stroke();

        // Draw particles
        this.particles.forEach(p => {
          const size = p.life * 3;
          const opacity = p.life * 0.8;
          
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw main data packet
        if (this.progress < 1) {
          const t = this.progress;
          const x = Math.pow(1-t, 2) * this.startNode.x + 
                    2 * (1-t) * t * this.controlX + 
                    Math.pow(t, 2) * this.endNode.x;
          const y = Math.pow(1-t, 2) * this.startNode.y + 
                    2 * (1-t) * t * this.controlY + 
                    Math.pow(t, 2) * this.endNode.y;

          ctx.fillStyle = this.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = this.color;
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    // Initialize the service network
    const initializeNetwork = () => {
      serviceNodes = [];
      dataFlows = [];

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Create central hub
      centralHub = new ServiceNode(centerX, centerY, 'Central Hub', 'central');
      serviceNodes.push(centralHub);

      // Service definitions
      const services = [
        { label: 'Web Dev', angle: 0 },
        { label: 'Mobile', angle: Math.PI / 3 },
        { label: 'Cloud', angle: 2 * Math.PI / 3 },
        { label: 'AI/ML', angle: Math.PI },
        { label: 'Design', angle: 4 * Math.PI / 3 },
        { label: 'SEO', angle: 5 * Math.PI / 3 }
      ];

      // Calculate responsive radius - smaller on mobile to fit all nodes
      const isMobile = window.innerWidth < 768;
      const padding = isMobile ? 60 : 80;
      
      // Make the radius smaller on mobile to ensure all nodes fit
      const radiusX = Math.min((canvas.width / 2) - padding, isMobile ? 120 : 200);
      const radiusY = Math.min((canvas.height / 2) - padding, isMobile ? 100 : 180);
      
      services.forEach(service => {
        const x = centerX + Math.cos(service.angle) * radiusX;
        const y = centerY + Math.sin(service.angle) * radiusY;
        
        // Ensure nodes stay within canvas bounds
        const nodeX = Math.max(30, Math.min(canvas.width - 30, x));
        const nodeY = Math.max(30, Math.min(canvas.height - 30, y));
        
        serviceNodes.push(new ServiceNode(nodeX, nodeY, service.label));
      });
    };

    resize();
    window.addEventListener('resize', resize);

    let flowTimer = 0;
    let nextFlowDelay = 30;

    // Animation loop
    const animate = () => {
      // Clear canvas completely
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      serviceNodes.forEach(node => {
        node.update();
        node.draw();
      });

      // Create new data flows
      flowTimer++;
      if (flowTimer > nextFlowDelay) {
        flowTimer = 0;
        nextFlowDelay = Math.random() * 60 + 30;

        if (Math.random() < 0.7) {
          const serviceIdx = Math.floor(Math.random() * (serviceNodes.length - 1)) + 1;
          dataFlows.push(new DataFlow(serviceNodes[serviceIdx], centralHub));
          serviceNodes[serviceIdx].activate();
        } else {
          const serviceIdx = Math.floor(Math.random() * (serviceNodes.length - 1)) + 1;
          dataFlows.push(new DataFlow(centralHub, serviceNodes[serviceIdx]));
          centralHub.activate();
        }
      }

      // Update and draw data flows
      dataFlows = dataFlows.filter(flow => {
        flow.update(setIsGlowing, glowTimerRef);
        flow.draw();
        return flow.active;
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
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100vw',
          maxWidth: '100vw',
          height: '100%',
          pointerEvents: 'none',
          opacity: 1,
          zIndex: 1
        }}
      />
      {/* Static Logo in center */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        pointerEvents: 'none'
      }}>
        <StaticAtomLogo size={window.innerWidth < 768 ? 60 : 90} isGlowing={isGlowing} />
      </div>
    </>
  );
};

export default DataFlowAnimation;