# REST API & Database Architecture Guide

## Overview

This document provides recommendations for REST API and Database implementation for the hdlpApp React conversion, including when they are needed, how to implement them, and example implementations.

---

## 🎯 Executive Decision

### Current Recommendation: **NO API or DATABASE Required**

**Why?**
- ✅ Current app has NO dynamic features
- ✅ All content is static (HTML, CSS, images, videos, audio)
- ✅ No user accounts or authentication
- ✅ No data to store or retrieve
- ✅ No backend processing needed

**Benefits of Static Approach:**
- ⚡ Faster deployment (static site hosting)
- 💰 Lower costs (can use free hosting)
- 🔒 Better security (no attack surface)
- 📈 Better scalability (CDN distribution)
- 🛠️ Simpler maintenance (no server to manage)

---

## 📊 Decision Matrix: When to Add API/Database

### Scenario Analysis

| Feature | Needs API? | Needs Database? | Complexity | Effort |
|---------|------------|-----------------|------------|--------|
| Static content display | ❌ No | ❌ No | Low | 0 hrs |
| Video/audio playback | ❌ No | ❌ No | Low | 0 hrs |
| Navigation/routing | ❌ No | ❌ No | Low | 0 hrs |
| User registration | ✅ Yes | ✅ Yes | High | 15-20 hrs |
| User login/logout | ✅ Yes | ✅ Yes | High | 15-20 hrs |
| Progress tracking | ✅ Yes | ✅ Yes | Medium | 10-15 hrs |
| Lesson completion | ✅ Yes | ✅ Yes | Medium | 8-12 hrs |
| Comments/feedback | ✅ Yes | ✅ Yes | Medium | 10-15 hrs |
| Dynamic TTS generation | ✅ Yes | ❌ No | Medium | 6-10 hrs |
| Content management (CMS) | ✅ Yes | ✅ Yes | High | 20-30 hrs |
| Analytics tracking | ✅ Yes | ✅ Yes | Medium | 8-12 hrs |
| Multi-language support | ❌ No* | ✅ Yes | Medium | 10-15 hrs |
| Quiz/assessments | ✅ Yes | ✅ Yes | High | 15-20 hrs |

*Multi-language can be static i18n (no API), or dynamic (API + DB)

---

## 🔮 Future Feature Scenarios

### Scenario 1: User Accounts & Progress Tracking

**User Story:**
> As a parent, I want to create an account and track my child's progress through lessons, so I can see which lessons have been completed.

#### Requirements
- User registration and login
- Store user profiles
- Track lesson completion per user
- View progress dashboard

#### Technical Needs
- ✅ **REST API Required**: For authentication and progress endpoints
- ✅ **Database Required**: Store users and progress data
- ✅ **Authentication**: JWT or session-based

#### Implementation Overview
```
Database Tables:
- users (id, email, password, name, created_at)
- user_profiles (id, user_id, child_name, age, preferences)
- user_progress (id, user_id, lesson_id, completed, completion_date)

API Endpoints:
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
GET  /api/progress
POST /api/lessons/:id/complete
```

**Effort Estimate**: 20-25 hours
**Additional Dependencies**: djangorestframework, djangorestframework-simplejwt, django-cors-headers

---

### Scenario 2: Dynamic Content Management

**User Story:**
> As an admin, I want to add, edit, and delete lessons from a web interface, so I can update content without modifying code.

#### Requirements
- Admin interface for content management
- CRUD operations for lessons
- Upload images/videos
- Organize by categories

#### Technical Needs
- ✅ **REST API Required**: For content CRUD operations
- ✅ **Database Required**: Store lesson data dynamically
- ✅ **File Upload**: Handle media files

#### Implementation Overview
```
Database Tables:
- lessons (id, title, slug, description, category, video_url, audio_url, created_at)
- categories (id, name, slug, description)
- lesson_steps (id, lesson_id, step_number, description, image_url)

API Endpoints:
GET    /api/lessons
GET    /api/lessons/:id
POST   /api/lessons
PUT    /api/lessons/:id
DELETE /api/lessons/:id
GET    /api/categories
POST   /api/upload
```

**Effort Estimate**: 25-30 hours
**Additional Dependencies**: django-storages (S3), pillow (image processing)

---

### Scenario 3: Text-to-Speech Generation

**User Story:**
> As a user, I want to click a button to hear any lesson text read aloud, so my child can listen to instructions.

