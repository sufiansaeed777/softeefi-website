import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Process = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const processSteps = [
    {
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" stroke="#00ff7f" strokeWidth="2" fill="rgba(0, 255, 127, 0.1)"/>
          <path d="M20 25C20 25 25 20 30 20C35 20 40 25 40 25M20 35C20 35 25 40 30 40C35 40 40 35 40 35" stroke="#00ff7f" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="25" cy="28" r="2" fill="#00ff7f"/>
          <circle cx="35" cy="28" r="2" fill="#00ff7f"/>
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
      number: 'Step 1',
      title: 'Discovery & Consultation',
      description: 'We start by understanding your business goals, target audience, and specific requirements through a detailed consultation.',
      color: '#00ff7f'
    },
    {
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="12" width="36" height="36" rx="4" stroke="#ff6b35" strokeWidth="2" fill="rgba(255, 107, 53, 0.1)"/>
          <path d="M20 30L28 38L40 22" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="20" cy="20" r="3" fill="#ff6b35"/>
          <circle cx="40" cy="20" r="3" fill="#ff6b35"/>
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=800',
      number: 'Step 2',
      title: 'Design & Planning',
      description: 'Our team creates wireframes, mockups, and a comprehensive project plan tailored to your vision and objectives.',
      color: '#ff6b35'
    },
    {
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 10L40 20L35 35H25L20 20L30 10Z" stroke="#00d4ff" strokeWidth="2" fill="rgba(0, 212, 255, 0.1)"/>
          <path d="M30 10V35M20 20H40M25 35L20 45M35 35L40 45" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      number: 'Step 3',
      title: 'Development & Implementation',
      description: 'Using cutting-edge technologies, we bring your project to life with clean code and scalable architecture.',
      color: '#00d4ff'
    },
    {
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="20" stroke="#9333ea" strokeWidth="2" fill="rgba(147, 51, 234, 0.1)"/>
          <path d="M20 30L26 36L40 22" stroke="#9333ea" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      number: 'Step 4',
      title: 'Testing & Quality Assurance',
      description: 'Rigorous testing ensures your solution works flawlessly across all devices and meets the highest standards.',
      color: '#9333ea'
    },
    {
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 45C30 45 15 35 15 25C15 20 20 15 30 15C40 15 45 20 45 25C45 35 30 45 30 45Z" stroke="#f59e0b" strokeWidth="2" fill="rgba(245, 158, 11, 0.1)"/>
          <circle cx="30" cy="25" r="5" fill="#f59e0b"/>
          <path d="M25 40L20 50M35 40L40 50M30 45V55" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      number: 'Step 5',
      title: 'Launch & Support',
      description: 'We deploy your project and provide ongoing support to ensure continued success and optimization.',
      color: '#f59e0b'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d1117'
    }}>
      <Helmet>
        <title>Our Process | How We Work - Softeefi</title>
        <meta name="description" content="Discover Softeefi's proven development process. From discovery to deployment, we follow a systematic approach to deliver exceptional digital solutions." />
        <link rel="canonical" href="https://softeefi.co.uk/process" />
      </Helmet>
      {/* Hero Section - Now pulls up behind navbar */}
      <section style={{
        paddingTop: isMobile ? '120px' : '150px',
        paddingBottom: isMobile ? '3rem' : '5rem',
        paddingLeft: isMobile ? '1rem' : '2rem',
        paddingRight: isMobile ? '1rem' : '2rem',
        minHeight: isMobile ? '70vh' : '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)',
        position: 'relative',
        overflow: 'hidden',
        marginTop: '-100px'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          <h1 style={{
            fontSize: isMobile ? '2.5rem' : '4rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #00ff7f 0%, #00d4ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Our Process
          </h1>
          <p style={{
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            color: '#8b949e',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.8'
          }}>
            From concept to launch, we follow a proven methodology that ensures 
            your project's success at every stage
          </p>
        </motion.div>

        {/* Animated Background SVG */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            opacity: 0.1
          }}
          viewBox="0 0 1440 320"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            fill="none"
            stroke="#00ff7f"
            strokeWidth="2"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128"
          />
        </svg>
      </section>

      {/* Process Steps Section */}
      <section style={{
        padding: isMobile ? '4rem 1rem' : '6rem 2rem',
        background: '#0a0a0a'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : index % 2 === 0 ? 'row' : 'row-reverse',
                alignItems: 'center',
                marginBottom: isMobile ? '4rem' : '6rem',
                gap: isMobile ? '2rem' : '4rem'
              }}
            >
              {/* Icon/Visual Side */}
              <div style={{
                flex: '1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
              }}>
                {/* Image with overlay */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  style={{
                    position: 'relative',
                    width: isMobile ? '100%' : '400px',
                    maxWidth: isMobile ? '320px' : '400px',
                    height: isMobile ? '220px' : '300px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: `0 20px 60px ${step.color}20`
                  }}
                >
                  <img 
                    src={step.image}
                    alt={step.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  
                  {/* Overlay with icon */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${step.color}40 0%, rgba(0,0,0,0.8) 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{ transform: 'scale(1.5)' }}
                    >
                      {step.icon}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Connecting line (except for last item) */}
                {index < processSteps.length - 1 && !isMobile && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{
                      position: 'absolute',
                      bottom: '-3rem',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '2px',
                      height: '6rem',
                      background: `linear-gradient(180deg, ${step.color} 0%, ${processSteps[index + 1]?.color || step.color} 100%)`,
                      opacity: 0.3
                    }}
                  />
                )}
              </div>

              {/* Content Side */}
              <div style={{
                flex: '1',
                textAlign: isMobile ? 'center' : 'left'
              }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <span style={{
                    color: step.color,
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}>
                    {step.number}
                  </span>
                  <h2 style={{
                    fontSize: isMobile ? '1.8rem' : '2.5rem',
                    fontWeight: '700',
                    margin: '1rem 0',
                    color: '#ffffff'
                  }}>
                    {step.title}
                  </h2>
                  <p style={{
                    fontSize: isMobile ? '1rem' : '1.2rem',
                    color: '#8b949e',
                    lineHeight: '1.8',
                    marginBottom: '2rem'
                  }}>
                    {step.description}
                  </p>
                  
                  {/* Progress bar */}
                  <div style={{
                    width: '100%',
                    height: '4px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      style={{
                        height: '100%',
                        background: `linear-gradient(90deg, ${step.color} 0%, ${step.color}80 100%)`,
                        borderRadius: '2px'
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: isMobile ? '4rem 1rem' : '6rem 2rem',
        background: 'linear-gradient(135deg, #161b22 0%, #0d1117 100%)',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <h2 style={{
            fontSize: isMobile ? '2rem' : '3rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #00ff7f 0%, #00d4ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Ready to Start Your Project?
          </h2>
          <p style={{
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            color: '#8b949e',
            marginBottom: '2rem',
            lineHeight: '1.8'
          }}>
            Let's work together to bring your vision to life
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact')}
            style={{
              padding: '1rem 3rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #00ff7f 0%, #00d4ff 100%)',
              color: '#0d1117',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0, 255, 127, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Process;