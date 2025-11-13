/**
 * Style utilities for managing CSS modules
 */

/**
 * Combines multiple CSS module classes
 * @param {...string} classes - CSS module classes
 * @returns {string} Combined class string
 */
export const cx = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Conditionally applies CSS classes
 * @param {Object} classMap - Object with class names as keys and conditions as values
 * @returns {string} Combined class string
 */
export const cn = (classMap) => {
  return Object.entries(classMap)
    .filter(([_, condition]) => condition)
    .map(([className]) => className)
    .join(' ');
};

/**
 * Generates responsive classes
 * @param {Object} styles - CSS module styles object
 * @param {string} baseClass - Base class name
 * @param {boolean} isMobile - Mobile condition
 * @returns {string} Responsive class string
 */
export const responsive = (styles, baseClass, isMobile) => {
  const mobileClass = `${baseClass}Mobile`;
  const desktopClass = `${baseClass}Desktop`;
  
  if (isMobile && styles[mobileClass]) {
    return styles[mobileClass];
  }
  
  if (!isMobile && styles[desktopClass]) {
    return styles[desktopClass];
  }
  
  return styles[baseClass] || '';
};

/**
 * Creates variant classes
 * @param {Object} styles - CSS module styles object
 * @param {string} baseClass - Base class name
 * @param {string} variant - Variant name
 * @returns {string} Variant class string
 */
export const variant = (styles, baseClass, variant) => {
  if (!variant) return styles[baseClass] || '';
  
  const variantClass = `${baseClass}${variant.charAt(0).toUpperCase()}${variant.slice(1)}`;
  return styles[variantClass] || styles[baseClass] || '';
};

/**
 * Merges multiple style objects (for migration from inline styles)
 * @param {...Object} styleObjects - Style objects to merge
 * @returns {Object} Merged style object
 */
export const mergeStyles = (...styleObjects) => {
  return Object.assign({}, ...styleObjects.filter(Boolean));
};

/**
 * Common style combinations
 */
export const commonStyles = {
  // Hero sections
  hero: (baseStyles, componentStyles) => cx(
    baseStyles.sectionHero,
    baseStyles.flexCenter,
    componentStyles.hero
  ),
  
  // Card layouts
  card: (baseStyles, componentStyles, variant) => cx(
    componentStyles.card,
    variant && componentStyles[`card${variant}`]
  ),
  
  // Button combinations
  button: (componentStyles, variant, size) => cx(
    componentStyles.btn,
    variant && componentStyles[`btn${variant}`],
    size && componentStyles[`btn${size}`]
  ),
  
  // Grid layouts
  grid: (baseStyles, columns, gap) => cx(
    baseStyles.grid,
    columns && baseStyles[`grid${columns}`],
    gap && baseStyles[`gap${gap}`]
  ),
  
  // Typography
  heading: (baseStyles, size, gradient) => cx(
    baseStyles.heading,
    size && baseStyles[`heading${size}`],
    gradient && baseStyles.headingGradient
  ),
  
  // Sections
  section: (baseStyles, variant, mobile) => cx(
    baseStyles.section,
    variant && baseStyles[`section${variant}`],
    mobile && baseStyles.sectionMobile
  )
};

/**
 * Style presets for quick migration
 */
export const presets = {
  // Container presets
  container: {
    default: 'container',
    medium: 'containerMd',
    small: 'containerSm'
  },
  
  // Button presets
  button: {
    primary: 'btnPrimary',
    secondary: 'btnSecondary',
    ghost: 'btnGhost'
  },
  
  // Card presets
  card: {
    default: 'card',
    compact: 'cardCompact',
    large: 'cardLg',
    dark: 'cardDark',
    gradient: 'cardGradient'
  },
  
  // Animation presets
  animation: {
    fadeIn: 'fadeIn',
    fadeInUp: 'fadeInUp',
    slideIn: 'slideIn',
    scaleIn: 'scaleIn'
  }
};

/**
 * Converts inline styles to CSS module classes
 * @param {Object} inlineStyle - Inline style object
 * @param {Object} styles - CSS module styles object
 * @returns {string} Matching CSS class or empty string
 */
export const inlineToClass = (inlineStyle, styles) => {
  // Common inline style mappings
  const mappings = {
    'display: flex': 'flex',
    'display: grid': 'grid',
    'text-align: center': 'textCenter',
    'position: relative': 'relative',
    'position: absolute': 'absolute',
    'margin: 0': 'm0',
    'padding: 0': 'p0',
    'width: 100%': 'fullWidth',
    'height: 100vh': 'fullHeight'
  };
  
  // Convert style object to string and find matching class
  const styleString = Object.entries(inlineStyle)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ');
  
  for (const [pattern, className] of Object.entries(mappings)) {
    if (styleString.includes(pattern) && styles[className]) {
      return styles[className];
    }
  }
  
  return '';
};