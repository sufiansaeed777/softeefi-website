import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';

// Debounce utility function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const AISolutions = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedUseCase, setExpandedUseCase] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showFullImage, setShowFullImage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [portfolioImageIndexes, setPortfolioImageIndexes] = useState({});
  const [isPaused, setIsPaused] = useState(false);

  // Portfolio projects array
  const portfolioProjects = [
    {
      title: 'Real-time Telegram Bot for Asset Analysis',
      client: 'Quadra Trading Platform',
      description: 'AI-powered Telegram bot providing real-time trading insights, P&L analysis, and asset recommendations through natural language queries',
      impact: 'Instant access to trading data, automated chart generation, 24/7 availability',
      tech: ['Docker Compose', 'OpenAI', 'Text-to-SQL', 'PostgreSQL', 'Multi-agent', 'Telegram Bot'],
      icon: 'chart',
      image: '/images/portfolio/telegram-bot-quadra.webp',
      problem: 'Traders needed quick access to real-time insights without logging into dashboards. Manual analysis was slow and interpreting raw data lacked clarity.',
      solution: 'Built a Telegram bot with real-time Quadra API integration, natural language processing, SQL query generation, interactive charts, and multi-agent asset recommendations.'
    },
    {
      title: 'Faber: AI Fitness Workout App',
      client: 'Faber AI',
      description: 'Smart fitness trainer app with AI-driven personalized workouts, body composition tracking, and nutrition planning all in one solution',
      impact: 'Personalized fitness plans, visual progress tracking, integrated nutrition guidance',
      tech: ['OpenAI', 'Multi-agent', 'FastAPI', 'MongoDB', 'Python', 'NLP', 'Computer Vision', 'Swift'],
      icon: 'fitness',
      image: '/images/portfolio/faber-ai.webp',
      problem: 'Users wanted a smart fitness trainer app that adapts to their goals and progress. Existing apps lacked personalization, visual feedback, and integration of nutrition planning.',
      solution: 'AI-driven workout plans for muscle growth/fat loss, workout adaptation based on progress, exercise library with videos, body composition tracking via images, custom meal recommendations, and intelligent progress tracking.'
    },
    {
      title: 'Trading with Mohamad – AI-Powered Forex Platform',
      client: 'Trading with Mohamad',
      description: 'Multilingual Forex trading platform with AI chatbot, real-time signals, market insights, and advanced charting tools for Arabic and English users',
      impact: 'Centralized trading interface, real-time recommendations, multilingual support, integrated payments',
      tech: ['Next.js', 'FastAPI', 'MongoDB', 'OpenAI', 'Multi-agent', 'Telegram Bot', 'Payments (Qatar bank)', 'Chart analysis', 'Docker/Docker Compose'],
      icon: 'trading',
      image: '/images/portfolio/trading-mohamad-main.webp',
      problem: 'The trading platform needed a modern web presence and chatbot for real-time trade recommendations. Users lacked a centralized interface for live signals, market insights, and account management with Qatari banking integration.',
      solution: 'Full-site build with Next.js supporting English/Arabic, FastAPI backend with MongoDB, OpenAI-powered multilingual chatbot, real-time trade data via API, embedded chart analysis, user authentication, Qatari bank payment gateway, and multi-agent orchestration for trade tips.',
      additionalImages: [
        '/images/portfolio/trading-mohamad/screen-2.webp',
        '/images/portfolio/trading-mohamad/screen-3.webp',
        '/images/portfolio/trading-mohamad/screen-4.webp',
        '/images/portfolio/trading-mohamad/screen-5.webp',
        '/images/portfolio/trading-mohamad/screen-6.webp'
      ]
    },
    {
      title: 'iboothme Marketing Chatbot',
      client: 'iboothme',
      description: 'AI-powered chatbot for automated email and presentation generation, streamlining marketing workflows with real-time product data and pricing',
      impact: 'Reduced manual work, faster response times, consistent communication, automated pricing calculations',
      tech: ['Next.js', 'Python', 'OpenAI', 'Multi-agent', 'Function Calling', 'PostgreSQL', 'FastAPI', 'Node.js', 'DigitalOcean'],
      icon: 'email',
      image: '/images/portfolio/iboothme-main.webp',
      problem: 'Marketing team was spending too much time manually preparing quotation emails and presentations. Each request required pulling product data, calculating totals, adding links, and formatting messages, creating inconsistency.',
      solution: 'Built chatbot with Next.js frontend and Python/OpenAI backend, multi-agent setup with function calling for real-time product data, auto-calculates pricing, generates professional slide decks, admin dashboard for updates, model fine-tuning with human feedback, deployed on DigitalOcean.',
      additionalImages: [
        '/images/portfolio/iboothme/screen-2.webp',
        '/images/portfolio/iboothme/screen-3.webp',
        '/images/portfolio/iboothme/screen-4.webp',
        '/images/portfolio/iboothme/screen-5.webp'
      ]
    }
  ];

  const heroRef = useRef(null);
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 1000], [0, -300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.8]);
  
  // Mouse tracking for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 30 });


  useEffect(() => {
    // SEO Optimization for AI Services, Solutions & Automation Keywords
    document.title = 'AI Agents & RAG Systems UK | Multi-Agent AI Solutions - Softeefi';
    
    // Set meta description with AI solutions and services keywords
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Expert AI agents development company UK. Build multi-agent systems, RAG (Retrieval Augmented Generation) applications, autonomous AI agents, and LangChain solutions. Custom AI agents, multi-agent orchestration, vector databases, and enterprise AI automation.';
    } else {
      const newMetaDesc = document.createElement('meta');
      newMetaDesc.name = 'description';
      newMetaDesc.content = 'Expert AI agents development company UK. Build multi-agent systems, RAG (Retrieval Augmented Generation) applications, autonomous AI agents, and LangChain solutions. Custom AI agents, multi-agent orchestration, vector databases, and enterprise AI automation.';
      document.head.appendChild(newMetaDesc);
    }
    
    // Add meta keywords - includes AI services and automation terms
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'ai chatbot for business, ai chatbot uk, chatgpt for website, chatgpt integration uk, ai customer service, ai customer support, build ai chatbot, create ai assistant, ai for small business, ai for business uk, artificial intelligence solutions, ai automation for business, automate my business, business automation uk, save time with ai, reduce costs with ai, ai chat widget, website chatbot, 24/7 customer support ai, ai virtual assistant, ai personal assistant, ai sales assistant, ai support agent, ai help desk, ai chat support, custom ai chatbot, ai chatbot development, ai chatbot builder, chatbot for website uk, chatbot for wordpress, chatbot for shopify, whatsapp ai chatbot, telegram ai bot, facebook messenger chatbot, ai live chat, ai chat integration, openai integration, claude integration, gpt-4 integration, ai api integration, train ai on my data, ai with my documents, ai knowledge base, ai that knows my business, personalized ai, custom trained ai, ai agents, ai agents uk, multi agent systems, multi-agent ai, autonomous ai agents, ai agent development, build ai agents, custom ai agents, enterprise ai agents, ai agent framework, langchain agents, autogen agents, crew ai, ai agent orchestration, multi agent orchestration, agent swarm, ai agent platform, rag systems, rag ai, retrieval augmented generation, rag applications, rag development, rag implementation, vector database, pinecone, chromadb, weaviate, rag pipeline, rag architecture, rag chatbot, rag llm, langchain rag, llamaindex, semantic search, embeddings, vector embeddings, ai knowledge base, document ai, hybrid search, multi agent rag, agentic rag, ai agents rag, multi-agent systems uk, autonomous agents uk, ai orchestration uk, agent development uk, rag systems uk, rag development uk, vector database uk, n8n, n8n automation, n8n workflow, n8n integration, n8n uk, n8n developer, n8n expert, n8n consultant, n8n ai, n8n chatbot, n8n api, n8n webhook, n8n custom nodes, n8n self hosted, n8n cloud, n8n zapier alternative, n8n make alternative, n8n workflow automation, n8n business automation, n8n process automation, workflow automation, workflow automation uk, business process automation, no code automation, low code automation, automation workflow, zapier, make.com, integromat, activepieces, automatisch, windmill, pipedream, workflow builder, api integration, webhook automation, data pipeline, etl automation, ipaas, integration platform, automation platform, process orchestration, task automation, robotic process automation, rpa, hyperautomation, intelligent automation uk, automation consulting, automation development, workflow optimization, business automation uk, enterprise automation, automation as a service, workflow management, process mining, workflow design, automation strategy, affordable ai solutions, ai solution cost, ai chatbot pricing, how much does ai cost, ai implementation cost uk';
    
    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://softeefi.co.uk/services/ai-solutions';
    
    // Add Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'AI Agents & RAG Systems UK | Multi-Agent Development Company - Softeefi' },
      { property: 'og:description', content: 'Expert AI agents and RAG systems development UK. Build autonomous multi-agent systems, RAG applications with vector databases, LangChain agents, and enterprise AI orchestration. Leading multi-agent AI and retrieval augmented generation solutions.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://softeefi.co.uk/services/ai-solutions' },
      { property: 'og:image', content: 'https://softeefi.co.uk/images/ai-automation-og.jpg' }
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
    
    // Add structured data for AI automation services
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
              "name": "AI Solutions",
              "item": "https://softeefi.co.uk/services/ai-solutions"
            }
          ]
        },
        {
          "@type": "Service",
          "name": "AI Services & Solutions",
          "description": "Professional AI services company offering custom AI development, chatbot creation services, AI chatbot builder solutions, machine learning, WhatsApp/Telegram bot development, AI consulting, and intelligent automation services for businesses",
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
            "name": "AI Services & Solutions",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Custom AI Development Services",
                  "description": "Bespoke AI services and solutions tailored to your business needs"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "AI Chatbot Creation & Development Services",
                  "description": "Professional chatbot creation services - Build custom AI chatbots for WhatsApp, Telegram, websites. AI chatbot builder with NLP, conversational AI, and machine learning. Enterprise chatbot development UK"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Machine Learning Services",
                  "description": "Advanced ML models and predictive analytics for data-driven insights"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "AI Consulting Services",
                  "description": "Expert AI strategy consulting and implementation guidance"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Generative AI Solutions",
                  "description": "GPT and generative AI integration for content and automation"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "AI Automation Services",
                  "description": "Intelligent process automation and workflow optimization with AI"
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
              "name": "What are AI services?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "AI services encompass a range of artificial intelligence solutions including machine learning, natural language processing, computer vision, predictive analytics, and automation. Our AI services company provides custom development, consulting, and integration to help businesses leverage AI technology."
              }
            },
            {
              "@type": "Question",
              "name": "What is AI automation?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "AI automation combines artificial intelligence with automation technologies to create intelligent systems that can learn, adapt, and make decisions. Our AI automation services help businesses implement these solutions for improved efficiency and growth."
              }
            },
            {
              "@type": "Question",
              "name": "How much do AI services cost?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "AI services costs vary based on project complexity, from £5,000 for basic chatbots to £100,000+ for enterprise AI solutions. Our AI development services offer flexible pricing models including project-based, retainer, and partnership options."
              }
            },
            {
              "@type": "Question",
              "name": "What AI services does your company offer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We offer comprehensive AI services including custom AI development, chatbot creation, machine learning models, computer vision, NLP solutions, predictive analytics, AI consulting, and intelligent automation. Our team specializes in GPT integration and generative AI applications."
              }
            },
            {
              "@type": "Question",
              "name": "How to choose an AI services company?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "When selecting an AI services company, consider their portfolio, technical expertise, industry experience, and support offerings. Look for companies that provide custom AI solutions, have proven success stories, and offer ongoing maintenance and optimization."
              }
            },
            {
              "@type": "Question",
              "name": "How to make money with AI automation?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "AI automation creates revenue opportunities through improved efficiency, reduced costs, new service offerings, and enhanced customer experiences. Our AI services help businesses identify and implement profitable AI strategies for growth."
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
      document.title = 'Softeefi - Web Development, AI & Digital Marketing Services';
      if (metaDescription) {
        metaDescription.content = 'Professional web development, AI solutions, digital marketing, and cloud services to transform your business';
      }
    };
    
    setIsVisible(true);
    window.scrollTo(0, 0);
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    
    // Debounced resize handler
    const debouncedCheckMobile = debounce(checkMobile, 250);
    window.addEventListener('resize', debouncedCheckMobile);
    
    const handleMouseMove = (e) => {
      if (containerRef.current && !isMobile) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
        mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
      }
    };
    
    // Auto-progress through process steps
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', debouncedCheckMobile);
      clearInterval(interval);
    };
  }, [mouseX, mouseY, isMobile]);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProject]);

  // Auto-rotate images for projects with multiple images
  useEffect(() => {
    if (selectedProject && selectedProject.additionalImages && selectedProject.additionalImages.length > 0) {
      const allImages = [selectedProject.image, ...selectedProject.additionalImages];
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval);
    }
  }, [selectedProject]);

  // Auto-rotate portfolio card images
  useEffect(() => {
    // Create intervals for projects with additional images
    const interval = setInterval(() => {
      setPortfolioImageIndexes(prev => {
        const newIndexes = { ...prev };
        
        // Trading with Mohamad (index 2) - 6 total images
        if (!newIndexes[2]) newIndexes[2] = 0;
        newIndexes[2] = (newIndexes[2] + 1) % 6;
        
        // iboothme (index 3) - 5 total images  
        if (!newIndexes[3]) newIndexes[3] = 0;
        newIndexes[3] = (newIndexes[3] + 1) % 5;
        
        return newIndexes;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      id: 'ai-agents',
      title: 'AI Agents & Multi-Agent Systems',
      description: 'Autonomous AI agents that handle complex tasks, collaborate in teams, and work 24/7 without supervision. Perfect integration with our cloud infrastructure and web applications.',
      features: ['Customer Support Agents', 'Sales & Lead Generation', 'Research & Analysis Bots', 'Workflow Automation'],
      metrics: { efficiency: '+90%', availability: '24/7', tasks: '∞' },
      relatedServices: ['/services/cloud-infrastructure', '/services/websites-and-apps']
    },
    {
      id: 'rag-systems',
      title: 'RAG & Knowledge Systems',
      description: 'Retrieval-Augmented Generation for accurate, context-aware AI that uses your company data',
      features: ['Document Q&A Systems', 'Knowledge Base Integration', 'Real-time Data Retrieval', 'Custom Training on Your Data'],
      metrics: { accuracy: '92%', sources: '100+', response: '<3s' }
    },
    {
      id: 'automation',
      title: 'Intelligent Automation',
      description: 'End-to-end business process automation using AI to handle repetitive tasks and complex workflows',
      features: ['Email & Communication Auto-responders', 'Data Entry & Processing', 'Report Generation', 'Task Scheduling & Management'],
      metrics: { time_saved: '40%', errors: '-85%', ROI: '150%' }
    },
    {
      id: 'voice-conversational',
      title: 'Voice & Conversational AI',
      description: 'Natural language interfaces for apps and websites - chatbots, voice assistants, and AI companions',
      features: ['Custom ChatGPT Integration', 'Voice-Enabled Applications', 'Multi-language Support', 'Sentiment Analysis'],
      metrics: { languages: '25+', uptime: '99.5%', users: '500+' }
    }
  ];

  const processSteps = [
    { 
      phase: 'Analysis', 
      description: 'Deep dive into your data and business objectives',
      duration: '1-2 weeks',
      deliverables: ['Data Audit', 'Feasibility Report', 'AI Strategy']
    },
    { 
      phase: 'Architecture', 
      description: 'Design scalable AI infrastructure and model selection',
      duration: '2-3 weeks',
      deliverables: ['System Design', 'Model Selection', 'Infrastructure Plan']
    },
    { 
      phase: 'Development', 
      description: 'Build and train custom AI models with your data',
      duration: '4-8 weeks',
      deliverables: ['Trained Models', 'API Integration', 'Testing Suite']
    },
    { 
      phase: 'Deployment', 
      description: 'Launch AI solutions with monitoring and optimization',
      duration: '1-2 weeks',
      deliverables: ['Production Deploy', 'Monitoring Setup', 'Documentation']
    }
  ];

  const stats = [
    { label: 'Projects Delivered', value: '15+', trend: '+3' },
    { label: 'Accuracy Rate', value: '94%', trend: '+5%' },
    { label: 'Processing Speed', value: '<300ms', trend: '-50ms' },
    { label: 'Client Satisfaction', value: '95%', trend: '+8%' }
  ];

  return (
    <div ref={containerRef} style={{
      minHeight: '100vh',
      background: '#000000',
      color: '#ffffff',
      overflow: 'hidden',
      position: 'relative',
      marginTop: '-90px'
    }}>
      {/* Minimalist Grid Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(0, 255, 127, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 127, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: isMobile ? '50px 50px' : '100px 100px',
        pointerEvents: 'none',
        opacity: isMobile ? 0.3 : 0.5
      }} />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{
          minHeight: isMobile ? '110vh' : '105vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          opacity,
          scale,
          paddingTop: isMobile ? '0px' : '60px',
          marginTop: isMobile ? '-70px' : '0',
          overflow: 'hidden'
        }}
      >
        {/* Green Hand Image Covering Full Hero */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#000000',
          zIndex: 0
        }}>
          <img
            src={isMobile ? "/images/phone-hand-black-mobile.webp" : "/images/hand-green.webp"}
            alt="AI Technology"
            style={{
              position: 'absolute',
              top: isMobile ? '5%' : '0',
              left: 0,
              width: '100%',
              height: isMobile ? '100%' : '100%',
              objectFit: isMobile ? 'contain' : 'cover',
              objectPosition: isMobile ? 'center' : 'center',
              opacity: isMobile ? 0.5 : 0.4
            }}
          />
        </div>

        {/* Animated Neural Network Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 1
        }}>

          {/* Neural Connections */}
          <svg style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0.1
          }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ff7f" stopOpacity="0" />
                <stop offset="50%" stopColor="#00ff7f" stopOpacity="1" />
                <stop offset="100%" stopColor="#00ff7f" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[...Array(isMobile ? 8 : 15)].map((_, i) => (
              <motion.line
                key={i}
                x1={`${(i * 13) % 100}%`}
                y1={`${(i * 17) % 100}%`}
                x2={`${((i + 5) * 13) % 100}%`}
                y2={`${((i + 5) * 17) % 100}%`}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{
                  duration: 5,
                  delay: i * 0.3,
                  repeat: Infinity
                }}
              />
            ))}
          </svg>
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            textAlign: 'center',
            zIndex: 2,
            padding: '2rem',
            maxWidth: '1200px',
            width: '100%'
          }}
        >
          {/* Matrix Code Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              position: isMobile ? 'absolute' : 'fixed',
              top: isMobile ? '110%' : '20%',
              left: isMobile ? '50%' : '20%',
              transform: isMobile ? 'translate(-50%, -50%)' : 'none',
              height: isMobile ? '60px' : '120px',
              width: isMobile ? '150px' : '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: isMobile ? 0.95 : 0.6,
              zIndex: 3,
              pointerEvents: 'none'
            }}
          >
            {/* Code Rain Effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: 'hidden',
              opacity: 0.8
            }}>
              {[...Array(isMobile ? 8 : 15)].map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${i * 20}px`,
                    top: 0,
                    fontSize: '14px',
                    fontFamily: 'monospace',
                    color: '#00ff7f',
                    textShadow: '0 0 10px rgba(0, 255, 127, 0.5)',
                    lineHeight: 1.2
                  }}
                  animate={{
                    y: ['-100%', '120px'],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "linear"
                  }}
                >
                  {['AI', '01', 'ML', '10', 'GPT', '11', 'RAG', '00'][Math.floor(Math.random() * 8)]}
                </motion.div>
              ))}
            </div>

            {/* Central Text */}
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                fontSize: isMobile ? '2rem' : '3rem',
                fontWeight: '900',
                color: '#00ff7f',
                textShadow: `
                  0 0 20px rgba(0, 255, 0, 0.8),
                  0 0 40px rgba(0, 255, 0, 0.5),
                  0 0 60px rgba(0, 255, 0, 0.3)
                `,
                letterSpacing: '0.2em',
                fontFamily: 'monospace',
                position: 'relative',
                zIndex: 2
              }}
            >
              {'<AI/>'}
            </motion.div>
          </motion.div>

          <motion.h1
            style={{
              fontSize: isMobile ? 'clamp(2rem, 7vw, 3.5rem)' : 'clamp(3rem, 10vw, 8rem)',
              fontWeight: '900',
              marginBottom: isMobile ? '2rem' : '1rem',
              letterSpacing: '-0.05em',
              lineHeight: 0.9,
              transform: isMobile ? 'translateY(-30px)' : 'none'
            }}
          >
            <span style={{
              color: '#FFFFFF',
              textShadow: '0 0 30px rgba(255, 255, 255, 0.5)'
            }}>
              Artificial
            </span>
            <br />
            <span style={{
              color: '#00ff7f',
              textShadow: '0 0 20px rgba(0, 255, 127, 0.4)'
            }}>
              Intelligence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: isMobile ? '1.1rem' : '1.5rem',
              color: '#ffffff',
              marginBottom: isMobile ? '3rem' : '3rem',
              marginTop: isMobile ? '-1rem' : '0',
              fontWeight: '300',
              letterSpacing: '0.02em',
              padding: isMobile ? '0 1rem' : '0',
              transform: isMobile ? 'translateY(-60px)' : 'none'
            }}
          >
            AI Agents • RAG Systems • Automation • Voice AI
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '0.75rem' : '2rem',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: isMobile ? '-1rem' : '0',
              transform: isMobile ? 'translateY(-60px)' : 'none',
              width: isMobile ? '100%' : 'auto',
              padding: isMobile ? '0 1rem' : '0'
            }}
          >
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: isMobile ? '0.9rem 1.5rem' : '1.25rem 3rem',
                background: '#00ff7f',
                color: '#000000',
                fontWeight: '700',
                fontSize: isMobile ? '1rem' : '1.1rem',
                borderRadius: '100px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                border: '2px solid #00ff7f',
                boxShadow: '0 10px 30px rgba(0, 255, 127, 0.3)',
                width: isMobile ? '90%' : 'auto',
                maxWidth: isMobile ? '320px' : 'none',
                minHeight: '48px',
                whiteSpace: 'nowrap'
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>Start Your AI Journey</span>
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(255, 255, 255, 0.2)',
                  transformOrigin: 'center'
                }}
                initial={{ scale: 0 }}
                whileHover={{ scale: 2 }}
                transition={{ duration: 0.4 }}
              />
            </motion.a>

            <motion.a
              href="#services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: isMobile ? '0.9rem 1.5rem' : '1.25rem 3rem',
                background: 'transparent',
                color: '#ffffff',
                fontWeight: '600',
                fontSize: isMobile ? '1rem' : '1.1rem',
                borderRadius: '100px',
                textDecoration: 'none',
                border: '2px solid #FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                width: isMobile ? '90%' : 'auto',
                maxWidth: isMobile ? '320px' : 'none',
                minHeight: '48px',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00ff7f';
                e.currentTarget.style.color = '#00ff7f';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              Explore Solutions
            </motion.a>
          </motion.div>
        </motion.div>

      </motion.section>

      {/* Services Section - Minimalist Cards */}
      <section id="services" style={{
        padding: isMobile ? '3rem 1rem' : '8rem 2rem',
        position: 'relative',
        background: 'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.95) 100%)'
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '1400px',
            margin: '0 auto'
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: isMobile ? 'clamp(2rem, 5vw, 3rem)' : 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: '900',
              textAlign: 'center',
              marginBottom: '5rem',
              letterSpacing: '-0.03em'
            }}
          >
            <span style={{ color: '#888888' }}>Our</span>{' '}
            <span style={{
              color: '#00ff7f',
              textShadow: '0 0 20px rgba(0, 255, 127, 0.5)'
            }}>
              AI Solutions
            </span>
          </motion.h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: isMobile ? '1.5rem' : '2rem'
          }}>
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={!isMobile ? () => setActiveService(service.id) : undefined}
                onMouseLeave={!isMobile ? () => setActiveService(null) : undefined}
                onClick={isMobile ? () => setActiveService(activeService === service.id ? null : service.id) : undefined}
                style={{
                  background: activeService === service.id 
                    ? 'rgba(0, 255, 0, 0.1)' 
                    : '#000000',
                  border: '2px solid',
                  borderColor: activeService === service.id 
                    ? '#00ff7f' 
                    : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '24px',
                  padding: isMobile ? '2rem' : '3rem',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeService === service.id 
                    ? '0 0 30px rgba(0, 255, 127, 0.2)' 
                    : 'none'
                }}
              >
                {/* Service Number */}
                <motion.div 
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: activeService === service.id ? 1.2 : 1,
                    rotate: activeService === service.id ? 5 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    top: isMobile ? '1.5rem' : '2rem',
                    right: isMobile ? '1.5rem' : '2rem',
                    fontSize: isMobile ? '2.5rem' : '5rem',
                    fontWeight: '900',
                    color: activeService === service.id ? 'rgba(0, 255, 0, 0.2)' : 'rgba(0, 255, 0, 0.1)',
                    lineHeight: 1,
                    transition: 'color 0.3s ease'
                  }}
                >
                  0{index + 1}
                </motion.div>

                {/* Service Content */}
                <h3 style={{
                  fontSize: isMobile ? '1.3rem' : '2rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: activeService === service.id ? '#00ff7f' : '#FFFFFF',
                  textShadow: activeService === service.id ? '0 0 20px #00ff7f' : 'none',
                  transition: 'color 0.3s ease'
                }}>
                  {service.title}
                </h3>

                <p style={{
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '2rem',
                  lineHeight: 1.6
                }}>
                  {service.description}
                </p>

                {/* Desktop hover indicator */}
                {!isMobile && activeService !== service.id && (
                  <motion.div
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'rgba(0, 255, 127, 0.6)',
                      fontSize: '0.9rem',
                      marginBottom: '1rem'
                    }}
                  >
                    <svg 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
                    </svg>
                    <span>Hover for features & metrics</span>
                  </motion.div>
                )}

                {/* Mobile tap indicator */}
                {isMobile && activeService !== service.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#00ff7f',
                      fontSize: '0.9rem',
                      marginBottom: '1rem'
                    }}
                  >
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M10 9.5 L8 12 L10 14.5" />
                      <path d="M14 9.5 L16 12 L14 14.5" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span>Tap for details</span>
                  </motion.div>
                )}

                {/* Features */}
                <AnimatePresence>
                  {activeService === service.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div style={{
                        borderTop: '1px solid rgba(0, 255, 0, 0.2)',
                        paddingTop: '1.5rem',
                        marginTop: '1.5rem'
                      }}>
                        {service.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            style={{
                              padding: '0.5rem 0',
                              color: 'rgba(255, 255, 255, 0.8)',
                              fontSize: '0.95rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem'
                            }}
                          >
                            <div style={{
                              width: '20px',
                              height: '1px',
                              background: '#00ff7f'
                            }} />
                            {feature}
                          </motion.div>
                        ))}

                        {/* Metrics */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                          gap: isMobile ? '0.5rem' : '1rem',
                          marginTop: isMobile ? '1.5rem' : '2rem'
                        }}>
                          {Object.entries(service.metrics).map(([key, value], idx) => (
                            <motion.div
                              key={key}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3 + idx * 0.1, type: "spring" }}
                              style={{
                                textAlign: 'center'
                              }}
                            >
                              <div style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#00ff7f'
                              }}>
                                {value}
                              </div>
                              <div style={{
                                fontSize: '0.8rem',
                                color: 'rgba(255, 255, 255, 0.5)',
                                textTransform: 'capitalize'
                              }}>
                                {key}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Portfolio Section */}
      <section style={{
        padding: isMobile ? '3rem 1rem' : '8rem 2rem',
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.95) 0%, #000000 100%)'
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '1400px',
            margin: '0 auto'
          }}
        >
          <h2 style={{
            fontSize: isMobile ? 'clamp(1.75rem, 7vw, 2.5rem)' : 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: '900',
            textAlign: 'center',
            marginBottom: isMobile ? '3rem' : '5rem',
            letterSpacing: '-0.03em'
          }}>
            <span style={{ color: '#888888' }}>Our AI</span>{' '}
            <span style={{
              color: '#00ff7f',
              textShadow: '0 0 20px rgba(0, 255, 127, 0.5)'
            }}>
              Portfolio
            </span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: isMobile ? '1.5rem' : '2rem'
          }}>
            {portfolioProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  padding: isMobile ? '1.5rem' : '2.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={!isMobile ? (e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 0, 0.3)';
                  e.currentTarget.style.background = 'rgba(0, 255, 0, 0.02)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 127, 0.2)';
                } : undefined}
                onMouseLeave={!isMobile ? (e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.boxShadow = 'none';
                } : undefined}
              >
                {/* Project Image or Icon */}
                {project.image ? (
                  <div style={{
                    width: '100%',
                    height: '200px',
                    marginBottom: '1.5rem',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(0, 255, 127, 0.2)',
                    position: 'relative'
                  }}>
                    {(() => {
                      const allImages = project.additionalImages 
                        ? [project.image, ...project.additionalImages]
                        : [project.image];
                      const currentIndex = portfolioImageIndexes[index] || 0;
                      const currentImage = allImages[currentIndex] || project.image;
                      
                      return (
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={currentImage}
                            src={currentImage}
                            alt={project.title}
                            loading="lazy"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              position: 'absolute',
                              top: 0,
                              left: 0
                            }}
                          />
                        </AnimatePresence>
                      );
                    })()}
                  </div>
                ) : (
                  <div style={{
                    width: '60px',
                    height: '60px',
                    marginBottom: '1.5rem',
                    color: '#00ff7f'
                  }}>
                    {project.icon === 'chart' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="20" x2="12" y2="10"/>
                        <line x1="18" y1="20" x2="18" y2="4"/>
                        <line x1="6" y1="20" x2="6" y2="16"/>
                      </svg>
                    )}
                    {project.icon === 'fitness' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                        <path d="M6 11V8"/>
                        <path d="M18 11V8"/>
                        <path d="M8 8h8"/>
                      </svg>
                    )}
                    {project.icon === 'trading' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7"/>
                        <path d="M3 12h18"/>
                        <path d="M12 5v7"/>
                        <path d="M16 16l2 2 4-4"/>
                      </svg>
                    )}
                    {project.icon === 'email' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                        <path d="m22 7-10 5L2 7"/>
                      </svg>
                    )}
                    {project.icon === 'car' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM15 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"/>
                        <path d="M5 17H3v-6l2-5h14l2 5v6h-2"/>
                        <path d="M9 17h6"/>
                        <path d="M10 6h4"/>
                      </svg>
                    )}
                    {project.icon === 'scale' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/>
                        <path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/>
                        <path d="M12 3v18"/>
                        <path d="M19 6H5"/>
                        <path d="M12 3l-2 3h4l-2-3z"/>
                      </svg>
                    )}
                    {project.icon === 'health' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                      </svg>
                    )}
                    {project.icon === 'shopping' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                      </svg>
                    )}
                    {project.icon === 'code' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6"/>
                        <polyline points="8 6 2 12 8 18"/>
                      </svg>
                    )}
                    {project.icon === 'writing' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                      </svg>
                    )}
                  </div>
                )}

                <h3 style={{
                  fontSize: isMobile ? '1.25rem' : '1.5rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  color: '#ffffff'
                }}>
                  {project.title}
                </h3>

                <p style={{
                  fontSize: '0.9rem',
                  color: '#00ff7f',
                  marginBottom: '1rem',
                  fontWeight: '600'
                }}>
                  {project.client}
                </p>

                <p style={{
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '1.5rem',
                  lineHeight: 1.6
                }}>
                  {project.description}
                </p>

                {/* Impact Metrics */}
                <div style={{
                  background: 'rgba(0, 255, 0, 0.05)',
                  border: '1px solid rgba(0, 255, 0, 0.2)',
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#00ff7f',
                    marginBottom: '0.25rem',
                    fontWeight: '600'
                  }}>
                    IMPACT
                  </div>
                  <div style={{
                    fontSize: '0.95rem',
                    color: 'rgba(255, 255, 255, 0.9)'
                  }}>
                    {project.impact}
                  </div>
                </div>

                {/* Tech Stack */}
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap'
                }}>
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '0.25rem 0.75rem',
                        background: 'rgba(0, 255, 0, 0.1)',
                        border: '1px solid rgba(0, 255, 0, 0.2)',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        color: '#00ff7f'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Click to View Details Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    marginTop: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    color: 'rgba(0, 255, 127, 0.6)',
                    fontSize: '0.9rem'
                  }}
                >
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                    <path d="M11 8v6M8 11h6"/>
                  </svg>
                  <span>Click to view full details</span>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* View More Projects CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            style={{
              textAlign: 'center',
              marginTop: isMobile ? '3rem' : '4rem'
            }}
          >
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: isMobile ? '1rem 2rem' : '1.25rem 3rem',
                  background: 'transparent',
                  color: '#00ff7f',
                  fontWeight: '600',
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  borderRadius: '100px',
                  border: '2px solid #00ff7f',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Discuss Your AI Project →
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Portfolio Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.95)',
                zIndex: 1000
              }}
            />
            
            {/* Modal Container */}
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1001,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isMobile ? '1rem' : '2rem',
              pointerEvents: 'none'
            }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#000000',
                border: '2px solid rgba(0, 255, 0, 0.3)',
                borderRadius: '24px',
                maxWidth: '1000px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                pointerEvents: 'auto'
              }}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '2px solid #ffffff',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <span style={{
                  fontSize: '20px',
                  color: '#000000',
                  fontWeight: 'bold',
                  lineHeight: 1
                }}>×</span>
              </motion.button>

              {/* Project Image */}
              {selectedProject.image && (
                <div 
                  onClick={() => setShowFullImage(true)}
                  style={{
                    width: '100%',
                    height: isMobile ? '250px' : '400px',
                    overflow: 'hidden',
                    borderRadius: '24px 24px 0 0',
                    position: 'relative',
                    cursor: 'zoom-in'
                  }}
                >
                  {(() => {
                    const allImages = selectedProject.additionalImages 
                      ? [selectedProject.image, ...selectedProject.additionalImages]
                      : [selectedProject.image];
                    const currentImage = allImages[currentImageIndex] || selectedProject.image;
                    
                    return (
                      <>
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={currentImage}
                            src={currentImage}
                            alt={selectedProject.title}
                            loading="lazy"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              position: 'absolute',
                              top: 0,
                              left: 0
                            }}
                          />
                        </AnimatePresence>
                        
                        {/* Image dots indicator */}
                        {allImages.length > 1 && (
                          <div style={{
                            position: 'absolute',
                            bottom: '1rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: '6px',
                            zIndex: 5
                          }}>
                            {allImages.map((_, idx) => (
                              <div
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentImageIndex(idx);
                                }}
                                style={{
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  background: idx === currentImageIndex ? '#00ff7f' : 'rgba(255, 255, 255, 0.4)',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease',
                                  transform: idx === currentImageIndex ? 'scale(1.2)' : 'scale(1)'
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </>
                    );
                  })()}
                  
                  {/* Always visible indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      right: '1rem',
                      background: 'rgba(0, 0, 0, 0.8)',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      border: '1px solid rgba(0, 255, 127, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#00ff7f',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      pointerEvents: 'none',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                      <path d="M11 8v6M8 11h6"/>
                    </svg>
                    <span>Click to view full image</span>
                  </motion.div>
                  
                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none'
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{
                        background: 'rgba(0, 255, 127, 0.9)',
                        padding: '1.5rem',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 30px rgba(0, 255, 127, 0.5)'
                      }}
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.35-4.35"/>
                        <path d="M11 8v6M8 11h6"/>
                      </svg>
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {/* Project Details */}
              <div style={{
                padding: isMobile ? '2rem 1.5rem' : '3rem'
              }}>
                <h2 style={{
                  fontSize: isMobile ? '1.75rem' : '2.5rem',
                  fontWeight: '800',
                  marginBottom: '0.5rem',
                  color: '#00ff7f'
                }}>
                  {selectedProject.title}
                </h2>

                <p style={{
                  fontSize: '1.1rem',
                  color: '#00ff7f',
                  marginBottom: '2rem',
                  fontWeight: '600'
                }}>
                  {selectedProject.client}
                </p>

                {/* Problem Section */}
                {selectedProject.problem && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                      fontSize: '1.3rem',
                      fontWeight: '700',
                      color: '#ff5f5f',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      Problem
                    </h3>
                    <p style={{
                      fontSize: '1rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: 1.8
                    }}>
                      {selectedProject.problem}
                    </p>
                  </div>
                )}

                {/* Solution Section */}
                {selectedProject.solution && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                      fontSize: '1.3rem',
                      fontWeight: '700',
                      color: '#00ff7f',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                      Solution
                    </h3>
                    <p style={{
                      fontSize: '1rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: 1.8
                    }}>
                      {selectedProject.solution}
                    </p>
                  </div>
                )}

                {/* Description */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '1rem'
                  }}>
                    Overview
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.8
                  }}>
                    {selectedProject.description}
                  </p>
                </div>

                {/* Impact Metrics */}
                <div style={{
                  background: 'rgba(0, 255, 0, 0.05)',
                  border: '1px solid rgba(0, 255, 0, 0.2)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  <h4 style={{
                    fontSize: '1rem',
                    color: '#00ff7f',
                    marginBottom: '0.5rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Impact & Results
                  </h4>
                  <p style={{
                    fontSize: '1.1rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.6
                  }}>
                    {selectedProject.impact}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '1rem'
                  }}>
                    Technology Stack
                  </h4>
                  <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    flexWrap: 'wrap'
                  }}>
                    {selectedProject.tech.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        style={{
                          padding: '0.5rem 1rem',
                          background: 'rgba(0, 255, 0, 0.1)',
                          border: '1px solid rgba(0, 255, 0, 0.3)',
                          borderRadius: '24px',
                          fontSize: '0.9rem',
                          color: '#00ff7f',
                          fontWeight: '500'
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Full Image Modal */}
      <AnimatePresence>
        {showFullImage && selectedProject?.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFullImage(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.98)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isMobile ? '1rem' : '2rem',
              cursor: 'zoom-out'
            }}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowFullImage(false);
              }}
              aria-label="Close full image view"
              style={{
                position: 'absolute',
                top: isMobile ? '1rem' : '2rem',
                right: isMobile ? '1rem' : '2rem',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '2px solid #ffffff',
                borderRadius: '50%',
                width: '45px',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span style={{
                fontSize: '24px',
                color: '#000000',
                fontWeight: 'bold',
                lineHeight: 1,
                fontFamily: 'Arial, sans-serif'
              }}>×</span>
            </motion.button>

            {/* Full Size Image with Navigation */}
            <div 
              style={{
                position: 'relative',
                maxWidth: '95%',
                maxHeight: '95vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              {(() => {
                const allImages = selectedProject.additionalImages 
                  ? [selectedProject.image, ...selectedProject.additionalImages]
                  : [selectedProject.image];
                const currentImage = allImages[currentImageIndex] || selectedProject.image;
                
                return (
                  <>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImage}
                        src={currentImage}
                        alt={selectedProject.title}
                        loading="lazy"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '95vh',
                          objectFit: 'contain',
                          borderRadius: '12px',
                          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
                        }}
                      />
                    </AnimatePresence>
                    
                    {/* Navigation Buttons */}
                    {allImages.length > 1 && (
                      <>
                        {/* Previous Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) => 
                              prev === 0 ? allImages.length - 1 : prev - 1
                            );
                          }}
                          aria-label="Previous image"
                          style={{
                            position: 'absolute',
                            left: isMobile ? '1rem' : '2rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(255, 255, 255, 0.9)',
                            border: '2px solid #ffffff',
                            borderRadius: '50%',
                            width: '45px',
                            height: '45px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#ffffff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                          }}
                        >
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5">
                            <polyline points="15 18 9 12 15 6" />
                          </svg>
                        </button>
                        
                        {/* Next Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) => 
                              (prev + 1) % allImages.length
                            );
                          }}
                          aria-label="Next image"
                          style={{
                            position: 'absolute',
                            right: isMobile ? '1rem' : '2rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(255, 255, 255, 0.9)',
                            border: '2px solid #ffffff',
                            borderRadius: '50%',
                            width: '45px',
                            height: '45px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#ffffff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                          }}
                        >
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>
                        
                        {/* Image Counter */}
                        <div style={{
                          position: 'absolute',
                          bottom: isMobile ? '4rem' : '5rem',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'rgba(0, 0, 0, 0.8)',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: '#ffffff',
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          backdropFilter: 'blur(10px)'
                        }}>
                          {currentImageIndex + 1} / {allImages.length}
                        </div>
                      </>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Zoom Out Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                position: 'absolute',
                bottom: isMobile ? '2rem' : '3rem',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0, 0, 0, 0.8)',
                padding: '0.75rem 1.5rem',
                borderRadius: '30px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.9rem'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
                <path d="M11 8v3m0 0v3m0-3h3m-3 0H8"/>
              </svg>
              <span>Click anywhere to close</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Process Timeline - Interactive */}
      <section style={{
        padding: isMobile ? '3rem 1rem' : '8rem 2rem',
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.95) 0%, #000000 100%)'
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          <h2 style={{
            fontSize: isMobile ? 'clamp(1.75rem, 7vw, 2.5rem)' : 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: '900',
            textAlign: 'center',
            marginBottom: isMobile ? '3rem' : '5rem',
            letterSpacing: '-0.03em'
          }}>
            <span style={{ color: '#888888' }}>Our</span>{' '}
            <span style={{
              color: '#00ff7f',
              textShadow: '0 0 20px rgba(0, 255, 127, 0.5)'
            }}>
              Process
            </span>
          </h2>

          {/* Timeline */}
          <div style={{
            position: 'relative',
            padding: isMobile ? '0' : '0 2rem'
          }}>
            {/* Progress Line - Hidden on mobile for better layout */}
            {!isMobile && (
              <div style={{
                position: 'absolute',
                top: '30px',
                left: '2rem',
                right: '2rem',
                height: '2px',
                background: 'rgba(255, 255, 255, 0.1)'
              }}>
                <motion.div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #00ff7f 0%, #00cc63 100%)',
                    transformOrigin: 'left'
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: (activeStep + 1) / 4 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}

            {/* Process Steps */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: isMobile ? '3rem' : '2rem',
              position: 'relative'
            }}>
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  style={{
                    position: 'relative',
                    textAlign: 'center'
                  }}
                >
                  {/* Step Circle */}
                  <motion.div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: activeStep >= index ? '#00ff7f' : '#000000',
                      border: '2px solid',
                      borderColor: activeStep >= index ? '#00ff7f' : 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 2rem',
                      position: 'relative',
                      zIndex: 2,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    whileHover={!isMobile ? { scale: 1.1 } : {}}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveStep(activeStep === index ? -1 : index)}
                  >
                    <span style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: activeStep >= index ? '#000000' : '#ffffff'
                    }}>
                      {index + 1}
                    </span>
                  </motion.div>

                  <h3 style={{
                    fontSize: isMobile ? '1.25rem' : '1.5rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    color: activeStep === index ? '#00ff7f' : '#ffffff',
                    transition: 'color 0.3s ease'
                  }}>
                    {step.phase}
                  </h3>

                  <p style={{
                    fontSize: isMobile ? '0.85rem' : '0.95rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    marginBottom: '1rem'
                  }}>
                    {step.description}
                  </p>

                  <div style={{
                    fontSize: '0.85rem',
                    color: '#00ff7f',
                    fontWeight: '600'
                  }}>
                    {step.duration}
                  </div>

                  {/* Desktop hover indicator */}
                  {!isMobile && activeStep !== index && (
                    <div style={{
                      fontSize: '0.75rem',
                      color: 'rgba(0, 255, 127, 0.5)',
                      marginTop: '0.75rem',
                      textAlign: 'center'
                    }}>
                      Click to view deliverables
                    </div>
                  )}

                  {/* Mobile tap indicator */}
                  {isMobile && activeStep !== index && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        fontSize: '0.75rem',
                        color: 'rgba(0, 255, 127, 0.6)',
                        marginTop: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      <svg 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                      </svg>
                      <span>Tap for deliverables</span>
                    </motion.div>
                  )}

                  {/* Deliverables on Hover/Active */}
                  <AnimatePresence>
                    {activeStep === index && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'rgba(0, 0, 0, 0.95)',
                          border: '1px solid rgba(0, 255, 0, 0.3)',
                          borderRadius: '12px',
                          padding: '1rem',
                          marginTop: '1rem',
                          minWidth: '200px',
                          zIndex: 10
                        }}
                      >
                        <div style={{
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: '#00ff7f',
                          marginBottom: '0.5rem'
                        }}>
                          Deliverables:
                        </div>
                        {step.deliverables.map((item, idx) => (
                          <div
                            key={idx}
                            style={{
                              fontSize: '0.75rem',
                              color: 'rgba(255, 255, 255, 0.8)',
                              padding: '0.25rem 0'
                            }}
                          >
                            • {item}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Use Cases Section */}
      <section style={{
        padding: isMobile ? '3rem 1rem' : '8rem 2rem',
        position: 'relative',
        background: 'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.98) 100%)'
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '1400px',
            margin: '0 auto'
          }}
        >
          <h2 style={{
            fontSize: isMobile ? 'clamp(1.75rem, 7vw, 2.5rem)' : 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: '900',
            textAlign: 'center',
            marginBottom: isMobile ? '3rem' : '5rem',
            letterSpacing: '-0.03em'
          }}>
            <span style={{ color: '#888888' }}>Real-World</span>{' '}
            <span style={{
              color: '#00ff7f',
              textShadow: '0 0 20px rgba(0, 255, 127, 0.5)'
            }}>
              Use Cases
            </span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: isMobile ? '1.5rem' : '2rem'
          }}>
            {[
              {
                title: 'E-commerce Assistant',
                description: 'AI agent that handles customer inquiries, recommends products, and processes orders automatically',
                tech: ['GPT-4', 'RAG', 'Multi-Agent'],
                results: '85% reduction in response time'
              },
              {
                title: 'Document Intelligence',
                description: 'Extract insights from PDFs, contracts, and reports with custom-trained AI models',
                tech: ['LangChain', 'Vector DB', 'OCR'],
                results: '10x faster document processing'
              },
              {
                title: 'Sales Automation',
                description: 'AI agents that qualify leads, book meetings, and follow up with prospects autonomously',
                tech: ['CrewAI', 'AutoGen', 'CRM Integration'],
                results: '3x more qualified leads'
              },
              {
                title: 'Code Assistant',
                description: 'Development helper that reviews code, suggests improvements, and automates testing',
                tech: ['Copilot API', 'AST Analysis', 'CI/CD'],
                results: '40% faster development'
              },
              {
                title: 'Content Generation',
                description: 'Automated blog posts, social media content, and marketing copy tailored to your brand',
                tech: ['Claude API', 'SEO Tools', 'Brand Voice'],
                results: '20x content output'
              },
              {
                title: 'Data Analysis Bot',
                description: 'AI that analyzes your business data and generates insights, reports, and predictions',
                tech: ['Python', 'ML Models', 'Visualization'],
                results: 'Real-time business intelligence'
              }
            ].map((useCase, index) => {
              const isExpanded = expandedUseCase === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={isMobile ? () => setExpandedUseCase(isExpanded ? null : index) : undefined}
                  style={{
                    background: isExpanded ? 'rgba(0, 255, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid',
                    borderColor: isExpanded ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: isMobile ? '1.5rem' : '2.5rem',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={!isMobile ? (e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 0, 0.3)';
                    e.currentTarget.style.background = 'rgba(0, 255, 0, 0.02)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 127, 0.2)';
                  } : undefined}
                  onMouseLeave={!isMobile ? (e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                    e.currentTarget.style.boxShadow = 'none';
                  } : undefined}
                >
                  <h3 style={{
                    fontSize: isMobile ? '1.25rem' : '1.5rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: isExpanded ? '#00ff7f' : '#ffffff',
                    transition: 'color 0.3s ease'
                  }}>
                    {useCase.title}
                  </h3>

                  <p style={{
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginBottom: '1.5rem',
                    lineHeight: 1.6,
                    display: isMobile && !isExpanded ? '-webkit-box' : 'block',
                    WebkitLineClamp: isMobile && !isExpanded ? 2 : 'none',
                    WebkitBoxOrient: 'vertical',
                    overflow: isMobile && !isExpanded ? 'hidden' : 'visible'
                  }}>
                    {useCase.description}
                  </p>

                  {/* Show tap indicator on mobile when not expanded */}
                  {isMobile && !isExpanded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#00ff7f',
                        fontSize: '0.85rem',
                        marginBottom: '1rem'
                      }}
                    >
                      <span>Tap to expand</span>
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </motion.div>
                  )}

                  <AnimatePresence>
                    {(isExpanded || !isMobile) && (
                      <motion.div
                        initial={isMobile ? { opacity: 0, height: 0 } : false}
                        animate={isMobile ? { opacity: 1, height: 'auto' } : false}
                        exit={isMobile ? { opacity: 0, height: 0 } : false}
                        transition={{ duration: 0.3 }}
                      >
                        <div style={{
                          display: 'flex',
                          gap: '0.5rem',
                          flexWrap: 'wrap',
                          marginBottom: '1.5rem'
                        }}>
                          {useCase.tech.map((tech, idx) => (
                            <motion.span
                              key={idx}
                              initial={isMobile && isExpanded ? { scale: 0 } : false}
                              animate={isMobile && isExpanded ? { scale: 1 } : false}
                              transition={{ delay: idx * 0.05 }}
                              style={{
                                padding: '0.25rem 0.75rem',
                                background: 'rgba(0, 255, 0, 0.1)',
                                border: '1px solid rgba(0, 255, 0, 0.2)',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                color: '#00ff7f'
                              }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>

                        <div style={{
                          fontSize: '0.9rem',
                          color: '#00ff7f',
                          fontWeight: '600'
                        }}>
                          ✓ {useCase.results}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Stats Section - Animated Numbers */}
      <section style={{
        padding: isMobile ? '2.5rem 1rem' : '6rem 2rem',
        background: 'linear-gradient(135deg, rgba(0, 255, 0, 0.05) 0%, transparent 100%)',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: isMobile ? '1.5rem' : '3rem'
        }}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring" }}
              style={{
                textAlign: 'center'
              }}
            >
              <motion.div
                style={{
                  fontSize: isMobile ? 'clamp(1.75rem, 5vw, 2.25rem)' : 'clamp(3rem, 5vw, 4rem)',
                  fontWeight: '900',
                  color: '#00ff7f',
                  marginBottom: '0.5rem',
                  lineHeight: 1
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                {stat.value}
              </motion.div>
              <div style={{
                fontSize: isMobile ? '0.9rem' : '1.1rem',
                color: '#ffffff',
                marginBottom: '0.25rem'
              }}>
                {stat.label}
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: stat.trend.startsWith('+') ? '#00ff7f' : '#ff5f5f'
              }}>
                {stat.trend}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section style={{
        padding: isMobile ? '2.5rem 1rem' : '6rem 2rem',
        position: 'relative',
        background: 'rgba(0, 0, 0, 0.98)'
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          <h2 style={{
            fontSize: isMobile ? 'clamp(1.75rem, 6vw, 2.5rem)' : 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            marginBottom: isMobile ? '2rem' : '3rem',
            color: 'rgba(255, 255, 255, 0.9)'
          }}>
            Technologies We Use
          </h2>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: isMobile ? '0.75rem' : '1rem'
          }}>
            {[
              'OpenAI GPT-4', 'Claude API', 'LangChain', 'CrewAI', 'AutoGen',
              'Pinecone', 'ChromaDB', 'HuggingFace', 'Whisper AI', 'ElevenLabs',
              'Stable Diffusion', 'DALL-E 3', 'FastAPI', 'Next.js', 'Python',
              'TypeScript', 'Docker', 'AWS Bedrock', 'Google Vertex AI', 'Azure AI'
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, type: "spring" }}
                whileHover={{ scale: isMobile ? 1 : 1.1, y: isMobile ? 0 : -5 }}
                style={{
                  padding: isMobile ? '0.5rem 1rem' : '0.75rem 1.5rem',
                  background: 'transparent',
                  border: '1px solid rgba(0, 255, 0, 0.3)',
                  borderRadius: '30px',
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  color: '#00ff7f',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 0, 0.1)';
                  e.currentTarget.style.borderColor = '#00ff7f';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 0, 0.3)';
                }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Meet Our Team Section */}
      <section style={{
        padding: isMobile ? '3rem 1rem' : '8rem 2rem',
        position: 'relative',
        background: 'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.95) 100%)'
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '1400px',
            margin: '0 auto'
          }}
        >
          <h2 style={{
            fontSize: isMobile ? 'clamp(1.75rem, 7vw, 2.5rem)' : 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: '900',
            textAlign: 'center',
            marginBottom: isMobile ? '3rem' : '5rem',
            letterSpacing: '-0.03em'
          }}>
            <span style={{ color: '#888888' }}>Meet Our</span>{' '}
            <span style={{
              color: '#00ff7f',
              textShadow: '0 0 20px rgba(0, 255, 127, 0.5)'
            }}>
              AI Team
            </span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 350px))',
            gap: isMobile ? '2rem' : '3rem',
            justifyContent: 'center'
          }}>
            {[
              {
                name: 'Umair Ahmed',
                role: 'AI Solutions Developer',
                expertise: 'Machine Learning & AI Integration',
                image: '/images/team/umair-ahmed.webp',
                bio: 'Specializes in developing innovative AI solutions and implementing machine learning models for real-world applications.',
                experience: '5+ years'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  padding: isMobile ? '1.5rem' : '2.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={!isMobile ? (e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 0, 0.3)';
                  e.currentTarget.style.background = 'rgba(0, 255, 0, 0.02)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 255, 127, 0.1)';
                } : undefined}
                onMouseLeave={!isMobile ? (e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                } : undefined}
              >
                {/* Accent Line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '3px',
                  background: 'linear-gradient(90deg, #00ff7f 0%, transparent 100%)',
                  opacity: 0.8
                }} />

                {/* Profile Image */}
                <div style={{
                  width: isMobile ? '80px' : '120px',
                  height: isMobile ? '80px' : '120px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  margin: '0 auto 1.5rem',
                  border: '3px solid rgba(0, 255, 127, 0.3)',
                  position: 'relative'
                }}>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  {/* AI Overlay Effect */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle, transparent 30%, rgba(0, 255, 127, 0.2) 100%)'
                  }} />
                </div>

                {/* Member Info */}
                <h3 style={{
                  fontSize: isMobile ? '1.25rem' : '1.5rem',
                  fontWeight: '700',
                  marginBottom: '0.25rem',
                  color: '#ffffff',
                  textAlign: 'center'
                }}>
                  {member.name}
                </h3>

                <p style={{
                  fontSize: '1rem',
                  color: '#00ff7f',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  textAlign: 'center'
                }}>
                  {member.role}
                </p>

                <p style={{
                  fontSize: '0.85rem',
                  color: 'rgba(0, 255, 127, 0.7)',
                  marginBottom: '1rem',
                  textAlign: 'center',
                  fontStyle: 'italic'
                }}>
                  {member.expertise}
                </p>

                <p style={{
                  fontSize: '0.95rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: 1.6,
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  {member.bio}
                </p>

                {/* Experience Badge */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%'
                }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.25rem 1rem',
                    background: 'rgba(0, 255, 0, 0.1)',
                    border: '1px solid rgba(0, 255, 0, 0.2)',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    color: '#00ff7f',
                    fontWeight: '600'
                  }}>
                    {member.experience} Experience
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>      </section>

      {/* Client Reviews Section */}
      <section style={{
        padding: isMobile ? '3rem 0.5rem' : '6rem 2rem',
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Matrix-style background effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          background: `repeating-linear-gradient(
            0deg,
            #00ff00,
            #00ff00 1px,
            transparent 1px,
            transparent 2px
          )`,
          pointerEvents: 'none'
        }} />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1
          }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              marginBottom: isMobile ? '3rem' : '4rem'
            }}
          >
            <h2 style={{
              fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(3rem, 5vw, 4rem)',
              fontWeight: '900',
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              <span style={{ color: '#666' }}>AI Solution</span>{' '}
              <span style={{
                background: 'linear-gradient(135deg, #00ff00 0%, #00ff7f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(0, 255, 0, 0.3)'
              }}>
                Success Stories
              </span>
            </h2>
            <p style={{
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              color: '#9ca3af',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Real results from businesses transformed with our AI solutions
            </p>
          </motion.div>

          {/* Reviews Carousel */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              overflow: isMobile ? 'auto' : 'hidden',
              overflowX: isMobile ? 'auto' : 'hidden',
              borderRadius: '20px',
              background: 'rgba(0, 255, 0, 0.02)',
              border: '1px solid rgba(0, 255, 127, 0.1)',
              padding: isMobile ? '2rem 0' : '3rem 0',
              scrollSnapType: isMobile ? 'x mandatory' : 'none',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              boxShadow: 'inset 0 0 50px rgba(0, 255, 0, 0.02)'
            }}
            className="hide-scrollbar"
            onMouseEnter={() => !isMobile && setIsPaused(true)}
            onMouseLeave={() => !isMobile && setIsPaused(false)}
          >
            <div
              style={{
                display: 'flex',
                animation: !isMobile ? 'testimonialScroll 40s linear infinite' : 'none',
                animationPlayState: isPaused ? 'paused' : 'running',
                gap: isMobile ? '1rem' : '2rem',
                paddingLeft: isMobile ? '1rem' : '2rem',
                paddingRight: isMobile ? '1rem' : '2rem',
                width: 'fit-content'
              }}
            >
              {/* AI-specific testimonials - double for animation */}
              {(isMobile ? [1] : [1, 2]).map((set) => (
                <React.Fragment key={set}>
                  {[
                    {
                      content: "Great work and attention to detail were above and beyond every time and great communication. Definitely I would recommend to have your AI stuff done",
                      author: "jorgejuli6",
                      position: "Client",
                      company: "United States",
                      rating: 5,
                      flag: "🇺🇸"
                    },
                    {
                      content: "Great working with Adnan! We had a bit longer timeline at the beginning due some confusion but once we resolved that it was really quick and easy!",
                      author: "kean2022",
                      position: "Client",
                      company: "United States",
                      rating: 5,
                      flag: "🇺🇸"
                    },
                    {
                      content: "Adnan really went the extra mile and I'll be back!",
                      author: "athudabes",
                      position: "Client",
                      company: "United States",
                      rating: 5,
                      flag: "🇺🇸"
                    },
                    {
                      content: "Patient and very understanding person. Good work. Thank you.",
                      author: "emmanuedsudah",
                      position: "Client",
                      company: "United States",
                      rating: 5,
                      flag: "🇺🇸"
                    },
                    {
                      content: "Great Ahmad truly excels in AI Development! His work brought our project to life and made it way more engaging than anticipated.",
                      author: "kean2022",
                      position: "Client",
                      company: "United States",
                      rating: 5,
                      flag: "🇺🇸"
                    },
                    {
                      content: "Seller has been an absolute champion in a software challenge. His dedication to getting quality output even in complex conditions!",
                      author: "jeremietrembla565",
                      position: "Client",
                      company: "Canada",
                      rating: 5,
                      flag: "🇨🇦"
                    },
                    {
                      content: "A complete pro expectations and a pleasure to work with!",
                      author: "williamdelee3",
                      position: "Client",
                      company: "United States",
                      rating: 5,
                      flag: "🇺🇸"
                    },
                    {
                      content: "Great Ahmad delivered as promised! AI solution works well and met expectations. Good communication throughout!",
                      author: "jabberwocky1",
                      position: "Client",
                      company: "United States",
                      rating: 5,
                      flag: "🇺🇸"
                    },
                    {
                      content: "Amazing work! Truly exceptional communication and addresses. Looking forward to more!",
                      author: "Bt_joshua501",
                      position: "Client",
                      company: "United States",
                      rating: 5,
                      flag: "🇺🇸"
                    },
                    {
                      content: "Work was performed just like he promised. Quick turnaround. You can expect things better than you imagine for with AI.",
                      author: "fiverr_",
                      position: "Client",
                      company: "United States",
                      rating: 5,
                      flag: "🇺🇸"
                    },
                    {
                      content: "Great seller. Would work with again anytime! Quality help with my AI project.",
                      author: "lights_happy9",
                      position: "Client",
                      company: "United States",
                      rating: 5,
                      flag: "🇺🇸"
                    },
                    {
                      content: "Great experience. Patient. Professional and I'm very satisfied.",
                      author: "shawn_matos",
                      position: "Client",
                      company: "United States",
                      rating: 5,
                      flag: "🇺🇸"
                    },
                    {
                      content: "Ahmed has done outstanding work! AI solution perfect for our business needs.",
                      author: "qgmna13",
                      position: "Client",
                      company: "United States",
                      rating: 5,
                      flag: "🇺🇸"
                    },
                    {
                      content: "Great experience, thank yo so excellent ML engineer!",
                      author: "qperso13",
                      position: "Client",
                      company: "United States",
                      rating: 5,
                      flag: "🇺🇸"
                    },
                    {
                      content: "Truly talented and recommended excellent! Helped with my AI project helped with very much!",
                      author: "ceciliahatcher1",
                      position: "Client",
                      company: "United States",
                      rating: 5,
                      flag: "🇺🇸"
                    },
                    {
                      content: "Working with Ahmad has nothing short of excellent! He understood the needed requirements quickly.",
                      author: "ac_milz",
                      position: "Client",
                      company: "United States",
                      rating: 5,
                      flag: "🇺🇸"
                    },
                    {
                      content: "Good work. Very impressed by the knowledge and the like is indicative his expert.",
                      author: "ms",
                      position: "Client",
                      company: "United States",
                      rating: 5,
                      flag: "🇺🇸"
                    },
                    {
                      content: "Very good collaboration!",
                      author: "brandy",
                      position: "Client",
                      company: "United States",
                      rating: 5,
                      flag: "🇺🇸"
                    },
                    {
                      content: "Great experience. Great so excellent ML engineer.",
                      author: "gregmez",
                      position: "Client",
                      company: "United States",
                      rating: 5,
                      flag: "🇺🇸"
                    },
                    {
                      content: "Fully AI earn learn and delivered exceptionally.",
                      author: "ceciliahatcher1",
                      position: "Client",
                      company: "United States",
                      rating: 5,
                      flag: "🇺🇸"
                    }
                  ].map((testimonial, index) => (
                    <div
                      key={`${set}-${index}`}
                      style={{
                        minWidth: isMobile ? '90vw' : '400px',
                        width: isMobile ? '90vw' : '400px',
                        maxWidth: isMobile ? '350px' : '450px',
                        flexShrink: 0,
                        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 20, 0, 0.6))',
                        border: '1px solid rgba(0, 255, 127, 0.2)',
                        borderRadius: '15px',
                        padding: isMobile ? '1.25rem' : '2rem',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        scrollSnapAlign: isMobile ? 'start' : 'none',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.5)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 40, 0, 0.7))';
                        e.currentTarget.style.transform = 'scale(1.02) translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 255, 127, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.2)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 20, 0, 0.6))';
                        e.currentTarget.style.transform = 'scale(1) translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {/* AI Glow Effect */}
                      <div style={{
                        position: 'absolute',
                        top: '-1px',
                        left: '-1px',
                        right: '-1px',
                        bottom: '-1px',
                        background: 'linear-gradient(45deg, transparent, rgba(0, 255, 127, 0.1), transparent)',
                        borderRadius: '15px',
                        opacity: 0.5,
                        pointerEvents: 'none'
                      }} />

                      {/* Rating Stars */}
                      <div style={{
                        display: 'flex',
                        gap: '0.25rem',
                        marginBottom: '1rem'
                      }}>
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="#00ff7f"
                            style={{ 
                              opacity: 0.9,
                              filter: 'drop-shadow(0 0 3px rgba(0, 255, 127, 0.5))'
                            }}
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>

                      {/* Review Content */}
                      <p style={{
                        fontSize: isMobile ? '0.95rem' : '1.1rem',
                        color: '#d1d5db',
                        lineHeight: '1.6',
                        marginBottom: '1.5rem',
                        fontStyle: 'italic'
                      }}>
                        "{testimonial.content}"
                      </p>

                      {/* Author Info */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <div style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #00ff00 0%, #00ff7f 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          color: '#000000',
                          boxShadow: '0 0 20px rgba(0, 255, 127, 0.3)'
                        }}>
                          {testimonial.author.charAt(0)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#00ff7f',
                            marginBottom: '0.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            {testimonial.author}
                            {testimonial.flag === '🇺🇸' && (
                              <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                                <rect width="24" height="16" fill="#B22234"/>
                                <rect y="1.23" width="24" height="1.23" fill="white"/>
                                <rect y="3.69" width="24" height="1.23" fill="white"/>
                                <rect y="6.15" width="24" height="1.23" fill="white"/>
                                <rect y="8.62" width="24" height="1.23" fill="white"/>
                                <rect y="11.08" width="24" height="1.23" fill="white"/>
                                <rect y="13.54" width="24" height="1.23" fill="white"/>
                                <rect width="9.6" height="8.62" fill="#3C3B6E"/>
                              </svg>
                            )}
                            {testimonial.flag === '🇬🇧' && (
                              <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                                <rect width="24" height="16" fill="#012169"/>
                                <path d="M0,0 L24,16 M24,0 L0,16" stroke="white" strokeWidth="3"/>
                                <path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" strokeWidth="1"/>
                                <path d="M12,0 L12,16 M0,8 L24,8" stroke="white" strokeWidth="5"/>
                                <path d="M12,0 L12,16 M0,8 L24,8" stroke="#C8102E" strokeWidth="3"/>
                              </svg>
                            )}
                            {testimonial.flag === '🇪🇸' && (
                              <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                                <rect width="24" height="4" fill="#C60B1E"/>
                                <rect y="4" width="24" height="8" fill="#FFC400"/>
                                <rect y="12" width="24" height="4" fill="#C60B1E"/>
                              </svg>
                            )}
                            {testimonial.flag === '🇨🇦' && (
                              <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                                <rect width="6" height="16" fill="#FF0000"/>
                                <rect x="6" width="12" height="16" fill="#FFFFFF"/>
                                <rect x="18" width="6" height="16" fill="#FF0000"/>
                                <path d="M12,4 L11.5,5.5 L10,5.5 L11,6.5 L10.5,8 L12,7 L13.5,8 L13,6.5 L14,5.5 L12.5,5.5 Z" fill="#FF0000"/>
                              </svg>
                            )}
                            {testimonial.flag === '🇦🇺' && (
                              <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                                <rect width="24" height="16" fill="#012169"/>
                                <path d="M0,0 L24,16 M24,0 L0,16" stroke="white" strokeWidth="3"/>
                                <path d="M0,0 L24,16 M24,0 L0,16" stroke="#e4002b" strokeWidth="1"/>
                                <path d="M12,0 L12,16 M0,8 L24,8" stroke="white" strokeWidth="5"/>
                                <path d="M12,0 L12,16 M0,8 L24,8" stroke="#e4002b" strokeWidth="3"/>
                                <polygon points="18,11 19,11 18.5,12 18,11.5 17.5,12 17,11" fill="white"/>
                                <polygon points="20,5 20.7,5 20.35,5.7 20,5.35 19.65,5.7 19.3,5" fill="white"/>
                                <polygon points="18,3 18.5,3 18.25,3.5 18,3.25 17.75,3.5 17.5,3" fill="white"/>
                                <polygon points="14,5.5 14.7,5.5 14.35,6.2 14,5.85 13.65,6.2 13.3,5.5" fill="white"/>
                                <polygon points="16,9 16.7,9 16.35,9.7 16,9.35 15.65,9.7 15.3,9" fill="white"/>
                              </svg>
                            )}
                            {testimonial.flag === '🇩🇪' && (
                              <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                                <rect width="24" height="5.33" fill="#000000"/>
                                <rect y="5.33" width="24" height="5.34" fill="#DD0000"/>
                                <rect y="10.67" width="24" height="5.33" fill="#FFCE00"/>
                              </svg>
                            )}
                            {testimonial.flag === '🇮🇳' && (
                              <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                                <rect width="24" height="5.33" fill="#FF9933"/>
                                <rect y="5.33" width="24" height="5.34" fill="#FFFFFF"/>
                                <rect y="10.67" width="24" height="5.33" fill="#128807"/>
                                <circle cx="12" cy="8" r="2" fill="#000080"/>
                                <circle cx="12" cy="8" r="1.8" fill="#FFFFFF"/>
                                <circle cx="12" cy="8" r="0.6" fill="#000080"/>
                              </svg>
                            )}
                            {testimonial.flag === '🇲🇽' && (
                              <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                                <rect width="8" height="16" fill="#006847"/>
                                <rect x="8" width="8" height="16" fill="#FFFFFF"/>
                                <rect x="16" width="8" height="16" fill="#CE1126"/>
                              </svg>
                            )}
                          </h4>
                          <p style={{
                            fontSize: '0.85rem',
                            color: '#9ca3af',
                            margin: 0
                          }}>
                            {testimonial.position} • {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>

            {/* Gradient Overlays */}
            {!isMobile && (
              <>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '150px',
                  height: '100%',
                  background: 'linear-gradient(90deg, #000000 0%, transparent 100%)',
                  pointerEvents: 'none',
                  zIndex: 2
                }} />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '150px',
                  height: '100%',
                  background: 'linear-gradient(270deg, #000000 0%, transparent 100%)',
                  pointerEvents: 'none',
                  zIndex: 2
                }} />
              </>
            )}
          </div>

          {/* Average Rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              textAlign: 'center',
              marginTop: '3rem'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#00ff7f"
                  style={{
                    filter: 'drop-shadow(0 0 5px rgba(0, 255, 127, 0.5))'
                  }}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            
            <p style={{
              fontSize: '1rem',
              color: '#00ff7f',
              fontWeight: '600',
              textShadow: '0 0 10px rgba(0, 255, 127, 0.3)'
            }}>
              5.0 Average Rating from 15+ AI Projects
            </p>
          </motion.div>
        </motion.div>

        {/* Add animation keyframes */}
        <style jsx>{`
          @keyframes testimonialScroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </section>

      {/* CTA Section - Minimalist */}
      <section style={{
        padding: isMobile ? '4rem 1rem' : '8rem 2rem',
        textAlign: 'center',
        position: 'relative'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}
        >
          <h2 style={{
            fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '900',
            marginBottom: isMobile ? '1.5rem' : '2rem',
            letterSpacing: '-0.03em'
          }}>
            Transform Your Business with{' '}
            <span style={{
              color: '#00ff7f',
              textShadow: '0 0 20px rgba(0, 255, 127, 0.5)'
            }}>
              AI
            </span>{' '}
            Now
          </h2>

          <p style={{
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: isMobile ? '2rem' : '3rem',
            fontWeight: '300'
          }}>
            Let's build the future together with AI
          </p>

          <motion.a
            href="#contact"
            whileHover={{ scale: isMobile ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isMobile ? '1rem 2rem' : '1.5rem 4rem',
              background: 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)',
              color: '#000000',
              fontWeight: '700',
              fontSize: isMobile ? '1rem' : '1.2rem',
              borderRadius: '100px',
              textDecoration: 'none',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 255, 0, 0.3)',
              textAlign: 'center'
            }}
          >
            <span style={{ position: 'relative', zIndex: 1, display: 'inline-block' }}>Get Started Today</span>
            <motion.div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                height: '100%',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ scale: 0 }}
              whileHover={{ scale: 2 }}
              transition={{ duration: 0.6 }}
            />
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
};

export default AISolutions;