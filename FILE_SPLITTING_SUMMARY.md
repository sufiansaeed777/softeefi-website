# File Splitting Guide

## For Regular Large Files (1000-2000 lines): Use 2-3 files

1. **Components file** - Icons, reusable components, and data
2. **Main file** - Page logic and layout

## For Very Large Files (3000+ lines): Use 4-5 files

### Example: DigitalMarketingSEO.js (3156 lines → 5 files)

#### 1. DigitalMarketingIcons.js (~20 lines)
- All SVG icon components
- Clean, single-purpose file

#### 2. DigitalMarketingData.js (~150 lines)
- Services array
- Portfolio items array
- Process steps array
- Testimonials array
- Pricing plans array
- FAQ data

#### 3. DigitalMarketingStyles.js (~200 lines)
- CSS animations (keyframes)
- Style objects for components
- Shared style constants

#### 4. DigitalMarketingSections.js (~600 lines)
- HeroSection component
- ServicesGrid component
- PortfolioGrid component
- ProcessSteps component
- TestimonialsSection component
- CTASection component

#### 5. DigitalMarketingSEO.js (main file ~250 lines)
- State management (useState, useEffect)
- Event handlers
- Main layout structure
- Section composition

## Benefits of This Structure:

1. **Clear Separation of Concerns**
   - Icons: Visual assets
   - Data: Content and configuration
   - Styles: Appearance and animations
   - Sections: UI components
   - Main: Logic and composition

2. **Easy Maintenance**
   - Update content without touching code
   - Modify styles without affecting logic
   - Reuse components across pages
   - Clear file purposes

3. **Better Performance**
   - Smaller files parse faster
   - Easier code splitting
   - Better caching

4. **Team Collaboration**
   - Designers can work on styles
   - Content editors can update data
   - Developers can focus on logic

## When to Use Each Approach:

### 2-3 Files (Simple Split):
- Files under 2000 lines
- Limited data/content
- Few reusable components
- Simple styling

### 4-5 Files (Advanced Split):
- Files over 3000 lines
- Lots of data arrays
- Complex animations/styles
- Multiple section components
- Heavy business logic

## Files Still to Split:
1. **GraphicDesigningPortfolio.js** (2864 lines) - Use 4-5 file split
2. **DigitalArt.js** (1407 lines) - Use 2-3 file split
3. **Contact.js** (1290 lines) - Use 2-3 file split
4. **CloudServices.js** (1191 lines) - Use 2-3 file split
5. **Navbar.js** (1187 lines) - Use 2-3 file split

## Important Notes:
- The new DigitalMarketingSEO.js is now only ~250 lines (from 3156!)
- All functionality remains exactly the same
- No visual changes whatsoever
- Much easier to maintain and understand