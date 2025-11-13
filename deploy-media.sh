#!/bin/bash

# Script to deploy only NEW media files (won't overwrite existing optimized ones)
# Use this when you add new images/videos to your project

echo "📸 Media Files Deployment (New Files Only)"
echo "=========================================="
echo "This will only add NEW media files, not overwrite existing ones"
echo ""

read -p "Are you sure you want to deploy new media files? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Deployment cancelled"
    exit 1
fi

echo ""
echo "📤 Deploying new media files..."

# Deploy only NEW media files (ignore existing ones to preserve server optimizations)
rsync -avz \
  --ignore-existing \
  --include='*/' \
  --include='*.mp4' \
  --include='*.mov' \
  --include='*.webp' \
  --include='*.webm' \
  --include='*.jpg' \
  --include='*.jpeg' \
  --include='*.png' \
  --include='*.gif' \
  --include='*.svg' \
  --exclude='*' \
  -e "ssh -i ~/.ssh/id_rsa" \
  /mnt/c/Users/sufia/Personal_Website/frontend/build/images/ \
  daniel@138.68.184.53:/var/www/softeefi/frontend/build/images/

echo ""
echo "✅ New media files deployed!"
echo ""
echo "💡 Tip: Run the optimization script on the server to convert any new images to WebP"
echo "   ssh daniel@138.68.184.53 'cd /var/www/softeefi && ./optimize-images.sh'"