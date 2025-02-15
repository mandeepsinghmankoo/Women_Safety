import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#000000', color: '#ecf0f1', padding: '20px', textAlign: 'center' }}>
      <div style={{ marginBottom: '10px' }}>
        <strong>Women Safety Analytics</strong> © 2025 | Empowering Safety with AI and Technology
      </div>
      <div>
        <a href="/about" style={{ color: '#ecf0f1', textDecoration: 'none', marginRight: '15px' }}>About Us</a>
        <a href="/privacy-policy" style={{ color: '#ecf0f1', textDecoration: 'none', marginRight: '15px' }}>Privacy Policy</a>
        <a href="/contact" style={{ color: '#ecf0f1', textDecoration: 'none' }}>Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
