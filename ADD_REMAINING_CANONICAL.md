# Add Canonical URLs to Remaining Pages

## Pages that need canonical URLs:

### Service Pages:
1. ✅ AISolutions.js - DONE
2. ⏳ DigitalMarketingSEO.js - `https://softeefi.co.uk/services/digital-marketing-seo`
3. ⏳ CloudServices.js - `https://softeefi.co.uk/services/cloud-services`
4. ⏳ UIUXDesign.js - `https://softeefi.co.uk/services/ui-ux-design`
5. ⏳ GraphicDesigningPortfolio.js - `https://softeefi.co.uk/services/graphic-design`
6. ⏳ VideoProduction.js - `https://softeefi.co.uk/services/video-production`
7. ⏳ DigitalArt.js - `https://softeefi.co.uk/services/digital-art`

### Other Pages:
8. ⏳ FreeReports.js - `https://softeefi.co.uk/free-reports`
9. ⏳ Blog.js - `https://softeefi.co.uk/blog`
10. ⏳ Process.js - `https://softeefi.co.uk/process`

## Code to add after keywords section:
```javascript
// Add canonical URL
let canonical = document.querySelector('link[rel="canonical"]');
if (!canonical) {
  canonical = document.createElement('link');
  canonical.rel = 'canonical';
  document.head.appendChild(canonical);
}
canonical.href = 'URL_HERE';
```