from django.urls import path
from . import views

urlpatterns =[
    path('support_edit/', views.support_edit),
    path('support_list/', views.support_list),
]