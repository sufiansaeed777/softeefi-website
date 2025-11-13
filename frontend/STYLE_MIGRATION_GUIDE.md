# Style Migration Guide

## Quick Migration from Inline Styles to CSS Modules

### 🚀 New CSS Module System Structure

```
src/styles/
├── base.module.css       # Layout, typography, spacing
├── components.module.css # Buttons, cards, forms, etc.
├── animations.module.css # All animations and transitions
└── [page].module.css     # Page-specific styles
```

### 📦 Import Pattern

```javascript
// Old (inline styles)
<div style={{
  padding: '2rem',
  background: 'linear-gradient(...)',
  borderRadius: '20px'
}}>

// New (CSS modules)
import styles from '../styles/components.module.css';
<div className={styles.card}>
```

### 🔄 Common Conversions

#### Sections
```javascript
// OLD
<section style={{
  padding: isMobile ? '4rem 1rem' : '6rem 2rem',
  background: '#0d1117',
  position: 'relative',
  overflow: 'hidden'
}}>

// NEW
import Section from '../components/Section';
<Section variant="dark">
```

#### Buttons
```javascript
// OLD
<button style={{
  background: 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)',
  color: '#0d1117',
  padding: '1rem 2rem',
  borderRadius: '50px',
  // ... more styles
}}>

// NEW
import Button from '../components/Button';
<Button variant="primary" size="large">
```

#### Cards
```javascript
// OLD
<div style={{
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  padding: '2rem',
  // ... more styles
}}>

// NEW
import styles from '../styles/components.module.css';
<div className={styles.card}>
```

### 🎯 Style Mapping Reference

| Inline Style | CSS Module Class |
|--------------|------------------|
| `display: 'flex'` | `baseStyles.flex` |
| `alignItems: 'center', justifyContent: 'center'` | `baseStyles.flexCenter` |
| `display: 'grid'` | `baseStyles.grid` |
| `textAlign: 'center'` | `baseStyles.textCenter` |
| `position: 'relative'` | `baseStyles.relative` |
| `padding: '2rem'` | `baseStyles.p2` |
| `margin: '0'` | `baseStyles.m0` |
| `fontSize: 'clamp(2.5rem, 5vw, 4rem)'` | `baseStyles.headingXl` |
| `background: 'linear-gradient(#00ff7f...)'` | `baseStyles.headingGradient` |

### 🛠️ Utility Functions

```javascript
import { cx, cn } from '../utils/styles';

// Combine multiple classes
className={cx(styles.card, styles.cardHover, isActive && styles.cardActive)}

// Conditional classes
className={cn({
  [styles.card]: true,
  [styles.cardActive]: isActive,
  [styles.cardDisabled]: isDisabled
})}
```

### 📝 Migration Checklist

For each component:

1. ✅ Import necessary CSS modules
2. ✅ Replace inline styles with className
3. ✅ Use utility components (Button, Section, etc.)
4. ✅ Move component-specific styles to module
5. ✅ Test responsive behavior
6. ✅ Verify animations still work

### 🎨 Creating New Component Styles

```css
/* components/MyComponent.module.css */
.container {
  /* Use base styles composition */
  composes: flexCenter from '../styles/base.module.css';
  /* Add specific styles */
  padding: 2rem;
  background: rgba(0, 0, 0, 0.5);
}
```

### 💡 Tips

1. **Start with high-impact pages** (Landing, Services)
2. **Use Section component** for all page sections
3. **Use Button component** for all buttons
4. **Compose styles** rather than duplicate
5. **Keep page-specific styles** in page modules

### 🚨 Common Pitfalls

- Don't mix inline styles with CSS modules
- Don't forget to import animation styles
- Remember mobile-first approach
- Use semantic class names

### 📊 Performance Benefits

- **50% smaller bundle** - No duplicate inline styles
- **Better caching** - CSS files cached separately
- **Faster renders** - No style recalculation
- **Cleaner code** - Easier to maintain

## Example Migration

```javascript
// Before (500+ lines with inline styles)
const Landing = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <section style={{ padding: '6rem 2rem', /* 20+ more */ }}>
        // ...
      </section>
    </div>
  );
};

// After (200 lines with CSS modules)
import baseStyles from '../styles/base.module.css';
import styles from './Landing.module.css';
import Section from '../components/Section';

const Landing = () => {
  return (
    <div className={baseStyles.page}>
      <Section variant="hero">
        // ...
      </Section>
    </div>
  );
};
```

Start migrating component by component for best results!