#### Requirements
- Generate TTS audio on demand
- Support multiple languages
- Cache generated audio
- Play audio in browser

#### Technical Needs
- ✅ **REST API Required**: To generate TTS on server
- ❌ **Database Not Required**: Can cache files on filesystem
- ✅ **gTTS Library**: Already available (currently imported but unused)

#### Implementation Overview
```
API Endpoints:
POST /api/tts/generate
  Body: { "text": "Wash your hands", "language": "en" }
  Response: { "audio_url": "/media/tts/hash123.mp3" }

File Structure:
media/
  tts/
    en_wash_your_hands_abc123.mp3
    en_making_bed_def456.mp3
```

**Effort Estimate**: 6-10 hours
**Additional Dependencies**: None (gTTS already installed)

---

### Scenario 4: Comments & Feedback

**User Story:**
> As a user, I want to leave feedback on lessons, so I can help improve the content.

#### Requirements
- Submit comments/feedback per lesson
- View other users' comments
- Like/upvote comments
- Moderate comments (admin)

#### Technical Needs
- ✅ **REST API Required**: CRUD for comments
- ✅ **Database Required**: Store comments and votes
- ✅ **Authentication**: Users must be logged in

#### Implementation Overview
```
Database Tables:
- comments (id, user_id, lesson_id, text, created_at)
- comment_votes (id, user_id, comment_id, vote_type)

API Endpoints:
GET    /api/lessons/:id/comments
POST   /api/lessons/:id/comments
PUT    /api/comments/:id
DELETE /api/comments/:id
POST   /api/comments/:id/vote
```

**Effort Estimate**: 12-15 hours

---

## 🏗️ REST API Architecture

### Technology Stack Recommendation

#### Django REST Framework (DRF)
**Recommended** - Best choice for Django projects

**Installation:**
```bash
pip install djangorestframework==3.14.0
pip install djangorestframework-simplejwt==5.3.0  # For JWT auth
pip install django-cors-headers==4.3.0            # For CORS
```

**Configuration (settings.py):**
```python
INSTALLED_APPS = [
    # ...existing apps
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Add at top
    # ...existing middleware
]

# REST Framework configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}

# CORS configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React dev server
    "https://app.sdplatform.org",  # Production React app
]

# JWT settings
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
}
```

---

### API Structure

#### Recommended Directory Structure
```
HDLP2/
├── api/                        # New API app
│   ├── __init__.py
│   ├── models.py               # Data models
│   ├── serializers.py          # DRF serializers
│   ├── views.py                # API views
│   ├── urls.py                 # API routes
│   ├── permissions.py          # Custom permissions
│   └── tests.py                # API tests
├── hdlpApp/                    # Existing app (unchanged)
└── HDLP2/
    ├── settings.py
    └── urls.py                 # Include API urls
```

#### Main URLs Configuration (HDLP2/urls.py)
```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),          # API routes
    path('', include('hdlpApp.urls')),          # Original app routes
]
```

---

### Example API Implementation

#### 1. Data Models (api/models.py)
```python
from django.db import models
from django.contrib.auth.models import User

class Lesson(models.Model):
    """Lesson content"""
    CATEGORY_CHOICES = [
        ('self_care', 'Self Care'),
        ('environmental', 'Environmental Care'),
        ('physical', 'Physical Development'),
        ('personality', 'Personality Development'),
        ('intellectual', 'Intellectual Development'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField()
    video_url = models.URLField(blank=True)
    audio_url = models.URLField(blank=True)
    thumbnail = models.ImageField(upload_to='lessons/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title

class UserProgress(models.Model):
    """Track user progress through lessons"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    completion_date = models.DateTimeField(null=True, blank=True)
    time_spent = models.IntegerField(default=0)  # seconds
    
    class Meta:
        unique_together = ['user', 'lesson']
        ordering = ['-completion_date']
    
    def __str__(self):
        return f"{self.user.username} - {self.lesson.title}"
```

#### 2. Serializers (api/serializers.py)
```python
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Lesson, UserProgress

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id']

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = [
            'id', 'title', 'slug', 'category', 'description',
            'video_url', 'audio_url', 'thumbnail', 
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class UserProgressSerializer(serializers.ModelSerializer):
    lesson = LessonSerializer(read_only=True)
    
    class Meta:
        model = UserProgress
        fields = [
            'id', 'lesson', 'completed', 
            'completion_date', 'time_spent'
        ]
        read_only_fields = ['id', 'completion_date']
```

