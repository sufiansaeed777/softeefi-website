import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const CloudProjects = () => {
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

  // Real client projects based on actual deliverables
  const projects = [
    {
      id: 'fda',
      category: 'dynamics',
      title: 'FDA - Enterprise Dynamics 365 CRM/ERP Implementation',
      client: 'U.S. Food and Drug Administration',
      duration: '12 months',
      technologies: ['Dynamics 365 CRM/ERP', 'Power Platform', 'Power Automate', 'Power BI', 'SharePoint'],
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
      description: 'Delivered comprehensive Dynamics 365 CRM/ERP solution with full Microsoft Power Platform integration for the FDA, transforming regulatory operations and compliance management.',
      challenges: [
        'Complex regulatory compliance requirements',
        'Integration with existing government systems',
        'Strict security and data governance needs',
        'Multi-departmental coordination'
      ],
      solutions: [
        'Implemented custom compliance workflows in Dynamics 365',
        'Developed secure API integrations with federal systems',
        'Created role-based access control with advanced security',
        'Built automated regulatory reporting with Power BI'
      ],
      results: [
        'Automated 75% of regulatory workflows',
        'Reduced compliance reporting time by 60%',
        'Enhanced data governance and security compliance',
        'Improved cross-departmental collaboration by 80%',
        'Real-time analytics for regulatory insights'
      ]
    },
    {
      id: 'pacific',
      category: 'power',
      title: 'Pacific Jet Coast - Aviation Power Platform Suite',
      client: 'Pacific Jet Coast',
      duration: '6 months',
      technologies: ['Microsoft Power Platform', 'Power Automate', 'Power BI', 'SharePoint'],
      image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=600&fit=crop',
      description: 'Deployed comprehensive Microsoft Power Platform suite for aviation operations management, transforming flight operations and fleet management.',
      challenges: [
        'Complex flight operations workflows',
        'Real-time fleet tracking requirements',
        'Integration with aviation systems',
        'Regulatory compliance needs'
      ],
      solutions: [
        'Automated flight operations with Power Automate',
        'Created real-time dashboards in Power BI',
        'Built SharePoint document repository',
        'Developed custom Power Apps for field operations'
      ],
      results: [
        'Automated 80% of flight operations workflows',
        'Real-time fleet analytics and tracking',
        'Improved operational efficiency by 40%',
        'Centralized document management',
        'Enhanced regulatory compliance'
      ]
    },
    {
      id: 'blueonyx',
      category: 'power',
      title: 'Blue Onyx Real Estate USA - Property Management Platform',
      client: 'Blue Onyx Real Estate USA',
      duration: '5 months',
      technologies: ['Microsoft Power Platform', 'Power Automate', 'Power BI', 'SharePoint'],
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      description: 'Deployed Microsoft Power Platform suite for comprehensive real estate operations and property management.',
      challenges: [
        'Complex property listing workflows',
        'Multiple data sources integration',
        'Real-time market analytics needs',
        'Document management complexity'
      ],
      solutions: [
        'Automated property listings with Power Automate',
        'Created market analytics dashboards in Power BI',
        'Centralized documents in SharePoint',
        'Built custom property management apps'
      ],
      results: [
        'Automated 70% of listing processes',
        'Real-time market insights dashboard',
        'Reduced transaction processing time by 50%',
        'Improved agent productivity by 45%'
      ]
    },
    {
      id: 'hach',
      category: 'sharepoint',
      title: 'Hach Company - Enterprise SharePoint & SPFx Development',
      client: 'Hach Company',
      duration: '8 months',
      technologies: ['SharePoint', 'SPFx Development Stack', 'Power Platform', 'Azure AD', 'Microsoft Teams'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
      description: 'Implemented enterprise Content and Collaboration services with custom SharePoint solutions and modern SPFx Development Stack for global water analytics leader.',
      challenges: [
        'Global team collaboration requirements',
        'Complex document management needs',
        'Custom workflow automation',
        'Legacy system migration'
      ],
      solutions: [
        'Developed custom SPFx web parts for specialized workflows',
        'Created modern SharePoint site architecture',
        'Implemented automated document processing',
        'Built integration with laboratory systems'
      ],
      results: [
        'Modernized document management for 5000+ users',
        'Reduced document retrieval time by 70%',
        'Enhanced global team collaboration',
        'Automated 60% of document workflows',
        'Improved compliance tracking'
      ]
    },
    {
      id: 'nextlevel',
      category: 'dynamics',
      title: 'Next Level Medical Supply LLC - Healthcare Digital Transformation',
      client: 'Next Level Medical Supply LLC',
      duration: '9 months',
      technologies: ['Dynamics 365 CRM/ERP', 'Microsoft Power Platform', 'Power Automate', 'Power BI', 'SharePoint'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
      description: 'Complete Dynamics 365 CRM/ERP implementation with Microsoft Power Platform integration for medical supply chain management.',
      challenges: [
        'Complex medical supply chain',
        'Regulatory compliance requirements',
        'Inventory management complexity',
        'Multi-location coordination'
      ],
      solutions: [
        'Implemented Dynamics 365 for supply chain',
        'Automated order processing workflows',
        'Created Power BI analytics dashboards',
        'Built custom inventory management apps'
      ],
      results: [
        'Streamlined inventory management',
        'Reduced order processing time by 60%',
        'Improved supply chain visibility',
        'Enhanced customer service operations',
        'Real-time analytics for decision making'
      ]
    },
    {
      id: 'conedison',
      category: 'power',
      title: 'Con Edison - Utility Infrastructure Transformation',
      client: 'Con Edison',
      duration: '10 months',
      technologies: ['Microsoft Power Platform', 'Power Automate', 'Power BI', 'SharePoint', 'Azure'],
      image: 'https://images.unsplash.com/photo-1413882353314-73389f63b6fd?w=800&h=600&fit=crop',
      description: 'Implemented Microsoft Power Platform suite for one of America\'s largest utility companies, modernizing operations and customer service.',
      challenges: [
        'Legacy infrastructure systems',
        'High-volume customer service needs',
        'Complex utility operations',
        'Real-time monitoring requirements'
      ],
      solutions: [
        'Automated service workflows with Power Automate',
        'Built executive dashboards in Power BI',
        'Integrated SharePoint for document management',
        'Created customer service Power Apps'
      ],
      results: [
        'Reduced service response time by 50%',
        'Automated utility workflow processes',
        'Real-time executive analytics',
        'Improved customer satisfaction by 35%',
        'Enhanced operational visibility'
      ]
    },
    {
      id: 'resourcemetrix',
      category: 'dynamics',
      title: 'Resource Metrix - Business Intelligence Implementation',
      client: 'Resource Metrix',
      duration: '7 months',
      technologies: ['Dynamics 365 CRM/ERP', 'Microsoft Power Platform', 'Power Automate', 'Power BI', 'SharePoint'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      description: 'Implemented Dynamics 365 CRM/ERP with full Microsoft Power Platform integration for resource management and analytics.',
      challenges: [
        'Complex resource allocation needs',
        'Multi-project tracking requirements',
        'Real-time reporting demands',
        'Integration with existing tools'
      ],
      solutions: [
        'Deployed Dynamics 365 for resource management',
        'Automated reporting with Power BI',
        'Created workflow automation with Power Automate',
        'Integrated SharePoint for project documents'
      ],
      results: [
        'Enhanced resource allocation efficiency by 55%',
        'Automated 80% of reporting processes',
        'Real-time project visibility',
        'Improved project delivery rate by 40%'
      ]
    },
    {
      id: 'sbr',
      category: 'dynamics',
      title: 'SBR International GmbH - Global Manufacturing Solution',
      client: 'SBR International GmbH',
      duration: '11 months',
      technologies: ['Dynamics 365 CRM/ERP', 'Microsoft Power Platform', 'Power Automate', 'Power BI', 'SharePoint'],
      image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=600&fit=crop',
      description: 'Delivered enterprise Dynamics 365 CRM/ERP solution with Power Platform for international manufacturing operations.',
      challenges: [
        'Multi-country operations',
        'Complex manufacturing processes',
        'Multi-currency requirements',
        'Supply chain complexity'
      ],
      solutions: [
        'Implemented global Dynamics 365 deployment',
        'Created multi-currency support system',
        'Automated production workflows',
        'Built supply chain analytics with Power BI'
      ],
      results: [
        'Unified global operations',
        'Reduced production delays by 45%',
        'Enhanced supply chain visibility',
        'Improved customer satisfaction by 50%'
      ]
    },
    {
      id: 'techfabric',
      category: 'dynamics',
      title: 'Tech Fabric - Technology Services Platform',
      client: 'Tech Fabric',
      duration: '6 months',
      technologies: ['Dynamics 365 CRM/ERP', 'Microsoft Power Platform', 'Power Automate', 'Power BI', 'SharePoint'],
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop',
      description: 'Comprehensive Dynamics 365 CRM/ERP implementation with Microsoft Power Platform for technology services management.',
      challenges: [
        'Service delivery automation',
        'Project management integration',
        'Customer relationship complexity',
        'Performance tracking needs'
      ],
      solutions: [
        'Deployed Dynamics 365 for service management',
        'Automated service delivery workflows',
        'Integrated project management tools',
        'Created performance dashboards in Power BI'
      ],
      results: [
        'Automated 65% of service delivery',
        'Improved project completion rate by 35%',
        'Enhanced customer satisfaction scores',
        'Real-time operational insights'
      ]
    },
    {
      id: 'viperatech',
      category: 'dynamics',
      title: 'ViperaTech - Software Development Operations',
      client: 'ViperaTech',
      duration: '8 months',
      technologies: ['Dynamics 365 CRM/ERP', 'Microsoft Power Platform', 'Power Automate', 'Power BI', 'SharePoint'],
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop',
      description: 'Implemented Dynamics 365 CRM/ERP with Microsoft Power Platform integration for software development lifecycle management.',
      challenges: [
        'Development workflow complexity',
        'Deployment automation needs',
        'Customer support integration',
        'Analytics and reporting requirements'
      ],
      solutions: [
        'Streamlined dev workflows in Dynamics 365',
        'Automated deployment with Power Automate',
        'Integrated customer support systems',
        'Built comprehensive analytics with Power BI'
      ],
      results: [
        'Reduced deployment time by 60%',
        'Automated 75% of development workflows',
        'Improved customer response time by 50%',
        'Enhanced project visibility and tracking'
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'dynamics', name: 'Dynamics 365' },
    { id: 'power', name: 'Power Platform' },
    { id: 'sharepoint', name: 'SharePoint' }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div style={{ 
      background: 'transparent', 
      minHeight: '100vh',
      paddingTop: isMobile ? '60px' : '80px'
    }}>
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #0a0a0a 100%)',
          padding: isMobile ? '3rem 1rem' : '6rem 2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            fontSize: isMobile ? '2.5rem' : '4rem',
            fontWeight: '800',
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, #00ff7f 0%, #00a6ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Cloud Infrastructure Projects
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            fontSize: isMobile ? '1.1rem' : '1.4rem',
            color: '#b8b8b8',
            maxWidth: '800px',
            margin: '0 auto'
          }}
        >
          Real-world implementations showcasing our expertise in Dynamics 365, Power Platform, SharePoint, and cloud solutions for enterprise clients.
        </motion.p>
      </motion.div>

      {/* Category Filter */}
      <div style={{
        background: 'rgba(26, 26, 46, 0.5)',
        backdropFilter: 'blur(10px)',
        padding: '2rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              style={{
                padding: '0.75rem 2rem',
                background: activeCategory === category.id 
                  ? 'linear-gradient(135deg, #00ff7f 0%, #00a6ff 100%)'
                  : 'rgba(255, 255, 255, 0.05)',
                color: activeCategory === category.id ? '#000' : '#fff',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div style={{
        padding: isMobile ? '2rem 1rem' : '4rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <motion.div 
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem'
          }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              id={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 166, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Project Image */}
              <div style={{
                width: '100%',
                height: '250px',
                background: `url(${project.image}) center/cover`,
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                  padding: '2rem 1.5rem 1rem',
                  color: '#fff'
                }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#00ff7f' }}>
                    {project.client} • {project.duration}
                  </p>
                </div>
              </div>

              {/* Project Details */}
              <div style={{ padding: '2rem' }}>
                <p style={{ color: '#b8b8b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  {project.description}
                </p>

                {/* Technologies */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#00a6ff', fontSize: '0.9rem', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                    Technologies
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '0.25rem 0.75rem',
                          background: 'rgba(0, 166, 255, 0.1)',
                          border: '1px solid rgba(0, 166, 255, 0.3)',
                          borderRadius: '15px',
                          fontSize: '0.8rem',
                          color: '#00a6ff'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Results */}
                <div>
                  <h4 style={{ color: '#00ff7f', fontSize: '0.9rem', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                    Key Results
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {project.results.slice(0, 3).map((result, idx) => (
                      <li key={idx} style={{ 
                        color: '#b8b8b8', 
                        fontSize: '0.9rem',
                        marginBottom: '0.5rem',
                        paddingLeft: '1.5rem',
                        position: 'relative'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          color: '#00ff7f'
                        }}>✓</span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CloudProjects;