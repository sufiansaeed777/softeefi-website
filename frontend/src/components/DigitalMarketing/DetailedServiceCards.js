import React from 'react';
import * as Icons from './DigitalMarketingIcons';

export const DetailedServicesSection = ({ hoveredCard, setHoveredCard }) => {
  const isMobile = window.innerWidth <= 768;
  
  return (
    <div style={{ 
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
      gridAutoRows: 'auto',
      gap: isMobile ? '2rem' : '3rem',
      rowGap: isMobile ? '3rem' : '6rem',
      marginBottom: isMobile ? '2rem' : '3rem',
      padding: isMobile ? '1rem 0' : '3rem 0',
      position: 'relative'
    }}>
      {/* SEO Service Card */}
      <div style={{ position: 'relative', paddingBottom: '20px' }}>
      <div className="service-card" style={{ 
        background: hoveredCard === 'seo' 
          ? 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 204, 99, 0.05) 100%)' 
          : 'rgba(21, 26, 35, 0.8)',
        borderRadius: '20px',
        padding: isMobile ? '1.5rem' : '2.5rem',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        border: hoveredCard === 'seo' ? '2px solid rgba(0, 255, 127, 0.5)' : '2px solid rgba(255,255,255,0.05)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        boxShadow: hoveredCard === 'seo' ? '0 20px 50px rgba(0, 255, 127, 0.2)' : '0 10px 30px rgba(0, 0, 0, 0.3)',
        transform: hoveredCard === 'seo' ? (isMobile ? 'translateY(-5px)' : 'translateY(-10px) scale(1.02)') : 'translateY(0) scale(1)',
        zIndex: hoveredCard === 'seo' ? 10 : 1,
        marginBottom: hoveredCard === 'seo' ? '20px' : '0'
      }}
      onMouseEnter={() => !isMobile && setHoveredCard('seo')}
      onMouseLeave={() => !isMobile && setHoveredCard(null)}
      onClick={() => isMobile && setHoveredCard(hoveredCard === 'seo' ? null : 'seo')}>
        {/* Animated background effect */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(0, 255, 127, 0.1) 0%, transparent 70%)',
          transform: hoveredCard === 'seo' ? 'scale(1)' : 'scale(0)',
          transition: 'transform 0.8s ease-out',
          pointerEvents: 'none'
        }} />
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '1.5rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            width: isMobile ? '48px' : '60px',
            height: isMobile ? '48px' : '60px',
            background: hoveredCard === 'seo' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '1rem',
            transition: 'all 0.3s ease',
            transform: hoveredCard === 'seo' ? 'rotate(5deg)' : 'rotate(0deg)'
          }}>
            <Icons.SearchIcon />
          </div>
          <h3 style={{ 
            fontSize: isMobile ? '1.4rem' : '1.8rem',
            fontWeight: '700',
            margin: 0,
            color: hoveredCard === 'seo' ? '#00ff7f' : '#ffffff'
          }}>
            Search Engine Optimization
          </h3>
        </div>
        
        <p style={{ 
          marginBottom: isMobile ? '1.5rem' : '2rem', 
          fontSize: isMobile ? '1rem' : '1.1rem',
          lineHeight: '1.8',
          color: '#c9d1d9',
          position: 'relative',
          zIndex: 1
        }}>
          Dominate search engine rankings and connect with customers actively seeking your products
          or services. Our data-driven SEO strategies deliver sustainable growth.
        </p>
        
        <ul style={{ 
          listStyle: 'none', 
          padding: 0, 
          margin: '0 0 2rem 0',
          flex: '1',
          position: 'relative',
          zIndex: 1
        }}>
          {['Complete Website SEO Audits', 'In-Depth Keyword Research', 'Competitor Analysis', 
            'On-Page & Off-Page Optimization', 'Content Strategy for SEO', 'Local SEO Optimization'].map((item, index) => (
            <li key={index} style={{ 
              marginBottom: '1rem',
              paddingLeft: '2rem',
              position: 'relative',
              fontSize: isMobile ? '0.9rem' : '1rem',
              color: '#e6edf3',
              opacity: hoveredCard === 'seo' ? 1 : 0.8,
              transform: hoveredCard === 'seo' ? `translateX(10px)` : 'translateX(0)',
              transition: `all 0.3s ease ${index * 0.05}s`
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                top: '2px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: hoveredCard === 'seo' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                color: '#00ff7f',
              }}>✓</span>
              {item}
            </li>
          ))}
        </ul>
        
        <a href="/contact?service=seo" style={{
          color: '#00ff7f',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          fontWeight: 'bold',
          fontSize: isMobile ? '1rem' : '1.1rem',
          transition: 'all 0.3s ease',
          position: 'relative',
          zIndex: 1,
          gap: '0.5rem',
          width: '100%'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.gap = '1rem';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.gap = '0.5rem';
        }}
        onClick={(e) => e.stopPropagation()}>
          Learn more about SEO
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
      </div>
      
      {/* Social Media Marketing Card */}
      <div style={{ position: 'relative', paddingBottom: '20px' }}>
      <div className="service-card" style={{ 
        background: hoveredCard === 'social' 
          ? 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 204, 99, 0.05) 100%)' 
          : 'rgba(21, 26, 35, 0.8)',
        borderRadius: '20px',
        padding: isMobile ? '1.5rem' : '2.5rem',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        border: hoveredCard === 'social' ? '2px solid rgba(0, 255, 127, 0.5)' : '2px solid rgba(255,255,255,0.05)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        boxShadow: hoveredCard === 'social' ? '0 20px 50px rgba(0, 255, 127, 0.2)' : '0 10px 30px rgba(0, 0, 0, 0.3)',
        transform: hoveredCard === 'social' ? (isMobile ? 'translateY(-5px)' : 'translateY(-10px) scale(1.02)') : 'translateY(0) scale(1)',
        zIndex: hoveredCard === 'social' ? 10 : 1,
        marginBottom: hoveredCard === 'social' ? '20px' : '0'
      }}
      onMouseEnter={() => !isMobile && setHoveredCard('social')}
      onMouseLeave={() => !isMobile && setHoveredCard(null)}
      onClick={() => isMobile && setHoveredCard(hoveredCard === 'social' ? null : 'social')}>
        {/* Animated background effect */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(0, 255, 127, 0.1) 0%, transparent 70%)',
          transform: hoveredCard === 'social' ? 'scale(1)' : 'scale(0)',
          transition: 'transform 0.8s ease-out',
          pointerEvents: 'none'
        }} />
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '1.5rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            width: isMobile ? '48px' : '60px',
            height: isMobile ? '48px' : '60px',
            background: hoveredCard === 'social' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '1rem',
            transition: 'all 0.3s ease',
            transform: hoveredCard === 'social' ? 'rotate(5deg)' : 'rotate(0deg)'
          }}>
            <Icons.SocialIcon />
          </div>
          <h3 style={{ 
            fontSize: isMobile ? '1.4rem' : '1.8rem',
            fontWeight: '700',
            margin: 0,
            color: hoveredCard === 'social' ? '#00ff7f' : '#ffffff'
          }}>
            Social Media Marketing
          </h3>
        </div>
        
        <p style={{ 
          marginBottom: isMobile ? '1.5rem' : '2rem', 
          fontSize: isMobile ? '1rem' : '1.1rem',
          lineHeight: '1.8',
          color: '#c9d1d9',
          position: 'relative',
          zIndex: 1
        }}>
          Build your brand presence and engage with your target audience through strategic social media campaigns that drive real engagement and conversions.
        </p>
        
        <ul style={{ 
          listStyle: 'none', 
          padding: 0, 
          margin: '0 0 2rem 0',
          flex: '1',
          position: 'relative',
          zIndex: 1
        }}>
          {['Facebook & Instagram Ads', /* 'LinkedIn B2B Marketing', */ 'Content Creation & Scheduling', 
            'Community Management', 'Influencer Partnerships', 'Performance Analytics'].map((item, index) => (
            <li key={index} style={{ 
              marginBottom: '1rem',
              paddingLeft: '2rem',
              position: 'relative',
              fontSize: isMobile ? '0.9rem' : '1rem',
              color: '#e6edf3',
              opacity: hoveredCard === 'social' ? 1 : 0.8,
              transform: hoveredCard === 'social' ? `translateX(10px)` : 'translateX(0)',
              transition: `all 0.3s ease ${index * 0.05}s`
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                top: '2px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: hoveredCard === 'social' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                color: '#00ff7f',
              }}>✓</span>
              {item}
            </li>
          ))}
        </ul>
        
        <a href="/contact?service=social" style={{
          color: '#00ff7f',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          fontWeight: 'bold',
          fontSize: isMobile ? '1rem' : '1.1rem',
          transition: 'all 0.3s ease',
          position: 'relative',
          zIndex: 1,
          gap: '0.5rem',
          width: '100%'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.gap = '1rem';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.gap = '0.5rem';
        }}
        onClick={(e) => e.stopPropagation()}>
          Learn more about Social Media Marketing
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
      </div>

      {/* PPC Advertising Card */}
      <div style={{ position: 'relative', paddingBottom: '20px' }}>
      <div className="service-card" style={{ 
        background: hoveredCard === 'ppc' 
          ? 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 204, 99, 0.05) 100%)' 
          : 'rgba(21, 26, 35, 0.8)',
        borderRadius: '20px',
        padding: isMobile ? '1.5rem' : '2.5rem',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        border: hoveredCard === 'ppc' ? '2px solid rgba(0, 255, 127, 0.5)' : '2px solid rgba(255,255,255,0.05)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        boxShadow: hoveredCard === 'ppc' ? '0 20px 50px rgba(0, 255, 127, 0.2)' : '0 10px 30px rgba(0, 0, 0, 0.3)',
        transform: hoveredCard === 'ppc' ? (isMobile ? 'translateY(-5px)' : 'translateY(-10px) scale(1.02)') : 'translateY(0) scale(1)',
        zIndex: hoveredCard === 'ppc' ? 10 : 1,
        marginBottom: hoveredCard === 'ppc' ? '20px' : '0'
      }}
      onMouseEnter={() => !isMobile && setHoveredCard('ppc')}
      onMouseLeave={() => !isMobile && setHoveredCard(null)}
      onClick={() => isMobile && setHoveredCard(hoveredCard === 'ppc' ? null : 'ppc')}>
        {/* Animated background effect */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(0, 255, 127, 0.1) 0%, transparent 70%)',
          transform: hoveredCard === 'ppc' ? 'scale(1)' : 'scale(0)',
          transition: 'transform 0.8s ease-out',
          pointerEvents: 'none'
        }} />
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '1.5rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            width: isMobile ? '48px' : '60px',
            height: isMobile ? '48px' : '60px',
            background: hoveredCard === 'ppc' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '1rem',
            transition: 'all 0.3s ease',
            transform: hoveredCard === 'ppc' ? 'rotate(5deg)' : 'rotate(0deg)'
          }}>
            <Icons.AdIcon />
          </div>
          <h3 style={{ 
            fontSize: isMobile ? '1.4rem' : '1.8rem',
            fontWeight: '700',
            margin: 0,
            color: hoveredCard === 'ppc' ? '#00ff7f' : '#ffffff'
          }}>
            PPC Advertising
          </h3>
        </div>
        
        <p style={{ 
          marginBottom: isMobile ? '1.5rem' : '2rem', 
          fontSize: isMobile ? '1rem' : '1.1rem',
          lineHeight: '1.8',
          color: '#c9d1d9',
          position: 'relative',
          zIndex: 1
        }}>
          Drive immediate, targeted traffic with precision-crafted pay-per-click campaigns that maximize your ROI and minimize wasted spend.
        </p>
        
        <ul style={{ 
          listStyle: 'none', 
          padding: 0, 
          margin: '0 0 2rem 0',
          flex: '1',
          position: 'relative',
          zIndex: 1
        }}>
          {['Google Ads Management', 'Microsoft Advertising', 'Shopping Campaigns', 
            'Display & Retargeting', 'Landing Page Optimization', 'A/B Testing & Analytics'].map((item, index) => (
            <li key={index} style={{ 
              marginBottom: '1rem',
              paddingLeft: '2rem',
              position: 'relative',
              fontSize: isMobile ? '0.9rem' : '1rem',
              color: '#e6edf3',
              opacity: hoveredCard === 'ppc' ? 1 : 0.8,
              transform: hoveredCard === 'ppc' ? `translateX(10px)` : 'translateX(0)',
              transition: `all 0.3s ease ${index * 0.05}s`
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                top: '2px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: hoveredCard === 'ppc' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                color: '#00ff7f',
              }}>✓</span>
              {item}
            </li>
          ))}
        </ul>
        
        <a href="/contact?service=ppc" style={{
          color: '#00ff7f',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          fontWeight: 'bold',
          fontSize: isMobile ? '1rem' : '1.1rem',
          transition: 'all 0.3s ease',
          position: 'relative',
          zIndex: 1,
          gap: '0.5rem',
          width: '100%'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.gap = '1rem';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.gap = '0.5rem';
        }}
        onClick={(e) => e.stopPropagation()}>
          Learn more about PPC Advertising
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
      </div>

      {/* Content Marketing Card */}
      <div style={{ position: 'relative', paddingBottom: '20px' }}>
      <div className="service-card" style={{ 
        background: hoveredCard === 'content' 
          ? 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 204, 99, 0.05) 100%)' 
          : 'rgba(21, 26, 35, 0.8)',
        borderRadius: '20px',
        padding: isMobile ? '1.5rem' : '2.5rem',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        border: hoveredCard === 'content' ? '2px solid rgba(0, 255, 127, 0.5)' : '2px solid rgba(255,255,255,0.05)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        boxShadow: hoveredCard === 'content' ? '0 20px 50px rgba(0, 255, 127, 0.2)' : '0 10px 30px rgba(0, 0, 0, 0.3)',
        transform: hoveredCard === 'content' ? (isMobile ? 'translateY(-5px)' : 'translateY(-10px) scale(1.02)') : 'translateY(0) scale(1)',
        zIndex: hoveredCard === 'content' ? 10 : 1,
        marginBottom: hoveredCard === 'content' ? '20px' : '0'
      }}
      onMouseEnter={() => !isMobile && setHoveredCard('content')}
      onMouseLeave={() => !isMobile && setHoveredCard(null)}
      onClick={() => isMobile && setHoveredCard(hoveredCard === 'content' ? null : 'content')}>
        {/* Animated background effect */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(0, 255, 127, 0.1) 0%, transparent 70%)',
          transform: hoveredCard === 'content' ? 'scale(1)' : 'scale(0)',
          transition: 'transform 0.8s ease-out',
          pointerEvents: 'none'
        }} />
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '1.5rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            width: isMobile ? '48px' : '60px',
            height: isMobile ? '48px' : '60px',
            background: hoveredCard === 'content' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '1rem',
            transition: 'all 0.3s ease',
            transform: hoveredCard === 'content' ? 'rotate(5deg)' : 'rotate(0deg)'
          }}>
            <Icons.ContentIcon />
          </div>
          <h3 style={{ 
            fontSize: isMobile ? '1.4rem' : '1.8rem',
            fontWeight: '700',
            margin: 0,
            color: hoveredCard === 'content' ? '#00ff7f' : '#ffffff'
          }}>
            Viral Content & Meme Marketing
          </h3>
        </div>
        
        <p style={{ 
          marginBottom: isMobile ? '1.5rem' : '2rem', 
          fontSize: isMobile ? '1rem' : '1.1rem',
          lineHeight: '1.8',
          color: '#c9d1d9',
          position: 'relative',
          zIndex: 1
        }}>
          Make your brand go viral with our proven content strategy that has generated over 3.8 billion views. We stop the scroll because we never stop scrolling.
        </p>
        
        <ul style={{ 
          listStyle: 'none', 
          padding: 0, 
          margin: '0 0 2rem 0',
          flex: '1',
          position: 'relative',
          zIndex: 1
        }}>
          {['Viral Meme Creation & Strategy', 'Trend-Jacking & Real-Time Marketing', 'Short-Form Video Content (Reels/TikTok)', 
            'Personal Brand Development', 'Community-Driven Content', 'Data-Driven Content Optimization'].map((item, index) => (
            <li key={index} style={{ 
              marginBottom: '1rem',
              paddingLeft: '2rem',
              position: 'relative',
              fontSize: isMobile ? '0.9rem' : '1rem',
              color: '#e6edf3',
              opacity: hoveredCard === 'content' ? 1 : 0.8,
              transform: hoveredCard === 'content' ? `translateX(10px)` : 'translateX(0)',
              transition: `all 0.3s ease ${index * 0.05}s`
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                top: '2px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: hoveredCard === 'content' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                color: '#00ff7f',
              }}>✓</span>
              {item}
            </li>
          ))}
        </ul>
        
        <a href="/contact?service=content" style={{
          color: '#00ff7f',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          fontWeight: 'bold',
          fontSize: isMobile ? '1rem' : '1.1rem',
          transition: 'all 0.3s ease',
          position: 'relative',
          zIndex: 1,
          gap: '0.5rem',
          width: '100%'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.gap = '1rem';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.gap = '0.5rem';
        }}
        onClick={(e) => e.stopPropagation()}>
          Learn more about Content Marketing
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
      </div>
    </div>
  );
};