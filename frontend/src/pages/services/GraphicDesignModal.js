import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { space, fontSize, fontWeight, colors, transition, zIndex } from '../../utils/designTokens';
import { ClockIcon, TagIcon, ToolIcon, CheckIcon } from './GraphicDesignIcons';

const ProjectDetailModal = ({
  selectedProject,
  prevProject,
  nextProject,
  onClose,
  onNavigate,
  isMobile,
  touchHandlers = {}
}) => {
  const modalContentRef = useRef(null);
  const infoSectionRef = useRef(null);

  // Handle escape key
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && prevProject) {
        onNavigate(prevProject);
      } else if (e.key === 'ArrowRight' && nextProject) {
        onNavigate(nextProject);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onClose, onNavigate, prevProject, nextProject]);

  if (!selectedProject) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="detail-modal-overlay"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.95)',
          zIndex: zIndex.modal,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          backdropFilter: 'blur(20px)',
          padding: isMobile ? '0' : '2rem',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ duration: 0.3, type: "spring", damping: 25 }}
          ref={modalContentRef}
          className="detail-modal-content"
          onClick={e => e.stopPropagation()}
          {...touchHandlers}
          style={{
            width: isMobile ? '100%' : '90%',
            maxWidth: isMobile ? '100%' : '1400px',
            height: isMobile ? '100vh' : 'auto',
            maxHeight: isMobile ? '100vh' : '70vh',
            margin: isMobile ? '0' : '40px auto',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #0d1117 100%)',
            borderRadius: isMobile ? '0' : '24px',
            border: isMobile ? 'none' : '2px solid rgba(0, 255, 127, 0.3)',
            overflow: isMobile ? 'auto' : 'hidden',
            position: 'relative',
            boxShadow: isMobile ? 'none' : '0 30px 60px rgba(0, 255, 127, 0.15)',
          }}
        >
          {/* Back button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            aria-label="Go back to portfolio"
            style={{
              position: isMobile ? 'fixed' : 'absolute',
              top: isMobile ? '60px' : '25px',
              left: isMobile ? '10px' : '25px',
              height: isMobile ? '40px' : '45px',
              padding: '0 20px',
              borderRadius: '25px',
              background: 'rgba(0, 0, 0, 0.8)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
              fontSize: isMobile ? '0.9rem' : '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              zIndex: 10,
              transition: `all ${transition.base} ease`,
              backdropFilter: 'blur(10px)',
              fontWeight: fontWeight.medium
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </motion.button>

          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            aria-label="Close project details"
            style={{
              position: isMobile ? 'fixed' : 'absolute',
              top: isMobile ? '60px' : '25px',
              right: isMobile ? '10px' : '25px',
              width: isMobile ? '40px' : '50px',
              height: isMobile ? '40px' : '50px',
              borderRadius: '50%',
              background: '#ff4444',
              border: '2px solid #ff6666',
              color: '#fff',
              fontSize: isMobile ? '1.2rem' : '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              transition: `all ${transition.base} ease`,
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 15px rgba(255, 68, 68, 0.3)'
            }}
          >
            ×
          </motion.button>

          {/* Navigation buttons - removed for mobile since swipe is available */}

          {/* Content */}
          <div style={{
            display: 'flex',
            width: '100%',
            flexDirection: isMobile ? 'column' : 'row',
            overflow: 'hidden',
            height: '100%',
            maxHeight: '100%'
          }}>
            {/* Image Section */}
            <MediaSection project={selectedProject} isMobile={isMobile} />
            
            {/* Info Section */}
            <InfoSection 
              project={selectedProject} 
              isMobile={isMobile}
              ref={infoSectionRef}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Navigation Button Component
