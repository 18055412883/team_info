import os
from django.shortcuts import render
from django.core.paginator import Paginator
from django.http import FileResponse
from enum import Enum

from .operator_log import OperatorLog
from teacher_manage.models import teacher_info


# 配置文件解析




g_operate_log = OperatorLog()




class ErrorNum (Enum):
    RESULT_SUCCESS = 0
    PWD_ERROR = 100
    DATA_ERROR = 101
    ACCOUNT_EXIT = 102
    ACCOUNT_NOT_EXIT = 103
    INPUT_EMPTY = 104
    METHOD_ERROR = 105
    ITEM_NOT_EXIST = 200
    REQUEST_PARAM_ERROR = 201
    DATABASE_ACCESS_ERROR = 202

ErrorInfoMap  = { "PWD_ERROR" : "密码错误","DATA_ERROR" : "数据异常或帐号不存在",
                  "ACCOUNT_EXIT" : "帐号存在","ACCOUNT_NOT_EXIT" : "帐号不存在",
                  "INPUT_EMPTY" : "输入不能为空","METHOD_ERROR" : "请求错误"}


State_Map ={
    'draft': 0, 'to_be_released': 1, 'already_realsed':2
}
Project_State_Map={
    'draft': 2, 'to_be_released': 1, 'already_realsed':0
}




def paginatorHandle(request,return_page,show_info_list , show_count = 5):  #分页器
    # news_all_list = news.objects.filter(newsState=2)  # 获取所有新闻
    paginator = Paginator(show_info_list,show_count)
    page_num = request.GET.get('page', 1)  # 获取url的页面参数，（GET请求）默认第一页 =page
    page_of_news = paginator.get_page(page_num)  # 获取当前页码所需要的文章列表 相当于一个容器
    # 获取当前页码
    current_page_num = page_of_news.number
    # 获取前后各页
    page_range = list(range(max(current_page_num - 2, 1), current_page_num)) + list(
        range(current_page_num, min(current_page_num + 2, paginator.num_pages) + 1))
    # 加上省略号
    if page_range[0] - 1 >= 2:
        page_range.insert(0, '...')
    if page_range[-1] != paginator.num_pages:
        page_range.append(paginator.num_pages)
    # 加上首尾页码
    if page_range[0] != 1:
        page_range.insert(0, 1)
    if page_range[-1] != paginator.num_pages:
        page_range.append(paginator.num_pages)

    content = {}  # content是根据请求页码返回的具体的该页码内的文章
    # content['new_type'] = new_type
    content['news'] = page_of_news.object_list
    content['page_of_news'] = page_of_news
    # print(content['page_of_news'])
    # content['new_types'] = newsType.objects.all()
    content['page_range'] = page_range
    return render(request,return_page, content)  # 返回新闻列表页面

def download_file(request,sid,file_name,base):  # 定制 论文附件 下载
    def file_iterator(file_name,chunk_size=512):
       # logger.info(file_name)
        with open(file_name, 'rb') as f:
            if f:
                yield f.read(chunk_size)
                print('下载完成')
        #        logger.info('下载完成')
            else:
                print('未完成下载')
         #       logger.warning('未完成下载')
    #print(file_id)
    sql = base.objects.get(id = sid)  #下载次数+1
    if sql.times == None:
        sql.times =1
        sql.save()
    else:
        sql.times+=1
        sql.save()
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  #项目根目录
    the_file_name = os.path.join(BASE_DIR, 'upload', file_name)

    print(the_file_name)
  #  logger("File name :  %s " % the_file_name)
    response = FileResponse(file_iterator(the_file_name))

    response['Content-Type'] = 'application/octet-stream'
    response['Content-Disposition'] = 'attachement;filename="{0}"'.format(file_name)
    return response

# def download_file(request):  # 下载本地文件
#     def file_iterator(file_name):
#        # logger.info(file_name)
#         with open(file_name, 'rb') as f:
#             if f:
#                 yield f.read()
#                 print('下载完成')
#         #        logger.info('下载完成')
#             else:
#                 print('未完成下载')
#          #       logger.warning('未完成下载')
#
#     file_name = request.GET['file']
#     file_id = request.GET['id']
#     #print(file_id)
#
#     sql = uploadFile.objects.get(id = file_id)  #下载次数+1
#     if sql.times == None:
#         sql.times =1
#         sql.save()
#     else:
#         sql.times+=1
#     # the_file_name = '/upload/' + file_name   #得绝对路径
#     # 写你自己的文件路径
#     BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  #项目根目录
#     the_file_name = os.path.join(BASE_DIR, 'upload', file_name)
#
#     print(the_file_name)
#   #  logger("File name :  %s " % the_file_name)
#     response = FileResponse(file_iterator(the_file_name))
#
#     response['Content-Type'] = 'application/octet-stream'
#     response['Content-Disposition'] = 'attachement;filename="{0}"'.format(file_name)
#     return response

def teach_list():  #教师名称列表
    tch_list = teacher_info.objects.all()
    i = 0
    names = {}
    for tch in tch_list:
        names[tch_list[i].tch_nam] = tch_list[i].tch_nam
        i += 1
    return names

