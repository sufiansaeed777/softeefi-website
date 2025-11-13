import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaExpand, FaPlay } from 'react-icons/fa';

const ProjectModal = ({ project, isOpen, onClose, onNext, onPrevious, totalProjects, currentProjectIndex }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const galleryRef = React.useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset image index when project changes
  useEffect(() => {
    setSelectedImageIndex(0);
    setShowAllImages(false);
  }, [project]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen, isMobile]);

  if (!project) return null;

  const featuredMedia = project.featuredMedia || [];
  const allMedia = project.allMedia || [];
  const currentMedia = showAllImages ? allMedia : featuredMedia;

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? currentMedia.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => 
      prev === currentMedia.length - 1 ? 0 : prev + 1
    );
  };

  const openFullscreen = (index) => {
    setSelectedImageIndex(index);
    setIsFullscreen(true);
  };

  // Handle swipe gestures for mobile
  const minSwipeDistance = 50;

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
    
    // Always navigate between projects on mobile
    if (isLeftSwipe && onNext) {
      onNext();
    }
    if (isRightSwipe && onPrevious) {
      onPrevious();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.95)',
              zIndex: 9999,
              display: 'flex',
              alignItems: isMobile ? 'flex-start' : 'center',
              justifyContent: 'center',
              padding: isMobile ? '0' : '1rem',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
            onClick={onClose}
          >
            {/* Close button - positioned absolutely to viewport */}
            <button
              onClick={onClose}
              style={{
                position: 'fixed',
                top: isMobile ? '1rem' : '2rem',
                right: isMobile ? '1rem' : '2rem',
                background: 'rgba(0, 0, 0, 0.8)',
                border: '2px solid #ffffff',
                borderRadius: '50%',
                width: isMobile ? '40px' : '56px',
                height: isMobile ? '40px' : '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer',
                zIndex: 10001
              }}
            >
              <FaTimes size={isMobile ? 20 : 32} />
            </button>

            {/* Navigation Buttons - Desktop Only */}
            {!isMobile && onPrevious && onNext && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrevious();
                  }}
                  style={{
                    position: 'fixed',
                    left: '50%',
                    top: '50%',
                    transform: 'translateX(calc(-600px - 100px)) translateY(-50%)',
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: '2px solid rgba(0, 255, 127, 0.5)',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00ff7f',
                    cursor: 'pointer',
                    zIndex: 10001,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 255, 127, 0.1)';
                    e.currentTarget.style.transform = 'translateX(calc(-600px - 100px)) translateY(-50%) scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
                    e.currentTarget.style.transform = 'translateX(calc(-600px - 100px)) translateY(-50%) scale(1)';
                  }}
                >
                  <FaChevronLeft size={24} />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                  }}
                  style={{
                    position: 'fixed',
                    left: '50%',
                    top: '50%',
                    transform: 'translateX(calc(600px + 40px)) translateY(-50%)',
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: '2px solid rgba(0, 255, 127, 0.5)',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00ff7f',
                    cursor: 'pointer',
                    zIndex: 10001,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 255, 127, 0.1)';
                    e.currentTarget.style.transform = 'translateX(calc(600px + 40px)) translateY(-50%) scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
                    e.currentTarget.style.transform = 'translateX(calc(600px + 40px)) translateY(-50%) scale(1)';
                  }}
                >
                  <FaChevronRight size={24} />
                </button>
              </>
            )}

            {/* Dots Indicator - Mobile Only */}
            {isMobile && totalProjects > 1 && (
              <>
                <div style={{
                  position: 'fixed',
                  bottom: '4rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '0.5rem',
                  zIndex: 10001,
                  background: 'rgba(0, 0, 0, 0.8)',
                  padding: '0.5rem 1rem',
                  borderRadius: '30px',
                  border: '1px solid rgba(0, 255, 127, 0.3)'
                }}>
                  {Array.from({ length: totalProjects }, (_, index) => (
                    <div
                      key={index}
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: index === currentProjectIndex ? '#00ff7f' : 'rgba(255, 255, 255, 0.3)',
                        transition: 'all 0.3s ease',
                        transform: index === currentProjectIndex ? 'scale(1.3)' : 'scale(1)'
                      }}
                    />
                  ))}
                </div>
                
                {/* Swipe Hint */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 1 }}
                  style={{
                    position: 'fixed',
                    bottom: '6.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontSize: '0.85rem',
                    zIndex: 10001,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <FaChevronLeft size={12} />
                  Swipe to navigate
                  <FaChevronRight size={12} />
                </motion.div>
              </>
            )}

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={isMobile ? onTouchStart : undefined}
              onTouchMove={isMobile ? onTouchMove : undefined}
              onTouchEnd={isMobile ? onTouchEnd : undefined}
              style={{
                background: '#0d1117',
                borderRadius: isMobile ? '0' : '20px',
                border: '1px solid rgba(0, 255, 127, 0.2)',
                width: isMobile ? '100%' : '100%',
                maxWidth: isMobile ? '100%' : '1200px',
                maxHeight: isMobile ? '100vh' : '90vh',
                margin: isMobile ? '0' : 'auto',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                position: 'relative'
              }}
            >

              {/* Left Side - Description */}
              <div style={{
                flex: isMobile ? 'none' : '1',
                padding: isMobile ? '1rem 1rem 0.5rem' : '2rem',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                maxHeight: isMobile ? '45vh' : 'auto',
                borderRight: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                borderBottom: isMobile ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
              }}>
                <div style={{
                  marginBottom: isMobile ? '1rem' : '1.5rem',
                  width: '100%'
                }}>
                  <h2 style={{
                    fontSize: isMobile ? '1.5rem' : '2.5rem',
                    fontWeight: 'bold',
                    color: '#00ff7f',
                    marginBottom: '0.5rem',
                    paddingRight: '2rem'
                  }}>
                    {project.title}
                  </h2>
                </div>

                <div style={{
                  marginBottom: isMobile ? '1.5rem' : '2rem'
                }}>
                  <h3 style={{
                    fontSize: isMobile ? '1.1rem' : '1.4rem',
                    color: '#ffffff',
                    marginBottom: isMobile ? '0.75rem' : '1rem'
                  }}>
                    Key Features
                  </h3>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0
                  }}>
                    {project.features?.map((feature, index) => (
                      <li key={index} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: isMobile ? '0.5rem' : '0.75rem',
                        color: '#c9d1d9',
                        fontSize: isMobile ? '0.95rem' : '1.1rem'
                      }}>
                        <span style={{
                          color: '#00ff7f',
                          marginRight: '0.5rem',
                          flexShrink: 0
                        }}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {project.link && (
                  <div style={{ marginBottom: isMobile ? '1.5rem' : '2rem' }}>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'linear-gradient(135deg, #00ff7f, #00af60)',
                        color: '#000',
                        padding: isMobile ? '0.6rem 1rem' : '0.75rem 1.5rem',
                        borderRadius: '30px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: isMobile ? '0.95rem' : '1.1rem',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                      Visit Live Site
                      <FaExternalLinkAlt size={isMobile ? 14 : 16} />
                    </a>
                  </div>
                )}

                <div style={{
                  marginBottom: isMobile ? '1.5rem' : '2rem'
                }}>
                  <h3 style={{
                    fontSize: isMobile ? '1.1rem' : '1.4rem',
                    color: '#ffffff',
                    marginBottom: isMobile ? '0.75rem' : '1rem'
                  }}>
                    Technologies Used
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: isMobile ? '0.4rem' : '0.5rem'
                  }}>
                    {project.technologies?.map((tech, index) => (
                      <span key={index} style={{
                        background: 'rgba(0, 255, 127, 0.1)',
                        border: '1px solid rgba(0, 255, 127, 0.3)',
                        borderRadius: '20px',
                        padding: isMobile ? '0.2rem 0.6rem' : '0.25rem 0.75rem',
                        fontSize: isMobile ? '0.85rem' : '1rem',
                        color: '#00ff7f'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side - Media Gallery */}
              <div ref={galleryRef} style={{
                flex: isMobile ? 'none' : '1',
                padding: isMobile ? '0.5rem 1rem 1rem' : '2rem',
                paddingBottom: isMobile ? '5rem' : '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? '0.75rem' : '1rem',
                overflowY: 'auto',
                overflowX: 'hidden',
                WebkitOverflowScrolling: 'touch',
                maxHeight: isMobile ? '55vh' : 'auto'
              }}>
                {/* Main Display - Only show on desktop */}
                {!isMobile && (
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '300px',
                  minHeight: '300px',
                  maxHeight: '300px',
                  background: '#000',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  touchAction: 'pan-y',
                  flexShrink: 0
                }}
                onClick={() => openFullscreen(selectedImageIndex)}
                >
                  {currentMedia[selectedImageIndex]?.type === 'video' ? (
                    <video
                      src={currentMedia[selectedImageIndex].url}
                      controls
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <img
                      src={currentMedia[selectedImageIndex]?.url}
                      alt={`${project.title} screenshot ${selectedImageIndex + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevious();
                    }}
                    style={{
                      position: 'absolute',
                      left: isMobile ? '10px' : '15px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(0, 255, 127, 0.1)',
                      backdropFilter: 'blur(8px)',
                      border: '2px solid rgba(0, 255, 127, 0.3)',
                      borderRadius: '50%',
                      width: isMobile ? '44px' : '50px',
                      height: isMobile ? '44px' : '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#00ff7f',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                      zIndex: 10
                    }}
                  >
                    <FaChevronLeft size={isMobile ? 18 : 24} style={{ fontWeight: 'bold' }} />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    style={{
                      position: 'absolute',
                      right: isMobile ? '10px' : '15px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(0, 255, 127, 0.1)',
                      backdropFilter: 'blur(8px)',
                      border: '2px solid rgba(0, 255, 127, 0.3)',
                      borderRadius: '50%',
                      width: isMobile ? '44px' : '50px',
                      height: isMobile ? '44px' : '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#00ff7f',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                      zIndex: 10
                    }}
                  >
                    <FaChevronRight size={isMobile ? 18 : 24} style={{ fontWeight: 'bold' }} />
                  </button>

                  {/* Fullscreen button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openFullscreen(selectedImageIndex);
                    }}
                    style={{
                      position: 'absolute',
                      top: isMobile ? '8px' : '15px',
                      right: isMobile ? '8px' : '15px',
                      background: 'rgba(0, 255, 127, 0.1)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(0, 255, 127, 0.3)',
                      borderRadius: '6px',
                      padding: isMobile ? '4px' : '10px',
                      cursor: 'pointer',
                      color: '#00ff7f',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                      zIndex: 10
                    }}
                  >
                    <FaExpand size={16} style={{ fontWeight: 'bold' }} />
                  </button>
                </div>
                )}

                {/* Thumbnail Gallery - ONLY 4 on mobile, 6 on desktop */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(100px, 1fr))',
                  gap: isMobile ? '0.4rem' : '0.5rem'
                }}>
                  {currentMedia.slice(0, showAllImages ? undefined : (isMobile ? 4 : 6)).map((media, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        if (isMobile) {
                          openFullscreen(index);
                        } else {
                          setSelectedImageIndex(index);
                        }
                      }}
                      style={{
                        position: 'relative',
                        paddingBottom: '75%',
                        background: '#1a1a1a',
                        borderRadius: isMobile ? '6px' : '8px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: (!isMobile && selectedImageIndex === index) ? '2px solid #00ff7f' : '2px solid transparent',
                        transition: 'border 0.3s ease'
                      }}
                    >
                      {media.type === 'video' ? (
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: `url(${media.thumbnail}) center/cover`,
                          color: '#fff'
                        }}>
                          <FaPlay size={isMobile ? 16 : 20} />
                        </div>
                      ) : (
                        <img
                          src={media.url}
                          alt={`Thumbnail ${index + 1}`}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* View More/Less Button */}
                {allMedia.length > featuredMedia.length && (
                  <button
                    onClick={() => {
                      setShowAllImages(!showAllImages);
                      if (isMobile && !showAllImages && galleryRef.current) {
                        setTimeout(() => {
                          galleryRef.current.scrollTop = 0;
                        }, 100);
                      }
                    }}
                    style={{
                      background: 'rgba(0, 255, 127, 0.1)',
                      border: '1px solid rgba(0, 255, 127, 0.3)',
                      borderRadius: '10px',
                      padding: isMobile ? '0.5rem' : '0.75rem',
                      color: '#00ff7f',
                      cursor: 'pointer',
                      fontSize: isMobile ? '0.85rem' : '1rem',
                      transition: 'background 0.3s ease',
                      marginBottom: isMobile ? '2rem' : '1rem',
                      flexShrink: 0
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(0, 255, 127, 0.15)'}
                    onMouseLeave={(e) => e.target.style.background = 'rgba(0, 255, 127, 0.1)'}
                  >
                    {showAllImages ? `View Less (${featuredMedia.length} featured)` : `View All (${allMedia.length} items)`}
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Viewer */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.98)',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isMobile ? '1rem' : '2rem'
            }}
            onClick={() => setIsFullscreen(false)}
            onTouchStart={isMobile ? onTouchStart : undefined}
            onTouchMove={isMobile ? onTouchMove : undefined}
            onTouchEnd={isMobile ? onTouchEnd : undefined}
          >
            {currentMedia[selectedImageIndex]?.type === 'video' ? (
              <video
                src={currentMedia[selectedImageIndex]?.url}
                controls
                autoPlay
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img
                src={currentMedia[selectedImageIndex]?.url}
                alt={`Fullscreen ${selectedImageIndex + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
                onClick={(e) => e.stopPropagation()}
              />
            )}
            
            {/* Dots indicator for mobile */}
            {isMobile && (
              <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '0.5rem',
                padding: '0.5rem',
                background: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '20px',
                zIndex: 10
              }}>
                {currentMedia.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex(index);
                    }}
                    style={{
                      width: index === selectedImageIndex ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: index === selectedImageIndex ? '#00ff7f' : 'rgba(255, 255, 255, 0.5)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: 0
                    }}
                  />
                ))}
              </div>
            )}
            
            {/* Navigation Arrows for Fullscreen - Only show on desktop */}
            {!isMobile && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              style={{
                position: 'absolute',
                left: isMobile ? '10px' : '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0, 0, 0, 0.8)',
                border: '2px solid #00ff7f',
                borderRadius: '50%',
                width: isMobile ? '44px' : '50px',
                height: isMobile ? '44px' : '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#fff'
              }}
            >
              <FaChevronLeft size={24} />
            </button>
            )}
            
            {!isMobile && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              style={{
                position: 'absolute',
                right: isMobile ? '10px' : '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0, 0, 0, 0.8)',
                border: '2px solid #00ff7f',
                borderRadius: '50%',
                width: isMobile ? '44px' : '50px',
                height: isMobile ? '44px' : '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#fff'
              }}
            >
              <FaChevronRight size={24} />
            </button>
            )}
            
            <button
              onClick={() => setIsFullscreen(false)}
              style={{
                position: 'absolute',
                top: isMobile ? '10px' : '20px',
                right: isMobile ? '10px' : '20px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: isMobile ? '44px' : '50px',
                height: isMobile ? '44px' : '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#fff'
              }}
            >
              <FaTimes size={isMobile ? 20 : 24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectModal;