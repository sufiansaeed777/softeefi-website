import { SearchIcon, AdIcon, ShoppingIcon, SocialIcon, EmailIcon, ContentIcon, AnalyticsIcon, RocketIcon } from './DigitalMarketingIcons';

// Services data
export const services = [
  { icon: SearchIcon, title: 'SEO Optimization', description: 'Dominate search rankings with cutting-edge SEO strategies' },
  { icon: AdIcon, title: 'PPC Advertising', description: 'Maximize ROI with targeted pay-per-click campaigns' },
  { icon: ShoppingIcon, title: 'E-commerce Marketing', description: 'Transform browsers into buyers with conversion optimization' },
  { icon: SocialIcon, title: 'Social Media Marketing', description: 'Build brand loyalty and engage your audience across platforms' },
  { icon: EmailIcon, title: 'Email Marketing', description: 'Nurture leads and drive sales with personalized campaigns' },
  { icon: ContentIcon, title: 'Content Marketing', description: 'Tell your story and establish thought leadership' },
  { icon: AnalyticsIcon, title: 'Analytics & Reporting', description: 'Data-driven insights to optimize your marketing performance' },
  { icon: RocketIcon, title: 'Growth Hacking', description: 'Rapid experimentation to accelerate business growth' }
];

// Portfolio items data - ordered by importance and variety
export const portfolioItems = [
  {
    id: 'dr-diana',
    category: 'content',
    title: 'YouTube Channel Rescue: 100K Subscribers',
    client: 'Dr. Diana Girnita - Rheumatologist',
    results: ['100K+ Subscribers', '2X Views (4.3M)', '3X Growth'],
    description: 'Rescued a dying YouTube channel and achieved 100K subscribers milestone with strategic viral content approach',
    image: '/images/portfolio/dr-diana.webp',
    additionalImages: [
      '/images/portfolio/dr-diana-strategy-1.webp',
      '/images/portfolio/dr-diana-strategy-2.webp',
      '/images/portfolio/dr-diana-strategy-3.webp',
      '/images/portfolio/dr-diana-strategy-4.webp',
      '/images/portfolio/dr-diana-strategy-5.webp'
    ],
    strategy: {
      title: 'The Rebirth Strategy',
      description: 'The shorts were posted strategically in a way where they would recommend her long form videos to the viewers over time, this is what caused the rebirth of her channel!',
      shortFormStats: ['10K views', '30K views', '12K views', '12K views', '14K views'],
      approach: 'Short Form Content → Long Form Content conversion strategy using strategic YouTube Shorts placement'
    },
    tags: ['Personal Branding', 'YouTube Growth', 'Medical Content', 'Social SEO'],
    featured: true
  },
  {
    id: 'scott-smith',
    category: 'social',
    title: 'High-Ticket Lead Generation: $20K AOV',
    client: 'Scott Smith - Royal Legal Solutions',
    results: ['700+ Qualified Leads', '$20K Average Order Value', '70M+ Views'],
    description: 'Wide Net Strategy that generated high-quality leads with $20,000 average order value for legal services',
    image: '/images/portfolio/scott-smith-022121.webp',
    additionalImages: [
      '/images/portfolio/scott-smith-022133.webp',
      '/images/portfolio/scott-smith-022146.webp',
      '/images/portfolio/scott-smith-022212.webp',
      '/images/portfolio/scott-smith-022442.webp',
      '/images/portfolio/scott-smith-022454.webp'
    ],
    caseStudySlides: {
      overview: 'The client operates in a competitive industry where lead quality and long-term customer relationships are crucial for business growth.',
      objectives: ['Lead Generation with $20K AOV', 'Build Long Term ARR', 'Audience Engagement'],
      challenges: ['High Competition in saturated market', 'Need for high-quality leads with purchase intent', 'Struggled with audience engagement'],
      approach: ['Content Creation & SEO', 'Personal Brand Enhancement', 'The Fishing Net Strategy', 'Lead Qualification & Conversion'],
      results: ['Generated leads with $20K AOV', '700+ Qualified Leads', '70M+ views on top content', 'Improved brand recognition']
    },
    tags: ['B2B Marketing', 'Lead Generation', 'High-Ticket Sales', 'Legal Services'],
    featured: true
  },
  {
    id: 'german-shepherd-affiliate',
    category: 'seo',
    title: 'Amazon Affiliate Dog Niche: 10.3K Keywords & $3.3K Traffic Value',
    client: 'GermanShepherdAdvisor.com - Dog & Pet Education',
    results: ['10.3K Keywords Ranked', '3.3K Monthly Traffic', '$3.3K Organic Traffic Value'],
    description: 'Built successful Amazon affiliate website in competitive dog niche with 250+ articles, achieving strong organic rankings and dual monetization through Amazon Associates and Google AdSense',
    image: '/images/portfolio/dog-affiliate/ahrefs-dashboard.webp',
    additionalImages: [
      '/images/portfolio/dog-affiliate/ahrefs-overview.webp',
      '/images/portfolio/dog-affiliate/ahrefs-top-pages.webp'
    ],
    seoMetrics: {
      domainRating: 0,
      urlRating: 3.9,
      backlinks: '86',
      referringDomains: '24',
      organicKeywords: '10.3K',
      organicTraffic: '3.3K monthly',
      trafficValue: '$3,300',
      topCountries: [
        { country: 'USA', percentage: '91.5%', keywords: '9.3K' },
        { country: 'Canada', percentage: '3.5%', keywords: '969' },
        { country: 'UK', percentage: '2.5%', keywords: '767' },
        { country: 'Australia', percentage: '2.0%', keywords: '590' },
        { country: 'India', percentage: '0.5%', keywords: '230' }
      ]
    },
    affiliateSuccess: {
      networks: [
        'Amazon Associates (Primary)',
        'Google AdSense (Secondary)'
      ],
      monetization: [
        'Amazon product recommendations',
        'Comprehensive buying guides',
        'Product comparison tables',
        'Affiliate link optimization',
        'Strategic ad placements',
        'Content monetization funnels'
      ],
      contentVolume: '250+ published articles',
      targetMarket: 'United States (Primary)',
      niche: 'German Shepherds & Dog Care'
    },
    strategy: {
      title: 'Comprehensive Dog Niche Affiliate Marketing Strategy',
      description: 'Built authority website targeting German Shepherd and general dog care topics with focus on commercial intent keywords for Amazon affiliate conversions',
      techniques: [
        'Extensive keyword research for dog niche',
        'Informational content creation (guides, tips)',
        'Commercial content optimization (reviews, comparisons)',
        'Navigational content structure',
        'Educational dog care resources',
        'Long-tail keyword targeting',
        'Content clustering for topical authority',
        'User intent optimization',
        'Mobile-first content approach',
        'Schema markup for reviews and guides'
      ],
      timeline: '6+ months',
      priceRange: '$2,500 - $5,000'
    },
    contentTypes: {
      informational: [
        'German Shepherd care guides',
        'Training tutorials',
        'Health and nutrition articles',
        'Breed information'
      ],
      commercial: [
        'Product reviews',
        'Best dog food comparisons',
        'Training equipment guides',
        'Grooming tool recommendations'
      ],
      navigational: [
        'Breed selector tools',
        'Resource directories',
        'FAQ sections',
        'How-to guides'
      ],
      educational: [
        'Dog behavior analysis',
        'Veterinary advice articles',
        'Training methodologies',
        'Puppy development stages'
      ]
    },
    performanceHighlights: {
      totalArticles: '250+',
      monthlyTraffic: '3,300 visitors',
      trafficValue: '$3,300',
      primaryTrafficSource: 'Organic Search (86%)',
      topPerformingContent: [
        'German Shepherd training guides',
        'Dog food reviews and comparisons',
        'Puppy care essentials',
        'Health and wellness articles',
        'Product buying guides'
      ]
    },
    competitiveAdvantages: [
      'Deep focus on German Shepherd niche',
      'Comprehensive content library (250+ articles)',
      'High US traffic concentration (91.5%)',
      'Dual monetization strategy',
      'Mobile-optimized user experience',
      'Fast-loading pages for better conversions'
    ],
    tags: ['Amazon Associates', 'Affiliate Marketing', 'Pet Niche', 'Google AdSense', 'Content Marketing', 'SEO'],
    featured: true,
    testimonial: 'The comprehensive approach to building our dog niche website exceeded expectations. With 250+ high-quality articles and smart SEO strategies, we now earn consistently from both Amazon commissions and AdSense revenue.',
    caseStudyHighlights: [
      'Built 250+ article content library',
      'Achieved 10.3K keyword rankings',
      'Generated $3.3K monthly traffic value',
      'Successfully monetized with Amazon & AdSense',
      'Captured 91.5% US targeted traffic',
      'Established authority in competitive dog niche'
    ]
  },
  {
    id: 'mitchell-saum',
    category: 'content',
    title: 'AI Innovation: 5-10 Hours Saved Weekly',
    client: 'Mitchell Saum',
    results: ['5-10 Hours Saved/Week', 'Daily Content Posts', 'Zero Recording Needed'],
    description: 'Revolutionary AI-powered content strategy that posts daily videos without the client recording anything',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    additionalImages: [
      '/images/portfolio/mitchell-saum-021104.webp',
      '/images/portfolio/mitchell-saum-021137.webp',
      '/images/portfolio/mitchell-saum-021206.webp',
      '/images/portfolio/mitchell-saum-021223.webp',
      '/images/portfolio/mitchell-saum-021255.webp',
      '/images/portfolio/mitchell-saum-021309.webp',
      '/images/portfolio/mitchell-saum-021555.webp',
      '/images/portfolio/mitchell-saum-021608.webp'
    ],
    aiStorySlides: [
      'What if I told you my client hasn\'t RECORDED in months, but we still POST DAILY VIDEOS on his socials?',
      'My client was too busy to RECORD CONTENT, so for a while, nothing was being produced.',
      'Instead of PUSHING him to get back to it, I decided to take matters into my own hands.',
      'Me and my team began researching AI TOOLS to generate content.',
      'And what we found... was a total GAME CHANGER!',
      'This saved my client 5-10 HOURS per week... without him lifting a finger!',
      'We created AI-GENERATED content that was so REALISTIC even my editors couldn\'t tell it wasn\'t the real deal!',
      'He didn\'t have to record a single piece of content. NOT. ONE. THING.'
    ],
    tags: ['AI Content', 'Time Saving', 'Automation', 'Innovation'],
    featured: true
  },
  {
    id: 'backward-point',
    category: 'content',
    title: 'Viral Podcast Growth: 0 to 50K Subscribers',
    client: 'Backward Point - Cricket Podcast',
    results: ['100M+ Total Views', '50K Subscribers', '24M YouTube Views'],
    description: 'Helped cricket podcast achieve massive viral growth using Mother-Child strategy and meme marketing',
    image: '/images/portfolio/backward-point.webp',
    tags: ['Podcast Growth', 'Viral Content', 'Meme Marketing', 'Multi-Platform'],
    featured: true
  },
  {
    id: 'wiprint-seo',
    category: 'seo',
    title: 'Italian E-commerce SEO Success: 1.9K Keywords Ranked',
    client: 'Wiprint.it - Italian E-commerce',
    results: ['1.9K Keywords Ranked', '3K Organic Traffic Value', 'DR 27 to Top 3 Rankings'],
    description: 'Transformed Italian e-commerce site using white hat SEO techniques, achieving significant organic growth and online orders within 6 months',
    image: '/images/portfolio/seo-wiprint-overview.webp',
    additionalImages: [
      '/images/portfolio/seo-wiprint-metrics.webp',
      '/images/portfolio/seo-wiprint-semrush.webp'
    ],
    seoMetrics: {
      domainRating: 27,
      urlRating: 2.2,
      backlinks: '3.2K',
      referringDomains: '1.2K',
      organicKeywords: '1.9K',
      organicTrafficValue: '$754',
      topCountries: [
        { country: 'Italy', percentage: '99.5%', keywords: '1.9K' },
        { country: 'Russia', percentage: '0.2%', keywords: '10' },
        { country: 'Germany', percentage: '0.1%', keywords: '8' },
        { country: 'USA', percentage: '<0.1%', keywords: '14' },
        { country: 'Switzerland', percentage: '<0.1%', keywords: '11' }
      ]
    },
    strategy: {
      title: 'White Hat SEO Excellence',
      description: 'Comprehensive SEO strategy focusing on technical optimization, content strategy, and high-quality backlink acquisition for the Italian market',
      techniques: [
        'Technical SEO audit and optimization',
        'Italian keyword research and mapping',
        'On-page optimization for e-commerce',
        'High-quality backlink acquisition (1.2K referring domains)',
        'Local SEO optimization for Italy',
        'Content strategy for product pages',
        'Schema markup implementation',
        'Site speed optimization'
      ],
      timeline: '6+ months'
    },
    semrushData: {
      organicTraffic: '3K monthly',
      paidTrafficCost: '0',
      backlinks: '26K',
      displayAds: '0',
      topOrganicKeywords: [
        'stampa digitale online',
        'tipografia online',
        'stampa volantini online',
        'stampa biglietti da visita',
        'stampa manifesti online'
      ],
      competitorMap: 'Outranking major Italian printing competitors'
    },
    tags: ['E-commerce SEO', 'Italian Market', 'White Hat SEO', 'Organic Growth', 'Technical SEO'],
    featured: true,
    testimonial: 'Now getting consistent online orders from organic search. The white hat approach ensured sustainable, long-term growth for our Italian e-commerce business.',
    caseStudyHighlights: [
      'From zero visibility to 1.9K keywords ranked',
      'Achieved top 3 positions for competitive Italian printing keywords',
      'Built authority with 3.2K quality backlinks',
      'Generated consistent e-commerce sales from organic traffic',
      'Dominated Italian market with 99.5% traffic share'
    ]
  },
  {
    id: 'health-affiliate-seo',
    category: 'seo',
    title: 'Health Niche SEO & Affiliate Success: $30.9K Traffic Value',
    client: 'KitchenBazar.pk - Health & Medical Education Site',
    results: ['$30.9K Organic Traffic Value', '11K Monthly Traffic', 'Amazon & AdSense Approved'],
    description: 'Transformed health niche website with strategic SEO, achieving top rankings for customer-desired keywords and successful monetization through affiliate partnerships',
    image: '/images/portfolio/seo-health-kitchenbazar.webp',
    additionalImages: [
      '/images/portfolio/seo-health-semrush.webp'
    ],
    seoMetrics: {
      organicTraffic: '11K monthly',
      trafficValue: '$30,900',
      keywords: '11K ranked',
      backlinks: '2.7K',
      referringDomains: '350+',
      domainAuthority: 'Growing consistently'
    },
    affiliateSuccess: {
      networks: [
        'Amazon Associates',
        'CJ Affiliate',
        'ShareASale', 
        'ClickBank',
        'Rakuten Advertising',
        'FlexOffers'
      ],
      monetization: [
        'Google AdSense Approved',
        'Amazon Affiliate Program Active',
        'Multiple Brand Partnerships',
        'Affiliate Marketing Funnels',
        'Strategic Link Placement'
      ]
    },
    strategy: {
      title: 'Health Niche SEO & Monetization Strategy',
      description: 'Comprehensive approach combining technical SEO, content optimization, and strategic affiliate marketing for the health and medical education niche',
      techniques: [
        'Health niche keyword research and targeting',
        'Medical content optimization with E-A-T signals',
        'Affiliate marketing funnel development',
        'Strategic affiliate link promotion',
        'Content clustering for topical authority',
        'Technical SEO for site speed and crawlability',
        'Building trust signals for YMYL content',
        'Conversion optimization for affiliate clicks'
      ],
      timeline: '6+ months'
    },
    contentStrategy: {
      focus: 'Because Your Health Matters',
      topics: [
        'Fat-Soluble Vitamins',
        'Mental Health Awareness',
        'Healthy Living Tips',
        'Medical Education Content',
        'Wellness Resources',
        'Nutritional Guides'
      ]
    },
    semrushHighlights: {
      organicGrowth: 'Consistent upward trend',
      topKeywords: [
        'health tips',
        'vitamin guides',
        'medical information',
        'wellness advice',
        'nutrition facts'
      ],
      competitorAnalysis: 'Outranking established health sites',
      brandedTraffic: 'Growing brand recognition'
    },
    tags: ['Health SEO', 'Affiliate Marketing', 'Medical Niche', 'AdSense', 'Amazon Associates', 'Content Monetization'],
    featured: true,
    testimonial: 'Not only did they achieve top rankings for our target keywords, but they also helped us get approved for Google AdSense and Amazon Associates. The affiliate marketing strategy has created multiple revenue streams.',
    caseStudyHighlights: [
      'Achieved $30.9K monthly organic traffic value',
      'Successfully monetized with AdSense and Amazon',
      'Built authority in competitive health niche',
      'Created sustainable affiliate revenue streams',
      'Developed trust signals for YMYL content'
    ]
  },
  {
    id: 'shopper-personalizzate',
    category: 'seo',
    title: 'Italian E-commerce Domination: #1 Rankings & Featured Snippets',
    client: 'Shopper-Personalizzate.it - Custom Shopping Bags',
    results: ['1.4K Keywords Ranked', '5.1K Organic Traffic', 'Featured Snippets & Sitelinks'],
    description: 'Achieved first page dominance for Italian custom shopping bag e-commerce site with multiple #1 positions, featured snippets, and Google sitelinks',
    image: '/images/portfolio/seo-shopper-metrics.webp',
    seoMetrics: {
      domainRating: 38,
      organicTraffic: '5.1K monthly',
      trafficValue: '$5,600',
      keywords: '1.4K ranked',
      backlinks: '11.5K',
      referringDomains: '1.3K',
      topRankings: {
        position1: 'Multiple keywords',
        position2: 'Multiple keywords',
        position3: 'Multiple keywords',
        featuredSnippets: 'Yes',
        sitelinks: 'Achieved'
      }
    },
    strategy: {
      title: 'Full SEO Package Excellence',
      description: 'Comprehensive 6-month SEO campaign focusing on achieving top positions for client-specified keywords in the Italian market',
      techniques: [
        'Full SEO package implementation',
        'E-commerce SEO optimization',
        'Local SEO for Italian market',
        'Google My Business optimization',
        'Off-page SEO and link building',
        'SEO content writing and optimization',
        'Extensive keyword research for target terms',
        'On-page SEO perfection',
        'Technical SEO implementation',
        'Competitor analysis and strategy',
        'Local citations and directories'
      ],
      timeline: '6+ months'
    },
    achievements: [
      'First position on Google for main keywords',
      'Featured snippets for high-value queries',
      'Google sitelinks in search results',
      'Consistent top 3 rankings across target keywords',
      'Domain authority growth to DR 38',
      '11.5K quality backlinks acquired',
      '1.3K referring domains built'
    ],
    internationalSEO: {
      targetMarket: 'Italy',
      language: 'Italian',
      localStrategy: 'Complete Italian market optimization with local SEO signals'
    },
    tags: ['E-commerce SEO', 'Italian Market', 'Featured Snippets', 'Sitelinks', 'Top Rankings', 'Full SEO Package'],
    featured: true,
    testimonial: 'After 6 months of dedicated work, our website now ranks #1 for our most important keywords. We have featured snippets, sitelinks, and consistent first-page positions. The results exceeded our expectations.',
    caseStudyHighlights: [
      'Achieved #1 positions for client-specified keywords',
      'Earned Google featured snippets for key queries',
      'Obtained Google sitelinks for brand authority',
      'Built 11.5K high-quality backlinks',
      'Grew organic traffic to 5.1K monthly visitors',
      'Established dominance in Italian e-commerce market'
    ]
  },
  {
    id: 'garden-plants-research',
    category: 'seo',
    title: 'Garden Industry SEO Research: 10+ Competitor Deep Analysis',
    client: 'Garden Plants & Flowers Industry Research',
    results: ['10+ Competitors Analyzed', '454K+ Keywords Discovered', 'Full Market Intelligence'],
    description: 'Comprehensive SEO keyword research and competitive analysis for garden plants and flowers industry, uncovering market opportunities and competitor weaknesses',
    image: '/images/portfolio/seo-garden-overview.webp',
    additionalImages: [
      '/images/portfolio/seo-garden-backlinks.webp',
      '/images/portfolio/seo-bobvila-competitor.webp',
      '/images/portfolio/seo-bobvila-competitive.webp'
    ],
    competitorAnalysis: {
      topCompetitor: 'BobVila.com',
      competitorMetrics: {
        organicTraffic: '4.2M monthly',
        keywords: '3.2M ranked',
        backlinks: '7.3M',
        referringDomains: '135K',
        trafficValue: '$7.6M'
      },
      marketLeaders: [
        { name: 'ThisOldHouse.com', keywords: '255.3K', traffic: 'High', level: '28%' },
        { name: 'TheSpruce.com', keywords: '391.3K', traffic: '4.7M', level: '27%' },
        { name: 'FamilyHandyman.com', keywords: '227.5K', traffic: '2.3M', level: '24%' },
        { name: 'Angi.com', keywords: '279K', traffic: '3.6M', level: '23%' },
        { name: 'BHG.com', keywords: '183.4K', traffic: '3.0M', level: '17%' }
      ]
    },
    researchFindings: {
      targetClient: 'GreatGardenPlants.com',
      currentMetrics: {
        organicTraffic: '65.5K monthly',
        keywords: '52.3K ranked',
        backlinks: '47.1K',
        trafficValue: '$168.7K',
        semrushRank: '28.9K'
      },
      opportunities: [
        'Gap in long-tail plant care keywords',
        'Weak competitor content depth for specific plants',
        'Underserved regional gardening queries',
        'Low competition for seasonal planting guides',
        'Opportunity in "how-to" gardening content'
      ]
    },
    strategy: {
      title: 'Comprehensive Market Intelligence & Opportunity Mapping',
      description: 'Deep-dive competitive analysis identifying keyword gaps, content opportunities, and strategic entry points in the garden industry',
      techniques: [
        'Full competitor SEO audit for 10+ major players',
        'Keyword gap analysis across competitors',
        'Backlink profile assessment and opportunities',
        'Content strategy identification',
        'Seasonal trend analysis for garden queries',
        'Local SEO opportunities for nurseries',
        'Featured snippet opportunity mapping',
        'Competitor weakness exploitation strategy'
      ]
    },
    keyInsights: [
      '73% of US traffic dominates the market',
      'High-value commercial intent keywords underutilized',
      '47.1K backlink foundation shows strong authority potential',
      'Top competitors vulnerable in specific plant varieties',
      'Seasonal content gaps present year-round opportunities'
    ],
    deliverables: [
      'Complete competitor analysis report',
      'Keyword opportunity database (10,000+ terms)',
      'Content gap analysis and recommendations',
      'Backlink acquisition targets list',
      'Seasonal content calendar',
      'Technical SEO audit findings'
    ],
    tags: ['SEO Research', 'Competitor Analysis', 'Garden Industry', 'Keyword Research', 'Market Intelligence'],
    featured: false,
    caseStudyHighlights: [
      'Analyzed 454,180 competitor keywords',
      'Identified 10+ major competitor weaknesses',
      'Mapped seasonal traffic patterns',
      'Discovered untapped long-tail opportunities',
      'Created comprehensive growth strategy'
    ]
  },
  {
    id: 'shih-tzu-affiliate',
    category: 'seo',
    title: 'Pet Niche Affiliate Success: 360 Keywords & Growing Authority',
    client: 'MySweetShihTzu.com - Pet & Dog Education',
    results: ['360 Organic Keywords', '12 Backlinks Built', 'Affiliate Marketing Focus'],
    description: 'Strategic affiliate marketing website in the competitive pet niche, focusing on Shih Tzu breed education and monetization through targeted content and affiliate partnerships',
    image: '/images/portfolio/shih-tzu-affiliate/semrush-overview.webp',
    additionalImages: [
      '/images/portfolio/shih-tzu-affiliate/keyword-rankings.webp'
    ],
    seoMetrics: {
      domainRating: 0,
      authorityScore: 8,
      organicKeywords: '360',
      organicTraffic: 'Growing',
      backlinks: '12',
      referringDomains: '12',
      topRankings: 'Multiple page 1-3 positions',
      competitiveAnalysis: {
        mainCompetitors: 4,
        competitorsTracked: true,
        positionDistribution: 'Strong presence in top 10'
      }
    },
    affiliateStrategy: {
      niche: 'Shih Tzu & Small Dog Breeds',
      contentFocus: [
        'Breed-specific care guides',
        'Product reviews and recommendations',
        'Training and behavior articles',
        'Health and grooming content',
        'Buyer guides for pet products'
      ],
      monetization: [
        'Affiliate product recommendations',
        'Targeted buying guides',
        'Comparison articles',
        'Resource pages with affiliate links'
      ]
    },
    keywordStrategy: {
      totalTracked: '360 keywords',
      topPositions: {
        position1to3: 'Multiple keywords',
        position4to10: 'Growing presence',
        position11to20: 'Expansion opportunities'
      },
      keywordTypes: [
        'Shih Tzu care keywords',
        'Product review keywords',
        'Buying intent keywords',
        'Informational queries',
        'Long-tail breed-specific terms'
      ]
    },
    competitorInsights: {
      tracked: '4 main competitors',
      analysis: [
        'Identified content gaps in competitor strategies',
        'Found underserved keyword opportunities',
        'Discovered link building opportunities',
        'Analyzed successful content formats'
      ]
    },
    strategy: {
      title: 'Focused Pet Niche Affiliate Marketing',
      description: 'Building authority in the Shih Tzu niche through targeted content creation, strategic keyword targeting, and affiliate monetization optimization',
      techniques: [
        'Niche-specific keyword research',
        'Competitor gap analysis',
        'Content clustering strategy',
        'Affiliate link optimization',
        'User intent mapping',
        'Mobile-first content approach',
        'Featured snippet optimization',
        'Internal linking structure'
      ],
      timeline: 'Ongoing optimization'
    },
    backlinksProfile: {
      total: '12 backlinks',
      referringDomains: '12',
      quality: 'High-quality, niche-relevant sources',
      strategy: [
        'Guest posting on pet blogs',
        'Resource page link building',
        'Breed directory submissions',
        'Pet community engagement'
      ]
    },
    contentHighlights: [
      'Comprehensive Shih Tzu care guides',
      'Product review optimization',
      'Seasonal content strategy',
      'User-generated content integration',
      'FAQ and troubleshooting guides'
    ],
    tags: ['Affiliate Marketing', 'Pet Niche', 'SEO', 'Content Strategy', 'Shih Tzu'],
    featured: false,
    testimonial: 'The focused approach to the Shih Tzu niche has helped us build a growing authority site with consistent affiliate revenue. The keyword targeting and content strategy are spot-on.',
    caseStudyHighlights: [
      '360 organic keywords tracked and optimized',
      'Built 12 high-quality niche-relevant backlinks',
      'Established authority in Shih Tzu niche',
      'Multiple top 10 keyword rankings achieved',
      'Comprehensive competitor tracking system',
      'Growing affiliate revenue streams'
    ]
  },
  {
    id: 'scottish-attire-affiliate',
    category: 'seo',
    title: 'Fashion Affiliate SEO: 1.7K Keywords & High-Value Rankings',
    client: 'ScottishAttire.com - American Fashion & Apparel',
    results: ['1.7K Keywords Ranked', '1K+ Organic Traffic', 'Top 3 for Key Terms'],
    description: 'Transformed fashion affiliate blog into SEO powerhouse with strategic optimization for high-value Scottish apparel keywords and affiliate conversions',
    image: '/images/portfolio/seo-scottish-overview.webp',
    additionalImages: [
      '/images/portfolio/seo-scottish-performance.webp'
    ],
    seoMetrics: {
      domainRating: 11,
      organicTraffic: '1K+ monthly',
      organicKeywords: '1.7K',
      backlinks: '659',
      referringDomains: '30',
      trafficValue: '$23',
      topRankings: [
        { keyword: 'scottish attire', position: 2, volume: '150' },
        { keyword: 'why do scottish men wear skirts', position: 1, volume: '60' },
        { keyword: 'scottish women features', position: 4, volume: '350' },
        { keyword: 'scottish instruments', position: 7, volume: '700' },
        { keyword: 'how much is a highland cow', position: 7, volume: '200' },
        { keyword: 'national headwear of scotland', position: 3, volume: '80' },
        { keyword: 'shoes to wear with kilt', position: 10, volume: '70' }
      ]
    },
    affiliateStrategy: {
      title: 'Fashion Affiliate SEO Excellence',
      description: 'Comprehensive SEO strategy designed to drive affiliate conversions through targeted content optimization for Scottish fashion and apparel',
      networks: [
        'Amazon Associates',
        'CJ Affiliate',
        'ShareASale',
        'ClickBank',
        'Rakuten Advertising'
      ],
      techniques: [
        'Affiliate-focused keyword research',
        'High-intent buyer keyword targeting',
        'Product comparison content optimization',
        'Affiliate link strategic placement',
        'Schema markup for product reviews',
        'Long-tail keyword domination',
        'Cultural fashion content strategy',
        'Conversion-optimized landing pages'
      ],
      timeline: '6+ months'
    },
    performanceHighlights: {
      totalPages: 409,
      totalTraffic: 936,
      topPerformingPages: [
        { url: 'what-do-scottish-people-look-like', traffic: 406, keywords: 128 },
        { url: 'the-complete-guide-about-traditional-scottish-instrument', traffic: 101, keywords: 26 },
        { url: 'homepage', traffic: 99, keywords: 84 },
        { url: 'how-much-is-a-scottish-highland-cow', traffic: 97, keywords: 95 },
        { url: 'why-do-men-wear-skirts-in-scotland', traffic: 26, keywords: 38 }
      ]
    },
    contentStrategy: {
      focus: 'Scottish Fashion & Cultural Heritage',
      topics: [
        'Traditional Scottish Attire',
        'Kilts and Accessories',
        'Scottish Women Fashion',
        'Highland Dress Code',
        'Scottish Musical Instruments',
        'Cultural Fashion History',
        'Modern Scottish Style'
      ]
    },
    tags: ['Affiliate SEO', 'Fashion Industry', 'E-commerce', 'Cultural Content', 'Amazon Associates'],
    featured: false,
    testimonial: 'The SEO strategy perfectly aligned with our affiliate goals. We now rank #1 for key buying-intent keywords and have seen significant increases in affiliate commissions.',
    caseStudyHighlights: [
      'Achieved 1.7K keyword rankings in competitive fashion niche',
      'Secured top 3 positions for high-value affiliate keywords',
      'Built authority with 659 quality backlinks',
      'Optimized 409 pages for maximum affiliate conversion',
      'Created culturally-rich content that converts'
    ]
  },
  {
    id: 'ecommerce-meme',
    category: 'social',
    title: 'E-commerce Meme Marketing Success',
    client: 'Fashion E-commerce Brand',
    results: ['$20K Revenue', '2.2M+ Views', '100% Organic'],
    description: 'Generated $20,000 in revenue through pure organic meme marketing without any paid advertising',
    image: '/images/portfolio/ecommerce-meme.webp',
    tags: ['E-commerce', 'Meme Marketing', 'Social Commerce', 'Organic Growth']
  },
  {
    id: 'content-channel',
    category: 'content',
    title: '5-Year Content Journey: 270K Subscribers',
    client: 'Content Creation Channel',
    results: ['270K+ Subscribers', '16M+ Total Views', '3.6M Views/Year'],
    description: 'Built from 0 to 270K+ subscribers over 5 years, learning and perfecting content strategies',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
    tags: ['Long-term Growth', 'Content Strategy', 'YouTube Channel', 'Organic Growth']
  },
  {
    id: 'melanie-stover',
    category: 'social',
    title: 'Event Ticket Sales: 20% Increase in 1 Week',
    client: 'Melanie Stover - Home Care Sales',
    results: ['20% Ticket Sales Increase', 'Less Than 1 Week', 'Flagship Event Success'],
    description: 'Helped boost ticket sales for flagship event by 20% in less than a week through strategic social media marketing',
    image: '/images/portfolio/melanie-stover.webp',
    tags: ['Event Marketing', 'Quick Results', 'Social Media', 'Sales Boost'],
    featured: true
  }
];

