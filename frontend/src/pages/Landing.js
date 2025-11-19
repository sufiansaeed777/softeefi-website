import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LazyThreeBackgroundWrapper, LazyDataFlowAnimationSVGWrapper, LazyCircuitAnimationWrapper, MotionSafeComponent } from '../components/LazyComponents';
import { WebsiteIcon, AppDevIcon, MarketingIcon, GraphicDesignIcon, CloudIcon, VideoIcon, ChatbotIcon, NFTIcon, AISparkleIcon, UIUXIcon, LightbulbIcon, PencilIcon } from '../components/SimpleIcons';
import { space, fontSize, fontWeight, transition, colors } from '../utils/designTokens';
import { serviceThemes } from '../utils/serviceThemes';
import ContactForm from '../components/ContactForm';
import AskAIModal from '../components/AskAIModal';
import HeroImages from '../components/HeroImages';
import ProcessSection from '../components/ProcessSection';


const Landing = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [askAIModal, setAskAIModal] = useState({ show: false, service: null, position: null });
  const [isBBCentered, setIsBBCentered] = useState(false);
  const bbSectionRef = useRef(null);
  const [videoDurations, setVideoDurations] = useState({});
  const rotationTimerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const testimonialRef = useRef(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // All testimonials collected from different pages with real project images
  const allTestimonials = [
    {
      content: "Great work and attention to detail were above and beyond every time and great communication. Definitely I would recommend to have your AI stuff done",
      author: "jorgejuli6",
      position: "Client",
      company: "United States",
      rating: 5,
      flag: "🇺🇸",
      date: "4.7"
    },
    {
      content: "Great working with Adnan! We had a bit longer timeline at the beginning due some confusion but once we resolved that it was really quick and easy!",
      author: "kean2022",
      position: "Client",
      company: "United States",
      rating: 5,
      flag: "🇺🇸",
      date: "4.5"
    },
    {
      content: "Adnan really went the extra mile and I'll be back!",
      author: "athudabes",
      position: "Client",
      company: "United States",
      rating: 5,
      flag: "🇺🇸",
      date: "4.5"
    },
    {
      content: "Patient and very understanding person. Good work. Thank you.",
      author: "emmanuedsudah",
      position: "Client",
      company: "United States",
      rating: 5,
      flag: "🇺🇸",
      date: "4.7"
    },
    {
      content: "Great Ahmad truly excels in AI Development! His work brought our project to life and made it way more engaging than anticipated. He was a breeze no selfishness, language fluency, and promptness made working with seamless! I'd recommend to anyone.",
      author: "kean2022",
      position: "Client",
      company: "United States",
      rating: 5,
      flag: "🇺🇸",
      date: "5.0"
    },
    {
      content: "Seller has been an absolute champion in a software challenge. His dedication to getting quality output even in complex conditions and his ability to finding a solution! When coupled with his patience and demeanor, I couldn't have asked for a better partner on this project! A++",
      author: "jeremietrembla565",
      position: "Client",
      company: "Canada",
      rating: 5,
      flag: "🇨🇦",
      date: "5.0"
    },
    {
      content: "A complete pro expectations and a pleasure to work with!",
      author: "williamdelee3",
      position: "Client",
      company: "United States",
      rating: 5,
      flag: "🇺🇸",
      date: "4.8"
    },
    {
      content: "Great Ahmad delivered as promised! AI solution works well and met expectations. Good communication throughout the process! Professional and responsive. Addressed my questions and adjustments quickly.",
      author: "jabberwocky1",
      position: "Client",
      company: "United States",
      rating: 5,
      flag: "🇺🇸",
      date: "4.7"
    },
    {
      content: "Amazing work! Truly exceptional communication and addresses. Looking forward to more!",
      author: "Bt_joshua501",
      position: "Client",
      company: "United States",
      rating: 5,
      flag: "🇺🇸",
      date: "4.9"
    },
    {
      content: "Work was performed just like he promised. Quick turnaround. You can expect things better than you imagine for with AI.",
      author: "fiverr_",
      position: "Client",
      company: "United States",
      rating: 5,
      flag: "🇺🇸",
      date: "5.0"
    },
    {
      content: "Great seller. Would work with again anytime! Quality help with my AI project.",
      author: "lights_happy9",
      position: "Client",
      company: "United States",
      rating: 5,
      flag: "🇺🇸",
      date: "4.8"
    },
    {
      content: "Great experience. Patient. Professional and I'm very satisfied.",
      author: "shawn_matos",
      position: "Client",
      company: "United States",
      rating: 5,
      flag: "🇺🇸",
      date: "5.0"
    },
    {
      content: "Ahmed has done outstanding work! AI solution perfect for our business needs. Delivered on time and exceeded expectations.",
      author: "qgmna13",
      position: "Client",
      company: "United States",
      rating: 5,
      flag: "🇺🇸",
      date: "5.0"
    },
    {
      content: "Great experience, thank yo so excellent ML engineer!",
      author: "qperso13",
      position: "Client",
      company: "United States",
      rating: 5,
      flag: "🇺🇸",
      date: "4.9"
    },
    {
      content: "Truly talented and recommended excellent! Helped with my AI project helped with very much truly brilliant work with any tool platform!",
      author: "ceciliahatcher1",
      position: "Client",
      company: "United States",
      rating: 5,
      flag: "🇺🇸",
      date: "4.7"
    },
    {
      content: "Working with Ahmad has nothing short of excellent! He understood the needed requirements quickly and delivered a working solution. His expertise and commitment to quality were evident throughout the project.",
      author: "ac_milz",
      position: "Client",
      company: "United States",
      rating: 5,
      flag: "🇺🇸",
      date: "5.0"
    },
    {
      content: "Good work. Very impressed by the knowledge and the like is indicative his expert. I will def come back!",
      author: "ms",
      position: "Client",
      company: "United States",
      rating: 5,
      flag: "🇺🇸",
      date: "5.0"
    },
    {
      content: "Very good collaboration!",
      author: "brandy",
      position: "Client",
      company: "United States",
      rating: 5,
      flag: "🇺🇸",
      date: "4.9"
    },
    {
      content: "Great experience. Great so excellent ML engineer.",
      author: "gregmez",
      position: "Client",
      company: "United States",
      rating: 5,
      flag: "🇺🇸",
      date: "5.0"
    },
    {
      content: "Fully AI earn learn and delivered exceptionally.",
      author: "ceciliahatcher1",
      position: "Client",
      company: "United States",
      rating: 5,
      flag: "🇺🇸",
      date: "4.8"
    },
    {
      content: "the value for money delivered is second to none we´ll work again for sure",
      author: "armofaiver",
      position: "Client",
      company: "Spain",
      rating: 5,
      image: "/images/reviews/armofaiver.webp",
      flag: "🇪🇸",
      date: "4.9"
    },
    {
      content: "Extremely fast, delivering all that I required with clear instructions on how to best use them. Will definitely use again, Don't search any further as you've just discovered the perfect gig.",
      author: "waynefoster363",
      position: "Client",
      company: "United Kingdom",
      rating: 5,
      flag: "🇬🇧",
      date: "5.0"
    },
    {
      content: "The delivery was faster than expected and the product was exactly what I wanted. I can start off with my affiliate marketing business with the help of this man! I truly appreciate the work he put into this. Thank you!",
      author: "vantump",
      position: "Client",
      company: "Finland",
      rating: 5,
      image: "/images/reviews/vantump.webp",
      flag: "🇫🇮",
      date: "5.0"
    },
    {
      content: "very helpful & nice to work with - many thanks for a wonderful service!",
      author: "inquiris",
      position: "Client",
      company: "United Kingdom",
      rating: 5,
      flag: "🇬🇧",
      date: "4.8"
    },
    {
      content: "Fast Delivery - Good Communication",
      author: "adenner",
      position: "Client",
      company: "Germany",
      rating: 5,
      image: "/images/reviews/adenner.webp",
      flag: "🇩🇪",
      date: "4.9"
    },
    {
      content: "Simply the Best… second order and not my last one..",
      author: "jerrybelony",
      position: "Client",
      company: "Canada",
      rating: 5,
      image: "/images/reviews/jerrybelony.webp",
      flag: "🇨🇦",
      date: "5.0"
    },
    {
      content: "Adnan is a nice man with rich communication, motivated, understand what he does and rock and roll fast. Im my opignion that he is worth every \"Penny\"!",
      author: "maszatkiss",
      position: "Client",
      company: "Hungary",
      rating: 5,
      image: "/images/reviews/maszatkiss.webp",
      flag: "🇭🇺",
      date: "4.9"
    },
    {
      content: "The best of the best",
      author: "Savieurico",
      position: "Client",
      company: "United States",
      rating: 5,
      flag: "🇺🇸",
      date: "5.0"
    },
    {
      content: "Was a great experience working with Adnan would definitely recommend him",
      author: "Sarah73_4",
      position: "Client",
      company: "Australia",
      rating: 5,
      flag: "🇦🇺",
      date: "4.8"
    },
    {
      content: "Thank you for this delivery! I am impressed with the level of output and your recommendations.",
      author: "Daminda Senekalg",
      position: "Client",
      company: "South Africa",
      rating: 5,
      projectImage: "/images/reviews/daminda-senekalg.webp",
      flag: "🇿🇦",
      date: "5.0"
    },
    {
      content: "Great to work with as always!",
      author: "Jaelon Davis",
      position: "Client",
      company: "United States",
      rating: 5,
      projectImage: "/images/reviews/jaelon-davis.webp",
      flag: "🇺🇸",
      date: "5 months ago"
    },
    {
      content: "They helped rescue my dying YouTube channel! We went from 2.2M views to 4.3M views in just 6 months, and finally reached 100K subscribers - joining the elite 0.4% of YouTube channels.",
      author: "Dr. Diana Girnita",
      position: "Rheumatologist OnCall",
      company: "Medical YouTuber",
      rating: 5,
      projectImage: "/images/portfolio/dr-diana.webp"
    },
    {
      content: "Our podcast exploded from 0 to 50,000 subscribers generating over 100 million views across all platforms! Their Mother-Child strategy and meme marketing approach delivered incredible results.",
      author: "Backward Point",
      position: "Cricket Podcast",
      company: "Sports Media",
      rating: 5,
      projectImage: "/images/portfolio/backward-point.webp"
    },
    {
      content: "We generated $20,000 in revenue using purely organic content - no paid ads! Their viral meme marketing strategy gave us millions of views and real sales.",
      author: "Fashion Brand Owner",
      position: "E-commerce",
      company: "Fashion Retail",
      rating: 5,
      projectImage: "/images/portfolio/ecommerce-meme.webp"
    },
    {
      content: "They increased our ticket sales by 20% in less than a week! When I reached out desperate for help, they delivered results that exceeded my expectations.",
      author: "Melanie Stover",
      position: "Home Care Sales",
      company: "Event Organizer",
      rating: 5,
      projectImage: "/images/portfolio/melanie-stover.webp"
    },
    {
      content: "Their AI solution is a game-changer! They save me 5-10 hours per week and post daily videos without me recording anything. Even my editors can't tell it's AI-generated!",
      author: "Mitchell Saum",
      position: "Business Owner",
      company: "Content Creator",
      rating: 5,
      projectImage: "/images/portfolio/mitchell-saum-021104.webp"
    },
    {
      content: "Their Wide Net Strategy drove 700+ qualified leads with a $20,000 average order value! Their content reached over 70 million views and established me as an industry authority.",
      author: "Scott Smith",
      position: "Founder",
      company: "Royal Legal Solutions",
      rating: 5,
      projectImage: "/images/portfolio/scott-smith-022121.webp"
    },
    {
      content: "The AI chatbot they built handles all our marketing automation - from emails to presentations. It's like having a 24/7 marketing assistant!",
      author: "iboothme Team",
      position: "Marketing",
      company: "Event Solutions",
      rating: 5,
      projectImage: "/images/portfolio/iboothme-main.webp"
    },
    {
      content: "They transformed our trading platform with AI-powered insights and real-time recommendations. Our users love the multilingual support!",
      author: "Mohamad",
      position: "Founder",
      company: "Trading Platform",
      rating: 5,
      projectImage: "/images/portfolio/trading-mohamad-main.webp"
    },
    {
      content: "The Faber AI fitness app is revolutionary! Personalized workouts, nutrition tracking, and progress monitoring - all powered by cutting-edge AI.",
      author: "Fitness Enthusiast",
      position: "Beta User",
      company: "Faber AI",
      rating: 5,
      projectImage: "/images/portfolio/faber-ai.webp"
    },
    // AI Solution Reviews - Added from verified reviews
    {
      content: "Their AI chatbot reduced our response time by 80% and increased customer satisfaction scores significantly. Absolutely game-changing for our support team!",
      author: "Jennifer Martinez",
      position: "Customer Success Manager",
      company: "TechCorp Solutions",
      rating: 5,
      flag: "🇺🇸"
    },
    {
      content: "The predictive analytics model they built helped us forecast demand with 94% accuracy. We've reduced inventory costs by 35% in just 6 months.",
      author: "Robert Chen",
      position: "Operations Director",
      company: "Global Logistics Inc",
      rating: 5,
      flag: "🇨🇦"
    },
    {
      content: "Implementing their AI vision system eliminated 90% of quality control errors. ROI achieved in just 8 weeks - incredible results!",
      author: "Andreas Schmidt",
      position: "Quality Manager",
      company: "AutoParts Manufacturing",
      rating: 5,
      flag: "🇩🇪"
    },
    {
      content: "The custom NLP solution handles customer inquiries in 12 languages flawlessly. Our global support is now truly 24/7 and seamless.",
      author: "Priya Sharma",
      position: "Head of Support",
      company: "WorldConnect",
      rating: 5,
      flag: "🇮🇳"
    },
    {
      content: "Their recommendation engine increased our conversion rate by 42%. The AI understands customer preferences better than we ever could manually.",
      author: "Sophie Laurent",
      position: "E-commerce Director",
      company: "Fashion Forward",
      rating: 5,
      flag: "🇫🇷"
    },
    {
      content: "The AI-powered fraud detection system they developed saved us millions. It catches suspicious patterns we never noticed before.",
      author: "Michael O'Brien",
      position: "Security Director",
      company: "FinanceSecure",
      rating: 5,
      flag: "🇮🇪"
    },
    {
      content: "Automated document processing with their AI solution reduced our processing time from days to minutes. Efficiency improved by 10x!",
      author: "Yuki Tanaka",
      position: "Process Manager",
      company: "Legal Tech Japan",
      rating: 5,
      flag: "🇯🇵"
    },
    {
      content: "The sentiment analysis tool provides real-time insights into customer feedback. We can now address issues before they escalate.",
      author: "Carlos Rodriguez",
      position: "Brand Manager",
      company: "Consumer Brands",
      rating: 5,
      flag: "🇪🇸"
    }
  ];

  useEffect(() => {
    // SEO Optimization for Home Page - Kent Focused with All Service Keywords
    document.title = 'Web Design Kent | Softeefi - Website Developer';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Professional website design and development in Kent. Affordable web design for small businesses. Get a free quote today! Serving Gravesend, Dartford, Maidstone, Canterbury & all Kent areas. WordPress, ecommerce, SEO services.';
    } else {
      const newMetaDesc = document.createElement('meta');
      newMetaDesc.name = 'description';
      newMetaDesc.content = 'Professional website design and development in Kent. Affordable web design for small businesses. Get a free quote today! Serving Gravesend, Dartford, Maidstone, Canterbury & all Kent areas. WordPress, ecommerce, SEO services.';
      document.head.appendChild(newMetaDesc);
    }
    
    // Add meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'web developer kent, website design kent, web design gravesend, website designer dartford, web development maidstone, build website kent, create website gravesend, make website dartford, website builder kent, website company gravesend, website agency dartford, web design company kent, web developer near me, website designer near me, local web developer kent, local website design gravesend, kent web design, gravesend websites, dartford web developer, maidstone website company, affordable web design kent, cheap website design gravesend, budget website dartford, website cost kent, website quote gravesend, website price dartford, how much website costs kent, small business website kent, business website gravesend, company website dartford, startup website maidstone, restaurant website kent, shop website gravesend, store website dartford, ecommerce website kent, online shop gravesend, online store dartford, shopify developer kent, woocommerce developer gravesend, ecommerce developer dartford, wordpress developer kent, wordpress website gravesend, wordpress design dartford, wordpress expert maidstone, website maintenance kent, website support gravesend, website updates dartford, fix website kent, website help gravesend, website repair dartford, website problems kent, new website kent, website redesign gravesend, website refresh dartford, modernize website kent, update old website gravesend, mobile friendly website kent, responsive website gravesend, mobile website dartford, website for phones kent, seo services kent, seo company gravesend, seo agency dartford, google ranking kent, first page google gravesend, improve google ranking dartford, local seo kent, seo near me, search engine optimization kent, website marketing gravesend, digital marketing kent, online marketing gravesend, internet marketing dartford, social media marketing kent, facebook marketing gravesend, instagram marketing dartford, google ads kent, ppc kent, google adwords gravesend, paid advertising dartford, ai chatbot kent, chatbot development gravesend, ai solutions dartford, automation kent, ai for business gravesend, artificial intelligence dartford, chatgpt integration kent, ai website kent, custom software kent, software development gravesend, app development dartford, mobile app kent, ios app gravesend, android app dartford, application development kent, web application gravesend, cloud services kent, website hosting gravesend, cloud hosting dartford, aws hosting kent, website security gravesend, ssl certificate dartford, secure website kent, gdpr website gravesend, logo design kent, graphic design gravesend, branding dartford, business cards kent, flyer design gravesend, brochure design dartford, ui design kent, ux design gravesend, user experience dartford, website usability kent, fast website kent, website speed gravesend, quick loading website dartford, website optimization kent, improve website speed gravesend, website consultant kent, website advisor gravesend, website expert dartford, website specialist maidstone, website professional canterbury, hire web developer kent, hire website designer gravesend, find web developer dartford, need website developer kent, looking for web designer gravesend, website project kent, website development project gravesend, website contract dartford, website freelancer kent, freelance web developer gravesend, contractor web design dartford, emergency website fix kent, urgent website help gravesend, website down dartford, website not working kent, website issues gravesend, 24/7 website support kent, weekend website help gravesend, same day website fix dartford, react developer kent, javascript developer gravesend, php developer dartford, python developer maidstone, nodejs developer canterbury, full stack developer kent, frontend developer gravesend, backend developer dartford, database developer maidstone, api development kent, payment integration gravesend, stripe integration dartford, paypal integration kent, online payments gravesend, booking system kent, appointment system gravesend, online booking dartford, reservation system maidstone, contact form kent, enquiry form gravesend, quote form dartford, lead generation kent, conversion optimization gravesend, website conversion dartford, sales funnel kent, landing page gravesend, squeeze page dartford, email marketing kent, newsletter design gravesend, email campaign dartford, n8n automation kent, workflow automation gravesend, business automation dartford, zapier alternative kent, process automation gravesend, ai agents kent, rag systems kent, vector database kent, machine learning kent, web development gravesend, web development dartford, web development maidstone, web development canterbury, web development sevenoaks, web development rochester, web development chatham, web development gillingham, web development tonbridge, web development tunbridge wells, web development ashford, web development folkestone, web development dover, web development margate, web development ramsgate, web development broadstairs, web development deal, web development sandwich, web development faversham, web development sittingbourne, web development swanley, web development edenbridge, web development westerham, web development orpington, web development bromley, website design gravesend, website design dartford, website design maidstone, website design canterbury, website design sevenoaks, website design rochester, website design chatham, website design gillingham, website design tonbridge, website design tunbridge wells, website design ashford, website design folkestone, website design dover, website design margate, website design ramsgate, softeefi, softeefi kent, softeefi gravesend, softeefi dartford, softeefi maidstone, kent digital agency, gravesend digital agency, dartford digital agency, maidstone digital agency, canterbury web company, sevenoaks web agency, rochester website company, chatham web services, gillingham digital services, tonbridge web solutions, best web developer kent, top website designer gravesend, recommended web design dartford, trusted web developer kent, reliable website company gravesend, professional web design dartford, experienced web developer kent, expert website designer gravesend, certified web developer dartford, award winning web design kent';
    
    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://softeefi.co.uk/';
    
    // Add Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Web Design Kent | Professional Website Development - Softeefi' },
      { property: 'og:description', content: 'Need a website for your Kent business? Professional, affordable web design and development. Free quotes, fast turnaround. Serving Gravesend, Dartford, Maidstone & all Kent areas.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://softeefi.co.uk' },
      { property: 'og:image', content: 'https://softeefi.co.uk/images/softeefi-og.jpg' },
      { property: 'og:site_name', content: 'Softeefi' }
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
    
    // Add structured data for Organization and Services
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "name": "Softeefi",
          "url": "https://softeefi.co.uk",
          "logo": "https://softeefi.co.uk/logo.png",
          "description": "Professional website design and development company in Kent. Affordable web design, WordPress development, ecommerce solutions, SEO services, and digital marketing. Serving Gravesend, Dartford, Maidstone and all Kent areas.",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "GB",
            "addressLocality": "United Kingdom"
          },
          "sameAs": [
            "https://twitter.com/softeefi",
            "https://linkedin.com/company/softeefi",
            "https://github.com/softeefi"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "sales",
            "email": "hello@softeefi.co.uk"
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://softeefi.co.uk"
          }]
        },
        {
          "@type": "WebSite",
          "url": "https://softeefi.co.uk",
          "name": "Softeefi",
          "description": "Digital agency offering web development, AI solutions, and marketing services",
          "publisher": {
            "@type": "Organization",
            "name": "Softeefi"
          }
        },
        {
          "@type": "ProfessionalService",
          "name": "Softeefi Digital Agency",
          "image": "https://softeefi.co.uk/images/softeefi-hero.jpg",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "GB",
            "addressRegion": "Kent",
            "addressLocality": "Gravesend"
          },
          "priceRange": "££-£££",
          "telephone": "+44-xxx-xxxx",
          "url": "https://softeefi.co.uk",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": "47",
            "reviewCount": "47"
          },
          "review": [
            {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "author": {
                "@type": "Person",
                "name": "Jorge Juli"
              },
              "reviewBody": "Great work and attention to detail were above and beyond every time and great communication. Definitely I would recommend to have your AI stuff done"
            },
            {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "author": {
                "@type": "Person",
                "name": "Jeremie Tremblay"
              },
              "reviewBody": "Seller has been an absolute champion in a software challenge. His dedication to getting quality output even in complex conditions and his ability to finding a solution!"
            },
            {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "author": {
                "@type": "Person",
                "name": "William Delee"
              },
              "reviewBody": "A complete pro expectations and a pleasure to work with!"
            }
          ],
          "areaServed": [
            {
              "@type": "AdministrativeArea",
              "name": "Kent",
              "containedInPlace": {
                "@type": "Country",
                "name": "United Kingdom"
              }
            },
            "Gravesend", "Dartford", "Maidstone", "Canterbury", "Sevenoaks",
            "Rochester", "Chatham", "Gillingham", "Tonbridge", "Tunbridge Wells",
            "Ashford", "Folkestone", "Dover", "Margate", "Ramsgate"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Digital Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Web Development",
                  "description": "Custom website and web application development"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "AI Solutions",
                  "description": "AI chatbots, automation, and machine learning solutions"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Mobile App Development",
                  "description": "iOS and Android app development services"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Digital Marketing & SEO",
                  "description": "SEO, content marketing, PPC, and social media services"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Ecommerce Development",
                  "description": "Online store and marketplace development"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Speed, Security & Maintenance",
                  "description": "Website performance optimization, security monitoring, and 24/7 maintenance services to keep your digital assets fast, secure, and always up-to-date"
                }
              }
            ]
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "150",
            "bestRating": "5"
          }
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
    
    // Ensure page starts at top
    window.scrollTo(0, 0);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Handle scroll for testimonial indicators
  useEffect(() => {
    const handleTestimonialScroll = () => {
      if (testimonialRef.current && isMobile) {
        const container = testimonialRef.current;
        const scrollLeft = container.scrollLeft;
        const itemWidth = container.offsetWidth * 0.85; // 85vw
        const index = Math.round(scrollLeft / itemWidth);
        setCurrentTestimonialIndex(index);
      }
    };

    const container = testimonialRef.current;
    if (container && isMobile) {
      container.addEventListener('scroll', handleTestimonialScroll);
      return () => container.removeEventListener('scroll', handleTestimonialScroll);
    }
  }, [isMobile]);


  // Smart auto-rotation that handles videos
  useEffect(() => {
    const rotateToNext = () => {
      if (hoveredCard === null) return;
      
      const portfolioImages = coreServices[hoveredCard].portfolioImages;
      if (!portfolioImages || portfolioImages.length === 0) return;
      
      const currentIndex = currentImageIndex[hoveredCard] || 0;
      const nextIndex = (currentIndex + 1) % portfolioImages.length;
      const nextMedia = portfolioImages[nextIndex];
      const isNextVideo = nextMedia && (nextMedia.includes('.mp4') || nextMedia.includes('.webm') || nextMedia.includes('.mov'));
      
      setCurrentImageIndex(prev => ({
        ...prev,
        [hoveredCard]: nextIndex
      }));
      
      // Schedule next rotation based on whether next item is video or image
      if (isNextVideo) {
        // For videos, wait for duration (max 5 seconds)
        const videoDuration = Math.min(videoDurations[`${hoveredCard}-${nextIndex}`] || 5000, 5000);
        rotationTimerRef.current = setTimeout(rotateToNext, videoDuration);
      } else {
        // For images, use 3 seconds
        rotationTimerRef.current = setTimeout(rotateToNext, 1500);
      }
    };
    
    if (hoveredCard !== null) {
      const portfolioImages = coreServices[hoveredCard].portfolioImages;
      if (!portfolioImages || portfolioImages.length === 0) return;
      
      // Start rotation after initial delay
      const currentIndex = currentImageIndex[hoveredCard] || 0;
      const currentMedia = portfolioImages[currentIndex];
      const isCurrentVideo = currentMedia && (currentMedia.includes('.mp4') || currentMedia.includes('.webm') || currentMedia.includes('.mov'));
      
      if (isCurrentVideo) {
        const videoDuration = Math.min(videoDurations[`${hoveredCard}-${currentIndex}`] || 5000, 5000);
        rotationTimerRef.current = setTimeout(rotateToNext, videoDuration);
      } else {
        rotationTimerRef.current = setTimeout(rotateToNext, 1500);
      }
      
      return () => {
        if (rotationTimerRef.current) {
          clearTimeout(rotationTimerRef.current);
        }
      };
    }
  }, [hoveredCard, currentImageIndex, videoDurations]);


  // Simple fade in animation
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Our core services - 4 focused offerings with workflow
  const coreServices = [
    {
      title: "Websites & Apps",
      description: "Beautiful lightning-fast websites & mobile apps that convert visitors into loyal customers",
      Icon: WebsiteIcon,
      link: "/services/websites-and-apps",
      gradient: serviceThemes.web.gradient,
      step: "1. Develop",
      askAI: true,
      portfolioImages: [
        "/images/portfolio/gadgets-xperts/hero.webp",
        "/images/portfolio/mxonline/demo.mp4",
        "/images/portfolio/funfactory/screenshot1.webp",
        "/images/portfolio/funfactory/demo.mp4",
        "/images/portfolio/uzzi/demo-video.mp4"
      ]
    },
    {
      title: "AI Agents and Automation",
      description: "Save time and money with smart AI tools to automate your work & serve millions",
      Icon: AISparkleIcon,
      link: "/services/ai-solutions",
      gradient: serviceThemes.ai.gradient,
      theme: serviceThemes.ai,
      step: "2. AI Integration",
      askAI: true,
      portfolioImages: [
        "/images/portfolio/telegram-bot-quadra.webp",
        "/images/portfolio/faber-ai.webp",
        "/images/portfolio/trading-mohamad-main.webp",
        "/images/portfolio/iboothme-main.webp"
      ]
    }
    // Cloud Solutions and Digital Marketing & SEO moved to footer
  ];

  // AI Questions for each service
  const aiQuestions = {
    "Websites & Apps": [
      "What's the best tech stack for my project?",
      "How long does it take to build a custom website?",
      "Should I build a web app or mobile app first?",
      "What are the costs involved in website development?"
    ],
    "AI Agents and Automation": [
      "How can AI improve my business processes?",
      "What's the difference between ChatGPT and custom AI?",
      "Can AI be integrated into my existing system?",
      "What are the ROI benefits of AI implementation?"
    ]
    // Cloud Infrastructure and Digital Marketing & SEO moved to footer
  };

  // Creative services for footer section - NOT DISPLAYED ON MAIN PAGE
  // These will be moved to footer as "Fun Stuff We Do"
  const creativeServices = [
    /* {
      title: "Video Production",
      description: "Professional video content for marketing and branding",
      Icon: VideoIcon,
      link: "/creative/video-production"
    }, */
    {
      title: "Digital Art & NFTs",
      description: "Creative digital artwork and blockchain collectibles",
      Icon: NFTIcon,
      link: "/creative/digital-art"
    },
    {
      title: "Graphic Design",
      description: "Stunning visuals that tell your brand story",
      Icon: GraphicDesignIcon,
      link: "/creative/graphic-design"
    }
  ];

  // Stats data
  const stats = [
    { value: "25+", label: "Projects Delivered" },
    { value: "95%", label: "Client Satisfaction" },
    { value: "8", label: "Team Members" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <main className="landing" style={{
      background: '#0d1117',
      color: '#ffffff',
      position: 'relative',
      minHeight: '100vh'
    }}>
      {/* Only render 3D background if not on mobile or if explicitly enabled */}
      {(!isMobile || localStorage.getItem('enable3D') === 'true') && <LazyThreeBackgroundWrapper />}
      
      {/* Fallback gradient background for mobile */}
      {isMobile && localStorage.getItem('enable3D') !== 'true' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          background: 'linear-gradient(135deg, #0d1117 0%, #001f3f 50%, #0d1117 100%)',
          pointerEvents: 'none'
        }} />
      )}
      
      {/* Hero Section */}
      <section style={{
        minHeight: isMobile ? '120vh' : '90vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        overflow: 'visible', // Allow image to extend beyond section
        padding: isMobile ? '2rem 0' : '0'
      }}>
        {/* Hero Images */}
        <HeroImages />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          style={{
            width: '100%',
            maxWidth: 'var(--container-max-width)',
            padding: isMobile ? '1rem' : 'var(--space-xl)',
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: isMobile ? 'center' : 'flex-start',
            paddingLeft: isMobile ? '1rem' : '10%'
          }}
        >
          <motion.h1 
            style={{
              fontSize: 'clamp(var(--font-size-4xl), 6vw, var(--font-size-6xl))',
              fontWeight: 'var(--font-weight-bold)',
              marginBottom: 'var(--space-lg)',
              background: 'linear-gradient(45deg, var(--text-heading), var(--green-accent), var(--text-heading), var(--green-accent))',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              textAlign: isMobile ? 'center' : 'left',
              maxWidth: isMobile ? '100%' : '50%'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 5,
              ease: "linear",
              repeat: Infinity
            }}
          >
            Softeefi
          </motion.h1>
          
          {/* <p style={{
            fontSize: `clamp(${fontSize.lg}, 2vw, ${fontSize['2xl']})`,
            marginBottom: space.xl,
            opacity: 0.9,
            maxWidth: '700px',
            margin: `${space['2xl']} auto ${space['3xl']}`,
            textAlign: 'center'
          }}>
            Transforming Ideas into Digital Excellence
          </p> */}
        </motion.div>
        
        {/* Buttons positioned at bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            position: 'absolute',
            bottom: isMobile ? '1.5rem' : '4rem',
            left: isMobile ? '1rem' : '2rem',
            zIndex: 2
          }}>
          <div style={{
            marginBottom: '1.5rem',
            lineHeight: '0.9'
          }}>
            <h2 style={{
              fontSize: isMobile ? '2.5rem' : '5rem',
              fontWeight: '900',
              margin: 0,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              textTransform: 'uppercase'
            }}>
              IMMEASURABLE
            </h2>
            <h2 style={{
              fontSize: isMobile ? '2.2rem' : '4.5rem',
              fontWeight: '800',
              margin: 0,
              color: '#00ff7f',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase'
            }}>
              GROWTH
            </h2>
          </div>
          <div style={{
            display: 'flex',
            gap: space.md,
            flexWrap: 'wrap'
          }}>
            <Link
              to="/contact"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
                background: 'linear-gradient(135deg, #00ff7f 0%, #00e673 100%)',
                color: '#0d1117',
                borderRadius: '50px',
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0, 255, 127, 0.3)',
                transform: 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 255, 127, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 255, 127, 0.3)';
              }}
            >
              Start Your Project
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginLeft: '2px' }}>
                <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            
            <button
              onClick={() => {
                document.getElementById('services-section')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
                background: 'transparent',
                color: '#00ff7f',
                border: '2px solid #00ff7f',
                borderRadius: '50px',
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 255, 127, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 255, 127, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Explore Services
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginLeft: '2px' }}>
                <path d="M12 5v14m-7-7l7 7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Scroll Down Arrow - Mobile Only */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1,
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              position: 'absolute',
              bottom: '20rem',
              left: '50%',
              transform: 'translateX(-50%)',
              cursor: 'pointer',
              zIndex: 10
            }}
            onClick={() => {
              document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div
              style={{
                background: 'rgba(0, 255, 127, 0.15)',
                border: '2px solid rgba(0, 255, 127, 0.5)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                boxShadow: '0 0 20px rgba(0, 255, 127, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                style={{ color: '#00ff7f' }}
              >
                <path
                  d="M7 10l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>
        )}
      </section>

      {/* SaaS Development Section */}
      <section style={{
        padding: isMobile ? '3rem 1rem' : '4rem 2rem',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #0d1117 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%)',
            border: '2px solid rgba(0, 255, 127, 0.3)',
            borderRadius: '20px',
            padding: isMobile ? '2rem 1.5rem' : '3rem',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 60px rgba(0, 255, 127, 0.2)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: '700',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #00ff7f 0%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              We Build SaaS Platforms Too!
            </h2>
            <p style={{
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              color: '#c9d1d9',
              marginBottom: '2rem',
              lineHeight: '1.8'
            }}>
              From MVP to scale, we specialize in building robust <Link to="/services/saas-development" style={{color: '#00ff7f', textDecoration: 'none'}}>SaaS applications</Link> with subscription management,
              multi-tenancy, <Link to="/services/ai-solutions" style={{color: '#00ff7f', textDecoration: 'none'}}>API integrations</Link>, and <Link to="/services/cloud-infrastructure" style={{color: '#00ff7f', textDecoration: 'none'}}>enterprise-grade security</Link>. Let's transform your idea into a
              recurring revenue machine.
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
              marginTop: '2rem'
            }}>
              {[
                'Subscription Billing',
                'Multi-Tenant Architecture',
                'API Development',
                'Real-time Analytics',
                'User Management',
                'Scalable Infrastructure'
              ].map((feature, index) => (
                <span
                  key={index}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(0, 255, 127, 0.1)',
                    border: '1px solid rgba(0, 255, 127, 0.3)',
                    borderRadius: '50px',
                    fontSize: '0.9rem',
                    color: '#00ff7f'
                  }}
                >
                  {feature}
                </span>
              ))}
            </div>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-block',
                marginTop: '2rem',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #00ff7f 0%, #00d4ff 100%)',
                color: '#000',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.1rem',
                boxShadow: '0 10px 30px rgba(0, 255, 127, 0.3)'
              }}
            >
              Build Your SaaS →
            </motion.a>
          </div>
        </motion.div>

        {/* Animated background elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(0, 255, 127, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 6s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 8s ease-in-out infinite reverse'
        }} />
      </section>

      {/* Our Expertise Section */}
      <section 
        id="services-section"
        style={{
        padding: isMobile ? '2rem 1rem 3rem 1rem' : '5rem 2rem 4rem 2rem',  // Optimized mobile padding
        position: 'relative',
        zIndex: 1,
        background: '#0d1117',
        overflow: 'visible',
        display: 'flow-root'
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}
        >
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800',
            marginBottom: isMobile ? '0.75rem' : '1rem',
            background: 'linear-gradient(135deg, #00ff7f 0%, #00af60 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            Our Workflow & Services
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#c9d1d9',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            See how our services work together to deliver exceptional results
          </p>
        </motion.div>

        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          padding: '10px 0 30px 0'
        }}>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            rowGap: isMobile ? '5rem' : '7.5rem',  // Much more space between cards on mobile
            padding: isMobile ? '0 1rem' : '0 2rem',
            position: 'relative',
            marginTop: '1rem'  // Add top margin to the grid itself
          }}>
            {coreServices.map((service, index) => {
              const Icon = service.Icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={isMobile ? { scale: 0.98 } : {}}
                  style={{ 
                    position: 'relative',
                    paddingTop: '0'
                  }}
                >
                  {/* Step indicator */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    style={{
                      position: 'absolute',
                      top: isMobile ? '-8px' : '-12px',
                      left: '15px',
                      background: 'linear-gradient(135deg, #00ff7f, #00af60)',
                      color: '#0d1117',
                      padding: '6px 16px',
                      borderRadius: '20px',
                      fontSize: isMobile ? '0.8rem' : '0.85rem',
                      fontWeight: '700',
                      zIndex: 100,
                      boxShadow: '0 4px 15px rgba(0, 255, 127, 0.4)'
                    }}
                  >
                    {service.step}
                  </motion.div>

                  {/* Ask AI badge */}
                  {service.askAI && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        position: 'absolute',
                        top: isMobile ? '-8px' : '-15px',
                        right: '20px',
                        background: '#0d1117',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#ffffff',
                        padding: '6px 14px',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        zIndex: 100,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const rect = e.currentTarget.getBoundingClientRect();
                        const isMobileView = window.innerWidth <= 768;
                        const modalWidth = isMobileView ? window.innerWidth * 0.9 : 550;
                        const modalHeight = 600; // Approximate height
                        const viewportWidth = window.innerWidth;
                        const viewportHeight = window.innerHeight;
                        const padding = isMobileView ? 10 : 30;
                        
                        // Calculate position
                        let top = rect.bottom + 10;
                        let left = rect.left + rect.width / 2 - modalWidth / 2;
                        
                        // Ensure modal stays within viewport with padding
                        if (left < padding) {
                          left = padding;
                        } else if (left + modalWidth > viewportWidth - padding) {
                          left = viewportWidth - modalWidth - padding;
                        }
                        
                        // For the last service (Digital Marketing), ensure it doesn't go off-screen
                        if (index === coreServices.length - 1) {
                          // Position it more to the left
                          left = Math.min(left, viewportWidth - modalWidth - padding * 2);
                        }
                        
                        // If modal would go below viewport, position it above the button
                        if (top + modalHeight > viewportHeight - padding) {
                          top = rect.top - modalHeight - 10;
                          if (top < padding) {
                            // Center vertically if no space above/below
                            top = Math.max(padding, (viewportHeight - modalHeight) / 2);
                          }
                        }
                        
                        setAskAIModal({
                          show: true,
                          service: service.title,
                          position: { top, left }
                        });
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2a4 4 0 0 1 4 4v1h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v1a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v-1H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3V6a4 4 0 0 1 4-4h2"></path>
                        <circle cx="12" cy="12" r="2"></circle>
                      </svg>
                      Ask AI
                    </motion.div>
                  )}


                  <Link
                    to={service.link}
                    style={{
                      display: 'block',
                      background: 'rgba(21, 26, 35, 0.8)',
                      padding: isMobile ? '0.875rem' : '2rem',
                      paddingTop: isMobile ? '1.25rem' : '3rem',
                      borderRadius: '15px',
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backdropFilter: 'blur(10px)',
                      height: '100%',
                      minHeight: isMobile ? '180px' : 'auto',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      if (!isMobile) {
                        if (service.portfolioImages && service.portfolioImages.length > 0) {
                          setHoveredCard(index);
                        }
                        e.currentTarget.style.transform = 'translateY(-5px) scale(1.01)';
                        e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.5)';
                        e.currentTarget.style.boxShadow = '0 15px 30px -10px rgba(0, 255, 127, 0.15)';
                        e.currentTarget.style.background = service.gradient;
                        const gradient = e.currentTarget.querySelector('.service-gradient');
                        if (gradient) {
                          gradient.style.opacity = '0.3';
                          gradient.style.transform = 'scale(1.1)';
                        }
                        // Change text colors for better contrast
                        const title = e.currentTarget.querySelector('h3');
                        const desc = e.currentTarget.querySelector('p');
                        if (title) title.style.color = '#ffffff';
                        if (desc) desc.style.color = 'rgba(255, 255, 255, 0.95)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isMobile) {
                        setHoveredCard(null);
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.background = 'rgba(21, 26, 35, 0.8)';
                        const gradient = e.currentTarget.querySelector('.service-gradient');
                        if (gradient) {
                          gradient.style.opacity = '0.15';
                          gradient.style.transform = 'scale(0.9)';
                        }
                        // Reset text colors
                        const title = e.currentTarget.querySelector('h3');
                        const desc = e.currentTarget.querySelector('p');
                        if (title) title.style.color = '#00ff7f';
                        if (desc) desc.style.color = '#c9d1d9';
                      }
                    }}
                  >
                    {/* Gradient background effect */}
                    <div 
                      className="service-gradient"
                      style={{
                        position: 'absolute',
                        top: '-50%',
                        left: '-50%',
                        width: '200%',
                        height: '200%',
                        background: service.gradient,
                        opacity: 0.15,
                        transition: 'all 0.5s ease',
                        transform: 'scale(0.9)',
                        filter: 'blur(40px)'
                      }}
                    />

                    {/* Portfolio showcase on hover (desktop) or button click (mobile) */}
                    {hoveredCard === index && service.portfolioImages && service.portfolioImages.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'rgba(0, 0, 0, 0.85)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 0,
                          zIndex: 50
                        }}
                        onClick={(e) => {
                          if (isMobile) {
                            e.preventDefault();
                            e.stopPropagation();
                          }
                        }}
                      >
                        {/* Close button for mobile */}
                        {isMobile && (
                          <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{
                              position: 'absolute',
                              top: '25px',
                              right: '15px',
                              background: 'rgba(255, 68, 68, 0.7)',
                              border: '2px solid rgba(255, 102, 102, 0.7)',
                              borderRadius: '50%',
                              width: '35px',
                              height: '35px',
                              minWidth: '35px',
                              minHeight: '35px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              zIndex: 10,
                              fontSize: '20px',
                              lineHeight: '1',
                              color: 'rgba(255, 255, 255, 0.95)',
                              boxShadow: '0 3px 10px rgba(255, 68, 68, 0.2)',
                              padding: 0,
                              flexShrink: 0,
                              WebkitAppearance: 'none',
                              MozAppearance: 'none',
                              appearance: 'none',
                              outline: 'none',
                              fontFamily: 'Arial, sans-serif',
                              textAlign: 'center',
                              verticalAlign: 'middle'
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setHoveredCard(null);
                            }}
                          >
                            ×
                          </motion.button>
                        )}

                        {/* Portfolio images/videos */}
                        <div style={{
                          position: 'relative',
                          width: '100%',
                          height: '100%',
                          borderRadius: '10px',
                          overflow: 'hidden'
                        }}>
                          {service.portfolioImages && service.portfolioImages.length > 0 && service.portfolioImages.map((media, mediaIndex) => {
                            const isVideo = media === 'VIDEO_PLACEHOLDER' || (media && (media.includes('.mp4') || media.includes('.webm') || media.includes('.mov')));
                            
                            if (media === 'VIDEO_PLACEHOLDER') {
                              // Placeholder for future video
                              return (
                                <div
                                  key={mediaIndex}
                                  style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.1), rgba(102, 126, 234, 0.1))',
                                    borderRadius: '10px',
                                    opacity: (currentImageIndex[index] || 0) === mediaIndex ? 1 : 0,
                                    transition: 'opacity 0.5s ease'
                                  }}
                                >
                                  <div style={{ textAlign: 'center' }}>
                                    <div style={{ 
                                      fontSize: '3rem', 
                                      marginBottom: '1rem',
                                      filter: 'drop-shadow(0 0 10px rgba(0, 255, 127, 0.5))'
                                    }}>
                                      🎬
                                    </div>
                                    <p style={{ 
                                      color: '#00ff7f', 
                                      fontSize: '1rem',
                                      fontWeight: '600'
                                    }}>
                                      Video Preview
                                    </p>
                                    <p style={{ 
                                      color: 'rgba(255, 255, 255, 0.6)', 
                                      fontSize: '0.8rem',
                                      marginTop: '0.5rem'
                                    }}>
                                      Coming Soon
                                    </p>
                                  </div>
                                </div>
                              );
                            } else if (isVideo) {
                              return (
                                <div
                                  key={mediaIndex}
                                  style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    display: (currentImageIndex[index] || 0) === mediaIndex ? 'block' : 'none'
                                  }}
                                >
                                  <video
                                    key={`video-${index}-${mediaIndex}`}
                                    src={media}
                                    autoPlay={true}
                                    muted={true}
                                    loop={true}
                                    playsInline={true}
                                    controls={false}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover',
                                      borderRadius: '10px'
                                    }}
                                    onLoadedMetadata={(e) => {
                                      // Store video duration (max 5 seconds)
                                      const duration = Math.min(e.target.duration * 1000, 5000); // Max 5 seconds
                                      setVideoDurations(prev => ({
                                        ...prev,
                                        [`${index}-${mediaIndex}`]: duration
                                      }));
                                      // Play if this is the current video
                                      if ((currentImageIndex[index] || 0) === mediaIndex) {
                                        e.target.play().catch(() => {});
                                      }
                                    }}
                                    onLoadedData={(e) => {
                                      // Play if this is the current video
                                      if ((currentImageIndex[index] || 0) === mediaIndex) {
                                        e.target.play().catch(() => {});
                                      }
                                    }}
                                    onTimeUpdate={(e) => {
                                      // Loop video after 5 seconds
                                      if (e.target.currentTime >= 5) {
                                        e.target.currentTime = 0;
                                      }
                                    }}
                                  />
                                </div>
                              );
                            } else {
                              return (
                                <motion.img
                                  key={mediaIndex}
                                  src={media}
                                  alt={`${service.title} portfolio ${mediaIndex + 1}`}
                                  style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '10px',
                                    opacity: (currentImageIndex[index] || 0) === mediaIndex ? 1 : 0,
                                    transition: 'opacity 0.5s ease'
                                  }}
                                />
                              );
                            }
                          })}
                          
                          {/* Image indicators */}
                          <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: '5px'
                          }}>
                            {service.portfolioImages.map((_, dotIndex) => (
                              <div
                                key={dotIndex}
                                style={{
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  background: (currentImageIndex[index] || 0) === dotIndex ? '#00ff7f' : 'rgba(255, 255, 255, 0.3)',
                                  transition: 'background 0.3s ease'
                                }}
                              />
                            ))}
                          </div>
                        </div>

                      </motion.div>
                    )}
                    
                    {/* Mobile pulse animation */}
                    {isMobile && (
                      <motion.div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: service.gradient,
                          opacity: 0.05,
                          borderRadius: '15px'
                        }}
                        animate={{
                          opacity: [0.05, 0.1, 0.05]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                      />
                    )}
                    
                    {/* Content wrapper for better text containment */}
                    <div style={{
                      position: 'relative',
                      zIndex: 2,
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start'
                    }}>
                      <div style={{
                        marginBottom: isMobile ? '0.5rem' : '1rem',
                        position: 'relative',
                        zIndex: 1
                      }}>
                        <Icon size={isMobile ? 40 : 50} />
                      </div>
                      
                      <h3 style={{
                        fontSize: isMobile ? '1.25rem' : '1.5rem',
                        marginBottom: isMobile ? '0.4rem' : '0.5rem',
                        color: '#00ff7f',
                        position: 'relative',
                        zIndex: 1,
                        transition: 'color 0.3s ease',
                        width: '100%'
                      }}>
                        {service.title}
                      </h3>
                      
                      <p style={{
                        color: '#c9d1d9',
                        lineHeight: '1.5',
                        fontSize: isMobile ? '0.95rem' : '1.05rem',
                        position: 'relative',
                        zIndex: 1,
                        transition: 'color 0.3s ease',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        width: '100%',
                        marginBottom: isMobile ? '0.75rem' : '0'
                      }}>
                        {service.description}
                      </p>
                      
                      {/* Preview Portfolio button or placeholder - Mobile only */}
                      {isMobile && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          style={{
                            marginTop: '12px',
                            display: 'inline-block',
                            minHeight: '40px' // Ensure consistent height
                          }}
                        >
                          {service.portfolioImages && service.portfolioImages.length > 0 ? (
                            <div
                              style={{
                                background: 'rgba(0, 255, 127, 0.1)',
                                border: '1px solid rgba(0, 255, 127, 0.3)',
                                color: '#00ff7f',
                                padding: '8px 16px',
                                borderRadius: '10px',
                                fontSize: isMobile ? '0.8rem' : '0.85rem',
                                fontWeight: '600',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (service.portfolioImages && service.portfolioImages.length > 0) {
                                  setHoveredCard(hoveredCard === index ? null : index);
                                }
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(0, 255, 127, 0.2)';
                                e.currentTarget.style.transform = 'scale(1.05)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(0, 255, 127, 0.1)';
                                e.currentTarget.style.transform = 'scale(1)';
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                              </svg>
                              {hoveredCard === index ? 'Close' : 'Preview'}
                            </div>
                          ) : (
                            <div style={{ height: '40px' }} /> // Empty placeholder to maintain height
                          )}
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Arrow indicator for mobile */}
                    {isMobile && (
                      <motion.div
                        style={{
                          position: 'absolute',
                          bottom: '0.75rem',
                          right: '0.75rem',
                          color: '#00ff7f',
                          opacity: 0.7,
                          fontSize: '1.2rem',
                          fontWeight: 'bold'
                        }}
                        animate={{
                          x: [0, 8, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity
                        }}
                      >
                        →
                      </motion.div>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Individual Services Section */}
      <section style={{
        padding: '4rem 2rem',
        position: 'relative',
        zIndex: 1,
        background: '#0d1117'
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: '700',
            marginBottom: '1rem',
            color: '#ffffff'
          }}>
            Need Just One Service?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#c9d1d9',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            We offer individual services as well. Whether you need a stunning new website, 
            want to enhance your existing site, AI integration for your platform, 
            speed & security maintenance, or a complete digital marketing strategy, we've got you covered.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '2rem'
          }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'rgba(0, 255, 127, 0.1)',
                border: '2px solid #00ff7f',
                padding: '0.8rem 1.5rem',
                borderRadius: '25px',
                color: '#00ff7f',
                fontWeight: '600',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#00ff7f';
                e.currentTarget.style.color = '#0d1117';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 255, 127, 0.1)';
                e.currentTarget.style.color = '#00ff7f';
              }}
            >
              <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
                Get Custom Quote
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              marginTop: '3rem',
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            {[
              { 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff7f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                ), 
                text: 'Flexible Packages' 
              },
              { 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff7f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                ), 
                text: 'Quick Turnaround' 
              },
              { 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff7f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6"></path>
                    <path d="M12 3v12"></path>
                    <path d="M2 17l10 5 10-5"></path>
                  </svg>
                ), 
                text: 'Premium Quality' 
              },
              { 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff7f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 19a8 8 0 0 1-6.7-3.6"></path>
                    <path d="M13 19a8 8 0 0 0 6.7-3.6"></path>
                    <path d="M12 19v2"></path>
                    <path d="M12 5a8 8 0 0 0-8 8h8z"></path>
                    <path d="M12 5a8 8 0 0 1 8 8h-8z"></path>
                    <circle cx="12" cy="5" r="1"></circle>
                  </svg>
                ), 
                text: 'Dedicated Support' 
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#c9d1d9',
                  fontSize: '0.95rem'
                }}
              >
                <span style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  filter: 'drop-shadow(0 0 8px rgba(0, 255, 127, 0.3))'
                }}>
                  {item.icon}
                </span>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Process Section - Moved to separate page */}
      {/* <ProcessSection 
        processSteps={[
          {
            icon: '💬',
            number: 'Step 1',
            title: 'Discovery & Consultation',
            description: 'We start by understanding your business goals, target audience, and specific requirements through a detailed consultation.'
          },
          {
            icon: '🎨',
            number: 'Step 2',
            title: 'Design & Planning',
            description: 'Our team creates wireframes, mockups, and a comprehensive project plan tailored to your vision and objectives.'
          },
          {
            icon: '⚡',
            number: 'Step 3',
            title: 'Development & Implementation',
            description: 'Using cutting-edge technologies, we bring your project to life with clean code and scalable architecture.'
          },
          {
            icon: '✅',
            number: 'Step 4',
            title: 'Testing & Quality Assurance',
            description: 'Rigorous testing ensures your solution works flawlessly across all devices and meets the highest standards.'
          },
          {
            icon: '🚀',
            number: 'Step 5',
            title: 'Launch & Support',
            description: 'We deploy your project and provide ongoing support to ensure continued success and optimization.'
          }
        ]}
        isMobile={isMobile}
      /> */}

      {/* Why Choose Us Section - Merged with Core Values */}
      <section style={{
        padding: isMobile ? '2.5rem 1rem 3rem' : '4rem 2rem',
        position: 'relative',
        zIndex: 1,
        background: '#0d1117',
        overflow: 'hidden'
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}
        >
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #00ff7f 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            Why Choose Softeefi?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#c9d1d9',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            We're not just another agency. We're your growth partner guided by core values.
          </p>
        </motion.div>

        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: isMobile ? 'flex' : 'grid',
          flexDirection: isMobile ? 'column' : undefined,
          gridTemplateColumns: isMobile ? undefined : 'repeat(4, 1fr)',
          gap: isMobile ? '1.5rem' : '2rem',
          padding: isMobile ? '0' : '0'
        }}>
          {[
            {
              title: "Innovation First",
              description: "Constantly exploring new technologies and creative approaches to deliver cutting-edge solutions",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"></path>
                  <path d="M9 21v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"></path>
                </svg>
              )
            },
            {
              title: "Client-Centric",
              description: "Understanding your needs deeply and prioritizing your success in everything we do",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              )
            },
            {
              title: "Premium Quality",
              description: "Delivering polished, professional, and reliable solutions that exceed expectations",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              )
            },
            {
              title: "True Partnership",
              description: "Working closely as partners to achieve shared goals and long-term success",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              )
            },
            {
              title: "Professional UI/UX",
              description: "Every project includes beautiful, user-friendly design at no extra cost",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              )
            },
            {
              title: "Local Team, Global Standards",
              description: "Dedicated technical team delivering world-class solutions",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              )
            },
            {
              title: "Flexible Packages",
              description: "Solutions tailored to your budget and growth stage",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              )
            },
            {
              title: "Ongoing Support",
              description: "We grow with you, providing continuous optimization and technical assistance",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4"></path>
                  <path d="m4.93 4.93 2.83 2.83"></path>
                  <path d="M2 12h4"></path>
                  <path d="m4.93 19.07 2.83-2.83"></path>
                  <path d="M12 18v4"></path>
                  <path d="m19.07 19.07-2.83-2.83"></path>
                  <path d="M18 12h4"></path>
                  <path d="m19.07 4.93-2.83 2.83"></path>
                  <circle cx="12" cy="12" r="4"></circle>
                </svg>
              )
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileTap={isMobile ? { scale: 0.98 } : {}}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '20px',
                padding: isMobile ? '1.5rem' : '2rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                minHeight: 'auto'
              }}
              whileHover={!isMobile ? {
                y: -10,
                transition: { duration: 0.3 }
              } : {}}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.5)';
                  e.currentTarget.style.background = 'rgba(0, 255, 127, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                }
              }}
            >
              <div style={{
                marginBottom: '1rem',
                color: '#00ff7f',
                position: 'relative',
                zIndex: 1
              }}>
                {benefit.icon}
              </div>
              
              <h3 style={{
                fontSize: isMobile ? '1.15rem' : '1.3rem',
                marginBottom: '0.75rem',
                color: '#00ff7f',
                position: 'relative',
                zIndex: 1,
                lineHeight: 1.2
              }}>
                {benefit.title}
              </h3>
              
              <p style={{
                color: '#c9d1d9',
                lineHeight: '1.6',
                fontSize: isMobile ? '0.9rem' : '0.95rem',
                position: 'relative',
                zIndex: 1
              }}>
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section style={{
        padding: isMobile ? '4rem 1rem' : '6rem 2rem',
        background: 'linear-gradient(180deg, #0d1117 0%, #161b22 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
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
              <span style={{ color: '#888' }}>Client</span>{' '}
              <span style={{
                background: 'linear-gradient(135deg, #00ff7f 0%, #00cc66 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Success Stories
              </span>
            </h2>
            <p style={{
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              color: '#c9d1d9',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Real results from real businesses we've helped grow
            </p>
          </motion.div>

          {/* Reviews Carousel */}
          <div
            ref={testimonialRef}
            style={{
              position: 'relative',
              width: '100%',
              overflow: isMobile ? 'auto' : 'hidden',
              overflowX: isMobile ? 'auto' : 'hidden',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              padding: isMobile ? '2rem 0' : '3rem 0',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: isMobile ? 'x mandatory' : 'none',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            onMouseEnter={() => !isMobile && setIsPaused(true)}
            onMouseLeave={() => !isMobile && setIsPaused(false)}
          >
            {/* Scrolling Container */}
            <div
              className={isMobile ? 'mobile-scroll-container' : ''}
              style={{
                display: 'flex',
                animation: !isMobile ? 'testimonialScroll 60s linear infinite' : 'none',
                animationPlayState: isPaused ? 'paused' : 'running',
                gap: isMobile ? '1rem' : '2rem',
                paddingLeft: isMobile ? '1rem' : '2rem',
                paddingRight: isMobile ? '1rem' : '2rem',
                width: 'fit-content',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                willChange: isMobile ? 'auto' : 'transform'
              }}
            >
              {/* Single set on mobile, double on desktop for performance */}
              {(isMobile ? allTestimonials : [...allTestimonials, ...allTestimonials]).map((testimonial, index) => (
                <div
                  key={index}
                  className={isMobile ? 'mobile-scroll-item' : ''}
                  style={{
                    minWidth: isMobile ? '90vw' : '400px',
                    width: isMobile ? '90vw' : '400px',
                    maxWidth: isMobile ? '350px' : '450px',
                    flexShrink: 0,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px',
                    padding: isMobile ? '1.25rem' : '2rem',
                    position: 'relative',
                    cursor: 'pointer',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    willChange: 'auto',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    scrollSnapAlign: isMobile ? 'start' : 'none',
                    scrollSnapStop: isMobile ? 'always' : 'normal'
                  }}
                  onClick={() => {
                    if (isMobile && (testimonial.projectImage || testimonial.image)) {
                      setSelectedTestimonial(selectedTestimonial === index ? null : index);
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 127, 0.3)';
                    e.currentTarget.style.background = 'rgba(0, 255, 127, 0.02)';
                    e.currentTarget.style.transform = 'scale(1.02) translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  }}
                >
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
                        style={{ opacity: 0.8 }}
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>

                  {/* Review Content */}
                  <p style={{
                    fontSize: isMobile ? '0.95rem' : '1.1rem',
                    color: '#c9d1d9',
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
                    <div style={{ position: 'relative', width: '50px', height: '50px' }}>
                      {(testimonial.image || testimonial.projectImage) && (
                        <img 
                          src={testimonial.image || testimonial.projectImage}
                          alt={`${testimonial.author} - ${testimonial.company || 'Client'} testimonial for Softeefi services`}
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid rgba(0, 255, 127, 0.3)',
                            position: 'absolute',
                            top: 0,
                            left: 0
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                      {!(testimonial.image || testimonial.projectImage) && (
                        <div style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #00ff7f 0%, #00cc66 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          color: '#0d1117'
                        }}>
                          {testimonial.author.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#ffffff',
                        marginBottom: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        {testimonial.author}
                        {testimonial.flag && testimonial.flag === '🇺🇸' && (
                          <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                            <rect width="24" height="16" fill="#B22234"/>
                            <rect y="1.23" width="24" height="1.23" fill="white"/>
                            <rect y="3.69" width="24" height="1.23" fill="white"/>
                            <rect y="6.15" width="24" height="1.23" fill="white"/>
                            <rect y="8.62" width="24" height="1.23" fill="white"/>
                            <rect y="11.08" width="24" height="1.23" fill="white"/>
                            <rect y="13.54" width="24" height="1.23" fill="white"/>
                            <rect width="9.6" height="8.62" fill="#3C3B6E"/>
                          </svg>
                        )}
                        {testimonial.flag && testimonial.flag === '🇿🇦' && (
                          <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                            <rect width="24" height="5.33" fill="#007A4D"/>
                            <rect y="5.33" width="24" height="5.34" fill="#FFFFFF"/>
                            <rect y="10.67" width="24" height="5.33" fill="#002395"/>
                            <polygon points="0,0 10,8 0,16" fill="#000000"/>
                            <polygon points="0,0 8,8 0,16" fill="#FFB612"/>
                            <polygon points="0,0 6,8 0,16" fill="#DE3831"/>
                          </svg>
                        )}
                        {testimonial.flag && testimonial.flag === '🇱🇰' && (
                          <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                            <rect width="24" height="16" fill="#FFBE29"/>
                            <rect x="6" width="18" height="8" fill="#8B4513"/>
                            <rect x="6" y="8" width="18" height="8" fill="#00534E"/>
                            <rect width="6" height="16" fill="#FBB917"/>
                            <path d="M3,4 L2,5 L1,4 L1,6 L2,7 L3,6 Z" fill="#8B0000" transform="translate(0,2)"/>
                          </svg>
                        )}
                        {testimonial.flag && testimonial.flag === '🇦🇺' && (
                          <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                            <rect width="24" height="16" fill="#012169"/>
                            <path d="M0,0 L24,16 M24,0 L0,16" stroke="white" strokeWidth="3"/>
                            <path d="M0,0 L24,16 M24,0 L0,16" stroke="#e4002b" strokeWidth="1"/>
                            <path d="M12,0 L12,16 M0,8 L24,8" stroke="white" strokeWidth="5"/>
                            <path d="M12,0 L12,16 M0,8 L24,8" stroke="#e4002b" strokeWidth="3"/>
                            <polygon points="18,11 19,11 18.5,12 18,11.5 17.5,12 17,11" fill="white"/>
                            <polygon points="20,5 20.7,5 20.35,5.7 20,5.35 19.65,5.7 19.3,5" fill="white"/>
                            <polygon points="18,3 18.5,3 18.25,3.5 18,3.25 17.75,3.5 17.5,3" fill="white"/>
                            <polygon points="14,5.5 14.7,5.5 14.35,6.2 14,5.85 13.65,6.2 13.3,5.5" fill="white"/>
                            <polygon points="16,9 16.7,9 16.35,9.7 16,9.35 15.65,9.7 15.3,9" fill="white"/>
                          </svg>
                        )}
                        {testimonial.flag && testimonial.flag === '🇭🇺' && (
                          <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                            <rect width="24" height="5.33" fill="#CD2A3E"/>
                            <rect y="5.33" width="24" height="5.34" fill="#FFFFFF"/>
                            <rect y="10.67" width="24" height="5.33" fill="#436F4D"/>
                          </svg>
                        )}
                        {testimonial.flag && testimonial.flag === '🇨🇦' && (
                          <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                            <rect width="6" height="16" fill="#FF0000"/>
                            <rect x="6" width="12" height="16" fill="#FFFFFF"/>
                            <rect x="18" width="6" height="16" fill="#FF0000"/>
                            <path d="M12,4 L11.5,5.5 L10,5.5 L11,6.5 L10.5,8 L12,7 L13.5,8 L13,6.5 L14,5.5 L12.5,5.5 Z" fill="#FF0000"/>
                          </svg>
                        )}
                        {testimonial.flag && testimonial.flag === '🇩🇪' && (
                          <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                            <rect width="24" height="5.33" fill="#000000"/>
                            <rect y="5.33" width="24" height="5.34" fill="#DD0000"/>
                            <rect y="10.67" width="24" height="5.33" fill="#FFCE00"/>
                          </svg>
                        )}
                        {testimonial.flag && testimonial.flag === '🇬🇧' && (
                          <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                            <rect width="24" height="16" fill="#012169"/>
                            <path d="M0,0 L24,16 M24,0 L0,16" stroke="white" strokeWidth="3"/>
                            <path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" strokeWidth="1"/>
                            <path d="M12,0 L12,16 M0,8 L24,8" stroke="white" strokeWidth="5"/>
                            <path d="M12,0 L12,16 M0,8 L24,8" stroke="#C8102E" strokeWidth="3"/>
                          </svg>
                        )}
                        {testimonial.flag && testimonial.flag === '🇫🇮' && (
                          <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                            <rect width="24" height="16" fill="#FFFFFF"/>
                            <rect x="7" width="4" height="16" fill="#003580"/>
                            <rect y="6" width="24" height="4" fill="#003580"/>
                          </svg>
                        )}
                        {testimonial.flag && testimonial.flag === '🇪🇸' && (
                          <svg width="24" height="16" viewBox="0 0 24 16" style={{ marginLeft: '0.5rem' }}>
                            <rect width="24" height="4" fill="#C60B1E"/>
                            <rect y="4" width="24" height="8" fill="#FFC400"/>
                            <rect y="12" width="24" height="4" fill="#C60B1E"/>
                          </svg>
                        )}
                      </h4>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#888',
                        margin: 0
                      }}>
                        {testimonial.position} • {testimonial.company}
                        {testimonial.date && ` • ${testimonial.date}`}
                      </p>
                    </div>
                  </div>

                  {/* Project Image Preview - Shows on hover/click */}
                  {testimonial.projectImage && (
                    <div
                      style={{
                        opacity: (isMobile && selectedTestimonial === index) ? 1 : 0,
                        transform: `translateX(-50%) scale(${(isMobile && selectedTestimonial === index) ? 1 : 0.95})`,
                        transition: 'all 0.2s ease',
                        position: 'absolute',
                        bottom: '105%',
                        left: '50%',
                        pointerEvents: 'none',
                        zIndex: 10,
                        width: isMobile ? '280px' : '350px'
                      }}
                    >
                      <div style={{
                        background: '#0d1117',
                        border: '2px solid rgba(0, 255, 127, 0.3)',
                        borderRadius: '12px',
                        padding: '0.5rem',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
                        position: 'relative'
                      }}>
                        <img
                          src={testimonial.projectImage}
                          alt={`${testimonial.author} project`}
                          style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '8px',
                            display: 'block'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        {/* Arrow pointer */}
                        <div style={{
                          position: 'absolute',
                          bottom: '-8px',
                          left: '50%',
                          transform: 'translateX(-50%) rotate(45deg)',
                          width: '16px',
                          height: '16px',
                          background: '#0d1117',
                          border: '2px solid rgba(0, 255, 127, 0.3)',
                          borderTop: 'none',
                          borderLeft: 'none'
                        }} />
                      </div>
                    </div>
                  )}

                  {/* Mobile tap indicator */}
                  {isMobile && testimonial.projectImage && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: selectedTestimonial === index ? 'rgba(0, 255, 127, 0.2)' : 'rgba(0, 255, 127, 0.1)',
                        border: '1px solid rgba(0, 255, 127, 0.3)',
                        borderRadius: '20px',
                        padding: '4px 8px',
                        fontSize: '0.7rem',
                        color: '#00ff7f',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {selectedTestimonial === index ? (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Viewing
                        </>
                      ) : (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                          Tap to view
                        </>
                      )}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Gradient Overlays */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100px',
              height: '100%',
              background: 'linear-gradient(90deg, #0d1117 0%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 2
            }} />
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100px',
              height: '100%',
              background: 'linear-gradient(270deg, #0d1117 0%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 2
            }} />
          </div>

          {/* Scroll Indicator Dots for Mobile */}
          {isMobile && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '1.5rem',
              marginBottom: '2rem'
            }}>
              {allTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (testimonialRef.current) {
                      const itemWidth = testimonialRef.current.offsetWidth * 0.85;
                      testimonialRef.current.scrollTo({
                        left: index * itemWidth,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  style={{
                    width: currentTestimonialIndex === index ? '12px' : '4px',
                    height: '4px',
                    borderRadius: '2px',
                    border: 'none',
                    background: currentTestimonialIndex === index 
                      ? 'linear-gradient(90deg, #00ff7f 0%, #00cc63 100%)' 
                      : 'rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    padding: 0
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* AI Reviews Image Showcase - REMOVED (reviews added to testimonials array) */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              marginTop: '4rem',
              textAlign: 'center'
            }}
          >
            <h3 style={{
              fontSize: isMobile ? '1.5rem' : '2rem',
              fontWeight: '700',
              marginBottom: '2rem',
              color: '#ffffff'
            }}>
              Verified AI Solution Reviews
            </h3>
            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{
                display: 'inline-block',
                position: 'relative',
                cursor: 'pointer',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
              }}
            >
              <img
                src="/images/reviews/ai-reviews.webp"
                alt="AI Solution Reviews"
                style={{
                  width: '100%',
                  maxWidth: isMobile ? '100%' : '800px',
                  height: 'auto',
                  display: 'block'
                }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0, 255, 127, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div style={{
                  background: 'rgba(0, 0, 0, 0.8)',
                  padding: '1rem 2rem',
                  borderRadius: '10px',
                  border: '2px solid #00ff7f'
                }}>
                  <p style={{
                    color: '#00ff7f',
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    margin: 0
                  }}>
                    20+ Verified Reviews
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div> */}

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            style={{
              marginTop: '4rem',
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: '2rem',
              padding: isMobile ? '0' : '0 2rem'
            }}
          >
            {[
              { number: '98%', label: 'Client Satisfaction' },
              { number: '110+', label: 'Projects Completed' },
              { number: '5.0', label: 'Average Rating' },
              { number: '105+', label: 'Happy Clients' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                style={{
                  textAlign: 'center',
                  padding: '1.5rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '15px',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <h3 style={{
                  fontSize: isMobile ? '2rem' : '2.5rem',
                  fontWeight: '800',
                  color: '#00ff7f',
                  marginBottom: '0.5rem'
                }}>
                  {stat.number}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#888',
                  margin: 0
                }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Background Effects */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(0, 255, 127, 0.1) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '-10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(0, 255, 127, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }} />
      </section>
      {/* CTA Section with Contact Form */}
      <section style={{
        padding: isMobile ? '4rem 1rem 3rem' : '6rem 2rem',
        background: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1
      }}>
        {/* Background effects */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'radial-gradient(circle at 20% 50%, rgba(0, 255, 127, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0, 255, 127, 0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translate(50%, -50%)',
          pointerEvents: 'none'
        }} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: isMobile ? 'block' : 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '2rem' : '4rem',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1
          }}
        >
          {/* Left side - Content */}
          <div style={{
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: isMobile ? '1.75rem' : 'clamp(2.5rem, 4vw, 3.5rem)',
                fontWeight: '900',
                marginBottom: '1.5rem',
                color: '#ffffff',
                lineHeight: 1.2
              }}
            >
              Let's Build Your{' '}
              <span style={{
                background: 'linear-gradient(135deg, #00ff7f 0%, #00cc63 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Digital Future
              </span>{' '}
              Together
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: isMobile ? '1.1rem' : '1.3rem',
                color: '#c9d1d9',
                marginBottom: '2rem',
                lineHeight: 1.6
              }}
            >
              Transform your ideas into reality with our expert team. We're here to help you succeed in the digital world.
            </motion.p>
            
            {/* Features list */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '2rem'
              }}
            >
              {[
                '24/7 Support Available',
                'Free Consultation',
                'Custom Solutions for Every Business',
                'Results-Driven Approach'
              ].map((feature, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  justifyContent: isMobile ? 'center' : 'flex-start'
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'rgba(0, 255, 127, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path d="M1 5L4 8L11 1" stroke="#00ff7f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{
                    color: '#e6edf3',
                    fontSize: isMobile ? '0.95rem' : '1.05rem'
                  }}>{feature}</span>
                </div>
              ))}
            </motion.div>
            
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              style={{
                display: 'flex',
                gap: '2rem',
                flexWrap: 'wrap',
                justifyContent: isMobile ? 'center' : 'flex-start'
              }}
            >
              <a href="mailto:info@softeefi.co.uk" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#00ff7f',
                textDecoration: 'none',
                fontSize: '1rem',
                transition: 'opacity 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-10 5L2 7"/>
                </svg>
                info@softeefi.co.uk
              </a>
              
              <a href="tel:+447417505744" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#00ff7f',
                textDecoration: 'none',
                fontSize: '1rem',
                transition: 'opacity 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +44 7417 505744
              </a>
            </motion.div>
          </div>
          
          {/* Right side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: isMobile ? '1.5rem' : '3rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              marginTop: isMobile ? '3rem' : '0'
            }}
          >
            <h3 style={{
              fontSize: isMobile ? '1.5rem' : '1.8rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#ffffff',
              textAlign: 'center'
            }}>
              Get Started Today
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#8b949e',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              Fill out the form below and we'll get back to you within 24 hours
            </p>
            <ContactForm variant="home" />
          </motion.div>
        </motion.div>
      </section>

      {/* Add CSS animations */}
      <style>{`
        @keyframes testimonialScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      {/* Ask AI Modal */}
      <AskAIModal 
        show={askAIModal.show}
        service={askAIModal.service}
        position={askAIModal.position}
        onClose={() => setAskAIModal({ show: false, service: null, position: null })}
      />
    </main>
  );
};

export default Landing;
