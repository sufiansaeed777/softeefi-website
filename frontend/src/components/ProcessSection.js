import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// High-quality background images for each step
const backgroundImages = [
  'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070', // Discovery - Team meeting/consultation
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2064', // Design - UI/UX design process
  'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?q=80&w=2025', // Development - Coding
  'https://images.unsplash.com/photo-1560762484-813fc97650a0?q=80&w=2074', // Testing - Quality assurance
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015', // Launch - Analytics dashboard
];

// This is the individual card component. It calculates its animation based on scroll progress.
const ProcessCard = ({ step, index, totalSteps, scrollYProgress, isMobile }) => {
  // Calculate the start and end scroll progress points for this card's animation
  const cardStart = index / totalSteps;
  const cardEnd = (index + 1) / totalSteps;

  // Animate scale: Card starts smaller and scales up to 1 as it becomes the active card.
  const scale = useTransform(
    scrollYProgress, 
    [
      Math.max(0, cardStart - 0.1), 
      cardStart, 
      cardEnd, 
      Math.min(1, cardEnd + 0.1)
    ], 
    [
      0.9, 
      0.95, 
      1, 
      1
    ]
  );
  
  // Animate Y position: Cards slide up from bottom
  const isLastCard = index === totalSteps - 1;
  const yPos = useTransform(
    scrollYProgress,
    [
      Math.max(0, cardStart - 0.1),
      cardStart,
      cardEnd,
      Math.min(1, cardEnd + 0.1)
    ],
    isLastCard ? [
      '100%',
      '0%',
      '0%',
      '0%'  // Last card stays in place
    ] : [
      '100%',
      '0%',
      '0%',
      '-100%'
    ]
  );
  
  // Animate opacity: Fade in as the card starts to appear.
  const opacity = useTransform(
    scrollYProgress, 
    [
      Math.max(0, cardStart - 0.05), 
      cardStart, 
      cardEnd, 
      Math.min(1, cardEnd + 0.05)
    ], 
    isLastCard ? [0, 1, 1, 1] : [0, 1, 1, 0]  // Last card stays visible
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        scale,
        opacity,
        y: yPos,
        zIndex: totalSteps - index,
      }}
    >
      {/* Full-page background image - fully opaque */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${backgroundImages[index]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }} />
      
      {/* Gradient overlay for better text readability on mobile */}
      {isMobile && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50%',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.8) 100%)',
          pointerEvents: 'none',
        }} />
      )}
      
      {/* Text overlay directly on image */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? '15%' : '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        color: '#ffffff',
        width: isMobile ? '85%' : '90%',
        maxWidth: '800px',
        padding: isMobile ? '0 1rem' : '0',
      }}>
        <h3 style={{
          fontSize: isMobile ? 'clamp(1.8rem, 8vw, 2.5rem)' : 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '800',
          marginBottom: isMobile ? '0.75rem' : '1rem',
          textShadow: '0 0 30px rgba(0, 0, 0, 1), 3px 3px 10px rgba(0, 0, 0, 0.9), 0 0 50px rgba(0, 0, 0, 0.7)',
          lineHeight: isMobile ? '1.2' : '1.1',
        }}>
          <span style={{
            color: '#00ff7f',
            fontSize: isMobile ? '1rem' : '1.2rem',
            display: 'block',
            marginBottom: isMobile ? '0.4rem' : '0.5rem',
            fontWeight: '600',
            letterSpacing: '0.1em',
            textShadow: '0 0 20px rgba(0, 0, 0, 1), 2px 2px 8px rgba(0, 0, 0, 0.9)',
          }}>{step.number}</span>
          {step.title}
        </h3>
        <p style={{
          fontSize: isMobile ? 'clamp(0.95rem, 3.5vw, 1.1rem)' : 'clamp(1.1rem, 2vw, 1.4rem)',
          lineHeight: '1.6',
          textShadow: '0 0 20px rgba(0, 0, 0, 1), 2px 2px 8px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 0, 0, 0.7)',
          fontWeight: '400',
          padding: isMobile ? '0 0.5rem' : '0',
        }}>{step.description}</p>
      </div>
    </motion.div>
  );
};

// This is the main section component.
const ProcessSection = ({ processSteps, isMobile }) => {
  const containerRef = useRef(null);

  // useScroll tracks the scroll progress within the target container (containerRef).
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'], // Track full container scroll
  });

  return (
    // The main container's height is proportional to the number of cards, creating the "scroll runway".
    <section ref={containerRef} style={styles.mainContainer(processSteps.length, isMobile)}>
      {/* This wrapper becomes sticky, holding the animated content in view. */}
      <div style={styles.stickyWrapper}>
        <div style={styles.header}>
          <h2 style={styles.title}>Our Process</h2>
          <p style={styles.subtitle}>
            A proven methodology that delivers results every time.
          </p>
        </div>
        {/* Container for the stacking cards */}
        <div style={styles.cardsContainer(isMobile)}>
          {processSteps.map((step, index) => (
            <ProcessCard
              key={index}
              step={step}
              index={index}
              totalSteps={processSteps.length}
              scrollYProgress={scrollYProgress}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Styles for the component
const styles = {
  header: {
    textAlign: 'center',
    padding: '6rem 1rem 2rem',
    position: 'relative',
    zIndex: 10,
  },
  mainContainer: (numSteps, isMobile) => ({
    position: 'relative',
    height: isMobile ? `${numSteps * 80}vh` : `${numSteps * 100}vh`, // Reduced height on mobile
    background: '#0d1117',
    color: '#ffffff',
    zIndex: 1,
  }),
  stickyWrapper: {
    position: 'sticky',
    top: 0,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
  },
  title: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: '800',
    marginBottom: '0.5rem',
    color: '#00ff7f',
    textShadow: '0 0 20px rgba(0, 0, 0, 0.9), 2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.6)',
  },
  subtitle: {
    fontSize: 'clamp(0.95rem, 3vw, 1.2rem)',
    color: '#ffffff',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
    textShadow: '0 0 15px rgba(0, 0, 0, 0.9), 2px 2px 6px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.6)',
    padding: '0 1rem',
  },
  cardsContainer: (isMobile) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
  }),
};

export default ProcessSection;