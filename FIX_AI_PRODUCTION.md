# Fix AI API in Production

## Problem
The AI API works locally but not on the live website.

## Root Causes
1. **API Endpoint Mismatch**: Frontend was calling wrong endpoint
2. **Production URL Issue**: Frontend configured with wrong backend URL
3. **Missing API Key**: OpenAI API key not set in production environment
4. **CORS Issues**: Backend may not be accessible from frontend domain

## Solution Steps

### 1. Test OpenAI Configuration Locally
```bash
cd Backend
node test-openai.js
```

### 2. Update Production Environment Variables

#### Backend (.env file on production server):
```env
# Required for AI features
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
PORT=4000
NODE_ENV=production
MONGO_URL=your-mongodb-url
FRONTEND_URL=https://softeefi.co.uk
```

#### Frontend (.env.production):
```env
# Leave empty if backend is on same domain
# Or set to your backend URL
REACT_APP_API_URL=
```

### 3. Deploy Updates

#### If using PM2:
```bash
# Backend
cd Backend
git pull
npm install
pm2 restart backend

# Frontend
cd frontend
git pull
npm install
npm run build
# Copy build files to web server
```

#### If using different deployment:
1. Pull latest changes
2. Install dependencies
3. Build frontend
4. Restart backend service
5. Clear browser cache

### 4. Verify Production Setup

#### Check Backend is Running:
```bash
# On production server
curl http://localhost:4000/api/health
```

#### Check Frontend Can Access Backend:
Open browser console on live site and run:
```javascript
fetch('/api/health').then(r => r.json()).then(console.log)
```

### 5. Common Issues & Solutions

#### Issue: "AI service not configured"
**Solution**: Add OPENAI_API_KEY to production .env file

#### Issue: "Invalid OpenAI API key"
**Solution**: 
- Verify key starts with "sk-"
- Check key is active on OpenAI dashboard
- Ensure no extra spaces/quotes in .env

#### Issue: "API quota exceeded"
**Solution**: 
- Check OpenAI usage dashboard
- Add billing/payment method to OpenAI account
- Consider upgrading OpenAI plan

#### Issue: CORS errors
**Solution**: 
- Ensure backend and frontend are on same domain
- Or update CORS headers in server.js to include your domain

#### Issue: 404 on API calls
**Solution**:
- Check nginx/Apache proxy configuration
- Ensure /api/* routes are proxied to backend port

### 6. Nginx Configuration (if applicable)

Add to your nginx site config:
```nginx
location /api {
    proxy_pass http://localhost:4000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### 7. Test AI Feature

1. Go to https://softeefi.co.uk
2. Click on any service card's "Ask AI" button
3. Type a question and send
4. Check browser console for errors

### 8. Monitor Logs

```bash
# Backend logs
pm2 logs backend

# Or if using systemd
journalctl -u your-backend-service -f

# Check for these success messages:
# ✓ OpenAI service initialized successfully
# ✓ Connected to MongoDB successfully
# ✓ Server running on port 4000
```

## Quick Checklist

- [ ] OpenAI API key set in production .env
- [ ] Backend server running and accessible
- [ ] Frontend built with correct API URL
- [ ] Nginx/proxy configured for /api routes
- [ ] No CORS errors in browser console
- [ ] MongoDB connection working
- [ ] Browser cache cleared after updates

## Support

If issues persist after following these steps:
1. Check backend logs for specific error messages
2. Test API directly with curl/Postman
3. Verify OpenAI account status and billing
4. Check network tab in browser for failed requests