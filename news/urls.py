from . import views
from django.urls import path

urlpatterns =[
    path('news_edit/', views.news_edit),
    path('news_draft_list/', views.news_draft_list),
    path('news_list/', views.news_list),
    path('news_review/', views.news_review)
]