#### 3. Views (api/views.py)
```python
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.utils import timezone
from .models import Lesson, UserProgress
from .serializers import LessonSerializer, UserProgressSerializer

class LessonViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for lessons
    list: GET /api/lessons/
    retrieve: GET /api/lessons/:id/
    """
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def complete(self, request, slug=None):
        """
        Mark lesson as complete
        POST /api/lessons/:slug/complete/
        """
        lesson = self.get_object()
        progress, created = UserProgress.objects.get_or_create(
            user=request.user,
            lesson=lesson,
            defaults={'completed': True, 'completion_date': timezone.now()}
        )
        
        if not created and not progress.completed:
            progress.completed = True
            progress.completion_date = timezone.now()
            progress.save()
        
        serializer = UserProgressSerializer(progress)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserProgressViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for user progress
    list: GET /api/progress/
    retrieve: GET /api/progress/:id/
    """
    serializer_class = UserProgressSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return UserProgress.objects.filter(user=self.request.user)
```

#### 4. URLs (api/urls.py)
```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

router = DefaultRouter()
router.register(r'lessons', views.LessonViewSet)
router.register(r'progress', views.UserProgressViewSet, basename='progress')

urlpatterns = [
    # Authentication endpoints
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # API routes
    path('', include(router.urls)),
]
```

---

### React Integration Example

#### API Client Setup
```javascript
// src/services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const api = {
  // Authentication
  async login(username, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  },
  
  // Lessons
  async getLessons() {
    const response = await fetch(`${API_BASE_URL}/lessons/`);
    return response.json();
  },
  
  async getLesson(slug) {
    const response = await fetch(`${API_BASE_URL}/lessons/${slug}/`);
    return response.json();
  },
  
  async completeLesson(slug, token) {
    const response = await fetch(`${API_BASE_URL}/lessons/${slug}/complete/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },
  
  // Progress
  async getProgress(token) {
    const response = await fetch(`${API_BASE_URL}/progress/`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },
};
```

#### Usage in React Component
```javascript
// src/pages/lessons/WashingHands.jsx
import { useState, useEffect } from 'react';
import { api } from '../../services/api';

function WashingHands() {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    api.getLesson('washing-hands')
      .then(data => setLesson(data))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  
  const handleComplete = async () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      await api.completeLesson('washing-hands', token);
      alert('Lesson completed!');
    }
  };
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>{lesson.title}</h1>
      <p>{lesson.description}</p>
      <button onClick={handleComplete}>Mark as Complete</button>
    </div>
  );
}
```

---

## 💾 Database Architecture

### Database Selection

#### SQLite (Current - Development)
**Pros:**
- ✅ Already configured
- ✅ No additional setup
- ✅ Good for development
- ✅ File-based (easy backup)

**Cons:**
- ⚠️ Not recommended for production with concurrent writes
- ⚠️ Limited scalability

**When to use:** Development and testing

---

#### PostgreSQL (Recommended - Production)
**Pros:**
- ✅ Industry standard for Django
- ✅ Excellent performance
- ✅ Advanced features (JSON, full-text search)
- ✅ Highly scalable
- ✅ Strong data integrity

**Cons:**
- ⚠️ Requires separate installation
- ⚠️ More complex setup

**When to use:** Production with database needs

**Installation (Debian/Ubuntu):**
```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Install Python adapter
pip install psycopg2-binary

# Create database and user
sudo -u postgres psql
CREATE DATABASE hdlp2_db;
CREATE USER hdlp2_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE hdlp2_db TO hdlp2_user;
\q
```

**Configuration (settings.py):**
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'hdlp2_db',
        'USER': 'hdlp2_user',
        'PASSWORD': os.getenv('DB_PASSWORD', 'secure_password'),
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

---

### Database Schema Examples

#### Full Schema (All Features)
```sql
-- Users (Django default, extended)
CREATE TABLE auth_user (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    email VARCHAR(254),
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    password VARCHAR(128) NOT NULL,
    is_staff BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    date_joined TIMESTAMP NOT NULL
);

-- User Profiles
CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES auth_user(id),
    child_name VARCHAR(200),
    child_age INTEGER,
    preferences JSONB,
    created_at TIMESTAMP NOT NULL
);

