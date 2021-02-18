from django import forms

class tch_form(forms.Form):
    tch_nam = forms.CharField(label="name", min_length=2, max_length=5)
    tch_sex = forms.CharField(label="sex")
    tch_tel = forms.CharField(label="tel")
    tch_nation = forms.CharField(label="nation")
    tch_bpl = forms.CharField(label="bpl")  # birth
    tch_sch = forms.CharField(label="sch")
    tch_ins = forms.CharField(label="ins")  # xue yuang
    tch_adr = forms.CharField(label="adr")
    tch_post = forms.CharField(label="post")
    tch_ema = forms.EmailField(label="ema")
    self_page = forms.CharField(label="page")
    tch_pic = forms.ImageField(label="pic")
    tch_iden = forms.CharField(label="iden")
    tch_career = forms.CharField(label="career")
    tch_intro = forms.CharField(label="intro")
    tch_edu = forms.CharField(label="edu", max_length=300)
    tch_exp = forms.CharField(label="exp", max_length=300)
    tch_aca = forms.CharField(label="aca", max_length=300)
    tch_honr = forms.CharField(label="honr")
    tch_pwd = forms.CharField(label="pwd")
    status = forms.IntegerField(label="status")


'''
class StuForm(forms.Form):
    stu_name = forms.CharField(label="stu_name", min_length=2, max_length=5)
    stu_id = forms.CharField(max_length=255, label="stu_id")
    stu_sex = forms.CharField(max_length=2, label="stu_sex")
    stu_iden = forms.CharField(max_length=20, label="stu_iden")
    stu_pic = forms.ImageField(label="stu_pic")
    stu_intro = forms.CharField(max_length=300, label="stu_intro")
    status = forms.IntegerField(label="stu_status")
'''