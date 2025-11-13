# Softeefi Design System

## Overview
This design system ensures consistency across the entire website by providing standardized tokens for colors, spacing, typography, and animations.

## Usage Guidelines

### 1. Spacing
Always use the spacing variables instead of arbitrary values:

```css
/* ❌ Bad */
padding: 2rem;
margin: 24px;
gap: 1.5rem;

/* ✅ Good */
padding: var(--space-xl);    /* 32px */
margin: var(--space-lg);     /* 24px */
gap: var(--space-lg);        /* 24px */
```

**Spacing Scale:**
- `--space-xs`: 4px (tiny gaps, fine adjustments)
- `--space-sm`: 8px (small gaps, compact spacing)
- `--space-md`: 16px (default spacing)
- `--space-lg`: 24px (comfortable spacing)
- `--space-xl`: 32px (section spacing)
- `--space-2xl`: 48px (large section spacing)
- `--space-3xl`: 64px (hero sections)
- `--space-4xl`: 96px (major sections)
- `--space-5xl`: 128px (extra large sections)

### 2. Typography
Use the typography scale for all font sizes:

```css
/* ❌ Bad */
font-size: 1.8rem;
font-weight: 600;
line-height: 1.4;

/* ✅ Good */
font-size: var(--font-size-3xl);
font-weight: var(--font-weight-semibold);
line-height: var(--line-height-snug);
```

**Font Size Scale:**
- `--font-size-xs`: 12px (small labels, captions)
- `--font-size-sm`: 14px (secondary text)
- `--font-size-base`: 16px (body text)
- `--font-size-lg`: 18px (emphasized body text)
- `--font-size-xl`: 20px (small headings)
- `--font-size-2xl`: 24px (h4 headings)
- `--font-size-3xl`: 30px (h3 headings)
- `--font-size-4xl`: 36px (h2 headings)
- `--font-size-5xl`: 48px (h1 headings)
- `--font-size-6xl`: 60px (hero headings)

**Font Weights:**
- `--font-weight-light`: 300
- `--font-weight-normal`: 400
- `--font-weight-medium`: 500
- `--font-weight-semibold`: 600
- `--font-weight-bold`: 700

### 3. Animations
Consistent animation timing creates a cohesive feel:

```css
/* ❌ Bad */
transition: all 0.3s ease;
transition: transform 0.2s;

/* ✅ Good */
transition: all var(--transition-speed-base) var(--transition-easing);
transition: transform var(--transition-speed-fast) var(--transition-easing);
```

**Animation Speeds:**
- `--transition-speed-fast`: 0.15s (micro-interactions)
- `--transition-speed-base`: 0.3s (standard transitions)
- `--transition-speed-slow`: 0.5s (page transitions)
- `--transition-speed-slower`: 0.8s (complex animations)

### 4. Z-Index
Use the z-index scale to avoid conflicts:

```css
/* ❌ Bad */
z-index: 999;
z-index: 10;

/* ✅ Good */
z-index: var(--z-index-modal);
z-index: var(--z-index-dropdown);
```

**Z-Index Scale:**
- `--z-index-negative`: -1
- `--z-index-base`: 0
- `--z-index-dropdown`: 10
- `--z-index-sticky`: 20
- `--z-index-overlay`: 30
- `--z-index-modal`: 40
- `--z-index-popover`: 50
- `--z-index-tooltip`: 60
- `--z-index-navbar`: 100
- `--z-index-toast`: 200

### 5. Component Classes
Use predefined component classes for consistency:

```jsx
/* Sections */
<section className="section">...</section>           /* Standard section */
<section className="section-sm">...</section>        /* Small section */
<section className="section-lg">...</section>        /* Large section */

/* Cards */
<div className="card">...</div>                      /* Standard card */

/* Buttons */
<button className="button">Primary</button>
<button className="button button-secondary">Secondary</button>

/* Spacing utilities */
<div className="p-xl m-2xl">...</div>               /* Padding XL, Margin 2XL */
<div className="gap-lg">...</div>                   /* Gap large for flex/grid */

/* Typography utilities */
<h2 className="text-4xl font-bold">...</h2>
<p className="text-base font-normal">...</p>
```

### 6. Colors
Always use CSS variables for colors:

```css
/* ❌ Bad */
color: #00ff7f;
background: #1a1a1a;

/* ✅ Good */
color: var(--green-accent);
background: var(--black-secondary);
```

## Migration Guide

When updating existing components:

1. Replace hard-coded spacing values with variables
2. Update font sizes to use the scale
3. Replace animation durations with speed variables
4. Update z-index values to use the scale
5. Replace inline styles with utility classes where possible

## Examples

### Before:
```jsx
<section style={{
  padding: '4rem 2rem',
  background: '#1a1a1a'
}}>
  <h2 style={{
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '1.5rem'
  }}>
    Title
  </h2>
</section>
```

### After:
```jsx
<section className="section" style={{
  background: 'var(--black-secondary)'
}}>
  <h2 className="text-4xl font-bold" style={{
    marginBottom: 'var(--space-lg)'
  }}>
    Title
  </h2>
</section>
```

## Best Practices

1. **Consistency First**: Always check if a design token exists before creating custom values
2. **Semantic Usage**: Use tokens that match their intended purpose (e.g., `--space-lg` for comfortable spacing between elements)
3. **Avoid Magic Numbers**: Never use arbitrary values like `padding: 37px`
4. **Component Reuse**: Use existing component classes before creating new styles
5. **Responsive Design**: The spacing scale works well across all screen sizes