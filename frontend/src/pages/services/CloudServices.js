import React, { useEffect, useState, useRef, useMemo, useCallback, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

// Enhanced Icons with better design
const CloudIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
  </svg>
);

const DynamicsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="9" y1="21" x2="9" y2="9"></line>
  </svg>
);

const PowerPlatformIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
    <line x1="12" y1="22" x2="12" y2="15.5"></line>
    <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
  </svg>
);

const Office365Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
  </svg>
);

// SVG Icons for Benefits Section
const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
  </svg>
);

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6"></path>
    <path d="M2.5 22v-6h6"></path>
    <path d="M2.52 7.01A11.5 11.5 0 0 1 21.5 8"></path>
    <path d="M21.48 16.99A11.5 11.5 0 0 1 2.5 16"></path>
  </svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

// Floating particles component - optimized with useMemo
const FloatingParticles = React.memo(() => {
  const particles = useMemo(() => 
    Array(10).fill(0).map((_, i) => ({
      id: i,
      width: Math.random() * 6 + 2,
      height: Math.random() * 6 + 2,
      opacity: Math.random() * 0.5 + 0.3,
      left: Math.random() * 100,
      top: Math.random() * 100,
      xOffset: Math.random() * 20 - 10,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5
    })), []
  );

  return (
    <div className="particles-container" style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      pointerEvents: 'none'
    }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          style={{
            position: 'absolute',
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            background: `rgba(0, 255, 127, ${particle.opacity})`,
            borderRadius: '50%',
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            willChange: 'transform, opacity'
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, particle.xOffset, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}
    </div>
  );
});

