import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { WebsiteIcon, AISparkleIcon, CloudIcon, MarketingIcon } from './SimpleIcons';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Removed scrolled state as we want transparent navbar always
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  
  // Mobile dropdown states
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileReportsOpen, setMobileReportsOpen] = useState(false);

  // Removed scroll listener as we want transparent navbar always

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const servicesDropdownItems = [
    { to: '/services/websites-and-apps', label: 'Websites & Apps', Icon: WebsiteIcon },
    { to: '/services/ai-solutions', label: 'AI Solutions', Icon: AISparkleIcon },
    { to: '/services/cloud-infrastructure', label: 'Cloud Infrastructure', Icon: CloudIcon },
    { to: '/services/digital-marketing-seo', label: 'Digital Marketing', Icon: MarketingIcon },
  ];

  const reportsDropdownItems = [
    { to: '/free-learning#web-app-development', label: 'Web & App Development 101' },
    { to: '/free-learning#digital-marketing-seo', label: 'Digital Marketing & SEO' },
    { to: '/free-learning#cloud-basics', label: 'Cloud Basics Guide' },
    { to: '/free-learning#ai-for-business', label: 'AI for Business' },
  ];


  const closeMobileMenu = () => {
    // Close menu instantly without animation
    setIsMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileReportsOpen(false);
  };

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleMouseEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '1.5rem 0',
          background: 'transparent',
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }}
      >
        <div style={{
          width: '100%',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo - Left Aligned */}
          <Link 
            to="/" 
            onClick={(e) => {
              // Close mobile menu if open
              setIsMobileMenuOpen(false);
              setActiveDropdown(null);
              // On mobile, ensure navigation works
              if (window.innerWidth <= 768) {
                // Let React Router handle navigation
                window.scrollTo(0, 0);
              }
            }}
            style={{ 
              textDecoration: 'none', 
              flex: '0 0 auto',
              visibility: isMobileMenuOpen ? 'hidden' : 'visible',
              zIndex: 100,
              position: 'relative'
            }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                color: '#00ff7f',
                fontFamily: 'Inter, -apple-system, sans-serif',
                letterSpacing: '-0.02em',
              }}
            >
              SOFTEEFI
            </motion.div>
          </Link>

          {/* Desktop Navigation - Centered Pill Container */}
          <motion.div 
            ref={dropdownRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '100px',
              padding: '0.25rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            className="desktop-nav"
          >
            {/* Home Link */}
            <Link 
              to="/"
              style={{
                textDecoration: 'none',
                fontSize: '0.813rem',
                fontWeight: '500',
                color: 'rgba(255, 255, 255, 0.9)',
                fontFamily: 'Inter, -apple-system, sans-serif',
                padding: '0.625rem 1.25rem',
                borderRadius: '100px',
                display: 'inline-block',
                transition: 'all 0.3s ease',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 255, 127, 0.1)';
                e.currentTarget.style.color = '#00ff7f';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
              }}
            >
              HOME
            </Link>

            {/* Our Process Link */}
            <Link 
              to="/process"
              style={{
                textDecoration: 'none',
                fontSize: '0.813rem',
                fontWeight: '500',
                color: 'rgba(255, 255, 255, 0.9)',
                fontFamily: 'Inter, -apple-system, sans-serif',
                padding: '0.625rem 1.25rem',
                borderRadius: '100px',
                display: 'inline-block',
                transition: 'all 0.3s ease',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 255, 127, 0.1)';
                e.currentTarget.style.color = '#00ff7f';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
              }}
            >
              OUR PROCESS
            </Link>

            {/* Services Dropdown */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <motion.button
                style={{
                  textDecoration: 'none',
                  fontSize: '0.813rem',
                  fontWeight: '500',
                  color: activeDropdown === 'services' ? '#00ff7f' : 'rgba(255, 255, 255, 0.9)',
                  fontFamily: 'Inter, -apple-system, sans-serif',
                  padding: '0.625rem 1.25rem',
                  borderRadius: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: activeDropdown === 'services' ? 'rgba(0, 255, 127, 0.1)' : 'transparent',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.02em',
                  border: 'none',
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.02 }}
              >
                SERVICES
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 12 12" 
                  fill="currentColor"
                  style={{
                    transform: activeDropdown === 'services' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <path d="M6 8L2 4h8L6 8z"/>
                </svg>
              </motion.button>

              {/* Services Dropdown Menu */}
              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginTop: '0.5rem',
                      background: 'rgba(10, 10, 10, 0.98)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      padding: '0.5rem',
                      minWidth: '200px',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    {servicesDropdownItems.map((item, index) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.75rem 1rem',
                          textDecoration: 'none',
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: '0.875rem',
                          fontFamily: 'Inter, -apple-system, sans-serif',
                          borderRadius: '8px',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(0, 255, 127, 0.1)';
                          e.currentTarget.style.color = '#00ff7f';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                        }}
                      >
                        <span style={{
                          width: '20px',
                          height: '20px',
                          flexShrink: 0,
                          display: 'inline-block'
                        }}>
                          <item.Icon size={20} color="#00ff7f" />
                        </span>
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Free Reports Dropdown */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => handleMouseEnter('reports')}
              onMouseLeave={handleMouseLeave}
            >
              <motion.button
                style={{
                  textDecoration: 'none',
                  fontSize: '0.813rem',
                  fontWeight: '500',
                  color: activeDropdown === 'reports' ? '#00ff7f' : 'rgba(255, 255, 255, 0.9)',
                  fontFamily: 'Inter, -apple-system, sans-serif',
                  padding: '0.625rem 1.25rem',
                  borderRadius: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: activeDropdown === 'reports' ? 'rgba(0, 255, 127, 0.1)' : 'transparent',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.02em',
                  border: 'none',
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.02 }}
              >
                FREE LEARNING
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 12 12" 
                  fill="currentColor"
                  style={{
                    transform: activeDropdown === 'reports' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <path d="M6 8L2 4h8L6 8z"/>
                </svg>
              </motion.button>

              {/* Reports Dropdown Menu */}
              <AnimatePresence>
                {activeDropdown === 'reports' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginTop: '0.5rem',
                      background: 'rgba(10, 10, 10, 0.98)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      padding: '0.5rem',
                      minWidth: '220px',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    {reportsDropdownItems.map((item, index) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.75rem 1rem',
                          textDecoration: 'none',
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: '0.875rem',
                          fontFamily: 'Inter, -apple-system, sans-serif',
                          borderRadius: '8px',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(0, 255, 127, 0.1)';
                          e.currentTarget.style.color = '#00ff7f';
                          const paths = e.currentTarget.querySelectorAll('svg path');
                          paths.forEach(path => path.style.stroke = '#00ff7f');
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                          const paths = e.currentTarget.querySelectorAll('svg path');
                          paths.forEach(path => path.style.stroke = '#00ff7f');
                        }}
                      >
                        <span style={{
                          width: '16px',
                          height: '16px',
                          flexShrink: 0,
                          display: 'inline-block',
                          marginRight: '2px'
                        }}>
                          <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="currentColor"
                          >
                            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" fill="#00ff7f"/>
                          </svg>
                        </span>
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>


          </motion.div>

          {/* Contact Us Button - Right Aligned */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ flex: '0 0 auto' }}
            className="desktop-cta"
          >
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '0.625rem 1.5rem',
                  background: '#00ff7f',
                  border: 'none',
                  borderRadius: '100px',
                  color: '#000',
                  fontSize: '0.813rem',
                  fontWeight: '600',
                  fontFamily: 'Inter, -apple-system, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#00e673';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#00ff7f';
                }}
              >
                CONTACT US
              </motion.button>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              width: '40px',
              height: '40px',
              position: 'relative',
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            <div style={{
              width: '24px',
              height: '16px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              margin: '0 auto',
            }}>
              {[0, 1, 2].map((index) => (
                <motion.span
                  key={index}
                  style={{
                    width: '100%',
                    height: '2px',
                    background: '#00ff7f',
                    borderRadius: '1px',
                    position: 'absolute',
                    top: index === 0 ? 0 : index === 1 ? '7px' : '14px',
                  }}
                  animate={{
                    rotate: isMobileMenuOpen 
                      ? index === 0 ? 45 : index === 2 ? -45 : 0
                      : 0,
                    y: isMobileMenuOpen 
                      ? index === 0 ? 7 : index === 2 ? -7 : 0
                      : 0,
                    opacity: isMobileMenuOpen && index === 1 ? 0 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              onClick={closeMobileMenu}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                zIndex: 998,
              }}
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.15, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '80%',
                maxWidth: '400px',
                height: '100vh',
                background: '#0a0a0a',
                borderLeft: '1px solid rgba(0, 255, 127, 0.2)',
                zIndex: 999,
                padding: '5rem 2rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
              }}
            >
              {/* Mobile Navigation Items */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}>
                {/* Home Link */}
                <Link
                  to="/"
                  onClick={() => {
                    closeMobileMenu();
                    // Don't prevent default, let React Router handle navigation
                    window.scrollTo(0, 0);
                  }}
                  style={{
                    textDecoration: 'none',
                    fontSize: '1.125rem',
                    fontWeight: '500',
                    color: 'rgba(255, 255, 255, 0.9)',
                    letterSpacing: '0.02em',
                    marginBottom: '0',
                    fontFamily: 'Inter, -apple-system, sans-serif',
                    cursor: 'pointer',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00ff7f';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                  }}
                >
                  Home
                </Link>

                {/* Our Process Link */}
                <Link
                  to="/process"
                  onClick={() => {
                    closeMobileMenu();
                    // Don't prevent default, let React Router handle navigation
                    window.scrollTo(0, 0);
                  }}
                  style={{
                    textDecoration: 'none',
                    fontSize: '1.125rem',
                    fontWeight: '500',
                    color: 'rgba(255, 255, 255, 0.9)',
                    letterSpacing: '0.02em',
                    marginBottom: '0',
                    fontFamily: 'Inter, -apple-system, sans-serif',
                    cursor: 'pointer',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00ff7f';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                  }}
                >
                  Our Process
                </Link>

                {/* Services Section */}
                <div>
                  <div 
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: '500',
                      color: 'rgba(255, 255, 255, 0.9)',
                      letterSpacing: '0.02em',
                      marginBottom: mobileServicesOpen ? '0.75rem' : '0',
                      fontFamily: 'Inter, -apple-system, sans-serif',
                      cursor: 'pointer',
                      padding: '0.75rem 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    Services
                    <motion.svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </motion.svg>
                  </div>
                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ overflow: 'hidden' }}
                      >
                        {servicesDropdownItems.map((item, index) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={closeMobileMenu}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                              padding: '0.75rem 0 0.75rem 1.5rem',
                              textDecoration: 'none',
                              fontSize: '0.95rem',
                              fontWeight: '400',
                              color: 'rgba(255, 255, 255, 0.7)',
                              fontFamily: 'Inter, -apple-system, sans-serif',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <span style={{
                              width: '20px',
                              height: '20px',
                              flexShrink: 0,
                              display: 'inline-block'
                            }}>
                              <item.Icon size={20} color="#00ff7f" />
                            </span>
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Free Learning Section */}
                <div>
                  <div 
                    onClick={() => setMobileReportsOpen(!mobileReportsOpen)}
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: '500',
                      color: 'rgba(255, 255, 255, 0.9)',
                      letterSpacing: '0.02em',
                      marginBottom: mobileReportsOpen ? '0.75rem' : '0',
                      fontFamily: 'Inter, -apple-system, sans-serif',
                      cursor: 'pointer',
                      padding: '0.75rem 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    Free Learning
                    <motion.svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      animate={{ rotate: mobileReportsOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </motion.svg>
                  </div>
                  <AnimatePresence>
                    {mobileReportsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ overflow: 'hidden' }}
                      >
                        {reportsDropdownItems.map((item, index) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={closeMobileMenu}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                              padding: '0.75rem 0 0.75rem 1.5rem',
                              textDecoration: 'none',
                              fontSize: '0.95rem',
                              fontWeight: '400',
                              color: 'rgba(255, 255, 255, 0.7)',
                              fontFamily: 'Inter, -apple-system, sans-serif',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <span style={{
                              width: '18px',
                              height: '18px',
                              flexShrink: 0,
                              display: 'inline-block',
                            }}>
                              <svg 
                                width="18" 
                                height="18" 
                                viewBox="0 0 24 24" 
                                fill="currentColor"
                              >
                                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" fill="#00ff7f"/>
                              </svg>
                            </span>
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                
                {/* Mobile Contact Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{ marginTop: 'auto', paddingTop: '2rem' }}
                >
                  <Link to="/contact" onClick={closeMobileMenu} style={{ textDecoration: 'none' }}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: '#00ff7f',
                        border: 'none',
                        borderRadius: '100px',
                        color: '#000',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        fontFamily: 'Inter, -apple-system, sans-serif',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        letterSpacing: '0.02em',
                      }}
                    >
                      CONTACT US
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-cta {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;