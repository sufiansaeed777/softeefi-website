import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AskAIModal = ({ show, service, position, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Check if mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Map service names to API field names
  const serviceToField = {
    'Websites & Apps': 'websites-and-apps',
    'AI Solutions': 'ai-solutions',
    'AI Automation': 'ai-solutions',
    'Cloud Solutions': 'cloud-infrastructure',
    'Cloud Hosting': 'cloud-infrastructure',
    'Digital Marketing & SEO': 'digital-marketing',
    'Digital Marketing': 'digital-marketing'
  };

  // Predefined questions for each service
  const aiQuestions = {
    'Websites & Apps': [
      "What's the best tech stack for a modern web app?",
      "Should I choose React or Vue.js for my project?",
      "How can I improve my website's performance?",
      "What are Progressive Web Apps (PWAs)?"
    ],
    'AI Solutions': [
      "How can AI improve my business processes?",
      "What's the difference between ChatGPT and custom AI?",
      "How do I integrate AI into my existing app?",
      "What are the costs of implementing AI?"
    ],
    'AI Automation': [
      "How can AI improve my business processes?",
      "What's the difference between ChatGPT and custom AI?",
      "How do I integrate AI into my existing app?",
      "What are the costs of implementing AI?"
    ],
    'Cloud Solutions': [
      "How do I implement cloud security best practices?",
      "What's the best cloud disaster recovery strategy?",
      "How do I set up auto-scaling for my cloud infrastructure?",
      "What are the benefits of serverless architecture?",
      "How do I migrate from on-premise to cloud?",
      "What's the difference between IaaS, PaaS, and SaaS?"
    ],
    'Cloud Hosting': [
      "How do I implement cloud security best practices?",
      "What's the best cloud disaster recovery strategy?",
      "How do I set up auto-scaling for my cloud infrastructure?",
      "What are the benefits of serverless architecture?",
      "How do I migrate from on-premise to cloud?",
      "What's the difference between IaaS, PaaS, and SaaS?"
    ],
    'Digital Marketing & SEO': [
      "How do I get my website to rank #1 on Google?",
      "What's the best content marketing strategy for 2025?",
      "How do I increase conversion rates on my website?",
      "What are the latest SEO algorithm updates?",
      "How do I create a viral social media campaign?",
      "What's the ROI of email marketing vs paid ads?"
    ],
    'Digital Marketing': [
      "How do I get my website to rank #1 on Google?",
      "What's the best content marketing strategy for 2025?",
      "How do I increase conversion rates on my website?",
      "What are the latest SEO algorithm updates?",
      "How do I create a viral social media campaign?",
      "What's the ROI of email marketing vs paid ads?"
    ]
  };

  useEffect(() => {
    if (show && service) {
      // Add welcome message when modal opens
      setMessages([{
        type: 'bot',
        text: `Hello! I'm your ${service} expert. I can answer questions about ${service} and help you understand how Softeefi can help your business. What would you like to know?`
      }]);
    } else {
      // Clear messages when modal closes
      setMessages([]);
      setInputValue('');
    }
  }, [show, service]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Service-specific system prompts for optimization
  const serviceSystemPrompts = {
    'Websites & Apps': `You are a web development expert assistant for Softeefi. IMPORTANT: You MUST ONLY answer questions related to web development, websites, web apps, mobile apps, and related technologies.

If asked about ANYTHING else (animals, general knowledge, non-web topics), politely redirect: "I'm specifically here to help with web and app development questions. For Websites & Apps expertise, I can discuss topics like React, Next.js, mobile apps, PWAs, UI/UX, and how Softeefi can build your digital solutions. What web development question can I help you with?"

Focus areas: React, Next.js, Node.js, mobile apps, PWAs, performance optimization, UI/UX best practices.`,
    
    'AI Solutions': `You are an AI implementation assistant for Softeefi. IMPORTANT: You MUST ONLY answer questions related to AI, machine learning, automation, and AI business solutions.

If asked about ANYTHING else (animals, general knowledge, non-AI topics), politely redirect: "I'm specifically here to help with AI and automation questions. For AI Solutions expertise, I can discuss ChatGPT integration, custom AI models, chatbots, automation, and how Softeefi can implement AI in your business. What AI question can I help you with?"

Focus areas: ChatGPT integration, custom AI models, chatbots, automation, NLP, computer vision, machine learning.`,
    
    'AI Automation': `You are an AI automation expert assistant for Softeefi. IMPORTANT: You MUST ONLY answer questions related to AI, automation, machine learning, and AI business solutions.

If asked about ANYTHING else (animals, general knowledge, non-AI topics), politely redirect: "I'm specifically here to help with AI automation questions. For AI Automation expertise, I can discuss ChatGPT integration, workflow automation, custom AI models, chatbots, and how Softeefi can automate your business processes. What AI automation question can I help you with?"

Focus areas: ChatGPT integration, workflow automation, custom AI models, chatbots, RPA, NLP, computer vision, machine learning.`,
    
    'Cloud Infrastructure': `You are a cloud infrastructure assistant for Softeefi. IMPORTANT: You MUST ONLY answer questions related to cloud computing, infrastructure, DevOps, and cloud services.

If asked about ANYTHING else (animals, general knowledge, non-cloud topics), politely redirect: "I'm specifically here to help with cloud infrastructure questions. For Cloud Infrastructure expertise, I can discuss AWS, Azure, Google Cloud, Kubernetes, scaling, and how Softeefi can build your cloud solutions. What cloud infrastructure question can I help you with?"

Focus areas: AWS, Azure, Google Cloud, Kubernetes, Docker, CI/CD, scaling, security, cost optimization.`,
    
    'Cloud Solutions': `You are a cloud solutions assistant for Softeefi. IMPORTANT: You MUST ONLY answer questions related to cloud computing, infrastructure, DevOps, and cloud services.

If asked about ANYTHING else (animals, general knowledge, non-cloud topics), politely redirect: "I'm specifically here to help with cloud solutions questions. For Cloud Solutions expertise, I can discuss AWS, Azure, Google Cloud, Kubernetes, scaling, and how Softeefi can build your cloud infrastructure. What cloud solutions question can I help you with?"

Focus areas: AWS, Azure, Google Cloud, Kubernetes, Docker, CI/CD, scaling, security, cost optimization.`,
    
    'Digital Marketing & SEO': `You are a digital marketing and SEO assistant for Softeefi. IMPORTANT: You MUST ONLY answer questions related to digital marketing, SEO, social media, online advertising, and marketing strategies.

If asked about ANYTHING else (animals, general knowledge, non-marketing topics), politely redirect: "I'm specifically here to help with digital marketing and SEO questions. For Digital Marketing & SEO expertise, I can discuss SEO strategies, content marketing, PPC, social media, and how Softeefi achieved 450% growth for clients. What marketing question can I help you with?"

Focus areas: SEO strategies, content marketing, PPC, social media, analytics, conversion optimization.`
  };

  const handleSend = async (question = null) => {
    const messageText = question || inputValue.trim();
    if (!messageText || isLoading) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: messageText }]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Use backend Gemini endpoint to avoid CORS issues
      const systemPrompt = serviceSystemPrompts[service] || serviceSystemPrompts['Websites & Apps'];
      
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: messageText,
          service: service,
          systemPrompt: systemPrompt
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: data.response 
        }]);
      } else {
        // Fallback to original AI endpoint
        const response = await fetch('/api/ai/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            field: serviceToField[service],
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

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          zIndex: 99999,
          cursor: 'pointer'
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 20 }}
        style={{
          position: 'fixed',
          top: isMobile ? 0 : `${position?.top}px`,
          left: isMobile ? 0 : `${position?.left}px`,
          right: isMobile ? 0 : 'auto',
          bottom: isMobile ? 0 : 'auto',
          width: isMobile ? '100%' : '550px',
          height: isMobile ? '100vh' : '600px',
          maxHeight: isMobile ? '100vh' : '600px',
          background: 'linear-gradient(135deg, #1a1f2e 0%, #0d1117 100%)',
          borderRadius: isMobile ? '0' : '20px',
          border: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: isMobile ? 'none' : '0 20px 60px rgba(0, 0, 0, 0.5)',
          zIndex: 100000,
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
          <div>
            <h3 style={{
              margin: 0,
              color: '#00ff7f',
              fontSize: isMobile ? '1.1rem' : '1.25rem',
              fontWeight: '600'
            }}>
              AI Assistant
            </h3>
            <p style={{
              margin: '4px 0 0 0',
              color: '#8b949e',
              fontSize: isMobile ? '0.8rem' : '0.875rem'
            }}>
              Get instant answers about {service}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
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

        {/* Messages Container */}
        <div 
          className="ai-modal-content"
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
          {/* Show messages */}
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
                borderRadius: '16px',
                background: message.type === 'user' 
                  ? 'linear-gradient(135deg, #00ff7f, #00cc63)'
                  : 'rgba(255, 255, 255, 0.05)',
                color: message.type === 'user' ? '#000' : '#fff',
                fontSize: isMobile ? '0.9rem' : '0.95rem',
                lineHeight: '1.5',
                wordBreak: 'break-word'
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
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                gap: '4px'
              }}>
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -5, 0] }}
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

          {/* Suggested questions (only show if no messages yet) */}
          {messages.length === 1 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                marginTop: '8px'
              }}
            >
              <p style={{
                color: '#8b949e',
                fontSize: isMobile ? '0.8rem' : '0.875rem',
                marginBottom: '12px'
              }}>
                Popular questions:
              </p>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {aiQuestions[service]?.map((question, idx) => (
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
                      padding: isMobile ? '12px 16px' : '16px 20px',
                      textAlign: 'left',
                      color: '#c9d1d9',
                      fontSize: isMobile ? '0.85rem' : '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      width: '100%'
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
          padding: isMobile ? '12px' : '16px',
          paddingBottom: isMobile ? '20px' : '16px', // Extra space on mobile for home indicator
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: isMobile ? '10px 12px' : '14px 20px',
            display: 'flex',
            alignItems: 'flex-end',
            gap: '8px'
          }}>
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onInput={adjustTextareaHeight}
              onKeyDown={handleKeyDown}
              placeholder="Message AI Assistant..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: isMobile ? '0.9rem' : '1rem',
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
                background: isLoading || !inputValue.trim() ? 'transparent' : 'rgba(0, 255, 127, 0.1)',
                border: isLoading || !inputValue.trim() ? 'none' : '1px solid rgba(0, 255, 127, 0.3)',
                padding: '4px',
                cursor: isLoading || !inputValue.trim() ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                opacity: isLoading || !inputValue.trim() ? 0.3 : 1,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!isLoading && inputValue.trim()) {
                  e.currentTarget.style.background = 'rgba(0, 255, 127, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading && inputValue.trim()) {
                  e.currentTarget.style.background = 'rgba(0, 255, 127, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.3)';
                }
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill={isLoading || !inputValue.trim() ? '#666' : '#00ff7f'} />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Styles for scrollbar */}
      <style jsx>{`
        .ai-modal-content::-webkit-scrollbar {
          width: 6px;
        }
        
        .ai-modal-content::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        
        .ai-modal-content::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 127, 0.3);
          border-radius: 3px;
        }
        
        .ai-modal-content::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 127, 0.5);
        }
      `}</style>
    </>
  );
};

export default AskAIModal;