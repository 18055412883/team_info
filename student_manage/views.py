from django.views.decorators.csrf import csrf_exempt

from .models import student_info
from Team_info_manage.utils.const_pool import StateMap
from Team_info_manage.utils.http_resp import HttpResp, WreshResponse
from .forms import StuForm

def stulist(request):
    stu_list = student_info.objects.all()
    return WreshResponse.page_response(request, 'student_list.html', stu_list)

def stu_edit(request):
    return WreshResponse.html_response(request, 'student_add.html')

def stu_add(request):
    if request.method == 'POST':
        btn = request.POST.get('btn')
        form_obj = StuForm(request.POST, request.FILES)
        stu_id = request.POST.get("stu_id")
        exa = student_info.objects.filter(stu_id=stu_id).exists()
        if form_obj.is_valid() and not exa:
            form_obj = form_obj.save(commit=False)
            if btn =='t':
                form_obj.status = StateMap.TO_BE_RELEASED
            elif btn == 'd':
                form_obj.status = StateMap.DRAFT
            form_obj.save()
            return WreshResponse.json_response(status=HttpResp.OK, msg="successful")
        elif form_obj.is_valid():
            form_obj = form_obj.save(commit=False)
            if btn == 'rt':
                form_obj.status = StateMap.TO_BE_RELEASED
            elif btn == 'rd':
                form_obj.status = StateMap.DRAFT
            form_obj.save()
            return WreshResponse.json_response(status=HttpResp.OK, msg="successful")
        else:
            return WreshResponse.json_response(status=HttpResp.ERROR, msg="failed")
    else:
        return WreshResponse.html_response(request, "student_add.html")

@csrf_exempt
def stu_del(request):
    if request.method == 'POST':
        stu_id = request.POST.get('stu_id')
        student_info.objects.filter(stu_id=stu_id).delete()
        return WreshResponse.json_response(status=HttpResp.OK, msg="successful")
    else:
        return WreshResponse.json_response(status=HttpResp.ERROR, msg="failed")

def stu_draft(request, stu_id):
    stu = student_info.objects.get(stu_id=stu_id)
    return WreshResponse.html_response(request, "student_draft.html", {'stu': stu})