// Process steps data
export const process = [
  {
    number: '01',
    title: 'Discovery & Audit',
    description: 'We dive deep into your business, market, and competition to uncover opportunities'
  },
  {
    number: '02',
    title: 'Strategy Development',
    description: 'Custom strategies tailored to your goals, budget, and timeline'
  },
  {
    number: '03',
    title: 'Implementation',
    description: 'Expert execution across all channels with meticulous attention to detail'
  },
  {
    number: '04',
    title: 'Optimization',
    description: 'Continuous testing and refinement to maximize performance'
  },
  {
    number: '05',
    title: 'Reporting & Insights',
    description: 'Transparent reporting with actionable insights for growth'
  }
];

// Testimonials data
export const testimonials = [
  {
    content: "the value for money delivered is second to none we´ll work again for sure",
    author: "armofaiver",
    position: "Client",
    company: "Spain",
    rating: 5,
    image: "/images/reviews/armofaiver.webp",
    flag: "🇪🇸",
    date: "2 years ago"
  },
  {
    content: "Extremely fast, delivering all that I required with clear instructions on how to best use them. Will definitely use again, Don't search any further as you've just discovered the perfect gig.",
    author: "waynefoster363",
    position: "Client",
    company: "United Kingdom",
    rating: 5,
    flag: "🇬🇧",
    date: "2 years ago"
  },
  {
    content: "The delivery was faster than expected and the product was exactly what I wanted. I can start off with my affiliate marketing business with the help of this man! I truly appreciate the work he put into this. Thank you!",
    author: "vantump",
    position: "Client",
    company: "Finland",
    rating: 5,
    image: "/images/reviews/vantump.webp",
    flag: "🇫🇮",
    date: "2 years ago"
  },
  {
    content: "very helpful & nice to work with - many thanks for a wonderful service!",
    author: "inquiris",
    position: "Client",
    company: "United Kingdom",
    rating: 5,
    flag: "🇬🇧",
    date: "2 years ago"
  },
  {
    content: "Fast Delivery - Good Communication",
    author: "adenner",
    position: "Client",
    company: "Germany",
    rating: 5,
    image: "/images/reviews/adenner.webp",
    flag: "🇩🇪",
    date: "2 years ago"
  },
  {
    content: "Simply the Best… second order and not my last one..",
    author: "jerrybelony",
    position: "Client",
    company: "Canada",
    rating: 5,
    image: "/images/reviews/jerrybelony.webp",
    flag: "🇨🇦",
    date: "2 years ago"
  },
  {
    content: "Adnan is a nice man with rich communication, motivated, understand what he does and rock and roll fast. Im my opignion that he is worth every \"Penny\"!",
    author: "maszatkiss",
    position: "Client",
    company: "Hungary",
    rating: 5,
    image: "/images/reviews/maszatkiss.webp",
    flag: "🇭🇺",
    date: "2 years ago"
  },
  {
    content: "The best of the best",
    author: "Savieurico",
    position: "Client",
    company: "United States",
    rating: 5,
    flag: "🇺🇸",
    date: "1 year ago"
  },
  {
    content: "Was a great experience working with Adnan would definitely recommend him",
    author: "Sarah73_4",
    position: "Client",
    company: "Australia",
    rating: 5,
    flag: "🇦🇺",
    date: "1 year ago"
  },
  {
    content: "Thank you for this delivery! I am impressed with the level of output and your recommendations.",
    author: "Daminda Senekalg",
    position: "Client",
    company: "South Africa",
    rating: 5,
    image: "/images/reviews/daminda-senekalg.webp",
    flag: "🇿🇦",
    date: "6 months ago"
  },
  {
    content: "Great to work with as always!",
    author: "Jaelon Davis",
    position: "Client",
    company: "United States",
    rating: 5,
    image: "/images/reviews/jaelon-davis.webp",
    flag: "🇺🇸",
    date: "5 months ago"
  },
  {
    content: "They helped rescue my dying YouTube channel! We went from 2.2M views to 4.3M views in just 6 months, and finally reached 100K subscribers - joining the elite 0.4% of YouTube channels.",
    author: "Dr. Diana Girnita",
    position: "Rheumatologist OnCall",
    company: "Medical YouTuber",
    rating: 5,
    image: "/images/portfolio/dr-diana.webp"
  },
  {
    content: "Our podcast exploded from 0 to 50,000 subscribers generating over 100 million views across all platforms! Their Mother-Child strategy and meme marketing approach delivered incredible results.",
    author: "Backward Point",
    position: "Cricket Podcast",
    company: "Sports Media",
    rating: 5,
    image: "/images/portfolio/backward-point.webp"
  },
  {
    content: "We generated $20,000 in revenue using purely organic content - no paid ads! Their viral meme marketing strategy gave us millions of views and real sales.",
    author: "Fashion Brand Owner",
    position: "E-commerce",
    company: "Fashion Retail",
    rating: 5,
    image: "/images/portfolio/ecommerce-meme.webp"
  },
  {
    content: "They increased our ticket sales by 20% in less than a week! When I reached out desperate for help, they delivered results that exceeded my expectations.",
    author: "Melanie Stover",
    position: "Home Care Sales",
    company: "Event Organizer",
    rating: 5,
    image: "/images/portfolio/melanie-stover.webp"
  },
  {
    content: "Their AI solution is a game-changer! They save me 5-10 hours per week and post daily videos without me recording anything. Even my editors can't tell it's AI-generated!",
    author: "Mitchell Saum",
    position: "Business Owner",
    company: "Content Creator",
    rating: 5,
    image: "/images/portfolio/mitchell-saum-021104.webp"
  },
  {
    content: "Their Wide Net Strategy drove 700+ qualified leads with a $20,000 average order value! Their content reached over 70 million views and established me as an industry authority.",
    author: "Scott Smith",
    position: "Founder",
    company: "Royal Legal Solutions",
    rating: 5,
    image: "/images/portfolio/scott-smith-022121.webp"
  }
];

