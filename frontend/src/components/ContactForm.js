import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contactAPI } from '../services/api';

const ContactForm = ({ embedded = false, variant = 'default' }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Use the API service instead of direct fetch
      const data = await contactAPI.sendMessage(formState);
      
      setFormMessage({ 
        type: 'success', 
        text: 'Your message has been sent successfully! We will contact you soon.' 
      });
      setFormState({ name: '', email: '', phone: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormMessage({ type: '', text: '' });
      }, 5000);
    } catch (error) {
      setFormMessage({ 
        type: 'error', 
        text: error.message || 'Something went wrong. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear form message on component unmount
  useEffect(() => {
    return () => setFormMessage({ type: '', text: '' });
  }, []);

  // Style configurations based on variant
  const styles = {
    default: {
      background: 'rgba(13, 17, 23, 0.8)',
      border: '1px solid rgba(48, 54, 61, 0.5)',
      focusBorder: '#00ff7f',
      labelColor: '#e6edf3',
      textColor: '#ffffff'
    },
    home: {
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      focusBorder: '#00ff7f',
      labelColor: '#c9d1d9',
      textColor: '#ffffff'
    }
  };

  const currentStyle = styles[variant] || styles.default;

  return (
    <motion.form 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '1rem' : '1.5rem',
        width: '100%',
        maxWidth: variant === 'home' ? '500px' : '100%',
        margin: '0 auto'
      }}
    >
      <AnimatePresence>
        {formMessage.text && (
          <motion.div 
            style={{
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              textAlign: 'center',
              background: formMessage.type === 'success' ? 'rgba(0, 255, 127, 0.1)' : 'rgba(255, 0, 0, 0.1)',
              color: formMessage.type === 'success' ? '#00ff7f' : '#ff4444',
              border: `1px solid ${formMessage.type === 'success' ? 'rgba(0, 255, 127, 0.3)' : 'rgba(255, 0, 0, 0.3)'}`
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {formMessage.text}
          </motion.div>
        )}
      </AnimatePresence>

      {variant === 'home' ? (
        // Compact layout for home page
        <>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}
            >
              <label style={{
                color: currentStyle.labelColor,
                fontSize: '0.875rem',
                fontWeight: '500',
                textAlign: 'left'
              }}>Name *</label>
              <input 
                type="text" 
                name="name" 
                value={formState.name}
                onChange={handleChange}
                placeholder=""
                required 
                style={{
                  width: '100%',
                  background: currentStyle.background,
                  border: currentStyle.border,
                  borderRadius: '8px',
                  padding: '0 1rem',
                  fontSize: isMobile ? '0.95rem' : '1rem',
                  color: currentStyle.textColor,
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  height: '40px',
                  lineHeight: '38px',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = currentStyle.focusBorder;
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 255, 127, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}
            >
              <label style={{
                color: currentStyle.labelColor,
                fontSize: '0.875rem',
                fontWeight: '500',
                textAlign: 'left'
              }}>Email *</label>
              <input 
                type="email" 
                name="email" 
                value={formState.email}
                onChange={handleChange}
                placeholder=""
                required 
                style={{
                  width: '100%',
                  background: currentStyle.background,
                  border: currentStyle.border,
                  borderRadius: '8px',
                  padding: '0 1rem',
                  fontSize: isMobile ? '0.95rem' : '1rem',
                  color: currentStyle.textColor,
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  height: '40px',
                  lineHeight: '38px',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = currentStyle.focusBorder;
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 255, 127, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </motion.div>

          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}
            >
              <label style={{
                color: currentStyle.labelColor,
                fontSize: '0.875rem',
                fontWeight: '500',
                textAlign: 'left'
              }}>Phone <span style={{ fontSize: '0.75rem', color: '#8b949e' }}>(Optional)</span></label>
              <input 
                type="tel" 
                name="phone" 
                value={formState.phone}
                onChange={handleChange}
                placeholder=""
                style={{
                  width: '100%',
                  background: currentStyle.background,
                  border: currentStyle.border,
                  borderRadius: '8px',
                  padding: '0 1rem',
                  fontSize: isMobile ? '0.95rem' : '1rem',
                  color: currentStyle.textColor,
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  height: '40px',
                  lineHeight: '38px',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = currentStyle.focusBorder;
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 255, 127, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </motion.div>
            <div style={{ gridColumn: '2' }}></div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.375rem',
              width: '100%'
            }}
          >
            <label style={{
              color: currentStyle.labelColor,
              fontSize: '0.875rem',
              fontWeight: '500',
              textAlign: 'left'
            }}>Message *</label>
            <textarea 
              name="message" 
              value={formState.message}
              onChange={handleChange}
              placeholder=""
              required 
              rows="4"
              style={{
                width: '100%',
                background: currentStyle.background,
                border: currentStyle.border,
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                fontSize: isMobile ? '0.95rem' : '1rem',
                color: currentStyle.textColor,
                outline: 'none',
                transition: 'all 0.3s ease',
                resize: 'vertical',
                minHeight: '80px',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = currentStyle.focusBorder;
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 255, 127, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </motion.div>
        </>
      ) : (
        // Full layout for contact page
        <>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <label htmlFor="name" style={{
              color: currentStyle.labelColor,
              fontSize: '1rem',
              fontWeight: '500',
              marginBottom: '0.25rem'
            }}>Your Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formState.name}
              onChange={handleChange}
              required 
              style={{
                background: currentStyle.background,
                border: currentStyle.border,
                borderRadius: '8px',
                padding: '0 1rem',
                fontSize: '1rem',
                color: currentStyle.textColor,
                outline: 'none',
                transition: 'all 0.3s ease',
                height: '40px',
                lineHeight: '38px',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = currentStyle.focusBorder;
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 255, 127, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(48, 54, 61, 0.5)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <label htmlFor="email" style={{
              color: currentStyle.labelColor,
              fontSize: '1rem',
              fontWeight: '500',
              marginBottom: '0.25rem'
            }}>Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formState.email}
              onChange={handleChange}
              required 
              style={{
                background: currentStyle.background,
                border: currentStyle.border,
                borderRadius: '8px',
                padding: '0 1rem',
                fontSize: '1rem',
                color: currentStyle.textColor,
                outline: 'none',
                transition: 'all 0.3s ease',
                height: '40px',
                lineHeight: '38px',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = currentStyle.focusBorder;
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 255, 127, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(48, 54, 61, 0.5)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <label htmlFor="phone" style={{
              color: currentStyle.labelColor,
              fontSize: '1rem',
              fontWeight: '500',
              marginBottom: '0.25rem'
            }}>
              Phone Number <span style={{ fontSize: '0.8rem', color: '#8b949e' }}>(Optional)</span>
            </label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formState.phone}
              onChange={handleChange}
              placeholder=""
              style={{
                background: currentStyle.background,
                border: currentStyle.border,
                borderRadius: '8px',
                padding: '0 1rem',
                fontSize: '1rem',
                color: currentStyle.textColor,
                outline: 'none',
                transition: 'all 0.3s ease',
                height: '40px',
                lineHeight: '38px',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = currentStyle.focusBorder;
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 255, 127, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(48, 54, 61, 0.5)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <label htmlFor="message" style={{
              color: currentStyle.labelColor,
              fontSize: '1rem',
              fontWeight: '500',
              marginBottom: '0.25rem'
            }}>Message</label>
            <textarea 
              id="message" 
              name="message" 
              value={formState.message}
              onChange={handleChange}
              required 
              rows="5"
              style={{
                background: currentStyle.background,
                border: currentStyle.border,
                borderRadius: '8px',
                padding: '0.375rem 1rem',
                fontSize: '1rem',
                color: currentStyle.textColor,
                outline: 'none',
                transition: 'all 0.3s ease',
                resize: 'vertical',
                minHeight: '100px',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = currentStyle.focusBorder;
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 255, 127, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(48, 54, 61, 0.5)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </motion.div>
        </>
      )}
      
      <motion.button
        type="submit"
        disabled={isSubmitting}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{
          background: isSubmitting 
            ? 'linear-gradient(135deg, rgba(0, 255, 127, 0.5) 0%, rgba(0, 175, 96, 0.5) 100%)' 
            : 'linear-gradient(135deg, #00ff7f 0%, #00af60 100%)',
          color: '#0d1117',
          border: 'none',
          borderRadius: '8px',
          padding: isMobile ? '0.875rem 2rem' : '1rem 2.5rem',
          fontSize: variant === 'home' ? '1rem' : '1.1rem',
          fontWeight: '600',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          opacity: isSubmitting ? 0.7 : 1,
          marginTop: variant === 'home' ? '0' : '0.5rem',
          width: variant === 'home' ? '100%' : 'auto',
          maxWidth: variant === 'home' ? '400px' : 'none',
          alignSelf: variant === 'home' ? 'flex-start' : 'flex-start',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      >
        {isSubmitting ? (
          <>
            <motion.span
              style={{
                width: '16px',
                height: '16px',
                border: '2px solid #0d1117',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                display: 'inline-block'
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z"/>
            </svg>
          </>
        )}
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;