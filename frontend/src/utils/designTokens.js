// Design System Tokens for JavaScript usage
// This file provides easy access to CSS variables in JS/JSX

export const space = {
  xs: '0.25rem',     // 4px
  sm: '0.5rem',      // 8px
  md: '1rem',        // 16px
  lg: '1.5rem',      // 24px
  xl: '2rem',        // 32px
  '2xl': '3rem',     // 48px
  '3xl': '4rem',     // 64px
  '4xl': '6rem',     // 96px
  '5xl': '8rem',     // 128px
};

export const fontSize = {
  xs: '0.75rem',     // 12px
  sm: '0.875rem',    // 14px
  base: '1rem',      // 16px
  lg: '1.125rem',    // 18px
  xl: '1.25rem',     // 20px
  '2xl': '1.5rem',   // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
  '6xl': '3.75rem',  // 60px
};

export const fontWeight = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export const lineHeight = {
  tight: 1.1,
  snug: 1.3,
  normal: 1.5,
  relaxed: 1.7,
  loose: 2,
};

export const transition = {
  fast: 'all 0.15s cubic-bezier(0.25, 0.8, 0.25, 1)',
  base: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
  slow: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
  slower: 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
};

export const zIndex = {
  negative: -1,
  base: 0,
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
  navbar: 100,
  toast: 200,
};

export const colors = {
  black: {
    primary: '#0d0d0d',
    secondary: '#1a1a1a',
    tertiary: '#2b2b2b',
  },
  green: {
    accent: '#00ff7f',
    darker: '#00e673',
  },
  text: {
    light: '#f0f0f0',
    medium: '#a0a0a0',
    dark: '#0d0d0d',
    heading: '#ffffff',
  },
  border: {
    default: '#333333',
    light: '#4d4d4d',
  },
};

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  pill: '50rem',
};

// Helper function to create consistent spacing
export const spacing = (multiplier = 1) => `${1 * multiplier}rem`;

// Helper function to create consistent section styles
export const sectionStyles = {
  base: {
    padding: `${space['4xl']} ${space.xl}`,
  },
  sm: {
    padding: `${space['3xl']} ${space.xl}`,
  },
  lg: {
    padding: `${space['5xl']} ${space.xl}`,
  },
};

// Helper function to create consistent card styles
export const cardStyles = {
  background: colors.black.secondary,
  border: `1px solid ${colors.border.default}`,
  borderRadius: borderRadius.lg,
  padding: space.xl,
  transition: transition.base,
};

// Helper function to create consistent button styles
export const buttonStyles = {
  primary: {
    padding: `${space.md} ${space.xl}`,
    background: colors.green.accent,
    color: colors.text.dark,
    border: 'none',
    borderRadius: borderRadius.pill,
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.base,
    cursor: 'pointer',
    transition: transition.base,
  },
  secondary: {
    padding: `${space.md} ${space.xl}`,
    background: 'transparent',
    color: colors.green.accent,
    border: `2px solid ${colors.green.accent}`,
    borderRadius: borderRadius.pill,
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.base,
    cursor: 'pointer',
    transition: transition.base,
  },
};