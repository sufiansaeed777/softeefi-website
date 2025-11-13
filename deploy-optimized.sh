#!/bin/bash

# Deployment script for Softeefi with performance optimizations

echo "🚀 Starting optimized deployment for Softeefi..."

# Variables
SERVER="daniel@138.68.184.53"
REMOTE_PATH="/var/www/softeefi"
LOCAL_FRONTEND="/mnt/c/Users/sufia/Personal_Website/frontend"
LOCAL_BACKEND="/mnt/c/Users/sufia/Personal_Website/Backend"

# Build frontend with optimizations
echo "📦 Building optimized frontend..."
cd $LOCAL_FRONTEND

# Set environment variable to skip source maps (smaller bundle)
export GENERATE_SOURCEMAP=false

# Build the production bundle
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix errors and try again."
    exit 1
fi

echo "✅ Build completed successfully"

# Get build size
BUILD_SIZE=$(du -sh build | cut -f1)
echo "📊 Build size: $BUILD_SIZE"

# Deploy to server
echo "📤 Deploying to server..."

# Create deployment directory if it doesn't exist
ssh $SERVER "sudo mkdir -p $REMOTE_PATH"

# Deploy frontend build
echo "📤 Uploading frontend build..."
rsync -avz --delete \
    $LOCAL_FRONTEND/build/ \
    $SERVER:$REMOTE_PATH/frontend/

# Deploy backend
echo "📤 Uploading backend..."
rsync -avz \
    --exclude 'node_modules' \
    --exclude '.env' \
    --exclude 'logs' \
    $LOCAL_BACKEND/ \
    $SERVER:$REMOTE_PATH/backend/

# Install backend dependencies and restart
echo "🔧 Installing dependencies and restarting services..."
ssh $SERVER << 'EOF'
    cd /var/www/softeefi/backend
    npm install --production
    
    # Restart PM2 or backend service
    pm2 restart softeefi-backend || pm2 start server.js --name softeefi-backend
    
    # Reload nginx
    sudo nginx -t && sudo systemctl reload nginx
    
    echo "✅ Services restarted"
EOF

echo "🎉 Deployment completed successfully!"
echo "🌐 Visit https://softeefi.com to see the optimized version"