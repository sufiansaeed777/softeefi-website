# Email Setup Instructions

## ⚠️ IMPORTANT SECURITY STEPS

### 1. Generate a New Secure Password
Use this command to generate a secure password:
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 16))"
```

Or use a password manager to generate a strong password with:
- At least 16 characters
- Mix of uppercase and lowercase letters
- Numbers and special characters
- No dictionary words

### 2. Update Your PrivateEmail Password
1. Log in to your Namecheap account
2. Go to PrivateEmail settings
3. Change the password for contact@softeefi.co.uk
4. Use the new secure password

### 3. Update the .env File
Replace `CHANGE_THIS_TO_YOUR_NEW_SECURE_PASSWORD` with your new password:
```
EMAIL_PASS=your_new_secure_password_here
```

### 4. Generate JWT Secret
Run this command to generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Update in .env:
```
JWT_SECRET=your_generated_jwt_secret_here
```

## Email Configuration Details

Your email is configured with:
- **SMTP Host**: mail.privateemail.com
- **Port**: 587 (TLS)
- **Username**: contact@softeefi.co.uk
- **From**: Softeefi <contact@softeefi.co.uk>

## Testing Email

To test if email is working:

1. Create a test script `test-email.js`:
```javascript
require('dotenv').config();
const { sendContactEmail } = require('./Utils/emailService');

sendContactEmail({
  name: 'Test User',
  email: 'test@example.com',
  message: 'This is a test message from Softeefi contact form.'
}).then(result => {
  console.log('Email test result:', result);
  process.exit(0);
}).catch(error => {
  console.error('Email test failed:', error);
  process.exit(1);
});
```

2. Run: `node test-email.js`

## Features Added

1. **Professional HTML Email Templates** with Softeefi branding
2. **PrivateEmail SMTP Configuration** instead of Gmail
3. **Error Handling** with proper logging
4. **Notification System** for other email needs
5. **TLS Security** with proper settings

## Security Checklist

- [ ] Changed email password from the exposed one
- [ ] Updated EMAIL_PASS in .env file
- [ ] Generated new JWT_SECRET
- [ ] Never commit .env file to git
- [ ] Added .env to .gitignore
- [ ] Enabled 2FA on Namecheap account
- [ ] Set up email forwarding/aliases if needed

## Troubleshooting

If emails aren't sending:
1. Check firewall allows port 587
2. Verify credentials are correct
3. Check spam folder
4. Try port 465 with `EMAIL_SECURE=true`
5. Contact Namecheap support if issues persist