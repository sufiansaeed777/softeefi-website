import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const SaaSDevelopment = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    // SEO Optimization for SaaS Development - UK Focused
    document.title = 'SaaS Development UK | Enterprise SaaS Platform Development Company';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Leading SaaS development company UK. Build scalable SaaS platforms, multi-tenant architectures, subscription systems, and cloud-native applications. Expert SaaS developers for startups and enterprises across the UK.';
    } else {
      const newMetaDesc = document.createElement('meta');
      newMetaDesc.name = 'description';
      newMetaDesc.content = 'Leading SaaS development company UK. Build scalable SaaS platforms, multi-tenant architectures, subscription systems, and cloud-native applications. Expert SaaS developers for startups and enterprises across the UK.';
      document.head.appendChild(newMetaDesc);
    }
    
    // Add meta keywords - UK and SaaS focused
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'saas development uk, saas development company uk, saas platform development, saas application development, enterprise saas development, b2b saas development, saas product development, cloud saas development, saas developers uk, saas development agency uk, saas development services uk, custom saas development, saas software development, multi-tenant saas, saas architecture, saas platform uk, build saas application, saas startup development, saas mvp development, saas development london, saas development manchester, saas development birmingham, saas development glasgow, saas development edinburgh, saas development bristol, saas development leeds, saas development liverpool, saas development cardiff, saas development belfast, subscription management system, recurring billing platform, saas payment integration, stripe integration uk, saas user management, tenant management system, saas api development, microservices architecture, serverless saas, aws saas development, azure saas platform, google cloud saas, kubernetes saas deployment, docker containerization, saas devops, ci/cd pipeline, saas scalability, high availability saas, saas security, data isolation, gdpr compliant saas, iso 27001 saas, saas authentication, oauth integration, sso implementation, saml integration, role based access control, rbac implementation, saas analytics, saas metrics, saas dashboard development, admin panel development, saas reporting tools, webhook integration, real-time notifications, websocket implementation, saas email automation, saas workflow automation, saas integration platform, api gateway development, graphql api, rest api development, saas database design, postgresql saas, mongodb saas, redis caching, elasticsearch integration, saas monitoring, application performance monitoring, saas logging, error tracking, saas backup solutions, disaster recovery, saas migration services, legacy system modernization, saas consulting uk, saas architecture consulting, saas technology stack, react saas development, angular saas development, vue.js saas platform, node.js saas backend, python django saas, ruby on rails saas, .net core saas, java spring boot saas, saas mobile app, react native saas, flutter saas app, progressive web app saas, pwa development, saas marketplace development, white label saas, saas reseller platform, vertical saas development, horizontal saas platform, industry specific saas, fintech saas, healthtech saas, edtech saas, proptech saas, legaltech saas, hrtech saas, martech saas, saas for startups, saas for enterprises, saas for smb, agile saas development, scrum methodology, devops practices, continuous deployment, infrastructure as code, terraform automation, ansible configuration, jenkins automation, gitlab ci/cd, github actions, aws cdk, cloud formation, saas cost optimization, performance optimization, database optimization, caching strategies, cdn implementation, load balancing, auto scaling, saas maintenance uk, saas support services, 24/7 saas monitoring, saas updates, feature releases';
    
    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://softeefi.co.uk/services/saas-development';
    
    // Add Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'SaaS Development UK | Enterprise SaaS Platform Development' },
      { property: 'og:description', content: 'Leading SaaS development company in the UK. Build scalable multi-tenant SaaS platforms with subscription billing, user management, and enterprise features.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://softeefi.co.uk/services/saas-development' },
      { property: 'og:image', content: 'https://softeefi.co.uk/images/saas-development-og.jpg' }
    ];
    
    ogTags.forEach(tag => {
      let element = document.querySelector(`meta[property="${tag.property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.content = tag.content;
    });
    
    // Add structured data for SaaS Development Service
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://softeefi.co.uk"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Services",
              "item": "https://softeefi.co.uk/services"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "SaaS Development",
              "item": "https://softeefi.co.uk/services/saas-development"
            }
          ]
        },
        {
          "@type": "Service",
      "name": "SaaS Development Services UK",
      "description": "Professional SaaS platform development services including multi-tenant architecture, subscription billing, user management, API development, and cloud deployment for UK businesses.",
      "provider": {
        "@type": "Organization",
        "name": "Softeefi",
        "@id": "https://softeefi.co.uk"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United Kingdom"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "SaaS Development Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom SaaS Platform Development",
              "description": "End-to-end SaaS platform development with multi-tenant architecture"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SaaS Migration Services",
              "description": "Migrate legacy applications to modern SaaS architecture"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SaaS MVP Development",
              "description": "Rapid MVP development for SaaS startups"
            }
          }
        ]
      }
    }
      ]
    };
    
    let scriptTag = document.querySelector('script[type="application/ld+json"][data-saas]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      scriptTag.setAttribute('data-saas', 'true');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
    
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const saasFeatures = [
    {
      title: "Multi-Tenant Architecture",
      description: "Scalable multi-tenant systems with data isolation and security",
      icon: "🏢"
    },
    {
      title: "Subscription & Billing",
      description: "Integrated payment systems with Stripe, PayPal, and recurring billing",
      icon: "💳"
    },
    {
      title: "User Management",
      description: "Complete user authentication, roles, permissions, and team management",
      icon: "👥"
    },
    {
      title: "API Development",
      description: "RESTful and GraphQL APIs with comprehensive documentation",
      icon: "🔌"
    },
    {
      title: "Cloud Infrastructure",
      description: "AWS, Azure, or Google Cloud deployment with auto-scaling",
      icon: "☁️"
    },
    {
      title: "Analytics Dashboard",
      description: "Real-time analytics, metrics, and reporting dashboards",
      icon: "📊"
    }
  ];

  const saasStack = [
    { category: "Frontend", techs: ["React", "Next.js", "Vue.js", "Angular", "TypeScript"] },
    { category: "Backend", techs: ["Node.js", "Python", ".NET Core", "Java Spring", "Go"] },
    { category: "Database", techs: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"] },
    { category: "Cloud", techs: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Docker"] },
    { category: "DevOps", techs: ["CI/CD", "Terraform", "Jenkins", "GitLab", "GitHub Actions"] },
    { category: "Monitoring", techs: ["Datadog", "New Relic", "Sentry", "CloudWatch", "Grafana"] }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

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
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '900',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #00ff7f 0%, #00e673 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: '1.2'
          }}>
            SaaS Development Company UK
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: '#c9d1d9',
            maxWidth: '800px',
            margin: '0 auto 2rem',
            lineHeight: '1.8'
          }}>
            Build scalable, secure, and feature-rich SaaS platforms that grow with your business. 
            From MVP to enterprise-grade solutions.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #00ff7f 0%, #00e673 100%)',
                  color: '#0d1117',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Start Your SaaS Project
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                background: 'transparent',
                color: '#00ff7f',
                border: '2px solid #00ff7f',
                borderRadius: '50px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
              onClick={() => document.getElementById('saas-process').scrollIntoView({ behavior: 'smooth' })}
            >
              View Our Process
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: '3rem',
              color: '#ffffff'
            }}>
              Complete SaaS Development Solutions
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {saasFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  style={{
                    background: hoveredCard === index 
                      ? 'linear-gradient(135deg, rgba(0,255,127,0.1) 0%, rgba(0,230,115,0.05) 100%)'
                      : 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid',
                    borderColor: hoveredCard === index ? '#00ff7f' : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px',
                    padding: '2rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    color: '#00ff7f',
                    marginBottom: '1rem'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    color: '#c9d1d9',
                    lineHeight: '1.8'
                  }}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,255,127,0.05) 50%, transparent 100%)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#ffffff'
          }}>
            Enterprise-Grade Technology Stack
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            {saasStack.map((stack, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  textAlign: 'center'
                }}
              >
                <h3 style={{
                  color: '#00ff7f',
                  fontSize: '1.3rem',
                  marginBottom: '1rem'
                }}>
                  {stack.category}
                </h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  {stack.techs.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      style={{
                        color: '#c9d1d9',
                        fontSize: '1rem',
                        padding: '0.5rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '8px'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="saas-process" style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#ffffff'
          }}>
            Our SaaS Development Process
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { step: "1", title: "Discovery", desc: "Understand your business model and requirements" },
              { step: "2", title: "Architecture", desc: "Design scalable multi-tenant architecture" },
              { step: "3", title: "MVP Development", desc: "Build and launch your minimum viable product" },
              { step: "4", title: "Iteration", desc: "Gather feedback and improve features" },
              { step: "5", title: "Scale", desc: "Optimize performance and add enterprise features" },
              { step: "6", title: "Support", desc: "Ongoing maintenance and feature development" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  textAlign: 'center',
                  padding: '2rem'
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  margin: '0 auto 1rem',
                  background: 'linear-gradient(135deg, #00ff7f 0%, #00e673 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: '900',
                  color: '#0d1117'
                }}>
                  {item.step}
                </div>
                <h3 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: '#c9d1d9' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
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
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            marginBottom: '1rem',
            color: '#ffffff'
          }}>
            Ready to Build Your SaaS Platform?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#c9d1d9',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Join successful UK startups and enterprises who've launched their SaaS products with us.
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '1.2rem 3rem',
                fontSize: '1.2rem',
                background: 'linear-gradient(135deg, #00ff7f 0%, #00e673 100%)',
                color: '#0d1117',
                border: 'none',
                borderRadius: '50px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Get Free SaaS Consultation
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default SaaSDevelopment;