// Pricing plans data (if needed)
export const pricingPlans = [
  {
    name: 'Growth',
    price: '$2,999',
    period: '/month',
    description: 'Perfect for growing businesses ready to scale',
    features: [
      'SEO Foundation & Optimization',
      'Google Ads Management (up to $5K/mo spend)',
      'Social Media Marketing (3 platforms)',
      'Monthly Analytics Reports',
      'Email Marketing (up to 10K contacts)',
      'Content Creation (8 pieces/month)',
      'Dedicated Account Manager',
      'Quarterly Strategy Reviews'
    ],
    highlighted: false
  },
  {
    name: 'Scale',
    price: '$5,999',
    period: '/month',
    description: 'For businesses ready to dominate their market',
    features: [
      'Advanced SEO & Technical Optimization',
      'Google Ads Management (up to $20K/mo spend)',
      'Social Media Marketing (5 platforms)',
      'Weekly Analytics Reports & Insights',
      'Email Marketing (up to 50K contacts)',
      'Content Creation (20 pieces/month)',
      'Dedicated Team of Specialists',
      'Monthly Strategy Sessions',
      'Conversion Rate Optimization',
      'Marketing Automation Setup'
    ],
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for large organizations',
    features: [
      'Enterprise SEO Strategy',
      'Unlimited Ad Spend Management',
      'Omnichannel Marketing',
      'Real-time Analytics Dashboard',
      'Unlimited Email Marketing',
      'Unlimited Content Creation',
      'Dedicated Success Team',
      'Weekly Strategy Sessions',
      'Custom Integrations',
      'Priority Support 24/7'
    ],
    highlighted: false
  }
];

// FAQ data (if needed)
export const faqs = [
  {
    question: "How quickly can I expect to see results?",
    answer: "Results timeline varies by service. PPC can show immediate results, while SEO typically takes 3-6 months for significant improvements. We'll set realistic expectations during our initial consultation."
  },
  {
    question: "Do you work with businesses in my industry?",
    answer: "We have experience across 50+ industries including e-commerce, SaaS, healthcare, finance, education, and more. Our strategies are customized to your specific industry challenges and opportunities."
  },
  {
    question: "What makes Softeefi different from other agencies?",
    answer: "We combine cutting-edge technology with human expertise, offer transparent pricing with no hidden fees, provide dedicated account teams, and focus on ROI-driven strategies with proven results."
  },
  {
    question: "Can I change my plan or cancel anytime?",
    answer: "Yes! We believe in earning your business every month. You can upgrade, downgrade, or cancel with 30 days notice. No long-term contracts required."
  },
  {
    question: "How do you measure success?",
    answer: "We establish clear KPIs aligned with your business goals - whether that's revenue, leads, traffic, or brand awareness. You'll receive detailed reports showing progress against these metrics."
  }
];