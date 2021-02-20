from django import forms
from django.forms import ModelForm

from . import models


class TchForm(ModelForm):

    class Meta:
        model = models.teacher_info  # 通过上面的User Model生成表单
        exclude = ("tch_account", "tch_pwd", "status")
        # fields = "__all__"
