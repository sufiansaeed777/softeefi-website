import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/focusStyles.css';
import './styles/spacingFixes.css';
import './styles/typography.css';
import './styles/mobile-optimization.css';
import App from './App';
import { initSentry } from './utils/sentry';
import setupErrorHandlers from './utils/errorHandler';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals, { logWebVitals } from './reportWebVitals';
// import { ThemeProvider } from './context/ThemeContext'; // Commented for future use

// Setup global error handlers (prevents script errors in development)
setupErrorHandlers();

// Initialize Sentry error monitoring
initSentry();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <ThemeProvider> */}
      <App />
    {/* </ThemeProvider> */}
  </React.StrictMode>
);

// Register service worker for offline support and caching (production only)
if (process.env.NODE_ENV === 'production') {
  serviceWorkerRegistration.register({
    onUpdate: (registration) => {
      console.log('New version available!');
      // You can show a notification to the user here
    },
    onSuccess: (registration) => {
      console.log('Service Worker registered for offline use!');
    }
  });
} else {
  // Unregister any existing service worker in development
  serviceWorkerRegistration.unregister();
}

// Measure and report Web Vitals
reportWebVitals(logWebVitals);


