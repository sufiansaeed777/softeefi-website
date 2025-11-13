// Service-specific color themes
export const serviceThemes = {
  ai: {
    name: 'AI Solutions',
    // ONLY dark black, white, and green
    gradient: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 100%)',
    backgroundGradient: 'linear-gradient(135deg, #0a0a0a 0%, #000000 100%)',
    primaryColor: '#00ff7f', // Green
    secondaryColor: '#00ff7f', // Green
    accentColor: '#ffffff', // White
    backgroundColor: '#0a0a0a', // Very dark black
    backgroundColorAlt: 'rgba(0, 255, 127, 0.1)',
    borderColor: 'rgba(0, 255, 127, 0.2)',
    hoverBorderColor: 'rgba(0, 255, 127, 0.5)',
    textOnGradient: '#0a0a0a', // Black text for light gradient
    textColor: '#ffffff', // White text for dark background
    mutedTextColor: '#ffffff', // White (no gray)
    glowColor: 'rgba(0, 255, 127, 0.3)',
    icon: '🤖'
  },
  web: {
    name: 'Websites & Apps',
    gradient: 'linear-gradient(135deg, #00ff7f 0%, #b9f2ff 50%, #000000 100%)',
    backgroundGradient: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
    primaryColor: '#00ff7f',
    secondaryColor: '#b9f2ff',
    accentColor: '#00ff7f',
    backgroundColor: '#000000',
    backgroundColorAlt: 'rgba(0, 255, 127, 0.1)',
    borderColor: 'rgba(185, 242, 255, 0.2)',
    hoverBorderColor: 'rgba(0, 255, 127, 0.5)',
    textOnGradient: '#000000',
    textColor: '#ffffff',
    mutedTextColor: '#b9f2ff',
    glowColor: 'rgba(0, 255, 127, 0.3)',
    icon: '🌐'
  },
  uiux: {
    name: 'UI/UX Design',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    backgroundGradient: 'linear-gradient(135deg, #0d1117 0%, #2d1b2e 100%)',
    primaryColor: '#fa709a',
    secondaryColor: '#fee140',
    accentColor: '#f857a6',
    backgroundColor: '#0d1117',
    backgroundColorAlt: 'rgba(250, 112, 154, 0.1)',
    borderColor: 'rgba(250, 112, 154, 0.2)',
    hoverBorderColor: 'rgba(250, 112, 154, 0.5)',
    textOnGradient: '#ffffff',
    textColor: '#ffffff',
    mutedTextColor: '#c9d1d9',
    glowColor: 'rgba(250, 112, 154, 0.3)',
    icon: '🎨'
  },
  cloud: {
    name: 'Cloud Infrastructure',
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    backgroundGradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
    primaryColor: '#30cfd0',
    secondaryColor: '#330867',
    accentColor: '#2bb3b3',
    backgroundColor: '#0a0a0a',
    backgroundColorAlt: 'rgba(48, 207, 208, 0.1)',
    borderColor: 'rgba(48, 207, 208, 0.2)',
    hoverBorderColor: 'rgba(48, 207, 208, 0.5)',
    textOnGradient: '#ffffff',
    textColor: '#ffffff',
    mutedTextColor: '#b8b8b8',
    glowColor: 'rgba(48, 207, 208, 0.3)',
    icon: '☁️'
  },
  marketing: {
    name: 'Digital Marketing & SEO',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    backgroundGradient: 'linear-gradient(135deg, #0d1117 0%, #1a2332 100%)',
    primaryColor: '#4facfe',
    secondaryColor: '#00f2fe',
    accentColor: '#3d9eff',
    backgroundColor: '#0d1117',
    backgroundColorAlt: 'rgba(79, 172, 254, 0.1)',
    borderColor: 'rgba(79, 172, 254, 0.2)',
    hoverBorderColor: 'rgba(79, 172, 254, 0.5)',
    textOnGradient: '#ffffff',
    textColor: '#ffffff',
    mutedTextColor: '#c9d1d9',
    glowColor: 'rgba(79, 172, 254, 0.3)',
    icon: '📈'
  },
  // Default green theme for general use
  default: {
    name: 'Softeefi',
    gradient: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
    backgroundGradient: 'linear-gradient(135deg, #0d1117 0%, #001f3f 100%)',
    primaryColor: '#00ff7f',
    secondaryColor: '#00cc64',
    accentColor: '#00ff7f',
    backgroundColor: '#0d1117',
    backgroundColorAlt: 'rgba(0, 255, 127, 0.1)',
    borderColor: 'rgba(0, 255, 127, 0.2)',
    hoverBorderColor: 'rgba(0, 255, 127, 0.5)',
    textOnGradient: '#0d1117',
    textColor: '#ffffff',
    mutedTextColor: '#c9d1d9',
    glowColor: 'rgba(0, 255, 127, 0.3)',
    icon: '💚'
  }
};

// Helper function to get theme by service name
export const getServiceTheme = (serviceName) => {
  const normalizedName = serviceName.toLowerCase();
  
  if (normalizedName.includes('ai') || normalizedName.includes('artificial')) {
    return serviceThemes.ai;
  } else if (normalizedName.includes('web') || normalizedName.includes('app')) {
    return serviceThemes.web;
  } else if (normalizedName.includes('ui') || normalizedName.includes('ux') || normalizedName.includes('design')) {
    return serviceThemes.uiux;
  } else if (normalizedName.includes('cloud') || normalizedName.includes('infrastructure')) {
    return serviceThemes.cloud;
  } else if (normalizedName.includes('marketing') || normalizedName.includes('seo')) {
    return serviceThemes.marketing;
  }
  
  return serviceThemes.default;
};

// Apply theme styles to an element
export const applyThemeStyles = (theme, baseStyles = {}) => {
  return {
    ...baseStyles,
    '--theme-gradient': theme.gradient,
    '--theme-bg-gradient': theme.backgroundGradient,
    '--theme-primary': theme.primaryColor,
    '--theme-secondary': theme.secondaryColor,
    '--theme-accent': theme.accentColor,
    '--theme-bg': theme.backgroundColor,
    '--theme-bg-alt': theme.backgroundColorAlt,
    '--theme-border': theme.borderColor,
    '--theme-hover-border': theme.hoverBorderColor,
    '--theme-text-on-gradient': theme.textOnGradient,
    '--theme-text': theme.textColor,
    '--theme-text-muted': theme.mutedTextColor,
    '--theme-glow': theme.glowColor
  };
};