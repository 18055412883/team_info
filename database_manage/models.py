from django.db import models
import django.utils.timezone as timezone




class operate_log(models.Model):
    operate_user_id = models.CharField(max_length=255)
    operate_user_name = models.CharField(max_length=255)
    operate_time = models.DateTimeField(default=timezone.now)
    # 用户操作类型 add : 1 update : 2 delete : 3
    operate_type = models.IntegerField( null=True)
    operate_remark = models.TextField(null=True)  # 操作项目
    operate_details = models.TextField(null=True)  # 操作详情
    ready = models.CharField(max_length=255, default="这是一个备用字段")

    class Meta:
         ordering = ['-id']   #按照created_time倒序排序

