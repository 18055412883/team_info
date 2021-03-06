"""Team_info_manage URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('teacher_manage/', include('teacher_manage.urls')),
    path('student_manage/', include('student_manage.urls')),
    path('news_manage/', include('news.urls')),
    path('announce/', include('announcement.urls')),
    path('support/', include('support.urls')),
    path('thesis/', include('thesis.urls')),
    path('database_manage/', include('database_manage.urls')),

]
