
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter with PrivateEmail SMTP settings
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'mail.privateemail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,       
    pass: process.env.EMAIL_PASS,         
  },
  tls: {
    rejectUnauthorized: false
  }
});

// sending email
async function sendContactEmail({ name, email, message }) {
  const mailOptions = {
    from: process.env.EMAIL_USER,    
    to: process.env.EMAIL_USER,      
    subject: 'New Contact Inquiry',
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
    replyTo: email,  
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendContactEmail };
