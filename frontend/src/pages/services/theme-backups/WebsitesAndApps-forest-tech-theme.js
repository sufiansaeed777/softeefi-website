import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCode, FaMobile, FaShoppingCart, FaRocket, FaChartLine, FaShieldAlt, FaPalette, FaServer, FaTrophy, FaBolt, FaGem, FaAward, FaCrown, FaMedal, FaStar } from 'react-icons/fa';
import { HiOutlineSparkles, HiArrowRight, HiCheckCircle, HiLightningBolt } from 'react-icons/hi';
import { BiCodeBlock } from 'react-icons/bi';
import { MdSecurity, MdSpeed, MdVerified } from 'react-icons/md';
import { SiReact, SiNodedotjs, SiMongodb, SiAmazonaws, SiFlutter } from 'react-icons/si';
import AskAIModal from '../../components/AskAIModal';

const WebsitesAndApps = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
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
    document.title = 'Forest Tech - Premium Websites & Apps | Softeefi';
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
    
    // Ensure proper viewport for mobile
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
    }
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [handleMouseMove]);

  // Forest Tech theme - Nature meets Technology
  const colors = {
    black: '#0A0A0A',  // Deep charcoal black
    darkBg: '#0F0F0F',  // Slightly lighter black
    forest: '#228B22',  // Rich forest green
    forestLight: '#32CD32',  // Lighter forest green
    forestDark: '#006400',  // Deep forest green
    mint: '#3EB489',  // Fresh mint accent
    sage: '#87A96B',  // Sage green
    silver: '#C0C0C0',  // Metallic silver
    silverLight: '#E5E5E5',  // Light silver
    silverDark: '#A8A8A8',  // Dark silver
    tech: '#00FF41',  // Tech green accent
    white: '#FFFFFF',
    gray: '#888888',
    lightGray: '#CCCCCC',
    nature: '#8FBC8F',  // Natural green
    glow: '#39FF14'  // Electric glow
  };

  // Service offerings with enhanced details
  const services = [
    {
      id: 1,
      icon: <FaCode />,
      title: "Eco-Tech Websites",
      description: "Sustainable digital solutions where nature meets cutting-edge technology",
      features: [
        "Responsive Design",
        "Lightning Fast",
        "SEO Optimized",
        "Analytics Integration"
      ],
      color: colors.forest,
      bgGradient: `linear-gradient(135deg, ${colors.forest}20 0%, ${colors.forestDark}20 100%)`
    },
    {
      id: 2,
      icon: <FaShoppingCart />,
      title: "Green Commerce Platforms",
      description: "Eco-conscious e-commerce built with sustainable technology",
      features: [
        "Payment Gateways",
        "Inventory Management",
        "Customer Analytics",
        "Mobile Commerce"
      ],
      color: colors.silver,
      bgGradient: `linear-gradient(135deg, ${colors.silver}20 0%, ${colors.silverDark}20 100%)`
    },
    {
      id: 3,
      icon: <BiCodeBlock />,
      title: "Forest-Powered Applications",
      description: "Robust applications rooted in nature, powered by advanced tech",
      features: [
        "Real-time Features",
        "API Integration",
        "Cloud Deployment",
        "Scalable Architecture"
      ],
      color: colors.forest,
      bgGradient: `linear-gradient(135deg, ${colors.forest}20 0%, ${colors.forestDark}20 100%)`
    },
    {
      id: 4,
      icon: <FaMobile />,
      title: "Nature-Tech Mobile Apps",
      description: "Organic mobile experiences enhanced with smart technology",
      features: [
        "Native Performance",
        "Push Notifications",
        "Offline Support",
        "App Store Ready"
      ],
      color: colors.silver,
      bgGradient: `linear-gradient(135deg, ${colors.silver}20 0%, ${colors.silverDark}20 100%)`
    }
  ];

  // Portfolio projects
  const portfolio = [
    {
      id: 1,
      title: "TechFlow Dashboard",
      category: "webapp",
      image: "/images/portfolio/dashboard.webp",
      description: "Real-time analytics dashboard with AI insights",
      tech: ["React", "Node.js", "MongoDB", "WebSocket"],
      color: colors.gold
    },
    {
      id: 2,
      title: "EcoShop Marketplace",
      category: "ecommerce",
      image: "/images/portfolio/ecommerce.webp",
      description: "Sustainable products marketplace with 50K+ users",
      tech: ["Next.js", "Stripe", "PostgreSQL", "AWS"],
      color: colors.green
    },
    {
      id: 3,
      title: "FitTrack Pro",
      category: "mobile",
      image: "/images/portfolio/mobile.webp",
      description: "Fitness tracking app with social features",
      tech: ["React Native", "Firebase", "Redux", "Charts"],
      color: colors.gold
    },
    {
      id: 4,
      title: "Corporate Portal",
      category: "website",
      image: "/images/portfolio/corporate.webp",
      description: "Enterprise website with CMS integration",
      tech: ["WordPress", "PHP", "MySQL", "Custom Plugins"],
      color: colors.green
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
      marginTop: isMobile ? '-70px' : '-90px'
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
          {/* Premium Grid Pattern */}
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
                linear-gradient(${colors.forest}15 1px, transparent 1px),
                linear-gradient(90deg, ${colors.forest}15 1px, transparent 1px),
                radial-gradient(circle at 30% 40%, ${colors.tech}10 0%, transparent 40%)
              `,
              backgroundSize: '50px 50px',
              opacity: 0.5
            }} 
          />
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 100
              }}
              animate={{
                y: -100,
                x: Math.random() * window.innerWidth
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
                background: i % 3 === 0 ? colors.tech : i % 3 === 1 ? colors.forest : colors.silver,
                opacity: Math.random() * 0.6 + 0.2,
                filter: 'blur(1px)',
                boxShadow: i % 2 === 0 ? `0 0 ${Math.random() * 10 + 5}px ${colors.tech}` : 'none'
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
              width: '400px',
              height: '400px',
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
              width: '500px',
              height: '500px',
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
            padding: isMobile ? '2rem' : '3rem',
            maxWidth: '1000px',
            position: 'relative',
            zIndex: 1
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1.5rem',
              background: `linear-gradient(135deg, ${colors.gold}20 0%, ${colors.green}20 100%)`,
              border: `1px solid ${colors.gold}40`,
              borderRadius: '30px',
              marginBottom: '2rem'
            }}
          >
            <HiOutlineSparkles style={{ color: colors.gold }} />
            <span style={{ 
              background: `linear-gradient(90deg, ${colors.forest} 0%, ${colors.silver} 50%, ${colors.forest} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '0.9rem', 
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center'
            }}>
              <FaServer style={{ color: colors.silver, marginRight: '0.5rem', WebkitTextFillColor: colors.silver }} />
              Forest-Tech Excellence Certified
            </span>
          </motion.div>

          <motion.h1
            style={{
              fontSize: isMobile ? '2.2rem' : '5rem',
              fontWeight: '900',
              marginBottom: '1.5rem',
              lineHeight: 1.1,
              color: colors.gold,
              textShadow: `0 2px 10px ${colors.gold}30`
            }}
          >
            <span style={{
              background: `linear-gradient(135deg, ${colors.platinum} 0%, ${colors.platinumDark} 50%, ${colors.platinum} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: `0 4px 20px ${colors.platinum}40`
            }}>
              Forest Tech
            </span>
            <br />
            <span style={{
              fontSize: isMobile ? '1.8rem' : '3.5rem',
              fontWeight: '700',
              background: `linear-gradient(135deg, ${colors.forest} 0%, ${colors.tech} 50%, ${colors.silver} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Websites & Apps
            </span>
          </motion.h1>

          <motion.p
            style={{
              fontSize: isMobile ? '1.2rem' : '1.4rem',
              color: colors.lightGray,
              marginBottom: '3rem',
              lineHeight: 1.6,
              maxWidth: '700px',
              margin: '0 auto 3rem'
            }}
          >
            Experience the apex of digital craftsmanship. We engineer platinum-tier solutions 
            that redefine industry standards for luxury, performance, and transformative results.
          </motion.p>

          <motion.div
            style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                style={{
                  padding: '1.2rem 3rem',
                  background: `linear-gradient(135deg, ${colors.forest} 0%, ${colors.forestLight} 33%, ${colors.silver} 66%, ${colors.tech} 100%)`,
                  color: colors.black,
                  textDecoration: 'none',
                  borderRadius: '50px',
                  fontWeight: '800',
                  fontSize: '1.1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease',
                  boxShadow: `0 10px 30px ${colors.forest}40, inset 0 1px 2px ${colors.silver}50`,
                  border: `2px solid ${colors.forest}`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.background = `linear-gradient(135deg, ${colors.tech} 0%, ${colors.forest} 33%, ${colors.silver} 66%, ${colors.forestLight} 100%)`;
                  e.currentTarget.style.boxShadow = `0 15px 40px ${colors.tech}50, inset 0 1px 2px ${colors.silver}50`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${colors.platinum} 0%, ${colors.platinumDark} 50%, ${colors.gold} 100%)`;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 10px 30px ${colors.platinum}30, inset 0 1px 0 ${colors.white}50`;
                }}
              >
                <FaRocket style={{ fontSize: '1.2rem' }} />
                Start Premium Project
                <HiArrowRight />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/free-reports/websites-and-apps"
                style={{
                  padding: '1.2rem 3rem',
                  background: `linear-gradient(135deg, ${colors.diamond}10 0%, ${colors.crystal}20 100%)`,
                  color: colors.luxury,
                  textDecoration: 'none',
                  borderRadius: '50px',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  border: `2px solid ${colors.crystal}`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
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
                Free Excellence Audit
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
              gap: '2rem',
              marginTop: '4rem',
              padding: '2rem',
              background: `${colors.darkBg}80`,
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${colors.gold}20`
            }}
          >
            {[
              { number: "100+", label: "Platinum Projects", icon: <FaTrophy />, color: colors.platinum },
              { number: "99.9%", label: "Client Satisfaction", icon: <FaStar />, color: colors.gold },
              { number: "24/7", label: "White-Glove Support", icon: <MdVerified />, color: colors.accent }
            ].map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{ color: stat.color || colors.gold, fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontSize: isMobile ? '2rem' : '2.5rem',
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

      {/* Gold Standard Certification Section */}
      <section style={{
        padding: isMobile ? '2rem 1rem' : '3rem 2rem',
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
                width: '60px',
                height: '60px',
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
              fontSize: isMobile ? '1.5rem' : '2rem',
              fontWeight: '800',
              color: colors.gold
            }}>
              The Gold Standard Difference
            </h3>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: isMobile ? '1rem' : '2rem',
            marginTop: '2rem'
          }}>
            {[
              { icon: <FaTrophy />, title: 'Premium Quality', desc: 'Every pixel perfected' },
              { icon: <FaBolt />, title: 'Lightning Fast', desc: 'Optimized performance' },
              { icon: <MdSecurity />, title: 'Fort Knox Security', desc: 'Bank-grade protection' },
              { icon: <FaGem />, title: 'Luxury Experience', desc: 'White-glove service' }
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
                  fontSize: isMobile ? '0.95rem' : '1.1rem',
                  fontWeight: '700',
                  color: colors.gold,
                  marginBottom: '0.5rem'
                }}>
                  {item.title}
                </h4>
                <p style={{
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
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
        padding: isMobile ? '3rem 1rem' : '5rem 2rem',
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
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            fontWeight: '800',
            marginBottom: '1rem',
            color: colors.gold
          }}>
            Platinum-Tier Solutions
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: colors.lightGray,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Bespoke digital experiences crafted for industry leaders
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
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: hoveredCard === service.id ? `linear-gradient(135deg, ${colors.platinum}20 0%, ${colors.accent}20 100%)` : `linear-gradient(135deg, ${colors.darkBg} 0%, ${colors.black} 100%)`,
                padding: '2.5rem',
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
                fontSize: '3rem',
                color: service.color,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                {service.icon}
                <motion.div
                  animate={{
                    rotate: hoveredCard === service.id ? 360 : 0
                  }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: '50px',
                    height: '50px',
                    background: `${service.color}20`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <HiOutlineSparkles style={{ fontSize: '1.5rem' }} />
                </motion.div>
              </div>

              <h3 style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: colors.white
              }}>
                {service.title}
              </h3>

              <p style={{
                color: colors.lightGray,
                marginBottom: '2rem',
                lineHeight: 1.6
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
                      fontSize: '1.2rem',
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
      <section style={{
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
            Platinum Portfolio Showcase
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: colors.lightGray,
            maxWidth: '600px',
            margin: '0 auto 3rem'
          }}>
            Witness the apex of digital craftsmanship through our elite portfolio
          </p>

          {/* Filter Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
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
                  padding: '0.75rem 2rem',
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
                  transition: 'all 0.3s ease'
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
            gap: '2rem'
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredPortfolio.map((project, index) => (
              <motion.div
                key={project.id}
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
                {/* Project Image */}
                <div style={{
                  height: '250px',
                  background: `linear-gradient(135deg, ${project.color}40 0%, ${colors.black} 100%)`,
                  position: 'relative',
                  overflow: 'hidden'
                }}>
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
                </div>

                {/* Project Info */}
                <div style={{ padding: '2rem' }}>
                  <h3 style={{
                    fontSize: '1.5rem',
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
                    gap: '0.5rem',
                    flexWrap: 'wrap'
                  }}>
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '0.3rem 0.8rem',
                          background: `${project.color}20`,
                          border: `1px solid ${project.color}40`,
                          borderRadius: '15px',
                          fontSize: '0.8rem',
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
        padding: isMobile ? '3rem 1rem' : '5rem 2rem',
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
            The Platinum Excellence Framework
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: colors.lightGray,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Our proprietary 4-phase framework delivers transformative outcomes
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
                  fontSize: '1.8rem',
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
                  height: isMobile ? '200px' : '300px',
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
                    width: '200px',
                    height: '200px',
                    border: `3px solid ${index % 2 === 0 ? colors.platinum : colors.accent}50`,
                    background: `linear-gradient(135deg, ${colors.black}80 0%, transparent 100%)`,
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
                  }}
                />
                <div style={{
                  fontSize: '4rem',
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
        padding: isMobile ? '3rem 1rem' : '5rem 2rem',
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
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            fontWeight: '800',
            marginBottom: '1rem',
            color: colors.gold
          }}>
            Meet Our Gold Standard Team
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: colors.lightGray,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Expert developers and designers committed to excellence
          </p>
        </motion.div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? '1rem' : '2rem',
          position: 'relative',
          zIndex: 1
        }}>
          {[
            {
              name: "Alex Chen",
              role: "Lead Developer",
              expertise: "Full Stack Development",
              years: "5+ years",
              avatar: "AC",
              image: "https://randomuser.me/api/portraits/men/32.webp"
            },
            {
              name: "Sarah Johnson",
              role: "UI/UX Designer",
              expertise: "Product Design",
              years: "4+ years",
              avatar: "SJ",
              image: "https://randomuser.me/api/portraits/women/44.webp"
            },
            {
              name: "Mike Rodriguez",
              role: "Mobile Developer",
              expertise: "React Native & Flutter",
              years: "3+ years",
              avatar: "MR",
              image: "https://randomuser.me/api/portraits/men/36.webp"
            },
            {
              name: "Emma Davis",
              role: "Project Manager",
              expertise: "Agile & Scrum",
              years: "6+ years",
              avatar: "ED",
              image: "https://randomuser.me/api/portraits/women/68.webp"
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
                cursor: 'pointer'
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
                    alt={member.name}
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
            marginTop: '4rem',
            padding: '2rem',
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
                200+
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

      {/* Client Reviews Section */}
      <section style={{
        padding: isMobile ? '3rem 1rem' : '5rem 2rem',
        background: colors.black,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background gradient */}
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
            fontSize: isMobile ? '2rem' : '3.5rem',
            fontWeight: '800',
            marginBottom: '1rem',
            color: colors.gold
          }}>
            Client Success Stories
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: colors.lightGray,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </motion.div>

        {/* Reviews Grid */}
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
                y: -10,
                background: `linear-gradient(135deg, ${colors.gold}10 0%, ${colors.green}10 100%)`
              }}
              style={{
                background: colors.darkBg,
                borderRadius: '20px',
                padding: '2rem',
                border: `2px solid ${colors.gold}20`,
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
            >
              {/* Quote Icon */}
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

              {/* Stars */}
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

              {/* Review Text */}
              <p style={{
                color: colors.lightGray,
                lineHeight: 1.6,
                marginBottom: '1.5rem',
                fontSize: isMobile ? '0.95rem' : '1rem',
                fontStyle: 'italic'
              }}>
                "{review.review}"
              </p>

              {/* Client Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                borderTop: `1px solid ${colors.gold}20`,
                paddingTop: '1.5rem'
              }}>
                {/* Avatar */}
                <img
                  src={review.image}
                  alt={review.name}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: `2px solid ${colors.gold}`,
                    objectFit: 'cover'
                  }}
                />
                
                {/* Name and Company */}
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

        {/* Bottom CTA */}
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

      {/* Premium Features Section */}
      <section style={{
        padding: isMobile ? '3rem 1rem' : '5rem 2rem',
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
            backgroundSize: '50px 50px',
            backgroundPosition: '0 0, 25px 25px',
            opacity: 0.5
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
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            fontWeight: '800',
            marginBottom: '1rem',
            background: `linear-gradient(90deg, ${colors.platinum} 0%, ${colors.gold} 50%, ${colors.platinum} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Platinum Exclusive Features
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: colors.lightGray,
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Premium capabilities that set your project apart from the competition
          </p>
        </motion.div>

        {/* Premium Features Grid */}
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
              title: "Enterprise Security",
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
                y: -10,
                boxShadow: `0 30px 60px ${colors.platinum}30`
              }}
              style={{
                background: feature.gradient,
                borderRadius: '30px',
                padding: '3rem 2rem',
                textAlign: 'center',
                border: `2px solid ${colors.platinum}30`,
                backdropFilter: 'blur(20px)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
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
                fontSize: '1.5rem',
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
            Our Tech Stack
          </h2>
          <p style={{
            fontSize: '1.2rem',
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
                      scale: 1.1,
                      background: `linear-gradient(135deg, ${colors.gold}30 0%, ${colors.green}30 100%)`
                    }}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: `${colors.darkBg}`,
                      border: `2px solid ${colors.gold}30`,
                      borderRadius: '25px',
                      fontSize: '1rem',
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
        padding: isMobile ? '4rem 1rem' : '6rem 2rem',
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
            width: '600px',
            height: '600px',
            background: `radial-gradient(circle, ${colors.gold}15 0%, transparent 70%)`,
            filter: 'blur(100px)',
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
            fontSize: isMobile ? '2.5rem' : '4rem',
            fontWeight: '900',
            marginBottom: '1.5rem',
            lineHeight: 1.2,
            color: colors.gold
          }}>
            Ready for Platinum-Tier
            <br />
            Digital Transformation?
          </h2>

          <p style={{
            fontSize: '1.3rem',
            color: colors.lightGray,
            maxWidth: '700px',
            margin: '0 auto 3rem',
            lineHeight: 1.6
          }}>
            Ascend to the apex. Experience bespoke digital craftsmanship reserved for industry leaders.
          </p>

          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              to="/contact"
              style={{
                padding: isMobile ? '1rem 2rem' : '1.2rem 3rem',
                background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldDark} 100%)`,
                color: colors.black,
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: '700',
                fontSize: '1.2rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                boxShadow: `0 10px 25px ${colors.gold}20`
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

            <AskAIModal 
              serviceType="websites-and-apps"
              serviceName="Websites & Apps"
              themeColor={colors.green}
            />
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
              "Platinum-Tier Excellence",
              "Bespoke UI/UX Design",
              "24/7 Concierge Support",
              "Transformation Guaranteed"
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
    </div>
  );
};

export default WebsitesAndApps;