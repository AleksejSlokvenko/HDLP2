# HDLP2

A Django web application for helping children develop life skills through interactive lessons.

## Features

- Parents view and child view interfaces
- Interactive lessons for:
  - Making bed
  - Making friends
  - Washing hands
  - Fine and gross motor skills
- Text-to-speech functionality with gTTS
- Responsive design with custom CSS

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

## Deployment

For detailed deployment instructions on Debian 13/Ubuntu servers, see:

**📖 [Complete Deployment Guide](DEPLOYMENT_GUIDE.md)**

The deployment guide includes:

- Server setup and dependencies
- Django configuration
- Production deployment with nginx and gunicorn
- SSL configuration
- Troubleshooting tips

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

# Start development server
python manage.py runserver
```

### Requirements

- Python 3.8+
- Django 3.0+
- gTTS (Google Text-to-Speech)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
