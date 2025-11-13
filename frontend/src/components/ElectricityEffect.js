import React, { useEffect, useRef } from 'react';

const ElectricityEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.7;
    };

    resize();
    window.addEventListener('resize', resize);

    // Natural Lightning
    class Lightning {
      constructor(startX = null, startY = null, isMainBolt = true) {
        this.isMainBolt = isMainBolt;
        this.reset(startX, startY);
      }

      reset(startX = null, startY = null) {
        this.x = startX || Math.random() * canvas.width;
        this.y = startY || 0;
        this.targetY = this.isMainBolt ? canvas.height : this.y + Math.random() * 200 + 100;
        this.segments = [];
        this.branches = [];
        this.life = 0;
        this.maxLife = Math.random() * 20 + 15; // Slower fade
        this.intensity = Math.random() * 0.5 + 0.5;
        this.generatePath();
      }

      generatePath() {
        const segments = this.isMainBolt ? 30 : 15;
        let currentX = this.x;
        let currentY = this.y;
        
        // More erratic, natural path
        for (let i = 0; i <= segments; i++) {
          const progress = i / segments;
          const targetProgress = this.y + (this.targetY - this.y) * progress;
          
          // Natural jagged movement
          currentX += (Math.random() - 0.5) * 40;
          currentY += (this.targetY - this.y) / segments;
          
          // Add some drift
          if (Math.random() < 0.3) {
            currentX += (Math.random() - 0.5) * 60;
          }
          
          this.segments.push({
            x: currentX,
            y: currentY
          });

          // Natural branching
          if (this.isMainBolt && Math.random() < 0.2 && i > 5 && i < segments - 5) {
            this.branches.push(new Lightning(currentX, currentY, false));
          }
        }
      }

      update() {
        this.life++;
        
        // Update branches
        this.branches = this.branches.filter(branch => branch.update());
        
        return this.life < this.maxLife;
      }

      draw() {
        // Slower fade
        const lifeProgress = this.life / this.maxLife;
        const opacity = Math.pow(1 - lifeProgress, 0.6);
        
        // Green electricity color
        const brightness = opacity * this.intensity;
        
        // Main bolt - sharp and bright green
        ctx.strokeStyle = `rgba(0, 255, 127, ${brightness})`;
        ctx.lineWidth = this.isMainBolt ? 2 : 1;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#00ff7f';
        
        ctx.beginPath();
        ctx.moveTo(this.segments[0].x, this.segments[0].y);
        
        // Jagged lines for natural look
        for (let i = 1; i < this.segments.length; i++) {
          ctx.lineTo(this.segments[i].x, this.segments[i].y);
        }
        
        ctx.stroke();
        
        // Outer glow - green
        ctx.strokeStyle = `rgba(0, 255, 127, ${brightness * 0.3})`;
        ctx.lineWidth = this.isMainBolt ? 8 : 4;
        ctx.shadowBlur = 30;
        ctx.stroke();
        
        // Bright white core
        ctx.strokeStyle = `rgba(255, 255, 255, ${brightness * 0.8})`;
        ctx.lineWidth = this.isMainBolt ? 1 : 0.5;
        ctx.shadowBlur = 0;
        ctx.stroke();

        // Draw branches
        this.branches.forEach(branch => branch.draw());
      }
    }

    const lightnings = [];
    let lastSpawn = 0;

    const animate = (time) => {
      // Clear completely - no trails
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Slower, more regular timing
      const timeSinceLastSpawn = time - lastSpawn;
      const spawnThreshold = Math.random() * 2000 + 1000; // 1-3 seconds between strikes
      
      if (timeSinceLastSpawn > spawnThreshold) {
        lightnings.push(new Lightning());
        lastSpawn = time;
        
        // Sometimes spawn multiple bolts at once
        if (Math.random() < 0.3) {
          setTimeout(() => {
            lightnings.push(new Lightning());
          }, Math.random() * 200 + 100);
        }
      }

      // Update and draw lightnings
      for (let i = lightnings.length - 1; i >= 0; i--) {
        if (!lightnings[i].update()) {
          lightnings.splice(i, 1);
          continue;
        }
        lightnings[i].draw();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate(0);

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
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.9
      }}
    />
  );
};

export default ElectricityEffect;