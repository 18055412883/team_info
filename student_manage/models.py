from django.db import models

# Create your models here.
class student_info(models.Model):
    stu_pic = models.ImageField(upload_to='img', null=True)
    stu_name = models.CharField(max_length=21, null=True)
    stu_id = models.CharField(max_length=255, primary_key=True)
    stu_sex = models.CharField(max_length=2, null=True)
    stu_iden = models.CharField(max_length=20, null=True)
    stu_intro = models.TextField(null=True)
    status = models.IntegerField()
