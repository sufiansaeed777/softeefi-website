import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar2 = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const { scrollY } = useScroll();

  // Advanced scroll detection
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Services with unique colors and icons
  const services = [
    { 
      name: 'Websites & Apps', 
      path: '/services/websites-apps',
      color: '#00ff7f',
      icon: '💻',
      description: 'Custom web & mobile solutions'
    },
    { 
      name: 'Digital Marketing', 
      path: '/services/digital-marketing-seo',
      color: '#ff6b6b',
      icon: '📈',
      description: 'SEO & growth strategies'
    },
    { 
      name: 'Cloud Services', 
      path: '/services/cloud-services',
      color: '#4ecdc4',
      icon: '☁️',
      description: 'Scalable infrastructure'
    },
    { 
      name: 'AI Solutions', 
      path: '/services/ai-solutions',
      color: '#a8e6cf',
      icon: '🤖',
      description: 'Intelligent automation'
    },
    { 
      name: 'UI/UX Design', 
      path: '/services/ui-ux-design',
      color: '#ffd3b6',
      icon: '🎨',
      description: 'User-centered design'
    },
    { 
      name: 'Video Production', 
      path: '/services/video-production',
      color: '#ffaaa5',
      icon: '🎬',
      description: 'Professional content'
    },
    { 
      name: 'Graphic Design', 
      path: '/services/graphic-designing',
      color: '#ff8b94',
      icon: '🖼️',
      description: 'Visual brand identity'
    },
    { 
      name: 'Digital Art', 
      path: '/services/digital-art',
      color: '#c9b1ff',
      icon: '🎭',
      description: 'Creative digital artwork'
    }
  ];

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', dropdown: true },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  // Animated logo component
  const AnimatedLogo = () => (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <motion.div
        style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated cube logo */}
        <motion.div
          style={{
            width: '40px',
            height: '40px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          animate={{ 
            rotate: isScrolled ? 360 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
            borderRadius: '10px',
            position: 'relative',
            transform: 'rotate(45deg)',
            boxShadow: '0 0 30px rgba(0, 255, 127, 0.5)'
          }}>
            <motion.div
              style={{
                position: 'absolute',
                inset: '30%',
                background: '#0a0a0a',
                borderRadius: '4px'
              }}
              animate={{
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>

        {/* Brand name with gradient */}
        <motion.span
          style={{
            fontSize: '1.5rem',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
          }}
        >
          SOFTEEFI
        </motion.span>
      </motion.div>
    </Link>
  );

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: isScrolled ? '0.75rem 0' : '1rem 0',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Glassmorphism background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: isScrolled 
            ? 'rgba(10, 10, 10, 0.8)' 
            : 'rgba(10, 10, 10, 0.3)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          transition: 'all 0.3s ease'
        }} />

        {/* Glow line at bottom */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #00ff7f, transparent)',
            opacity: isScrolled ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative'
        }}>
          {/* Logo */}
          <AnimatedLogo />

          {/* Desktop Navigation */}
          <div 
            ref={dropdownRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem'
            }}
            className="desktop-nav"
          >
            {navItems.map((item, index) => (
              <div key={item.name} style={{ position: 'relative' }}>
                {item.dropdown ? (
                  // Services dropdown
                  <motion.button
                    onMouseEnter={() => {
                      setActiveDropdown('services');
                      setHoveredItem('services');
                    }}
                    onMouseLeave={() => {
                      setActiveDropdown(null);
                      setHoveredItem(null);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: hoveredItem === 'services' || location.pathname.includes('/services') 
                        ? '#00ff7f' 
                        : 'rgba(255, 255, 255, 0.9)',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '0.5rem 0',
                      transition: 'color 0.3s ease',
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                      letterSpacing: '0.3px'
                    }}
                  >
                    {item.name}
                    <motion.svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="currentColor"
                      animate={{ rotate: activeDropdown === 'services' ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="M6 8L2 4h8L6 8z" />
                    </motion.svg>

                    {/* Active indicator */}
                    {location.pathname.includes('/services') && (
                      <motion.div
                        layoutId="navbar-indicator"
                        style={{
                          position: 'absolute',
                          bottom: '-4px',
                          left: 0,
                          right: 0,
                          height: '2px',
                          background: 'linear-gradient(90deg, #00ff7f, #00cc64)',
                          borderRadius: '2px'
                        }}
                      />
                    )}
                  </motion.button>
                ) : (
                  // Regular nav link
                  <Link
                    to={item.path}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                      color: hoveredItem === item.name || location.pathname === item.path 
                        ? '#00ff7f' 
                        : 'rgba(255, 255, 255, 0.9)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      padding: '0.5rem 0',
                      transition: 'color 0.3s ease',
                      position: 'relative',
                      display: 'block',
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                      letterSpacing: '0.3px'
                    }}
                  >
                    {item.name}
                    
                    {/* Active indicator */}
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="navbar-indicator"
                        style={{
                          position: 'absolute',
                          bottom: '-4px',
                          left: 0,
                          right: 0,
                          height: '2px',
                          background: 'linear-gradient(90deg, #00ff7f, #00cc64)',
                          borderRadius: '2px'
                        }}
                      />
                    )}
                  </Link>
                )}

                {/* Services Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === 'services' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      onMouseEnter={() => setActiveDropdown('services')}
                      onMouseLeave={() => setActiveDropdown(null)}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        marginTop: '1rem',
                        background: 'rgba(13, 17, 23, 0.98)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        padding: '1rem',
                        minWidth: '480px',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 255, 127, 0.1)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '0.5rem'
                      }}
                    >
                      {services.map((service, idx) => (
                        <Link
                          key={idx}
                          to={service.path}
                          onClick={() => setActiveDropdown(null)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '0.75rem',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                            background: 'transparent',
                            border: '1px solid transparent'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = `linear-gradient(135deg, ${service.color}15, ${service.color}05)`;
                            e.currentTarget.style.borderColor = `${service.color}30`;
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <span style={{
                            fontSize: '1.5rem',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: `linear-gradient(135deg, ${service.color}20, ${service.color}10)`,
                            borderRadius: '10px',
                            border: `1px solid ${service.color}30`
                          }}>
                            {service.icon}
                          </span>
                          <div>
                            <div style={{
                              color: '#ffffff',
                              fontSize: '0.9rem',
                              fontWeight: '600',
                              marginBottom: '2px'
                            }}>
                              {service.name}
                            </div>
                            <div style={{
                              color: 'rgba(255, 255, 255, 0.5)',
                              fontSize: '0.75rem'
                            }}>
                              {service.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            className="desktop-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/free-learning" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
                color: '#0a0a0a',
                border: 'none',
                padding: '0.75rem 1.75rem',
                borderRadius: '50px',
                fontSize: '0.9rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(0, 255, 127, 0.3)',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 30px rgba(0, 255, 127, 0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 255, 127, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>Get Started</span>
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, #00cc64 0%, #00ff7f 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}
                  whileHover={{ opacity: 1 }}
                />
              </button>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              position: 'relative',
              width: '48px',
              height: '48px'
            }}
            className="mobile-menu-btn"
          >
            <div style={{
              width: '24px',
              height: '20px',
              position: 'relative',
              margin: '0 auto'
            }}>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '2px',
                    background: '#00ff7f',
                    borderRadius: '2px',
                    top: i === 0 ? 0 : i === 1 ? '9px' : '18px'
                  }}
                  animate={{
                    rotate: isMobileMenuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                    y: isMobileMenuOpen ? (i === 0 ? 9 : i === 2 ? -9 : 0) : 0,
                    opacity: isMobileMenuOpen && i === 1 ? 0 : 1
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(10px)',
                zIndex: 998
              }}
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '85%',
                maxWidth: '400px',
                background: 'linear-gradient(180deg, #0d1117 0%, #0a0a0a 100%)',
                zIndex: 999,
                padding: '5rem 2rem 2rem',
                overflowY: 'auto',
                borderLeft: '1px solid rgba(0, 255, 127, 0.2)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.dropdown ? (
                      <div>
                        <div style={{
                          color: '#00ff7f',
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          marginBottom: '1rem',
                          paddingBottom: '0.5rem',
                          borderBottom: '1px solid rgba(0, 255, 127, 0.2)'
                        }}>
                          Services
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1rem' }}>
                          {services.map((service) => (
                            <Link
                              key={service.path}
                              to={service.path}
                              onClick={() => setIsMobileMenuOpen(false)}
                              style={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                textDecoration: 'none',
                                fontSize: '0.95rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              <span>{service.icon}</span>
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{
                          color: location.pathname === item.path ? '#00ff7f' : 'rgba(255, 255, 255, 0.9)',
                          textDecoration: 'none',
                          fontSize: '1.1rem',
                          fontWeight: '500',
                          transition: 'color 0.2s ease'
                        }}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{ marginTop: '2rem' }}
                >
                  <Link to="/free-learning" onClick={() => setIsMobileMenuOpen(false)}>
                    <button style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
                      color: '#0a0a0a',
                      border: 'none',
                      padding: '1rem',
                      borderRadius: '50px',
                      fontSize: '1rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}>
                      Get Started
                    </button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 968px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-cta {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar2;