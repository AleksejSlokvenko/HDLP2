import os
import time
# import playsound
from gtts import gTTS


from django.shortcuts import render, redirect



# Create your views here.
def childs_view(request):
	return render(request, "childs_view.html")

def parents_view(request):
	return render(request, "parents_view.html")

def making_bed(request):
	return render(request, "making_bed.html")

def making_friend(request):
	return render(request, "making_friend.html")

def washing_hands(request):
	return render(request, "washing_hands.html")

def fine_gross_motor_skills(request):
	return render(request, "fine_gross_motor_skills.html")