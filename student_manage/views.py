
from .models import student_info
from Team_info_manage.utils.const_pool import StateMap
from Team_info_manage.utils.http_resp import HttpResp, WreshResponse


def stulist(request):
    stu_list = student_info.objects.all()
    return WreshResponse.page_response(request, 'student_list.html', stu_list)

def stu_edit(request):
    return WreshResponse.html_response(request, 'student_add.html')

def stu_add(request):
    # form_obj = forms.StuForm()
    if request.method == 'POST':
        # form_obj = forms.StuForm(request.POST)
        stu_name = request.POST.get("stu_name")
        stu_id = request.POST.get("stu_id")
        stu_sex = request.POST.get("stu_sex")
        stu_iden = request.POST.get("stu_iden")
        stu_pic = request.FILES.get("stu_pic")
        stu_intro = request.POST.get("stu_intro")
        status = StateMap.TO_BE_RELEASED
        student_info.objects.create(stu_name=stu_name, stu_id=stu_id, stu_sex=stu_sex, stu_iden=stu_iden, stu_pic=stu_pic, stu_intro=stu_intro, status=status)
        return WreshResponse.json_response(status=HttpResp.OK)
    else:
        return WreshResponse.html_response(request, "student_add.html")
