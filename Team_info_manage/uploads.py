from django.http import HttpResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import os
from .compress_image import compress_image
import uuid   #加密
import json
import datetime as dt
'''
此 为 富文本框 上传文件/图片 的处理

'''

@csrf_exempt
def upload_image(request, dir_name):
    ##################
    #  kindeditor图片上传返回数据格式说明：
    # {"error": 1, "message": "出错信息"}
    # {"error": 0, "url": "图片地址"}
    ##################
    print('dir-NAME',dir_name)
    result = {"error": 1, "message": "上传出错"}
    files = request.FILES.get("imgFile", None)
    print('files',files)
    if files:
        result = image_upload(files, dir_name)
        compress_image(result['url'].split('/')[3], 'k')

    return HttpResponse(json.dumps(result), content_type="application/json")


# 目录创建
def upload_generation_dir(dir_name):
    #today = dt.datetime.today()
    #url_part = dir_name + '/%d/%d/' % (today.year, today.month)
    #dir_name = os.path.join(dir_name, str(today.year), str(today.month))
    dir_name = os.path.join(dir_name)
    # print("*********", os.path.join(settings.MEDIA_ROOT, dir_name))
    if not os.path.exists(os.path.join(settings.MEDIA_ROOT, dir_name)):
        os.makedirs(os.path.join(settings.MEDIA_ROOT, dir_name))
    # return dir_name, url_part
    return dir_name


# 图片上传
def image_upload(files, dir_name):
    # 允许上传文件类型
    allow_suffix = ['jpg', 'png', 'jpeg', 'gif', 'bmp','qsv','zip']
    file_suffix = files.name.split(".")[-1]
    if file_suffix.lower() not in allow_suffix:
        return {"error": 1, "message": "图片格式不正确"}
    print('image_upload_dirname',dir_name)
    # relative_path_file, url_part = upload_generation_dir(dir_name)
    relative_path_file = upload_generation_dir(dir_name)
    path = os.path.join(settings.MEDIA_ROOT, relative_path_file).replace("\\","/")
    # print("&&&&path", path)
    if not os.path.exists(path):  # 如果目录不存在创建目录
        os.makedirs(path)
   # file_name = str(uuid.uuid1()) + "." + file_suffix
    file_name = path +'/' + files.name
    path_file = os.path.join(path, file_name)
    # file_url = settings.MEDIA_URL + url_part + file_name
    file_url =( settings.MEDIA_URL + dir_name + '/' + files.name).replace("\\","/")
    open(path_file, 'wb').write(files.file.read())
    return {"error": 0, "url": file_url}

