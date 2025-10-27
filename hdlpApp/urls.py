from django.urls import path
from . import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.parents_view),
    path('childs_view', views.childs_view),
    path('making_bed', views.making_bed),
    path('making_friend', views.making_friend),
    path('washing_hands', views.washing_hands),
    path('fine_gross_motor_skills', views.fine_gross_motor_skills),
    
]
