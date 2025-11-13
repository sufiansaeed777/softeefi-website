#!/bin/bash

# Deploy frontend build to softeefi.co.uk

echo "Building frontend..."
cd frontend
npm run build

echo "Deploying to server..."
# Using rsync to deploy build folder to server
rsync -avz --delete ./build/ root@softeefi.co.uk:/var/www/softeefi/

echo "Setting permissions..."
ssh root@softeefi.co.uk "chown -R www-data:www-data /var/www/softeefi/"
ssh root@softeefi.co.uk "chmod -R 755 /var/www/softeefi/"

echo "Restarting nginx..."
ssh root@softeefi.co.uk "systemctl reload nginx"

echo "Deployment complete!"