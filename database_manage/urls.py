from django.urls import path
from . import views

urlpatterns = [
    path('log_manage/', views.log_list)

]