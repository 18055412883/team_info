from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.shortcuts import render, reverse
from django.views.decorators.csrf import csrf_exempt, csrf_protect


from .models import teacher_info
from Team_info_manage.uploads import image_upload
from Team_info_manage.common import g_operate_log, paginatorHandle
from Team_info_manage.compress_image import compress_image, remove_file
from Team_info_manage import forms

def tch_edit(request):
    return render(request, 'teacher_add.html')

def tch_list(request):
    tch_list = teacher_info.objects.all()
    return paginatorHandle(request, 'teacher_list.html', tch_list)


def teacher_add(request):
    TeacherNum = teacher_info.objects.filter(status=1).count()
    print(TeacherNum)
    form_obj = forms.tch_form()
    if request.method == 'POST':
        form_obj = forms.tch_form(request.POST)
        tch_nam = request.POST.get("name")
        tch_sex = request.POST.get("sex")
        tch_tel = request.POST.get("tel")
        tch_nation = request.POST.get("nation")
        tch_bpl = request.POST.get("bpl")
        tch_sch = request.POST.get("sch")
        tch_ins = request.POST.get("ins")
        tch_adr = request.POST.get("adr")
        tch_post = request.POST.get("post")
        tch_ema = request.POST.get("ema")
        self_page = request.POST.get("page")
        tch_iden = request.POST.get("iden")
        tch_career = request.POST.get("career")
        tch_pic = request.FILES.get("pic")
        tch_intro = request.POST.get("ntro")
        tch_edu = request.POST.get("edu")
        tch_exp = request.POST.get("exp")
        tch_aca = request.POST.get("aca")
        tch_honr = request.POST.get("honr")
        teacher_info.objects.create(tch_account=TeacherNum, tch_nam=tch_nam, tch_sex=tch_sex, tch_tel=tch_tel, tch_nation=tch_nation, tch_bpl=tch_bpl, tch_sch=tch_sch, tch_ins=tch_ins, tch_adr=tch_adr, tch_post=tch_post, tch_ema=tch_ema, self_page=self_page, tch_pic=tch_pic, tch_iden=tch_iden, tch_career=tch_career, tch_intro=tch_intro, tch_edu=tch_edu, tch_exp=tch_exp, tch_aca=tch_aca, tch_honr=tch_honr, status=1)
        return tch_edit(request)
    elif request.method == 'GET':
        return render(request, "teacher_add.html", {'form_obj': form_obj})
