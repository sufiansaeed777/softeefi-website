# Analytics Setup Guide

## 📊 3 Ways to Track Website Visitors

### 1. Google Analytics 4 (Recommended - FREE)

**Setup Steps:**
1. Go to https://analytics.google.com
2. Create a new account/property
3. Get your Measurement ID (starts with G-)
4. Add to `.env.production`:
   ```
   REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
   ```

**What You'll See:**
- Real-time visitors
- Page views
- User demographics
- Traffic sources
- Conversion tracking
- Bounce rates
- Session duration

### 2. Simple Visitor Counter (Already Added)

**Location:** Bottom-left corner of your site
**Features:**
- Total visitor count
- Today's visitors
- Currently online users

**To Enable:**
```javascript
// In App.js or Landing.js, add:
import VisitorCounter from './components/VisitorCounter';

// In your JSX:
<VisitorCounter position="bottom-left" showDetails={true} />
```

### 3. Advanced Analytics Platforms

**Plausible Analytics** (Privacy-focused, $9/month)
```html
<script defer data-domain="softeefi.com" src="https://plausible.io/js/script.js"></script>
```

**Hotjar** (Free tier available - Heatmaps + Recordings)
```javascript
// Shows where users click, scroll, and get stuck
```

**Microsoft Clarity** (FREE - Heatmaps + Session Recordings)
```html
<!-- Clarity tracking code -->
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "YOUR_CLARITY_ID");
</script>
```

## 🎯 What Metrics Actually Matter for Your Business

### Lead Generation Metrics
1. **Contact Form Submissions** - Most important!
2. **Free Report Downloads** - Email captures
3. **Service Page Views** - Interest indicators
4. **Time on Service Pages** - Engagement level

### Conversion Metrics
1. **Form Completion Rate** - How many start vs finish
2. **Source of Best Leads** - Where quality traffic comes from
3. **Service Interest** - Which services get most views
4. **Exit Pages** - Where you're losing people

## 📈 Setting Up Conversion Tracking

### Track Contact Form Submissions
```javascript
// Already added in ContactForm.js
import { trackFormSubmit } from '../components/Analytics';

// When form submits successfully:
trackFormSubmit('contact_form');
```

### Track Free Report Signups
```javascript
// In FreeReports.js
import { trackConversion } from '../components/Analytics';

// When user signs up:
trackConversion('free_report_signup', 50); // Value in £
```

### Track Service Page Interest
```javascript
// In each service page
import { trackServiceView } from '../components/Analytics';

useEffect(() => {
  trackServiceView('AI Solutions');
}, []);
```

## 🚀 Quick Start (5 Minutes)

### Option 1: Basic Visitor Counter (Already Done!)
Just check your site - counter is at bottom-left showing visitor stats.

### Option 2: Google Analytics (Recommended)
1. Sign up at https://analytics.google.com
2. Create property for softeefi.com
3. Get your G-XXXXXXXXXX ID
4. Add to `.env.production`
5. Deploy and start seeing data!

### Option 3: Microsoft Clarity (Free Heatmaps)
1. Sign up at https://clarity.microsoft.com
2. Add site
3. Copy script
4. Add to `public/index.html`
5. See heatmaps + recordings!

## 📊 Understanding Your Analytics

### Good Metrics for New Agency:
- **10-50 visitors/day** - Normal starting point
- **2-5% conversion rate** - Good for services
- **2-3 min avg session** - Shows engagement
- **40-60% bounce rate** - Normal for service sites

### Red Flags to Watch:
- **90%+ bounce rate** - Site loads too slow
- **<30 sec sessions** - Content not relevant
- **0% conversions** - Forms might be broken
- **All traffic from one source** - Need diversification

## 🎯 Using Data to Improve

### Weekly Review Checklist:
1. **Which service pages get most views?** → Feature them more
2. **Where do visitors drop off?** → Fix that page
3. **What's the best traffic source?** → Invest more there
4. **Which CTAs get clicked?** → Use similar ones elsewhere

### A/B Testing Ideas:
- "Get Quote" vs "Free Consultation" buttons
- Showing prices vs "Contact for Pricing"
- Long form vs short contact form
- Different hero headlines

## 🔒 Privacy & GDPR

### Add Cookie Consent (If Using GA):
```javascript
// Simple consent banner
const CookieConsent = () => (
  <div className="cookie-consent">
    We use cookies to improve your experience. 
    <button onClick={acceptCookies}>Accept</button>
  </div>
);
```

### Privacy Policy Update:
Add section about analytics:
- What data you collect
- How it's used
- User rights
- Opt-out instructions

## 💡 Pro Tips

1. **Start Simple** - Just GA4 is enough initially
2. **Track What Matters** - Conversions > Vanity metrics
3. **Review Weekly** - Set calendar reminder
4. **Act on Data** - Don't just collect, improve
5. **Test Everything** - Small changes = big results

## 🆘 Troubleshooting

### Not Seeing Data?
- Check if ad blocker is blocking GA
- Verify tracking ID is correct
- Wait 24-48 hours for data
- Check real-time reports first

### Weird Spike in Traffic?
- Could be bots (filter them)
- Someone shared your site
- You're ranking for new keyword

### Low Conversions?
- Forms too long
- Site too slow
- Not mobile-friendly
- Unclear value proposition