import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
// --- Core Components ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import FloatingContactWidget from './components/FloatingContactWidget';
import { LazyDataFlowAnimationSVGWrapper } from './components/LazyComponents';
import TawkTo from './components/TawkTo';
import Analytics, { trackSession } from './components/Analytics';

// --- Eagerly loaded components (needed immediately) ---
import { ProgressBar } from './components/LoadingStates';
import PageLoader from './components/PageLoader';
import { prefetchCommonRoutes } from './utils/routePrefetch';

// --- Lazy loaded page components (code splitting) ---
// Standard Pages
const Landing = lazy(() => import('./pages/Landing'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Terms = lazy(() => import('./pages/Terms'));
const FreeReports = lazy(() => import('./pages/FreeReports'));
const Process = lazy(() => import('./pages/Process'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Service Pages
const DigitalMarketingSEO = lazy(() => import('./pages/services/DigitalMarketingSEO'));
const GraphicDesigningPortfolio = lazy(() => import('./pages/services/GraphicDesigningPortfolio-old'));
const CloudServices = lazy(() => import('./pages/services/CloudServices'));
const DigitalArt = lazy(() => import('./pages/services/DigitalArt'));
const UIUXDesign = lazy(() => import('./pages/services/UIUXDesign'));
const WebsitesAndApps = lazy(() => import('./pages/services/WebsitesAndApps'));
const AISolutions = lazy(() => import('./pages/services/AISolutions'));
const SaaSDevelopment = lazy(() => import('./pages/services/SaaSDevelopment'));

// Project Pages
const CloudProjects = lazy(() => import('./pages/projects/CloudProjects'));
const DigitalMarketingProjects = lazy(() => import('./pages/projects/DigitalMarketingProjects'));

// Footer Pages
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const Blog = lazy(() => import('./pages/Blog'));

// Admin Dashboard
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
// AOS will be loaded dynamically when needed
import 'aos/dist/aos.css';

// Optional: Remove console logs for production
// console.log('App component is rendering');
//import CustomCursor from './components/CustomCursor';
function App() {
  const [isNavigating, setIsNavigating] = useState(false);
  
  useEffect(() => {
    // Dynamically load AOS for animations
    import('aos').then((AOS) => {
      AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true
      });
    });

    // Track user session
    trackSession();
    
    // Prefetch common routes after initial load
    prefetchCommonRoutes();

    // Detect mouse vs keyboard usage for better focus management
    let usingMouse = false;
    
    const handleMouseDown = () => {
      usingMouse = true;
      document.body.classList.add('using-mouse');
    };
    
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        usingMouse = false;
        document.body.classList.remove('using-mouse');
      }
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  // console.log('App component rendering inside function');
  return (
    <HelmetProvider>
      <div className="App"> {/* Keep a root div if needed for global styling or context */}
        <ErrorBoundary>
          <BrowserRouter>
          <ScrollToTop />
          <Analytics />
          <AnimatePresence>
            {isNavigating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 9999
                }}
              >
                <ProgressBar />
              </motion.div>
            )}
          </AnimatePresence>
        {/* Skip navigation link for accessibility */}
        <a 
          href="#main-content" 
          style={{
            position: 'absolute',
            left: '-9999px',
            top: '0',
            zIndex: 999,
            padding: '1rem',
            background: '#00ff7f',
            color: '#0d0d0d',
            textDecoration: 'none',
            fontWeight: 'bold',
            borderRadius: '0 0 8px 0'
          }}
          onFocus={(e) => {
            e.target.style.left = '0';
          }}
          onBlur={(e) => {
            e.target.style.left = '-9999px';
          }}
        >
          Skip to main content
        </a>
        <Navbar />

        {/* Use <main> and the 'page-wrapper' class for correct padding */}
        <main id="main-content" className="page-wrapper">
          <Suspense fallback={<PageLoader />}>
            <Routes>
            {/* --- Standard Routes --- */}
            <Route
              path="/"
              element={<Landing />} // Your landing/home page
            />
            <Route path="/process" element={<Process />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms-of-service" element={<Terms />} /> {/* Match footer link path */}
            <Route path="/free-learning" element={<FreeReports />} />


            {/* --- SERVICE ROUTES (NEW STRUCTURE) --- */}
            {/* Core Services - 6 main offerings */}
            <Route path="/services/websites-and-apps" element={<WebsitesAndApps />} />
            <Route path="/services/ai-solutions" element={<AISolutions />} />
            <Route path="/services/saas-development" element={<SaaSDevelopment />} />
            <Route path="/services/ui-ux-design" element={<UIUXDesign />} />
            <Route path="/services/cloud-infrastructure" element={<CloudServices />} />
            <Route path="/services/digital-marketing-seo" element={<DigitalMarketingSEO />} />
            
            {/* Legacy routes - temporarily kept for existing links */}
            {/* These will redirect to new structure or be removed */}
            {/* <Route path="/services/website-development" element={<WebsiteDevelopment />} /> */}
            {/* <Route path="/services/app-development" element={<AppDevelopment />} /> */}
            
            {/* Creative Services Routes - Accessible from footer */}
            <Route path="/services/graphic-design" element={<GraphicDesigningPortfolio />} />
            {/* <Route path="/services/video-production" element={<VideoProduction />} /> */}
            <Route path="/services/digital-art-nfts" element={<DigitalArt />} />

            {/* Project Pages Routes */}
            <Route path="/projects/cloud-infrastructure" element={<CloudProjects />} />
            <Route path="/projects/digital-marketing" element={<DigitalMarketingProjects />} />

            {/* Footer Link Routes - Add as needed */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/blog" element={<Blog />} />
            
            {/* Admin Dashboard Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            
            {/* 404 Not Found Route */}
            <Route path="*" element={<NotFound />} />

            </Routes>
          </Suspense>
        </main>

        <Footer />
        
        <FloatingContactWidget />
        <TawkTo />
        </BrowserRouter>
      </ErrorBoundary>
    </div>
    </HelmetProvider>
  );
}

export default App;