'''{"tch_account": 20, "tch_nam": tch_nam, "tch_sex": tch_sex, "tch_tel": tch_tel, "tch_nation": tch_nation, "tch_bpl": tch_bpl, "tch_sch": tch_sch, "tch_ins": tch_ins, "tch_adr": tch_adr, "tch_post": tch_post, "tch_ema": tch_ema , "tch_pic": tch_pic, "tch_iden": tch_iden, "tch_intro": tch_intro, "tch_edu": tch_edu, "tch_exp": tch_exp, "tch_aca": tch_aca, "tch_honr": tch_honr, "status": 1}
'''
''''@csrf_exempt
def teacher_add(request):
    res = {}
    if request.method == 'POST':
        post = request.POST
        name = post.get('tch_nam')
        sex = post.get('tch_sex')
        tel = post.get('tch_tel')
        nation = post.get('tch_na')
        bpl = post.get('tch_bir')
        sch = post.get('tch_sch')
        ins = post.get('tch_ins')
        adr = post.get('tch_adr')
        pC = post.get('tch_pC')
        ema = post.get('tch_ema')
        iden = post.get('tch_iden')
        self_page = post.get('tch_self_page')
        career = post.get('career')
        pic =  request.FILES.get('tch_pic')
        intro = post.get('tch_intro')
        edu = post.get('tch_edu')
        exp = post.get('tch_exp')
        aca = post.get('tch_aca')
        hon = post.get('tch_hon')
        btn = post.get('btn')


        if btn == 't': # 添加教师

            sql = teacher_info(tch_nam=name,tch_sex=sex, tch_tel=tel,
                               tch_nation=nation, tch_bpl=bpl, tch_sch=sch,
                               tch_ins=ins, tch_adr=adr, tch_post=pC, tch_ema=ema+"/" +self_page, tch_pic=pic,
                               tch_iden=iden, tch_intro=intro, tch_edu=edu,
                               tch_exp=exp, tch_aca=aca, tch_honr=hon, status=1,ready=career)
            g_operate_log.add(request, name, '添加教师')
            sql.save()
            compress_image(sql.tch_pic)
        elif btn == 'f':# 草稿
            sql = teacher_info(tch_nam=name, tch_sex=sex, tch_tel=tel,
                               tch_nation=nation, tch_bpl=bpl, tch_sch=sch,
                               tch_ins=ins, tch_adr=adr, tch_post=pC, tch_ema=ema+"/" +self_page, tch_pic=pic,
                               tch_iden=iden, tch_intro=intro, tch_edu=edu,
                               tch_exp=exp, tch_aca=aca, tch_honr=hon, status=0,ready=career)
            sql.save()
            g_operate_log.add(request, name, '添加教师(草稿)')
            if sql.tch_pic:
                compress_image(sql.tch_pic)
        elif btn == 'info_change': # 教师在个人信息中修改
            teacher_and_usr = request.POST.get('sid')
            id_list = teacher_and_usr.split()
            tch = teacher_info.objects.filter(id=id_list[0])
            user = teacher_login.objects.filter(user_id=id_list[1])
            tch.update(tch_nam=name, tch_sex=sex, tch_tel=tel,
                       tch_nation=nation, tch_bpl=bpl, tch_sch=sch,
                       tch_ins=ins, tch_adr=adr, tch_post=pC, tch_ema=ema,
                       tch_iden=iden, tch_intro=intro, tch_edu=edu,
                       tch_exp=exp, tch_aca=aca, tch_honr=hon, status=1, ready=career)
            user.update(user_nam=name, user_ema=ema)
            g_operate_log.update(request, name, '修改教师')
            if pic:
                if tch[0].tch_pic:

                    remove_file(tch[0].tch_pic)  # 先删除旧的
                image_upload(pic, 'img')  # 更新照片得自己上传照片
                pic = 'img/' + str(pic)
                tch.update(tch_pic=pic)

                compress_image(tch[0].tch_pic)

        else: # 更新
            sid = request.POST.get('sid')
            tch = teacher_info.objects.filter(id = sid)
            tch.update(tch_nam=name, tch_sex=sex, tch_tel=tel,
                       tch_nation=nation, tch_bpl=bpl, tch_sch=sch,
                       tch_ins=ins, tch_adr=adr, tch_post=pC, tch_ema=ema+"/" +self_page,
                       tch_iden=iden, tch_intro=intro, tch_edu=edu,
                       tch_exp=exp, tch_aca=aca, tch_honr=hon, status=1,ready=career)
            g_operate_log.update(request, name, '修改教师')
            if pic:
                if tch[0].tch_pic:

                    remove_file(tch[0].tch_pic)  # 先删除旧的
                image_upload(pic, 'img')  # 更新照片得自己上传照片
                pic = 'img/' + str(pic)
                tch.update(tch_pic=pic)

                compress_image(tch[0].tch_pic)

        # else:
        #     sql = teacher_info.objects.get(id = sid)
        #     sql.update(tch_nam=name,tch_sex=sex, tch_tel=tel,
        #                tch_nation=nation, tch_bpl=bpl, tch_sch=sch,
        #                tch_ins=ins, tch_adr=adr, tch_post=pC, tch_ema=ema, tch_pic=pic,
        #                tch_iden=iden, tch_intro=intro, tch_edu=edu,
        #                tch_exp=exp, tch_aca=aca, tch_honr=hon, status=1)
        res['status'] = 200  #成功
    else:
        res['status'] = 500 #失败
    return JsonResponse(res)'''