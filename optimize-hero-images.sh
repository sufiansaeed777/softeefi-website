#!/bin/bash

# Hero Image Optimization Script
# This script optimizes hero images for faster loading

echo "🖼️  Starting hero image optimization..."

# Create optimized directory if it doesn't exist
mkdir -p frontend/public/images/hero

# Function to optimize image
optimize_image() {
    local input_file="$1"
    local output_base="${input_file%.*}"
    
    if [ -f "$input_file" ]; then
        echo "Processing: $input_file"
        
        # Create WebP version (best compression)
        if command -v cwebp &> /dev/null; then
            cwebp -q 85 "$input_file" -o "${output_base}-optimized.webp"
            echo "  ✓ Created WebP: ${output_base}-optimized.webp"
        else
            echo "  ⚠ cwebp not found. Install with: sudo apt-get install webp"
        fi
        
        # Create optimized JPEG version
        if command -v convert &> /dev/null; then
            # Resize if larger than 2000px width while maintaining aspect ratio
            convert "$input_file" \
                -resize '2000>' \
                -quality 85 \
                -strip \
                -interlace Plane \
                -gaussian-blur 0.05 \
                -colorspace sRGB \
                "${output_base}-optimized.jpg"
            echo "  ✓ Created optimized JPG: ${output_base}-optimized.jpg"
            
            # Create a low-quality placeholder (for progressive loading)
            convert "$input_file" \
                -resize '50x' \
                -quality 20 \
                -blur 0x2 \
                -strip \
                "${output_base}-placeholder.jpg"
            echo "  ✓ Created placeholder: ${output_base}-placeholder.jpg"
        else
            echo "  ⚠ ImageMagick not found. Install with: sudo apt-get install imagemagick"
        fi
        
        # Get file sizes for comparison
        if [ -f "${output_base}-optimized.webp" ]; then
            original_size=$(du -h "$input_file" | cut -f1)
            webp_size=$(du -h "${output_base}-optimized.webp" | cut -f1)
            echo "  📊 Size comparison: Original: $original_size → WebP: $webp_size"
        fi
    else
        echo "  ❌ File not found: $input_file"
    fi
}

# Optimize hero images
echo ""
echo "Optimizing desktop hero image..."
optimize_image "frontend/public/images/hero/cybernetic-woman.png"

echo ""
echo "Optimizing mobile hero image..."
optimize_image "frontend/public/images/hero-mobile-girl.png"

# Additional optimizations for any other hero images
for img in frontend/public/images/hero*.{png,jpg,jpeg} 2>/dev/null; do
    if [ -f "$img" ] && [[ ! "$img" == *"-optimized"* ]] && [[ ! "$img" == *"-placeholder"* ]]; then
        echo ""
        echo "Found additional hero image..."
        optimize_image "$img"
    fi
done

echo ""
echo "✅ Hero image optimization complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update your components to use the optimized images"
echo "2. Implement the OptimizedHeroImages component"
echo "3. Add preload links in your HTML head:"
echo '   <link rel="preload" as="image" href="/images/hero/cybernetic-woman-optimized.webp" type="image/webp">'
echo '   <link rel="preload" as="image" href="/images/hero-mobile-girl-optimized.webp" type="image/webp" media="(max-width: 768px)">'