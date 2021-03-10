
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
        form_obj = StuForm(request.POST, request.FILES)
        if form_obj.is_valid():
            form_obj = form_obj.save(commit=False)
            form_obj.status = StateMap.TO_BE_RELEASED
            form_obj.save()
            return WreshResponse.json_response(status=HttpResp.OK, msg="successful")
        else:
            return WreshResponse.json_response(status=HttpResp.ERROR, msg="failed")
    else:
        return WreshResponse.html_response(request, "student_add.html")
