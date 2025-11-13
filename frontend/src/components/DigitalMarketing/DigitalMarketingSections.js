import React from 'react';
import { styles } from './DigitalMarketingStyles';
import * as Icons from './DigitalMarketingIcons';

// Hero Section Component
export const HeroSection = ({ scrollY, isMobile }) => {
  return (
    <div className="hero-section" style={{
      ...styles.heroSection,
      paddingTop: isMobile ? '100px' : '160px',
      paddingBottom: isMobile ? '40px' : '60px',
      marginTop: isMobile ? '0' : '-80px',
      minHeight: isMobile ? 'auto' : '65vh'
    }}>
      <div className="hero-background" style={styles.heroBackground}>
        {/* Animated gradient orbs */}
        {[...Array(window.innerWidth <= 768 ? 4 : 8)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: window.innerWidth <= 768 ? `${150 + i * 50}px` : `${300 + i * 100}px`,
            height: window.innerWidth <= 768 ? `${150 + i * 50}px` : `${300 + i * 100}px`,
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
          backgroundImage: `linear-gradient(rgba(0, 255, 127, 0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0, 255, 127, 0.03) 1px, transparent 1px)`,
          backgroundSize: window.innerWidth <= 768 ? '50px 50px' : '100px 100px',
          transform: `translateY(${scrollY * 0.5}px)`
        }} />
      </div>
      
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        padding: window.innerWidth <= 768 ? '0 20px' : '0 2rem',
        boxSizing: 'border-box'
      }}>
        <h1 style={{
          fontSize: isMobile ? 'clamp(2rem, 7vw, 3rem)' : 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: '900',
          marginBottom: isMobile ? '1rem' : '1.5rem',
          background: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 50%, #ffffff 100%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'shimmer 3s linear infinite',
          letterSpacing: '-0.02em',
          lineHeight: '1.3',
          paddingBottom: '0.2em',
          transform: `translateY(${scrollY * -0.2}px)`
        }}>
          Semantic SEO & Digital Marketing
        </h1>
        
        <p style={{
          fontSize: isMobile ? 'clamp(1rem, 3vw, 1.2rem)' : 'clamp(1.1rem, 1.8vw, 1.5rem)',
          color: '#c9d1d9',
          marginBottom: isMobile ? '1.5rem' : '2rem',
          maxWidth: isMobile ? '90%' : '700px',
          margin: isMobile ? '0 auto 1.5rem' : '0 auto 2rem',
          lineHeight: '1.6',
          opacity: 0.9,
          transform: `translateY(${scrollY * -0.1}px)`
        }}>
          Transform your online presence with data-driven strategies that deliver measurable results
        </p>
        
        <div style={{
          display: 'flex',
          gap: isMobile ? '1rem' : '1.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          transform: `translateY(${scrollY * -0.05}px)`,
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: window.innerWidth <= 768 ? 'stretch' : 'center',
          width: isMobile ? '100%' : 'auto',
          maxWidth: 'none',
          margin: '0 auto',
          padding: isMobile ? '0 20px' : '0',
          boxSizing: 'border-box'
        }}>
          <a href="/contact" style={{
            ...styles.ctaButton,
            transform: 'scale(1)',
            transition: 'all 0.3s ease',
            textAlign: 'center',
            width: 'auto',
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 255, 127, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Get Started
              <Icons.RocketIcon />
            </span>
          </a>
          
          <a href="#portfolio" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            padding: isMobile ? '0.8rem 1.5rem' : '1rem 2.5rem',
            fontSize: isMobile ? '1rem' : '1.1rem',
            fontWeight: '600',
            color: '#00ff7f',
            background: 'transparent',
            border: '2px solid #00ff7f',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            textAlign: 'center',
            width: 'auto'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 255, 127, 0.1)';
            e.currentTarget.style.transform = 'translateY(-5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              View Portfolio
              <Icons.ChartIcon />
            </span>
          </a>
        </div>
        
        {/* Hero Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: window.innerWidth <= 768 ? '1.5rem' : '2rem',
          marginTop: window.innerWidth <= 768 ? '2rem' : '3rem',
          padding: window.innerWidth <= 768 ? '1.5rem' : '2rem',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          width: '100%',
          maxWidth: window.innerWidth <= 768 ? 'calc(100vw - 40px)' : '100%',
          margin: window.innerWidth <= 768 ? '2rem auto 0' : '3rem auto 0',
          boxSizing: 'border-box'
        }}>
          {[
            { number: '500+', label: 'Successful Campaigns' },
            { number: '98%', label: 'Client Satisfaction' },
            { number: '3.5x', label: 'Average ROI' },
            { number: '24/7', label: 'Support Available' }
          ].map((stat, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: window.innerWidth <= 768 ? '2rem' : '2.5rem',
                fontWeight: '900',
                color: '#00ff7f',
                marginBottom: '0.3rem',
                animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`
              }}>{stat.number}</div>
              <div style={{
                fontSize: window.innerWidth <= 768 ? '0.9rem' : '1rem',
                color: '#8b949e',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Services Grid Component
export const ServicesGrid = ({ services, hoveredCard, setHoveredCard }) => {
  const isMobile = window.innerWidth <= 768;
  
  return (
    <div style={{
      display: isMobile ? 'flex' : 'grid',
      flexDirection: isMobile ? 'column' : undefined,
      gridTemplateColumns: isMobile ? undefined : 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: isMobile ? '1.5rem' : '2rem',
      marginTop: '4rem'
    }}>
      {services.map((service, index) => (
        <div
          key={index}
          style={{
            ...styles.serviceCard,
            padding: window.innerWidth <= 768 ? '1.5rem' : styles.serviceCard.padding,
            animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`,
            width: '100%',
            boxSizing: 'border-box',
            minHeight: 'auto'
          }}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(0, 255, 127, 0.1) 0%, transparent 70%)',
            transform: hoveredCard === index ? 'scale(1)' : 'scale(0)',
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
              background: hoveredCard === index ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '1rem',
              transition: 'all 0.3s ease',
              transform: hoveredCard === index ? 'rotate(5deg)' : 'rotate(0deg)'
            }}>
              <service.icon />
            </div>
            <h3 style={{
              fontSize: window.innerWidth <= 768 ? '1.5rem' : '1.8rem',
              fontWeight: '700',
              margin: 0,
              color: hoveredCard === index ? '#00ff7f' : '#ffffff'
            }}>
              {service.title}
            </h3>
          </div>
          
          <p style={{
            marginBottom: '2rem',
            fontSize: isMobile ? '1rem' : '1.1rem',
            lineHeight: '1.8',
            color: '#c9d1d9',
            position: 'relative',
            zIndex: 1
          }}>
            {service.description}
          </p>
          
          <a href={`/contact?service=${service.title.toLowerCase().replace(/ /g, '-')}`} style={{
            color: '#00ff7f',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            position: 'relative',
            zIndex: 1,
            marginTop: 'auto',
            transition: 'gap 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.gap = '1rem'}
          onMouseLeave={(e) => e.currentTarget.style.gap = '0.5rem'}>
            Learn More →
          </a>
        </div>
      ))}
    </div>
  );
};

// Portfolio Grid Component  
export const PortfolioGrid = ({ portfolioItems, activeTab, handlePortfolioClick }) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const filteredItems = activeTab === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeTab);
    
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: isMobile ? '1.5rem' : '2.5rem',
      rowGap: isMobile ? '2rem' : '3rem',
      marginTop: isMobile ? '2rem' : '3rem',
      gridAutoRows: isMobile ? 'minmax(500px, auto)' : 'minmax(650px, auto)' // Smaller minimum height on mobile
    }}>
      {filteredItems.map((item, index) => (
        <div
          key={index}
          style={{
            ...styles.portfolioCard,
            cursor: 'pointer',
            minHeight: isMobile ? '500px' : '650px', // Responsive minimum height
            maxWidth: isMobile ? '100%' : '450px', // Full width on mobile
            width: '100%',
            margin: '0 auto', // Center cards in their grid cells
            height: '100%', // Ensure full height usage
            display: 'flex',
            flexDirection: 'column'
          }}
          onClick={() => handlePortfolioClick(item)}
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
            zIndex: 2,
            textTransform: 'uppercase'
          }}>
            {item.category}
          </div>
          
          <div style={{
            height: '250px',
            minHeight: '250px',
            maxHeight: '250px',
            overflow: 'hidden',
            position: 'relative',
            flexShrink: 0 // Prevent shrinking
          }}>
            <img 
              src={item.image} 
              alt={`${item.title} - ${item.category} digital marketing portfolio by Softeefi`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            />
          </div>
          
          <div style={{ padding: isMobile ? '1.5rem' : '2.5rem', flex: '1', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{
              marginBottom: '1rem',
              fontSize: isMobile ? '1.5rem' : '1.8rem',
              fontWeight: '700',
              color: '#ffffff',
              lineHeight: '1.3'
            }}>{item.title}</h3>
            
            <p style={{
              color: '#00ff7f',
              fontSize: '1rem',
              marginBottom: '1rem',
              fontWeight: '600'
            }}>{item.client}</p>
            
            <p style={{
              marginBottom: '2rem',
              fontSize: isMobile ? '1rem' : '1.1rem',
              flex: '1',
              color: '#c9d1d9',
              lineHeight: '1.6'
            }}>
              {item.description}
            </p>
            
            {/* Results */}
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}>
              {item.results.map((result, idx) => (
                <div key={idx} style={{
                  background: 'rgba(0, 255, 127, 0.1)',
                  padding: '0.5rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#00ff7f',
                  border: '1px solid rgba(0, 255, 127, 0.3)'
                }}>
                  {result}
                </div>
              ))}
            </div>
            
            {/* Tags */}
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap'
            }}>
              {item.tags.map((tag, idx) => (
                <span key={idx} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  color: '#8b949e',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Process Steps Component
export const ProcessSteps = ({ process }) => {
  const isMobile = window.innerWidth <= 768;
  
  return (
    <div style={{
      display: isMobile ? 'flex' : 'grid',
      flexDirection: isMobile ? 'column' : undefined,
      gridTemplateColumns: isMobile ? undefined : 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: isMobile ? '1.5rem' : '2.5rem',
      marginTop: '4rem',
      position: 'relative'
    }}>
      {/* Connection Line */}
      {window.innerWidth > 768 && (
        <div style={{
          position: 'absolute',
          top: '100px',
          left: '10%',
          right: '10%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, #00ff7f 50%, transparent 100%)',
          zIndex: 0
        }} />
      )}
      
      {process.map((step, index) => (
        <div
          key={index}
          id={`process-step-${index}`}
          data-animate
          style={{
            ...styles.processStep,
            padding: window.innerWidth <= 768 ? '1.5rem' : styles.processStep.padding,
            animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`,
            width: '100%',
            boxSizing: 'border-box'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%)';
            e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <div style={{
            fontSize: window.innerWidth <= 768 ? '3rem' : '4rem',
            fontWeight: '900',
            color: 'rgba(0, 255, 127, 0.2)',
            marginBottom: '1rem',
            lineHeight: '1',
            animation: `rotateIn 1s ease-out ${index * 0.1}s both`
          }}>
            {step.number}
          </div>
          <h3 style={{
            fontSize: window.innerWidth <= 768 ? '1.3rem' : '1.5rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: '#00ff7f'
          }}>
            {step.title}
          </h3>
          <p style={{
            fontSize: '1rem',
            color: '#c9d1d9',
            lineHeight: '1.6'
          }}>
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
};

// Testimonials Component
export const TestimonialsSection = ({ testimonials }) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const [isPaused, setIsPaused] = React.useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = React.useState(null);
  const testimonialRef = React.useRef(null);
  
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div
      ref={testimonialRef}
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        padding: isMobile ? '2rem 0' : '3rem 0',
        marginTop: '2rem'
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
    >
      {/* Scrolling Container */}
      <div
        style={{
          display: 'flex',
          animation: 'testimonialScroll 12s linear infinite',
          animationPlayState: isPaused ? 'paused' : 'running',
          gap: '2rem',
          paddingLeft: '2rem',
          paddingRight: '2rem',
          width: 'fit-content',
          willChange: 'transform'
        }}
      >
        {/* Triple testimonials for seamless loop */}
        {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
          <div
            key={index}
            style={{
              minWidth: isMobile ? '300px' : '400px',
              width: isMobile ? '300px' : '400px',
              flexShrink: 0,
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              padding: isMobile ? '1.5rem' : '2rem',
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={() => {
              if (isMobile && testimonial.projectImage) {
                setSelectedTestimonial(selectedTestimonial === index ? null : index);
              }
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.3)';
              e.currentTarget.style.background = 'rgba(0, 255, 127, 0.02)';
              e.currentTarget.style.transform = 'scale(1.02) translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
            }}
          >
            {/* Rating Stars */}
            <div style={{
              display: 'flex',
              gap: '0.25rem',
              marginBottom: '1rem'
            }}>
              {[...Array(testimonial.rating || 5)].map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#ffd700" stroke="#ffd700" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            
            {/* Review Content */}
            <p style={{
              fontSize: isMobile ? '0.95rem' : '1.1rem',
              color: '#c9d1d9',
              lineHeight: '1.6',
              marginBottom: '1.5rem',
              fontStyle: 'italic'
            }}>
              "{testimonial.content}"
            </p>
            
            {/* Author Info */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{ position: 'relative', width: '50px', height: '50px' }}>
                {testimonial.image && (
                  <img 
                    src={testimonial.image}
                    alt={testimonial.author}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid rgba(0, 255, 127, 0.3)',
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00ff7f 0%, #00cc66 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#0d1117'
                }}>
                  {testimonial.author.charAt(0)}
                </div>
              </div>
              <div>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {testimonial.author}
                  {testimonial.flag && testimonial.flag === '🇺🇸' && (
                    <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                      <rect width="24" height="16" fill="#B22234"/>
                      <rect y="1.23" width="24" height="1.23" fill="white"/>
                      <rect y="3.69" width="24" height="1.23" fill="white"/>
                      <rect y="6.15" width="24" height="1.23" fill="white"/>
                      <rect y="8.62" width="24" height="1.23" fill="white"/>
                      <rect y="11.08" width="24" height="1.23" fill="white"/>
                      <rect y="13.54" width="24" height="1.23" fill="white"/>
                      <rect width="9.6" height="8.62" fill="#3C3B6E"/>
                    </svg>
                  )}
                  {testimonial.flag && testimonial.flag === '🇿🇦' && (
                    <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                      <rect width="24" height="5.33" fill="#007A4D"/>
                      <rect y="5.33" width="24" height="5.34" fill="#FFFFFF"/>
                      <rect y="10.67" width="24" height="5.33" fill="#002395"/>
                      <polygon points="0,0 10,8 0,16" fill="#000000"/>
                      <polygon points="0,0 8,8 0,16" fill="#FFB612"/>
                      <polygon points="0,0 6,8 0,16" fill="#DE3831"/>
                    </svg>
                  )}
                </h4>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#888',
                  margin: 0
                }}>
                  {testimonial.position} • {testimonial.company}
                  {testimonial.date && ` • ${testimonial.date}`}
                </p>
              </div>
            </div>
            
            {/* Project Image Preview - Shows on hover/click */}
            {testimonial.projectImage && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '105%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  pointerEvents: 'none',
                  zIndex: 10,
                  width: isMobile ? '280px' : '350px',
                  opacity: (isMobile && selectedTestimonial === index) || (!isMobile && false) ? 1 : 0,
                  scale: (isMobile && selectedTestimonial === index) || (!isMobile && false) ? 1 : 0.95,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.scale = '1';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.opacity = '0';
                    e.currentTarget.style.scale = '0.95';
                  }
                }}
              >
                <div style={{
                  background: 'rgba(13, 17, 23, 0.98)',
                  border: '1px solid rgba(0, 255, 127, 0.3)',
                  borderRadius: '12px',
                  padding: '0.5rem',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
                  position: 'relative'
                }}>
                  <img
                    src={testimonial.projectImage}
                    alt={`${testimonial.author} project`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '8px',
                      display: 'block'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  {/* Arrow pointer */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '0',
                    height: '0',
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderTop: '8px solid rgba(0, 255, 127, 0.3)'
                  }} />
                </div>
              </div>
            )}
            
            {/* Mobile tap indicator */}
            {isMobile && testimonial.projectImage && (
              <div 
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: selectedTestimonial === index ? 'rgba(0, 255, 127, 0.2)' : 'rgba(0, 255, 127, 0.1)',
                  border: '1px solid rgba(0, 255, 127, 0.3)',
                  borderRadius: '20px',
                  padding: '4px 8px',
                  fontSize: '0.7rem',
                  color: '#00ff7f',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  opacity: 1,
                  transition: 'opacity 0.3s ease'
                }}
              >
                {selectedTestimonial === index ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Viewing
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    Tap to view
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Gradient edges */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '100px',
        background: 'linear-gradient(90deg, rgba(13, 17, 23, 1) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 2
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '100px',
        background: 'linear-gradient(270deg, rgba(13, 17, 23, 1) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 2
      }} />
      
      {/* CSS Animation */}
      <style jsx>{`
        @keyframes testimonialScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </div>
  );
};

// Why Choose Us Section Component
export const WhyChooseUsSection = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const features = [
    {
      icon: <Icons.TargetIcon />,
      title: 'Results-Driven Approach',
      description: 'Every strategy is designed with your ROI in mind. We focus on metrics that matter to your business growth.'
    },
    {
      icon: <Icons.ChartIcon />,
      title: 'Data-Backed Decisions',
      description: 'We use advanced analytics and AI-powered insights to optimize campaigns for maximum performance.'
    },
    {
      icon: <Icons.RocketIcon />,
      title: 'Rapid Implementation',
      description: 'Our agile methodology ensures quick deployment and faster time-to-results for your campaigns.'
    },
    {
      icon: <Icons.UserIcon />,
      title: 'Dedicated Support',
      description: '24/7 support with a dedicated account manager to ensure your campaigns run smoothly.'
    },
    {
      icon: <Icons.TrendingUpIcon />,
      title: 'Continuous Optimization',
      description: 'We constantly monitor and optimize your campaigns to improve performance over time.'
    },
    {
      icon: <Icons.CheckIcon />,
      title: 'Proven Track Record',
      description: '500+ successful campaigns with an average 300% ROI increase for our clients.'
    }
  ];

  return (
    <div style={{
      background: 'linear-gradient(180deg, rgba(0,30,60,0.3) 0%, rgba(13,17,23,0.5) 100%)',
      padding: window.innerWidth <= 768 ? '3rem 1rem' : '6rem 2rem',
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
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          display: 'block',
          width: '100%'
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
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {features.map((feature, index) => (
            <div key={index} style={{
              background: 'rgba(21, 26, 35, 0.6)',
              borderRadius: '15px',
              padding: isMobile ? '1.5rem' : '2rem',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = 'rgba(21, 26, 35, 0.8)';
                e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(21, 26, 35, 0.6)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
              }
            }}
            onClick={(e) => {
              if (isMobile) {
                e.currentTarget.style.background = 'rgba(21, 26, 35, 0.8)';
                e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.3)';
                setTimeout(() => {
                  e.currentTarget.style.background = 'rgba(21, 26, 35, 0.6)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                }, 300);
              }
            }}>
              <div style={{
                width: isMobile ? '45px' : '50px',
                height: isMobile ? '45px' : '50px',
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
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>{feature.title}</h3>
              <p style={{
                color: '#c9d1d9',
                lineHeight: '1.6',
                fontSize: isMobile ? '0.95rem' : '1rem'
              }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// CTA Section Component
export const CTASection = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="final-cta-section" style={{
      padding: isMobile ? '4rem 20px' : '8rem 2rem',
      background: 'linear-gradient(135deg, rgba(0,30,60,0.9) 0%, rgba(13,17,23,1) 100%)',
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-25%',
        width: isMobile ? '400px' : '800px',
        height: isMobile ? '400px' : '800px',
        background: 'radial-gradient(circle, rgba(0, 255, 127, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'pulse 4s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-50%',
        left: '-25%',
        width: isMobile ? '300px' : '600px',
        height: isMobile ? '300px' : '600px',
        background: 'radial-gradient(circle, rgba(0, 255, 127, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'pulse 4s ease-in-out infinite 2s'
      }} />
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        width: '100%',
        boxSizing: 'border-box',
        padding: isMobile ? '0 20px' : '0'
      }}>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '900',
          marginBottom: '2rem',
          textAlign: 'center',
          color: '#ffffff',
          textShadow: '0 0 30px rgba(0, 255, 127, 0.6)'
        }}>
          Skyrocket Your Digital Growth Now
        </h2>
        
        <p style={{
          fontSize: '1.4rem',
          color: '#c9d1d9',
          marginBottom: '3rem',
          maxWidth: '800px',
          margin: '0 auto 3rem',
          lineHeight: '1.8'
        }}>
          Join hundreds of businesses that have transformed their online presence with our proven strategies
        </p>
        
        <div style={{
          display: 'flex',
          gap: isMobile ? '1rem' : '1.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: isMobile ? '1.5rem' : '4rem',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          width: isMobile ? '100%' : 'auto',
          maxWidth: 'none',
          margin: '0 auto',
          padding: isMobile ? '0 20px' : '0',
          boxSizing: 'border-box'
        }}>
          <a href="/contact" style={{
            ...styles.ctaButton,
            textAlign: 'center',
            width: 'auto',
            display: 'flex'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 255, 127, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            Start Your Success Story
            <Icons.RocketIcon />
          </a>
          
          <a href="tel:+447417505744" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            padding: isMobile ? '0.8rem 1.5rem' : '1rem 2.5rem',
            fontSize: isMobile ? '1rem' : '1.1rem',
            fontWeight: '600',
            color: '#00ff7f',
            background: 'transparent',
            border: '2px solid #00ff7f',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            textAlign: 'center',
            width: 'auto'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 255, 127, 0.1)';
            e.currentTarget.style.transform = 'translateY(-5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            Call Us Now
            <Icons.UserIcon />
          </a>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: window.innerWidth <= 768 ? '1.5rem' : '4rem',
          flexWrap: 'wrap',
          marginTop: window.innerWidth <= 768 ? '2rem' : '3rem'
        }}>
          {[
            { icon: Icons.CheckIcon, text: 'Free Strategy Consultation' },
            { icon: Icons.CheckIcon, text: 'No Long-term Contracts' },
            { icon: Icons.CheckIcon, text: 'Results in 30 Days' }
          ].map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: isMobile ? '1rem' : '1.1rem',
              color: '#e6edf3',
              animation: `fadeIn 0.8s ease-out ${index * 0.1}s both`
            }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'rgba(0, 255, 127, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00ff7f'
              }}>
                <item.icon />
              </div>
              {item.text}
            </div>
          ))}
        </div>
        
        <p style={{
          fontSize: '1.1rem',
          color: '#8b949e',
          marginTop: '3rem'
        }}>
          Join 500+ businesses that trust Softeefi for their digital marketing needs
        </p>
      </div>
    </div>
  );
};