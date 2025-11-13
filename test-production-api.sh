#!/bin/bash

# Production API Test Script for Softeefi
# Usage: ./test-production-api.sh [local|production]

echo "========================================="
echo "   Softeefi API Test Script"
echo "========================================="

# Determine environment
if [ "$1" == "production" ]; then
    API_URL="https://softeefi.co.uk"
    echo "Testing PRODUCTION API at: $API_URL"
else
    API_URL="http://localhost:4000"
    echo "Testing LOCAL API at: $API_URL"
fi

echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Health Check
echo "1. Testing Health Endpoint..."
echo "   GET $API_URL/api/health"
HEALTH_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" "$API_URL/api/health")
HTTP_STATUS=$(echo "$HEALTH_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$HEALTH_RESPONSE" | sed -n '1,/HTTP_STATUS/p' | sed '$d')

if [ "$HTTP_STATUS" == "200" ]; then
    echo -e "   ${GREEN}✓ Health check passed (HTTP $HTTP_STATUS)${NC}"
    echo "   Response: $BODY"
else
    echo -e "   ${RED}✗ Health check failed (HTTP $HTTP_STATUS)${NC}"
    echo "   Response: $BODY"
fi

echo ""

# Test 2: Gemini API
echo "2. Testing Gemini AI Endpoint..."
echo "   POST $API_URL/api/gemini/chat"
GEMINI_DATA='{
    "question": "What is Softeefi?",
    "service": "General",
    "systemPrompt": "Answer briefly in one sentence."
}'

GEMINI_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -X POST "$API_URL/api/gemini/chat" \
    -H "Content-Type: application/json" \
    -d "$GEMINI_DATA")

HTTP_STATUS=$(echo "$GEMINI_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$GEMINI_RESPONSE" | sed -n '1,/HTTP_STATUS/p' | sed '$d')

if [ "$HTTP_STATUS" == "200" ]; then
    SUCCESS=$(echo "$BODY" | grep -o '"success":true')
    if [ ! -z "$SUCCESS" ]; then
        echo -e "   ${GREEN}✓ Gemini API is working (HTTP $HTTP_STATUS)${NC}"
        echo "   Response preview: $(echo "$BODY" | cut -c1-100)..."
    else
        echo -e "   ${YELLOW}⚠ Gemini API returned error (HTTP $HTTP_STATUS)${NC}"
        echo "   Response: $BODY"
    fi
else
    echo -e "   ${RED}✗ Gemini API failed (HTTP $HTTP_STATUS)${NC}"
    echo "   Response: $BODY"
fi

echo ""

# Test 3: OpenAI API
echo "3. Testing OpenAI API Endpoint..."
echo "   POST $API_URL/api/ai/ask"
OPENAI_DATA='{
    "field": "general",
    "question": "What services does Softeefi offer?"
}'

OPENAI_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -X POST "$API_URL/api/ai/ask" \
    -H "Content-Type: application/json" \
    -d "$OPENAI_DATA")

HTTP_STATUS=$(echo "$OPENAI_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$OPENAI_RESPONSE" | sed -n '1,/HTTP_STATUS/p' | sed '$d')

if [ "$HTTP_STATUS" == "200" ]; then
    SUCCESS=$(echo "$BODY" | grep -o '"success":true')
    if [ ! -z "$SUCCESS" ]; then
        echo -e "   ${GREEN}✓ OpenAI API is working (HTTP $HTTP_STATUS)${NC}"
        echo "   Response preview: $(echo "$BODY" | cut -c1-100)..."
    else
        echo -e "   ${YELLOW}⚠ OpenAI API returned error (HTTP $HTTP_STATUS)${NC}"
        echo "   Response: $BODY"
    fi
else
    echo -e "   ${RED}✗ OpenAI API failed (HTTP $HTTP_STATUS)${NC}"
    echo "   Response: $BODY"
fi

echo ""

# Test 4: Check for common issues
echo "4. Diagnostic Information..."

# Check if server is reachable
if [ "$HTTP_STATUS" == "000" ]; then
    echo -e "   ${RED}✗ Cannot reach server at $API_URL${NC}"
    echo "   Possible issues:"
    echo "   - Server is not running"
    echo "   - Firewall blocking connection"
    echo "   - Wrong URL or port"
fi

# Check for CORS issues (browser-specific)
CORS_HEADER=$(curl -s -I "$API_URL/api/health" | grep -i "access-control-allow-origin")
if [ ! -z "$CORS_HEADER" ]; then
    echo -e "   ${GREEN}✓ CORS headers present${NC}"
    echo "   $CORS_HEADER"
else
    echo -e "   ${YELLOW}⚠ No CORS headers detected${NC}"
    echo "   This might cause issues in browser"
fi

echo ""
echo "========================================="
echo "   Test Summary"
echo "========================================="

# Summary based on what we found
if curl -s --head "$API_URL/api/health" | head -n 1 | grep "200" > /dev/null; then
    echo -e "${GREEN}Backend server is running${NC}"
    
    # Check API keys based on responses
    if echo "$GEMINI_RESPONSE" | grep -q "API_KEY_MISSING\|not configured"; then
        echo -e "${YELLOW}⚠ Gemini API key not configured on server${NC}"
        echo "  Fix: Add GEMINI_API_KEY to .env file"
    elif echo "$GEMINI_RESPONSE" | grep -q "success\":true"; then
        echo -e "${GREEN}✓ Gemini API is working${NC}"
    fi
    
    if echo "$OPENAI_RESPONSE" | grep -q "not configured\|fallback\":true"; then
        echo -e "${YELLOW}⚠ OpenAI API key not configured on server${NC}"
        echo "  Fix: Add OPENAI_API_KEY to .env file (optional)"
    elif echo "$OPENAI_RESPONSE" | grep -q "success\":true"; then
        echo -e "${GREEN}✓ OpenAI API is working${NC}"
    fi
else
    echo -e "${RED}✗ Backend server is not reachable${NC}"
    echo "  Check if server is running and accessible"
fi

echo ""
echo "To fix API issues on production:"
echo "1. SSH into your server"
echo "2. Check .env file: cat /path/to/backend/.env"
echo "3. Add missing keys:"
echo "   GEMINI_API_KEY=your-key-here"
echo "   OPENAI_API_KEY=your-key-here (optional)"
echo "4. Restart server: pm2 restart backend"