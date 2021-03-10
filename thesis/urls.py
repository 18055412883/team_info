from django.urls import path
from . import views

urlpatterns = [
    path('thesis_edit/', views.thesis_edit),

]