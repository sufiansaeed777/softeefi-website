import React, { useEffect } from 'react';

const TawkToChat = () => {
  useEffect(() => {
    // Replace these with your actual Tawk.to property ID and widget ID
    const TAWK_PROPERTY_ID = 'YOUR_PROPERTY_ID';
    const TAWK_WIDGET_ID = 'YOUR_WIDGET_ID';
    
    // Tawk.to Script
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    
    // Custom styling to match your theme
    Tawk_API.customStyle = {
      visibility: {
        desktop: {
          position: 'br', // bottom right
          xOffset: '20px',
          yOffset: '20px'
        },
        mobile: {
          position: 'br',
          xOffset: '10px', 
          yOffset: '10px'
        },
        bubble: {
          rotate: '0deg',
          xOffset: 0,
          yOffset: 0
        }
      }
    };

    // Customize colors to match your theme
    Tawk_API.onLoad = function(){
      // Set theme colors
      Tawk_API.setAttributes({
        'name': '',
        'email': '',
        'hash': ''
      }, function(error){});

      // Customize widget appearance
      Tawk_API.customStyle = {
        zIndex: 999999
      };
    };

    // Hide default launcher and use custom button
    Tawk_API.hideWidget = function() {
      Tawk_API.hideWidget();
    };

    (function(){
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
    })();

    // Cleanup function
    return () => {
      // Remove Tawk.to on component unmount if needed
      if (window.Tawk_API && window.Tawk_API.hideWidget) {
        window.Tawk_API.hideWidget();
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default TawkToChat;