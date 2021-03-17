from Team_info_manage.utils.const_pool import StateMap
from . import forms, models
from Team_info_manage.utils.http_resp import HttpResp, WreshResponse

def thesis_edit(request):
    return WreshResponse.html_response(request, 'thesis_add.html')


