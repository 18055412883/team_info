#!/usr/bin/python
# -*- coding: UTF-8 -*-
# from http import HTTPStatus as resp

from django.http import JsonResponse
from django.shortcuts import render
from django.core.paginator import Paginator


class HttpResp:
    OK = "success"
    ERROR = "error"


class WreshResponse:

    @classmethod
    def html_response(cls, request, return_page, return_data=None):
        return render(request, return_page, return_data)

    @classmethod
    def json_response(cls, status: HttpResp, msg=None, result=None):
        return JsonResponse({
            "status": status, "msg": msg, "result": result
        })

    @classmethod
    def page_response(cls, request, return_page, return_data):
        def paginator_handler(curr_page_num, data_list, show_count=5):  # 分页器
            paginator = Paginator(data_list, show_count)
            curr_page_obj = paginator.get_page(curr_page_num)  # 获取当前页码所需要的文章列表 相当于一个容器
            # 获取当前页码
            # 获取前后各页
            page_range = list(range(max(curr_page_num - 2, 1), curr_page_num))
            page_range.extend(list(range(curr_page_num, min(curr_page_num + 2, paginator.num_pages) + 1)))
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
            return curr_page_obj, page_range

        curr_page_obj, page_range = paginator_handler(
            curr_page_num=request.GET.get('page', 1), data_list=return_data
        )
        return_data = {
            "curr_page_obj": curr_page_obj, "page_range": page_range
        }
        return cls.html_response(request, return_page, return_data)
