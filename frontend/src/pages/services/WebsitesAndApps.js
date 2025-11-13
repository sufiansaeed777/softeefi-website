import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCode, FaMobile, FaShoppingCart, FaRocket, FaChartLine, FaShieldAlt, FaPalette, FaServer, FaTrophy, FaBolt, FaGem, FaAward, FaCrown, FaMedal, FaStar } from 'react-icons/fa';
import { HiOutlineSparkles, HiArrowRight, HiCheckCircle, HiLightningBolt } from 'react-icons/hi';
import { BiCodeBlock } from 'react-icons/bi';
import { MdSecurity, MdSpeed, MdVerified } from 'react-icons/md';
import { SiReact, SiNodedotjs, SiMongodb, SiAmazonaws, SiFlutter } from 'react-icons/si';
import AskAIModal from '../../components/AskAIModal';
import ProjectModal from '../../components/ProjectModal';
import '../../styles/websites-apps-mobile.css';

const WebsitesAndApps = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [showAskAI, setShowAskAI] = useState(false);
  const [askAIPosition, setAskAIPosition] = useState({ top: 100, left: 100 });
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Mouse position tracking for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // Handle mouse move for interactive effects
  const handleMouseMove = useCallback((e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  useEffect(() => {
    // SEO Optimized Title with Web Development, SaaS, Website Building, Web App & Mobile App Keywords
    document.title = 'Web Development UK | Ecommerce & Mobile App Development - Softeefi';
    
    // Set meta description with web app building, web development, SaaS, website building and mobile app keywords
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Professional web development company UK. Expert web developers creating ecommerce websites, mobile apps, SaaS platforms, and custom web solutions. Full-stack development services across the United Kingdom. Get a free quote today.';
    }
    
    // Add meta keywords - includes website building, mobile app development and building terms
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'web app building, how to build a web app, build web apps, web app development, build web apps with ai, ai to build web apps, how to build web apps, build a web app, how to build a full stack web app, can i build a web app with python, progressive web apps, pwa development, web application building, saas building, how to build a saas, build saas platform, saas builder, building saas applications, how to build saas product, build your own saas, saas building company, saas development, saas development company, saas application development, saas platform development, saas product development, saas development services, saas developers, saas development uk, custom saas development, saas software development, build saas application, saas development agency, enterprise saas development, b2b saas development, saas mvp development, saas development cost, web development, web development services, web development company, web developer, web development uk, custom web development, web development agency, web application development, full stack development, frontend development, backend development, responsive web design, professional web development, web development services uk, web development company uk, hire web developers, affordable web development, website building, how to build a website, build a website, how can i build a website, web building websites, build your own website, website builder, website maker, create a website for free, best website creator, build a website for a business, website building company, website building services, mobile app building, build your own mobile app, mobile app building companies, how to build a mobile app, mobile app development, mobile app developers, mobile app developer, mobile app development company, mobile app developers uk, mobile app development uk, iOS app development, Android app development, react development, nodejs development, php development, python web development, wordpress development, cloud application development, scalable web applications, ecommerce, ecommerce development, ecommerce website development, ecommerce development services, ecommerce development company, ecommerce website design, online store development, ecommerce platform development, custom ecommerce development, ecommerce app development, ecommerce solutions, build ecommerce website, ecommerce website builder, how to build ecommerce website, ecommerce development uk, shopify development, woocommerce development, magento development, bigcommerce development, ecommerce mobile app, online shopping website development, b2b ecommerce development, b2c ecommerce development, marketplace development, multi vendor ecommerce, ecommerce payment integration, ecommerce seo services, headless ecommerce development';
    
    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://softeefi.co.uk/services/websites-and-apps';
    
    // Add Open Graph tags for social sharing
    const ogTags = [
      { property: 'og:title', content: 'Ecommerce Development & Web App Services | Online Store & SaaS UK - Softeefi' },
      { property: 'og:description', content: 'Leading ecommerce development company UK. Build ecommerce websites, online stores, custom SaaS platforms, and mobile shopping apps. Expert developers creating Shopify, WooCommerce, and custom ecommerce solutions with payment integration.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://softeefi.co.uk/services/websites-and-apps' },
      { property: 'og:image', content: 'https://softeefi.co.uk/images/mobile-app-development-og.jpg' }
    ];
    
    ogTags.forEach(tag => {
      let element = document.querySelector(`meta[property="${tag.property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.content = tag.content;
    });
    
    // Add structured data for mobile app development service
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://softeefi.co.uk"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Services",
              "item": "https://softeefi.co.uk/services"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Websites & Apps",
              "item": "https://softeefi.co.uk/services/websites-and-apps"
            }
          ]
        },
        {
          "@type": "Service",
          "name": "Ecommerce Development & Website Building Services",
          "description": "Professional ecommerce development and website building company. Build ecommerce websites, online stores, and shopping apps with expert developers. Complete ecommerce solutions including Shopify, WooCommerce, custom platforms, and payment integration for UK businesses.",
          "provider": {
            "@type": "Organization",
            "name": "Softeefi",
            "url": "https://softeefi.co.uk",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "UK"
            },
            "priceRange": "££-£££"
          },
          "areaServed": {
            "@type": "Country",
            "name": "United Kingdom"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Ecommerce Development & Website Building Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Ecommerce Website Development",
                  "description": "Professional ecommerce development services UK. Build custom ecommerce websites with shopping cart, payment gateway integration, inventory management, and order tracking. Shopify, WooCommerce, and Magento development."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Online Store Development",
                  "description": "Build online stores with complete ecommerce solutions. Multi-vendor marketplace development, B2B and B2C ecommerce platforms, dropshipping websites, and subscription-based ecommerce systems."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Ecommerce Mobile App Development",
                  "description": "Build ecommerce mobile apps for iOS and Android. Shopping app development with push notifications, mobile payments, AR product preview, and seamless checkout experiences."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "iOS App Building & Development",
                  "description": "Build your own iOS mobile app with Swift and Objective-C. Professional app building services for iPhone and iPad."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Android App Building & Development",
                  "description": "Build Android mobile apps using Kotlin and Java. Expert mobile app building companies services for all Android devices."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Cross-Platform Mobile App Building",
                  "description": "Build mobile apps for iOS and Android simultaneously. React Native and Flutter app building solutions for faster deployment."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Build Mobile App from Website",
                  "description": "Convert your website into a mobile app. Progressive Web App building and hybrid app development services."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Custom Mobile App Building Solutions",
                  "description": "Build your own mobile app with custom features. End-to-end app building services from concept to deployment."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Headless Ecommerce Development",
                  "description": "Modern headless ecommerce solutions with API-first architecture. Build scalable online stores with React, Next.js frontend and custom backend integration."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Ecommerce Payment Integration",
                  "description": "Secure payment gateway integration for ecommerce websites. Stripe, PayPal, Square, and custom payment processing solutions with PCI compliance."
                }
              }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How to build a website?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "To build a website, you need to: 1) Choose a domain name and hosting, 2) Select a platform or CMS, 3) Design your layout and pages, 4) Add content and functionality, 5) Test and launch. Our website building services handle all these steps professionally, or we can guide you to build your own website."
              }
            },
            {
              "@type": "Question",
              "name": "How can I build a website for my business?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Build a website for your business by: 1) Defining your business goals and target audience, 2) Choosing professional website building services or a website builder, 3) Creating compelling content, 4) Implementing SEO, 5) Adding e-commerce if needed. Our website building company specializes in business websites."
              }
            },
            {
              "@type": "Question",
              "name": "How to build a website for free?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can build a website for free using platforms like WordPress.com, Wix free plan, or GitHub Pages. However, free website builders have limitations. For professional results, consider our affordable website building services that provide custom domains, better performance, and full functionality."
              }
            },
            {
              "@type": "Question",
              "name": "How do I build a website from scratch?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "To build a website from scratch: 1) Learn HTML, CSS, and JavaScript, 2) Set up a development environment, 3) Code your website structure and design, 4) Add interactivity with JavaScript, 5) Deploy to a web server. Our expert developers can build your website from scratch or teach you how."
              }
            },
            {
              "@type": "Question",
              "name": "What is mobile app development?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Mobile app development is the process of creating software applications that run on mobile devices. Our mobile app developers specialize in iOS, Android, and cross-platform development using modern frameworks."
              }
            },
            {
              "@type": "Question",
              "name": "How much does it cost to develop a mobile app?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Mobile app development costs vary based on complexity, features, and platform. Our UK mobile app development services start from £5,000 for basic apps to £50,000+ for enterprise solutions. Contact us for a free quote."
              }
            },
            {
              "@type": "Question",
              "name": "How to develop mobile app?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Developing a mobile app involves: 1) Planning and design, 2) Choosing the right platform (iOS/Android), 3) Development using appropriate programming languages, 4) Testing, 5) Deployment to app stores. Our expert mobile app developers handle the entire process."
              }
            },
            {
              "@type": "Question",
              "name": "Is Python used for mobile app development?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, Python can be used for mobile app development through frameworks like Kivy and BeeWare. However, for optimal performance, we typically use Swift for iOS, Kotlin for Android, or React Native/Flutter for cross-platform mobile apps."
              }
            },
            {
              "@type": "Question",
              "name": "How to build a mobile app?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "To build a mobile app, you can either: 1) Learn mobile app development using platforms like Android Studio or Xcode, 2) Use no-code app builders for simple apps, or 3) Hire professional mobile app building companies like Softeefi. We guide you through the entire app building process from concept to deployment."
              }
            },
            {
              "@type": "Question",
              "name": "How do I build a mobile app for my business?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Build your own mobile app for business by: 1) Defining your app requirements and target audience, 2) Choosing between native or cross-platform development, 3) Working with mobile app building companies for professional development, 4) Testing thoroughly, 5) Launching on app stores. Our app building services handle everything for you."
              }
            },
            {
              "@type": "Question",
              "name": "Can I build mobile app from website?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, you can build a mobile app from your website using: 1) Progressive Web Apps (PWAs) that work like native apps, 2) Hybrid app frameworks that wrap your website, or 3) Native app development that connects to your website's backend. Our mobile app building services can convert your website into a fully functional mobile app."
              }
            },
            {
              "@type": "Question",
              "name": "Which companies build mobile apps?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Companies that build mobile apps include specialized mobile app building companies like Softeefi, digital agencies, and freelance developers. When choosing app building companies, consider their portfolio, expertise in your industry, development process, and post-launch support. We're among the top UK mobile app building companies."
              }
            },
            {
              "@type": "Question",
              "name": "How much does a mobile app cost to build?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The cost to build a mobile app ranges from £5,000 for simple apps to £100,000+ for complex enterprise solutions. Factors affecting mobile app building costs include: app complexity, number of platforms (iOS/Android), design requirements, backend development, and ongoing maintenance. Get a free quote for your app building project."
              }
            }
          ]
        }
      ]
    };
    
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
    
    // Cleanup function
    const cleanup = () => {
      document.title = 'Softeefi - Digital Solutions & Technology Services';
      if (metaDescription) {
        metaDescription.content = 'Professional web development, AI solutions, digital marketing, and cloud services to transform your business';
      }
    };
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Only add mouse tracking on desktop
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    // Ensure proper viewport for mobile
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove, isMobile]);

  // Auto-slideshow effect for portfolio cards (only for images, not videos)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => {
        const newIndices = {};
        portfolio.forEach(project => {
          if (project.featuredMedia && project.featuredMedia.length > 0) {
            // Filter only images for the slideshow
            const imageMedia = project.featuredMedia.filter(media => media.type === 'image');
            if (imageMedia.length > 0) {
              const currentIdx = prev[project.id] || 0;
              newIndices[project.id] = (currentIdx + 1) % imageMedia.length;
            }
          }
        });
        return newIndices;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Black Green Diamond theme colors
  const colors = {
    black: '#000000',
    darkBg: '#0a0a0a',
    primary: '#00ff7f',
    primaryLight: '#00ff7f',
    primaryDark: '#00cc64',
    diamond: '#b9f2ff',
    diamondLight: 'rgba(185, 242, 255, 0.1)',
    diamondDark: '#8ed9f0',
    silver: '#b9f2ff',
    silverLight: '#e0f7ff',
    silverDark: '#8ed9f0',
    tech: '#00ff7f',
    white: '#FFFFFF',
    gray: '#888888',
    lightGray: '#b9f2ff',
    nature: '#00ff7f',
    glow: '#b9f2ff',
    gold: '#b9f2ff',
    goldDark: '#8ed9f0',
    green: '#00ff7f',
    platinum: '#b9f2ff',
    platinumDark: '#8ed9f0',
    accent: '#b9f2ff'
  };

  // Service offerings with enhanced details
  const services = [
    {
      id: 1,
      icon: <FaCode />,
      title: "Professional Websites",
      description: "Professional websites that grow with your business",
      features: [
        "Responsive Design",
        "Lightning Fast",
        "SEO Optimized",
        "Analytics Integration"
      ],
      color: colors.primary,
      bgGradient: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.primaryDark}20 100%)`
    },
    {
      id: 2,
      icon: <FaShoppingCart />,
      title: "E-Commerce Platforms",
      description: "Advanced e-commerce solutions built with premium technology",
      features: [
        "Payment Gateways",
        "Inventory Management",
        "Customer Analytics",
        "Mobile Commerce"
      ],
      color: colors.diamond,
      bgGradient: `linear-gradient(135deg, ${colors.diamond}20 0%, ${colors.diamondDark}20 100%)`
    },
    {
      id: 3,
      icon: <BiCodeBlock />,
      title: "Web Applications",
      description: "Custom web applications tailored to your needs",
      features: [
        "Real-time Features",
        "API Integration",
        "Cloud Deployment",
        "Scalable Architecture"
      ],
      color: colors.primary,
      bgGradient: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.primaryDark}20 100%)`
    },
    {
      id: 4,
      icon: <FaMobile />,
      title: "Mobile App Development",
      description: "Expert mobile app developers UK creating iOS & Android applications",
      features: [
        "iOS & Android Development",
        "React Native & Flutter",
        "Push Notifications",
        "App Store Deployment"
      ],
      color: colors.diamond,
      bgGradient: `linear-gradient(135deg, ${colors.diamond}20 0%, ${colors.diamondDark}20 100%)`
    },
    {
      id: 5,
      icon: <MdSpeed />,
      title: "Speed, Security & Maintenance",
      description: "Keep your digital assets fast, secure, and always up-to-date with 24/7 monitoring",
      features: [
        "Performance Optimization",
        "Security Monitoring",
        "Regular Updates",
        "24/7 Support"
      ],
      color: colors.platinum,
      bgGradient: `linear-gradient(135deg, ${colors.platinum}20 0%, ${colors.primary}20 100%)`
    }
  ];

  // Portfolio projects
  const portfolio = [
    {
      id: 1,
      title: "Gadgets Xperts",
      category: "ecommerce",
      image: "/images/portfolio/gadgets-xperts/hero.webp",
      description: "Full-scale e-commerce platform with 4500+ products",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      color: colors.platinum,
      link: "https://danielrepairs.co.uk/",
      features: [
        "Mobile Responsive with stunning UI/UX animations",
        "Extremely fast cloud/VPS deployment",
        "Scalable architecture handling 4500+ products",
        "400+ phones, 4000+ repair services catalog",
        "Multiple payment gateways integration",
        "Complete admin panel with inventory management",
        "Realtime features and API integrations",
        "Advanced search functionality",
        "Email notification system",
        "Fully editable content management"
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe", "PayPal", "AWS S3", "CloudFlare", "REST API", "JWT Auth"],
      featuredMedia: [
        { type: 'image', url: '/images/portfolio/gadgets-xperts/hero.webp' }, // Home page
        { type: 'image', url: '/images/portfolio/gadgets-xperts/screenshot-13.webp' }, // Phone modal repairs
        { type: 'image', url: '/images/portfolio/gadgets-xperts/screenshot-14.webp' }, // Admin panel
        { type: 'image', url: '/images/portfolio/gadgets-xperts/screenshot-7.webp' }, // Payment page (main)
        { type: 'image', url: '/images/portfolio/gadgets-xperts/screenshot-15.webp' } // Admin analytics
      ],
      allMedia: [
        { type: 'image', url: '/images/portfolio/gadgets-xperts/hero.webp' },
        { type: 'image', url: '/images/portfolio/gadgets-xperts/screenshot-1.webp' },
        { type: 'image', url: '/images/portfolio/gadgets-xperts/screenshot-2.webp' },
        { type: 'image', url: '/images/portfolio/gadgets-xperts/screenshot-3.webp' },
        { type: 'image', url: '/images/portfolio/gadgets-xperts/screenshot-4.webp' },
        { type: 'image', url: '/images/portfolio/gadgets-xperts/screenshot-5.webp' },
        { type: 'image', url: '/images/portfolio/gadgets-xperts/screenshot-6.webp' },
        { type: 'image', url: '/images/portfolio/gadgets-xperts/screenshot-7.webp' },
        { type: 'image', url: '/images/portfolio/gadgets-xperts/screenshot-8.webp' },
        { type: 'image', url: '/images/portfolio/gadgets-xperts/screenshot-9.webp' },
        { type: 'image', url: '/images/portfolio/gadgets-xperts/screenshot-10.webp' },
        { type: 'image', url: '/images/portfolio/gadgets-xperts/screenshot-11.webp' },
        { type: 'image', url: '/images/portfolio/gadgets-xperts/screenshot-12.webp' },
        { type: 'image', url: '/images/portfolio/gadgets-xperts/screenshot-13.webp' },
        { type: 'image', url: '/images/portfolio/gadgets-xperts/screenshot-14.webp' },
        { type: 'image', url: '/images/portfolio/gadgets-xperts/screenshot-15.webp' }
      ]
    },
    {
      id: 2,
      title: "The TownHouse",
      category: "webapp",
      image: "/images/portfolio/townhouse/screenshot1.webp",
      description: "Luxury hotel booking platform with custom reservation management system",
      tech: ["WordPress", "PHP", "MySQL", "Avada", "Custom Plugin"],
      color: colors.gold,
      link: "https://thetownhouse.pk",
      features: [
        "Custom hotel reservation management plugin",
        "Advanced search & filtering by dates and capacity",
        "Room and service categorization system",
        "Seamless booking system integration",
        "Real-time availability tracking",
        "POS system with inventory management",
        "Customer loyalty program integration",
        "Multi-payment method support",
        "Detailed receipt generation with QR codes",
        "Admin dashboard for complete hotel management",
        "Typeform integration for user engagement",
        "Auth0 SSO with 30+ login providers"
      ],
      technologies: ["WordPress", "Avada Theme", "PHP", "MySQL", "Custom Plugin Development", "REST API", "Auth0", "Typeform API", "Payment Gateway", "QR Code Generation"],
      featuredMedia: [
        { type: 'image', url: '/images/portfolio/townhouse/screenshot1.webp' }, // Homepage with booking
        { type: 'image', url: '/images/portfolio/townhouse/screenshot10.webp' }, // Newsletter signup
        { type: 'image', url: '/images/portfolio/townhouse/screenshot7.webp' }, // Mobile view
        { type: 'image', url: '/images/portfolio/townhouse/screenshot13.webp' }, // Rooms section
        { type: 'image', url: '/images/portfolio/townhouse/wellness.webp' }, // Wellness page
        { type: 'video', url: '/images/portfolio/townhouse/demo.mp4', title: 'Platform Tour' } // Video as last item
      ],
      allMedia: [
        { type: 'image', url: '/images/portfolio/townhouse/screenshot1.webp' },
        { type: 'image', url: '/images/portfolio/townhouse/screenshot2.webp' },
        { type: 'image', url: '/images/portfolio/townhouse/screenshot3.webp' },
        { type: 'image', url: '/images/portfolio/townhouse/screenshot4.webp' },
        { type: 'image', url: '/images/portfolio/townhouse/screenshot5.webp' },
        { type: 'image', url: '/images/portfolio/townhouse/screenshot6.webp' },
        { type: 'image', url: '/images/portfolio/townhouse/screenshot7.webp' },
        { type: 'image', url: '/images/portfolio/townhouse/screenshot8.webp' },
        { type: 'image', url: '/images/portfolio/townhouse/screenshot9.webp' },
        { type: 'image', url: '/images/portfolio/townhouse/screenshot10.webp' },
        { type: 'image', url: '/images/portfolio/townhouse/screenshot11.webp' },
        { type: 'image', url: '/images/portfolio/townhouse/screenshot12.webp' },
        { type: 'image', url: '/images/portfolio/townhouse/screenshot13.webp' },
        { type: 'image', url: '/images/portfolio/townhouse/screenshot14.webp' },
        { type: 'image', url: '/images/portfolio/townhouse/screenshot15.webp' },
        { type: 'image', url: '/images/portfolio/townhouse/screenshot16.webp' },
        { type: 'image', url: '/images/portfolio/townhouse/screenshot17.webp' },
        { type: 'image', url: '/images/portfolio/townhouse/screenshot18.webp' },
        { type: 'image', url: '/images/portfolio/townhouse/screenshot19.webp' },
        { type: 'image', url: '/images/portfolio/townhouse/screenshot20.webp' },
        { type: 'image', url: '/images/portfolio/townhouse/wellness.webp' },
        { type: 'video', url: '/images/portfolio/townhouse/demo.mp4', title: 'Platform Tour' }
      ]
    },
    {
      id: 3,
      title: "Uzzi Platform",
      category: "webapp",
      image: "/images/portfolio/uzzi/hero.webp",
      description: "Premium booking & service management platform with real-time features",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "WebSocket", "AWS"],
      color: colors.primary,
      link: "https://www.uzziclips.vip/",
      features: [
        "Mobile responsive with stunning UI/UX animations",
        "Extremely fast cloud/VPS deployed lightning fast",
        "Scalable architecture for high-volume operations",
        "Advanced booking & appointment system",
        "Integrated payment processing with Stripe",
        "Email & SMS notification system",
        "Real-time features with WebSocket",
        "Third-party API integrations",
        "Dashboard analytics & reporting",
        "Multi-language support"
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Socket.io", "AWS EC2", "Twilio", "SendGrid", "REST API", "JWT Auth", "Redis"],
      featuredMedia: [
        { type: 'image', url: '/images/portfolio/uzzi/hero.webp' }, // Landing page
        { type: 'image', url: '/images/portfolio/uzzi/screenshot-2.webp' }, // Service listing
        { type: 'image', url: '/images/portfolio/uzzi/screenshot-3.webp' }, // Booking interface
        { type: 'image', url: '/images/portfolio/uzzi/screenshot-4.webp' }, // Dashboard
        { type: 'image', url: '/images/portfolio/uzzi/screenshot-5.webp' }, // Payment flow
        { type: 'video', url: '/images/portfolio/uzzi/demo-video.mp4', title: 'Platform Demo' } // Video as last item
      ],
      allMedia: [
        { type: 'image', url: '/images/portfolio/uzzi/hero.webp' },
        { type: 'image', url: '/images/portfolio/uzzi/screenshot-1.webp' },
        { type: 'image', url: '/images/portfolio/uzzi/screenshot-2.webp' },
        { type: 'image', url: '/images/portfolio/uzzi/screenshot-3.webp' },
        { type: 'image', url: '/images/portfolio/uzzi/screenshot-4.webp' },
        { type: 'image', url: '/images/portfolio/uzzi/screenshot-5.webp' },
        { type: 'image', url: '/images/portfolio/uzzi/screenshot-6.webp' },
        { type: 'image', url: '/images/portfolio/uzzi/screenshot-7.webp' },
        { type: 'image', url: '/images/portfolio/uzzi/screenshot-8.webp' },
        { type: 'image', url: '/images/portfolio/uzzi/screenshot-9.webp' },
        { type: 'image', url: '/images/portfolio/uzzi/screenshot-10.webp' },
        { type: 'video', url: '/images/portfolio/uzzi/demo-video.mp4', title: 'Platform Demo' }
      ]
    },
    {
      id: 4,
      title: "MX Online",
      category: "ecommerce",
      image: "/images/portfolio/mxonline/screenshot1.webp",
      description: "Premium motocross gear e-commerce platform with extensive catalog management",
      tech: ["React", "WooCommerce", "PHP", "MySQL", "WordPress"],
      color: colors.platinum,
      link: "https://mxonline.shop",
      features: [
        "1000+ products catalog with advanced filtering",
        "Multi-brand management system (17+ brands)",
        "Real-time stock tracking and inventory management",
        "Size and color variant management system",
        "Social login integration (Facebook & Google)",
        "Advanced product categorization and search",
        "Customer wishlist and order tracking",
        "Mobile-optimized shopping experience",
        "Multi-currency support (AED/USD)",
        "Admin panel with bulk operations"
      ],
      technologies: ["React", "WordPress", "WooCommerce", "PHP", "MySQL", "REST API", "Payment Gateway", "Social Auth", "CDN", "SSL"],
      featuredMedia: [
        { type: 'image', url: '/images/portfolio/mxonline/screenshot1.webp' }, // Homepage hero
        { type: 'image', url: '/images/portfolio/mxonline/screenshot2.webp' }, // Featured products
        { type: 'image', url: '/images/portfolio/mxonline/screenshot5.webp' }, // Product catalog
        { type: 'image', url: '/images/portfolio/mxonline/screenshot4.webp' }, // Brands page
        { type: 'image', url: '/images/portfolio/mxonline/screenshot10.webp' }, // Admin products
        { type: 'video', url: '/images/portfolio/mxonline/demo.mp4', title: 'Platform Demo' } // Video as last item
      ],
      allMedia: [
        { type: 'image', url: '/images/portfolio/mxonline/screenshot1.webp' },
        { type: 'image', url: '/images/portfolio/mxonline/screenshot2.webp' },
        { type: 'image', url: '/images/portfolio/mxonline/screenshot3.webp' },
        { type: 'image', url: '/images/portfolio/mxonline/screenshot4.webp' },
        { type: 'image', url: '/images/portfolio/mxonline/screenshot5.webp' },
        { type: 'image', url: '/images/portfolio/mxonline/screenshot6.webp' },
        { type: 'image', url: '/images/portfolio/mxonline/screenshot7.webp' },
        { type: 'image', url: '/images/portfolio/mxonline/screenshot8.webp' },
        { type: 'image', url: '/images/portfolio/mxonline/screenshot9.webp' },
        { type: 'image', url: '/images/portfolio/mxonline/screenshot10.webp' },
        { type: 'image', url: '/images/portfolio/mxonline/screenshot11.webp' },
        { type: 'image', url: '/images/portfolio/mxonline/screenshot12.webp' },
        { type: 'video', url: '/images/portfolio/mxonline/demo.mp4', title: 'Platform Demo' }
      ]
    },
    {
      id: 5,
      title: "Mobile Care",
      category: "ecommerce",
      image: "/images/portfolio/mobilecare/hero.webp",
      description: "Enterprise e-commerce platform with 4000+ repair services and 350+ devices",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "AWS", "API Integration"],
      color: colors.primary,
      link: "https://mobilecare.org.uk/",
      features: [
        "Mobile responsive with stunning UI/UX animations",
        "Extremely fast cloud/VPS deployed lightning fast",
        "Scalable architecture supporting 10,000+ products",
        "4000+ repair products, 350+ phones, 3800+ repairs",
        "Multiple payment gateways (Stripe, Apple/Google Pay)",
        "Complete editable admin panel with analytics",
        "Advanced inventory management system",
        "Real-time features and API integrations",
        "Intelligent search functionality",
        "Email notification system"
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Apple Pay", "Google Pay", "AWS", "CloudFlare", "REST API", "JWT Auth", "Analytics"],
      featuredMedia: [
        { type: 'image', url: '/images/portfolio/mobilecare/hero.webp' }, // Homepage
        { type: 'image', url: '/images/portfolio/mobilecare/screenshot-15.webp' }, // Payment page
        { type: 'image', url: '/images/portfolio/mobilecare/admin-dashboard.webp' }, // Admin Dashboard
        { type: 'image', url: '/images/portfolio/mobilecare/admin-devices.webp' }, // Admin Device Management
        { type: 'image', url: '/images/portfolio/mobilecare/screenshot-7.webp' } // Repair selection
      ],
      allMedia: [
        { type: 'image', url: '/images/portfolio/mobilecare/hero.webp' },
        { type: 'image', url: '/images/portfolio/mobilecare/screenshot-2.webp' },
        { type: 'image', url: '/images/portfolio/mobilecare/screenshot-3.webp' },
        { type: 'image', url: '/images/portfolio/mobilecare/screenshot-4.webp' },
        { type: 'image', url: '/images/portfolio/mobilecare/screenshot-5.webp' },
        { type: 'image', url: '/images/portfolio/mobilecare/screenshot-6.webp' },
        { type: 'image', url: '/images/portfolio/mobilecare/screenshot-7.webp' },
        { type: 'image', url: '/images/portfolio/mobilecare/screenshot-8.webp' },
        { type: 'image', url: '/images/portfolio/mobilecare/screenshot-9.webp' },
        { type: 'image', url: '/images/portfolio/mobilecare/screenshot-10.webp' },
        { type: 'image', url: '/images/portfolio/mobilecare/screenshot-11.webp' },
        { type: 'image', url: '/images/portfolio/mobilecare/screenshot-12.webp' },
        { type: 'image', url: '/images/portfolio/mobilecare/screenshot-13.webp' },
        { type: 'image', url: '/images/portfolio/mobilecare/screenshot-14.webp' },
        { type: 'image', url: '/images/portfolio/mobilecare/screenshot-15.webp' },
        { type: 'image', url: '/images/portfolio/mobilecare/admin-dashboard.webp' },
        { type: 'image', url: '/images/portfolio/mobilecare/screenshot-17.webp' },
        { type: 'image', url: '/images/portfolio/mobilecare/admin-devices.webp' },
        { type: 'image', url: '/images/portfolio/mobilecare/screenshot-19.webp' },
        { type: 'image', url: '/images/portfolio/mobilecare/screenshot-20.webp' },
        { type: 'image', url: '/images/portfolio/mobilecare/screenshot-21.webp' }
      ]
    },
    {
      id: 6,
      title: "EDS Platform",
      category: "website",
      image: "/images/portfolio/eds/hero.webp",
      description: "High-performance SEO-optimized business website with lightning-fast deployment",
      tech: ["React", "Next.js", "Node.js", "SEO", "AWS", "CloudFlare"],
      color: colors.diamond,
      link: "https://www.edstraditionalbarbers.co.uk/",
      features: [
        "Mobile responsive with stunning UI/UX animations",
        "Extremely fast cloud/VPS deployed lightning fast",
        "Scalable architecture for business growth",
        "Advanced SEO optimization for maximum visibility",
        "Google PageSpeed score 95+",
        "Core Web Vitals optimized",
        "Schema markup and structured data",
        "Progressive Web App (PWA) capabilities",
        "CDN-powered content delivery",
        "Automated sitemap generation"
      ],
      technologies: ["React", "Next.js", "Node.js", "Tailwind CSS", "AWS CloudFront", "Vercel", "SEO Tools", "Google Analytics", "Schema.org", "OpenGraph"],
      featuredMedia: [
        { type: 'image', url: '/images/portfolio/eds/hero.webp' }, // Homepage
        { type: 'image', url: '/images/portfolio/eds/screenshot-2.webp' }, // Services section
        { type: 'image', url: '/images/portfolio/eds/screenshot-3.webp' }, // About section
        { type: 'image', url: '/images/portfolio/eds/screenshot-4.webp' }, // Features
        { type: 'image', url: '/images/portfolio/eds/screenshot-5.webp' }, // Contact
        { type: 'video', url: '/images/portfolio/eds/website-tour.mp4', title: 'Website Tour' } // Video as last item
      ],
      allMedia: [
        { type: 'image', url: '/images/portfolio/eds/hero.webp' },
        { type: 'image', url: '/images/portfolio/eds/screenshot-1.webp' },
        { type: 'image', url: '/images/portfolio/eds/screenshot-2.webp' },
        { type: 'image', url: '/images/portfolio/eds/screenshot-3.webp' },
        { type: 'image', url: '/images/portfolio/eds/screenshot-4.webp' },
        { type: 'image', url: '/images/portfolio/eds/screenshot-5.webp' },
        { type: 'image', url: '/images/portfolio/eds/screenshot-6.webp' },
        { type: 'video', url: '/images/portfolio/eds/website-tour.mp4', title: 'Website Tour' }
      ]
    },
    {
      id: 7,
      title: "Fun Factory",
      category: "webapp",
      image: "/images/portfolio/funfactory/screenshot1.webp",
      description: "Ultimate amusement park platform with booking and attractions management",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "Maps API"],
      color: colors.primary,
      link: "https://funfactorypark.com",
      features: [
        "Interactive attractions showcase with 3D visuals",
        "Online ticket booking and reservation system",
        "Event management and party planning features",
        "Real-time availability and capacity tracking",
        "Mobile-responsive with vibrant animations",
        "Multi-language support for international visitors",
        "Customer reviews and ratings system",
        "Virtual tour and 360° attraction views",
        "Integrated payment gateway with multiple options",
        "Admin dashboard for park management"
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API", "Google Maps", "Framer Motion", "Socket.io", "JWT Auth", "Cloudinary"],
      featuredMedia: [
        { type: 'image', url: '/images/portfolio/funfactory/screenshot1.webp' }, // Homepage hero
        { type: 'image', url: '/images/portfolio/funfactory/screenshot2.webp' }, // Attractions
        { type: 'image', url: '/images/portfolio/funfactory/screenshot9.webp' }, // Mobile view
        { type: 'image', url: '/images/portfolio/funfactory/screenshot11.webp' }, // Gallery
        { type: 'image', url: '/images/portfolio/funfactory/screenshot18.webp' }, // Full attractions page
        { type: 'video', url: '/images/portfolio/funfactory/demo.mp4', title: 'Platform Tour' } // Video as last item
      ],
      allMedia: [
        { type: 'image', url: '/images/portfolio/funfactory/screenshot1.webp' },
        { type: 'image', url: '/images/portfolio/funfactory/screenshot2.webp' },
        { type: 'image', url: '/images/portfolio/funfactory/screenshot3.webp' },
        { type: 'image', url: '/images/portfolio/funfactory/screenshot4.webp' },
        { type: 'image', url: '/images/portfolio/funfactory/screenshot5.webp' },
        { type: 'image', url: '/images/portfolio/funfactory/screenshot6.webp' },
        { type: 'image', url: '/images/portfolio/funfactory/screenshot7.webp' },
        { type: 'image', url: '/images/portfolio/funfactory/screenshot8.webp' },
        { type: 'image', url: '/images/portfolio/funfactory/screenshot9.webp' },
        { type: 'image', url: '/images/portfolio/funfactory/screenshot10.webp' },
        { type: 'image', url: '/images/portfolio/funfactory/screenshot11.webp' },
        { type: 'image', url: '/images/portfolio/funfactory/screenshot12.webp' },
        { type: 'image', url: '/images/portfolio/funfactory/screenshot13.webp' },
        { type: 'image', url: '/images/portfolio/funfactory/screenshot14.webp' },
        { type: 'image', url: '/images/portfolio/funfactory/screenshot15.webp' },
        { type: 'image', url: '/images/portfolio/funfactory/screenshot16.webp' },
        { type: 'image', url: '/images/portfolio/funfactory/screenshot17.webp' },
        { type: 'image', url: '/images/portfolio/funfactory/screenshot18.webp' },
        { type: 'video', url: '/images/portfolio/funfactory/demo.mp4', title: 'Platform Tour' }
      ]
    }
  ];

  // Process steps with animations
  const processSteps = [
    {
      number: "01",
      title: "Discovery & Strategy",
      description: "Deep dive into your business goals and target audience",
      icon: <HiOutlineSparkles />,
      details: ["User Research", "Competitor Analysis", "Technical Planning"]
    },
    {
      number: "02",
      title: "Design & Prototype",
      description: "Creating stunning UI/UX that reflects your brand",
      icon: <FaPalette />,
      details: ["Wireframing", "Visual Design", "Interactive Prototypes"]
    },
    {
      number: "03",
      title: "Development",
      description: "Building with clean, scalable, and modern code",
      icon: <FaCode />,
      details: ["Frontend Development", "Backend Integration", "Testing"]
    },
    {
      number: "04",
      title: "Launch & Growth",
      description: "Deploying your solution and ensuring its success",
      icon: <FaRocket />,
      details: ["Deployment", "Performance Optimization", "Ongoing Support"]
    }
  ];

  // Tech stack with categories
  const techStack = {
    "Frontend": ["React", "Next.js", "Vue.js", "Angular", "TypeScript"],
    "Backend": ["Node.js", "Python", "PHP", "Ruby on Rails", ".NET"],
    "Mobile": ["React Native", "Flutter", "Swift", "Kotlin"],
    "Database": ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
    "Cloud": ["AWS", "Azure", "Google Cloud", "Vercel", "Netlify"]
  };

  // Filter portfolio
  const filteredPortfolio = activeFilter === 'all' 
    ? portfolio 
    : portfolio.filter(project => project.category === activeFilter);

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.black,
      color: colors.white,
      overflow: 'hidden',
      marginTop: isMobile ? '-70px' : '-90px',
      WebkitOverflowScrolling: 'touch',
      touchAction: 'pan-y'
    }}>
      {/* Hero Section with Parallax */}
      <motion.section 
        ref={heroRef}
        style={{
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          opacity: heroOpacity,
          paddingTop: isMobile ? '70px' : '90px'
        }}
      >
        {/* Animated Background */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            scale: heroScale
          }}
        >
          {/* Grid Pattern */}
          <motion.div 
            animate={{
              backgroundPosition: ['0px 0px', '50px 50px']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(${colors.primary}15 1px, transparent 1px),
                linear-gradient(90deg, ${colors.primary}15 1px, transparent 1px),
                radial-gradient(circle at 30% 40%, ${colors.tech}10 0%, transparent 40%)
              `,
              backgroundSize: '50px 50px',
              opacity: 0.5
            }} 
          />
          
          {/* Floating Particles - Reduced for mobile */}
          {[...Array(isMobile ? 10 : 20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: typeof window !== 'undefined' ? window.innerHeight + 100 : 800
              }}
              animate={{
                y: -100,
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10
              }}
              style={{
                position: 'absolute',
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                borderRadius: '50%',
                background: i % 3 === 0 ? colors.tech : i % 3 === 1 ? colors.primary : colors.diamond,
                opacity: Math.random() * 0.6 + 0.2,
                filter: 'blur(1px)',
                boxShadow: i % 2 === 0 ? `0 0 ${Math.random() * 10 + 5}px ${colors.tech}` : 'none',
                pointerEvents: 'none'
              }}
            />
          ))}
          
          {/* Gradient Orbs */}
          <motion.div
            animate={{
              x: [0, 150, 0],
              y: [0, -150, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: isMobile ? '200px' : '400px',
              height: isMobile ? '200px' : '400px',
              background: `radial-gradient(circle, ${colors.platinum}40 0%, ${colors.gold}20 50%, transparent 70%)`,
              filter: 'blur(40px)'
            }}
          />
          
          <motion.div
            animate={{
              x: [0, -150, 0],
              y: [0, 150, 0],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              bottom: '10%',
              right: '10%',
              width: isMobile ? '250px' : '500px',
              height: isMobile ? '250px' : '500px',
              background: `radial-gradient(circle, ${colors.accent}40 0%, ${colors.platinum}20 50%, transparent 70%)`,
              filter: 'blur(40px)'
            }}
          />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: 'center',
            padding: isMobile ? '1rem' : '3rem',
            maxWidth: '1000px',
            position: 'relative',
            zIndex: 1
          }}
        >

          <motion.h1
            style={{
              fontSize: isMobile ? 'clamp(2rem, 8vw, 2.5rem)' : '5rem',
              fontWeight: '900',
              marginBottom: '1.5rem',
              lineHeight: 1.1,
              position: 'relative'
            }}
          >
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <span style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle, ${colors.diamond}40 0%, transparent 70%)`,
                filter: 'blur(20px)',
                zIndex: -1
              }} />
              <span style={{
                background: `linear-gradient(90deg, ${colors.white} 0%, ${colors.diamond} 25%, ${colors.primary} 50%, ${colors.diamond} 75%, ${colors.white} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'brightness(1.5)',
                position: 'relative'
              }}>
                Platinum Standard
              </span>
            </div>
            <br />
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <span style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle, ${colors.primary}30 0%, transparent 70%)`,
                filter: 'blur(15px)',
                zIndex: -1
              }} />
              <span style={{
                fontSize: isMobile ? 'clamp(1.5rem, 6vw, 1.8rem)' : '3.5rem',
                fontWeight: '700',
                background: `linear-gradient(90deg, ${colors.diamond} 0%, ${colors.primary} 35%, ${colors.diamond} 65%, ${colors.primary} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'brightness(1.4)',
                position: 'relative',
                display: 'block'
              }}>
                Websites & Apps
              </span>
            </div>
          </motion.h1>

          <motion.p
            style={{
              fontSize: isMobile ? 'clamp(0.95rem, 3vw, 1.1rem)' : '1.4rem',
              color: colors.white,
              marginBottom: '3rem',
              lineHeight: 1.6,
              maxWidth: '700px',
              margin: '0 auto 3rem',
              opacity: 0.9
            }}
          >
            From startups to growing businesses, we create high-performance websites and applications that 
            fit your budget and deliver real results. No project too small, no ambition too big.
          </motion.p>

          <motion.div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '0.75rem' : '1.5rem',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <motion.div
              whileHover={{ scale: isMobile ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                width: isMobile ? '100%' : 'auto',
                padding: isMobile ? '0 1rem' : '0'
              }}
            >
              <Link
                to="/contact"
                style={{
                  padding: isMobile ? '0.9rem 1.5rem' : '1.2rem 3rem',
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 33%, ${colors.diamond} 66%, ${colors.tech} 100%)`,
                  color: colors.black,
                  textDecoration: 'none',
                  borderRadius: '50px',
                  fontWeight: '800',
                  fontSize: '1.1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease',
                  boxShadow: `0 10px 30px ${colors.primary}40, inset 0 1px 2px ${colors.diamond}50`,
                  border: `2px solid ${colors.primary}`,
                  position: 'relative',
                  overflow: 'hidden',
                  WebkitTapHighlightColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.background = `linear-gradient(135deg, ${colors.tech} 0%, ${colors.primary} 33%, ${colors.diamond} 66%, ${colors.primaryLight} 100%)`;
                  e.currentTarget.style.boxShadow = `0 15px 40px ${colors.tech}50, inset 0 1px 2px ${colors.silver}50`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${colors.platinum} 0%, ${colors.platinumDark} 50%, ${colors.gold} 100%)`;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 10px 30px ${colors.platinum}30, inset 0 1px 0 ${colors.white}50`;
                }}
              >
                <FaRocket style={{ fontSize: '1.2rem' }} />
                Start Your Project
                <HiArrowRight />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: isMobile ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                width: isMobile ? '100%' : 'auto',
                padding: isMobile ? '0 1rem' : '0'
              }}
            >
              <Link
                to="/free-reports/websites-and-apps"
                style={{
                  padding: isMobile ? '0.9rem 1.5rem' : '1.2rem 3rem',
                  background: `linear-gradient(135deg, ${colors.diamond}20 0%, ${colors.primary}20 100%)`,
                  color: colors.diamond,
                  textDecoration: 'none',
                  borderRadius: '50px',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  border: `2px solid ${colors.diamond}`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease',
                  backdropFilter: isMobile ? 'none' : 'blur(10px)',
                  WebkitBackdropFilter: isMobile ? 'none' : 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${colors.accent}20 0%, ${colors.platinum}30 100%)`;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = colors.platinum;
                  e.currentTarget.style.color = colors.platinum;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, transparent 0%, ${colors.accent}10 100%)`;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = colors.accent;
                  e.currentTarget.style.color = colors.accent;
                }}
              >
                <HiOutlineSparkles />
                Free Website Audit
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: isMobile ? '1rem' : '2rem',
              marginTop: isMobile ? '2rem' : '4rem',
              padding: isMobile ? '1rem' : '2rem',
              background: `${colors.darkBg}80`,
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${colors.gold}20`
            }}
          >
            {[
              { number: "100+", label: "Projects Completed", icon: <FaTrophy />, color: colors.platinum },
              { number: "99.9%", label: "Client Satisfaction", icon: <FaStar />, color: colors.gold },
              { number: "24/7", label: "Dedicated Support", icon: <MdVerified />, color: colors.accent }
            ].map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{ color: stat.color || colors.gold, fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontSize: isMobile ? 'clamp(1.5rem, 5vw, 2rem)' : '2.5rem',
                  fontWeight: '900',
                  color: colors.gold
                }}>
                  {stat.number}
                </div>
                <div style={{ color: colors.gray, fontSize: '0.9rem' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Quality Certification Section */}
      <section style={{
        padding: isMobile ? '1.5rem 1rem' : '3rem 2rem',
        background: `linear-gradient(135deg, ${colors.darkBg} 0%, ${colors.black} 100%)`,
        borderTop: `1px solid ${colors.gold}30`,
        borderBottom: `1px solid ${colors.gold}30`
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{
                width: isMobile ? '50px' : '60px',
                height: isMobile ? '50px' : '60px',
                background: `linear-gradient(135deg, ${colors.platinum} 0%, ${colors.gold} 50%, ${colors.platinum} 100%)`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 20px ${colors.gold}30`
              }}
            >
              <HiOutlineSparkles style={{ fontSize: '2rem', color: colors.black }} />
            </motion.div>
            <h3 style={{
              fontSize: isMobile ? 'clamp(1.1rem, 4vw, 1.3rem)' : '2rem',
              fontWeight: '800',
              color: colors.gold
            }}>
              The Quality Difference
            </h3>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: isMobile ? '0.75rem' : '2rem',
            marginTop: '2rem'
          }}>
            {[
              { icon: <FaTrophy />, title: 'Top Quality', desc: 'Every pixel perfected' },
              { icon: <FaBolt />, title: 'Lightning Fast', desc: 'Optimized performance' },
              { icon: <MdSecurity />, title: 'Fort Knox Security', desc: 'Bank-grade protection' },
              { icon: <FaGem />, title: 'Exceptional Service', desc: 'Professional support' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  background: `linear-gradient(135deg, ${colors.gold}30 0%, ${colors.green}30 100%)`
                }}
                style={{
                  padding: '1.5rem',
                  background: `${colors.darkBg}80`,
                  borderRadius: '15px',
                  border: `1px solid ${colors.gold}20`,
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '0.5rem', color: colors.gold }}>
                  {item.icon}
                </div>
                <h4 style={{
                  fontSize: isMobile ? 'clamp(0.85rem, 2.5vw, 0.95rem)' : '1.1rem',
                  fontWeight: '700',
                  color: colors.gold,
                  marginBottom: '0.5rem'
                }}>
                  {item.title}
                </h4>
                <p style={{
                  fontSize: isMobile ? 'clamp(0.75rem, 2vw, 0.85rem)' : '0.9rem',
                  color: colors.gray
                }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section style={{
        padding: isMobile ? '2rem 1rem' : '5rem 2rem',
        background: colors.darkBg
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}
        >
          <h2 style={{
            fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.2rem)' : '3.5rem',
            fontWeight: '800',
            marginBottom: '1rem',
            color: colors.gold
          }}>
            Our Services
          </h2>
          <p style={{
            fontSize: isMobile ? '1rem' : '1.2rem',
            color: colors.lightGray,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Custom digital solutions for businesses of all sizes
          </p>
        </motion.div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '2rem'
        }}>
          {services.map((service, index) => (
            <motion.div
              key={`service-${service.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => !isMobile && setHoveredCard(service.id)}
              onMouseLeave={() => !isMobile && setHoveredCard(null)}
              onTouchStart={() => isMobile && setHoveredCard(service.id)}
              onTouchEnd={() => isMobile && setHoveredCard(null)}
              style={{
                background: hoveredCard === service.id ? `linear-gradient(135deg, ${colors.platinum}20 0%, ${colors.accent}20 100%)` : `linear-gradient(135deg, ${colors.darkBg} 0%, ${colors.black} 100%)`,
                padding: isMobile ? '2rem' : '2.5rem',
                borderRadius: '20px',
                border: `2px solid ${hoveredCard === service.id ? service.color : `${colors.platinum}30`}`,
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Glow Effect */}
              <motion.div
                animate={{
                  opacity: hoveredCard === service.id ? 1 : 0
                }}
                style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: `radial-gradient(circle, ${service.color}20 0%, transparent 70%)`,
                  pointerEvents: 'none'
                }}
              />

              <div style={{
                fontSize: isMobile ? '2rem' : '3rem',
                color: service.color,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '0.5rem' : '1rem',
                flexWrap: 'wrap'
              }}>
                {service.icon}
                <motion.div
                  animate={{
                    rotate: hoveredCard === service.id ? 360 : 0
                  }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: isMobile ? '40px' : '50px',
                    height: isMobile ? '40px' : '50px',
                    background: `${service.color}20`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <HiOutlineSparkles style={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
                </motion.div>
              </div>

              <h3 style={{
                fontSize: isMobile ? '1.4rem' : '1.8rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: colors.white
              }}>
                {service.title}
              </h3>

              <p style={{
                color: colors.lightGray,
                marginBottom: '2rem',
                lineHeight: 1.6,
                fontSize: isMobile ? '0.9rem' : '1rem'
              }}>
                {service.description}
              </p>

              <ul style={{
                listStyle: 'none',
                padding: 0
              }}>
                {service.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    style={{
                      padding: '0.75rem 0',
                      color: colors.gray,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                  >
                    <HiCheckCircle style={{ 
                      color: service.color, 
                      fontSize: isMobile ? '1rem' : '1.2rem',
                      flexShrink: 0
                    }} />
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <motion.div
                style={{
                  marginTop: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: service.color,
                  fontWeight: '600'
                }}
                whileHover={{ x: 5 }}
              >
                Learn More <HiArrowRight />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Portfolio Section */}
      <section 
        id="portfolio-section"
        style={{
        padding: isMobile ? '3rem 1rem' : '5rem 2rem',
        background: colors.black
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}
        >
          <h2 style={{
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            fontWeight: '800',
            marginBottom: '1rem',
            color: colors.gold
          }}>
            Portfolio Showcase
          </h2>
          <p style={{
            fontSize: isMobile ? '1rem' : '1.2rem',
            color: colors.lightGray,
            maxWidth: '600px',
            margin: '0 auto 3rem'
          }}>
            Check out our recent projects across different industries and budgets
          </p>

          {/* Filter Buttons */}
          <div style={{
            display: 'flex',
            gap: isMobile ? '0.5rem' : '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: isMobile ? '0 1rem' : '0'
          }}>
            {['all', 'website', 'webapp', 'mobile', 'ecommerce'].map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ 
                  scale: 1.05,
                  background: `linear-gradient(135deg, ${colors.gold}30 0%, ${colors.green}30 100%)`
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: isMobile ? '0.6rem 1.2rem' : '0.75rem 2rem',
                  background: activeFilter === filter 
                    ? `linear-gradient(135deg, ${colors.platinum} 0%, ${colors.gold} 50%, ${colors.accent} 100%)`
                    : `linear-gradient(135deg, transparent 0%, ${colors.platinum}10 100%)`,
                  color: activeFilter === filter ? colors.black : colors.platinum,
                  border: `2px solid ${activeFilter === filter ? colors.platinum : colors.platinum + '50'}`,
                  backdropFilter: 'blur(10px)',
                  borderRadius: '30px',
                  fontWeight: '600',
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: isMobile ? '0.9rem' : '1rem'
                }}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </motion.div>

          {/* Portfolio Grid */}
        <motion.div
          layout
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? '1.5rem' : '2rem',
            padding: isMobile ? '0 1rem' : '0'
          }}
        >
          <AnimatePresence>
            {filteredPortfolio.map((project, index) => (
              <motion.div
                key={`portfolio-${project.id}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(project)}
                style={{
                  background: colors.darkBg,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: `2px solid ${colors.platinum}30`,
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{
                  y: -10,
                  borderColor: colors.platinum,
                  boxShadow: `0 25px 50px ${colors.platinum}40, inset 0 1px 0 ${colors.white}10`,
                  background: `linear-gradient(135deg, ${colors.platinum}15 0%, ${colors.accent}15 100%)`
                }}
              >
                {/* Project Image with Slideshow */}
                <div style={{
                  height: isMobile ? '200px' : '250px',
                  background: `linear-gradient(135deg, ${project.color}40 0%, ${colors.black} 100%)`,
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {project.featuredMedia && project.featuredMedia.length > 0 ? (
                    (() => {
                      // Filter only images for display
                      const imageMedia = project.featuredMedia.filter(media => media.type === 'image');
                      const currentIdx = currentImageIndex[project.id] || 0;
                      const currentImage = imageMedia[currentIdx];
                      
                      return imageMedia.length > 0 ? (
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={`${project.id}-img-${currentIdx}`}
                            src={currentImage?.url || project.image}
                            alt={project.title}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.1 }}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              position: 'absolute',
                              top: 0,
                              left: 0
                            }}
                            onError={(e) => {
                              console.error(`Failed to load image: ${e.target.src}`);
                              e.target.src = project.image; // Fallback to main image
                            }}
                          />
                        </AnimatePresence>
                      ) : (
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          whileHover={{ scale: 1.1 }}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0
                          }}
                        />
                      );
                    })()
                  
                  ) : project.image ? (
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      whileHover={{ scale: 1.1 }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '4rem',
                        color: project.color
                      }}
                    >
                      <FaCode />
                    </motion.div>
                  )}
                  
                  {/* Slideshow Indicators */}
                  {(() => {
                    const imageMedia = project.featuredMedia?.filter(media => media.type === 'image') || [];
                    return imageMedia.length > 1 && (
                      <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '5px',
                        zIndex: 2
                      }}>
                        {imageMedia.map((_, idx) => (
                          <div
                            key={idx}
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: (currentImageIndex[project.id] || 0) === idx ? '#00ff7f' : 'rgba(255, 255, 255, 0.5)',
                              transition: 'background 0.3s ease'
                            }}
                          />
                        ))}
                      </div>
                    );
                  })()}
                </div>

                {/* Project Info */}
                <div style={{ padding: isMobile ? '1.5rem' : '2rem' }}>
                  <h3 style={{
                    fontSize: isMobile ? '1.2rem' : '1.5rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    color: colors.white
                  }}>
                    {project.title}
                  </h3>

                  <p style={{
                    color: colors.gray,
                    marginBottom: '1.5rem',
                    lineHeight: 1.5
                  }}>
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div style={{
                    display: 'flex',
                    gap: isMobile ? '0.4rem' : '0.5rem',
                    flexWrap: 'wrap'
                  }}>
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: isMobile ? '0.25rem 0.6rem' : '0.3rem 0.8rem',
                          background: `${project.color}20`,
                          border: `1px solid ${project.color}40`,
                          borderRadius: '15px',
                          fontSize: isMobile ? '0.75rem' : '0.8rem',
                          color: project.color
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Process Section */}
      <section style={{
        padding: isMobile ? '2rem 1rem' : '5rem 2rem',
        background: colors.darkBg,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background: `radial-gradient(circle, ${colors.gold}10 0%, transparent 70%)`,
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }} />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: '4rem',
            position: 'relative',
            zIndex: 1
          }}
        >
          <h2 style={{
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            fontWeight: '800',
            marginBottom: '1rem',
            color: colors.gold
          }}>
            Our Proven Process
          </h2>
          <p style={{
            fontSize: isMobile ? '1rem' : '1.2rem',
            color: colors.lightGray,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Our simple 4-step process ensures successful project delivery
          </p>
        </motion.div>

        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: isMobile ? '2rem' : '3rem',
                marginBottom: index < processSteps.length - 1 ? (isMobile ? '3rem' : '4rem') : 0,
                alignItems: 'center'
              }}
            >
              {/* Content */}
              <div style={{
                order: isMobile ? 1 : index % 2 === 0 ? 1 : 2
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    fontSize: '3rem',
                    fontWeight: '900',
                    color: colors.gold
                  }}>
                    {step.number}
                  </span>
                  <div style={{
                    fontSize: '2rem',
                    color: colors.gold
                  }}>
                    {step.icon}
                  </div>
                </div>

                <h3 style={{
                  fontSize: isMobile ? '1.4rem' : '1.8rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: colors.white
                }}>
                  {step.title}
                </h3>

                <p style={{
                  color: colors.lightGray,
                  marginBottom: '1.5rem',
                  lineHeight: 1.6
                }}>
                  {step.description}
                </p>

                <ul style={{
                  listStyle: 'none',
                  padding: 0
                }}>
                  {step.details.map((detail, idx) => (
                    <li
                      key={idx}
                      style={{
                        padding: '0.5rem 0',
                        color: colors.gray,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <HiCheckCircle style={{ color: colors.green }} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual Element */}
              <motion.div
                style={{
                  order: isMobile ? 2 : index % 2 === 0 ? 2 : 1,
                  height: isMobile ? '150px' : '300px',
                  background: `linear-gradient(135deg, ${index % 2 === 0 ? colors.platinum : colors.accent}25 0%, ${colors.darkBg} 100%)`,
                  backdropFilter: 'blur(20px)',
                  border: `2px solid ${index % 2 === 0 ? colors.platinum : colors.accent}30`,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                whileHover={{ 
                  scale: 1.05,
                  background: `linear-gradient(135deg, ${colors.gold}30 0%, ${colors.green}30 100%)`
                }}
              >
                <motion.div
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    position: 'absolute',
                    width: isMobile ? '150px' : '200px',
                    height: isMobile ? '150px' : '200px',
                    border: `3px solid ${index % 2 === 0 ? colors.platinum : colors.accent}50`,
                    background: `linear-gradient(135deg, ${colors.black}80 0%, transparent 100%)`,
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
                  }}
                />
                <div style={{
                  fontSize: isMobile ? '3rem' : '4rem',
                  color: index % 2 === 0 ? colors.gold : colors.green,
                  zIndex: 1
                }}>
                  {step.icon}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section style={{
        padding: isMobile ? '2rem 1rem' : '5rem 2rem',
        background: colors.darkBg,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(${colors.green}10 1px, transparent 1px),
            linear-gradient(90deg, ${colors.green}10 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          opacity: 0.5
        }} />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: '4rem',
            position: 'relative',
            zIndex: 1
          }}
        >
          <h2 style={{
            fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.2rem)' : '3.5rem',
            fontWeight: '800',
            marginBottom: '1rem',
            color: colors.gold
          }}>
            Meet Our Expert Team
          </h2>
          <p style={{
            fontSize: isMobile ? '1rem' : '1.2rem',
            color: colors.lightGray,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Expert developers and designers committed to excellence
          </p>
        </motion.div>

        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? '1.5rem' : '3rem',
          position: 'relative',
          zIndex: 1
        }}>
          {[
            {
              name: "M Sufian Saeed",
              role: "Lead Developer",
              expertise: "Full Stack Development",
              years: "5+ years",
              avatar: "MS",
              image: "/images/team/lead-developer.webp"
            },
            {
              name: "Umar Arshad",
              role: "Senior Developer",
              expertise: "Backend & Cloud Solutions",
              years: "7+ years",
              avatar: "UA",
              image: "/images/team/umar-arshad.webp"
            },
            {
              name: "M Bariq Ullah",
              role: "Full Stack Developer",
              expertise: "React & Node.js",
              years: "4+ years",
              avatar: "MB",
              image: "/images/team/bariq-ullah.webp"
            }
          ].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                background: `linear-gradient(135deg, ${colors.gold}20 0%, ${colors.green}20 100%)`
              }}
              style={{
                background: colors.black,
                borderRadius: '20px',
                padding: isMobile ? '1.5rem' : '2rem',
                textAlign: 'center',
                border: `2px solid ${colors.gold}20`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                style={{
                  width: isMobile ? '80px' : '100px',
                  height: isMobile ? '80px' : '100px',
                  margin: '0 auto 1.5rem',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: `3px solid ${colors.gold}`,
                  boxShadow: `0 8px 20px ${colors.gold}20`,
                  position: 'relative'
                }}
              >
                {member.image ? (
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role} at Softeefi UK web development team`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.green} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: colors.black
                  }}>
                    {member.avatar}
                  </div>
                )}
              </motion.div>

              <h3 style={{
                fontSize: isMobile ? '1.1rem' : '1.3rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
                color: colors.white
              }}>
                {member.name}
              </h3>

              <p style={{
                color: colors.gold,
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                {member.role}
              </p>

              <div style={{
                fontSize: '0.9rem',
                color: colors.gray,
                marginBottom: '0.5rem'
              }}>
                {member.expertise}
              </div>

              <div style={{
                fontSize: '0.85rem',
                color: colors.green,
                fontWeight: '600'
              }}>
                {member.years}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: isMobile ? '3rem' : '4rem',
            padding: isMobile ? '1.5rem' : '2rem',
            background: `linear-gradient(135deg, ${colors.gold}10 0%, ${colors.green}10 100%)`,
            borderRadius: '20px',
            maxWidth: '800px',
            margin: '4rem auto 0',
            textAlign: 'center',
            border: `1px solid ${colors.gold}30`
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            <div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '900',
                color: colors.gold
              }}>
                55+
              </div>
              <div style={{ color: colors.gray }}>Combined Projects</div>
            </div>
            <div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '900',
                color: colors.gold
              }}>
                18+
              </div>
              <div style={{ color: colors.gray }}>Years Experience</div>
            </div>
            <div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '900',
                color: colors.gold
              }}>
                15+
              </div>
              <div style={{ color: colors.gray }}>Tech Certifications</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Client Reviews Section - COMMENTED OUT FOR NOW 
      <section style={{
        padding: isMobile ? '2rem 1rem' : '5rem 2rem',
        background: colors.black,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle, ${colors.green}10 0%, transparent 70%)`,
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }} />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: '4rem',
            position: 'relative',
            zIndex: 1
          }}
        >
          <h2 style={{
            fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.2rem)' : '3.5rem',
            fontWeight: '800',
            marginBottom: '1rem',
            color: colors.gold
          }}>
            Client Success Stories
          </h2>
          <p style={{
            fontSize: isMobile ? '1rem' : '1.2rem',
            color: colors.lightGray,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </motion.div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '2rem',
          position: 'relative',
          zIndex: 1
        }}>
          {[
            {
              name: "David Thompson",
              company: "TechFlow Solutions",
              rating: 5,
              review: "Softeefi transformed our outdated website into a modern, conversion-focused platform. Our online sales increased by 150% within 3 months!",
              project: "E-commerce Platform",
              image: "https://randomuser.me/api/portraits/men/52.webp"
            },
            {
              name: "Jessica Martinez",
              company: "GreenLeaf Wellness",
              rating: 5,
              review: "The mobile app they developed exceeded our expectations. User engagement is through the roof, and the design is absolutely stunning.",
              project: "Healthcare Mobile App",
              image: "https://randomuser.me/api/portraits/women/28.webp"
            },
            {
              name: "Robert Chen",
              company: "DataSync Pro",
              rating: 5,
              review: "Their expertise in web applications is unmatched. They delivered a complex system on time and within budget. Highly recommended!",
              project: "SaaS Dashboard",
              image: "https://randomuser.me/api/portraits/men/45.webp"
            }
          ].map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: isMobile ? 0 : -10,
                background: isMobile ? colors.darkBg : `linear-gradient(135deg, ${colors.gold}10 0%, ${colors.green}10 100%)`
              }}
              style={{
                background: colors.darkBg,
                borderRadius: '20px',
                padding: isMobile ? '1.5rem' : '2rem',
                border: `2px solid ${colors.gold}20`,
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                fontSize: '3rem',
                color: colors.gold,
                opacity: 0.2
              }}>
                "
              </div>

              <div style={{
                display: 'flex',
                gap: '0.25rem',
                marginBottom: '1rem'
              }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{
                    color: i < review.rating ? colors.gold : colors.gray,
                    fontSize: '1.2rem'
                  }}>
                    ★
                  </span>
                ))}
              </div>

              <p style={{
                color: colors.lightGray,
                lineHeight: 1.6,
                marginBottom: '1.5rem',
                fontSize: isMobile ? '0.95rem' : '1rem',
                fontStyle: 'italic'
              }}>
                "{review.review}"
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                borderTop: `1px solid ${colors.gold}20`,
                paddingTop: '1.5rem'
              }}>
                <img
                  src={review.image}
                  alt={review.name}
                  style={{
                    width: isMobile ? '40px' : '50px',
                    height: isMobile ? '40px' : '50px',
                    borderRadius: '50%',
                    border: `2px solid ${colors.gold}`,
                    objectFit: 'cover'
                  }}
                />
                
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    color: colors.white,
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    marginBottom: '0.25rem'
                  }}>
                    {review.name}
                  </h4>
                  <p style={{
                    color: colors.gray,
                    fontSize: '0.9rem',
                    marginBottom: '0.25rem'
                  }}>
                    {review.company}
                  </p>
                  <p style={{
                    color: colors.green,
                    fontSize: '0.85rem',
                    fontWeight: '500'
                  }}>
                    {review.project}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{
            textAlign: 'center',
            marginTop: '4rem'
          }}
        >
          <p style={{
            color: colors.lightGray,
            fontSize: '1.1rem',
            marginBottom: '2rem'
          }}>
            Join hundreds of satisfied clients who've transformed their digital presence
          </p>
          <Link
            to="/contact"
            style={{
              padding: '1rem 2.5rem',
              background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldDark} 100%)`,
              color: colors.black,
              textDecoration: 'none',
              borderRadius: '50px',
              fontWeight: '700',
              fontSize: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
              boxShadow: `0 8px 20px ${colors.gold}20`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = `0 12px 30px ${colors.gold}25`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 8px 20px ${colors.gold}20`;
            }}
          >
            Start Your Success Story
            <HiArrowRight />
          </Link>
        </motion.div>
      </section>
      */}

      {/* Key Features Section */}
      <section style={{
        padding: isMobile ? '2rem 1rem' : '5rem 2rem',
        background: `linear-gradient(180deg, ${colors.darkBg} 0%, ${colors.black} 100%)`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated gradient background */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(45deg, 
              ${colors.platinum}05 25%, 
              transparent 25%, 
              transparent 75%, 
              ${colors.platinum}05 75%, 
              ${colors.platinum}05),
            linear-gradient(45deg, 
              ${colors.platinum}05 25%, 
              transparent 25%, 
              transparent 75%, 
              ${colors.platinum}05 75%, 
              ${colors.platinum}05)`,
            backgroundSize: isMobile ? '30px 30px' : '50px 50px',
            backgroundPosition: '0 0, 25px 25px',
            opacity: 0.5,
            willChange: 'transform'
          }}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: '4rem',
            position: 'relative',
            zIndex: 1
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              background: `linear-gradient(135deg, ${colors.platinum} 0%, ${colors.gold} 100%)`,
              borderRadius: '50%',
              marginBottom: '2rem',
              boxShadow: `0 20px 40px ${colors.platinum}30`
            }}
          >
            <FaMedal style={{ fontSize: '2.5rem', color: colors.black }} />
          </motion.div>
          
          <h2 style={{
            fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.2rem)' : '3.5rem',
            fontWeight: '800',
            marginBottom: '1rem',
            background: `linear-gradient(90deg, ${colors.platinum} 0%, ${colors.gold} 50%, ${colors.platinum} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Exclusive Features
          </h2>
          <p style={{
            fontSize: isMobile ? '1rem' : '1.2rem',
            color: colors.lightGray,
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Advanced capabilities that set your project apart from the competition
          </p>
        </motion.div>

        {/* Features Grid */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '2rem',
          position: 'relative',
          zIndex: 1
        }}>
          {[
            {
              icon: <MdSpeed />,
              title: "Performance Obsessed",
              features: [
                "Sub-second load times",
                "99.99% uptime SLA",
                "Global CDN delivery",
                "Real-time monitoring"
              ],
              gradient: `linear-gradient(135deg, ${colors.accent}40 0%, ${colors.platinum}40 100%)`
            },
            {
              icon: <FaAward />,
              title: "Award-Winning Design",
              features: [
                "Custom animations",
                "Micro-interactions",
                "Brand-first approach",
                "Accessibility AAA"
              ],
              gradient: `linear-gradient(135deg, ${colors.gold}40 0%, ${colors.platinum}40 100%)`
            },
            {
              icon: <MdVerified />,
              title: "Advanced Security",
              features: [
                "SOC 2 compliance",
                "End-to-end encryption",
                "DDoS protection",
                "Regular security audits"
              ],
              gradient: `linear-gradient(135deg, ${colors.platinum}40 0%, ${colors.accent}40 100%)`
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ 
                y: isMobile ? 0 : -10,
                boxShadow: isMobile ? 'none' : `0 30px 60px ${colors.platinum}30`
              }}
              style={{
                background: feature.gradient,
                borderRadius: '30px',
                padding: isMobile ? '2rem 1.5rem' : '3rem 2rem',
                textAlign: 'center',
                border: `2px solid ${colors.platinum}30`,
                backdropFilter: isMobile ? 'none' : 'blur(20px)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                WebkitBackdropFilter: isMobile ? 'none' : 'blur(20px)'
              }}
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                style={{
                  fontSize: '3rem',
                  color: colors.platinum,
                  marginBottom: '1.5rem'
                }}
              >
                {feature.icon}
              </motion.div>
              
              <h3 style={{
                fontSize: isMobile ? '1.3rem' : '1.5rem',
                fontWeight: '700',
                color: colors.white,
                marginBottom: '1.5rem'
              }}>
                {feature.title}
              </h3>
              
              <ul style={{
                listStyle: 'none',
                padding: 0
              }}>
                {feature.features.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    style={{
                      padding: '0.5rem 0',
                      color: colors.lightGray,
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <HiCheckCircle style={{ color: colors.platinum, flexShrink: 0 }} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section style={{
        padding: isMobile ? '2rem 1rem' : '5rem 2rem',
        background: colors.black
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}
        >
          <h2 style={{
            fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.2rem)' : '3.5rem',
            fontWeight: '800',
            marginBottom: '1rem',
            color: colors.gold
          }}>
            Our Tech Stack
          </h2>
          <p style={{
            fontSize: isMobile ? '1rem' : '1.2rem',
            color: colors.lightGray,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Modern technologies for scalable, future-proof solutions
          </p>
        </motion.div>

        <div style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {Object.entries(techStack).map(([category, technologies], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              style={{
                marginBottom: '3rem'
              }}
            >
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: colors.gold,
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                {category}
              </h3>
              
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'center'
              }}>
                {technologies.map((tech, techIndex) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: techIndex * 0.05 }}
                    whileHover={{ 
                      scale: isMobile ? 1 : 1.1,
                      background: isMobile ? colors.darkBg : `linear-gradient(135deg, ${colors.gold}30 0%, ${colors.green}30 100%)`
                    }}
                    style={{
                      padding: isMobile ? '0.6rem 1rem' : '0.75rem 1.5rem',
                      background: `${colors.darkBg}`,
                      border: `2px solid ${colors.gold}30`,
                      borderRadius: '25px',
                      fontSize: isMobile ? '0.9rem' : '1rem',
                      fontWeight: '600',
                      color: colors.white,
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: isMobile ? '3rem 1rem' : '6rem 2rem',
        background: `linear-gradient(135deg, ${colors.darkBg} 0%, ${colors.black} 100%)`,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Animation */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '300px' : '600px',
            height: isMobile ? '300px' : '600px',
            background: `radial-gradient(circle, ${colors.gold}15 0%, transparent 70%)`,
            filter: isMobile ? 'blur(60px)' : 'blur(100px)',
            pointerEvents: 'none'
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            position: 'relative',
            zIndex: 1
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5 }}
            style={{
              display: 'inline-block',
              fontSize: '4rem',
              marginBottom: '2rem',
              color: colors.gold
            }}
          >
            <FaRocket />
          </motion.div>

          <h2 style={{
            fontSize: isMobile ? '2rem' : '4rem',
            fontWeight: '900',
            marginBottom: '1.5rem',
            lineHeight: 1.2
          }}>
            <span style={{
              background: `linear-gradient(90deg, ${colors.white} 0%, ${colors.diamond} 25%, ${colors.primary} 50%, ${colors.diamond} 75%, ${colors.white} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Grow Your Online
              <br />
              Presence Now
            </span>
          </h2>

          <p style={{
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            color: colors.lightGray,
            maxWidth: '700px',
            margin: '0 auto 3rem',
            lineHeight: 1.6,
            padding: isMobile ? '0 1rem' : '0'
          }}>
            Let's build something great together. Professional web solutions that help your business grow.
          </p>

          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '1.5rem',
            justifyContent: 'center',
            alignItems: 'center',
            width: isMobile ? '100%' : 'auto'
          }}>
            <Link
              to="/contact"
              style={{
                padding: isMobile ? '0.9rem 1.5rem' : '1.2rem 3rem',
                background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldDark} 100%)`,
                color: colors.black,
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: '700',
                fontSize: isMobile ? '1rem' : '1.2rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                boxShadow: `0 10px 25px ${colors.gold}20`,
                width: isMobile ? '100%' : 'auto',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                e.currentTarget.style.background = `linear-gradient(135deg, ${colors.gold} 0%, ${colors.green} 100%)`;
                e.currentTarget.style.boxShadow = `0 15px 35px ${colors.gold}25`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.background = `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldDark} 100%)`;
                e.currentTarget.style.boxShadow = `0 10px 25px ${colors.gold}20`;
              }}
            >
              Start Your Project Now
              <HiArrowRight />
            </Link>

            {/* Call CTA Button */}
            <a
              href="tel:+447417505744"
              style={{
                padding: isMobile ? '15px 30px' : '18px 45px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: `2px solid ${colors.green}`,
                color: colors.green,
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: '700',
                fontSize: isMobile ? '1rem' : '1.2rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                marginLeft: isMobile ? '0' : '1rem',
                marginTop: isMobile ? '1rem' : '0',
                width: isMobile ? '100%' : 'auto',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.green;
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = colors.green;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span>📞</span> Call Us Now
            </a>

          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            style={{
              marginTop: '4rem',
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            {[
              "Professional Quality",
              "Custom UI/UX Design",
              "24/7 Support Team",
              "Results Guaranteed"
            ].map((badge, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: colors.gray
                }}
              >
                <HiCheckCircle style={{ color: colors.green }} />
                {badge}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Project Modal with Navigation */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onNext={() => {
          if (selectedProject) {
            const currentIndex = portfolio.findIndex(p => p.id === selectedProject.id);
            const nextIndex = (currentIndex + 1) % portfolio.length;
            setSelectedProject(portfolio[nextIndex]);
          }
        }}
        onPrevious={() => {
          if (selectedProject) {
            const currentIndex = portfolio.findIndex(p => p.id === selectedProject.id);
            const prevIndex = currentIndex === 0 ? portfolio.length - 1 : currentIndex - 1;
            setSelectedProject(portfolio[prevIndex]);
          }
        }}
        totalProjects={portfolio.length}
        currentProjectIndex={selectedProject ? portfolio.findIndex(p => p.id === selectedProject.id) : 0}
      />
    </div>
  );
};

export default WebsitesAndApps;