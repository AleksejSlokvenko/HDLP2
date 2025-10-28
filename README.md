# HDLP2

A Django web application for helping children develop life skills through interactive lessons.

## 🌐 Live Demo

**Production Site**: https://sdplatform.org

The application is deployed with SSL/TLS encryption and is accessible via HTTPS.

## Features

- Parents view and child view interfaces
- Interactive lessons for:
  - Making bed
  - Making friends
  - Washing hands
  - Fine and gross motor skills
- Text-to-speech functionality with gTTS
- Responsive design with custom CSS
- **Intelligent HTTPS configuration** - automatically enables security settings in production
- **Environment-based configuration** - supports development and production modes
- **Secure HTTPS deployment** with Let's Encrypt SSL certificates

## Quick Start

1. Clone the repository
2. Follow the [Deployment Guide](DEPLOYMENT_GUIDE.md) for complete setup instructions
3. Access the application at your server IP or domain

## Application Routes

- `/` - Parents view (default)
- `/childs_view` - Child's interface
- `/making_bed` - Making bed lesson
- `/making_friend` - Making friend lesson
- `/washing_hands` - Washing hands lesson
- `/fine_gross_motor_skills` - Motor skills lesson

**Live Routes**: All routes are available at https://sdplatform.org with automatic HTTPS redirect.

## Deployment

For detailed deployment instructions on Debian 13/Ubuntu servers, see:

**📖 [Complete Deployment Guide](DEPLOYMENT_GUIDE.md)**

The deployment guide includes:

- Server setup and dependencies
- Django configuration
- Production deployment with nginx and gunicorn
- **SSL/HTTPS configuration with Let's Encrypt**
- Certificate management and auto-renewal
- Security headers and best practices
- Troubleshooting tips

## 🔒 HTTPS/SSL Setup

The application supports secure HTTPS deployment using Let's Encrypt certificates:

### Quick HTTPS Setup

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is configured automatically
```

### Security Features

- **SSL/TLS encryption** with Let's Encrypt certificates
- **HTTP to HTTPS redirect** for all traffic
- **Security headers** (HSTS, XSS protection, etc.)
- **Automatic certificate renewal** every 90 days

For detailed HTTPS configuration, see the [HTTPS Configuration section](DEPLOYMENT_GUIDE.md#httpssl-configuration) in the deployment guide.

## Development

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/AleksejSlokvenko/HDLP2.git
cd HDLP2

# Create virtual environment
python3 -m venv hdlp_env
source hdlp_env/bin/activate  # On Windows: hdlp_env\Scripts\activate

# Install dependencies
pip install django gtts

# Run migrations
python manage.py migrate

# Start development server (HTTP-only for development)
python manage.py runserver
```

### Development vs Production Configuration

The application automatically handles HTTPS settings based on the `DEBUG` environment variable:

- **Development (DEBUG=True)**: HTTPS settings are disabled, allowing HTTP-only development server
- **Production (DEBUG=False)**: All HTTPS security settings are automatically enabled

#### Development Commands

```bash
# Standard development (DEBUG=True, HTTP-only)
python manage.py runserver

# Force DEBUG mode with environment variable
DJANGO_DEBUG=True python manage.py runserver

# Test production settings locally (DEBUG=False, HTTPS enabled)
DJANGO_DEBUG=False python manage.py runserver

# Custom port
python manage.py runserver 8080
```

#### Environment Variable Control

The DEBUG setting can be controlled via the `DJANGO_DEBUG` environment variable:

```bash
export DJANGO_DEBUG=True   # Development mode
export DJANGO_DEBUG=False  # Production mode
```

### Requirements

- Python 3.8+
- Django 3.0+
- gTTS (Google Text-to-Speech)

### Configuration Overview

The application uses intelligent configuration management:

| Mode        | DEBUG   | HTTPS Settings | Use Case                           |
| ----------- | ------- | -------------- | ---------------------------------- |
| Development | `True`  | Disabled       | Local development with `runserver` |
| Production  | `False` | Enabled        | Production deployment with SSL/TLS |

### Troubleshooting

#### Development Server HTTPS Errors

If you see "You're accessing the development server over HTTPS, but it only supports HTTP":

```bash
# Ensure development mode
DJANGO_DEBUG=True python manage.py runserver

# Clear browser HSTS cache
# Chrome: chrome://net-internals/#hsts
# Firefox: about:preferences#privacy (Clear Data)
```

#### Verify Current Configuration

```bash
# Check current DEBUG setting
python manage.py shell -c "from django.conf import settings; print('DEBUG:', settings.DEBUG)"

# Check HTTPS settings status
python manage.py shell -c "from django.conf import settings; print('SSL_REDIRECT:', getattr(settings, 'SECURE_SSL_REDIRECT', False))"
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
