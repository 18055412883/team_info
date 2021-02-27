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
        form_obj = forms.TchForm(request.POST, request.FILES)
        if form_obj.is_valid():
            form_obj = form_obj.save(commit=False)
            # 暂时默认如果教师没注册的话，账号为邮箱 状态 1 待审核
            form_obj.tch_account = request.POST.get("tch_ema")
            form_obj.tch_pwd = "123456"
            form_obj.status = StateMap.TO_BE_RELEASED

            form_obj.save(force_insert=True, using="default")
            return WreshResponse.json_response(status=HttpResp.OK, msg="添加成功")
        else:
            return WreshResponse.json_response(status=HttpResp.ERROR, msg="添加失败")
    else:
        return WreshResponse.json_response(status=HttpResp.ERROR, msg="请求方法错误")
