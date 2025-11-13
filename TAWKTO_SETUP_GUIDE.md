# Tawk.to Live Chat Setup Guide

## Current Status
✅ Tawk.to component created and integrated into your app
⏳ Waiting for your Tawk.to credentials

## Steps to Complete Setup

1. **Sign up for Tawk.to** (if you haven't already)
   - Go to https://www.tawk.to
   - Create a free account

2. **Create a Property**
   - After logging in, click "Add Property"
   - Enter your website name: "Softeefi"
   - Enter your website URL

3. **Get Your Widget Code**
   - Go to Administration → Chat Widget
   - You'll see code that looks like:
   ```javascript
   <!--Start of Tawk.to Script-->
   <script type="text/javascript">
   var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
   (function(){
   var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
   s1.async=true;
   s1.src='https://embed.tawk.to/YOUR_PROPERTY_ID_HERE/default';
   s1.charset='UTF-8';
   s1.setAttribute('crossorigin','*');
   s0.parentNode.insertBefore(s1,s0);
   })();
   </script>
   <!--End of Tawk.to Script-->
   ```

4. **Extract Your Property ID**
   - From the URL in the code above, copy the part after `embed.tawk.to/`
   - It will look something like: `5f4b3c2a4704467e7d2c5555`

5. **Update the Component**
   - Open `/frontend/src/components/TawkTo.js`
   - Replace `YOUR_PROPERTY_ID_HERE` with your actual property ID
   - The widget ID is usually `default` unless you created a custom widget

## Customization Options

The component is already configured to:
- Match your green theme (#00ff7f)
- Position in bottom-right corner
- Adjust position on mobile to avoid overlapping with your floating contact widget

### Additional Customizations Available in Tawk.to Dashboard:
1. **Widget Appearance**
   - Go to Administration → Chat Widget → Appearance
   - Set primary color to #00ff7f
   - Customize bubble size and position

2. **Auto Messages**
   - Set up greeting messages
   - Configure offline messages
   - Create targeted messages based on page/time

3. **Agent Settings**
   - Add team members
   - Set working hours
   - Configure departments

## Testing
After updating the property ID:
1. Refresh your website
2. You should see the Tawk.to chat widget in the bottom-right corner
3. It should match your website's green theme
4. Test on both desktop and mobile

## Troubleshooting
- If the widget doesn't appear, check the browser console for errors
- Make sure you've saved the file after adding your property ID
- Clear your browser cache if needed
- The widget might take a few seconds to load on first visit