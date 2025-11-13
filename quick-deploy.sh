#!/bin/bash

# Quick deployment commands for Softeefi

echo "📦 Building optimized production bundle..."
cd /mnt/c/Users/sufia/Personal_Website/frontend

# Skip source maps for smaller bundle
export GENERATE_SOURCEMAP=false

# Build production
echo "Building... This may take a few minutes..."
npm run build

echo "✅ Build complete!"

# Display build size
echo "Build size: $(du -sh build | cut -f1)"

echo ""
echo "📤 Now deploy to server with these commands:"
echo ""
echo "# 1. Copy frontend build to server:"
echo "rsync -avz --delete /mnt/c/Users/sufia/Personal_Website/frontend/build/ daniel@138.68.184.53:/var/www/softeefi/frontend/"
echo ""
echo "# 2. Copy backend to server:"
echo "rsync -avz --exclude 'node_modules' --exclude '.env' /mnt/c/Users/sufia/Personal_Website/Backend/ daniel@138.68.184.53:/var/www/softeefi/backend/"
echo ""
echo "# 3. SSH to server and update nginx:"
echo "ssh daniel@138.68.184.53"
echo "sudo cp /home/daniel/nginx-softeefi-optimized.conf /etc/nginx/sites-available/softeefi"
echo "sudo nginx -t && sudo systemctl reload nginx"