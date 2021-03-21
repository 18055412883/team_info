from . import views
from django.urls import path

urlpatterns = [
     path('stu_edit/', views.stu_edit),
     path('stu_list/', views.stulist),
     path('stu_add/', views.stu_add),
     path('stu_delete/', views.stu_del),
     path('stu_draft/<str:stu_id>/', views.stu_draft),
]