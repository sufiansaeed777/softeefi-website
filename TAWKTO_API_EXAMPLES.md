# Tawk.to JavaScript API Examples

Your Tawk.to is now configured with Property ID: `48ed1ffcebc6006e9ce45662a24855ed7b52acaa`

## Basic Setup Complete ✅
The widget will automatically load on all pages. Here's how to use the JavaScript API:

## 1. Using the Custom Hook

```javascript
import { useTawkTo } from '../hooks/useTawkTo';

function MyComponent() {
  const tawk = useTawkTo();

  // Show chat when user clicks "Contact Support"
  const handleSupportClick = () => {
    tawk.maximize();
  };

  // Hide widget on certain pages
  useEffect(() => {
    if (window.location.pathname === '/checkout') {
      tawk.hideWidget();
    }
    return () => tawk.showWidget();
  }, []);

  return (
    <button onClick={handleSupportClick}>
      Chat with Support
    </button>
  );
}
```

## 2. Set Visitor Information

```javascript
// When user logs in, set their info
const handleUserLogin = (user) => {
  tawk.setAttributes({
    name: user.name,
    email: user.email,
    hash: user.secureHash, // For secure mode
    userId: user.id,
    plan: user.subscription,
    company: user.company
  }, (error) => {
    if (!error) {
      console.log('User attributes set successfully');
    }
  });
};
```

## 3. Track Events

```javascript
// Track important user actions
const trackPurchase = (order) => {
  tawk.addEvent('Purchase Completed', {
    orderId: order.id,
    amount: order.total,
    products: order.items.length,
    currency: 'USD'
  });
};

// Track page views
const trackPageView = (pageName) => {
  tawk.addEvent('Page Viewed', {
    page: pageName,
    timestamp: new Date().toISOString()
  });
};
```

## 4. Tag Visitors

```javascript
// Tag visitors based on behavior
const tagVisitor = () => {
  // Add tags
  tawk.addTags(['potential-customer', 'viewed-pricing']);
  
  // Remove tags
  tawk.removeTags(['new-visitor']);
};
```

## 5. Custom Triggers

```javascript
// Show chat after user scrolls 50%
useEffect(() => {
  const handleScroll = () => {
    const scrollPercentage = (window.scrollY / document.body.scrollHeight) * 100;
    
    if (scrollPercentage > 50 && tawk.isChatMinimized()) {
      tawk.maximize();
      window.removeEventListener('scroll', handleScroll);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

## 6. Conditional Display

```javascript
// Show/hide based on business hours
useEffect(() => {
  const checkBusinessHours = () => {
    const hour = new Date().getHours();
    const isBusinessHours = hour >= 9 && hour < 17;
    
    if (!isBusinessHours) {
      tawk.hideWidget();
    } else {
      tawk.showWidget();
    }
  };

  checkBusinessHours();
}, []);
```

## 7. Pre-fill Messages

```javascript
// Open chat with pre-filled message
const openChatWithMessage = (service) => {
  tawk.maximize();
  
  // Set attributes first
  tawk.setAttributes({
    interestedIn: service
  });
  
  // Note: Tawk.to doesn't support pre-filling messages via API
  // But you can track this as an event
  tawk.addEvent('Service Inquiry', { service });
};
```

## 8. Integration with Contact Forms

```javascript
// In your ContactForm component
const handleContactSubmit = async (formData) => {
  // Save to your backend
  await submitContact(formData);
  
  // Also send to Tawk.to
  tawk.setAttributes({
    name: formData.name,
    email: formData.email,
    phone: formData.phone
  });
  
  tawk.addEvent('Contact Form Submitted', {
    subject: formData.subject,
    message: formData.message
  });
  
  // Open chat for immediate response
  tawk.maximize();
};
```

## 9. Service-Specific Chat Buttons

```javascript
// For each service page
const ServicePage = ({ service }) => {
  const tawk = useTawkTo();
  
  const handleChatClick = () => {
    // Tag visitor with service interest
    tawk.addTags([`interested-${service.slug}`]);
    
    // Set context
    tawk.setAttributes({
      currentPage: service.name,
      serviceInterest: service.slug
    });
    
    // Open chat
    tawk.maximize();
  };
  
  return (
    <button onClick={handleChatClick}>
      Chat about {service.name}
    </button>
  );
};
```

## 10. Advanced Event Handlers

```javascript
// Listen to Tawk.to events
useEffect(() => {
  window.Tawk_API = window.Tawk_API || {};
  
  // When chat starts
  window.Tawk_API.onChatStarted = () => {
    console.log('Chat started');
    // Track in analytics
    if (window.gtag) {
      window.gtag('event', 'chat_started', {
        event_category: 'engagement'
      });
    }
  };
  
  // When chat ends
  window.Tawk_API.onChatEnded = () => {
    console.log('Chat ended');
  };
  
  // When chat is minimized
  window.Tawk_API.onChatMinimized = () => {
    console.log('Chat minimized');
  };
  
  // When chat is maximized
  window.Tawk_API.onChatMaximized = () => {
    console.log('Chat maximized');
  };
  
  // When widget is loaded
  window.Tawk_API.onLoad = () => {
    console.log('Tawk.to loaded');
    
    // Set initial attributes
    if (user.isAuthenticated) {
      window.Tawk_API.setAttributes({
        name: user.name,
        email: user.email
      });
    }
  };
}, []);
```

## 11. Mobile-Specific Behavior

```javascript
// Adjust widget for mobile
useEffect(() => {
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Use different position on mobile
    tawk.setCustomStyle({
      visibility: {
        mobile: {
          position: 'br', // bottom right
          xOffset: '10px',
          yOffset: '60px' // Higher to avoid floating widget
        }
      }
    });
  }
}, []);
```

## Quick Reference

### Available Methods:
- `showWidget()` - Show the widget
- `hideWidget()` - Hide the widget
- `maximize()` - Open chat window
- `minimize()` - Close chat window
- `toggle()` - Toggle chat state
- `setAttributes(attributes, callback)` - Set visitor data
- `addEvent(eventName, metadata, callback)` - Track events
- `addTags(tags, callback)` - Add visitor tags
- `removeTags(tags, callback)` - Remove visitor tags
- `endChat()` - End current chat session
- `getStatus()` - Get online/offline status
- `isChatOngoing()` - Check if chat is active
- `isVisitorEngaged()` - Check if visitor is engaged

### Available Events:
- `onLoad` - Widget loaded
- `onChatStarted` - Chat started
- `onChatEnded` - Chat ended
- `onChatMinimized` - Chat minimized
- `onChatMaximized` - Chat maximized
- `onPrechatSubmit` - Pre-chat form submitted
- `onOfflineSubmit` - Offline form submitted

## Testing Your Integration

1. **Check if widget loads**: Look for green chat bubble in bottom-right
2. **Test visitor attributes**: Set attributes and check in Tawk.to dashboard
3. **Test events**: Trigger events and verify in visitor timeline
4. **Test show/hide**: Try hiding on specific pages
5. **Test mobile**: Check positioning on mobile devices

Your Tawk.to is now fully integrated! 🎉