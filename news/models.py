from django.db import models
import django.utils.timezone as timezone
from django.urls import reverse

class news(models.Model):
    title = models.CharField(max_length=255)
    mainBody = models.TextField()  #正文
    newsTime = models.DateTimeField(default = timezone.now)
    newsWriter = models.CharField(max_length=20)
    newsChecker = models.CharField(max_length=20, null=True)
    newsType = models.CharField(max_length=10)
    newsScanNumber = models.IntegerField(default=0)  #浏览次数
    newsDownTitle = models.CharField(max_length=255, null=True)  #下标题
    contentKeywords = models.CharField(max_length=255)  #内容关键字
    newsState = models.IntegerField()  # 状态
    ready = models.CharField(max_length=255)  #新闻浏览次数和浏览时长

    class Meta:
         ordering = ['-newsTime']   #按照created_time倒序排序
    def get_url(self):
        return reverse('news:new', kwargs={'pk': self.pk})  #获取新闻内容的链接

