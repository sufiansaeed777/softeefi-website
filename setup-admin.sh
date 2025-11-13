#!/bin/bash

echo "Setting up Admin User for Analytics Dashboard"
echo "============================================="
echo ""

# Check if email is provided
if [ -z "$1" ]; then
    echo "Usage: ./setup-admin.sh your-email@example.com"
    exit 1
fi

EMAIL=$1

echo "Making user $EMAIL an admin..."
cd Backend
node scripts/makeAdmin.js $EMAIL

echo ""
echo "✅ Setup complete! You can now access the analytics dashboard at:"
echo "   https://softeefi.co.uk/analytics"
echo ""
echo "Login with:"
echo "   Email: $EMAIL"
echo "   Password: [your existing password]"
echo ""
echo "If the user doesn't exist, create one first at the signup page."