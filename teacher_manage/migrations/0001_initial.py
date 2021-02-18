# Generated by Django 2.2.2 on 2021-02-15 10:04

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='operate_log',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('operate_user_id', models.CharField(max_length=255)),
                ('operate_user_name', models.CharField(max_length=255)),
                ('operate_time', models.DateTimeField(default=django.utils.timezone.now)),
                ('operate_type', models.IntegerField(null=True)),
                ('operate_remark', models.TextField(null=True)),
                ('operate_details', models.TextField(null=True)),
                ('ready', models.CharField(default='这是一个备用字段', max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='teacher_info',
            fields=[
                ('tch_account', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('tch_nam', models.CharField(max_length=21, null=True)),
                ('tch_sex', models.CharField(max_length=2, null=True)),
                ('tch_tel', models.CharField(max_length=11, null=True)),
                ('tch_nation', models.CharField(max_length=30, null=True)),
                ('tch_bpl', models.CharField(max_length=20, null=True)),
                ('tch_sch', models.CharField(max_length=255, null=True)),
                ('tch_ins', models.CharField(max_length=255, null=True)),
                ('tch_adr', models.CharField(max_length=255, null=True)),
                ('tch_post', models.CharField(max_length=20, null=True)),
                ('tch_ema', models.EmailField(max_length=255, null=True)),
                ('self_page', models.CharField(max_length=30, null=True)),
                ('tch_pic', models.ImageField(null=True, upload_to='img')),
                ('tch_iden', models.CharField(max_length=20, null=True)),
                ('tch_career', models.CharField(max_length=4, null=True)),
                ('tch_intro', models.TextField(null=True)),
                ('tch_edu', models.TextField(null=True)),
                ('tch_exp', models.TextField(null=True)),
                ('tch_aca', models.TextField(null=True)),
                ('tch_honr', models.TextField(null=True)),
                ('tch_pwd', models.CharField(default='123456', max_length=255)),
                ('status', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='teacher_login',
            fields=[
                ('user_id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('user_nam', models.CharField(max_length=255)),
                ('user_pwd', models.CharField(max_length=255, null=True)),
                ('user_ema', models.EmailField(max_length=254, null=True, verbose_name='邮箱')),
                ('submission_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('ready', models.CharField(default='这是一个备用字段', max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='TeacherTicketModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('account', models.CharField(max_length=255)),
                ('out_time', models.DateTimeField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='teacher_manage.teacher_login')),
            ],
        ),
    ]