import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LiveChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'agent',
      text: 'Hi! How can we help you today?',
      timestamp: new Date(),
      buttons: ['I have a question', 'Tell me more about your services']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        text: inputValue,
        timestamp: new Date()
      };
      
      setMessages([...messages, newMessage]);
      setInputValue('');
      
      // Simulate agent typing
      setIsTyping(true);
      
      // Simulate agent response
      setTimeout(() => {
        const responses = [
          "Thanks for your message! I'll help you with that.",
          "Let me connect you with our team right away.",
          "I understand your needs. Here's what we can do for you...",
          "Great question! Let me provide you with more information."
        ];
        
        const agentMessage = {
          id: messages.length + 2,
          type: 'agent',
          text: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, agentMessage]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleButtonClick = (buttonText) => {
    setInputValue(buttonText);
    handleSend();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1998,
              backdropFilter: 'blur(4px)'
            }}
          />
          
          {/* Chat Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '20px',
              width: '380px',
              height: '600px',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
              zIndex: 1999,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #00ff7f 0%, #00d68f 100%)',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#ffffff'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '8px',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#ffffff'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Customer Support</h3>
                  <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>We typically reply in minutes</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#ffffff',
                  padding: '4px'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1"/>
                  <circle cx="12" cy="5" r="1"/>
                  <circle cx="12" cy="19" r="1"/>
                </svg>
              </motion.button>
            </div>

            {/* Messages Area */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              backgroundColor: '#f8f9fa'
            }}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: 'flex',
                    justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    maxWidth: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    {message.type === 'agent' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #00ff7f 0%, #00d68f 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}>
                          S
                        </div>
                        <span style={{ fontSize: '12px', color: '#666' }}>Support Team</span>
                      </div>
                    )}
                    
                    <div style={{
                      backgroundColor: message.type === 'user' ? '#00ff7f' : '#ffffff',
                      color: message.type === 'user' ? '#000000' : '#333333',
                      padding: '12px 16px',
                      borderRadius: message.type === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      wordBreak: 'break-word'
                    }}>
                      {message.text}
                    </div>
                    
                    {message.buttons && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                        {message.buttons.map((button, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleButtonClick(button)}
                            style={{
                              background: '#ffffff',
                              border: '2px solid #00ff7f',
                              borderRadius: '20px',
                              padding: '8px 16px',
                              fontSize: '14px',
                              color: '#00d68f',
                              cursor: 'pointer',
                              fontWeight: '500',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#00ff7f';
                              e.currentTarget.style.color = '#000000';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#ffffff';
                              e.currentTarget.style.color = '#00d68f';
                            }}
                          >
                            {button}
                          </motion.button>
                        ))}
                      </div>
                    )}
                    
                    <span style={{
                      fontSize: '11px',
                      color: '#999',
                      marginLeft: message.type === 'agent' ? '40px' : '0',
                      textAlign: message.type === 'user' ? 'right' : 'left'
                    }}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00ff7f 0%, #00d68f 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    S
                  </div>
                  <div style={{
                    backgroundColor: '#ffffff',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    gap: '4px'
                  }}>
                    <span className="typing-dot">•</span>
                    <span className="typing-dot" style={{ animationDelay: '0.2s' }}>•</span>
                    <span className="typing-dot" style={{ animationDelay: '0.4s' }}>•</span>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{
              padding: '16px',
              borderTop: '1px solid #e0e0e0',
              backgroundColor: '#ffffff'
            }}>
              <div style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-end'
              }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type here and press enter..."
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: '24px',
                    border: '2px solid #e0e0e0',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    backgroundColor: '#f8f9fa'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00ff7f';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e0e0e0';
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  style={{
                    padding: '10px',
                    borderRadius: '50%',
                    border: 'none',
                    background: inputValue.trim() ? '#00ff7f' : '#e0e0e0',
                    color: inputValue.trim() ? '#000000' : '#999999',
                    cursor: inputValue.trim() ? 'pointer' : 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  disabled={!inputValue.trim()}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              </div>
              
              <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '8px',
                justifyContent: 'center'
              }}>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '4px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                </button>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '4px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
                  </svg>
                </button>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '4px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
          
          <style jsx>{`
            .typing-dot {
              animation: typing 1.4s infinite;
              font-size: 20px;
              color: #00ff7f;
            }
            
            @keyframes typing {
              0%, 60%, 100% {
                opacity: 0.3;
                transform: translateY(0);
              }
              30% {
                opacity: 1;
                transform: translateY(-10px);
              }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
};

export default LiveChat;