# Analytics & Metrics Setup Guide

## Current Status: ✅ Code Ready, ❌ Not Configured

The analytics code is implemented but needs your Google Analytics ID.

## Step 1: Get Google Analytics ID

1. **Go to Google Analytics:**
   - Visit: https://analytics.google.com
   - Sign in with your Google account

2. **Create a Property:**
   - Click "Admin" (gear icon bottom left)
   - Click "Create Property"
   - Property name: "Softeefi"
   - Website URL: https://softeefi.co.uk
   - Industry: Technology
   - Time zone: Your timezone

3. **Get your Measurement ID:**
   - Go to Admin → Data Streams
   - Click on your web stream
   - Copy the "Measurement ID" (starts with G-XXXXXXXXXX)

## Step 2: Add to Your Project

Edit `frontend/.env.production`:
```env
# Add this line with your actual ID
REACT_APP_GA_TRACKING_ID=G-YOUR_ID_HERE
```

Example:
```env
REACT_APP_GA_TRACKING_ID=G-ABC123XYZ9
```

## Step 3: Rebuild and Deploy

```powershell
# Rebuild with analytics
cd frontend
npm run build

# Deploy
scp -r build/* daniel@danielrepairs-droplet:/var/www/softeefi/
```

## Step 4: Verify It's Working

1. **Visit your live site:** https://softeefi.co.uk
2. **Open Google Analytics Real-Time:**
   - Go to: https://analytics.google.com
   - Click "Reports" → "Real-time"
   - You should see yourself as an active user

## What Gets Tracked Automatically:

### Page Views:
- Every page navigation
- Time spent on each page
- Bounce rate

### User Engagement:
- Form submissions (Contact, Free Reports)
- Button clicks (CTA buttons)
- Service page views
- Download events

### User Data:
- Location (country/city)
- Device type (mobile/desktop)
- Browser type
- Screen resolution
- Traffic source (Google, direct, social)

### Performance Metrics (Web Vitals):
- LCP (Largest Contentful Paint)
- FCP (First Contentful Paint)
- CLS (Cumulative Layout Shift)
- TTFB (Time to First Byte)

## View Your Analytics:

### Real-Time Data:
- https://analytics.google.com → Reports → Real-time
- See current visitors, pages being viewed, events

### Historical Data (after 24 hours):
- **Acquisition:** Where users come from
- **Engagement:** What users do on site
- **Monetization:** Revenue tracking (if e-commerce enabled)
- **Demographics:** User age, gender, interests
- **Technology:** Devices, browsers, screen sizes

### Custom Reports:
- **Most Popular Services:** Engagement → Pages and screens
- **Form Conversion Rate:** Engagement → Events → form_submit
- **Traffic Sources:** Acquisition → Traffic acquisition
- **User Flow:** Reports → User → User flow

## Optional: Enhanced Tracking

Add to `frontend/src/components/ContactForm.js`:
```javascript
import { trackFormSubmit } from '../components/Analytics';

// When form submits successfully:
trackFormSubmit('contact_form');
```

Add to service pages:
```javascript
import { trackServiceView } from '../components/Analytics';

useEffect(() => {
  trackServiceView('Websites & Apps');
}, []);
```

## Alternative: Microsoft Clarity (Free Heatmaps)

For visual heatmaps and session recordings:
1. Visit: https://clarity.microsoft.com
2. Create project for softeefi.co.uk
3. Get tracking code
4. Add to `public/index.html`

## Privacy Compliance:

Add to your Privacy Policy:
```
We use Google Analytics to understand how visitors use our site. 
This helps us improve our services. Data collected includes:
- Pages visited
- Time spent on site
- General location (city level)
- Device and browser type
No personal information is collected.
```

## Need Help?

- Google Analytics Help: https://support.google.com/analytics
- GA4 Setup Guide: https://support.google.com/analytics/answer/9306384
- Web Vitals Info: https://web.dev/vitals/