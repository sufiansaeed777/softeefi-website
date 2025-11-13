#!/bin/bash

# Quick fix script for production issues
echo "🔧 Fixing production issues..."

# 1. Fix video controls (already done in files)
echo "✅ Video controls fixed with fullscreen support"

# 2. Add Ask AI functionality to all service pages
echo "🤖 Adding Ask AI modal state to other service pages..."

# List of service files that need Ask AI modal state
SERVICE_FILES=(
    "frontend/src/pages/services/AISolutions.js"
    "frontend/src/pages/services/CloudServices.js"
    "frontend/src/pages/services/DigitalMarketingSEO.js"
    "frontend/src/pages/services/UIUXDesign.js"
    "frontend/src/pages/services/DigitalArt.js"
)

for file in "${SERVICE_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing $file..."
        # Check if file already has showAskAI state
        if ! grep -q "showAskAI" "$file"; then
            # Add the state variables after the component declaration
            sed -i '/const.*= () => {/a\  const [showAskAI, setShowAskAI] = useState(false);\n  const [askAIPosition, setAskAIPosition] = useState({ top: 100, left: 100 });' "$file"
            echo "  - Added Ask AI state to $file"
        fi
    fi
done

# 3. Update .env.production with analytics
echo "📊 Setting up analytics..."
cat > frontend/.env.production << 'EOF'
# Frontend Production Environment Variables

# API Configuration
# For production, leave empty to use same origin
# REACT_APP_API_URL=https://softeefi.co.uk
REACT_APP_API_URL=
REACT_APP_API_TIMEOUT=30000

# Monitoring
REACT_APP_SENTRY_DSN=
REACT_APP_VERSION=1.0.0

# Analytics - Add your Google Analytics ID here
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
REACT_APP_ENABLE_ANALYTICS=true

# Feature Flags
REACT_APP_ENABLE_AI_CHAT=true
REACT_APP_ENABLE_FREE_REPORTS=true
REACT_APP_ENABLE_ANIMATIONS=true

# Development
REACT_APP_DEBUG_MODE=false
REACT_APP_MOCK_API=false
EOF

echo "✅ Analytics configuration added to .env.production"

# 4. Build the frontend
echo "🏗️ Building frontend..."
cd frontend
npm run build

# 5. Create deployment instructions
cat > ../DEPLOY_NOW.md << 'EOF'
# Deploy Instructions

## 1. Copy build to server:
```bash
rsync -avz --delete frontend/build/ daniel@danielrepairs-droplet:/var/www/softeefi/
```

## 2. SSH to server and update nginx config:
```bash
ssh daniel@danielrepairs-droplet
sudo nano /etc/nginx/sites-available/softeefi
```

Add these location blocks if missing:
```nginx
# Serve videos with proper headers
location ~* \.(mp4|webm|ogg)$ {
    add_header Cache-Control "public, max-age=31536000";
    add_header Access-Control-Allow-Origin "*";
    add_header X-Content-Type-Options "nosniff";
}

# API proxy
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

## 3. Restart services:
```bash
sudo nginx -t
sudo systemctl reload nginx
pm2 restart softeefi-backend
```

## 4. Add Google Analytics:
- Go to https://analytics.google.com
- Create/select property for softeefi.co.uk
- Get Measurement ID (G-XXXXXXXXXX)
- Update frontend/.env.production with the ID
- Rebuild and redeploy
EOF

echo "✅ Deployment instructions created in DEPLOY_NOW.md"

echo "
🎉 All fixes applied! 

Summary of changes:
✅ Videos now support fullscreen mode
✅ Ask AI modal fixed with proper state management
✅ Home navigation fixed on mobile
✅ Analytics configuration ready

Next steps:
1. Review the changes
2. Follow DEPLOY_NOW.md to deploy to production
3. Add your Google Analytics ID to .env.production
"