import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { space, fontSize, fontWeight, transition, colors, zIndex } from '../../utils/designTokens';
import { CardSkeleton, Spinner } from '../../components/LoadingStates';

// Import data
import { graphicDesignProjects, services, processSteps, faqs } from './GraphicDesignData';

// Import icons
import {
  SearchIcon, GridIcon, ListIcon,
  BrandingIcon, PrintIcon, DigitalIcon, IllustrationIcon,
  ResearchIcon, ConceptIcon, DesignIcon, DeliveryIcon
} from './GraphicDesignIcons';

// Import components
import { ProjectCard, ServiceCard, ProcessStepCard } from './GraphicDesignComponents';
import ProjectDetailModal from './GraphicDesignModal';
import { EmptyState, GridSkeleton } from '../../components/LoadingStates';

const GraphicDesignPortfolio = () => {
  // State management
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeServiceTab, setActiveServiceTab] = useState('branding');
  const [selectedService, setSelectedService] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const searchInputRef = useRef(null);

  // Scroll animations
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 100], [0, -10]);
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.98]);

  // Check for mobile device and SEO
  useEffect(() => {
    // SEO Optimization for Graphic Design
    document.title = 'Graphic Design Services UK | Graphic Designer & Design Agency - Softeefi';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Professional graphic design services UK. Expert graphic designers creating logos, branding, print design, and digital graphics. Creative design agency for businesses. Get custom graphic design solutions.';
    } else {
      const newMetaDesc = document.createElement('meta');
      newMetaDesc.name = 'description';
      newMetaDesc.content = 'Professional graphic design services UK. Expert graphic designers creating logos, branding, print design, and digital graphics. Creative design agency for businesses. Get custom graphic design solutions.';
      document.head.appendChild(newMetaDesc);
    }
    
    // Add meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'graphic design, graphic design services, graphic designer, graphic design company, graphic design agency, graphic design uk, logo design, branding design, print design, digital design, creative design, visual design, graphic design portfolio, freelance graphic designer, professional graphic design, business card design, brochure design, poster design, social media graphics, brand identity design, packaging design, illustration design, typography design, corporate design, marketing design';
    
    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://softeefi.co.uk/services/graphic-design';
    
    // Add Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Graphic Design Services | Creative Design Agency UK - Softeefi' },
      { property: 'og:description', content: 'Leading graphic design agency UK. Professional graphic designers creating stunning logos, branding, and marketing materials. Transform your brand with creative design.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://softeefi.co.uk/services/graphic-design' },
      { property: 'og:image', content: 'https://softeefi.co.uk/images/graphic-design-og.jpg' }
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
    
    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "Graphic Design Services",
          "description": "Professional graphic design services including logo design, branding, print design, and digital graphics",
          "provider": {
            "@type": "Organization",
            "name": "Softeefi",
            "url": "https://softeefi.co.uk",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "UK"
            },
            "priceRange": "££-£££"
          },
          "areaServed": {
            "@type": "Country",
            "name": "United Kingdom"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Graphic Design Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Logo Design",
                  "description": "Custom logo design and brand mark creation for businesses"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Brand Identity Design",
                  "description": "Complete brand identity including logo, colors, typography, and guidelines"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Print Design",
                  "description": "Business cards, brochures, posters, and marketing materials"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Digital Graphics",
                  "description": "Social media graphics, web banners, and digital marketing assets"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Packaging Design",
                  "description": "Product packaging and label design for retail and e-commerce"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Illustration Design",
                  "description": "Custom illustrations and infographics for various applications"
                }
              }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How much do graphic design services cost?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Graphic design services typically range from £250 for a logo design to £5,000+ for complete brand identity packages. Our pricing depends on project scope, complexity, and deliverables. We offer flexible packages to suit different budgets."
              }
            },
            {
              "@type": "Question",
              "name": "What does a graphic designer do?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A graphic designer creates visual content to communicate messages through typography, imagery, color, and form. We design logos, branding materials, marketing collateral, digital graphics, and help businesses establish their visual identity."
              }
            },
            {
              "@type": "Question",
              "name": "How long does a graphic design project take?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Graphic design projects typically take 1-4 weeks. Logo design: 1-2 weeks, brand identity: 3-4 weeks, marketing materials: 1-2 weeks. Timeline includes concept development, revisions, and final delivery."
              }
            },
            {
              "@type": "Question",
              "name": "What's included in graphic design services?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our graphic design services include initial consultation, concept development, multiple design options, revision rounds, final files in various formats (AI, EPS, PNG, JPG, PDF), and usage guidelines. Brand packages include comprehensive style guides."
              }
            },
            {
              "@type": "Question",
              "name": "Why hire a professional graphic designer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Professional graphic designers bring expertise in visual communication, brand strategy, and technical skills. We ensure your designs are effective, memorable, and work across all media while maintaining consistency and professional quality."
              }
            },
            {
              "@type": "Question",
              "name": "What file formats will I receive?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You'll receive files in multiple formats: vector files (AI, EPS, SVG) for scalability, high-resolution raster files (PNG, JPG) for digital use, PDF for print, and specialized formats as needed. All files come with usage instructions."
              }
            }
          ]
        }
      ]
    };
    
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add date to projects
  const projectsWithDates = useMemo(() => {
    return graphicDesignProjects.map(project => ({
      ...project,
      date: new Date(project.year, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
    }));
  }, []);

  // Categories with counts
  const categoriesWithCounts = useMemo(() => {
    const counts = {};
    graphicDesignProjects.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });

    return [
      { name: 'all', count: graphicDesignProjects.length },
      ...Object.keys(counts).map(category => ({
        name: category,
        count: counts[category]
      })).sort((a, b) => a.name.localeCompare(b.name))
    ];
  }, []);

  // Search functionality
  const performSearch = (term) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const terms = term.toLowerCase().trim().split(/\s+/);

    const scoredResults = projectsWithDates.map(project => {
      let score = 0;

      terms.forEach(searchTerm => {
        if (project.title.toLowerCase().includes(searchTerm)) score += 10;
        if (project.category.toLowerCase().includes(searchTerm)) score += 8;
        if (project.client.toLowerCase().includes(searchTerm)) score += 7;
        if (project.description.toLowerCase().includes(searchTerm)) score += 5;
        project.tags.forEach(tag => {
          if (tag.toLowerCase().includes(searchTerm)) score += 7;
        });
        project.tools.forEach(tool => {
          if (tool.toLowerCase().includes(searchTerm)) score += 6;
        });
      });

      return { ...project, searchScore: score };
    });

    const matchedResults = scoredResults
      .filter(item => item.searchScore > 0)
      .sort((a, b) => b.searchScore - a.searchScore);

    setSearchResults(matchedResults);
    setIsSearching(false);
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter projects
  const displayedProjects = useMemo(() => {
    if (searchTerm.trim() && searchResults.length > 0) {
      if (filter !== 'all') {
        return searchResults.filter(project => project.category === filter);
      }
      return searchResults;
    }

    let filtered = projectsWithDates;
    if (filter !== 'all') {
      filtered = projectsWithDates.filter(project => project.category === filter);
    }

    return [...filtered].sort((a, b) => b.id - a.id);
  }, [filter, searchTerm, searchResults, projectsWithDates]);

  // Handle project click
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    document.body.classList.add('no-scroll');
    if (isMobile) {
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    }
  };

  // Close detail view
  const closeDetailView = () => {
    if (isMobile) {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }
    setSelectedProject(null);
    document.body.classList.remove('no-scroll');
  };

  // Navigation for lightbox
  const getAdjacentProjects = () => {
    if (!selectedProject) return { prevProject: null, nextProject: null };

    const currentProjects = [...displayedProjects];
    const currentIndex = currentProjects.findIndex(p => p.id === selectedProject.id);

    const prevProject = currentIndex > 0 ? currentProjects[currentIndex - 1] : null;
    const nextProject = currentIndex < currentProjects.length - 1 ? currentProjects[currentIndex + 1] : null;

    return { prevProject, nextProject };
  };

  const { prevProject, nextProject } = getAdjacentProjects();

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && nextProject) {
      setSelectedProject(nextProject);
    }
    if (isRightSwipe && prevProject) {
      setSelectedProject(prevProject);
    }
  };

  // Service icons map
  const serviceIcons = {
    branding: <BrandingIcon />,
    print: <PrintIcon />,
    digital: <DigitalIcon />,
    illustration: <IllustrationIcon />
  };

  // Process icons map
  const processIcons = [
    <ResearchIcon />,
    <ConceptIcon />,
    <DesignIcon />,
    <DeliveryIcon />
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d1117',
      color: '#ffffff',
      marginTop: isMobile ? '-70px' : '-90px'
    }}>
      {/* Hero Section */}
      <motion.div
        style={{
          y: headerY,
          opacity: headerOpacity,
          position: 'relative',
          paddingTop: isMobile ? '150px' : '170px',
          paddingBottom: space['4xl'],
          paddingLeft: space.xl,
          paddingRight: space.xl,
          marginTop: isMobile ? '0' : '-80px',
          background: 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)',
          overflow: 'hidden'
        }}
      >
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: 'radial-gradient(circle at 20% 50%, #00ff7f 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontSize: isMobile ? fontSize['4xl'] : fontSize['6xl'],
              fontWeight: fontWeight.bold,
              marginBottom: space.xl,
              background: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center'
            }}
          >
            Graphic Design Portfolio
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: fontSize.xl,
              color: colors.text.medium,
              textAlign: 'center',
              maxWidth: '700px',
              margin: '0 auto',
              marginBottom: space['3xl'],
              lineHeight: '1.6'
            }}
          >
            Transforming ideas into visual masterpieces. From brand identities to digital illustrations,
            explore our creative journey.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            <div style={{
              position: 'relative',
              transition: `all ${transition.base} cubic-bezier(0.4, 0, 0.2, 1)`,
              transform: searchFocused ? 'scale(1.02)' : 'scale(1)',
              filter: searchFocused ? 'drop-shadow(0 0 30px rgba(0, 255, 127, 0.4))' : 'none'
            }}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search projects, clients, tools, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                aria-label="Search graphic design projects"
                style={{
                  width: '100%',
                  padding: `${space.lg} ${space.lg} ${space.lg} ${space['3xl']}`,
                  borderRadius: '60px',
                  background: searchFocused 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(255, 255, 255, 0.02)',
                  border: `2px solid ${searchFocused ? '#00ff7f' : 'rgba(0, 255, 127, 0.2)'}`,
                  color: '#f0f0f0',
                  fontSize: fontSize.base,
                  fontWeight: fontWeight.medium,
                  outline: 'none',
                  transition: `all ${transition.base} cubic-bezier(0.4, 0, 0.2, 1)`,
                  backdropFilter: 'blur(10px)'
                }}
              />
              <div style={{
                position: 'absolute',
                left: '1.3rem',
                top: '50%',
                transform: 'translateY(-50%)',
                transition: `all ${transition.base} ease`,
                color: searchFocused ? '#00ff7f' : 'rgba(255, 255, 255, 0.5)'
              }}>
                <SearchIcon />
              </div>
              {isSearching && (
                <div style={{
                  position: 'absolute',
                  right: '4rem',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}>
                  <Spinner size="small" color="#00ff7f" />
                </div>
              )}
              {searchTerm && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => {
                    setSearchTerm('');
                    searchInputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                  style={{
                    position: 'absolute',
                    right: '1.2rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: fontSize.sm,
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: `all ${transition.fast} ease`
                  }}
                  whileHover={{ background: 'rgba(255, 0, 0, 0.2)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Filters and View Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: space['2xl'],
          flexWrap: 'wrap',
          gap: space.lg,
          padding: space.lg,
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          maxWidth: '1200px',
          margin: `0 auto ${space['2xl']}`
        }}
      >
        {/* Category Filters */}
        <div className="filter-buttons" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: space.sm
        }}>
          {categoriesWithCounts.map((category, index) => (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category.name)}
              aria-label={`Filter by ${category.name === 'all' ? 'all projects' : category.name} (${category.count} projects)`}
              style={{
                padding: `${space.sm} ${space.lg}`,
                borderRadius: '30px',
                background: filter === category.name 
                  ? 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)' 
                  : 'rgba(255, 255, 255, 0.03)',
                border: '1px solid',
                borderColor: filter === category.name ? 'transparent' : 'rgba(255, 255, 255, 0.1)',
                color: filter === category.name ? '#0d0d0d' : '#f0f0f0',
                fontWeight: filter === category.name ? fontWeight.semibold : fontWeight.medium,
                fontSize: fontSize.sm,
                cursor: 'pointer',
                transition: `all ${transition.base} cubic-bezier(0.4, 0, 0.2, 1)`,
                display: 'flex',
                alignItems: 'center',
                gap: space.sm,
                boxShadow: filter === category.name 
                  ? '0 4px 15px rgba(0, 255, 127, 0.3)' 
                  : 'none'
              }}
            >
              <span>{category.name === 'all' ? 'All Projects' : category.name}</span>
              <span style={{
                backgroundColor: filter === category.name 
                  ? 'rgba(0,0,0,0.2)' 
                  : 'rgba(0,255,127,0.15)',
                color: filter === category.name ? '#0d0d0d' : '#00ff7f',
                borderRadius: '20px',
                padding: `${space.xs} ${space.sm}`,
                fontSize: fontSize.xs,
                fontWeight: fontWeight.bold
              }}>
                {category.count}
              </span>
            </motion.button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div style={{
          display: 'flex',
          gap: space.xs,
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '30px',
          padding: space.xs
        }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('grid')}
            style={{
              padding: `${space.sm} ${space.md}`,
              borderRadius: '25px',
              background: viewMode === 'grid' ? '#00ff7f' : 'transparent',
              color: viewMode === 'grid' ? '#0d0d0d' : '#f0f0f0',
              border: 'none',
              cursor: 'pointer',
              transition: `all ${transition.base} ease`,
              display: 'flex',
              alignItems: 'center',
              gap: space.xs,
              fontWeight: viewMode === 'grid' ? fontWeight.semibold : fontWeight.medium
            }}
          >
            <GridIcon />
            {!isMobile && 'Grid'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('list')}
            style={{
              padding: `${space.sm} ${space.md}`,
              borderRadius: '25px',
              background: viewMode === 'list' ? '#00ff7f' : 'transparent',
              color: viewMode === 'list' ? '#0d0d0d' : '#f0f0f0',
              border: 'none',
              cursor: 'pointer',
              transition: `all ${transition.base} ease`,
              display: 'flex',
              alignItems: 'center',
              gap: space.xs,
              fontWeight: viewMode === 'list' ? fontWeight.semibold : fontWeight.medium
            }}
          >
            <ListIcon />
            {!isMobile && 'List'}
          </motion.button>
        </div>
      </motion.div>

      {/* Projects Grid/List */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: `0 ${space.xl} ${space['4xl']}`
      }}>
        {displayedProjects.length > 0 ? (
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: viewMode === 'grid' 
                ? `repeat(auto-fill, minmax(${isMobile ? '280px' : '350px'}, 1fr))`
                : '1fr',
              gap: space.xl
            }}
          >
            {displayedProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                viewMode={viewMode}
                hoveredProject={hoveredProject}
                onHover={setHoveredProject}
                onLeave={() => setHoveredProject(null)}
                onClick={handleProjectClick}
              />
            ))}
          </motion.div>
        ) : (
          <EmptyState
            icon="🔍"
            title="No projects found"
            description="Try adjusting your search or filter criteria"
            action={
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {setFilter('all'); setSearchTerm('');}}
                style={{
                  padding: '0.8rem 2rem',
                  background: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
                  color: '#0d0d0d',
                  border: 'none',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontSize: fontSize.base,
                  fontWeight: fontWeight.semibold,
                  boxShadow: '0 4px 15px rgba(0, 255, 127, 0.3)'
                }}
              >
                Clear Filters
              </motion.button>
            }
          />
        )}
      </div>

      {/* Services Section */}
      <section style={{
        background: 'linear-gradient(180deg, rgba(0, 255, 127, 0.02) 0%, transparent 100%)',
        padding: `${space['5xl']} ${space.xl}`,
        marginTop: space['5xl']
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: fontSize['4xl'],
              fontWeight: fontWeight.bold,
              textAlign: 'center',
              marginBottom: space['3xl'],
              background: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Our Design Services
          </motion.h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: space.xl
          }}>
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard
                  service={service}
                  icon={serviceIcons[service.id]}
                  onClick={() => setActiveServiceTab(service.id)}
                  isActive={activeServiceTab === service.id}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section style={{
        padding: `${space['5xl']} ${space.xl}`,
        background: 'linear-gradient(180deg, transparent 0%, rgba(0, 255, 127, 0.02) 100%)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: fontSize['4xl'],
              fontWeight: fontWeight.bold,
              textAlign: 'center',
              marginBottom: space['3xl'],
              background: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Our Design Process
          </motion.h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? '250px' : '280px'}, 1fr))`,
            gap: space['2xl']
          }}>
            {processSteps.map((step, index) => (
              <ProcessStepCard
                key={index}
                step={step}
                index={index}
                icon={processIcons[index]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{
        padding: `${space['5xl']} ${space.xl} ${space['4xl']}`,
        background: 'linear-gradient(180deg, rgba(0, 255, 127, 0.02) 0%, transparent 100%)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: fontSize['4xl'],
              fontWeight: fontWeight.bold,
              textAlign: 'center',
              marginBottom: space['3xl'],
              background: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Frequently Asked Questions
          </motion.h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: space.lg }}>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden'
                }}
              >
                <motion.button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  style={{
                    width: '100%',
                    padding: space.xl,
                    background: 'none',
                    border: 'none',
                    color: colors.text.heading,
                    fontSize: fontSize.lg,
                    fontWeight: fontWeight.medium,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                >
                  {faq.question}
                  <motion.span
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ color: '#00ff7f' }}
                  >
                    ▼
                  </motion.span>
                </motion.button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        padding: `0 ${space.xl} ${space.xl}`,
                        color: colors.text.medium,
                        fontSize: fontSize.base,
                        lineHeight: '1.7'
                      }}
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          selectedProject={selectedProject}
          prevProject={prevProject}
          nextProject={nextProject}
          onClose={closeDetailView}
          onNavigate={setSelectedProject}
          isMobile={isMobile}
          touchHandlers={{
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: handleTouchEnd
          }}
        />
      )}
    </div>
  );
};

export default GraphicDesignPortfolio;