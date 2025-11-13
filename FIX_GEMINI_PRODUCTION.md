# Fix Gemini AI API in Production

## Critical Security Issue Found
**Your Gemini API key was hardcoded in the source code!** This is a major security risk. The key has been exposed and might be:
- Disabled by Google for security reasons
- Rate-limited due to abuse
- Quota exhausted

## Immediate Actions Required

### 1. Get a New Gemini API Key
1. Go to: https://makersuite.google.com/app/apikey
2. Create a new API key (the old one is compromised)
3. Delete/disable the old key: `AIzaSyCF8pKDbdCluqXhwjHOEEhY-1dt6zcRrJU`

### 2. Test Locally First
```bash
cd Backend

# Add to .env file (create if doesn't exist)
echo "GEMINI_API_KEY=your-new-api-key-here" >> .env

# Test the API
node test-gemini.js
```

### 3. Update Production Server

#### Add to production .env file:
```env
# CRITICAL: Never commit this to git!
GEMINI_API_KEY=your-new-gemini-api-key-here

# Other required variables
PORT=4000
NODE_ENV=production
MONGO_URL=your-mongodb-url
FRONTEND_URL=https://softeefi.co.uk
```

### 4. Deploy the Fixed Code

```bash
# On production server
cd /path/to/your/backend
git pull
npm install

# Make sure .env file has the new API key
nano .env  # or vim .env

# Restart the server
pm2 restart backend
# or
systemctl restart your-backend-service
```

### 5. Verify the Fix

#### Test on production server:
```bash
# Test Gemini API directly
node test-gemini.js

# Check server logs
pm2 logs backend --lines 50
```

#### Test from browser:
1. Go to your website
2. Open browser console (F12)
3. Click on "Ask AI" button on any service
4. Type a question and send
5. Check for errors in console

## Common Error Messages & Solutions

### Error: "AI service not configured"
**Cause:** No API key in production .env file
**Fix:** Add `GEMINI_API_KEY=your-key` to .env file

### Error: "API key invalid or disabled" (403)
**Cause:** Old key was disabled or new key not active
**Fix:** 
1. Get new key from Google AI Studio
2. Make sure Gemini API is enabled in Google Cloud Console
3. Update .env file with new key

### Error: "Rate limit exceeded" (429)
**Cause:** Too many requests or quota exhausted
**Fix:**
1. Wait 1 minute and try again
2. Check quota: https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas
3. Consider upgrading to paid plan if needed

### Error: "Network error"
**Cause:** Server can't reach Google's API
**Fix:**
1. Check internet connection on server
2. Check firewall rules (port 443 outbound must be open)
3. Test with: `curl https://generativelanguage.googleapis.com/v1/models?key=YOUR_KEY`

## Security Best Practices

### ✅ DO:
- Store API keys in .env files only
- Add .env to .gitignore
- Use environment variables in production
- Rotate keys regularly
- Monitor usage for unusual activity

### ❌ DON'T:
- Hardcode API keys in source code
- Commit .env files to git
- Share API keys in documentation
- Use same key for dev and production
- Expose keys in client-side code

## Monitoring

### Check API Usage:
1. Go to: https://console.cloud.google.com
2. Navigate to: APIs & Services → Credentials
3. Click on your API key
4. View usage statistics

### Set Up Alerts:
1. In Google Cloud Console
2. Go to: Monitoring → Alerting
3. Create alert for API quota usage

## Quick Checklist

- [ ] Old compromised API key deleted from Google
- [ ] New Gemini API key generated
- [ ] .env file updated on production server
- [ ] Code updated to use environment variables
- [ ] Server restarted with new configuration
- [ ] API tested with test-gemini.js script
- [ ] Website AI chat feature working
- [ ] No API keys in git repository
- [ ] .gitignore includes .env files

## Emergency Fallback

If Gemini continues to fail, you can temporarily switch back to OpenAI:
1. Add OpenAI key to .env: `OPENAI_API_KEY=sk-...`
2. Update frontend to use `/api/ai/ask` instead of `/api/gemini/chat`
3. This will use OpenAI as backup

## Support Resources

- Gemini API Docs: https://ai.google.dev/docs
- Get API Key: https://makersuite.google.com/app/apikey
- Check Status: https://status.cloud.google.com/
- Quotas: https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas

## Post-Fix Verification

Run this command periodically to ensure API is working:
```bash
curl -X POST http://localhost:4000/api/gemini/chat \
  -H "Content-Type: application/json" \
  -d '{"question":"test","service":"test","systemPrompt":"test"}' \
  | python -m json.tool
```

Expected response should have `"success": true`