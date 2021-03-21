from Team_info_manage.utils.http_resp import WreshResponse
from .operator_log import OperatorLog


def log_list(request):
    g_operate_log = OperatorLog()
    log_list = g_operate_log.select_all_log()
    return WreshResponse.page_response(request, "log_manage.html", log_list)
