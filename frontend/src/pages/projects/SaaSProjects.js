import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const SaaSProjects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // SEO Optimization
    document.title = 'SaaS Projects Portfolio | Softeefi - Enterprise SaaS Development';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Explore our SaaS project portfolio including Smart Chat AI platform and Bibot CRM WhatsApp integration. Enterprise-grade SaaS solutions built with modern technologies.';
    }

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  const projects = [
    {
      id: 'smart-chat',
      category: 'chatbot',
      title: 'Smart Chat - AI-Powered ChatBot Platform',
      client: 'ChatBot Pro',
      duration: '2 months',
      technologies: ['React', 'Node.js', 'MongoDB', 'OpenAI API', 'WebSocket', 'Redis', 'Docker'],
      link: 'https://smart-chat-finale.vercel.app/',
      images: [
        '/images/portfolio/smartchat/Screenshot 2026-02-02 074459.png',
        '/images/portfolio/smartchat/Screenshot 2026-02-02 073621.png',
        '/images/portfolio/smartchat/Screenshot 2026-02-02 073713.png',
        '/images/portfolio/smartchat/Screenshot 2026-02-02 073735.png',
        '/images/portfolio/smartchat/Screenshot 2026-02-02 073814.png'
      ],
      description: 'Built a comprehensive SaaS platform for AI-powered chatbots that actually understand customers. Features customizable chat experiences, CRM integration, analytics, and real-time support capabilities.',
      challenges: [
        'Real-time messaging with low latency requirements',
        'AI integration for natural language understanding',
        'Multi-tenant architecture with data isolation',
        'Scalable infrastructure for handling concurrent users',
        'Complex analytics and reporting dashboard'
      ],
      solutions: [
        'Implemented WebSocket infrastructure for real-time communication',
        'Integrated OpenAI API with custom fine-tuning for business context',
        'Built robust multi-tenant database architecture with MongoDB',
        'Deployed microservices on Docker with horizontal scaling',
        'Created comprehensive analytics dashboard with real-time metrics'
      ],
      results: [
        '40+ active users managing AI chatbots',
        '31 bots deployed across multiple websites',
        '177 conversations handled with intelligent automation',
        'Real-time analytics for bot performance tracking',
        '94% bot uptime with automatic failover',
        'Subscription billing system with multiple pricing tiers'
      ],
      features: [
        'Multi-bot management dashboard',
        'Connected users and integration management',
        'Real-time conversation monitoring',
        'Advanced AI testing and optimization tools',
        'Billing and usage tracking',
        'Database management and backup',
        'Security and access control',
        'Audit logging for compliance'
      ]
    },
    {
      id: 'bibot-crm',
      category: 'crm',
      title: 'Bibot CRM - WhatsApp Business Integration Platform',
      client: 'Bibot CRM',
      duration: '1 month',
      technologies: ['Node.js', 'React', 'WhatsApp Business API', 'PostgreSQL', 'Redis', 'Kubernetes'],
      link: 'https://whatsapp.bibotcrm.it/',
      images: [
        '/images/portfolio/smartchat/Screenshot 2026-02-02 074459.png'
      ],
      description: 'Developed a powerful CRM platform integrated with WhatsApp Business API for customer relationship management and marketing automation. Enables businesses to manage customer conversations, automate responses, and track engagement metrics.',
      challenges: [
        'WhatsApp Business API integration complexities',
        'Real-time message synchronization',
        'Contact management and segmentation',
        'Automated response workflows',
        'Compliance with WhatsApp business policies'
      ],
      solutions: [
        'Built robust WhatsApp Business API integration layer',
        'Implemented real-time message queue with Redis',
        'Created intelligent contact management system',
        'Developed workflow automation engine',
        'Ensured compliance with WhatsApp policies and rate limits'
      ],
      results: [
        'Seamless WhatsApp Business integration',
        'Automated customer engagement workflows',
        'Centralized contact and conversation management',
        'Real-time message delivery and notifications',
        'Analytics dashboard for customer insights',
        'Multi-user team collaboration features'
      ],
      features: [
        'WhatsApp Business API integration',
        'Contact management and segmentation',
        'Automated response templates',
        'Conversation tracking and history',
        'Team collaboration tools',
        'Analytics and reporting dashboard',
        'Broadcast messaging capabilities',
        'CRM integration options'
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'chatbot', label: 'AI Chatbots' },
    { id: 'crm', label: 'CRM Solutions' }
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)',
      paddingTop: '80px'
    }}>
      {/* Hero Section */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(0,255,127,0.1) 0%, transparent 100%)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{
            fontSize: isMobile ? '2rem' : 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '900',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #00ff7f 0%, #00e673 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: '1.2'
          }}>
            Our SaaS Projects Portfolio
          </h1>
          <p style={{
            fontSize: isMobile ? '1rem' : '1.3rem',
            color: '#c9d1d9',
            maxWidth: '800px',
            margin: '0 auto 2rem',
            lineHeight: '1.8'
          }}>
            Discover our enterprise-grade SaaS platforms built with cutting-edge technologies.
            From AI-powered chatbots to CRM integrations, we deliver scalable solutions.
          </p>
        </motion.div>
      </section>

      {/* Claude Code Expertise Banner */}
      <section style={{
        padding: '2rem',
        margin: '0 auto',
        maxWidth: '1200px'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: 'linear-gradient(135deg, rgba(0,255,127,0.15) 0%, rgba(0,230,115,0.08) 100%)',
            border: '2px solid rgba(0, 255, 127, 0.3)',
            borderRadius: '20px',
            padding: isMobile ? '2rem 1.5rem' : '3rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Animated background effect */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(0,255,127,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
              flexWrap: 'wrap'
            }}>
              <span style={{
                fontSize: isMobile ? '2rem' : '2.5rem'
              }}>⚡</span>
              <h3 style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: '800',
                color: '#00ff7f',
                margin: 0,
                textAlign: 'center'
              }}>
                Lightning-Fast Development Without Compromise
              </h3>
              <span style={{
                fontSize: isMobile ? '2rem' : '2.5rem'
              }}>🚀</span>
            </div>

            <p style={{
              fontSize: isMobile ? '1rem' : '1.15rem',
              color: '#ffffff',
              lineHeight: '1.9',
              textAlign: 'center',
              marginBottom: '1.5rem',
              maxWidth: '900px',
              margin: '0 auto 1.5rem'
            }}>
              <strong style={{ color: '#00ff7f' }}>Notice the short timelines?</strong> That's not a compromise on quality—it's our competitive advantage.
              These are enterprise-grade, production-ready platforms with complex architectures, multi-tenant systems, and scalable infrastructure.
            </p>

            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              padding: isMobile ? '1.5rem' : '2rem',
              borderRadius: '15px',
              border: '1px solid rgba(0, 255, 127, 0.2)',
              marginBottom: '1.5rem'
            }}>
              <p style={{
                fontSize: isMobile ? '1.05rem' : '1.2rem',
                color: '#c9d1d9',
                lineHeight: '1.8',
                textAlign: 'center',
                margin: 0,
                fontWeight: '500'
              }}>
                <span style={{ color: '#00ff7f', fontWeight: '700' }}>Our Secret Weapon:</span> We've been power users of <strong style={{ color: '#ffffff' }}>Claude Code since day one of its launch</strong>—mastering AI-assisted development
                to deliver what typically takes 6-12 months in just 1-2 months. We don't just use AI tools; we've pioneered workflows
                that multiply our team's capabilities <strong style={{ color: '#00ff7f' }}>by 10x</strong>.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '1.5rem',
              marginTop: '2rem'
            }}>
              <div style={{
                textAlign: 'center',
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.5rem'
                }}>🎯</div>
                <h4 style={{
                  color: '#00ff7f',
                  fontSize: '1.1rem',
                  marginBottom: '0.5rem',
                  fontWeight: '700'
                }}>10x Speed</h4>
                <p style={{
                  color: '#c9d1d9',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Complex projects delivered in weeks, not months
                </p>
              </div>

              <div style={{
                textAlign: 'center',
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.5rem'
                }}>🏆</div>
                <h4 style={{
                  color: '#00ff7f',
                  fontSize: '1.1rem',
                  marginBottom: '0.5rem',
                  fontWeight: '700'
                }}>Day-One Experts</h4>
                <p style={{
                  color: '#c9d1d9',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Using Claude Code since launch, pioneering best practices
                </p>
              </div>

              <div style={{
                textAlign: 'center',
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.5rem'
                }}>💎</div>
                <h4 style={{
                  color: '#00ff7f',
                  fontSize: '1.1rem',
                  marginBottom: '0.5rem',
                  fontWeight: '700'
                }}>Zero Compromise</h4>
                <p style={{
                  color: '#c9d1d9',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Enterprise-grade quality with startup speed
                </p>
              </div>
            </div>

            <div style={{
              marginTop: '2rem',
              textAlign: 'center',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(0,255,127,0.1) 0%, transparent 100%)',
              borderRadius: '12px'
            }}>
              <p style={{
                color: '#ffffff',
                fontSize: isMobile ? '0.95rem' : '1.05rem',
                lineHeight: '1.7',
                margin: 0,
                fontStyle: 'italic'
              }}>
                <strong style={{ color: '#00ff7f' }}>Result:</strong> You get production-ready, scalable SaaS platforms with sophisticated features—
                multi-tenant architecture, real-time functionality, AI integration, analytics dashboards, and complete backend systems—
                all delivered in timeframes that seem impossible with traditional development.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section style={{ padding: '2rem' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          {categories.map(cat => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                border: activeCategory === cat.id ? '2px solid #00ff7f' : '2px solid rgba(255,255,255,0.1)',
                background: activeCategory === cat.id
                  ? 'linear-gradient(135deg, rgba(0,255,127,0.2) 0%, rgba(0,230,115,0.1) 100%)'
                  : 'rgba(255,255,255,0.03)',
                color: activeCategory === cat.id ? '#00ff7f' : '#c9d1d9',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{ padding: '2rem' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              id={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              style={{
                marginBottom: '4rem',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(0, 255, 127, 0.2)',
                borderRadius: '20px',
                overflow: 'hidden'
              }}
            >
              {/* Project Header */}
              <div style={{
                padding: isMobile ? '1.5rem' : '2rem',
                background: 'linear-gradient(135deg, rgba(0,255,127,0.1) 0%, rgba(0,230,115,0.05) 100%)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div>
                    <h2 style={{
                      fontSize: isMobile ? '1.5rem' : '2rem',
                      fontWeight: '800',
                      color: '#00ff7f',
                      marginBottom: '0.5rem'
                    }}>
                      {project.title}
                    </h2>
                    <p style={{
                      fontSize: '1rem',
                      color: '#c9d1d9',
                      marginBottom: '0.5rem'
                    }}>
                      Client: {project.client} | Duration: {project.duration}
                    </p>
                  </div>
                  {project.link && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: '0.75rem 1.5rem',
                        background: 'linear-gradient(135deg, #00ff7f 0%, #00e673 100%)',
                        color: '#0d1117',
                        borderRadius: '50px',
                        fontWeight: '700',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      View Live Demo
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                      </svg>
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Project Image */}
              {project.images && project.images[0] && (
                <div style={{
                  width: '100%',
                  height: isMobile ? '200px' : '400px',
                  overflow: 'hidden'
                }}>
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              )}

              {/* Project Details */}
              <div style={{
                padding: isMobile ? '1.5rem' : '2rem'
              }}>
                {/* Description */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    color: '#ffffff',
                    marginBottom: '1rem'
                  }}>
                    Overview
                  </h3>
                  <p style={{
                    color: '#c9d1d9',
                    lineHeight: '1.8',
                    fontSize: '1.05rem'
                  }}>
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    color: '#ffffff',
                    marginBottom: '1rem'
                  }}>
                    Technologies Used
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem'
                  }}>
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '0.5rem 1rem',
                          background: 'rgba(0, 255, 127, 0.1)',
                          border: '1px solid rgba(0, 255, 127, 0.3)',
                          borderRadius: '50px',
                          color: '#00ff7f',
                          fontSize: '0.9rem',
                          fontWeight: '500'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Three Column Layout */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                  gap: '2rem'
                }}>
                  {/* Challenges */}
                  <div>
                    <h3 style={{
                      fontSize: '1.2rem',
                      color: '#ffffff',
                      marginBottom: '1rem'
                    }}>
                      Challenges
                    </h3>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0
                    }}>
                      {project.challenges.map((challenge, i) => (
                        <li
                          key={i}
                          style={{
                            color: '#c9d1d9',
                            lineHeight: '1.8',
                            marginBottom: '0.75rem',
                            paddingLeft: '1.5rem',
                            position: 'relative'
                          }}
                        >
                          <span style={{
                            position: 'absolute',
                            left: 0,
                            color: '#ff6b6b'
                          }}>
                            ⚠️
                          </span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solutions */}
                  <div>
                    <h3 style={{
                      fontSize: '1.2rem',
                      color: '#ffffff',
                      marginBottom: '1rem'
                    }}>
                      Solutions
                    </h3>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0
                    }}>
                      {project.solutions.map((solution, i) => (
                        <li
                          key={i}
                          style={{
                            color: '#c9d1d9',
                            lineHeight: '1.8',
                            marginBottom: '0.75rem',
                            paddingLeft: '1.5rem',
                            position: 'relative'
                          }}
                        >
                          <span style={{
                            position: 'absolute',
                            left: 0,
                            color: '#00ff7f'
                          }}>
                            💡
                          </span>
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Results */}
                  <div>
                    <h3 style={{
                      fontSize: '1.2rem',
                      color: '#ffffff',
                      marginBottom: '1rem'
                    }}>
                      Results
                    </h3>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0
                    }}>
                      {project.results.map((result, i) => (
                        <li
                          key={i}
                          style={{
                            color: '#c9d1d9',
                            lineHeight: '1.8',
                            marginBottom: '0.75rem',
                            paddingLeft: '1.5rem',
                            position: 'relative'
                          }}
                        >
                          <span style={{
                            position: 'absolute',
                            left: 0,
                            color: '#00ff7f'
                          }}>
                            ✅
                          </span>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Features (if available) */}
                {project.features && (
                  <div style={{ marginTop: '2rem' }}>
                    <h3 style={{
                      fontSize: '1.3rem',
                      color: '#ffffff',
                      marginBottom: '1rem'
                    }}>
                      Key Features
                    </h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                      gap: '0.75rem'
                    }}>
                      {project.features.map((feature, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '0.75rem 1rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            color: '#c9d1d9',
                            fontSize: '0.95rem'
                          }}
                        >
                          <span style={{ color: '#00ff7f', marginRight: '0.5rem' }}>▸</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, rgba(0,255,127,0.1) 0%, rgba(0,230,115,0.05) 100%)',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{
            fontSize: isMobile ? '1.8rem' : '2.5rem',
            fontWeight: '800',
            marginBottom: '1rem',
            color: '#ffffff'
          }}>
            Ready to Build Your SaaS Platform?
          </h2>
          <p style={{
            fontSize: isMobile ? '1rem' : '1.2rem',
            color: '#c9d1d9',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Let's discuss how we can help you build a scalable, enterprise-grade SaaS solution.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-block',
              padding: isMobile ? '1rem 2rem' : '1.2rem 3rem',
              fontSize: isMobile ? '1rem' : '1.2rem',
              background: 'linear-gradient(135deg, #00ff7f 0%, #00e673 100%)',
              color: '#0d1117',
              border: 'none',
              borderRadius: '50px',
              fontWeight: '700',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            Start Your SaaS Project
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
};

export default SaaSProjects;
