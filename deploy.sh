#!/bin/bash

# Deployment script for Softeefi website
# Run this from your local machine

SERVER="daniel@138.68.184.53"
SERVER_DIR="/var/www/softeefi"
LOCAL_DIR=$(pwd)

echo "🚀 Starting deployment to softeefi.co.uk..."

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm run build
cd ..

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf softeefi-deploy.tar.gz \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='*.log' \
  --exclude='.env' \
  Backend frontend ecosystem.config.js

# Transfer to server
echo "📤 Transferring files to server..."
scp -i ~/.ssh/id_rsa softeefi-deploy.tar.gz $SERVER:~/

# Execute deployment on server
echo "🔧 Deploying on server..."
ssh -i ~/.ssh/id_rsa $SERVER << 'ENDSSH'
  # Create directory if it doesn't exist
  sudo mkdir -p /var/www/softeefi
  sudo chown -R daniel:daniel /var/www/softeefi
  
  # Extract files
  cd /var/www/softeefi
  tar -xzf ~/softeefi-deploy.tar.gz
  rm ~/softeefi-deploy.tar.gz
  
  # Install backend dependencies
  cd Backend
  npm install --production
  
  # Create logs directory
  mkdir -p ../logs
  
  # Restart PM2 process
  pm2 stop softeefi-backend 2>/dev/null || true
  pm2 delete softeefi-backend 2>/dev/null || true
  cd ..
  pm2 start ecosystem.config.js
  pm2 save
  
  echo "✅ Deployment complete!"
ENDSSH

# Cleanup
rm softeefi-deploy.tar.gz

echo "🎉 Deployment finished! Visit https://softeefi.co.uk"