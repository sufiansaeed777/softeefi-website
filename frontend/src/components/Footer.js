import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LazyDataFlowAnimationSVGWrapper } from "./LazyComponents";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hover animation for links
  const linkHoverAnimation = {
    initial: { x: 0 },
    hover: { 
      x: 5, 
      color: '#00ff7f',
      transition: { 
        type: 'spring', 
        stiffness: 500, 
        damping: 17 
      } 
    }
  };

  // Footer styles
  const footerStyle = {
    backgroundColor: '#0d1117',
    color: '#e6e6e6',
    borderTop: '1px solid rgba(0, 255, 127, 0.1)',
    padding: isMobile ? '3rem 0 0 0' : '4rem 0 0 0',
    width: '100%',
    overflow: 'hidden'
  };

  const footerContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: isMobile ? '0 1.5rem' : '0 2rem',
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)',
    gap: isMobile ? '2.5rem' : '2.5rem',
    alignItems: 'flex-start'
  };

  const footerColumnStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: isMobile ? 'center' : 'flex-start',
    textAlign: isMobile ? 'center' : 'left'
  };

  const columnHeadingStyle = {
    color: '#ffffff',
    fontSize: isMobile ? '1.1rem' : '1.2rem',
    fontWeight: '600',
    marginBottom: isMobile ? '1rem' : '1.2rem',
    position: 'relative',
    paddingBottom: '0.5rem'
  };

  const headingUnderlineStyle = {
    position: 'absolute',
    bottom: 0,
    left: isMobile ? '50%' : 0,
    transform: isMobile ? 'translateX(-50%)' : 'none',
    width: '40px',
    height: '3px',
    background: 'linear-gradient(90deg, #00af60 0%, #00ff7f 100%)'
  };

  const footerTextStyle = {
    fontSize: isMobile ? '0.9rem' : '0.95rem',
    lineHeight: '1.6',
    color: '#c0c0c0',
    marginBottom: isMobile ? '1.25rem' : '1.5rem'
  };

  const footerListStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0
  };

  const footerListItemStyle = {
    marginBottom: '0.7rem'
  };

  const footerLinkBaseStyle = {
    color: '#c0c0c0',
    textDecoration: 'none',
    fontSize: isMobile ? '1rem' : '0.95rem',
    display: 'inline-block',
    transition: 'color 0.2s ease',
    padding: isMobile ? '0.5rem 0' : '0 0 0 0.5rem',
    borderLeft: isMobile ? 'none' : '2px solid transparent',
    minHeight: isMobile ? '44px' : 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: isMobile ? 'center' : 'flex-start'
  };

  const addressStyle = {
    fontStyle: 'normal',
    lineHeight: '1.7',
    marginBottom: '1.2rem',
    color: '#c0c0c0',
    fontSize: '0.95rem',
    textAlign: isMobile ? 'center' : 'left'
  };

  const contactLinkStyle = {
    color: '#c0c0c0',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    display: 'block',
    marginBottom: '0.5rem'
  };

  const footerButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isMobile ? '0.75rem 1.5rem' : '0.8rem 2rem',
    background: 'linear-gradient(90deg, #00af60 0%, #00ff7f 100%)',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: isMobile ? '0.9rem' : '0.95rem',
    borderRadius: '30px',
    textDecoration: 'none',
    boxShadow: '0 4px 15px rgba(0, 255, 127, 0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    marginTop: '1rem',
    border: 'none',
    cursor: 'pointer',
    minHeight: isMobile ? '44px' : '44px',
    lineHeight: '1',
    textAlign: 'center'
  };

  const footerBottomStyle = {
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    marginTop: '3rem',
    padding: '1.5rem 0',
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#c0c0c0'
  };

  const footerBrandNameStyle = {
    color: '#00ff7f',
    fontWeight: 'bold'
  };

  // Social icons (using SVG for better customization)
  const socialIconStyle = {
    display: 'flex',
    gap: isMobile ? '0.75rem' : '1rem',
    marginTop: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  };

  const iconBoxStyle = {
    width: isMobile ? '44px' : '36px',
    height: isMobile ? '44px' : '36px',
    minWidth: '44px', // Ensure minimum touch target size
    minHeight: '44px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#c0c0c0',
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  };

  return (
    <footer style={footerStyle}>
      <div style={footerContainerStyle}>
        {/* Column 1: Brand & About */}
        <motion.div 
          style={footerColumnStyle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h4 style={columnHeadingStyle}>
            Softeefi
            <div style={headingUnderlineStyle}></div>
          </h4>
          <p style={footerTextStyle}>
            Building innovative digital solutions powered by AI. We help businesses thrive
            online with cutting-edge websites, intelligent automation, and data-driven marketing strategies.
          </p>
          
          {/* Social Links */}
          <div style={socialIconStyle}>
            {/* LinkedIn commented out for now
            <motion.a 
              href="https://www.linkedin.com/company/softeefi"
              style={{...iconBoxStyle, textDecoration: 'none'}}
              whileHover={{ 
                y: -5, 
                backgroundColor: 'rgba(0, 255, 127, 0.1)', 
                color: '#00ff7f', 
                boxShadow: '0 5px 15px rgba(0, 255, 127, 0.2)' 
              }}
              aria-label="Visit our LinkedIn page"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
              </svg>
            </motion.a>
            */}
          </div>
        </motion.div>

        {/* Column 2: Quick Links */}
        <motion.div
          style={footerColumnStyle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h4 style={columnHeadingStyle}>
            Quick Links
            <div style={headingUnderlineStyle}></div>
          </h4>
          <ul style={footerListStyle}>
            {/* Temporarily commented out Blog section
            <li style={footerListItemStyle}>
              <motion.div variants={linkHoverAnimation} initial="initial" whileHover="hover">
                <Link
                  to="/blog"
                  style={footerLinkBaseStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00ff7f';
                    if (!isMobile) {
                      e.currentTarget.style.borderLeft = '2px solid #00ff7f';
                      e.currentTarget.style.paddingLeft = '0.7rem';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#c0c0c0';
                    if (!isMobile) {
                      e.currentTarget.style.borderLeft = '2px solid transparent';
                      e.currentTarget.style.paddingLeft = '0.5rem';
                    }
                  }}
                >
                  Blog
                </Link>
              </motion.div>
            </li>
            */}
            <li style={footerListItemStyle}>
              <motion.div variants={linkHoverAnimation} initial="initial" whileHover="hover">
                <Link
                  to="/faq"
                  style={footerLinkBaseStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00ff7f';
                    if (!isMobile) {
                      e.currentTarget.style.borderLeft = '2px solid #00ff7f';
                      e.currentTarget.style.paddingLeft = '0.7rem';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#c0c0c0';
                    if (!isMobile) {
                      e.currentTarget.style.borderLeft = '2px solid transparent';
                      e.currentTarget.style.paddingLeft = '0.5rem';
                    }
                  }}
                >
                  FAQ
                </Link>
              </motion.div>
            </li>
          </ul>
        </motion.div>

        {/* Column 3: Legal */}
        <motion.div 
          style={footerColumnStyle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 style={columnHeadingStyle}>
            Legal
            <div style={headingUnderlineStyle}></div>
          </h4>
          <ul style={footerListStyle}>
            <li style={footerListItemStyle}>
              <motion.div variants={linkHoverAnimation} initial="initial" whileHover="hover">
                <Link 
                  to="/privacy-policy" 
                  style={footerLinkBaseStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00ff7f';
                    if (!isMobile) {
                      e.currentTarget.style.borderLeft = '2px solid #00ff7f';
                      e.currentTarget.style.paddingLeft = '0.7rem';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#c0c0c0';
                    if (!isMobile) {
                      e.currentTarget.style.borderLeft = '2px solid transparent';
                      e.currentTarget.style.paddingLeft = '0.5rem';
                    }
                  }}
                >
                  Privacy Policy
                </Link>
              </motion.div>
            </li>
            <li style={footerListItemStyle}>
              <motion.div variants={linkHoverAnimation} initial="initial" whileHover="hover">
                <Link 
                  to="/terms-of-service" 
                  style={footerLinkBaseStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00ff7f';
                    if (!isMobile) {
                      e.currentTarget.style.borderLeft = '2px solid #00ff7f';
                      e.currentTarget.style.paddingLeft = '0.7rem';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#c0c0c0';
                    if (!isMobile) {
                      e.currentTarget.style.borderLeft = '2px solid transparent';
                      e.currentTarget.style.paddingLeft = '0.5rem';
                    }
                  }}
                >
                  Terms of Service
                </Link>
              </motion.div>
            </li>
            {/* <li style={footerListItemStyle}>
              <motion.div variants={linkHoverAnimation} initial="initial" whileHover="hover">
                <Link 
                  to="/cookie-policy" 
                  style={footerLinkBaseStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00ff7f';
                    if (!isMobile) {
                      e.currentTarget.style.borderLeft = '2px solid #00ff7f';
                      e.currentTarget.style.paddingLeft = '0.7rem';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#c0c0c0';
                    if (!isMobile) {
                      e.currentTarget.style.borderLeft = '2px solid transparent';
                      e.currentTarget.style.paddingLeft = '0.5rem';
                    }
                  }}
                >
                  Cookie Policy
                </Link>
              </motion.div>
            </li> */}
          </ul>
        </motion.div>

        {/* Column 4: Creative Services - Fun Stuff */}
        <motion.div 
          style={footerColumnStyle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h4 style={columnHeadingStyle}>
            Fun Stuff We Do
            <div style={headingUnderlineStyle}></div>
          </h4>
          <p style={{...footerTextStyle, marginBottom: '1rem'}}>
            Select creative projects available:
          </p>
          <ul style={footerListStyle}>
            {/* <li style={footerListItemStyle}>
              <motion.div variants={linkHoverAnimation} initial="initial" whileHover="hover">
                <Link 
                  to="/services/video-production" 
                  style={footerLinkBaseStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00ff7f';
                    if (!isMobile) {
                      e.currentTarget.style.borderLeft = '2px solid #00ff7f';
                      e.currentTarget.style.paddingLeft = '0.7rem';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#c0c0c0';
                    if (!isMobile) {
                      e.currentTarget.style.borderLeft = '2px solid transparent';
                      e.currentTarget.style.paddingLeft = '0.5rem';
                    }
                  }}
                >
                  Video Production
                </Link>
              </motion.div>
            </li> */}
            <li style={footerListItemStyle}>
              <motion.div variants={linkHoverAnimation} initial="initial" whileHover="hover">
                <Link 
                  to="/services/digital-art-nfts" 
                  style={footerLinkBaseStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00ff7f';
                    if (!isMobile) {
                      e.currentTarget.style.borderLeft = '2px solid #00ff7f';
                      e.currentTarget.style.paddingLeft = '0.7rem';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#c0c0c0';
                    if (!isMobile) {
                      e.currentTarget.style.borderLeft = '2px solid transparent';
                      e.currentTarget.style.paddingLeft = '0.5rem';
                    }
                  }}
                >
                  Digital Art & Creative Design
                </Link>
              </motion.div>
            </li>
            <li style={footerListItemStyle}>
              <motion.div variants={linkHoverAnimation} initial="initial" whileHover="hover">
                <Link 
                  to="/services/graphic-design" 
                  style={footerLinkBaseStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00ff7f';
                    if (!isMobile) {
                      e.currentTarget.style.borderLeft = '2px solid #00ff7f';
                      e.currentTarget.style.paddingLeft = '0.7rem';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#c0c0c0';
                    if (!isMobile) {
                      e.currentTarget.style.borderLeft = '2px solid transparent';
                      e.currentTarget.style.paddingLeft = '0.5rem';
                    }
                  }}
                >
                  Brand Identity & Graphics
                </Link>
              </motion.div>
            </li>
            <li style={footerListItemStyle}>
              <motion.div variants={linkHoverAnimation} initial="initial" whileHover="hover">
                <Link
                  to="/services/ui-ux-design"
                  style={footerLinkBaseStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00ff7f';
                    if (!isMobile) {
                      e.currentTarget.style.borderLeft = '2px solid #00ff7f';
                      e.currentTarget.style.paddingLeft = '0.7rem';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#c0c0c0';
                    if (!isMobile) {
                      e.currentTarget.style.borderLeft = '2px solid transparent';
                      e.currentTarget.style.paddingLeft = '0.5rem';
                    }
                  }}
                >
                  UI/UX Design
                </Link>
              </motion.div>
            </li>
            <li style={footerListItemStyle}>
              <motion.div variants={linkHoverAnimation} initial="initial" whileHover="hover">
                <Link
                  to="/services/cloud-infrastructure"
                  style={footerLinkBaseStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00ff7f';
                    if (!isMobile) {
                      e.currentTarget.style.borderLeft = '2px solid #00ff7f';
                      e.currentTarget.style.paddingLeft = '0.7rem';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#c0c0c0';
                    if (!isMobile) {
                      e.currentTarget.style.borderLeft = '2px solid transparent';
                      e.currentTarget.style.paddingLeft = '0.5rem';
                    }
                  }}
                >
                  Cloud Infrastructure
                </Link>
              </motion.div>
            </li>
            <li style={footerListItemStyle}>
              <motion.div variants={linkHoverAnimation} initial="initial" whileHover="hover">
                <Link
                  to="/services/digital-marketing-seo"
                  style={footerLinkBaseStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00ff7f';
                    if (!isMobile) {
                      e.currentTarget.style.borderLeft = '2px solid #00ff7f';
                      e.currentTarget.style.paddingLeft = '0.7rem';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#c0c0c0';
                    if (!isMobile) {
                      e.currentTarget.style.borderLeft = '2px solid transparent';
                      e.currentTarget.style.paddingLeft = '0.5rem';
                    }
                  }}
                >
                  Digital Marketing & SEO
                </Link>
              </motion.div>
            </li>
          </ul>
          <p style={{...footerTextStyle, fontSize: '0.85rem', marginTop: '1rem', fontStyle: 'italic'}}>
            Contact: <a href="mailto:info@softeefi.co.uk" style={{color: '#00ff7f', textDecoration: 'none'}}>info@softeefi.co.uk</a>
          </p>
        </motion.div>

        {/* Column 5: Contact Info */}
        <motion.div 
          style={footerColumnStyle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h4 style={columnHeadingStyle}>
            Contact Us
            <div style={headingUnderlineStyle}></div>
          </h4>
          <address style={addressStyle}>
            <motion.a 
              href="tel:+447417505744" 
              style={contactLinkStyle}
              whileHover={{ color: '#00ff7f' }}
            >
              +44 7417 505744
            </motion.a>
            <motion.a 
              href="mailto:info@softeefi.co.uk" 
              style={contactLinkStyle}
              whileHover={{ color: '#00ff7f' }}
            >
              info@softeefi.co.uk
            </motion.a>
          </address>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/contact" 
              style={footerButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 7px 20px rgba(0, 255, 127, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 255, 127, 0.2)';
              }}
            >
              Get In Touch
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero animation - Desktop Only */}
      {!isMobile && (
        <div style={{
          position: 'relative',
          width: '100%',
          padding: '4rem 0',
          overflow: 'hidden', // Prevent horizontal scrolling
          background: 'linear-gradient(180deg, #0d1117 0%, #001f3f 50%, #0d1117 100%)',
          marginTop: '0'
        }}>
          <div style={{
            width: '100%',
            height: '800px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden' // Prevent elements from spilling out
          }}>
            <LazyDataFlowAnimationSVGWrapper />
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      <div style={footerBottomStyle}>
        Copyright © {currentYear} <span style={footerBrandNameStyle}>Softeefi</span>. All rights reserved.
      </div>
    </footer>
  );
}