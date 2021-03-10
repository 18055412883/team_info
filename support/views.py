from django.views.decorators.csrf import csrf_exempt

from .models import support
from Team_info_manage.utils.http_resp import HttpResp, WreshResponse
from Team_info_manage.utils.const_pool import StateMap

def support_edit(request):
    return WreshResponse.html_response(request, 'support_add.html')

def support_add(request):
    pass

@csrf_exempt
def support_list(request):
    support_list = support.objects.all()
    return WreshResponse.page_response(request, 'support_list.html', support_list)
