import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AIChatbot from './AIChatbot';
import LiveChat from './LiveChat';

const FloatingContactWidget = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false); // Start collapsed
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);


  const contactOptions = [
    {
      id: 'ai-chat',
      title: 'AI Assistant',
      subtitle: 'Get instant answers',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a4 4 0 0 1 4 4v1h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v1a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v-1H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3V6a4 4 0 0 1 4-4h2"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      ),
      color: '#00ff7f',
      action: () => {
        setShowAIChat(true);
        setIsExpanded(false); // Close the widget when opening AI chat
      }
    },
    {
      id: 'live-chat',
      title: 'Live Chat',
      subtitle: 'Talk to our team',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <circle cx="9" cy="10" r="1"></circle>
          <circle cx="15" cy="10" r="1"></circle>
        </svg>
      ),
      color: '#667eea',
      action: () => {
        // Open Tawk.to instead of custom LiveChat
        if (window.Tawk_API) {
          // Set flag to indicate manual opening
          window.tawkManuallyOpened = true;
          
          // Show and maximize the chat
          if (window.Tawk_API.showWidget) {
            window.Tawk_API.showWidget();
          }
          if (window.Tawk_API.maximize) {
            window.Tawk_API.maximize();
          }
          
          // Reset flag after a delay
          setTimeout(() => {
            window.tawkManuallyOpened = false;
          }, 2000);
        }
        setIsExpanded(false); // Close the widget when opening live chat
      }
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      subtitle: 'Message us directly',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      ),
      color: '#25D366',
      action: () => window.open('https://wa.me/447417505744', '_blank')
    }
  ];

  // Auto-scroll effect
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % contactOptions.length);
      }, isExpanded ? 4000 : 5000); // Change every 4 seconds when expanded, 5 seconds when collapsed

      return () => clearInterval(interval);
    }
  }, [isPaused, isExpanded, contactOptions.length]);

  // Reset animation when widget state changes
  useEffect(() => {
    if (!isExpanded) {
      // Start animation immediately when collapsed
      setIsPaused(false);
    } else {
      // Start animation when expanded unless hovering
      if (!isHovered) {
        setIsPaused(false);
      }
    }
  }, [isExpanded, isHovered]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + contactOptions.length) % contactOptions.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000); // Resume auto-scroll after 5 seconds
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % contactOptions.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const currentOption = contactOptions[currentIndex];

  return (
    <motion.div 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              background: 'linear-gradient(135deg, #1a1f2e 0%, #0d1117 100%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
              padding: '10px 8px',
              width: '200px',
              boxShadow: isHovered 
                ? '0 16px 32px rgba(0, 0, 0, 0.4), 0 0 16px rgba(0, 255, 127, 0.1)' 
                : '0 8px 24px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              backdropFilter: 'blur(10px)',
              transition: 'box-shadow 0.3s ease',
              overflow: 'visible'
            }}
            onMouseEnter={() => {
              setIsPaused(true);
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsPaused(false);
              setIsHovered(false);
            }}
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                background: '#1a1f2e',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                minWidth: '28px',
                minHeight: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'rgba(255, 255, 255, 0.5)',
                transition: 'all 0.2s ease',
                zIndex: 10,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                padding: 0,
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ff4444';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = '#ff4444';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#1a1f2e';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onClick={() => {
                setIsExpanded(false);
                setIsPaused(false); // Resume animation when closing
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>

            {/* Navigation with left button only */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrevious}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2px 6px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00ff7f';
                  e.currentTarget.style.transform = 'translateX(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>

              {/* Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentOption.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer'
                  }}
                  onClick={currentOption.action}
                >
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '8px',
                      background: `linear-gradient(135deg, ${currentOption.color}15 0%, ${currentOption.color}25 100%)`,
                      border: `1px solid ${currentOption.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: currentOption.color,
                      flexShrink: 0,
                      boxShadow: `0 3px 8px ${currentOption.color}15`,
                      position: 'relative',
                      overflow: 'hidden',
                      padding: 0
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: `radial-gradient(circle at center, ${currentOption.color}10 0%, transparent 70%)`,
                      animation: 'pulse 2s infinite'
                    }} />
                    <div style={{ 
                      position: 'relative', 
                      zIndex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%'
                    }}>
                      {currentOption.icon}
                    </div>
                  </motion.div>
                  
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      margin: 0,
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      color: '#ffffff',
                      letterSpacing: '-0.02em',
                      lineHeight: '1.3',
                      marginBottom: '2px'
                    }}>
                      {currentOption.title}
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: '0.8rem',
                      color: 'rgba(255, 255, 255, 0.5)',
                      letterSpacing: '-0.01em',
                      lineHeight: '1.2'
                    }}>
                      {currentOption.subtitle}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: `linear-gradient(135deg, ${contactOptions[currentIndex].color} 0%, ${contactOptions[(currentIndex + 1) % contactOptions.length].color} 100%)`,
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: `0 6px 20px ${contactOptions[currentIndex].color}40, 0 0 30px ${contactOptions[currentIndex].color}20`,
              color: '#ffffff',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}
            onClick={() => {
              setIsExpanded(true);
              setIsPaused(false); // Start animation immediately when opening
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{
                position: 'absolute',
                inset: '-50%',
                background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.1), transparent)',
              }}
            />
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.1, 1],
                  rotate: [-180, 0],
                  opacity: [0, 1, 1]
                }}
                exit={{ scale: 0, rotate: 180, opacity: 0 }}
                transition={{ 
                  duration: 0.6,
                  times: [0, 0.8, 1],
                  ease: "easeInOut"
                }}
                style={{ 
                  position: 'relative', 
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {React.cloneElement(contactOptions[currentIndex].icon, {
                  width: "26",
                  height: "26"
                })}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes glow {
          0%, 100% { 
            box-shadow: 0 0 20px ${contactOptions[currentIndex].color}40,
                        0 0 40px ${contactOptions[currentIndex].color}20,
                        0 0 60px ${contactOptions[currentIndex].color}10;
          }
          50% { 
            box-shadow: 0 0 30px ${contactOptions[currentIndex].color}60,
                        0 0 50px ${contactOptions[currentIndex].color}30,
                        0 0 80px ${contactOptions[currentIndex].color}20;
          }
        }
      `}</style>
      
      {/* AI Chatbot */}
      <AIChatbot 
        isOpen={showAIChat} 
        onClose={() => setShowAIChat(false)} 
      />
      
      {/* Live Chat */}
      <LiveChat 
        isOpen={showLiveChat} 
        onClose={() => setShowLiveChat(false)} 
      />
    </motion.div>
  );
};

export default FloatingContactWidget;