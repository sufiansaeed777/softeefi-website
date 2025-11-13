import React from 'react';
import baseStyles from '../styles/base.module.css';
import animationStyles from '../styles/animations.module.css';
import { cx } from '../utils/styles';

/**
 * Optimized Section Component
 * Replaces repetitive inline styled sections
 */
const Section = React.memo(({
  children,
  variant = 'default', // 'default' | 'dark' | 'gradient' | 'hero'
  container = true,
  containerSize = 'default', // 'default' | 'md' | 'sm'
  centered = false,
  animated = true,
  animationType = 'fadeInUp',
  className,
  style,
  id,
  ...props
}) => {
  // Determine section classes
  const sectionClasses = cx(
    baseStyles.section,
    variant === 'dark' && baseStyles.sectionDark,
    variant === 'gradient' && baseStyles.sectionGradient,
    variant === 'hero' && baseStyles.sectionHero,
    centered && baseStyles.textCenter,
    animated && animationStyles[animationType],
    className
  );
  
  // Determine container classes
  const containerClasses = cx(
    containerSize === 'default' && baseStyles.container,
    containerSize === 'md' && baseStyles.containerMd,
    containerSize === 'sm' && baseStyles.containerSm
  );
  
  return (
    <section 
      id={id}
      className={sectionClasses}
      style={style}
      {...props}
    >
      {container ? (
        <div className={containerClasses}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
});

Section.displayName = 'Section';

export default Section;