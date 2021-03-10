from django.views.decorators.csrf import csrf_exempt

from .models import announcement
from Team_info_manage.utils.http_resp import HttpResp, WreshResponse
from Team_info_manage.utils.const_pool import StateMap

def an_edit(request):
    return WreshResponse.html_response(request, 'an_add.html')

def an_add(request):
    pass

@csrf_exempt
def an_draft_list(request):
    an_list = announcement.objects.filter(status=StateMap.DRAFT)
    return WreshResponse.page_response(request, 'an_draft_list.html', an_list)

@csrf_exempt
def an_list(request):
    an_list = announcement.objects.filter(status=StateMap.RELEASED)
    return WreshResponse.page_response(request, 'an_list.html', an_list)

@csrf_exempt
def an_review(request):
    an_list = announcement.objects.filter(status=StateMap.TO_BE_RELEASED)
    return WreshResponse.page_response(request, 'an_review.html', an_list)