const NavigationButton = ({ direction, onClick, label }) => {
  const isNext = direction === 'next';
  
  return (
    <motion.button
      onClick={onClick}
      aria-label={label}
      style={{
        position: 'absolute',
        top: '50%',
        [isNext ? 'right' : 'left']: '25px',
        transform: 'translateY(-50%)',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'rgba(0, 0, 0, 0.8)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 10,
        transition: `all ${transition.base} ease`,
        backdropFilter: 'blur(10px)',
        padding: 0
      }}
      whileHover={{
        background: 'rgba(0, 255, 127, 0.2)',
        borderColor: '#00ff7f'
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d={isNext ? "M9 18L15 12L9 6" : "M15 18L9 12L15 6"} 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
};

// Media Section Component
const MediaSection = ({ project, isMobile }) => (
  <motion.div 
    initial={{ x: -50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.1 }}
    style={{
      flex: isMobile ? 'none' : '3',
      minWidth: '0',
      background: 'radial-gradient(circle at center, rgba(0, 255, 127, 0.05) 0%, #0a0a0a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '2rem 1rem' : '3rem',
      position: isMobile ? 'sticky' : 'relative',
      top: isMobile ? '60px' : '0',
      marginTop: isMobile ? '60px' : '0',
      flexShrink: 0,
      height: isMobile ? '400px' : 'auto',
    }}
  >
    {project.video ? (
      <video
        controls={true}
        controlsList="nodownload"
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        x-webkit-airplay="allow"
        allowFullScreen={true}
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        aria-label={`Video demonstration of ${project.title}`}
        style={{
          width: '100%',
          maxWidth: '100%',
          height: 'auto',
          maxHeight: isMobile ? '50vh' : '75vh',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
          backgroundColor: '#000',
          WebkitTransform: 'translateZ(0)', // Force hardware acceleration
          transform: 'translateZ(0)'
        }}
      >
        <source src={project.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ) : (
      <motion.img
        layoutId={`project-image-${project.id}`}
        src={project.src}
        alt={`${project.title} - ${project.category} design for ${project.client}. ${project.description}`}
        style={{
          maxWidth: '100%',
          maxHeight: isMobile ? '100%' : '75vh',
          objectFit: 'contain',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
        }}
      />
    )}
  </motion.div>
);

// Info Section Component
const InfoSection = React.forwardRef(({ project, isMobile }, ref) => (
  <motion.div 
    ref={ref}
    initial={{ x: 50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.2 }}
    style={{
      flex: isMobile ? '1' : '2',
      minWidth: isMobile ? '0' : '400px',
      maxWidth: isMobile ? '100%' : '500px',
      padding: isMobile ? '2rem 1rem 100px' : '3rem 3rem 4rem',
      overflowY: 'auto',
      overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch',
      background: 'linear-gradient(to bottom, #1a1a1a 0%, #141414 100%)',
      height: isMobile ? 'auto' : '100%',
      maxHeight: isMobile ? 'calc(100vh - 120px)' : '100%',
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(0, 255, 127, 0.3) transparent'
    }}
  >
    {/* Header */}
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start',
      marginBottom: '2rem'
    }}>
      <h2 style={{
        color: '#fff',
        fontSize: isMobile ? '1.5rem' : '2rem',
        margin: 0,
        paddingRight: '1rem',
        fontWeight: fontWeight.bold
      }}>
        {project.title}
      </h2>

      <motion.div
        whileHover={{ scale: 1.05 }}
        style={{
          padding: '0.5rem 1.2rem',
          background: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
          color: '#0d0d0d',
          borderRadius: '30px',
          fontSize: fontSize.sm,
          fontWeight: fontWeight.bold,
          flexShrink: 0,
          boxShadow: '0 4px 15px rgba(0, 255, 127, 0.3)'
        }}
      >
        {project.category}
      </motion.div>
    </div>

    {/* Meta Info */}
    <div style={{
      display: isMobile ? 'grid' : 'flex',
      gridTemplateColumns: isMobile ? '1fr 1fr' : 'none',
      gap: isMobile ? space.lg : space['2xl'],
      marginBottom: '2.5rem',
      paddingBottom: '2rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <MetaItem label="Client" value={project.client} />
      <MetaItem label="Year" value={project.year} />
      <MetaItem label="Project ID" value={`#${project.id.toString().padStart(3, '0')}`} />
    </div>

    {/* Description */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      style={{ marginBottom: '2.5rem' }}
    >
      <h3 style={sectionTitleStyle}>Project Overview</h3>
      <p style={descriptionStyle}>{project.description}</p>
    </motion.div>

    {/* Tools & Technologies */}
    <DetailSection
      icon={<ToolIcon />}
      title="Tools & Technologies"
      items={project.tools}
      type="tools"
    />

    {/* Tags */}
    <DetailSection
      icon={<TagIcon />}
      title="Tags"
      items={project.tags}
      type="tags"
    />

    {/* Deliverables */}
    {project.deliverables && (
      <DetailSection
        icon={<CheckIcon />}
        title="Deliverables"
        items={project.deliverables}
        type="deliverables"
      />
    )}

    {/* Client Review section removed */}
  </motion.div>
));

// Meta Item Component
const MetaItem = ({ label, value }) => (
  <div>
    <p style={{ 
      margin: '0 0 0.5rem', 
      color: '#666', 
      fontSize: '0.85rem', 
      textTransform: 'uppercase', 
      letterSpacing: '0.05em' 
    }}>
      {label}
    </p>
    <p style={{ 
      margin: 0, 
      color: '#f0f0f0', 
      fontWeight: '600', 
      fontSize: '1.1rem' 
    }}>
      {value}
    </p>
  </div>
);

// Detail Section Component
const DetailSection = ({ icon, title, items, type }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    style={{ marginBottom: '2rem' }}
  >
    <h3 style={{
      ...sectionTitleStyle,
      display: 'flex',
      alignItems: 'center',
      gap: space.sm
    }}>
      <span style={{ color: colors.green.accent }}>{icon}</span>
      {title}
    </h3>
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: space.sm,
      marginTop: '1rem'
    }}>
      {items.map((item, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 * index }}
          style={getItemStyle(type)}
        >
          {type === 'deliverables' && '✓ '}{item}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

// Client Review Component
const ClientReview = ({ review, isMobile }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    style={{
      marginTop: '3rem',
      padding: space.xl,
      background: 'rgba(0, 255, 127, 0.05)',
      borderRadius: '16px',
      border: '1px solid rgba(0, 255, 127, 0.2)'
    }}
  >
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem'
    }}>
      <h3 style={{
        ...sectionTitleStyle,
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        gap: space.sm
      }}>
        Client Review
      </h3>
      <div style={{ 
        display: 'flex', 
        gap: '0.2rem',
        fontSize: '1.2rem'
      }}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ 
            color: i < review.rating ? '#ffd700' : '#333' 
          }}>
            ★
          </span>
        ))}
      </div>
    </div>
    <blockquote style={{
      margin: '0 0 1rem 0',
      fontStyle: 'italic',
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: fontSize.base,
      lineHeight: '1.7'
    }}>
      "{review.review}"
    </blockquote>
    <cite style={{
      fontStyle: 'normal',
      fontSize: fontSize.sm,
      color: colors.text.medium
    }}>
      — {review.name}, {review.company}
    </cite>
  </motion.div>
);

// Styles
const sectionTitleStyle = {
  color: '#fff',
  fontSize: fontSize.base,
  fontWeight: fontWeight.semibold,
  marginBottom: '0.5rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
};

const descriptionStyle = {
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: fontSize.base,
  lineHeight: '1.8',
  margin: 0
};

const getItemStyle = (type) => ({
  padding: type === 'deliverables' ? `${space.sm} 0` : `${space.xs} ${space.md}`,
  background: type === 'deliverables' ? 'transparent' : 'rgba(0, 255, 127, 0.1)',
  color: type === 'tags' ? '#00ff7f' : type === 'tools' ? '#4db8ff' : '#00ff7f',
  borderRadius: type === 'deliverables' ? '0' : '20px',
  fontSize: fontSize.sm,
  border: type === 'deliverables' ? 'none' : `1px solid ${
    type === 'tags' ? 'rgba(0, 255, 127, 0.3)' : 'rgba(77, 184, 255, 0.3)'
  }`,
  display: type === 'deliverables' ? 'block' : 'inline-block',
  width: type === 'deliverables' ? '100%' : 'auto',
  fontWeight: type === 'deliverables' ? fontWeight.medium : fontWeight.normal
});

export default ProjectDetailModal;