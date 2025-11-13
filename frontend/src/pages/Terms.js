import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Terms = () => {
  useEffect(() => {
    // SEO Optimization for Terms & Conditions Page
    document.title = 'Terms & Conditions | Terms of Service - Softeefi';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Read Softeefi Terms and Conditions. Learn about our service terms, usage policies, intellectual property rights, payment terms, and legal agreements for web development and digital services.';
    } else {
      const newMetaDesc = document.createElement('meta');
      newMetaDesc.name = 'description';
      newMetaDesc.content = 'Read Softeefi Terms and Conditions. Learn about our service terms, usage policies, intellectual property rights, payment terms, and legal agreements for web development and digital services.';
      document.head.appendChild(newMetaDesc);
    }
    
    // Add meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'terms and conditions, terms of service, legal terms, service agreement, user agreement, website terms, softeefi terms, usage policy, intellectual property, payment terms, liability, disclaimer, privacy, legal, terms of use';
    
    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://softeefi.co.uk/terms-of-service';
    
    // Add Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Terms & Conditions | Softeefi' },
      { property: 'og:description', content: 'Terms and Conditions for Softeefi services. Review our service agreements, usage policies, and legal terms.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://softeefi.co.uk/terms-of-service' },
      { property: 'og:image', content: 'https://softeefi.co.uk/images/terms-og.jpg' }
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
    
    // Add structured data for Terms of Service
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://softeefi.co.uk/terms",
          "url": "https://softeefi.co.uk/terms",
          "name": "Terms & Conditions",
          "isPartOf": {
            "@id": "https://softeefi.co.uk/#website"
          },
          "datePublished": "2024-01-01",
          "dateModified": new Date().toISOString(),
          "description": "Terms and Conditions for Softeefi services. Review our service agreements, usage policies, and legal terms.",
          "breadcrumb": {
            "@id": "https://softeefi.co.uk/terms#breadcrumb"
          },
          "inLanguage": "en-GB",
          "potentialAction": {
            "@type": "ReadAction",
            "target": ["https://softeefi.co.uk/terms"]
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://softeefi.co.uk/terms#breadcrumb",
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
              "name": "Terms & Conditions",
              "item": "https://softeefi.co.uk/terms"
            }
          ]
        }
      ]
    };
    
    let scriptTag = document.querySelector('script[type="application/ld+json"][data-terms]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      scriptTag.setAttribute('data-terms', 'true');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
    
    window.scrollTo(0, 0);
  }, []);

  const sectionStyle = {
    marginBottom: '2.5rem'
  };

  const headingStyle = {
    fontSize: '1.8rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#00ff7f'
  };

  const subHeadingStyle = {
    fontSize: '1.3rem',
    fontWeight: '500',
    marginBottom: '0.8rem',
    color: '#ffffff'
  };

  const textStyle = {
    fontSize: '1rem',
    lineHeight: '1.8',
    color: '#c9d1d9',
    marginBottom: '1rem'
  };

  const listStyle = {
    marginLeft: '2rem',
    marginBottom: '1rem',
    color: '#c9d1d9',
    lineHeight: '1.8'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d1117',
      paddingTop: '80px'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '3rem 2rem'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '800',
            marginBottom: '2rem',
            background: 'linear-gradient(45deg, #ffffff, #00ff7f)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Terms of Service
          </h1>

          <p style={{...textStyle, fontSize: '1.1rem', marginBottom: '2rem'}}>
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>1. Agreement to Terms</h2>
            <p style={textStyle}>
              By accessing or using our services provided by Softeefi ("we," "us," or "our"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you do not have permission to access our services.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>2. Description of Services</h2>
            <p style={textStyle}>
              Softeefi provides digital solutions including but not limited to:
            </p>
            <ul style={listStyle}>
              <li>Website and application development</li>
              <li>AI-powered solutions and integrations</li>
              <li>UI/UX design services</li>
              <li>Cloud infrastructure setup and management</li>
              <li>Digital marketing and SEO services</li>
              <li>Creative services (graphic design, video production, digital art)</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>3. User Accounts</h2>
            <p style={textStyle}>
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
            </p>
            <p style={textStyle}>
              You agree to:
            </p>
            <ul style={listStyle}>
              <li>Notify us immediately of any unauthorized access or use of your account</li>
              <li>Not use the username of another person or entity</li>
              <li>Not use a name that is offensive, vulgar, or obscene</li>
              <li>Ensure your account information is accurate and up-to-date</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>4. Acceptable Use</h2>
            <p style={textStyle}>
              You agree not to use our services:
            </p>
            <ul style={listStyle}>
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
              <li>To interfere with or circumvent the security features of our services</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>5. Intellectual Property Rights</h2>
            <p style={textStyle}>
              Our services and their original content, features, and functionality are and will remain the exclusive property of Softeefi and its licensors. Our services are protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>6. Payment Terms</h2>
            <h3 style={subHeadingStyle}>Pricing</h3>
            <p style={textStyle}>
              All prices are subject to change without notice. We reserve the right to modify or discontinue services at any time.
            </p>
            
            <h3 style={subHeadingStyle}>Payment</h3>
            <p style={textStyle}>
              Payment is due according to the terms agreed upon in your service contract. Late payments may incur additional fees.
            </p>
            
            <h3 style={subHeadingStyle}>Refunds</h3>
            <p style={textStyle}>
              Refund policies are determined on a case-by-case basis and will be outlined in your specific service agreement.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>7. Confidentiality</h2>
            <p style={textStyle}>
              Both parties agree to maintain the confidentiality of any proprietary information received during the provision of services. This obligation survives the termination of service agreements.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>8. Limitation of Liability</h2>
            <p style={textStyle}>
              In no event shall Softeefi, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul style={listStyle}>
              <li>Your use or inability to use our services</li>
              <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
              <li>Any interruption or cessation of transmission to or from our services</li>
              <li>Any bugs, viruses, trojan horses, or the like that may be transmitted through our services by any third party</li>
              <li>Any errors or omissions in any content or for any loss or damage incurred as a result of your use of any content</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>9. Indemnification</h2>
            <p style={textStyle}>
              You agree to defend, indemnify, and hold harmless Softeefi and its licensees and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>10. Termination</h2>
            <p style={textStyle}>
              We may terminate or suspend your account and bar access to our services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>11. Governing Law</h2>
            <p style={textStyle}>
              These Terms shall be governed and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>12. Changes to Terms</h2>
            <p style={textStyle}>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>13. Contact Information</h2>
            <p style={textStyle}>
              If you have any questions about these Terms, please contact us at:
            </p>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '1.5rem',
              borderRadius: '10px',
              marginTop: '1rem'
            }}>
              <p style={{...textStyle, margin: '0.5rem 0'}}>
                <strong style={{color: '#00ff7f'}}>Email:</strong> info@softeefi.co.uk
              </p>
              <p style={{...textStyle, margin: '0.5rem 0'}}>
                <strong style={{color: '#00ff7f'}}>Phone:</strong> +44 7417 505744
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;