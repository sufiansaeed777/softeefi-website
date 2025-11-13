import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import LazyImage from '../../components/LazyImage';

// Icons for Video Production Services
const VideoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7"></polygon>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
  </svg>
);

const FilmIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
    <line x1="7" y1="2" x2="7" y2="22"></line>
    <line x1="17" y1="2" x2="17" y2="22"></line>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <line x1="2" y1="7" x2="7" y2="7"></line>
    <line x1="2" y1="17" x2="7" y2="17"></line>
    <line x1="17" y1="17" x2="22" y2="17"></line>
    <line x1="17" y1="7" x2="22" y2="7"></line>
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const AnimationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 9.96l4.24 4.24M12 23l-4.24-4.24M22.46 14.04l-4.24-4.24"></path>
  </svg>
);

const MusicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13"></path>
    <circle cx="6" cy="18" r="3"></circle>
    <circle cx="18" cy="16" r="3"></circle>
  </svg>
);

const StreamIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3v18"></path>
    <rect x="6" y="8" width="12" height="8" rx="1"></rect>
    <path d="M22 3v18"></path>
  </svg>
);

// Benefit Icons
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polygon points="10 8 16 12 10 16 10 8"></polygon>
  </svg>
);

const TrendingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>
);

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const VideoProduction = () => {
  const [activeService, setActiveService] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('all');
  const { scrollY } = useScroll();
  const containerRef = useRef(null);

  // Parallax effects
  const headerY = useTransform(scrollY, [0, 300], [0, -50]);
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  // Video Production Services
  const services = [
    {
      icon: <VideoIcon />,
      title: "Corporate Videos",
      description: "Professional corporate videos for presentations, training, and marketing",
      features: ["Company Profiles", "Training Videos", "Product Demos", "Testimonials"],
      color: "#00ff7f"
    },
    {
      icon: <FilmIcon />,
      title: "Commercials",
      description: "Creative commercial production for TV, web, and social media",
      features: ["TV Commercials", "Web Ads", "Social Media Ads", "Brand Films"],
      color: "#ff00ff"
    },
    {
      icon: <EditIcon />,
      title: "Video Editing",
      description: "Professional post-production and video editing services",
      features: ["Color Grading", "Sound Design", "Visual Effects", "Motion Graphics"],
      color: "#00ffff"
    },
    {
      icon: <AnimationIcon />,
      title: "Animation",
      description: "2D and 3D animation for explainer videos and presentations",
      features: ["2D Animation", "3D Animation", "Explainer Videos", "Infographics"],
      color: "#ffff00"
    },
    {
      icon: <MusicIcon />,
      title: "Music Videos",
      description: "Creative music video production and direction",
      features: ["Concept Development", "Production", "Post-Production", "Color Grading"],
      color: "#ff7f00"
    },
    {
      icon: <StreamIcon />,
      title: "Live Streaming",
      description: "Professional live streaming and event coverage",
      features: ["Event Coverage", "Webinars", "Virtual Events", "Multi-Camera Setup"],
      color: "#7f00ff"
    }
  ];

  // Portfolio items
  const portfolioItems = [
    {
      id: 1,
      title: "Tech Company Brand Film",
      category: "corporate",
      thumbnail: "/images/video/corporate-1.webp",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "A compelling brand story showcasing innovation and company culture",
      duration: "3:45"
    },
    {
      id: 2,
      title: "Product Launch Commercial",
      category: "commercial",
      thumbnail: "/images/video/commercial-1.webp",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "High-energy commercial for new product launch",
      duration: "0:30"
    },
    {
      id: 3,
      title: "Animated Explainer",
      category: "animation",
      thumbnail: "/images/video/animation-1.webp",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "2D animated explainer video for SaaS platform",
      duration: "2:15"
    },
    {
      id: 4,
      title: "Music Video - Urban Dreams",
      category: "music",
      thumbnail: "/images/video/music-1.webp",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Cinematic music video with urban aesthetics",
      duration: "4:12"
    },
    {
      id: 5,
      title: "Virtual Conference Stream",
      category: "streaming",
      thumbnail: "/images/video/stream-1.webp",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Multi-camera live stream for international conference",
      duration: "Live"
    },
    {
      id: 6,
      title: "Documentary Short",
      category: "corporate",
      thumbnail: "/images/video/docu-1.webp",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Documentary showcasing social impact initiative",
      duration: "8:30"
    }
  ];

  // Filter portfolio by category
  const filteredPortfolio = useMemo(() => {
    if (currentCategory === 'all') return portfolioItems;
    return portfolioItems.filter(item => item.category === currentCategory);
  }, [currentCategory]);

  // Benefits of Video Production
  const benefits = [
    {
      icon: <PlayIcon />,
      title: "Engaging Content",
      description: "Create compelling visual stories that captivate your audience and deliver your message effectively"
    },
    {
      icon: <TrendingIcon />,
      title: "Increased Reach",
      description: "Video content gets 1200% more shares than text and images combined on social media"
    },
    {
      icon: <AwardIcon />,
      title: "Professional Quality",
      description: "High-quality production values that reflect your brand's professionalism and attention to detail"
    },
    {
      icon: <TargetIcon />,
      title: "Targeted Messaging",
      description: "Craft videos that speak directly to your target audience and drive specific actions"
    }
  ];

  // Production Process
  const process = [
    {
      step: 1,
      title: "Pre-Production",
      description: "Concept development, scriptwriting, storyboarding, and planning",
      icon: "📝"
    },
    {
      step: 2,
      title: "Production",
      description: "Professional filming with high-end equipment and experienced crew",
      icon: "🎬"
    },
    {
      step: 3,
      title: "Post-Production",
      description: "Editing, color grading, sound design, and visual effects",
      icon: "✂️"
    },
    {
      step: 4,
      title: "Delivery",
      description: "Final output in multiple formats optimized for different platforms",
      icon: "📤"
    }
  ];

  return (
    <div ref={containerRef} style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      color: '#ffffff',
      paddingTop: '80px'
    }}>
      {/* Hero Section */}
      <motion.section 
        style={{ 
          position: 'relative',
          padding: '4rem 2rem',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse at center, rgba(0, 255, 127, 0.1) 0%, transparent 70%)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="container"
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <motion.h1 
              style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                background: 'linear-gradient(135deg, #00ff7f 0%, #00ffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Video Production Services
            </motion.h1>
            <motion.p 
              style={{ 
                fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                opacity: 0.9,
                maxWidth: '800px',
                margin: '0 auto 2rem'
              }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              From concept to creation, we bring your vision to life with professional video production that tells your story and engages your audience.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    background: 'linear-gradient(135deg, #00ff7f 0%, #00cc66 100%)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Start Your Project
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  background: 'transparent',
                  color: '#00ff7f',
                  border: '2px solid #00ff7f',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                View Portfolio
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Services Grid */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2 
            style={{ 
              fontSize: '2.5rem',
              textAlign: 'center',
              marginBottom: '3rem',
              background: 'linear-gradient(135deg, #00ff7f 0%, #00ffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Video Services
          </motion.h2>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onHoverStart={() => setActiveService(index)}
                style={{
                  background: activeService === index 
                    ? `linear-gradient(135deg, ${service.color}22 0%, transparent 100%)`
                    : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${activeService === index ? service.color : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '20px',
                  padding: '2rem',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                <div style={{ color: service.color, marginBottom: '1rem' }}>
                  {service.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ffffff' }}>
                  {service.title}
                </h3>
                <p style={{ opacity: 0.8, marginBottom: '1.5rem' }}>
                  {service.description}
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} style={{ 
                      padding: '0.5rem 0',
                      borderBottom: idx < service.features.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <span style={{ color: service.color, marginRight: '0.5rem' }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" style={{ 
        padding: '4rem 2rem',
        background: 'rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2 
            style={{ 
              fontSize: '2.5rem',
              textAlign: 'center',
              marginBottom: '3rem',
              background: 'linear-gradient(135deg, #00ff7f 0%, #00ffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Work
          </motion.h2>

          {/* Category Filter */}
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}>
            {['all', 'corporate', 'commercial', 'animation', 'music', 'streaming'].map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentCategory(category)}
                style={{
                  padding: '0.5rem 1.5rem',
                  background: currentCategory === category 
                    ? 'linear-gradient(135deg, #00ff7f 0%, #00cc66 100%)'
                    : 'transparent',
                  color: currentCategory === category ? '#000' : '#fff',
                  border: `2px solid ${currentCategory === category ? '#00ff7f' : 'rgba(255, 255, 255, 0.3)'}`,
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  transition: 'all 0.3s ease'
                }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            <AnimatePresence mode="wait">
              {filteredPortfolio.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedWork(item)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ 
                    position: 'relative',
                    paddingBottom: '56.25%',
                    overflow: 'hidden',
                    background: '#000'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `url(${item.thumbnail}) center/cover`,
                      filter: 'brightness(0.8)'
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '60px',
                      height: '60px',
                      background: 'rgba(0, 255, 127, 0.9)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}>
                      <div style={{
                        width: 0,
                        height: 0,
                        borderLeft: '20px solid #000',
                        borderTop: '12px solid transparent',
                        borderBottom: '12px solid transparent',
                        marginLeft: '5px'
                      }} />
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      background: 'rgba(0, 0, 0, 0.8)',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '5px',
                      fontSize: '0.9rem'
                    }}>
                      {item.duration}
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                      {item.title}
                    </h3>
                    <p style={{ opacity: 0.7, fontSize: '0.95rem' }}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWork(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.95)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '900px',
                background: '#1a1a1a',
                borderRadius: '20px',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'relative', paddingBottom: '56.25%' }}>
                <iframe
                  src={selectedWork.videoUrl}
                  title={selectedWork.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  allowFullScreen
                />
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                  {selectedWork.title}
                </h3>
                <p style={{ opacity: 0.8 }}>
                  {selectedWork.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Benefits Section */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2 
            style={{ 
              fontSize: '2.5rem',
              textAlign: 'center',
              marginBottom: '3rem',
              background: 'linear-gradient(135deg, #00ff7f 0%, #00ffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose Our Video Production?
          </motion.h2>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  textAlign: 'center',
                  padding: '2rem'
                }}
              >
                <div style={{ 
                  color: '#00ff7f',
                  marginBottom: '1rem',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  {benefit.icon}
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>
                  {benefit.title}
                </h3>
                <p style={{ opacity: 0.8 }}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section style={{ 
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.05) 0%, transparent 100%)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2 
            style={{ 
              fontSize: '2.5rem',
              textAlign: 'center',
              marginBottom: '3rem',
              background: 'linear-gradient(135deg, #00ff7f 0%, #00ffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Production Process
          </motion.h2>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '15px',
                  padding: '2rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  textAlign: 'center'
                }}
              >
                <div style={{ 
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>
                  {step.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.3rem',
                  marginBottom: '0.5rem',
                  color: '#00ff7f'
                }}>
                  Step {step.step}: {step.title}
                </h3>
                <p style={{ opacity: 0.8 }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 255, 255, 0.1) 100%)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <motion.h2 
            style={{ 
              fontSize: '2.5rem',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #00ff7f 0%, #00ffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Create Amazing Videos?
          </motion.h2>
          <motion.p 
            style={{ 
              fontSize: '1.2rem',
              opacity: 0.9,
              marginBottom: '2rem'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Let's bring your vision to life with professional video production that engages and inspires.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '1rem 3rem',
                  fontSize: '1.2rem',
                  background: 'linear-gradient(135deg, #00ff7f 0%, #00cc66 100%)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  boxShadow: '0 10px 30px rgba(0, 255, 127, 0.3)'
                }}
              >
                Get Started Today
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default VideoProduction;