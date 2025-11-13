import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChatbot = ({ isOpen: externalIsOpen, onClose: externalOnClose }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalOnClose ? () => externalOnClose() : setInternalIsOpen;
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

  // Listen for custom event to open chatbot (only if not controlled externally)
  useEffect(() => {
    if (externalIsOpen === undefined) {
      const handleOpenChatbot = () => {
        setInternalIsOpen(true);
      };
      
      window.addEventListener('openAIChatbot', handleOpenChatbot);
      return () => window.removeEventListener('openAIChatbot', handleOpenChatbot);
    }
  }, [externalIsOpen]);

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
      "How can I get a quote for my project?",
      "What industries do you work with?",
      "Do you offer ongoing support?"
    ],
    websites: [
      "What's included in a custom website?",
      "How long does development take?",
      "Do you build mobile apps?",
      "What about website maintenance?"
    ],
    ai: [
      "How can AI help my business?",
      "What AI solutions do you offer?",
      "Is AI expensive to implement?",
      "Can you integrate AI with existing systems?"
    ],
    cloud: [
      "What cloud platforms do you support?",
      "How secure is cloud hosting?",
      "Can you migrate my existing infrastructure?",
      "What about cloud costs?"
    ],
    marketing: [
      "What digital marketing services do you offer?",
      "How do you measure success?",
      "Do you handle social media?",
      "What's your SEO approach?"
    ]
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chatbot opens
      setMessages([{
        type: 'bot',
        text: "👋 Hi! I'm Softeefi's AI Assistant. I'm here to help you learn about our services and answer any questions you might have. What would you like to know about?"
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
      // Use backend Gemini endpoint to avoid CORS issues
      const field = selectedTopic?.field || 'general';
      
      // General chatbot system prompt
      const systemPrompt = `You are Softeefi's friendly AI assistant. You help visitors understand Softeefi's services and guide them to the right solutions. 
Key services: Web Development, AI Solutions, Cloud Infrastructure, Digital Marketing & SEO.
Be conversational, helpful, and professional. Always aim to understand the visitor's needs and suggest relevant services.
If asked about pricing, mention that Softeefi offers custom quotes based on project requirements.
Keep responses concise (under 150 words) and engaging.`;
      
      const contextPrompt = field !== 'general' 
        ? `The user is specifically interested in ${selectedTopic?.name}. Focus your response on this area while remaining helpful and informative.`
        : '';
      
      const fullPrompt = `${systemPrompt}\n${contextPrompt}`;
      
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: messageText,
          service: selectedTopic?.name || 'General',
          systemPrompt: fullPrompt
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: data.response 
        }]);
      } else {
        // Fallback to original AI endpoint if Gemini fails
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
            text: 'Sorry, I encountered an error. Please try again.' 
          }]);
        }
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
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const resetChat = () => {
    setMessages([{
      type: 'bot',
      text: "Chat reset! How can I help you today?"
    }]);
    setSelectedTopic(null);
  };

  return (
    <>
      {/* Floating Chat Button - only show if not controlled externally */}
      <AnimatePresence>
        {!isOpen && externalIsOpen === undefined && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setInternalIsOpen(true)}
            style={{
              position: 'fixed',
              bottom: isMobile ? '20px' : '30px',
              right: isMobile ? '20px' : '30px',
              width: isMobile ? '56px' : '60px',
              height: isMobile ? '56px' : '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)',
              border: 'none',
              boxShadow: '0 10px 30px rgba(0, 255, 127, 0.4)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9998,
              color: '#000'
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2a4 4 0 0 1 4 4v1h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v1a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v-1H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3V6a4 4 0 0 1 4-4h2"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            
            {/* Pulse animation */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1.5, 1],
                opacity: [1, 0.5, 0, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)',
                zIndex: -1
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20 }}
            style={{
              position: 'fixed',
              bottom: isMobile ? '0' : '30px',
              right: isMobile ? '0' : '30px',
              width: isMobile ? '100vw' : '420px',
              height: isMobile ? '100vh' : '600px',
              background: 'linear-gradient(135deg, #1a1f2e 0%, #0d1117 100%)',
              borderRadius: isMobile ? '0' : '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(0, 0, 0, 0.2)'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  margin: 0,
                  color: '#00ff7f',
                  fontSize: '1.25rem',
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
                  fontSize: '0.875rem'
                }}>
                  {selectedTopic ? `Discussing: ${selectedTopic.name}` : 'How can I help you today?'}
                </p>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', position: 'relative', zIndex: 10 }}>
                {/* Reset button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={resetChat}
                  title="Reset chat"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '2px solid rgba(255, 255, 255, 0.4)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 255, 127, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }}
                >
                  <span style={{ 
                    color: '#ffffff', 
                    fontSize: '20px', 
                    fontWeight: 'bold',
                    lineHeight: '1',
                    fontFamily: 'Arial, sans-serif'
                  }}>↻</span>
                </motion.button>
                
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (externalOnClose) {
                      externalOnClose();
                    } else {
                      setInternalIsOpen(false);
                    }
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '2px solid rgba(255, 255, 255, 0.4)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 59, 48, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(255, 59, 48, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }}
                >
                  <span style={{ 
                    color: '#ffffff', 
                    fontSize: '24px', 
                    fontWeight: 'bold',
                    lineHeight: '1',
                    fontFamily: 'Arial, sans-serif'
                  }}>×</span>
                </motion.button>
              </div>
            </div>

            {/* Topic Selection (if no topic selected and only welcome message) */}
            {messages.length === 1 && !selectedTopic && !isLoading && (
              <div style={{
                padding: '20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <p style={{
                  color: '#8b949e',
                  fontSize: '0.875rem',
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
                        padding: '8px 16px',
                        color: '#00ff7f',
                        fontSize: '0.875rem',
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
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
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
                    padding: '12px 16px',
                    borderRadius: message.type === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: message.type === 'user' 
                      ? 'linear-gradient(135deg, #00ff7f, #00cc63)'
                      : 'rgba(255, 255, 255, 0.05)',
                    color: message.type === 'user' ? '#000' : '#fff',
                    fontSize: '0.95rem',
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
                    padding: '12px 16px',
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
                    fontSize: '0.875rem',
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
                          padding: '12px 16px',
                          textAlign: 'left',
                          color: '#c9d1d9',
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                          e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.3)';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                          e.currentTarget.style.color = '#c9d1d9';
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
              padding: '16px',
              background: 'rgba(0, 0, 0, 0.2)'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'flex-end',
                gap: '12px'
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
                    fontSize: '1rem',
                    resize: 'none',
                    fontFamily: 'inherit',
                    outline: 'none',
                    minHeight: '24px',
                    maxHeight: '120px',
                    lineHeight: '1.5',
                    padding: 0,
                    margin: 0,
                    overflow: 'auto',
                    caretColor: '#00ff7f'
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
                    padding: '8px',
                    cursor: isLoading || !inputValue.trim() ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    opacity: isLoading || !inputValue.trim() ? 0.5 : 1,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill={inputValue.trim() ? '#000' : '#8b949e'} />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
      `}</style>
    </>
  );
};

export default AIChatbot;