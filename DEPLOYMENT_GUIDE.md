# HDLP2 Deployment Guide

Complete step-by-step guide to deploy the HDLP2 Django application on a Debian 13 VPS (tested on Hostinger VPS).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Server Setup](#server-setup)
- [Django Application Setup](#django-application-setup)
- [Production Configuration](#production-configuration)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Debian 13 VPS server
- Root access to the server
- Domain name (optional) or VPS IP address
- Basic knowledge of Linux commands

## Server Setup

### 1. Update System and Install Dependencies

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install python3 python3-pip python3-venv git sqlite3 nginx -y
```

### 2. Clone the Project

```bash
# Navigate to root directory
cd /root

# Clone the repository
git clone https://github.com/AleksejSlokvenko/HDLP2.git
cd HDLP2
```

## Django Application Setup

### 3. Create Virtual Environment

```bash
# Create virtual environment
python3 -m venv hdlp_env

# Activate virtual environment
source hdlp_env/bin/activate
```

### 4. Install Python Dependencies

```bash
# Install Django and required packages
pip install django gtts gunicorn
```

**Note:** `playsound` library has compatibility issues with Python 3.13 on Debian. The application works without it as the import is commented out in `views.py`.

### 5. Fix Views File

Remove any stray text from `hdlpApp/views.py` line 3:

```python
import os
import time
# import playsound
from gtts import gTTS

from django.shortcuts import render, redirect
```

### 6. Configure Django Settings

Edit `HDLP2/settings.py`:

```python
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False  # Change to False for production

# Add your server IP and domain
ALLOWED_HOSTS = ['your-vps-ip', 'your-domain.com', 'localhost']

# Static files configuration
STATIC_URL = '/static/'
STATIC_ROOT = '/var/www/hdlp2/static/'

# Keep existing STATICFILES_DIRS if present
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'hdlpApp/static'),
]

# Set correct timezone
TIME_ZONE = 'America/New_York'  # or your preferred timezone
```

Replace `your-vps-ip` and `your-domain.com` with actual values.

### 7. Database Setup

```bash
# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser
```

### 8. Collect Static Files

```bash
# Create static files directory
sudo mkdir -p /var/www/hdlp2/static/

# Collect static files
python manage.py collectstatic --noinput

# Set proper permissions
sudo chown -R www-data:www-data /var/www/hdlp2/
sudo chmod -R 755 /var/www/hdlp2/
```

## Production Configuration

### 9. Create Gunicorn Configuration

Create `/root/HDLP2/gunicorn_config.py`:

```python
bind = "127.0.0.1:8080"
workers = 3
worker_class = "sync"
worker_connections = 1000
max_requests = 1000
max_requests_jitter = 100
timeout = 30
keepalive = 2
user = "root"
group = "root"
tmp_upload_dir = None
errorlog = "/root/HDLP2/logs/gunicorn_error.log"
accesslog = "/root/HDLP2/logs/gunicorn_access.log"
loglevel = "info"
```

### 10. Create Log Directory

```bash
mkdir -p /root/HDLP2/logs
```

### 11. Create Systemd Service

Create `/etc/systemd/system/hdlp2.service`:

```ini
[Unit]
Description=HDLP2 Django Application
After=network.target

[Service]
User=root
Group=root
WorkingDirectory=/root/HDLP2
Environment="PATH=/root/HDLP2/hdlp_env/bin"
ExecStart=/root/HDLP2/hdlp_env/bin/gunicorn --config /root/HDLP2/gunicorn_config.py HDLP2.wsgi:application
ExecReload=/bin/kill -s HUP $MAINPID
Restart=always

[Install]
WantedBy=multi-user.target
```

### 12. Configure Nginx

Create `/etc/nginx/sites-available/hdlp2`:

```nginx
server {
    listen 80;
    server_name your-vps-ip your-domain.com;

    # Static files
    location /static/ {
        alias /var/www/hdlp2/static/;
        expires 30d;
        add_header Cache-Control "public";
    }

    # Favicon
    location = /favicon.ico {
        alias /var/www/hdlp2/static/img/favicon.ico;
        access_log off;
        log_not_found off;
    }

    # Main application
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 13. Enable Nginx Site

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/hdlp2 /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

### 14. Configure Firewall

```bash
# Allow HTTP traffic
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT

# Allow HTTPS traffic
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Allow SSH
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Save rules
sudo mkdir -p /etc/iptables
sudo iptables-save | sudo tee /etc/iptables/rules.v4

# Install iptables-persistent for boot persistence
sudo apt install iptables-persistent
```

### 15. Start Services

```bash
# Enable and start Django service
sudo systemctl daemon-reload
sudo systemctl enable hdlp2
sudo systemctl start hdlp2

# Enable and start nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 16. Verify Deployment

```bash
# Check service status
sudo systemctl status hdlp2
sudo systemctl status nginx

# Check if services are listening on correct ports
sudo netstat -tlnp | grep :80   # nginx
sudo netstat -tlnp | grep :8080 # gunicorn
```

## Application Access

Your Django application should now be accessible at:

- `http://your-vps-ip` - Parents view (default)
- `http://your-vps-ip/childs_view` - Child's view
- `http://your-vps-ip/making_bed` - Making bed lesson
- `http://your-vps-ip/making_friend` - Making friend lesson
- `http://your-vps-ip/washing_hands` - Washing hands lesson
- `http://your-vps-ip/fine_gross_motor_skills` - Motor skills lesson

## SSL Configuration (Optional)

To enable HTTPS with Let's Encrypt:

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal will be set up automatically
```

## Troubleshooting

### Check Service Logs

```bash
# Django/Gunicorn logs
sudo journalctl -u hdlp2 -f
tail -f /root/HDLP2/logs/gunicorn_error.log

# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Restart Services

```bash
# Restart Django service
sudo systemctl restart hdlp2

# Restart nginx
sudo systemctl restart nginx
```

### Common Issues

1. **502 Bad Gateway**: Usually means gunicorn isn't running or wrong port

   - Check: `sudo systemctl status hdlp2`
   - Check: `sudo netstat -tlnp | grep :8080`

2. **403 Forbidden for static files**: Permissions issue

   - Fix: `sudo chown -R www-data:www-data /var/www/hdlp2/`
   - Fix: `sudo chmod -R 755 /var/www/hdlp2/`

3. **DisallowedHost error**: Django ALLOWED_HOSTS configuration

   - Update `ALLOWED_HOSTS` in `HDLP2/settings.py`
   - Restart: `sudo systemctl restart hdlp2`

4. **Port already in use**: Kill existing processes
   - Check: `sudo netstat -tlnp | grep :8080`
   - Kill: `sudo kill -9 <PID>`

### Update Application

To update the application after code changes:

```bash
# Pull latest changes
cd /root/HDLP2
git pull

# Activate virtual environment
source hdlp_env/bin/activate

# Collect static files if needed
python manage.py collectstatic --noinput

# Restart services
sudo systemctl restart hdlp2
sudo systemctl restart nginx
```

## Production Considerations

- Set `DEBUG = False` in production
- Use environment variables for sensitive settings
- Consider using PostgreSQL instead of SQLite for production
- Set up regular backups
- Monitor logs and performance
- Use a CDN for static files if needed

## Support

For issues related to deployment, check the troubleshooting section above or review the service logs for specific error messages.
