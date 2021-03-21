from logzero import logger
from django.views.decorators.csrf import csrf_exempt

from .models import operate_log

OperateTypeMap = {"add": 1, "update": 2, "delete": 3, "backup": 4}

@csrf_exempt
class OperatorLog:
    def __init__(self):
        pass

    def __insert(self, request, type, details, remark):
        user_id = request.session['account']
        user_name = request.session['name']
        logger.info("operator log : user_id :[%s] , user_name : [%s] , operate_type : [%s] ,"
                    " operate_details : [%s] ,operate_remark : [%s]"
                    , user_id, user_name, type, details, remark)
        item = operate_log(operate_user_id=user_id, operate_user_name=user_name,
                           operate_remark=remark, operate_details=details, operate_type=type)
        try:
            item.save()
        except:
            logger.exception("insert operate log exception")

    def select_log_filter_by_type(self, type):
        return operate_log.objects.filter(operate_type=type)

    def select_all_log(self):
        return operate_log.objects.all()

    # 所有的添加操作都需pass        pass和pass要调用add添加日志
    def add(self, request, details, remark):
        self.__insert(request, OperateTypeMap["add"], details, remark)

    def update(self, request, details, remark):
        self.__insert(request, OperateTypeMap["update"], details, remark)

    def delete(self, request, details, remark):
        self.__insert(request, OperateTypeMap["delete"], details, remark)

    def backup(self, request, details, remark):
        self.__insert(request, OperateTypeMap["backup"], details, remark)