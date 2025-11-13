import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';

const Landing2 = () => {
  const [activeService, setActiveService] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const statsRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.2 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
    
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(testimonialInterval);
  }, []);

  // Services data with gradient colors
  const services = [
    {
      id: 'web-apps',
      title: 'Websites & Apps',
      description: 'Custom web applications and mobile solutions built with cutting-edge technologies',
      icon: '💻',
      color: '#00ff7f',
      gradient: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
      features: ['React/Next.js', 'Mobile Apps', 'E-commerce', 'Custom CMS'],
      link: '/services/websites-apps'
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      description: 'Data-driven marketing strategies to grow your online presence',
      icon: '📈',
      color: '#ff6b6b',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)',
      features: ['SEO Optimization', 'PPC Campaigns', 'Social Media', 'Content Marketing'],
      link: '/services/digital-marketing-seo'
    },
    {
      id: 'cloud',
      title: 'Cloud Services',
      description: 'Scalable cloud infrastructure and DevOps solutions',
      icon: '☁️',
      color: '#4ecdc4',
      gradient: 'linear-gradient(135deg, #4ecdc4 0%, #44a3aa 100%)',
      features: ['AWS/Azure', 'DevOps', 'Monitoring', 'Auto-scaling'],
      link: '/services/cloud-services'
    },
    {
      id: 'ai',
      title: 'AI Solutions',
      description: 'Intelligent automation and machine learning integration',
      icon: '🤖',
      color: '#a8e6cf',
      gradient: 'linear-gradient(135deg, #a8e6cf 0%, #7fcdbb 100%)',
      features: ['ChatBots', 'ML Models', 'Automation', 'Data Analysis'],
      link: '/services/ai-solutions'
    },
    {
      id: 'design',
      title: 'UI/UX Design',
      description: 'User-centered design that converts visitors into customers',
      icon: '🎨',
      color: '#ffd3b6',
      gradient: 'linear-gradient(135deg, #ffd3b6 0%, #ffaaa5 100%)',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
      link: '/services/ui-ux-design'
    },
    {
      id: 'video',
      title: 'Video Production',
      description: 'Professional video content for marketing and branding',
      icon: '🎬',
      color: '#ffaaa5',
      gradient: 'linear-gradient(135deg, #ffaaa5 0%, #ff8b94 100%)',
      features: ['Corporate Videos', 'Animation', 'Editing', 'Motion Graphics'],
      link: '/services/video-production'
    }
  ];

  // Stats data
  const stats = [
    { number: '500+', label: 'Projects Completed', icon: '🚀' },
    { number: '200+', label: 'Happy Clients', icon: '😊' },
    { number: '99%', label: 'Client Satisfaction', icon: '⭐' },
    { number: '24/7', label: 'Support Available', icon: '🔧' }
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      content: 'Softeefi transformed our digital presence completely. Their AI solutions increased our efficiency by 40%.',
      rating: 5,
      image: '👤'
    },
    {
      name: 'Michael Chen',
      role: 'Founder, EcoShop',
      content: 'The e-commerce platform they built doubled our sales within 3 months. Exceptional work!',
      rating: 5,
      image: '👤'
    },
    {
      name: 'Emily Davis',
      role: 'Marketing Director, FinFlow',
      content: 'Their digital marketing strategies brought us 300% more qualified leads. Highly recommended!',
      rating: 5,
      image: '👤'
    }
  ];

  // Process steps
  const processSteps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We understand your business goals and requirements'
    },
    {
      number: '02',
      title: 'Strategy',
      description: 'Develop a tailored solution strategy for your needs'
    },
    {
      number: '03',
      title: 'Development',
      description: 'Build your solution with cutting-edge technologies'
    },
    {
      number: '04',
      title: 'Launch',
      description: 'Deploy and optimize for maximum performance'
    }
  ];

  // Loading screen
  if (isLoading) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000
      }}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #00ff7f, #00cc64)',
            borderRadius: '15px',
            transform: 'rotate(45deg)'
          }}
        />
      </div>
    );
  }

  return (
    <>
      <Navbar2 />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        style={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse at center top, rgba(0, 255, 127, 0.15) 0%, transparent 50%), linear-gradient(180deg, #0a0a0a 0%, #0d1117 100%)'
        }}
      >
        {/* Animated background particles */}
        <div style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden'
        }}>
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: '2px',
                height: '2px',
                background: '#00ff7f',
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 1, 0.2]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <motion.div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 2rem',
            paddingTop: '120px',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            y: heroParallax,
            opacity: heroOpacity
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
            width: '100%'
          }}>
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  background: 'rgba(0, 255, 127, 0.1)',
                  border: '1px solid rgba(0, 255, 127, 0.3)',
                  borderRadius: '50px',
                  marginBottom: '1.5rem'
                }}
              >
                <span style={{
                  color: '#00ff7f',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}>
                  🚀 Welcome to the Future
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: '900',
                  lineHeight: '1.1',
                  marginBottom: '1.5rem',
                  color: '#ffffff'
                }}
              >
                Transform Your Business with{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  AI-Powered
                </span>{' '}
                Digital Solutions
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  fontSize: '1.25rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '2rem',
                  lineHeight: '1.6'
                }}
              >
                We build cutting-edge websites, mobile apps, and AI solutions that drive growth 
                and innovation for businesses worldwide.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
                    color: '#0a0a0a',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '50px',
                    fontSize: '1rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(0, 255, 127, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 255, 127, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 127, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Get Started Now →
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: 'transparent',
                    color: '#ffffff',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    padding: '1rem 2rem',
                    borderRadius: '50px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
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
                  View Portfolio
                </motion.button>
              </motion.div>

              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{
                  display: 'flex',
                  gap: '2rem',
                  marginTop: '3rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {[
                  { value: '500+', label: 'Projects' },
                  { value: '200+', label: 'Clients' },
                  { value: '5★', label: 'Rating' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: '#00ff7f'
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: 'rgba(255, 255, 255, 0.5)'
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'relative',
                height: '600px'
              }}
            >
              {/* 3D floating elements */}
              <motion.div
                animate={{
                  y: [-20, 20, -20],
                  rotate: [0, 360]
                }}
                transition={{
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
                style={{
                  position: 'absolute',
                  top: '10%',
                  right: '10%',
                  width: '100px',
                  height: '100px',
                  background: 'linear-gradient(135deg, #00ff7f, #00cc64)',
                  borderRadius: '20px',
                  opacity: 0.8,
                  boxShadow: '0 20px 40px rgba(0, 255, 127, 0.3)'
                }}
              />

              <motion.div
                animate={{
                  y: [20, -20, 20],
                  rotate: [0, -360]
                }}
                transition={{
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" }
                }}
                style={{
                  position: 'absolute',
                  bottom: '20%',
                  left: '15%',
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #4ecdc4, #44a3aa)',
                  borderRadius: '50%',
                  opacity: 0.7,
                  boxShadow: '0 20px 40px rgba(78, 205, 196, 0.3)'
                }}
              />

              {/* Central hero image placeholder */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1]
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
                  width: '400px',
                  height: '400px',
                  background: 'radial-gradient(circle, rgba(0, 255, 127, 0.2) 0%, transparent 70%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div style={{
                  width: '300px',
                  height: '300px',
                  background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.1), rgba(0, 204, 100, 0.1))',
                  borderRadius: '20px',
                  border: '2px solid rgba(0, 255, 127, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)'
                }}>
                  <span style={{
                    fontSize: '4rem',
                    filter: 'drop-shadow(0 0 20px rgba(0, 255, 127, 0.5))'
                  }}>
                    🚀
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.9rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span>Scroll to explore</span>
          <span style={{ fontSize: '1.5rem' }}>↓</span>
        </motion.div>
      </section>

      {/* Services Section */}
      <section
        ref={servicesRef}
        style={{
          padding: '6rem 2rem',
          background: 'linear-gradient(180deg, #0d1117 0%, #0a0a0a 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              textAlign: 'center',
              marginBottom: '4rem'
            }}
          >
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              background: 'rgba(0, 255, 127, 0.1)',
              border: '1px solid rgba(0, 255, 127, 0.3)',
              borderRadius: '50px',
              color: '#00ff7f',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              OUR SERVICES
            </span>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '900',
              color: '#ffffff',
              marginBottom: '1rem'
            }}>
              Solutions That Drive{' '}
              <span style={{
                background: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Growth
              </span>
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.6)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              From concept to deployment, we offer comprehensive digital solutions tailored to your business needs
            </p>
          </motion.div>

          {/* Services Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
                style={{
                  position: 'relative',
                  background: activeService === service.id 
                    ? `linear-gradient(135deg, ${service.color}10, ${service.color}05)`
                    : 'rgba(13, 17, 23, 0.5)',
                  border: `1px solid ${activeService === service.id ? service.color + '30' : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '20px',
                  padding: '2rem',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transform: activeService === service.id ? 'translateY(-5px)' : 'translateY(0)',
                  boxShadow: activeService === service.id 
                    ? `0 20px 40px ${service.color}20`
                    : '0 10px 20px rgba(0, 0, 0, 0.2)'
                }}
              >
                {/* Service Icon */}
                <motion.div
                  animate={activeService === service.id ? { scale: 1.1, rotate: 360 } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: '60px',
                    height: '60px',
                    background: service.gradient,
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    marginBottom: '1.5rem',
                    boxShadow: `0 10px 20px ${service.color}30`
                  }}
                >
                  {service.icon}
                </motion.div>

                {/* Service Content */}
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: '0.75rem'
                }}>
                  {service.title}
                </h3>
                
                <p style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '1.5rem',
                  lineHeight: '1.6'
                }}>
                  {service.description}
                </p>

                {/* Features */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1.5rem'
                }}>
                  {service.features.map((feature, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '0.25rem 0.75rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA Link */}
                <Link
                  to={service.link}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: service.color,
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Learn More 
                  <motion.span
                    animate={activeService === service.id ? { x: 5 } : { x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        style={{
          padding: '4rem 2rem',
          background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.05) 0%, rgba(0, 204, 100, 0.02) 100%)',
          borderTop: '1px solid rgba(0, 255, 127, 0.1)',
          borderBottom: '1px solid rgba(0, 255, 127, 0.1)'
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                textAlign: 'center'
              }}
            >
              <motion.div
                animate={statsInView ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                style={{
                  fontSize: '3rem',
                  marginBottom: '0.5rem'
                }}
              >
                {stat.icon}
              </motion.div>
              <motion.div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: '900',
                  background: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem'
                }}
              >
                {stat.number}
              </motion.div>
              <div style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '1rem'
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section style={{
        padding: '6rem 2rem',
        background: '#0a0a0a'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              textAlign: 'center',
              marginBottom: '4rem'
            }}
          >
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '900',
              color: '#ffffff',
              marginBottom: '1rem'
            }}>
              Our Process
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.6)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              A proven methodology that delivers results
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            position: 'relative'
          }}>
            {/* Connection line */}
            <div style={{
              position: 'absolute',
              top: '60px',
              left: '10%',
              right: '10%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #00ff7f, transparent)',
              zIndex: 0
            }} />

            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{
                  position: 'relative',
                  textAlign: 'center',
                  zIndex: 1
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: '120px',
                    height: '120px',
                    margin: '0 auto 1.5rem',
                    background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.1), rgba(0, 204, 100, 0.05))',
                    border: '2px solid rgba(0, 255, 127, 0.3)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    color: '#00ff7f',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {step.number}
                </motion.div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: '0.75rem'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  lineHeight: '1.6'
                }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(180deg, #0d1117 0%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              textAlign: 'center',
              marginBottom: '4rem'
            }}
          >
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '900',
              color: '#ffffff',
              marginBottom: '1rem'
            }}>
              Client Success Stories
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.6)'
            }}>
              Don't just take our word for it
            </p>
          </motion.div>

          {/* Testimonial Carousel */}
          <div style={{
            position: 'relative',
            minHeight: '300px'
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: 'rgba(13, 17, 23, 0.5)',
                  border: '1px solid rgba(0, 255, 127, 0.2)',
                  borderRadius: '20px',
                  padding: '3rem',
                  backdropFilter: 'blur(10px)'
                }}
              >
                {/* Quote */}
                <div style={{
                  fontSize: '3rem',
                  color: '#00ff7f',
                  marginBottom: '1rem'
                }}>
                  "
                </div>
                <p style={{
                  fontSize: '1.3rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '2rem',
                  lineHeight: '1.6'
                }}>
                  {testimonials[currentTestimonial].content}
                </p>
                
                {/* Author */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(135deg, #00ff7f, #00cc64)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    {testimonials[currentTestimonial].image}
                  </div>
                  <div>
                    <div style={{
                      fontWeight: '700',
                      color: '#ffffff'
                    }}>
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '0.9rem'
                    }}>
                      {testimonials[currentTestimonial].role}
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div style={{
                    marginLeft: 'auto',
                    display: 'flex',
                    gap: '0.25rem'
                  }}>
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <span key={i} style={{ color: '#00ff7f' }}>⭐</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel indicators */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '2rem'
            }}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  style={{
                    width: index === currentTestimonial ? '30px' : '10px',
                    height: '10px',
                    background: index === currentTestimonial 
                      ? 'linear-gradient(135deg, #00ff7f, #00cc64)'
                      : 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '6rem 2rem',
        background: 'radial-gradient(ellipse at center, rgba(0, 255, 127, 0.1) 0%, transparent 50%)',
        position: 'relative'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '900',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Ready to Transform Your Business?
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '2rem'
          }}>
            Let's discuss how we can help you achieve your digital goals
          </p>
          
          <motion.div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
                color: '#0a0a0a',
                border: 'none',
                padding: '1.25rem 2.5rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0, 255, 127, 0.3)'
              }}
            >
              Start Your Project
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'transparent',
                color: '#ffffff',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                padding: '1.25rem 2.5rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Schedule a Call
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      <Footer />

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 968px) {
          section > div {
            padding: 0 1.5rem !important;
          }
          
          h1 {
            font-size: 2.5rem !important;
          }
          
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
        
        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          
          .process-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
};

export default Landing2;