-- Lessons
CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    video_url VARCHAR(500),
    audio_url VARCHAR(500),
    thumbnail VARCHAR(500),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- User Progress
CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES auth_user(id),
    lesson_id INTEGER REFERENCES lessons(id),
    completed BOOLEAN DEFAULT FALSE,
    completion_date TIMESTAMP,
    time_spent INTEGER DEFAULT 0,
    UNIQUE(user_id, lesson_id)
);

-- Comments
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES auth_user(id),
    lesson_id INTEGER REFERENCES lessons(id),
    text TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- Analytics
CREATE TABLE analytics_events (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES auth_user(id),
    event_type VARCHAR(50) NOT NULL,
    lesson_id INTEGER REFERENCES lessons(id),
    metadata JSONB,
    created_at TIMESTAMP NOT NULL
);
```

---

## 🚀 Implementation Roadmap

### Phase 1: Current State (Static React App)
**Timeline:** 3-4 weeks
**Cost:** Development time only, $0 hosting

```
[React App] → [Static Files (CDN)]
```

No API, no database, pure static site.

---

### Phase 2: Add Authentication (If Needed)
**Timeline:** +2-3 weeks
**Cost:** Database hosting (~$10-20/month)

```
[React App] → [Django REST API] → [PostgreSQL]
                    ↓
            [User Auth (JWT)]
```

Features unlocked:
- User registration/login
- User profiles
- Personalization

---

### Phase 3: Add Progress Tracking (If Needed)
**Timeline:** +1-2 weeks
**Cost:** Same infrastructure

```
[React App] → [Django REST API] → [PostgreSQL]
                    ↓                    ↓
            [User Auth]          [Progress Data]
```

Features unlocked:
- Track completed lessons
- View progress dashboard
- Generate reports

---

### Phase 4: Full CMS (If Needed)
**Timeline:** +3-4 weeks
**Cost:** +File storage (~$5-10/month)

```
[React App] → [Django REST API] → [PostgreSQL]
                    ↓                    ↓
            [Admin CMS]        [Lesson Content]
                    ↓
            [S3/Storage] ← [Media Files]
```

Features unlocked:
- Admin content management
- Dynamic lesson creation
- Media upload

---

## 📊 Cost-Benefit Analysis

### Option 1: Static Only (Recommended Now)
**Benefits:**
- ✅ Free hosting available
- ✅ Fastest performance
- ✅ Simplest deployment
- ✅ Best security

**Limitations:**
- ❌ No user accounts
- ❌ No progress tracking
- ❌ No dynamic features

**Cost:** $0/month (free tier hosting)

---

### Option 2: API + Database (Future)
**Benefits:**
- ✅ User accounts
- ✅ Progress tracking
- ✅ Dynamic features
- ✅ Analytics

**Limitations:**
- ⚠️ More complex deployment
- ⚠️ Server maintenance
- ⚠️ Higher costs

**Cost:** $20-50/month (VPS + DB)

---

## 🎯 Final Recommendations

### For Current Requirements
1. ✅ **Deploy as static site** - No API/DB needed
2. ✅ **Use free tier hosting** - Netlify/Vercel/CloudFlare
3. ✅ **Keep it simple** - Don't over-engineer

### For Future Growth
1. 📋 **Plan for API** - If user features needed in 6 months
2. 📋 **Choose PostgreSQL** - If database needed
3. 📋 **Implement in phases** - Don't build everything at once

### Decision Triggers
**Add API/DB when:**
- User accounts requested
- Progress tracking needed
- Dynamic content required
- Analytics demanded

**Stay static if:**
- Content remains static
- No user data needed
- Performance is priority
- Cost is concern

---

## 📚 Additional Resources

### Django REST Framework
- Documentation: https://www.django-rest-framework.org/
- Tutorial: https://www.django-rest-framework.org/tutorial/quickstart/
- JWT Auth: https://django-rest-framework-simplejwt.readthedocs.io/

### PostgreSQL
- Django + PostgreSQL: https://docs.djangoproject.com/en/4.2/ref/databases/#postgresql-notes
- PostgreSQL Docs: https://www.postgresql.org/docs/

### API Best Practices
- RESTful API Design: https://restfulapi.net/
- API Security: https://owasp.org/www-project-api-security/

---

**Document Version**: 1.0  
**Last Updated**: December 16, 2024  
**Status**: Complete Reference Guide

