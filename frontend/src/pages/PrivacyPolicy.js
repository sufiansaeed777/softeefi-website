import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
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
      <Helmet>
        <title>Privacy Policy | Data Protection - Softeefi</title>
        <meta name="description" content="Softeefi Privacy Policy. Learn how we collect, use, and protect your personal information. We are committed to safeguarding your data and respecting your privacy rights." />
        <link rel="canonical" href="https://softeefi.co.uk/privacy-policy" />
        <meta name="keywords" content="privacy policy, data protection, GDPR, personal information, cookies, data security, privacy rights, softeefi privacy" />
        <meta property="og:title" content="Privacy Policy - Softeefi" />
        <meta property="og:description" content="Our commitment to protecting your privacy and personal information. Learn about our data practices and your rights." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://softeefi.co.uk/privacy-policy" />
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
            Privacy Policy
          </h1>

          <p style={{...textStyle, fontSize: '1.1rem', marginBottom: '2rem'}}>
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>1. Introduction</h2>
            <p style={textStyle}>
              Welcome to Softeefi ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>2. Information We Collect</h2>
            
            <h3 style={subHeadingStyle}>Personal Information</h3>
            <p style={textStyle}>We may collect personal information that you provide to us, including but not limited to:</p>
            <ul style={listStyle}>
              <li>Name and contact information (email address, phone number)</li>
              <li>Business information (company name, job title)</li>
              <li>Project requirements and preferences</li>
              <li>Payment and billing information</li>
              <li>Communication history and feedback</li>
            </ul>

            <h3 style={subHeadingStyle}>Automatically Collected Information</h3>
            <p style={textStyle}>When you visit our website, we automatically collect certain information about your device, including:</p>
            <ul style={listStyle}>
              <li>IP address and location data</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
              <li>Device identifiers</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>3. How We Use Your Information</h2>
            <p style={textStyle}>We use the information we collect to:</p>
            <ul style={listStyle}>
              <li>Provide, operate, and maintain our services</li>
              <li>Improve, personalize, and expand our services</li>
              <li>Understand and analyze how you use our services</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Communicate with you for customer service and updates</li>
              <li>Process your transactions and manage billing</li>
              <li>Send you marketing and promotional communications (with your consent)</li>
              <li>Protect against fraudulent or illegal activity</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>4. Information Sharing and Disclosure</h2>
            <p style={textStyle}>We may share your information in the following situations:</p>
            <ul style={listStyle}>
              <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf</li>
              <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, or acquisition</li>
              <li><strong>Legal Requirements:</strong> If required by law or in response to valid legal requests</li>
              <li><strong>Vital Interests:</strong> To protect the vital interests of you or another person</li>
              <li><strong>With Your Consent:</strong> With your explicit consent for any other purpose</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>5. Data Security</h2>
            <p style={textStyle}>
              We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>6. Your Rights</h2>
            <p style={textStyle}>Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul style={listStyle}>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
              <li>Withdrawal of consent</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>7. Cookies and Tracking Technologies</h2>
            <p style={textStyle}>
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. For more information, please see our Cookie Policy.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>8. Third-Party Links</h2>
            <p style={textStyle}>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>9. Children's Privacy</h2>
            <p style={textStyle}>
              Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>10. International Data Transfers</h2>
            <p style={textStyle}>
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>11. Changes to This Policy</h2>
            <p style={textStyle}>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>12. Contact Us</h2>
            <p style={textStyle}>
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
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

export default PrivacyPolicy;