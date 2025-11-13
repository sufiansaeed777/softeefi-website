      </section>

      {/* Client Reviews Section */}
      <section style={{
        padding: isMobile ? '4rem 1rem' : '6rem 2rem',
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Matrix-style background effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          background: `repeating-linear-gradient(
            0deg,
            #00ff00,
            #00ff00 1px,
            transparent 1px,
            transparent 2px
          )`,
          pointerEvents: 'none'
        }} />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1
          }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              marginBottom: isMobile ? '3rem' : '4rem'
            }}
          >
            <h2 style={{
              fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(3rem, 5vw, 4rem)',
              fontWeight: '900',
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              <span style={{ color: '#666' }}>AI Solution</span>{' '}
              <span style={{
                background: 'linear-gradient(135deg, #00ff00 0%, #00ff7f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(0, 255, 0, 0.3)'
              }}>
                Success Stories
              </span>
            </h2>
            <p style={{
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              color: '#9ca3af',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Real results from businesses transformed with our AI solutions
            </p>
          </motion.div>

          {/* Reviews Carousel */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              overflow: isMobile ? 'auto' : 'hidden',
              overflowX: isMobile ? 'auto' : 'hidden',
              borderRadius: '20px',
              background: 'rgba(0, 255, 0, 0.02)',
              border: '1px solid rgba(0, 255, 127, 0.1)',
              padding: isMobile ? '2rem 0' : '3rem 0',
              scrollSnapType: isMobile ? 'x mandatory' : 'none',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              boxShadow: 'inset 0 0 50px rgba(0, 255, 0, 0.02)'
            }}
            className="hide-scrollbar"
            onMouseEnter={() => !isMobile && setIsPaused(true)}
            onMouseLeave={() => !isMobile && setIsPaused(false)}
          >
            <div
              style={{
                display: 'flex',
                animation: !isMobile ? 'testimonialScroll 40s linear infinite' : 'none',
                animationPlayState: isPaused ? 'paused' : 'running',
                gap: isMobile ? '1rem' : '2rem',
                paddingLeft: isMobile ? '1rem' : '2rem',
                paddingRight: isMobile ? '1rem' : '2rem',
                width: 'fit-content'
              }}
            >
              {/* AI-specific testimonials - double for animation */}
              {(isMobile ? [1] : [1, 2]).map((set) => (
                <React.Fragment key={set}>
                  {[
                    {
                      content: "The AI chatbot integration increased our customer satisfaction by 40% while reducing support costs. Absolutely game-changing!",
                      author: "Michael Chen",
                      position: "CTO",
                      company: "TechVentures Inc",
                      rating: 5,
                      flag: "🇺🇸"
                    },
                    {
                      content: "Their AI-powered analytics helped us identify patterns we never knew existed. Revenue increased by 25% in just 3 months.",
                      author: "Sarah Johnson",
                      position: "Data Director",
                      company: "Analytics Pro",
                      rating: 5,
                      flag: "🇬🇧"
                    },
                    {
                      content: "The custom AI solution automated 70% of our manual processes. ROI was achieved within 6 weeks!",
                      author: "David Rodriguez",
                      position: "Operations Manager",
                      company: "LogiFlow Systems",
                      rating: 5,
                      flag: "🇪🇸"
                    },
                    {
                      content: "Outstanding AI implementation! The predictive models are incredibly accurate and have transformed our decision-making.",
                      author: "Emma Watson",
                      position: "CEO",
                      company: "FutureTech Solutions",
                      rating: 5,
                      flag: "🇨🇦"
                    },
                    {
                      content: "The RAG system they built allows our team to query our entire knowledge base instantly. Productivity is through the roof!",
                      author: "James Park",
                      position: "Head of Innovation",
                      company: "Knowledge Corp",
                      rating: 5,
                      flag: "🇦🇺"
                    },
                    {
                      content: "Their AI vision system reduced quality control errors by 95%. Best investment we've made in years.",
                      author: "Lisa Zhang",
                      position: "Quality Manager",
                      company: "Manufacturing Plus",
                      rating: 5,
                      flag: "🇩🇪"
                    },
                    {
                      content: "The NLP solution handles multiple languages flawlessly. Our global customer support is now seamless.",
                      author: "Raj Patel",
                      position: "Support Director",
                      company: "GlobalTech",
                      rating: 5,
                      flag: "🇮🇳"
                    },
                    {
                      content: "Machine learning models optimized our supply chain, saving us millions annually. Exceptional work!",
                      author: "Sofia Martinez",
                      position: "Supply Chain Manager",
                      company: "LogisticsPro",
                      rating: 5,
                      flag: "🇲🇽"
                    }
                  ].map((testimonial, index) => (
                    <div
                      key={`${set}-${index}`}
                      style={{
                        minWidth: isMobile ? '85vw' : '400px',
                        width: isMobile ? '85vw' : '400px',
                        maxWidth: isMobile ? '85vw' : '450px',
                        flexShrink: 0,
                        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 20, 0, 0.6))',
                        border: '1px solid rgba(0, 255, 127, 0.2)',
                        borderRadius: '15px',
                        padding: isMobile ? '1.25rem' : '2rem',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        scrollSnapAlign: isMobile ? 'start' : 'none',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.5)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 40, 0, 0.7))';
                        e.currentTarget.style.transform = 'scale(1.02) translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 255, 127, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.2)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 20, 0, 0.6))';
                        e.currentTarget.style.transform = 'scale(1) translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {/* AI Glow Effect */}
                      <div style={{
                        position: 'absolute',
                        top: '-1px',
                        left: '-1px',
                        right: '-1px',
                        bottom: '-1px',
                        background: 'linear-gradient(45deg, transparent, rgba(0, 255, 127, 0.1), transparent)',
                        borderRadius: '15px',
                        opacity: 0.5,
                        pointerEvents: 'none'
                      }} />

                      {/* Rating Stars */}
                      <div style={{
                        display: 'flex',
                        gap: '0.25rem',
                        marginBottom: '1rem'
                      }}>
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="#00ff7f"
                            style={{ 
                              opacity: 0.9,
                              filter: 'drop-shadow(0 0 3px rgba(0, 255, 127, 0.5))'
                            }}
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>

                      {/* Review Content */}
                      <p style={{
                        fontSize: isMobile ? '0.95rem' : '1.1rem',
                        color: '#d1d5db',
                        lineHeight: '1.6',
                        marginBottom: '1.5rem',
                        fontStyle: 'italic'
                      }}>
                        "{testimonial.content}"
                      </p>

                      {/* Author Info */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <div style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #00ff00 0%, #00ff7f 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          color: '#000000',
                          boxShadow: '0 0 20px rgba(0, 255, 127, 0.3)'
                        }}>
                          {testimonial.author.charAt(0)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#00ff7f',
                            marginBottom: '0.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            {testimonial.author}
                            <span style={{ fontSize: '1.2rem' }}>{testimonial.flag}</span>
                          </h4>
                          <p style={{
                            fontSize: '0.85rem',
                            color: '#9ca3af',
                            margin: 0
                          }}>
                            {testimonial.position} • {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>

            {/* Gradient Overlays */}
            {!isMobile && (
              <>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '150px',
                  height: '100%',
                  background: 'linear-gradient(90deg, #000000 0%, transparent 100%)',
                  pointerEvents: 'none',
                  zIndex: 2
                }} />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '150px',
                  height: '100%',
                  background: 'linear-gradient(270deg, #000000 0%, transparent 100%)',
                  pointerEvents: 'none',
                  zIndex: 2
                }} />
              </>
            )}
          </div>

          {/* Average Rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              textAlign: 'center',
              marginTop: '3rem'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#00ff7f"
                  style={{
                    filter: 'drop-shadow(0 0 5px rgba(0, 255, 127, 0.5))'
                  }}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            
            <p style={{
              fontSize: '1rem',
              color: '#00ff7f',
              fontWeight: '600',
              textShadow: '0 0 10px rgba(0, 255, 127, 0.3)'
            }}>
              5.0 Average Rating from 150+ AI Projects
            </p>
          </motion.div>
        </motion.div>

        {/* Add animation keyframes */}
        <style jsx>{`
          @keyframes testimonialScroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </section>