import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { space, fontSize, fontWeight, lineHeight, transition, colors, zIndex } from '../../utils/designTokens';

const GraphicDesignPortfolio = () => {
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
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [modalScrollY, setModalScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isImageMinimized, setIsImageMinimized] = useState(false);

  const searchInputRef = useRef(null);
  const headerRef = useRef(null);
  const modalContentRef = useRef(null);
  const modalImageRef = useRef(null);
  const infoSectionRef = useRef(null);

  // Scroll animations
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 100], [0, -10]);
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.98]);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle touch swipe for modal navigation
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

  // Handle modal scroll on mobile for dynamic image height
  const handleModalScroll = (e) => {
    if (isMobile && infoSectionRef.current && e.target === infoSectionRef.current) {
      const scrollTop = e.target.scrollTop;
      const isScrollingDown = scrollTop > lastScrollY;
      const isAtTop = scrollTop === 0;
      
      setLastScrollY(scrollTop);
      
      if (isAtTop) {
        setIsImageMinimized(false);
      } else if (isScrollingDown && scrollTop > 10) {
        setIsImageMinimized(true);
      }
    }
  };

  // Calculate image height based on scroll
  const imageHeight = isMobile ? (isImageMinimized ? 150 : 400) : 'auto';

  // Custom icons
  const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );

  const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  );

  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const VideoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7"></polygon>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
    </svg>
  );

  const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffd700" stroke="#ffd700" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );

  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00ff7f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

  const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  );

  const GridIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="7" height="7" rx="1.5" />
      <rect x="11" y="2" width="7" height="7" rx="1.5" />
      <rect x="2" y="11" width="7" height="7" rx="1.5" />
      <rect x="11" y="11" width="7" height="7" rx="1.5" />
    </svg>
  );

  const ListIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="2" y1="4" x2="18" y2="4" strokeLinecap="round" />
      <line x1="2" y1="10" x2="18" y2="10" strokeLinecap="round" />
      <line x1="2" y1="16" x2="18" y2="16" strokeLinecap="round" />
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );

  // NEW Minimalist Service Icons
  const BrandingIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5"></path>
          <path d="M2 12l10 5 10-5"></path>
      </svg>
  );

  const PrintIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
  );

  const DigitalIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
  );

  const IllustrationIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
          <path d="M18 13l-1.414-1.414a2 2 0 0 0-2.828 0L12 13"></path>
          <path d="M5 3l14 14"></path>
      </svg>
  );


  // Graphic design portfolio data
  const graphicDesignProjects = [
    {
      id: 1,
      src: "/images/GraphicDesign/yahboi-brand.webp",
      title: "YAHBOI Designs Brand Identity",
      category: "Brand Identity",
      client: "YAHBOI Designs",
      description: "Complete brand identity system featuring a distinctive geometric triangular logo mark. The design combines modern minimalism with bold geometric shapes, creating a professional yet approachable identity for a graphic design studio.",
      tags: ["branding", "logo design", "identity", "geometric", "minimalist", "design studio"],
      tools: ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign"],
      deliverables: ["Logo Files", "Brand Guidelines", "Business Cards", "Letterhead", "Gold Foil Applications"],
      year: 2024,
      clientReview: {
        name: "Ahmed Hassan",
        company: "YAHBOI Designs",
        rating: 5,
        review: "Exceptional work! The brand identity perfectly captures our vision. The attention to detail in the gold foil applications was outstanding."
      }
    },
    {
      id: 2,
      src: "/images/GraphicDesign/yahboi-cards.webp",
      title: "YAHBOI Premium Business Cards",
      category: "Print Design",
      client: "YAHBOI Designs",
      description: "Luxurious business card design featuring black matte finish with gold foil logo and red accent stripes. The cards showcase premium printing techniques and sophisticated color combinations that reflect the brand's high-end design services.",
      tags: ["business cards", "print", "gold foil", "luxury", "branding", "premium"],
      tools: ["Adobe Illustrator", "Adobe InDesign"],
      deliverables: ["Print-ready Files", "Foil Specifications", "Color Separations"],
      year: 2024,
      clientReview: {
        name: "Sarah Ahmed",
        company: "YAHBOI Designs",
        rating: 5,
        review: "These business cards are conversation starters! The quality is exceptional and they perfectly represent our premium brand."
      }
    },
    {
      id: 3,
      src: "/images/GraphicDesign/welance-cards.webp",
      title: "WE LANCE Studios Business Cards",
      category: "Print Design",
      client: "WE Lance Studios",
      description: "Modern business card design with vibrant purple-to-blue gradient backgrounds. Features clean typography and contemporary aesthetic that reflects the studio's creative and professional approach to design services.",
      tags: ["business cards", "gradient", "modern", "purple", "studio", "branding"],
      tools: ["Adobe Illustrator", "Adobe Photoshop"],
      deliverables: ["Business Card Design", "Digital Mockups", "Print Files"],
      year: 2024,
      clientReview: {
        name: "Michael Chen",
        company: "WE Lance Studios",
        rating: 5,
        review: "The gradient design is eye-catching and modern. Our team loves the new cards, and clients always comment on them!"
      }
    },
    {
      id: 4,
      src: "/images/GraphicDesign/welance-logo.webp",
      title: "WE LANCE Studios Logo Design",
      category: "Brand Identity",
      client: "WE Lance Studios",
      description: "Contemporary logo design combining geometric triangular elements with clean typography. The navy blue and teal color palette creates a professional yet creative identity perfect for a modern design studio.",
      tags: ["logo design", "geometric", "studio", "modern", "navy blue", "teal"],
      tools: ["Adobe Illustrator", "Figma"],
      deliverables: ["Logo Variations", "Color Palette", "Usage Guidelines"],
      year: 2024
    },
    {
      id: 5,
      src: "/images/GraphicDesign/qg-3d-logo.webp",
      title: "QG 3D Logo Design",
      category: "Brand Identity",
      client: "QG Brand",
      description: "Bold 3D-style lettermark logo featuring dimensional 'QG' letters with sophisticated teal and dark color scheme. The design creates strong visual impact while maintaining professional elegance.",
      tags: ["logo", "3d", "lettermark", "teal", "dimensional", "corporate"],
      tools: ["Adobe Illustrator", "Cinema 4D"],
      deliverables: ["3D Logo Files", "2D Versions", "Brand Applications"],
      year: 2024,
      clientReview: {
        name: "Robert Quinn",
        company: "QG Brand",
        rating: 5,
        review: "The 3D effect adds incredible depth to our brand. It stands out beautifully across all applications."
      }
    },
    {
      id: 6,
      src: "/images/GraphicDesign/qg-gradient.webp",
      title: "QG Rainbow Gradient Logo",
      category: "Brand Identity",
      client: "QG Brand",
      description: "Vibrant interpretation of the QG logo featuring rainbow gradient effects. This version showcases the brand's creative and dynamic personality while maintaining the strong lettermark foundation.",
      tags: ["logo", "rainbow", "gradient", "vibrant", "creative", "colorful"],
      tools: ["Adobe Illustrator", "Adobe Photoshop"],
      deliverables: ["Gradient Logo Files", "Color Specifications", "Digital Applications"],
      year: 2024
    },
    {
      id: 7,
      src: "/images/GraphicDesign/geometric-pattern.webp",
      title: "Geometric Pattern Design",
      category: "Pattern Design",
      client: "Design Studio",
      description: "Intricate geometric pattern featuring triangular lattice design with mathematical precision. The black and white composition demonstrates mastery of geometric principles and can be applied across various design applications.",
      tags: ["pattern", "geometric", "triangular", "mathematical", "black and white", "technical"],
      tools: ["Adobe Illustrator", "Mathematical Calculation"],
      deliverables: ["Vector Pattern", "Seamless Tiles", "Application Examples"],
      year: 2024
    },
    {
      id: 8,
      src: "/images/GraphicDesign/logo-guidelines.webp",
      title: "Logo Construction Guidelines",
      category: "Technical Design",
      client: "Brand Development",
      description: "Technical logo construction guide showing systematic approach to logo development using geometric grids and mathematical proportions. Demonstrates professional logo design methodology and precision.",
      tags: ["construction", "grid system", "technical", "guidelines", "methodology", "precision"],
      tools: ["Adobe Illustrator", "Grid Systems"],
      deliverables: ["Construction Guide", "Grid Templates", "Technical Specifications"],
      year: 2024
    },
    {
      id: 9,
      src: "/images/GraphicDesign/nawab-poster.webp",
      title: "Legacy of the NAWAB Poster",
      category: "Illustration",
      client: "National College of Arts",
      description: "Cinematic illustrated poster featuring beautiful Mughal/South Asian architecture with a silhouetted character. The warm sunset palette and detailed architectural elements create a compelling narrative illustration for an educational institution.",
      tags: ["poster", "illustration", "architecture", "mughal", "cinematic", "educational"],
      tools: ["Adobe Illustrator", "Adobe Photoshop"],
      deliverables: ["Poster Design", "Digital Illustration", "Print Files"],
      year: 2024,
      clientReview: {
        name: "Dr. Fatima Shah",
        company: "National College of Arts",
        rating: 5,
        review: "Beautifully captures the essence of our heritage. The poster has become iconic for our institution."
      }
    },
    {
      id: 10,
      src: "/images/GraphicDesign/bowling-wine.webp",
      title: "Women BOWLING with Wine Logo",
      category: "Brand Identity",
      client: "Social Event Group",
      description: "Clever minimalist line art logo that creatively combines a wine glass and bowling pin into a single elegant design. The magenta color scheme and clean execution make it perfect for social events and recreational activities.",
      tags: ["logo", "minimalist", "line art", "wine", "bowling", "social events"],
      tools: ["Adobe Illustrator"],
      deliverables: ["Logo Files", "Monogram Variations", "Brand Applications"],
      year: 2024
    },
    {
      id: 11,
      src: "/images/GraphicDesign/bowling-logo.webp",
      title: "Women Bowling Logo Variation",
      category: "Brand Identity",
      client: "Social Event Group",
      description: "Alternative logo design featuring a stylized bowling pin with elegant line work. The design maintains the minimalist aesthetic while providing a more focused representation of the bowling activity.",
      tags: ["logo", "bowling", "minimalist", "line art", "women", "recreation"],
      tools: ["Adobe Illustrator"],
      deliverables: ["Logo Variation", "Style Guide", "Usage Examples"],
      year: 2024
    },
    {
      id: 12,
      src: "/images/GraphicDesign/industrial-thumb.webp",
      video: "/images/GraphicDesign/industrial-3d.mp4",
      title: "Industrial Landscape 3D Animation",
      category: "3D Animation",
      client: "Superhero Film Project",
      description: "Atmospheric 3D rendered industrial landscape featuring factory smokestacks, pollution effects, and dramatic lighting. Created for a superhero-themed animation project, showcasing environmental storytelling through 3D modeling and rendering.",
      tags: ["3d animation", "industrial", "environment", "superhero", "atmospheric", "cinematic"],
      tools: ["Blender", "Adobe After Effects"],
      deliverables: ["3D Animation", "Environment Models", "Lighting Setup", "Rendered Sequences"],
      year: 2024,
      clientReview: {
        name: "James Director",
        company: "Film Studios",
        rating: 5,
        review: "The atmospheric quality exceeded our expectations. Perfect for our superhero origin sequence!"
      }
    },
  ];

  // Services data with NEW icons
  const services = [
    {
      id: 'branding',
      title: 'Brand Identity',
      icon: <BrandingIcon />,
      description: "Crafting unique logos and visual systems that tell your brand's story.",
      features: [
        'Logo Design & Variations',
        'Brand Guidelines',
        'Color Psychology',
        'Typography Systems',
        'Brand Story Development',
        'Visual Language Creation'
      ]
    },
    {
      id: 'print',
      title: 'Print Design',
      icon: <PrintIcon />,
      description: 'Designing impactful print materials that make a tangible connection.',
      features: [
        'Business Cards & Stationery',
        'Brochures & Catalogs',
        'Posters & Banners',
        'Packaging Design',
        'Book & Magazine Layouts',
        'Marketing Collateral'
      ]
    },
    {
      id: 'digital',
      title: 'Digital Design',
      icon: <DigitalIcon />,
      description: 'Creating engaging digital graphics for websites and social media.',
      features: [
        'Social Media Graphics',
        'Web Banners & Ads',
        'Email Templates',
        'Digital Presentations',
        'Infographics',
        'UI Elements & Icons'
      ]
    },
    {
      id: 'illustration',
      title: 'Illustration',
      icon: <IllustrationIcon />,
      description: 'Bringing ideas to life with custom illustrations and visual narratives.',
      features: [
        'Digital Illustrations',
        'Character Design',
        'Editorial Illustrations',
        'Technical Drawings',
        'Icon Sets',
        'Pattern Design'
      ]
    }
  ];

  // Process steps
  // Process Step Icons
  const ResearchIcon = () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
      <path d="M11 8a3 3 0 0 0-3 3"></path>
    </svg>
  );

  const ConceptIcon = () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <line x1="12" y1="1" x2="12" y2="7"></line>
      <line x1="12" y1="17" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="8.46" y2="8.46"></line>
      <line x1="15.54" y1="15.54" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="7" y2="12"></line>
      <line x1="17" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="8.46" y2="15.54"></line>
      <line x1="15.54" y1="8.46" x2="19.78" y2="4.22"></line>
    </svg>
  );

  const DesignIcon = () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
      <path d="M5 3v4"></path>
      <path d="M19 17v4"></path>
      <path d="M3 5h4"></path>
      <path d="M17 19h4"></path>
    </svg>
  );

  const DeliveryIcon = () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
    </svg>
  );

  const processSteps = [
    {
      number: "01",
      title: "Discovery & Research",
      description: "Understanding your brand, target audience, and project goals through in-depth consultation",
      icon: <ResearchIcon />
    },
    {
      number: "02",
      title: "Concept Development",
      description: "Creating initial concepts and mood boards to establish the visual direction",
      icon: <ConceptIcon />
    },
    {
      number: "03",
      title: "Design & Refinement",
      description: "Developing the chosen concept with attention to detail and client feedback",
      icon: <DesignIcon />
    },
    {
      number: "04",
      title: "Delivery & Support",
      description: "Providing final files in all required formats with ongoing support",
      icon: <DeliveryIcon />
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "David Martinez",
      company: "Tech Innovations Ltd",
      rating: 5,
      review: "Working with the team was an absolute pleasure. They understood our vision perfectly and delivered a brand identity that exceeded our expectations. The attention to detail and professionalism throughout the project was outstanding.",
      project: "Complete Brand Redesign"
    },
    {
      name: "Sophie Chen",
      company: "Bloom Cosmetics",
      rating: 5,
      review: "The packaging design created for our product line is stunning! Sales have increased significantly since the rebrand. They have an incredible eye for design and really understand market trends.",
      project: "Product Packaging Design"
    },
    {
      name: "Marcus Johnson",
      company: "Urban Fitness Hub",
      rating: 5,
      review: "The team transformed our outdated brand into something modern and energetic. The new logo and marketing materials have helped us attract a younger demographic. Highly recommend!",
      project: "Brand Identity & Marketing"
    }
  ];

  // Add dates to projects
  const projectsWithDates = useMemo(() => {
    return graphicDesignProjects.map(project => {
      const monthsAgo = 14 - project.id;
      const date = new Date();
      date.setMonth(date.getMonth() - monthsAgo);

      return {
        ...project,
        createdDate: date
      };
    });
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

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsHeaderSticky(true);
      } else {
        setIsHeaderSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    setModalScrollY(0);
    setLastScrollY(0);
    setIsImageMinimized(false);
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

  // Open Service Detail View
  const handleServiceClick = (service) => {
    setSelectedService(service);
    setModalScrollY(0);
    setLastScrollY(0);
    setIsImageMinimized(false);
    document.body.classList.add('no-scroll');
    if (isMobile) {
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    }
  };

  // Close Service Detail View
  const closeServiceDetail = () => {
    if (isMobile) {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }
    setSelectedService(null);
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

  // Format date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
        if (e.key === 'Escape') {
            if (selectedProject) closeDetailView();
            else if (selectedService) closeServiceDetail();
            return;
        }

        if (!selectedProject) return;

        const { prevProject, nextProject } = getAdjacentProjects();

        if (e.key === 'ArrowLeft' && prevProject) setSelectedProject(prevProject);
        else if (e.key === 'ArrowRight' && nextProject) setSelectedProject(nextProject);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedProject, selectedService, displayedProjects]);

  const { prevProject, nextProject } = getAdjacentProjects();

  return (
    <div className="graphic-design-portfolio" style={{ 
      minHeight: '100vh',
      background: '#0a0a0a',
      position: 'relative'
    }}>
      {/* Enhanced Header Section */}
      <motion.div
        ref={headerRef}
        className="portfolio-header" 
        style={{
          background: 'linear-gradient(135deg, rgba(13,17,23,0.98) 0%, rgba(0,40,30,0.98) 100%)',
          borderRadius: '20px',
          padding: isMobile ? '60px 15px 30px' : `${space['3xl']} ${space.xl}`,
          marginBottom: space['2xl'],
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(20px)',
          transform: `translateY(${headerY}px)`,
          opacity: headerOpacity,
        }}
      >
        {/* Animated background elements */}
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, opacity: 0.05 }}>
          {Array(6).fill(0).map((_, i) => (
            <motion.div 
              key={i} 
              animate={{
                x: [0, 30, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                width: `${Math.random() * 300 + 200}px`,
                height: `${Math.random() * 300 + 200}px`,
                background: `radial-gradient(circle, rgba(0, 255, 127, ${Math.random() * 0.3 + 0.1}) 0%, transparent 70%)`,
                borderRadius: '50%',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(40px)',
                transform: 'translate(-50%, -50%)'
              }} 
            />
          ))}
        </div>

        <div style={{ position: 'relative', zIndex: zIndex.content }}>
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              fontSize: isMobile ? fontSize['2xl'] : `clamp(${fontSize['3xl']}, 4vw, ${fontSize['4xl']})`,
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 50%, #00cc64 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
              fontWeight: fontWeight.bold,
              letterSpacing: '-0.02em'
            }}
          >
            Graphic Design Studio
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              fontSize: isMobile ? fontSize.base : `clamp(${fontSize.base}, 1.5vw, ${fontSize.lg})`,
              textAlign: 'center',
              maxWidth: isMobile ? '90%' : '800px',
              margin: isMobile ? '0 auto 2rem' : '0 auto 2.5rem',
              paddingLeft: isMobile ? '10px' : '0',
              paddingRight: isMobile ? '10px' : '0',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: '1.6'
            }}
          >
            Transforming ideas into powerful visual experiences. Explore our collection of creative work
            spanning brand identity, print design, digital experiences, and more.
          </motion.p>

          {/* Enhanced Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: isMobile ? '15px' : space.xl,
              flexWrap: isMobile ? 'wrap' : 'nowrap',
              marginBottom: space['2xl'],
              flexWrap: 'wrap'
            }}
          >
            {[
              { value: '50+', label: 'Projects Completed' },
              { value: '30+', label: 'Happy Clients' },
              { value: '5★', label: 'Average Rating' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                style={{ 
                  textAlign: 'center',
                  padding: `${space.lg} ${space.xl}`,
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '16px',
                  border: '1px solid rgba(0, 255, 127, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <h3 style={{ 
                  color: '#00ff7f', 
                  fontSize: fontSize['3xl'], 
                  margin: 0,
                  fontWeight: fontWeight.bold 
                }}>
                  {stat.value}
                </h3>
                <p style={{ 
                  color: 'rgba(255,255,255,0.6)', 
                  margin: 0,
                  fontSize: fontSize.sm,
                  marginTop: '0.5rem' 
                }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="search-container"
            style={{ 
              width: '100%',
              maxWidth: isMobile ? '100%' : '700px', 
              margin: '0 auto',
              padding: isMobile ? '0 10px' : '0'
            }}
          >
            <div
              className={`search-bar ${searchFocused ? 'focused' : ''}`}
              style={{
                position: 'relative',
                transition: `all ${transition.base} cubic-bezier(0.4, 0, 0.2, 1)`,
                transform: searchFocused ? 'scale(1.02)' : 'scale(1)',
                filter: searchFocused ? 'drop-shadow(0 0 30px rgba(0, 255, 127, 0.4))' : 'none'
              }}
            >
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
                  padding: isMobile ? '10px 40px 10px 40px' : `${space.lg} ${space.lg} ${space.lg} ${space['3xl']}`,
                  borderRadius: isMobile ? '25px' : '60px',
                  boxSizing: 'border-box',
                  background: searchFocused 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(255, 255, 255, 0.02)',
                  border: `2px solid ${searchFocused ? '#00ff7f' : 'rgba(0, 255, 127, 0.2)'}`,
                  color: '#f0f0f0',
                  fontSize: isMobile ? '14px' : fontSize.base,
                  fontWeight: fontWeight.medium,
                  outline: 'none',
                  transition: `all ${transition.base} cubic-bezier(0.4, 0, 0.2, 1)`,
                  backdropFilter: 'blur(10px)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '1.3rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  transition: `all ${transition.base} ease`,
                  color: searchFocused ? '#00ff7f' : 'rgba(255, 255, 255, 0.5)'
                }}
              >
                <SearchIcon />
              </div>
              {searchTerm && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={(e) => {
                    e.stopPropagation();
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

      {/* Enhanced Filters and View Controls */}
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
          gap: isMobile ? '10px' : space.lg,
          padding: isMobile ? '10px' : space.lg,
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Category Filters */}
        <div className="filter-buttons" style={{
          display: 'flex',
          flexWrap: isMobile ? 'nowrap' : 'wrap',
          gap: isMobile ? '5px' : space.sm,
          overflowX: isMobile ? 'auto' : 'visible',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none'
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
                padding: isMobile ? '8px 12px' : `${space.sm} ${space.lg}`,
                flexShrink: 0,
                borderRadius: '30px',
                background: filter === category.name 
                  ? 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)' 
                  : 'rgba(255, 255, 255, 0.03)',
                border: '1px solid',
                borderColor: filter === category.name ? 'transparent' : 'rgba(255, 255, 255, 0.1)',
                color: filter === category.name ? '#0d0d0d' : '#f0f0f0',
                fontWeight: filter === category.name ? fontWeight.semibold : fontWeight.medium,
                fontSize: isMobile ? '12px' : fontSize.sm,
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

        {/* Enhanced View Mode Toggle */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="view-mode-buttons" 
          style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '20px',
            padding: isMobile ? '0.1rem' : '0.15rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            flexShrink: 0
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('grid')}
            style={{
              padding: isMobile ? '0.3rem 0.5rem' : '0.4rem 0.7rem',
              background: viewMode === 'grid' ? '#00ff7f' : 'transparent',
              color: viewMode === 'grid' ? '#000000' : '#ffffff',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              fontSize: isMobile ? '0.7rem' : '0.75rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <rect x="1" y="1" width="6" height="6" rx="1" />
              <rect x="9" y="1" width="6" height="6" rx="1" />
              <rect x="1" y="9" width="6" height="6" rx="1" />
              <rect x="9" y="9" width="6" height="6" rx="1" />
            </svg>
            {!isMobile && 'Grid'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('list')}
            style={{
              padding: isMobile ? '0.3rem 0.5rem' : '0.4rem 0.7rem',
              background: viewMode === 'list' ? '#00ff7f' : 'transparent',
              color: viewMode === 'list' ? '#000000' : '#ffffff',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              fontSize: isMobile ? '0.7rem' : '0.75rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <rect x="1" y="2" width="14" height="2" rx="1" />
              <rect x="1" y="7" width="14" height="2" rx="1" />
              <rect x="1" y="12" width="14" height="2" rx="1" />
            </svg>
            {!isMobile && 'List'}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Enhanced Search Results Info */}
      {searchTerm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: space.lg,
            background: 'rgba(0, 255, 127, 0.05)',
            borderRadius: '16px',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid rgba(0, 255, 127, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <p style={{ margin: 0, color: '#f0f0f0' }}>
            {isSearching ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: space.sm }}>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  style={{ display: 'inline-block' }}
                >
                  ⟳
                </motion.span>
                Searching for "{searchTerm}"...
              </span>
            ) : (
              <span>
                Found <strong style={{ color: '#00ff7f' }}>{displayedProjects.length}</strong> 
                {displayedProjects.length === 1 ? ' project' : ' projects'}
                {filter !== 'all' && ` in ${filter}`}
              </span>
            )}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSearchTerm('')}
            style={{
              background: 'none',
              border: '1px solid #00ff7f',
              borderRadius: '20px',
              padding: `${space.sm} ${space.md}`,
              color: '#00ff7f',
              cursor: 'pointer',
              fontSize: fontSize.sm,
              fontWeight: fontWeight.medium,
              transition: `all ${transition.fast} ease`
            }}
          >
            Clear Search
          </motion.button>
        </motion.div>
      )}

      {/* Enhanced Projects Grid/List */}
      <AnimatePresence mode="wait">
        {displayedProjects.length > 0 ? (
          <motion.div
            key={viewMode + filter + searchTerm}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={viewMode === 'grid' ? 'projects-grid' : 'projects-list'}
            style={
              viewMode === 'grid'
                ? {
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                    gap: isMobile ? space.lg : space['2xl'],
                    marginBottom: '5rem'
                  }
                : {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: space.xl,
                    marginBottom: '5rem'
                  }
            }
          >
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ y: -10 }}
                onClick={() => handleProjectClick(project)}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={
                  viewMode === 'grid'
                    ? {
                        background: 'linear-gradient(135deg, rgba(13,17,23,0.95) 0%, rgba(0,30,60,0.95) 100%)',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: hoveredProject === project.id 
                          ? 'rgba(0, 255, 127, 0.5)' 
                          : 'rgba(0, 255, 127, 0.1)',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: `all ${transition.slow} cubic-bezier(0.4, 0, 0.2, 1)`,
                        boxShadow: hoveredProject === project.id
                          ? '0 20px 40px rgba(0, 255, 127, 0.2)'
                          : '0 10px 30px rgba(0,0,0,0.5)',
                        transform: hoveredProject === project.id
                          ? 'translateZ(20px)'
                          : 'translateZ(0)',
                        transformStyle: 'preserve-3d'
                      }
                    : {
                        background: 'linear-gradient(135deg, rgba(13,17,23,0.95) 0%, rgba(0,30,60,0.95) 100%)',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: hoveredProject === project.id 
                          ? 'rgba(0, 255, 127, 0.5)' 
                          : 'rgba(0, 255, 127, 0.1)',
                        cursor: 'pointer',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        transition: `all ${transition.slow} cubic-bezier(0.4, 0, 0.2, 1)`,
                        boxShadow: hoveredProject === project.id
                          ? '0 20px 40px rgba(0, 255, 127, 0.2)'
                          : '0 10px 30px rgba(0,0,0,0.5)'
                      }
                }
              >
                {/* Enhanced Project Image */}
                <div
                  className="project-image-container"
                  style={
                    viewMode === 'grid'
                      ? {
                          height: '240px',
                          overflow: 'hidden',
                          position: 'relative'
                        }
                      : {
                          width: '280px',
                          height: '180px',
                          overflow: 'hidden',
                          position: 'relative',
                          flexShrink: 0
                        }
                  }
                >
                  <motion.img
                    src={project.src}
                    alt={`${project.title} - ${project.category} design for ${project.client}. ${project.description.substring(0, 100)}...`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: hoveredProject === project.id 
                        ? 'scale(1.1)' 
                        : 'scale(1)'
                    }}
                  />
                  
                  {/* Overlay gradient on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredProject === project.id ? 1 : 0 
                    }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Enhanced Category Badge */}
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      background: 'rgba(0, 255, 127, 0.9)',
                      color: '#0d0d0d',
                      padding: `${space.xs} ${space.md}`,
                      borderRadius: '25px',
                      fontSize: fontSize.xs,
                      fontWeight: fontWeight.bold,
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 10px rgba(0, 255, 127, 0.3)'
                    }}
                  >
                    {project.category}
                  </motion.div>

                  {/* Video indicator */}
                  {project.video && (
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      style={{
                        position: 'absolute',
                        bottom: '15px',
                        left: '15px',
                        background: 'rgba(0, 0, 0, 0.8)',
                        color: '#fff',
                        padding: `${space.xs} ${space.sm}`,
                        borderRadius: '25px',
                        fontSize: fontSize.xs,
                        display: 'flex',
                        alignItems: 'center',
                        gap: space.xs,
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <VideoIcon />
                      Video
                    </motion.div>
                  )}

                  {/* Client Review Badge removed */}
                </div>

                {/* Enhanced Project Details */}
                <div
                  className="project-details"
                  style={
                    viewMode === 'grid'
                      ? {
                          padding: space.xl,
                          background: 'rgba(0, 0, 0, 0.3)'
                        }
                      : {
                          padding: space.xl,
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }
                  }
                >
                  <div>
                    <h3 style={{
                      fontSize: fontSize.xl,
                      marginBottom: '0.5rem',
                      color: '#fff',
                      fontWeight: fontWeight.semibold
                    }}>
                      {project.title}
                    </h3>

                    <p style={{
                      fontSize: fontSize.sm,
                      color: '#00ff7f',
                      marginBottom: '1rem',
                      fontWeight: fontWeight.medium
                    }}>
                      {project.client} • {project.year}
                    </p>

                    <p style={{
                      fontSize: fontSize.base,
                      color: 'rgba(255, 255, 255, 0.7)',
                      marginBottom: '1.5rem',
                      display: '-webkit-box',
                      WebkitLineClamp: viewMode === 'grid' ? 2 : 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: '1.6'
                    }}>
                      {project.description}
                    </p>
                  </div>

                  {/* Enhanced Tools */}
                  <div>
                    <div style={{
                      display: 'flex',
                      gap: space.sm,
                      flexWrap: 'wrap',
                      marginBottom: viewMode === 'list' ? '1.5rem' : '0'
                    }}>
                      {project.tools.slice(0, viewMode === 'grid' ? 2 : 4).map(tool => (
                        <span
                          key={tool}
                          style={{
                            padding: `${space.xs} ${space.sm}`,
                            background: 'rgba(0, 255, 127, 0.1)',
                            color: '#00ff7f',
                            borderRadius: '20px',
                            fontSize: fontSize.xs,
                            border: '1px solid rgba(0, 255, 127, 0.2)',
                            fontWeight: fontWeight.medium
                          }}
                        >
                          {tool}
                        </span>
                      ))}
                      {project.tools.length > (viewMode === 'grid' ? 2 : 4) && (
                        <span style={{
                          padding: '0.3rem 0.8rem',
                          color: 'rgba(255, 255, 255, 0.5)',
                          fontSize: '0.8rem'
                        }}>
                          +{project.tools.length - (viewMode === 'grid' ? 2 : 4)} more
                        </span>
                      )}
                    </div>

                    {/* Quick Actions (List view only) */}
                    {viewMode === 'list' && (
                      <div style={{
                        display: 'flex',
                        gap: space.md,
                        marginTop: 'auto'
                      }}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectClick(project);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: space.sm,
                            padding: `${space.sm} ${space.lg}`,
                            background: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
                            border: 'none',
                            borderRadius: '25px',
                            color: '#0d0d0d',
                            fontSize: fontSize.sm,
                            cursor: 'pointer',
                            transition: `all ${transition.base} ease`,
                            fontWeight: fontWeight.semibold,
                            boxShadow: '0 4px 15px rgba(0, 255, 127, 0.3)'
                          }}
                        >
                          <EyeIcon /> View Details
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              padding: space['4xl'],
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '5rem',
              backdropFilter: 'blur(10px)'
            }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{ 
                fontSize: fontSize['5xl'], 
                marginBottom: '1rem',
                filter: 'grayscale(1)'
              }}
            >
              🔍
            </motion.div>
            <h3 style={{ color: '#f0f0f0', marginBottom: space.md, fontSize: fontSize['2xl'] }}>
              No projects found
            </h3>
            <p style={{ color: '#a0a0a0', marginBottom: '2rem' }}>
              Try adjusting your search or filter criteria
            </p>
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
                fontWeight: '600',
                fontSize: '1rem',
                boxShadow: '0 4px 15px rgba(0, 255, 127, 0.3)'
              }}
            >
              Reset Filters
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Services Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        style={{
          marginBottom: '5rem',
          padding: '5rem 0',
          background: 'linear-gradient(135deg, rgba(13,17,23,0.5) 0%, rgba(0,40,30,0.5) 100%)',
          borderRadius: '30px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2300ff7f" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }} />

        <div style={{ position: 'relative', zIndex: zIndex.base, padding: isMobile ? `0 ${space.md}` : `0 ${space.xl}` }}>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '1rem',
              textAlign: 'center',
              color: '#fff',
              fontWeight: '700'
            }}
          >
            Our Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '4rem',
              maxWidth: '700px',
              margin: '0 auto 4rem',
              fontSize: '1.1rem',
              lineHeight: '1.7'
            }}
          >
            We specialize in creating cohesive and compelling visual solutions across all mediums.
          </motion.p>

          {/* Enhanced Services Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: isMobile ? space.lg : space.xl,
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={isMobile ? {} : {
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                whileTap={isMobile ? { scale: 0.98 } : {}}
                onClick={() => handleServiceClick(service)}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '20px',
                  padding: isMobile ? '2rem 1.5rem' : '3rem 2rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  textAlign: 'center',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.5)';
                    e.currentTarget.style.background = 'rgba(0, 255, 127, 0.05)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 255, 127, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {/* Service Icon with animation */}
                <motion.div
                  whileHover={isMobile ? {} : { scale: 1.1, rotate: 5 }}
                  style={{
                    marginBottom: '2rem',
                    color: '#00ff7f',
                    position: 'relative'
                  }}
                >
                  {service.icon}
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                    style={{
                      position: 'absolute',
                      inset: -10,
                      background: 'radial-gradient(circle, rgba(0, 255, 127, 0.3) 0%, transparent 70%)',
                      borderRadius: '50%',
                      zIndex: -1
                    }}
                  />
                </motion.div>

                {/* Service Title */}
                <h3 style={{
                  color: '#fff',
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                  fontWeight: '600'
                }}>
                  {service.title}
                </h3>

                {/* Service Description */}
                <p style={{
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '2rem',
                  fontSize: '0.95rem',
                  lineHeight: '1.7',
                  flexGrow: 1
                }}>
                  {service.description}
                </p>

                {/* Enhanced CTA */}
                <motion.div
                  whileHover={{ x: 5 }}
                  style={{
                    color: '#00ff7f',
                    fontSize: fontSize.sm,
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Explore Service <ArrowRightIcon />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Enhanced Process Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '30px',
          padding: '5rem 2rem',
          marginBottom: '5rem',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            marginBottom: '1rem',
            textAlign: 'center',
            color: '#fff',
            fontWeight: '700'
          }}
        >
          Our Design Process
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '4rem',
            maxWidth: '700px',
            margin: '0 auto 4rem',
            fontSize: '1.1rem'
          }}
        >
          A systematic approach to delivering exceptional design solutions
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: space.xl,
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              style={{
                background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.05) 0%, rgba(0, 255, 127, 0.02) 100%)',
                padding: '2.5rem',
                borderRadius: '20px',
                border: '1px solid rgba(0, 255, 127, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00ff7f';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 255, 127, 0.05) 100%)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 255, 127, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.2)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 255, 127, 0.05) 0%, rgba(0, 255, 127, 0.02) 100%)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                fontSize: '5rem',
                color: 'rgba(0, 255, 127, 0.1)',
                fontWeight: fontWeight.bold,
                position: 'absolute',
                top: '-2rem',
                right: '1rem',
                pointerEvents: 'none'
              }}>
                {step.number}
              </div>
              <div style={{
                marginBottom: '1.5rem',
                color: '#00ff7f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {step.icon}
              </div>
              <h3 style={{ 
                color: '#00ff7f', 
                marginBottom: '1rem', 
                position: 'relative', 
                zIndex: zIndex.base,
                fontSize: '1.3rem',
                fontWeight: '600'
              }}>
                {step.title}
              </h3>
              <p style={{ 
                color: 'rgba(255,255,255,0.7)', 
                position: 'relative', 
                zIndex: zIndex.base,
                lineHeight: '1.6'
              }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* What Clients Say section removed */}

      {/* Enhanced Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="detail-modal-overlay"
            onClick={closeDetailView}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0, 0, 0, 0.95)',
              zIndex: zIndex.modal,
              display: 'flex',
              justifyContent: 'center',
              alignItems: isMobile ? 'flex-start' : 'center',
              backdropFilter: 'blur(20px)',
              padding: isMobile ? '0' : '2rem',
              overflowY: isMobile ? 'hidden' : 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.3, type: "spring", damping: 25 }}
              ref={modalContentRef}
              className="detail-modal-content"
              onClick={e => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                width: isMobile ? '100%' : '90%',
                maxWidth: isMobile ? '100%' : '1400px',
                height: isMobile ? '100vh' : 'auto',
                maxHeight: isMobile ? '100vh' : '70vh',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #0d1117 100%)',
                borderRadius: isMobile ? '0' : '24px',
                border: isMobile ? 'none' : '2px solid rgba(0, 255, 127, 0.3)',
                overflow: 'hidden',
                overflowX: 'hidden',
                position: 'relative',
                boxShadow: isMobile ? 'none' : '0 30px 60px rgba(0, 255, 127, 0.15)',
                marginTop: isMobile ? '0' : '0',
                marginBottom: isMobile ? '0' : '0',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {/* Enhanced Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeDetailView}
                aria-label="Close project details"
                style={{
                  position: 'fixed',
                  top: isMobile ? '70px' : '25px',
                  right: isMobile ? '20px' : '25px',
                  width: isMobile ? '40px' : '50px',
                  height: isMobile ? '40px' : '50px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.8)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  fontSize: isMobile ? '1.2rem' : '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 9999,
                  transition: `all ${transition.base} ease`,
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 0, 0, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                ×
              </motion.button>

              {/* Navigation buttons - desktop only */}
              {!isMobile && prevProject && (
                <motion.button
                  onClick={() => setSelectedProject(prevProject)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '25px',
                    transform: 'translateY(-50%)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    transition: `all ${transition.base} ease`,
                    backdropFilter: 'blur(10px)',
                    padding: 0
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 255, 127, 0.2)';
                    e.currentTarget.style.borderColor = '#00ff7f';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              )}

              {!isMobile && nextProject && (
                <motion.button
                  onClick={() => setSelectedProject(nextProject)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '25px',
                    transform: 'translateY(-50%)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    transition: `all ${transition.base} ease`,
                    backdropFilter: 'blur(10px)',
                    padding: 0
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 255, 127, 0.2)';
                    e.currentTarget.style.borderColor = '#00ff7f';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              )}

              <div style={{
                display: 'flex',
                width: '100%',
                flexDirection: isMobile ? 'column' : 'row',
                overflow: 'hidden',
                height: '100%',
                maxHeight: '100%'
              }}>
                {/* Enhanced Image Section */}
                <motion.div 
                  ref={modalImageRef}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  style={{
                    flex: isMobile ? 'none' : '3',
                    minWidth: '0',
                    background: 'radial-gradient(circle at center, rgba(0, 255, 127, 0.05) 0%, #0a0a0a 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: isMobile ? '2rem 1rem' : '2rem',
                    position: isMobile ? 'sticky' : 'relative',
                    top: isMobile ? '60px' : '0',
                    marginTop: isMobile ? '60px' : '0',
                    flexShrink: 0,
                    height: isMobile ? `${imageHeight}px` : '100%',
                    transition: 'height 0.3s ease',
                    overflow: 'hidden'
                  }}
                >
                  {selectedProject.video ? (
                    <video
                      controls={true}
                      controlsList="nodownload"
                      autoPlay
                      loop
                      muted
                      playsInline
                      webkit-playsinline="true"
                      x-webkit-airplay="allow"
                      allowFullScreen={true}
                      webkitallowfullscreen="true"
                      mozallowfullscreen="true"
                      aria-label={`Video demonstration of ${selectedProject.title}`}
                      style={{
                        width: '100%',
                        maxWidth: '100%',
                        height: 'auto',
                        maxHeight: isMobile ? '50vh' : '75vh',
                        borderRadius: '16px',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                        backgroundColor: '#000'
                      }}
                    >
                      <source src={selectedProject.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <motion.img
                      layoutId={`project-image-${selectedProject.id}`}
                      src={selectedProject.src}
                      alt={`${selectedProject.title} - ${selectedProject.category} design for ${selectedProject.client}. ${selectedProject.description}`}
                      style={{
                        maxWidth: '100%',
                        maxHeight: isMobile ? '100%' : 'calc(70vh - 4rem)',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'contain',
                        borderRadius: '16px',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
                      }}
                    />
                  )}
                </motion.div>

                {/* Enhanced Info Section */}
                <motion.div 
                  ref={infoSectionRef}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onScroll={handleModalScroll}
                  style={{
                    flex: isMobile ? '1' : '2',
                    minWidth: isMobile ? '0' : '400px',
                    maxWidth: isMobile ? '100%' : '500px',
                    padding: isMobile ? '2rem 1rem 4rem' : '3rem 3rem 6rem',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    WebkitOverflowScrolling: 'touch',
                    background: 'linear-gradient(to bottom, #1a1a1a 0%, #141414 100%)',
                    height: isMobile ? 'auto' : '100%',
                    maxHeight: isMobile ? '100%' : '70vh',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(0, 255, 127, 0.3) transparent'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '2rem'
                  }}>
                    <h2 style={{
                      color: '#fff',
                      fontSize: isMobile ? '1.5rem' : '2rem',
                      margin: 0,
                      paddingRight: '1rem',
                      fontWeight: fontWeight.bold
                    }}>
                      {selectedProject.title}
                    </h2>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      style={{
                        padding: '0.5rem 1.2rem',
                        background: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
                        color: '#0d0d0d',
                        borderRadius: '30px',
                        fontSize: fontSize.sm,
                        fontWeight: fontWeight.bold,
                        flexShrink: 0,
                        boxShadow: '0 4px 15px rgba(0, 255, 127, 0.3)'
                      }}
                    >
                      {selectedProject.category}
                    </motion.div>
                  </div>

                  <div style={{
                    display: isMobile ? 'grid' : 'flex',
                    gridTemplateColumns: isMobile ? '1fr 1fr' : 'none',
                    gap: isMobile ? space.lg : space['2xl'],
                    marginBottom: '2.5rem',
                    paddingBottom: '2rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <div>
                      <p style={{ margin: '0 0 0.5rem', color: '#666', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Client</p>
                      <p style={{ margin: 0, color: '#f0f0f0', fontWeight: '600', fontSize: '1.1rem' }}>{selectedProject.client}</p>
                    </div>
                    <div>
                      <p style={{ margin: '0 0 0.5rem', color: '#666', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Year</p>
                      <p style={{ margin: 0, color: '#f0f0f0', fontWeight: '600', fontSize: '1.1rem' }}>{selectedProject.year}</p>
                    </div>
                    <div>
                      <p style={{ margin: '0 0 0.5rem', color: '#666', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Project ID</p>
                      <p style={{ margin: 0, color: '#f0f0f0', fontWeight: '600', fontSize: '1.1rem' }}>#{selectedProject.id.toString().padStart(3, '0')}</p>
                    </div>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{ marginBottom: '2.5rem' }}
                  >
                    <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.3rem', fontWeight: '600' }}>Project Overview</h3>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: '1.8',
                      fontSize: '1rem'
                    }}>
                      {selectedProject.description}
                    </p>
                  </motion.div>

                  {/* Client Review section removed */}

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ marginBottom: '2.5rem' }}
                  >
                    <h3 style={{ color: '#fff', marginBottom: '1.2rem', fontSize: '1.2rem', fontWeight: '600' }}>Tools & Software</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                      {selectedProject.tools.map(tool => (
                        <motion.span
                          key={tool}
                          whileHover={{ scale: 1.05 }}
                          style={{
                            padding: `${space.sm} ${space.md}`,
                            background: 'rgba(0, 255, 127, 0.1)',
                            color: '#00ff7f',
                            borderRadius: '25px',
                            fontSize: fontSize.sm,
                            border: '1px solid rgba(0, 255, 127, 0.2)',
                            fontWeight: fontWeight.medium,
                            transition: `all ${transition.fast} ease`
                          }}
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    style={{ marginBottom: '2.5rem' }}
                  >
                    <h3 style={{ color: '#fff', marginBottom: '1.2rem', fontSize: '1.2rem', fontWeight: '600' }}>Deliverables</h3>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'grid',
                      gap: '0.8rem'
                    }}>
                      {selectedProject.deliverables.map((item, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.05 }}
                          style={{
                            padding: '0.8rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '10px',
                            color: 'rgba(255, 255, 255, 0.7)',
                            position: 'relative',
                            paddingLeft: '2.5rem',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            transition: `all ${transition.fast} ease`
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 255, 127, 0.05)';
                            e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                          }}
                        >
                          <span style={{
                            position: 'absolute',
                            left: '1rem',
                            color: '#00ff7f'
                          }}>
                            <CheckIcon />
                          </span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    style={{ marginBottom: '2.5rem' }}
                  >
                    <h3 style={{ color: '#fff', marginBottom: '1.2rem', fontSize: '1.2rem', fontWeight: '600' }}>Tags</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                      {selectedProject.tags.map(tag => (
                        <motion.span
                          key={tag}
                          whileHover={{ scale: 1.05 }}
                          style={{
                            padding: '0.4rem 0.9rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: 'rgba(255, 255, 255, 0.6)',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            transition: `all ${transition.fast} ease`
                          }}
                        >
                          #{tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Enhanced Action Buttons */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      marginTop: '3rem',
                      paddingTop: '2.5rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >

                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        flex: 1,
                        padding: '1rem',
                        background: 'transparent',
                        color: '#00ff7f',
                        border: '2px solid #00ff7f',
                        borderRadius: '12px',
                        fontWeight: fontWeight.bold,
                        cursor: 'pointer',
                        transition: `all ${transition.base} ease`,
                        fontSize: '1rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 255, 127, 0.1)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 255, 127, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Request Similar Project
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* Instagram-style navigation dots */}
                {isMobile && displayedProjects.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    style={{
                      position: 'fixed',
                      bottom: '30px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      zIndex: 20
                    }}
                  >
                    {displayedProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.9 + index * 0.05 }}
                        style={{
                          width: project.id === selectedProject.id ? '8px' : '6px',
                          height: project.id === selectedProject.id ? '8px' : '6px',
                          borderRadius: '50%',
                          background: project.id === selectedProject.id ? '#00ff7f' : 'rgba(255, 255, 255, 0.3)',
                          transition: `all ${transition.base} ease`,
                          cursor: 'pointer'
                        }}
                        onClick={() => setSelectedProject(project)}
                      />
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="detail-modal-overlay"
            onClick={closeServiceDetail}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0, 0, 0, 0.95)',
              zIndex: zIndex.modalOverlay,
              display: 'flex',
              justifyContent: 'center',
              alignItems: isMobile ? 'flex-start' : 'center',
              backdropFilter: 'blur(20px)',
              padding: isMobile ? '0' : '2rem',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateX: 15 }}
              transition={{ duration: 0.4, type: "spring", damping: 20 }}
              className="service-detail-modal-content"
              onClick={e => e.stopPropagation()}
              style={{
                width: isMobile ? '100%' : '90%',
                maxWidth: isMobile ? '100%' : '700px',
                height: isMobile ? 'calc(100vh - 70px)' : 'auto',
                maxHeight: isMobile ? 'calc(100vh - 70px)' : '65vh',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #0d1117 100%)',
                borderRadius: isMobile ? '0' : '24px',
                border: isMobile ? 'none' : '2px solid rgba(0, 255, 127, 0.3)',
                overflowY: 'auto',
                overflowX: 'hidden',
                WebkitOverflowScrolling: 'touch',
                position: 'relative',
                boxShadow: isMobile ? 'none' : '0 30px 60px rgba(0, 255, 127, 0.15)',
                padding: isMobile ? '4rem 1.5rem 2rem' : '4rem 3rem',
                textAlign: 'center',
                color: '#f0f0f0',
                perspective: '1000px',
                marginTop: isMobile ? '70px' : '0',
                marginBottom: isMobile ? '0' : '0',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {/* Enhanced Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeServiceDetail}
                style={{
                  position: 'absolute',
                  top: isMobile ? '15px' : '25px',
                  right: isMobile ? '15px' : '25px',
                  width: isMobile ? '40px' : '50px',
                  height: isMobile ? '40px' : '50px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.8)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  fontSize: isMobile ? '1.2rem' : '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 9999,
                  transition: `all ${transition.base} ease`,
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 0, 0, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                ×
              </motion.button>

              {/* Service Icon with animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                style={{
                  marginBottom: '2rem',
                  color: '#00ff7f',
                  transform: 'scale(1.8)',
                  display: 'inline-block',
                  position: 'relative'
                }}
              >
                {selectedService.icon}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    position: 'absolute',
                    inset: -20,
                    background: 'radial-gradient(circle, rgba(0, 255, 127, 0.3) 0%, transparent 70%)',
                    borderRadius: '50%',
                    zIndex: -1
                  }}
                />
              </motion.div>

              {/* Service Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  color: '#fff',
                  fontSize: fontSize['3xl'],
                  marginBottom: '1.5rem',
                  fontWeight: fontWeight.bold,
                  background: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {selectedService.title}
              </motion.h2>

              {/* Service Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  marginBottom: space['2xl'],
                  fontSize: '1.15rem',
                  lineHeight: '1.8',
                  maxWidth: '500px',
                  margin: '0 auto 3rem'
                }}
              >
                {selectedService.description}
              </motion.p>

              {/* Enhanced Features List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  marginBottom: '3rem'
                }}
              >
                <h3 style={{
                  color: '#fff',
                  marginBottom: '2rem',
                  fontSize: '1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingTop: '2.5rem',
                  fontWeight: '600'
                }}>
                  What We Offer
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  textAlign: 'left',
                  maxWidth: '500px',
                  margin: '0 auto',
                  display: 'grid',
                  gap: '1rem'
                }}>
                  {selectedService.features.map((feature, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      whileHover={{ x: 10 }}
                      style={{
                        padding: '1rem',
                        color: 'rgba(255, 255, 255, 0.8)',
                        position: 'relative',
                        paddingLeft: '3rem',
                        fontSize: '1.05rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 255, 127, 0.05)';
                        e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#00ff7f',
                        display: 'inline-flex'
                      }}>
                        <CheckIcon />
                      </span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="/contact"
                onClick={closeServiceDetail}
                style={{
                  padding: isMobile ? '1rem 2rem' : '1.2rem 3rem',
                  background: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
                  color: '#0d0d0d',
                  fontWeight: fontWeight.bold,
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  borderRadius: '40px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(0, 255, 127, 0.3)',
                  transition: `all ${transition.base} ease`,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  lineHeight: '1.4',
                  minWidth: isMobile ? '200px' : 'auto'
                }}
              >
                Start Your {selectedService.title} Project
              </motion.a>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{
          background: 'linear-gradient(135deg, rgba(0,40,80,0.9) 0%, rgba(13,17,23,0.9) 100%)',
          borderRadius: '30px',
          padding: '5rem 3rem',
          textAlign: 'center',
          marginTop: '5rem',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(0, 255, 127, 0.2)'
        }}
      >
        {/* Animated background elements */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
          {Array(4).fill(0).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                width: '300px',
                height: '300px',
                background: `radial-gradient(circle, rgba(0, 255, 127, ${0.2 - i * 0.05}) 0%, transparent 70%)`,
                borderRadius: '50%',
                top: `${i * 25}%`,
                left: `${i * 25}%`,
                filter: 'blur(60px)'
              }}
            />
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 50%, #00cc64 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '700',
            position: 'relative',
            zIndex: 1
          }}
        >
          Let's Create Something Amazing Together
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            fontSize: '1.2rem',
            maxWidth: '700px',
            margin: '0 auto 3rem',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: '1.7',
            position: 'relative',
            zIndex: 1
          }}
        >
          Need professional graphic design services? We're here to help bring your vision to life with creative solutions that make an impact.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          href="/contact"
          style={{
            padding: isMobile ? '1rem 2rem' : '1.2rem 3rem',
            background: 'linear-gradient(135deg, #00ff7f 0%, #00cc64 100%)',
            color: '#0d0d0d',
            fontWeight: 'bold',
            fontSize: isMobile ? '1.1rem' : '1.2rem',
            borderRadius: '40px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0, 255, 127, 0.3)',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            lineHeight: '1.4',
            minWidth: isMobile ? '200px' : 'auto'
          }}
        >
          Start Your Project
        </motion.a>

      </motion.div>

      {/* Add custom styles for scrollbar and mobile */}
      <style jsx global>{`
        .graphic-design-portfolio::-webkit-scrollbar {
          width: 10px;
        }
        
        .graphic-design-portfolio::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        
        .graphic-design-portfolio::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 127, 0.3);
          border-radius: 5px;
        }
        
        .graphic-design-portfolio::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 127, 0.5);
        }
        
        .detail-modal-content::-webkit-scrollbar {
          width: 0px;
          display: none;
        }
        
        .detail-modal-content::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .detail-modal-content::-webkit-scrollbar-thumb {
          background: transparent;
        }
        
        /* Hide scrollbar for service modal */
        .service-detail-modal-content::-webkit-scrollbar {
          width: 0px;
          display: none;
        }
        
        .service-detail-modal-content {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        
        .detail-modal-content {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        
        body.no-scroll {
          overflow: hidden;
        }
        
        /* Ensure text doesn't get cut off */
        .detail-modal-content p,
        .service-detail-modal-content p {
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }
        
        /* Hide scrollbar for modal */
        .detail-modal-content::-webkit-scrollbar {
          width: 0 !important;
          display: none !important;
        }
        
        .detail-modal-overlay::-webkit-scrollbar {
          width: 0 !important;
          display: none !important;
        }
        
        /* Mobile specific styles */
        @media (max-width: 768px) {
          .graphic-design-portfolio {
            padding: 0.5rem;
          }
          
          .filter-buttons {
            justify-content: flex-start;
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding: 0.5rem;
            scrollbar-width: none;
          }
          
          .filter-buttons::-webkit-scrollbar {
            display: none;
          }
          
          .filter-buttons button {
            flex-shrink: 0;
            padding: 0.6rem 1.2rem;
            font-size: 0.9rem;
          }
          
          .search-bar {
            margin: 1rem;
          }
          
          .view-mode-buttons {
            display: none;
          }
          
          .projects-grid {
            padding: 0;
            gap: 1rem;
          }
          
          .project-card {
            border-radius: 16px;
          }
          
          .project-details {
            padding: 1rem;
          }
          
          .project-details h3 {
            font-size: 1rem !important;
            margin-bottom: 0.5rem !important;
          }
          
          .project-details p {
            font-size: 0.8rem !important;
            line-height: 1.4 !important;
          }
          
          .project-tools {
            flex-wrap: wrap;
            gap: 0.3rem;
          }
          
          .project-tools span {
            font-size: 0.7rem;
            padding: 0.3rem 0.6rem;
          }
          
          .detail-modal-content {
            margin: 0;
          }
          
          .service-detail-modal-content {
            margin: 0;
          }
          
          .service-card {
            padding: 2rem 1.5rem;
          }
          
          .service-card h3 {
            font-size: 1.3rem;
          }
          
          .service-card p {
            font-size: 0.9rem;
          }
          
          .testimonial-card {
            padding: 1.5rem;
          }
          
          .cta-section {
            padding: 3rem 1.5rem !important;
          }
          
          .cta-section h2 {
            font-size: 1.8rem !important;
          }
          
          .cta-section p {
            font-size: 1rem !important;
          }
          
          /* Fix for sticky elements on mobile */
          body.modal-open {
            position: fixed;
            width: 100%;
            overflow: hidden;
          }
          
          /* Ensure modal content is scrollable */
          .detail-modal-content,
          .service-detail-modal-content {
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
          }
          
          /* Fix text overflow in modals */
          .detail-modal-content p,
          .service-detail-modal-content p,
          .detail-modal-content h3,
          .service-detail-modal-content h3 {
            max-width: 100%;
            overflow-wrap: break-word;
            word-break: break-word;
          }
        }
      `}</style>
    </div>
  );
};

export default GraphicDesignPortfolio;