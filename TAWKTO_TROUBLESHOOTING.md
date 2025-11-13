# Tawk.to Troubleshooting Guide

## 🚨 Issue: Not Receiving Messages

### 1. Check Browser Console
Open Developer Tools (F12) and look for:
- ✅ "Tawk.to loaded successfully!"
- 📊 "Tawk.to Status: online/offline"

If you don't see these messages, the widget isn't loading properly.

### 2. Verify Your Tawk.to Dashboard Settings

#### A. Check Email Notifications
1. Log in to [Tawk.to Dashboard](https://dashboard.tawk.to)
2. Go to **Administration** → **Channels** → **Email**
3. Make sure:
   - ✅ Email notifications are enabled
   - ✅ Your email address is verified
   - ✅ "New conversation" notifications are ON
   - ✅ "New message when offline" is ON

#### B. Check Your Status
1. In Tawk.to dashboard, check top-right corner
2. Make sure you're set to "Online" not "Invisible"
3. If you're offline, messages go to email

#### C. Check Triggers & Routing
1. Go to **Administration** → **Triggers**
2. Disable any triggers that might be blocking messages
3. Go to **Administration** → **Routing**
4. Make sure messages are routed to your account

### 3. Test Your Widget

#### Quick Test in Console:
```javascript
// Check if Tawk is loaded
console.log('Tawk API exists:', !!window.Tawk_API);
console.log('Current status:', window.Tawk_API.getStatus());

// Send a test message programmatically
window.Tawk_API.maximize();
```

### 4. Common Issues & Fixes

#### Issue: Widget loads but messages don't arrive
**Fix:**
1. Check spam/junk folder in email
2. Add `noreply@tawk.to` to email whitelist
3. Check if you have any departments set up that might be routing messages elsewhere

#### Issue: Widget shows offline when you're online
**Fix:**
1. Clear browser cache
2. Log out and log back into Tawk.to dashboard
3. Check if you have schedule/working hours set

#### Issue: Messages delayed
**Fix:**
1. Check your notification settings
2. Install Tawk.to mobile app for instant notifications
3. Keep dashboard open in a browser tab

### 5. Mobile App Setup (Recommended)
1. Download Tawk.to app from App Store/Google Play
2. Log in with your credentials
3. Enable push notifications
4. You'll get instant alerts for new messages

### 6. Test Checklist
- [ ] Open your website in incognito/private browser
- [ ] Click the chat widget
- [ ] Send a test message like "Test 123"
- [ ] Check:
  - [ ] Tawk.to dashboard (should appear instantly)
  - [ ] Email (if offline, arrives in 1-2 minutes)
  - [ ] Mobile app (instant notification)

### 7. Debug Mode
Add this to see all Tawk.to events in console:

```javascript
// Add to your code temporarily
window.Tawk_API.onLoad = function() {
  console.log('=== TAWK.TO DEBUG MODE ===');
  
  // Log all events
  const events = [
    'onBeforeLoad', 'onLoad', 'onStatusChange',
    'onChatStarted', 'onChatEnded', 'onChatMinimized',
    'onChatMaximized', 'onPrechatSubmit', 'onOfflineSubmit'
  ];
  
  events.forEach(event => {
    window.Tawk_API[event] = function(data) {
      console.log(`📍 ${event}:`, data || 'triggered');
    };
  });
};
```

### 8. Alternative Notification Methods

#### A. Webhook Integration
In Tawk.to dashboard:
1. Go to **Administration** → **Webhooks**
2. Add your server endpoint
3. You'll receive POST requests for new messages

#### B. Email Forwarding
1. Set up a dedicated email for Tawk.to
2. Forward to your phone via SMS
3. Or use email-to-Slack/Discord integration

### 9. Contact Tawk.to Support
If still not working:
1. Email: support@tawk.to
2. Or use their own chat widget on tawk.to
3. Include your property ID: `48ed1ffcebc6006e9ce45662a24855ed7b52acaa`

## 📱 Quick Setup for Notifications

### Desktop Notifications
```javascript
// Request browser notifications
if ("Notification" in window) {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      window.Tawk_API.onChatStarted = () => {
        new Notification("New chat started!", {
          body: "Someone wants to chat with you",
          icon: "/favicon.ico"
        });
      };
    }
  });
}
```

### Sound Alerts
```javascript
// Play sound on new message
const audio = new Audio('/notification.mp3');
window.Tawk_API.onChatStarted = () => {
  audio.play();
};
```

## ✅ Working Configuration
Your current setup:
- Property ID: `48ed1ffcebc6006e9ce45662a24855ed7b52acaa`
- Widget: Default
- Position: Bottom Right
- Theme: Green (#00ff7f)

The widget IS configured correctly in the code. The issue is likely in the Tawk.to dashboard settings or notification preferences.