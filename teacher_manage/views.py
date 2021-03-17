from django.views.decorators.csrf import csrf_exempt

from Team_info_manage.utils.const_pool import StateMap
from . import forms, models
from Team_info_manage.utils.http_resp import HttpResp, WreshResponse


def tch_edit(request):
    return WreshResponse.html_response(request, 'teacher_add.html')


def tch_list(request):
    tch_list = models.teacher_info.objects.all()
    return WreshResponse.page_response(request, 'teacher_list.html', tch_list)

def teacher_add(request):
    if request.method == 'POST':
        btn = request.POST.get('btn')
        form_obj = forms.TchForm(request.POST, request.FILES)
        tch_ema = request.POST.get("tch_ema")
        exa = models.teacher_info.objects.filter(tch_ema=tch_ema).exists()
        if btn == 't':  # 添加教师
            if form_obj.is_valid() and not exa:
                form_obj = form_obj.save(commit=False)
                form_obj.tch_account = request.POST.get("tch_ema")
                form_obj.tch_pwd = "123456"
                form_obj.status = StateMap.TO_BE_RELEASED
                form_obj.save()
                return WreshResponse.json_response(status=HttpResp.OK, msg="successful")
            else:
                return WreshResponse.json_response(status=HttpResp.ERROR, msg="failed")
        elif btn == 'd':  # 草稿箱
            if form_obj.is_valid() and not exa:
                form_obj = form_obj.save(commit=False)
                form_obj.tch_account = request.POST.get("tch_ema")
                form_obj.tch_pwd = "123456"
                form_obj.status = StateMap.DRAFT
                form_obj.save()
                return WreshResponse.json_response(status=HttpResp.OK, msg="successful")
            else:
                return WreshResponse.json_response(status=HttpResp.ERROR, msg="failed")
        elif btn == 'rt':
            if form_obj.is_valid():
                form_obj = form_obj.save(commit=False)
                form_obj.tch_account = request.POST.get("tch_ema")
                form_obj.status = StateMap.TO_BE_RELEASED
                form_obj.save()
                return WreshResponse.json_response(status=HttpResp.OK, msg="successful")
            else:
                return WreshResponse.json_response(status=HttpResp.ERROR, msg="failed")
        elif btn == 'rd':
            if form_obj.is_valid():
                form_obj = form_obj.save(commit=False)
                form_obj.tch_account = request.POST.get("tch_ema")
                form_obj.status = StateMap.DRAFT
                form_obj.save()
                return WreshResponse.json_response(status=HttpResp.OK, msg="successful")
            else:
                return WreshResponse.json_response(status=HttpResp.ERROR, msg="failed")
        else:
            return WreshResponse.json_response(status=HttpResp.ERROR, msg="failed")
    else:
        return WreshResponse.html_response(request, "teacher_add.html")

@csrf_exempt
def tch_del(request):
    if request.method == 'POST':
        tch_acc = request.POST.get('tch_account')
        models.teacher_info.objects.filter(tch_account=tch_acc).delete()
        return WreshResponse.json_response(status=HttpResp.OK, msg="successful")
    else:
        return WreshResponse.json_response(status=HttpResp.ERROR, msg="failed")


def tch_draft(request, account):
    tch = models.teacher_info.objects.get(tch_account=account)
    return WreshResponse.html_response(request, "teacher_draft.html", {'tch': tch})

