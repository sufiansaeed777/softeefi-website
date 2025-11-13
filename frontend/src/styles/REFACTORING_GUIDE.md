# Design System Refactoring Guide

## Summary of Changes Made

### 1. **CSS Variables Created** (in index.css)
- **Spacing System**: xs through 5xl (4px to 128px)
- **Typography Scale**: xs through 6xl (12px to 60px)  
- **Font Weights**: light (300) to bold (700)
- **Animation Speeds**: fast (0.15s) to slower (0.8s)
- **Z-Index Scale**: negative (-1) to toast (200)

### 2. **Utility Classes Added**
- Spacing: `.p-*`, `.m-*`, `.gap-*`
- Sections: `.section`, `.section-sm`, `.section-lg`
- Typography: `.text-*`, `.font-*`
- Components: `.card`, `.button`, `.button-secondary`
- Transitions: `.transition-fast`, `.transition-base`, `.transition-slow`

### 3. **Design Tokens File** (utils/designTokens.js)
- JavaScript constants matching CSS variables
- Helper functions for consistent styling
- Pre-defined style objects for common components

## How to Refactor Existing Pages

### Step 1: Replace Hard-Coded Spacing

**Before:**
```jsx
padding: '4rem 2rem'
margin: '3rem'
gap: '1.5rem'
```

**After:**
```jsx
// Using CSS classes
className="section"  // or "p-4xl"

// Using design tokens in JS
padding: `${space['4xl']} ${space.xl}`
margin: space['2xl']
gap: space.lg
```

### Step 2: Update Typography

**Before:**
```jsx
fontSize: '2.5rem'
fontWeight: 700
lineHeight: 1.2
```

**After:**
```jsx
// Using CSS classes
className="text-4xl font-bold"

// Using design tokens in JS
fontSize: fontSize['4xl']
fontWeight: fontWeight.bold
lineHeight: lineHeight.tight
```

### Step 3: Fix Animation Durations

**Before:**
```jsx
transition: 'all 0.3s ease'
transition: { duration: 0.6 }
```

**After:**
```jsx
// In CSS/style objects
transition: transition.base

// In Framer Motion
transition: { duration: 0.3 }  // Use consistent values
```

### Step 4: Update Z-Index Values

**Before:**
```jsx
zIndex: 10
zIndex: 999
```

**After:**
```jsx
zIndex: zIndex.dropdown  // or 10
zIndex: zIndex.navbar    // or 100
```

## Quick Reference Table

| Old Value | New Variable | CSS Class |
|-----------|--------------|-----------|
| `padding: 2rem` | `space.xl` | `.p-xl` |
| `padding: 3rem` | `space['2xl']` | `.p-2xl` |
| `padding: 4rem` | `space['3xl']` | `.p-3xl` |
| `margin: 1.5rem` | `space.lg` | `.m-lg` |
| `gap: 2rem` | `space.xl` | `.gap-xl` |
| `font-size: 1.5rem` | `fontSize['2xl']` | `.text-2xl` |
| `font-size: 2.5rem` | `fontSize['4xl']` | `.text-4xl` |
| `font-weight: 600` | `fontWeight.semibold` | `.font-semibold` |
| `font-weight: 700` | `fontWeight.bold` | `.font-bold` |
| `transition: 0.2s` | `transition.fast` | `.transition-fast` |
| `transition: 0.3s` | `transition.base` | `.transition-base` |

## Example: Refactoring a Section

### Original Code:
```jsx
<section style={{
  padding: '100px 20px',
  background: 'rgba(0, 0, 0, 0.3)'
}}>
  <h2 style={{
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    marginBottom: '20px',
    fontWeight: 800
  }}>
    Our Design Process
  </h2>
</section>
```

### Refactored Code:
```jsx
<section className="section-lg" style={{
  background: 'rgba(0, 0, 0, 0.3)'
}}>
  <h2 className="text-4xl font-bold" style={{
    fontSize: `clamp(${fontSize['4xl']}, 5vw, ${fontSize['5xl']})`,
    marginBottom: space.lg
  }}>
    Our Design Process
  </h2>
</section>
```

## Priority Files to Refactor

1. **Landing.js** - Partially done, needs completion
2. **UIUXDesign.js** - High priority, has many inconsistencies
3. **Contact.js** - Forms need consistent spacing
4. **Service pages** - All need standardization
5. **Navbar.js** - Complex but important for consistency

## Benefits After Refactoring

1. **Consistency**: All spacing, typography, and animations will be uniform
2. **Maintainability**: Change one variable, update everywhere
3. **Developer Experience**: Clear naming conventions and utilities
4. **Performance**: Reusable CSS classes reduce bundle size
5. **Accessibility**: Consistent focus states and transitions