import { space, fontSize, fontWeight, transition, colors } from '../utils/designTokens';

// Common button styles to ensure consistency across the app
export const buttonBaseStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: space.sm,
  padding: `${space.md} ${space.xl}`,
  borderRadius: '30px',
  fontSize: fontSize.base,
  fontWeight: fontWeight.semibold,
  cursor: 'pointer',
  transition: `all ${transition.base} ease`,
  textDecoration: 'none',
  border: 'none',
  outline: 'none',
  position: 'relative',
  overflow: 'hidden',
  textAlign: 'center',
  whiteSpace: 'nowrap'
};

export const primaryButtonStyles = {
  ...buttonBaseStyles,
  background: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
  color: '#0d0d0d',
  boxShadow: '0 4px 15px rgba(0, 255, 127, 0.3)'
};

export const secondaryButtonStyles = {
  ...buttonBaseStyles,
  background: 'rgba(255, 255, 255, 0.1)',
  border: '2px solid rgba(0, 255, 127, 0.5)',
  color: '#00ff7f'
};

export const ghostButtonStyles = {
  ...buttonBaseStyles,
  background: 'transparent',
  border: '2px solid rgba(255, 255, 255, 0.2)',
  color: '#ffffff'
};

// Mobile-specific button styles
export const mobileButtonStyles = {
  width: '100%',
  padding: `${space.lg} ${space.xl}`,
  fontSize: fontSize.base,
  minHeight: '48px', // Ensure minimum touch target
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center'
};

// Button hover effects
export const buttonHoverStyles = {
  transform: 'translateY(-2px)',
  boxShadow: '0 8px 25px rgba(0, 255, 127, 0.4)'
};

// Button active/pressed styles
export const buttonActiveStyles = {
  transform: 'translateY(0)',
  boxShadow: '0 2px 10px rgba(0, 255, 127, 0.3)'
};

// Disabled button styles
export const buttonDisabledStyles = {
  opacity: 0.6,
  cursor: 'not-allowed',
  transform: 'none'
};

// Function to get responsive button styles
export const getResponsiveButtonStyles = (isMobile, variant = 'primary') => {
  const baseVariantStyles = {
    primary: primaryButtonStyles,
    secondary: secondaryButtonStyles,
    ghost: ghostButtonStyles
  };

  const variantStyles = baseVariantStyles[variant] || primaryButtonStyles;

  if (isMobile) {
    return {
      ...variantStyles,
      ...mobileButtonStyles
    };
  }

  return variantStyles;
};

// Icon button styles
export const iconButtonStyles = {
  ...buttonBaseStyles,
  width: '44px',
  height: '44px',
  minWidth: '44px',
  minHeight: '44px',
  padding: 0,
  borderRadius: '50%',
  gap: 0
};

// Text link styles (for links that look like buttons)
export const textLinkButtonStyles = {
  ...buttonBaseStyles,
  background: 'none',
  padding: `${space.sm} ${space.md}`,
  color: colors.green.accent,
  textDecoration: 'underline',
  textUnderlineOffset: '4px'
};

// Utility function to ensure button text is always centered
export const centerButtonContent = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%'
};