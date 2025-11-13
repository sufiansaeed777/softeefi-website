#!/bin/bash

echo "=== Testing CDN Performance ==="
echo ""

# Test 1: Check cache status
echo "1. Testing cache headers:"
curl -sI https://softeefi.co.uk/images/logo.png | grep -E "cf-cache-status|cache-control|age"

echo ""
echo "2. Testing global latency (CloudFlare edge locations):"
# Test from different CloudFlare edge servers
for location in "www.softeefi.co.uk" "softeefi.co.uk"; do
  echo -n "$location: "
  curl -o /dev/null -s -w "Time: %{time_total}s\n" https://$location
done

echo ""
echo "3. Testing compression:"
curl -H "Accept-Encoding: gzip" -sI https://softeefi.co.uk | grep -i "content-encoding"

echo ""
echo "4. CDN cache performance:"
# First request (cache miss)
echo -n "First request (cache miss): "
time1=$(curl -o /dev/null -s -w "%{time_total}" https://softeefi.co.uk/robots.txt)
echo "${time1}s"

# Second request (cache hit)
echo -n "Second request (cache hit): "
time2=$(curl -o /dev/null -s -w "%{time_total}" https://softeefi.co.uk/robots.txt)
echo "${time2}s"

echo ""
echo "=== What good results look like ==="
echo "✅ cf-cache-status: HIT = Content served from CDN"
echo "✅ content-encoding: gzip or br = Compression working"
echo "✅ Second request faster than first = Cache working"
echo "✅ Times under 0.5s = Good CDN performance"