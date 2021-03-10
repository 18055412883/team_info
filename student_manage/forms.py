from django import forms
from django.forms import ModelForm

from . import models


class StuForm(ModelForm):

    class Meta:
        model = models.student_info  # 通过上面的User Model生成表单
        exclude = ("status",)
        # fields = "__all__"
