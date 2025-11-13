import { useEffect } from 'react';

const TawkTo = () => {
  useEffect(() => {
    // Tawk.to credentials
    const TAWK_PROPERTY_ID = '688444d2416fc119149d0445';
    const TAWK_WIDGET_ID = '1j12apm2t';

    // Create the Tawk.to script
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    
    // Pre-configure to be hidden
    window.Tawk_API.visitor = {
      hideWidget: true
    };
    
    // Set to minimize by default
    window.Tawk_API.onBeforeLoad = function() {
      window.Tawk_API.hideWidget();
    };
    
    // Customize Tawk.to appearance to match your theme
    window.Tawk_API.customStyle = {
      visibility: {
        desktop: {
          position: 'br', // bottom right
          xOffset: '20px',
          yOffset: '20px'
        },
        mobile: {
          position: 'br',
          xOffset: '10px', 
          yOffset: '60px' // Higher on mobile to avoid floating contact widget
        }
      }
    };

    // Event handlers for debugging and tracking
    window.Tawk_API.onLoad = function() {
      
      // IMPORTANT: Immediately hide and minimize the widget
      if (window.Tawk_API.minimize) {
        window.Tawk_API.minimize();
      }
      if (window.Tawk_API.hideWidget) {
        window.Tawk_API.hideWidget();
      }
      
      // Set the widget theme colors to match your green theme
      // Wrap in try-catch to prevent runtime errors
      try {
        if (window.Tawk_API && window.Tawk_API.setAttributes) {
          // Add timeout to prevent hanging
          const attributeTimeout = setTimeout(() => {
            console.warn('⚠️ Tawk.to setAttributes timeout - continuing without theme');
          }, 3000);
          
          window.Tawk_API.setAttributes({
            'theme-color': '#00ff7f' // Your brand green color
          }, function(error) {
            clearTimeout(attributeTimeout);
            if (error) {
              console.warn('⚠️ Tawk.to theme color not set:', error);
              // Don't throw error, just log it
            } else {
            }
          });
        }
      } catch (err) {
        console.warn('⚠️ Tawk.to setAttributes failed:', err);
        // Continue without theme - don't break the app
      }
      
      // Ensure widget stays hidden and doesn't auto-open
      window.Tawk_API.onChatWindowStateChanged = function(state) {
        if (state.isMaximized && !window.tawkManuallyOpened) {
          // If chat was opened automatically (not by user), close it
          window.Tawk_API.minimize();
          window.Tawk_API.hideWidget();
        }
        // Always hide widget when chat is minimized or closed
        if (state.isMinimized || state.isClosed) {
          window.Tawk_API.hideWidget();
        }
      };

      // Get and log the current status
      if (window.Tawk_API.getStatus) {
      }
    };

    // When visitor starts a chat
    window.Tawk_API.onChatStarted = function() {
      
      // Track in Google Analytics if available
      if (window.gtag) {
        window.gtag('event', 'chat_started', {
          event_category: 'engagement',
          event_label: 'tawk_to'
        });
      }
    };

    // When visitor ends chat
    window.Tawk_API.onChatEnded = function() {
      // Hide the widget when chat ends
      if (window.Tawk_API.hideWidget) {
        window.Tawk_API.hideWidget();
      }
    };

    // When chat window is minimized
    window.Tawk_API.onChatMinimized = function() {
      // Hide the widget completely when minimized
      if (window.Tawk_API.hideWidget) {
        window.Tawk_API.hideWidget();
      }
    };

    // When chat window is maximized
    window.Tawk_API.onChatMaximized = function() {
      
      // Track engagement
      if (window.gtag) {
        window.gtag('event', 'chat_opened', {
          event_category: 'engagement',
          event_label: 'tawk_to'
        });
      }
      
      // Add click outside to close functionality
      setTimeout(() => {
        const handleClickOutside = (event) => {
          // Check if click is outside all Tawk.to iframes
          const tawkFrames = document.querySelectorAll('iframe[title*="tawk"], iframe[title*="chat"]');
          let clickedInside = false;
          
          tawkFrames.forEach(frame => {
            if (frame.contains(event.target)) {
              clickedInside = true;
            }
          });
          
          // Also check if clicked on the widget container
          const tawkContainer = document.querySelector('#tawk-container');
          if (tawkContainer && tawkContainer.contains(event.target)) {
            clickedInside = true;
          }
          
          if (!clickedInside && window.Tawk_API && window.Tawk_API.isChatMaximized && window.Tawk_API.isChatMaximized()) {
            window.Tawk_API.minimize();
          }
        };
        
        // Add listener to document
        document.addEventListener('click', handleClickOutside, true);
        
        // Store the handler so we can remove it later
        window.tawkClickHandler = handleClickOutside;
      }, 1000);
    };

    // When visitor submits prechat form
    window.Tawk_API.onPrechatSubmit = function(data) {
    };

    // When visitor submits offline form
    window.Tawk_API.onOfflineSubmit = function(data) {
      
      // You could send this to your backend as well
      if (data.email) {
        // Example: Save offline message to your database
        fetch('/api/contact/offline-message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            message: data.message,
            source: 'tawk_to_offline'
          })
        }).catch(console.error);
      }
    };

    // When status changes (online/offline)
    window.Tawk_API.onStatusChange = function(status) {
    };

    // When there's an unread message
    window.Tawk_API.onUnreadCountChanged = function(count) {
      
      // Update your UI if needed
      if (count > 0) {
        document.title = `(${count}) ${document.title.replace(/^\(\d+\)\s/, '')}`;
      }
    };

    // Load the Tawk.to script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    script.onload = () => {
    };
    
    script.onerror = (error) => {
      console.error('❌ Failed to load Tawk.to script:', error);
    };
    
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);

    // Set visitor attributes if user is logged in
    const setVisitorInfo = () => {
      // Check if user info exists in localStorage or your auth system
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo && window.Tawk_API && window.Tawk_API.setAttributes) {
        try {
          const user = JSON.parse(userInfo);
          // Add timeout protection for setAttributes
          const visitorTimeout = setTimeout(() => {
            console.warn('⚠️ Visitor attributes timeout - continuing without them');
          }, 3000);
          
          window.Tawk_API.setAttributes({
            name: user.name || 'Guest',
            email: user.email || '',
            // Add any custom attributes
            source: 'website',
            page: window.location.pathname
          }, function(error) {
            clearTimeout(visitorTimeout);
            if (error) {
              console.warn('⚠️ Failed to set visitor attributes:', error);
              // Don't throw - just warn
            } else {
            }
          });
        } catch (e) {
          console.error('Error parsing user info:', e);
        }
      }
    };

    // Wait for Tawk to be ready then set visitor info
    const checkInterval = setInterval(() => {
      if (window.Tawk_API && window.Tawk_API.onLoad) {
        setVisitorInfo();
        clearInterval(checkInterval);
      }
    }, 1000);

    // Cleanup function
    return () => {
      
      // Clear interval
      clearInterval(checkInterval);
      
      // Remove click handler
      if (window.tawkClickHandler) {
        document.removeEventListener('click', window.tawkClickHandler, true);
        delete window.tawkClickHandler;
      }
      
      // Remove Tawk.to on component unmount
      if (window.Tawk_API && window.Tawk_API.hideWidget) {
        window.Tawk_API.hideWidget();
      }
      
      // Remove the script
      const tawkScript = document.querySelector(`script[src*="embed.tawk.to"]`);
      if (tawkScript) {
        tawkScript.remove();
      }
      
      // Clean up global variables
      delete window.Tawk_API;
      delete window.Tawk_LoadStart;
    };
  }, []);

  return null; // This component doesn't render anything
};

export default TawkTo;