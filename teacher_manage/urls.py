
from . import views
from django.urls import path

urlpatterns =[
     path('tch_edit/', views.tch_edit),
     path('teacher_add/', views.teacher_add),
     path('', views.tch_edit),
     path('teacher_list/', views.tch_list),
     path('teacher_delete/', views.tch_del),
     path('teacher_draft/<str:account>/', views.tch_draft),
]
