import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const DigitalMarketingProjects = () => {
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
    // Check if there's a hash in the URL and scroll to that section
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
      id: 'seo-overhaul',
      category: 'seo',
      title: 'E-commerce SEO Transformation',
      client: 'Global Fashion Retailer',
      duration: '12 months',
      technologies: ['Technical SEO', 'Content Strategy', 'Link Building', 'Schema Markup', 'Core Web Vitals'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      description: 'Complete SEO overhaul for a major fashion retailer, transforming their online presence and achieving dominant market position.',
      challenges: [
        'Poor site architecture with 100K+ products',
        'Slow page load times affecting rankings',
        'Duplicate content issues across categories',
        'Minimal organic visibility'
      ],
      solutions: [
        'Restructured entire site architecture',
        'Implemented advanced technical SEO',
        'Created comprehensive content strategy',
        'Built high-quality backlink profile'
      ],
      results: [
        '450% increase in organic traffic',
        '#1 rankings for 50+ high-value keywords',
        '380% increase in organic revenue',
        'Page load time reduced by 70%',
        'Featured snippets for 30+ queries'
      ]
    },
    {
      id: 'seo-ranking',
      category: 'seo',
      title: 'Multi-Industry SEO Success',
      client: 'Various B2B & B2C Clients',
      duration: 'Ongoing',
      technologies: ['On-Page SEO', 'Off-Page SEO', 'Local SEO', 'Technical SEO', 'Content Optimization'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      description: 'Comprehensive SEO services delivered to 200+ clients across various industries, consistently improving search rankings and visibility.',
      challenges: [
        'Diverse industry requirements',
        'Varying competition levels',
        'Different target audiences',
        'Budget constraints'
      ],
      solutions: [
        'Customized SEO strategies per industry',
        'Scalable optimization processes',
        'Data-driven approach',
        'Regular algorithm adaptation'
      ],
      results: [
        '200+ successful projects',
        '98% client retention rate',
        'Average 250% traffic increase',
        '5.0★ average client rating',
        'ROI averaging 400%+'
      ]
    },
    {
      id: 'keyword-research',
      category: 'seo',
      title: 'Strategic Keyword Research & Analysis',
      client: 'SaaS Technology Company',
      duration: '2 months',
      technologies: ['SEMrush', 'Ahrefs', 'Google Search Console', 'Python', 'Data Analysis'],
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800',
      description: 'In-depth keyword research and competitor analysis that formed the foundation of a successful SEO campaign.',
      challenges: [
        'Highly competitive industry',
        'Technical B2B audience',
        'Limited brand awareness',
        'Complex product offerings'
      ],
      solutions: [
        'Identified 500+ targeted keywords',
        'Analyzed top 20 competitors',
        'Created keyword clustering strategy',
        'Developed content roadmap'
      ],
      results: [
        'Discovered untapped keyword opportunities',
        '300% increase in targeted traffic',
        'Reduced cost per acquisition by 60%',
        'Content strategy yielding 50+ leads/month'
      ]
    },
    {
      id: 'affiliate-website',
      category: 'affiliate',
      title: 'Amazon Affiliate Empire',
      client: 'E-commerce Entrepreneur',
      duration: '4 months',
      technologies: ['WordPress', 'WooCommerce', 'Amazon API', 'Speed Optimization', 'Conversion Optimization'],
      image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800',
      description: 'Built and optimized multiple Amazon affiliate websites that generate consistent passive income through strategic product selection and SEO.',
      challenges: [
        'Competitive affiliate landscape',
        'Amazon commission changes',
        'Building trust with visitors',
        'Product selection strategy'
      ],
      solutions: [
        'Niche-specific site development',
        'Comprehensive product reviews',
        'Comparison tables and buying guides',
        'Email list building integration'
      ],
      results: [
        '$10K+ monthly affiliate revenue',
        '85% organic traffic share',
        '12% average conversion rate',
        '500+ products reviewed',
        'Email list of 15K+ subscribers'
      ]
    },
    {
      id: 'social-media-management',
      category: 'social',
      title: 'B2B Social Media Transformation',
      client: 'Financial Services Firm',
      duration: '6 months',
      technologies: [/* 'LinkedIn', */ 'Twitter', 'Facebook', 'Hootsuite', 'Canva', 'Video Marketing'],
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
      description: 'Complete social media overhaul for a B2B financial services company, establishing thought leadership and generating quality leads.',
      challenges: [
        'Boring industry perception',
        'Low engagement rates',
        'Compliance restrictions',
        'Limited visual content'
      ],
      solutions: [
        'Developed engaging content strategy',
        'Created visual brand guidelines',
        'Implemented employee advocacy',
        'Built community engagement tactics'
      ],
      results: [
        '300% increase in engagement',
        '50K+ new followers across platforms',
        '200+ qualified leads generated',
        'Established as industry thought leader',
        '25% of revenue from social channels'
      ]
    },
    {
      id: 'content-strategy',
      category: 'content',
      title: 'Content Marketing Excellence',
      client: 'Healthcare Technology Startup',
      duration: '8 months',
      technologies: ['Content Management', 'SEO Writing', 'Video Production', 'Podcast', 'Webinars'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
      description: 'Comprehensive content marketing strategy that positioned a healthcare startup as an industry authority and lead generation machine.',
      challenges: [
        'Complex technical subject matter',
        'Regulatory compliance needs',
        'Building trust in healthcare',
        'Long B2B sales cycles'
      ],
      solutions: [
        'Created educational content hub',
        'Launched industry podcast',
        'Developed webinar series',
        'Built email nurture campaigns'
      ],
      results: [
        '500% increase in blog traffic',
        '10,000+ qualified leads generated',
        'Industry awards for content',
        '40+ speaking opportunities',
        'Acquisition by major healthcare company'
      ]
    },
    {
      id: 'ppc-campaign',
      category: 'ppc',
      title: 'E-commerce PPC Domination',
      client: 'Online Electronics Retailer',
      duration: '12 months',
      technologies: ['Google Ads', 'Microsoft Ads', 'Facebook Ads', 'Amazon PPC', 'Shopping Campaigns'],
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
      description: 'Multi-channel PPC campaign that transformed an electronics retailer into a market leader through strategic paid advertising.',
      challenges: [
        'High competition from major retailers',
        'Thin profit margins',
        'Seasonal demand fluctuations',
        'Complex product catalog'
      ],
      solutions: [
        'Advanced bidding strategies',
        'Dynamic product ads',
        'Audience segmentation',
        'Cross-channel attribution'
      ],
      results: [
        '400% ROAS achieved',
        '$2M+ in attributed revenue',
        '60% reduction in CPA',
        '150% increase in conversion rate',
        'Market leader in key categories'
      ]
    },
    {
      id: 'email-marketing',
      category: 'email',
      title: 'B2C Email Marketing Revolution',
      client: 'Subscription Box Service',
      duration: '6 months',
      technologies: ['Klaviyo', 'Segmentation', 'A/B Testing', 'Automation', 'Personalization'],
      image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800',
      description: 'Transformed email marketing from basic broadcasts to a sophisticated revenue-generating machine through advanced automation and personalization.',
      challenges: [
        'High churn rate',
        'Low email engagement',
        'Generic messaging',
        'Poor customer retention'
      ],
      solutions: [
        'Advanced segmentation strategy',
        'Behavioral trigger campaigns',
        'Personalized product recommendations',
        'Win-back automation series'
      ],
      results: [
        '45% of total revenue from email',
        '65% increase in customer LTV',
        '40% open rate average',
        '15% click rate average',
        '30% reduction in churn'
      ]
    }
  ];

  const categories = [
    { 
      id: 'all', 
      name: 'All Projects',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
        </svg>
      )
    },
    { 
      id: 'seo', 
      name: 'SEO',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      )
    },
    { 
      id: 'ppc', 
      name: 'PPC',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
        </svg>
      )
    },
    { 
      id: 'social', 
      name: 'Social Media',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
        </svg>
      )
    },
    { 
      id: 'content', 
      name: 'Content Marketing',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        </svg>
      )
    },
    { 
      id: 'email', 
      name: 'Email Marketing',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      )
    },
    { 
      id: 'affiliate', 
      name: 'Affiliate Marketing',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
          <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
        </svg>
      )
    }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0d1117 0%, #1a1a2e 50%, #0d1117 100%)',
      color: '#ffffff',
      paddingTop: '100px'
    }}>
      {/* Hero Section */}
      <section style={{ padding: isMobile ? '2rem 1rem' : '4rem 2rem', textAlign: 'center' }}>
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          style={{
            fontSize: isMobile ? '2.5rem' : '4rem',
            fontWeight: '900',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Digital Marketing Portfolio
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: '1.2rem',
            color: '#c9d1d9',
            maxWidth: '800px',
            margin: '0 auto'
          }}
        >
          Explore our proven track record of driving growth through strategic digital marketing. 
          Real results from real campaigns across industries.
        </motion.p>
        
        {/* Category Filter - Moved to top of page */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
          style={{ marginTop: '3rem' }}
        >
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '3rem'
        }}>
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              style={{
                padding: '0.75rem 2rem',
                background: activeCategory === category.id 
                  ? 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)' 
                  : 'transparent',
                color: activeCategory === category.id ? '#0d1117' : '#ffffff',
                border: activeCategory === category.id ? 'none' : '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '30px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {category.icon}
                {category.name}
              </span>
            </motion.button>
          ))}
        </div>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section style={{ padding: isMobile ? '2rem 1rem' : '2rem 4rem 4rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(600px, 1fr))',
          gap: '3rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              id={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{
                background: 'rgba(21, 26, 35, 0.9)',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Project Image */}
              <div style={{
                height: '300px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, transparent 0%, rgba(13, 17, 23, 0.8) 100%)'
                }} />
                {/* Category Badge */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(0, 255, 127, 0.9)',
                  color: '#0d1117',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>
                  {project.category}
                </div>
              </div>

              {/* Project Content */}
              <div style={{ padding: isMobile ? '1.5rem' : '2.5rem' }}>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: '#00ff7f'
                }}>
                  {project.title}
                </h2>

                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ color: '#c9d1d9', marginBottom: '0.5rem' }}>
                    <strong style={{ color: '#ffffff' }}>Client:</strong> {project.client}
                  </p>
                  <p style={{ color: '#c9d1d9' }}>
                    <strong style={{ color: '#ffffff' }}>Duration:</strong> {project.duration}
                  </p>
                </div>

                <p style={{
                  fontSize: '1.1rem',
                  color: '#e8e8e8',
                  marginBottom: '2rem',
                  lineHeight: '1.8'
                }}>
                  {project.description}
                </p>

                {/* Technologies/Strategies */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#ffffff' }}>
                    Strategies & Tools Used
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: 'rgba(0, 255, 127, 0.1)',
                          border: '1px solid rgba(0, 255, 127, 0.3)',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          color: '#00ff7f'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Challenges & Solutions */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '2rem',
                  marginBottom: '2rem'
                }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#ffffff' }}>
                      Challenges
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {project.challenges.map((challenge, idx) => (
                        <li key={idx} style={{ marginBottom: '0.5rem', color: '#c9d1d9' }}>
                          • {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#ffffff' }}>
                      Solutions
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {project.solutions.map((solution, idx) => (
                        <li key={idx} style={{ marginBottom: '0.5rem', color: '#c9d1d9' }}>
                          • {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Results */}
                <div style={{
                  background: 'rgba(0, 255, 127, 0.05)',
                  border: '1px solid rgba(0, 255, 127, 0.2)',
                  borderRadius: '15px',
                  padding: '1.5rem'
                }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#00ff7f' }}>
                    Key Results
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {project.results.map((result, idx) => (
                      <li key={idx} style={{ 
                        marginBottom: '0.5rem', 
                        color: '#ffffff',
                        fontWeight: '500'
                      }}>
                        ✓ {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Success Metrics Section */}
      <section style={{
        padding: isMobile ? '3rem 1rem' : '4rem 2rem',
        background: 'rgba(0, 255, 127, 0.03)',
        textAlign: 'center'
      }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: isMobile ? '2rem' : '3rem',
            fontWeight: '700',
            marginBottom: '3rem'
          }}
        >
          Our Track Record Speaks for Itself
        </motion.h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {[
            { number: '500+', label: 'Successful Campaigns' },
            { number: '£50M+', label: 'Revenue Generated' },
            { number: '98%', label: 'Client Retention' },
            { number: '400%', label: 'Average ROI' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 style={{
                fontSize: isMobile ? '2.5rem' : '3rem',
                fontWeight: '900',
                color: '#00ff7f',
                marginBottom: '0.5rem'
              }}>
                {stat.number}
              </h3>
              <p style={{ color: '#c9d1d9', fontSize: '1.1rem' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: isMobile ? '3rem 1rem' : '4rem 2rem',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 style={{
            fontSize: isMobile ? '2rem' : '3rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            Skyrocket Your Digital Growth Now
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#c9d1d9',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Let's discuss how our proven strategies can transform your digital marketing and drive real business growth.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)',
              color: '#0d1117',
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
          >
            Start Your Success Story
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
};

export default DigitalMarketingProjects;