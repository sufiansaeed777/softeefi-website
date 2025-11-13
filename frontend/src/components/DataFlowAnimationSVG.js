import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { StaticAtomLogo } from './navbar/index';

const DataFlowAnimationSVG = () => {
  const navigate = useNavigate();
  const [dataFlows, setDataFlows] = useState([]);
  const [isGlowing, setIsGlowing] = useState(false);
  const glowTimerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
  const [nodeGlows, setNodeGlows] = useState({});

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // High-quality SVG icons
  const icons = {
    'Web Dev': (
      <g>
        <rect x="-9" y="-7" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="-9" y="-7" width="18" height="3" fill="currentColor" opacity="0.2"/>
        <circle cx="-6.5" cy="-5.5" r="0.7" fill="#ff5f5f"/>
        <circle cx="-4.5" cy="-5.5" r="0.7" fill="#ffbe2e"/>
        <circle cx="-2.5" cy="-5.5" r="0.7" fill="#00ff7f"/>
        <line x1="-6" y1="-2" x2="-2" y2="-2" stroke="#00ff7f" strokeWidth="1.2" opacity="0.8"/>
        <line x1="-6" y1="0" x2="1" y2="0" stroke="#64c8ff" strokeWidth="1.2" opacity="0.8"/>
        <line x1="-6" y1="2" x2="-1" y2="2" stroke="#ff9664" strokeWidth="1.2" opacity="0.8"/>
        <line x1="-6" y1="4" x2="3" y2="4" stroke="#00ff7f" strokeWidth="1.2" opacity="0.8"/>
      </g>
    ),
    'Mobile': (
      <g>
        <rect x="-5" y="-9" width="10" height="18" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="-4" y="-8" width="8" height="12" fill="url(#mobileGradient)" opacity="0.3"/>
        <text x="-3" y="-6" fontSize="2" fill="currentColor" opacity="0.8">9:41</text>
        {/* App icons */}
        <rect x="-3" y="-4" width="1.8" height="1.8" rx="0.5" fill="#00ff7f"/>
        <rect x="-0.5" y="-4" width="1.8" height="1.8" rx="0.5" fill="#00a2ff"/>
        <rect x="2" y="-4" width="1.8" height="1.8" rx="0.5" fill="#ff5f5f"/>
        <rect x="-3" y="-1.5" width="1.8" height="1.8" rx="0.5" fill="#ffbe2e"/>
        <rect x="-0.5" y="-1.5" width="1.8" height="1.8" rx="0.5" fill="#ff5f5f"/>
        <rect x="2" y="-1.5" width="1.8" height="1.8" rx="0.5" fill="#00ff7f"/>
        <line x1="-2" y1="6" x2="2" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    ),
    'Cloud': (
      <g>
        <path d="M-3 0 A4 4 0 0 1 -3 -8 A4 4 0 0 1 5 -4 A4 4 0 0 1 5 4 A5 5 0 0 1 -5 5 A4 4 0 0 1 -3 0"
              fill="url(#cloudGradient)" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="-4" y="-2" width="8" height="2" rx="0.5" fill="rgba(255,255,255,0.8)" stroke="currentColor" strokeWidth="0.8"/>
        <rect x="-4" y="1" width="8" height="2" rx="0.5" fill="rgba(255,255,255,0.8)" stroke="currentColor" strokeWidth="0.8"/>
        <circle cx="-2" cy="-1" r="0.5" fill="#00ff7f">
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="0" cy="-1" r="0.5" fill="#00a2ff">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="-2" cy="2" r="0.5" fill="#00a2ff">
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="0.5s"/>
        </circle>
        <circle cx="0" cy="2" r="0.5" fill="#00ff7f">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="0.5s"/>
        </circle>
      </g>
    ),
    'AI/ML': (
      <g>
        {/* Large central sparkle */}
        <path d="M0 -10 L1.5 -4.5 L8 -3 L1.5 0 L0 7 L-1.5 0 L-8 -3 L-1.5 -4.5 Z"
              fill="url(#aiGradient)" stroke="currentColor" strokeWidth="1.5"/>
        {/* Smaller sparkles */}
        <path d="M-7 -7 L-6 -5 L-4 -4 L-6 -3 L-7 -1 L-8 -3 L-10 -4 L-8 -5 Z"
              fill="currentColor" opacity="0.6"/>
        <path d="M7 -7 L8 -5 L10 -4 L8 -3 L7 -1 L6 -3 L4 -4 L6 -5 Z"
              fill="currentColor" opacity="0.6"/>
        <path d="M-7 7 L-6 5 L-4 4 L-6 3 L-7 1 L-8 3 L-10 4 L-8 5 Z"
              fill="currentColor" opacity="0.4"/>
      </g>
    ),
    'Design': (
      <g>
        <path d="M-2 -2 A7 7 0 0 0 -9 -9 L-2 -2 A7 7 0 0 0 -9 5 L-2 -2"
              fill="url(#designGradient)" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="-6" cy="-5" r="1.2" fill="#ff5f5f"/>
        <circle cx="-5" cy="-7" r="1.2" fill="#00ff7f"/>
        <circle cx="-3" cy="-8" r="1.2" fill="#00a2ff"/>
        <circle cx="-1" cy="-7" r="1.2" fill="#ffbe2e"/>
        <g transform="translate(3, 3) rotate(-45)">
          <rect x="-1" y="-6" width="2" height="10" rx="1" fill="rgba(255,255,255,0.9)" stroke="currentColor"/>
          <path d="M-1.5 4 L-1.5 7 L0 8 L1.5 7 L1.5 4 Z" fill="url(#brushGradient)"/>
        </g>
        <path d="M1 1 Q4 4 7 3" stroke="#00ff7f" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6"/>
      </g>
    ),
    'SEO': (
      <g>
        <path d="M-9 5 L-9 3 L-5 -1 L-1 1 L3 -4 L9 0 L9 5 Z" fill="url(#seoGradient)" opacity="0.3"/>
        <line x1="-9" y1="-5" x2="9" y2="-5" stroke="currentColor" strokeWidth="0.5" opacity="0.1" strokeDasharray="2,2"/>
        <line x1="-9" y1="-2" x2="9" y2="-2" stroke="currentColor" strokeWidth="0.5" opacity="0.1" strokeDasharray="2,2"/>
        <line x1="-9" y1="1" x2="9" y2="1" stroke="currentColor" strokeWidth="0.5" opacity="0.1" strokeDasharray="2,2"/>
        <line x1="-9" y1="4" x2="9" y2="4" stroke="currentColor" strokeWidth="0.5" opacity="0.1" strokeDasharray="2,2"/>
        <polyline points="-9,3 -5,-1 -1,1 3,-4 9,0" fill="none" stroke="#00ff7f" strokeWidth="2"/>
        <circle cx="-9" cy="3" r="2" fill="#ff5f5f"/>
        <circle cx="-5" cy="-1" r="2" fill="#ffbe2e"/>
        <circle cx="-1" cy="1" r="2" fill="#00a2ff"/>
        <circle cx="3" cy="-4" r="2" fill="#00ff7f"/>
        <circle cx="9" cy="0" r="2" fill="#00ff7f"/>
        <g>
          <line x1="6" y1="-6" x2="8" y2="-8" stroke="#00ff7f" strokeWidth="2"/>
          <line x1="8" y1="-8" x2="10" y2="-6" stroke="#00ff7f" strokeWidth="2"/>
          <line x1="8" y1="-8" x2="8" y2="-4" stroke="#00ff7f" strokeWidth="2"/>
        </g>
        <text x="4" y="-9" fontSize="3" fill="#00ff7f" fontWeight="bold">+42%</text>
      </g>
    )
  };

  // Service definitions with manual positions and navigation paths
  // Desktop only now - mobile doesn't render the animation
  const services = [
    { label: 'Web Dev', x: 1050, y: 400, path: '/services/websites-and-apps' },
    { label: 'Mobile', x: 850, y: 650, path: '/services/websites-and-apps' },
    { label: 'Cloud', x: 350, y: 150, path: '/services/cloud-infrastructure' },
    { label: 'AI/ML', x: 100, y: 400, path: '/services/ai-solutions' },
    { label: 'Design', x: 350, y: 650, path: '/services/ui-ux-design' },
    { label: 'SEO', x: 850, y: 150, path: '/services/digital-marketing-seo' }
  ];

  const calculateNodePosition = (service) => {
    // Safety check for undefined service
    if (!service) {
      return { x: 0, y: 0 };
    }
    // For manual positioning, just return the x,y coordinates
    if (service.x !== undefined && service.y !== undefined) {
      return { x: service.x, y: service.y };
    }
    // Fallback to angle-based calculation if needed
    const angle = service.angle || 0;
    const radius = 320;
    const x = 600 + Math.cos(angle) * radius;
    const y = 400 + Math.sin(angle) * radius;
    return { x, y };
  };

  // Generate data flows
  useEffect(() => {
    // Don't generate flows on mobile since we're not showing the animation
    if (isMobile) return;
    
    const flowInterval = 600;
    
    const interval = setInterval(() => {
      const flowId = Date.now();
      const isFromHub = Math.random() < 0.5; // Reduced probability for hub particles
      const serviceIndex = Math.floor(Math.random() * services.length);
      
      const newFlow = {
        id: flowId,
        from: isFromHub ? 'hub' : serviceIndex,
        to: isFromHub ? serviceIndex : 'hub',
        isFromHub
      };

      setDataFlows(prev => [...prev, newFlow]);

      // Remove flow after animation completes
      setTimeout(() => {
        setDataFlows(prev => prev.filter(flow => flow.id !== flowId));
      }, 3500);

      // Trigger glow effect on destination node after particle arrives
      setTimeout(() => {
        if (newFlow.to === 'hub') {
          // Glow hub when it receives particles
          setIsGlowing(true);
          if (glowTimerRef.current) clearTimeout(glowTimerRef.current);
          glowTimerRef.current = setTimeout(() => setIsGlowing(false), 1000);
        } else {
          // Glow service node when it receives particles
          const targetService = services[newFlow.to];
          setNodeGlows(prev => ({ ...prev, [targetService.label]: true }));
          setTimeout(() => {
            setNodeGlows(prev => ({ ...prev, [targetService.label]: false }));
          }, 1000);
        }
      }, 3000); // Trigger glow when particle arrives (3s animation duration)
    }, flowInterval);

    return () => clearInterval(interval);
  }, [isMobile, services]);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'auto',
      zIndex: 1,
      opacity: isMobile ? 1 : 0.8,
      transform: isMobile ? 'scale(1.2)' : 'scale(1)'
    }}>
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: '100%',
          height: '100%',
          minHeight: '100%'
        }}
      >
        {/* Definitions for gradients */}
        <defs>
          {/* Glow filter for particles */}
          <filter id="particleGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          {/* Enhanced glow for green particles */}
          <filter id="greenGlow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          {/* Enhanced glow for blue particles */}
          <filter id="blueGlow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="mobileGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00ff7f" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#00ff7f" stopOpacity="0.1"/>
          </linearGradient>
          <radialGradient id="cloudGradient">
            <stop offset="0%" stopColor="#00ff7f" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#00ff7f" stopOpacity="0.05"/>
          </radialGradient>
          <linearGradient id="aiGradient">
            <stop offset="0%" stopColor="#00ff7f" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#00ff7f" stopOpacity="0.1"/>
          </linearGradient>
          <radialGradient id="designGradient">
            <stop offset="0%" stopColor="#ff64c8" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#ff64c8" stopOpacity="0.05"/>
          </radialGradient>
          <linearGradient id="brushGradient">
            <stop offset="0%" stopColor="#ff5f5f"/>
            <stop offset="50%" stopColor="#00ff7f"/>
            <stop offset="100%" stopColor="#00a2ff"/>
          </linearGradient>
          <linearGradient id="seoGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#00ff7f" stopOpacity="0.05"/>
            <stop offset="100%" stopColor="#00ff7f" stopOpacity="0.2"/>
          </linearGradient>
        </defs>

        {/* Service nodes */}
        {services.map((service, index) => {
          const pos = calculateNodePosition(service);
          const isGlowing = nodeGlows[service.label];
          return (
            <g 
              key={service.label} 
              transform={`translate(${pos.x}, ${pos.y})`}
              onClick={() => navigate(service.path)}
              style={{ cursor: 'pointer' }}>
              <motion.circle
                cx="0"
                cy="0"
                r={isMobile ? "15" : "20"}
                fill="none"
                stroke="rgba(0, 255, 127, 0.7)"
                strokeWidth={isMobile ? "1" : "1.5"}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: isGlowing ? [1, 1.2, 1] : 1,
                  opacity: isGlowing ? [0.7, 1, 0.7] : 0.7
                }}
                whileHover={{ 
                  scale: 1.1,
                  stroke: "#00ff7f",
                  filter: 'drop-shadow(0 0 15px rgba(0, 255, 127, 1))'
                }}
                transition={{ 
                  delay: index * 0.1,
                  duration: isGlowing ? 0.5 : 0.3
                }}
                style={{
                  filter: isGlowing ? 'drop-shadow(0 0 10px rgba(0, 255, 127, 0.8))' : 'none'
                }}
              />
              <motion.g
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <g transform={`scale(${isMobile ? 1 : 1.5})`} style={{ color: '#ffffff' }}>
                  {icons[service.label]}
                </g>
              </motion.g>
              <text
                x="0"
                y={isMobile ? "28" : "35"}
                textAnchor="middle"
                fontSize={isMobile ? "8" : "10"}
                fill="rgba(0, 255, 127, 0.7)"
                style={{ fontFamily: 'sans-serif', fontWeight: '400' }}
              >
                {service.label}
              </text>
            </g>
          );
        })}

        {/* Data flows - Simple particles */}
        {dataFlows.map(flow => {
          const hubPosition = { x: 600, y: 400 };
          const from = flow.from === 'hub' 
            ? hubPosition
            : calculateNodePosition(services[flow.from] || { x: 0, y: 0 });
          const to = flow.to === 'hub'
            ? hubPosition
            : calculateNodePosition(services[flow.to] || { x: 0, y: 0 });
          
          const color = flow.isFromHub ? '#00ff7f' : '#00a2ff';

          return (
            <motion.circle
              key={flow.id}
              r={isMobile ? "3" : "4"}
              fill={color}
              initial={{ x: from.x, y: from.y, opacity: 0, scale: 0 }}
              animate={{ 
                x: to.x, 
                y: to.y,
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0]
              }}
              transition={{ 
                duration: 3,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </svg>

      {/* Central hub */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        pointerEvents: 'auto'
      }}>
        <StaticAtomLogo size={isMobile ? 60 : 90} isGlowing={isGlowing} isClickable={true} />
      </div>
    </div>
  );
};

export default DataFlowAnimationSVG;