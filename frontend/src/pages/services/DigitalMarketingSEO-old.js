import React, { useState, useEffect, useRef } from 'react';

// Icon Components
const ChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const AdIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;
const ShoppingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>;
const SocialIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 2l4 4-4 4"></path><path d="M3 11v-1a4 4 0 0 1 4-4h14"></path><path d="M7 22l-4-4 4-4"></path><path d="M21 13v1a4 4 0 0 1-4 4H3"></path></svg>;
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const QuoteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(0, 255, 127, 0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 11h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z"></path><path d="M21 11h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z"></path><path d="M10 22h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z"></path><path d="M21 22h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z"></path></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const ContentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const AnalyticsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>;
const RocketIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11H3c0 6 3 9 9 9s9-3 9-9h-6"></path><path d="M12 2c0 3.75-3 6.75-3 9"></path><path d="M12 2c0 3.75 3 6.75 3 9"></path></svg>;
const TargetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>;
const TrendingUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;

const DigitalMarketingSEO = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handlePortfolioClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="content-page digital-marketing-page" style={{ 
      minHeight: '100vh',
      background: '#0d1117',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      transition: 'opacity 0.5s ease-in-out',
      overflow: 'hidden'
    }}>
      {/* Enhanced Hero Section with Parallax Effects */}
      <div className="hero-section" style={{
        minHeight: '60vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 2rem',
        overflow: 'hidden'
      }}>
        {/* Multi-layer animated background */}
        <div className="hero-background" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(13,17,23,1) 0%, rgba(0,30,60,0.95) 50%, rgba(0,255,127,0.1) 100%)',
        }}>
          {/* Animated gradient orbs */}
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              background: `radial-gradient(circle, rgba(0, 255, 127, ${0.1 - i * 0.01}) 0%, transparent 70%)`,
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `translate(-50%, -50%) translateY(${scrollY * (0.1 + i * 0.05)}px)`,
              filter: 'blur(40px)',
              animation: `float ${15 + i * 3}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }} />
          ))}
          
          {/* Grid pattern overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(0, 255, 127, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 127, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translateY(${scrollY * 0.5}px)`
          }} />
        </div>
        
        {/* Hero Content */}
        <div style={{ 
          position: 'relative', 
          zIndex: 2,
          maxWidth: '1400px',
          width: '100%',
          textAlign: 'center'
        }}>
          {/* Animated badge */}
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 1.5rem',
            background: 'rgba(0, 255, 127, 0.1)',
            border: '1px solid rgba(0, 255, 127, 0.3)',
            borderRadius: '30px',
            marginBottom: '2rem',
            animation: 'slideDown 1s ease-out'
          }}>
            <span style={{ color: '#00ff7f', fontWeight: '600' }}>🚀 #1 Digital Marketing Agency</span>
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(3rem, 8vw, 6rem)', 
            marginBottom: '1.5rem',
            fontWeight: '900',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            animation: 'fadeInUp 1s ease-out 0.2s both'
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 50%, #00cc63 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'block'
            }}>
              Digital Marketing
            </span>
            <span style={{
              background: 'linear-gradient(135deg, #00ff7f 0%, #00cc63 50%, #009948 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'block',
              fontSize: '0.8em'
            }}>
              & SEO Excellence
            </span>
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
            maxWidth: '900px',
            margin: '0 auto 3rem',
            lineHeight: 1.6,
            color: '#c9d1d9',
            animation: 'fadeInUp 1s ease-out 0.4s both'
          }}>
            Elevate your brand's online visibility, drive targeted traffic, and achieve measurable
            results with our comprehensive Digital Marketing and SEO solutions. Our expert team
            leverages years of experience to craft strategies tailored to your unique business goals.
          </p>
          
          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeInUp 1s ease-out 0.6s both'
          }}>
            <a href="/contact" className="hero-cta" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1.2rem 2.5rem',
              background: 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)',
              color: '#0d1117',
              fontWeight: 'bold',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              boxShadow: '0 10px 30px rgba(0, 255, 127, 0.3)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 255, 127, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 127, 0.3)';
            }}>
              Get a Free Consultation
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            
            <a href="#portfolio" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1.2rem 2.5rem',
              background: 'transparent',
              color: '#00ff7f',
              fontWeight: 'bold',
              border: '2px solid #00ff7f',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 255, 127, 0.1)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              View Our Work
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </a>
          </div>
          
          {/* Trust Indicators */}
          <div style={{
            marginTop: '4rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            animation: 'fadeIn 1s ease-out 0.8s both'
          }}>
            {[
              { number: '500+', label: 'Happy Clients' },
              { number: '95%', label: 'Success Rate' },
              { number: '24/7', label: 'Support' },
              { number: '5★', label: 'Average Rating' }
            ].map((stat, index) => (
              <div key={index} style={{
                textAlign: 'center',
                animation: `scaleIn 0.5s ease-out ${1 + index * 0.1}s both`
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: '#00ff7f',
                  marginBottom: '0.5rem'
                }}>{stat.number}</div>
                <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounce 2s infinite'
        }}>
          <div style={{
            width: '30px',
            height: '50px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '25px',
            position: 'relative'
          }}>
            <div style={{
              width: '4px',
              height: '10px',
              background: '#00ff7f',
              borderRadius: '2px',
              position: 'absolute',
              top: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: 'scrollIndicator 2s infinite'
            }} />
          </div>
        </div>
      </div>
      
      {/* Enhanced Services Section */}
      <div id="services" data-animate style={{
        padding: '6rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        opacity: isVisible.services ? 1 : 0,
        transform: isVisible.services ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 1s ease-out'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            marginBottom: '1.5rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Our Digital Marketing Services
          </h2>
          <p style={{
            fontSize: '1.3rem',
            color: '#8b949e',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Comprehensive solutions designed to accelerate your business growth
          </p>
        </div>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* SEO Service Card */}
          <div className="service-card" style={{ 
            background: hoveredCard === 'seo' 
              ? 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 204, 99, 0.05) 100%)' 
              : 'rgba(21, 26, 35, 0.8)',
            borderRadius: '20px',
            padding: '2.5rem',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            border: hoveredCard === 'seo' ? '2px solid rgba(0, 255, 127, 0.5)' : '2px solid rgba(255,255,255,0.05)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            boxShadow: hoveredCard === 'seo' ? '0 20px 50px rgba(0, 255, 127, 0.2)' : '0 10px 30px rgba(0, 0, 0, 0.3)',
            transform: hoveredCard === 'seo' ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)'
          }}
          onMouseEnter={() => setHoveredCard('seo')}
          onMouseLeave={() => setHoveredCard(null)}>
            {/* Animated background effect */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(0, 255, 127, 0.1) 0%, transparent 70%)',
              transform: hoveredCard === 'seo' ? 'scale(1)' : 'scale(0)',
              transition: 'transform 0.8s ease-out',
              pointerEvents: 'none'
            }} />
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '1.5rem',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: hoveredCard === 'seo' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                transition: 'all 0.3s ease',
                transform: hoveredCard === 'seo' ? 'rotate(5deg)' : 'rotate(0deg)'
              }}>
                <SearchIcon />
              </div>
              <h3 style={{ 
                fontSize: '1.8rem',
                fontWeight: '700',
                margin: 0,
                color: hoveredCard === 'seo' ? '#00ff7f' : '#ffffff'
              }}>
                Search Engine Optimization
              </h3>
            </div>
            
            <p style={{ 
              marginBottom: '2rem', 
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#c9d1d9',
              position: 'relative',
              zIndex: 1
            }}>
              Dominate search engine rankings and connect with customers actively seeking your products
              or services. Our data-driven SEO strategies deliver sustainable growth.
            </p>
            
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: '0 0 2rem 0',
              flex: '1',
              position: 'relative',
              zIndex: 1
            }}>
              {['Complete Website SEO Audits', 'In-Depth Keyword Research', 'Competitor Analysis', 
                'On-Page & Off-Page Optimization', 'Content Strategy for SEO', 'Local SEO Optimization'].map((item, index) => (
                <li key={index} style={{ 
                  marginBottom: '1rem',
                  paddingLeft: '2rem',
                  position: 'relative',
                  fontSize: '1rem',
                  color: '#e6edf3',
                  opacity: hoveredCard === 'seo' ? 1 : 0.8,
                  transform: hoveredCard === 'seo' ? `translateX(10px)` : 'translateX(0)',
                  transition: `all 0.3s ease ${index * 0.05}s`
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: '2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: hoveredCard === 'seo' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    color: '#00ff7f',
                  }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            
            <a href="/contact?service=seo" style={{
              color: '#00ff7f',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              marginTop: 'auto',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              position: 'relative',
              zIndex: 1,
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.gap = '1rem';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.gap = '0.5rem';
            }}
            onClick={(e) => e.stopPropagation()}>
              Learn more about SEO
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
          
          {/* Social Media Marketing Card */}
          <div className="service-card" style={{ 
            background: hoveredCard === 'social' 
              ? 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 204, 99, 0.05) 100%)' 
              : 'rgba(21, 26, 35, 0.8)',
            borderRadius: '20px',
            padding: '2.5rem',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            border: hoveredCard === 'social' ? '2px solid rgba(0, 255, 127, 0.5)' : '2px solid rgba(255,255,255,0.05)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            boxShadow: hoveredCard === 'social' ? '0 20px 50px rgba(0, 255, 127, 0.2)' : '0 10px 30px rgba(0, 0, 0, 0.3)',
            transform: hoveredCard === 'social' ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)'
          }}
          onMouseEnter={() => setHoveredCard('social')}
          onMouseLeave={() => setHoveredCard(null)}>
            {/* Animated background effect */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(0, 255, 127, 0.1) 0%, transparent 70%)',
              transform: hoveredCard === 'social' ? 'scale(1)' : 'scale(0)',
              transition: 'transform 0.8s ease-out',
              pointerEvents: 'none'
            }} />
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '1.5rem',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: hoveredCard === 'social' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                transition: 'all 0.3s ease',
                transform: hoveredCard === 'social' ? 'rotate(5deg)' : 'rotate(0deg)'
              }}>
                <SocialIcon />
              </div>
              <h3 style={{ 
                fontSize: '1.8rem',
                fontWeight: '700',
                margin: 0,
                color: hoveredCard === 'social' ? '#00ff7f' : '#ffffff'
              }}>
                Social Media Marketing
              </h3>
            </div>
            
            <p style={{ 
              marginBottom: '2rem', 
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#c9d1d9',
              position: 'relative',
              zIndex: 1
            }}>
              Build your brand presence and engage with your target audience through strategic social media campaigns that drive real engagement and conversions.
            </p>
            
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: '0 0 2rem 0',
              flex: '1',
              position: 'relative',
              zIndex: 1
            }}>
              {['Facebook & Instagram Ads', /* 'LinkedIn B2B Marketing', */ 'Content Creation & Scheduling', 
                'Community Management', 'Influencer Partnerships', 'Performance Analytics'].map((item, index) => (
                <li key={index} style={{ 
                  marginBottom: '1rem',
                  paddingLeft: '2rem',
                  position: 'relative',
                  fontSize: '1rem',
                  color: '#e6edf3',
                  opacity: hoveredCard === 'social' ? 1 : 0.8,
                  transform: hoveredCard === 'social' ? `translateX(10px)` : 'translateX(0)',
                  transition: `all 0.3s ease ${index * 0.05}s`
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: '2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: hoveredCard === 'social' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    color: '#00ff7f',
                  }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            
            <a href="/contact?service=social" style={{
              color: '#00ff7f',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              marginTop: 'auto',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              position: 'relative',
              zIndex: 1,
              gap: '0.5rem'
            }}>
              Learn more about Social Media
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
          
          {/* Paid Advertising Card */}
          <div className="service-card" style={{ 
            background: hoveredCard === 'paid' 
              ? 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 204, 99, 0.05) 100%)' 
              : 'rgba(21, 26, 35, 0.8)',
            borderRadius: '20px',
            padding: '2.5rem',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            border: hoveredCard === 'paid' ? '2px solid rgba(0, 255, 127, 0.5)' : '2px solid rgba(255,255,255,0.05)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            boxShadow: hoveredCard === 'paid' ? '0 20px 50px rgba(0, 255, 127, 0.2)' : '0 10px 30px rgba(0, 0, 0, 0.3)',
            transform: hoveredCard === 'paid' ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)'
          }}
          onMouseEnter={() => setHoveredCard('paid')}
          onMouseLeave={() => setHoveredCard(null)}>
            {/* Animated background effect */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(0, 255, 127, 0.1) 0%, transparent 70%)',
              transform: hoveredCard === 'paid' ? 'scale(1)' : 'scale(0)',
              transition: 'transform 0.8s ease-out',
              pointerEvents: 'none'
            }} />
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '1.5rem',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: hoveredCard === 'paid' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                transition: 'all 0.3s ease',
                transform: hoveredCard === 'paid' ? 'rotate(5deg)' : 'rotate(0deg)'
              }}>
                <AdIcon />
              </div>
              <h3 style={{ 
                fontSize: '1.8rem',
                fontWeight: '700',
                margin: 0,
                color: hoveredCard === 'paid' ? '#00ff7f' : '#ffffff'
              }}>
                Paid Advertising (PPC)
              </h3>
            </div>
            
            <p style={{ 
              marginBottom: '2rem', 
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#c9d1d9',
              position: 'relative',
              zIndex: 1
            }}>
              Reach your ideal customers quickly and efficiently through targeted paid advertising campaigns with maximum ROI.
            </p>
            
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: '0 0 2rem 0',
              flex: '1',
              position: 'relative',
              zIndex: 1
            }}>
              {['Google Ads Management', 'Facebook & Instagram Ads', /* 'LinkedIn Advertising', */
                'Retargeting Campaigns', 'Landing Page Optimization', 'ROI Tracking & Reporting'].map((item, index) => (
                <li key={index} style={{ 
                  marginBottom: '1rem',
                  paddingLeft: '2rem',
                  position: 'relative',
                  fontSize: '1rem',
                  color: '#e6edf3',
                  opacity: hoveredCard === 'paid' ? 1 : 0.8,
                  transform: hoveredCard === 'paid' ? `translateX(10px)` : 'translateX(0)',
                  transition: `all 0.3s ease ${index * 0.05}s`
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: '2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: hoveredCard === 'paid' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    color: '#00ff7f',
                  }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            
            <a href="/contact?service=paid" style={{
              color: '#00ff7f',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              marginTop: 'auto',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              position: 'relative',
              zIndex: 1,
              gap: '0.5rem'
            }}>
              Learn more about PPC
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
          
          {/* Affiliate Marketing Card */}
          <div className="service-card" style={{ 
            background: hoveredCard === 'affiliate' 
              ? 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 204, 99, 0.05) 100%)' 
              : 'rgba(21, 26, 35, 0.8)',
            borderRadius: '20px',
            padding: '2.5rem',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            border: hoveredCard === 'affiliate' ? '2px solid rgba(0, 255, 127, 0.5)' : '2px solid rgba(255,255,255,0.05)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            boxShadow: hoveredCard === 'affiliate' ? '0 20px 50px rgba(0, 255, 127, 0.2)' : '0 10px 30px rgba(0, 0, 0, 0.3)',
            transform: hoveredCard === 'affiliate' ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)'
          }}
          onMouseEnter={() => setHoveredCard('affiliate')}
          onMouseLeave={() => setHoveredCard(null)}>
            {/* Animated background effect */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(0, 255, 127, 0.1) 0%, transparent 70%)',
              transform: hoveredCard === 'affiliate' ? 'scale(1)' : 'scale(0)',
              transition: 'transform 0.8s ease-out',
              pointerEvents: 'none'
            }} />
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '1.5rem',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: hoveredCard === 'affiliate' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                transition: 'all 0.3s ease',
                transform: hoveredCard === 'affiliate' ? 'rotate(5deg)' : 'rotate(0deg)'
              }}>
                <ShoppingIcon />
              </div>
              <h3 style={{ 
                fontSize: '1.8rem',
                fontWeight: '700',
                margin: 0,
                color: hoveredCard === 'affiliate' ? '#00ff7f' : '#ffffff'
              }}>
                Affiliate Marketing
              </h3>
            </div>
            
            <p style={{ 
              marginBottom: '2rem', 
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#c9d1d9',
              position: 'relative',
              zIndex: 1
            }}>
              Tap into passive income streams with strategically built affiliate marketing websites designed for maximum conversion.
            </p>
            
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: '0 0 2rem 0',
              flex: '1',
              position: 'relative',
              zIndex: 1
            }}>
              {['Amazon Affiliate Websites', 'Niche Selection & Research', 'High-Converting Content', 
                'SEO for Affiliate Sites', 'Product Review Strategies', 'Conversion Optimization'].map((item, index) => (
                <li key={index} style={{ 
                  marginBottom: '1rem',
                  paddingLeft: '2rem',
                  position: 'relative',
                  fontSize: '1rem',
                  color: '#e6edf3',
                  opacity: hoveredCard === 'affiliate' ? 1 : 0.8,
                  transform: hoveredCard === 'affiliate' ? `translateX(10px)` : 'translateX(0)',
                  transition: `all 0.3s ease ${index * 0.05}s`
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: '2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: hoveredCard === 'affiliate' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    color: '#00ff7f',
                  }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            
            <a href="/contact?service=affiliate" style={{
              color: '#00ff7f',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              marginTop: 'auto',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              position: 'relative',
              zIndex: 1,
              gap: '0.5rem'
            }}>
              Learn more about Affiliate Marketing
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
          
          {/* Email Marketing Card */}
          <div className="service-card" style={{ 
            background: hoveredCard === 'email' 
              ? 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 204, 99, 0.05) 100%)' 
              : 'rgba(21, 26, 35, 0.8)',
            borderRadius: '20px',
            padding: '2.5rem',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            border: hoveredCard === 'email' ? '2px solid rgba(0, 255, 127, 0.5)' : '2px solid rgba(255,255,255,0.05)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            boxShadow: hoveredCard === 'email' ? '0 20px 50px rgba(0, 255, 127, 0.2)' : '0 10px 30px rgba(0, 0, 0, 0.3)',
            transform: hoveredCard === 'email' ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)'
          }}
          onMouseEnter={() => setHoveredCard('email')}
          onMouseLeave={() => setHoveredCard(null)}>
            {/* Animated background effect */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(0, 255, 127, 0.1) 0%, transparent 70%)',
              transform: hoveredCard === 'email' ? 'scale(1)' : 'scale(0)',
              transition: 'transform 0.8s ease-out',
              pointerEvents: 'none'
            }} />
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '1.5rem',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: hoveredCard === 'email' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                transition: 'all 0.3s ease',
                transform: hoveredCard === 'email' ? 'rotate(5deg)' : 'rotate(0deg)'
              }}>
                <EmailIcon />
              </div>
              <h3 style={{ 
                fontSize: '1.8rem',
                fontWeight: '700',
                margin: 0,
                color: hoveredCard === 'email' ? '#00ff7f' : '#ffffff'
              }}>
                Email Marketing
              </h3>
            </div>
            
            <p style={{ 
              marginBottom: '2rem', 
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#c9d1d9',
              position: 'relative',
              zIndex: 1
            }}>
              Build lasting customer relationships with targeted email campaigns that convert subscribers into loyal customers.
            </p>
            
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: '0 0 2rem 0',
              flex: '1',
              position: 'relative',
              zIndex: 1
            }}>
              {['Email Campaign Strategy', 'Newsletter Design & Writing', 'Automation Workflows', 
                'List Building & Segmentation', 'A/B Testing', 'Performance Analytics'].map((item, index) => (
                <li key={index} style={{ 
                  marginBottom: '1rem',
                  paddingLeft: '2rem',
                  position: 'relative',
                  fontSize: '1rem',
                  color: '#e6edf3',
                  opacity: hoveredCard === 'email' ? 1 : 0.8,
                  transform: hoveredCard === 'email' ? `translateX(10px)` : 'translateX(0)',
                  transition: `all 0.3s ease ${index * 0.05}s`
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: '2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: hoveredCard === 'email' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    color: '#00ff7f',
                  }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            
            <a href="/contact?service=email" style={{
              color: '#00ff7f',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              marginTop: 'auto',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              position: 'relative',
              zIndex: 1,
              gap: '0.5rem'
            }}>
              Learn more about Email Marketing
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
          
          {/* Content Marketing Card */}
          <div className="service-card" style={{ 
            background: hoveredCard === 'content' 
              ? 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 204, 99, 0.05) 100%)' 
              : 'rgba(21, 26, 35, 0.8)',
            borderRadius: '20px',
            padding: '2.5rem',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            border: hoveredCard === 'content' ? '2px solid rgba(0, 255, 127, 0.5)' : '2px solid rgba(255,255,255,0.05)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            boxShadow: hoveredCard === 'content' ? '0 20px 50px rgba(0, 255, 127, 0.2)' : '0 10px 30px rgba(0, 0, 0, 0.3)',
            transform: hoveredCard === 'content' ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)'
          }}
          onMouseEnter={() => setHoveredCard('content')}
          onMouseLeave={() => setHoveredCard(null)}>
            {/* Animated background effect */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(0, 255, 127, 0.1) 0%, transparent 70%)',
              transform: hoveredCard === 'content' ? 'scale(1)' : 'scale(0)',
              transition: 'transform 0.8s ease-out',
              pointerEvents: 'none'
            }} />
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '1.5rem',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: hoveredCard === 'content' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                transition: 'all 0.3s ease',
                transform: hoveredCard === 'content' ? 'rotate(5deg)' : 'rotate(0deg)'
              }}>
                <ContentIcon />
              </div>
              <h3 style={{ 
                fontSize: '1.8rem',
                fontWeight: '700',
                margin: 0,
                color: hoveredCard === 'content' ? '#00ff7f' : '#ffffff'
              }}>
                Content Marketing
              </h3>
            </div>
            
            <p style={{ 
              marginBottom: '2rem', 
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#c9d1d9',
              position: 'relative',
              zIndex: 1
            }}>
              Engage your audience with compelling content that builds trust, authority, and drives organic traffic to your business.
            </p>
            
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: '0 0 2rem 0',
              flex: '1',
              position: 'relative',
              zIndex: 1
            }}>
              {['Content Strategy Development', 'Blog Writing & Optimization', 'Video Content Creation', 
                'Infographic Design', 'Ebook & Guide Creation', 'Content Distribution'].map((item, index) => (
                <li key={index} style={{ 
                  marginBottom: '1rem',
                  paddingLeft: '2rem',
                  position: 'relative',
                  fontSize: '1rem',
                  color: '#e6edf3',
                  opacity: hoveredCard === 'content' ? 1 : 0.8,
                  transform: hoveredCard === 'content' ? `translateX(10px)` : 'translateX(0)',
                  transition: `all 0.3s ease ${index * 0.05}s`
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: '2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: hoveredCard === 'content' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    color: '#00ff7f',
                  }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            
            <a href="/contact?service=content" style={{
              color: '#00ff7f',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              marginTop: 'auto',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              position: 'relative',
              zIndex: 1,
              gap: '0.5rem'
            }}>
              Learn more about Content Marketing
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(0,30,60,0.3) 0%, rgba(13,17,23,0.5) 100%)',
        padding: '6rem 2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(0, 255, 127, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0, 255, 127, 0.05) 0%, transparent 50%)
          `
        }} />
        
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            marginBottom: '1.5rem',
            fontWeight: '800',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Why Choose Softeefi?
          </h2>
          
          <p style={{
            fontSize: '1.3rem',
            color: '#8b949e',
            maxWidth: '800px',
            margin: '0 auto 4rem',
            textAlign: 'center'
          }}>
            We combine cutting-edge technology with proven strategies to deliver exceptional results
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                icon: <TargetIcon />,
                title: 'Results-Driven Approach',
                description: 'Every strategy is designed with your ROI in mind. We focus on metrics that matter to your business growth.'
              },
              {
                icon: <ChartIcon />,
                title: 'Data-Backed Decisions',
                description: 'We use advanced analytics and AI-powered insights to optimize campaigns for maximum performance.'
              },
              {
                icon: <RocketIcon />,
                title: 'Rapid Implementation',
                description: 'Our agile methodology ensures quick deployment and faster time-to-results for your campaigns.'
              },
              {
                icon: <UserIcon />,
                title: 'Dedicated Support',
                description: '24/7 support with a dedicated account manager to ensure your campaigns run smoothly.'
              },
              {
                icon: <TrendingUpIcon />,
                title: 'Continuous Optimization',
                description: 'We constantly monitor and optimize your campaigns to improve performance over time.'
              },
              {
                icon: <CheckIcon />,
                title: 'Proven Track Record',
                description: '500+ successful campaigns with an average 300% ROI increase for our clients.'
              }
            ].map((feature, index) => (
              <div key={index} style={{
                background: 'rgba(21, 26, 35, 0.6)',
                borderRadius: '15px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = 'rgba(21, 26, 35, 0.8)';
                e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(21, 26, 35, 0.6)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'rgba(0, 255, 127, 0.1)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: '#00ff7f'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                  fontWeight: '600'
                }}>{feature.title}</h3>
                <p style={{
                  color: '#c9d1d9',
                  lineHeight: '1.6'
                }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Enhanced Portfolio Section */}
      <div id="portfolio" data-animate style={{
        padding: '6rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        opacity: isVisible.portfolio ? 1 : 0,
        transform: isVisible.portfolio ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 1s ease-out'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            marginBottom: '1.5rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Highlights
          </h2>
          <p style={{
            fontSize: '1.3rem',
            color: '#8b949e',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Explore our successful projects and see the results we've delivered
          </p>
        </div>
        
        {/* Portfolio Filter Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3rem',
          flexWrap: 'wrap'
        }}>
          {['all', 'seo', 'social', 'affiliate'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.75rem 2rem',
                background: activeTab === tab ? 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)' : 'transparent',
                color: activeTab === tab ? '#0d1117' : '#ffffff',
                border: activeTab === tab ? 'none' : '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '30px',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'capitalize'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.5)';
                  e.currentTarget.style.color = '#00ff7f';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = '#ffffff';
                }
              }}
            >
              {tab === 'all' ? 'All Projects' : tab}
            </button>
          ))}
        </div>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Portfolio Item 1 - SEO */}
          {(activeTab === 'all' || activeTab === 'seo') && (
            <div 
              className="portfolio-card" 
              onClick={() => handlePortfolioClick('https://www.fiverr.com/wordpress_seo22/do-complete-seo-for-wordpress-website')}
              role="button"
              tabIndex="0"
              style={{ 
                background: 'linear-gradient(135deg, rgba(13,17,23,0.9) 0%, rgba(0,40,80,0.9) 100%)',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '2px solid rgba(0, 255, 127, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                animation: 'fadeInUp 0.8s ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 255, 127, 0.3)';
                e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
                e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.1)';
              }}
            >
              {/* Category Badge */}
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(0, 255, 127, 0.2)',
                color: '#00ff7f',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '600',
                backdropFilter: 'blur(10px)',
                zIndex: 2
              }}>
                SEO
              </div>
              
              <div className="card-accent" style={{
                height: '8px',
                background: 'linear-gradient(90deg, #00ff7f 0%, #00cc63 50%, #009948 100%)',
                width: '100%',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                  animation: 'shimmer 2s infinite'
                }} />
              </div>
              
              <div style={{ padding: '2.5rem', flex: '1', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ 
                  marginBottom: '1.5rem', 
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  lineHeight: '1.3'
                }}>Complete SEO for WordPress Website</h3>
                
                <p style={{ 
                  marginBottom: '2rem', 
                  fontSize: '1.1rem', 
                  flex: '1',
                  color: '#c9d1d9',
                  lineHeight: '1.6'
                }}>
                  Search engine optimization service for WordPress websites to improve visibility and rankings. 
                  Includes technical SEO, on-page optimization, and link building strategies.
                </p>
                
                {/* Stats */}
                <div style={{
                  display: 'flex',
                  gap: '2rem',
                  marginBottom: '2rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div>
                    <div style={{ color: '#00ff7f', fontSize: '1.5rem', fontWeight: 'bold' }}>150+</div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Projects</div>
                  </div>
                  <div>
                    <div style={{ color: '#00ff7f', fontSize: '1.5rem', fontWeight: 'bold' }}>5.0★</div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Rating</div>
                  </div>
                  <div>
                    <div style={{ color: '#00ff7f', fontSize: '1.5rem', fontWeight: 'bold' }}>100%</div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Success</div>
                  </div>
                </div>
                
                <a
                  href="https://www.fiverr.com/wordpress_seo22/do-complete-seo-for-wordpress-website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    color: '#00ff7f',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: '600',
                    marginTop: 'auto'
                  }}
                >
                  View Gig on Fiverr
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
              </div>
            </div>
          )}

          {/* Portfolio Item 2 - SEO */}
          {(activeTab === 'all' || activeTab === 'seo') && (
            <div 
              className="portfolio-card" 
              onClick={() => handlePortfolioClick('https://www.fiverr.com/wordpress_seo22/rank-your-website-with-my-seo-service')}
              role="button"
              tabIndex="0"
              style={{ 
                background: 'linear-gradient(135deg, rgba(13,17,23,0.9) 0%, rgba(0,40,80,0.9) 100%)',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '2px solid rgba(0, 255, 127, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                animation: 'fadeInUp 0.8s ease-out 0.1s both'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 255, 127, 0.3)';
                e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
                e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.1)';
              }}
            >
              {/* Category Badge */}
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(0, 255, 127, 0.2)',
                color: '#00ff7f',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '600',
                backdropFilter: 'blur(10px)',
                zIndex: 2
              }}>
                SEO
              </div>
              
              <div className="card-accent" style={{
                height: '8px',
                background: 'linear-gradient(90deg, #00ff7f 0%, #00cc63 50%, #009948 100%)',
                width: '100%'
              }} />
              
              <div style={{ padding: '2.5rem', flex: '1', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ 
                  marginBottom: '1.5rem', 
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  lineHeight: '1.3'
                }}>Rank Your Website with SEO Service</h3>
                
                <p style={{ 
                  marginBottom: '2rem', 
                  fontSize: '1.1rem', 
                  flex: '1',
                  color: '#c9d1d9',
                  lineHeight: '1.6'
                }}>
                  Comprehensive SEO services to improve your website's rankings in search engines.
                  Proven strategies for sustainable organic growth.
                </p>
                
                {/* Stats */}
                <div style={{
                  display: 'flex',
                  gap: '2rem',
                  marginBottom: '2rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div>
                    <div style={{ color: '#00ff7f', fontSize: '1.5rem', fontWeight: 'bold' }}>200+</div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Projects</div>
                  </div>
                  <div>
                    <div style={{ color: '#00ff7f', fontSize: '1.5rem', fontWeight: 'bold' }}>5.0★</div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Rating</div>
                  </div>
                  <div>
                    <div style={{ color: '#00ff7f', fontSize: '1.5rem', fontWeight: 'bold' }}>98%</div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Success</div>
                  </div>
                </div>
                
                <a
                  href="https://www.fiverr.com/wordpress_seo22/rank-your-website-with-my-seo-service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    color: '#00ff7f',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: '600',
                    marginTop: 'auto'
                  }}
                >
                  View Gig on Fiverr
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
              </div>
            </div>
          )}

          {/* Portfolio Item 3 - SEO */}
          {(activeTab === 'all' || activeTab === 'seo') && (
            <div 
              className="portfolio-card" 
              onClick={() => handlePortfolioClick('https://www.fiverr.com/wordpress_seo22/do-seo-keyword-research-and-competitor-analysis')}
              role="button"
              tabIndex="0"
              style={{ 
                background: 'linear-gradient(135deg, rgba(13,17,23,0.9) 0%, rgba(0,40,80,0.9) 100%)',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '2px solid rgba(0, 255, 127, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                animation: 'fadeInUp 0.8s ease-out 0.2s both'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 255, 127, 0.3)';
                e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
                e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.1)';
              }}
            >
              {/* Category Badge */}
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(0, 255, 127, 0.2)',
                color: '#00ff7f',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '600',
                backdropFilter: 'blur(10px)',
                zIndex: 2
              }}>
                SEO Research
              </div>
              
              <div className="card-accent" style={{
                height: '8px',
                background: 'linear-gradient(90deg, #00ff7f 0%, #00cc63 50%, #009948 100%)',
                width: '100%'
              }} />
              
              <div style={{ padding: '2.5rem', flex: '1', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ 
                  marginBottom: '1.5rem', 
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  lineHeight: '1.3'
                }}>SEO Keyword Research and Competitor Analysis</h3>
                
                <p style={{ 
                  marginBottom: '2rem', 
                  fontSize: '1.1rem', 
                  flex: '1',
                  color: '#c9d1d9',
                  lineHeight: '1.6'
                }}>
                  In-depth keyword research and competitor analysis to create effective SEO strategies.
                  Find untapped opportunities in your niche.
                </p>
                
                {/* Stats */}
                <div style={{
                  display: 'flex',
                  gap: '2rem',
                  marginBottom: '2rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div>
                    <div style={{ color: '#00ff7f', fontSize: '1.5rem', fontWeight: 'bold' }}>300+</div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Research</div>
                  </div>
                  <div>
                    <div style={{ color: '#00ff7f', fontSize: '1.5rem', fontWeight: 'bold' }}>5.0★</div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Rating</div>
                  </div>
                  <div>
                    <div style={{ color: '#00ff7f', fontSize: '1.5rem', fontWeight: 'bold' }}>100%</div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Accurate</div>
                  </div>
                </div>
                
                <a
                  href="https://www.fiverr.com/wordpress_seo22/do-seo-keyword-research-and-competitor-analysis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    color: '#00ff7f',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: '600',
                    marginTop: 'auto'
                  }}
                >
                  View Gig on Fiverr
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
              </div>
            </div>
          )}

          {/* Portfolio Item 4 - Affiliate */}
          {(activeTab === 'all' || activeTab === 'affiliate') && (
            <div 
              className="portfolio-card" 
              onClick={() => handlePortfolioClick('https://www.fiverr.com/wordpress_seo22/create-an-amazon-affiliate-website')}
              role="button"
              tabIndex="0"
              style={{ 
                background: 'linear-gradient(135deg, rgba(13,17,23,0.9) 0%, rgba(0,40,80,0.9) 100%)',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '2px solid rgba(0, 255, 127, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                animation: 'fadeInUp 0.8s ease-out 0.3s both'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 255, 127, 0.3)';
                e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
                e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.1)';
              }}
            >
              {/* Category Badge */}
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(255, 183, 77, 0.2)',
                color: '#ffb74d',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '600',
                backdropFilter: 'blur(10px)',
                zIndex: 2
              }}>
                Affiliate
              </div>
              
              <div className="card-accent" style={{
                height: '8px',
                background: 'linear-gradient(90deg, #ffb74d 0%, #ffa726 50%, #ff9800 100%)',
                width: '100%'
              }} />
              
              <div style={{ padding: '2.5rem', flex: '1', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ 
                  marginBottom: '1.5rem', 
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  lineHeight: '1.3'
                }}>Amazon Affiliate Website Creation</h3>
                
                <p style={{ 
                  marginBottom: '2rem', 
                  fontSize: '1.1rem', 
                  flex: '1',
                  color: '#c9d1d9',
                  lineHeight: '1.6'
                }}>
                  Development of Amazon affiliate marketing websites to generate passive income.
                  Complete setup with SEO optimization included.
                </p>
                
                {/* Stats */}
                <div style={{
                  display: 'flex',
                  gap: '2rem',
                  marginBottom: '2rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div>
                    <div style={{ color: '#ffb74d', fontSize: '1.5rem', fontWeight: 'bold' }}>100+</div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Sites Built</div>
                  </div>
                  <div>
                    <div style={{ color: '#ffb74d', fontSize: '1.5rem', fontWeight: 'bold' }}>5.0★</div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Rating</div>
                  </div>
                  <div>
                    <div style={{ color: '#ffb74d', fontSize: '1.5rem', fontWeight: 'bold' }}>95%</div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Profitable</div>
                  </div>
                </div>
                
                <a
                  href="https://www.fiverr.com/wordpress_seo22/create-an-amazon-affiliate-website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    color: '#ffb74d',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: '600',
                    marginTop: 'auto'
                  }}
                >
                  View Gig on Fiverr
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
              </div>
            </div>
          )}

          {/* Portfolio Item 5 - Social */}
          {(activeTab === 'all' || activeTab === 'social') && (
            <div 
              className="portfolio-card" 
              onClick={() => handlePortfolioClick('https://www.fiverr.com/wordpress_seo22/manage-your-social-media-marketing')}
              role="button"
              tabIndex="0"
              style={{ 
                background: 'linear-gradient(135deg, rgba(13,17,23,0.9) 0%, rgba(0,40,80,0.9) 100%)',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '2px solid rgba(0, 255, 127, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                animation: 'fadeInUp 0.8s ease-out 0.4s both'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 255, 127, 0.3)';
                e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
                e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.1)';
              }}
            >
              {/* Category Badge */}
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(66, 165, 245, 0.2)',
                color: '#42a5f5',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '600',
                backdropFilter: 'blur(10px)',
                zIndex: 2
              }}>
                Social Media
              </div>
              
              <div className="card-accent" style={{
                height: '8px',
                background: 'linear-gradient(90deg, #42a5f5 0%, #2196f3 50%, #1976d2 100%)',
                width: '100%'
              }} />
              
              <div style={{ padding: '2.5rem', flex: '1', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ 
                  marginBottom: '1.5rem', 
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  lineHeight: '1.3'
                }}>Social Media Marketing Management</h3>
                
                <p style={{ 
                  marginBottom: '2rem', 
                  fontSize: '1.1rem', 
                  flex: '1',
                  color: '#c9d1d9',
                  lineHeight: '1.6'
                }}>
                  Comprehensive social media management services to boost your brand's online presence.
                  Grow your following and engagement across all platforms.
                </p>
                
                {/* Stats */}
                <div style={{
                  display: 'flex',
                  gap: '2rem',
                  marginBottom: '2rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div>
                    <div style={{ color: '#42a5f5', fontSize: '1.5rem', fontWeight: 'bold' }}>80+</div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Brands</div>
                  </div>
                  <div>
                    <div style={{ color: '#42a5f5', fontSize: '1.5rem', fontWeight: 'bold' }}>5.0★</div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Rating</div>
                  </div>
                  <div>
                    <div style={{ color: '#42a5f5', fontSize: '1.5rem', fontWeight: 'bold' }}>200%</div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Growth</div>
                  </div>
                </div>
                
                <a
                  href="https://www.fiverr.com/wordpress_seo22/manage-your-social-media-marketing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    color: '#42a5f5',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: '600',
                    marginTop: 'auto'
                  }}
                >
                  View Gig on Fiverr
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
              </div>
            </div>
          )}

          {/* Portfolio Item 6 - Social */}
          {(activeTab === 'all' || activeTab === 'social') && (
            <div 
              className="portfolio-card" 
              onClick={() => handlePortfolioClick('https://www.fiverr.com/wordpress_seo22/create-a-content-marketing-strategy')}
              role="button"
              tabIndex="0"
              style={{ 
                background: 'linear-gradient(135deg, rgba(13,17,23,0.9) 0%, rgba(0,40,80,0.9) 100%)',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '2px solid rgba(0, 255, 127, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                animation: 'fadeInUp 0.8s ease-out 0.5s both'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 255, 127, 0.3)';
                e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
                e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.1)';
              }}
            >
              {/* Category Badge */}
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(156, 39, 176, 0.2)',
                color: '#9c27b0',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '600',
                backdropFilter: 'blur(10px)',
                zIndex: 2
              }}>
                Content
              </div>
              
              <div className="card-accent" style={{
                height: '8px',
                background: 'linear-gradient(90deg, #9c27b0 0%, #8e24aa 50%, #7b1fa2 100%)',
                width: '100%'
              }} />
              
              <div style={{ padding: '2.5rem', flex: '1', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ 
                  marginBottom: '1.5rem', 
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  lineHeight: '1.3'
                }}>Content Marketing Strategy</h3>
                
                <p style={{ 
                  marginBottom: '2rem', 
                  fontSize: '1.1rem', 
                  flex: '1',
                  color: '#c9d1d9',
                  lineHeight: '1.6'
                }}>
                  Strategic content marketing plans to engage your audience and drive conversions.
                  Build authority and trust in your industry.
                </p>
                
                {/* Stats */}
                <div style={{
                  display: 'flex',
                  gap: '2rem',
                  marginBottom: '2rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div>
                    <div style={{ color: '#9c27b0', fontSize: '1.5rem', fontWeight: 'bold' }}>120+</div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Strategies</div>
                  </div>
                  <div>
                    <div style={{ color: '#9c27b0', fontSize: '1.5rem', fontWeight: 'bold' }}>5.0★</div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>Rating</div>
                  </div>
                  <div>
                    <div style={{ color: '#9c27b0', fontSize: '1.5rem', fontWeight: 'bold' }}>300%</div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>ROI</div>
                  </div>
                </div>
                
                <a
                  href="https://www.fiverr.com/wordpress_seo22/create-a-content-marketing-strategy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    color: '#9c27b0',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: '600',
                    marginTop: 'auto'
                  }}
                >
                  View Gig on Fiverr
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Process Section */}
      <div className="process-section" id="process" data-animate style={{ 
        marginBottom: '6rem',
        background: 'linear-gradient(135deg, rgba(13,17,23,0.9) 0%, rgba(0,30,60,0.9) 100%)',
        borderRadius: '30px',
        padding: '4rem 2rem',
        position: 'relative',
        maxWidth: '1400px',
        margin: '0 auto 6rem',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        opacity: isVisible.process ? 1 : 0,
        transform: isVisible.process ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 1s ease-out'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 30% 50%, rgba(0, 255, 127, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 50%, rgba(0, 255, 127, 0.05) 0%, transparent 50%)
          `,
          opacity: 0.5
        }} />
        
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '1rem',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '800',
          position: 'relative',
          zIndex: 1,
          background: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Our Proven Digital Marketing Process</h2>
        
        <p style={{
          textAlign: 'center',
          fontSize: '1.3rem',
          color: '#8b949e',
          maxWidth: '800px',
          margin: '0 auto 4rem',
          position: 'relative',
          zIndex: 1
        }}>
          A systematic approach that delivers consistent, measurable results
        </p>
        
        <div className="process-steps" style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Step 1 */}
          <div className="process-step" style={{ 
            textAlign: 'center',
            padding: '2rem',
            position: 'relative',
            background: 'rgba(21, 26, 35, 0.6)',
            borderRadius: '20px',
            border: '2px solid rgba(0, 255, 127, 0.2)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.background = 'rgba(21, 26, 35, 0.8)';
            e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.5)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 255, 127, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = 'rgba(21, 26, 35, 0.6)';
            e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.2)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div className="step-number" style={{ 
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)',
              color: '#0d1117',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: 'bold',
              margin: '0 auto 1.5rem auto',
              boxShadow: '0 10px 30px rgba(0, 255, 127, 0.3)'
            }}>4</div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '700' }}>Monitoring & Optimization</h3>
            <p style={{ fontSize: '1rem', maxWidth: '300px', margin: '0 auto', color: '#c9d1d9', lineHeight: '1.6' }}>
              We continuously track performance, analyze data, and optimize for maximum ROI.
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Client Reviews/Testimonials Section */}
      <section className="testimonials" id="testimonials" data-animate style={{ 
        padding: '6rem 2rem',
        background: 'linear-gradient(180deg, rgba(0,30,60,0.2) 0%, rgba(13,17,23,0.4) 100%)',
        position: 'relative',
        overflow: 'hidden',
        opacity: isVisible.testimonials ? 1 : 0,
        transform: isVisible.testimonials ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 1s ease-out'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 10% 20%, rgba(0, 255, 127, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(0, 255, 127, 0.05) 0%, transparent 50%)
          `
        }} />
        
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            marginBottom: '1.5rem',
            fontWeight: '800',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Client Success Stories
          </h2>
          
          <p style={{ 
            marginBottom: '4rem',
            fontSize: '1.3rem',
            color: '#8b949e',
            maxWidth: '800px',
            margin: '0 auto 4rem',
            textAlign: 'center'
          }}>
            Don't just take our word for it - see what our clients have to say about our digital marketing and SEO services.
          </p>
          
          {/* Reviews Grid */}
          <div className="reviews-grid" style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {/* Review 1 */}
            <div className="testimonial-item" style={{ 
              background: 'rgba(21, 26, 35, 0.8)',
              borderRadius: '20px',
              padding: '2.5rem',
              position: 'relative',
              border: '2px solid rgba(0, 255, 127, 0.1)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 255, 127, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.5)';
              e.currentTarget.style.background = 'rgba(21, 26, 35, 0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.1)';
              e.currentTarget.style.background = 'rgba(21, 26, 35, 0.8)';
            }}>
              <div style={{ 
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                display: 'flex',
                gap: '0.25rem'
              }}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              
              <QuoteIcon style={{ 
                position: 'absolute',
                top: '3rem',
                left: '2rem',
                opacity: '0.1',
                transform: 'rotate(180deg)',
                zIndex: '1'
              }} />
              
              <div style={{ 
                marginTop: '3rem',
                position: 'relative',
                zIndex: '2',
                flex: '1'
              }}>
                <p style={{ 
                  fontSize: '1.2rem',
                  lineHeight: '1.8',
                  marginBottom: '2rem',
                  color: '#e6edf3',
                  fontStyle: 'italic'
                }}>
                  "I'm absolutely blown away by the comprehensive keyword research provided. By far the most accurate and detailed analysis I've received out of many SEO services I've tried. The communication was excellent throughout the entire process."
                </p>
              </div>
              
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                marginTop: 'auto',
                paddingTop: '1.5rem',
                borderTop: '2px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ 
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  color: '#0d1117'
                }}>
                  LB
                </div>
                <div>
                  <p style={{ fontWeight: 'bold', marginBottom: '0.2rem', fontSize: '1.1rem' }}>Lewis B.</p>
                  <p style={{ fontSize: '0.9rem', color: '#8b949e' }}>United States • SEO Client</p>
                </div>
              </div>
            </div>
            
            {/* Review 2 */}
            <div className="testimonial-item" style={{ 
              background: 'rgba(21, 26, 35, 0.8)',
              borderRadius: '20px',
              padding: '2.5rem',
              position: 'relative',
              border: '2px solid rgba(0, 255, 127, 0.1)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 255, 127, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.5)';
              e.currentTarget.style.background = 'rgba(21, 26, 35, 0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.1)';
              e.currentTarget.style.background = 'rgba(21, 26, 35, 0.8)';
            }}>
              <div style={{ 
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                display: 'flex',
                gap: '0.25rem'
              }}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              
              <QuoteIcon style={{ 
                position: 'absolute',
                top: '3rem',
                left: '2rem',
                opacity: '0.1',
                transform: 'rotate(180deg)',
                zIndex: '1'
              }} />
              
              <div style={{ 
                marginTop: '3rem',
                position: 'relative',
                zIndex: '2',
                flex: '1'
              }}>
                <p style={{ 
                  fontSize: '1.2rem',
                  lineHeight: '1.8',
                  marginBottom: '2rem',
                  color: '#e6edf3',
                  fontStyle: 'italic'
                }}>
                  "The SEO work for my WordPress site was exactly as described. The backlinks created were actually from higher domain authority sites than I expected. I'll definitely be working with this team again for future projects."
                </p>
              </div>
              
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                marginTop: 'auto',
                paddingTop: '1.5rem',
                borderTop: '2px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ 
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  color: '#0d1117'
                }}>
                  PS
                </div>
                <div>
                  <p style={{ fontWeight: 'bold', marginBottom: '0.2rem', fontSize: '1.1rem' }}>Peter S.</p>
                  <p style={{ fontSize: '0.9rem', color: '#8b949e' }}>United States • WordPress SEO</p>
                </div>
              </div>
            </div>
            
            {/* Review 3 */}
            <div className="testimonial-item" style={{ 
              background: 'rgba(21, 26, 35, 0.8)',
              borderRadius: '20px',
              padding: '2.5rem',
              position: 'relative',
              border: '2px solid rgba(0, 255, 127, 0.1)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 255, 127, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.5)';
              e.currentTarget.style.background = 'rgba(21, 26, 35, 0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.1)';
              e.currentTarget.style.background = 'rgba(21, 26, 35, 0.8)';
            }}>
              <div style={{ 
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                display: 'flex',
                gap: '0.25rem'
              }}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              
              <QuoteIcon style={{ 
                position: 'absolute',
                top: '3rem',
                left: '2rem',
                opacity: '0.1',
                transform: 'rotate(180deg)',
                zIndex: '1'
              }} />
              
              <div style={{ 
                marginTop: '3rem',
                position: 'relative',
                zIndex: '2',
                flex: '1'
              }}>
                <p style={{ 
                  fontSize: '1.2rem',
                  lineHeight: '1.8',
                  marginBottom: '2rem',
                  color: '#e6edf3',
                  fontStyle: 'italic'
                }}>
                  "Amazing service! The detailed keyword research was super helpful for my business. The team was friendly and communicated throughout the entire process. I'll definitely use these services again for future SEO needs. Would give 6 stars if I could!"
                </p>
              </div>
              
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                marginTop: 'auto',
                paddingTop: '1.5rem',
                borderTop: '2px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ 
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  color: '#0d1117'
                }}>
                  SM
                </div>
                <div>
                  <p style={{ fontWeight: 'bold', marginBottom: '0.2rem', fontSize: '1.1rem' }}>Sarah M.</p>
                  <p style={{ fontSize: '0.9rem', color: '#8b949e' }}>Canada • Keyword Research</p>
                </div>
              </div>
            </div>
            
            {/* Review 4 */}
            <div className="testimonial-item" style={{ 
              background: 'rgba(21, 26, 35, 0.8)',
              borderRadius: '20px',
              padding: '2.5rem',
              position: 'relative',
              border: '2px solid rgba(0, 255, 127, 0.1)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 255, 127, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.5)';
              e.currentTarget.style.background = 'rgba(21, 26, 35, 0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.1)';
              e.currentTarget.style.background = 'rgba(21, 26, 35, 0.8)';
            }}>
              <div style={{ 
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                display: 'flex',
                gap: '0.25rem'
              }}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              
              <QuoteIcon style={{ 
                position: 'absolute',
                top: '3rem',
                left: '2rem',
                opacity: '0.1',
                transform: 'rotate(180deg)',
                zIndex: '1'
              }} />
              
              <div style={{ 
                marginTop: '3rem',
                position: 'relative',
                zIndex: '2',
                flex: '1'
              }}>
                <p style={{ 
                  fontSize: '1.2rem',
                  lineHeight: '1.8',
                  marginBottom: '2rem',
                  color: '#e6edf3',
                  fontStyle: 'italic'
                }}>
                  "Just wrapped up my second project with this team, and they continue to impress. My affiliate site is already seeing increased traffic after implementing their SEO recommendations. Their expertise in both WordPress and Amazon affiliates is invaluable."
                </p>
              </div>
              
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                marginTop: 'auto',
                paddingTop: '1.5rem',
                borderTop: '2px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ 
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  color: '#0d1117'
                }}>
                  JK
                </div>
                <div>
                  <p style={{ fontWeight: 'bold', marginBottom: '0.2rem', fontSize: '1.1rem' }}>James K.</p>
                  <p style={{ fontSize: '0.9rem', color: '#8b949e' }}>United Kingdom • Affiliate Sites</p>
                </div>
              </div>
            </div>
            
            {/* Review 5 */}
            <div className="testimonial-item" style={{ 
              background: 'rgba(21, 26, 35, 0.8)',
              borderRadius: '20px',
              padding: '2.5rem',
              position: 'relative',
              border: '2px solid rgba(0, 255, 127, 0.1)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 255, 127, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.5)';
              e.currentTarget.style.background = 'rgba(21, 26, 35, 0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.1)';
              e.currentTarget.style.background = 'rgba(21, 26, 35, 0.8)';
            }}>
              <div style={{ 
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                display: 'flex',
                gap: '0.25rem'
              }}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              
              <QuoteIcon style={{ 
                position: 'absolute',
                top: '3rem',
                left: '2rem',
                opacity: '0.1',
                transform: 'rotate(180deg)',
                zIndex: '1'
              }} />
              
              <div style={{ 
                marginTop: '3rem',
                position: 'relative',
                zIndex: '2',
                flex: '1'
              }}>
                <p style={{ 
                  fontSize: '1.2rem',
                  lineHeight: '1.8',
                  marginBottom: '2rem',
                  color: '#e6edf3',
                  fontStyle: 'italic'
                }}>
                  "Wonderful keywords and a friendly person to work with. The competitor analysis was extremely helpful for my niche site. Highly recommended if you want high-quality, well-researched keywords that can actually rank."
                </p>
              </div>
              
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                marginTop: 'auto',
                paddingTop: '1.5rem',
                borderTop: '2px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ 
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  color: '#0d1117'
                }}>
                  MT
                </div>
                <div>
                  <p style={{ fontWeight: 'bold', marginBottom: '0.2rem', fontSize: '1.1rem' }}>Michael T.</p>
                  <p style={{ fontSize: '0.9rem', color: '#8b949e' }}>Australia • Niche Sites</p>
                </div>
              </div>
            </div>
            
            {/* Review 6 */}
            <div className="testimonial-item" style={{ 
              background: 'rgba(21, 26, 35, 0.8)',
              borderRadius: '20px',
              padding: '2.5rem',
              position: 'relative',
              border: '2px solid rgba(0, 255, 127, 0.1)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 255, 127, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.5)';
              e.currentTarget.style.background = 'rgba(21, 26, 35, 0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.1)';
              e.currentTarget.style.background = 'rgba(21, 26, 35, 0.8)';
            }}>
              <div style={{ 
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                display: 'flex',
                gap: '0.25rem'
              }}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              
              <QuoteIcon style={{ 
                position: 'absolute',
                top: '3rem',
                left: '2rem',
                opacity: '0.1',
                transform: 'rotate(180deg)',
                zIndex: '1'
              }} />
              
              <div style={{ 
                marginTop: '3rem',
                position: 'relative',
                zIndex: '2',
                flex: '1'
              }}>
                <p style={{ 
                  fontSize: '1.2rem',
                  lineHeight: '1.8',
                  marginBottom: '2rem',
                  color: '#e6edf3',
                  fontStyle: 'italic'
                }}>
                  "The social media strategy they created for my business was exactly what I needed. Very communicative throughout the entire process and easy to work with. I've already seen engagement increase on my business profiles. Highly recommended!"
                </p>
              </div>
              
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                marginTop: 'auto',
                paddingTop: '1.5rem',
                borderTop: '2px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ 
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  color: '#0d1117'
                }}>
                  ER
                </div>
                <div>
                  <p style={{ fontWeight: 'bold', marginBottom: '0.2rem', fontSize: '1.1rem' }}>Emily R.</p>
                  <p style={{ fontSize: '0.9rem', color: '#8b949e' }}>United States • Social Media</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Enhanced Final CTA Section */}
      <div className="final-cta" style={{
        background: 'linear-gradient(135deg, rgba(0,40,80,0.95) 0%, rgba(13,17,23,0.95) 100%)',
        borderRadius: '30px',
        padding: '6rem 3rem',
        textAlign: 'center',
        margin: '6rem auto',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '1200px',
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)',
        border: '2px solid rgba(0, 255, 127, 0.2)'
      }}>
        {/* Animated Background Patterns */}
        <div className="background-pattern" style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          opacity: '0.3',
          pointerEvents: 'none',
          overflow: 'hidden'
        }}>
          {/* Floating particles */}
          {Array(100).fill(0).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              borderRadius: '50%',
              background: 'rgba(0, 255, 127, 0.8)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }} />
          ))}
          
          {/* Gradient orbs */}
          <div style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(0, 255, 127, 0.2) 0%, transparent 70%)',
            top: '-300px',
            right: '-300px',
            animation: 'pulse 8s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(0, 255, 127, 0.15) 0%, transparent 70%)',
            bottom: '-200px',
            left: '-200px',
            animation: 'pulse 10s ease-in-out infinite'
          }} />
        </div>
        
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            marginBottom: '2rem',
            fontWeight: '900',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 50%, #00cc63 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'glow 3s ease-in-out infinite'
          }}>
            Ready to Boost Your<br />
            <span style={{ fontSize: '0.9em' }}>Online Presence?</span>
          </h2>
          
          <p style={{ 
            fontSize: '1.4rem', 
            maxWidth: '800px', 
            margin: '0 auto 3rem auto',
            color: '#e6edf3',
            lineHeight: '1.8'
          }}>
            Let Softeefi craft a winning digital marketing strategy for your business.
            Our data-driven approach ensures measurable results and ROI.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '3rem'
          }}>
            <a 
              href="/contact" 
              className="cta-button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.5rem 3rem',
                background: 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)',
                color: '#0d1117',
                fontWeight: 'bold',
                fontSize: '1.3rem',
                borderRadius: '50px',
                textDecoration: 'none',
                boxShadow: '0 10px 40px rgba(0, 255, 127, 0.4)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                zIndex: '2'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 255, 127, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 255, 127, 0.4)';
              }}
            >
              Get Your Free Quote
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            
            <a 
              href="tel:+447417505744" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.5rem 3rem',
                background: 'transparent',
                color: '#00ff7f',
                fontWeight: 'bold',
                fontSize: '1.3rem',
                border: '2px solid #00ff7f',
                borderRadius: '50px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 255, 127, 0.1)';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Call Us Now
            </a>
          </div>
          
          {/* Trust Badges */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            {[
              { icon: <CheckIcon />, text: 'Free Consultation' },
              { icon: <CheckIcon />, text: 'No Hidden Fees' },
              { icon: <CheckIcon />, text: '100% Satisfaction' },
              { icon: <CheckIcon />, text: 'Results Guaranteed' }
            ].map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#00ff7f',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#8b949e' 
          }}>
            Join 500+ businesses that trust Softeefi for their digital marketing needs
          </p>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.5;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
          50% {
            transform: translateY(10px) translateX(-10px);
            opacity: 0.6;
          }
          75% {
            transform: translateY(-10px) translateX(5px);
            opacity: 0.7;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.3;
          }
        }
        
        @keyframes glow {
          0%, 100% {
            filter: brightness(1) drop-shadow(0 0 20px rgba(0, 255, 127, 0.5));
          }
          50% {
            filter: brightness(1.2) drop-shadow(0 0 40px rgba(0, 255, 127, 0.8));
          }
        }
        
        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }
        
        @keyframes scrollIndicator {
          0% {
            opacity: 0;
            top: 8px;
          }
          40% {
            opacity: 1;
          }
          80% {
            opacity: 0;
            top: 32px;
          }
          100% {
            opacity: 0;
            top: 32px;
          }
        }
        
        /* Global hover effects */
        a {
          transition: all 0.3s ease;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .service-card {
            margin-bottom: 1rem;
          }
          
          .portfolio-card {
            margin-bottom: 1rem;
          }
          
          .testimonial-item {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default DigitalMarketingSEO;