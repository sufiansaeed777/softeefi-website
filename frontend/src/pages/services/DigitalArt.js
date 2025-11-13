import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import LazyImage from '../../components/LazyImage';
import { GridSkeleton, EmptyState } from '../../components/LoadingStates';
import { Helmet } from 'react-helmet-async';

const EnhancedDigitalArtGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchFocused, setSearchFocused] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [imageLoading, setImageLoading] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [modalScrollY, setModalScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isImageMinimized, setIsImageMinimized] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastHeaderScrollY, setLastHeaderScrollY] = useState(0);
  
  const searchInputRef = useRef(null);
  const galleryRef = useRef(null);
  const modalContentRef = useRef(null);
  const modalImageRef = useRef(null);
  const infoSectionRef = useRef(null);
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 100], [0, -100]);
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Debug mobile detection
  useEffect(() => {
    console.log('Is Mobile:', isMobile, 'Window width:', window.innerWidth);
  }, [isMobile]);

  // Handle header visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when at top or scrolling up
      if (currentScrollY === 0 || currentScrollY < lastHeaderScrollY) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastHeaderScrollY && currentScrollY > 150) {
        // Hide header when scrolling down after 150px
        setIsHeaderVisible(false);
      }
      
      setLastHeaderScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastHeaderScrollY]);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000);
    
    // Prevent zoom on mobile for this page
    const viewport = document.querySelector('meta[name="viewport"]');
    const originalContent = viewport?.getAttribute('content');
    if (viewport && isMobile) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
    }
    
    return () => {
      clearTimeout(timer);
      // Restore original viewport settings
      if (viewport && originalContent) {
        viewport.setAttribute('content', originalContent);
      }
    };
  }, [isMobile]);

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
    
    if (selectedImage && isLeftSwipe) {
      const { nextImage } = getAdjacentImages();
      if (nextImage) setSelectedImage(nextImage);
    }
    if (selectedImage && isRightSwipe) {
      const { prevImage } = getAdjacentImages();
      if (prevImage) setSelectedImage(prevImage);
    }
  };

  // Handle modal scroll on mobile for dynamic image height
  const handleModalScroll = (e) => {
    if (isMobile && modalContentRef.current) {
      const scrollTop = modalContentRef.current.scrollTop;
      const isScrollingDown = scrollTop > lastScrollY;
      const isAtTop = scrollTop <= 0;
      
      setLastScrollY(scrollTop);
      
      if (isAtTop) {
        setIsImageMinimized(false);
      } else if (isScrollingDown && scrollTop > 50) {
        setIsImageMinimized(true);
      } else if (!isScrollingDown && scrollTop < lastScrollY - 50) {
        setIsImageMinimized(false);
      }
    }
  };

  // Calculate image height based on scroll
  const imageHeight = isMobile ? (isImageMinimized ? 200 : 400) : 'auto';

  // Enhanced Art Collection
  const artCollection = [
    {
      id: 19,
      src: "/images/DigiArt/art-collection-sheet.webp",
      title: "Digital Art Design Collection Sheet",
      category: "Design Sheet",
      description: "Collection sheet with multiple designs including robot variations, skull designs with accessories, coffee cups, anime girl headshots, Pokéball variants, and a Master Chief-style character.",
      tags: ["collection", "robots", "skulls", "pokeball", "anime", "master chief", "coffee", "designs"],
      featured: true
    },
    {
      id: 18,
      src: "/images/DigiArt/chibi-tanjiro.webp",
      title: "Chibi Tanjiro Night Forest",
      category: "Fan Art",
      description: "Chibi version of Tanjiro from Demon Slayer wearing green-black checkered haori. Holding sword in combat stance in night forest/jungle background with distinctive red/burgundy eyes and earrings.",
      tags: ["demon slayer", "tanjiro", "chibi", "sword", "green haori", "forest", "night", "anime"],
      featured: true
    },
    {
      id: 17,
      src: "/images/DigiArt/goku-blue.webp",
      title: "Super Saiyan Blue Goku",
      category: "Fan Art",
      description: "Dragon Ball's Goku in Super Saiyan Blue form with spiky blue hair characteristic of this transformation. Wearing orange and blue gi/uniform with arms crossed in powerful stance.",
      tags: ["dragon ball", "goku", "super saiyan blue", "anime", "blue hair", "orange gi", "muscular"]
    },
    {
      id: 16,
      src: "/images/DigiArt/business-gamer.webp",
      title: "Business Woman Gaming Chair",
      category: "Character Design",
      description: "White-haired female character in business attire sitting in pink gaming/office chair. Wearing dark blazer/suit with pink details, subtle eye makeup and confident pose.",
      tags: ["business", "woman", "gaming chair", "white hair", "pink", "office", "professional"]
    },
    {
      id: 15,
      src: "/images/DigiArt/blonde-catgirl.webp",
      title: "Blonde Catgirl Anime Character",
      category: "Character Design",
      description: "Blonde anime catgirl with yellow cat ears wearing revealing black bikini top/white collar. Features closed eyes with pleased expression and long blonde hair with spiky elements.",
      tags: ["anime", "catgirl", "blonde", "cat ears", "bikini", "portrait", "yellow hair"]
    },
    {
      id: 14,
      src: "/images/DigiArt/robot-sunflower.webp",
      title: "Robot Sunflower Love Illustration",
      category: "Character Design",
      description: "Cute robot character with rectangular head and pink/white color scheme holding/caring for a sunflower plant. Features heart symbols indicating affection and happy expression on clock/timer face.",
      tags: ["robot", "sunflower", "cute", "love", "hearts", "pink", "white", "plant"],
      featured: true
    },
    {
      id: 13,
      src: "/images/DigiArt/fantasy-reader-dragon.webp",
      title: "Fantasy Reader Dragon Companion",
      category: "Character Design",
      description: "Fantasy illustration of redhead woman reading book in medieval/fantasy green dress with brown boots. Features small blue dragon companion at her feet and red leather belt detail against gradient background.",
      tags: ["fantasy", "reader", "dragon", "redhead", "green dress", "medieval", "book"]
    },
    {
      id: 12,
      src: "/images/DigiArt/blue-hair-headphones.webp",
      title: "Blue Hair Headphones Anime Girl",
      category: "Character Design",
      description: "Female anime character with blue/purple hair with twin tails wearing black headphones. Features blue cropped sweater revealing midriff and blue jeans/pants against matching blue background.",
      tags: ["anime", "girl", "blue hair", "headphones", "cropped sweater", "blue", "twin tails"]
    },
    {
      id: 11,
      src: "/images/DigiArt/anime-boy-green.webp",
      title: "Anime Boy Green Shirt Portrait",
      category: "Character Design",
      description: "Male anime character with brown hair and subtle smile wearing green t-shirt/top. Headshot/portrait style against purple background with soft shading style.",
      tags: ["anime", "boy", "male", "green shirt", "portrait", "purple background", "brown hair"]
    },
    {
      id: 10,
      src: "/images/DigiArt/worm-professor.webp",
      title: "Cartoon Worm Professor Character",
      category: "Character Design",
      description: "Cartoon worm/slug character in professor style wearing blue bow tie and glasses. Features mint green suit/collar with arms crossed in confident pose.",
      tags: ["cartoon", "worm", "professor", "bow tie", "glasses", "vector", "character"]
    },
    {
      id: 9,
      src: "/images/DigiArt/night-city-scene.webp",
      title: "Night City Silhouette Scene",
      category: "Environment",
      description: "Atmospheric night cityscape illustration with dark blue color palette. Features silhouetted figure walking toward illuminated windows/doorway with urban apartment buildings in background.",
      tags: ["night", "city", "silhouette", "urban", "blue", "mood", "atmospheric", "noir"],
      featured: true
    },
    {
      id: 8,
      src: "/images/DigiArt/deadpool-art.webp",
      title: "Deadpool Character Illustration",
      category: "Fan Art",
      description: "Marvel's Deadpool character in classic red and black suit holding dual katanas. Full body illustration showing detailed costume elements with PREVIEW watermark.",
      tags: ["deadpool", "marvel", "superhero", "swords", "katana", "red suit", "preview"]
    },
    {
      id: 7,
      src: "/images/DigiArt/blue-tiger-ak47.webp",
      title: "Blue Tiger AK47 Character",
      category: "Character Design",
      description: "Cartoon blue snow leopard/tiger character holding AK-47 rifle. Wearing brown scarf/bandana and sitting on tree stump. Stylized with black spots/markings on blue fur.",
      tags: ["cartoon", "blue tiger", "leopard", "AK-47", "weapon", "scarf", "animal character"]
    },
    {
      id: 6,
      src: "/images/DigiArt/dark-anime-male.webp",
      title: "Dark-Skinned Anime Male",
      category: "Character Design",
      description: "Male anime character with dark skin and black curly hair. Features distinctive heterochromatic eyes (purple and magenta) and black high-collared outfit with gold trim. Making pointing gesture.",
      tags: ["anime", "male", "dark skin", "heterochromatic", "pointing", "black outfit", "gold trim"]
    },
    {
      id: 5,
      src: "/images/DigiArt/goth-demon-girl.webp",
      title: "Goth Demon Girl Character",
      category: "Character Design",
      description: "Female anime character with black hair and white bangs/streak, featuring black bat wings. Wearing black revealing outfit with purple fishnet stockings. Includes PREVIEW watermark.",
      tags: ["goth", "demon", "girl", "character", "bat wings", "anime", "preview", "black outfit"]
    },
    {
      id: 4,
      src: "/images/DigiArt/anime-yellow-hoodie.webp",
      title: "Anime Girl Yellow Hoodie",
      category: "Character Design",
      description: "Anime girl with blue hair and heterochromatic eyes (one brown, one blue) wearing bright yellow hoodie with red flower design. Making peace sign gesture with floral background elements.",
      tags: ["anime", "girl", "yellow hoodie", "blue hair", "heterochromatic", "peace sign", "flower"]
    },
    {
      id: 3,
      src: "/images/DigiArt/gaming-logos.webp",
      title: "Gaming Platform Logos",
      category: "Logo Design",
      description: "Set of stylized gaming platform logos including Discord, Ruins, XBout, Socials, and Donate in various colors and design styles.",
      tags: ["logo", "discord", "ruins", "xbout", "socials", "donate", "platform", "gaming"]
    },
    {
      id: 2,
      src: "/images/DigiArt/warrior-model-sheet.webp",
      title: "Fantasy Warrior Model Sheet",
      category: "Model Sheet",
      description: "Fantasy warrior character model sheet with wireframe and colored turnaround views. Viking/barbarian aesthetic with detailed musculature, beard, and fur/leather clothing elements.",
      tags: ["model sheet", "fantasy", "warrior", "viking", "barbarian", "turnaround", "wireframe"]
    },
    {
      id: 1,
      src: "/images/DigiArt/muscular-trio.webp",
      title: "Muscular Character Trio Preview",
      category: "Character Design",
      description: "Bodybuilder-style muscular character design in three color variations (chrome/silver with blue highlights, red variant, and gold/yellow variant). Contains PREVIEW watermark across all designs.",
      tags: ["character design", "muscles", "chrome", "red", "gold", "preview", "variant"]
    }
  ];

  // Add dates and ratings
  const artworkWithMetadata = useMemo(() => {
    return artCollection.map(art => {
      const daysAgo = art.id - 1;
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      
      return {
        ...art,
        uploadDate: date,
        views: Math.floor(Math.random() * 5000) + 500,
        likes: Math.floor(Math.random() * 1000) + 100,
        rating: (Math.random() * 2 + 3).toFixed(1)
      };
    });
  }, []);

  // Categories with counts
  const categoriesWithCounts = useMemo(() => {
    const counts = {};
    artCollection.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    
    return [
      { name: 'all', count: artCollection.length, icon: '🎨' },
      ...Object.keys(counts).map(category => ({
        name: category,
        count: counts[category],
        icon: category === 'Fan Art' ? '⭐' : 
              category === 'Character Design' ? '👤' :
              category === 'Environment' ? '🌍' :
              category === 'Logo Design' ? '💎' :
              category === 'Model Sheet' ? '📋' :
              category === 'Design Sheet' ? '📐' : '🎨'
      })).sort((a, b) => a.name.localeCompare(b.name))
    ];
  }, []);

  // Enhanced search with suggestions
  const searchSuggestions = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return [];
    
    const suggestions = new Set();
    const term = searchTerm.toLowerCase();
    
    artworkWithMetadata.forEach(art => {
      if (art.title.toLowerCase().includes(term)) {
        suggestions.add(art.title);
      }
      art.tags.forEach(tag => {
        if (tag.toLowerCase().includes(term)) {
          suggestions.add(tag);
        }
      });
    });
    
    return Array.from(suggestions).slice(0, 5);
  }, [searchTerm, artworkWithMetadata]);

  // Enhanced search function
  const performSearch = (term) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    
    const terms = term.toLowerCase().trim().split(/\s+/);
    
    const scoredResults = artworkWithMetadata.map(art => {
      let score = 0;
      
      terms.forEach(term => {
        if (art.title.toLowerCase().includes(term)) score += 10;
        if (art.category.toLowerCase().includes(term)) score += 8;
        if (art.description.toLowerCase().includes(term)) score += 5;
        art.tags.forEach(tag => {
          if (tag.toLowerCase().includes(term)) score += 7;
        });
      });
      
      return { ...art, searchScore: score };
    });
    
    const matchedResults = scoredResults
      .filter(item => item.searchScore > 0)
      .sort((a, b) => b.searchScore - a.searchScore);
    
    setSearchResults(matchedResults);
    setIsSearching(false);
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchTerm);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter artwork
  const displayedArtwork = useMemo(() => {
    if (searchTerm.trim() && searchResults.length > 0) {
      if (filter !== 'all') {
        return searchResults.filter(art => art.category === filter);
      }
      return searchResults;
    }
    
    let filtered = artworkWithMetadata;
    if (filter !== 'all') {
      filtered = artworkWithMetadata.filter(art => art.category === filter);
    }
    
    return [...filtered].sort((a, b) => b.id - a.id);
  }, [filter, searchTerm, searchResults, artworkWithMetadata]);

  // Handle image click
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setZoomLevel(1);
    setModalScrollY(0);
    setLastScrollY(0);
    setIsImageMinimized(false);
    document.body.style.overflow = 'hidden';
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
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Get adjacent images
  const getAdjacentImages = () => {
    if (!selectedImage) return { prevImage: null, nextImage: null };
    
    const currentArtwork = [...displayedArtwork];
    const currentIndex = currentArtwork.findIndex(art => art.id === selectedImage.id);
    
    const prevImage = currentIndex > 0 ? currentArtwork[currentIndex - 1] : null;
    const nextImage = currentIndex < currentArtwork.length - 1 ? currentArtwork[currentIndex + 1] : null;
    
    return { prevImage, nextImage };
  };

  // Format date
  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyboard = (e) => {
      if (e.key === 'Escape' && selectedImage) closeDetailView();
      
      if (selectedImage) {
        const { prevImage, nextImage } = getAdjacentImages();
        if (e.key === 'ArrowLeft' && prevImage) setSelectedImage(prevImage);
        if (e.key === 'ArrowRight' && nextImage) setSelectedImage(nextImage);
      }
    };
    
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [selectedImage, displayedArtwork]);

  const { prevImage, nextImage } = getAdjacentImages();

  return (
    <div
      ref={galleryRef}
      className="enhanced-gallery"
      style={{
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        position: 'relative',
        background: `
          radial-gradient(circle at 20% 50%, rgba(0, 255, 127, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(0, 255, 127, 0.05) 0%, transparent 50%),
          linear-gradient(180deg, #0a0a0a 0%, #0d0d0d 100%)
        `,
        color: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        paddingBottom: '4rem',
        marginTop: isMobile ? '-70px' : '-90px'
      }}
    >
      <Helmet>
        <title>Digital Art & NFTs | Creative Services - Softeefi</title>
        <meta name="description" content="Explore Softeefi's digital art and NFT services. Custom illustrations, generative art, NFT collections, and creative solutions for the digital age." />
        <link rel="canonical" href="https://softeefi.co.uk/services/digital-art-nfts" />
      </Helmet>
      {/* Animated Header */}
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: isHeaderVisible ? 0 : -300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ 
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: isMobile ? '1rem' : '1.5rem 2rem',
          paddingTop: isMobile ? '90px' : '110px',
          marginTop: isMobile ? '0' : '-80px'
        }}
      >
        {/* Gallery Title and Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 style={{ 
              margin: 0,
              fontSize: isMobile ? '1.5rem' : '2rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}>
              Digital Art Gallery
            </h1>
            <p style={{ 
              margin: '0.25rem 0 0 0',
              fontSize: '0.9rem',
              color: 'rgba(255, 255, 255, 0.6)'
            }}>
              {artCollection.length} artworks • {categoriesWithCounts.length - 1} categories
            </p>
          </motion.div>

          {/* Gallery Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: isMobile ? 'none' : 'flex',
              gap: '2rem',
              alignItems: 'center'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#00ff7f' }}>
                {artworkWithMetadata.reduce((sum, art) => sum + art.views, 0).toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)' }}>Total Views</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#00ff7f' }}>
                {artworkWithMetadata.reduce((sum, art) => sum + art.likes, 0).toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)' }}>Total Likes</div>
            </div>
          </motion.div>
        </div>

        {/* Search Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginBottom: isMobile ? '1rem' : '1.5rem'
        }}>
          <motion.div 
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '100%',
              display: 'flex',
              justifyContent: 'flex-start'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search artworks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => {
                setSearchFocused(true);
                setShowSuggestions(true);
              }}
              onBlur={() => {
                setSearchFocused(false);
                setTimeout(function() { setShowSuggestions(false); }, 200);
              }}
              style={{
                width: isMobile ? '100%' : '400px',
                padding: isMobile ? '0.5rem 0.75rem 0.5rem 2.25rem' : '0.6rem 0.9rem 0.6rem 2.5rem',
                borderRadius: '25px',
                background: searchFocused 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(255, 255, 255, 0.05)',
                border: `1.5px solid ${searchFocused ? '#00ff7f' : 'rgba(255, 255, 255, 0.1)'}`,
                color: '#ffffff',
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                boxSizing: 'border-box'
              }}
            />
            <svg
              style={{
                position: 'absolute',
                left: isMobile ? '0.75rem' : '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: isMobile ? '18px' : '20px',
                height: isMobile ? '18px' : '20px'
              }}
              fill="none"
              stroke={searchFocused ? '#00ff7f' : 'rgba(255, 255, 255, 0.5)'}
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
                
                {/* Search Suggestions */}
                <AnimatePresence>
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: '0.5rem',
                        background: 'rgba(20, 20, 20, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        overflow: 'hidden',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                        zIndex: 10
                      }}
                    >
                      {searchSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setSearchTerm(suggestion);
                            setShowSuggestions(false);
                          }}
                          style={{
                            padding: '0.75rem 1rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            borderBottom: index < searchSuggestions.length - 1 
                              ? '1px solid rgba(255, 255, 255, 0.05)' 
                              : 'none'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 255, 127, 0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </motion.div>
                  )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Categories and View Mode */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '0.5rem' : '1rem',
          marginBottom: '1.5rem'
        }}>
          {/* Category Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              display: 'flex',
              gap: isMobile ? '0.5rem' : '0.75rem',
              flex: '1',
              overflowX: isMobile ? 'auto' : 'visible',
              WebkitOverflowScrolling: 'touch',
              paddingBottom: isMobile ? '0.25rem' : '0',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
          {categoriesWithCounts.map((category, index) => (
            <motion.button
              key={category.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category.name)}
              style={{
                padding: isMobile ? '0.35rem 0.6rem' : '0.45rem 0.9rem',
                borderRadius: '25px',
                background: filter === category.name 
                  ? 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)'
                  : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid',
                borderColor: filter === category.name 
                  ? 'transparent' 
                  : 'rgba(255, 255, 255, 0.1)',
                color: filter === category.name ? '#000000' : '#ffffff',
                fontSize: isMobile ? '0.7rem' : '0.8rem',
                whiteSpace: isMobile ? 'nowrap' : 'normal',
                fontWeight: filter === category.name ? '600' : '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backdropFilter: 'blur(10px)',
                flexShrink: 0
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
            >
              <span>{category.icon}</span>
              <span>{category.name === 'all' ? 'All' : category.name}</span>
              <span style={{
                background: filter === category.name 
                  ? 'rgba(0, 0, 0, 0.2)' 
                  : 'rgba(0, 255, 127, 0.2)',
                color: filter === category.name ? '#000000' : '#00ff7f',
                padding: '0.1rem 0.4rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                {category.count}
              </span>
            </motion.button>
          ))}
          </motion.div>
          
          {/* View Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: isMobile ? '0.1rem' : '0.15rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              flexShrink: 0
            }}
          >
            <button
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
            </button>
            <button
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
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div style={{ padding: isMobile ? '1rem' : '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Featured Section */}
        {filter === 'all' && !searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ marginBottom: '3rem' }}
          >
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ color: '#00ff7f' }}>⭐</span> Featured Artworks
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: isMobile ? '1rem' : '1.5rem'
            }}>
              {artworkWithMetadata
                .filter(art => art.featured)
                .slice(0, 3)
                .map((art, index) => (
                  <motion.div
                    key={art.id}
                    whileHover={{ y: -5, scale: 1.02 }}
                    onClick={() => handleImageClick(art)}
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 255, 127, 0.05) 100%)',
                      borderRadius: isMobile ? '12px' : '16px',
                      overflow: 'hidden',
                      border: '1px solid rgba(0, 255, 127, 0.3)',
                      cursor: 'pointer',
                      position: 'relative',
                      height: '300px'
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <img
                      src={art.src}
                      alt={art.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onLoad={() => setImageLoading(prev => ({ ...prev, [art.id]: false }))}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: isMobile ? '1rem' : '1.5rem',
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 100%)'
                    }}>
                      <h3 style={{ 
                        fontSize: isMobile ? '1rem' : '1.1rem', 
                        marginBottom: '0.25rem',
                        fontWeight: '600'
                      }}>
                        {art.title}
                      </h3>
                      <p style={{ 
                        fontSize: isMobile ? '0.7rem' : '0.8rem', 
                        color: 'rgba(255, 255, 255, 0.7)',
                        marginBottom: '0.5rem'
                      }}>
                        {art.category} • {art.views.toLocaleString()} views
                      </p>
                      <div style={{ 
                        display: 'flex', 
                        gap: '0.5rem',
                        alignItems: 'center'
                      }}>
                        <span style={{ color: '#00ff7f' }}>★ {art.rating}</span>
                        <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>•</span>
                        <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                          {formatDate(art.uploadDate)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Gallery Grid/List */}
        <AnimatePresence mode="wait">
          {isInitialLoad ? (
            <GridSkeleton count={6} columns={isMobile ? 1 : 3} />
          ) : isSearching ? (
            <GridSkeleton count={3} columns={isMobile ? 1 : 3} />
          ) : displayedArtwork.length > 0 ? (
            <motion.div
              key={viewMode + filter + searchTerm}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={viewMode === 'grid' ? {
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: isMobile ? '0.75rem' : '1.5rem'
              } : {
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              {displayedArtwork.map((art, index) => (
                <motion.div
                  key={art.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(0.05 * index, 0.3) }}
                  whileHover={isMobile ? {} : { y: -5 }}
                  whileTap={isMobile ? { scale: 0.98 } : {}}
                  onHoverStart={() => !isMobile && setHoveredId(art.id)}
                  onHoverEnd={() => !isMobile && setHoveredId(null)}
                  onClick={() => handleImageClick(art)}
                  style={viewMode === 'grid' ? {
                    background: hoveredId === art.id 
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(255, 255, 255, 0.05)',
                    borderRadius: isMobile ? '12px' : '16px',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: hoveredId === art.id 
                      ? 'rgba(0, 255, 127, 0.5)'
                      : 'rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  } : {
                    background: hoveredId === art.id 
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(255, 255, 255, 0.05)',
                    borderRadius: isMobile ? '12px' : '16px',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: hoveredId === art.id 
                      ? 'rgba(0, 255, 127, 0.5)'
                      : 'rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    gap: isMobile ? '1rem' : '1.5rem',
                    padding: isMobile ? '0.75rem' : '1rem'
                  }}
                >
                  {viewMode === 'grid' ? (
                    <>
                      <div style={{
                        height: isMobile ? '150px' : '200px',
                        overflow: 'hidden',
                        position: 'relative'
                      }}>
                        {imageLoading[art.id] !== false && (
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 75%)',
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 1.5s infinite'
                          }} />
                        )}
                        <img
                          src={art.src}
                          alt={art.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transform: hoveredId === art.id ? 'scale(1.05)' : 'scale(1)',
                            transition: 'transform 0.3s ease',
                            opacity: imageLoading[art.id] === false ? 1 : 0
                          }}
                          onLoad={() => setImageLoading(prev => ({ ...prev, [art.id]: false }))}
                        />
                        <div style={{
                          position: 'absolute',
                          top: '0.75rem',
                          right: '0.75rem',
                          background: 'rgba(0, 0, 0, 0.7)',
                          backdropFilter: 'blur(10px)',
                          padding: '0.3rem 0.6rem',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}>
                          {art.category === 'Fan Art' && '⭐'}
                          {art.category === 'Character Design' && '👤'}
                          {art.category === 'Environment' && '🌍'}
                          {art.category}
                        </div>
                      </div>
                      <div style={{ padding: isMobile ? '0.5rem' : '1rem' }}>
                        <h3 style={{
                          fontSize: isMobile ? '0.7rem' : '1rem',
                          fontWeight: '600',
                          marginBottom: isMobile ? '0.25rem' : '0.5rem',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          lineHeight: 1.2
                        }}>
                          {art.title}
                        </h3>
                        {!isMobile && (
                          <p style={{
                            fontSize: '0.85rem',
                            color: 'rgba(255, 255, 255, 0.6)',
                            marginBottom: '0.75rem',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {art.description}
                          </p>
                        )}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: isMobile ? '0.65rem' : '0.8rem',
                          color: 'rgba(255, 255, 255, 0.5)',
                          marginTop: isMobile ? '0.25rem' : '0'
                        }}>
                          <span style={{ fontSize: isMobile ? '0.6rem' : '0.75rem' }}>
                            {art.views.toLocaleString()} views
                          </span>
                          <span style={{ color: '#00ff7f', fontSize: isMobile ? '0.65rem' : '0.8rem' }}>
                            ★ {art.rating}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{
                        width: '200px',
                        height: '150px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        flexShrink: 0,
                        position: 'relative'
                      }}>
                        <LazyImage
                          src={art.src}
                          alt={art.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'start',
                          marginBottom: '0.5rem'
                        }}>
                          <h3 style={{
                            fontSize: '1.1rem',
                            fontWeight: '600'
                          }}>
                            {art.title}
                          </h3>
                          <span style={{
                            background: 'rgba(0, 255, 127, 0.1)',
                            color: '#00ff7f',
                            padding: '0.3rem 0.6rem',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}>
                            {art.category}
                          </span>
                        </div>
                        <p style={{
                          fontSize: '0.9rem',
                          color: 'rgba(255, 255, 255, 0.7)',
                          marginBottom: '1rem',
                          lineHeight: 1.6
                        }}>
                          {art.description}
                        </p>
                        <div style={{
                          display: 'flex',
                          gap: '0.5rem',
                          flexWrap: 'wrap',
                          marginBottom: '1rem'
                        }}>
                          {art.tags.slice(0, 4).map(tag => (
                            <span
                              key={tag}
                              style={{
                                padding: '0.25rem 0.5rem',
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                color: 'rgba(255, 255, 255, 0.8)'
                              }}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div style={{
                          display: 'flex',
                          gap: '1.5rem',
                          fontSize: isMobile ? '0.7rem' : '0.8rem',
                          color: 'rgba(255, 255, 255, 0.5)'
                        }}>
                          <span>{art.views.toLocaleString()} views</span>
                          <span>{art.likes.toLocaleString()} likes</span>
                          <span style={{ color: '#00ff7f' }}>★ {art.rating}</span>
                          <span style={{ marginLeft: 'auto' }}>
                            {formatDate(art.uploadDate)}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <EmptyState 
              title="No artwork found"
              description={searchTerm ? `No results for "${searchTerm}"` : "No artwork in this category"}
              actionText="Clear filters"
              onAction={() => {
                setFilter('all');
                setSearchTerm('');
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDetailView}
            style={{
              position: 'fixed',
              inset: 0,
              background: isMobile ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.95)',
              zIndex: 1000,
              display: 'flex',
              alignItems: isMobile ? 'stretch' : 'center',
              justifyContent: 'center',
              padding: isMobile ? '0' : '2rem',
              overflow: 'hidden'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              ref={modalContentRef}
              onClick={(e) => e.stopPropagation()}
              onScroll={handleModalScroll}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                width: isMobile ? '100%' : '100%',
                maxWidth: isMobile ? '100%' : '1400px',
                height: isMobile ? '100vh' : 'auto',
                maxHeight: isMobile ? '100vh' : '85vh',
                background: isMobile ? 'rgba(20, 20, 20, 0.98)' : 'rgba(20, 20, 20, 0.95)',
                borderRadius: isMobile ? '0' : '24px',
                border: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                overflow: 'hidden',
                overflowX: 'hidden',
                position: 'relative',
                marginTop: isMobile ? '0' : '0',
                marginBottom: isMobile ? '0' : '0',
                boxSizing: 'border-box'
              }}
            >
              {/* Close button */}
              <button
                onClick={closeDetailView}
                style={{
                  position: 'absolute',
                  top: isMobile ? '10px' : '1rem',
                  right: isMobile ? '10px' : '1rem',
                  width: isMobile ? '35px' : '40px',
                  height: isMobile ? '35px' : '40px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: isMobile ? '1.8rem' : '1.5rem',
                  cursor: 'pointer',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.background = 'rgba(255, 0, 0, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  }
                }}
              >
                ×
              </button>

              {/* Mobile swipe indicator */}
              {isMobile && (prevImage || nextImage) && (
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '8px',
                  zIndex: 10,
                  background: 'rgba(0, 0, 0, 0.6)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <span style={{ 
                    color: prevImage ? '#00ff7f' : 'rgba(255, 255, 255, 0.3)',
                    fontSize: '0.85rem'
                  }}>
                    ← Swipe
                  </span>
                  <span style={{ 
                    color: nextImage ? '#00ff7f' : 'rgba(255, 255, 255, 0.3)',
                    fontSize: '0.85rem'
                  }}>
                    Swipe →
                  </span>
                </div>
              )}

              {/* Navigation buttons */}
              {prevImage && !isMobile && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(prevImage);
                    setZoomLevel(1);
                  }}
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    zIndex: 9999,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 255, 127, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  ←
                </button>
              )}

              {nextImage && !isMobile && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(nextImage);
                    setZoomLevel(1);
                  }}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    zIndex: 9999,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 255, 127, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  →
                </button>
              )}

              {/* Scrollable Content Container */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                overflow: 'hidden',
                overflowY: isMobile ? 'auto' : 'auto',
                overflowX: 'hidden',
                WebkitOverflowScrolling: 'touch',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
                boxSizing: 'border-box'
              }}>
                {/* Image section */}
                <div ref={modalImageRef} style={{
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: isMobile ? '1rem' : '2rem',
                  position: 'relative',
                  minHeight: isMobile ? '30vh' : 'auto',
                  maxHeight: isMobile ? '40vh' : 'auto',
                  background: '#000',
                  boxSizing: 'border-box',
                  width: '100%',
                  overflow: 'hidden'
                }}>
                  <LazyImage
                    key={selectedImage.id}
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    style={{
                      width: '100%',
                      maxWidth: '100%',
                      height: 'auto',
                      maxHeight: isMobile ? '35vh' : '70vh',
                      objectFit: 'contain',
                      transform: `scale(${zoomLevel})`,
                      transition: 'transform 0.3s ease',
                      cursor: isMobile ? 'default' : (zoomLevel > 1 ? 'zoom-out' : 'zoom-in')
                    }}
                    onClick={() => !isMobile && setZoomLevel(zoomLevel > 1 ? 1 : 2)}
                  />
                </div>

                {/* Info panel */}
                <div ref={infoSectionRef} style={{
                  flexShrink: 0,
                  background: 'rgba(20, 20, 20, 0.98)',
                  borderTop: '1px solid rgba(0, 255, 127, 0.2)',
                  padding: isMobile ? '15px' : '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  boxSizing: 'border-box',
                  overflowX: 'hidden'
                }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)',
                    color: '#000000',
                    padding: isMobile ? '0.3rem 0.6rem' : '0.4rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: isMobile ? '0.7rem' : '0.8rem',
                    fontWeight: '600'
                  }}>
                    {selectedImage.category}
                  </span>
                  <span style={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontSize: '0.85rem'
                  }}>
                    ID: {selectedImage.id}
                  </span>
                </div>

                <h2 style={{
                  fontSize: isMobile ? '1.25rem' : '1.75rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  lineHeight: 1.2,
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word'
                }}>
                  {selectedImage.title}
                </h2>

                <p style={{
                  fontSize: isMobile ? '0.85rem' : '1rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: 1.5,
                  marginBottom: isMobile ? '1rem' : '2rem',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  hyphens: 'auto'
                }}>
                  {selectedImage.description}
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile && window.innerWidth < 360 ? '1fr' : '1fr 1fr',
                  gap: isMobile ? '0.75rem' : '1rem',
                  marginBottom: isMobile ? '1rem' : '2rem',
                  padding: isMobile ? '0.75rem' : '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px'
                }}>
                  <div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: isMobile ? '0.7rem' : '0.85rem' }}>
                      Views
                    </div>
                    <div style={{ fontSize: isMobile ? '1.1rem' : '1.25rem', fontWeight: '600' }}>
                      {selectedImage.views.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: isMobile ? '0.7rem' : '0.85rem' }}>
                      Likes
                    </div>
                    <div style={{ fontSize: isMobile ? '1.1rem' : '1.25rem', fontWeight: '600' }}>
                      {selectedImage.likes.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: isMobile ? '0.7rem' : '0.85rem' }}>
                      Rating
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#00ff7f' }}>
                      ★ {selectedImage.rating}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: isMobile ? '0.7rem' : '0.85rem' }}>
                      Uploaded
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                      {formatDate(selectedImage.uploadDate)}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: isMobile ? '1rem' : '2rem' }}>
                  <h3 style={{ fontSize: isMobile ? '0.85rem' : '0.95rem', marginBottom: isMobile ? '0.5rem' : '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                    Tags
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', maxWidth: '100%', overflowX: 'hidden' }}>
                    {selectedImage.tags.map(tag => (
                      <span
                        key={tag}
                        style={{
                          padding: '0.3rem 0.6rem',
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: isMobile ? '12px' : '16px',
                          fontSize: isMobile ? '0.7rem' : '0.8rem',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(0, 255, 127, 0.2)';
                          e.currentTarget.style.color = '#00ff7f';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: isMobile ? '0.5rem' : '1rem', marginTop: 'auto', width: '100%', boxSizing: 'border-box' }}>
                  <button
                    style={{
                      flex: 1,
                      padding: isMobile ? '0.6rem' : '0.75rem',
                      background: 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)',
                      color: '#000000',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: isMobile ? '0.85rem' : '0.95rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Download
                  </button>
                  <button
                    style={{
                      flex: 1,
                      padding: isMobile ? '0.6rem' : '0.75rem',
                      background: 'transparent',
                      color: '#00ff7f',
                      border: '2px solid #00ff7f',
                      borderRadius: '12px',
                      fontSize: isMobile ? '0.85rem' : '0.95rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 255, 127, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    Share
                  </button>
                </div>
                </div>
              </div>

              {/* Instagram-style navigation dots for mobile */}
              {isMobile && displayedArtwork.length > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    position: 'fixed',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '6px',
                    zIndex: 20
                  }}
                >
                  {displayedArtwork.slice(0, 10).map((art, index) => (
                    <motion.div
                      key={art.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.03 }}
                      style={{
                        width: art.id === selectedImage.id ? '8px' : '6px',
                        height: art.id === selectedImage.id ? '8px' : '6px',
                        borderRadius: '50%',
                        background: art.id === selectedImage.id ? '#00ff7f' : 'rgba(255, 255, 255, 0.3)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        setSelectedImage(art);
                        setZoomLevel(1);
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        html, body {
          overflow-x: hidden;
          max-width: 100vw;
        }
        
        * {
          box-sizing: border-box;
        }
      `}</style>
      
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        /* Hide scrollbar for category pills */
        ::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for modal */
        .detail-modal-content::-webkit-scrollbar,
        .detail-modal-overlay::-webkit-scrollbar {
          width: 0 !important;
          display: none !important;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .detail-modal-content::-webkit-scrollbar {
            display: none;
          }
          
          body.modal-open {
            position: fixed;
            width: 100%;
            overflow: hidden;
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedDigitalArtGallery;