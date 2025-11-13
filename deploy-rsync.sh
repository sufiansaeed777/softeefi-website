#!/bin/bash

# Deployment script for Softeefi using rsync
# Similar to your existing deployment workflow

echo "🚀 Starting Softeefi deployment..."

# Build frontend first
echo "📦 Building frontend..."
cd frontend
npm run build
cd ..

# Deploy frontend build files
echo "📤 Deploying frontend..."
rsync -avz --delete \
    -e "ssh -i ~/.ssh/id_rsa" \
    /mnt/c/Users/sufia/Personal_Website/frontend/build/ \
    daniel@138.68.184.53:/var/www/softeefi/frontend/build/

# Deploy backend files
echo "📤 Deploying backend..."
rsync -avz --delete \
    --exclude 'node_modules' \
    --exclude '*.log' \
    --exclude '.env' \
    --exclude '.git' \
    -e "ssh -i ~/.ssh/id_rsa" \
    /mnt/c/Users/sufia/Personal_Website/Backend/ \
    daniel@138.68.184.53:/var/www/softeefi/backend/

# Copy ecosystem config
echo "📤 Copying PM2 config..."
scp -i ~/.ssh/id_rsa ecosystem.config.js daniel@138.68.184.53:/var/www/softeefi/

# Install dependencies and restart on server
echo "🔧 Installing dependencies and restarting services..."
ssh -i ~/.ssh/id_rsa daniel@138.68.184.53 << 'ENDSSH'
    cd /var/www/softeefi/backend
    npm install --production
    
    # Restart PM2
    pm2 restart softeefi-backend || pm2 start /var/www/softeefi/ecosystem.config.js
    pm2 save
    
    echo "✅ Deployment complete!"
ENDSSH

echo "🎉 Deployment finished! Visit https://softeefi.co.uk"