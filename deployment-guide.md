# Softeefi Website Deployment Guide

## Prerequisites on Server
- Node.js (v16 or higher)
- npm
- PM2 (process manager)
- Nginx (web server)
- MongoDB
- Git

## Step-by-Step Deployment

### 1. Prepare Local Files

First, build the React frontend locally:
```bash
cd frontend
npm run build
```

### 2. Create Directory Structure on Server

On your server, create the application directory:
```bash
sudo mkdir -p /var/www/softeefi
sudo chown -R daniel:daniel /var/www/softeefi
cd /var/www/softeefi
```

### 3. Transfer Files to Server

From your local machine, use SCP to transfer files:
```bash
# Create a deployment archive (run from project root)
tar -czf softeefi-deploy.tar.gz --exclude='node_modules' --exclude='.git' Backend frontend

# Transfer to server
scp -i ~/.ssh/id_rsa softeefi-deploy.tar.gz daniel@138.68.184.53:/var/www/softeefi/

# On server, extract files
cd /var/www/softeefi
tar -xzf softeefi-deploy.tar.gz
rm softeefi-deploy.tar.gz
```

### 4. Install Dependencies

```bash
# Install backend dependencies
cd /var/www/softeefi/Backend
npm install --production

# Frontend is already built, no need to install dependencies
```

### 5. Configure Environment Variables

```bash
cd /var/www/softeefi/Backend
cp .env.example .env
nano .env
```

Update the .env file with:
- MongoDB connection string
- Email credentials
- JWT secret
- Port (use a unique port like 4001 if 4000 is taken)

### 6. Set up Nginx Configuration

Create nginx config:
```bash
sudo nano /etc/nginx/sites-available/softeefi
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name softeefi.co.uk www.softeefi.co.uk;

    # Frontend
    location / {
        root /var/www/softeefi/frontend/build;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:4001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Increase client body size for file uploads
    client_max_body_size 10M;
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/softeefi /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 7. Set up PM2

```bash
cd /var/www/softeefi/Backend
pm2 start server.js --name softeefi-backend
pm2 save
pm2 startup
```

### 8. Configure SSL with Let's Encrypt

```bash
sudo certbot --nginx -d softeefi.co.uk -d www.softeefi.co.uk
```

### 9. Update DNS Records

In GoDaddy, set these DNS records:
- A Record: @ → 138.68.184.53
- A Record: www → 138.68.184.53

### 10. Final Steps

1. Test the backend:
   ```bash
   curl http://localhost:4001/api/contact
   ```

2. Check PM2 status:
   ```bash
   pm2 status
   pm2 logs softeefi-backend
   ```

3. Test nginx:
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

## Maintenance Commands

- View logs: `pm2 logs softeefi-backend`
- Restart backend: `pm2 restart softeefi-backend`
- Update code: Pull changes and `pm2 reload softeefi-backend`
- Monitor: `pm2 monit`

## Troubleshooting

1. If port 4001 is in use, change it in .env and nginx config
2. Check MongoDB is running: `sudo systemctl status mongodb`
3. Check firewall allows ports 80 and 443
4. Verify DNS propagation: `nslookup softeefi.co.uk`