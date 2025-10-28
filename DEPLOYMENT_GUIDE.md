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
# Support environment variable control
DEBUG = os.getenv('DJANGO_DEBUG', 'False').lower() in ('true', '1', 'yes', 'on')

# Add your server IP and domain
ALLOWED_HOSTS = ['your-vps-ip', 'your-domain.com', 'localhost']

# HTTPS settings - automatically enabled in production (when DEBUG=False)
if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True

    # HSTS settings
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True

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

**Note**: For production deployment, ensure `DJANGO_DEBUG` environment variable is not set or is set to `False`. The HTTPS security settings will be automatically activated.

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

- `http://your-vps-ip` or `https://your-domain.com` - Parents view (default)
- `http://your-vps-ip/childs_view` or `https://your-domain.com/childs_view` - Child's view
- `http://your-vps-ip/making_bed` or `https://your-domain.com/making_bed` - Making bed lesson
- `http://your-vps-ip/making_friend` or `https://your-domain.com/making_friend` - Making friend lesson
- `http://your-vps-ip/washing_hands` or `https://your-domain.com/washing_hands` - Washing hands lesson
- `http://your-vps-ip/fine_gross_motor_skills` or `https://your-domain.com/fine_gross_motor_skills` - Motor skills lesson

**With HTTPS enabled**: All HTTP requests will automatically redirect to HTTPS for security.

## HTTPS/SSL Configuration

### Method 1: Let's Encrypt (Recommended - Free SSL)

#### Step 1: Install Certbot

```bash
# Update package list
sudo apt update

# Install Certbot and nginx plugin
sudo apt install certbot python3-certbot-nginx

# Verify installation
certbot --version
```

#### Step 2: Obtain SSL Certificate

```bash
# Get SSL certificate for your domain
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Example for sdplatform.org:
sudo certbot --nginx -d sdplatform.org -d www.sdplatform.org
```

**Note**: If automatic installation fails, proceed with manual configuration below.

#### Step 3: Manual nginx Configuration (if auto-install fails)

Update `/etc/nginx/sites-available/hdlp2`:

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL configuration - using the Let's Encrypt certificate
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # SSL security settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";

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
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header X-Forwarded-Host $host;
        proxy_redirect off;
    }
}
```

#### Step 4: Update Django Settings for HTTPS

The Django settings are now automatically configured to enable HTTPS settings in production. The following settings are automatically applied when `DEBUG=False`:

```python
# Update ALLOWED_HOSTS with your domain
ALLOWED_HOSTS = ['your-domain.com', 'www.your-domain.com', 'your-vps-ip', 'localhost']

# HTTPS settings - automatically enabled when DEBUG=False
if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True

    # HSTS settings (HTTP Strict Transport Security)
    SECURE_HSTS_SECONDS = 31536000  # 1 year
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
```

**No manual configuration needed** - the HTTPS settings are automatically activated in production when `DEBUG=False`.

#### Environment Variable Control

You can control the DEBUG setting using environment variables:

```bash
# Production mode (default for deployment)
export DJANGO_DEBUG=False

# Development mode (for local testing)
export DJANGO_DEBUG=True
```

To ensure production mode, either:

1. Don't set the `DJANGO_DEBUG` environment variable (defaults to `False`)
2. Or explicitly set: `export DJANGO_DEBUG=False`

#### Step 5: Configure Firewall for HTTPS

```bash
# Allow HTTPS traffic
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Save iptables rules
sudo iptables-save | sudo tee /etc/iptables/rules.v4
```

#### Step 6: Test and Restart Services

```bash
# Test nginx configuration
sudo nginx -t

# If test passes, restart services
sudo systemctl restart nginx
sudo systemctl restart hdlp2

# Check service status
sudo systemctl status nginx
sudo systemctl status hdlp2
```

#### Step 7: Verify SSL Certificate

```bash
# Test HTTPS access
curl -I https://your-domain.com

# Test HTTP to HTTPS redirect
curl -I http://your-domain.com

# Check certificate details
openssl s_client -connect your-domain.com:443 -servername your-domain.com

# Test certificate renewal
sudo certbot renew --dry-run

# Check auto-renewal timer
sudo systemctl status certbot.timer

# List all certificates
sudo certbot certificates
```

### Method 2: Self-Signed Certificate (Development Only)

```bash
# Create self-signed certificate (NOT for production)
sudo mkdir -p /etc/ssl/private
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/hdlp2-selfsigned.key \
    -out /etc/ssl/certs/hdlp2-selfsigned.crt

# Update nginx to use self-signed certificate
ssl_certificate /etc/ssl/certs/hdlp2-selfsigned.crt;
ssl_certificate_key /etc/ssl/private/hdlp2-selfsigned.key;
```

### Certificate Management

#### Auto-Renewal

Let's Encrypt certificates expire every 90 days but auto-renewal is set up automatically:

```bash
# Check renewal timer status
sudo systemctl status certbot.timer

# Test renewal process
sudo certbot renew --dry-run

# Force renewal if needed (not recommended unless necessary)
sudo certbot renew --force-renewal
```

#### Certificate Troubleshooting

```bash
# Check certificate expiration
sudo certbot certificates

# View certificate details
openssl x509 -in /etc/letsencrypt/live/your-domain.com/cert.pem -text -noout

# Check nginx SSL configuration
sudo nginx -t

# Check Let's Encrypt logs
sudo tail -f /var/log/letsencrypt/letsencrypt.log

# Manually install certificate if auto-install failed
sudo certbot install --cert-name your-domain.com
```

### SSL Security Testing

After setting up HTTPS, test your SSL configuration:

1. **SSL Labs Test**: Visit https://www.ssllabs.com/ssltest/analyze.html?d=your-domain.com
2. **Mozilla Observatory**: https://observatory.mozilla.org/
3. **Security Headers**: https://securityheaders.com/

### Common SSL Issues

1. **Certificate not found**: Ensure certbot completed successfully

   ```bash
   sudo ls -la /etc/letsencrypt/live/your-domain.com/
   ```

2. **Mixed content warnings**: Ensure all resources use HTTPS in templates

3. **Redirect loops**: Check `SECURE_SSL_REDIRECT` setting in Django

4. **Domain validation failed**: Ensure domain DNS points to your server IP

5. **Permission denied**: Check nginx can read certificate files

   ```bash
   sudo chmod 644 /etc/letsencrypt/live/your-domain.com/fullchain.pem
   sudo chmod 600 /etc/letsencrypt/live/your-domain.com/privkey.pem
   ```

6. **Development server HTTPS errors**: If you see "You're accessing the development server over HTTPS, but it only supports HTTP" errors:

   ```bash
   # Ensure DEBUG is True for development
   export DJANGO_DEBUG=True
   python manage.py runserver

   # Clear browser cache and HSTS settings
   # In Chrome: chrome://net-internals/#hsts (delete domain)
   # Use incognito/private browsing to test
   ```

   This happens when browsers cache HSTS headers from production. The application now automatically disables HTTPS settings in development mode.

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

5. **HTTPS settings not working**: Check DEBUG mode

   ```bash
   # For production (HTTPS settings enabled)
   export DJANGO_DEBUG=False
   sudo systemctl restart hdlp2

   # For development (HTTPS settings disabled)
   export DJANGO_DEBUG=True
   python manage.py runserver
   ```

6. **Development server HTTPS errors**: Ensure development mode is active

   ```bash
   # Verify DEBUG mode
   python manage.py shell -c "from django.conf import settings; print('DEBUG:', settings.DEBUG)"

   # Force development mode
   DJANGO_DEBUG=True python manage.py runserver
   ```

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
