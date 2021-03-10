from . import views
from django.urls import path

urlpatterns =[
    path('announcement_edit/', views.an_edit),
    path('announcement_draft_list/', views.an_draft_list),
    path('announcement_list/', views.an_list),
    path('announcement_review/', views.an_review)
]