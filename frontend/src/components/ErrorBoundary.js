import React from 'react';
import { motion } from 'framer-motion';
import Logger from '../utils/logger';
import { space, fontSize, fontWeight, colors } from '../utils/designTokens';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Logger.error('Error caught by ErrorBoundary', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      const isMobile = window.innerWidth <= 768;
      
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? space.md : space['2xl'],
          background: colors.black.primary,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          overflowY: 'auto'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center',
              maxWidth: isMobile ? '90%' : '600px',
              width: '100%',
              padding: isMobile ? space.lg : space['2xl'],
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)',
              margin: 'auto'
            }}
          >
            <div style={{
              fontSize: isMobile ? fontSize['3xl'] : fontSize['5xl'],
              marginBottom: space.lg,
              filter: 'hue-rotate(180deg)'
            }}>
              ⚠️
            </div>
            <h2 style={{
              color: colors.text.heading,
              fontSize: isMobile ? fontSize.xl : fontSize['2xl'],
              fontWeight: fontWeight.bold,
              marginBottom: space.md
            }}>
              Oops! Something went wrong
            </h2>
            <p style={{
              color: colors.text.medium,
              fontSize: isMobile ? fontSize.sm : fontSize.base,
              marginBottom: space.xl,
              lineHeight: 1.6
            }}>
              We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{
                textAlign: 'left',
                marginTop: space.xl,
                padding: isMobile ? space.sm : space.lg,
                background: 'rgba(255, 0, 0, 0.1)',
                borderRadius: '8px',
                fontSize: fontSize.sm,
                color: '#ff6b6b'
              }}>
                <summary style={{ 
                  cursor: 'pointer', 
                  marginBottom: space.md,
                  fontSize: isMobile ? fontSize.xs : fontSize.sm,
                  fontWeight: fontWeight.medium
                }}>
                  Error Details (Development Only)
                </summary>
                <pre style={{ 
                  overflow: 'auto', 
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontFamily: 'monospace',
                  fontSize: isMobile ? '10px' : fontSize.xs,
                  maxHeight: isMobile ? '200px' : '400px',
                  padding: space.sm,
                  background: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '4px'
                }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              style={{
                padding: isMobile ? `${space.sm} ${space.lg}` : `${space.md} ${space.xl}`,
                background: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
                color: colors.black.primary,
                border: 'none',
                borderRadius: '30px',
                fontSize: isMobile ? fontSize.sm : fontSize.base,
                fontWeight: fontWeight.semibold,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0, 255, 127, 0.3)',
                marginTop: space.md,
                width: isMobile ? '100%' : 'auto',
                minHeight: isMobile ? '44px' : 'auto'
              }}
            >
              Refresh Page
            </motion.button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;