const CloudServices = () => {
  const [activeTab, setActiveTab] = useState('dynamics');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [statsInView, setStatsInView] = useState(false);
  const [servicesInView, setServicesInView] = useState(false);
  const [portfolioInView, setPortfolioInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;
  
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);
  
  // SEO Meta Tags and Structured Data
  useEffect(() => {
    // Set dynamic title with target keywords (both cloud services AND infrastructure)
    document.title = 'Cloud Infrastructure & Services UK | Microsoft Azure, Dynamics 365 & SharePoint - Softeefi';
    
    // Set meta description with keywords and CTR optimization (targeting both keyword sets)
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Expert cloud infrastructure and cloud services provider UK. Oracle cloud infrastructure, cloud based infrastructure security, Microsoft Dynamics 365, SharePoint & Azure solutions. Infrastructure as a service (IaaS) in cloud computing. Get affordable cloud infrastructure for business.';
    }
    
    // Add meta keywords (though less important for modern SEO)
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'website hosting uk, cloud hosting uk, web hosting services, business hosting, secure website hosting, fast website hosting, reliable hosting uk, wordpress hosting, ecommerce hosting, email hosting uk, business email hosting, professional email service, microsoft 365 uk, office 365 for business, google workspace uk, cloud storage uk, online backup services, data backup uk, backup solutions for business, disaster recovery uk, data recovery services, website backup, automatic backups, cloud backup for business, move to cloud uk, cloud migration services, migrate to cloud, cloud setup uk, cloud configuration, cloud deployment, cloud support uk, cloud maintenance, cloud management uk, managed cloud services, cloud monitoring, cloud security uk, secure cloud storage, cloud data protection, gdpr compliant cloud, cloud compliance uk, website security services, ssl certificate uk, website protection, cyber security uk, data security services, cloud infrastructure, cloud services, cloud infrastructure UK, cloud services UK, oracle cloud infrastructure, cloud based infrastructure, cloud infrastructure security, infrastructure as a service, IaaS, what is cloud infrastructure, Microsoft Dynamics 365, SharePoint services, Power Platform, Office 365, cloud hosting services, cloud backup services, cloud computing services, azure cloud services, aws hosting uk, amazon web services uk, google cloud uk, microsoft azure uk, digital ocean uk, server hosting uk, vps hosting uk, dedicated server uk, server management, server maintenance, database hosting, database management, api hosting, application hosting, software hosting, cdn services uk, content delivery network, website speed optimization, load balancing services, auto scaling services, server monitoring, uptime monitoring, performance monitoring, 24/7 support cloud, emergency cloud support, cloud consulting uk, cloud strategy uk, cloud architecture, cloud solutions architect, cloud cost optimization, reduce cloud costs, affordable cloud services, cheap cloud hosting uk, cloud pricing uk, pay as you go hosting, scalable hosting, flexible hosting, grow with cloud, small business cloud, enterprise cloud uk, startup cloud services, cloud for agencies, cloud for developers';
    
    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://softeefi.co.uk/services/cloud-services';
    
    // Add Open Graph tags for social sharing
    const ogTags = [
      { property: 'og:title', content: 'Cloud Infrastructure & Services UK | Microsoft Azure Solutions | Softeefi' },
      { property: 'og:description', content: 'Leading cloud infrastructure and services provider UK. Oracle cloud, Microsoft Azure, Dynamics 365, cloud security & IaaS solutions. Transform your business with enterprise cloud infrastructure.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://softeefi.co.uk/services/cloud-infrastructure' },
      { property: 'og:image', content: 'https://softeefi.co.uk/images/cloud-services-og.jpg' }
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
    
    // Add structured data for Local Business and Service
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
              "name": "Cloud Infrastructure",
              "item": "https://softeefi.co.uk/services/cloud-infrastructure"
            }
          ]
        },
        {
          "@type": "Service",
          "name": "Cloud Infrastructure & Services",
          "description": "Enterprise cloud infrastructure and services UK. Oracle cloud infrastructure, cloud based infrastructure security, Microsoft Azure, Dynamics 365, SharePoint, and infrastructure as a service (IaaS) solutions",
          "provider": {
            "@type": "Organization",
            "name": "Softeefi",
            "url": "https://softeefi.co.uk",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "UK"
            }
          },
          "areaServed": {
            "@type": "Country",
            "name": "United Kingdom"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Cloud Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Cloud Infrastructure Services",
                  "description": "Complete cloud infrastructure setup and management including Oracle cloud infrastructure and Azure"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Infrastructure as a Service (IaaS)",
                  "description": "Scalable IaaS solutions providing virtualized computing resources on-demand"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Cloud Infrastructure Security",
                  "description": "Enterprise-grade cloud based infrastructure security and compliance solutions"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Microsoft Dynamics 365 Implementation",
                  "description": "Complete Dynamics 365 CRM and ERP implementation and customization"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "SharePoint Development & Migration",
                  "description": "Custom SharePoint solutions, migration, and intranet development"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Azure Cloud Services",
                  "description": "Microsoft Azure cloud computing platform and management services"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Power Platform Solutions",
                  "description": "Power Apps, Power Automate, and Power BI development and integration"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Office 365 Deployment",
                  "description": "Complete Office 365 migration, deployment, and management services"
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
              "name": "What is cloud infrastructure?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Cloud infrastructure refers to the hardware and software components needed for cloud computing, including servers, storage, networking, and virtualization software. We provide complete cloud infrastructure solutions including Oracle cloud infrastructure and Microsoft Azure."
              }
            },
            {
              "@type": "Question",
              "name": "What is infrastructure as a service in cloud computing?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Infrastructure as a Service (IaaS) is a cloud computing model where we provide virtualized computing resources over the internet. This includes servers, storage, networks, and operating systems on a pay-as-you-go basis."
              }
            },
            {
              "@type": "Question",
              "name": "What are cloud services?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Cloud services are computing services delivered over the internet, including servers, storage, databases, networking, software, and analytics. We specialize in Microsoft cloud solutions and cloud infrastructure security."
              }
            },
            {
              "@type": "Question",
              "name": "What is cloud based infrastructure?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Cloud based infrastructure is the collection of hardware and software elements needed to enable cloud computing. It includes computing power, networking, and storage delivered through virtualization technology."
              }
            },
            {
              "@type": "Question",
              "name": "How much does cloud infrastructure cost?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Cloud infrastructure costs vary based on usage, typically ranging from £100-£10,000+ per month. We offer cost-effective solutions with pay-as-you-go pricing, helping businesses save 30-50% compared to traditional infrastructure."
              }
            },
            {
              "@type": "Question",
              "name": "What is Oracle cloud infrastructure?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Oracle Cloud Infrastructure (OCI) is a deep and broad platform of cloud services that enables you to build and run a wide range of applications in a scalable, secure, highly available, and high-performance environment. We provide Oracle cloud implementation and management services."
              }
            },
            {
              "@type": "Question",
              "name": "What are the benefits of cloud infrastructure security?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Cloud infrastructure security provides data encryption, threat detection, compliance management, and disaster recovery. Our cloud security services include 24/7 monitoring, access controls, and regular security audits to protect your business data."
              }
            },
            {
              "@type": "Question",
              "name": "What is the difference between cloud services and cloud infrastructure?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Cloud infrastructure refers to the underlying hardware and software components (servers, storage, networking), while cloud services are the applications and solutions built on top of that infrastructure (SaaS, PaaS, IaaS). We provide both infrastructure setup and managed cloud services."
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
    
    // Cleanup function to reset on unmount
    return () => {
      document.title = 'Softeefi - Web Development, AI & Digital Marketing Services';
      if (metaDescription) {
        metaDescription.content = 'Professional web development, AI solutions, digital marketing, and cloud services to transform your business';
      }
    };
  }, []);

  // Check if mobile - debounced for performance
  useEffect(() => {
    let resizeTimer;
    const checkMobile = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsMobile(window.innerWidth <= 768);
      }, 250);
    };
    setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(resizeTimer);
    };
  }, []);
  
  // Optimized intersection observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: isMobile ? 0.1 : 0.2,
      rootMargin: isMobile ? '20px' : '50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === statsRef.current) {
            setStatsInView(true);
          } else if (entry.target === servicesRef.current) {
            setServicesInView(true);
          } else if (entry.target === portfolioRef.current) {
            setPortfolioInView(true);
          }
          // Unobserve after animation triggers
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    if (statsRef.current) observer.observe(statsRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (portfolioRef.current) observer.observe(portfolioRef.current);
    
    return () => observer.disconnect();
  }, [isMobile]);
  
  // Fallback for mobile - ensure portfolio is visible
  useEffect(() => {
    if (isMobile) {
      // Force visibility on mobile after a short delay
      const timer = setTimeout(() => {
        setPortfolioInView(true);
        setStatsInView(true);
        setServicesInView(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  // Mouse move effect - throttled for performance
  useEffect(() => {
    if (isMobile) return;
    
    let rafId;
    const handleMouseMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        rafId = null;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  // Animated counter hook
  const useCounter = (end, duration = 2000, inView) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!inView) return;
      
      let startTime;
      let animationFrame;
      
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(step);
        }
      };
      
      animationFrame = window.requestAnimationFrame(step);
      return () => window.cancelAnimationFrame(animationFrame);
    }, [end, duration, inView]);
    
    return count;
  };

  // Statistics counters
  const clientsCount = useCounter(50, 2000, statsInView);
  const projectsCount = useCounter(120, 2000, statsInView);
  const cloudPlatformsCount = useCounter(5, 2000, statsInView);
  const satisfactionCount = useCounter(98, 2000, statsInView);

  const serviceOptions = [
    { id: 'dynamics', name: 'Dynamics 365 CRM/ERP', icon: <DynamicsIcon /> },
    { id: 'power', name: 'Power Platform', icon: <PowerPlatformIcon /> },
    { id: 'hubspot', name: 'HubSpot CRM', icon: <CloudIcon /> },
    { id: 'tableau', name: 'Tableau BI', icon: <Office365Icon /> },
    { id: 'sharepoint', name: 'SharePoint', icon: <CloudIcon /> },
    { id: 'ai', name: 'AI & ML Solutions', icon: <PowerPlatformIcon /> }
  ];

  const serviceContent = {
    infrastructure: {
      title: "Cloud Infrastructure Services",
      description: "Enterprise-grade cloud infrastructure solutions powered by Microsoft Azure and AWS, designed to scale your business operations efficiently.",
      features: [
        "Azure Virtual Machines and Container Services",
        "AWS EC2 and Kubernetes Orchestration",
        "Cloud Storage and Backup Solutions",
        "Network Security and Firewall Management",
        "Disaster Recovery and Business Continuity"
      ],
      link: "/projects/cloud-infrastructure"
    },
    dynamics: {
      title: "Dynamics 365 CRM/ERP Services",
      description: "Microsoft Certified Partner delivering comprehensive Dynamics 365 services. We provide end-to-end implementation, customization, and integration across Sales, Customer Service, Marketing, Project Operations, and Business Central modules to transform your business operations.",
      features: [
        "Dynamics 365 Sales: Pipeline management, opportunity tracking, and AI-driven insights",
        "Dynamics 365 Customer Service: Omnichannel engagement, case management, and knowledge base",
        "Dynamics 365 Marketing: Customer journey orchestration, event management, and lead scoring",
        "Dynamics 365 Business Central: Complete ERP solution for finance, supply chain, and operations",
        "Integration Services: Seamless connection with Microsoft ecosystem and third-party systems",
        "Custom Development: Plugins, workflows, PCF controls, and model-driven apps"
      ],
      link: "/projects/cloud-infrastructure#dynamics365"
    },
    power: {
      title: "Power Platform Development & Low-Code Innovation",
      description: "Expert Power Platform implementation enabling rapid digital transformation through low-code solutions. We deliver custom applications, automated workflows, and business intelligence that seamlessly integrate with your Microsoft ecosystem.",
      features: [
        "Power Apps: Canvas & Model-driven apps with offline capability and responsive design",
        "Power Automate: Cloud flows, desktop flows (RPA), and business process automation",
        "Power BI: Real-time dashboards, embedded analytics, and AI-powered insights",
        "Power Virtual Agents: Intelligent chatbots with natural language processing",
        "Power Pages: Data-driven websites with secure external user access",
        "Dataverse Integration: Centralized data platform with security and governance"
      ],
      link: "/projects/cloud-infrastructure#power-platform"
    },
    hubspot: {
      title: "HubSpot CRM & Inbound Marketing Excellence",
      description: "Complete HubSpot implementation and optimization services. We seamlessly integrate HubSpot with Microsoft tools to create unified customer experiences, automate marketing workflows, and drive measurable growth through data-driven strategies.",
      features: [
        "HubSpot-Microsoft Integration: Connect HubSpot CRM with Dynamics 365 and Office 365",
        "Marketing Automation: Lead scoring, nurturing workflows, and personalization at scale",
        "Sales Enablement: Sequences, playbooks, and AI-powered sales insights",
        "Service Hub Excellence: Omnichannel support, SLA management, and customer success",
        "Content Strategy: SEO-optimized content, pillar pages, and topic clusters",
        "Revenue Operations: Unified reporting across marketing, sales, and service teams"
      ],
      link: "/projects/cloud-infrastructure#hubspot"
    },
    tableau: {
      title: "Tableau Development & Consulting",
      description: "Full-scale Tableau development and consulting services, leveraging data visualization, powerful insights, and advanced business intelligence to empower data-driven decision-making and drive strategic growth.",
      features: [
        "Dashboard Development: Interactive and real-time business dashboards",
        "Data Preparation: ETL processes and data source integration",
        "Advanced Analytics: Predictive analytics and statistical modeling",
        "Server Administration: Tableau Server/Online setup and management",
        "Training & Adoption: User training and best practices implementation"
      ],
      link: "/projects/cloud-infrastructure#tableau"
    },
    sharepoint: {
      title: "SharePoint & Enterprise Collaboration",
      description: "Transform your digital workplace with our SharePoint expertise. We deliver modern intranet portals, document management systems, and collaboration solutions that integrate seamlessly with Microsoft 365 and Power Platform.",
      features: [
        "Modern Intranet Portals: Branded, responsive SharePoint sites with enhanced UX",
        "Document Management: Intelligent content services with AI-powered search and metadata",
        "SPFx Development: Custom web parts, extensions, and modern experiences",
        "Migration Services: Seamless migration from on-premises or other platforms",
        "Workflow Automation: Complex business processes with Power Automate integration",
        "Governance & Compliance: Information architecture, retention policies, and security"
      ],
      link: "/projects/cloud-infrastructure#sharepoint"
    },
    ai: {
      title: "AI & ML Integration with Microsoft Azure",
      description: "Leverage Microsoft Azure AI and machine learning services to build intelligent applications. We integrate AI capabilities into your existing systems, enabling predictive analytics, natural language processing, and automated decision-making.",
      features: [
        "Azure OpenAI Service: GPT-4, DALL-E, and custom AI models integration",
        "Azure Cognitive Services: Vision, Speech, Language, and Decision APIs",
        "Azure Machine Learning: Custom ML models with automated ML capabilities",
        "Power Platform AI: AI Builder for low-code AI solutions",
        "Predictive Analytics: Forecasting and trend analysis with Azure Synapse",
        "Intelligent Automation: Combining AI with Power Automate and Logic Apps"
      ],
      link: "/projects/cloud-infrastructure#ai-ml"
    },
    office365: {
      title: "Office 365 Cloud Services",
      description: "Complete Office 365 ecosystem management and implementation to enhance collaboration, productivity, and security across your organization.",
      features: [
        "Email and Calendar Management: Exchange Online configuration and migration",
        "Document Management: SharePoint Online and OneDrive deployment",
        "Team Collaboration: Microsoft Teams setup and governance",
        "Security and Compliance: Advanced threat protection and data governance",
        "User Training: Comprehensive adoption and change management programs"
      ],
      link: "/projects/cloud-infrastructure#office365"
    }
  };

  // Handle project modal
  const openProjectModal = (projectId) => {
    setSelectedProject(projectId);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };
  
  // Touch handlers for swipe navigation
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && selectedProject) {
      handleNextProject();
    }
    if (isRightSwipe && selectedProject) {
      handlePreviousProject();
    }
  };

  // Navigation functions for modal
  const handlePreviousProject = () => {
    const currentIndex = portfolioItems.findIndex(item => item.id === selectedProject);
    const prevIndex = currentIndex === 0 ? portfolioItems.length - 1 : currentIndex - 1;
    setSelectedProject(portfolioItems[prevIndex].id);
  };

  const handleNextProject = () => {
    const currentIndex = portfolioItems.findIndex(item => item.id === selectedProject);
    const nextIndex = currentIndex === portfolioItems.length - 1 ? 0 : currentIndex + 1;
    setSelectedProject(portfolioItems[nextIndex].id);
  };

  // Detailed project data for modals
  const projectDetails = {
    'fda': {
      client: 'U.S. Food and Drug Administration',
      duration: '12 months',
      technologies: ['Dynamics 365 CRM/ERP', 'Power Platform', 'Power Automate', 'Power BI', 'SharePoint'],
      challenges: [
        'Complex regulatory compliance requirements',
        'Integration with existing government systems',
        'Strict security and data governance needs',
        'Multi-departmental coordination'
      ],
      solutions: [
        'Implemented custom compliance workflows in Dynamics 365',
        'Developed secure API integrations with federal systems',
        'Created role-based access control with advanced security',
        'Built automated regulatory reporting with Power BI'
      ],
      detailedResults: [
        'Automated 75% of regulatory workflows',
        'Reduced compliance reporting time by 60%',
        'Enhanced data governance and security compliance',
        'Improved cross-departmental collaboration by 80%',
        'Real-time analytics for regulatory insights'
      ]
    },
    'hach': {
      client: 'Hach Company',
      duration: '8 months',
      technologies: ['SharePoint', 'SPFx Development Stack', 'Power Platform', 'Azure AD', 'Microsoft Teams'],
      challenges: [
        'Global team collaboration requirements',
        'Complex document management needs',
        'Custom workflow automation',
        'Legacy system migration'
      ],
      solutions: [
        'Developed custom SPFx web parts for specialized workflows',
        'Created modern SharePoint site architecture',
        'Implemented automated document processing',
        'Built integration with laboratory systems'
      ],
      detailedResults: [
        'Modernized document management for 5000+ users',
        'Reduced document retrieval time by 70%',
        'Enhanced global team collaboration',
        'Automated 60% of document workflows',
        'Improved compliance tracking'
      ]
    },
    'pacific': {
      client: 'Pacific Jet Coast',
      duration: '6 months',
      technologies: ['Microsoft Power Platform', 'Power Automate', 'Power BI', 'SharePoint'],
      challenges: [
        'Complex flight operations workflows',
        'Real-time fleet tracking requirements',
        'Integration with aviation systems',
        'Regulatory compliance needs'
      ],
      solutions: [
        'Automated flight operations with Power Automate',
        'Created real-time dashboards in Power BI',
        'Built SharePoint document repository',
        'Developed custom Power Apps for field operations'
      ],
      detailedResults: [
        'Automated 80% of flight operations workflows',
        'Real-time fleet analytics and tracking',
        'Improved operational efficiency by 40%',
        'Centralized document management',
        'Enhanced regulatory compliance'
      ]
    },
    'conedison': {
      client: 'Con Edison',
      duration: '10 months',
      technologies: ['Microsoft Power Platform', 'Power Automate', 'Power BI', 'SharePoint', 'Azure'],
      challenges: [
        'Legacy infrastructure systems',
        'High-volume customer service needs',
        'Complex utility operations',
        'Real-time monitoring requirements'
      ],
      solutions: [
        'Automated service workflows with Power Automate',
        'Built executive dashboards in Power BI',
        'Integrated SharePoint for document management',
        'Created customer service Power Apps'
      ],
      detailedResults: [
        'Reduced service response time by 50%',
        'Automated utility workflow processes',
        'Real-time executive analytics',
        'Improved customer satisfaction by 35%',
        'Enhanced operational visibility'
      ]
    },
    'nextlevel': {
      client: 'Next Level Medical Supply LLC',
      duration: '9 months',
      technologies: ['Dynamics 365 CRM/ERP', 'Microsoft Power Platform', 'Power Automate', 'Power BI', 'SharePoint'],
      challenges: [
        'Complex medical supply chain',
        'Regulatory compliance requirements',
        'Inventory management complexity',
        'Multi-location coordination'
      ],
      solutions: [
        'Implemented Dynamics 365 for supply chain',
        'Automated order processing workflows',
        'Created Power BI analytics dashboards',
        'Built custom inventory management apps'
      ],
      detailedResults: [
        'Streamlined inventory management',
        'Reduced order processing time by 60%',
        'Improved supply chain visibility',
        'Enhanced customer service operations',
        'Real-time analytics for decision making'
      ]
    },
    'blueonyx': {
      client: 'Blue Onyx Real Estate USA',
      duration: '5 months',
      technologies: ['Microsoft Power Platform', 'Power Automate', 'Power BI', 'SharePoint'],
      challenges: [
        'Complex property listing workflows',
        'Multiple data sources integration',
        'Real-time market analytics needs',
        'Document management complexity'
      ],
      solutions: [
        'Automated property listings with Power Automate',
        'Created market analytics dashboards in Power BI',
        'Centralized documents in SharePoint',
        'Built custom property management apps'
      ],
      detailedResults: [
        'Automated 70% of listing processes',
        'Real-time market insights dashboard',
        'Reduced transaction processing time by 50%',
        'Improved agent productivity by 45%'
      ]
    },
    'resourcemetrix': {
      client: 'Resource Metrix',
      duration: '7 months',
      technologies: ['Dynamics 365 CRM/ERP', 'Microsoft Power Platform', 'Power Automate', 'Power BI', 'SharePoint'],
      challenges: [
        'Complex resource allocation needs',
        'Multi-project tracking requirements',
        'Real-time reporting demands',
        'Integration with existing tools'
      ],
      solutions: [
        'Deployed Dynamics 365 for resource management',
        'Automated reporting with Power BI',
        'Created workflow automation with Power Automate',
        'Integrated SharePoint for project documents'
      ],
      detailedResults: [
        'Enhanced resource allocation efficiency by 55%',
        'Automated 80% of reporting processes',
        'Real-time project visibility',
        'Improved project delivery rate by 40%'
      ]
    },
    'sbr': {
      client: 'SBR International GmbH',
      duration: '11 months',
      technologies: ['Dynamics 365 CRM/ERP', 'Microsoft Power Platform', 'Power Automate', 'Power BI', 'SharePoint'],
      challenges: [
        'Multi-country operations',
        'Complex manufacturing processes',
        'Multi-currency requirements',
        'Supply chain complexity'
      ],
      solutions: [
        'Implemented global Dynamics 365 deployment',
        'Created multi-currency support system',
        'Automated production workflows',
        'Built supply chain analytics with Power BI'
      ],
      detailedResults: [
        'Unified global operations',
        'Reduced production delays by 45%',
        'Enhanced supply chain visibility',
        'Improved customer satisfaction by 50%'
      ]
    },
    'techfabric': {
      client: 'Tech Fabric',
      duration: '6 months',
      technologies: ['Dynamics 365 CRM/ERP', 'Microsoft Power Platform', 'Power Automate', 'Power BI', 'SharePoint'],
      challenges: [
        'Service delivery automation',
        'Project management integration',
        'Customer relationship complexity',
        'Performance tracking needs'
      ],
      solutions: [
        'Deployed Dynamics 365 for service management',
        'Automated service delivery workflows',
        'Integrated project management tools',
        'Created performance dashboards in Power BI'
      ],
      detailedResults: [
        'Automated 65% of service delivery',
        'Improved project completion rate by 35%',
        'Enhanced customer satisfaction scores',
        'Real-time operational insights'
      ]
    },
    'viperatech': {
      client: 'ViperaTech',
      duration: '8 months',
      technologies: ['Dynamics 365 CRM/ERP', 'Microsoft Power Platform', 'Power Automate', 'Power BI', 'SharePoint'],
      challenges: [
        'Development workflow complexity',
        'Deployment automation needs',
        'Customer support integration',
        'Analytics and reporting requirements'
      ],
      solutions: [
        'Streamlined dev workflows in Dynamics 365',
        'Automated deployment with Power Automate',
        'Integrated customer support systems',
        'Built comprehensive analytics with Power BI'
      ],
      detailedResults: [
        'Reduced deployment time by 60%',
        'Automated 75% of development workflows',
        'Improved customer response time by 50%',
        'Enhanced project visibility and tracking'
      ]
    }
  };

  // Portfolio case studies - Based on real client projects
  const portfolioItems = [
    {
      id: 'fda',
      title: "FDA - Enterprise Dynamics 365 CRM/ERP Implementation",
      description: "Delivered comprehensive Dynamics 365 CRM/ERP solution with full Microsoft Power Platform integration for the U.S. Food and Drug Administration, transforming regulatory operations.",
      results: "Automated regulatory workflows, enhanced data governance, implemented Power BI analytics for real-time insights, and streamlined cross-departmental collaboration.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 'hach',
      title: "Hach Company - SharePoint & SPFx Development",
      description: "Implemented enterprise Content and Collaboration services with custom SharePoint solutions and modern SPFx Development Stack for global water analytics leader.",
      results: "Modernized document management, developed custom web parts for specialized workflows, and enhanced global team collaboration capabilities.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 'pacific',
      title: "Pacific Jet Coast - Aviation Power Platform Suite",
      description: "Deployed Microsoft Power Platform suite including Power Automate workflows, Power BI dashboards, and SharePoint integration for aviation operations management.",
      results: "Automated flight operations, created real-time fleet analytics, established centralized document repository, and improved operational efficiency by 40%.",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      id: 'conedison',
      title: "Con Edison - Utility Infrastructure Transformation",
      description: "Implemented Microsoft Power Platform suite for one of America's largest utility companies, modernizing operations and customer service.",
      results: "Automated service workflows with Power Automate, created executive dashboards in Power BI, integrated SharePoint for document management.",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
      id: 'nextlevel',
      title: "Next Level Medical Supply - Healthcare Digital Transformation",
      description: "Complete Dynamics 365 CRM/ERP implementation with Microsoft Power Platform integration for medical supply chain management.",
      results: "Streamlined inventory management, automated order processing, integrated Power BI for supply chain analytics, enhanced customer service operations.",
      gradient: "linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)"
    },
    {
      id: 'blueonyx',
      title: "Blue Onyx Real Estate USA - Property Management Platform",
      description: "Deployed Microsoft Power Platform suite with Power Automate, Power BI, and SharePoint for comprehensive real estate operations.",
      results: "Automated property listings workflow, created analytics dashboards for market insights, centralized document management for transactions.",
      gradient: "linear-gradient(135deg, #f857a6 0%, #ff5858 100%)"
    },
    {
      id: 'resourcemetrix',
      title: "Resource Metrix - Business Intelligence Implementation",
      description: "Implemented Dynamics 365 CRM/ERP with full Microsoft Power Platform integration for resource management and analytics.",
      results: "Enhanced resource allocation, automated reporting with Power BI, streamlined operations with Power Automate workflows.",
      gradient: "linear-gradient(135deg, #13547a 0%, #80d0c7 100%)"
    },
    {
      id: 'sbr',
      title: "SBR International GmbH - Global Manufacturing Solution",
      description: "Delivered enterprise Dynamics 365 CRM/ERP solution with Power Platform for international manufacturing operations.",
      results: "Unified global operations, implemented multi-currency support, automated production workflows, enhanced supply chain visibility.",
      gradient: "linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%)"
    },
    {
      id: 'techfabric',
      title: "Tech Fabric - Technology Services Platform",
      description: "Comprehensive Dynamics 365 CRM/ERP implementation with Microsoft Power Platform for technology services management.",
      results: "Automated service delivery, integrated project management, enhanced customer relationship management, improved operational efficiency.",
      gradient: "linear-gradient(135deg, #fc6767 0%, #ec008c 100%)"
    },
    {
      id: 'viperatech',
      title: "ViperaTech - Software Development Operations",
      description: "Implemented Dynamics 365 CRM/ERP with Microsoft Power Platform integration for software development lifecycle management.",
      results: "Streamlined development workflows, automated deployment processes with Power Automate, created comprehensive analytics with Power BI.",
      gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)"
    }
  ];

  const benefits = [
    { 
      title: "Microsoft Certified Gold Partner", 
      description: "Certified development partner since 2019 with expert consultants",
      icon: <TrophyIcon />
    },
    { 
      title: "End-to-End Solutions", 
      description: "From consulting to implementation and ongoing support",
      icon: <RefreshIcon />
    },
    { 
      title: "Multi-Platform Expertise", 
      description: "Certified in Microsoft, HubSpot, and leading cloud platforms",
      icon: <BriefcaseIcon />
    },
    { 
      title: "Business-Centric Approach", 
      description: "Focus on making your processes smoother and more efficient",
      icon: <TargetIcon />
    }
  ];

  return (
    <div className="cloud-services-page" style={{ 
      background: 'transparent',
      minHeight: '100vh',
      color: '#ffffff',
      overflowX: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      paddingTop: '0',
      marginTop: isMobile ? '-70px' : '-90px',
      position: 'relative'
    }}>
      {/* Enhanced Hero Section */}
      <motion.div 
        ref={heroRef}
        className="hero-section" 
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
          padding: isMobile ? '5rem 1rem 3rem' : '14rem 2rem 10rem',
          minHeight: isMobile ? 'auto' : '100vh',
          position: 'relative',
          marginBottom: isMobile ? '3rem' : '5rem',
          marginTop: isMobile ? '0' : '-80px'
        }}
      >
        {!isMobile && (
          <Suspense fallback={null}>
            <FloatingParticles />
          </Suspense>
        )}
        
        {/* Gradient Orbs */}
        {!isMobile && (
          <>
            <div style={{ position: 'absolute', top: '10%', left: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0, 255, 127, 0.3) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0, 150, 255, 0.3) 0%, transparent 70%)', filter: 'blur(120px)', pointerEvents: 'none' }} />
          </>
        )}
        
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          position: 'relative', 
          zIndex: 2 
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center' }}
          >
            <motion.h1 
              style={{ 
                fontSize: 'clamp(3rem, 8vw, 5.5rem)', 
                fontWeight: '800',
                marginBottom: '1.5rem',
                lineHeight: 1.1,
                background: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 50%, #00a6ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradient 5s ease infinite'
              }}
            >
              Cloud Infrastructure & Services
            </motion.h1>
            
            {/* Microsoft Certified Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '2rem'
              }}
            >
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                border: '2px solid #00a6ff',
                borderRadius: '50px',
                padding: '0.75rem 2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                backdropFilter: 'blur(10px)'
              }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="9" height="9" fill="#00a6ff"/>
                  <rect x="13" y="2" width="9" height="9" fill="#00ff7f"/>
                  <rect x="2" y="13" width="9" height="9" fill="#ffd93d"/>
                  <rect x="13" y="13" width="9" height="9" fill="#ff6b6b"/>
                </svg>
                <span style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Microsoft Certified Gold Partner
                </span>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                border: '2px solid #ff6b6b',
                borderRadius: '50px',
                padding: '0.75rem 2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                backdropFilter: 'blur(10px)'
              }}>
                <span style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  HubSpot Certified Provider
                </span>
              </div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ 
                fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', 
                maxWidth: '900px', 
                margin: '0 auto 3rem',
                lineHeight: 1.7,
                color: '#b8b8b8' 
              }}
            >
              Transform your business with enterprise-grade cloud solutions. 
              As a Microsoft Certified Gold Partner since 2019 and HubSpot Certified Service Provider, 
              we deliver tailored solutions across Dynamics 365, Power Platform, HubSpot, Tableau, and more.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{ 
                display: 'flex', 
                gap: isMobile ? '1rem' : '1.5rem', 
                justifyContent: 'center', 
                flexWrap: 'wrap',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                width: isMobile ? '100%' : 'auto',
                maxWidth: isMobile ? '400px' : 'none',
                margin: '0 auto',
                marginBottom: isMobile ? '0.5rem' : '1rem'
              }}
            >
              <button 
                onClick={() => window.location.href = '/contact'}
                aria-label="Get Started with Cloud Services UK - Request Free Consultation" 
                className="hero-cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: isMobile ? '1rem 2rem' : '1.2rem 3rem',
                  background: 'linear-gradient(135deg, #00ff7f 0%, #00a6ff 100%)',
                  color: '#000000',
                  fontWeight: '700',
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  boxShadow: '0 10px 30px rgba(0, 255, 127, 0.3)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  border: 'none',
                  cursor: 'pointer',
                  width: isMobile ? '100%' : 'auto',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 255, 127, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 127, 0.3)';
                  }
                }}
              >
                Request a Consultation
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <a
                href="#portfolio"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: isMobile ? '1rem 2rem' : '1.2rem 3rem',
                  background: 'transparent',
                  color: '#ffffff',
                  fontWeight: '600',
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease',
                  width: isMobile ? '100%' : 'auto',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                View Our Work
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Enhanced Stats Section */}
      <div ref={statsRef} style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        <motion.div 
          className="stats-section" 
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: isMobile ? '1.5rem' : '2rem',
            marginBottom: isMobile ? '4rem' : '8rem'
          }}
        >
          {[
            { count: clientsCount, label: 'Satisfied Clients', color: '#00ff7f', icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            ) },
            { count: projectsCount, label: 'Cloud Projects', color: '#00a6ff', icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
              </svg>
            ) },
            { count: cloudPlatformsCount, label: 'Cloud Platforms', color: '#ff6b6b', icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
              </svg>
            ) },
            { count: satisfactionCount, label: 'Satisfaction Rate', suffix: '%', color: '#ffd93d', icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            ) }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="stat-card"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: isMobile ? '2rem 1.5rem' : '3rem 2rem',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.1)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                  e.currentTarget.style.boxShadow = `0 20px 40px ${stat.color}33`;
                  e.currentTarget.style.borderColor = stat.color;
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }
              }}
              onClick={(e) => {
                if (isMobile) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  setTimeout(() => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)';
                  }, 300);
                }
              }}
            >
              <div style={{ marginBottom: '1rem', color: stat.color }}>{stat.icon}</div>
              <motion.div 
                style={{ 
                  fontSize: isMobile ? '2.5rem' : '3.5rem', 
                  fontWeight: '800', 
                  color: stat.color, 
                  marginBottom: '0.5rem',
                  textShadow: `0 0 30px ${stat.color}66`
                }}
              >
                {stat.count}{stat.suffix || '+'}
              </motion.div>
              <div style={{ color: '#b8b8b8', fontSize: isMobile ? '1rem' : '1.1rem', fontWeight: '500' }}>{stat.label}</div>
              
              {/* Background decoration */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '200%',
                height: '200%',
                background: `radial-gradient(circle, ${stat.color}22 0%, transparent 70%)`,
                pointerEvents: 'none'
              }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Enhanced Services Section */}
      <div ref={servicesRef} style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', marginBottom: '8rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={servicesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
            fontWeight: '700',
            marginBottom: '1rem',
            background: 'linear-gradient(90deg, #ffffff 0%, #00a6ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Our Cloud Services
          </h2>
          <p style={{ fontSize: '1.3rem', color: '#b8b8b8', maxWidth: '700px', margin: '0 auto' }}>
            Comprehensive solutions to transform your business in the digital age
          </p>
        </motion.div>
        
        {/* Service Tabs */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={servicesInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="service-tabs"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '3rem',
            justifyContent: 'center'
          }}
        >
          {serviceOptions.map((service, index) => (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={servicesInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              onClick={() => setActiveTab(service.id)}
              style={{
                background: activeTab === service.id 
                  ? 'linear-gradient(135deg, #00a6ff 0%, #0078d4 100%)' 
                  : 'rgba(255,255,255,0.05)',
                color: activeTab === service.id ? '#ffffff' : '#b8b8b8',
                border: activeTab === service.id ? 'none' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50px',
                padding: '1rem 2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '1.1rem',
                fontWeight: activeTab === service.id ? '600' : '400',
                boxShadow: activeTab === service.id ? '0 10px 30px rgba(0, 150, 255, 0.3)' : 'none',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                if (service.id !== activeTab) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (service.id !== activeTab) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }
              }}
            >
              <span style={{ 
                color: activeTab === service.id ? '#ffffff' : '#00a6ff',
                display: 'flex',
                alignItems: 'center'
              }}>
                {service.icon}
              </span>
              {service.name}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Service Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="service-content"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
            backdropFilter: 'blur(20px)',
            borderRadius: '30px',
            padding: isMobile ? '2rem 1.5rem' : '4rem',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <motion.h3 
            key={`title-${activeTab}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ 
              color: '#ffffff', 
              marginBottom: '1.5rem',
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: '700'
            }}
          >
            {serviceContent[activeTab].title}
          </motion.h3>
          
          <motion.p 
            key={`desc-${activeTab}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            style={{ 
              marginBottom: '2.5rem', 
              fontSize: '1.2rem', 
              lineHeight: 1.7,
              color: '#b8b8b8'
            }}
          >
            {serviceContent[activeTab].description}
          </motion.p>
          
          <motion.div 
            key={`features-${activeTab}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            style={{ 
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: isMobile ? '1rem' : '1.5rem',
              marginBottom: isMobile ? '2rem' : '2.5rem'
            }}
          >
            {serviceContent[activeTab].features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (index * 0.1), duration: 0.4 }}
                style={{ 
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1.5rem',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '15px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.3)';
                    e.currentTarget.style.transform = 'translateX(10px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
                onClick={(e) => {
                  if (isMobile) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    setTimeout(() => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    }, 300);
                  }
                }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#00ff7f" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ flexShrink: 0, marginRight: '0.5rem' }}
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>{feature}</span>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.a 
            key={`link-${activeTab}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            href={serviceContent[activeTab].link}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: '#00ff7f',
              textDecoration: 'none',
              fontSize: '1.2rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              padding: '1rem 2rem',
              background: 'rgba(0, 255, 127, 0.1)',
              borderRadius: '30px',
              border: '1px solid rgba(0, 255, 127, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(10px)';
              e.currentTarget.style.background = 'rgba(0, 255, 127, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.background = 'rgba(0, 255, 127, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.3)';
            }}
          >
            Learn more about {serviceContent[activeTab].title.split(' ')[0]} Services
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </motion.a>
          
          {/* Background decoration */}
          <div style={{
            position: 'absolute',
            top: '-20%',
            right: '-20%',
            width: '40%',
            height: '40%',
            background: 'radial-gradient(circle, rgba(0, 150, 255, 0.2) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none'
          }} />
        </motion.div>
      </div>
      
      {/* Enhanced Portfolio Section */}
      <div id="portfolio" ref={portfolioRef} style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: isMobile ? '0 1rem' : '0 2rem',
        marginBottom: isMobile ? '4rem' : '8rem',
        minHeight: '400px',
        background: 'transparent',
        position: 'relative',
        display: 'block'
      }}>
        <motion.div
          initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0 : 0.6 }}
          style={{ textAlign: 'center', marginBottom: isMobile ? '2rem' : '4rem' }}
        >
          <h2 style={{ 
            fontSize: isMobile ? '2rem' : 'clamp(2.5rem, 5vw, 3.5rem)', 
            fontWeight: '700',
            marginBottom: '1rem',
            background: 'linear-gradient(90deg, #ffffff 0%, #00ff7f 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'block'
          }}>
            Our Completed Cloud Projects
          </h2>
          <p style={{ fontSize: isMobile ? '1rem' : '1.3rem', color: '#b8b8b8', maxWidth: isMobile ? '100%' : '700px', margin: '0 auto', padding: isMobile ? '0 1rem' : '0' }}>
            Real-world examples of how we've helped businesses succeed with our cloud solutions
          </p>
        </motion.div>
        
        <div className="portfolio-grid" style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: isMobile ? '1.5rem' : '2rem',
          width: '100%',
          minHeight: '300px',
          position: 'relative',
          background: 'transparent'
        }}>
          {portfolioItems && portfolioItems.length > 0 && portfolioItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isMobile ? 0 : (0.2 + (index * 0.1)), duration: isMobile ? 0 : 0.6 }}
              className="portfolio-card"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                backdropFilter: 'blur(20px)',
                borderRadius: '25px',
                overflow: 'hidden',
                transition: 'all 0.4s ease',
                border: '1px solid rgba(255,255,255,0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
                  const gradient = e.currentTarget.querySelector('.card-gradient');
                  if (gradient) gradient.style.opacity = '1';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  const gradient = e.currentTarget.querySelector('.card-gradient');
                  if (gradient) gradient.style.opacity = '0.7';
                }
              }}
              onClick={(e) => {
                if (isMobile && e.target.tagName !== 'BUTTON') {
                  const element = e.currentTarget;
                  element.style.transform = 'scale(0.98)';
                  setTimeout(() => {
                    if (element) {
                      element.style.transform = 'scale(1)';
                    }
                  }, 200);
                }
              }}
            >
              <div 
                className="card-gradient"
                style={{
                  height: '6px',
                  background: item.gradient,
                  width: '100%',
                  opacity: 0.7,
                  transition: 'opacity 0.4s ease'
                }} 
              />
              
              <div style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ 
                  marginBottom: '1.5rem', 
                  fontSize: '1.6rem',
                  fontWeight: '600',
                  color: '#ffffff'
                }}>
                  {item.title}
                </h3>
                
                <p style={{ 
                  marginBottom: '1.5rem', 
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  color: '#b8b8b8'
                }}>
                  {item.description}
                </p>
                
                <div style={{ 
                  marginBottom: '2rem',
                  background: 'rgba(0, 255, 127, 0.1)',
                  padding: '1.2rem',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  border: '1px solid rgba(0, 255, 127, 0.2)'
                }}>
                  <strong style={{ color: '#00ff7f' }}>Results:</strong> 
                  <span style={{ color: '#e8e8e8', marginLeft: '0.5rem' }}>{item.results}</span>
                </div>
                
                <button
                  onClick={() => openProjectModal(item.id)}
                  className="project-link"
                  style={{
                    color: '#00a6ff',
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    width: 'fit-content',
                    marginTop: 'auto',
                    transition: 'all 0.3s ease',
                    padding: '0.75rem 1.5rem',
                    background: 'rgba(0, 150, 255, 0.1)',
                    borderRadius: '25px',
                    border: '1px solid rgba(0, 150, 255, 0.3)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 150, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateX(5px)';
                    e.currentTarget.style.borderColor = 'rgba(0, 150, 255, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 150, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.borderColor = 'rgba(0, 150, 255, 0.3)';
                  }}
                >
                  View Project Details
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </button>
              </div>
              
              {/* Background decoration */}
              <div style={{
                position: 'absolute',
                bottom: '-30%',
                right: '-30%',
                width: '60%',
                height: '60%',
                background: item.gradient,
                opacity: 0.1,
                filter: 'blur(80px)',
                pointerEvents: 'none'
              }} />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Enhanced Why Choose Us Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
        padding: isMobile ? '3rem 1rem' : '6rem 2rem',
        marginBottom: isMobile ? '4rem' : '8rem'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
              fontWeight: '700',
              marginBottom: '1rem',
              background: 'linear-gradient(90deg, #ffffff 0%, #00a6ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Why Choose Our Cloud Services Provider?
            </h2>
          </motion.div>
          
          <div className="benefits-grid" style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: isMobile ? '1.5rem' : '2rem'
          }}>
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="benefit-card"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '25px',
                  padding: '3rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.4s ease',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 150, 255, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(0, 150, 255, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  }
                }}
                onClick={(e) => {
                  if (isMobile) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    setTimeout(() => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)';
                    }, 300);
                  }
                }}
              >
                <div style={{ 
                  marginBottom: '1.5rem',
                  color: '#00ff7f',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>{benefit.icon}</div>
                <h3 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.5rem' }}>{benefit.title}</h3>
                <p style={{ margin: 0, fontSize: '1.1rem', color: '#b8b8b8', lineHeight: 1.6 }}>{benefit.description}</p>
                
                {/* Background decoration */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-50%',
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(0, 150, 255, 0.1) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Our Clients Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #0a0a0a 100%)',
          padding: isMobile ? '4rem 1rem' : '6rem 2rem',
          marginBottom: isMobile ? '4rem' : '6rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: '700',
              marginBottom: '1rem',
              background: 'linear-gradient(90deg, #ffffff 0%, #00ff7f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Trusted by Leading Organizations
            </h2>
            <p style={{
              fontSize: '1.3rem',
              color: '#b8b8b8',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Delivering enterprise-grade solutions to government agencies and Fortune 500 companies
            </p>
          </motion.div>

          {/* Featured Client - FDA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 150, 255, 0.1) 100%)',
              borderRadius: '30px',
              padding: isMobile ? '2rem' : '3rem',
              marginBottom: '3rem',
              border: '2px solid rgba(0, 255, 127, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              gap: '2rem'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#00ff7f',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L14.09 8.26L20.6 8.27L15.45 11.97L17.52 18.24L12 14.47L6.48 18.24L8.55 11.97L3.4 8.27L9.91 8.26L12 2Z" fill="#ffd93d" stroke="#ffd93d" strokeWidth="2"/>
                  </svg>
                  FDA - Food and Drug Administration
                </h3>
                <p style={{
                  fontSize: '1.2rem',
                  color: '#ffffff',
                  marginBottom: '1rem',
                  lineHeight: 1.6
                }}>
                  Successfully implemented comprehensive Dynamics 365 CRM/ERP solution integrated with Microsoft Power Platform
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  {['Dynamics 365 CRM/ERP', 'Power Automate', 'Power BI', 'SharePoint'].map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(0, 255, 127, 0.2)',
                        border: '1px solid rgba(0, 255, 127, 0.4)',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        color: '#00ff7f',
                        fontWeight: '600'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Client Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                name: 'Con Edison',
                industry: 'Energy & Utilities',
                services: 'Power Platform Suite Implementation',
                technologies: ['Power Automate', 'Power BI', 'SharePoint']
              },
              {
                name: 'Pacific Jet Coast',
                industry: 'Aviation',
                services: 'Digital Transformation & Analytics',
                technologies: ['Power Platform', 'SharePoint', 'Power BI']
              },
              {
                name: 'Hach Company',
                industry: 'Technology',
                services: 'Content & Collaboration Services',
                technologies: ['SharePoint', 'SPFx Development']
              },
              {
                name: 'Next Level Medical Supply',
                industry: 'Healthcare',
                services: 'Complete CRM/ERP Solution',
                technologies: ['Dynamics 365', 'Power Platform']
              },
              {
                name: 'Blue Onyx Real Estate',
                industry: 'Real Estate',
                services: 'Business Process Automation',
                technologies: ['Power Automate', 'SharePoint']
              },
              {
                name: 'Resource Metrix',
                industry: 'Consulting',
                services: 'Enterprise Resource Planning',
                technologies: ['Dynamics 365', 'Power BI']
              },
              {
                name: 'SBR International GmbH',
                industry: 'Manufacturing',
                services: 'Global CRM Implementation',
                technologies: ['Dynamics 365', 'Power Platform']
              },
              {
                name: 'Tech Fabric',
                industry: 'Technology',
                services: 'End-to-End Digital Solutions',
                technologies: ['Dynamics 365', 'SharePoint']
              },
              {
                name: 'ViperaTech',
                industry: 'Software',
                services: 'CRM & Business Intelligence',
                technologies: ['Dynamics 365', 'Power BI']
              }
            ].map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '2rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.borderColor = 'rgba(0, 150, 255, 0.3)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 150, 255, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <h4 style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: '0.5rem'
                }}>
                  {client.name}
                </h4>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#00a6ff',
                  marginBottom: '1rem',
                  fontWeight: '600'
                }}>
                  {client.industry}
                </p>
                <p style={{
                  fontSize: '1rem',
                  color: '#b8b8b8',
                  marginBottom: '1.5rem',
                  lineHeight: 1.5
                }}>
                  {client.services}
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  {client.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '0.3rem 0.75rem',
                        background: 'rgba(0, 150, 255, 0.1)',
                        border: '1px solid rgba(0, 150, 255, 0.3)',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        color: '#00a6ff',
                        fontWeight: '500'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Client Success Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              marginTop: '4rem',
              background: 'linear-gradient(135deg, rgba(0, 150, 255, 0.05) 0%, rgba(0, 255, 127, 0.05) 100%)',
              borderRadius: '30px',
              padding: isMobile ? '2rem' : '3rem',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              Client Success Highlights
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
              gap: '2rem',
              textAlign: 'center'
            }}>
              {[
                { number: '10+', label: 'Enterprise Clients', color: '#00ff7f' },
                { number: '100%', label: 'Project Success Rate', color: '#00a6ff' },
                { number: '5+', label: 'Industries Served', color: '#ffd93d' },
                { number: '24/7', label: 'Support Available', color: '#ff6b6b' }
              ].map((stat, idx) => (
                <div key={idx}>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    color: stat.color,
                    marginBottom: '0.5rem',
                    textShadow: `0 0 20px ${stat.color}66`
                  }}>
                    {stat.number}
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    color: '#b8b8b8',
                    fontWeight: '500'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Meet Our Team Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%)',
          padding: isMobile ? '4rem 1rem' : '6rem 2rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Cloud Pattern Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0, 150, 255, 0.1) 35px, rgba(0, 150, 255, 0.1) 70px)`,
          pointerEvents: 'none'
        }} />

        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
              fontWeight: '700',
              marginBottom: '1rem',
              background: 'linear-gradient(90deg, #ffffff 0%, #00a6ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Meet Our Cloud Team
            </h2>
            <p style={{
              fontSize: '1.3rem',
              color: '#b8b8b8',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Expert architects building your cloud future
            </p>
          </motion.div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: isMobile ? '2rem 0' : '3rem 0'
          }}>
            {[
              {
                name: 'Shahzad Sarwar',
                role: 'Chief Cloud Solutions Architect',
                expertise: 'Enterprise Cloud Transformation',
                image: null,
                bio: 'Leading cloud transformation initiatives with expertise in Microsoft Dynamics 365, Power Platform, and enterprise architecture.',
                experience: '15+ years',
                certifications: ['Microsoft Certified', 'Azure Solutions Architect', 'Dynamics 365 Expert']
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '25px',
                  padding: isMobile ? '2rem' : '2.5rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 150, 255, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(0, 150, 255, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  }
                }}
                onClick={(e) => {
                  if (isMobile) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    setTimeout(() => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)';
                    }, 300);
                  }
                }}
              >
                {/* Cloud Icon Background */}
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '100px',
                  height: '100px',
                  opacity: 0.1
                }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ color: '#00a6ff' }}>
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
                  </svg>
                </div>

                {/* Profile Image */}
                <div style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  margin: '0 auto 1.5rem',
                  border: '3px solid #00a6ff',
                  position: 'relative',
                  background: 'linear-gradient(135deg, #00a6ff 0%, #0080ff 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {member.image ? (
                    <img 
                      src={member.image}
                      loading="lazy" 
                      alt={`${member.name} - ${member.role} | Cloud Services Expert at Softeefi UK`}
                      decoding="async"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div style={{
                      fontSize: '2.5rem',
                      fontWeight: '700',
                      color: '#ffffff',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      SS
                    </div>
                  )}
                </div>

                {/* Member Info */}
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '0.25rem',
                  color: '#ffffff',
                  textAlign: 'center'
                }}>
                  {member.name}
                </h3>

                <p style={{
                  fontSize: '1rem',
                  color: '#00a6ff',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  textAlign: 'center'
                }}>
                  {member.role}
                </p>

                <p style={{
                  fontSize: '0.85rem',
                  color: 'rgba(0, 166, 255, 0.8)',
                  marginBottom: '1rem',
                  textAlign: 'center',
                  fontStyle: 'italic'
                }}>
                  {member.expertise}
                </p>

                <p style={{
                  fontSize: '0.95rem',
                  color: '#b8b8b8',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  {member.bio}
                </p>

                {/* Experience & Certifications */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  alignItems: 'center'
                }}>
                  <span style={{
                    padding: '0.25rem 1rem',
                    background: 'rgba(0, 166, 255, 0.1)',
                    border: '1px solid rgba(0, 166, 255, 0.3)',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    color: '#00a6ff',
                    fontWeight: '600'
                  }}>
                    {member.experience}
                  </span>
                  
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                  }}>
                    {member.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '0.2rem 0.75rem',
                          background: 'rgba(0, 255, 127, 0.1)',
                          border: '1px solid rgba(0, 255, 127, 0.3)',
                          borderRadius: '15px',
                          fontSize: '0.75rem',
                          color: '#00ff7f',
                          fontWeight: '500'
                        }}
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Enhanced Final CTA Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="final-cta"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #0a0a0a 100%)',
          padding: isMobile ? '4rem 1rem' : '8rem 2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {!isMobile && (
          <Suspense fallback={null}>
            <FloatingParticles />
          </Suspense>
        )}
        
        {/* Gradient Orbs */}
        {!isMobile && (
          <>
            <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0, 150, 255, 0.3) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0, 255, 127, 0.3) 0%, transparent 70%)', filter: 'blur(120px)', pointerEvents: 'none' }} />
          </>
        )}
        
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: 'clamp(3rem, 6vw, 4rem)',
              fontWeight: '800',
              marginBottom: '2rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 50%, #00a6ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.2
            }}
          >
            Elevate Your Business Now
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ 
              fontSize: '1.4rem', 
              marginBottom: '3rem',
              color: '#b8b8b8',
              lineHeight: 1.6
            }}
          >
            Let's transform your operations with our cloud solutions. 
            Start your digital transformation journey today.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ 
              display: 'flex', 
              gap: isMobile ? '1rem' : '1.5rem', 
              justifyContent: 'center', 
              flexWrap: 'wrap',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              width: isMobile ? '100%' : 'auto',
              maxWidth: isMobile ? '400px' : 'none',
              margin: '0 auto'
            }}
          >
            <button 
              onClick={() => window.location.href = '/contact'} 
              className="cta-button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: isMobile ? '1.2rem 2.5rem' : '1.5rem 3.5rem',
                background: 'linear-gradient(135deg, #00ff7f 0%, #00a6ff 100%)',
                color: '#000000',
                fontWeight: '700',
                fontSize: isMobile ? '1rem' : '1.2rem',
                borderRadius: '50px',
                textDecoration: 'none',
                boxShadow: '0 15px 40px rgba(0, 255, 127, 0.3)',
                transition: 'all 0.4s ease',
                position: 'relative',
                overflow: 'hidden',
                border: 'none',
                cursor: 'pointer',
                width: isMobile ? '100%' : 'auto',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 255, 127, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 255, 127, 0.3)';
                }
              }}
            >
              Request a Consultation
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            
            <a 
              href="tel:+447417505744" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: isMobile ? '1.2rem 2.5rem' : '1.5rem 3.5rem',
                background: 'transparent',
                color: '#ffffff',
                fontWeight: '600',
                fontSize: isMobile ? '1rem' : '1.2rem',
                borderRadius: '50px',
                textDecoration: 'none',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.4s ease',
                width: isMobile ? '100%' : 'auto',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.borderColor = '#00ff7f';
                  e.currentTarget.style.color = '#00ff7f';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Call Us Now
            </a>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{ 
              fontSize: '1.1rem', 
              marginTop: '2rem', 
              color: '#808080'
            }}
          >
            No commitments. No obligations. Just solutions.
          </motion.p>
        </div>
      </motion.div>
      
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        * {
          box-sizing: border-box;
        }
        
        .cloud-services-page {
          scroll-behavior: smooth;
        }
        
        /* Mobile Optimizations */
        @media (max-width: 768px) {
          /* Hero Section Mobile */
          .hero-section {
            padding: 5rem 1rem 3rem !important;
          }
          
          .hero-section h1 {
            font-size: 2.5rem !important;
            margin-bottom: 1rem !important;
          }
          
          .hero-section p {
            font-size: 1.1rem !important;
            margin-bottom: 2rem !important;
          }
          
          .hero-cta {
            padding: 1rem 2rem !important;
            font-size: 1rem !important;
            width: 100%;
            justify-content: center;
          }
          
          /* Stats Section Mobile */
          .stats-section {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
            margin-bottom: 4rem !important;
          }
          
          .stat-card {
            padding: 2rem 1.5rem !important;
          }
          
          .stat-card svg {
            width: 36px !important;
            height: 36px !important;
          }
          
          .stat-card > div:nth-child(2) {
            font-size: 2.5rem !important;
          }
          
          /* Service Tabs Mobile */
          .service-tabs {
            gap: 0.5rem !important;
            margin-bottom: 2rem !important;
          }
          
          .service-tabs button {
            padding: 0.75rem 1.25rem !important;
            font-size: 0.95rem !important;
            border-radius: 25px !important;
          }
          
          .service-tabs button svg {
            width: 20px !important;
            height: 20px !important;
          }
          
          /* Service Content Mobile */
          .service-content {
            padding: 2rem 1.5rem !important;
            border-radius: 20px !important;
          }
          
          .service-content h3 {
            font-size: 1.5rem !important;
            margin-bottom: 1rem !important;
          }
          
          .service-content p {
            font-size: 1rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .service-content > div:nth-child(3) {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          
          .service-content > div:nth-child(3) > div {
            padding: 1rem !important;
            font-size: 0.95rem !important;
          }
          
          .service-content a {
            font-size: 1rem !important;
            padding: 0.75rem 1.5rem !important;
          }
          
          /* Portfolio Section Mobile */
          .portfolio-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          
          .portfolio-card {
            border-radius: 20px !important;
          }
          
          .portfolio-card > div:last-child {
            padding: 2rem 1.5rem !important;
          }
          
          .portfolio-card h3 {
            font-size: 1.3rem !important;
            margin-bottom: 1rem !important;
          }
          
          .portfolio-card p {
            font-size: 1rem !important;
            margin-bottom: 1rem !important;
          }
          
          .portfolio-card .project-link {
            font-size: 0.95rem !important;
            padding: 0.6rem 1.2rem !important;
          }
          
          /* Benefits Section Mobile */
          .benefits-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          
          .benefit-card {
            padding: 2rem !important;
          }
          
          .benefit-card svg {
            width: 36px !important;
            height: 36px !important;
          }
          
          .benefit-card h3 {
            font-size: 1.3rem !important;
          }
          
          .benefit-card p {
            font-size: 1rem !important;
          }
          
          /* Final CTA Section Mobile */
          .final-cta {
            padding: 4rem 1rem !important;
          }
          
          .final-cta h2 {
            font-size: 2.5rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .final-cta p {
            font-size: 1.1rem !important;
            margin-bottom: 2rem !important;
          }
          
          .cta-button {
            padding: 1.2rem 2.5rem !important;
            font-size: 1rem !important;
            width: 100%;
            justify-content: center;
          }
          
          /* Hide decorative elements on mobile to improve performance */
          .particles-container {
            display: none !important;
          }
          
          /* Section headings */
          h2 {
            font-size: 2rem !important;
          }
          
          /* General spacing adjustments */
          section {
            margin-bottom: 4rem !important;
          }
        }
        
        /* Tablet devices */
        @media (max-width: 1024px) and (min-width: 769px) {
          .hero-section h1 {
            font-size: 4rem !important;
          }
          
          .stats-container {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
          
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        /* Small mobile devices */
        @media (max-width: 480px) {
          .hero-section h1 {
            font-size: 2rem !important;
          }
          
          .hero-section p {
            font-size: 1rem !important;
          }
          
          .service-tabs {
            justify-content: flex-start !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
          
          .service-tabs::-webkit-scrollbar {
            display: none !important;
          }
          
          .service-tabs button {
            flex-shrink: 0 !important;
          }
          
          .stat-card > div:nth-child(2) {
            font-size: 2rem !important;
          }
        }
        
        /* Ensure touch-friendly interactions */
        @media (hover: none) {
          .hero-cta:active,
          .cta-button:active {
            transform: scale(0.98) !important;
          }
          
          .service-tabs button:active {
            transform: scale(0.95) !important;
          }
          
          .portfolio-card:active {
            transform: scale(0.98) !important;
          }
        }
        
        /* Performance optimizations */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
        
        /* Touch and scroll optimizations */
        .hero-cta,
        .cta-button,
        .service-tabs button,
        .portfolio-card {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Optimize rendering for mobile */
        @media (max-width: 768px) {
          .service-content,
          .portfolio-card,
          .stat-card {
            transform: translateZ(0);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
        }
      `}</style>
      
      {/* Project Details Modal */}
      {modalOpen && selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '1rem' : '2rem'
          }}
          onClick={closeModal}
        >
          {/* Navigation Buttons - Hide on mobile for swipe navigation */}
          {!isMobile && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreviousProject();
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: 'max(calc(50% - 500px - 50px), 20px)',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0, 255, 127, 0.1)',
                  border: '2px solid rgba(0, 255, 127, 0.3)',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#00ff7f',
                  fontSize: '24px',
                  zIndex: 10001
                }}
                aria-label="Previous project"
              >
                ←
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextProject();
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: 'max(calc(50% - 500px - 50px), 20px)',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0, 255, 127, 0.1)',
                  border: '2px solid rgba(0, 255, 127, 0.3)',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#00ff7f',
                  fontSize: '24px',
                  zIndex: 10001
                }}
                aria-label="Next project"
              >
                →
              </button>
            </>
          )}

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, type: 'spring' }}
            style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #0a0a0a 100%)',
              borderRadius: '20px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.3s ease',
                padding: '0',
                fontSize: '28px',
                color: '#ffffff',
                fontWeight: '300',
                fontFamily: 'Arial, sans-serif'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 77, 77, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(255, 77, 77, 0.5)';
                e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
                e.currentTarget.style.color = '#ff4d4d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.color = '#ffffff';
              }}
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div style={{
              padding: isMobile ? '2rem 1.5rem' : '3rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h2 style={{
                fontSize: isMobile ? '1.8rem' : '2.5rem',
                fontWeight: '700',
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #00ff7f 0%, #00a6ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {portfolioItems.find(item => item.id === selectedProject)?.title}
              </h2>
              <div style={{
                display: 'flex',
                gap: '2rem',
                flexWrap: 'wrap',
                color: '#b8b8b8'
              }}>
                <div>
                  <span style={{ color: '#00a6ff', fontWeight: '600' }}>Client: </span>
                  {projectDetails[selectedProject]?.client}
                </div>
                <div>
                  <span style={{ color: '#00a6ff', fontWeight: '600' }}>Duration: </span>
                  {projectDetails[selectedProject]?.duration}
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div style={{ padding: isMobile ? '1.5rem' : '3rem' }}>
              {/* Technologies */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: '#00ff7f',
                  marginBottom: '1rem'
                }}>
                  Technologies Used
                </h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  {projectDetails[selectedProject]?.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(0, 255, 127, 0.1)',
                        border: '1px solid rgba(0, 255, 127, 0.3)',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        color: '#00ff7f'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Challenges */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: '#ff6b6b',
                  marginBottom: '1rem'
                }}>
                  Challenges Faced
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: '#b8b8b8',
                  lineHeight: 1.8
                }}>
                  {projectDetails[selectedProject]?.challenges.map((challenge, idx) => (
                    <li key={idx} style={{
                      paddingLeft: '1.5rem',
                      position: 'relative',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: '#ff6b6b'
                      }}>▸</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: '#00a6ff',
                  marginBottom: '1rem'
                }}>
                  Solutions Implemented
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: '#b8b8b8',
                  lineHeight: 1.8
                }}>
                  {projectDetails[selectedProject]?.solutions.map((solution, idx) => (
                    <li key={idx} style={{
                      paddingLeft: '1.5rem',
                      position: 'relative',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: '#00a6ff'
                      }}>▸</span>
                      {solution}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results */}
              <div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: '#00ff7f',
                  marginBottom: '1rem'
                }}>
                  Key Results Achieved
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1rem'
                }}>
                  {projectDetails[selectedProject]?.detailedResults.map((result, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '1rem',
                        background: 'rgba(0, 255, 127, 0.05)',
                        border: '1px solid rgba(0, 255, 127, 0.2)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem'
                      }}
                    >
                      <span style={{ color: '#00ff7f', fontSize: '1.2rem' }}>✓</span>
                      <span style={{ color: '#b8b8b8', fontSize: '0.95rem' }}>{result}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div style={{
                marginTop: '3rem',
                textAlign: 'center'
              }}>
                <button
                  onClick={() => {
                    closeModal();
                    window.location.href = '/contact';
                  }}
                  style={{
                    padding: isMobile ? '1rem 2rem' : '1.2rem 3rem',
                    background: 'linear-gradient(135deg, #00ff7f 0%, #00a6ff 100%)',
                    color: '#000',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    borderRadius: '50px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 255, 127, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Start Your Project
                </button>
              </div>
            </div>
            
          </motion.div>
          
          {/* Instagram-style indicator dots for mobile - Fixed position */}
          {isMobile && portfolioItems.length > 1 && (
            <div style={{
              position: 'fixed',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '8px',
              padding: '8px 12px',
              background: 'rgba(0, 0, 0, 0.6)',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              zIndex: 10001
            }}>
              {portfolioItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    width: item.id === selectedProject ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: item.id === selectedProject ? '#00ff7f' : 'rgba(255, 255, 255, 0.5)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(item.id);
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CloudServices;