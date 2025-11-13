import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChatModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Check if mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Topics for general assistance
  const topics = [
    { id: 'general', name: 'General Inquiry', field: 'general' },
    { id: 'websites', name: 'Websites & Apps', field: 'websites-and-apps' },
    { id: 'ai', name: 'AI Solutions', field: 'ai-solutions' },
    { id: 'cloud', name: 'Cloud Services', field: 'cloud-infrastructure' },
    { id: 'marketing', name: 'Digital Marketing', field: 'digital-marketing' }
  ];

  // Predefined questions based on topic
  const suggestedQuestions = {
    general: [
      "What services does Softeefi offer?",
      "How can I get a quote?",
      "What's your process?",
      "Do you offer support?"
    ],
    websites: [
      "What's included in a website?",
      "How long does it take?",
      "Do you build mobile apps?",
      "What about maintenance?"
    ],
    ai: [
      "How can AI help my business?",
      "What AI solutions do you offer?",
      "Is AI expensive?",
      "Can you integrate with existing systems?"
    ],
    cloud: [
      "What cloud platforms do you support?",
      "How secure is cloud hosting?",
      "Can you migrate my infrastructure?",
      "What about costs?"
    ],
    marketing: [
      "What marketing services do you offer?",
      "How do you measure success?",
      "Do you handle social media?",
      "What's your SEO approach?"
    ]
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when modal opens
      setMessages([{
        type: 'bot',
        text: "👋 Hi! I'm Softeefi's AI Assistant. I'm here to help you learn about our services and answer any questions. What would you like to know?"
      }]);
    }
  }, [isOpen, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (question = null) => {
    const messageText = question || inputValue.trim();
    if (!messageText || isLoading) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: messageText }]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Use the selected topic or default to general
      const field = selectedTopic?.field || 'general';
      
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          field: field,
          question: messageText
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: data.response 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: data.error || 'Sorry, I encountered an error. Please try again.' 
        }]);
      }
    } catch (error) {
      console.error('AI API Error:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: 'Sorry, I\'m having trouble connecting. Please check your connection and try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const adjustTextareaHeight = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const resetChat = () => {
    setMessages([{
      type: 'bot',
      text: "Chat reset! How can I help you today?"
    }]);
    setSelectedTopic(null);
    setInputValue('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - only on desktop */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 9998,
                cursor: 'pointer'
              }}
            />
          )}

          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? '100%' : 20, scale: isMobile ? 1 : 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isMobile ? '100%' : 20, scale: isMobile ? 1 : 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              bottom: isMobile ? 0 : '20px',
              right: isMobile ? 0 : '20px',
              width: isMobile ? '100%' : '420px',
              height: isMobile ? '100vh' : '600px',
              background: 'linear-gradient(135deg, #1a1f2e 0%, #0d1117 100%)',
              borderRadius: isMobile ? '0' : '24px',
              border: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: isMobile ? 'none' : '0 20px 60px rgba(0, 0, 0, 0.5)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              padding: isMobile ? '16px' : '20px',
              paddingTop: isMobile ? '40px' : '20px', // Extra space on mobile for status bar
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  margin: 0,
                  color: '#00ff7f',
                  fontSize: isMobile ? '1.1rem' : '1.25rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#00ff7f',
                    boxShadow: '0 0 10px #00ff7f',
                    animation: 'pulse 2s infinite'
                  }} />
                  AI Assistant
                </h3>
                <p style={{
                  margin: '4px 0 0 0',
                  color: '#8b949e',
                  fontSize: isMobile ? '0.8rem' : '0.875rem'
                }}>
                  {selectedTopic ? `Discussing: ${selectedTopic.name}` : 'How can I help you today?'}
                </p>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                {/* Reset button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={resetChat}
                  title="Reset chat"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    width: isMobile ? '36px' : '32px',
                    height: isMobile ? '36px' : '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#8b949e'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
                  </svg>
                </motion.button>
                
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    width: isMobile ? '36px' : '32px',
                    height: isMobile ? '36px' : '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#8b949e'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Topic Selection (if no topic selected and only welcome message) */}
            {messages.length === 1 && !selectedTopic && !isLoading && (
              <div style={{
                padding: isMobile ? '16px' : '20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                background: 'rgba(0, 0, 0, 0.1)'
              }}>
                <p style={{
                  color: '#8b949e',
                  fontSize: isMobile ? '0.8rem' : '0.875rem',
                  marginBottom: '12px'
                }}>
                  Choose a topic to get started:
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  {topics.map(topic => (
                    <motion.button
                      key={topic.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedTopic(topic)}
                      style={{
                        background: 'rgba(0, 255, 127, 0.1)',
                        border: '1px solid rgba(0, 255, 127, 0.3)',
                        borderRadius: '20px',
                        padding: isMobile ? '6px 12px' : '8px 16px',
                        color: '#00ff7f',
                        fontSize: isMobile ? '0.8rem' : '0.875rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {topic.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Container */}
            <div 
              className="chat-messages"
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: isMobile ? '16px' : '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? '12px' : '16px',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {/* Messages */}
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: 'flex',
                    justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    maxWidth: '80%',
                    padding: isMobile ? '10px 14px' : '12px 16px',
                    borderRadius: message.type === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: message.type === 'user' 
                      ? 'linear-gradient(135deg, #00ff7f, #00cc63)'
                      : 'rgba(255, 255, 255, 0.05)',
                    color: message.type === 'user' ? '#000' : '#fff',
                    fontSize: isMobile ? '0.9rem' : '0.95rem',
                    lineHeight: '1.5',
                    wordBreak: 'break-word',
                    boxShadow: message.type === 'user' 
                      ? '0 4px 15px rgba(0, 255, 127, 0.3)'
                      : '0 4px 15px rgba(0, 0, 0, 0.2)'
                  }}>
                    {message.text}
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start'
                  }}
                >
                  <div style={{
                    padding: isMobile ? '10px 14px' : '12px 16px',
                    borderRadius: '18px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center'
                  }}>
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.1
                        }}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#00ff7f'
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Suggested questions */}
              {selectedTopic && messages.length > 0 && messages.length < 3 && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p style={{
                    color: '#8b949e',
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                    marginBottom: '12px',
                    marginTop: '8px'
                  }}>
                    Quick questions:
                  </p>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    {suggestedQuestions[selectedTopic.id]?.slice(0, 2).map((question, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                        whileHover={{ scale: 1.02, x: 8 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSend(question)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '12px',
                          padding: isMobile ? '10px 14px' : '12px 16px',
                          textAlign: 'left',
                          color: '#c9d1d9',
                          fontSize: isMobile ? '0.85rem' : '0.9rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              padding: isMobile ? '12px' : '16px',
              paddingBottom: isMobile ? '20px' : '16px', // Extra space on mobile for home indicator
              background: 'rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: isMobile ? '10px 12px' : '14px 20px',
                display: 'flex',
                alignItems: 'flex-end',
                gap: isMobile ? '8px' : '12px'
              }}>
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onInput={adjustTextareaHeight}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: isMobile ? '0.95rem' : '1rem',
                    resize: 'none',
                    fontFamily: 'inherit',
                    outline: 'none',
                    minHeight: '24px',
                    maxHeight: '120px',
                    lineHeight: '1.5',
                    padding: 0,
                    margin: 0,
                    overflow: 'auto',
                    caretColor: '#00ff7f',
                    WebkitAppearance: 'none'
                  }}
                  rows={1}
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSend()}
                  disabled={isLoading || !inputValue.trim()}
                  style={{
                    background: inputValue.trim() ? 'linear-gradient(135deg, #00ff7f, #00cc63)' : 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    padding: isMobile ? '6px' : '8px',
                    cursor: isLoading || !inputValue.trim() ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    width: isMobile ? '32px' : '36px',
                    height: isMobile ? '32px' : '36px',
                    opacity: isLoading || !inputValue.trim() ? 0.5 : 1,
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill={inputValue.trim() ? '#000' : '#8b949e'} />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Styles */}
          <style jsx>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
            
            .chat-messages::-webkit-scrollbar {
              width: 6px;
            }
            
            .chat-messages::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.05);
              border-radius: 3px;
            }
            
            .chat-messages::-webkit-scrollbar-thumb {
              background: rgba(0, 255, 127, 0.3);
              border-radius: 3px;
            }
            
            .chat-messages::-webkit-scrollbar-thumb:hover {
              background: rgba(0, 255, 127, 0.5);
            }
            
            /* Mobile-specific styles */
            @media (max-width: 768px) {
              .chat-messages::-webkit-scrollbar {
                width: 0;
                display: none;
              }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
};

export default AIChatModal;