import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const CookiePolicy = () => {
  useEffect(() => {
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

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '1.5rem',
    marginTop: '1rem'
  };

  const thStyle = {
    background: 'rgba(0, 255, 127, 0.1)',
    padding: '1rem',
    textAlign: 'left',
    color: '#00ff7f',
    borderBottom: '2px solid rgba(0, 255, 127, 0.3)'
  };

  const tdStyle = {
    padding: '1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#c9d1d9'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d1117',
      paddingTop: '80px'
    }}>
      <Helmet>
        <title>Cookie Policy | Website Cookies - Softeefi</title>
        <meta name="description" content="Softeefi Cookie Policy. Learn about how we use cookies and similar tracking technologies on our website to improve your experience and analyze site usage." />
        <link rel="canonical" href="https://softeefi.co.uk/cookie-policy" />
        <meta name="keywords" content="cookie policy, website cookies, tracking technologies, cookie consent, GDPR cookies, cookie management, softeefi cookies" />
        <meta property="og:title" content="Cookie Policy - Softeefi" />
        <meta property="og:description" content="Understanding how Softeefi uses cookies to enhance your browsing experience and website functionality." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://softeefi.co.uk/cookie-policy" />
      </Helmet>
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
            Cookie Policy
          </h1>

          <p style={{...textStyle, fontSize: '1.1rem', marginBottom: '2rem'}}>
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>1. What Are Cookies?</h2>
            <p style={textStyle}>
              Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>2. How We Use Cookies</h2>
            <p style={textStyle}>We use cookies for the following purposes:</p>
            <ul style={{marginLeft: '2rem', marginBottom: '1rem', color: '#c9d1d9', lineHeight: '1.8'}}>
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and personalize your experience</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and track campaign effectiveness</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>3. Types of Cookies We Use</h2>
            
            <h3 style={subHeadingStyle}>Essential Cookies</h3>
            <p style={textStyle}>These cookies are necessary for the website to function and cannot be switched off in our systems.</p>
            
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Cookie Name</th>
                  <th style={thStyle}>Purpose</th>
                  <th style={thStyle}>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle}>sessionId</td>
                  <td style={tdStyle}>Maintains user session state</td>
                  <td style={tdStyle}>Session</td>
                </tr>
                <tr>
                  <td style={tdStyle}>security_token</td>
                  <td style={tdStyle}>Security and authentication</td>
                  <td style={tdStyle}>Session</td>
                </tr>
              </tbody>
            </table>

            <h3 style={subHeadingStyle}>Analytics Cookies</h3>
            <p style={textStyle}>These cookies help us understand how visitors interact with our website.</p>
            
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Cookie Name</th>
                  <th style={thStyle}>Purpose</th>
                  <th style={thStyle}>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle}>_ga</td>
                  <td style={tdStyle}>Google Analytics - distinguishes users</td>
                  <td style={tdStyle}>2 years</td>
                </tr>
                <tr>
                  <td style={tdStyle}>_gid</td>
                  <td style={tdStyle}>Google Analytics - distinguishes users</td>
                  <td style={tdStyle}>24 hours</td>
                </tr>
              </tbody>
            </table>

            <h3 style={subHeadingStyle}>Functional Cookies</h3>
            <p style={textStyle}>These cookies enable personalized features and remember your preferences.</p>
            
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Cookie Name</th>
                  <th style={thStyle}>Purpose</th>
                  <th style={thStyle}>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle}>theme_preference</td>
                  <td style={tdStyle}>Remembers theme choice</td>
                  <td style={tdStyle}>1 year</td>
                </tr>
                <tr>
                  <td style={tdStyle}>language</td>
                  <td style={tdStyle}>Remembers language preference</td>
                  <td style={tdStyle}>1 year</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>4. Third-Party Cookies</h2>
            <p style={textStyle}>
              We may also use cookies provided by trusted third parties. These include:
            </p>
            <ul style={{marginLeft: '2rem', marginBottom: '1rem', color: '#c9d1d9', lineHeight: '1.8'}}>
              <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
              <li><strong>Facebook Pixel:</strong> For advertising and remarketing purposes</li>
              {/* <li><strong>LinkedIn Insights:</strong> For professional audience analytics</li> */}
              <li><strong>Stripe:</strong> For secure payment processing</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>5. Managing Cookies</h2>
            <p style={textStyle}>
              You have the right to decide whether to accept or reject cookies. You can manage your cookie preferences through:
            </p>
            
            <h3 style={subHeadingStyle}>Browser Settings</h3>
            <p style={textStyle}>
              Most web browsers allow you to control cookies through their settings. You can:
            </p>
            <ul style={{marginLeft: '2rem', marginBottom: '1rem', color: '#c9d1d9', lineHeight: '1.8'}}>
              <li>Delete all cookies</li>
              <li>Block all cookies</li>
              <li>Allow all cookies</li>
              <li>Block third-party cookies</li>
              <li>Clear cookies when closing the browser</li>
              <li>Open 'incognito' or 'private' browsing sessions</li>
            </ul>

            <h3 style={subHeadingStyle}>Cookie Settings on Our Website</h3>
            <p style={textStyle}>
              When you first visit our website, you'll see a cookie banner that allows you to accept or customize your cookie preferences.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>6. Impact of Disabling Cookies</h2>
            <p style={textStyle}>
              Please note that if you disable cookies, some features of our website may not function properly:
            </p>
            <ul style={{marginLeft: '2rem', marginBottom: '1rem', color: '#c9d1d9', lineHeight: '1.8'}}>
              <li>You may not be able to log in to secure areas</li>
              <li>Personalization features may be limited</li>
              <li>Some interactive features may not work</li>
              <li>Analytics data will be incomplete</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>7. Updates to This Policy</h2>
            <p style={textStyle}>
              We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by posting the new Cookie Policy on this page.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>8. Contact Us</h2>
            <p style={textStyle}>
              If you have any questions about our use of cookies, please contact us at:
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
              <p style={{...textStyle, margin: '0.5rem 0'}}>
                <strong style={{color: '#00ff7f'}}>Data Protection Officer:</strong> info@softeefi.co.uk
              </p>
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>9. More Information</h2>
            <p style={textStyle}>
              For more information about cookies, visit:
            </p>
            <ul style={{marginLeft: '2rem', marginBottom: '1rem', color: '#c9d1d9', lineHeight: '1.8'}}>
              <li><a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" style={{color: '#00ff7f', textDecoration: 'none'}}>All About Cookies</a></li>
              <li><a href="https://www.youronlinechoices.eu" target="_blank" rel="noopener noreferrer" style={{color: '#00ff7f', textDecoration: 'none'}}>Your Online Choices (EU)</a></li>
              <li><a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" style={{color: '#00ff7f', textDecoration: 'none'}}>Digital Advertising Alliance (US)</a></li>
            </ul>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiePolicy;