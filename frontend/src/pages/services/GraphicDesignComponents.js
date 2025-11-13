import React from 'react';
import { motion } from 'framer-motion';
import { space, fontSize, fontWeight, colors, transition } from '../../utils/designTokens';
import { VideoIcon, EyeIcon } from './GraphicDesignIcons';
import LazyImage from '../../components/LazyImage';

// Project Card Component
export const ProjectCard = ({ 
  project, 
  index, 
  viewMode, 
  hoveredProject, 
  onHover, 
  onLeave, 
  onClick 
}) => {
  const isHovered = hoveredProject === project.id;
  const isGrid = viewMode === 'grid';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -10 }}
      onClick={() => onClick(project)}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={onLeave}
      style={getCardStyle(isGrid, isHovered)}
    >
      {/* Project Image */}
      <ProjectImage 
        project={project} 
        isHovered={isHovered} 
        viewMode={viewMode} 
      />
      
      {/* Project Details */}
      <ProjectDetails 
        project={project} 
        viewMode={viewMode} 
        onClick={onClick}
      />
    </motion.div>
  );
};

// Project Image Component
const ProjectImage = ({ project, isHovered, viewMode }) => {
  const isGrid = viewMode === 'grid';

  return (
    <div
      className="project-image-container"
      style={getImageContainerStyle(isGrid)}
    >
      <LazyImage
        src={project.src}
        alt={`${project.title} - ${project.category} design for ${project.client}. ${project.description.substring(0, 100)}...`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)'
        }}
      />
      
      {/* Overlay gradient on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
          pointerEvents: 'none'
        }}
      />

      {/* Category Badge */}
      <CategoryBadge category={project.category} />

      {/* Video indicator */}
      {project.video && <VideoIndicator />}

      {/* Client Review Badge */}
      {project.clientReview && <ReviewBadge rating={project.clientReview.rating} />}
    </div>
  );
};

// Category Badge Component
const CategoryBadge = ({ category }) => (
  <motion.div
    initial={{ x: 20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.1 }}
    style={{
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'rgba(0, 255, 127, 0.9)',
      color: '#0d0d0d',
      padding: `${space.xs} ${space.md}`,
      borderRadius: '25px',
      fontSize: fontSize.xs,
      fontWeight: fontWeight.bold,
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 10px rgba(0, 255, 127, 0.3)'
    }}
  >
    {category}
  </motion.div>
);

// Video Indicator Component
const VideoIndicator = () => (
  <motion.div
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.1 }}
    style={{
      position: 'absolute',
      bottom: '15px',
      left: '15px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      padding: `${space.xs} ${space.sm}`,
      borderRadius: '25px',
      fontSize: fontSize.xs,
      display: 'flex',
      alignItems: 'center',
      gap: space.xs,
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}
  >
    <VideoIcon />
    Video
  </motion.div>
);

// Review Badge Component
const ReviewBadge = ({ rating }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2 }}
    style={{
      position: 'absolute',
      bottom: '15px',
      right: '15px',
      background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
      color: '#0d0d0d',
      padding: `${space.xs} ${space.sm}`,
      borderRadius: '25px',
      fontSize: fontSize.xs,
      display: 'flex',
      alignItems: 'center',
      gap: space.xs,
      fontWeight: fontWeight.bold,
      boxShadow: '0 4px 10px rgba(255, 215, 0, 0.3)'
    }}
  >
    ★ {rating}
  </motion.div>
);

// Project Details Component
const ProjectDetails = ({ project, viewMode, onClick }) => {
  const isGrid = viewMode === 'grid';

  return (
    <div
      className="project-details"
      style={getDetailsStyle(isGrid)}
    >
      <div>
        <h3 style={{
          fontSize: fontSize.xl,
          marginBottom: '0.5rem',
          color: '#fff',
          fontWeight: fontWeight.semibold
        }}>
          {project.title}
        </h3>

        <p style={{
          fontSize: fontSize.sm,
          color: '#00ff7f',
          marginBottom: '1rem',
          fontWeight: fontWeight.medium
        }}>
          {project.client} • {project.year}
        </p>

        <p style={{
          fontSize: fontSize.base,
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: '1.5rem',
          display: '-webkit-box',
          WebkitLineClamp: isGrid ? 2 : 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: '1.6'
        }}>
          {project.description}
        </p>
      </div>

      {/* Tools */}
      <ToolsList tools={project.tools} viewMode={viewMode} />

      {/* Quick Actions (List view only) */}
      {viewMode === 'list' && (
        <QuickActions project={project} onClick={onClick} />
      )}
    </div>
  );
};

