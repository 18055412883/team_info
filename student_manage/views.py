from django.shortcuts import render, reverse
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect

from Team_info_manage.common import g_operate_log, paginatorHandle
from .models import student_info

def stulist(request):
    stu_list = student_info.objects.all()
    return paginatorHandle(request, 'student_list.html', stu_list)

def stu_edit(request):
    return render(request, 'student_add.html')

def stu_add(request):
    # form_obj = forms.StuForm()
    if request.method == 'POST':
        # form_obj = forms.StuForm(request.POST)
        stu_name = request.POST.get("stu_name")
        stu_id = request.POST.get("stu_id")
        stu_sex = request.POST.get("stu_sex")
        stu_iden = request.POST.get("stu_iden")
        stu_pic = request.POST.get("stu_pic")
        stu_intro = request.POST.get("stu_intro")
        student_info.objects.create(stu_name=stu_name, stu_id=stu_id, stu_sex=stu_sex, stu_iden=stu_iden, stu_pic=stu_pic, stu_intro=stu_intro, status=1)
        return stu_edit(request)
    elif request.method == 'GET':
        return render(request, "student_add.html")
