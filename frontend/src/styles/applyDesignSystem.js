// Script to help identify and replace common patterns with design system tokens
// This is a guide for manual replacement

const replacements = {
  // Spacing replacements
  spacing: [
    { pattern: /padding: ['"]4px['"]/, replacement: "padding: space.xs" },
    { pattern: /padding: ['"]8px['"]/, replacement: "padding: space.sm" },
    { pattern: /padding: ['"]16px['"]/, replacement: "padding: space.md" },
    { pattern: /padding: ['"]24px['"]/, replacement: "padding: space.lg" },
    { pattern: /padding: ['"]32px['"]/, replacement: "padding: space.xl" },
    { pattern: /padding: ['"]48px['"]/, replacement: "padding: space['2xl']" },
    { pattern: /padding: ['"]64px['"]/, replacement: "padding: space['3xl']" },
    { pattern: /padding: ['"]80px['"]/, replacement: "padding: space['4xl']" },
    { pattern: /padding: ['"]96px['"]/, replacement: "padding: space['4xl']" },
    { pattern: /padding: ['"]100px['"]/, replacement: "padding: space['4xl']" },
    
    { pattern: /padding: ['"]0\.5rem['"]/, replacement: "padding: space.sm" },
    { pattern: /padding: ['"]1rem['"]/, replacement: "padding: space.md" },
    { pattern: /padding: ['"]1\.5rem['"]/, replacement: "padding: space.lg" },
    { pattern: /padding: ['"]2rem['"]/, replacement: "padding: space.xl" },
    { pattern: /padding: ['"]3rem['"]/, replacement: "padding: space['2xl']" },
    { pattern: /padding: ['"]4rem['"]/, replacement: "padding: space['3xl']" },
    { pattern: /padding: ['"]5rem['"]/, replacement: "padding: space['4xl']" },
    { pattern: /padding: ['"]6rem['"]/, replacement: "padding: space['4xl']" },
    
    // Combined padding
    { pattern: /padding: ['"]100px 20px['"]/, replacement: "padding: `${space['4xl']} ${space.xl}`" },
    { pattern: /padding: ['"]80px 20px['"]/, replacement: "padding: `${space['4xl']} ${space.xl}`" },
    { pattern: /padding: ['"]60px 20px['"]/, replacement: "padding: `${space['3xl']} ${space.xl}`" },
    { pattern: /padding: ['"]40px 20px['"]/, replacement: "padding: `${space['2xl']} ${space.xl}`" },
    { pattern: /padding: ['"]4rem 2rem['"]/, replacement: "padding: `${space['3xl']} ${space.xl}`" },
    { pattern: /padding: ['"]3rem 2rem['"]/, replacement: "padding: `${space['2xl']} ${space.xl}`" },
    
    // Margins
    { pattern: /margin: ['"]10px['"]/, replacement: "margin: space.sm" },
    { pattern: /margin: ['"]20px['"]/, replacement: "margin: space.lg" },
    { pattern: /margin: ['"]30px['"]/, replacement: "margin: space.xl" },
    { pattern: /margin: ['"]40px['"]/, replacement: "margin: space['2xl']" },
    { pattern: /margin: ['"]50px['"]/, replacement: "margin: space['2xl']" },
    { pattern: /margin: ['"]60px['"]/, replacement: "margin: space['3xl']" },
    
    { pattern: /marginBottom: ['"]10px['"]/, replacement: "marginBottom: space.sm" },
    { pattern: /marginBottom: ['"]15px['"]/, replacement: "marginBottom: space.md" },
    { pattern: /marginBottom: ['"]20px['"]/, replacement: "marginBottom: space.lg" },
    { pattern: /marginBottom: ['"]30px['"]/, replacement: "marginBottom: space.xl" },
    { pattern: /marginBottom: ['"]40px['"]/, replacement: "marginBottom: space['2xl']" },
    { pattern: /marginBottom: ['"]50px['"]/, replacement: "marginBottom: space['2xl']" },
    { pattern: /marginBottom: ['"]60px['"]/, replacement: "marginBottom: space['3xl']" },
    { pattern: /marginBottom: ['"]80px['"]/, replacement: "marginBottom: space['4xl']" },
    
    { pattern: /marginBottom: ['"]1rem['"]/, replacement: "marginBottom: space.md" },
    { pattern: /marginBottom: ['"]1\.5rem['"]/, replacement: "marginBottom: space.lg" },
    { pattern: /marginBottom: ['"]2rem['"]/, replacement: "marginBottom: space.xl" },
    { pattern: /marginBottom: ['"]3rem['"]/, replacement: "marginBottom: space['2xl']" },
    
    // Gap
    { pattern: /gap: ['"]10px['"]/, replacement: "gap: space.sm" },
    { pattern: /gap: ['"]20px['"]/, replacement: "gap: space.lg" },
    { pattern: /gap: ['"]30px['"]/, replacement: "gap: space.xl" },
    { pattern: /gap: ['"]1rem['"]/, replacement: "gap: space.md" },
    { pattern: /gap: ['"]1\.5rem['"]/, replacement: "gap: space.lg" },
    { pattern: /gap: ['"]2rem['"]/, replacement: "gap: space.xl" },
  ],
  
  // Typography replacements
  typography: [
    { pattern: /fontSize: ['"]0\.75rem['"]/, replacement: "fontSize: fontSize.xs" },
    { pattern: /fontSize: ['"]0\.875rem['"]/, replacement: "fontSize: fontSize.sm" },
    { pattern: /fontSize: ['"]0\.9rem['"]/, replacement: "fontSize: fontSize.sm" },
    { pattern: /fontSize: ['"]0\.95rem['"]/, replacement: "fontSize: fontSize.base" },
    { pattern: /fontSize: ['"]1rem['"]/, replacement: "fontSize: fontSize.base" },
    { pattern: /fontSize: ['"]1\.1rem['"]/, replacement: "fontSize: fontSize.lg" },
    { pattern: /fontSize: ['"]1\.125rem['"]/, replacement: "fontSize: fontSize.lg" },
    { pattern: /fontSize: ['"]1\.2rem['"]/, replacement: "fontSize: fontSize.xl" },
    { pattern: /fontSize: ['"]1\.25rem['"]/, replacement: "fontSize: fontSize.xl" },
    { pattern: /fontSize: ['"]1\.5rem['"]/, replacement: "fontSize: fontSize['2xl']" },
    { pattern: /fontSize: ['"]1\.8rem['"]/, replacement: "fontSize: fontSize['3xl']" },
    { pattern: /fontSize: ['"]2rem['"]/, replacement: "fontSize: fontSize['3xl']" },
    { pattern: /fontSize: ['"]2\.5rem['"]/, replacement: "fontSize: fontSize['4xl']" },
    { pattern: /fontSize: ['"]3rem['"]/, replacement: "fontSize: fontSize['5xl']" },
    
    { pattern: /fontSize: ['"]12px['"]/, replacement: "fontSize: fontSize.xs" },
    { pattern: /fontSize: ['"]14px['"]/, replacement: "fontSize: fontSize.sm" },
    { pattern: /fontSize: ['"]16px['"]/, replacement: "fontSize: fontSize.base" },
    { pattern: /fontSize: ['"]18px['"]/, replacement: "fontSize: fontSize.lg" },
    { pattern: /fontSize: ['"]20px['"]/, replacement: "fontSize: fontSize.xl" },
    { pattern: /fontSize: ['"]24px['"]/, replacement: "fontSize: fontSize['2xl']" },
    
    // Font weights
    { pattern: /fontWeight: ['"]300['"]/, replacement: "fontWeight: fontWeight.light" },
    { pattern: /fontWeight: 300/, replacement: "fontWeight: fontWeight.light" },
    { pattern: /fontWeight: ['"]400['"]/, replacement: "fontWeight: fontWeight.normal" },
    { pattern: /fontWeight: 400/, replacement: "fontWeight: fontWeight.normal" },
    { pattern: /fontWeight: ['"]500['"]/, replacement: "fontWeight: fontWeight.medium" },
    { pattern: /fontWeight: 500/, replacement: "fontWeight: fontWeight.medium" },
    { pattern: /fontWeight: ['"]600['"]/, replacement: "fontWeight: fontWeight.semibold" },
    { pattern: /fontWeight: 600/, replacement: "fontWeight: fontWeight.semibold" },
    { pattern: /fontWeight: ['"]700['"]/, replacement: "fontWeight: fontWeight.bold" },
    { pattern: /fontWeight: 700/, replacement: "fontWeight: fontWeight.bold" },
    { pattern: /fontWeight: ['"]800['"]/, replacement: "fontWeight: fontWeight.bold" },
    { pattern: /fontWeight: 800/, replacement: "fontWeight: fontWeight.bold" },
    { pattern: /fontWeight: ['"]900['"]/, replacement: "fontWeight: fontWeight.bold" },
    { pattern: /fontWeight: 900/, replacement: "fontWeight: fontWeight.bold" },
    
    // Line heights
    { pattern: /lineHeight: ['"]1\.1['"]/, replacement: "lineHeight: lineHeight.tight" },
    { pattern: /lineHeight: 1\.1/, replacement: "lineHeight: lineHeight.tight" },
    { pattern: /lineHeight: ['"]1\.2['"]/, replacement: "lineHeight: lineHeight.tight" },
    { pattern: /lineHeight: 1\.2/, replacement: "lineHeight: lineHeight.tight" },
    { pattern: /lineHeight: ['"]1\.3['"]/, replacement: "lineHeight: lineHeight.snug" },
    { pattern: /lineHeight: 1\.3/, replacement: "lineHeight: lineHeight.snug" },
    { pattern: /lineHeight: ['"]1\.4['"]/, replacement: "lineHeight: lineHeight.snug" },
    { pattern: /lineHeight: 1\.4/, replacement: "lineHeight: lineHeight.snug" },
    { pattern: /lineHeight: ['"]1\.5['"]/, replacement: "lineHeight: lineHeight.normal" },
    { pattern: /lineHeight: 1\.5/, replacement: "lineHeight: lineHeight.normal" },
    { pattern: /lineHeight: ['"]1\.6['"]/, replacement: "lineHeight: lineHeight.relaxed" },
    { pattern: /lineHeight: 1\.6/, replacement: "lineHeight: lineHeight.relaxed" },
    { pattern: /lineHeight: ['"]1\.7['"]/, replacement: "lineHeight: lineHeight.relaxed" },
    { pattern: /lineHeight: 1\.7/, replacement: "lineHeight: lineHeight.relaxed" },
    { pattern: /lineHeight: ['"]1\.8['"]/, replacement: "lineHeight: lineHeight.relaxed" },
    { pattern: /lineHeight: 1\.8/, replacement: "lineHeight: lineHeight.relaxed" },
  ],
  
  // Animation replacements
  animations: [
    { pattern: /transition: ['"]all 0\.15s/, replacement: "transition: transition.fast" },
    { pattern: /transition: ['"]all 0\.2s/, replacement: "transition: transition.fast" },
    { pattern: /transition: ['"]all 0\.3s/, replacement: "transition: transition.base" },
    { pattern: /transition: ['"]all 0\.4s/, replacement: "transition: transition.base" },
    { pattern: /transition: ['"]all 0\.5s/, replacement: "transition: transition.slow" },
    { pattern: /transition: ['"]all 0\.6s/, replacement: "transition: transition.slow" },
    { pattern: /transition: ['"]all 0\.8s/, replacement: "transition: transition.slower" },
    
    { pattern: /transition: { duration: 0\.2 }/, replacement: "transition: { duration: 0.15 }" },
    { pattern: /transition: { duration: 0\.3 }/, replacement: "transition: { duration: 0.3 }" },
    { pattern: /transition: { duration: 0\.5 }/, replacement: "transition: { duration: 0.5 }" },
    { pattern: /transition: { duration: 0\.6 }/, replacement: "transition: { duration: 0.5 }" },
    { pattern: /transition: { duration: 0\.8 }/, replacement: "transition: { duration: 0.8 }" },
  ],
  
  // Z-index replacements
  zIndex: [
    { pattern: /zIndex: 1(?!\d)/, replacement: "zIndex: zIndex.base" },
    { pattern: /zIndex: 2(?!\d)/, replacement: "zIndex: zIndex.base" },
    { pattern: /zIndex: 10(?!\d)/, replacement: "zIndex: zIndex.dropdown" },
    { pattern: /zIndex: 20(?!\d)/, replacement: "zIndex: zIndex.sticky" },
    { pattern: /zIndex: 30(?!\d)/, replacement: "zIndex: zIndex.overlay" },
    { pattern: /zIndex: 40(?!\d)/, replacement: "zIndex: zIndex.modal" },
    { pattern: /zIndex: 50(?!\d)/, replacement: "zIndex: zIndex.popover" },
    { pattern: /zIndex: 100(?!\d)/, replacement: "zIndex: zIndex.navbar" },
    { pattern: /zIndex: 999(?!\d)/, replacement: "zIndex: zIndex.navbar" },
    { pattern: /zIndex: 1000(?!\d)/, replacement: "zIndex: zIndex.navbar" },
    { pattern: /zIndex: 9999(?!\d)/, replacement: "zIndex: zIndex.toast" },
  ],
  
  // Color replacements
  colors: [
    { pattern: /#00ff7f/g, replacement: "colors.green.accent" },
    { pattern: /#00e673/g, replacement: "colors.green.darker" },
    { pattern: /#0d0d0d/g, replacement: "colors.black.primary" },
    { pattern: /#1a1a1a/g, replacement: "colors.black.secondary" },
    { pattern: /#2b2b2b/g, replacement: "colors.black.tertiary" },
    { pattern: /#f0f0f0/g, replacement: "colors.text.light" },
    { pattern: /#a0a0a0/g, replacement: "colors.text.medium" },
    { pattern: /#ffffff/g, replacement: "colors.text.heading" },
    { pattern: /#333333/g, replacement: "colors.border.default" },
    { pattern: /#4d4d4d/g, replacement: "colors.border.light" },
  ]
};

// Common patterns to look for:
const patternsToFind = [
  // Sections that should use utility classes
  "section style={{ padding:",
  "style={{ padding: '4rem",
  "style={{ padding: '100px",
  "style={{ padding: '80px",
  
  // Typography that needs updating
  "fontSize: 'clamp(",
  "fontWeight: '",
  "lineHeight: '",
  
  // Spacing that needs tokens
  "marginBottom: '",
  "marginTop: '",
  "gap: '",
  "padding: '",
  
  // Animations
  "transition: '",
  "duration: 0.",
  
  // Z-index
  "zIndex: ",
];

// Design System Application Guide
// ==============================
// 
// 1. Add import statement at the top of each file:
// import { space, fontSize, fontWeight, lineHeight, transition, colors, zIndex } from '../../utils/designTokens';
// 
// 2. Search for these patterns and replace with design tokens:
// patternsToFind.forEach(pattern => (`   - ${pattern}`));
// 
// 3. Use the replacements object above as a guide
// 
// 4. For sections, consider using className instead of inline styles:
//    - className='section' for standard padding
//    - className='section-lg' for large padding
//    - className='container' for max-width container

export default replacements;