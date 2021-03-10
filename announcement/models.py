from django.db import models

class announcement(models.Model):
    title = models.CharField(max_length=255)
    announceTime = models.DateField(null=True)
    announceWriter = models.CharField(max_length=20,null=True)
    announceOrigin = models.CharField(max_length=20,null=True) #公告来源
    mainBody = models.TextField(null=True)  # 正文
    status = models.IntegerField()

