import React, { useState, useEffect } from 'react';
import { HeroSection, ServicesGrid, PortfolioGrid, ProcessSteps, WhyChooseUsSection, CTASection } from '../../components/DigitalMarketing/DigitalMarketingSections';
import { DetailedServicesSection } from '../../components/DigitalMarketing/DetailedServiceCards';
import { services, portfolioItems, process, testimonials } from '../../components/DigitalMarketing/DigitalMarketingData';
import { styles, animations } from '../../components/DigitalMarketing/DigitalMarketingStyles';
import PortfolioModal from '../../components/DigitalMarketing/PortfolioModal';
import '../../styles/digital-marketing-mobile.css';
import '../../styles/digital-marketing-responsive.css';

const DigitalMarketingSEO = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const testimonialRef = React.useRef(null);
  const [testimonialScrollPosition, setTestimonialScrollPosition] = useState(0);

  useEffect(() => {
    // SEO Optimization for Digital Marketing Page
    document.title = 'SEO Services & Content Marketing Agency UK | Digital Marketing Company - Softeefi';
    
    // Set meta description with digital marketing keywords
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Professional SEO services and content marketing agency UK. Expert SEO company offering search engine optimization, content marketing strategy, local SEO, technical SEO, and digital marketing services. Boost rankings with our SEO consultants.';
    } else {
      const newMetaDesc = document.createElement('meta');
      newMetaDesc.name = 'description';
      newMetaDesc.content = 'Professional SEO services and content marketing agency UK. Expert SEO company offering search engine optimization, content marketing strategy, local SEO, technical SEO, and digital marketing services. Boost rankings with our SEO consultants.';
      document.head.appendChild(newMetaDesc);
    }
    
    // Add meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'digital marketing, digital marketing agency, digital marketing company, digital marketing services, digital marketing uk, what is digital marketing, digital marketing course, how to start digital marketing, seo digital marketing, what is seo in digital marketing, how to get into digital marketing, digital marketing strategy, online marketing, digital marketing consultant, digital marketing expert, social media marketing, ppc marketing, email marketing, digital marketing for small business, content marketing, content marketing strategy, content marketing services, content marketing agency, content marketing examples, what is content marketing, b2b content marketing, content marketing uk, content creation services, content marketing consultant, content marketing for seo, blog content marketing, video content marketing, content marketing plan, content marketing campaign, seo, seo services, seo agency, seo company, seo consultant, seo marketing, search engine optimization, local seo, seo uk, seo services uk, technical seo, on page seo, off page seo, ecommerce seo, seo audit, seo strategy, seo optimization, google seo, seo expert, white label seo, affordable seo services, small business seo, enterprise seo, seo packages, monthly seo services';
    
    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://softeefi.co.uk/services/digital-marketing-seo';
    
    // Add Open Graph tags for social sharing
    const ogTags = [
      { property: 'og:title', content: 'SEO Services & Content Marketing Agency | Digital Marketing UK - Softeefi' },
      { property: 'og:description', content: 'Expert SEO services and content marketing agency UK. Professional SEO company offering search engine optimization, content marketing strategy, technical SEO, local SEO, link building, and comprehensive digital marketing solutions.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://softeefi.co.uk/services/digital-marketing-seo' },
      { property: 'og:image', content: 'https://softeefi.co.uk/images/digital-marketing-og.jpg' }
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
    
    // Add structured data for digital marketing services
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
              "name": "Digital Marketing & SEO",
              "item": "https://softeefi.co.uk/services/digital-marketing-seo"
            }
          ]
        },
        {
          "@type": "Service",
          "name": "Digital Marketing Services",
          "description": "Professional SEO services and content marketing agency offering comprehensive search engine optimization, content marketing strategy, technical SEO, local SEO, link building, and digital marketing solutions for UK businesses",
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
            "name": "Digital Marketing Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Professional SEO Services",
                  "description": "Comprehensive SEO services including technical SEO, on-page SEO, off-page SEO, local SEO, ecommerce SEO, link building, SEO audit, and monthly SEO packages. Expert SEO consultants delivering white label SEO solutions for agencies"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "PPC Marketing",
                  "description": "Pay-per-click advertising campaigns on Google Ads, Facebook, and other platforms"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Social Media Marketing",
                  "description": "Strategic social media marketing across Facebook, Instagram, LinkedIn, and Twitter"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Content Marketing Services",
                  "description": "Full-service content marketing agency offering content marketing strategy, B2B content marketing, blog content creation, video content marketing, content marketing for SEO, content marketing campaigns, and content marketing consulting. Expert content creation services driving engagement and conversions"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Email Marketing",
                  "description": "Email marketing campaigns to nurture leads and retain customers"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Digital Marketing Strategy",
                  "description": "Comprehensive digital marketing strategy tailored to your business goals"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Local SEO Services",
                  "description": "Local SEO optimization for businesses targeting specific geographic areas. Google My Business optimization, local citations, local link building, and location-based keyword targeting"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Technical SEO Audit",
                  "description": "Comprehensive technical SEO audit and optimization including site speed, mobile-friendliness, crawlability, indexation, schema markup, and core web vitals optimization"
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
              "name": "What is digital marketing?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Digital marketing is the promotion of brands and businesses through digital channels such as search engines, social media, email, and websites. It encompasses SEO, PPC, content marketing, social media marketing, and more to reach customers online."
              }
            },
            {
              "@type": "Question",
              "name": "How to start digital marketing?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "To start digital marketing: 1) Define your target audience and goals, 2) Build a professional website, 3) Implement SEO strategies, 4) Create valuable content, 5) Engage on social media, 6) Use email marketing, 7) Track and analyze results. Our digital marketing agency can guide you through each step."
              }
            },
            {
              "@type": "Question",
              "name": "What is SEO in digital marketing?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "SEO (Search Engine Optimization) in digital marketing is the practice of optimizing websites to rank higher in search engine results. It includes keyword research, on-page optimization, technical SEO, link building, and content creation to increase organic traffic."
              }
            },
            {
              "@type": "Question",
              "name": "How to get into digital marketing?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "To get into digital marketing: 1) Learn digital marketing fundamentals through courses or certifications, 2) Gain practical experience through internships or personal projects, 3) Specialize in areas like SEO, PPC, or social media, 4) Build a portfolio, 5) Network with professionals. Consider our digital marketing course offerings."
              }
            },
            {
              "@type": "Question",
              "name": "Is digital marketing worth it for small business?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, digital marketing is highly valuable for small businesses. It offers cost-effective ways to reach targeted audiences, compete with larger companies, measure ROI precisely, and build brand awareness. Our digital marketing services for small businesses start from affordable packages."
              }
            },
            {
              "@type": "Question",
              "name": "What does a digital marketing agency do?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A digital marketing agency creates and implements online marketing strategies for businesses. Services include SEO, PPC advertising, social media management, content creation, email marketing, web design, analytics, and conversion optimization. We help businesses grow their online presence and generate more leads."
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
    
    // Add CSS animation dynamically
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes testimonialScroll {
        from { transform: translateX(0); }
        to { transform: translateX(-33.333%); }
      }
      
      /* Hide scrollbar on mobile reviews section */
      @media (max-width: 768px) {
        [ref="testimonialRef"]::-webkit-scrollbar,
        div[style*="overflow: auto"]::-webkit-scrollbar {
          display: none !important;
        }
        
        .mobile-scroll-item {
          scroll-snap-align: start !important;
          scroll-snap-stop: always !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Cleanup function
    return () => {
      document.head.removeChild(style);
      // Note: We don't remove meta tags and structured data as they should persist
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle scroll for testimonial indicators
  useEffect(() => {
    const handleTestimonialScroll = () => {
      if (testimonialRef.current && isMobile) {
        const container = testimonialRef.current;
        const scrollLeft = container.scrollLeft;
        const itemWidth = container.offsetWidth * 0.85; // 85vw
        const index = Math.round(scrollLeft / itemWidth);
        setCurrentTestimonialIndex(index);
      }
    };

    if (testimonialRef.current && isMobile) {
      testimonialRef.current.addEventListener('scroll', handleTestimonialScroll);
      return () => {
        if (testimonialRef.current) {
          testimonialRef.current.removeEventListener('scroll', handleTestimonialScroll);
        }
      };
    }
  }, [isMobile]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handlePortfolioClick = (item) => {
    setSelectedPortfolioItem(item);
    setModalOpen(true);
  };

  return (
    <div className="content-page digital-marketing-page" style={{
      ...styles.page,
      marginTop: isMobile ? '-70px' : '-90px'
    }}>
      {/* Hero Section */}
      <HeroSection scrollY={scrollY} isMobile={isMobile} />
      
      {/* Services Section */}
      <div className="services-section" style={{
        padding: isMobile ? '3rem 1rem' : '6rem 2rem',
        background: 'rgba(13,17,23,0.95)',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '900',
            textAlign: 'center',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'block',
            width: '100%'
          }}>
            Our Digital Marketing Services
          </h2>
          
          <p style={{
            fontSize: isMobile ? '1.1rem' : '1.4rem',
            color: '#c9d1d9',
            textAlign: 'center',
            marginBottom: isMobile ? '2rem' : '4rem',
            maxWidth: '800px',
            margin: isMobile ? '0 auto 2rem' : '0 auto 4rem',
            lineHeight: '1.6',
            padding: isMobile ? '0 0.5rem' : '0'
          }}>
            Comprehensive solutions to elevate your brand and drive measurable results
          </p>
          
          <DetailedServicesSection 
            hoveredCard={hoveredCard}
            setHoveredCard={setHoveredCard}
          />
        </div>
      </div>
      
      {/* Portfolio Section */}
      <div id="portfolio" className="portfolio-section" style={{
        padding: isMobile ? '3rem 1rem' : '6rem 2rem',
        paddingBottom: isMobile ? '6rem' : '6rem', // Extra padding for fixed tabs on mobile
        background: 'linear-gradient(180deg, rgba(13,17,23,0.95) 0%, rgba(0,30,60,0.95) 100%)',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '900',
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: '#ffffff',
            display: 'block',
            width: '100%'
          }}>
            Portfolio Highlights
          </h2>
          
          <p style={{
            fontSize: isMobile ? '1.1rem' : '1.4rem',
            color: '#c9d1d9',
            textAlign: 'center',
            marginBottom: isMobile ? '2rem' : '3rem',
            maxWidth: '800px',
            margin: isMobile ? '0 auto 2rem' : '0 auto 3rem',
            padding: isMobile ? '0 0.5rem' : '0'
          }}>
            Real results from real clients across diverse industries
          </p>
          
          {/* Portfolio Filter Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: isMobile ? '0.5rem' : '1rem',
            marginBottom: '2rem',
            marginTop: '2rem',
            flexWrap: 'wrap',
            padding: isMobile ? '0 0.5rem' : '0'
          }}>
            {[
              { 
                id: 'all', 
                name: 'All Projects',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                  </svg>
                )
              },
              { 
                id: 'seo', 
                name: 'SEO',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                )
              },
              { 
                id: 'social', 
                name: 'Social',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                )
              },
              { 
                id: 'content', 
                name: 'Content',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                  </svg>
                )
              },
              { 
                id: 'affiliate', 
                name: 'Affiliate',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
                    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                  </svg>
                )
              }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: isMobile ? '0.6rem 1.2rem' : '0.75rem 2rem',
                  background: activeTab === tab.id ? 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)' : 'rgba(255, 255, 255, 0.1)',
                  color: activeTab === tab.id ? '#0d1117' : '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  borderRadius: '30px',
                  fontSize: isMobile ? '0.85rem' : '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'capitalize',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>
          
          <PortfolioGrid 
            portfolioItems={portfolioItems}
            activeTab={activeTab}
            handlePortfolioClick={handlePortfolioClick}
          />
        </div>
      </div>
      
      {/* Why Choose Us Section */}
      <WhyChooseUsSection />
      
      {/* Process Section */}
      <div className="process-section" style={{
        padding: isMobile ? '3rem 1rem' : '6rem 2rem',
        background: 'rgba(13,17,23,0.95)',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '900',
            textAlign: 'center',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'block',
            width: '100%'
          }}>
            Our Proven Digital Marketing Process
          </h2>
          
          <p style={{
            fontSize: isMobile ? '1.1rem' : '1.4rem',
            color: '#c9d1d9',
            textAlign: 'center',
            marginBottom: isMobile ? '2rem' : '4rem',
            maxWidth: '800px',
            margin: isMobile ? '0 auto 2rem' : '0 auto 4rem',
            lineHeight: '1.6',
            padding: isMobile ? '0 0.5rem' : '0'
          }}>
            A systematic approach to delivering exceptional results
          </p>
          
          <ProcessSteps process={process} />
        </div>
      </div>
      
      {/* Testimonials Section - Exact copy from Landing page */}
      <div className="testimonials-section" style={{
        padding: isMobile ? '3rem 0.5rem' : '6rem 2rem',
        background: 'linear-gradient(180deg, rgba(0,30,60,0.95) 0%, rgba(13,17,23,0.95) 100%)',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '900',
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: '#ffffff',
            display: 'block',
            width: '100%'
          }}>
            What Our Clients Say
          </h2>
          
          <p style={{
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            color: '#c9d1d9',
            textAlign: 'center',
            marginBottom: isMobile ? '2rem' : '4rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Real results from real businesses we've helped grow
          </p>

          {/* Reviews Carousel */}
          <div style={{ position: 'relative' }}>
            {/* Navigation Buttons for Desktop */}
            {!isMobile && (
              <>
                <button
                  onClick={() => {
                    if (testimonialRef.current) {
                      const container = testimonialRef.current;
                      const scrollAmount = 420; // card width + gap
                      const newScrollPos = Math.max(0, testimonialScrollPosition - scrollAmount);
                      container.scrollTo({
                        left: newScrollPos,
                        behavior: 'smooth'
                      });
                      setTestimonialScrollPosition(newScrollPos);
                    }
                  }}
                  style={{
                    position: 'absolute',
                    left: '-20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: '2px solid rgba(0, 255, 127, 0.3)',
                    color: '#00ff7f',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 255, 127, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.6)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                  }}
                  aria-label="Previous testimonial"
                >
                  ‹
                </button>
                <button
                  onClick={() => {
                    if (testimonialRef.current) {
                      const container = testimonialRef.current;
                      const scrollAmount = 420; // card width + gap
                      const maxScroll = container.scrollWidth - container.clientWidth;
                      const newScrollPos = Math.min(maxScroll, testimonialScrollPosition + scrollAmount);
                      container.scrollTo({
                        left: newScrollPos,
                        behavior: 'smooth'
                      });
                      setTestimonialScrollPosition(newScrollPos);
                    }
                  }}
                  style={{
                    position: 'absolute',
                    right: '-20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: '2px solid rgba(0, 255, 127, 0.3)',
                    color: '#00ff7f',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 255, 127, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.6)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                  }}
                  aria-label="Next testimonial"
                >
                  ›
                </button>
              </>
            )}
            
            <div
              ref={testimonialRef}
              style={{
                position: 'relative',
                width: '100%',
                overflow: isMobile ? 'auto' : 'hidden',
                overflowX: isMobile ? 'auto' : 'scroll',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                padding: isMobile ? '2rem 0' : '3rem 0',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitOverflowScrolling: 'touch',
                scrollSnapType: isMobile ? 'x mandatory' : 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
              onScroll={(e) => {
                if (!isMobile) {
                  setTestimonialScrollPosition(e.target.scrollLeft);
                }
              }}
            >
            {/* Scrolling Container */}
            <div
              className={isMobile ? 'mobile-scroll-container' : ''}
              style={{
                display: 'flex',
                animation: 'none',
                gap: isMobile ? '1rem' : '2rem',
                paddingLeft: isMobile ? '1rem' : '2rem',
                paddingRight: isMobile ? '1rem' : '2rem',
                width: 'fit-content',
                willChange: 'transform'
              }}
            >
              {/* Display all testimonials */}
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={isMobile ? 'mobile-scroll-item' : ''}
                  style={{
                    minWidth: isMobile ? '90vw' : '400px',
                    width: isMobile ? '90vw' : '400px',
                    maxWidth: isMobile ? '350px' : '450px',
                    flexShrink: 0,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px',
                    padding: isMobile ? '1.25rem' : '2rem',
                    position: 'relative',
                    cursor: 'pointer',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    willChange: 'auto',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    scrollSnapAlign: 'start',
                    scrollSnapStop: isMobile ? 'always' : 'normal'
                  }}
                  onClick={() => {
                    if (isMobile && testimonial.image) {
                      setSelectedTestimonial(selectedTestimonial === index ? null : index);
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.3)';
                    e.currentTarget.style.background = 'rgba(0, 255, 127, 0.02)';
                    e.currentTarget.style.transform = 'scale(1.02) translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  }}
                >
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
                        style={{ opacity: 0.8 }}
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>

                  {/* Review Content */}
                  <p style={{
                    fontSize: isMobile ? '0.95rem' : '1.1rem',
                    color: '#c9d1d9',
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
                    <div style={{ position: 'relative', width: '50px', height: '50px' }}>
                      {testimonial.image && (
                        <img 
                          src={testimonial.image}
                          alt={testimonial.author}
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid rgba(0, 255, 127, 0.3)',
                            position: 'absolute',
                            top: 0,
                            left: 0
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                      {!testimonial.image && (
                        <div style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #00ff7f 0%, #00cc66 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          color: '#0d1117'
                        }}>
                          {testimonial.author.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#ffffff',
                        marginBottom: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        {testimonial.author}
                        {testimonial.flag && testimonial.flag === '🇺🇸' && (
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
                        {testimonial.flag && testimonial.flag === '🇿🇦' && (
                          <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                            <rect width="24" height="5.33" fill="#007A4D"/>
                            <rect y="5.33" width="24" height="5.34" fill="#FFFFFF"/>
                            <rect y="10.67" width="24" height="5.33" fill="#002395"/>
                            <polygon points="0,0 10,8 0,16" fill="#000000"/>
                            <polygon points="0,0 8,8 0,16" fill="#FFB612"/>
                            <polygon points="0,0 6,8 0,16" fill="#DE3831"/>
                          </svg>
                        )}
                        {testimonial.flag && testimonial.flag === '🇱🇰' && (
                          <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                            <rect width="24" height="16" fill="#FFBE29"/>
                            <rect x="6" width="18" height="8" fill="#8B4513"/>
                            <rect x="6" y="8" width="18" height="8" fill="#00534E"/>
                            <rect width="6" height="16" fill="#FBB917"/>
                            <path d="M3,4 L2,5 L1,4 L1,6 L2,7 L3,6 Z" fill="#8B0000" transform="translate(0,2)"/>
                          </svg>
                        )}
                        {testimonial.flag && testimonial.flag === '🇦🇺' && (
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
                        {testimonial.flag && testimonial.flag === '🇭🇺' && (
                          <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                            <rect width="24" height="5.33" fill="#CD2A3E"/>
                            <rect y="5.33" width="24" height="5.34" fill="#FFFFFF"/>
                            <rect y="10.67" width="24" height="5.33" fill="#436F4D"/>
                          </svg>
                        )}
                        {testimonial.flag && testimonial.flag === '🇨🇦' && (
                          <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                            <rect width="6" height="16" fill="#FF0000"/>
                            <rect x="6" width="12" height="16" fill="#FFFFFF"/>
                            <rect x="18" width="6" height="16" fill="#FF0000"/>
                            <path d="M12,4 L11.5,5.5 L10,5.5 L11,6.5 L10.5,8 L12,7 L13.5,8 L13,6.5 L14,5.5 L12.5,5.5 Z" fill="#FF0000"/>
                          </svg>
                        )}
                        {testimonial.flag && testimonial.flag === '🇩🇪' && (
                          <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                            <rect width="24" height="5.33" fill="#000000"/>
                            <rect y="5.33" width="24" height="5.34" fill="#DD0000"/>
                            <rect y="10.67" width="24" height="5.33" fill="#FFCE00"/>
                          </svg>
                        )}
                        {testimonial.flag && testimonial.flag === '🇬🇧' && (
                          <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                            <rect width="24" height="16" fill="#012169"/>
                            <path d="M0,0 L24,16 M24,0 L0,16" stroke="white" strokeWidth="3"/>
                            <path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" strokeWidth="1"/>
                            <path d="M12,0 L12,16 M0,8 L24,8" stroke="white" strokeWidth="5"/>
                            <path d="M12,0 L12,16 M0,8 L24,8" stroke="#C8102E" strokeWidth="3"/>
                          </svg>
                        )}
                        {testimonial.flag && testimonial.flag === '🇫🇮' && (
                          <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                            <rect width="24" height="16" fill="#FFFFFF"/>
                            <rect x="7" width="4" height="16" fill="#003580"/>
                            <rect y="6" width="24" height="4" fill="#003580"/>
                          </svg>
                        )}
                        {testimonial.flag && testimonial.flag === '🇪🇸' && (
                          <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                            <rect width="24" height="4" fill="#C60B1E"/>
                            <rect y="4" width="24" height="8" fill="#FFC400"/>
                            <rect y="12" width="24" height="4" fill="#C60B1E"/>
                          </svg>
                        )}
                      </h4>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#888',
                        margin: 0
                      }}>
                        {testimonial.position} • {testimonial.company}
                        {testimonial.date && ` • ${testimonial.date}`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Scroll Indicator Dots */}
          {isMobile && testimonials.length > 1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '2rem',
              padding: '0 1rem'
            }}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (testimonialRef.current) {
                      const container = testimonialRef.current;
                      const itemWidth = container.offsetWidth * 0.85;
                      container.scrollTo({
                        left: index * itemWidth,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  style={{
                    width: currentTestimonialIndex === index ? '12px' : '4px',
                    height: '4px',
                    borderRadius: '2px',
                    border: 'none',
                    background: currentTestimonialIndex === index 
                      ? 'linear-gradient(90deg, #00ff7f 0%, #00cc63 100%)' 
                      : 'rgba(255, 255, 255, 0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
      
      {/* Meet Our Team Section */}
      <div style={{
        padding: isMobile ? '3rem 1rem' : '6rem 2rem',
        background: 'linear-gradient(180deg, rgba(13,17,23,0.98) 0%, rgba(13,17,23,0.95) 100%)',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '900',
            textAlign: 'center',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Meet Our Marketing Team
          </h2>
          
          <p style={{
            fontSize: isMobile ? '1.1rem' : '1.4rem',
            color: '#c9d1d9',
            textAlign: 'center',
            marginBottom: isMobile ? '2rem' : '4rem',
            maxWidth: '800px',
            margin: isMobile ? '0 auto 2rem' : '0 auto 4rem',
            padding: isMobile ? '0 0.5rem' : '0'
          }}>
            Expert strategists driving your digital growth
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                name: 'Adnan',
                role: 'Digital Marketing Expert',
                expertise: 'SEO, Paid Ads & Affiliate Marketing',
                image: '/images/team/marketing-director.webp',
                bio: 'Professional Semantic SEO expert and consultant with topical authority in blogging and affiliate marketing. Specializing in ROI-driven campaigns across Facebook, Instagram, TikTok, and Google Ads for Shopify stores and businesses.',
                experience: '7+ years',
                achievement: 'ROI Expert'
              },
              {
                name: 'Salaar Khan',
                role: 'Content Marketing Lead',
                expertise: 'Organic Content & Viral Growth',
                image: '/images/team/content-marketing-lead.webp',
                bio: '8 years of experience in organic content marketing with 3 BILLION+ views generated. Expert in viral content strategies and audience growth.',
                experience: '8+ years',
                achievement: '3B+ Views Generated'
              }
            ].map((member, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(22, 27, 34, 0.8)',
                  border: '1px solid rgba(0, 255, 127, 0.2)',
                  borderRadius: '16px',
                  padding: '2rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 255, 127, 0.2)';
                  e.currentTarget.style.borderColor = '#00ff7f';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.2)';
                }}
              >
                {/* Marketing Pattern Background */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '150px',
                  height: '150px',
                  background: 'radial-gradient(circle, rgba(0, 255, 127, 0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                  transform: 'translate(50%, -50%)'
                }} />

                {/* Profile Image */}
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  margin: '0 auto 1.5rem',
                  border: '3px solid #00ff7f',
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
                  color: '#00ff7f',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  textAlign: 'center'
                }}>
                  {member.role}
                </p>

                <p style={{
                  fontSize: '0.85rem',
                  color: 'rgba(0, 255, 127, 0.8)',
                  marginBottom: '1rem',
                  textAlign: 'center',
                  fontStyle: 'italic'
                }}>
                  {member.expertise}
                </p>

                <p style={{
                  fontSize: '0.95rem',
                  color: '#c9d1d9',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  {member.bio}
                </p>

                {/* Experience Badge */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    padding: '0.25rem 1rem',
                    background: 'rgba(0, 255, 127, 0.1)',
                    border: '1px solid rgba(0, 255, 127, 0.3)',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    color: '#00ff7f',
                    fontWeight: '600'
                  }}>
                    {member.experience}
                  </span>
                  {member.achievement && (
                    <span style={{
                      padding: '0.25rem 1rem',
                      background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 140, 0, 0.2))',
                      border: '1px solid rgba(255, 215, 0, 0.5)',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      color: '#ffd700',
                      fontWeight: '700',
                      textShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
                    }}>
                      ⭐ {member.achievement}
                    </span>
                  )}
                </div>

                {/* Marketing Icons */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  display: 'flex',
                  gap: '0.5rem',
                  opacity: 0.3
                }}>
                  <div style={{ color: '#00ff7f' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div style={{ color: '#00ff7f' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="20" x2="18" y2="10"/>
                      <line x1="12" y1="20" x2="12" y2="4"/>
                      <line x1="6" y1="20" x2="6" y2="14"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <CTASection />
      
      {/* CSS Animations */}
      <style>{animations}</style>
      
      {/* Portfolio Modal */}
      <PortfolioModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={selectedPortfolioItem}
        onNavigate={(newItem) => setSelectedPortfolioItem(newItem)}
      />
    </div>
  );
};

export default DigitalMarketingSEO;