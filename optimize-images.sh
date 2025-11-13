#!/bin/bash

# Image optimization script for Softeefi website
echo "Starting image optimization..."

# Navigate to images directory
cd frontend/public/images/hero

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick not found. Installing..."
    sudo apt-get update && sudo apt-get install -y imagemagick webp
fi

# Optimize hero images
echo "Optimizing hero images..."

# Convert and compress cybernetic-man.png
if [ -f "cybernetic-man.png" ]; then
    echo "Optimizing cybernetic-man.png..."
    # Create optimized JPG version
    convert cybernetic-man.png -quality 85 -resize 1920x1080\> cybernetic-man-optimized.jpg
    # Create WebP version for modern browsers
    cwebp -q 85 cybernetic-man.png -o cybernetic-man.webp
fi

# Convert and compress cybernetic-woman.png
if [ -f "cybernetic-woman.png" ]; then
    echo "Optimizing cybernetic-woman.png..."
    # Create optimized JPG version
    convert cybernetic-woman.png -quality 85 -resize 1920x1080\> cybernetic-woman-optimized.jpg
    # Create WebP version for modern browsers
    cwebp -q 85 cybernetic-woman.png -o cybernetic-woman.webp
fi

# Check file sizes
echo ""
echo "File sizes after optimization:"
ls -lh *.{png,jpg,webp} 2>/dev/null

echo ""
echo "Optimization complete! Update your React components to use the optimized images."
echo "Use .webp with .jpg fallback for best performance."