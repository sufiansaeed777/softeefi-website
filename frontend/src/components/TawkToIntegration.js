import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Enhanced Tawk.to Integration Component
 * This component provides additional UI elements that integrate with Tawk.to
 */
const TawkToIntegration = () => {
  const [tawkStatus, setTawkStatus] = useState('loading');
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMinimized, setIsMinimized] = useState(true);

  useEffect(() => {
    // Monitor Tawk.to status
    const statusInterval = setInterval(() => {
      if (window.Tawk_API && window.Tawk_API.getStatus) {
        const status = window.Tawk_API.getStatus();
        setTawkStatus(status);
      }
    }, 5000);

    // Monitor unread messages
    if (window.Tawk_API) {
      window.Tawk_API.onUnreadCountChanged = (count) => {
        setUnreadCount(count);
      };

      window.Tawk_API.onChatMinimized = () => {
        setIsMinimized(true);
      };

      window.Tawk_API.onChatMaximized = () => {
        setIsMinimized(false);
        setUnreadCount(0);
      };
    }

    return () => clearInterval(statusInterval);
  }, []);

  // Custom chat trigger button (optional - can be used on specific pages)
  const ChatTriggerButton = ({ message, tags, service }) => {
    const handleClick = () => {
      if (window.Tawk_API) {
        // Set context before opening
        if (tags) {
          window.Tawk_API.addTags(tags);
        }
        
        if (service) {
          window.Tawk_API.setAttributes({
            interestedIn: service,
            source: 'custom_button'
          });
        }
        
        // Add event
        window.Tawk_API.addEvent('Custom Button Click', {
          button: message,
          page: window.location.pathname
        });
        
        // Open chat
        window.Tawk_API.maximize();
      }
    };

    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        style={{
          background: 'linear-gradient(135deg, #00ff7f 0%, #00d68f 100%)',
          color: '#000',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '25px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 15px rgba(0, 255, 127, 0.3)'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
        {message}
      </motion.button>
    );
  };

  // Floating notification badge (shows unread count)
  const UnreadBadge = () => {
    if (unreadCount === 0 || !isMinimized) return null;

    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        style={{
          position: 'fixed',
          bottom: '95px',
          right: '25px',
          backgroundColor: '#ff0000',
          color: '#fff',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 'bold',
          zIndex: 9999,
          pointerEvents: 'none'
        }}
      >
        {unreadCount}
      </motion.div>
    );
  };

  // Status indicator
  const StatusIndicator = () => {
    const getStatusColor = () => {
      switch (tawkStatus) {
        case 'online': return '#00ff7f';
        case 'away': return '#ffaa00';
        default: return '#999';
      }
    };

    return (
      <div style={{
        position: 'fixed',
        bottom: '70px',
        right: '70px',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: getStatusColor(),
        zIndex: 9998,
        boxShadow: `0 0 0 3px rgba(${tawkStatus === 'online' ? '0,255,127' : '153,153,153'}, 0.3)`
      }} />
    );
  };

  return (
    <>
      <UnreadBadge />
      <StatusIndicator />
      
      {/* Example usage of custom chat buttons */}
      <div id="tawk-custom-buttons" style={{ display: 'none' }}>
        <ChatTriggerButton 
          message="Chat about Web Development" 
          tags={['web-development-interest']}
          service="Web & App Development"
        />
        <ChatTriggerButton 
          message="Get AI Solutions Quote" 
          tags={['ai-interest', 'quote-request']}
          service="AI Solutions"
        />
      </div>
    </>
  );
};

// Helper functions to use throughout your app
export const tawkToHelpers = {
  // Track page views
  trackPageView: (pageName) => {
    if (window.Tawk_API && window.Tawk_API.addEvent) {
      window.Tawk_API.addEvent('Page View', {
        page: pageName,
        url: window.location.href,
        timestamp: new Date().toISOString()
      });
    }
  },

  // Track conversions
  trackConversion: (type, value) => {
    if (window.Tawk_API && window.Tawk_API.addEvent) {
      window.Tawk_API.addEvent('Conversion', {
        type,
        value,
        currency: 'USD',
        timestamp: new Date().toISOString()
      });
    }
  },

  // Set user after login
  setUser: (user) => {
    if (window.Tawk_API && window.Tawk_API.setAttributes) {
      window.Tawk_API.setAttributes({
        name: user.name,
        email: user.email,
        id: user.id,
        plan: user.plan || 'free',
        signupDate: user.createdAt
      });
    }
  },

  // Tag visitor based on behavior
  tagVisitor: (tags) => {
    if (window.Tawk_API && window.Tawk_API.addTags) {
      window.Tawk_API.addTags(tags);
    }
  },

  // Open chat with context
  openChatWithContext: (context) => {
    if (window.Tawk_API) {
      // Set context attributes
      window.Tawk_API.setAttributes({
        lastAction: context.action,
        interestedIn: context.service,
        fromPage: window.location.pathname
      });
      
      // Add relevant tags
      if (context.tags) {
        window.Tawk_API.addTags(context.tags);
      }
      
      // Track the event
      window.Tawk_API.addEvent('Chat Opened With Context', context);
      
      // Open chat
      window.Tawk_API.maximize();
    }
  },

  // Check if chat is available
  isChatAvailable: () => {
    if (window.Tawk_API && window.Tawk_API.getStatus) {
      const status = window.Tawk_API.getStatus();
      return status === 'online' || status === 'away';
    }
    return false;
  }
};

export default TawkToIntegration;