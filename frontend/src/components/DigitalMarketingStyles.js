// CSS Animations and Styles for Digital Marketing Page

export const animations = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0) translateX(0);
      opacity: 0.5;
    }
    25% {
      transform: translateY(-20px) translateX(10px);
      opacity: 0.8;
    }
    50% {
      transform: translateY(10px) translateX(-10px);
      opacity: 0.6;
    }
    75% {
      transform: translateY(-10px) translateX(5px);
      opacity: 0.7;
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.3;
    }
  }
  
  @keyframes glow {
    0%, 100% {
      text-shadow: 0 0 20px rgba(0, 255, 127, 0.5);
    }
    50% {
      text-shadow: 0 0 40px rgba(0, 255, 127, 0.8);
    }
  }
  
  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 200%;
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes rotateIn {
    from {
      opacity: 0;
      transform: rotate(-180deg) scale(0.5);
    }
    to {
      opacity: 1;
      transform: rotate(0deg) scale(1);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const styles = {
  page: {
    minHeight: '100vh',
    background: '#0d1117',
    color: '#ffffff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    transition: 'opacity 0.5s ease-in-out',
    overflow: 'hidden'
  },
  
  heroSection: {
    minHeight: '50vh',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 2rem',
    overflow: 'hidden'
  },
  
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(13,17,23,1) 0%, rgba(0,30,60,0.95) 50%, rgba(0,255,127,0.1) 100%)'
  },
  
  serviceCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: typeof window !== 'undefined' && window.innerWidth <= 768 ? '1.5rem' : '3rem',
    minHeight: 'auto',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  
  portfolioCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '20px',
    overflow: 'hidden',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '2px solid rgba(0, 255, 127, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
    animation: 'fadeInUp 0.8s ease-out 0.1s both'
  },
  
  processStep: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
    borderRadius: '20px',
    padding: typeof window !== 'undefined' && window.innerWidth <= 768 ? '1.5rem' : '3rem',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  },
  
  testimonialCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: typeof window !== 'undefined' && window.innerWidth <= 768 ? '1.5rem' : '2.5rem',
    position: 'relative',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease'
  },
  
  ctaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    padding: typeof window !== 'undefined' && window.innerWidth <= 768 ? '0.8rem 1.5rem' : '1rem 2.5rem',
    fontSize: typeof window !== 'undefined' && window.innerWidth <= 768 ? '1rem' : '1.1rem',
    fontWeight: '600',
    color: '#0d1117',
    background: 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    position: 'relative',
    overflow: 'hidden',
    textAlign: 'center',
    width: typeof window !== 'undefined' && window.innerWidth <= 768 ? '100%' : 'auto',
    maxWidth: '100%',
    boxSizing: 'border-box'
  }
};