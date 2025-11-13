import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "10 Web Design Trends to Watch in 2025",
      excerpt: "Discover the cutting-edge design trends that will shape the digital landscape this year. From AI-powered interfaces to immersive 3D experiences.",
      content: "Full article content here...",
      date: "July 8, 2025",
      category: "Design",
      author: "Sarah Chen",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
      tags: ["Web Design", "UI/UX", "Trends"]
    },
    {
      id: 2,
      title: "How AI is Revolutionizing Small Business Marketing",
      excerpt: "Learn how artificial intelligence tools can transform your marketing strategy and help you compete with larger competitors on a budget.",
      content: "Full article content here...",
      date: "July 5, 2025",
      category: "AI & Marketing",
      author: "Mike Johnson",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      tags: ["AI", "Marketing", "Small Business"]
    },
    {
      id: 3,
      title: "The Complete Guide to Cloud Migration",
      excerpt: "Everything you need to know about moving your business to the cloud, from planning to execution and optimization.",
      content: "Full article content here...",
      date: "July 2, 2025",
      category: "Cloud Services",
      author: "David Park",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
      tags: ["Cloud", "DevOps", "Infrastructure"]
    },
    {
      id: 4,
      title: "Building Accessible React Applications",
      excerpt: "A comprehensive guide to creating web applications that are usable by everyone, including best practices and tools.",
      content: "Full article content here...",
      date: "June 28, 2025",
      category: "Web Development",
      author: "Emily Rodriguez",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=400&fit=crop",
      tags: ["React", "Accessibility", "Web Development"]
    },
    {
      id: 5,
      title: "SEO Strategies That Actually Work in 2025",
      excerpt: "Cut through the noise and discover proven SEO techniques that will help your website rank higher in search results.",
      content: "Full article content here...",
      date: "June 25, 2025",
      category: "Digital Marketing",
      author: "Lisa Wang",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&h=400&fit=crop",
      tags: ["SEO", "Digital Marketing", "Search"]
    },
    {
      id: 6,
      title: "The Psychology of Color in UI Design",
      excerpt: "Understanding how colors affect user emotions and behavior can help you create more effective and engaging interfaces.",
      content: "Full article content here...",
      date: "June 20, 2025",
      category: "UI/UX Design",
      author: "Alex Turner",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=800&h=400&fit=crop",
      tags: ["UI Design", "Psychology", "Color Theory"]
    }
  ];

  // Categories
  const categories = [
    { name: 'All Posts', value: 'all', count: blogPosts.length },
    { name: 'Web Development', value: 'Web Development', count: blogPosts.filter(p => p.category === 'Web Development').length },
    { name: 'AI & Marketing', value: 'AI & Marketing', count: blogPosts.filter(p => p.category === 'AI & Marketing').length },
    { name: 'Digital Marketing', value: 'Digital Marketing', count: blogPosts.filter(p => p.category === 'Digital Marketing').length },
    { name: 'Cloud Services', value: 'Cloud Services', count: blogPosts.filter(p => p.category === 'Cloud Services').length },
    { name: 'UI/UX Design', value: 'UI/UX Design', count: blogPosts.filter(p => p.category === 'UI/UX Design').length },
    { name: 'Design', value: 'Design', count: blogPosts.filter(p => p.category === 'Design').length }
  ];

  // Filter posts based on category and search
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div style={{
      backgroundColor: '#0d1117',
      minHeight: '100vh',
      paddingTop: isMobile ? '60px' : '80px'
    }}>
      <Helmet>
        <title>Blog | Tech Articles & Digital Marketing Insights - Softeefi</title>
        <meta name="description" content="Explore Softeefi's blog for expert insights on web development, AI technology, digital marketing strategies, and industry trends. Stay updated with our latest articles and tutorials." />
        <link rel="canonical" href="https://softeefi.co.uk/blog" />
        <meta name="keywords" content="web development blog, AI articles, digital marketing insights, tech blog, software development, SEO tips, cloud computing, UI/UX design blog, softeefi blog" />
        <meta property="og:title" content="Blog - Tech Insights & Digital Marketing - Softeefi" />
        <meta property="og:description" content="Expert articles on web development, AI, digital marketing, and technology trends. Learn from industry professionals." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://softeefi.co.uk/blog" />
        <meta property="og:image" content="https://softeefi.co.uk/images/blog-og.jpg" />
      </Helmet>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0d1117 0%, #001f3f 50%, #0d1117 100%)',
        padding: isMobile ? '3rem 1.5rem 4rem' : '5rem 2rem 6rem',
        textAlign: 'center',
        borderBottom: '1px solid rgba(0, 255, 127, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          pointerEvents: 'none'
        }}>
          <motion.div
            style={{
              position: 'absolute',
              top: '-20%',
              left: '-10%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, #00ff7f 0%, transparent 70%)',
              filter: 'blur(60px)'
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            style={{
              position: 'absolute',
              bottom: '-20%',
              right: '-10%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, #00a2ff 0%, transparent 70%)',
              filter: 'blur(80px)'
            }}
            animate={{
              x: [0, -50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* Blog Label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1.5rem',
              background: 'rgba(0, 255, 127, 0.1)',
              border: '1px solid rgba(0, 255, 127, 0.3)',
              borderRadius: '30px',
              marginBottom: '1.5rem'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="4" width="14" height="12" rx="2" stroke="#00ff7f" strokeWidth="1.5"/>
              <path d="M3 8H17" stroke="#00ff7f" strokeWidth="1.5"/>
              <path d="M7 12H13M7 14H11" stroke="#00ff7f" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span style={{ color: '#00ff7f', fontSize: '0.875rem', fontWeight: '600' }}>
              SOFTEEFI BLOG
            </span>
          </motion.div>

          <h1 style={{
            fontSize: isMobile ? '2.5rem' : '4rem',
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '1.5rem',
            lineHeight: 1.1
          }}>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Knowledge
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                background: 'linear-gradient(90deg, #00ff7f 0%, #00a2ff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Hub
            </motion.span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              fontSize: isMobile ? '1.1rem' : '1.25rem',
              color: '#c0c0c0',
              maxWidth: '700px',
              margin: '0 auto',
              marginBottom: '3rem',
              lineHeight: 1.6
            }}
          >
            Explore cutting-edge insights, practical tutorials, and industry trends 
            to stay ahead in the digital landscape
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: isMobile ? '2rem' : '4rem',
              marginBottom: '3rem',
              flexWrap: 'wrap'
            }}
          >
            {[
              { number: '150+', label: 'Articles' },
              { number: '50K+', label: 'Readers' },
              { number: '25+', label: 'Authors' }
            ].map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: isMobile ? '1.5rem' : '2rem',
                  fontWeight: 'bold',
                  color: '#00ff7f',
                  marginBottom: '0.25rem'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#999999',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Enhanced Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              position: 'relative'
            }}
          >
            <div style={{
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '40px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease'
            }}>
              <input
                type="text"
                placeholder="Search articles, tutorials, guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: isMobile ? '1.2rem 4rem 1.2rem 1.5rem' : '1.3rem 4rem 1.3rem 2rem',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '40px',
                  color: '#ffffff',
                  fontSize: '1.05rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.parentElement.style.borderColor = 'rgba(0, 255, 127, 0.5)';
                  e.target.parentElement.style.boxShadow = '0 10px 40px rgba(0, 255, 127, 0.2)';
                  e.target.parentElement.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onBlur={(e) => {
                  e.target.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.parentElement.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)';
                  e.target.parentElement.style.background = 'rgba(255, 255, 255, 0.03)';
                }}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  position: 'absolute',
                  right: '0.5rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '3rem',
                  height: '3rem',
                  background: 'linear-gradient(135deg, #00ff7f 0%, #00a2ff 100%)',
                  border: 'none',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0, 255, 127, 0.4)'
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <circle cx="9" cy="9" r="6" stroke="#0d0d0d" strokeWidth="2.5"/>
                  <path d="M13 13L17 17" stroke="#0d0d0d" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </motion.button>
            </div>
            
            {/* Popular searches */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap'
              }}
            >
              <span style={{ fontSize: '0.875rem', color: '#999' }}>Popular:</span>
              {['React', 'SEO Tips', 'Cloud Migration', 'AI Tools'].map((tag, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSearchQuery(tag)}
                  style={{
                    padding: '0.25rem 0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    color: '#c0c0c0',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = 'rgba(0, 255, 127, 0.3)';
                    e.target.style.color = '#00ff7f';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.color = '#c0c0c0';
                  }}
                >
                  {tag}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Categories Filter */}
      <section style={{
        padding: isMobile ? '2rem 1.5rem' : '3rem 2rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          justifyContent: 'center'
        }}>
          {categories.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedCategory(category.value)}
              style={{
                padding: '0.5rem 1.5rem',
                background: selectedCategory === category.value
                  ? 'linear-gradient(90deg, #00af60 0%, #00ff7f 100%)'
                  : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid',
                borderColor: selectedCategory === category.value
                  ? 'transparent'
                  : 'rgba(255, 255, 255, 0.1)',
                borderRadius: '25px',
                color: selectedCategory === category.value
                  ? '#0d0d0d'
                  : '#c0c0c0',
                fontSize: '0.875rem',
                fontWeight: selectedCategory === category.value ? '600' : 'normal',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
              <span style={{
                opacity: 0.7,
                fontSize: '0.875rem'
              }}>
                ({category.count})
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section style={{
        padding: isMobile ? '3rem 1.5rem' : '4rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(0, 255, 127, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              whileHover={{
                y: -5,
                borderColor: 'rgba(0, 255, 127, 0.3)',
                backgroundColor: 'rgba(0, 255, 127, 0.02)'
              }}
            >
              {/* Post Image */}
              <div style={{
                position: 'relative',
                paddingBottom: '50%',
                overflow: 'hidden'
              }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  padding: '0.25rem 0.75rem',
                  background: 'rgba(0, 255, 127, 0.9)',
                  borderRadius: '20px',
                  color: '#0d0d0d',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {post.category}
                </div>
              </div>

              {/* Post Content */}
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                  fontSize: '0.875rem',
                  color: '#999999'
                }}>
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '0.5rem',
                  lineHeight: 1.4
                }}>
                  {post.title}
                </h3>

                <p style={{
                  fontSize: '1rem',
                  color: '#c0c0c0',
                  lineHeight: 1.6,
                  marginBottom: '1rem'
                }}>
                  {post.excerpt}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <Link
                    to={`/blog/${post.id}`}
                    style={{
                      color: '#00ff7f',
                      textDecoration: 'none',
                      fontSize: '1rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'gap 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.gap = '0.75rem';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.gap = '0.5rem';
                    }}
                  >
                    Read More
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8.293 2.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L12.586 8 8.293 3.707a1 1 0 010-1.414z"/>
                    </svg>
                  </Link>

                  <div style={{
                    display: 'flex',
                    gap: '0.5rem'
                  }}>
                    {post.tags.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.75rem',
                          color: '#999999',
                          padding: '0.25rem 0.5rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '12px'
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: '#c0c0c0'
            }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              style={{ margin: '0 auto', marginBottom: '1.5rem' }}
            >
              <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
              <path d="M30 35C30 35 35 30 40 30C45 30 50 35 50 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
              <circle cx="32" cy="45" r="2" fill="currentColor" opacity="0.5"/>
              <circle cx="48" cy="45" r="2" fill="currentColor" opacity="0.5"/>
            </svg>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              No posts found
            </h3>
            <p>Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Blog;