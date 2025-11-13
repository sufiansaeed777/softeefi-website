import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { space, fontSize, fontWeight, lineHeight, transition, colors, zIndex } from '../../utils/designTokens';
import LazyImage from '../../components/LazyImage';

// Enhanced UI/UX Icons with better design
const DesignSystemIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6.5 6.5L17.5 17.5M17.5 6.5L6.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PrototypeIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="8" cy="8" r="1" fill="currentColor"/>
    <circle cx="12" cy="8" r="1" fill="currentColor"/>
    <circle cx="16" cy="8" r="1" fill="currentColor"/>
    <path d="M8 12H16M8 16H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const UserFlowIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="15" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="9" y="11" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="9" y="19" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6 7V9C6 10.1046 6.89543 11 8 11H9M18 7V9C18 10.1046 17.1046 11 16 11H15M12 15V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ResearchIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M15 15L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 7C8.34315 7 7 8.34315 7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Enhanced Wireframe Decorations
const WireframeDecorations = ({ sectionRef, isMobile }) => {
  const [wireframePosition, setWireframePosition] = useState({ top: '10%' });
  
  useEffect(() => {
    if (sectionRef?.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const absoluteTop = rect.top + scrollTop;
      // Position wireframe 200px above the section
      setWireframePosition({ top: `${absoluteTop - 200}px` });
    }
  }, [sectionRef]);

  return (
  <>
    {/* Top Web Wireframe - Positioned at the top */}
    <motion.div
      animate={{
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        position: 'absolute',
        top: isMobile ? '2%' : '5%',
        left: isMobile ? '-10%' : '2%',
        width: isMobile ? '280px' : '450px',
        height: isMobile ? '350px' : '550px',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: isMobile ? 0.25 : 0.3,
        transform: isMobile ? 'scale(0.9)' : 'scale(1)',
      }}
    >
      <svg viewBox="0 0 350 450" fill="none" stroke="#00ff7f" strokeWidth="1" opacity="0.3">
        {/* Browser Window */}
        <rect x="10" y="10" width="330" height="430" rx="8" />
        <rect x="10" y="10" width="330" height="40" rx="8" />
        <circle cx="30" cy="30" r="5" />
        <circle cx="50" cy="30" r="5" />
        <circle cx="70" cy="30" r="5" />
        <rect x="100" y="20" width="200" height="20" rx="10" />
        
        {/* Navigation */}
        <rect x="30" y="70" width="290" height="40" rx="5" />
        <line x1="80" y1="70" x2="80" y2="110" />
        <line x1="130" y1="70" x2="130" y2="110" />
        <line x1="180" y1="70" x2="180" y2="110" />
        <line x1="230" y1="70" x2="230" y2="110" />
        
        {/* Hero Section */}
        <rect x="30" y="130" width="290" height="120" rx="5" />
        <rect x="50" y="150" width="120" height="80" rx="5" />
        <rect x="190" y="150" width="110" height="20" rx="5" />
        <rect x="190" y="180" width="90" height="15" rx="5" />
        <rect x="190" y="205" width="70" height="25" rx="12" />
        
        {/* Content Grid */}
        <rect x="30" y="270" width="85" height="85" rx="5" />
        <rect x="132.5" y="270" width="85" height="85" rx="5" />
        <rect x="235" y="270" width="85" height="85" rx="5" />
        
        {/* Footer */}
        <rect x="30" y="375" width="290" height="50" rx="5" />
      </svg>
    </motion.div>

    {/* Bottom Mobile Wireframe - Positioned at the bottom of page */}
    <motion.div
      animate={{
        opacity: [0.3, 0.5, 0.3],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        position: 'absolute',
        bottom: isMobile ? '2%' : '5%',
        right: isMobile ? '-5%' : '5%',
        width: isMobile ? '200px' : '250px',
        height: isMobile ? '400px' : '500px',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: isMobile ? 0.25 : 0.3,
        transform: isMobile ? 'scale(0.85)' : 'scale(1)',
      }}
    >
      <svg viewBox="0 0 200 400" fill="none" stroke="#00ff7f" strokeWidth="1" opacity="0.3">
        {/* Phone Frame */}
        <rect x="10" y="10" width="180" height="380" rx="20" />
        <rect x="10" y="10" width="180" height="380" rx="20" />
        <rect x="80" y="20" width="40" height="5" rx="2.5" />
        
        {/* Screen Content */}
        <rect x="25" y="50" width="150" height="60" rx="5" />
        <rect x="25" y="125" width="70" height="70" rx="5" />
        <rect x="105" y="125" width="70" height="70" rx="5" />
        <rect x="25" y="210" width="150" height="40" rx="5" />
        <rect x="25" y="265" width="100" height="15" rx="5" />
        <rect x="25" y="290" width="120" height="15" rx="5" />
        <rect x="25" y="315" width="80" height="15" rx="5" />
        
        {/* Bottom Navigation */}
        <circle cx="50" cy="360" r="15" />
        <circle cx="100" cy="360" r="15" />
        <circle cx="150" cy="360" r="15" />
      </svg>
    </motion.div>

    {/* Center Floating Components - Positioned above Experience section */}
    <motion.div
      animate={{
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        position: 'absolute',
        top: sectionRef?.current ? `${parseInt(wireframePosition.top) + (isMobile ? 50 : 100)}px` : '50%',
        right: isMobile ? '5%' : '25%',
        width: isMobile ? '220px' : '300px',
        height: isMobile ? '140px' : '180px',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: isMobile ? 0.2 : 0.25,
        transform: isMobile ? 'scale(0.9)' : 'scale(1)',
      }}
    >
      <svg viewBox="0 0 250 150" fill="none" stroke="#00ff7f" strokeWidth="1" opacity="0.25">
        {/* Component Cards */}
        <rect x="10" y="10" width="70" height="130" rx="8" />
        <rect x="90" y="10" width="70" height="130" rx="8" />
        <rect x="170" y="10" width="70" height="130" rx="8" />
        
        {/* Content placeholders */}
        <rect x="20" y="20" width="50" height="50" rx="5" />
        <rect x="20" y="80" width="40" height="10" rx="5" />
        <rect x="20" y="100" width="50" height="8" rx="4" />
        <rect x="20" y="115" width="30" height="8" rx="4" />
        
        <rect x="100" y="20" width="50" height="50" rx="5" />
        <rect x="100" y="80" width="40" height="10" rx="5" />
        <rect x="100" y="100" width="50" height="8" rx="4" />
        <rect x="100" y="115" width="30" height="8" rx="4" />
        
        <rect x="180" y="20" width="50" height="50" rx="5" />
        <rect x="180" y="80" width="40" height="10" rx="5" />
        <rect x="180" y="100" width="50" height="8" rx="4" />
        <rect x="180" y="115" width="30" height="8" rx="4" />
      </svg>
    </motion.div>
  </>
  );
};

