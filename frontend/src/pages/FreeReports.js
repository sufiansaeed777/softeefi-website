import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { WebsiteIcon, AppDevIcon, MarketingIcon, CloudIcon, AISparkleIcon } from '../components/SimpleIcons';

const FreeReports = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    occupation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });
  const [particlesEnabled, setParticlesEnabled] = useState(true);

  useEffect(() => {
    // SEO Optimization for Free Learning Resources
    document.title = 'Free Digital Marketing Reports & Learning Resources | Free SEO Audit - Softeefi';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Get free digital marketing reports, website audits, and learning resources. Free SEO audit, website analysis, marketing guides, and business growth strategies. Learn digital marketing for free.';
    } else {
      const newMetaDesc = document.createElement('meta');
      newMetaDesc.name = 'description';
      newMetaDesc.content = 'Get free digital marketing reports, website audits, and learning resources. Free SEO audit, website analysis, marketing guides, and business growth strategies. Learn digital marketing for free.';
      document.head.appendChild(newMetaDesc);
    }
    
    // Add meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'free seo audit, free website audit, free digital marketing report, free marketing analysis, free website analysis, free seo report, free marketing guide, free learning resources, learn digital marketing free, free business analysis, free competitor analysis, free website review, free seo check, free marketing consultation, free digital strategy, free growth hacking guide, free marketing tips, free seo tips, free web development guide, free app development guide, free ai implementation guide, free cloud migration guide';
    
    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://softeefi.co.uk/free-reports';
    
    // Add Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Free Digital Marketing Reports & Learning Resources | Softeefi' },
      { property: 'og:description', content: 'Get instant access to free digital marketing reports, SEO audits, and learning resources. Transform your business with data-driven insights and expert guides.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://softeefi.co.uk/free-reports' },
      { property: 'og:image', content: 'https://softeefi.co.uk/images/free-reports-og.jpg' }
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
    
    // Add structured data for Educational/Learning content
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "EducationalOrganization",
          "name": "Softeefi Learning Center",
          "description": "Free digital marketing learning resources and business growth guides",
          "url": "https://softeefi.co.uk/free-reports",
          "provider": {
            "@type": "Organization",
            "name": "Softeefi",
            "url": "https://softeefi.co.uk"
          }
        },
        {
          "@type": "Course",
          "name": "Free Digital Marketing Resources",
          "description": "Comprehensive collection of free digital marketing reports, SEO audits, and learning materials",
          "provider": {
            "@type": "Organization",
            "name": "Softeefi"
          },
          "educationalLevel": "Beginner to Advanced",
          "availableLanguage": "en-GB",
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "online",
            "isAccessibleForFree": true
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What free reports are available?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We offer free SEO audits, website analysis reports, digital marketing assessments, competitor analysis, and growth strategy guides. All reports are customized to your business needs."
              }
            },
            {
              "@type": "Question",
              "name": "How do I get a free SEO audit?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Simply fill out our quick form with your name, email, and occupation. You'll get instant access to our free SEO audit tool and comprehensive website analysis report."
              }
            },
            {
              "@type": "Question",
              "name": "Are the learning resources really free?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, all our learning resources and reports are 100% free. No hidden costs or credit card required. We believe in empowering businesses with knowledge."
              }
            },
            {
              "@type": "Question",
              "name": "What topics do the free resources cover?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our free resources cover SEO, digital marketing, web development, mobile app development, AI implementation, cloud migration, and business growth strategies."
              }
            },
            {
              "@type": "Question",
              "name": "How often are the resources updated?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We update our free learning resources monthly to ensure you get the latest industry insights, algorithm updates, and marketing strategies."
              }
            }
          ]
        },
        {
          "@type": "Offer",
          "name": "Free Digital Marketing Reports",
          "description": "Get free access to comprehensive digital marketing reports and learning resources",
          "price": "0",
          "priceCurrency": "GBP",
          "availability": "https://schema.org/InStock",
          "url": "https://softeefi.co.uk/free-reports",
          "category": "Educational Resources"
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
    
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setParticlesEnabled(!mobile || window.innerWidth > 480);
    };
    checkDevice();
    
    const handleResize = () => {
      requestAnimationFrame(checkDevice);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const storedAccess = localStorage.getItem('freeReportsAccess');
    if (storedAccess) {
      setHasAccess(true);
    }
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (formMessage.type === 'error' && name === 'occupation') {
      setFormMessage({ type: '', text: '' });
    }
  }, [formMessage.type]);

  const validateOccupation = useCallback(async (occupation) => {
    if (!occupation || occupation.trim().length < 2) {
      return { valid: false, message: 'Please enter a valid occupation.' };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('/api/gemini/validate-occupation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ occupation }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Validation timeout');
      }
      if (occupation.length < 2 || /^[^a-zA-Z\s]+$/.test(occupation)) {
        return { 
          valid: false, 
          message: 'Please enter a valid occupation using letters.' 
        };
      }
    }
    
    return { valid: true };
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const occupationValidation = await validateOccupation(formData.occupation);
    if (!occupationValidation.valid) {
      setFormMessage({ 
        type: 'error', 
        text: occupationValidation.message 
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      const response = await fetch('/api/free-reports/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setFormMessage({ 
          type: 'success', 
          text: data.alreadyRegistered 
            ? 'Welcome back! Access granted.' 
            : 'Registration successful! Access granted.'
        });
        
        setTimeout(() => {
          setHasAccess(true);
          localStorage.setItem('freeReportsAccess', 'true');
          localStorage.setItem('userInfo', JSON.stringify(formData));
        }, 1500);
      } else {
        setFormMessage({ 
          type: 'error', 
          text: data.error || 'Something went wrong. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormMessage({ 
        type: 'error', 
        text: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateOccupation]);

  const handleDownload = useCallback((report) => {
    if (report.fileType === 'markdown') {
      window.location.href = `/reports/markdown-viewer.html?file=${encodeURIComponent(report.filePath)}`;
    } else if (report.viewInBrowser) {
      window.location.href = report.filePath;
    } else {
      const link = document.createElement('a');
      link.href = report.filePath;
      link.download = report.filePath.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, []);

  const reports = [
    {
      id: "web-app-development-101",
      title: "Web & App Development 101",
      subtitle: "Complete guide to building digital products",
      description: "A comprehensive guide with visual resources, hands-on tutorials, and practical advice for creating websites and mobile apps in 2025.",
      icon: <AppDevIcon size={isMobile ? 40 : 48} color="#00ff7f" />,
      features: ["Beginner-Friendly", "Real Examples", "Cost Breakdowns", "Hands-On Tutorials"],
      color: "#00ff7f",
      filePath: "/reports/web-app-development-101.md",
      fileType: "markdown",
      viewInBrowser: true
    },
    {
      id: "digital-marketing-seo-101",
      title: "Digital Marketing Mastery Guide",
      subtitle: "Your complete online growth playbook",
      description: "Everything you need to know about digital marketing and SEO in 2025. Learn how to grow your online presence with proven strategies.",
      icon: <MarketingIcon size={isMobile ? 40 : 48} color="#00d4ff" />,
      features: ["SEO Basics", "Social Media Guide", "Content Strategy", "Analytics Tutorial"],
      color: "#00d4ff",
      filePath: "/reports/digital-marketing-seo-101.md",
      fileType: "markdown",
      viewInBrowser: true
    },
    {
      id: "cloud-basics-guide",
      title: "Cloud Basics & Security Guide",
      subtitle: "Master cloud computing fundamentals",
      description: "Complete guide to understanding cloud computing, from basic concepts to security best practices for your business.",
      icon: <CloudIcon size={isMobile ? 40 : 48} color="#ff00ff" />,
      features: ["Cloud Fundamentals", "Security Basics", "Cost Management", "Best Practices"],
      color: "#ff00ff",
      filePath: "/reports/cloud-security-101.md",
      fileType: "markdown",
      viewInBrowser: true
    },
    {
      id: "ai-for-business",
      title: "AI for Business Growth",
      subtitle: "Transform your business with AI",
      description: "Practical guide to implementing AI in your business for automation, customer service, and data-driven decisions.",
      icon: <AISparkleIcon size={isMobile ? 40 : 48} color="#ffaa00" />,
      features: ["AI Strategy", "Implementation Guide", "Use Cases", "ROI Analysis"],
      color: "#ffaa00",
      filePath: "/reports/ai-for-business.md",
      fileType: "markdown",
      viewInBrowser: true
    }
  ];

  const inputStyle = {
    background: 'rgba(13, 17, 23, 0.8)',
    border: '1px solid rgba(48, 54, 61, 0.5)',
    borderRadius: '8px',
    padding: isMobile ? '12px 12px' : '12px 16px',
    fontSize: '16px',
    color: '#ffffff',
    outline: 'none',
    transition: 'all 0.3s ease',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    width: '100%',
    boxSizing: 'border-box'
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = '#00ff7f';
    e.target.style.boxShadow = '0 0 0 3px rgba(0, 255, 127, 0.1)';
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = 'rgba(48, 54, 61, 0.5)';
    e.target.style.boxShadow = 'none';
  };

  if (!hasAccess) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0d1117',
        color: '#ffffff',
        paddingTop: isMobile ? '60px' : '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '1rem' : '2rem',
        overflowX: 'hidden'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: '500px',
            width: isMobile ? 'calc(100% - 2rem)' : '100%',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            borderRadius: isMobile ? '16px' : '20px',
            padding: isMobile ? '1.25rem' : '3rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            margin: '0 auto',
            boxSizing: 'border-box'
          }}
        >
          <h2 style={{
            fontSize: isMobile ? '1.5rem' : '2.5rem',
            fontWeight: '700',
            marginBottom: '1rem',
            textAlign: 'center',
            color: '#ffffff',
            lineHeight: '1.2'
          }}>
            Unlock £500+ Worth of Knowledge
          </h2>
          <p style={{
            fontSize: isMobile ? '0.9rem' : '1rem',
            color: '#00ff7f',
            marginBottom: '1.5rem',
            textAlign: 'center',
            lineHeight: '1.4',
            fontWeight: '600'
          }}>
            🎯 Join 100+ professionals who transformed their businesses
          </p>
          
          <div style={{
            background: 'rgba(0, 255, 127, 0.05)',
            border: '1px solid rgba(0, 255, 127, 0.2)',
            borderRadius: '12px',
            padding: isMobile ? '0.75rem' : '1rem',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{
              fontSize: isMobile ? '0.95rem' : '1.1rem',
              color: '#ffffff',
              marginBottom: '0.75rem',
              textAlign: 'center'
            }}>
              What You'll Get Instantly:
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { title: 'Web Development Guide:', desc: 'Build websites that cost £5-15K' },
                { title: 'AI Business Blueprint:', desc: 'Cut 70% costs with AI automation' },
                { title: 'SEO Masterclass:', desc: 'Rank #1 on Google' },
                { title: 'Cloud Security Toolkit:', desc: 'Protect your business' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: '#00ff7f', fontSize: '1rem', flexShrink: 0, marginTop: '2px' }}>✓</span>
                  <span style={{ fontSize: isMobile ? '0.75rem' : '0.85rem', color: '#c9d1d9', lineHeight: '1.3' }}>
                    <strong>{item.title}</strong> {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <p style={{
            fontSize: isMobile ? '0.85rem' : '0.9rem',
            color: '#ffaa00',
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontWeight: '600'
          }}>
            ⚡ Limited Time: These resources usually cost £50+ each
          </p>

          <AnimatePresence>
            {formMessage.text && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  padding: isMobile ? '0.75rem' : '1rem',
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  background: formMessage.type === 'success' ? 'rgba(0, 255, 127, 0.1)' : 'rgba(255, 0, 0, 0.1)',
                  color: formMessage.type === 'success' ? '#00ff7f' : '#ff4444',
                  border: `1px solid ${formMessage.type === 'success' ? 'rgba(0, 255, 127, 0.3)' : 'rgba(255, 0, 0, 0.3)'}`,
                  fontSize: isMobile ? '0.85rem' : '0.95rem'
                }}
              >
                {formMessage.text}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '1rem' : '1.5rem'
          }}>
            {[
              { label: 'Full Name', name: 'name', type: 'text', placeholder: '' },
              { label: 'Email Address', name: 'email', type: 'email', placeholder: '' },
              { label: 'Occupation', name: 'occupation', type: 'text', placeholder: isMobile ? 'Your occupation' : 'e.g., Student, Developer, Business Owner' }
            ].map((field) => (
              <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{
                  color: '#c9d1d9',
                  fontSize: isMobile ? '0.9rem' : '0.95rem',
                  fontWeight: '500'
                }}>
                  {field.label} *
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  required
                  placeholder={field.placeholder}
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  autoComplete={field.name === 'email' ? 'email' : field.name === 'name' ? 'name' : 'off'}
                />
              </div>
            ))}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              style={{
                background: isSubmitting 
                  ? 'linear-gradient(135deg, rgba(0, 255, 127, 0.5) 0%, rgba(0, 175, 96, 0.5) 100%)' 
                  : 'linear-gradient(135deg, #00ff7f 0%, #00af60 100%)',
                color: '#0d1117',
                border: 'none',
                borderRadius: '8px',
                padding: isMobile ? '14px 24px' : '16px 32px',
                fontSize: isMobile ? '0.95rem' : '1.1rem',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: isSubmitting ? 0.7 : 1,
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                minHeight: isMobile ? '48px' : '52px'
              }}
            >
              {isSubmitting ? (
                <>
                  <motion.span
                    style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid #0d1117',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      display: 'inline-block'
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  <span>Processing...</span>
                </>
              ) : (
                'Get Free Access →'
              )}
            </motion.button>

            <p style={{
              fontSize: isMobile ? '0.7rem' : '0.8rem',
              color: '#8b949e',
              textAlign: 'center',
              marginTop: '0.5rem',
              lineHeight: '1.4'
            }}>
              By submitting, you agree to receive occasional updates about new resources and services
            </p>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d1117',
      color: '#ffffff',
      paddingTop: '0',
      overflowX: 'hidden'
    }}>
      {/* Hero Section */}
      <section style={{
        minHeight: isMobile ? '50vh' : '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #001a0f 0%, #002d1a 50%, #00170d 100%)',
        paddingTop: isMobile ? '60px' : '90px',
        marginTop: isMobile ? '-60px' : '-90px'
      }}>
        {/* Optimized Background Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          pointerEvents: 'none'
        }}>
          {/* Reduced Particles for Mobile */}
          {particlesEnabled && [...Array(isMobile ? 8 : 20)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: '2px',
                height: '2px',
                background: '#00ff7f',
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: '0 0 10px rgba(0, 255, 127, 0.5)',
                willChange: 'transform'
              }}
              animate={{
                y: [-20, -40, -20],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
          
          {/* Simplified Gradient Orbs */}
          {!isMobile && (
            <>
              <div
                style={{
                  position: 'absolute',
                  width: '300px',
                  height: '300px',
                  background: 'radial-gradient(circle, rgba(0, 255, 127, 0.08) 0%, transparent 70%)',
                  borderRadius: '50%',
                  left: '-10%',
                  top: '20%',
                  filter: 'blur(40px)',
                  willChange: 'transform'
                }}
              />
              
              <div
                style={{
                  position: 'absolute',
                  width: '400px',
                  height: '400px',
                  background: 'radial-gradient(circle, rgba(0, 212, 255, 0.06) 0%, transparent 70%)',
                  borderRadius: '50%',
                  right: '-15%',
                  bottom: '10%',
                  filter: 'blur(60px)',
                  willChange: 'transform'
                }}
              />
            </>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            padding: isMobile ? '1.5rem' : '2rem',
            maxWidth: isMobile ? '100%' : '900px',
            position: 'relative',
            zIndex: 1
          }}
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              display: 'inline-block',
              padding: isMobile ? '0.4rem 1rem' : '0.5rem 1.5rem',
              background: 'rgba(0, 255, 127, 0.1)',
              border: '1px solid rgba(0, 255, 127, 0.3)',
              borderRadius: '50px',
              marginBottom: isMobile ? '1.5rem' : '2rem'
            }}
          >
            <span style={{
              color: '#00ff7f',
              fontSize: isMobile ? '0.75rem' : '0.95rem',
              fontWeight: '600',
              letterSpacing: '0.5px'
            }}>
              🎓 100% FREE • NO CREDIT CARD REQUIRED
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontSize: isMobile ? '1.8rem' : 'clamp(3rem, 5vw, 4rem)',
              fontWeight: '900',
              marginBottom: '1rem',
              color: '#ffffff',
              lineHeight: '1.1',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}
          >
            Transform Your Business
            {!isMobile && <br/>}
            <span style={{ 
              background: 'linear-gradient(135deg, #00ff7f 0%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: isMobile ? 'block' : 'inline',
              marginTop: isMobile ? '0.5rem' : '0'
            }}>
              {' With Expert Knowledge'}
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              fontSize: isMobile ? '0.95rem' : 'clamp(1.1rem, 2vw, 1.3rem)',
              marginBottom: '1rem',
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: '1.5',
              maxWidth: isMobile ? '100%' : '700px',
              margin: '0 auto 1rem',
              padding: isMobile ? '0 0.5rem' : '0'
            }}
          >
            Access comprehensive guides on web development, AI integration, digital marketing, 
            and cloud security
          </motion.p>

          {/* Simplified Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              display: 'flex',
              gap: isMobile ? '1.5rem' : '2.5rem',
              justifyContent: 'center',
              marginBottom: isMobile ? '1.5rem' : '2rem',
              marginTop: isMobile ? '1.5rem' : '2rem'
            }}
          >
            {[
              { number: '10K+', label: 'Downloads' },
              { number: '4.9★', label: 'Rating' },
              { number: '2025', label: 'Updated' }
            ].map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: isMobile ? '1.3rem' : '1.8rem',
                  fontWeight: '700',
                  color: '#00ff7f',
                  marginBottom: '0.2rem'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: isMobile ? '0.7rem' : '0.8rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{
              display: 'flex',
              gap: isMobile ? '0.75rem' : '1rem',
              justifyContent: 'center',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              marginTop: isMobile ? '1.5rem' : '2rem',
              padding: isMobile ? '0 1rem' : '0'
            }}>
              <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isMobile ? '12px 24px' : '14px 32px',
                background: '#00ff7f',
                color: '#0d1117',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: isMobile ? '0.95rem' : '1rem',
                transition: 'all 0.3s ease',
                border: '2px solid #00ff7f',
                width: isMobile ? '100%' : 'auto',
                maxWidth: isMobile ? '280px' : 'none',
                minHeight: '44px'
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 127, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              Request a Consultation →
            </Link>
            
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  document.getElementById('services-section')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }, 100);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isMobile ? '12px 24px' : '14px 32px',
                background: 'transparent',
                color: '#ffffff',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: isMobile ? '0.95rem' : '1rem',
                transition: 'all 0.3s ease',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                width: isMobile ? '100%' : 'auto',
                maxWidth: isMobile ? '280px' : 'none',
                minHeight: '44px',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.borderColor = '#ffffff';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              View Our Work
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Reports Grid - Optimized */}
      <section 
        id="reports-section"
        style={{
          padding: isMobile ? '2rem 1rem' : '3rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: isMobile ? '1.25rem' : '1.5rem'
        }}>
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              style={{
                background: 'rgba(10, 10, 10, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: isMobile ? '16px' : '20px',
                padding: isMobile ? '1.25rem' : '1.75rem',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                minHeight: isMobile ? '320px' : 'auto'
              }}
              onClick={() => handleDownload(report)}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.borderColor = report.color;
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = `0 15px 30px ${report.color}22`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              <div style={{
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center'
              }}>
                {report.icon}
              </div>

              <h3 style={{
                fontSize: isMobile ? '1.1rem' : '1.3rem',
                marginBottom: '0.4rem',
                color: '#ffffff',
                lineHeight: '1.2',
                fontWeight: '700'
              }}>
                {report.title}
              </h3>

              <p style={{
                fontSize: isMobile ? '0.85rem' : '0.95rem',
                color: report.color,
                marginBottom: '0.5rem',
                fontWeight: '600'
              }}>
                {report.subtitle}
              </p>

              <p style={{
                fontSize: isMobile ? '0.75rem' : '0.8rem',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '1rem',
                lineHeight: '1.4',
                flex: 1
              }}>
                {report.description}
              </p>

              <div style={{
                marginBottom: '1rem'
              }}>
                {report.features.slice(0, isMobile ? 3 : 4).map((feature, idx) => (
                  <div key={idx} style={{
                    fontSize: isMobile ? '0.7rem' : '0.75rem',
                    color: '#00ff7f',
                    marginBottom: '0.2rem',
                    paddingLeft: '1rem',
                    position: 'relative',
                    lineHeight: '1.3'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: '0.1rem'
                    }}>•</span>
                    {feature}
                  </div>
                ))}
              </div>

              <button
                style={{
                  width: '100%',
                  padding: isMobile ? '12px 20px' : '12px 24px',
                  background: `linear-gradient(135deg, ${report.color} 0%, ${report.color}99 100%)`,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: isMobile ? '0.9rem' : '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '40px',
                  marginTop: 'auto'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.stopPropagation();
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.stopPropagation();
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                View Resource →
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section - Simplified */}
      <section style={{
        padding: isMobile ? '2.5rem 1rem' : '3rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(0, 30, 60, 0.4) 0%, rgba(13, 17, 23, 0.6) 100%)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            maxWidth: isMobile ? '100%' : '800px',
            margin: '0 auto',
            padding: isMobile ? '0 1rem' : '0'
          }}
        >
          <h2 style={{
            fontSize: isMobile ? '1.5rem' : 'clamp(2rem, 3vw, 2.5rem)',
            marginBottom: '0.75rem',
            color: '#ffffff',
            lineHeight: '1.2',
            fontWeight: '800'
          }}>
            Ready to Transform Your Business?
          </h2>
          <p style={{
            fontSize: isMobile ? '0.9rem' : '1.1rem',
            marginBottom: '1.5rem',
            color: '#c9d1d9',
            lineHeight: '1.4'
          }}>
            Schedule a consultation with our Microsoft-certified experts
          </p>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isMobile ? '12px 28px' : '14px 36px',
              background: '#00ff7f',
              color: '#0d1117',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: isMobile ? '0.95rem' : '1rem',
              transition: 'all 0.3s ease',
              minHeight: '44px'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 127, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            Request a Consultation
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default FreeReports;