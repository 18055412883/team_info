

# Create your models here.

from django.db import models
import django.utils.timezone as timezone

class teacher_info(models.Model):
    tch_account = models.CharField(max_length=255, primary_key=True)
    tch_nam = models.CharField(max_length=21, null=True)
    tch_sex = models.CharField(max_length=2, null=True)
    tch_tel = models.CharField(max_length=11, null=True)
    tch_nation = models.CharField(max_length=30, null=True)
    tch_bpl = models.CharField(max_length=20, null=True)
    tch_sch = models.CharField(max_length=255, null=True)
    tch_ins = models.CharField(max_length=255, null=True)
    tch_adr = models.CharField(max_length=255, null=True)
    tch_post = models.CharField(max_length=20, null=True)
    tch_ema = models.EmailField(max_length=255, null=True)
    self_page =models.CharField(max_length=30, null=True)
    tch_pic = models.ImageField(upload_to='img', null=True)
    tch_iden = models.CharField(max_length=20, null=True)
    tch_career = models.CharField(null=True, max_length=4)
    tch_intro = models.TextField(null=True)
    tch_edu = models.TextField(null=True)
    tch_exp = models.TextField(null=True)
    tch_aca = models.TextField(null=True)
    tch_honr = models.TextField(null=True)
    tch_pwd = models.CharField(max_length=255,default="123456")
    status = models.IntegerField()



class operate_log(models.Model):
    operate_user_id = models.CharField(max_length=255)
    operate_user_name = models.CharField(max_length=255)
    operate_time = models.DateTimeField(default = timezone.now)
    # 用户操作类型 add : 1 update : 2 delete : 3
    operate_type = models.IntegerField( null=True)
    operate_remark = models.TextField(null=True)  # 操作项目
    operate_details = models.TextField(null=True)  # 操作详情
    ready = models.CharField(max_length=255, default="这是一个备用字段")



class teacher_login(models.Model):
    user_id = models.CharField(max_length=100,primary_key=True)
    user_nam = models.CharField(max_length=255)
    user_pwd = models.CharField(max_length=255, null=True)
    user_ema = models.EmailField('邮箱', null=True)
    submission_date = models.DateTimeField(default = timezone.now)
    ready = models.CharField(max_length=255, default="这是一个备用字段")


class TeacherTicketModel(models.Model):
    user = models.ForeignKey(teacher_login,on_delete=models.CASCADE)
    account = models.CharField(max_length=255)
    out_time = models.DateTimeField()
