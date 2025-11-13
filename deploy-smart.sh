#!/bin/bash

# Smart deployment script that preserves optimized media files
# This excludes images and videos from sync to keep server-optimized versions

echo "🚀 Smart Deployment to Softeefi Server"
echo "======================================="
echo "This deployment preserves server-optimized media files"
echo ""

# Build the frontend first
echo "📦 Building frontend..."
cd frontend
npm run build
cd ..

echo ""
echo "📤 Deploying to server (excluding media files)..."

# Deploy frontend build, excluding images and videos to preserve server optimizations
rsync -avz \
  --delete \
  --exclude='images/' \
  --exclude='*.mp4' \
  --exclude='*.mov' \
  --exclude='*.webp' \
  --exclude='*.webm' \
  --exclude='*.jpg' \
  --exclude='*.jpeg' \
  --exclude='*.png' \
  --exclude='*.gif' \
  --exclude='reports/' \
  -e "ssh -i ~/.ssh/id_rsa" \
  /mnt/c/Users/sufia/Personal_Website/frontend/build/ \
  daniel@138.68.184.53:/var/www/softeefi/frontend/build/

echo ""
echo "📤 Deploying backend (excluding node_modules and .env)..."

# Deploy backend, excluding node_modules and sensitive files
rsync -avz \
  --exclude='node_modules/' \
  --exclude='.env' \
  --exclude='.env.local' \
  --exclude='*.log' \
  --exclude='uploads/' \
  -e "ssh -i ~/.ssh/id_rsa" \
  /mnt/c/Users/sufia/Personal_Website/Backend/ \
  daniel@138.68.184.53:/var/www/softeefi/Backend/

echo ""
echo "🔄 Restarting services on server..."

# Restart PM2 and nginx on server
ssh -i ~/.ssh/id_rsa daniel@138.68.184.53 << 'EOF'
  cd /var/www/softeefi/Backend
  npm install --production
  pm2 restart softeefi-backend
  pm2 save
  sudo nginx -s reload
  echo "✅ Services restarted successfully"
EOF

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📊 Don't forget to run './setup-admin.sh your-email@example.com' on the server"
echo "   to set up admin access for the analytics dashboard"
echo ""
echo "🔗 Your site is live at: https://softeefi.co.uk"
echo "📈 Analytics dashboard: https://softeefi.co.uk/analytics"