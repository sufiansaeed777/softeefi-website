#!/bin/bash

echo "Updating image references from PNG/JPG to WebP..."

cd /mnt/c/Users/sufia/Personal_Website/frontend/src

# Update all .png references to .webp
find . -type f \( -name "*.js" -o -name "*.jsx" \) -exec sed -i 's/\.png/\.webp/g' {} \;
find . -type f \( -name "*.js" -o -name "*.jsx" \) -exec sed -i 's/\.jpg/\.webp/g' {} \;
find . -type f \( -name "*.js" -o -name "*.jsx" \) -exec sed -i 's/\.jpeg/\.webp/g' {} \;

# Update any .mov references to .mp4
find . -type f \( -name "*.js" -o -name "*.jsx" \) -exec sed -i 's/\.mov"]/\.mp4"]/g' {} \;
find . -type f \( -name "*.js" -o -name "*.jsx" \) -exec sed -i 's/\.mov'\''/\.mp4'\''/g' {} \;

echo "Updated all image references to WebP and video references to MP4"
echo "Checking remaining PNG/JPG references..."
grep -r "\.png\|\.jpg\|\.jpeg" --include="*.js" --include="*.jsx" | wc -l