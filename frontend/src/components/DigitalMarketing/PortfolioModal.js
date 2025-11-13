import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioItems } from './DigitalMarketingData';

const PortfolioModal = ({ isOpen, onClose, item, onNavigate }) => {
  const isMobile = window.innerWidth <= 768;
  const [zoomedImage, setZoomedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    if (item) {
      const index = portfolioItems.findIndex(p => p.id === item.id);
      setCurrentIndex(index);
    }
  }, [item]);

  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? portfolioItems.length - 1 : currentIndex - 1;
    onNavigate(portfolioItems[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = currentIndex === portfolioItems.length - 1 ? 0 : currentIndex + 1;
    onNavigate(portfolioItems[nextIndex]);
  };
  
  // Touch handlers for swipe navigation
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && item) {
      handleNext();
    }
    if (isRightSwipe && item) {
      handlePrevious();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!item) return null;

  const renderDetailedContent = () => {
    switch(item.id) {
      case 'dr-diana':
        return (
          <>
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>The Challenge</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1rem', color: '#ffffff' }}>
                Dr. Diana Girnita, a rheumatologist, was struggling to gain traction on YouTube after the COVID hype died down. 
                Her channel was at its lowest point with only 2.2 million views in the 6 months before we took over in January 2024.
              </p>
              <p style={{ fontSize: '1rem', color: '#ffffff' }}>
                As of February 2024, there are roughly 449,984 YouTube channels with 100K subscribers or more - 
                less than 0.4% of all YouTube channels worldwide.
              </p>
            </div>

            {(item.image || (item.additionalImages && item.additionalImages.length > 0)) && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Visual Journey</h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
                  gap: isMobile ? '0.5rem' : '1rem',
                  marginBottom: '1.5rem'
                }}>
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      onClick={() => setZoomedImage(item.image)}
                      style={{
                        width: '100%',
                        height: isMobile ? 'auto' : '200px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                        border: '2px solid rgba(0, 255, 127, 0.2)',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => !isMobile && (e.target.style.transform = 'scale(1.02)')}
                      onMouseLeave={(e) => !isMobile && (e.target.style.transform = 'scale(1)')}
                    />
                  )}
                  {item.additionalImages?.map((img, index) => (
                    <img 
                      key={index}
                      src={img} 
                      alt={`${item.title} marketing strategy slide ${index + 1} - Digital marketing case study`}
                      onClick={() => setZoomedImage(img)}
                      style={{
                        width: '100%',
                        height: isMobile ? 'auto' : '200px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                        border: '2px solid rgba(0, 255, 127, 0.2)',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => !isMobile && (e.target.style.transform = 'scale(1.02)')}
                      onMouseLeave={(e) => !isMobile && (e.target.style.transform = 'scale(1)')}
                    />
                  ))}
                </div>
                <p style={{
                  textAlign: 'center',
                  color: '#00ff7f',
                  fontSize: '0.9rem',
                  marginBottom: '1rem',
                  fontWeight: 'bold'
                }}>
                  Click to view full image
                </p>
                {item.strategy?.description && (
                  <p style={{ 
                    fontSize: '1.1rem', 
                    lineHeight: '1.8',
                    background: 'rgba(0, 255, 127, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(0, 255, 127, 0.2)',
                    color: '#ffffff'
                  }}>
                    {item.strategy?.description}
                  </p>
                )}
              </div>
            )}

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Our Strategy</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  <strong>Social SEO:</strong> Built using high quality, optimized short-form content
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  <strong>Strategic Shorts:</strong> Posted shorts that would recommend her long-form videos to viewers over time
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  <strong>Content Optimization:</strong> Leveraged 8+ years of experience in viral content creation
                </li>
              </ul>
            </div>

            <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.1)', padding: '2rem', borderRadius: '10px' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#00ff7f' }}>Results in 6 Months</h3>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2rem' }}>
                <div>
                  <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>+4.3M</h4>
                  <p style={{ color: '#ffffff' }}>Views (2X growth)</p>
                </div>
                <div>
                  <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>+44.5K</h4>
                  <p style={{ color: '#ffffff' }}>New Subscribers</p>
                </div>
                <div>
                  <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>+206.4K</h4>
                  <p style={{ color: '#ffffff' }}>Watch Time Hours</p>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Key Takeaway</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                The short-form content alone drove <strong style={{ color: '#00ff7f' }}>1 million views</strong> to her channel. 
                This strategic approach caused the rebirth of her channel, helping her join the elite 0.4% of YouTube channels 
                with 100K+ subscribers and a Silver Play Button.
              </p>
            </div>
          </>
        );

      case 'backward-point':
        return (
          <>
            {item.image && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Campaign Visual</h3>
                <div style={{ textAlign: 'center' }}>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    onClick={() => setZoomedImage(item.image)}
                    style={{
                      width: '100%',
                      maxHeight: isMobile ? '250px' : '400px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      border: '2px solid rgba(0, 255, 127, 0.2)',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => !isMobile && (e.target.style.transform = 'scale(1.02)')}
                    onMouseLeave={(e) => !isMobile && (e.target.style.transform = 'scale(1)')}
                  />
                </div>
                <p style={{
                  textAlign: 'center',
                  color: '#00ff7f',
                  fontSize: '0.9rem',
                  marginTop: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  Click to view full image
                </p>
              </div>
            )}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>The Challenge</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                Backward Point, a cricket podcast, needed to stand out in the crowded sports content space. 
                We took on the challenge to transform them from unknown to viral sensation.
              </p>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Our Strategy</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  <strong>Mother-Child Strategy:</strong> Grew on TikTok & Instagram with short clips, transferred audience to YouTube
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  <strong>Meme Marketing:</strong> Created viral cricket memes that resonated with fans
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  <strong>Multi-Platform Growth:</strong> Simultaneous growth across all social platforms
                </li>
              </ul>
            </div>

            <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.1)', padding: '2rem', borderRadius: '10px' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#00ff7f' }}>Results Since Sep 2023</h3>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2rem' }}>
                <div>
                  <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>100M+</h4>
                  <p style={{ color: '#ffffff' }}>Total Views Across Platforms</p>
                </div>
                <div>
                  <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>50K</h4>
                  <p style={{ color: '#ffffff' }}>YouTube Subscribers</p>
                </div>
                <div>
                  <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>24.8M</h4>
                  <p style={{ color: '#ffffff' }}>YouTube Views in 1 Year</p>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Key Takeaway</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                We saw massive spikes in both subscribers and views after implementing our viral content strategy. 
                The Mother-Child approach allowed us to build audiences on easier platforms first, then transfer them to YouTube.
              </p>
            </div>
          </>
        );

      case 'ecommerce-meme':
        return (
          <>
            {item.image && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Campaign Visual</h3>
                <div style={{ textAlign: 'center' }}>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    onClick={() => setZoomedImage(item.image)}
                    style={{
                      width: '100%',
                      maxHeight: isMobile ? '250px' : '400px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      border: '2px solid rgba(0, 255, 127, 0.2)',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => !isMobile && (e.target.style.transform = 'scale(1.02)')}
                    onMouseLeave={(e) => !isMobile && (e.target.style.transform = 'scale(1)')}
                  />
                </div>
                <p style={{
                  textAlign: 'center',
                  color: '#00ff7f',
                  fontSize: '0.9rem',
                  marginTop: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  Click to view full image
                </p>
              </div>
            )}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>The Challenge</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                An e-commerce fashion brand wanted to generate revenue through organic social media without paid advertising.
              </p>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Our Strategy</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  <strong>Viral Meme Content:</strong> Created relatable fashion memes that drove engagement
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  <strong>Trend Jacking:</strong> Leveraged current trends for maximum visibility
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  <strong>Social Commerce:</strong> Direct product integration in viral content
                </li>
              </ul>
            </div>

            <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.1)', padding: '2rem', borderRadius: '10px' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#00ff7f' }}>Results</h3>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2rem' }}>
                <div>
                  <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>$20,000</h4>
                  <p style={{ color: '#ffffff' }}>Revenue Generated</p>
                </div>
                <div>
                  <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>2.2M+</h4>
                  <p style={{ color: '#ffffff' }}>Organic Views</p>
                </div>
                <div>
                  <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>100%</h4>
                  <p style={{ color: '#ffffff' }}>Organic (No Ads)</p>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Key Takeaway</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                Meme marketing isn't just for entertainment - it drives real business results. 
                Our viral content strategy generated significant revenue without any paid advertising spend.
              </p>
            </div>
          </>
        );

      case 'content-channel':
        return (
          <>
            {item.image && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Channel Overview</h3>
                <div style={{ textAlign: 'center' }}>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    onClick={() => setZoomedImage(item.image)}
                    style={{
                      width: '100%',
                      maxHeight: isMobile ? '250px' : '400px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      border: '2px solid rgba(0, 255, 127, 0.2)',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => !isMobile && (e.target.style.transform = 'scale(1.02)')}
                    onMouseLeave={(e) => !isMobile && (e.target.style.transform = 'scale(1)')}
                  />
                </div>
                <p style={{
                  textAlign: 'center',
                  color: '#00ff7f',
                  fontSize: '0.9rem',
                  marginTop: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  Click to view full image
                </p>
              </div>
            )}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>The Challenge</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                Build a YouTube channel from scratch in a competitive niche, testing various content strategies over 5 years.
              </p>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Our Journey</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1rem', color: '#ffffff' }}>
                This channel helped teach us what we know today. Over 5 years, we experimented with different editing styles, 
                content types, and strategies to understand what truly works in organic content marketing.
              </p>
            </div>

            <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.1)', padding: '2rem', borderRadius: '10px' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#00ff7f' }}>Results Over 5 Years</h3>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2rem' }}>
                <div>
                  <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>270K+</h4>
                  <p style={{ color: '#ffffff' }}>Subscribers</p>
                </div>
                <div>
                  <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>16M+</h4>
                  <p style={{ color: '#ffffff' }}>Total Views</p>
                </div>
                <div>
                  <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>3.6M</h4>
                  <p style={{ color: '#ffffff' }}>Views in 2023</p>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Key Learnings</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  Testing different editing styles to find what resonates
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  Understanding platform algorithms through experimentation
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  Building sustainable growth through consistent quality content
                </li>
              </ul>
            </div>
          </>
        );

      case 'melanie-stover':
        return (
          <>
            {item.image && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Success Story Visual</h3>
                <div style={{ textAlign: 'center' }}>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    onClick={() => setZoomedImage(item.image)}
                    style={{
                      width: '100%',
                      maxHeight: isMobile ? '250px' : '400px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      border: '2px solid rgba(0, 255, 127, 0.2)',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => !isMobile && (e.target.style.transform = 'scale(1.02)')}
                    onMouseLeave={(e) => !isMobile && (e.target.style.transform = 'scale(1)')}
                  />
                </div>
                <p style={{
                  textAlign: 'center',
                  color: '#00ff7f',
                  fontSize: '0.9rem',
                  marginTop: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  Click to view full image
                </p>
              </div>
            )}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>The Challenge</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                Melanie Stover runs a Home Care Sales business and was desperate for help with her upcoming flagship event. 
                She reached out at the last minute, needing urgent help to boost ticket sales.
              </p>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Our Strategy</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: '#ffffff' }}>
                Despite the tight timeline, we leveraged our expertise in viral content and rapid community engagement:
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  <strong>Content Mastery:</strong> Created scroll-stopping content that captured attention instantly
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  <strong>Trend Acceleration:</strong> Rode the wave of current trends at the perfect moment
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  <strong>Community Building:</strong> Transformed followers into engaged event attendees
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  <strong>Growth Analytics:</strong> Used data-driven decisions to maximize impact quickly
                </li>
              </ul>
            </div>

            <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.1)', padding: '2rem', borderRadius: '10px' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#00ff7f' }}>Lightning-Fast Results</h3>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2rem' }}>
                <div>
                  <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>20%</h4>
                  <p style={{ color: '#ffffff' }}>Increase in Ticket Sales</p>
                </div>
                <div>
                  <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>&lt; 1 Week</h4>
                  <p style={{ color: '#ffffff' }}>Time to Results</p>
                </div>
                <div>
                  <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>Success</h4>
                  <p style={{ color: '#ffffff' }}>Flagship Event Saved</p>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Key Takeaway</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                When Melanie first reached out, we almost turned her down due to the tight timeline. But with our 
                <strong style={{ color: '#00ff7f' }}> 8+ years of experience and 3.2 billion organic views</strong>, 
                we knew exactly how to create rapid results. This case proves that with the right strategy and execution, 
                significant business impact can be achieved even in the shortest timeframes.
              </p>
            </div>
          </>
        );

      case 'mitchell-saum':
        return (
          <>
            {(item.image || (item.additionalImages && item.additionalImages.length > 0)) && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>The AI Content Revolution Story</h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
                  gap: isMobile ? '0.5rem' : '1rem',
                  marginBottom: '1.5rem'
                }}>
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      onClick={() => setZoomedImage(item.image)}
                      style={{
                        width: '100%',
                        height: isMobile ? 'auto' : '250px',
                        objectFit: 'contain',
                        background: '#0d1117',
                        borderRadius: '10px',
                        border: '2px solid rgba(0, 255, 127, 0.2)',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => !isMobile && (e.target.style.transform = 'scale(1.02)')}
                      onMouseLeave={(e) => !isMobile && (e.target.style.transform = 'scale(1)')}
                    />
                  )}
                  {item.additionalImages?.map((img, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                      <img 
                        src={img} 
                        alt={`AI Story Slide ${index + 1}`}
                        onClick={() => setZoomedImage(img)}
                        style={{
                          width: '100%',
                          height: isMobile ? 'auto' : '250px',
                          objectFit: 'contain',
                          background: '#0d1117',
                          borderRadius: '10px',
                          border: '2px solid rgba(0, 255, 127, 0.2)',
                          cursor: 'pointer',
                          transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={(e) => !isMobile && (e.target.style.transform = 'scale(1.02)')}
                        onMouseLeave={(e) => !isMobile && (e.target.style.transform = 'scale(1)')} 
                      />
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        background: 'rgba(0, 255, 127, 0.9)',
                        color: '#0d0d0d',
                        padding: '4px 8px',
                        borderRadius: '5px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {index + 1}/8
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{
                  textAlign: 'center',
                  color: '#00ff7f',
                  fontSize: '0.9rem',
                  marginBottom: '1rem',
                  fontWeight: 'bold'
                }}>
                  Click to view full image
                </p>
              </div>
            )}

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>The Challenge</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                Mitchell Saum was too busy to record content for his social media channels. For a while, nothing was being 
                produced, and his online presence was suffering. He hadn't recorded in months but still needed daily video posts.
              </p>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Our Revolutionary Solution</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: '#ffffff' }}>
                Instead of pushing him to get back to recording, we decided to take matters into our own hands:
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  <strong>AI Research:</strong> Our team began researching cutting-edge AI tools to generate content
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  <strong>Game-Changing Discovery:</strong> Found our secret tool that revolutionized content creation
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  <strong>Realistic AI Content:</strong> Created content so realistic even our editors couldn't tell it wasn't real
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  <strong>Zero Effort Required:</strong> Mitchell didn't have to record a single piece of content
                </li>
              </ul>
            </div>

            <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.1)', padding: '2rem', borderRadius: '10px' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#00ff7f' }}>Game-Changing Results</h3>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2rem' }}>
                <div>
                  <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>5-10 Hours</h4>
                  <p style={{ color: '#ffffff' }}>Saved Per Week</p>
                </div>
                <div>
                  <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>Daily Posts</h4>
                  <p style={{ color: '#ffffff' }}>Consistent Content</p>
                </div>
                <div>
                  <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>0 Recording</h4>
                  <p style={{ color: '#ffffff' }}>Zero Effort from Client</p>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Key Takeaway</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                As the saying goes, <strong style={{ color: '#00ff7f' }}>"Where there's a will, there's a way!"</strong> 
                {' '}This innovative AI-powered solution saved Mitchell 5-10 hours per week without him lifting a finger. 
                We're posting daily videos on his socials even though he hasn't recorded in months. This case study proves 
                that with innovation and the right tools, we can overcome any content creation challenge.
              </p>
            </div>
          </>
        );

      case 'wiprint-seo':
        return (
          <>
            {(item.image || (item.additionalImages && item.additionalImages.length > 0)) && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>SEO Analytics & Performance</h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : item.additionalImages?.length > 1 ? 'repeat(3, 1fr)' : '1fr', 
                  gap: isMobile ? '0.5rem' : '1rem',
                  marginBottom: '1.5rem'
                }}>
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      onClick={() => setZoomedImage(item.image)}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        borderRadius: '10px',
                        border: '2px solid rgba(0, 255, 127, 0.2)',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => !isMobile && (e.target.style.transform = 'scale(1.02)')}
                      onMouseLeave={(e) => !isMobile && (e.target.style.transform = 'scale(1)')}
                    />
                  )}
                  {item.additionalImages?.map((img, index) => (
                    <img 
                      key={index}
                      src={img} 
                      alt={`SEO Analytics ${index + 1}`}
                      onClick={() => setZoomedImage(img)}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        borderRadius: '10px',
                        border: '2px solid rgba(0, 255, 127, 0.2)',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => !isMobile && (e.target.style.transform = 'scale(1.02)')}
                      onMouseLeave={(e) => !isMobile && (e.target.style.transform = 'scale(1)')}
                    />
                  ))}
                </div>
                <p style={{
                  textAlign: 'center',
                  color: '#00ff7f',
                  fontSize: '0.9rem',
                  marginBottom: '1rem',
                  fontWeight: 'bold'
                }}>
                  Click images to view full analytics dashboards
                </p>
              </div>
            )}

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>The Challenge</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                Wiprint.it, an Italian e-commerce printing company, faced zero online visibility in a competitive market. 
                They needed to establish organic search presence to generate consistent online orders without relying on paid advertising.
              </p>
            </div>

            {item.seoMetrics && (
              <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.05)', padding: '2rem', borderRadius: '10px', border: '1px solid rgba(0, 255, 127, 0.2)' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#00ff7f' }}>Key SEO Metrics Achieved</h3>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2rem' }}>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>{item.seoMetrics.organicKeywords}</h4>
                    <p style={{ color: '#ffffff' }}>Keywords Ranked</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>{item.seoMetrics.backlinks}</h4>
                    <p style={{ color: '#ffffff' }}>Quality Backlinks</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>{item.seoMetrics.referringDomains}</h4>
                    <p style={{ color: '#ffffff' }}>Referring Domains</p>
                  </div>
                </div>
                
                {item.seoMetrics.topCountries && (
                  <div style={{ marginTop: '2rem' }}>
                    <h4 style={{ color: '#00ff7f', marginBottom: '1rem' }}>Geographic Dominance</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                      {item.seoMetrics.topCountries.slice(0, 3).map((country, idx) => (
                        <div key={idx} style={{
                          padding: '0.5rem 1rem',
                          background: 'rgba(0, 255, 127, 0.1)',
                          borderRadius: '8px',
                          border: '1px solid rgba(0, 255, 127, 0.3)'
                        }}>
                          <strong style={{ color: '#00ff7f' }}>{country.country}:</strong> {country.percentage} ({country.keywords})
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {item.strategy && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>{item.strategy.title}</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: '#ffffff' }}>
                  {item.strategy.description}
                </p>
                {item.strategy.techniques && (
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {item.strategy.techniques.map((technique, idx) => (
                      <li key={idx} style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                        <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                        {technique}
                      </li>
                    ))}
                  </ul>
                )}
                {item.strategy.timeline && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <strong style={{ color: '#00ff7f' }}>Timeline:</strong> {item.strategy.timeline}
                  </div>
                )}
              </div>
            )}

            {item.semrushData && (
              <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.1)', padding: '2rem', borderRadius: '10px' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#00ff7f' }}>SEMrush Performance Data</h3>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '1.5rem' }}>
                  <div>
                    <h4 style={{ color: '#00ff7f', marginBottom: '0.5rem' }}>Organic Traffic</h4>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{item.semrushData.organicTraffic}</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#00ff7f', marginBottom: '0.5rem' }}>Total Backlinks</h4>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{item.semrushData.backlinks}</p>
                  </div>
                </div>
                {item.semrushData.topOrganicKeywords && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <h4 style={{ color: '#00ff7f', marginBottom: '1rem' }}>Top Ranking Keywords</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {item.semrushData.topOrganicKeywords.map((keyword, idx) => (
                        <span key={idx} style={{
                          padding: '0.25rem 0.75rem',
                          background: 'rgba(0, 255, 127, 0.2)',
                          border: '1px solid rgba(0, 255, 127, 0.4)',
                          borderRadius: '20px',
                          fontSize: '0.9rem'
                        }}>
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {item.caseStudyHighlights && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Case Study Highlights</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {item.caseStudyHighlights.map((highlight, idx) => (
                    <li key={idx} style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>→</span>
                      <strong>{highlight}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.testimonial && (
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.05) 0%, rgba(0, 255, 127, 0.1) 100%)',
                padding: '2rem',
                borderRadius: '10px',
                border: '1px solid rgba(0, 255, 127, 0.3)',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Client Testimonial</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', fontStyle: 'italic', color: '#ffffff' }}>
                  "{item.testimonial}"
                </p>
              </div>
            )}

            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Key Takeaway</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                This case study demonstrates the power of <strong style={{ color: '#00ff7f' }}>white hat SEO techniques</strong> in 
                transforming an invisible e-commerce site into a market leader. Through strategic optimization, quality link building, 
                and targeted content creation, we achieved sustainable organic growth that continues to drive sales without ongoing ad spend.
              </p>
            </div>
          </>
        );

      case 'health-affiliate-seo':
        return (
          <>
            {(item.image || (item.additionalImages && item.additionalImages.length > 0)) && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Website & Analytics Overview</h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: isMobile ? '0.5rem' : '1rem',
                  marginBottom: '1.5rem'
                }}>
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      onClick={() => setZoomedImage(item.image)}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        borderRadius: '10px',
                        border: '2px solid rgba(0, 255, 127, 0.2)',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => !isMobile && (e.target.style.transform = 'scale(1.02)')}
                      onMouseLeave={(e) => !isMobile && (e.target.style.transform = 'scale(1)')}
                    />
                  )}
                  {item.additionalImages?.map((img, index) => (
                    <img 
                      key={index}
                      src={img} 
                      alt={`Analytics ${index + 1}`}
                      onClick={() => setZoomedImage(img)}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        borderRadius: '10px',
                        border: '2px solid rgba(0, 255, 127, 0.2)',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => !isMobile && (e.target.style.transform = 'scale(1.02)')}
                      onMouseLeave={(e) => !isMobile && (e.target.style.transform = 'scale(1)')}
                    />
                  ))}
                </div>
                <p style={{
                  textAlign: 'center',
                  color: '#00ff7f',
                  fontSize: '0.9rem',
                  marginBottom: '1rem',
                  fontWeight: 'bold'
                }}>
                  Click images to view full details
                </p>
              </div>
            )}

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>The Challenge</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                KitchenBazar.pk needed to establish authority in the competitive health and medical education niche while 
                creating multiple revenue streams through affiliate marketing and advertising partnerships.
              </p>
            </div>

            {item.seoMetrics && (
              <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.05)', padding: '2rem', borderRadius: '10px', border: '1px solid rgba(0, 255, 127, 0.2)' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#00ff7f' }}>SEO Performance Metrics</h3>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2rem' }}>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>{item.seoMetrics.trafficValue}</h4>
                    <p style={{ color: '#ffffff' }}>Monthly Traffic Value</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>{item.seoMetrics.organicTraffic}</h4>
                    <p style={{ color: '#ffffff' }}>Organic Traffic</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>{item.seoMetrics.keywords}</h4>
                    <p style={{ color: '#ffffff' }}>Keywords Ranked</p>
                  </div>
                </div>
              </div>
            )}

            {item.affiliateSuccess && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Affiliate Marketing Success</h3>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 3fr', gap: '2rem' }}>
                  <div>
                    <h4 style={{ color: '#00ff7f', marginBottom: '1rem' }}>Active Networks</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {item.affiliateSuccess.networks.map((network, idx) => (
                        <span key={idx} style={{
                          padding: '0.25rem 0.75rem',
                          background: 'rgba(0, 255, 127, 0.1)',
                          border: '1px solid rgba(0, 255, 127, 0.3)',
                          borderRadius: '20px',
                          fontSize: '0.85rem'
                        }}>
                          {network}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 style={{ color: '#00ff7f', marginBottom: '1rem' }}>Monetization Achievements</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {item.affiliateSuccess.monetization.map((achievement, idx) => (
                        <li key={idx} style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative', color: '#ffffff' }}>
                          <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {item.contentStrategy && (
              <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.1)', padding: '2rem', borderRadius: '10px' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Content Strategy</h3>
                <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontStyle: 'italic' }}>"{item.contentStrategy.focus}"</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {item.contentStrategy.topics.map((topic, idx) => (
                    <div key={idx} style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(0, 255, 127, 0.05)',
                      border: '1px solid rgba(0, 255, 127, 0.3)',
                      borderRadius: '8px'
                    }}>
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.strategy && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>{item.strategy.title}</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: '#ffffff' }}>
                  {item.strategy.description}
                </p>
                {item.strategy.techniques && (
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {item.strategy.techniques.map((technique, idx) => (
                      <li key={idx} style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                        <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                        {technique}
                      </li>
                    ))}
                  </ul>
                )}
                {item.strategy.timeline && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <strong style={{ color: '#00ff7f' }}>Timeline:</strong> {item.strategy.timeline}
                  </div>
                )}
              </div>
            )}

            {item.caseStudyHighlights && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Key Achievements</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {item.caseStudyHighlights.map((highlight, idx) => (
                    <li key={idx} style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#00ff7f', fontSize: '1.2rem' }}>→</span>
                      <strong>{highlight}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.testimonial && (
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.05) 0%, rgba(0, 255, 127, 0.1) 100%)',
                padding: '2rem',
                borderRadius: '10px',
                border: '1px solid rgba(0, 255, 127, 0.3)',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Client Testimonial</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', fontStyle: 'italic', color: '#ffffff' }}>
                  "{item.testimonial}"
                </p>
              </div>
            )}

            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Key Takeaway</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                This case study showcases how strategic SEO combined with <strong style={{ color: '#00ff7f' }}>affiliate marketing expertise</strong> can 
                transform a health niche website into a profitable online business. By achieving top rankings for targeted keywords and securing 
                partnerships with major affiliate networks including Amazon and Google AdSense, we created a sustainable revenue model that 
                continues to grow month over month.
              </p>
            </div>
          </>
        );

      case 'shopper-personalizzate':
        return (
          <>
            {item.image && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>SEO Performance Overview</h3>
                <img 
                  src={item.image} 
                  alt={item.title}
                  onClick={() => setZoomedImage(item.image)}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '10px',
                    border: '2px solid rgba(0, 255, 127, 0.2)',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    marginBottom: '1rem'
                  }}
                  onMouseEnter={(e) => !isMobile && (e.target.style.transform = 'scale(1.02)')}
                  onMouseLeave={(e) => !isMobile && (e.target.style.transform = 'scale(1)')}
                />
                <p style={{
                  textAlign: 'center',
                  color: '#00ff7f',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  Click to view detailed metrics
                </p>
              </div>
            )}

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>The Challenge</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                Shopper-Personalizzate.it, an Italian e-commerce site specializing in custom shopping bags, needed to achieve 
                first-page rankings for specific high-value keywords provided by the client. The goal was to dominate search 
                results with not just rankings, but also featured snippets and sitelinks to maximize visibility.
              </p>
            </div>

            {item.seoMetrics && (
              <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.05)', padding: '2rem', borderRadius: '10px', border: '1px solid rgba(0, 255, 127, 0.2)' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#00ff7f' }}>Impressive SEO Metrics</h3>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2rem', marginBottom: '2rem' }}>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>DR {item.seoMetrics.domainRating}</h4>
                    <p style={{ color: '#ffffff' }}>Domain Rating</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>{item.seoMetrics.backlinks}</h4>
                    <p style={{ color: '#ffffff' }}>Quality Backlinks</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>{item.seoMetrics.referringDomains}</h4>
                    <p style={{ color: '#ffffff' }}>Referring Domains</p>
                  </div>
                </div>
                
                {item.seoMetrics.topRankings && (
                  <div style={{ background: 'rgba(0, 255, 127, 0.1)', padding: '1.5rem', borderRadius: '8px' }}>
                    <h4 style={{ color: '#00ff7f', marginBottom: '1rem' }}>Ranking Achievements</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#00ff7f', fontSize: '1.5rem' }}>🥇</span>
                        <span>First Position: {item.seoMetrics.topRankings.position1}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#00ff7f', fontSize: '1.5rem' }}>🥈</span>
                        <span>Second Position: {item.seoMetrics.topRankings.position2}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#00ff7f', fontSize: '1.5rem' }}>🥉</span>
                        <span>Third Position: {item.seoMetrics.topRankings.position3}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#00ff7f', fontSize: '1.5rem' }}>⭐</span>
                        <span>Featured Snippets: Achieved</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#00ff7f', fontSize: '1.5rem' }}>🔗</span>
                        <span>Google Sitelinks: Active</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {item.strategy && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>{item.strategy.title}</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: '#ffffff' }}>
                  {item.strategy.description}
                </p>
                {item.strategy.techniques && (
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '0.5rem' }}>
                    {item.strategy.techniques.map((technique, idx) => (
                      <div key={idx} style={{ 
                        padding: '0.75rem',
                        background: 'rgba(0, 255, 127, 0.05)',
                        border: '1px solid rgba(0, 255, 127, 0.2)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{ color: '#00ff7f' }}>✓</span>
                        <span style={{ fontSize: '0.95rem' }}>{technique}</span>
                      </div>
                    ))}
                  </div>
                )}
                {item.strategy.timeline && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <strong style={{ color: '#00ff7f' }}>Campaign Duration:</strong> {item.strategy.timeline}
                  </div>
                )}
              </div>
            )}

            {item.achievements && (
              <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.1)', padding: '2rem', borderRadius: '10px' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#00ff7f' }}>Major Achievements</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {item.achievements.map((achievement, idx) => (
                    <li key={idx} style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#00ff7f', fontSize: '1.2rem' }}>→</span>
                      <strong>{achievement}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.internationalSEO && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>International SEO Focus</h3>
                <div style={{ background: 'rgba(0, 255, 127, 0.05)', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(0, 255, 127, 0.2)' }}>
                  <p><strong style={{ color: '#00ff7f' }}>Target Market:</strong> {item.internationalSEO.targetMarket}</p>
                  <p><strong style={{ color: '#00ff7f' }}>Language:</strong> {item.internationalSEO.language}</p>
                  <p><strong style={{ color: '#00ff7f' }}>Strategy:</strong> {item.internationalSEO.localStrategy}</p>
                </div>
              </div>
            )}

            {item.testimonial && (
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.05) 0%, rgba(0, 255, 127, 0.1) 100%)',
                padding: '2rem',
                borderRadius: '10px',
                border: '1px solid rgba(0, 255, 127, 0.3)',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Client Success Story</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', fontStyle: 'italic', color: '#ffffff' }}>
                  "{item.testimonial}"
                </p>
              </div>
            )}

            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Key Takeaway</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                This case study demonstrates our ability to deliver <strong style={{ color: '#00ff7f' }}>complete SEO dominance</strong> in 
                competitive e-commerce markets. Through a comprehensive 6-month campaign, we not only achieved first-page rankings but also 
                secured featured snippets and sitelinks - the holy grail of SEO visibility. Our full SEO package approach ensures every aspect 
                of search optimization is covered, from technical foundations to advanced link building strategies.
              </p>
            </div>
          </>
        );

      case 'garden-plants-research':
        return (
          <>
            {(item.image || (item.additionalImages && item.additionalImages.length > 0)) && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Competitive Analysis & Market Research</h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
                  gap: isMobile ? '0.5rem' : '1rem',
                  marginBottom: '1.5rem'
                }}>
                  {[item.image, ...(item.additionalImages || [])].map((img, index) => (
                    <img 
                      key={index}
                      src={img} 
                      alt={`SEO Research ${index + 1}`}
                      onClick={() => setZoomedImage(img)}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        borderRadius: '10px',
                        border: '2px solid rgba(0, 255, 127, 0.2)',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => !isMobile && (e.target.style.transform = 'scale(1.02)')}
                      onMouseLeave={(e) => !isMobile && (e.target.style.transform = 'scale(1)')}
                    />
                  ))}
                </div>
                <p style={{
                  textAlign: 'center',
                  color: '#00ff7f',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  Click images to view detailed competitor metrics
                </p>
              </div>
            )}

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>The Research Objective</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                Conduct comprehensive SEO keyword research and competitive analysis for the garden plants and flowers industry. 
                Analyze 10+ major competitors to identify market gaps, keyword opportunities, and strategic entry points for 
                dominating the gardening niche.
              </p>
            </div>

            {item.competitorAnalysis && (
              <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.05)', padding: '2rem', borderRadius: '10px', border: '1px solid rgba(0, 255, 127, 0.2)' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#00ff7f' }}>Top Competitor Analysis: {item.competitorAnalysis.topCompetitor}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.competitorAnalysis.competitorMetrics.organicTraffic}</h4>
                    <p style={{ color: '#ffffff' }}>Organic Traffic</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.competitorAnalysis.competitorMetrics.keywords}</h4>
                    <p style={{ color: '#ffffff' }}>Keywords Ranked</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.competitorAnalysis.competitorMetrics.trafficValue}</h4>
                    <p style={{ color: '#ffffff' }}>Traffic Value</p>
                  </div>
                </div>
                
                <h4 style={{ color: '#00ff7f', marginBottom: '1rem' }}>Market Leaders Analyzed</h4>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid rgba(0, 255, 127, 0.3)' }}>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: '#00ff7f' }}>Competitor</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: '#00ff7f' }}>Keywords</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: '#00ff7f' }}>Traffic</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: '#00ff7f' }}>Competition Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.competitorAnalysis.marketLeaders.map((leader, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(0, 255, 127, 0.1)' }}>
                          <td style={{ padding: '0.75rem', color: '#ffffff' }}>{leader.name}</td>
                          <td style={{ padding: '0.75rem', color: '#ffffff' }}>{leader.keywords}</td>
                          <td style={{ padding: '0.75rem', color: '#ffffff' }}>{leader.traffic}</td>
                          <td style={{ padding: '0.75rem', color: '#ffffff' }}>
                            <span style={{
                              padding: '0.25rem 0.5rem',
                              background: 'rgba(0, 255, 127, 0.1)',
                              borderRadius: '4px',
                              fontSize: '0.9rem'
                            }}>
                              {leader.level}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {item.researchFindings && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Target Client Analysis: {item.researchFindings.targetClient}</h3>
                <div style={{ background: 'rgba(0, 255, 127, 0.1)', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#00ff7f', marginBottom: '1rem' }}>Current Performance Metrics</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '1rem' }}>
                    <div><strong>Organic Traffic:</strong> {item.researchFindings.currentMetrics.organicTraffic}</div>
                    <div><strong>Keywords Ranked:</strong> {item.researchFindings.currentMetrics.keywords}</div>
                    <div><strong>Backlinks:</strong> {item.researchFindings.currentMetrics.backlinks}</div>
                    <div><strong>Traffic Value:</strong> {item.researchFindings.currentMetrics.trafficValue}</div>
                  </div>
                </div>
                
                <h4 style={{ color: '#00ff7f', marginBottom: '1rem' }}>Identified Opportunities</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {item.researchFindings.opportunities.map((opportunity, idx) => (
                    <li key={idx} style={{ marginBottom: '0.75rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                      {opportunity}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.keyInsights && (
              <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.05)', padding: '2rem', borderRadius: '10px' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#00ff7f' }}>Key Market Insights</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {item.keyInsights.map((insight, idx) => (
                    <div key={idx} style={{
                      padding: '1rem',
                      background: 'rgba(0, 255, 127, 0.1)',
                      borderLeft: '3px solid #00ff7f',
                      borderRadius: '4px'
                    }}>
                      {insight}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.deliverables && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Research Deliverables</h3>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  {item.deliverables.map((deliverable, idx) => (
                    <div key={idx} style={{
                      padding: '0.75rem',
                      background: 'rgba(0, 255, 127, 0.05)',
                      border: '1px solid rgba(0, 255, 127, 0.2)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ color: '#00ff7f' }}>📊</span>
                      {deliverable}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Research Impact</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                This comprehensive SEO research project provided <strong style={{ color: '#00ff7f' }}>actionable market intelligence</strong> for 
                the garden industry. By analyzing over 454,000 competitor keywords and identifying strategic gaps, we created a roadmap for 
                achieving competitive advantage in a market dominated by established players with millions in monthly traffic.
              </p>
            </div>
          </>
        );

      case 'scottish-attire-affiliate':
        return (
          <>
            {(item.image || (item.additionalImages && item.additionalImages.length > 0)) && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>SEO Performance & Rankings</h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))', 
                  gap: isMobile ? '0.5rem' : '1rem',
                  marginBottom: '1.5rem'
                }}>
                  {[item.image, ...(item.additionalImages || [])].map((img, index) => (
                    <img 
                      key={index}
                      src={img} 
                      alt={`SEO Performance ${index + 1}`}
                      onClick={() => setZoomedImage(img)}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        borderRadius: '10px',
                        border: '2px solid rgba(0, 255, 127, 0.2)',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => !isMobile && (e.target.style.transform = 'scale(1.02)')}
                      onMouseLeave={(e) => !isMobile && (e.target.style.transform = 'scale(1)')}
                    />
                  ))}
                </div>
                <p style={{
                  textAlign: 'center',
                  color: '#00ff7f',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  Click images to view detailed performance metrics
                </p>
              </div>
            )}

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>The Challenge</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                ScottishAttire.com, an American-based fashion affiliate website specializing in Scottish apparel and cultural products, 
                needed to improve organic visibility and drive affiliate conversions through strategic SEO optimization in the competitive 
                fashion and apparel industry.
              </p>
            </div>

            {item.seoMetrics && (
              <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.05)', padding: '2rem', borderRadius: '10px', border: '1px solid rgba(0, 255, 127, 0.2)' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#00ff7f' }}>SEO Metrics & Rankings</h3>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>{item.seoMetrics.organicKeywords}</h4>
                    <p style={{ color: '#ffffff' }}>Keywords Ranked</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>{item.seoMetrics.organicTraffic}</h4>
                    <p style={{ color: '#ffffff' }}>Organic Traffic</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>{item.seoMetrics.backlinks}</h4>
                    <p style={{ color: '#ffffff' }}>Quality Backlinks</p>
                  </div>
                </div>
                
                {item.seoMetrics.topRankings && (
                  <div>
                    <h4 style={{ color: '#00ff7f', marginBottom: '1rem' }}>Top Keyword Rankings</h4>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid rgba(0, 255, 127, 0.3)' }}>
                            <th style={{ padding: '0.75rem', textAlign: 'left', color: '#00ff7f' }}>Keyword</th>
                            <th style={{ padding: '0.75rem', textAlign: 'center', color: '#00ff7f' }}>Position</th>
                            <th style={{ padding: '0.75rem', textAlign: 'right', color: '#00ff7f' }}>Volume</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.seoMetrics.topRankings.map((ranking, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid rgba(0, 255, 127, 0.1)' }}>
                              <td style={{ padding: '0.75rem', color: '#ffffff' }}>{ranking.keyword}</td>
                              <td style={{ padding: '0.75rem', textAlign: 'center', color: '#ffffff' }}>
                                <span style={{
                                  padding: '0.25rem 0.5rem',
                                  background: ranking.position <= 3 ? 'rgba(0, 255, 127, 0.2)' : 'rgba(0, 255, 127, 0.1)',
                                  border: ranking.position <= 3 ? '1px solid #00ff7f' : '1px solid rgba(0, 255, 127, 0.3)',
                                  borderRadius: '4px',
                                  fontWeight: ranking.position <= 3 ? 'bold' : 'normal',
                                  color: ranking.position <= 3 ? '#00ff7f' : '#ffffff'
                                }}>
                                  #{ranking.position}
                                </span>
                              </td>
                              <td style={{ padding: '0.75rem', textAlign: 'right', color: '#ffffff' }}>{ranking.volume}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {item.affiliateStrategy && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>{item.affiliateStrategy.title}</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: '#ffffff' }}>
                  {item.affiliateStrategy.description}
                </p>
                
                <h4 style={{ color: '#00ff7f', marginBottom: '1rem' }}>Affiliate Networks</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                  {item.affiliateStrategy.networks.map((network, idx) => (
                    <span key={idx} style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(0, 255, 127, 0.1)',
                      border: '1px solid rgba(0, 255, 127, 0.3)',
                      borderRadius: '20px'
                    }}>
                      {network}
                    </span>
                  ))}
                </div>
                
                <h4 style={{ color: '#00ff7f', marginBottom: '1rem' }}>SEO Techniques</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {item.affiliateStrategy.techniques.map((technique, idx) => (
                    <li key={idx} style={{ marginBottom: '0.75rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                      {technique}
                    </li>
                  ))}
                </ul>
                {item.affiliateStrategy.timeline && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <strong style={{ color: '#00ff7f' }}>Campaign Duration:</strong> {item.affiliateStrategy.timeline}
                  </div>
                )}
              </div>
            )}

            {item.performanceHighlights && (
              <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.1)', padding: '2rem', borderRadius: '10px' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#00ff7f' }}>Performance Highlights</h3>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.performanceHighlights.totalPages}</h4>
                    <p style={{ color: '#ffffff' }}>Optimized Pages</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.performanceHighlights.totalTraffic}</h4>
                    <p style={{ color: '#ffffff' }}>Monthly Visitors</p>
                  </div>
                </div>
                
                <h4 style={{ color: '#00ff7f', marginBottom: '1rem' }}>Top Performing Pages</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {item.performanceHighlights.topPerformingPages.slice(0, 3).map((page, idx) => (
                    <li key={idx} style={{ 
                      marginBottom: '0.75rem',
                      padding: '0.75rem',
                      background: 'rgba(0, 255, 127, 0.05)',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ flex: 1 }}>{page.url}</span>
                      <span style={{ color: '#00ff7f', marginLeft: '1rem' }}>{page.traffic} visits</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.contentStrategy && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Content Strategy</h3>
                <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontStyle: 'italic' }}>Focus: {item.contentStrategy.focus}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {item.contentStrategy.topics.map((topic, idx) => (
                    <div key={idx} style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(0, 255, 127, 0.05)',
                      border: '1px solid rgba(0, 255, 127, 0.3)',
                      borderRadius: '8px'
                    }}>
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.testimonial && (
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.05) 0%, rgba(0, 255, 127, 0.1) 100%)',
                padding: '2rem',
                borderRadius: '10px',
                border: '1px solid rgba(0, 255, 127, 0.3)',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Client Testimonial</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', fontStyle: 'italic', color: '#ffffff' }}>
                  "{item.testimonial}"
                </p>
              </div>
            )}

            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Key Takeaway</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                This case study demonstrates the power of <strong style={{ color: '#00ff7f' }}>affiliate-focused SEO</strong> in the fashion industry. 
                By targeting high-intent buyer keywords and optimizing for cultural fashion content, we achieved top rankings that drive both 
                traffic and affiliate conversions, proving that niche authority can compete with larger competitors.
              </p>
            </div>
          </>
        );

      case 'scott-smith':
        return (
          <>
            {(item.image || (item.additionalImages && item.additionalImages.length > 0)) && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>The Wide Net Strategy Case Study</h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
                  gap: isMobile ? '0.5rem' : '1rem',
                  marginBottom: '1.5rem'
                }}>
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      onClick={() => setZoomedImage(item.image)}
                      style={{
                        width: '100%',
                        height: isMobile ? 'auto' : '200px',
                        objectFit: 'contain',
                        background: '#0d1117',
                        borderRadius: '10px',
                        border: '2px solid rgba(0, 255, 127, 0.2)',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => !isMobile && (e.target.style.transform = 'scale(1.02)')}
                      onMouseLeave={(e) => !isMobile && (e.target.style.transform = 'scale(1)')}
                    />
                  )}
                  {item.additionalImages?.map((img, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                      <img 
                        src={img} 
                        alt={`Scott Smith Case Study Slide ${index + 1}`}
                        onClick={() => setZoomedImage(img)}
                        style={{
                          width: '100%',
                          height: isMobile ? 'auto' : '200px',
                          objectFit: 'contain',
                          background: '#0d1117',
                          borderRadius: '10px',
                          border: '2px solid rgba(0, 255, 127, 0.2)',
                          cursor: 'pointer',
                          transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={(e) => !isMobile && (e.target.style.transform = 'scale(1.02)')}
                        onMouseLeave={(e) => !isMobile && (e.target.style.transform = 'scale(1)')} 
                      />
                    </div>
                  ))}
                </div>
                <p style={{
                  textAlign: 'center',
                  color: '#00ff7f',
                  fontSize: '0.9rem',
                  marginBottom: '1rem',
                  fontWeight: 'bold'
                }}>
                  Click to view full image
                </p>
              </div>
            )}

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>The Challenge</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                Scott Smith from Royal Legal Solutions operated in a highly competitive legal industry where lead quality 
                and long-term customer relationships are crucial. The market was saturated with competitors, making it 
                difficult to stand out. They needed high-quality leads with purchase intent to generate long-term annual 
                recurring revenue (ARR) with an average order value of $20,000.
              </p>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Our Wide Net Strategy</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: '#ffffff' }}>
                We implemented a comprehensive approach combining multiple strategic elements:
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  <strong>Content Creation & SEO:</strong> Developed highly optimized talking head videos with strategic SEO practices
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  <strong>Personal Brand Enhancement:</strong> Featured Scott's face across all content to boost memorability and trust
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  <strong>The Fishing Net Strategy:</strong> Cast a wide, calculated net generating 50M+ views on top content
                </li>
                <li style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                  <strong>Lead Qualification & Automation:</strong> Built proprietary systems to qualify and nurture high-quality leads
                </li>
              </ul>
            </div>

            <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.1)', padding: '2rem', borderRadius: '10px' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#00ff7f' }}>Exceptional Results</h3>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2rem' }}>
                <div>
                  <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>700+</h4>
                  <p style={{ color: '#ffffff' }}>Qualified Leads Generated</p>
                </div>
                <div>
                  <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>$20,000</h4>
                  <p style={{ color: '#ffffff' }}>Average Order Value</p>
                </div>
                <div>
                  <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>70M+</h4>
                  <p style={{ color: '#ffffff' }}>Total Views Achieved</p>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Key Takeaway</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                Our Wide Net Strategy proved that with the right combination of viral content, personal branding, and 
                sophisticated automation, it's possible to generate <strong style={{ color: '#00ff7f' }}>high-ticket B2B leads 
                at scale</strong>. By casting multiple content "nets" that reached millions, we captured qualified leads who 
                filled forms and converted into long-term ARR. This case demonstrates how multi-platform strategies, targeted 
                content, and advanced automations can drive substantial business growth in even the most competitive industries.
              </p>
            </div>
          </>
        );

      case 'shih-tzu-affiliate':
        return (
          <>
            {(item.image || (item.additionalImages && item.additionalImages.length > 0)) && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>SEO Performance & Keyword Rankings</h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : item.additionalImages?.length > 0 ? 'repeat(2, 1fr)' : '1fr', 
                  gap: isMobile ? '0.5rem' : '1rem',
                  marginBottom: '1.5rem'
                }}>
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      onClick={() => setZoomedImage(item.image)}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        borderRadius: '10px',
                        border: '2px solid rgba(0, 255, 127, 0.2)',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => !isMobile && (e.target.style.transform = 'scale(1.02)')}
                      onMouseLeave={(e) => !isMobile && (e.target.style.transform = 'scale(1)')}
                    />
                  )}
                  {item.additionalImages?.map((img, index) => (
                    <img 
                      key={index}
                      src={img} 
                      alt={`Keyword Rankings ${index + 1}`}
                      onClick={() => setZoomedImage(img)}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        borderRadius: '10px',
                        border: '2px solid rgba(0, 255, 127, 0.2)',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => !isMobile && (e.target.style.transform = 'scale(1.02)')}
                      onMouseLeave={(e) => !isMobile && (e.target.style.transform = 'scale(1)')}
                    />
                  ))}
                </div>
                <p style={{
                  textAlign: 'center',
                  color: '#00ff7f',
                  fontSize: '0.9rem',
                  marginBottom: '1rem',
                  fontWeight: 'bold'
                }}>
                  Click images to view full SEO analytics
                </p>
              </div>
            )}

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>The Challenge</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                Building a focused affiliate marketing website in the competitive pet niche, specifically targeting 
                Shih Tzu owners and enthusiasts. The goal was to establish authority, rank for targeted keywords, 
                and create sustainable affiliate revenue streams through strategic content and SEO.
              </p>
            </div>

            {item.seoMetrics && (
              <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.05)', padding: '2rem', borderRadius: '10px', border: '1px solid rgba(0, 255, 127, 0.2)' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#00ff7f' }}>SEO Performance Metrics</h3>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2rem' }}>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>{item.seoMetrics.organicKeywords}</h4>
                    <p style={{ color: '#ffffff' }}>Organic Keywords</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>{item.seoMetrics.backlinks}</h4>
                    <p style={{ color: '#ffffff' }}>Quality Backlinks</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>AS: {item.seoMetrics.authorityScore}</h4>
                    <p style={{ color: '#ffffff' }}>Authority Score</p>
                  </div>
                </div>
                
                {item.seoMetrics.competitiveAnalysis && (
                  <div style={{ marginTop: '2rem' }}>
                    <h4 style={{ color: '#00ff7f', marginBottom: '1rem' }}>Competitive Positioning</h4>
                    <p style={{ color: '#ffffff', marginBottom: '0.5rem' }}>
                      • Tracking {item.seoMetrics.competitiveAnalysis.mainCompetitors} main competitors
                    </p>
                    <p style={{ color: '#ffffff', marginBottom: '0.5rem' }}>
                      • {item.seoMetrics.competitiveAnalysis.positionDistribution}
                    </p>
                    <p style={{ color: '#ffffff' }}>
                      • {item.seoMetrics.topRankings}
                    </p>
                  </div>
                )}
              </div>
            )}

            {item.keywordStrategy && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Keyword Strategy & Rankings</h3>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '2rem' }}>
                  <div>
                    <h4 style={{ color: '#00ff7f', marginBottom: '0.5rem' }}>Position Distribution</h4>
                    <div style={{ background: 'rgba(0, 255, 127, 0.05)', padding: '1rem', borderRadius: '8px' }}>
                      <p style={{ marginBottom: '0.5rem' }}>
                        <strong style={{ color: '#00ff7f' }}>Top 3:</strong> {item.keywordStrategy.topPositions.position1to3}
                      </p>
                      <p style={{ marginBottom: '0.5rem' }}>
                        <strong style={{ color: '#00ff7f' }}>Top 10:</strong> {item.keywordStrategy.topPositions.position4to10}
                      </p>
                      <p>
                        <strong style={{ color: '#00ff7f' }}>11-20:</strong> {item.keywordStrategy.topPositions.position11to20}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 style={{ color: '#00ff7f', marginBottom: '0.5rem' }}>Keyword Types Targeted</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {item.keywordStrategy.keywordTypes?.map((type, idx) => (
                        <li key={idx} style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative', color: '#ffffff' }}>
                          <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                          {type}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {item.affiliateStrategy && (
              <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.05)', padding: '2rem', borderRadius: '10px', border: '1px solid rgba(0, 255, 127, 0.2)' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#00ff7f' }}>Affiliate Marketing Strategy</h3>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '2rem' }}>
                  <div>
                    <h4 style={{ color: '#00ff7f', marginBottom: '0.5rem' }}>Content Focus Areas</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {item.affiliateStrategy.contentFocus?.map((focus, idx) => (
                        <li key={idx} style={{ marginBottom: '0.5rem', color: '#ffffff', fontSize: '0.95rem' }}>
                          • {focus}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ color: '#00ff7f', marginBottom: '0.5rem' }}>Monetization Methods</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {item.affiliateStrategy.monetization?.map((method, idx) => (
                        <li key={idx} style={{ marginBottom: '0.5rem', color: '#ffffff', fontSize: '0.95rem' }}>
                          • {method}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                  <strong style={{ color: '#00ff7f' }}>Niche Focus:</strong> {item.affiliateStrategy.niche}
                </div>
              </div>
            )}

            {item.competitorInsights && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Competitor Analysis Insights</h3>
                <p style={{ marginBottom: '1rem' }}>
                  <strong style={{ color: '#00ff7f' }}>{item.competitorInsights.tracked}</strong> being monitored for strategic opportunities
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {item.competitorInsights.analysis?.map((insight, idx) => (
                    <li key={idx} style={{ marginBottom: '0.75rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>→</span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.backlinksProfile && (
              <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.1)', padding: '2rem', borderRadius: '10px' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#00ff7f' }}>Link Building Profile</h3>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '2rem' }}>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.backlinksProfile.total}</h4>
                    <p style={{ color: '#ffffff', marginBottom: '0.5rem' }}>From {item.backlinksProfile.referringDomains} unique domains</p>
                    <p style={{ color: '#ffffff', fontSize: '0.9rem' }}>{item.backlinksProfile.quality}</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#00ff7f', marginBottom: '0.5rem' }}>Link Building Strategy</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {item.backlinksProfile.strategy?.map((strategy, idx) => (
                        <li key={idx} style={{ marginBottom: '0.5rem', color: '#ffffff', fontSize: '0.95rem' }}>
                          • {strategy}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {item.contentHighlights && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Content Excellence</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  {item.contentHighlights.map((highlight, idx) => (
                    <div key={idx} style={{
                      padding: '0.75rem 1.5rem',
                      background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 255, 127, 0.05) 100%)',
                      borderRadius: '25px',
                      border: '1px solid rgba(0, 255, 127, 0.3)'
                    }}>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.caseStudyHighlights && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Project Achievements</h3>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '1rem' }}>
                  {item.caseStudyHighlights.map((highlight, idx) => (
                    <div key={idx} style={{
                      padding: '1rem',
                      background: 'rgba(0, 255, 127, 0.05)',
                      borderRadius: '8px',
                      borderLeft: '3px solid #00ff7f'
                    }}>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.testimonial && (
              <div style={{ 
                marginTop: '2rem',
                padding: '2rem',
                background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 255, 127, 0.05) 100%)',
                borderRadius: '10px',
                borderLeft: '4px solid #00ff7f'
              }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#00ff7f' }}>Client Testimonial</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', fontStyle: 'italic', color: '#ffffff' }}>
                  "{item.testimonial}"
                </p>
              </div>
            )}
          </>
        );

      case 'german-shepherd-affiliate':
        return (
          <>
            {(item.image || (item.additionalImages && item.additionalImages.length > 0)) && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Analytics & Performance Metrics</h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
                  gap: isMobile ? '0.5rem' : '1rem',
                  marginBottom: '1.5rem'
                }}>
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      onClick={() => setZoomedImage(item.image)}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        borderRadius: '10px',
                        border: '2px solid rgba(0, 255, 127, 0.2)',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => !isMobile && (e.target.style.transform = 'scale(1.02)')}
                      onMouseLeave={(e) => !isMobile && (e.target.style.transform = 'scale(1)')}
                    />
                  )}
                  {item.additionalImages?.map((img, index) => (
                    <img 
                      key={index}
                      src={img} 
                      alt={`Analytics ${index + 1}`}
                      onClick={() => setZoomedImage(img)}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        borderRadius: '10px',
                        border: '2px solid rgba(0, 255, 127, 0.2)',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => !isMobile && (e.target.style.transform = 'scale(1.02)')}
                      onMouseLeave={(e) => !isMobile && (e.target.style.transform = 'scale(1)')}
                    />
                  ))}
                </div>
                <p style={{
                  textAlign: 'center',
                  color: '#00ff7f',
                  fontSize: '0.9rem',
                  marginBottom: '1rem',
                  fontWeight: 'bold'
                }}>
                  Click images to view full analytics dashboards
                </p>
              </div>
            )}

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>The Challenge</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ffffff' }}>
                Building a successful Amazon affiliate website in the highly competitive dog and pet niche. 
                The goal was to create an authoritative resource focusing on German Shepherds while monetizing 
                through Amazon Associates and Google AdSense, targeting the lucrative US market.
              </p>
            </div>

            {item.seoMetrics && (
              <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.05)', padding: '2rem', borderRadius: '10px', border: '1px solid rgba(0, 255, 127, 0.2)' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#00ff7f' }}>Key Performance Metrics</h3>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2rem' }}>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>{item.seoMetrics.organicKeywords}</h4>
                    <p style={{ color: '#ffffff' }}>Keywords Ranked</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>{item.seoMetrics.organicTraffic}</h4>
                    <p style={{ color: '#ffffff' }}>Monthly Traffic</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#00ff7f', fontSize: '2rem', marginBottom: '0.5rem' }}>{item.seoMetrics.trafficValue}</h4>
                    <p style={{ color: '#ffffff' }}>Traffic Value</p>
                  </div>
                </div>
                
                {item.seoMetrics.topCountries && (
                  <div style={{ marginTop: '2rem' }}>
                    <h4 style={{ color: '#00ff7f', marginBottom: '1rem' }}>Geographic Distribution</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                      {item.seoMetrics.topCountries.map((country, idx) => (
                        <div key={idx} style={{
                          padding: '0.5rem 1rem',
                          background: 'rgba(0, 255, 127, 0.1)',
                          borderRadius: '8px',
                          border: '1px solid rgba(0, 255, 127, 0.3)'
                        }}>
                          <strong style={{ color: '#00ff7f' }}>{country.country}:</strong> {country.percentage} ({country.keywords} keywords)
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {item.affiliateSuccess && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Monetization Strategy</h3>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '2rem' }}>
                  <div>
                    <h4 style={{ color: '#00ff7f', marginBottom: '0.5rem' }}>Revenue Streams</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {item.affiliateSuccess.networks?.map((network, idx) => (
                        <li key={idx} style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative', color: '#ffffff' }}>
                          <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                          {network}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ color: '#00ff7f', marginBottom: '0.5rem' }}>Content Volume</h4>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00ff7f' }}>{item.affiliateSuccess.contentVolume}</p>
                    <p style={{ color: '#ffffff' }}>Targeting: {item.affiliateSuccess.targetMarket}</p>
                    <p style={{ color: '#ffffff' }}>Niche: {item.affiliateSuccess.niche}</p>
                  </div>
                </div>
              </div>
            )}

            {item.contentTypes && (
              <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.05)', padding: '2rem', borderRadius: '10px', border: '1px solid rgba(0, 255, 127, 0.2)' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#00ff7f' }}>Content Strategy Breakdown</h3>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '2rem' }}>
                  {Object.entries(item.contentTypes).map(([type, items]) => (
                    <div key={type}>
                      <h4 style={{ color: '#00ff7f', marginBottom: '0.5rem', textTransform: 'capitalize' }}>{type} Content</h4>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {items.map((contentItem, idx) => (
                          <li key={idx} style={{ marginBottom: '0.5rem', color: '#ffffff', fontSize: '0.95rem' }}>
                            • {contentItem}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.strategy && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>{item.strategy.title}</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: '#ffffff' }}>
                  {item.strategy.description}
                </p>
                {item.strategy.techniques && (
                  <div style={{ background: 'rgba(0, 255, 127, 0.05)', padding: '1.5rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
                    <h4 style={{ color: '#00ff7f', marginBottom: '1rem' }}>Implementation Techniques</h4>
                    <ul style={{ listStyle: 'none', padding: 0, columns: isMobile ? 1 : 2, columnGap: '2rem' }}>
                      {item.strategy.techniques.map((technique, idx) => (
                        <li key={idx} style={{ marginBottom: '0.75rem', paddingLeft: '1.5rem', position: 'relative', breakInside: 'avoid', color: '#ffffff' }}>
                          <span style={{ position: 'absolute', left: 0, color: '#00ff7f' }}>✓</span>
                          {technique}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  {item.strategy.timeline && (
                    <div>
                      <strong style={{ color: '#00ff7f' }}>Timeline:</strong> {item.strategy.timeline}
                    </div>
                  )}
                  {item.strategy.priceRange && (
                    <div>
                      <strong style={{ color: '#00ff7f' }}>Investment:</strong> {item.strategy.priceRange}
                    </div>
                  )}
                </div>
              </div>
            )}

            {item.competitiveAdvantages && (
              <div style={{ marginBottom: '3rem', background: 'rgba(0, 255, 127, 0.1)', padding: '2rem', borderRadius: '10px' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#00ff7f' }}>Competitive Advantages</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {item.competitiveAdvantages.map((advantage, idx) => (
                    <li key={idx} style={{ marginBottom: '1rem', paddingLeft: '2rem', position: 'relative', color: '#ffffff' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#00ff7f', fontSize: '1.2rem' }}>★</span>
                      <strong>{advantage}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.caseStudyHighlights && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#00ff7f' }}>Results Summary</h3>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '1rem' }}>
                  {item.caseStudyHighlights.map((highlight, idx) => (
                    <div key={idx} style={{
                      padding: '1rem',
                      background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.05) 0%, rgba(0, 255, 127, 0.02) 100%)',
                      borderRadius: '8px',
                      borderLeft: '3px solid #00ff7f'
                    }}>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.testimonial && (
              <div style={{ 
                marginTop: '2rem',
                padding: '2rem',
                background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 255, 127, 0.05) 100%)',
                borderRadius: '10px',
                borderLeft: '4px solid #00ff7f'
              }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#00ff7f' }}>Client Testimonial</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', fontStyle: 'italic', color: '#ffffff' }}>
                  "{item.testimonial}"
                </p>
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Image Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            onClick={() => setZoomedImage(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(20px)',
              zIndex: 20000,
              cursor: 'zoom-out',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
          >
            <motion.img
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              src={zoomedImage}
              alt="Zoomed view"
              style={{
                maxWidth: '90%',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: '10px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)'
              }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setZoomedImage(null);
              }}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '24px',
                color: '#ffffff',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 255, 127, 0.3)';
                e.currentTarget.style.color = '#00ff7f';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Portfolio Modal */}
      <AnimatePresence mode="wait">
        {isOpen && (
        <>
          {/* Full screen container that handles backdrop clicks */}
          <div
            onClick={(e) => {
              // Only close if clicking on the backdrop itself
              if (e.target === e.currentTarget) {
                onClose();
              }
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(10px)',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
          
          {/* Modal content wrapper */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: isMobile ? '95%' : '90%',
              maxWidth: '1000px',
              height: isMobile ? '90vh' : '85vh',
              maxHeight: isMobile ? '90vh' : '85vh',
              cursor: 'default'
            }}
          >
          {/* Navigation Buttons - Hide on mobile for swipe navigation */}
          {isOpen && !isMobile && (
            <>
              {/* Left Navigation Button */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '-80px',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0, 255, 127, 0.1)',
                  border: '2px solid rgba(0, 255, 127, 0.3)',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  color: '#00ff7f',
                  fontSize: '24px',
                  zIndex: 10001
                }}
                title="Previous Case Study"
              >
                ←
              </motion.button>

              {/* Right Navigation Button */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '-80px',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0, 255, 127, 0.1)',
                  border: '2px solid rgba(0, 255, 127, 0.3)',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  color: '#00ff7f',
                  fontSize: '24px',
                  zIndex: 10001
                }}
                title="Next Case Study"
              >
                →
              </motion.button>
            </>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(13, 17, 23, 0.98) 0%, rgba(22, 27, 34, 0.98) 100%)',
              border: '2px solid rgba(0, 255, 127, 0.3)',
              borderRadius: '20px',
              padding: 0,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
              cursor: 'default',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Close Button */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 100
            }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  color: '#ffffff'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 127, 0.2)';
                  e.currentTarget.style.color = '#00ff7f';
                  e.currentTarget.style.transform = 'rotate(90deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'rotate(0deg)';
                }}
              >
                ✕
              </button>
            </div>

            <div style={{
              padding: isMobile ? '2rem 1.5rem' : '3rem',
              overflowY: 'auto',
              flex: 1,
              overscrollBehavior: 'contain'
            }}>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                fontSize: isMobile ? '1.5rem' : '2.5rem',
                fontWeight: '800',
                marginBottom: '0.5rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {item.title}
              </h2>
              <p style={{ color: '#00ff7f', fontSize: isMobile ? '1rem' : '1.2rem' }}>{item.client}</p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem',
                flexWrap: 'wrap',
                marginBottom: '1rem'
              }}>
                {item.tags?.map((tag, index) => (
                  <span key={index} style={{
                    padding: '0.25rem 0.75rem',
                    background: 'rgba(0, 255, 127, 0.1)',
                    border: '1px solid rgba(0, 255, 127, 0.3)',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    color: '#00ff7f'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ 
              color: '#ffffff',
              fontSize: '1rem',
              lineHeight: '1.8'
            }}>
              {renderDetailedContent()}
            </div>
            
            </div>
          </motion.div>
          </div>
          
          {/* Instagram-style indicator dots for mobile */}
          {isMobile && portfolioItems.length > 1 && (
            <div 
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px',
                padding: '8px 12px',
                background: 'rgba(0, 0, 0, 0.6)',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                zIndex: 10002
              }}>
              {portfolioItems.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: index === currentIndex ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: index === currentIndex ? '#00ff7f' : 'rgba(255, 255, 255, 0.5)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(portfolioItems[index]);
                  }}
                />
              ))}
            </div>
          )}
          </div>
        </>
      )}
    </AnimatePresence>
    </>
  );
};

export default PortfolioModal;