// Interactive 3D Card Component
const Interactive3DCard = ({ children, delay = 0, isMobile }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotateX((y - 0.5) * -20);
    setRotateY((x - 0.5) * 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </motion.div>
  );
};

// Floating Particles with Purple Theme
const FloatingParticles = ({ isMobile }) => {
  const particleCount = isMobile ? 10 : 30; // Reduce particles on mobile for performance
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {Array(particleCount).fill(0).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          style={{
            position: 'absolute',
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            background: `${Math.random() > 0.5 ? `rgba(147, 51, 234, ${Math.random() * 0.5 + 0.3})` : `rgba(0, 255, 127, ${Math.random() * 0.5 + 0.3})`}`,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

// Interactive Feature Card
const FeatureCard = ({ icon, title, description, features, delay, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Interactive3DCard delay={delay} isMobile={isMobile}>
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => window.location.href = '/contact'}
        className="card"
        style={{
          background: isHovered 
            ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.08) 0%, rgba(147, 51, 234, 0.02) 100%)'
            : colors.black.secondary,
          backdropFilter: 'blur(20px)',
          padding: isMobile ? '15px' : space['2xl'],
          border: `1px solid ${isHovered ? colors.green.accent : 'rgba(147, 51, 234, 0.2)'}`,
          height: '100%',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          transition: transition.base,
          boxShadow: isHovered 
            ? '0 20px 40px rgba(147, 51, 234, 0.15)'
            : '0 10px 30px rgba(0, 0, 0, 0.08)',
          boxSizing: 'border-box',
        }}
      >
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'radial-gradient(circle at top left, rgba(147, 51, 234, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        
        <motion.div
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.8 }}
          style={{ 
            color: '#00ff7f', 
            marginBottom: '20px',
            display: 'inline-block',
          }}
        >
          {icon}
        </motion.div>
        
        <h3 style={{ 
          fontSize: isMobile ? '1.4rem' : '1.8rem', 
          marginBottom: isMobile ? '10px' : '15px',
          color: '#fff',
          fontWeight: '600',
        }}>
          {title}
        </h3>
        
        <p style={{ 
          color: '#e0e0e0', 
          marginBottom: '25px',
          lineHeight: '1.8',
          fontSize: isMobile ? '0.95rem' : '1.05rem',
        }}>
          {description}
        </p>
        
        <motion.ul 
          style={{ listStyle: 'none', padding: 0 }}
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
        >
          {features.map((feature, idx) => (
            <motion.li
              key={idx}
              variants={{
                hidden: { opacity: 0.7, x: -10 },
                visible: { opacity: 1, x: 0 }
              }}
              style={{
                padding: '10px 0',
                color: '#e0e0e0',
                fontSize: isMobile ? '0.85rem' : '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <motion.span
                animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
                transition={{ delay: idx * 0.1 }}
                style={{ color: '#00ff7f', fontSize: '1.2rem' }}
              >
                ◆
              </motion.span>
              {feature}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </Interactive3DCard>
  );
};

// Process Timeline Component
const ProcessTimeline = ({ steps, isMobile }) => {
  const [activeStep, setActiveStep] = useState(0);
  
  return (
    <div style={{ position: 'relative', padding: '40px 0' }}>
      {/* Timeline line */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '0',
        right: '0',
        height: '2px',
        background: 'rgba(147, 51, 234, 0.2)',
        transform: 'translateY(-50%)',
      }}>
        <motion.div
          animate={{ width: `${(activeStep + 1) * 25}%` }}
          transition={{ duration: 0.5 }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #00ff7f 0%, #9333ea 100%)',
            boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)',
          }}
        />
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
        gap: isMobile ? '20px' : '30px',
        position: 'relative',
      }}>
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            onMouseEnter={() => setActiveStep(index)}
            onClick={() => setActiveStep(index)}
            style={{
              textAlign: 'center',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              animate={{
                scale: activeStep === index ? 1.1 : 1,
                backgroundColor: activeStep === index ? '#00ff7f' : 'rgba(30, 30, 30, 0.9)',
              }}
              style={{
                width: isMobile ? '80px' : '120px',
                height: isMobile ? '80px' : '120px',
                margin: '0 auto 20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #00ff7f',
                position: 'relative',
                boxShadow: activeStep === index 
                  ? '0 0 30px rgba(147, 51, 234, 0.3)'
                  : '0 5px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              <motion.div
                animate={{ 
                  color: activeStep === index ? '#000' : '#00ff7f',
                }}
              >
                {step.icon}
              </motion.div>
              
              {/* Pulse effect */}
              {activeStep === index && (
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  style={{
                    position: 'absolute',
                    inset: -2,
                    border: '2px solid #00ff7f',
                    borderRadius: '50%',
                  }}
                />
              )}
            </motion.div>
            
            <motion.h3
              animate={{ color: activeStep === index ? '#00ff7f' : '#e0e0e0' }}
              style={{ fontSize: '1.5rem', marginBottom: '10px' }}
            >
              {step.number}
            </motion.h3>
            
            <h4 style={{ fontSize: isMobile ? '1rem' : '1.2rem', marginBottom: '10px', color: '#ffffff' }}>
              {step.title}
            </h4>
            
            <p style={{ 
              color: '#e0e0e0', 
              fontSize: isMobile ? '0.85rem' : '0.95rem',
              lineHeight: '1.6',
              maxWidth: isMobile ? '150px' : '250px',
              margin: '0 auto',
            }}>
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Main Component
const UIUXDesign = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);
  const experienceSectionRef = useRef(null);

  useEffect(() => {
    // SEO Optimization for UI/UX Design
    document.title = 'UI UX Design Services UK | UX Design Agency & UI Designer - Softeefi';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Professional UI UX design services UK. Expert UX design agency creating user-centered designs. UI designer services for web and mobile apps. User experience design, prototyping, and usability testing.';
    } else {
      const newMetaDesc = document.createElement('meta');
      newMetaDesc.name = 'description';
      newMetaDesc.content = 'Professional UI UX design services UK. Expert UX design agency creating user-centered designs. UI designer services for web and mobile apps. User experience design, prototyping, and usability testing.';
      document.head.appendChild(newMetaDesc);
    }
    
    // Add meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'ui ux design, ui ux design services, ux design agency, ui designer, ux designer, ui ux designer, user experience design, user interface design, ui ux design company, ui ux design uk, ux design services, ui design services, mobile app ui design, web ui design, ux research, user testing, wireframing, prototyping, interaction design, visual design, design system, figma design, responsive design, accessibility design, ui ux consultancy, product design, ux strategy';
    
    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://softeefi.co.uk/services/ui-ux-design';
    
    // Add Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'UI UX Design Services | User Experience Design Agency UK - Softeefi' },
      { property: 'og:description', content: 'Leading UI UX design agency UK. Professional user experience and interface design services. Expert UI UX designers creating intuitive, user-centered designs for web and mobile.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://softeefi.co.uk/services/ui-ux-design' },
      { property: 'og:image', content: 'https://softeefi.co.uk/images/ui-ux-design-og.jpg' }
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
    
    // Add structured data
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
              "name": "UI/UX Design",
              "item": "https://softeefi.co.uk/services/ui-ux-design"
            }
          ]
        },
        {
          "@type": "Service",
          "name": "UI UX Design Services",
          "description": "Professional UI UX design services including user experience design, interface design, prototyping, and usability testing",
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
            "name": "UI UX Design Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "User Experience (UX) Design",
                  "description": "Complete UX design services including research, wireframing, and prototyping"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "User Interface (UI) Design",
                  "description": "Beautiful and functional UI design for web and mobile applications"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Design Systems",
                  "description": "Scalable design systems and component libraries for consistent user experience"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "UX Research & Testing",
                  "description": "User research, usability testing, and data-driven design improvements"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Mobile App Design",
                  "description": "Native and responsive mobile app UI UX design for iOS and Android"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Web Design",
                  "description": "Responsive web design with focus on user experience and conversion"
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
              "name": "What is UI UX design?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "UI UX design combines User Interface (UI) design - the visual elements users interact with, and User Experience (UX) design - how users feel when using a product. Our UI UX design services create intuitive, aesthetically pleasing, and functional digital experiences."
              }
            },
            {
              "@type": "Question",
              "name": "How much do UI UX design services cost?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "UI UX design services typically range from £2,000 for basic projects to £50,000+ for comprehensive design systems. Costs depend on project scope, complexity, and deliverables. We offer flexible pricing models to suit different budgets."
              }
            },
            {
              "@type": "Question",
              "name": "What does a UX design agency do?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A UX design agency conducts user research, creates user personas and journeys, designs wireframes and prototypes, performs usability testing, and develops design strategies to improve user satisfaction and business outcomes."
              }
            },
            {
              "@type": "Question",
              "name": "How long does UI UX design take?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "UI UX design projects typically take 4-12 weeks depending on complexity. Simple designs may take 2-4 weeks, while comprehensive design systems can take 3-6 months. Our process includes research, design, testing, and iteration phases."
              }
            },
            {
              "@type": "Question",
              "name": "What's the difference between UI and UX design?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "UX design focuses on the overall user experience, usability, and functionality. UI design concentrates on visual elements, typography, colors, and interactive components. Both work together to create successful digital products."
              }
            },
            {
              "@type": "Question",
              "name": "Why is UI UX design important for business?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Good UI UX design increases user satisfaction, improves conversion rates, reduces development costs, and builds brand loyalty. Studies show that every £1 invested in UX design returns £100 in value, making it crucial for business success."
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
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current && !isMobile) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const container = containerRef.current;
    if (container && !isMobile) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isMobile]);

  const services = [
    {
      id: 'research',
      title: 'UX Research',
      icon: <ResearchIcon />,
      description: 'Data-driven insights that inform design decisions and validate concepts.',
      features: [
        'User Interviews & Surveys',
        'Competitive Analysis',
        'Journey Mapping',
        'Analytics & Heatmaps',
        'A/B Testing',
        'Usability Studies'
      ]
    },
    {
      id: 'design',
      title: 'UI Design Systems',
      icon: <DesignSystemIcon />,
      description: 'Scalable design systems that ensure consistency across all touchpoints.',
      features: [
        'Component Libraries',
        'Style Guides',
        'Design Tokens',
        'Responsive Frameworks',
        'Accessibility Standards',
        'Brand Guidelines'
      ]
    },
    {
      id: 'prototype',
      title: 'Interactive Prototypes',
      icon: <PrototypeIcon />,
      description: 'High-fidelity prototypes that bring ideas to life before development.',
      features: [
        'Clickable Prototypes',
        'Micro-interactions',
        'Animation Design',
        'User Testing Ready',
        'Developer Handoff',
        'Version Control'
      ]
    },
    {
      id: 'flow',
      title: 'User Flow Design',
      icon: <UserFlowIcon />,
      description: 'Optimized user journeys that reduce friction and increase conversions.',
      features: [
        'Information Architecture',
        'Navigation Design',
        'Conversion Optimization',
        'Error State Design',
        'Onboarding Flows',
        'Multi-platform Experiences'
      ]
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Discover",
      description: "Deep dive into user needs and business objectives",
      icon: <ResearchIcon />
    },
    {
      number: "02",
      title: "Define",
      description: "Synthesize insights into actionable design strategies",
      icon: <DesignSystemIcon />
    },
    {
      number: "03",
      title: "Design",
      description: "Create innovative solutions with meticulous attention to detail",
      icon: <PrototypeIcon />
    },
    {
      number: "04",
      title: "Deliver",
      description: "Launch pixel-perfect designs with comprehensive documentation",
      icon: <UserFlowIcon />
    }
  ];

  const metrics = [
    { label: "User Satisfaction", value: "98%", change: "+15%" },
    { label: "Task Completion", value: "87%", change: "+23%" },
    { label: "Time on Task", value: "-45%", change: "Reduced" },
    { label: "Conversion Rate", value: "3.2x", change: "Increase" }
  ];

  return (
    <div ref={containerRef} style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a2e1a 50%, #2d1b3d 100%)',
      color: '#fff',
      position: 'relative',
      overflow: isMobile ? 'hidden' : 'hidden',
      overflowX: 'hidden',
      marginTop: isMobile ? '-70px' : '-90px',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box'
    }}>
      <WireframeDecorations sectionRef={experienceSectionRef} isMobile={isMobile} />
      
      {/* Hero Section with Parallax */}
      <section style={{ 
        minHeight: isMobile ? '50vh' : '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: isMobile ? '150px' : '170px',
        paddingBottom: isMobile ? space['xl'] : space['4xl'],
        paddingLeft: isMobile ? space.md : space.xl,
        paddingRight: isMobile ? space.md : space.xl,
        marginTop: isMobile ? '0' : '-80px'
      }}>
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(0, 255, 127, 0.1) 0%, rgba(147, 51, 234, 0.08) 50%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
        
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: zIndex.base }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{
              fontSize: `clamp(${fontSize['5xl']}, 8vw, ${fontSize['6xl']})`,
              fontWeight: fontWeight.bold,
              marginBottom: space.xl,
              lineHeight: lineHeight.tight,
            }}>
              <span style={{
                color: '#00ff7f',
                display: 'inline-block',
                textShadow: '0 0 40px rgba(0, 255, 127, 0.5)',
              }}>
                UI/UX Design
              </span>
              <br />
              <span style={{ fontSize: '0.6em', color: '#666' }}>
                That Delights Users
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: `clamp(${fontSize.xl}, 2vw, ${fontSize['2xl']})`,
                color: '#e0e0e0',
                maxWidth: '800px',
                margin: `0 auto ${space['3xl']}`,
                lineHeight: lineHeight.relaxed,
              }}
            >
              Creating intuitive digital experiences that seamlessly blend beauty with functionality, 
              backed by research and refined through iteration.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ display: 'flex', gap: space.lg, justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <motion.button
                className="button"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(147, 51, 234, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/contact'}
                style={{
                  background: 'linear-gradient(135deg, #9333ea 0%, #00ff7f 100%)',
                  color: colors.text.heading,
                  fontSize: fontSize.lg,
                }}
              >
                Start Your Project
              </motion.button>
              
              <motion.button
                className="button button-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.getElementById('portfolio-section')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                style={{
                  padding: isMobile ? '12px 24px' : '14px 32px',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: fontWeight.semibold,
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #00ff7f 0%, #00af60 100%)',
                  color: '#000',
                  fontSize: fontSize.lg,
                }}
              >
                View Portfolio
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* Animated metrics */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: space.xl,
              marginTop: '100px',
            }}
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                whileHover={{ y: -5 }}
                style={{
                  background: 'rgba(20, 20, 20, 0.9)',
                  border: '1px solid rgba(0, 255, 127, 0.3)',
                  borderRadius: '15px',
                  padding: '30px',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 10px 30px rgba(147, 51, 234, 0.2)',
                }}
              >
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  style={{
                    fontSize: '2.5rem',
                    color: '#00ff7f',
                    marginBottom: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  {metric.value}
                </motion.h3>
                <p style={{ color: '#ffffff', marginBottom: '5px' }}>{metric.label}</p>
                <p style={{ color: '#7c3aed', fontSize: '0.9rem' }}>{metric.change}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ 
        position: 'relative',
        padding: isMobile ? '40px 10px' : '80px 20px'
      }}>
        <div style={{ maxWidth: isMobile ? '100%' : '1400px', margin: '0 auto', padding: isMobile ? '0 10px' : '0' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: space['4xl'] }}
          >
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #00ff7f 0%, #9333ea 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              fontWeight: 'bold',
              paddingRight: '0.3em', // Increased padding to prevent clipping
              paddingLeft: '0.1em', // Add left padding too
              lineHeight: '1.3', // Increased line height
              letterSpacing: '0.02em', // Add letter spacing
            }}>
              Design Services
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#e0e0e0',
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              Comprehensive design solutions tailored to your unique needs
            </p>
          </motion.div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: isMobile ? '15px' : space.xl,
            width: '100%',
            boxSizing: 'border-box',
          }}>
            {services.map((service, index) => (
              <FeatureCard
                key={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                delay={index * 0.1}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section style={{ padding: isMobile ? '40px 20px' : '100px 20px', background: 'rgba(0, 0, 0, 0.3)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: space['4xl'] }}
          >
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #00ff7f 0%, #00cc66 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              fontWeight: 'bold',
              paddingRight: '0.3em', // Increased padding to prevent clipping
              paddingLeft: '0.1em', // Add left padding too
              lineHeight: '1.3', // Increased line height
              letterSpacing: '0.02em', // Add letter spacing
            }}>
              Our Design Process
            </h2>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.2rem',
              color: '#e0e0e0',
              maxWidth: isMobile ? '90%' : '600px',
              margin: '0 auto',
            }}>
              A proven methodology that delivers exceptional results
            </p>
          </motion.div>
          
          <ProcessTimeline steps={processSteps} isMobile={isMobile} />
        </div>
      </section>

      {/* Portfolio Section - Featured Projects */}
      <section id="portfolio-section" style={{ 
        position: 'relative',
        padding: isMobile ? '60px 20px' : '100px 20px',
        background: 'linear-gradient(180deg, rgba(147, 51, 234, 0.03) 0%, rgba(0, 0, 0, 0.5) 100%)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #00ff7f 0%, #9333ea 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              fontWeight: 'bold',
              paddingRight: '0.3em',
              paddingLeft: '0.1em',
              lineHeight: '1.3',
              letterSpacing: '0.02em',
            }}>
              Featured Projects
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#e0e0e0',
              maxWidth: '700px',
              margin: '0 auto',
            }}>
              Real-world solutions crafted with precision and creativity
            </p>
          </motion.div>

          {/* Portfolio Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: isMobile ? '30px' : '40px',
          }}>
            {/* CorkCRM Project */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              style={{
                background: 'rgba(20, 20, 20, 0.8)',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(147, 51, 234, 0.2)',
                cursor: 'pointer',
                position: 'relative',
              }}
              onClick={() => setSelectedProject({
                title: 'CorkCRM',
                image: '/images/uiux/shawaze-corkcrm.webp',
                description: 'Interior painting estimation software with intuitive measurement tools, photo capture, and automated workflow management for painting businesses.'
              })}
            >
              <div style={{ 
                position: 'relative',
                height: isMobile ? '200px' : '250px',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%)'
              }}>
                <LazyImage 
                  src="/images/uiux/shawaze-corkcrm.webp" 
                  alt="CorkCRM Interface"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'rgba(0, 255, 127, 0.9)',
                  color: '#000',
                  padding: '5px 15px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  Business Software
                </div>
              </div>
              <div style={{ padding: '30px' }}>
                <h3 style={{
                  fontSize: '1.8rem',
                  color: '#00ff7f',
                  marginBottom: '15px',
                  fontWeight: 'bold'
                }}>
                  CorkCRM
                </h3>
                <p style={{
                  color: '#e0e0e0',
                  marginBottom: '20px',
                  lineHeight: '1.6'
                }}>
                  Interior painting estimation software with intuitive measurement tools, photo capture, and automated workflow management for painting businesses.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {['Measurement Tools', 'Photo Annotation', 'Workflow Automation'].map((tag) => (
                    <span key={tag} style={{
                      padding: '5px 12px',
                      background: 'rgba(147, 51, 234, 0.2)',
                      borderRadius: '15px',
                      fontSize: '0.85rem',
                      color: '#e0e0e0'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* YoloHealth Project */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              style={{
                background: 'rgba(20, 20, 20, 0.8)',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(147, 51, 234, 0.2)',
                cursor: 'pointer',
                position: 'relative',
              }}
              onClick={() => setSelectedProject({
                title: 'YoloHealth',
                image: '/images/uiux/shawaze-yolohealth.webp',
                description: 'Online weight loss community platform with personalized journey design, prescription management, and real-time health professional consultations.'
              })}
            >
              <div style={{ 
                position: 'relative',
                height: isMobile ? '200px' : '250px',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%)'
              }}>
                <LazyImage 
                  src="/images/uiux/shawaze-yolohealth.webp" 
                  alt="YoloHealth Interface"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'rgba(147, 51, 234, 0.9)',
                  color: '#fff',
                  padding: '5px 15px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  Health Platform
                </div>
              </div>
              <div style={{ padding: '30px' }}>
                <h3 style={{
                  fontSize: '1.8rem',
                  color: '#00ff7f',
                  marginBottom: '15px',
                  fontWeight: 'bold'
                }}>
                  YoloHealth
                </h3>
                <p style={{
                  color: '#e0e0e0',
                  marginBottom: '20px',
                  lineHeight: '1.6'
                }}>
                  Online weight loss community platform with personalized journey design, prescription management, and real-time health professional consultations.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {['Health Tracking', 'Community', 'Telemedicine'].map((tag) => (
                    <span key={tag} style={{
                      padding: '5px 12px',
                      background: 'rgba(147, 51, 234, 0.2)',
                      borderRadius: '15px',
                      fontSize: '0.85rem',
                      color: '#e0e0e0'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* iGiftit Project */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              style={{
                background: 'rgba(20, 20, 20, 0.8)',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(147, 51, 234, 0.2)',
                cursor: 'pointer',
                position: 'relative',
              }}
              onClick={() => setSelectedProject({
                title: 'iGiftit',
                image: '/images/uiux/shawaze-igiftit.webp',
                description: 'AI-powered thoughtful gifting platform that delivers love in a box. Features personalized recommendations, elegant wrapping, and greeting cards.'
              })}
            >
              <div style={{ 
                position: 'relative',
                height: isMobile ? '200px' : '250px',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(255, 100, 200, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%)'
              }}>
                <LazyImage 
                  src="/images/uiux/shawaze-igiftit.webp" 
                  alt="iGiftit Interface"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'rgba(255, 100, 200, 0.9)',
                  color: '#fff',
                  padding: '5px 15px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  E-Commerce AI
                </div>
              </div>
              <div style={{ padding: '30px' }}>
                <h3 style={{
                  fontSize: '1.8rem',
                  color: '#00ff7f',
                  marginBottom: '15px',
                  fontWeight: 'bold'
                }}>
                  iGiftit
                </h3>
                <p style={{
                  color: '#e0e0e0',
                  marginBottom: '20px',
                  lineHeight: '1.6'
                }}>
                  AI-powered thoughtful gifting platform that delivers love in a box. Features personalized recommendations, elegant wrapping, and greeting cards.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {['AI Recommendations', 'Gift Curation', 'Personalization'].map((tag) => (
                    <span key={tag} style={{
                      padding: '5px 12px',
                      background: 'rgba(147, 51, 234, 0.2)',
                      borderRadius: '15px',
                      fontSize: '0.85rem',
                      color: '#e0e0e0'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Meet Our Team Section */}
      <section style={{ 
        position: 'relative',
        padding: isMobile ? '60px 20px' : '100px 20px',
        background: 'rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #9333ea 0%, #00ff7f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              fontWeight: 'bold',
              paddingRight: '0.3em',
              paddingLeft: '0.1em',
              lineHeight: '1.3',
              letterSpacing: '0.02em',
            }}>
              Meet Our Team
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#e0e0e0',
              maxWidth: '700px',
              margin: '0 auto',
            }}>
              Talented designers and developers working together to create exceptional experiences
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: isMobile ? '30px' : '40px',
          }}>
            {/* Shawaze Team Member */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                background: 'rgba(20, 20, 20, 0.8)',
                borderRadius: '20px',
                padding: '30px',
                border: '1px solid rgba(147, 51, 234, 0.2)',
                textAlign: 'center'
              }}
            >
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #9333ea 0%, #00ff7f 100%)',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#fff'
              }}>
                SA
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                color: '#00ff7f',
                marginBottom: '10px'
              }}>
                Shawaze Ahmer
              </h3>
              <p style={{
                color: '#9333ea',
                marginBottom: '15px',
                fontSize: '1.1rem'
              }}>
                UX Researcher & Product Designer
              </p>
              <p style={{
                color: '#e0e0e0',
                fontSize: '0.95rem',
                lineHeight: '1.6'
              }}>
                Award-winning designer specializing in fintech UX, with expertise in creating intuitive interfaces for complex systems.
              </p>
              <div style={{ marginTop: '15px' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '5px 12px',
                  background: 'rgba(0, 255, 127, 0.1)',
                  border: '1px solid rgba(0, 255, 127, 0.3)',
                  borderRadius: '15px',
                  fontSize: '0.85rem',
                  color: '#00ff7f',
                  margin: '5px'
                }}>
                  🏆 HACKADESIGN Runner-up
                </span>
              </div>
            </motion.div>

            {/* Add more team members as needed */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: isMobile ? '80px 20px' : '150px 20px', 
        textAlign: 'center', 
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(0, 255, 127, 0.05) 100%)',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            marginBottom: '30px',
            color: '#9333ea',
            textShadow: '0 0 40px rgba(147, 51, 234, 0.5), 0 0 20px rgba(0, 255, 127, 0.3)',
            fontWeight: 'bold',
          }}>
            Ready to Elevate Your Digital Experience?
          </h2>
          <p style={{
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            color: '#e0e0e0',
            marginBottom: isMobile ? '30px' : '50px',
            maxWidth: isMobile ? '90%' : '700px',
            margin: '0 auto 50px',
          }}>
            Let's collaborate to create something extraordinary that your users will love
          </p>
          
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 30px 60px rgba(147, 51, 234, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/contact'}
            style={{
              padding: isMobile ? '15px 40px' : '20px 60px',
              fontSize: isMobile ? '1rem' : '1.2rem',
              background: 'linear-gradient(135deg, #00ff7f 0%, #00cc66 100%)',
              border: 'none',
              borderRadius: '50px',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            Get Started Today
          </motion.button>
        </motion.div>
        
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(100px)',
        }} />
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedProject && (
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
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isMobile ? '0' : '20px',
              cursor: 'pointer',
              overflow: 'auto'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: isMobile ? '95%' : 'auto',
                maxWidth: isMobile ? '95%' : '90vw',
                maxHeight: isMobile ? 'calc(100vh - 100px)' : '90vh',
                position: 'relative',
                cursor: 'default',
                display: 'flex',
                flexDirection: 'column',
                marginTop: isMobile ? '80px' : '0',
                marginBottom: isMobile ? '20px' : '0',
                background: isMobile ? 'rgba(20, 20, 20, 0.98)' : 'transparent',
                borderRadius: isMobile ? '15px' : '10px',
                overflow: 'hidden'
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: isMobile ? '10px' : '-40px',
                  right: isMobile ? '10px' : '0',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: '#fff',
                  fontSize: isMobile ? '1.8rem' : '2rem',
                  width: isMobile ? '35px' : '40px',
                  height: isMobile ? '35px' : '40px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  zIndex: 10,
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.background = 'rgba(255, 0, 0, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  }
                }}
              >
                ×
              </button>
              
              {/* Scrollable Content Container */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: isMobile ? 'auto' : 'hidden',
                WebkitOverflowScrolling: 'touch'
              }}>
                {/* Image */}
                <div style={{
                  flexShrink: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: '#000',
                  minHeight: isMobile ? '40vh' : 'auto'
                }}>
                  <LazyImage
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: isMobile ? '40vh' : '70vh',
                      objectFit: 'contain'
                    }}
                  />
                </div>
                
                {/* Title and Description */}
                <div style={{
                  flexShrink: 0,
                  background: 'rgba(20, 20, 20, 0.98)',
                  padding: isMobile ? '20px 15px' : '30px',
                  borderTop: '1px solid rgba(0, 255, 127, 0.2)'
                }}>
                  <h3 style={{
                    fontSize: isMobile ? '1.3rem' : '1.8rem',
                    color: '#00ff7f',
                    marginBottom: isMobile ? '10px' : '15px',
                    fontWeight: 'bold',
                    wordBreak: 'break-word'
                  }}>
                    {selectedProject.title}
                  </h3>
                  <p style={{
                    color: '#e0e0e0',
                    fontSize: isMobile ? '0.9rem' : '1.1rem',
                    lineHeight: isMobile ? '1.6' : '1.8',
                    wordBreak: 'break-word',
                    margin: 0
                  }}>
                    {selectedProject.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UIUXDesign;