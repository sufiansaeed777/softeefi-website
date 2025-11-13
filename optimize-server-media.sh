#!/bin/bash

echo "=== Media Optimization Script for softeefi.co.uk ==="
echo ""

# SSH into server and run optimizations
ssh daniel@138.68.184.53 << 'EOF'
echo "Connected to server..."
cd /var/www/softeefi/frontend/build/images

echo "Step 1: Converting PNG/JPG to WebP..."
echo "danielimad" | sudo -S bash -c 'for img in $(find . -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \)); do 
  webp="${img%.*}.webp"
  if [ ! -f "$webp" ]; then 
    echo "Converting: $img"
    cwebp -q 85 "$img" -o "$webp" 2>/dev/null
  fi
done'

echo ""
echo "Step 2: Counting converted files..."
echo "WebP files created: $(find . -type f -name '*.webp' | wc -l)"

echo ""
echo "Step 3: Optimizing large video files..."
if [ -f "portfolio/funfactory/demo.mov" ]; then
  echo "Compressing funfactory demo (462MB -> ~50MB)..."
  echo "danielimad" | sudo -S ffmpeg -i portfolio/funfactory/demo.mov -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k portfolio/funfactory/demo_compressed.mp4 -y 2>/dev/null
  echo "danielimad" | sudo -S mv portfolio/funfactory/demo_compressed.mp4 portfolio/funfactory/demo.mp4
  echo "danielimad" | sudo -S rm portfolio/funfactory/demo.mov
fi

if [ -f "portfolio/townhouse/demo.mov" ]; then
  echo "Compressing townhouse demo (445MB -> ~50MB)..."
  echo "danielimad" | sudo -S ffmpeg -i portfolio/townhouse/demo.mov -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k portfolio/townhouse/demo_compressed.mp4 -y 2>/dev/null
  echo "danielimad" | sudo -S mv portfolio/townhouse/demo_compressed.mp4 portfolio/townhouse/demo.mp4
  echo "danielimad" | sudo -S rm portfolio/townhouse/demo.mov
fi

if [ -f "portfolio/mxonline/demo.mov" ]; then
  echo "Compressing mxonline demo (299MB -> ~35MB)..."
  echo "danielimad" | sudo -S ffmpeg -i portfolio/mxonline/demo.mov -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k portfolio/mxonline/demo_compressed.mp4 -y 2>/dev/null
  echo "danielimad" | sudo -S mv portfolio/mxonline/demo_compressed.mp4 portfolio/mxonline/demo.mp4
  echo "danielimad" | sudo -S rm portfolio/mxonline/demo.mov
fi

echo ""
echo "Step 4: Removing original PNG/JPG files..."
echo "danielimad" | sudo -S find . -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) -delete

echo ""
echo "Step 5: Setting correct permissions..."
echo "danielimad" | sudo -S chown -R www-data:www-data /var/www/softeefi/frontend/build/

echo ""
echo "=== Optimization Complete ==="
echo "PNG/JPG remaining: $(find . -type f \( -name '*.png' -o -name '*.jpg' -o -name '*.jpeg' \) | wc -l)"
echo "WebP files: $(find . -type f -name '*.webp' | wc -l)"
echo "Video files: $(find . -type f \( -name '*.mp4' -o -name '*.mov' -o -name '*.webm' \) -exec du -h {} \; | sort -h)"
echo ""
echo "Total size of images directory:"
du -sh /var/www/softeefi/frontend/build/images
EOF

echo ""
echo "=== All optimizations completed successfully ==="