// Tools List Component
const ToolsList = ({ tools, viewMode }) => {
  const limit = viewMode === 'grid' ? 2 : 4;
  const visibleTools = tools.slice(0, limit);
  const remainingCount = tools.length - limit;

  return (
    <div>
      <div style={{
        display: 'flex',
        gap: space.sm,
        flexWrap: 'wrap',
        marginBottom: viewMode === 'list' ? '1.5rem' : '0'
      }}>
        {visibleTools.map(tool => (
          <span
            key={tool}
            style={{
              padding: `${space.xs} ${space.sm}`,
              background: 'rgba(0, 255, 127, 0.1)',
              color: '#00ff7f',
              borderRadius: '20px',
              fontSize: fontSize.xs,
              border: '1px solid rgba(0, 255, 127, 0.2)',
              fontWeight: fontWeight.medium
            }}
          >
            {tool}
          </span>
        ))}
        {remainingCount > 0 && (
          <span style={{
            padding: '0.3rem 0.8rem',
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.8rem'
          }}>
            +{remainingCount} more
          </span>
        )}
      </div>
    </div>
  );
};

// Quick Actions Component
const QuickActions = ({ project, onClick }) => (
  <div style={{
    display: 'flex',
    gap: space.md,
    marginTop: 'auto'
  }}>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(project);
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: space.sm,
        padding: `${space.sm} ${space.lg}`,
        background: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
        border: 'none',
        borderRadius: '25px',
        color: '#0d0d0d',
        fontSize: fontSize.sm,
        cursor: 'pointer',
        transition: `all ${transition.base} ease`,
        fontWeight: fontWeight.semibold,
        boxShadow: '0 4px 15px rgba(0, 255, 127, 0.3)'
      }}
    >
      <EyeIcon /> View Details
    </motion.button>
  </div>
);

// Service Card Component
export const ServiceCard = ({ service, icon, onClick, isActive }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -5 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    style={{
      background: isActive 
        ? 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 255, 127, 0.05) 100%)'
        : 'rgba(255, 255, 255, 0.02)',
      borderRadius: '20px',
      padding: space['2xl'],
      border: `2px solid ${isActive ? '#00ff7f' : 'rgba(255, 255, 255, 0.1)'}`,
      cursor: 'pointer',
      transition: `all ${transition.base} ease`,
      boxShadow: isActive 
        ? '0 10px 30px rgba(0, 255, 127, 0.2)'
        : '0 5px 20px rgba(0, 0, 0, 0.3)'
    }}
  >
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: space.lg,
      marginBottom: space.lg
    }}>
      <div style={{ 
        color: isActive ? '#00ff7f' : colors.text.medium,
        transition: `color ${transition.base} ease`
      }}>
        {icon}
      </div>
      <h3 style={{
        fontSize: fontSize.xl,
        fontWeight: fontWeight.semibold,
        color: colors.text.heading,
        margin: 0
      }}>
        {service.title}
      </h3>
    </div>
    <p style={{
      color: colors.text.medium,
      fontSize: fontSize.base,
      lineHeight: '1.6',
      margin: 0
    }}>
      {service.description}
    </p>
  </motion.div>
);

// Process Step Card Component
export const ProcessStepCard = ({ step, index, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    style={{
      textAlign: 'center',
      padding: space.xl
    }}
  >
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      style={{
        width: '100px',
        height: '100px',
        margin: '0 auto',
        marginBottom: space.xl,
        background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 255, 127, 0.05) 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid rgba(0, 255, 127, 0.3)',
        color: '#00ff7f',
        position: 'relative'
      }}
    >
      {icon}
      <div style={{
        position: 'absolute',
        top: '-10px',
        right: '-10px',
        background: '#00ff7f',
        color: '#0d0d0d',
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: fontWeight.bold,
        fontSize: fontSize.sm
      }}>
        {step.number}
      </div>
    </motion.div>
    <h3 style={{
      fontSize: fontSize.xl,
      fontWeight: fontWeight.semibold,
      color: colors.text.heading,
      marginBottom: space.md
    }}>
      {step.title}
    </h3>
    <p style={{
      color: colors.text.medium,
      fontSize: fontSize.base,
      lineHeight: '1.6'
    }}>
      {step.description}
    </p>
  </motion.div>
);

// Styles
const getCardStyle = (isGrid, isHovered) => ({
  background: 'linear-gradient(135deg, rgba(13,17,23,0.95) 0%, rgba(0,30,60,0.95) 100%)',
  borderRadius: '20px',
  overflow: 'hidden',
  border: '1px solid',
  borderColor: isHovered ? 'rgba(0, 255, 127, 0.5)' : 'rgba(0, 255, 127, 0.1)',
  cursor: 'pointer',
  position: 'relative',
  display: isGrid ? 'block' : 'flex',
  alignItems: isGrid ? 'stretch' : 'center',
  transition: `all ${transition.slow} cubic-bezier(0.4, 0, 0.2, 1)`,
  boxShadow: isHovered
    ? '0 20px 40px rgba(0, 255, 127, 0.2)'
    : '0 10px 30px rgba(0,0,0,0.5)',
  transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)',
  transformStyle: 'preserve-3d'
});

const getImageContainerStyle = (isGrid) => ({
  height: isGrid ? '240px' : '180px',
  width: isGrid ? '100%' : '280px',
  overflow: 'hidden',
  position: 'relative',
  flexShrink: 0
});

const getDetailsStyle = (isGrid) => ({
  padding: space.xl,
  background: isGrid ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
  flex: isGrid ? 'none' : 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
});