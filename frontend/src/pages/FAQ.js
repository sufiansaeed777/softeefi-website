import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile and add SEO
  useEffect(() => {
    // SEO Optimization for FAQ Page
    document.title = 'Frequently Asked Questions | FAQ - Softeefi';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Find answers to common questions about Softeefi services including web development, AI solutions, pricing, project timelines, and support. Get help with your digital project questions.';
    } else {
      const newMetaDesc = document.createElement('meta');
      newMetaDesc.name = 'description';
      newMetaDesc.content = 'Find answers to common questions about Softeefi services including web development, AI solutions, pricing, project timelines, and support. Get help with your digital project questions.';
      document.head.appendChild(newMetaDesc);
    }
    
    // Add meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'softeefi faq, frequently asked questions, help center, support, web development faq, ai solutions faq, pricing questions, payment plans, project timeline, technical support, how it works, get started, customer support, service questions, digital agency faq';
    
    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://softeefi.co.uk/faq';
    
    // Add Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'FAQ - Frequently Asked Questions | Softeefi' },
      { property: 'og:description', content: 'Get answers to common questions about our web development, AI solutions, and digital marketing services. Learn about pricing, timelines, and how we work.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://softeefi.co.uk/faq' },
      { property: 'og:image', content: 'https://softeefi.co.uk/images/faq-og.jpg' }
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
    
    // Add FAQPage structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Softeefi work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer comprehensive digital solutions including website development, app creation, digital marketing, and AI integration. Our expert team works closely with you to understand your needs and deliver custom solutions that drive results."
          }
        },
        {
          "@type": "Question",
          "name": "What services do you offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our services include: Website Development, Mobile App Development, AI Solutions & Integration, UI/UX Design, Cloud Infrastructure, Digital Marketing & SEO, Graphic Design, Video Production, and Digital Art & NFTs."
          }
        },
        {
          "@type": "Question",
          "name": "How is pricing determined?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pricing is based on project scope, complexity, timeline, and required resources. We provide detailed quotes after understanding your specific requirements during our initial consultation."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer payment plans?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we offer flexible payment plans for larger projects. Typically, we work with a 30-50% upfront deposit and milestone-based payments throughout the project."
          }
        },
        {
          "@type": "Question",
          "name": "What is your typical project timeline?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Project timelines vary based on scope and complexity. Simple websites: 2-4 weeks, Complex web applications: 8-16 weeks, Mobile apps: 12-20 weeks, AI solutions: 4-12 weeks."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide ongoing support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we offer comprehensive maintenance and support packages including regular updates, security monitoring, performance optimization, and technical support."
          }
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

  // FAQ data with categories
  const faqCategories = [
    {
      category: "Getting Started",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.13 12.09l-3.59-3.59c-.7-.7-1.63-1.09-2.6-1.09s-1.91.39-2.61 1.09l-5.44 5.44c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l5.44-5.44c.33-.33.77-.51 1.24-.51s.91.18 1.24.51l3.59 3.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41z" fill="currentColor"/>
          <path d="M5.71 10.71c-.2.2-.51.2-.71 0-.1-.1-.15-.22-.15-.35s.05-.26.15-.35L11.59 3.41c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L3.59 8.59c-.57.57-.89 1.32-.89 2.12s.32 1.55.89 2.12c.58.58 1.34.87 2.12.87s1.54-.29 2.12-.87l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L5.71 10.71z" fill="currentColor"/>
          <path d="M12 15c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="currentColor"/>
        </svg>
      ),
      questions: [
        {
          question: "How does Softeefi work?",
          answer: "We offer comprehensive digital solutions including website development, app creation, digital marketing, and AI integration. Our expert team works closely with you to understand your needs and deliver custom solutions that drive results."
        },
        {
          question: "What services do you offer?",
          answer: "Our services include: Website Development, Mobile App Development, AI Solutions & Integration, UI/UX Design, Cloud Infrastructure, Digital Marketing & SEO, Graphic Design, Video Production, and Digital Art & NFTs."
        },
        {
          question: "How do I get started?",
          answer: "Simply contact us through our contact form, email, or phone. We'll schedule a consultation to discuss your project requirements and provide a tailored solution with transparent pricing."
        }
      ]
    },
    {
      category: "Pricing & Payment",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M2 10h20" stroke="currentColor" strokeWidth="2"/>
          <path d="M6 15h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      questions: [
        {
          question: "How is pricing determined?",
          answer: "Pricing is based on project scope, complexity, timeline, and required resources. We provide detailed quotes after understanding your specific requirements during our initial consultation."
        },
        {
          question: "Do you offer payment plans?",
          answer: "Yes, we offer flexible payment plans for larger projects. Typically, we work with a 30-50% upfront deposit and milestone-based payments throughout the project."
        },
        {
          question: "Are there any hidden fees?",
          answer: "No, we believe in transparent pricing. All costs are clearly outlined in our proposal, including any third-party services or licenses required for your project."
        }
      ]
    },
    {
      category: "Technical Support",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      questions: [
        {
          question: "Do you provide ongoing support?",
          answer: "Yes, we offer various support packages including maintenance, updates, and technical assistance. Support terms are customized based on your needs and can be included in your project proposal."
        },
        {
          question: "What is your response time for issues?",
          answer: "For critical issues, we aim to respond within 2-4 hours during business hours. Non-critical issues are typically addressed within 24-48 hours. Premium support packages offer faster response times."
        },
        {
          question: "Can you help with hosting and domains?",
          answer: "Absolutely! We can manage your hosting, domain registration, SSL certificates, and cloud infrastructure. We work with leading providers to ensure optimal performance and reliability."
        }
      ]
    },
    {
      category: "Project Process",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="2"/>
          <path d="M9 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M9 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      questions: [
        {
          question: "How long does a typical project take?",
          answer: "Project timelines vary based on scope and complexity. A simple website might take 2-4 weeks, while complex applications can take 3-6 months. We provide detailed timelines in our project proposals."
        },
        {
          question: "What is your development process?",
          answer: "We follow an agile methodology: Discovery & Planning → Design & Prototyping → Development → Testing & QA → Launch → Support & Maintenance. You're involved at every stage with regular updates."
        },
        {
          question: "Can I make changes during development?",
          answer: "Yes, we understand requirements can evolve. Minor changes are typically accommodated within the project scope. Significant changes may require a scope adjustment, which we'll discuss transparently."
        }
      ]
    }
  ];

  // Initialize particles
  useEffect(() => {
    const particleArray = [];
    for (let i = 0; i < 50; i++) {
      particleArray.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      });
    }
    setParticles(particleArray);
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          x: (particle.x + particle.speedX + window.innerWidth) % window.innerWidth,
          y: (particle.y + particle.speedY + window.innerHeight) % window.innerHeight,
        }))
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Filter FAQs based on search
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleAccordion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setActiveIndex(activeIndex === key ? null : key);
  };

  return (
    <div className="faq-page" ref={containerRef} style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0d1117 0%, #1a1f2e 100%)",
      color: "#ffffff",
      position: "relative",
      overflow: "hidden",
      padding: isMobile ? "1rem" : "2rem"
    }}>
      {/* Animated particles background */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          style={{
            position: "absolute",
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            background: "rgba(0, 255, 127, 0.5)",
            borderRadius: "50%",
            pointerEvents: "none",
            filter: "blur(1px)",
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: particle.id * 0.1,
          }}
        />
      ))}

      {/* Gradient orbs */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "5%",
        width: isMobile ? "200px" : "400px",
        height: isMobile ? "200px" : "400px",
        background: "radial-gradient(circle, rgba(0, 255, 127, 0.1) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(60px)",
        pointerEvents: "none",
        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
      }} />
      
      <div style={{
        position: "absolute",
        bottom: "10%",
        right: "5%",
        width: isMobile ? "175px" : "350px",
        height: isMobile ? "175px" : "350px",
        background: "radial-gradient(circle, rgba(138, 43, 226, 0.1) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(60px)",
        pointerEvents: "none",
        transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)`,
      }} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ textAlign: "center", marginBottom: isMobile ? "2rem" : "4rem" }}
        >
          <h1 style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: "900",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #ffffff 0%, #00ff7f 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Frequently Asked Questions
          </h1>
          <p style={{
            fontSize: isMobile ? "1rem" : "1.3rem",
            color: "#c9d1d9",
            marginBottom: "2rem",
          }}>
            Find answers to common questions about our services
          </p>

          {/* Search Bar */}
          <motion.div
            whileHover={{ scale: isMobile ? 1 : 1.02 }}
            style={{
              maxWidth: isMobile ? "calc(100% - 1rem)" : "600px",
              margin: "0 auto",
              position: "relative",
              width: isMobile ? "calc(100% - 1rem)" : "100%",
              padding: "0",
            }}
          >
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: isMobile ? "0.8rem 3rem 0.8rem 1rem" : "1rem 3rem 1rem 1.5rem",
                fontSize: isMobile ? "1rem" : "1.1rem",
                background: "rgba(255, 255, 255, 0.1)",
                border: "2px solid rgba(0, 255, 127, 0.3)",
                borderRadius: "50px",
                color: "#ffffff",
                outline: "none",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(0, 255, 127, 0.8)";
                e.target.style.background = "rgba(255, 255, 255, 0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(0, 255, 127, 0.3)";
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
              }}
            />
            <div style={{
              position: "absolute",
              right: isMobile ? "0.8rem" : "1.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#00ff7f",
              pointerEvents: "none",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        </motion.div>

        {/* FAQ Categories */}
        {filteredCategories.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * categoryIndex }}
            style={{
              marginBottom: "3rem",
            }}
          >
            <h2 style={{
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2.5rem', height: '2.5rem' }}>{category.icon}</span>
              {category.category}
            </h2>

            {/* FAQ Items */}
            {category.questions.map((item, questionIndex) => {
              const isActive = activeIndex === `${categoryIndex}-${questionIndex}`;
              const isHovered = hoveredItem === `${categoryIndex}-${questionIndex}`;

              return (
                <motion.div
                  key={questionIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * questionIndex }}
                  onMouseEnter={() => setHoveredItem(`${categoryIndex}-${questionIndex}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    marginBottom: "1rem",
                    background: isHovered 
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(255, 255, 255, 0.05)",
                    borderRadius: "15px",
                    overflow: "hidden",
                    border: `2px solid ${isActive ? "rgba(0, 255, 127, 0.5)" : "rgba(255, 255, 255, 0.1)"}`,
                    transition: "all 0.3s ease",
                    transform: isHovered ? "translateX(5px)" : "translateX(0)",
                  }}
                >
                  <button
                    onClick={() => toggleAccordion(categoryIndex, questionIndex)}
                    style={{
                      width: "100%",
                      padding: "1.5rem",
                      background: "transparent",
                      border: "none",
                      color: "#ffffff",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      textAlign: "left",
                    }}
                  >
                    <span>{item.question}</span>
                    <motion.span
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        fontSize: "1.5rem",
                        color: "#00ff7f",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          overflow: "hidden",
                        }}
                      >
                        <div style={{
                          padding: "0 1.5rem 1.5rem",
                          color: "#c9d1d9",
                          fontSize: "1rem",
                          lineHeight: "1.8",
                        }}>
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        ))}

        {/* No results message */}
        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: "center",
              padding: "4rem",
              color: "#c9d1d9",
            }}
          >
            <p style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>
              No FAQs found matching "{searchTerm}"
            </p>
            <p>Try searching with different keywords</p>
          </motion.div>
        )}

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            textAlign: "center",
            marginTop: "5rem",
            padding: isMobile ? "1.5rem" : "3rem",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "20px",
            border: "2px solid rgba(0, 255, 127, 0.3)",
          }}
        >
          <h3 style={{
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "1rem",
          }}>
            Still have questions?
          </h3>
          <p style={{
            fontSize: "1.2rem",
            color: "#c9d1d9",
            marginBottom: "2rem",
          }}>
            Our team is here to help you with any queries
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: "inline-block",
              padding: isMobile ? "0.8rem 2rem" : "1rem 3rem",
              background: "linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)",
              color: "#0d1117",
              borderRadius: "50px",
              fontWeight: "700",
              fontSize: "1.1rem",
              textDecoration: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 5px 20px rgba(0, 255, 127, 0.3)",
            }}
          >
            Contact Us
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FAQ;