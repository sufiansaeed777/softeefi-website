# API Setup Guide for Softeefi

## Required Environment Variables

Create a `.env` file in the Backend directory with the following:

```env
# Server Configuration
PORT=4000
NODE_ENV=production

# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017/softeefi

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# JWT Secret
JWT_SECRET=generate-a-strong-random-string-here

# Frontend URL (for CORS)
FRONTEND_URL=https://softeefi.co.uk

# AI APIs
OPENAI_API_KEY=sk-...your-openai-key
GEMINI_API_KEY=AIza...your-gemini-key
```

## 1. Email API Setup (Gmail)

### Steps:
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to Security → 2-Step Verification (enable if not already)
3. Go to App passwords
4. Generate an app-specific password for "Mail"
5. Use this password in `EMAIL_PASS`

### Testing:
```bash
curl -X POST http://localhost:4000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

## 2. Gemini AI API Setup

### Steps:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Get API Key"
3. Create a new API key
4. Copy and add to `GEMINI_API_KEY`

### Testing:
```bash
curl -X POST http://localhost:4000/api/gemini/chat \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is cloud computing?",
    "service": "cloud",
    "systemPrompt": "You are a cloud expert"
  }'
```

## 3. OpenAI API Setup

### Steps:
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Navigate to API Keys
3. Create new secret key
4. Copy and add to `OPENAI_API_KEY`

### Testing:
```bash
curl -X POST http://localhost:4000/api/ai/ask \
  -H "Content-Type: application/json" \
  -d '{
    "field": "ai-solutions",
    "question": "How can AI help my business?"
  }'
```

## Troubleshooting

### Email not sending:
- Ensure 2-factor authentication is enabled on Gmail
- Use app-specific password, not regular password
- Check if "Less secure app access" is disabled (should be)
- Verify EMAIL_USER matches the Gmail account

### AI APIs not working:
- Check API key validity
- Ensure you have credits/quota available
- Verify network connectivity
- Check error logs: `pm2 logs backend`

### MongoDB connection issues:
- Ensure MongoDB is running: `sudo systemctl status mongod`
- Check connection string format
- Verify database exists

## Production Deployment

On your server:
```bash
# Copy .env file to server
scp .env daniel@138.68.184.53:/var/www/softeefi/Backend/

# SSH to server
ssh daniel@138.68.184.53

# Navigate to backend
cd /var/www/softeefi/Backend

# Install dependencies
npm install

# Restart backend
pm2 restart backend

# Check logs
pm2 logs backend
```

## Security Notes

- Never commit `.env` file to git
- Use strong JWT_SECRET (32+ characters)
- Rotate API keys regularly
- Monitor API usage for anomalies
- Use rate limiting in production