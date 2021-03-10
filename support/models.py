from django.db import models
class support(models.Model):
    spType = models.IntegerField() #支持平台状态， 0 国家重点实验室，1 教学名师
    spname = models.CharField(max_length=255, null=False)
    spurl = models.URLField()
    mainBody = models.TextField() # zheng weng
    status = models.IntegerField()
