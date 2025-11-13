import React from 'react';
import { Link } from 'react-router-dom';
import componentStyles from '../styles/components.module.css';
import animationStyles from '../styles/animations.module.css';
import { cx } from '../utils/styles';

/**
 * Optimized Button Component
 * Replaces all inline styled buttons across the app
 */
const Button = React.memo(({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost'
  size = 'medium', // 'small' | 'medium' | 'large'
  fullWidth = false,
  to, // For router links
  href, // For external links
  onClick,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left', // 'left' | 'right'
  className,
  animated = true,
  ...props
}) => {
  // Determine button classes
  const buttonClasses = cx(
    componentStyles.btn,
    variant === 'primary' && componentStyles.btnPrimary,
    variant === 'secondary' && componentStyles.btnSecondary,
    variant === 'ghost' && componentStyles.btnGhost,
    size === 'large' && componentStyles.btnLg,
    size === 'small' && componentStyles.btnSm,
    fullWidth && componentStyles.btnFullWidth,
    animated && animationStyles.hoverLift,
    animated && animationStyles.transition,
    className
  );
  
  // Button content with icon
  const buttonContent = (
    <>
      {loading ? (
        <span className={animationStyles.rotate}>⟳</span>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span>{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span>{icon}</span>}
        </>
      )}
    </>
  );
  
  // Return router link
  if (to && !disabled) {
    return (
      <Link to={to} className={buttonClasses} {...props}>
        {buttonContent}
      </Link>
    );
  }
  
  // Return external link
  if (href && !disabled) {
    return (
      <a 
        href={href} 
        className={buttonClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {buttonContent}
      </a>
    );
  }
  
  // Return button
  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {buttonContent}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;