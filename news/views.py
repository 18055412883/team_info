from django.views.decorators.csrf import csrf_exempt

from .models import news
from Team_info_manage.utils.http_resp import HttpResp, WreshResponse
from Team_info_manage.utils.const_pool import StateMap

def news_edit(request):
    return WreshResponse.html_response(request, 'news_add.html')

def news_add(request):
    pass

@csrf_exempt
def news_draft_list(request):
    news_list = news.objects.filter(newsState=StateMap.DRAFT)
    return WreshResponse.page_response(request, 'news_draft_list.html', news_list)

@csrf_exempt
def news_list(request):
    news_list = news.objects.filter(newsState=StateMap.RELEASED)
    return WreshResponse.page_response(request, 'news_list.html', news_list)

@csrf_exempt
def news_review(request):
    news_list = news.objects.filter(newsState=StateMap.TO_BE_RELEASED)
    return WreshResponse.page_response(request, 'news_review.html', news_list)
