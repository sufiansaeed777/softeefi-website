import React from 'react';

export const WebsiteIcon = ({ size = 50, color = "#00ff7f" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="14" rx="1" stroke={color} strokeWidth="1.5"/>
    <rect x="3" y="4" width="18" height="3" fill={color} fillOpacity="0.2"/>
    <circle cx="5.5" cy="5.5" r="0.5" fill={color}/>
    <circle cx="7.5" cy="5.5" r="0.5" fill={color}/>
    <circle cx="9.5" cy="5.5" r="0.5" fill={color}/>
    <line x1="6" y1="10" x2="12" y2="10" stroke={color} strokeWidth="1.5" opacity="0.5"/>
    <line x1="6" y1="12" x2="15" y2="12" stroke={color} strokeWidth="1.5" opacity="0.5"/>
    <line x1="6" y1="14" x2="10" y2="14" stroke={color} strokeWidth="1.5" opacity="0.5"/>
  </svg>
);

export const AppDevIcon = ({ size = 50, color = "#00ff7f" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="7" y="3" width="10" height="18" rx="2" stroke={color} strokeWidth="1.5"/>
    <rect x="7" y="3" width="10" height="2" fill={color} fillOpacity="0.2"/>
    <circle cx="12" cy="18" r="1" stroke={color} strokeWidth="1"/>
    <rect x="9" y="7" width="6" height="2" rx="1" fill={color} fillOpacity="0.5"/>
    <rect x="9" y="10" width="4" height="2" rx="1" fill={color} fillOpacity="0.3"/>
  </svg>
);

export const MarketingIcon = ({ size = 50, color = "#00ff7f" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 13 L7 9 L11 11 L15 6 L21 10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="3" cy="13" r="1.5" fill={color}/>
    <circle cx="7" cy="9" r="1.5" fill={color}/>
    <circle cx="11" cy="11" r="1.5" fill={color}/>
    <circle cx="15" cy="6" r="1.5" fill={color}/>
    <circle cx="21" cy="10" r="1.5" fill={color}/>
    <path d="M18 5 L20 3 L22 5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const GraphicDesignIcon = ({ size = 50, color = "#00ff7f" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 3 L19 8 L19 16 L12 21 L5 16 L5 8 Z" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1"/>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5"/>
    <path d="M12 20 L12 22" stroke={color} strokeWidth="1.5"/>
  </svg>
);

export const CloudIcon = ({ size = 50, color = "#00ff7f" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M18 10C20.2091 10 22 11.7909 22 14C22 16.2091 20.2091 18 18 18H6C3.79086 18 2 16.2091 2 14C2 11.7909 3.79086 10 6 10C6.44772 10 6.87313 10.0898 7.26031 10.2515C8.04728 8.3733 9.87792 7 12 7C14.1221 7 15.9527 8.3733 16.7397 10.2515C17.1269 10.0898 17.5523 10 18 10Z" 
      stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1"/>
    <path d="M8 20L10 22L14 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const VideoIcon = ({ size = 50, color = "#00ff7f" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="13" height="12" rx="1" stroke={color} strokeWidth="1.5"/>
    <path d="M16 9L21 6V18L16 15V9Z" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.2"/>
    <polygon points="8,10 8,14 11,12" fill={color}/>
  </svg>
);

// Option 1: Neural Network Brain (Modern AI representation)
export const AIBrainIcon = ({ size = 50, color = "#00ff7f" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Brain outline */}
    <path d="M12 3C8 3 5 6 5 10C5 11 5.2 12 5.5 13C6 14.5 7 16 8 17C9 18 10 19 10 20V21H14V20C14 19 15 18 16 17C17 16 18 14.5 18.5 13C18.8 12 19 11 19 10C19 6 16 3 12 3Z" 
      stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1"/>
    {/* Neural connections */}
    <circle cx="8" cy="8" r="1.5" fill={color}/>
    <circle cx="16" cy="8" r="1.5" fill={color}/>
    <circle cx="12" cy="10" r="1.5" fill={color}/>
    <circle cx="10" cy="13" r="1.5" fill={color}/>
    <circle cx="14" cy="13" r="1.5" fill={color}/>
    {/* Connection lines */}
    <path d="M8 8L12 10L16 8M12 10L10 13M12 10L14 13M10 13L14 13" 
      stroke={color} strokeWidth="1" opacity="0.5"/>
  </svg>
);

// Option 2: Circuit Brain (Tech-focused AI)
export const AICircuitIcon = ({ size = 50, color = "#00ff7f" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Hexagon container */}
    <path d="M12 2L20 7V17L12 22L4 17V7Z" 
      stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.05"/>
    {/* Circuit nodes */}
    <circle cx="12" cy="8" r="2" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.2"/>
    <circle cx="8" cy="12" r="1.5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.2"/>
    <circle cx="16" cy="12" r="1.5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.2"/>
    <circle cx="12" cy="16" r="1.5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.2"/>
    {/* Circuit connections */}
    <path d="M12 10V14M10 12H14M9.5 10L12 8L14.5 10M9.5 14L12 16L14.5 14" 
      stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Option 3: AI Sparkle (Abstract modern)
export const AISparkleIcon = ({ size = 50, color = "#00ff7f" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Central spark */}
    <path d="M12 2L13.5 9L20 10.5L13.5 12L12 19L10.5 12L4 10.5L10.5 9Z" 
      stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.2"/>
    {/* Small sparks */}
    <path d="M5 5L6 7L8 8L6 9L5 11L4 9L2 8L4 7Z" 
      fill={color} opacity="0.6"/>
    <path d="M19 5L20 7L22 8L20 9L19 11L18 9L16 8L18 7Z" 
      fill={color} opacity="0.6"/>
    <path d="M5 19L6 17L8 16L6 15L5 13L4 15L2 16L4 17Z" 
      fill={color} opacity="0.4"/>
  </svg>
);

// Keep the original for backward compatibility
export const ChatbotIcon = ({ size = 50, color = "#00ff7f" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="14" rx="2" stroke={color} strokeWidth="1.5"/>
    <path d="M8 17L10 20L12 17" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="8" cy="8" r="1" fill={color}/>
    <circle cx="16" cy="8" r="1" fill={color}/>
    <path d="M8 12Q12 14 16 12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const NFTIcon = ({ size = 50, color = "#00ff7f" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2 L20 7 L20 17 L12 22 L4 17 L4 7 Z" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1"/>
    <path d="M12 2 L12 22 M4 7 L20 17 M20 7 L4 17" stroke={color} strokeWidth="1" opacity="0.3"/>
    <text x="12" y="13" textAnchor="middle" fill={color} fontSize="6" fontWeight="bold">NFT</text>
  </svg>
);

export const UIUXIcon = ({ size = 50, color = "#00ff7f" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Window frame */}
    <rect x="3" y="4" width="18" height="14" rx="1" stroke={color} strokeWidth="1.5"/>
    <rect x="3" y="4" width="18" height="3" fill={color} fillOpacity="0.2"/>
    {/* Window controls */}
    <circle cx="5.5" cy="5.5" r="0.5" fill={color}/>
    <circle cx="7.5" cy="5.5" r="0.5" fill={color}/>
    <circle cx="9.5" cy="5.5" r="0.5" fill={color}/>
    {/* Layout elements */}
    <rect x="5" y="9" width="4" height="3" rx="0.5" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.2"/>
    <rect x="11" y="9" width="7" height="3" rx="0.5" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.1"/>
    <rect x="5" y="14" width="13" height="2" rx="0.5" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.1"/>
    {/* Cursor/design tool */}
    <path d="M16 15 L18 17 L17 17 Z" fill={color}/>
  </svg>
);

export const LightbulbIcon = ({ size = 24, color = "#00ff7f" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2Z" 
      stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1"/>
    <path d="M9 21H15" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 18V21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 6V10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 8L12 10L14 8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const PencilIcon = ({ size = 24, color = "#00ff7f" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25Z" 
      stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1"/>
    <path d="M20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" 
      stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.2"/>
  </svg>
);