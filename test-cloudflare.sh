#!/bin/bash

echo "=== Testing CloudFlare Activation ==="
echo ""

# Test 1: Check if CloudFlare is active
echo "Test 1: Checking CloudFlare headers..."
curl -I https://softeefi.co.uk 2>/dev/null | grep -E "cf-ray|CF-RAY|cf-cache-status|server"

echo ""
echo "Test 2: Checking nameserver propagation..."
nslookup softeefi.co.uk 8.8.8.8 | grep -A2 "Name:"

echo ""
echo "Test 3: Checking CloudFlare IP resolution..."
dig softeefi.co.uk +short

echo ""
echo "=== What to look for ==="
echo "✅ If you see 'cf-ray' header = CloudFlare is ACTIVE!"
echo "✅ If you see CloudFlare IPs (104.x.x.x or 172.x.x.x) = DNS propagated!"
echo "❌ If no cf-ray = Still propagating, check again in 30 mins"