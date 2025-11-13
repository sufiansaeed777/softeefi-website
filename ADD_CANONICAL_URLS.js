// Script to add canonical URLs to all service pages
// This ensures each page has a unique canonical URL to prevent duplicate content issues

const servicePagesCanonicals = [
  {
    file: 'frontend/src/pages/services/WebsitesAndApps.js',
    url: 'https://softeefi.co.uk/services/websites-and-apps',
    afterKeywords: true
  },
  {
    file: 'frontend/src/pages/services/AISolutions.js', 
    url: 'https://softeefi.co.uk/services/ai-solutions',
    afterKeywords: true
  },
  {
    file: 'frontend/src/pages/services/DigitalMarketingSEO.js',
    url: 'https://softeefi.co.uk/services/digital-marketing-seo',
    afterKeywords: true
  },
  {
    file: 'frontend/src/pages/services/CloudServices.js',
    url: 'https://softeefi.co.uk/services/cloud-services',
    afterKeywords: true
  },
  {
    file: 'frontend/src/pages/services/UIUXDesign.js',
    url: 'https://softeefi.co.uk/services/ui-ux-design',
    afterKeywords: true
  },
  {
    file: 'frontend/src/pages/services/GraphicDesigningPortfolio.js',
    url: 'https://softeefi.co.uk/services/graphic-design',
    afterKeywords: true
  },
  {
    file: 'frontend/src/pages/FreeReports.js',
    url: 'https://softeefi.co.uk/free-reports',
    afterKeywords: true
  }
];

// Code to add to each file after the keywords section:
const canonicalCode = `
    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'URL_PLACEHOLDER';
`;

console.log('Add the following canonical URL code to each service page:');
servicePagesCanonicals.forEach(page => {
  console.log(`\nFile: ${page.file}`);
  console.log(`Canonical URL: ${page.url}`);
  console.log('Add after the metaKeywords.content line, before Open Graph tags');
});