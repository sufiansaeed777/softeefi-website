import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { space, fontSize, fontWeight, lineHeight, transition, colors, zIndex } from '../utils/designTokens';
import { Helmet } from 'react-helmet-async';

// Use environment variables or fall back to defaults
const officeEmail = process.env.REACT_APP_CONTACT_EMAIL || "info@softeefi.co.uk";
const officePhone = process.env.REACT_APP_CONTACT_PHONE || "+44 7417 505744";

// Service options for the dropdown
const serviceOptions = [
  { value: "", label: "Select a Service" },
  { value: "websites-and-apps", label: "Websites & Apps" },
  { value: "ai-solutions", label: "AI Solutions" },
  { value: "ui-ux-design", label: "UI/UX Design" },
  { value: "cloud-infrastructure", label: "Cloud Infrastructure" },
  { value: "digital-marketing", label: "Digital Marketing & SEO" },
  { value: "creative-services", label: "Creative Services (Video, Art, Graphics)" },
  { value: "other", label: "Other" }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    budget: "",
    timeframe: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dots, setDots] = useState([]);
  const [lines, setLines] = useState([]);
  
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  useEffect(() => {
    // SEO Optimization for Contact Page - Kent Focused
    document.title = 'Contact Us Kent | Softeefi Web Development';
    
    // Set meta description with Kent focus
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Contact Softeefi - Local web development company in Kent. Serving Gravesend, Dartford, Maidstone, Canterbury, Sevenoaks & all Kent areas. Get a free quote within 24 hours. Call +44 7417 505744.';
    } else {
      const newMetaDesc = document.createElement('meta');
      newMetaDesc.name = 'description';
      newMetaDesc.content = 'Contact Softeefi - Local web development company in Kent. Serving Gravesend, Dartford, Maidstone, Canterbury, Sevenoaks & all Kent areas. Get a free quote within 24 hours. Call +44 7417 505744.';
      document.head.appendChild(newMetaDesc);
    }
    
    // Add meta keywords with Kent focus
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'contact softeefi kent, web developer gravesend, web design dartford, web development maidstone, kent web developers, gravesend digital agency, dartford website design, maidstone seo services, canterbury web design, sevenoaks web developer, rochester web design, chatham digital marketing, gillingham web developer, tonbridge website design, ashford web development, folkestone digital agency, dover web design, margate website developer, ramsgate digital services, broadstairs web design, kent contact web developer, hire developer gravesend, dartford digital agency contact, maidstone web design quote, kent website quote, gravesend free consultation, dartford project inquiry, local web developer kent, near me web design kent, contact form kent, softeefi gravesend, softeefi dartford, softeefi kent';
    
    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://softeefi.co.uk/contact';
    
    // Add Open Graph tags with Kent focus
    const ogTags = [
      { property: 'og:title', content: 'Contact Softeefi Kent | Web Development Gravesend & Dartford' },
      { property: 'og:description', content: 'Local Kent web development company. Serving Gravesend, Dartford, Maidstone & all Kent areas. Get your free quote today. Call +44 7417 505744.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://softeefi.co.uk/contact' },
      { property: 'og:image', content: 'https://softeefi.co.uk/images/contact-og.jpg' }
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
    
    // Add LocalBusiness structured data - Kent Focused
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Softeefi",
      "image": "https://softeefi.co.uk/logo.png",
      "url": "https://softeefi.co.uk",
      "telephone": "+44 7417 505744",
      "email": "info@softeefi.co.uk",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "GB",
        "addressRegion": "Kent",
        "addressLocality": "Gravesend"
      },
      "areaServed": [
        {
          "@type": "AdministrativeArea",
          "name": "Kent",
          "containedInPlace": {
            "@type": "Country",
            "name": "United Kingdom"
          }
        },
        "Gravesend", "Dartford", "Maidstone", "Canterbury", "Sevenoaks",
        "Rochester", "Chatham", "Gillingham", "Tonbridge", "Tunbridge Wells",
        "Ashford", "Folkestone", "Dover", "Margate", "Ramsgate",
        "Broadstairs", "Deal", "Sandwich", "Faversham", "Sittingbourne",
        "Swanley", "Edenbridge", "Westerham", "Orpington", "Bromley"
      ],
      "priceRange": "££-£££",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "telephone": "+44 7417 505744",
        "email": "info@softeefi.co.uk",
        "areaServed": ["Kent", "Gravesend", "Dartford", "Maidstone", "Canterbury"],
        "availableLanguage": "English"
      },
      "sameAs": [
        "https://twitter.com/softeefi",
        "https://linkedin.com/company/softeefi",
        "https://github.com/softeefi"
      ]
    };
    
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
    
    setIsVisible(true);
    window.scrollTo(0, 0);
    
    // Ensure viewport is mobile-friendly
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = 'viewport';
      document.head.appendChild(viewport);
    }
    viewport.content = 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes';
    
    // Initialize grid of dots
    const dotsArray = [];
    const linesArray = [];
    const columns = Math.floor(window.innerWidth / 80);
    const rows = Math.floor(window.innerHeight / 80);
    
    // Create grid of dots
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const x = col * 80 + 40;
        const y = row * 80 + 40;
        dotsArray.push({
          id: `${row}-${col}`,
          x,
          y,
          baseX: x,
          baseY: y,
          row,
          col,
        });
      }
    }
    
    // Create lines connecting neighboring dots
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        // Horizontal lines
        if (col < columns - 1) {
          linesArray.push({
            id: `h-${row}-${col}`,
            start: `${row}-${col}`,
            end: `${row}-${col + 1}`,
          });
        }
        // Vertical lines
        if (row < rows - 1) {
          linesArray.push({
            id: `v-${row}-${col}`,
            start: `${row}-${col}`,
            end: `${row + 1}-${col}`,
          });
        }
      }
    }
    
    setDots(dotsArray);
    setLines(linesArray);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const dotsArray = [];
      const linesArray = [];
      const columns = Math.floor(window.innerWidth / 80);
      const rows = Math.floor(window.innerHeight / 80);
      
      // Create grid of dots
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          const x = col * 80 + 40;
          const y = row * 80 + 40;
          dotsArray.push({
            id: `${row}-${col}`,
            x,
            y,
            baseX: x,
            baseY: y,
            row,
            col,
          });
        }
      }
      
      // Create lines connecting neighboring dots
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          // Horizontal lines
          if (col < columns - 1) {
            linesArray.push({
              id: `h-${row}-${col}`,
              start: `${row}-${col}`,
              end: `${row}-${col + 1}`,
            });
          }
          // Vertical lines
          if (row < rows - 1) {
            linesArray.push({
              id: `v-${row}-${col}`,
              start: `${row}-${col}`,
              end: `${row + 1}-${col}`,
            });
          }
        }
      }
      
      setDots(dotsArray);
      setLines(linesArray);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Skip mouse tracking on mobile devices for performance
    const isMobileDevice = window.matchMedia('(max-width: 768px)').matches || 
                          ('ontouchstart' in window) || 
                          (navigator.maxTouchPoints > 0);
    
    if (isMobileDevice) return;
    
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        setMousePosition({ x: mouseX, y: mouseY });
        
        // Update dots to move away from mouse
        setDots(prevDots => 
          prevDots.map(dot => {
            const dx = mouseX - dot.baseX;
            const dy = mouseY - dot.baseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 150;
            
            if (distance < maxDistance) {
              const force = (1 - distance / maxDistance);
              const angle = Math.atan2(dy, dx);
              
              // Push dots away from cursor
              return {
                ...dot,
                x: dot.baseX - Math.cos(angle) * force * 30,
                y: dot.baseY - Math.sin(angle) * force * 30,
              };
            } else {
              // Slowly return to base position
              return {
                ...dot,
                x: dot.x + (dot.baseX - dot.x) * 0.1,
                y: dot.y + (dot.baseY - dot.y) * 0.1,
              };
            }
          })
        );
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  // Simple email validation regex
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    if (success) setSuccess(false);
    if (error) setError("");

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    // Mark all fields as touched for validation display
    const allTouched = {};
    for (const key in formData) {
      allTouched[key] = true;
    }
    setTouched(allTouched);

    // Required fields
    const requiredFields = ["name", "email", "message"];
    
    // Frontend validation
    const { name, email, message } = formData;
    
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill out all required fields.");
      setIsLoading(false);
      return;
    }
    
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setSuccess(false);
    setError("");

    try {
      // Make actual API call
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");
      let jsonResponse = {};
      if (contentType && contentType.includes("application/json")) {
        jsonResponse = await response.json();
      }

      if (!response.ok) {
        setError(jsonResponse?.error || `An error occurred: ${response.statusText || response.status}`);
        return;
      }
      
      // Success case
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        budget: "",
        timeframe: "",
      });
      setTouched({});
      
      // Scroll to success message
      const successElement = document.querySelector(".success-msg");
      if (successElement) {
        successElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setError("Failed to send message. Please check your connection or try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Get validation state for field
  const getValidationState = (fieldName, value) => {
    if (!touched[fieldName]) return null;
    
    if (fieldName === "email" && value && !isValidEmail(value)) {
      return "invalid";
    }
    
    if (["name", "email", "message"].includes(fieldName) && !value.trim()) {
      return "invalid";
    }
    
    return "valid";
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div
      className="contact-page-container"
      ref={containerRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
        marginTop: window.innerWidth <= 768 ? '-70px' : '-90px'
      }}
    >
      <Helmet>
        <title>Contact Us | Get in Touch - Softeefi</title>
        <meta name="description" content="Contact Softeefi for web development, AI solutions, and digital marketing services. Get a free consultation and quote for your project." />
        <link rel="canonical" href="https://softeefi.co.uk/contact" />
      </Helmet>
      {/* Hero Section */}
      <section className="contact-hero" ref={heroRef} style={{
        position: 'relative',
        minHeight: window.innerWidth <= 768 ? '70vh' : '65vh',
        maxHeight: window.innerWidth <= 768 ? 'none' : '600px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0d1117 0%, #1a1f2e 100%)',
        paddingTop: window.innerWidth <= 768 ? '80px' : '120px',
        paddingBottom: window.innerWidth <= 768 ? '40px' : '60px',
        marginTop: '0'
      }}>
        {/* Animated Background Elements */}
        <div className="hero-background-elements">
          <motion.div 
            className="grid-pattern"
            style={{ opacity }}
          />
          <motion.div 
            className="gradient-orb gradient-orb-1"
            style={{ y: y1 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="gradient-orb gradient-orb-2"
            style={{ y: y2 }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* DevSinc-style Interactive Dots and Lines Grid */}
          <div className="vector-grid-container" style={{ 
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            top: 0, 
            left: 0, 
            overflow: 'hidden', 
            pointerEvents: 'none' 
          }}>
            {/* SVG for lines and dots */}
            <svg 
              style={{ 
                position: 'absolute', 
                width: '100%', 
                height: '100%',
                opacity: 0.3
              }}
            >
              {/* Draw lines connecting dots */}
              {lines.map(line => {
                const startDot = dots.find(d => d.id === line.start);
                const endDot = dots.find(d => d.id === line.end);
                
                if (!startDot || !endDot) return null;
                
                const dx1 = mousePosition.x - startDot.baseX;
                const dy1 = mousePosition.y - startDot.baseY;
                const distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
                
                const dx2 = mousePosition.x - endDot.baseX;
                const dy2 = mousePosition.y - endDot.baseY;
                const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                
                const avgDistance = (distance1 + distance2) / 2;
                const opacity = avgDistance < 150 ? 0.1 : 0.4;
                
                return (
                  <motion.line
                    key={line.id}
                    x1={startDot.x}
                    y1={startDot.y}
                    x2={endDot.x}
                    y2={endDot.y}
                    stroke="#00ff7f"
                    strokeWidth="0.5"
                    opacity={opacity}
                    animate={{
                      x1: startDot.x,
                      y1: startDot.y,
                      x2: endDot.x,
                      y2: endDot.y,
                      opacity,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 25,
                    }}
                  />
                );
              })}
              
              {/* Draw dots */}
              {dots.map(dot => {
                const dx = mousePosition.x - dot.baseX;
                const dy = mousePosition.y - dot.baseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const scale = distance < 150 ? 1.5 : 1;
                const opacity = distance < 150 ? 0.8 : 0.4;
                
                return (
                  <motion.circle
                    key={dot.id}
                    cx={dot.x}
                    cy={dot.y}
                    r="2"
                    fill="#00ff7f"
                    opacity={opacity}
                    animate={{
                      cx: dot.x,
                      cy: dot.y,
                      scale,
                      opacity,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 25,
                    }}
                  />
                );
              })}
            </svg>
          </div>
        </div>

        <div className="contact-hero-content" style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: window.innerWidth <= 768 ? '20px 1rem' : '40px 2rem',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: space.sm,
              padding: `${space.md} ${space.lg}`,
              background: 'rgba(0, 255, 127, 0.1)',
              border: '1px solid rgba(0, 255, 127, 0.3)',
              borderRadius: '50px',
              marginBottom: space.xl,
            }}
          >
            <span className="badge-text" style={{
              color: '#00ff7f',
              fontSize: fontSize.sm,
              fontWeight: fontWeight.semibold,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>Get In Touch</span>
            <motion.span 
              className="badge-dot"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: '8px',
                height: '8px',
                background: '#00ff7f',
                borderRadius: '50%',
                display: 'inline-block',
              }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: window.innerWidth <= 768 ? '1.75rem' : `clamp(${fontSize['3xl']}, 4vw, ${fontSize['5xl']})`,
              fontWeight: fontWeight.bold,
              marginBottom: window.innerWidth <= 768 ? '0.75rem' : space.md,
              color: '#ffffff',
              lineHeight: window.innerWidth <= 768 ? 1.2 : lineHeight.tight,
            }}
          >
            Let's Create Something{' '}
            <span className="gradient-text" style={{
              background: 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Amazing Together</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: window.innerWidth <= 768 ? fontSize.base : fontSize.lg,
              color: '#c9d1d9',
              marginBottom: window.innerWidth <= 768 ? '1rem' : space.xl,
              maxWidth: '600px',
              lineHeight: lineHeight.relaxed,
            }}
          >
            Have questions about our services or ready to start a project?
            We're here to turn your vision into reality.
          </motion.p>

          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: space.xl,
              marginTop: space.xl,
            }}
          >
            <div className="stat-item" style={{
              textAlign: 'center',
            }}>
              <span className="stat-value" style={{
                display: 'block',
                fontSize: '2rem',
                fontWeight: '900',
                color: '#00ff7f',
                marginBottom: '0.25rem',
              }}>24h</span>
              <span className="stat-label" style={{
                display: 'block',
                fontSize: '0.875rem',
                color: '#c9d1d9',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>Response Time</span>
            </div>
            <div className="stat-divider" style={{
              width: '1px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.2)',
            }} />
            <div className="stat-item" style={{
              textAlign: 'center',
            }}>
              <span className="stat-value" style={{
                display: 'block',
                fontSize: '2rem',
                fontWeight: '900',
                color: '#00ff7f',
                marginBottom: '0.25rem',
              }}>15+</span>
              <span className="stat-label" style={{
                display: 'block',
                fontSize: '0.875rem',
                color: '#c9d1d9',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>Happy Clients</span>
            </div>
            <div className="stat-divider" style={{
              width: '1px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.2)',
            }} />
            <div className="stat-item" style={{
              textAlign: 'center',
            }}>
              <span className="stat-value" style={{
                display: 'block',
                fontSize: '2rem',
                fontWeight: '900',
                color: '#00ff7f',
                marginBottom: '0.25rem',
              }}>98%</span>
              <span className="stat-label" style={{
                display: 'block',
                fontSize: '0.875rem',
                color: '#c9d1d9',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>Satisfaction</span>
            </div>
          </motion.div>
        </div>

      </section>

      {/* Kent Services Section for Local SEO */}
      <section style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(180deg, rgba(0,255,127,0.03) 0%, transparent 100%)',
        borderTop: '1px solid rgba(0,255,127,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              marginBottom: '1rem',
              background: 'linear-gradient(45deg, #ffffff, #00ff7f)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center'
            }}>
              Local Web Development Services in Kent
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#c9d1d9',
              textAlign: 'center',
              marginBottom: '3rem',
              maxWidth: '800px',
              margin: '0 auto 3rem'
            }}>
              Softeefi is Kent's premier digital agency, delivering cutting-edge solutions to businesses across Gravesend, Dartford, Maidstone, and beyond.
            </p>
            
            {/* Services Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {/* Web Development */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(0, 255, 127, 0.2)',
                borderRadius: '12px',
                padding: '2rem',
                transition: 'all 0.3s ease'
              }}>
                <h3 style={{ color: '#00ff7f', marginBottom: '1rem', fontSize: '1.5rem' }}>
                  Web Development Gravesend & Dartford
                </h3>
                <p style={{ color: '#c9d1d9', lineHeight: '1.8' }}>
                  Professional website development for Kent businesses. We create responsive, fast-loading websites for companies in Gravesend, Dartford, Sevenoaks, and surrounding areas. E-commerce, corporate sites, and custom web applications.
                </p>
              </div>

              {/* AI Solutions */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(0, 255, 127, 0.2)',
                borderRadius: '12px',
                padding: '2rem'
              }}>
                <h3 style={{ color: '#00ff7f', marginBottom: '1rem', fontSize: '1.5rem' }}>
                  AI Solutions & Chatbots Kent
                </h3>
                <p style={{ color: '#c9d1d9', lineHeight: '1.8' }}>
                  Cutting-edge AI integration for Kent businesses. Custom chatbots, automation, and AI agents for companies in Maidstone, Canterbury, Rochester, and across Kent. Transform your business with local AI expertise.
                </p>
              </div>

              {/* Digital Marketing */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(0, 255, 127, 0.2)',
                borderRadius: '12px',
                padding: '2rem'
              }}>
                <h3 style={{ color: '#00ff7f', marginBottom: '1rem', fontSize: '1.5rem' }}>
                  SEO & Digital Marketing Kent
                </h3>
                <p style={{ color: '#c9d1d9', lineHeight: '1.8' }}>
                  Local SEO experts helping Kent businesses rank #1 on Google. Digital marketing services for Tonbridge, Tunbridge Wells, Ashford, and all Kent areas. PPC, social media, and content marketing.
                </p>
              </div>

              {/* UI/UX Design */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(0, 255, 127, 0.2)',
                borderRadius: '12px',
                padding: '2rem'
              }}>
                <h3 style={{ color: '#00ff7f', marginBottom: '1rem', fontSize: '1.5rem' }}>
                  UI/UX Design Services Kent
                </h3>
                <p style={{ color: '#c9d1d9', lineHeight: '1.8' }}>
                  User-centered design for Kent businesses. Professional UI/UX design services in Folkestone, Dover, Margate, and throughout Kent. Mobile app design, web design, and user experience optimization.
                </p>
              </div>

              {/* Cloud Services */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(0, 255, 127, 0.2)',
                borderRadius: '12px',
                padding: '2rem'
              }}>
                <h3 style={{ color: '#00ff7f', marginBottom: '1rem', fontSize: '1.5rem' }}>
                  Cloud Infrastructure Kent
                </h3>
                <p style={{ color: '#c9d1d9', lineHeight: '1.8' }}>
                  Cloud migration and infrastructure for Kent companies. AWS, Azure, and Google Cloud services for businesses in Ramsgate, Deal, Sandwich, and across Kent. Local cloud experts you can trust.
                </p>
              </div>

              {/* Mobile Apps */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(0, 255, 127, 0.2)',
                borderRadius: '12px',
                padding: '2rem'
              }}>
                <h3 style={{ color: '#00ff7f', marginBottom: '1rem', fontSize: '1.5rem' }}>
                  Mobile App Development Kent
                </h3>
                <p style={{ color: '#c9d1d9', lineHeight: '1.8' }}>
                  iOS and Android app development for Kent businesses. Native and cross-platform apps for companies in Faversham, Sittingbourne, Swanley, and throughout Kent. Local app developers with proven results.
                </p>
              </div>
            </div>

            {/* Areas Served */}
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'rgba(0, 255, 127, 0.05)',
              borderRadius: '12px',
              marginTop: '3rem'
            }}>
              <h3 style={{ color: '#00ff7f', marginBottom: '1rem', fontSize: '1.8rem' }}>
                Serving All of Kent
              </h3>
              <p style={{ color: '#c9d1d9', fontSize: '1.1rem', lineHeight: '2' }}>
                <strong>Primary Areas:</strong> Gravesend • Dartford • Maidstone • Canterbury • Sevenoaks • Rochester • Chatham • Gillingham<br/>
                <strong>Also Serving:</strong> Tonbridge • Tunbridge Wells • Ashford • Folkestone • Dover • Margate • Ramsgate • Broadstairs • Deal • Sandwich • Faversham • Sittingbourne • Swanley • Edenbridge • Westerham • Orpington • Bromley • Sidcup • Bexley • Erith • Northfleet • Swanscombe • Longfield • New Ash Green • West Malling • Kings Hill • Snodland • Strood • Hoo • Cliffe • Higham
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="contact-main-container">
        <motion.div 
          className="contact-wrapper"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Contact Form */}
          <motion.div 
            className="contact-form-container"
            variants={itemVariants}
          >
            <div className="contact-form-header">
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and we'll get back to you shortly.</p>
            </div>

            {success ? (
              <motion.div 
                className="success-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="success-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3>Thank You!</h3>
                <p>
                  Your message has been sent successfully. We'll respond as soon as possible,
                  typically within one business day.
                </p>
                <button 
                  className="button"
                  onClick={() => {
                    setSuccess(false);
                    window.scrollTo({top: 0, behavior: 'smooth'});
                  }}
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form dark-input" noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      Full Name<span className="required">*</span>
                    </label>
                    <div className={`input-container ${getValidationState('name', formData.name)}`}>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder=""
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        aria-required="true"
                        autoComplete="name"
                        inputMode="text"
                      />
                      {getValidationState('name', formData.name) === 'valid' && (
                        <span className="validation-icon valid">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                      )}
                      {getValidationState('name', formData.name) === 'invalid' && (
                        <span className="validation-icon invalid">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                        </span>
                      )}
                    </div>
                    {getValidationState('name', formData.name) === 'invalid' && (
                      <div className="validation-message">Name is required</div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">
                      Email Address<span className="required">*</span>
                    </label>
                    <div className={`input-container ${getValidationState('email', formData.email)}`}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder=""
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        aria-required="true"
                        autoComplete="email"
                        inputMode="email"
                      />
                      {getValidationState('email', formData.email) === 'valid' && (
                        <span className="validation-icon valid">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                      )}
                      {getValidationState('email', formData.email) === 'invalid' && (
                        <span className="validation-icon invalid">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                        </span>
                      )}
                    </div>
                    {getValidationState('email', formData.email) === 'invalid' && (
                      <div className="validation-message">
                        {!formData.email.trim() ? "Email is required" : "Please enter a valid email"}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number <span style={{ fontSize: '0.8rem', color: '#8b949e' }}>(Optional)</span></label>
                    <div className="input-container">
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder=""
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="tel"
                        inputMode="tel"
                      />
                    </div>
                  </div>
                  <div style={{ gridColumn: '2' }}></div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    Message<span className="required">*</span>
                  </label>
                  <div className={`input-container textarea ${getValidationState('message', formData.message)}`}>
                    <textarea
                      id="message"
                      name="message"
                      placeholder=""
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={6}
                      required
                      aria-required="true"
                    />
                    {getValidationState('message', formData.message) === 'valid' && (
                      <span className="validation-icon valid textarea-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                    )}
                    {getValidationState('message', formData.message) === 'invalid' && (
                      <span className="validation-icon invalid textarea-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                      </span>
                    )}
                  </div>
                  {getValidationState('message', formData.message) === 'invalid' && (
                    <div className="validation-message">Message is required</div>
                  )}
                </div>

                <div className="form-row">
                  {/* Removed Project Budget and Timeframe dropdowns */}
                </div>

                <div aria-live="polite" className="form-messages">
                  {error && <div className="error-msg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {error}
                  </div>}
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '1.2rem 2rem',
                    background: isLoading ? '#555' : 'linear-gradient(135deg, #00ff7f 0%, #00e673 100%)',
                    color: isLoading ? '#999' : '#0d1117',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.3s ease',
                    boxShadow: isLoading ? 'none' : '0 4px 20px rgba(0, 255, 127, 0.3)',
                    marginTop: window.innerWidth <= 768 ? '1rem' : '2rem',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  whileHover={!isLoading ? { 
                    scale: 1.02,
                    boxShadow: '0 6px 25px rgba(0, 255, 127, 0.4)'
                  } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                >
                  {isLoading && (
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                      }}
                      animate={{
                        left: ['100%', '-100%']
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    />
                  )}
                  {isLoading ? (
                    <>
                      <motion.span
                        style={{
                          width: '20px',
                          height: '20px',
                          border: '3px solid transparent',
                          borderTopColor: '#999',
                          borderRadius: '50%',
                          display: 'inline-block'
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d1117" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 2L11 13"></path>
                        <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
                      </svg>
                    </>
                  )}
                </motion.button>

                <p className="form-disclaimer">
                  <small>
                    By submitting this form, you agree to our 
                    <a href="/privacy-policy"> Privacy Policy</a>. We'll never share your information.
                  </small>
                </p>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="contact-info-container"
            variants={itemVariants}
          >
            <div className="contact-info-card">
              <h2>Get In Touch</h2>
              
              <a href={`mailto:${officeEmail}`} className="contact-method contact-email" style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <span style={{ color: '#00ff7f', fontWeight: 'bold', fontSize: '1rem', wordBreak: 'break-word' }}>{officeEmail}</span>
                  <p>We respond within 24 hours</p>
                </div>
              </a>
              
              <a href={`tel:${officePhone.replace(/\s/g, '')}`} className="contact-method contact-phone" style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div className="contact-details">
                  <h3>Phone</h3>
                  <span style={{ color: '#00ff7f', fontWeight: 'bold', fontSize: '1rem' }}>{officePhone}</span>
                  <p>Mon - Fri, 9am - 6pm GMT</p>
                </div>
              </a>
              
              <div className="contact-method">
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="contact-details">
                  <h3>In-Person Meetings</h3>
                  <p>Available for consultations by appointment</p>
                </div>
              </div>
              
              {/* LinkedIn social section commented out for now
              <div className="contact-social">
                <h3>Connect With Us</h3>
                <div className="social-links">
                  <a href="https://linkedin.com/company/softeefi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
              </div>
              */}
              
              <div className="business-hours">
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM GMT</p>
                <p>Weekend: By Appointment Only</p>
              </div>
              
              <div className="cta-card">
                <div className="cta-content">
                  <h3>Need an urgent response?</h3>
                  <p>Call us directly for immediate assistance with your project.</p>
                  <a href={`tel:${officePhone.replace(/\s/g, '')}`} className="cta-button">
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* FAQ Section */}
      <section className="contact-faq">
        <div className="faq-container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="faq-grid">
            {[
              {
                question: "How quickly will I receive a response?",
                answer: "We typically respond to all inquiries within one business day. For urgent matters, please call us directly."
              },
              {
                question: "What information should I include in my initial inquiry?",
                answer: "The more details you can provide about your project needs, timeline, and budget, the better we can prepare a tailored response for you."
              },
              {
                question: "Do you offer consultations before starting a project?",
                answer: "Yes, we provide free initial consultations to discuss your needs and determine if we're the right fit for your project."
              },
              {
                question: "What areas do you serve?",
                answer: "We primarily serve clients throughout the UK, but we work with businesses worldwide thanks to our remote collaboration capabilities."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="faq-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="contact-cta">
        <motion.div 
          className="cta-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Ready to Bring Your Project to Life?</h2>
          <p>Reach out today and let's start creating something exceptional together.</p>
          <a href="#contact-form" className="cta-button" onClick={(e) => {
            e.preventDefault();
            document.querySelector('form').scrollIntoView({ behavior: 'smooth' });
          }}>
            Start Your Project
          </a>
        </motion.div>
      </section>

      {/* CSS for the component */}
      <style>{`
        /* Fix autofill styles for contact form */
        .input-container input:-webkit-autofill,
        .input-container input:-webkit-autofill:hover,
        .input-container input:-webkit-autofill:focus,
        .input-container input:-webkit-autofill:active {
          -webkit-text-fill-color: #0d1117 !important;
          -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
          transition: background-color 5000s ease-in-out 0s;
          border: 1px solid rgba(48, 54, 61, 0.5) !important;
          box-sizing: border-box !important;
          padding: 8px 1rem !important;
          height: 40px !important;
          line-height: 24px !important;
          width: 100% !important;
          border-radius: 10px !important;
        }
        
        /* Base styles */
        .contact-page-container {
          color: #ffffff;
          font-family: sans-serif;
          position: relative;
        }

        /* Hero Section */
        .contact-hero {
          position: relative;
          min-height: 65vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
          background: #0d1117;
          padding: 80px 0 60px;
        }

        /* Background Elements */
        .hero-background-elements {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .grid-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0, 255, 127, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 127, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(circle at center, black, transparent 70%);
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }

        .gradient-orb-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #00ff7f 0%, transparent 70%);
          top: -200px;
          right: -100px;
        }

        .gradient-orb-2 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #00af60 0%, transparent 70%);
          bottom: -150px;
          left: -100px;
        }

        .contact-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 900px;
          padding: 0 2rem;
          width: 100%;
        }

        /* Hero Badge */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.5rem;
          background: rgba(0, 255, 127, 0.1);
          border: 1px solid rgba(0, 255, 127, 0.3);
          border-radius: 50px;
          margin-bottom: 2rem;
        }

        .badge-text {
          font-size: 0.875rem;
          color: #00ff7f;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: #00ff7f;
          border-radius: 50%;
        }

        .contact-hero h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          margin-bottom: 1.5rem;
          font-weight: 900;
          line-height: 1.1;
        }

        .gradient-text {
          background: linear-gradient(135deg, #00ff7f 0%, #00af60 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }

        .contact-hero p {
          font-size: 1.25rem;
          line-height: 1.6;
          color: #c9d1d9;
          max-width: 700px;
          margin: 0 auto 2.5rem;
        }

        /* Hero Stats */
        .hero-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          display: block;
          font-size: 2rem;
          font-weight: 900;
          color: #00ff7f;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          display: block;
          font-size: 0.875rem;
          color: #8b949e;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
        }

        .contact-hero-bg {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          overflow: hidden;
          z-index: 1;
        }


        /* Vector Background Animation (now in hero) */
        .vector-background {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.3;
        }

        .animated-svg {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        /* Particles */
        .particles-container {
          position: absolute;
          inset: 0;
        }

        .vector-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #00ff7f;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(0, 255, 127, 0.5);
        }

        /* Network Nodes */
        .network-container {
          position: absolute;
          inset: 0;
        }

        .network-node {
          position: absolute;
          width: 20px;
          height: 20px;
        }

        .node-core {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, #00ff7f 0%, transparent 70%);
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(0, 255, 127, 0.6);
        }

        .node-core::before {
          content: '';
          position: absolute;
          inset: -5px;
          background: radial-gradient(circle, transparent 30%, rgba(0, 255, 127, 0.2) 70%);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 0; }
        }

        .connection-line {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        /* Main contact section */
        .contact-main-container {
          padding: 4rem 2rem;
          background: #0d1117;
        }

        .contact-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 2rem;
        }

        @media (max-width: 992px) {
          .contact-wrapper {
            grid-template-columns: 1fr;
          }
        }

        /* Form styling */
        .contact-form-container {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 20px;
          padding: 3rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .contact-form-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 127, 0.5), transparent);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .contact-form-header {
          margin-bottom: 2rem;
        }

        .contact-form-header h2 {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
          color: #00ff7f;
        }

        .contact-form-header p {
          color: #d0d0d0;
          font-size: 1rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
          color: #e0e0e0;
        }

        .required {
          color: #00ff7f;
          margin-left: 0.25rem;
        }

        .input-container {
          position: relative;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.02);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .input-container:hover {
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.03);
        }

        .input-container:focus-within {
          border-color: #00ff7f;
          background: rgba(0, 255, 127, 0.05);
          box-shadow: 0 0 0 3px rgba(0, 255, 127, 0.1);
        }

        .input-container.valid {
          border-color: rgba(0, 255, 127, 0.5);
          background: rgba(0, 255, 127, 0.03);
        }

        .input-container.invalid {
          border-color: rgba(255, 70, 70, 0.5);
          background: rgba(255, 70, 70, 0.03);
        }

        .input-container input {
          width: 100%;
          padding: 8px 1rem !important;
          background: transparent;
          border: none;
          border-radius: 10px;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 400;
          height: 40px !important;
          line-height: 24px !important;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }
        
        .form-group select {
          width: 100%;
          padding: 0 1rem !important;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          background: transparent;
          border: none;
          border-radius: 10px;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 400;
          transition: all 0.3s ease;
          height: 32px !important;
          line-height: 32px !important;
          box-sizing: border-box;
          vertical-align: middle;
          display: block;
        }

        .form-group select {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2300ff7f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .input-container textarea {
          width: 100%;
          padding: 0.375rem 1rem;
          background: transparent;
          border: none;
          border-radius: 10px;
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 400;
          transition: all 0.3s ease;
          height: auto;
          min-height: 100px;
          resize: vertical;
          line-height: 1.3;
        }


        .input-container input:focus,
        .input-container textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #00ff7f;
          box-shadow: 0 0 0 2px rgba(0, 255, 127, 0.2);
        }

        .validation-icon {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
        }

        .validation-icon.valid {
          color: #00ff7f;
        }

        .validation-icon.invalid {
          color: #ff4646;
        }

        .textarea-icon {
          top: 1rem;
          transform: none;
        }

        .validation-message {
          color: #ff4646;
          font-size: 0.8rem;
          margin-top: 0.4rem;
        }

        .form-messages {
          min-height: 2rem;
          margin-bottom: 1.5rem;
        }

        .error-msg {
          color: #ff4646;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 70, 70, 0.1);
          border-radius: 6px;
          border-left: 3px solid #ff4646;
        }

        .submit-button {
          width: 100%;
          padding: 1.25rem;
          background: linear-gradient(135deg, #00ff7f 0%, #00af60 100%);
          color: #0d1117;
          font-weight: 700;
          font-size: 1.1rem;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          margin-top: -0.5rem;
        }

        .submit-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .submit-button:hover::before {
          width: 300px;
          height: 300px;
        }

        .submit-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 255, 127, 0.4);
        }

        .submit-button.loading {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #ffffff;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .form-disclaimer {
          text-align: center;
          margin-top: 0.5rem;
          color: #a0a0a0;
          font-size: 0.85rem;
        }

        .form-disclaimer a {
          color: #00ff7f;
          text-decoration: none;
        }

        /* Success message */
        .success-container {
          text-align: center;
          padding: 2rem;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(0, 255, 127, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: #00ff7f;
        }

        .success-container h3 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: #00ff7f;
        }

        .success-container p {
          color: #d0d0d0;
          margin-bottom: 1.5rem;
        }

        .success-container .button {
          display: inline-block;
          padding: 0.8rem 2rem;
          background: linear-gradient(90deg, #00af60 0%, #00ff7f 100%);
          color: #ffffff;
          font-weight: bold;
          font-size: 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        /* Contact Info styling */
        .contact-info-container {
          align-self: flex-start;
        }

        .contact-info-card {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 20px;
          padding: 3rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
          height: 100%;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .contact-info-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 127, 0.3), transparent);
        }

        .contact-info-card h2 {
          font-size: 1.8rem;
          margin-bottom: 2rem;
          color: #00ff7f;
        }

        .contact-method {
          display: flex;
          align-items: flex-start;
          margin-bottom: 2rem;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
        }

        .contact-method:hover {
          transform: translateY(-2px);
        }

        .contact-method:hover .contact-icon {
          background: rgba(0, 255, 127, 0.2);
          transform: scale(1.1);
        }

        .contact-method span {
          display: block;
        }

        .contact-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 255, 127, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          color: #00ff7f;
          flex-shrink: 0;
        }

        .contact-details h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: #e0e0e0;
        }

        .contact-details a {
          color: #00ff7f;
          text-decoration: none;
          font-weight: bold;
          display: block;
          margin-bottom: 0.5rem;
        }

        .contact-details p {
          color: #a0a0a0;
          font-size: 0.9rem;
        }

        .contact-social {
          margin-bottom: 2rem;
        }

        .contact-social h3 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          color: #e0e0e0;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          color: #e0e0e0;
          transition: all 0.3s ease;
        }

        .social-links a:hover {
          background: rgba(0, 255, 127, 0.2);
          color: #00ff7f;
          transform: translateY(-3px);
        }

        .business-hours {
          margin-bottom: 2rem;
        }

        .business-hours h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: #e0e0e0;
        }

        .business-hours p {
          color: #a0a0a0;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .cta-card {
          background: linear-gradient(135deg, rgba(0,40,30,0.8) 0%, rgba(13,17,23,0.8) 100%);
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 2rem;
          border: 1px solid rgba(0, 255, 127, 0.1);
        }

        .cta-content h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: #00ff7f;
        }

        .cta-content p {
          color: #d0d0d0;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .cta-button {
          display: inline-block;
          padding: 0.6rem 1.5rem;
          background: linear-gradient(90deg, #00af60 0%, #00ff7f 100%);
          color: #ffffff;
          font-weight: bold;
          font-size: 0.9rem;
          border-radius: 30px;
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 255, 127, 0.3);
        }

        /* FAQ Section */
        .contact-faq {
          padding: 6rem 2rem;
          background: #0d1117;
          position: relative;
          overflow: hidden;
        }

        .contact-faq::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(0, 255, 127, 0.05) 0%, transparent 50%);
          animation: rotate 30s linear infinite;
        }

        @keyframes rotate {
          to { transform: rotate(360deg); }
        }

        .faq-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .contact-faq h2 {
          font-size: 2.2rem;
          margin-bottom: 3rem;
          text-align: center;
          color: #00ff7f;
          position: relative;
          padding-bottom: 1rem;
        }

        .contact-faq h2:after {
          content: '';
          position: absolute;
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #00af60 0%, #00ff7f 100%);
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 2rem;
        }

        @media (max-width: 600px) {
          .faq-grid {
            grid-template-columns: 1fr;
          }
        }

        .faq-item {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .faq-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 0;
          background: linear-gradient(to bottom, #00ff7f, #00af60);
          transition: height 0.3s ease;
        }

        .faq-item:hover::before {
          height: 100%;
        }

        .faq-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 255, 127, 0.15);
          border: 1px solid rgba(0, 255, 127, 0.2);
          background: rgba(0, 255, 127, 0.03);
        }

        .faq-item h3 {
          font-size: 1.2rem;
          margin-bottom: 0.75rem;
          color: #00ff7f;
        }

        .faq-item p {
          color: #d0d0d0;
          line-height: 1.6;
        }

        /* Call to Action */
        .contact-cta {
          padding: 5rem 2rem;
          background: linear-gradient(135deg, rgba(0,40,30,0.8) 0%, rgba(13,17,23,0.8) 100%);
          position: relative;
          overflow: hidden;
        }

        .contact-cta:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2300ff7f' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.3;
        }

        .cta-container {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .contact-cta h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          background: linear-gradient(90deg, #ffffff 0%, #00ff7f 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .contact-cta p {
          font-size: 1.2rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
          color: #e0e0e0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .contact-cta .cta-button {
          display: inline-block;
          padding: 1rem 2.5rem;
          background: linear-gradient(90deg, #00af60 0%, #00ff7f 100%);
          color: #ffffff;
          font-weight: bold;
          font-size: 1.2rem;
          border-radius: 30px;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(0, 255, 127, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .contact-cta .cta-button:hover {
          transform: translateY(-5px) scale(1.03);
          box-shadow: 0 10px 25px rgba(0, 255, 127, 0.4);
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .contact-wrapper {
            grid-template-columns: 1fr;
            max-width: 700px;
          }
          
          .contact-info-container {
            order: 2;
          }
          
          .contact-form-container {
            order: 1;
          }
        }

        @media (max-width: 768px) {
          .contact-hero {
            min-height: auto;
            padding: 80px 1rem 60px;
          }

          .contact-hero-content {
            padding: 0 20px !important;
            text-align: center !important;
            align-items: center !important;
          }

          .hero-badge {
            font-size: 0.75rem;
            padding: 0.5rem 1rem;
            margin-bottom: 20px;
            margin-top: 10px;
          }

          .contact-hero h1 {
            font-size: clamp(1.75rem, 5vw, 2.5rem);
            line-height: 1.3;
            margin-bottom: 1rem;
            text-align: center;
          }
          
          .contact-hero p {
            font-size: 1rem;
            margin-bottom: 2rem;
            padding: 0 10px;
            text-align: center;
          }

          .hero-stats {
            gap: 1rem;
            flex-wrap: wrap;
            justify-content: center !important;
            width: 100%;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
            padding: 0 1rem;
          }

          .stat-item {
            padding: 0.75rem 1rem;
          }

          .stat-value {
            font-size: 1.25rem;
          }

          .stat-label {
            font-size: 0.7rem;
          }

          .gradient-orb-1 {
            width: 200px;
            height: 200px;
            right: -100px;
            top: -100px;
          }

          .gradient-orb-2 {
            width: 150px;
            height: 150px;
            left: -75px;
            bottom: -75px;
          }

          /* Hide complex animations on mobile for performance */
          .vector-grid-container {
            display: none;
          }

          /* Improve mobile keyboard experience */
          .contact-form {
            scroll-padding-bottom: 100px;
          }

          /* Ensure form inputs are easily tappable */
          .form-group {
            margin-bottom: 1.25rem;
          }

          .input-container {
            min-height: 48px;
          }
          
          .contact-main-container {
            padding: 2rem 1rem;
          }
          
          .contact-form-container,
          .contact-info-card {
            padding: 1.5rem;
            border-radius: 16px;
          }

          .contact-info-card {
            text-align: left;
            padding: 2rem 1.5rem;
            background: rgba(255, 255, 255, 0.03);
          }

          .contact-info-card h2 {
            text-align: center;
            font-size: 1.5rem;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(0, 255, 127, 0.2);
          }

          .contact-form-header h2 {
            font-size: 1.5rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .input-container input,
          .form-group select {
            padding: 8px 1rem !important;
            font-size: 16px; /* Prevents zoom on iOS */
            height: 40px !important;
            line-height: 24px !important;
          }
          
          .input-container textarea {
            padding: 0.5rem 1rem;
            font-size: 16px; /* Prevents zoom on iOS */
          }

          .submit-button {
            padding: 1rem;
            font-size: 1rem;
          }

          .contact-info h2 {
            text-align: center;
          }

          .contact-method {
            flex-direction: row;
            align-items: flex-start;
            text-align: left;
            margin-bottom: 1.5rem;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.02);
            border-radius: 12px;
            border: 1px solid rgba(0, 255, 127, 0.1);
            transition: all 0.3s ease;
          }

          .contact-method:active {
            background: rgba(0, 255, 127, 0.05);
            border-color: rgba(0, 255, 127, 0.3);
          }

          .contact-icon {
            width: 40px;
            height: 40px;
            margin-right: 1rem;
            margin-bottom: 0;
            background: rgba(0, 255, 127, 0.15);
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .contact-details {
            flex: 1;
            min-width: 0;
          }

          .contact-details h3 {
            font-size: 1rem;
            margin-bottom: 0.25rem;
            color: #00ff7f;
          }

          .contact-details span {
            font-size: 0.9rem;
            word-break: break-word;
            display: inline-block;
            margin-bottom: 0.25rem;
            color: #00ff7f;
            font-weight: bold;
          }

          .contact-details p {
            font-size: 0.8rem;
            margin-bottom: 0;
            color: #a0a0a0;
          }

          .contact-social {
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }

          .contact-social h3 {
            font-size: 1rem;
            text-align: center;
            margin-bottom: 1rem;
          }

          .social-links {
            justify-content: center;
            gap: 0.75rem;
            flex-wrap: wrap;
          }

          .social-links a {
            width: 44px;
            height: 44px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(0, 255, 127, 0.2);
          }

          .social-links a:active {
            background: rgba(0, 255, 127, 0.1);
            transform: scale(0.95);
          }

          .business-hours {
            background: rgba(255, 255, 255, 0.02);
            border-radius: 12px;
            padding: 1.25rem;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(0, 255, 127, 0.1);
          }

          .cta-card {
            padding: 1.5rem;
            background: linear-gradient(135deg, rgba(0, 255, 127, 0.08) 0%, rgba(0, 175, 96, 0.04) 100%);
            border: 1px solid rgba(0, 255, 127, 0.25);
            margin-top: 1.5rem;
          }

          .cta-content h3 {
            font-size: 1.1rem;
          }

          .cta-content p {
            font-size: 0.9rem;
          }

          .cta-button {
            display: block;
            width: 100%;
            padding: 0.875rem;
            font-size: 0.95rem;
            text-align: center;
            border-radius: 8px;
            font-weight: 600;
          }
          
          .contact-cta {
            padding: 3rem 1rem;
          }
          
          .contact-cta h2 {
            font-size: 1.75rem;
            line-height: 1.3;
          }
          
          .contact-cta p {
            font-size: 1rem;
            padding: 0 1rem;
          }

          .contact-cta .cta-button {
            padding: 0.875rem 2rem;
            font-size: 1rem;
          }
          
          .contact-faq {
            padding: 3rem 1rem;
          }
          
          .contact-faq h2 {
            font-size: 1.75rem;
            margin-bottom: 2rem;
          }

          .faq-grid {
            gap: 1rem;
          }

          .faq-item {
            padding: 1.25rem;
          }

          .faq-item h3 {
            font-size: 1rem;
          }

          .faq-item p {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .contact-hero {
            min-height: auto;
            padding: 90px 0.75rem 50px;
          }

          .contact-hero-content {
            padding: 0 15px !important;
          }

          .hero-badge {
            font-size: 0.7rem;
            padding: 0.4rem 0.8rem;
            margin-top: 0;
            margin-bottom: 15px;
          }

          .badge-dot {
            width: 6px !important;
            height: 6px !important;
          }

          .contact-hero h1 {
            font-size: 1.75rem;
            text-align: center;
            line-height: 1.3;
          }

          .contact-hero p {
            font-size: 0.9rem;
            text-align: center;
          }

          .stat-divider {
            display: none;
          }

          .hero-stats {
            flex-direction: column;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
          }

          .stat-item {
            width: 100%;
            max-width: 200px;
            padding: 0.75rem;
            background: rgba(255, 255, 255, 0.02);
            border-radius: 10px;
            border: 1px solid rgba(0, 255, 127, 0.2);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }

          .contact-main-container {
            padding: 1.5rem 0.75rem;
          }

          .contact-form-container,
          .contact-info-card {
            padding: 1.25rem;
          }

          .contact-form-header h2 {
            font-size: 1.25rem;
          }

          .contact-form-header p {
            font-size: 0.875rem;
          }

          .form-group label {
            font-size: 0.875rem;
          }

          .success-container h3 {
            font-size: 1.5rem;
          }

          .contact-info h2 {
            font-size: 1.25rem;
          }

          .contact-method h3 {
            font-size: 1rem;
          }

          .contact-method p {
            font-size: 0.875rem;
          }

          /* Small mobile specific adjustments */
          .contact-method {
            padding: 0.875rem;
          }

          .contact-icon {
            width: 36px;
            height: 36px;
          }

          .contact-details h3 {
            font-size: 0.95rem;
          }

          .contact-details a {
            font-size: 0.85rem;
          }

          .contact-details p {
            font-size: 0.75rem;
          }

          .business-hours {
            padding: 1rem;
            text-align: center;
          }

          .business-hours h3 {
            font-size: 0.95rem;
            text-align: center;
          }

          .business-hours p {
            font-size: 0.8rem;
            text-align: center;
          }

          .cta-card {
            padding: 1.25rem;
          }

          .cta-content h3 {
            font-size: 1rem;
            text-align: center;
          }

          .cta-content p {
            font-size: 0.85rem;
            text-align: center;
          }

          .cta-button {
            padding: 0.75rem;
            font-size: 0.9rem;
          }

          .contact-cta h2 {
            font-size: 1.5rem;
          }

          .contact-cta p {
            font-size: 0.9rem;
          }

          .contact-faq h2 {
            font-size: 1.5rem;
          }

          .faq-item {
            padding: 1rem;
          }

          .faq-item h3 {
            font-size: 0.95rem;
            margin-bottom: 0.5rem;
          }

          .faq-item p {
            font-size: 0.85rem;
            line-height: 1.5;
          }
        }

        /* Touch-friendly adjustments */
        @media (hover: none) and (pointer: coarse) {
          .submit-button:active {
            transform: scale(0.98);
          }

          .contact-method:active,
          .faq-item:active {
            transform: scale(0.98);
          }

          /* Disable hover effects on touch devices */
          .submit-button:hover,
          .contact-method:hover,
          .faq-item:hover,
          .cta-button:hover {
            transform: none;
            box-shadow: none;
          }

          /* Improve touch scrolling */
          .contact-page-container {
            -webkit-overflow-scrolling: touch;
          }

          /* Larger tap targets for better accessibility */
          .input-container input {
            min-height: 40px;
            height: 40px !important;
          }
          .input-container textarea,
          select, 
          button {
            min-height: 48px;
          }
          

          /* Prevent text selection on buttons */
          button, .button, .cta-button {
            -webkit-user-select: none;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
          }
        }

        /* Additional fix for mobile input heights */
        @media (max-width: 768px) {
          .input-container input {
            padding: 12px 1rem !important;
            height: auto !important;
            line-height: normal !important;
            min-height: 44px !important;
          }
          
          /* Force vertical centering on mobile */
          .contact-form.dark-input input[type="text"],
          .contact-form.dark-input input[type="email"],
          .contact-form.dark-input input[type="tel"] {
            appearance: none !important;
            -webkit-appearance: none !important;
            -moz-appearance: none !important;
            border-radius: 10px !important;
          }
          
          /* Fix autofill on mobile */
          .input-container input:-webkit-autofill,
          .input-container input:-webkit-autofill:hover,
          .input-container input:-webkit-autofill:focus,
          .input-container input:-webkit-autofill:active {
            padding: 12px 1rem !important;
            height: auto !important;
            min-height: 44px !important;
            -webkit-box-shadow: 0 0 0 1000px #ffffff inset, 0 0 0 1000px #ffffff inset !important;
            margin: 0 !important;
            width: 100% !important;
            border-radius: 0 !important;
            border: none !important;
          }
        }
        
        /* CRITICAL FIX FOR VERTICAL CENTERING */
        .contact-form.dark-input input[type="text"],
        .contact-form.dark-input input[type="email"],
        .contact-form.dark-input input[type="tel"] {
          display: block !important;
          width: 100% !important;
          height: 40px !important;
          padding: 8px 16px !important;
          font-size: 16px !important;
          line-height: 24px !important;
          box-sizing: border-box !important;
          margin: 0 !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }
        
        /* Remove any default browser styling that might interfere */
        .input-container input::-webkit-input-placeholder {
          line-height: normal;
        }
        .input-container input::-moz-placeholder {
          line-height: normal;
        }
        .input-container input:-ms-input-placeholder {
          line-height: normal;
        }
        .input-container input::placeholder {
          line-height: normal;
        }
      `}</style>
    </div>
  );
};

export default Contact;